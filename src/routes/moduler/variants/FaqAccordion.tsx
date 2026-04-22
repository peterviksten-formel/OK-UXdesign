import { useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

const FAQS = [
  { id: "anvisat", q: "Vad händer om jag inte väljer avtal?", a: "Då får du ett anvisat avtal som oftast är dyrare. Det är tillfälligt och du kan byta gratis — det tar 3 minuter." },
  { id: "elnat", q: "Vad är skillnaden mellan elnät och elhandel?", a: "Elnät är de fysiska ledningarna till ditt hem — du kan inte välja nätägare. Elhandel är vem som säljer elen till dig — där väljer du fritt." },
  { id: "behover", q: "Vad behöver jag för att teckna?", a: "Personnummer och den adress där du vill ha el." },
  { id: "tid", q: "Hur snabbt börjar avtalet gälla?", a: "Normalt inom 2–4 veckor. Vid flytt kan det gå snabbare om anmälan görs i tid." },
  { id: "byta", q: "Kan jag byta avtal senare?", a: "Ja. Avtal utan bindningstid kan sägas upp med en månads uppsägningstid." },
];

/**
 * VARIANT A — Accordion
 *
 * Button-baserad accordion (inte <details>) så vi kan animera höjden
 * smidigt mellan öppen och stängd. ARIA via aria-expanded + aria-controls.
 *
 * Pro: Känns smidigare än native <details>, full kontroll över motion.
 * Kontra: Kräver JS (acceptabelt för modern SPA).
 */
export function FaqAccordion() {
  const [open, setOpen] = useState<string | null>("anvisat");
  return (
    <Annotation
      label="FAQ Accordion"
      audience="user"
      rationale="Ordning efter vanlighet — 'anvisat avtal' först eftersom det är topp-1 supportfråga. Öppen/stängd animeras via grid-template-rows (0fr↔1fr) så höjden går smidigt utan pop. Respekterar prefers-reduced-motion via Tailwinds motion-safe/reduce."
    >
      <section className="max-w-reading">
        <h2 className="text-h3 font-medium mb-4">Vanliga frågor</h2>
        <ul className="space-y-2">
          {FAQS.map((f) => {
            const isOpen = open === f.id;
            return (
              <li
                key={f.id}
                className="border border-border-subtle rounded-md bg-surface overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : f.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${f.id}`}
                  id={`faq-trigger-${f.id}`}
                  className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 hover:bg-tint-info font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:-outline-offset-2"
                >
                  <span>{f.q}</span>
                  <Icon
                    name="expand_more"
                    size={20}
                    className={`text-ink-muted shrink-0 transition-transform duration-200 motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
                <div
                  id={`faq-panel-${f.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${f.id}`}
                  className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-4 pt-3 border-t border-border-subtle text-sm text-ink-secondary leading-relaxed">
                      {f.a}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </Annotation>
  );
}
