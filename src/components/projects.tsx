"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/lib/language-context";
import SectionHead from "./section-head";

const CARD_HOVER =
  "card-shadow transition-all duration-200 hover:-translate-y-1 hover:border-[#B9D2FF] hover:shadow-[0_14px_34px_rgba(0,97,254,.1)]";

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="proyectos" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <SectionHead eyebrow={t.projEy} title={t.projTitle} sub={t.projSub} centered />

        {/* Handy Sales: card destacada */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className={`mt-14 overflow-hidden rounded-2xl border border-line bg-white p-6 md:p-10 ${CARD_HOVER}`}
        >
          {/* Texto arriba (2 columnas) para dejarle TODO el ancho a la captura */}
          <div className="grid gap-5 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-12">
            <div>
              <div className="inline-flex items-center gap-[7px] rounded-full bg-[#E7F8F0] px-[13px] py-1.5 text-[12.5px] font-extrabold text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
                {t.featBadge}
              </div>
              <div className="mt-4 text-[28px] font-extrabold tracking-[-0.02em] text-navy md:text-[34px]">
                {t.featName}
              </div>
              <div className="mt-1 text-[15px] font-bold text-accent">{t.featTag}</div>
            </div>
            <div className="text-base font-medium leading-relaxed text-muted lg:max-w-[52ch] lg:justify-self-end lg:text-right">
              {t.featDesc}
            </div>
          </div>

          {/* Captura a TODO el ancho de la card: el panel es denso, encogido no se distingue.
              aspect 16/10 = ratio exacto de la imagen (2880x1800) -> sin recorte. */}
          <div className="relative mt-8 aspect-[16/10] w-full overflow-hidden rounded-2xl border border-line bg-[#F2F4F7]">
            <Image
              src="/images/real-handy-web.png"
              alt="Panel real de Handy Sales: ventas del dia, pedidos, visitas y cartera por cobrar"
              fill
              sizes="(max-width: 1024px) 100vw, 1120px"
              className="object-cover object-top"
            />
          </div>
        </motion.div>

        {/* Jeyma + Bots (producto propio, en vivo) + "Tu proyecto aquí" */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <motion.div
            variants={fadeInUp}
            className={`overflow-hidden rounded-2xl border border-line bg-white ${CARD_HOVER}`}
          >
            <div className="relative h-[196px] bg-[#F2F4F7]">
              <Image
                src="/images/jeyma-site.jpg"
                alt="Sitio de Productos Caseros Jeyma"
                fill
                className="object-cover"
              />
            </div>
            <div className="px-7 pb-[30px] pt-[26px]">
              <span className="inline-flex rounded-full bg-[#FEF0C7] px-[11px] py-[5px] text-xs font-extrabold text-[#B54708]">
                {t.proj2Badge}
              </span>
              <div className="mt-3.5 text-[21px] font-extrabold tracking-[-0.01em] text-navy">
                {t.proj2Name}
              </div>
              <div className="mt-[9px] text-[15px] font-medium leading-relaxed text-muted">
                {t.proj2Desc}
              </div>
            </div>
          </motion.div>

          {/* Bots con IA: producto propio, en vivo. Preview del chat real (mismos textos que el mockup grande). */}
          <motion.div
            variants={fadeInUp}
            className={`overflow-hidden rounded-2xl border border-line bg-white ${CARD_HOVER}`}
          >
            <div className="flex h-[196px] flex-col justify-center gap-1.5 bg-[#ECE5DD] px-5">
              <div className="max-w-[84%] self-end rounded-[9px] rounded-br-[3px] bg-[#D9FDD3] px-2.5 py-1.5 text-[11px] font-medium leading-snug text-[#111B21] shadow-[0_1px_1px_rgba(11,20,26,.13)]">
                {t.bm1}
              </div>
              <div className="max-w-[88%] self-start rounded-[9px] rounded-bl-[3px] bg-white px-2.5 py-1.5 text-[11px] font-medium leading-snug text-[#111B21] shadow-[0_1px_1px_rgba(11,20,26,.13)]">
                {t.bm4}
              </div>
            </div>
            <div className="px-7 pb-[30px] pt-[26px]">
              <span className="inline-flex items-center gap-[7px] rounded-full bg-[#E7F8F0] px-[11px] py-[5px] text-xs font-extrabold text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
                {t.proj4Badge}
              </span>
              <div className="mt-3.5 text-[21px] font-extrabold tracking-[-0.01em] text-navy">
                {t.proj4Name}
              </div>
              <div className="mt-[9px] text-[15px] font-medium leading-relaxed text-muted">
                {t.proj4Desc}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-start justify-center rounded-2xl border-2 border-dashed border-accent/30 bg-accent-light/40 p-[30px] transition-all duration-200 hover:-translate-y-1 hover:border-accent/60"
          >
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-accent">
              <Plus size={22} strokeWidth={2.2} />
            </div>
            <div className="text-2xl font-extrabold tracking-[-0.015em] text-navy">
              {t.proj3Name}
            </div>
            <div className="mb-[22px] mt-[11px] text-[15.5px] font-medium leading-relaxed text-muted">
              {t.proj3Desc}
            </div>
            <a
              href="#contacto"
              className="inline-flex items-center gap-[9px] whitespace-nowrap rounded-[11px] btn-primary px-[22px] py-[13px] text-[15px] font-bold leading-none transition-all hover:-translate-y-px"
            >
              {t.proj3Cta} →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
