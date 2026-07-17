/**
 * chat-storage.ts — Memoria del widget en localStorage.
 *
 * El test que importa: escribir, recargar la pagina, y que el hilo siga ahi.
 *
 * Todo va con schemaVersion y TTL. Sin version, un cambio de forma en el futuro rompe el
 * widget de quien ya tenia datos viejos guardados, y ese usuario no puede hacer nada al
 * respecto. Con version, los datos viejos se descartan solos.
 */

const PREFIX = "js_chat_";
const SCHEMA_VERSION = 1;

const KEYS = {
  session: `${PREFIX}session`,
  transcript: `${PREFIX}transcript`,
  ui: `${PREFIX}ui`,
} as const;

const TTL = {
  session: 7 * 24 * 60 * 60 * 1000, // 7 dias: lo que dura el interes de un prospecto
  transcript: 7 * 24 * 60 * 60 * 1000,
  ui: 30 * 24 * 60 * 60 * 1000, // 30 dias: "ya cerre esto" debe recordarse mas tiempo
} as const;

/** Cap del historial guardado: un hilo infinito acabaria reventando la cuota de localStorage. */
const MAX_MENSAJES = 80;

export type ChatRole = "user" | "assistant" | "system";

export interface StoredMessage {
  id: string;
  role: ChatRole;
  text: string;
  at: number;
}

export interface StoredSession {
  publicId: string;
}

export interface StoredUi {
  activeTab?: "home" | "mensajes" | "ayuda";
  unread?: number;
  greetingShownAt?: number;
  dismissedAt?: number;
}

interface Envelope<T> {
  v: number;
  at: number;
  data: T;
}

function leer<T>(key: string, ttl: number): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const env = JSON.parse(raw) as Envelope<T>;
    if (env.v !== SCHEMA_VERSION) {
      window.localStorage.removeItem(key);
      return null;
    }
    if (Date.now() - env.at > ttl) {
      window.localStorage.removeItem(key);
      return null;
    }
    return env.data;
  } catch {
    // JSON corrupto o storage bloqueado: se descarta en silencio. El widget debe abrir igual.
    return null;
  }
}

function escribir<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    const env: Envelope<T> = { v: SCHEMA_VERSION, at: Date.now(), data };
    window.localStorage.setItem(key, JSON.stringify(env));
  } catch {
    // Safari privado / cuota llena: no se puede guardar y no pasa nada grave.
  }
}

function borrar(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // nada que hacer
  }
}

export const chatStorage = {
  getSession: () => leer<StoredSession>(KEYS.session, TTL.session),
  setSession: (s: StoredSession) => escribir(KEYS.session, s),

  getTranscript: () => leer<StoredMessage[]>(KEYS.transcript, TTL.transcript) ?? [],
  setTranscript: (msgs: StoredMessage[]) =>
    escribir(KEYS.transcript, msgs.slice(-MAX_MENSAJES)),

  getUi: () => leer<StoredUi>(KEYS.ui, TTL.ui) ?? {},
  setUi: (ui: StoredUi) => escribir(KEYS.ui, ui),

  /**
   * Borra la conversacion pero NO el visitorId ni las preferencias de UI: si el server
   * perdio la conversacion, el visitante sigue siendo el mismo y ya dijo lo que queria
   * de la burbuja de saludo.
   */
  clearConversation: () => {
    borrar(KEYS.session);
    borrar(KEYS.transcript);
  },
};
