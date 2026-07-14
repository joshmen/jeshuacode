"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

function Brand({ light }: { light: boolean }) {
  return (
    <a href="#top" className="flex shrink-0 items-center">
      <img
        src={light ? "/images/jeshua-logo-dark.png" : "/images/jeshua-logo-white.png"}
        alt="Jeshua Software"
        className="h-9 w-auto"
      />
    </a>
  );
}

function LangToggle({ dark }: { dark: boolean }) {
  const { lang, setLang } = useLanguage();
  return (
    <div
      className={`flex overflow-hidden rounded-[9px] border ${
        dark ? "border-white/30" : "border-[#D0D5DD]"
      }`}
    >
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-[11px] py-1.5 text-[12.5px] font-bold uppercase transition-all ${
            lang === l ? "bg-accent text-white" : "text-inherit opacity-65 hover:opacity-100"
          }`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function Nav() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#servicios", label: t.navServ },
    { href: "#proceso", label: t.navProc },
    { href: "#proyectos", label: t.navProy },
    { href: "#precios", label: t.navPre },
  ];

  const light = scrolled || open;

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-100 flex items-center gap-[34px] px-5 transition-all duration-250 md:px-10 ${
        light
          ? "h-[66px] bg-white/88 text-foreground shadow-[0_1px_0_#EAECF0] backdrop-blur-[14px]"
          : "h-[74px] bg-transparent text-white"
      }`}
    >
      <Brand light={light} />

      <div className="hidden gap-7 text-[15px] font-semibold lg:flex">
        {links.map((l) => (
          <a key={l.href} href={l.href} className="opacity-80 transition-opacity hover:text-accent hover:opacity-100">
            {l.label}
          </a>
        ))}
      </div>

      <div className="ml-auto hidden items-center gap-[18px] lg:flex">
        <LangToggle dark={!light} />
        <a href="#contacto" className="text-[15px] font-semibold opacity-80 hover:opacity-100">
          {t.navCont}
        </a>
        <a
          href="#contacto"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-[11px] btn-primary px-[22px] py-[13px] text-[15px] font-bold leading-none transition-all hover:-translate-y-px"
        >
          {t.navCta}
        </a>
      </div>

      <button
        className="ml-auto p-2 lg:hidden"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="absolute inset-x-0 top-full flex flex-col gap-1 border-b border-line bg-white px-5 pb-6 pt-2 text-foreground shadow-lg lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-[15px] font-semibold hover:bg-surface"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contacto"
            onClick={() => setOpen(false)}
            className="rounded-lg px-3 py-3 text-[15px] font-semibold hover:bg-surface"
          >
            {t.navCont}
          </a>
          <div className="mt-2 flex items-center gap-4 px-3">
            <LangToggle dark={false} />
            <a
              href="#contacto"
              onClick={() => setOpen(false)}
              className="inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-[11px] btn-primary px-[22px] py-[13px] text-[15px] font-bold leading-none"
            >
              {t.navCta}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
