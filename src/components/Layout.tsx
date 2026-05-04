import { Link, Outlet, useLocation } from "react-router-dom";
import { useTheme } from "../lib/ThemeContext";
import { useAnnotations } from "../lib/AnnotationContext";
import { useEditorialGuide } from "../lib/EditorialGuideContext";
import { useEditMode } from "../lib/EditModeContext";
import { useViewport, VIEWPORT_WIDTH, type Viewport } from "../lib/ViewportContext";
import { useInspector } from "../lib/InspectorContext";
import { InspectorPanel } from "./InspectorPanel";
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
  const { enabled: editOn, toggle: toggleEdit, resetAll } = useEditMode();
  const { viewport, set: setViewport } = useViewport();
  const { openOn, panelOpen } = useInspector();
  const location = useLocation();

  /**
   * En samlad UX-guide-knapp i headern slår av/på alla tre lägen samtidigt
   * (design-anteckningar, copy-guide, redigeringsläge). Panelen visar sedan
   * innehållet bakom tre flikar. När alla tre är av försvinner panelen.
   */
  const uxGuideOn = annoOn || copyOn || editOn;
  const totalMarkers = annoList.length + copyList.length;

  function handleToggleUxGuide() {
    if (uxGuideOn) {
      // Slå av allt
      if (annoOn) toggleAnno();
      if (copyOn) toggleCopy();
      if (editOn) toggleEdit();
    } else {
      // Slå på alla tre + landa på Design-fliken
      openOn("ux");
      if (!annoOn) toggleAnno();
      if (!copyOn) toggleCopy();
      if (!editOn) toggleEdit();
    }
  }

  function handleResetAll() {
    if (confirm("Återställer alla sidtyper till rekommenderad variant. Sparade presets behålls. Fortsätt?")) {
      resetAll();
    }
  }

  const vpWidth = VIEWPORT_WIDTH[viewport];
  const framed = vpWidth != null;

  // ?framed=1 signals "render this route inside an iframe ,  no chrome".
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

  // När UX-guide-panelen är öppen ska sidans innehåll krympa sidledes
  // så panelen inte överlappar. Panelen själv är fixed-positioned och
  // påverkas inte av margin på wrappern.
  const panelVisible = uxGuideOn && panelOpen;

  return (
    <div
      className={`min-h-screen flex flex-col bg-canvas text-ink transition-[margin] duration-300 ease-out motion-reduce:transition-none ${
        panelVisible ? "sm:mr-[380px]" : ""
      }`}
    >
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
            <Link
              to="/"
              className={`px-3 py-1.5 rounded hover:bg-tint-info inline-flex items-center gap-1.5 ${
                location.pathname === "/" ? "text-brand-primary font-medium" : "text-ink-secondary"
              }`}
            >
              <Icon name="grid_view" size={16} />
              Översikt
            </Link>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleUxGuide}
              className={`text-xs px-2.5 py-1.5 rounded border transition-colors inline-flex items-center gap-1.5 ${
                uxGuideOn
                  ? "bg-brand-primary text-white border-brand-primary"
                  : "bg-transparent text-ink-secondary border-border-strong hover:bg-tint-info"
              }`}
              aria-pressed={uxGuideOn}
              title={uxGuideOn ? "Stäng UX-guide" : "Öppna UX-guide (design, copy, redigera)"}
            >
              {uxGuideOn ? <Icon name="check" size={14} /> : <Icon name="tips_and_updates" size={14} />}
              UX-guide
              {uxGuideOn && totalMarkers > 0 ? ` (${totalMarkers})` : ""}
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
                {viewport === "tablet" ? "Tablet ,  834 px" : "Mobile ,  390 px"}
              </span>
              <span className="ml-auto text-ink-muted italic">
                riktig viewport-simulation ,  Tailwind-breakpoints fyrar
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

      <footer className="border-t border-border-subtle py-6 text-center text-xs text-ink-muted flex flex-wrap items-center justify-center gap-x-3 gap-y-1 px-4">
        <span>Prototyp · ej offentlig produkt · placeholder-innehåll</span>
        <span aria-hidden="true" className="opacity-50">·</span>
        <button
          type="button"
          onClick={handleResetAll}
          className="inline-flex items-center gap-1 hover:text-brand-accent underline underline-offset-2"
          title="Nollställer block-ordning, dolda block och variantval för alla sidtyper"
        >
          <Icon name="restart_alt" size={12} />
          Återställ alla sidtyper
        </button>
      </footer>

      <InspectorPanel />
    </div>
  );
}
