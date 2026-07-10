"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";

function CrmWindow() {
  const bars = [44, 60, 50, 78, 66, 92, 72, 100];
  const sideItems = ["Panel", "Pedidos", "Clientes", "Rutas", "Facturación", "Reportes"];

  return (
    <div className="w-[min(850px,94vw)] overflow-hidden rounded-t-[14px] bg-white text-foreground shadow-[0_-6px_90px_rgba(0,97,254,.3),0_40px_80px_rgba(0,0,0,.55)]">
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

function SidePhoto({ src, alt, side }: { src: string; alt: string; side: "left" | "right" }) {
  return (
    <div
      className={`absolute bottom-0 z-1 hidden h-[372px] w-[250px] overflow-hidden rounded-t-[14px] border border-b-0 border-white/14 xl:block ${
        side === "left" ? "left-0" : "right-0"
      }`}
    >
      <Image src={src} alt={alt} width={500} height={744} className="h-full w-full object-cover" />
    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="top" className="relative overflow-hidden bg-ink pt-[158px] text-white lg:h-[940px]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-4 mx-auto flex max-w-[880px] flex-col items-center gap-6 px-5 text-center md:px-10"
      >
        <h1 className="max-w-[15ch] text-[44px] font-extrabold leading-[1.02] tracking-[-0.03em] md:text-[74px]">
          {t.h1}
        </h1>
        <p className="max-w-[50ch] text-[17px] font-medium leading-normal text-white/60 md:text-[19px]">
          {t.sub}
        </p>
        <div className="mt-2 flex flex-wrap items-center justify-center gap-[22px]">
          <a
            href="#contacto"
            className="inline-flex items-center gap-[9px] whitespace-nowrap rounded-[11px] bg-accent px-7 py-4 text-base font-bold leading-none text-white transition-all hover:-translate-y-px hover:bg-accent-hover"
          >
            {t.cta1} →
          </a>
          <a
            href="#proyectos"
            className="inline-flex items-center gap-[7px] text-[15.5px] font-bold text-white underline decoration-2 underline-offset-[5px] hover:opacity-80"
          >
            {t.cta2} →
          </a>
        </div>
        <div className="text-[13px] font-medium text-white/40">{t.tiny}</div>
      </motion.div>

      <SidePhoto src="/images/hero-team.jpg" alt="Equipo de desarrollo trabajando" side="left" />
      <SidePhoto src="/images/hero-client.jpg" alt="Cliente usando la app" side="right" />

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-2 mx-auto mt-14 w-fit lg:absolute lg:bottom-[-42px] lg:left-1/2 lg:mt-0 lg:-translate-x-1/2"
      >
        <CrmWindow />
        <BotPhone />
      </motion.div>
    </section>
  );
}
