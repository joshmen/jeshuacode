"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/lib/language-context";
import SectionHead from "./section-head";
import Decor from "./decor";

export default function SocialProof() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-surface py-20 md:py-28">
      <Decor variant="section" />
      <div className="relative mx-auto max-w-[1200px] px-5 md:px-10">
        <SectionHead eyebrow={t.proofEy} title={t.proofTitle} sub={t.proofSub} centered />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-14 grid max-w-[880px] grid-cols-2 gap-x-6 gap-y-10 text-center lg:grid-cols-4"
        >
          {t.proofStats.map((stat) => (
            <motion.div key={stat.label} variants={fadeInUp}>
              <div className="text-[44px] font-extrabold leading-none tracking-[-0.02em] text-accent">
                {stat.n}
              </div>
              <div className="mx-auto mt-[9px] max-w-[16ch] text-[14px] font-semibold leading-snug text-muted">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto mt-14 grid max-w-[980px] gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {t.proofFacts.map((fact) => (
            <motion.div
              key={fact}
              variants={fadeInUp}
              className="card-shadow flex items-center gap-[11px] rounded-[14px] border border-line bg-white px-[18px] py-4"
            >
              <BadgeCheck size={20} strokeWidth={2} className="shrink-0 text-accent" />
              <span className="text-[14.5px] font-semibold leading-snug text-foreground">
                {fact}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
