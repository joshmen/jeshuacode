"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import SectionHead from "./section-head";

export default function Faq() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <SectionHead eyebrow={t.faqEy} title={t.faqTitle} centered />
        <div className="mx-auto mt-14 max-w-[760px]">
          {t.faqs.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div key={faq.q} className="border-b border-line">
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-5 py-[27px] text-left text-base font-bold text-foreground md:text-lg"
                >
                  {faq.q}
                  <ChevronDown
                    size={22}
                    strokeWidth={2.4}
                    aria-hidden="true"
                    className={`shrink-0 text-accent transition-transform duration-300 ${
                      open ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="max-w-[92%] pb-[27px] text-base font-medium leading-[1.62] text-muted">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
