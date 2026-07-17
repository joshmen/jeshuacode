"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { useChat, type ChatTab } from "@/lib/chat/use-chat";
import { chatStorage } from "@/lib/chat/chat-storage";
import ChatHome, { Disponibilidad } from "./chat-home";
import ChatThread from "./chat-thread";
import ChatHelp from "./chat-help";

const UN_DIA = 24 * 60 * 60 * 1000;
const TRAS_SEGUNDOS = 20_000;
const SCROLL_MINIMO = 0.35;

export default function ChatWidget() {
  const { t } = useLanguage();
  const chat = useChat();
  const sinMovimiento = useReducedMotion();
  const [saludo, setSaludo] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  const atajos = t.faqs.slice(0, 3).map((f) => f.q);

  /**
   * Saludo proactivo: solo si el visitante lleva rato Y demostro interes (scroll o intento de
   * salida). Saltar encima al segundo 3 es lo que hace que la gente odie estos widgets.
   * Nunca en movil (no hay espacio) ni dos veces el mismo dia.
   */
  useEffect(() => {
    if (!chat.hidratado || chat.abierto) return;
    if (typeof window === "undefined" || window.innerWidth < 640) return;

    const ui = chatStorage.getUi();
    if (ui.greetingShownAt && Date.now() - ui.greetingShownAt < UN_DIA) return;
    if (ui.dismissedAt && Date.now() - ui.dismissedAt < UN_DIA) return;

    let listo = false;
    let mostrado = false;

    const mostrar = () => {
      if (mostrado || !listo) return;
      mostrado = true;
      setSaludo(true);
      chatStorage.setUi({ ...chatStorage.getUi(), greetingShownAt: Date.now() });
    };

    const temporizador = setTimeout(() => {
      listo = true;
    }, TRAS_SEGUNDOS);

    const alScroll = () => {
      const alto = document.body.scrollHeight - window.innerHeight;
      if (alto > 0 && window.scrollY / alto > SCROLL_MINIMO) mostrar();
    };
    const alSalir = (e: MouseEvent) => {
      if (e.clientY <= 0) mostrar();
    };

    window.addEventListener("scroll", alScroll, { passive: true });
    document.addEventListener("mouseleave", alSalir);
    return () => {
      clearTimeout(temporizador);
      window.removeEventListener("scroll", alScroll);
      document.removeEventListener("mouseleave", alSalir);
    };
  }, [chat.hidratado, chat.abierto]);

  const cerrarSaludo = useCallback(() => {
    setSaludo(false);
    chatStorage.setUi({ ...chatStorage.getUi(), dismissedAt: Date.now() });
  }, []);

  // Esc cierra, y al cerrar el foco vuelve al launcher (si no, se pierde en el limbo).
  useEffect(() => {
    if (!chat.abierto) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        chat.cerrar();
        launcherRef.current?.focus();
        return;
      }
      // Trampa de foco: dentro de un dialogo, Tab no debe irse a la pagina de atras.
      if (e.key !== "Tab" || !panelRef.current) return;
      const focos = panelRef.current.querySelectorAll<HTMLElement>(
        'button, input, a[href], [tabindex]:not([tabindex="-1"])'
      );
      if (focos.length === 0) return;
      const primero = focos[0];
      const ultimo = focos[focos.length - 1];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };
    document.addEventListener("keydown", alTeclear);
    return () => document.removeEventListener("keydown", alTeclear);
  }, [chat.abierto, chat]);

  const abrirCon = (pregunta?: string) => {
    chat.abrir("mensajes");
    if (pregunta) void chat.enviar(pregunta);
  };

  const tabs: { id: ChatTab; label: string }[] = [
    { id: "home", label: t.chat.tabHome },
    { id: "mensajes", label: t.chat.tabMensajes },
    { id: "ayuda", label: t.chat.tabAyuda },
  ];

  // Antes de hidratar no se pinta nada: el server no sabe si hay hilo guardado y pintar
  // distinto en cliente provoca un salto feo.
  if (!chat.hidratado) return null;

  return (
    <>
      {/* z sobre la nav, que usa z-100 */}
      <div className="fixed bottom-5 right-5 z-[110] flex flex-col items-end gap-3 print:hidden">
        <AnimatePresence>
          {saludo && !chat.abierto && (
            <motion.div
              initial={sinMovimiento ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={sinMovimiento ? undefined : { opacity: 0, y: 8 }}
              transition={{ duration: 0.25 }}
              className="card-shadow relative hidden max-w-[260px] rounded-2xl rounded-br-sm border border-line bg-white p-3.5 sm:block"
            >
              <button
                type="button"
                onClick={cerrarSaludo}
                aria-label={t.chat.cerrar}
                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-line bg-white text-faint transition-colors hover:text-foreground"
              >
                <X size={12} />
              </button>
              <button type="button" onClick={() => chat.abrir("mensajes")} className="text-left">
                <p className="text-[13.5px] font-medium leading-snug text-foreground">
                  {t.chat.saludoBurbuja}
                </p>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {chat.abierto && (
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="false"
              aria-label={t.chat.titulo}
              initial={sinMovimiento ? false : { opacity: 0, scale: 0.94, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={sinMovimiento ? undefined : { opacity: 0, scale: 0.94, y: 8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              style={{ transformOrigin: "100% 100%" }}
              className="card-shadow fixed inset-0 flex flex-col overflow-hidden border-line bg-white sm:relative sm:inset-auto sm:h-[520px] sm:w-[368px] sm:rounded-2xl sm:border"
            >
              <div className="shrink-0 bg-accent px-4 pb-3 pt-4 text-white">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-[12px] font-extrabold">
                      JS
                    </div>
                    <div>
                      <div className="text-[15px] font-bold leading-tight">{t.chat.titulo}</div>
                      <Disponibilidad compacto />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={chat.cerrar}
                    aria-label={t.chat.cerrar}
                    className="flex h-7 w-7 items-center justify-center rounded-lg text-white/80 transition-colors hover:bg-white/15 hover:text-white"
                  >
                    <X size={16} />
                  </button>
                </div>
                <p className="mt-2 text-[12px] font-medium leading-snug text-white/85">
                  {t.chat.subtitulo}
                </p>
              </div>

              <div className="flex shrink-0 border-b border-line" role="tablist">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={chat.tab === tab.id}
                    onClick={() => chat.setTab(tab.id)}
                    className={`flex-1 border-b-2 px-2 py-2.5 text-[13px] font-bold transition-colors ${
                      chat.tab === tab.id
                        ? "border-accent text-accent"
                        : "border-transparent text-faint hover:text-muted"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {chat.tab === "home" && <ChatHome onIniciar={abrirCon} atajos={atajos} />}
              {chat.tab === "mensajes" && (
                <ChatThread
                  mensajes={chat.mensajes}
                  enviando={chat.enviando}
                  error={chat.error}
                  onEnviar={(txt) => void chat.enviar(txt)}
                  onPedirAsesor={() => void chat.pedirAsesor()}
                />
              )}
              {chat.tab === "ayuda" && (
                <ChatHelp
                  onPreguntarBot={(q) => {
                    chat.setTab("mensajes");
                    if (q.trim()) void chat.enviar(q);
                  }}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <button
          ref={launcherRef}
          type="button"
          onClick={() => (chat.abierto ? chat.cerrar() : chat.abrir())}
          aria-label={t.chat.launcherAria}
          aria-expanded={chat.abierto}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-accent text-white shadow-[0_6px_20px_rgba(21,155,215,.4)] transition-all hover:-translate-y-0.5 hover:bg-accent-hover"
        >
          {chat.abierto ? <X size={22} /> : <MessageCircle size={24} />}
          {chat.noLeidos > 0 && !chat.abierto && (
            <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-cta text-[11px] font-extrabold text-white">
              {chat.noLeidos}
            </span>
          )}
        </button>
      </div>
    </>
  );
}
