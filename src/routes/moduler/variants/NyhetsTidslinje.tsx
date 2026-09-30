import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

const NYHETER = [
  { datum: "2026-04-15", tag: "Marknad", rubrik: "Elpriset sjunker inför sommaren: så påverkas du", sammanfattning: "Spotpriset har varit lågt hela mars och prognosen pekar mot en mild sommar." },
  { datum: "2026-04-08", tag: "Tjänster", rubrik: "Nu kan du följa din elförbrukning i realtid i appen", sammanfattning: "Nytt i Mitt Öresundskraft: se din förbrukning timme för timme och jämför med tidigare månader." },
  { datum: "2026-03-28", tag: "Hållbarhet", rubrik: "Framtidspengen gav 3 nya laddstationer i Helsingborg", sammanfattning: "En del av vinsten från våra avtal går tillbaka till staden." },
  { datum: "2026-03-20", tag: "Marknad", rubrik: "Vad förändras med effekttariffen 2027?", sammanfattning: "Regeringen har beslutat att privatkunder inte ska ha effekttariff. Vi förklarar vad det betyder för dig." },
  { datum: "2026-03-12", tag: "Drift", rubrik: "Planerat underhåll i Rydebäck: det här händer", sammanfattning: "Vi byter kablar natten till den 22 april. Du som berörs får ett SMS." },
];

/**
 * VARIANT C, Tidslinje
 *
 * Nyheterna i datumordning, utan bilder. Varje nyhet har datumet som
 * markering på en lodrät linje, en rubrik som går att klicka på och en
 * kort sammanfattning.
 *
 * Fördel: visar att vi uppdaterar ofta. Rymmer hur många nyheter som helst.
 * Nackdel: mindre levande att titta på. Gamla nyheter syns lika mycket som nya.
 */
export function NyhetsTidslinje() {
  return (
    <Annotation
      label="Tidslinje med nyheter"
      audience="design"
      rationale="Datumen längs en lodrät linje visar hur ofta vi publicerar. Utan bilder blir listan lätt att skumma, och nya nyheter hamnar alltid överst. Därför passar den en egen nyhetssida."
    >
      <section>
        <Copy
          label="Rubrik för flödet"
          category="rubrik"
          text="Senaste nytt"
          rationale="Vardagligt och säger att det är det nyaste som står först. 'Nyhetsflöde' beskriver tekniken snarare än innehållet."
        >
          <h2 className="text-h3 font-medium mb-6">Senaste nytt</h2>
        </Copy>
        <Annotation
          label="Nyhetsposter"
          audience="redaktör"
          rationale="Varje nyhet får datum, kategori, rubrik och en sammanfattning. Skriv sammanfattningen i en eller två meningar som säger vad som händer och vem som berörs. Nya nyheter hamnar överst av sig själva."
        >
        <ol className="relative border-l-2 border-border-subtle ml-2 space-y-6">
          {NYHETER.map((n, idx) => (
            <li key={n.rubrik} className="pl-6 relative">
              <span className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-brand-accent border-2 border-canvas" />
              <div className="flex items-center gap-2 mb-1 text-xs text-ink-muted">
                <time dateTime={n.datum}>
                  {new Date(n.datum).toLocaleDateString("sv-SE", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
                <span className="px-1.5 py-0.5 rounded bg-tint-info text-brand-primary font-medium uppercase tracking-wider text-[10px]">{n.tag}</span>
              </div>
              <h3 className="font-medium mb-1">
                <a href="#" className="hover:text-brand-accent">{n.rubrik}</a>
              </h3>
              {idx === 0 ? (
                <Copy
                  label="Sammanfattning"
                  category="rubrik"
                  text={n.sammanfattning}
                  rationale="En mening om vad som hänt, skriven så att läsaren kan avgöra om nyheten är värd ett klick. Undvik att upprepa rubriken med andra ord."
                >
                  <p className="text-sm text-ink-secondary leading-relaxed">{n.sammanfattning}</p>
                </Copy>
              ) : (
                <p className="text-sm text-ink-secondary leading-relaxed">{n.sammanfattning}</p>
              )}
            </li>
          ))}
        </ol>
        </Annotation>
        <Annotation
          label="Visa fler nyheter"
          audience="user"
          rationale="Äldre nyheter läses in under de som redan syns, så besökaren behåller sin plats i listan i stället för att hamna på en ny sida."
        >
          <div className="mt-6 pl-6">
            <Copy
              label="Knapp för fler nyheter"
              category="cta"
              text="Visa fler nyheter"
              rationale="Verb plus objekt. 'Visa' är vardagligare än 'Ladda', som beskriver vad systemet gör snarare än vad besökaren får."
            >
              <a href="#" className="inline-flex items-center gap-1 text-sm text-brand-accent hover:underline">
                Visa fler nyheter
                <Icon name="expand_more" size={14} />
              </a>
            </Copy>
          </div>
        </Annotation>
      </section>
    </Annotation>
  );
}
