import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT C, Case-story
 *
 * Längre format. Bild + narrativ + konkreta siffror. Byggs som en
 * redaktionell artikel men med mätbara resultat. Används för B2B-case
 * eller tyngre privatkund-stories.
 *
 * Pro: Trovärdig, går djupare än ett citat. Bra för SEO.
 * Kontra: Produktionstungt, kräver intervju, foto, copy.
 */
export function KundcaseStory() {
  return (
    <Annotation
      label="Kundcase, story med siffror"
      audience="redaktör"
      rationale="Bild vänster, text höger. Tre-kolumn-metrik i botten ger konkreta resultat. Längre copy: 100-200 ord. Fungerar som både case study och content-marketing. Kräver fotograferad kund och godkännande."
    >
      <section className="rounded-lg border border-border-subtle bg-surface overflow-hidden">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-0">
          <div className="bg-tint-info aspect-[4/3] md:aspect-auto flex items-center justify-center text-ink-muted">
            <Icon name="image" size={64} />
          </div>
          <div className="p-6 sm:p-8">
            <p className="uppercase text-xs font-bold tracking-wider text-brand-accent mb-2">
              Kundcase · Solceller + Ladda Smart
            </p>
            <h2 className="text-h2 leading-tight mb-3">
              "Vi slutade tänka på elräkningen"
            </h2>
            <p className="text-ink-secondary leading-relaxed mb-5">
              Familjen Lindgren i Helsingborg installerade solceller och en laddbox för elbilen
              2023. Två år senare täcker solenergin 70% av deras årsförbrukning och elkostnaden
              har minskat med nära en tredjedel. "Det känns skönt att veta att huset bidrar, inte
              bara drar," säger Anders.
            </p>
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-border-subtle mb-5">
              {[
                { siffra: "30%", text: "Lägre elkostnad" },
                { siffra: "70%", text: "Egen produktion" },
                { siffra: "2 år", text: "Återbetalning" },
              ].map((m) => (
                <div key={m.text}>
                  <p className="text-h3 font-bold text-brand-primary">{m.siffra}</p>
                  <p className="text-xs text-ink-muted uppercase tracking-wider">{m.text}</p>
                </div>
              ))}
            </div>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-brand-accent font-medium hover:underline"
            >
              Läs hela berättelsen
              <Icon name="arrow_forward" size={16} />
            </a>
          </div>
        </div>
      </section>
    </Annotation>
  );
}
