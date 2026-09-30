import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

const BRODTEXT =
  "Familjen Lindgren i Helsingborg installerade solceller och en laddbox för elbilen 2023. Två år senare täcker solenergin 70 % av deras årsförbrukning och elkostnaden har minskat med nästan en tredjedel. \"Det känns skönt att veta att huset bidrar, inte bara drar\", säger Anders.";

/**
 * VARIANT C, Kundberättelse
 *
 * Längre format med bild, berättelse och konkreta siffror. Byggs som en
 * redaktionell artikel men med mätbara resultat. Används för företagskunder
 * eller större beslut hos privatkunder.
 *
 * Fördel: trovärdig och går djupare än ett citat. Hjälper sidan att hittas i sök.
 * Nackdel: kräver mycket arbete: intervju, foto och text.
 */
export function KundcaseStory() {
  return (
    <Annotation
      label="Kundberättelse med nyckeltal"
      audience="design"
      rationale="Bild till vänster, berättelse till höger och tre nyckeltal längst ner. Läsaren får både en person att känna igen sig i och siffror att jämföra med."
    >
      <section className="rounded-lg border border-border-subtle bg-surface overflow-hidden">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-0">
          <Annotation
            label="Foto på kunden"
            audience="redaktör"
            rationale="Använd ett riktigt foto på kunden hemma, gärna med tjänsten synlig, till exempel solpanelerna på taket. Kunden ska ha godkänt både bild och text. Skriv en alt-text som beskriver bilden."
          >
            <div className="bg-tint-info aspect-[4/3] md:aspect-auto flex items-center justify-center text-ink-muted">
              <Icon name="image" size={64} />
            </div>
          </Annotation>
          <div className="p-6 sm:p-8">
            <Copy
              label="Överrubrik, tjänster"
              category="metadata"
              text="Kundcase · Solceller och Ladda Smart"
              rationale="Visar direkt vilka tjänster berättelsen handlar om, så att den som är intresserad av just dem läser vidare. Använd produktnamnen som de heter på webbplatsen."
            >
              <p className="uppercase text-xs font-bold tracking-wider text-brand-accent mb-2">
                Kundcase · Solceller och Ladda Smart
              </p>
            </Copy>
            <Copy
              label="Rubrik, kundens egna ord"
              category="rubrik"
              text={'"Vi slutade tänka på elräkningen"'}
              rationale="Ett kort citat som rubrik beskriver känslan av resultatet med kundens egna ord. Det känns mer äkta än en rubrik vi skrivit själva, som 'Så sparade familjen pengar'."
            >
              <h2 className="text-h2 leading-tight mb-3">
                "Vi slutade tänka på elräkningen"
              </h2>
            </Copy>
            <Copy
              label="Brödtext"
              category="ton"
              text={BRODTEXT}
              rationale="Vem, vad och när först, sedan resultatet i siffror och till sist ett citat. Håll texten på 100-200 ord. Skriv sakligt och låt siffrorna tala, undvik överdrifter."
            >
              <p className="text-ink-secondary leading-relaxed mb-5">{BRODTEXT}</p>
            </Copy>
            <Annotation
              label="Nyckeltal"
              audience="user"
              rationale="Tre siffror sammanfattar resultatet för den som skummar. Läsaren kan snabbt jämföra med sin egen situation."
            >
              <div className="grid grid-cols-3 gap-4 py-4 border-y border-border-subtle mb-5">
                {[
                  { siffra: "30 %", text: "Lägre elkostnad" },
                  { siffra: "70 %", text: "Egen produktion" },
                  { siffra: "2 år", text: "Återbetalningstid" },
                ].map((m) => (
                  <div key={m.text}>
                    <p className="text-h3 font-bold text-brand-primary">{m.siffra}</p>
                    <p className="text-xs text-ink-muted uppercase tracking-wider">{m.text}</p>
                  </div>
                ))}
              </div>
            </Annotation>
            <Copy
              label="Länk till hela berättelsen"
              category="cta"
              text="Läs hela berättelsen"
              rationale="Samma formulering som i andra berättelser på webbplatsen, så att läsaren känner igen den. Säger att det finns mer och vad det är."
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
        </div>
      </section>
    </Annotation>
  );
}
