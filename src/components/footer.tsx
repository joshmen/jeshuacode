"use client";

import { Linkedin, Github } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function Footer() {
  const { t } = useLanguage();

  const socials = [
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "https://github.com/joshmen", label: "GitHub" },
  ];

  return (
    <footer className="bg-ink pb-10 pt-[76px] text-white">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1.7fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="inline-flex items-center">
              <img src="/images/jeshua-logo-white.png" alt="Jeshua Software" className="h-10 w-auto" />
            </a>
            <div className="mt-4 max-w-[30ch] text-[14.5px] font-medium leading-relaxed text-white/55">
              {t.footTag}
            </div>
          </div>

          <div>
            <div className="text-[13px] font-extrabold uppercase tracking-[0.06em] text-white/50">
              {t.navServ}
            </div>
            <ul className="mt-[18px] flex flex-col gap-3">
              {[t.svc1t, t.svc2t, t.svc3t, t.svc6t].map((s) => (
                <li key={s}>
                  <a href="#servicios" className="text-[14.5px] font-medium text-white/82 hover:text-white">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[13px] font-extrabold uppercase tracking-[0.06em] text-white/50">
              {t.footComp}
            </div>
            <ul className="mt-[18px] flex flex-col gap-3">
              {[
                { href: "#proceso", label: t.navProc },
                { href: "#proyectos", label: t.navProy },
                { href: "#precios", label: t.navPre },
                { href: "#contacto", label: t.navCont },
              ].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-[14.5px] font-medium text-white/82 hover:text-white">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="text-[13px] font-extrabold uppercase tracking-[0.06em] text-white/50">
              {t.footLegal}
            </div>
            <ul className="mt-[18px] flex flex-col gap-3">
              <li>
                <a href="#" className="text-[14.5px] font-medium text-white/82 hover:text-white">
                  {t.footPriv}
                </a>
              </li>
              <li>
                <a href="#" className="text-[14.5px] font-medium text-white/82 hover:text-white">
                  {t.footTerms}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-[60px] flex flex-wrap items-center justify-between gap-5 border-t border-white/10 pt-7">
          <div className="text-[13.5px] font-medium text-white/50">{t.footRights}</div>
          <div className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-white/8 text-white transition-all hover:bg-accent"
              >
                <s.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
