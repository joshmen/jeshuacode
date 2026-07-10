"use client";

import { useLanguage } from "@/lib/language-context";

const TECHS = [
  "React",
  "Next.js",
  ".NET",
  "Azure",
  "Google Cloud",
  "PostgreSQL",
  "React Native",
  "Stripe",
];

export default function Trust() {
  const { t } = useLanguage();
  return (
    <section className="border-b border-[#F0F1F4] bg-white py-11">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="text-center text-[13px] font-bold tracking-[0.04em] text-[#98A2B3]">
          {t.trustLab}
        </div>
        <div className="mt-[26px] flex flex-wrap items-center justify-center gap-x-11 gap-y-3.5">
          {TECHS.map((tech) => (
            <span
              key={tech}
              className="text-xl font-extrabold tracking-[-0.02em] text-[#98A2B3] transition-colors hover:text-muted"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
