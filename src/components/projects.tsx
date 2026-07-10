"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/lib/language-context";
import SectionHead from "./section-head";

const FEAT_TAGS = ["React Native", ".NET 9", "PostgreSQL", "Stripe Connect", "Azure"];

export default function Projects() {
  const { t } = useLanguage();

  return (
    <section id="proyectos" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <SectionHead eyebrow={t.projEy} title={t.projTitle} sub={t.projSub} />

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-13 grid items-center gap-11 rounded-3xl border border-line bg-white p-6 md:p-11 lg:grid-cols-[1fr_1.05fr]"
        >
          <div>
            <div className="inline-flex items-center gap-[7px] rounded-full bg-[#E7F8F0] px-[13px] py-1.5 text-[12.5px] font-extrabold text-success">
              <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
              {t.featBadge}
            </div>
            <div className="mt-4 text-[28px] font-extrabold tracking-[-0.02em] md:text-[34px]">
              {t.featName}
            </div>
            <div className="mt-1 text-[15px] font-bold text-accent">{t.featTag}</div>
            <div className="mt-4 text-base font-medium leading-relaxed text-muted">
              {t.featDesc}
            </div>
            <div className="mt-6 flex flex-wrap gap-[9px]">
              {FEAT_TAGS.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg border border-line bg-[#F2F4F7] px-3 py-1.5 text-[12.5px] font-bold text-[#344054]"
                >
                  {tag}
                </span>
              ))}
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

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-6 grid gap-6 md:grid-cols-2"
        >
          <motion.div
            variants={fadeInUp}
            className="overflow-hidden rounded-[20px] border border-line bg-white transition-all duration-200 hover:border-[#B9D2FF] hover:shadow-[0_14px_34px_rgba(0,97,254,.09)]"
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
              <div className="mt-3.5 text-[21px] font-extrabold tracking-[-0.01em]">
                {t.proj2Name}
              </div>
              <div className="mt-[9px] text-[15px] font-medium leading-relaxed text-muted">
                {t.proj2Desc}
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col items-start justify-center rounded-[20px] bg-gradient-to-br from-accent to-[#0043B3] p-[38px] text-white"
          >
            <div className="text-2xl font-extrabold tracking-[-0.015em]">{t.proj3Name}</div>
            <div className="mb-[22px] mt-[11px] text-[15.5px] font-medium leading-relaxed text-white/85">
              {t.proj3Desc}
            </div>
            <a
              href="#contacto"
              className="inline-flex items-center gap-[9px] whitespace-nowrap rounded-[11px] bg-white px-[22px] py-[13px] text-[15px] font-bold leading-none text-ink transition-all hover:bg-accent-light"
            >
              {t.proj3Cta} →
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
