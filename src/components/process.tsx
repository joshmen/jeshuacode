"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/lib/language-context";
import SectionHead from "./section-head";

export default function Process() {
  const { t } = useLanguage();

  return (
    <section id="proceso" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <SectionHead eyebrow={t.procEy} title={t.procTitle} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid gap-[26px] sm:grid-cols-2 lg:grid-cols-4"
        >
          {t.steps.map((step, i) => (
            <motion.div key={step.t} variants={fadeInUp}>
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-[13px] bg-ink text-xl font-extrabold text-white">
                {i + 1}
              </div>
              <div className="text-lg font-extrabold tracking-[-0.01em]">{step.t}</div>
              <div className="mt-[9px] text-[14.5px] font-medium leading-relaxed text-muted">
                {step.d}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
