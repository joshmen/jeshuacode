"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  sub?: string;
  centered?: boolean;
}

export default function SectionHead({ eyebrow, title, sub, centered }: SectionHeadProps) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={centered ? "mx-auto max-w-[700px] text-center" : "max-w-[600px]"}
    >
      <div className="text-[13px] font-extrabold uppercase tracking-[0.09em] text-accent">
        {eyebrow}
      </div>
      <h2 className="mt-[15px] text-[32px] font-extrabold leading-[1.08] tracking-[-0.028em] md:text-[46px]">
        {title}
      </h2>
      {sub && (
        <p className="mt-[19px] text-lg font-medium leading-relaxed text-muted">{sub}</p>
      )}
    </motion.div>
  );
}
