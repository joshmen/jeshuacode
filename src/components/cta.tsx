"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/animations";
import { useLanguage } from "@/lib/language-context";
import { WHATSAPP_URL } from "@/lib/i18n";

export default function Cta() {
  const { t } = useLanguage();

  return (
    <section className="bg-ink py-20 text-white md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mx-auto max-w-[740px] text-center"
        >
          <h2 className="text-[36px] font-extrabold leading-[1.05] tracking-[-0.03em] md:text-[52px]">
            {t.ctaTitle}
          </h2>
          <p className="mt-5 text-[19px] font-medium leading-normal text-white/62">{t.ctaSub}</p>
          <div className="mt-[38px] flex flex-wrap justify-center gap-4">
            <a
              href="#contacto"
              className="inline-flex items-center gap-[9px] whitespace-nowrap rounded-[11px] bg-accent px-7 py-4 text-base font-bold leading-none text-white transition-all hover:-translate-y-px hover:bg-accent-hover"
            >
              {t.ctaBtn} →
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center whitespace-nowrap rounded-[11px] border border-white/22 bg-white/8 px-7 py-4 text-base font-bold leading-none text-white transition-all hover:bg-white/14"
            >
              {t.ctaWa}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
