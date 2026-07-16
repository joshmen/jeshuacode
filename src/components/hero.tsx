"use client";

import { useState, useRef, useEffect, type FormEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { fbqTrack } from "@/lib/fbq";
import Decor from "./decor";

/** Captura REAL del panel de Handy Sales (proyecto en produccion) en un marco de navegador. */
function CrmWindow() {
  return (
    <div className="w-full overflow-hidden rounded-[14px] bg-white shadow-[0_-6px_90px_rgba(21,155,215,.18),0_30px_70px_rgba(16,24,40,.22)]">
      <div className="flex h-10 items-center gap-2 border-b border-[#ECEEF2] bg-[#F7F8FA] px-4">
        <span className="h-[10px] w-[10px] rounded-full bg-[#ff5f57]" />
        <span className="h-[10px] w-[10px] rounded-full bg-[#febc2e]" />
        <span className="h-[10px] w-[10px] rounded-full bg-[#28c840]" />
        <div className="ml-3 hidden h-[24px] max-w-[320px] flex-1 items-center rounded-md border border-[#E4E7EC] bg-white px-3 text-[11px] font-medium text-[#98A2B3] sm:flex">
          app.handysuites.mx/dashboard
        </div>
      </div>
      <Image
        src="/images/real-handy-web.png"
        alt="Panel de Handy Sales: ventas del dia, pedidos, visitas y clientes activos"
        width={1440}
        height={900}
        priority
        className="block w-full"
      />
    </div>
  );
}

/** Captura REAL de la app movil de Handy Sales (emulador) en un marco de telefono. */
function PhoneMock() {
  return (
    <div className="absolute -bottom-10 -right-4 z-3 hidden w-[150px] overflow-hidden rounded-[24px] border-[6px] border-[#0F1115] bg-[#0F1115] shadow-[0_30px_60px_rgba(16,24,40,.45)] md:block lg:w-[172px]">
      <Image
        src="/images/real-handy-movil.png"
        alt="App movil de Handy Sales: visitas del dia, pedidos y ventas del vendedor"
        width={646}
        height={1400}
        className="block w-full rounded-[18px]"
      />
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
      {/* El panel es denso: se le da mas ancho que al texto y se deja sobresalir a la
          derecha (la seccion recorta), para que los KPIs se distingan de verdad. */}
      <div className="relative z-10 mx-auto grid max-w-[1200px] gap-14 px-5 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-12">
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
                className="field-shadow w-full flex-1 rounded-[11px] border border-[#D0D5DD] bg-white px-[15px] py-[13px] text-[15px] font-medium text-foreground placeholder:text-faint focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent/20"
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
          className="relative mx-auto w-full max-w-[560px] lg:mx-0 lg:w-[128%] lg:max-w-none"
        >
          <Decor variant="hero" />
          <div className="relative z-10">
            <CrmWindow />
            <PhoneMock />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
