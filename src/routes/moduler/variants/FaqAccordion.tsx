import { useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

const FAQS = [
  { id: "anvisat", q: "Vad händer om jag inte väljer avtal?", a: "Då får du ett så kallat anvisat avtal, som oftast är dyrare. Det är tillfälligt och du kan byta utan kostnad. Det tar 3 minuter." },
  { id: "elnat", q: "Vad är skillnaden mellan elnät och elhandel?", a: "Elnätet är ledningarna som leder elen hem till dig. Nätägaren kan du inte välja. Elhandeln är företaget som säljer elen till dig, och det väljer du fritt." },
  { id: "behover", q: "Vad behöver jag för att teckna?", a: "Ditt personnummer och adressen där du vill ha el." },
  { id: "tid", q: "Hur snabbt börjar avtalet gälla?", a: "Oftast inom 2-4 veckor. Om du flyttar kan det gå snabbare, om du anmäler flytten i tid." },
  { id: "byta", q: "Kan jag byta avtal senare?", a: "Ja. Har du ett avtal utan bindningstid kan du säga upp det med en månads uppsägningstid." },
];

/**
 * VARIANT A, Utfällbar lista
 *
 * Frågorna står under varandra och svaret fälls ut när besökaren klickar.
 * Öppning och stängning sker med en mjuk rörelse, som stängs av för den
 * som valt minskad rörelse i sina inställningar.
 *
 * Fördel: känns lugn och följsam, och vi styr själva hur rörelsen ser ut.
 * Nackdel: kräver lite mer teknik än den enklaste formen av utfällbar lista.
 */
export function FaqAccordion() {
  const [open, setOpen] = useState<string | null>("anvisat");
  return (
    <Annotation
      label="Utfällbar FAQ"
      audience="design"
      rationale="Besökaren ser alla frågor på en gång och öppnar bara den som är aktuell. Svaret glider fram mjukt i stället för att hoppa fram, och rörelsen stängs av för den som valt minskad rörelse."
    >
      <section className="max-w-reading">
        <Copy
          label="Rubrik för FAQ-blocket"
          category="rubrik"
          text="Vanliga frågor"
          rationale="Det mest igenkännbara namnet för den här typen av innehåll. Undvik 'FAQ' i sidtext, det är en förkortning som inte alla känner till, och 'Frågor och svar', som är längre utan att säga mer."
        >
          <h2 className="text-h3 font-medium mb-4">Vanliga frågor</h2>
        </Copy>
        <Annotation
          label="Frågor i ordning efter hur vanliga de är"
          audience="redaktör"
          rationale="Lägg den fråga kundservice får flest gånger överst, här anvisat avtal. Den första frågan är öppen från början. Skriv frågan som kunden själv skulle ställa den och svara i högst tre korta meningar."
        >
        <ul className="space-y-2">
          {FAQS.map((f, idx) => {
            const isOpen = open === f.id;
            const item = (
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
                  {idx === 0 ? (
                    <Copy
                      label="Fråga i kundens ord"
                      category="faq"
                      text={f.q}
                      rationale="Frågan är formulerad som kunden säger den, med 'jag'. Undvik rubriker som 'Anvisat avtal', som bara känns igen av den som redan kan ordet."
                    >
                      <span>{f.q}</span>
                    </Copy>
                  ) : (
                    <span>{f.q}</span>
                  )}
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
                    {idx === 0 ? (
                      <Copy
                        label="Svar som börjar med svaret"
                        category="faq"
                        text={f.a}
                        rationale="Första meningen svarar på frågan, resten förklarar. 'så kallat' hjälper den som inte känner till ordet anvisat. Siffran 3 minuter gör bytet konkret."
                      >
                        <div className="px-5 pb-4 pt-3 border-t border-border-subtle text-sm text-ink-secondary leading-relaxed">
                          {f.a}
                        </div>
                      </Copy>
                    ) : (
                      <div className="px-5 pb-4 pt-3 border-t border-border-subtle text-sm text-ink-secondary leading-relaxed">
                        {f.a}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            );
            return idx === 0 ? (
              <Annotation
                key={f.id}
                label="En fråga och dess svar"
                audience="user"
                rationale="Hela raden går att klicka på och pilen visar om svaret är öppet eller stängt. Besökaren kan öppna flera frågor efter varandra utan att tappa bort var den är."
              >
                {item}
              </Annotation>
            ) : (
              item
            );
          })}
        </ul>
        </Annotation>
      </section>
    </Annotation>
  );
}
