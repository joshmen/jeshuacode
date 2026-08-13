"use client";

/**
 * legal-layout.tsx: armazon compartido de /privacidad y /terminos.
 *
 * Estas paginas viven fuera del LanguageProvider de la landing (page.tsx lo monta solo
 * alrededor de Home, no en el layout raiz), asi que traen su propio estado de idioma local
 * en vez de depender del contexto global. Es deliberado: mantiene estas dos paginas legales
 * autocontenidas y no obliga a meter textos legales en el diccionario compartido de i18n.ts.
 */

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export type LegalLang = "es" | "en";

const HEADER_TXT: Record<LegalLang, { back: string }> = {
  es: { back: "Inicio" },
  en: { back: "Home" },
};

const FOOTER_TXT: Record<
  LegalLang,
  { legalName: string; rights: string; privacy: string; terms: string }
> = {
  es: {
    legalName: "Jeshua Software es un nombre comercial de Josué Mendoza Segovia.",
    rights: "© 2026 Jeshua Software. Todos los derechos reservados.",
    privacy: "Privacidad",
    terms: "Términos",
  },
  en: {
    legalName: "Jeshua Software is a trade name of Josué Mendoza Segovia.",
    rights: "© 2026 Jeshua Software. All rights reserved.",
    privacy: "Privacy",
    terms: "Terms",
  },
};

function LangToggle({ lang, setLang }: { lang: LegalLang; setLang: (l: LegalLang) => void }) {
  return (
    <div className="flex overflow-hidden rounded-[9px] border border-[#D0D5DD]">
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          className={`px-[11px] py-1.5 text-[12.5px] font-bold uppercase transition-all ${
            lang === l ? "bg-accent text-white" : "text-foreground opacity-65 hover:opacity-100"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function LegalLayout({
  children,
}: {
  children: (lang: LegalLang) => ReactNode;
}) {
  const [lang, setLang] = useState<LegalLang>("es");
  const h = HEADER_TXT[lang];
  const f = FOOTER_TXT[lang];

  return (
    <div className="min-h-screen bg-white">
      <header className="flex h-[74px] items-center gap-6 border-b border-line px-5 md:px-10">
        <Link href="/" className="flex shrink-0 items-center">
          <img src="/images/jeshua-logo-dark.png" alt="Jeshua Software" className="h-9 w-auto" />
        </Link>
        <div className="ml-auto flex items-center gap-5">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={16} />
            {h.back}
          </Link>
          <LangToggle lang={lang} setLang={setLang} />
        </div>
      </header>

      <main className="mx-auto max-w-[820px] px-5 py-16 md:px-10 md:py-20">{children(lang)}</main>

      <footer className="bg-ink px-5 py-10 text-white md:px-10">
        <div className="mx-auto flex max-w-[820px] flex-col gap-4 text-center md:flex-row md:items-center md:justify-between md:text-left">
          <div className="text-[13.5px] font-medium text-white/50">{f.rights}</div>
          <div className="flex items-center justify-center gap-5 text-[13.5px] font-semibold text-white/70 md:justify-end">
            <Link href="/privacidad" className="hover:text-white">
              {f.privacy}
            </Link>
            <Link href="/terminos" className="hover:text-white">
              {f.terms}
            </Link>
          </div>
        </div>
        <div className="mx-auto mt-4 max-w-[820px] text-center text-[11px] font-normal leading-relaxed text-white/30 md:text-left">
          {f.legalName}
        </div>
      </footer>
    </div>
  );
}

export function LegalHeading({
  eyebrow,
  title,
  updated,
}: {
  eyebrow: string;
  title: string;
  updated: string;
}) {
  return (
    <div className="max-w-[640px]">
      <div className="text-[13px] font-extrabold uppercase tracking-[0.09em] text-accent">
        {eyebrow}
      </div>
      <h1 className="mt-[15px] text-[32px] font-extrabold leading-[1.08] tracking-[-0.028em] md:text-[42px]">
        {title}
      </h1>
      <p className="mt-4 text-[14.5px] font-medium text-faint">{updated}</p>
    </div>
  );
}

export interface LegalSectionData {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export function LegalSection({ heading, paragraphs, bullets }: LegalSectionData) {
  return (
    <section className="mt-10 border-t border-line pt-10 first:mt-14 first:border-t-0 first:pt-0">
      <h2 className="text-[19px] font-extrabold tracking-[-0.01em] text-foreground md:text-[21px]">
        {heading}
      </h2>
      {paragraphs?.map((p, i) => (
        <p key={i} className="mt-3 text-[15.5px] leading-relaxed text-muted">
          {p}
        </p>
      ))}
      {bullets && bullets.length > 0 && (
        <ul className="mt-3 list-disc space-y-2 pl-5 text-[15.5px] leading-relaxed text-muted">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
