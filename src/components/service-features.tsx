"use client";

import { motion } from "framer-motion";
import { Check, Globe, Bot, Server, type LucideIcon } from "lucide-react";
import { fadeInUp } from "@/lib/animations";
import { useLanguage } from "@/lib/language-context";
import type { Feature } from "@/lib/i18n";
import SectionHead from "./section-head";
import Decor from "./decor";
import BotChat from "./bot-chat";

const ICONS: LucideIcon[] = [Globe, Bot, Server];

function ServiceFeature({
  data,
  flip,
  icon: Icon,
  media,
}: {
  data: Feature;
  flip: boolean;
  icon: LucideIcon;
  /** Mockup real del servicio; si no hay, cae al marco con icono. */
  media?: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="grid items-center gap-11 md:grid-cols-2 md:gap-16"
    >
      <div className={flip ? "md:order-2" : ""}>
        <div className="text-[13px] font-extrabold uppercase tracking-[0.09em] text-accent">
          {data.eyebrow}
        </div>
        <h3 className="mt-[15px] text-[28px] font-extrabold leading-[1.1] tracking-[-0.02em] text-navy md:text-[36px]">
          {data.title}
        </h3>
        <p className="mt-4 text-base font-medium leading-relaxed text-muted md:text-lg">
          {data.desc}
        </p>
        <ul className="mt-7 flex flex-col gap-3.5">
          {data.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-3 text-[15px] font-semibold text-foreground"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-light text-accent">
                <Check size={13} strokeWidth={3} />
              </span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      <div className={flip ? "md:order-1" : ""}>
        {media ? (
          // el mockup trae su propio marco; el padding deja aire para la tarjeta del lead
          <div className="px-2 py-6 sm:px-8">{media}</div>
        ) : (
          <div className="relative flex h-[280px] items-center justify-center overflow-hidden rounded-[24px] bg-accent-light shadow-[0_20px_60px_rgba(66,133,244,.14)] md:h-[360px]">
            <Decor variant="section" />
            <Icon size={96} strokeWidth={1.3} className="relative z-1 text-accent" />
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function ServiceFeatures() {
  const { t } = useLanguage();

  return (
    <section id="servicios-estrella" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <SectionHead eyebrow={t.featsEy} title={t.featsTitle} centered />
        <div className="mt-16 flex flex-col gap-20 md:mt-20 md:gap-28">
          {t.feats.map((feature, i) => (
            <ServiceFeature
              key={feature.title}
              data={feature}
              flip={i % 2 === 1}
              icon={ICONS[i] ?? Globe}
              // El servicio de bots se muestra con el bot real en accion (i = 1)
              media={i === 1 ? <BotChat /> : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
