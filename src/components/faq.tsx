"use client";

import { useState } from "react";
import { useLanguage } from "@/lib/language-context";
import SectionHead from "./section-head";

export default function Faq() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <SectionHead eyebrow={t.faqEy} title={t.faqTitle} centered />
        <div className="mx-auto mt-14 max-w-[820px]">
          {t.faqs.map((faq, i) => {
            const open = openFaq === i;
            return (
              <div key={faq.q} className="border-b border-line">
                <button
                  onClick={() => setOpenFaq(open ? -1 : i)}
                  className="flex w-full items-center justify-between gap-5 py-[27px] text-left text-base font-bold text-foreground md:text-lg"
                >
                  {faq.q}
                  <span className="shrink-0 text-[26px] font-normal leading-none text-accent">
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open && (
                  <div className="max-w-[92%] pb-[27px] text-base font-medium leading-[1.62] text-muted">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
