import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

const NYHETER = [
  { datum: "2026-04-15", tag: "Marknad", rubrik: "Elpriset sjunker inför sommaren, vad betyder det för dig?" },
  { datum: "2026-04-08", tag: "Tjänster", rubrik: "Nu kan du följa din förbrukning i realtid via appen" },
  { datum: "2026-03-28", tag: "Hållbarhet", rubrik: "Framtidspengen finansierade 3 nya laddstationer i Helsingborg" },
];

/**
 * VARIANT A, Grid likvärdig
 *
 * Tre kort i rad. Alla lika stora, inga visuella hierarkier.
 *
 * Pro: Demokratiskt, lätt att bygga, förutsägbart.
 * Kontra: Inga utvalda nyheter, redaktören kan inte lyfta något.
 */
export function NyhetsGrid() {
  return (
    <Annotation
      label="Nyhets-grid likvärdig"
      audience="redaktör"
      rationale="Tre kort, ingen visuell hierarki. Rubriken är länken, inte 'Läs mer' (Krug: etiketter ska förklara vart länken leder). Datum i <time>-tag, kategori som pill. Bild som placeholder."
    >
      <section>
        <h2 className="text-h3 font-medium mb-6">Senaste nytt om el</h2>
        <div className="grid sm:grid-cols-3 gap-4 mb-4">
          {NYHETER.map((n) => (
            <a
              key={n.rubrik}
              href="#"
              className="group block rounded-md border border-border-subtle bg-surface overflow-hidden hover:border-brand-accent transition-all"
            >
              <div className="bg-tint-info aspect-[16/9] flex items-center justify-center text-ink-muted">
                <Icon name="image" size={36} />
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2 text-xs text-ink-muted">
                  <time dateTime={n.datum}>{n.datum}</time>
                  <span className="px-1.5 py-0.5 rounded bg-tint-info text-brand-primary font-medium uppercase tracking-wider text-[10px]">{n.tag}</span>
                </div>
                <h3 className="text-sm font-medium group-hover:text-brand-accent leading-snug">{n.rubrik}</h3>
              </div>
            </a>
          ))}
        </div>
        <a href="#" className="text-sm text-brand-accent hover:underline">Visa alla nyheter om el →</a>
      </section>
    </Annotation>
  );
}
