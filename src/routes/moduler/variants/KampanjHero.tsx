import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

const INGRESS =
  "Ett av tio hushåll med Framtidspengen fick pengar tillbaka förra året. Teckna senast 31 maj för att vara med i år.";

/**
 * VARIANT A, Stor banner
 *
 * En stor färgyta i full bredd med tydlig rubrik och huvudknapp.
 * Syns mest av de tre. Används för stora kampanjer och nya tjänster.
 *
 * Fördel: syns tydligt och får många klick.
 * Nackdel: besökare vänjer sig vid banners och hoppar över dem. Tar stor plats.
 */
export function KampanjHero() {
  return (
    <Annotation
      label="Stor kampanjbanner"
      audience="design"
      rationale="En färgyta i full bredd med stor rubrik och en tydlig huvudknapp. Använd högst en per sida så att den inte tävlar med annat. Texten är kort: vad du får, en fördel och sista datum."
    >
      <section className="relative overflow-hidden rounded-lg bg-gradient-to-br from-brand-primary to-brand-accent text-white">
        <Annotation
          label="Rubrikblock"
          audience="redaktör"
          rationale="Skriv produktnamnet överst, sedan en rubrik som säger vad kunden får. Ingressen har en konkret fördel och kampanjens sista datum. Byt datum varje år och ta bort bannern när kampanjen är slut."
        >
          <div className="relative z-10 py-12 sm:py-20 px-6 sm:px-10 max-w-reading">
            <Copy
              label="Överrubrik, produktnamn"
              category="metadata"
              text="Framtidspengen"
              rationale="Produktnamnet överst visar direkt vad kampanjen gäller. Använd namnet på erbjudandet, inte ord som 'Kampanj' eller 'Nyhet'."
            >
              <p className="uppercase text-xs font-bold tracking-wider opacity-80 mb-3">Framtidspengen</p>
            </Copy>
            <Copy
              label="Rubrik, det kunden får"
              category="rubrik"
              text="Få tillbaka en del av ditt påslag"
              rationale="Rubriken beskriver nyttan för kunden, inte produkten. 'en del av' är ärligt och lovar inte mer än vad erbjudandet ger. Undvik säljord som 'Nu kan du tjäna pengar!'."
            >
              <h2 className="text-display leading-tight mb-4">
                Få tillbaka en del av ditt påslag
              </h2>
            </Copy>
            <Copy
              label="Ingress med bevis och datum"
              category="rubrik"
              text={INGRESS}
              rationale="Första meningen är ett konkret resultat från förra året, andra meningen säger vad du ska göra och när. Ett riktigt datum skapar tydlighet utan att pressa. Undvik 'Skynda!' och 'Sista chansen'."
            >
              <p className="text-lede opacity-90 mb-8 leading-relaxed">{INGRESS}</p>
            </Copy>
            <Annotation
              label="Knapprad"
              audience="user"
              rationale="En tydlig huvudknapp för den som redan är intresserad och en sekundär för den som vill veta mer först. Två val räcker, fler gör det svårare att bestämma sig."
            >
              <div className="flex flex-wrap gap-3">
                <Copy
                  label="Huvudknapp"
                  category="cta"
                  text="Teckna Framtidspengen"
                  rationale="Verb plus produktnamn säger exakt vad som händer. Undvik 'Kom igång' eller 'Klicka här', som inte säger vad du tecknar."
                >
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 bg-white text-brand-primary font-medium px-6 py-3 rounded hover:opacity-90"
                  >
                    Teckna Framtidspengen
                    <Icon name="arrow_forward" size={18} />
                  </a>
                </Copy>
                <Copy
                  label="Sekundär knapp"
                  category="cta"
                  text="Så fungerar Framtidspengen"
                  rationale="Säger vad du får läsa om, till skillnad från ett tomt 'Läs mer'. Passar den som vill förstå erbjudandet innan hen tecknar."
                >
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 border-2 border-white/70 text-white font-medium px-6 py-3 rounded hover:bg-white/10"
                  >
                    Så fungerar Framtidspengen
                  </a>
                </Copy>
              </div>
            </Annotation>
          </div>
        </Annotation>
      </section>
    </Annotation>
  );
}
