import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

const BRODTEXT =
  "Innozhero-projektet ska göra Helsingborg klimatneutralt till 2030 genom att fånga in 200 000 ton koldioxid per år. Här berättar vi hur tekniken fungerar, vad den kostar och varför Öresundskraft är med i projektet.";

/**
 * VARIANT B, Berättelse
 *
 * Bild och text sida vid sida. Fokus ligger på innehållet, inte på
 * knappen. Används för kampanjer om hållbarhet och bakgrunden till projekt.
 *
 * Fördel: bygger förtroende och rymmer ett mer komplext budskap.
 * Nackdel: färre klick. Kräver längre text.
 */
export function KampanjStory() {
  return (
    <Annotation
      label="Berättelse med bild"
      audience="design"
      rationale="Texten bär budskapet och bilden stödjer. Länken är diskret eftersom målet är att den intresserade läser vidare, inte att få snabba klick. Passar hållbarhet, partnerskap och bakgrunden till ett projekt."
    >
      <section className="rounded-lg border border-border-subtle bg-surface overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <Annotation
            label="Bild"
            audience="redaktör"
            rationale="Välj en bild som visar platsen eller människorna i berättelsen, inte en generisk naturbild. Skriv en alt-text som beskriver vad bilden visar."
          >
            <div className="bg-tint-info aspect-[4/3] md:aspect-auto flex items-center justify-center text-ink-muted">
              <Icon name="image" size={64} />
            </div>
          </Annotation>
          <Annotation
            label="Text och länk"
            audience="user"
            rationale="Rubriken väcker frågan, brödtexten ger svaret i korthet och länken leder till hela berättelsen. Läsaren förstår ämnet utan att klicka."
          >
            <div className="p-6 sm:p-8">
              <Copy
                label="Överrubrik, ämne"
                category="metadata"
                text="Hållbarhet · Klimat"
                rationale="Två korta ämnesord visar vad berättelsen handlar om innan läsaren läst rubriken. Använd samma ämnesord som i resten av webbplatsen."
              >
                <p className="uppercase text-xs font-bold tracking-wider text-brand-accent mb-2">
                  Hållbarhet · Klimat
                </p>
              </Copy>
              <Copy
                label="Rubrik, varför"
                category="rubrik"
                text="Därför ska vi fånga in koldioxid i Helsingborg"
                rationale="'Därför' lovar en förklaring och väcker nyfikenhet utan att överdriva. Ortnamnet gör det lokalt och konkret. Undvik abstrakta rubriker som 'Vårt klimatarbete'."
              >
                <h2 className="text-h2 leading-tight mb-3">
                  Därför ska vi fånga in koldioxid i Helsingborg
                </h2>
              </Copy>
              <Copy
                label="Brödtext"
                category="ton"
                text={BRODTEXT}
                rationale="Första meningen ger mål och siffror, andra säger vad läsaren får veta. Håll texten på 50-100 ord. Skriv 'vi' om Öresundskraft och förklara tekniska ord."
              >
                <p className="text-ink-secondary leading-relaxed mb-4">{BRODTEXT}</p>
              </Copy>
              <Copy
                label="Länk till hela berättelsen"
                category="cta"
                text="Läs hela berättelsen"
                rationale="Säger att det finns mer att läsa och vad det är. Diskret textlänk i stället för knapp, eftersom läsning är målet, inte köp."
              >
                <a
                  href="#"
                  className="inline-flex items-center gap-1.5 text-brand-accent font-medium hover:underline"
                >
                  Läs hela berättelsen
                  <Icon name="arrow_forward" size={16} />
                </a>
              </Copy>
            </div>
          </Annotation>
        </div>
      </section>
    </Annotation>
  );
}
