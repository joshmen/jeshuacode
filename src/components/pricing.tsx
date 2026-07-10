"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/lib/language-context";
import SectionHead from "./section-head";

export default function Pricing() {
  const { t } = useLanguage();

  return (
    <section id="precios" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <SectionHead eyebrow={t.priceEy} title={t.priceTitle} sub={t.priceSub} centered />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-[58px] grid items-start gap-6 lg:grid-cols-3"
        >
          {t.plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={fadeInUp}
              className={`relative rounded-[22px] bg-white px-8 py-9 ${
                plan.popular
                  ? "border-2 border-accent shadow-[0_20px_48px_rgba(0,97,254,.16)]"
                  : "border border-line"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-accent px-[15px] py-[7px] text-xs font-extrabold tracking-[0.02em] text-white">
                  {t.popular}
                </div>
              )}
              <div className="text-[19px] font-extrabold">{plan.name}</div>
              <div className="mt-3.5 text-[42px] font-extrabold leading-none tracking-[-0.025em]">
                {plan.price}
              </div>
              <div className="mt-[7px] text-[13px] font-semibold text-faint">{plan.per}</div>
              <ul className="mt-7 flex flex-col gap-[13px]">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-[11px] text-[14.5px] font-medium leading-snug text-[#344054]"
                  >
                    <Check size={19} strokeWidth={2.4} className="mt-px shrink-0 text-success" />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                href="#contacto"
                className="mt-[30px] inline-flex w-full items-center justify-center whitespace-nowrap rounded-[11px] bg-accent px-[22px] py-[13px] text-[15px] font-bold leading-none text-white transition-all hover:-translate-y-px hover:bg-accent-hover"
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-8 text-center text-sm font-medium text-faint">{t.priceNote}</div>
      </div>
    </section>
  );
}
