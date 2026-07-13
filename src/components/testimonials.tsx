"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/lib/language-context";
import SectionHead from "./section-head";

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <SectionHead eyebrow={t.tmEy} title={t.tmTitle} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid gap-6 md:grid-cols-2"
        >
          {t.tms.map((tm) => (
            <motion.div
              key={tm.ini}
              variants={fadeInUp}
              className="rounded-[20px] border border-line bg-surface p-9"
            >
              <div className="text-base tracking-[2px] text-[#FDB022]">★★★★★</div>
              <div className="mt-[18px] text-lg font-semibold leading-relaxed text-foreground">
                {tm.q}
              </div>
              <div className="mt-[26px] flex items-center gap-[13px]">
                <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-accent text-[15px] font-extrabold text-white">
                  {tm.ini}
                </div>
                <div>
                  <div className="text-[15px] font-extrabold">{tm.n}</div>
                  <div className="mt-0.5 text-[13px] text-faint">{tm.r}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
