import { useState, type ReactNode } from "react";
import { DesignTheme } from "../lib/ThemeContext";

export type Variant = {
  id: string;
  shortName: string;       // "A" / "B" / "C"
  label: string;           // "Trygg", visas i knappen och tabellhuvudet
  oneLiner: string;        // En mening om vad varianten är
  riskLevel: "låg" | "medel" | "hög";
  bestFor: string;
  render: () => ReactNode;
};

export type ArgumentRow = {
  aspect: string;
  values: Record<string, string>; // keyed by variant id
};

type VariantSwitcherProps = {
  variants: Variant[];
  argumentation: ArgumentRow[];
  defaultId?: string;
};

const riskColor = (r: Variant["riskLevel"]) =>
  r === "låg" ? "bg-tint-info text-brand-primary" :
  r === "medel" ? "bg-tint-notice text-brand-primary" :
  "bg-tint-highlight text-brand-primary";

export function VariantSwitcher({ variants, argumentation, defaultId }: VariantSwitcherProps) {
  const [activeId, setActiveId] = useState<string>(defaultId ?? variants[0].id);
  const [showArguments, setShowArguments] = useState(false);
  const active = variants.find((v) => v.id === activeId) ?? variants[0];

  return (
    <div>
      {/* ─── Switcher bar ──────────────────────────────────────────────── */}
      <div className="sticky top-14 z-20 -mx-4 sm:-mx-6 px-4 sm:px-6 py-3 mb-6 bg-canvas/95 backdrop-blur border-b border-border-subtle">
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-ink-muted font-medium">
            Variant
          </div>
          <div
            role="tablist"
            aria-label="Designvarianter"
            className="flex flex-wrap gap-2 flex-1"
          >
            {variants.map((v) => {
              const isActive = v.id === activeId;
              return (
                <button
                  key={v.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveId(v.id)}
                  className={`group inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm border transition-colors ${
                    isActive
                      ? "bg-brand-primary text-ink-onbrand border-brand-primary"
                      : "bg-surface text-ink-secondary border-border-subtle hover:border-brand-accent hover:text-brand-accent"
                  }`}
                >
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold ${
                    isActive ? "bg-white/20" : "bg-tint-info text-brand-primary"
                  }`}>
                    {v.shortName}
                  </span>
                  <span className="font-medium">{v.label}</span>
                  <span className={`hidden sm:inline text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    isActive ? "bg-white/15 text-white" : riskColor(v.riskLevel)
                  }`}>
                    risk {v.riskLevel}
                  </span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setShowArguments((s) => !s)}
            className={`text-sm px-3 py-2 rounded-md border transition-colors ${
              showArguments
                ? "bg-brand-highlight text-white border-brand-highlight"
                : "bg-transparent text-ink-secondary border-border-strong hover:bg-tint-highlight"
            }`}
            aria-expanded={showArguments}
          >
            {showArguments ? "Dölj argumentation" : "Jämför varianter"}
          </button>
        </div>
        <p className="text-xs text-ink-muted mt-2 italic">
          {active.oneLiner} · <span className="font-medium not-italic text-ink-secondary">Bäst för:</span> {active.bestFor}
        </p>
      </div>

      {/* ─── Argumentation (utfällbar panel) ──────────────────────────────────────── */}
      {showArguments && (
        <section
          className="mb-8 rounded-md border border-border-subtle bg-surface overflow-hidden"
          aria-label="Argumentation: jämförelse mellan varianter"
        >
          <header className="px-5 py-3 border-b border-border-subtle bg-tint-info">
            <h2 className="text-h5 font-medium">Argumentation: för- och nackdelar per variant</h2>
            <p className="text-xs text-ink-muted mt-0.5">
              Tre strategiska val, och inget av dem är det enda rätta. Använd jämförelsen som underlag när ni diskuterar vilken variant som passar Öresundskrafts mål och målgrupper bäst.
            </p>
          </header>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th scope="col" className="text-left px-4 py-3 font-medium text-ink-muted text-xs uppercase tracking-wider w-1/4">
                    Aspekt
                  </th>
                  {variants.map((v) => (
                    <th key={v.id} scope="col" className="text-left px-4 py-3 font-medium">
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[11px] font-bold bg-tint-info text-brand-primary`}>
                          {v.shortName}
                        </span>
                        {v.label}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {argumentation.map((row) => (
                  <tr key={row.aspect} className="border-b border-border-subtle last:border-0 align-top">
                    <th scope="row" className="text-left px-4 py-3 font-medium text-ink-secondary">
                      {row.aspect}
                    </th>
                    {variants.map((v) => (
                      <td key={v.id} className="px-4 py-3 text-ink-secondary leading-relaxed">
                        {row.values[v.id] ?? "Ej angivet"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ─── Active variant ─────────────────────────────────────────────── */}
      {/* Bara varianten följer valt tema, verktyget runt omkring är ljust. */}
      <DesignTheme key={active.id} className="-mx-4 sm:-mx-6 px-4 sm:px-6 py-6 rounded-xl">
        {active.render()}
      </DesignTheme>
    </div>
  );
}
