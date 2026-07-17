"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ConversationGoneError,
  requestHandoff,
  sendMessage,
  startConversation,
  subscribeReceive,
  type ChatLead,
  type ReceiveSubscription,
} from "./chat-client";
import { chatStorage, type StoredMessage } from "./chat-storage";
import { useLanguage } from "../language-context";

export type ChatTab = "home" | "mensajes" | "ayuda";

export interface UseChat {
  mensajes: StoredMessage[];
  enviando: boolean;
  error: string | null;
  tab: ChatTab;
  setTab: (t: ChatTab) => void;
  abierto: boolean;
  abrir: (t?: ChatTab) => void;
  cerrar: () => void;
  noLeidos: number;
  enviar: (texto: string) => Promise<void>;
  pedirAsesor: (lead?: ChatLead) => Promise<void>;
  hidratado: boolean;
}

function nuevoId(): string {
  // crypto.randomUUID y no un contador: un contador reinicia en "m1" al recargar y
  // colisiona con los ids que se acaban de restaurar del historial.
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `m_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
}

export function useChat(): UseChat {
  // El idioma que el visitante eligio en la nav. Se le pasa al bot para que no conteste en
  // español a quien esta leyendo la web en ingles.
  const { lang } = useLanguage();
  const langRef = useRef(lang);
  useEffect(() => {
    langRef.current = lang;
  }, [lang]);

  const [mensajes, setMensajes] = useState<StoredMessage[]>([]);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<ChatTab>("home");
  const [abierto, setAbierto] = useState(false);
  const [noLeidos, setNoLeidos] = useState(0);
  const [hidratado, setHidratado] = useState(false);

  const publicIdRef = useRef<string | null>(null);
  const subRef = useRef<ReceiveSubscription | null>(null);
  const abiertoRef = useRef(false);

  useEffect(() => {
    abiertoRef.current = abierto;
  }, [abierto]);

  // Hidratar en useEffect y NO en el inicializador de useState: en SSR no hay localStorage,
  // y leerlo ahi provoca que el server y el cliente rendericen distinto.
  useEffect(() => {
    const sesion = chatStorage.getSession();
    const ui = chatStorage.getUi();
    if (sesion) publicIdRef.current = sesion.publicId;
    setMensajes(chatStorage.getTranscript());
    if (ui.activeTab) setTab(ui.activeTab);
    setNoLeidos(ui.unread ?? 0);
    setHidratado(true);
  }, []);

  // Persistir el hilo en cuanto cambia: si el usuario recarga, sigue ahi.
  useEffect(() => {
    if (hidratado) chatStorage.setTranscript(mensajes);
  }, [mensajes, hidratado]);

  useEffect(() => {
    if (hidratado) chatStorage.setUi({ ...chatStorage.getUi(), activeTab: tab, unread: noLeidos });
  }, [tab, noLeidos, hidratado]);

  const empezarDeCero = useCallback(() => {
    chatStorage.clearConversation();
    publicIdRef.current = null;
    subRef.current?.close();
    subRef.current = null;
    setMensajes([]);
  }, []);

  /** Suscribe al stream de eventos (asesor humano). Idempotente. */
  const suscribir = useCallback((publicId: string) => {
    if (subRef.current) return;
    subRef.current = subscribeReceive(
      publicId,
      (ev) => {
        if (!ev.text) return;
        setMensajes((prev) => [
          ...prev,
          {
            id: nuevoId(),
            role: ev.type === "agent_message" ? "assistant" : "system",
            text: ev.text!,
            at: Date.now(),
          },
        ]);
        // Solo cuenta como no leido si el panel esta cerrado.
        if (!abiertoRef.current) setNoLeidos((n) => n + 1);
      },
      () => {
        // El server perdio la conversacion: empezar limpio en vez de reintentar por siempre.
        empezarDeCero();
      }
    );
  }, [empezarDeCero]);

  useEffect(() => () => subRef.current?.close(), []);

  /**
   * Conversacion perezosa: se crea al PRIMER mensaje, no al abrir el panel. Si no, cada
   * visitante curioso que abre el widget y no escribe deja una fila muerta en la base.
   */
  const asegurarConversacion = useCallback(async (): Promise<string> => {
    if (publicIdRef.current) return publicIdRef.current;
    const { publicId } = await startConversation();
    publicIdRef.current = publicId;
    chatStorage.setSession({ publicId });
    suscribir(publicId);
    return publicId;
  }, [suscribir]);

  const enviar = useCallback(
    async (texto: string) => {
      const limpio = texto.trim();
      if (!limpio || enviando) return;

      setError(null);
      setEnviando(true);
      setMensajes((prev) => [...prev, { id: nuevoId(), role: "user", text: limpio, at: Date.now() }]);

      const idBot = nuevoId();
      let acumulado = "";

      const pintarDelta = (delta: string) => {
        acumulado += delta;
        setMensajes((prev) => {
          const yaEsta = prev.some((m) => m.id === idBot);
          if (yaEsta) return prev.map((m) => (m.id === idBot ? { ...m, text: acumulado } : m));
          return [...prev, { id: idBot, role: "assistant", text: acumulado, at: Date.now() }];
        });
      };

      const intentar = async (reintento = false): Promise<void> => {
        const publicId = await asegurarConversacion();
        await new Promise<void>((resolve, reject) => {
          sendMessage(publicId, limpio, langRef.current, {
            onToken: pintarDelta,
            onDone: () => resolve(),
            onError: (e) => reject(e),
          });
        }).catch(async (e) => {
          // La conversacion murio en el server: una sola vez, se abre otra y se reenvia.
          // Sin este reintento, el visitante ve un error por algo que no hizo.
          if (e instanceof ConversationGoneError && !reintento) {
            empezarDeCero();
            return intentar(true);
          }
          throw e;
        });
      };

      try {
        await intentar();
      } catch {
        setError("No pude responder. ¿Lo intentas de nuevo?");
      } finally {
        setEnviando(false);
      }
    },
    [enviando, asegurarConversacion, empezarDeCero]
  );

  const pedirAsesor = useCallback(
    async (lead?: ChatLead) => {
      try {
        const publicId = await asegurarConversacion();
        await requestHandoff(publicId, lead);
        setMensajes((prev) => [
          ...prev,
          {
            id: nuevoId(),
            role: "system",
            text: "Listo, ya avisé al equipo. Te contactan en cuanto puedan.",
            at: Date.now(),
          },
        ]);
      } catch {
        setError("No pude avisar al equipo. Intenta por WhatsApp.");
      }
    },
    [asegurarConversacion]
  );

  const abrir = useCallback((t?: ChatTab) => {
    setAbierto(true);
    setNoLeidos(0);
    if (t) setTab(t);
  }, []);

  const cerrar = useCallback(() => setAbierto(false), []);

  return {
    mensajes,
    enviando,
    error,
    tab,
    setTab,
    abierto,
    abrir,
    cerrar,
    noLeidos,
    enviar,
    pedirAsesor,
    hidratado,
  };
}
