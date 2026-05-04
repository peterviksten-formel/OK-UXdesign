import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

const NYHETER = [
  { datum: "2026-04-15", tag: "Marknad", rubrik: "Elpriset sjunker inför sommaren, vad betyder det för dig?", sammanfattning: "Spotpriset har varit lågt hela mars och prognosen pekar mot en mild sommar." },
  { datum: "2026-04-08", tag: "Tjänster", rubrik: "Nu kan du följa din förbrukning i realtid via appen", sammanfattning: "Ny funktion i Mitt Öresundskraft, se förbrukning per timme, jämför med månader bakåt." },
  { datum: "2026-03-28", tag: "Hållbarhet", rubrik: "Framtidspengen finansierade 3 nya laddstationer i Helsingborg", sammanfattning: "Vinsten från våra avtal ger avkastning tillbaka till staden." },
  { datum: "2026-03-20", tag: "Marknad", rubrik: "Vad förändras med effekttariffen 2027?", sammanfattning: "Regeringen har beslutat att privatkunder inte ska ha effekttariff. Vi reder ut vad det betyder." },
  { datum: "2026-03-12", tag: "Drift", rubrik: "Planerat underhåll i Rydebäck, vad sker när?", sammanfattning: "Kabelarbete natten 22 april. Berörda kunder meddelas via SMS." },
];

/**
 * VARIANT C, Tidslinje
 *
 * Kronologisk lista utan bilder. Varje post har datum som visuell markör,
 * rubrik som länk, kort sammanfattning.
 *
 * Pro: Signalerar kontinuitet och uppdateringsfrekvens. Skalar obegränsat.
 * Kontra: Inte lika visuellt intressant. Gamla nyheter syns lika mycket.
 */
export function NyhetsTidslinje() {
  return (
    <Annotation
      label="Nyhets-tidslinje"
      audience="redaktör"
      rationale="Dates i en vänsterkolumn som en visuell tidslinje. Rubriken är H3 och länken. Kort sammanfattning under. Skalar till Nyhetsrum-sida eftersom nya poster bara tillkommer på toppen."
    >
      <section>
        <h2 className="text-h3 font-medium mb-6">Nyhetsflöde</h2>
        <ol className="relative border-l-2 border-border-subtle ml-2 space-y-6">
          {NYHETER.map((n) => (
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
              <p className="text-sm text-ink-secondary leading-relaxed">{n.sammanfattning}</p>
            </li>
          ))}
        </ol>
        <div className="mt-6 pl-6">
          <a href="#" className="inline-flex items-center gap-1 text-sm text-brand-accent hover:underline">
            Ladda fler nyheter
            <Icon name="expand_more" size={14} />
          </a>
        </div>
      </section>
    </Annotation>
  );
}
