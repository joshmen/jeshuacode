/**
 * chat-client.ts — Cliente SSE del widget de Jeshua Software.
 *
 * Adaptado del cliente del widget de Handy Suites (mismo contrato del engine), con los
 * arreglos que estaban pendientes ahi. Habla con el engine de bots (NEXT_PUBLIC_HERMES_URL):
 *   POST /public/conversations             -> { publicId }
 *   POST /public/conversations/:id/chat    -> SSE: data: {"delta":"..."} ... data: [DONE]
 *   GET  /public/conversations/:id/stream  -> EventSource (agente humano / sistema)
 *   POST /public/conversations/:id/handoff -> pide asesor
 *
 * Este archivo NO tiene UI ni estado de React: solo habla con el engine.
 */

const VISITOR_ID_KEY = "js_chat_visitor_id";

function getBaseUrl(): string {
  const url =
    (typeof process !== "undefined" && process.env.NEXT_PUBLIC_HERMES_URL) ||
    "http://localhost:8080";
  return url.replace(/\/+$/, "");
}

// ---------------------------------------------------------------------------
// Tipos
// ---------------------------------------------------------------------------

export interface ChatLead {
  nombre?: string;
  email?: string;
  telefono?: string;
  mensaje?: string;
}

export interface SendDoneInfo {
  handoff?: boolean;
}

export interface SendCallbacks {
  onToken?: (delta: string) => void;
  onDone?: (info: SendDoneInfo) => void;
  onError?: (error: Error) => void;
}

export type ReceiveEventType = "agent_message" | "system" | "bot_message" | "closed";

export interface ReceiveEvent {
  type: ReceiveEventType;
  text?: string;
  agentName?: string;
  /** Codigo estable del evento. El texto es para humanos; esto es para el codigo. */
  code?: string;
  [key: string]: unknown;
}

export interface StartConversationResult {
  publicId: string;
  visitorId: string;
}

export interface ReceiveSubscription {
  close: () => void;
}

/** La conversacion ya no existe en el server: hay que empezar de cero. */
export class ConversationGoneError extends Error {
  constructor() {
    super("La conversacion ya no existe");
    this.name = "ConversationGoneError";
  }
}

// ---------------------------------------------------------------------------
// Visitor id
// ---------------------------------------------------------------------------

function cryptoRandomId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `v_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
}

export function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return cryptoRandomId();
  try {
    let id = window.localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = cryptoRandomId();
      window.localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
  } catch {
    // Safari en privado revienta al escribir: el chat debe funcionar igual, sin memoria.
    return cryptoRandomId();
  }
}

export function clearVisitorId(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(VISITOR_ID_KEY);
  } catch {
    // sin storage no hay nada que limpiar
  }
}

// ---------------------------------------------------------------------------
// Parser SSE
// ---------------------------------------------------------------------------

interface SseFrame {
  event?: string;
  data: string;
}

/** Parser incremental: devuelve frames completos y deja el resto en el buffer. */
function parseSseChunks(buffer: string): { frames: SseFrame[]; rest: string } {
  const frames: SseFrame[] = [];
  const normalized = buffer.replace(/\r\n/g, "\n");
  const parts = normalized.split("\n\n");
  const rest = parts.pop() ?? "";

  for (const block of parts) {
    if (!block.trim()) continue;
    let event: string | undefined;
    const dataLines: string[] = [];
    for (const line of block.split("\n")) {
      if (line.startsWith("data:")) {
        dataLines.push(line.slice(5).replace(/^ /, ""));
      } else if (line.startsWith("event:")) {
        event = line.slice(6).trim();
      }
      // Los comentarios SSE (":ping", ":open") se ignoran: son keepalive del server.
    }
    frames.push({ event, data: dataLines.join("\n") });
  }

  return { frames, rest };
}

function extractDelta(payload: unknown): string | null {
  if (typeof payload !== "object" || payload === null) return null;
  const obj = payload as Record<string, unknown>;
  if (typeof obj.delta === "string") return obj.delta;
  if (typeof obj.content === "string") return obj.content;
  if (typeof obj.text === "string") return obj.text;
  if (typeof obj.token === "string") return obj.token;
  return null;
}

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------

/**
 * Abre (o retoma) la conversacion del visitante. El engine es idempotente por visitorId:
 * el que vuelve recupera su conversacion con historial.
 */
export async function startConversation(): Promise<StartConversationResult> {
  const visitorId = getOrCreateVisitorId();
  const res = await fetch(`${getBaseUrl()}/public/conversations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ visitorId }),
  });

  if (!res.ok) {
    throw new Error(`No se pudo iniciar la conversacion (HTTP ${res.status})`);
  }

  const data = (await res.json()) as { publicId?: string; id?: string };
  const publicId = data.publicId ?? data.id;
  if (!publicId) throw new Error("Respuesta invalida: falta publicId");

  return { publicId, visitorId };
}

