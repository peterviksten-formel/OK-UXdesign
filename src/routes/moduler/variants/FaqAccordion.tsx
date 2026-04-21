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
 * Klassisk FAQ. Native <details>/<summary> — fungerar utan JS, bra
 * tillgänglighet, zero-dependency.
 *
 * Pro: Tekniskt robust, snabb att bygga, fungerar utan CSS/JS.
 * Kontra: Ingen hierarki mellan frågor. Svårt att skala förbi 7-8.
 */
export function FaqAccordion() {
  const [open, setOpen] = useState<string | null>("anvisat");
  return (
    <Annotation
      label="FAQ Accordion"
      audience="user"
      rationale="Ordning efter vanlighet — 'anvisat avtal' först eftersom det är topp-1 supportfråga. Native HTML-element (details/summary) med overlay för tillstånd. Inget JS krävs för grundfunktion."
    >
      <section className="max-w-reading">
        <h2 className="text-h3 font-medium mb-4">Vanliga frågor</h2>
        <div className="space-y-2">
          {FAQS.map((f) => (
            <details
              key={f.id}
              open={open === f.id}
              className="group border border-border-subtle rounded-md bg-surface"
            >
              <summary
                onClick={(e) => { e.preventDefault(); setOpen(open === f.id ? null : f.id); }}
                className="px-5 py-4 cursor-pointer list-none flex items-center justify-between hover:bg-tint-info rounded-md font-medium text-sm"
              >
                {f.q}
                <Icon
                  name="expand_more"
                  size={20}
                  className={`text-ink-muted transition-transform ${open === f.id ? "rotate-180" : ""}`}
                />
              </summary>
              {open === f.id && (
                <div className="px-5 pb-4 text-sm text-ink-secondary leading-relaxed border-t border-border-subtle pt-3">
                  {f.a}
                </div>
              )}
            </details>
          ))}
        </div>
      </section>
    </Annotation>
  );
}
