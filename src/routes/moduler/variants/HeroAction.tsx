import { Link } from "react-router-dom";
import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT A — Action-first (matchar sidtyp Startsida undersida UX)
 *
 * Strategy: Hero är en handling, inte ett välkomnande. H1 beskriver vad
 * användaren ska göra. En tydlig primär CTA — ingen konkurrerande
 * persona-CTA. Bild saknas — texten bär allt.
 *
 * Pro: Högst konvertering för tydligt transaktions-syfte.
 * Kontra: Kan upplevas tom / kommersiell. Saknar varumärkeskänsla.
 */
export function HeroAction() {
  return (
    <Annotation
      label="Action-first hero"
      audience="user"
      rationale="H1 är ett verb + objekt. En primär CTA — ingen sekundär — så beslutet är entydigt. Reassurance-raden tar bort de tre vanligaste friktionsfrågorna (tid, krav, ångerrätt). Sidtypen Startsida undersida UX använder exakt detta mönster."
    >
      <section className="py-12 sm:py-20 max-w-reading">
        <nav aria-label="Breadcrumb" className="text-xs text-ink-muted mb-4">
          <ol className="flex gap-1">
            <li><a href="#" className="hover:text-brand-accent">Privat</a></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page" className="font-medium text-ink">Elhandel</li>
          </ol>
        </nav>
        <h1 className="text-display leading-tight mb-4">
          Välj elavtal som passar dig
        </h1>
        <p className="text-lede text-ink-secondary mb-6 leading-relaxed">
          Jämför våra tre avtal, se uppskattad kostnad och teckna direkt — utan dolda avgifter,
          utan bindningstid om du inte vill.
        </p>
        <div className="mb-3">
          <Link
            to="/moduler/elavtal-jamfor"
            className="inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-7 py-3.5 rounded hover:opacity-90 transition-opacity text-base"
          >
            Teckna elavtal
            <Icon name="arrow_forward" size={18} />
          </Link>
        </div>
        <p className="text-xs text-ink-muted">
          Tar ca 3 minuter · Du behöver personnummer och adress · 14 dagars ångerrätt
        </p>
      </section>
    </Annotation>
  );
}
