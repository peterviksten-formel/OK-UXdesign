import { useEffect, useState } from "react";
import { Icon } from "./Icon";

/**
 * Sticky köp-/lead-CTA-panel ,  delar logik mellan två renderingar:
 *
 *   • <StickyPurchaseSidebar>    Desktop, sticky kort i grid-kolumn höger.
 *   • <StickyPurchaseBottomBar>  Mobil, fixed bottom-bar i nederkant.
 *
 * Renderas separat eftersom desktop måste ligga inuti en grid-kolumn (för
 * att sticky ska fungera relativt kolumnen) och mobil-baren måste ligga
 * utanför wrappers med `display: none` på sm-/md-bredd. Båda delar
 * `useFormHidden`-hooken så de göms samtidigt när målformuläret är synligt
 * i viewport ,  CTA dubbleras inte när användaren har nått köpyttan.
 */

export type StickyPurchasePanelProps = {
  /** Liten överrubrik (t.ex. "Din beställning" / "Kostnadsfri rådgivning") */
  eyebrow: string;
  /** Stort mittfält (t.ex. "14 900 kr" eller "Boka tid med Anna") */
  title: string;
  /** Underrad för pris/villkor (t.ex. "inkl. installation · rotavdrag") */
  subtitle?: string;
  /** Primär CTA-label */
  ctaLabel: string;
  /** Anchor som CTA:n hoppar till */
  ctaHref: string;
  /** Korta reassurance-punkter (max 3) ,  visas bara på desktop-varianten */
  reassurance?: string[];
  /** Säljkontakt ,  visas bara på desktop-varianten */
  saljare?: { initialer: string; namn: string; roll: string };
  /**
   * CSS-selector för formulär-elementet som ska gömma panelen
   * när det är synligt i viewport (t.ex. "#bestall", "#lead-form").
   */
  hideWhenSelector?: string;
};

/* ─── Delad hook ,  hide-on-form intersection ──────────────────── */

function useFormHidden(selector?: string): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!selector) return;
    const target = document.querySelector(selector);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setHidden(entry.isIntersecting),
      // -120px från toppen ger panelen lite andrum innan den göms;
      // -40% från botten gör att panelen göms när formuläret är väl etablerat.
      { rootMargin: "-120px 0px -40% 0px", threshold: 0 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [selector]);

  return hidden;
}

/* ─── Desktop ,  sticky i höger kolumn ──────────────────────────── */

export function StickyPurchaseSidebar(props: StickyPurchasePanelProps) {
  const hidden = useFormHidden(props.hideWhenSelector);
  const { eyebrow, title, subtitle, ctaLabel, ctaHref, reassurance, saljare } = props;

  return (
    <div
      className={`sticky top-20 transition-opacity duration-200 motion-reduce:transition-none ${
        hidden ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      aria-hidden={hidden}
    >
      <aside
        className="rounded-md border-2 border-brand-accent bg-surface shadow-md p-5"
        aria-label={`${eyebrow}: ${title}`}
      >
        <p className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-1">
          {eyebrow}
        </p>
        <p className="text-h3 font-medium leading-tight mb-1">{title}</p>
        {subtitle && (
          <p className="text-sm text-ink-secondary mb-4">{subtitle}</p>
        )}

        <a
          href={ctaHref}
          className="w-full inline-flex items-center justify-center gap-2 bg-brand-primary text-ink-onbrand font-medium py-3 rounded hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
        >
          {ctaLabel}
          <Icon name="arrow_forward" size={16} />
        </a>

        {reassurance && reassurance.length > 0 && (
          <ul className="mt-4 space-y-1.5">
            {reassurance.slice(0, 3).map((r) => (
              <li
                key={r}
                className="flex items-start gap-2 text-xs text-ink-secondary leading-snug"
              >
                <Icon
                  name="check"
                  size={14}
                  className="text-brand-accent shrink-0 mt-0.5"
                />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        )}

        {saljare && (
          <div className="mt-5 pt-4 border-t border-border-subtle flex items-center gap-3">
            <span className="shrink-0 w-9 h-9 rounded-full bg-brand-primary text-white grid place-items-center font-medium text-sm">
              {saljare.initialer}
            </span>
            <div className="min-w-0">
              <p className="text-[11px] uppercase tracking-wider text-ink-muted font-medium">
                Din rådgivare
              </p>
              <p className="text-sm font-medium truncate">{saljare.namn}</p>
              <p className="text-xs text-ink-muted truncate">{saljare.roll}</p>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

/* ─── Fixed bottom-bar (mobil default, desktop opt-in) ──────────── */

export function StickyPurchaseBottomBar(
  props: StickyPurchasePanelProps & {
    /** Default false — barrar bara på <lg. När true visas även på desktop. */
    desktopVisible?: boolean;
    /** Default 'sm'. 'lg' ger ~60 % större yta (mer padding + större typ). */
    size?: "sm" | "lg";
  },
) {
  const hidden = useFormHidden(props.hideWhenSelector);
  const {
    eyebrow,
    title,
    subtitle,
    ctaLabel,
    ctaHref,
    desktopVisible = false,
    size = "sm",
  } = props;

  const isLg = size === "lg";

  return (
    <div
      className={`${desktopVisible ? "" : "lg:hidden "}fixed bottom-0 left-0 right-0 z-30 border-t border-border-subtle bg-elevated/95 backdrop-blur shadow-[0_-4px_12px_rgba(0,0,0,0.08)] transition-transform duration-200 ease-out motion-reduce:transition-none ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
      aria-hidden={hidden}
    >
      <div
        className={`max-w-content mx-auto px-4 sm:px-6 ${isLg ? "py-5" : "py-3"} flex items-center gap-3`}
      >
        <div className="min-w-0 flex-1">
          <p
            className={`uppercase tracking-wider text-ink-muted font-medium leading-none ${isLg ? "text-xs" : "text-[10px]"}`}
          >
            {eyebrow}
          </p>
          <p
            className={`font-medium leading-tight mt-1 truncate ${isLg ? "text-lg" : "text-sm"}`}
          >
            {title}
          </p>
          {subtitle && (
            <p
              className={`text-ink-muted leading-tight truncate ${isLg ? "text-sm mt-0.5" : "text-xs"}`}
            >
              {subtitle}
            </p>
          )}
        </div>
        <a
          href={ctaHref}
          className={`shrink-0 inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand font-medium rounded hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 ${
            isLg ? "px-6 py-3.5 text-base" : "px-4 py-2.5 text-sm"
          }`}
        >
          {ctaLabel}
          <Icon name="arrow_forward" size={isLg ? 18 : 14} />
        </a>
      </div>
    </div>
  );
}
