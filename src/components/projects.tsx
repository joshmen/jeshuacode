"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/lib/language-context";
import SectionHead from "./section-head";

const CARD_HOVER =
  "transition-all duration-200 hover:-translate-y-1 hover:border-[#B9D2FF] hover:shadow-[0_14px_34px_rgba(0,97,254,.1)]";

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
          className={`mt-14 grid items-center gap-8 overflow-hidden rounded-2xl border border-line bg-white p-6 md:p-10 lg:grid-cols-[1fr_1.05fr] ${CARD_HOVER}`}
        >
          <div>
            <div className="inline-flex items-center gap-[7px] rounded-full bg-[#E7F8F0] px-[13px] py-1.5 text-[12.5px] font-extrabold text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
              {t.featBadge}
            </div>
            <div className="mt-4 text-[28px] font-extrabold tracking-[-0.02em] text-navy md:text-[34px]">
              {t.featName}
            </div>
            <div className="mt-1 text-[15px] font-bold text-accent">{t.featTag}</div>
            <div className="mt-4 text-base font-medium leading-relaxed text-muted">
              {t.featDesc}
            </div>
          </div>
          <div className="relative h-[240px] overflow-hidden rounded-2xl bg-[#F2F4F7] md:h-[346px]">
            <Image
              src="/images/handysales-crm.jpg"
              alt="Dashboard de Handy Sales CRM"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Jeyma + "Tu proyecto aquí" */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-6 grid gap-6 md:grid-cols-2"
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
