import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT C, Strip
 *
 * Smal färgstark rad med en erbjudande-rubrik + CTA. Som sticky/top-
 * bar på sidan. Effektiv för tidskritiska erbjudanden.
 *
 * Pro: Låg yta, hög uppmärksamhet, tydlig tidsmarkör.
 * Kontra: Lätt att hamna i dark pattern om erbjudandet inte är äkta.
 */
export function KampanjStrip() {
  return (
    <Annotation
      label="Kampanj Strip"
      audience="design"
      rationale="Smal rad, max 1 rad text + CTA. Tidsmarkör ('Senast 31 maj') är obligatorisk. Använd inte för permanenta kampanjer, då blir det brus. Använd inte 'Brådska!'-språk, hederligt med datum räcker."
    >
      <section>
        <div className="rounded-md bg-brand-highlight text-white px-5 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
          <Icon name="campaign" size={24} className="shrink-0" filled />
          <div className="flex-1">
            <p className="font-medium text-sm">
              Teckna Framtidspengen senast 31 maj, 10% av hushållen fick pengar tillbaka förra året.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 bg-white text-brand-highlight font-medium px-4 py-2 rounded text-sm hover:opacity-90 whitespace-nowrap"
          >
            Se erbjudandet
            <Icon name="arrow_forward" size={14} />
          </a>
        </div>
        <p className="text-xs text-ink-muted mt-2">
          Strip-varianten passar som sticky topbar eller inne-på-sidan-banner. Max 1 per sida.
        </p>
      </section>
    </Annotation>
  );
}
