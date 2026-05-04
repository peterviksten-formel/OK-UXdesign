import { Annotation } from "../../../components/Annotation";
import { AVBROTT, STATUS_META, TYP_LABEL, type AvbrottStatus } from "../avbrott-data";

/**
 * VARIANT A, Trygg
 *
 * Strategy: a plain, time-ordered list grouped by status. No filters,
 * no map, no live-updating. Closest to a news bulletin. Each item shows
 * all details up front, no expand/collapse. Sorterat med pågående överst.
 */
export function AvbrottTrygg() {
  const groups: AvbrottStatus[] = ["pagaende", "planerat", "avslutat"];

  return (
    <div>
      <Annotation
        label="Statusgrupperad lista"
        audience="design"
        rationale="Pågående → Planerat → Avslutat. Ordningen speglar brådska. Inga filter, inga tabs, allt synligt i en enda scroll. Lägsta kognitiva last."
      >
        <div className="space-y-8">
          {groups.map((status) => {
            const items = AVBROTT.filter((a) => a.status === status);
            if (items.length === 0) return null;
            const meta = STATUS_META[status];
            return (
              <section key={status}>
                <div className="flex items-center gap-2 mb-4">
                  <span className={`w-2.5 h-2.5 rounded-full ${meta.dotColor}`} />
                  <h3 className="text-h4 font-medium">{meta.label}</h3>
                  <span className="text-xs text-ink-muted">({items.length})</span>
                </div>
                <div className="space-y-3">
                  {items.map((a) => (
                    <article key={a.id} className="border border-border-subtle rounded-md bg-surface p-5">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <h4 className="font-medium">{a.rubrik}</h4>
                        <div className="flex gap-2">
                          <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded ${meta.color}`}>
                            {meta.label}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded bg-tint-info text-brand-primary">
                            {TYP_LABEL[a.typ]}
                          </span>
                        </div>
                      </div>
                      <dl className="text-sm grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-1 mb-3">
                        <div>
                          <dt className="text-ink-muted">Område</dt>
                          <dd>{a.omrade}</dd>
                        </div>
                        <div>
                          <dt className="text-ink-muted">Start</dt>
                          <dd>{a.start}</dd>
                        </div>
                        <div>
                          <dt className="text-ink-muted">{a.slutFaktiskt ? "Slut" : "Beräknat slut"}</dt>
                          <dd>{a.slutFaktiskt ?? a.slutBeraknat ?? "–"}</dd>
                        </div>
                        <div>
                          <dt className="text-ink-muted">Berörda kunder</dt>
                          <dd>~{a.berordaKunder}</dd>
                        </div>
                      </dl>
                      <p className="text-sm text-ink-secondary">{a.beskrivning}</p>
                      {a.uppdateringar && (
                        <div className="mt-3 pt-3 border-t border-border-subtle">
                          <p className="text-xs font-medium text-ink-muted uppercase tracking-wider mb-2">Uppdateringar</p>
                          <ul className="space-y-1 text-sm text-ink-secondary">
                            {a.uppdateringar.map((u) => (
                              <li key={u.tid} className="flex gap-2">
                                <span className="text-ink-muted font-medium w-12 flex-shrink-0">{u.tid}</span>
                                <span>{u.text}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </Annotation>
    </div>
  );
}
