"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search, Sparkles } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

/**
 * Tab de Ayuda sobre las FAQs que YA existen en la landing: no hay artículos que mostrar y
 * fingir un centro de ayuda seria inventar contenido.
 *
 * El detalle que lo vuelve util: cuando la busqueda no encuentra nada, ofrece preguntarle al
 * asistente con la query ya escrita. El RAG cubre la cola larga sin construir un CMS.
 */
export default function ChatHelp({ onPreguntarBot }: { onPreguntarBot: (q: string) => void }) {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [abierta, setAbierta] = useState<number | null>(null);

  const resultados = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return t.faqs;
    return t.faqs.filter(
      (f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)
    );
  }, [query, t.faqs]);

  return (
    <div className="chat-scroll flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
      <div className="field-shadow flex items-center gap-2 rounded-xl border border-line bg-white px-3 py-2">
        <Search size={15} className="shrink-0 text-faint" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setAbierta(null);
          }}
          placeholder={t.chat.ayudaBuscar}
          aria-label={t.chat.ayudaBuscar}
          className="min-w-0 flex-1 bg-transparent text-[13.5px] font-medium text-foreground outline-none placeholder:text-faint"
        />
      </div>

      {resultados.length === 0 ? (
        <div className="rounded-xl border border-line bg-surface px-4 py-5 text-center">
          <p className="text-[13.5px] font-medium text-muted">{t.chat.ayudaSinResultados}</p>
          <button
            type="button"
            onClick={() => onPreguntarBot(query)}
            className="btn-primary mt-3 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-[13.5px] font-bold text-white transition-all hover:-translate-y-px"
          >
            <Sparkles size={14} />
            {t.chat.ayudaPreguntarBot}
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {resultados.map((faq, i) => (
            <div key={faq.q} className="overflow-hidden rounded-xl border border-line bg-white">
              <button
                type="button"
                onClick={() => setAbierta(abierta === i ? null : i)}
                aria-expanded={abierta === i}
                className="flex w-full items-center justify-between gap-3 px-3.5 py-3 text-left"
              >
                <span className="text-[13.5px] font-bold text-foreground">{faq.q}</span>
                <ChevronDown
                  size={15}
                  className={`shrink-0 text-faint transition-transform duration-200 ${
                    abierta === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {abierta === i && (
                <p className="border-t border-line px-3.5 py-3 text-[13px] font-medium leading-relaxed text-muted">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
