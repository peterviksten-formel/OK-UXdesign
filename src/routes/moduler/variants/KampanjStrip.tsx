import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

const BUDSKAP =
  "Teckna Framtidspengen senast 31 maj. Förra året fick 10 % av hushållen pengar tillbaka.";

/**
 * VARIANT C, Remsa
 *
 * Smal färgstark remsa med erbjudande och knapp. Kan ligga som toppbanner
 * eller i sidan. Passar erbjudanden med ett sista datum.
 *
 * Fördel: tar liten plats, syns tydligt och visar datumet.
 * Nackdel: blir lätt påträngande om erbjudandet eller datumet inte är äkta.
 */
export function KampanjStrip() {
  return (
    <Annotation
      label="Kampanjremsa"
      audience="design"
      rationale="En rad text och en knapp, inget mer. Sista datum är obligatoriskt. Använd inte remsan för kampanjer som alltid pågår, då blir den brus."
    >
      <section>
        <Annotation
          label="Budskap och knapp"
          audience="user"
          rationale="Besökaren ser på en rad vad erbjudandet är, när det tar slut och var man klickar. Ett ärligt datum ger tid att bestämma sig utan press."
        >
          <div className="rounded-md bg-brand-highlight text-white px-5 py-3 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
            <Icon name="campaign" size={24} className="shrink-0" filled />
            <div className="flex-1">
              <Copy
                label="Budskap med datum"
                category="rubrik"
                text={BUDSKAP}
                rationale="Handlingen och datumet först, beviset efter. Högst 15 ord. Undvik 'Brådska!' och 'Bara idag', ett riktigt datum räcker."
              >
                <p className="font-medium text-sm">{BUDSKAP}</p>
              </Copy>
            </div>
            <Copy
              label="Knapp"
              category="cta"
              text="Se erbjudandet"
              rationale="Kort verb plus objekt som ryms på en rad. 'Se' är ett mjukare steg än 'Teckna' och passar när besökaren inte läst om erbjudandet än."
            >
              <a
                href="#"
                className="inline-flex items-center gap-1.5 bg-white text-brand-highlight font-medium px-4 py-2 rounded text-sm hover:opacity-90 whitespace-nowrap"
              >
                Se erbjudandet
                <Icon name="arrow_forward" size={14} />
              </a>
            </Copy>
          </div>
        </Annotation>
        <Annotation
          label="Placering"
          audience="redaktör"
          rationale="Lägg remsan överst på sidan eller mellan två sektioner, aldrig fler än en per sida. Ta bort den samma dag som erbjudandet tar slut."
        >
          <p className="text-xs text-ink-muted mt-2">
            Remsan passar som toppbanner eller mitt i sidan. Högst en per sida.
          </p>
        </Annotation>
      </section>
    </Annotation>
  );
}
