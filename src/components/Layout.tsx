import { Link, NavLink, Outlet } from "react-router-dom";
import { useTheme } from "../lib/ThemeContext";
import { useAnnotations } from "../lib/AnnotationContext";
import { AnnotationPanel } from "./AnnotationPanel";

export function Layout() {
  const { theme, toggle } = useTheme();
  const { enabled, toggle: toggleAnno, list } = useAnnotations();

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-3 focus:py-2 focus:bg-brand-highlight focus:text-white focus:rounded"
      >
        Hoppa till innehåll
      </a>

      <header className="border-b border-border-subtle bg-surface/80 backdrop-blur sticky top-0 z-30">
        <div className="max-w-content mx-auto px-4 sm:px-6 h-14 flex items-center gap-4">
          <Link to="/" className="font-medium text-brand-primary hover:opacity-80 flex items-center gap-2">
            <span className="inline-block w-7 h-7 rounded bg-brand-primary text-white grid place-items-center font-bold text-sm">
              Ö
            </span>
            <span className="hidden sm:inline">Öresundskraft · UX Prototyp</span>
            <span className="sm:hidden">ÖK · UX</span>
          </Link>
          <nav className="hidden md:flex items-center gap-1 text-sm ml-4">
            <NavLink
              to="/sidtyper"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded hover:bg-tint-info ${isActive ? "text-brand-primary font-medium" : "text-ink-secondary"}`
              }
            >
              Sidtyper
            </NavLink>
            <NavLink
              to="/moduler"
              className={({ isActive }) =>
                `px-3 py-1.5 rounded hover:bg-tint-info ${isActive ? "text-brand-primary font-medium" : "text-ink-secondary"}`
              }
            >
              Moduler
            </NavLink>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={toggleAnno}
              className={`text-xs px-3 py-1.5 rounded border transition-colors ${
                enabled
                  ? "bg-brand-highlight text-white border-brand-highlight"
                  : "bg-transparent text-ink-secondary border-border-strong hover:bg-tint-highlight"
              }`}
              aria-pressed={enabled}
              title={enabled ? "Dölj designanteckningar" : "Visa designanteckningar"}
            >
              {enabled ? "✓ Anteckningar på" : "Anteckningar"}
              {enabled && list.length > 0 ? ` (${list.length})` : ""}
            </button>
            <button
              type="button"
              onClick={toggle}
              className="text-sm px-3 py-1.5 rounded border border-border-strong text-ink-secondary hover:bg-tint-info"
              aria-label={theme === "light" ? "Aktivera mörkt läge" : "Aktivera ljust läge"}
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
          </div>
        </div>
      </header>

      <main id="main" className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-border-subtle py-6 text-center text-xs text-ink-muted">
        Prototyp · ej offentlig produkt · placeholder-innehåll
      </footer>

      <AnnotationPanel />
    </div>
  );
}
