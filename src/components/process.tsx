"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/lib/language-context";
import SectionHead from "./section-head";

export default function Process() {
  const { t } = useLanguage();
  const steps = t.steps;
  const last = steps.length - 1;

  return (
    <section id="proceso" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <SectionHead eyebrow={t.procEy} title={t.procTitle} centered />

        {/* Desktop: timeline horizontal con conector */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-16 hidden lg:grid lg:grid-cols-4 lg:gap-8"
        >
          {steps.map((step, i) => (
            <motion.div key={step.t} variants={fadeInUp} className="relative text-center">
              {i < last && (
                <div
                  aria-hidden="true"
                  className="absolute left-1/2 top-6 h-[2px] w-[calc(100%+2rem)] bg-line"
                />
              )}
              <div className="relative z-10 mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-extrabold text-white">
                {i + 1}
              </div>
              <div className="text-lg font-extrabold tracking-[-0.01em] text-navy">{step.t}</div>
              <div className="mx-auto mt-[9px] max-w-[230px] text-[14.5px] font-medium leading-relaxed text-muted">
                {step.d}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Móvil/tablet: timeline vertical */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 flex flex-col lg:hidden"
        >
          {steps.map((step, i) => (
            <motion.div key={step.t} variants={fadeInUp} className="flex gap-5">
              <div className="flex flex-col items-center">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-lg font-extrabold text-white">
                  {i + 1}
                </div>
                {i < last && <div aria-hidden="true" className="w-[2px] flex-1 bg-line" />}
              </div>
              <div className={i < last ? "pb-10 pt-1.5" : "pt-1.5"}>
                <div className="text-lg font-extrabold tracking-[-0.01em] text-navy">{step.t}</div>
                <div className="mt-[7px] text-[14.5px] font-medium leading-relaxed text-muted">
                  {step.d}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
