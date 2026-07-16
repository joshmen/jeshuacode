"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/lib/language-context";
import { WHATSAPP_URL } from "@/lib/i18n";
import { fbqTrack } from "@/lib/fbq";
import SectionHead from "./section-head";
import Decor from "./decor";

const inputCls =
  "w-full rounded-[11px] border border-[#D0D5DD] bg-white px-[15px] py-[13px] text-[15px] text-foreground focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent/12";

export default function Contact() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);
  // Momento en que el formulario quedó listo para el usuario (anti-bot: time-trap).
  const loadedAt = useRef(0);
  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const eventId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : String(Date.now());
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      message: String(data.get("message") ?? ""),
      // Honeypot: campo invisible; si viene lleno, lo llenó un bot.
      website: String(data.get("website") ?? ""),
      // Cuánto tardó en enviar desde que cargó (ms); los bots envían casi al instante.
      elapsed_ms: loadedAt.current ? Date.now() - loadedAt.current : 99999,
      event_id: eventId,
    };
    setSent(true);
    fbqTrack("Lead", {}, { eventID: eventId });
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // el usuario ya vio confirmación; el lead viaja best-effort
    }
  };

  return (
    <section id="contacto" className="relative overflow-hidden bg-white py-20 md:py-28">
      <Decor variant="section" />
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-10">
        <SectionHead eyebrow={t.contEy} title={t.contTitle} sub={t.contSub} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid items-stretch gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-10"
        >
          <motion.div
            variants={fadeInUp}
            className="rounded-[20px] border border-line bg-white p-7 shadow-[0_20px_48px_rgba(16,24,40,.06)] md:p-9"
          >
            {sent ? (
              <div className="flex h-full min-h-[320px] items-center rounded-[14px] border border-[#A6F0C6] bg-[#E7F8F0] p-6 text-base font-semibold text-[#05603A]">
                {t.fSent}
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                {/* Honeypot anti-bot: invisible para humanos, tentador para bots. No tocar. */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
                >
                  <label htmlFor="website">No llenar este campo</label>
                  <input
                    id="website"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="mb-[18px] sm:mb-0">
                    <label className="mb-[7px] block text-[13px] font-bold text-[#344054]">
                      {t.fName}
                    </label>
                    <input className={inputCls} type="text" name="name" required />
                  </div>
                  <div>
                    <label className="mb-[7px] block text-[13px] font-bold text-[#344054]">
                      {t.fEmail}
                    </label>
                    <input className={inputCls} type="email" name="email" required />
                  </div>
                </div>
                <div className="mt-[18px]">
                  <label className="mb-[7px] block text-[13px] font-bold text-[#344054]">
                    {t.fCompany}
                  </label>
                  <input className={inputCls} type="text" name="company" />
                </div>
                <div className="mt-[18px]">
                  <label className="mb-[7px] block text-[13px] font-bold text-[#344054]">
                    {t.fMsg}
                  </label>
                  <textarea className={`${inputCls} min-h-[130px] resize-y`} name="message" required />
                </div>
                <button
                  type="submit"
                  className="mt-[18px] inline-flex w-full items-center justify-center whitespace-nowrap rounded-[11px] btn-primary px-7 py-4 text-base font-bold leading-none transition-all hover:-translate-y-px"
                >
                  {t.fSend}
                </button>
              </form>
            )}
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col justify-center rounded-[20px] border border-line bg-surface p-7 md:p-9"
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => fbqTrack("Contact")}
              className="card-shadow group flex items-center gap-[15px] rounded-[14px] border border-line bg-white p-5 transition-all hover:border-[#B9D2FF] hover:bg-[#F8FAFF]"
            >
              <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent">
                <MessageCircle size={24} strokeWidth={1.8} />
              </div>
              <div className="flex-1">
                <div className="text-xs font-bold uppercase tracking-[0.03em] text-faint">
                  {t.methodWa}
                </div>
                <div className="mt-[3px] text-lg font-extrabold text-foreground">
                  +52 668 139 6431
                </div>
              </div>
              <ArrowUpRight
                size={20}
                strokeWidth={2}
                className="shrink-0 text-faint transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
              />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
