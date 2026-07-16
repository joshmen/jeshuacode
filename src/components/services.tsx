"use client";

import { motion } from "framer-motion";
import { Globe, Bot, Smartphone, Server, Compass, Cloud } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { useLanguage } from "@/lib/language-context";
import SectionHead from "./section-head";

const ICONS = [Globe, Bot, Smartphone, Server, Compass, Cloud];

export default function Services() {
  const { t } = useLanguage();

  const cards = [
    { title: t.svc1t, desc: t.svc1d },
    { title: t.svc2t, desc: t.svc2d },
    { title: t.svc3t, desc: t.svc3d },
    { title: t.svc4t, desc: t.svc4d },
    { title: t.svc5t, desc: t.svc5d },
    { title: t.svc6t, desc: t.svc6d },
  ];

  return (
    <section id="servicios" className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <SectionHead eyebrow={t.servEy} title={t.servTitle} sub={t.servSub} centered />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {cards.map((card, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={card.title}
                variants={fadeInUp}
                className="card-shadow rounded-[14px] border border-line bg-white px-[30px] py-8 transition-all duration-200 hover:-translate-y-1 hover:border-[#B9D2FF] hover:shadow-[0_14px_34px_rgba(0,97,254,.1)]"
              >
                <div className="mb-[22px] flex h-[52px] w-[52px] items-center justify-center rounded-[13px] bg-accent-light text-accent">
                  <Icon size={26} strokeWidth={1.8} />
                </div>
                <div className="text-xl font-extrabold tracking-[-0.01em]">{card.title}</div>
                <div className="mt-2.5 text-[15px] font-medium leading-relaxed text-muted">
                  {card.desc}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
