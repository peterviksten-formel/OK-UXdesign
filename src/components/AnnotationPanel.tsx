import { useState } from "react";
import { useAnnotations } from "../lib/AnnotationContext";
import { Icon } from "./Icon";

/**
 * Slide-in panel that lists all annotations on the current page.
 * Click a row → scrolls the corresponding element into view + briefly highlights it.
 */
export function AnnotationPanel() {
  const { enabled, list, focus, focused } = useAnnotations();
  const [open, setOpen] = useState(true);

  if (!enabled || list.length === 0) return null;

  const audienceColor = (a: string) =>
    a === "user" ? "bg-tint-info text-brand-primary" :
    a === "redaktör" ? "bg-tint-notice text-brand-primary" :
    "bg-tint-highlight text-brand-primary";

  return (
    <>
      {/* Toggle tab ,  visible when panel is closed */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 px-3 py-2 rounded-l bg-brand-highlight text-white text-xs font-medium shadow-lg hover:opacity-90"
          aria-label="Öppna designanteckningar"
        >
          {list.length} anteckningar →
        </button>
      )}

      <aside
        className={`fixed top-0 right-0 z-40 h-full w-full sm:w-[360px] bg-elevated border-l border-border-subtle shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Designanteckningar"
      >
        <header className="px-5 py-4 border-b border-border-subtle flex items-center justify-between">
          <div>
            <h2 className="text-h5 font-medium">Designanteckningar</h2>
            <p className="text-xs text-ink-muted mt-0.5">
              {list.length} på denna sida
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-ink-muted hover:text-ink p-1"
            aria-label="Stäng panel"
          >
            <Icon name="close" size={18} />
          </button>
        </header>
        <ul className="flex-1 overflow-y-auto divide-y divide-border-subtle">
          {list.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => focus(a.id)}
                className={`w-full text-left px-5 py-4 hover:bg-tint-info focus:bg-tint-info transition-colors ${
                  focused === a.id ? "bg-tint-highlight" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-highlight text-white text-xs font-bold flex-shrink-0">
                    {a.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <span className="font-medium truncate">{a.label}</span>
                      <span className={`text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded ${audienceColor(a.audience)}`}>
                        {a.audience}
                      </span>
                    </div>
                    <p className="text-sm text-ink-secondary leading-relaxed">{a.rationale}</p>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
        <footer className="px-5 py-3 border-t border-border-subtle text-xs text-ink-muted">
          Klicka på en rad för att hitta elementet på sidan.
        </footer>
      </aside>
    </>
  );
}
