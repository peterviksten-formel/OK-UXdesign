import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../lib/ThemeContext";
import { useAnnotations } from "../lib/AnnotationContext";
import { useEditorialGuide } from "../lib/EditorialGuideContext";
import { useEditMode } from "../lib/EditModeContext";
import { useViewport, VIEWPORT_WIDTH, type Viewport } from "../lib/ViewportContext";
import { AnnotationPanel } from "./AnnotationPanel";
import { EditorialGuidePanel } from "./EditorialGuidePanel";
import { EditModeBar } from "./EditModeBar";
import { Icon } from "./Icon";

const VP_OPTIONS: { key: Viewport; label: string; icon: string }[] = [
  { key: "desktop", label: "Desktop", icon: "desktop_windows" },
  { key: "tablet", label: "Tablet", icon: "tablet_mac" },
  { key: "mobile", label: "Mobile", icon: "smartphone" },
];

export function Layout() {
  const { theme, toggle } = useTheme();
  const { enabled: annoOn, toggle: toggleAnno, list: annoList } = useAnnotations();
  const { enabled: copyOn, toggle: toggleCopy, list: copyList } = useEditorialGuide();
  const { enabled: editOn, toggle: toggleEdit } = useEditMode();
  const { viewport, set: setViewport } = useViewport();
  const location = useLocation();

  const vpWidth = VIEWPORT_WIDTH[viewport];
  const framed = vpWidth != null;

  // ?framed=1 signals "render this route inside an iframe — no chrome".
  // Used when the parent window is simulating a mobile/tablet viewport.
  const isFramedChild = typeof window !== "undefined" &&
    new URLSearchParams(window.location.search).get("framed") === "1";

  if (isFramedChild) {
    return (
      <main id="main" className="min-h-screen bg-canvas text-ink">
        <Outlet />
      </main>
    );
  }

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
              className={`text-xs px-2.5 py-1.5 rounded border transition-colors inline-flex items-center gap-1 ${
                annoOn
                  ? "bg-brand-highlight text-white border-brand-highlight"
                  : "bg-transparent text-ink-secondary border-border-strong hover:bg-tint-highlight"
              }`}
              aria-pressed={annoOn}
              title={annoOn ? "Dölj designanteckningar" : "Visa designanteckningar"}
            >
              {annoOn && <Icon name="check" size={14} />}
              Anteckningar
              {annoOn && annoList.length > 0 ? ` (${annoList.length})` : ""}
            </button>
            <button
              type="button"
              onClick={toggleCopy}
              className={`text-xs px-2.5 py-1.5 rounded border transition-colors inline-flex items-center gap-1 ${
                copyOn
                  ? "bg-brand-primary text-white border-brand-primary"
                  : "bg-transparent text-ink-secondary border-border-strong hover:bg-tint-info"
              }`}
              aria-pressed={copyOn}
              title={copyOn ? "Dölj copy-guide" : "Visa copy-guide"}
            >
              {copyOn && <Icon name="check" size={14} />}
              Copy-guide
              {copyOn && copyList.length > 0 ? ` (${copyList.length})` : ""}
            </button>
            <button
              type="button"
              onClick={toggleEdit}
              className={`text-xs px-2.5 py-1.5 rounded border transition-colors inline-flex items-center gap-1 ${
                editOn
                  ? "bg-brand-accent text-white border-brand-accent"
                  : "bg-transparent text-ink-secondary border-border-strong hover:bg-tint-info"
              }`}
              aria-pressed={editOn}
              title={editOn ? "Avsluta redigering" : "Redigera sidtyp"}
            >
              {editOn && <Icon name="check" size={14} />}
              Redigera
            </button>

            <div
              role="radiogroup"
              aria-label="Visningsstorlek"
              className="inline-flex items-center rounded border border-border-strong overflow-hidden"
            >
              {VP_OPTIONS.map((opt) => {
                const active = viewport === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setViewport(opt.key)}
                    role="radio"
                    aria-checked={active}
                    title={opt.label}
                    className={`px-2 py-1.5 transition-colors flex items-center justify-center ${
                      active ? "bg-brand-primary text-white" : "text-ink-secondary hover:bg-tint-info"
                    }`}
                  >
                    <Icon name={opt.icon} size={18} aria-label={opt.label} />
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={toggle}
              className="p-1.5 rounded border border-border-strong text-ink-secondary hover:bg-tint-info flex items-center justify-center"
              aria-label={theme === "light" ? "Aktivera mörkt läge" : "Aktivera ljust läge"}
              title={theme === "light" ? "Mörkt läge" : "Ljust läge"}
            >
              <Icon
                name={theme === "light" ? "dark_mode" : "light_mode"}
                size={18}
                aria-label={theme === "light" ? "Mörkt läge" : "Ljust läge"}
              />
            </button>
          </div>
        </div>
      </header>

      <EditModeBar />

      {framed && vpWidth ? (
        <div className="flex-1 py-6 bg-canvas flex justify-center overflow-auto">
          <div
            className="bg-surface border border-border-strong rounded-2xl shadow-lg overflow-hidden transition-all duration-300 flex flex-col"
            style={{ width: vpWidth, maxWidth: "100%" }}
          >
            <div className="px-3 py-1.5 border-b border-border-subtle bg-tint-info flex items-center gap-1.5 text-[10px] text-ink-muted shrink-0">
              <Icon name="circle" size={8} filled style={{ color: "#FF5F57" }} />
              <Icon name="circle" size={8} filled style={{ color: "#FFBD2E" }} />
              <Icon name="circle" size={8} filled style={{ color: "#28C840" }} />
              <span className="ml-2 font-medium">
                {viewport === "tablet" ? "Tablet — 834 px" : "Mobile — 390 px"}
              </span>
              <span className="ml-auto text-ink-muted italic">
                riktig viewport-simulation — Tailwind-breakpoints fyrar
              </span>
            </div>
            {/* iframe gives the inner app a real viewport width, so sm:/md:/lg:
                Tailwind-breakpoints see the frame width, not the outer browser. */}
            <iframe
              key={`${viewport}-${location.pathname}-${location.search}`}
              src={`${location.pathname}${location.search ? location.search + "&" : "?"}framed=1`}
              title="Viewport-förhandsvisning"
              className="w-full flex-1 border-0 bg-canvas"
              style={{ height: "calc(100vh - 180px)" }}
            />
          </div>
        </div>
      ) : (
        <main id="main" className="flex-1">
          <Outlet />
        </main>
      )}

      <footer className="border-t border-border-subtle py-6 text-center text-xs text-ink-muted">
        Prototyp · ej offentlig produkt · placeholder-innehåll
      </footer>

      <AnnotationPanel />
      <EditorialGuidePanel />
    </div>
  );
}
