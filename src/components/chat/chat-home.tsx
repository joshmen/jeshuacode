"use client";

import { MessageSquare, ArrowRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { cuandoVuelven, hayHumanos } from "@/lib/chat/chat-availability";

/**
 * Estado de disponibilidad honesto: dice si hay HUMANOS despiertos y aclara que el bot
 * responde igual. Es justo lo contrario del chat de la referencia, que solo toma recados
 * y contesta al dia siguiente.
 */
export function Disponibilidad({ compacto = false }: { compacto?: boolean }) {
  const { t } = useLanguage();
  const enLinea = hayHumanos();
  const vuelta = cuandoVuelven();

  const textoVuelta =
    vuelta === "ahora"
      ? t.chat.vuelveAhora
      : vuelta === "hoy"
        ? t.chat.vuelveHoy
        : vuelta === "manana"
          ? t.chat.vuelveManana
          : t.chat.vuelveLunes;

  if (compacto) {
    return (
      <div className="flex items-center gap-1.5 text-[11px] font-medium text-white/85">
        <span className={`h-1.5 w-1.5 rounded-full ${enLinea ? "bg-[#4ADE80]" : "bg-white/50"}`} />
        {enLinea ? t.chat.estadoEnLinea : t.chat.estadoFuera}
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-line bg-surface px-3.5 py-3">
      <div className="flex items-center gap-2 text-[13px] font-bold text-foreground">
        <span className={`h-2 w-2 rounded-full ${enLinea ? "bg-[#4ADE80]" : "bg-faint"}`} />
        {enLinea ? t.chat.estadoEnLinea : t.chat.estadoFuera}
      </div>
      <p className="mt-1 text-[12.5px] font-medium leading-snug text-muted">
        {textoVuelta} {t.chat.botSiempre}
      </p>
    </div>
  );
}

export default function ChatHome({
  onIniciar,
  atajos,
}: {
  onIniciar: (pregunta?: string) => void;
  atajos: string[];
}) {
  const { t } = useLanguage();

  return (
    <div className="chat-scroll flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-4 py-5">
      <div>
        <div className="text-[22px] font-extrabold tracking-[-0.02em] text-navy">
          {t.chat.homeHola}
        </div>
        <p className="mt-1.5 text-[14px] font-medium leading-relaxed text-muted">
          {t.chat.homeSub}
        </p>
      </div>

      <Disponibilidad />

      <button
        type="button"
        onClick={() => onIniciar()}
        className="btn-primary flex items-center justify-between rounded-xl px-4 py-3 text-[14.5px] font-bold text-white transition-all hover:-translate-y-px"
      >
        <span className="flex items-center gap-2">
          <MessageSquare size={16} />
          {t.chat.homeCta}
        </span>
        <ArrowRight size={16} />
      </button>

      <div>
        <div className="mb-2 text-[12px] font-bold uppercase tracking-[0.06em] text-faint">
          {t.chat.homeAtajos}
        </div>
        <div className="flex flex-col gap-2">
          {atajos.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => onIniciar(a)}
              className="card-shadow rounded-xl border border-line bg-white px-3.5 py-2.5 text-left text-[13.5px] font-semibold text-foreground transition-all hover:-translate-y-px hover:border-accent/40"
            >
              {a}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
