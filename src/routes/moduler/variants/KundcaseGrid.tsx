import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

const CITAT = [
  {
    text: "Vi fick ner elkostnaden med 30% första året efter solcellerna. Öresundskraft skötte hela installationen.",
    namn: "Anders L.",
    roll: "Villaägare, Helsingborg",
  },
  {
    text: "Bytte till Månadspris när spotpriset var lågt — enkelt via Mina sidor. Ingen inlåsning kändes bra.",
    namn: "Linda S.",
    roll: "Lägenhet, Centrum",
  },
  {
    text: "Framtidspengen är en schyst grej. Jag har fått ~400 kr tillbaka två år i rad.",
    namn: "Mikael H.",
    roll: "Radhus, Ängelholm",
  },
];

/**
 * VARIANT A — Citatkort-grid
 *
 * Tre kort i rad. Varje kort har ett citat, namn och roll. Formellt och
 * balanserat. Inga bilder.
 *
 * Pro: Demokratiskt, snabbt att bygga, skalar till 3-4 kort.
 * Kontra: Utan bilder kan det kännas opersonligt.
 */
export function KundcaseGrid() {
  return (
    <Annotation
      label="Kundcase-grid (citatkort)"
      audience="redaktör"
      rationale="Tre kort, lika vikt. Citatet dominerar visuellt — namn och roll är sekundära. Citat-tecken som visuell markör för att signalera 'detta är en röst'. Max 2 rader citat per kort."
    >
      <section>
        <h2 className="text-h3 font-medium mb-6">Vad våra kunder säger</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {CITAT.map((c) => (
            <figure
              key={c.namn}
              className="rounded-md border border-border-subtle bg-surface p-5"
            >
              <Icon name="format_quote" size={28} className="text-brand-accent mb-2" />
              <blockquote className="text-sm text-ink-secondary leading-relaxed mb-4">
                {c.text}
              </blockquote>
              <figcaption className="text-xs">
                <p className="font-medium text-brand-primary">{c.namn}</p>
                <p className="text-ink-muted">{c.roll}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </Annotation>
  );
}
