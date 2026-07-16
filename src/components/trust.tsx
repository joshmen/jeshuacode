"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { fadeInUp, staggerContainer } from "@/lib/animations";

const TECHS = [
  "React",
  "Next.js",
  ".NET",
  "React Native",
  "PostgreSQL",
  "Azure",
  "Google Cloud",
  "Stripe",
];

export default function Trust() {
  const { t } = useLanguage();
  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="text-center text-[13px] font-extrabold uppercase tracking-[0.09em] text-accent"
        >
          {t.techTitle}
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {TECHS.map((tech) => (
            <motion.span
              key={tech}
              variants={fadeInUp}
              className="rounded-full border border-line bg-white px-5 py-2.5 text-sm font-bold text-muted transition-colors hover:border-accent/40 hover:text-accent"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