/** Envia un mensaje y consume el stream. onToken por cada delta, onDone al cerrar. */
export async function sendMessage(
  publicId: string,
  text: string,
  callbacks: SendCallbacks = {}
): Promise<void> {
  const { onToken, onDone, onError } = callbacks;
  try {
    const res = await fetch(
      `${getBaseUrl()}/public/conversations/${encodeURIComponent(publicId)}/chat`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
        body: JSON.stringify({ message: text }),
      }
    );

    // 404 = la conversacion murio (limpieza del server, otro navegador, etc).
    // Quien llama debe borrar la sesion y arrancar de cero, no reintentar.
    if (res.status === 404) throw new ConversationGoneError();
    if (!res.ok || !res.body) throw new Error(`Error al enviar mensaje (HTTP ${res.status})`);

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    const doneInfo: SendDoneInfo = {};

    try {
      for (;;) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const { frames, rest } = parseSseChunks(buffer);
        buffer = rest;

        for (const frame of frames) {
          const raw = frame.data.trim();
          if (!raw) continue;
          if (raw === "[DONE]") {
            onDone?.(doneInfo);
            return;
          }

          let payload: unknown;
          try {
            payload = JSON.parse(raw);
          } catch {
            onToken?.(raw); // texto plano: delta directo
            continue;
          }

          const obj = payload as Record<string, unknown>;
          const delta = extractDelta(payload);
          if (delta) onToken?.(delta);
          if (typeof obj.handoff === "boolean") doneInfo.handoff = obj.handoff;
          if (obj.done === true || obj.finished === true) {
            onDone?.(doneInfo);
            return;
          }
        }
      }

      // Stream cerrado sin [DONE] explicito.
      onDone?.(doneInfo);
    } finally {
      // Libera el SSE del lado del server si el usuario se fue a media respuesta.
      reader.cancel().catch(() => {});
    }
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err));
    if (onError) onError(error);
    else throw error;
  }
}

/**
 * Suscripcion a eventos del asesor humano / sistema.
 *
 * Reconecta con backoff y tope. El cliente original reintentaba cada 3s PARA SIEMPRE: con la
 * conversacion borrada en el server eso es un DoS que uno mismo se hace, y de paso mantiene
 * caliente una conexion por pestaña abierta que nunca va a servir.
 */
export function subscribeReceive(
  publicId: string,
  onEvent: (event: ReceiveEvent) => void,
  onGone?: () => void
): ReceiveSubscription {
  if (typeof window === "undefined" || typeof EventSource === "undefined") {
    return { close: () => {} };
  }

  let source: EventSource | null = null;
  let closed = false;
  let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  let intentos = 0;

  const MAX_INTENTOS = 6; // ~2 min de reintentos y se rinde
  const BASE_MS = 3000;
  const TOPE_MS = 30000;

  const url = `${getBaseUrl()}/public/conversations/${encodeURIComponent(publicId)}/stream`;

  const handleMessage = (ev: MessageEvent) => {
    intentos = 0; // llego algo: la conexion esta sana
    const raw = typeof ev.data === "string" ? ev.data.trim() : "";
    if (!raw || raw === "[DONE]") return;
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = { type: "system", text: raw };
    }
    const obj = (parsed ?? {}) as Record<string, unknown>;
    onEvent({
      ...obj,
      type: (obj.type as ReceiveEventType) ?? "system",
      text: typeof obj.text === "string" ? obj.text : undefined,
      agentName: typeof obj.agentName === "string" ? obj.agentName : undefined,
      code: typeof obj.code === "string" ? obj.code : undefined,
    });
  };

  /**
   * EventSource no expone el status HTTP del fallo, asi que se pregunta aparte:
   * si la conversacion ya no existe, reconectar es inutil para siempre.
   */
  const conversacionSigueViva = async (): Promise<boolean> => {
    try {
      const res = await fetch(url, { method: "GET", headers: { Accept: "text/event-stream" } });
      // Se cancela de inmediato: solo interesaba el status.
      res.body?.cancel().catch(() => {});
      return res.status !== 404;
    } catch {
      return true; // sin red no se puede concluir que murio: se reintenta
    }
  };

  const connect = () => {
    if (closed) return;
    source = new EventSource(url);
    source.onmessage = handleMessage;

    (["agent_message", "system", "bot_message", "closed"] as const).forEach((name) => {
      source?.addEventListener(name, (ev) => handleMessage(ev as MessageEvent));
    });

    source.onerror = async () => {
      source?.close();
      source = null;
      if (closed) return;

      if (!(await conversacionSigueViva())) {
        closed = true;
        onGone?.();
        return;
      }

      if (++intentos > MAX_INTENTOS) {
        closed = true;
        return;
      }

      const espera = Math.min(BASE_MS * 2 ** (intentos - 1), TOPE_MS);
      reconnectTimer = setTimeout(connect, espera);
    };
  };

  connect();

  return {
    close: () => {
      closed = true;
      if (reconnectTimer) clearTimeout(reconnectTimer);
      source?.close();
      source = null;
    },
  };
}

/**
 * Pide un asesor humano.
 *
 * consent=false explicito mientras no haya UI de consentimiento: el engine respeta esto y NO
 * persiste datos personales (ni en su base ni en el aviso de Telegram). El antibot del widget
 * es el mismo de la landing (honeypot + time-trap + rate-limit del engine), no reCAPTCHA.
 */
export async function requestHandoff(
  publicId: string,
  lead?: ChatLead,
  consent = false
): Promise<void> {
  const res = await fetch(
    `${getBaseUrl()}/public/conversations/${encodeURIComponent(publicId)}/handoff`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lead: lead ?? null, consent }),
    }
  );

  if (res.status === 404) throw new ConversationGoneError();
  if (!res.ok) throw new Error(`No se pudo solicitar el asesor (HTTP ${res.status})`);
}
