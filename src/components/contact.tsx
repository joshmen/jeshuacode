"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";
import { useLanguage } from "@/lib/language-context";
import { WHATSAPP_URL } from "@/lib/i18n";
import { fbqTrack } from "@/lib/fbq";
import SectionHead from "./section-head";

const inputCls =
  "w-full rounded-[11px] border border-[#D0D5DD] bg-white px-[15px] py-[13px] text-[15px] text-foreground focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-accent/12";

export default function Contact() {
  const { t } = useLanguage();
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const eventId =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : String(Date.now());
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      message: String(data.get("message") ?? ""),
      event_id: eventId,
    };
    setSent(true);
    fbqTrack("Lead", {}, { eventID: eventId });
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch {
      // el usuario ya vio confirmación; el lead viaja best-effort
    }
  };

  const methods = [
    {
      icon: MessageCircle,
      label: t.methodWa,
      value: "+52 668 139 6431",
      href: WHATSAPP_URL,
    },
  ];

  return (
    <section id="contacto" className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <SectionHead eyebrow={t.contEy} title={t.contTitle} sub={t.contSub} />
        <div className="mt-14 grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            {sent ? (
              <div className="rounded-[14px] border border-[#A6F0C6] bg-[#E7F8F0] p-6 text-base font-semibold text-[#05603A]">
                {t.fSent}
              </div>
            ) : (
              <form onSubmit={onSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="mb-[18px] sm:mb-0">
                    <label className="mb-[7px] block text-[13px] font-bold text-[#344054]">
                      {t.fName}
                    </label>
                    <input className={inputCls} type="text" name="name" required />
                  </div>
                  <div>
                    <label className="mb-[7px] block text-[13px] font-bold text-[#344054]">
                      {t.fEmail}
                    </label>
                    <input className={inputCls} type="email" name="email" required />
                  </div>
                </div>
                <div className="mt-[18px]">
                  <label className="mb-[7px] block text-[13px] font-bold text-[#344054]">
                    {t.fCompany}
                  </label>
                  <input className={inputCls} type="text" name="company" />
                </div>
                <div className="mt-[18px]">
                  <label className="mb-[7px] block text-[13px] font-bold text-[#344054]">
                    {t.fMsg}
                  </label>
                  <textarea className={`${inputCls} min-h-[130px] resize-y`} name="message" required />
                </div>
                <button
                  type="submit"
                  className="mt-[18px] inline-flex w-full items-center justify-center whitespace-nowrap rounded-[11px] btn-primary px-7 py-4 text-base font-bold leading-none transition-all hover:-translate-y-px"
                >
                  {t.fSend}
                </button>
              </form>
            )}
          </div>

          <div>
            {methods.map((m) => (
              <a
                key={m.label}
                href={m.href}
                target={m.href.startsWith("http") ? "_blank" : undefined}
                rel={m.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="mb-3.5 flex items-center gap-[15px] rounded-[14px] border border-line p-5 transition-all hover:border-[#B9D2FF] hover:bg-[#F8FAFF]"
              >
                <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-xl bg-accent-light text-accent">
                  <m.icon size={22} strokeWidth={1.8} />
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-[0.03em] text-faint">
                    {m.label}
                  </div>
                  <div className="mt-[3px] text-base font-bold text-foreground">{m.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
