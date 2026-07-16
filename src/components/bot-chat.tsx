"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Send, UserRoundCheck } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

/**
 * Mockup del bot de WhatsApp de Jeshua Software.
 * Los mensajes salen de i18n y reproducen una conversacion real del bot
 * (incluida la captura automatica del cliente potencial, que es el momento que vende).
 */

function Burbuja({ children, mia }: { children: React.ReactNode; mia?: boolean }) {
  return (
    <div className={`flex ${mia ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[86%] rounded-[10px] px-[10px] py-[7px] text-[12.5px] font-medium leading-snug shadow-[0_1px_1px_rgba(11,20,26,.13)] ${
          mia
            ? "rounded-br-[3px] bg-[#D9FDD3] text-[#111B21]"
            : "rounded-bl-[3px] bg-white text-[#111B21]"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default function BotChat() {
  const { t } = useLanguage();

  return (
    <div className="relative mx-auto w-full max-w-[330px]">
      {/* Telefono */}
      <div className="overflow-hidden rounded-[30px] border-[8px] border-[#0F1115] bg-[#0F1115] shadow-[0_30px_60px_rgba(16,24,40,.35)]">
        {/* Barra de WhatsApp */}
        <div className="flex items-center gap-2.5 bg-[#075E54] px-3 py-2.5 text-white">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-[11px] font-extrabold">
            JS
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 text-[13px] font-bold leading-tight">
              <span className="truncate">{t.botName}</span>
              <BadgeCheck size={13} className="shrink-0 text-[#53BDEB]" />
            </div>
            <div className="truncate text-[10.5px] font-medium opacity-80">{t.botStat}</div>
          </div>
        </div>

        {/* Conversacion */}
        <div className="flex flex-col gap-1.5 bg-[#ECE5DD] px-2.5 py-3">
          <div className="mx-auto mb-1 rounded-[6px] bg-[#FFF6D8] px-2 py-1 text-center text-[9.5px] font-semibold text-[#5A5A3F]">
            {t.botBiz}
          </div>
          <Burbuja mia>{t.bm1}</Burbuja>
          <Burbuja>{t.bm2}</Burbuja>
          <Burbuja mia>{t.bm3}</Burbuja>
          <Burbuja>{t.bm4}</Burbuja>
          {/* Aire al final: aqui flota la tarjeta del lead sin tapar la conversacion */}
          <div className="h-28" />
        </div>

        {/* Barra de escribir (decorativa): remata el mockup como un WhatsApp real */}
        <div className="flex items-center gap-2 bg-[#F0F2F5] px-2.5 py-2">
          <div className="flex h-7 flex-1 items-center rounded-full bg-white px-3 text-[11px] font-medium text-[#8696A0]">
            Escribe un mensaje
          </div>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00A884]">
            <Send size={12} className="text-white" />
          </div>
        </div>
      </div>

      {/* Lo que vende: el bot captura el cliente potencial solo */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="card-shadow absolute bottom-14 -left-8 hidden w-[212px] rounded-[14px] border border-line bg-white p-3.5 sm:block"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#E7F8F0] text-success">
            <UserRoundCheck size={15} />
          </div>
          <div className="text-[11.5px] font-extrabold uppercase tracking-[0.04em] text-success">
            {t.botLeadTitle}
          </div>
        </div>
        <div className="mt-2 text-[14px] font-extrabold text-navy">{t.botLeadName}</div>
        <div className="mt-0.5 text-[11.5px] font-medium leading-snug text-muted">
          {t.botLeadInterest}
        </div>
      </motion.div>
    </div>
  );
}
