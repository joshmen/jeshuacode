"use client";

import { useEffect, useRef, useState } from "react";
import { Send, UserRoundCheck } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import type { StoredMessage } from "@/lib/chat/chat-storage";

/** Tres puntos animados. El widget original pintaba "..." literal y se veia a muerto. */
function Escribiendo({ etiqueta }: { etiqueta: string }) {
  return (
    <div className="flex items-center gap-2 px-1 py-1" aria-label={etiqueta}>
      <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-surface px-3 py-2.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-faint"
            style={{ animationDelay: `${i * 0.15}s`, animationDuration: "1s" }}
          />
        ))}
      </div>
    </div>
  );
}

function Burbuja({ msg }: { msg: StoredMessage }) {
  if (msg.role === "system") {
    return (
      <div className="mx-auto flex max-w-[92%] items-center gap-2 rounded-lg bg-accent-light px-3 py-2 text-[12.5px] font-semibold text-accent">
        <UserRoundCheck size={14} className="shrink-0" />
        <span>{msg.text}</span>
      </div>
    );
  }

  const mio = msg.role === "user";
  return (
    <div className={`flex ${mio ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[14px] font-medium leading-relaxed ${
          mio
            ? "rounded-br-sm bg-accent text-white"
            : "rounded-bl-sm bg-surface text-foreground"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}

export default function ChatThread({
  mensajes,
  enviando,
  error,
  onEnviar,
  onPedirAsesor,
}: {
  mensajes: StoredMessage[];
  enviando: boolean;
  error: string | null;
  onEnviar: (texto: string) => void;
  onPedirAsesor: () => void;
}) {
  const { t } = useLanguage();
  const [texto, setTexto] = useState("");
  const finRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Seguir el hilo hacia abajo conforme llegan tokens.
  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [mensajes, enviando]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const enviar = () => {
    const limpio = texto.trim();
    if (!limpio || enviando) return;
    onEnviar(limpio);
    setTexto("");
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* aria-live: quien usa lector de pantalla se entera de la respuesta del bot */}
      <div
        className="chat-scroll flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto px-4 py-4"
        aria-live="polite"
        aria-atomic="false"
      >
        {mensajes.length === 0 && !enviando && (
          <p className="mt-6 text-center text-[13.5px] font-medium text-faint">
            {t.chat.vacioMensajes}
          </p>
        )}

        {mensajes.map((m) => (
          <Burbuja key={m.id} msg={m} />
        ))}

        {enviando && <Escribiendo etiqueta={t.chat.escribiendo} />}

        {error && (
          <div className="mx-auto rounded-lg bg-[#FEF3F2] px-3 py-2 text-[12.5px] font-semibold text-[#B42318]">
            {error}
          </div>
        )}

        <div ref={finRef} />
      </div>

      <div className="border-t border-line px-3 pb-3 pt-2.5">
        <button
          type="button"
          onClick={onPedirAsesor}
          className="mb-2 text-[12.5px] font-bold text-accent transition-colors hover:text-accent-hover"
        >
          {t.chat.pedirAsesor}
        </button>

        <div className="field-shadow flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2">
          <input
            ref={inputRef}
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                enviar();
              }
            }}
            placeholder={t.chat.placeholder}
            maxLength={2000}
            aria-label={t.chat.placeholder}
            className="min-w-0 flex-1 bg-transparent text-[14px] font-medium text-foreground outline-none placeholder:text-faint"
          />
          <button
            type="button"
            onClick={enviar}
            disabled={!texto.trim() || enviando}
            aria-label={t.chat.enviar}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cta text-white transition-all hover:bg-cta-hover disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
