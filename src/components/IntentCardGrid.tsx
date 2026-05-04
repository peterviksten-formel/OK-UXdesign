import { Link } from "react-router-dom";
import { Icon } from "./Icon";

/**
 * IntentCardGrid ,  delad komponent för "välj efter vad du vill göra"-listor.
 *
 * En datamodell, tre visuella varianter. Används på både StartsidaUndersidaUX
 * ("Eller välj efter vad du vill göra") och KundserviceNy ("Vad gäller det?")
 * så mönstret blir enhetligt ,  sidtypen väljer bara vilken stil som passar
 * situationen.
 *
 * Välj variant:
 *   horizontal ,  ikon vänster om text, tätare packning. Bäst när användaren
 *                scrollar förbi och ska scanna flera alternativ.
 *   vertical   ,  ikon över text, luft mellan element. Bäst när valet är
 *                huvudhandlingen på sidan och varje alternativ ska kännas
 *                discret.
 *   chips      ,  pill-knappar, kompaktast. Bäst när alternativen är korta
 *                och entydiga, eller när ytan är begränsad.
 */

export type IntentCardItem = {
  ikon: string;
  label: string;
  desc?: string;
  href: string;
};

export type IntentCardVariant = "horizontal" | "vertical" | "chips";

type Props = {
  items: IntentCardItem[];
  variant?: IntentCardVariant;
  /** Styr antalet kolumner på lg ,  default anpassar sig efter antal kort */
  columns?: 2 | 3 | 4 | 5 | 6;
};

export function IntentCardGrid({ items, variant = "vertical", columns }: Props) {
  if (variant === "chips") {
    return (
      <div className="flex flex-wrap gap-2">
        {items.map((it) => (
          <Link
            key={it.label}
            to={it.href}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-subtle bg-surface text-sm hover:border-brand-accent hover:text-brand-accent hover:bg-tint-info transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            <Icon name={it.ikon} size={16} className="text-brand-accent" />
            {it.label}
          </Link>
        ))}
      </div>
    );
  }

  const cols = columns ?? Math.min(items.length, 5);
  const lgClass = {
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
    5: "lg:grid-cols-5",
    6: "lg:grid-cols-6",
  }[cols];

  if (variant === "horizontal") {
    return (
      <div className={`grid grid-cols-1 sm:grid-cols-2 ${lgClass} gap-3`}>
        {items.map((it) => (
          <Link
            key={it.label}
            to={it.href}
            className="group p-5 rounded-md border border-border-subtle bg-surface hover:border-brand-accent hover:shadow-sm transition-all flex gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
          >
            <Icon name={it.ikon} size={26} className="text-brand-accent shrink-0 mt-0.5" />
            <div className="min-w-0">
              <span className="font-medium block group-hover:text-brand-accent">{it.label}</span>
              {it.desc && (
                <span className="text-sm text-ink-secondary block leading-snug">{it.desc}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    );
  }

  // vertical (default)
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 ${lgClass} gap-3`}>
      {items.map((it) => (
        <Link
          key={it.label}
          to={it.href}
          className="group p-5 rounded-md border border-border-subtle bg-surface hover:border-brand-accent hover:shadow-sm transition-all flex flex-col gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
        >
          <Icon name={it.ikon} size={26} className="text-brand-accent" />
          <div>
            <span className="font-medium block group-hover:text-brand-accent leading-snug">{it.label}</span>
            {it.desc && (
              <span className="text-sm text-ink-secondary block leading-snug">{it.desc}</span>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
