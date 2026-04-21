import { Link } from "react-router-dom";
import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT A — Action-first
 *
 * Strategy: Hero är en handling, inte ett välkomnande. H1 beskriver vad
 * användaren ska göra (inte vad sidan heter). Primär CTA dominerar, en
 * lugn sekundär för den som inte är redo. Bild saknas — texten bär allt.
 *
 * Pro: Högst konvertering för tydligt transaktions-syfte. Snabbt att bygga.
 * Kontra: Kan upplevas tom / kommersiell. Saknar varumärkeskänsla.
 */
export function HeroAction() {
  return (
    <Annotation
      label="Action-first hero"
      audience="user"
      rationale="H1 är ett verb + objekt. CTA:n är det första läsaren letar efter — den ska vara visuellt dominant och tydlig i vad som händer vid klick. Reassurance-raden tar bort de tre vanligaste friktionsfrågorna (tid, krav, ångerrätt)."
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
        <div className="flex flex-wrap gap-3 mb-3">
          <Link
            to="/moduler/elavtal-jamfor"
            className="inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-6 py-3 rounded hover:opacity-90 transition-opacity"
          >
            Teckna elavtal
            <Icon name="arrow_forward" size={18} />
          </Link>
          <a
            href="#lasmer"
            className="inline-flex items-center gap-2 border border-border-strong text-ink-secondary font-medium px-6 py-3 rounded hover:bg-tint-info transition-colors"
          >
            Så fungerar det
          </a>
        </div>
        <p className="text-xs text-ink-muted">
          Tar ca 3 minuter · Du behöver personnummer och adress · 14 dagars ångerrätt
        </p>
      </section>
    </Annotation>
  );
}
