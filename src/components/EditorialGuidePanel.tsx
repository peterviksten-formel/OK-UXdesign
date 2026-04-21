import { useState } from "react";
import { useEditorialGuide, type CopyCategory } from "../lib/EditorialGuideContext";

const CAT_LABEL: Record<CopyCategory, string> = {
  rubrik: "Rubrik",
  cta: "CTA",
  reassurance: "Reassurance",
  faq: "FAQ",
  ton: "Ton",
  metadata: "Metadata",
};

const CAT_COLOR: Record<CopyCategory, string> = {
  rubrik: "bg-tint-info text-brand-primary",
  cta: "bg-tint-highlight text-brand-primary",
  reassurance: "bg-tint-notice text-brand-primary",
  faq: "bg-tint-info text-brand-primary",
  ton: "bg-tint-highlight text-brand-primary",
  metadata: "bg-tint-notice text-brand-primary",
};

export function EditorialGuidePanel() {
  const { enabled, list, brief, focus, focused } = useEditorialGuide();
  const [open, setOpen] = useState(true);

  if (!enabled) return null;

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed left-0 top-1/2 -translate-y-1/2 z-40 px-3 py-2 rounded-r bg-brand-primary text-white text-xs font-medium shadow-lg hover:opacity-90"
          aria-label="Öppna copy-guide"
        >
          ← Copy-guide {list.length > 0 ? `(${list.length})` : ""}
        </button>
      )}

      <aside
        className={`fixed top-0 left-0 z-40 h-full w-full sm:w-[380px] bg-elevated border-r border-border-subtle shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Copy-guide"
      >
        <header className="px-5 py-4 border-b border-border-subtle flex items-center justify-between">
          <div>
            <h2 className="text-h5 font-medium">Copy-guide</h2>
            <p className="text-xs text-ink-muted mt-0.5">
              Varför orden är valda som de är
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-ink-muted hover:text-ink p-1"
            aria-label="Stäng panel"
          >
            ✕
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          {brief && (
            <section className="px-5 py-4 bg-tint-info border-b border-border-subtle">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-brand-primary mb-2">
                Sidtyp-brief
              </h3>
              <dl className="space-y-2 text-sm">
                <div>
                  <dt className="text-ink-muted text-xs">Kategori</dt>
                  <dd className="font-medium">{brief.kategori}</dd>
                </div>
                <div>
                  <dt className="text-ink-muted text-xs">Syfte</dt>
                  <dd>{brief.syfte}</dd>
                </div>
                <div>
                  <dt className="text-ink-muted text-xs">Målgrupp</dt>
                  <dd>{brief.malgrupp}</dd>
                </div>
                <div>
                  <dt className="text-ink-muted text-xs">Primär handling</dt>
                  <dd>{brief.primarHandling}</dd>
                </div>
                <div>
                  <dt className="text-ink-muted text-xs">Ton</dt>
                  <dd>{brief.ton}</dd>
                </div>
              </dl>
            </section>
          )}

          {list.length === 0 ? (
            <p className="px-5 py-6 text-sm text-ink-muted">
              Ingen copy-guide på denna sida ännu.
            </p>
          ) : (
            <ul className="divide-y divide-border-subtle">
              {list.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => focus(c.id)}
                    className={`w-full text-left px-5 py-4 hover:bg-tint-info focus:bg-tint-info transition-colors ${
                      focused === c.id ? "bg-tint-highlight" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded bg-brand-primary text-white text-xs font-bold flex-shrink-0">
                        {c.num}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2 mb-1">
                          <span className="font-medium truncate">{c.label}</span>
                          <span className={`text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded ${CAT_COLOR[c.category]}`}>
                            {CAT_LABEL[c.category]}
                          </span>
                        </div>
                        <p className="text-sm text-ink leading-snug mb-1.5 font-medium italic">
                          "{c.text}"
                        </p>
                        <p className="text-sm text-ink-secondary leading-relaxed">{c.rationale}</p>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="px-5 py-3 border-t border-border-subtle text-xs text-ink-muted">
          Klicka för att hitta texten på sidan.
        </footer>
      </aside>
    </>
  );
}
