import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT B — Brand-first
 *
 * Strategy: Stor bildbakgrund + värdeproposition. Syftar till att etablera
 * trovärdighet och känsla innan användaren tar beslut. Används på
 * kampanj-landningssidor och övergripande hubbar.
 *
 * Pro: Bygger varumärke, ger trovärdighet för första-besökare.
 * Kontra: Lägre direkt konvertering. Kräver bra bild och copy.
 */
export function HeroBrand() {
  return (
    <Annotation
      label="Brand-first hero"
      audience="design"
      rationale="Bildbakgrund + värdeproposition. H1 är varumärkes-centrerad, CTA är mjukare ('Utforska' istället för 'Köp'). Fungerar för navigerande besökare och kampanjer. Sämre för en transaktion."
    >
      <section className="relative overflow-hidden rounded-lg bg-brand-primary text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="w-full h-full bg-gradient-to-br from-white to-transparent" />
        </div>
        <div className="relative z-10 py-16 sm:py-24 px-6 sm:px-10 max-w-reading">
          <p className="uppercase text-xs font-bold tracking-wider opacity-80 mb-3">
            Öresundskraft
          </p>
          <h1 className="text-display leading-tight mb-4">
            Energi för ett bättre Helsingborg
          </h1>
          <p className="text-lede opacity-90 mb-8 leading-relaxed">
            Vi gör det enkelt för dig att använda återvunnen och förnybar energi. Lokalt,
            transparent och med vinsten tillbaka i regionen.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white text-brand-primary font-medium px-6 py-3 rounded hover:opacity-90 transition-opacity"
            >
              Utforska våra tjänster
              <Icon name="arrow_forward" size={18} />
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 border-2 border-white/70 text-white font-medium px-6 py-3 rounded hover:bg-white/10 transition-colors"
            >
              Läs om vårt arbete
            </a>
          </div>
        </div>
      </section>
    </Annotation>
  );
}
