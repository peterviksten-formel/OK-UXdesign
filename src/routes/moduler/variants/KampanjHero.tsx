import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT A, Hero-banner
 *
 * Stor banner i full bredd, bild som bakgrund, stor rubrik + CTA.
 * Max impact. Används för stora kampanjer och nya tjänster.
 *
 * Pro: Hög synlighet. Driver klick effektivt.
 * Kontra: Risk för banner-blindness. Tar yta.
 */
export function KampanjHero() {
  return (
    <Annotation
      label="Kampanj Hero-banner"
      audience="design"
      rationale="Full-bredd, bild-bakgrund-simulering, stor rubrik. Primär CTA dominant. Används sparsamt, max 1 per sida för att inte konkurrera. Kopian är kort: verb + objekt + tidslinje."
    >
      <section className="relative overflow-hidden rounded-lg bg-gradient-to-br from-brand-primary to-brand-accent text-white">
        <div className="relative z-10 py-12 sm:py-20 px-6 sm:px-10 max-w-reading">
          <p className="uppercase text-xs font-bold tracking-wider opacity-80 mb-3">Framtidspengen</p>
          <h2 className="text-display leading-tight mb-4">
            Få tillbaka delar av ditt påslag
          </h2>
          <p className="text-lede opacity-90 mb-8 leading-relaxed">
            Ett av 10 hushåll som valt Framtidspengen fick pengar tillbaka förra året.
            Teckna senast 31 maj för att komma med i år.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white text-brand-primary font-medium px-6 py-3 rounded hover:opacity-90"
            >
              Teckna Framtidspengen
              <Icon name="arrow_forward" size={18} />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 border-2 border-white/70 text-white font-medium px-6 py-3 rounded hover:bg-white/10"
            >
              Läs mer
            </a>
          </div>
        </div>
      </section>
    </Annotation>
  );
}
