import { useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { AVBROTT, STATUS_META, TYP_LABEL, type AvbrottStatus } from "../avbrott-data";

/**
 * VARIANT B, Progressiv
 *
 * Strategy: tab-filtered list with status counts. Each tab shows its subset.
 * Items use a compact card with expandable timeline. A top "akutbar" shows
 * pågående avbrott count + felanmälan link.
 */
export function AvbrottProgressiv() {
  const [filter, setFilter] = useState<AvbrottStatus | "alla">("alla");
  const [expanded, setExpanded] = useState<string | null>(null);

  const counts = {
    alla: AVBROTT.length,
    pagaende: AVBROTT.filter((a) => a.status === "pagaende").length,
    planerat: AVBROTT.filter((a) => a.status === "planerat").length,
    avslutat: AVBROTT.filter((a) => a.status === "avslutat").length,
  };

  const filtered = filter === "alla" ? AVBROTT : AVBROTT.filter((a) => a.status === filter);
  const pagaendeCount = counts.pagaende;

  return (
    <div>
      {/* ─── Akutbar ──────────────────────────────────────────────────── */}
      {pagaendeCount > 0 && (
        <Annotation
          label="Akutbar"
          audience="user"
          rationale="Om det finns pågående avbrott just nu = röd/orange bar med antal + felanmälningslänk. Syns bara när det finns aktiva avbrott."
        >
          <div className="mb-6 p-4 rounded-md bg-brand-highlight text-white flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              <span className="font-medium">
                {pagaendeCount} pågående avbrott just nu
              </span>
            </div>
            <a
              href="#"
              className="text-sm underline underline-offset-2 hover:opacity-80"
            >
              Gör felanmälan →
            </a>
          </div>
        </Annotation>
      )}

      {/* ─── Filter-tabs ──────────────────────────────────────────────── */}
      <Annotation
        label="Statusfilter"
        audience="design"
        rationale="Tabs med räknare. 'Alla' som default. Pågående pulsar med röd punkt. Tabs = snabb scanning utan att scrolla igenom hela listan."
      >
        <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Filtrera avbrott">
          {(["alla", "pagaende", "planerat", "avslutat"] as const).map((s) => {
            const isActive = filter === s;
            const label = s === "alla" ? "Alla" : STATUS_META[s].label;
            return (
              <button
                key={s}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => { setFilter(s); setExpanded(null); }}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm border transition-colors ${
                  isActive
                    ? "bg-brand-primary text-ink-onbrand border-brand-primary"
                    : "bg-surface text-ink-secondary border-border-subtle hover:border-brand-accent"
                }`}
              >
                {s !== "alla" && (
                  <span className={`w-2 h-2 rounded-full ${STATUS_META[s].dotColor} ${s === "pagaende" ? "animate-pulse" : ""}`} />
                )}
                {label}
                <span className={`text-xs ${isActive ? "opacity-70" : "text-ink-muted"}`}>
                  ({counts[s]})
                </span>
              </button>
            );
          })}
        </div>
      </Annotation>

      {/* ─── Card list ────────────────────────────────────────────────── */}
      <Annotation
        label="Avbrottskort"
        audience="design"
        rationale="Kompakta kort med nyckelinfo synlig. Klick expanderar tidslinje (om det finns uppdateringar). Pågående kort har accentfärg. Allt on-screen, inga modaler."
      >
        <div className="space-y-3">
          {filtered.map((a) => {
            const meta = STATUS_META[a.status];
            const isOpen = expanded === a.id;
            const hasTL = a.uppdateringar && a.uppdateringar.length > 0;

            return (
              <article
                key={a.id}
                className={`rounded-md border bg-surface overflow-hidden transition-colors ${
                  a.status === "pagaende" ? "border-brand-highlight" : "border-border-subtle"
                }`}
              >
                <div
                  className="px-5 py-4 flex flex-wrap items-start gap-x-6 gap-y-2 cursor-pointer hover:bg-tint-info/50 transition-colors"
                  onClick={() => hasTL && setExpanded(isOpen ? null : a.id)}
                  role={hasTL ? "button" : undefined}
                  aria-expanded={hasTL ? isOpen : undefined}
                  tabIndex={hasTL ? 0 : undefined}
                  onKeyDown={(e) => hasTL && e.key === "Enter" && setExpanded(isOpen ? null : a.id)}
                >
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${meta.dotColor} ${a.status === "pagaende" ? "animate-pulse" : ""}`} />
                    <h4 className="font-medium truncate">{a.rubrik}</h4>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-ink-muted">
                    <span className={`uppercase tracking-wider font-medium px-2 py-0.5 rounded ${meta.color}`}>
                      {meta.label}
                    </span>
                    <span>{TYP_LABEL[a.typ]}</span>
                    <span>{a.omrade}</span>
                    <span>~{a.berordaKunder} kunder</span>
                    {hasTL && (
                      <span className={`text-sm transition-transform ${isOpen ? "rotate-180" : ""}`}>▼</span>
                    )}
                  </div>
                </div>

                {/* Expandable detail */}
                {isOpen && a.uppdateringar && (
                  <div className="px-5 pb-4 border-t border-border-subtle pt-3">
                    <p className="text-sm text-ink-secondary mb-3">{a.beskrivning}</p>
                    <div className="relative pl-4 border-l-2 border-border-subtle space-y-3">
                      {a.uppdateringar.map((u, i) => (
                        <div key={u.tid} className="relative">
                          <span className={`absolute -left-[calc(1rem+5px)] w-2.5 h-2.5 rounded-full border-2 border-canvas ${
                            i === a.uppdateringar!.length - 1 ? meta.dotColor : "bg-border-strong"
                          }`} />
                          <p className="text-sm">
                            <span className="font-medium text-ink-muted mr-2">{u.tid}</span>
                            <span className="text-ink-secondary">{u.text}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-3 text-sm">
                      <span className="text-ink-muted">Start: {a.start}</span>
                      <span className="text-ink-muted">
                        {a.slutFaktiskt ? `Slut: ${a.slutFaktiskt}` : `Beräknat: ${a.slutBeraknat}`}
                      </span>
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </Annotation>
    </div>
  );
}
