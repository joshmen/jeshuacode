"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { fbqTrack } from "@/lib/fbq";
import Decor from "./decor";

function CrmWindow() {
  const bars = [44, 60, 50, 78, 66, 92, 72, 100];
  const sideItems = ["Panel", "Pedidos", "Clientes", "Rutas", "Facturación", "Reportes"];

  return (
    <div className="w-full overflow-hidden rounded-t-[14px] bg-white text-foreground shadow-[0_-6px_90px_rgba(0,97,254,.3),0_40px_80px_rgba(0,0,0,.55)]">
      <div className="flex h-11 items-center gap-2 border-b border-[#ECEEF2] bg-[#F7F8FA] px-4">
        <span className="h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
        <span className="h-[11px] w-[11px] rounded-full bg-[#28c840]" />
        <div className="ml-4 flex h-[27px] max-w-[360px] flex-1 items-center rounded-lg border border-[#E4E7EC] bg-white px-3 text-xs font-medium text-[#98A2B3]">
          Buscar pedidos, clientes, rutas…
        </div>
      </div>
      <div className="flex h-[298px]">
        <div className="hidden w-[198px] flex-col gap-1 border-r border-[#EFF1F4] bg-[#FBFBFC] px-3 py-4 sm:flex">
          {sideItems.map((item, i) => (
            <div
              key={item}
              className={`flex h-[34px] items-center gap-[11px] rounded-lg px-3 text-[13px] font-semibold ${
                i === 0 ? "bg-accent-light text-accent" : "text-faint"
              }`}
            >
              <span className={`h-4 w-4 rounded-[5px] ${i === 0 ? "bg-accent" : "bg-[#D0D5DD]"}`} />
              {item}
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-4 p-5">
          <div className="flex items-center justify-between">
            <div className="text-[17px] font-extrabold tracking-[-0.01em]">Panel de ventas</div>
            <div className="rounded-[7px] bg-accent-light px-[11px] py-[5px] text-[11px] font-bold text-accent">
              En vivo
            </div>
          </div>
          <div className="flex gap-3.5">
            {[
              { l: "Ventas del mes", v: "$248K", d: "▲ 12% vs. mes anterior" },
              { l: "Pedidos", v: "1,204", d: "▲ 8%" },
              { l: "Clientes activos", v: "863", d: "▲ 5%" },
            ].map((c) => (
              <div key={c.l} className="flex-1 rounded-xl border border-line px-4 py-3.5">
                <div className="text-[11.5px] font-semibold text-faint">{c.l}</div>
                <div className="mt-1.5 text-[25px] font-extrabold tracking-[-0.015em]">{c.v}</div>
                <div className="mt-[5px] text-[11.5px] font-bold text-success">{c.d}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-1 items-end gap-3.5 rounded-xl border border-line px-[18px] pb-4 pt-[18px]">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md bg-gradient-to-b from-[#4D94FF] to-accent"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BotPhone() {
  const { t } = useLanguage();
  return (
    <div className="absolute -right-[116px] bottom-[22px] z-3 hidden w-[230px] overflow-hidden rounded-[34px] border-7 border-[#101010] bg-white shadow-[0_40px_80px_rgba(0,0,0,.55)] xl:block">
      <div className="flex items-center gap-2.5 bg-accent px-[15px] pb-[13px] pt-4 text-white">
        <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/22 text-[13px] font-extrabold">
          JS
        </div>
        <div>
          <div className="text-[13.5px] font-extrabold leading-tight">{t.botName}</div>
          <div className="mt-0.5 flex items-center gap-[5px] text-[11px] font-semibold opacity-90">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
            {t.botStat}
          </div>
        </div>
      </div>
      <div className="flex h-[184px] flex-col gap-2 bg-[#F2F4F7] px-3 py-3.5">
        <div className="max-w-[82%] self-start rounded-[13px] rounded-bl-[4px] bg-white px-[11px] py-2 text-xs font-medium leading-snug text-foreground shadow-[0_1px_2px_rgba(16,24,40,.06)]">
          {t.bm1}
        </div>
        <div className="max-w-[82%] self-end rounded-[13px] rounded-br-[4px] bg-accent px-[11px] py-2 text-xs font-medium leading-snug text-white">
          {t.bm2}
        </div>
        <div className="max-w-[82%] self-start rounded-[13px] rounded-bl-[4px] bg-white px-[11px] py-2 text-xs font-medium leading-snug text-foreground shadow-[0_1px_2px_rgba(16,24,40,.06)]">
          {t.bm3}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
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
    const email = String(data.get("email") ?? "").trim();
    const eventId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : String(Date.now());
    const payload = {
      name: email.split("@")[0] || email,
      email,
      message: "Lead desde el hero (dejo su correo)",
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
    <section id="top" className="relative overflow-hidden bg-white pt-[158px] pb-20 text-foreground lg:pb-28">
      <div className="relative z-10 mx-auto grid max-w-[1200px] gap-14 px-5 md:px-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left"
        >
          <h1 className="max-w-[15ch] text-[38px] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[52px] lg:text-[56px]">
            {t.h1}
          </h1>
          <p className="max-w-[46ch] text-[17px] font-medium leading-normal text-muted md:text-[19px]">
            {t.sub}
          </p>

          {sent ? (
            <div className="mx-auto w-full max-w-[440px] rounded-[11px] border border-[#A6F0C6] bg-[#E7F8F0] px-5 py-4 text-[15px] font-semibold text-[#05603A] lg:mx-0">
              {t.heroSent}
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mx-auto flex w-full max-w-[440px] flex-col gap-3 sm:flex-row lg:mx-0"
            >
              {/* Honeypot anti-bot: invisible para humanos, tentador para bots. No tocar. */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-[9999px] h-0 w-0 overflow-hidden opacity-0"
              >
                <label htmlFor="hero-website">No llenar este campo</label>
                <input
                  id="hero-website"
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <input
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder={t.heroEmailPh}
                className="w-full flex-1 rounded-[11px] border border-[#D0D5DD] bg-white px-[15px] py-[13px] text-[15px] font-medium text-foreground placeholder:text-faint focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent/20"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-[9px] whitespace-nowrap rounded-[11px] btn-primary px-7 py-[13px] text-base font-bold leading-none transition-all hover:-translate-y-px"
              >
                {t.heroEmailCta} →
              </button>
            </form>
          )}

          <div className="text-[13px] font-medium text-faint">{t.tiny}</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[560px] lg:mx-0"
        >
          <Decor variant="hero" />
          <div className="relative z-10">
            <CrmWindow />
            <BotPhone />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
