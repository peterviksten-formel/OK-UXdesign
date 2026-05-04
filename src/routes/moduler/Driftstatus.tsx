import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { DriftTopbar } from "./variants/DriftTopbar";
import { DriftInline } from "./variants/DriftInline";
import { DriftBadge } from "./variants/DriftBadge";

const VARIANTS: Variant[] = [
  {
    id: "topbar",
    shortName: "A",
    label: "Global topbar",
    riskLevel: "medel",
    oneLiner: "Sticky rad över header. Visas endast vid störning.",
    bestFor: "Global drift-avisering som måste nå alla besökare.",
    render: () => <DriftTopbar />,
  },
  {
    id: "inline",
    shortName: "B",
    label: "Inline-sektion",
    riskLevel: "låg",
    oneLiner: "Full-bredd banner i sidflödet. Del av innehållet.",
    bestFor: "Kundservice- och avbrottssida där status är huvudämnet.",
    render: () => <DriftInline />,
  },
  {
    id: "badge",
    shortName: "C",
    label: "Badge + drawer",
    riskLevel: "medel",
    oneLiner: "Liten badge i header, öppnar detaljer vid klick.",
    bestFor: "När status ska vara tillgänglig men inte dominant.",
    render: () => <DriftBadge />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Synlighet",
    values: {
      topbar: "Hög, alla som landar ser bannern.",
      inline: "Medel, syns när användaren är på rätt sida.",
      badge: "Låg, lätt att missa om man inte scannar header.",
    },
  },
  {
    aspect: "Påträngande",
    values: {
      topbar: "Hög, flyttar ner innehållet.",
      inline: "Låg, ligger där den hör hemma.",
      badge: "Låg, 24px i hörnet.",
    },
  },
  {
    aspect: "Användning",
    values: {
      topbar: "Global, alla sidor.",
      inline: "Lokal, specifika sidor.",
      badge: "Global, alla sidor, men diskret.",
    },
  },
  {
    aspect: "Teknik",
    values: {
      topbar: "Villkorsrendering i Layout. Aria-live.",
      inline: "Ren HTML-sektion.",
      badge: "Header-komponent + dropdown-state.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      topbar: "Större avbrott, flera hundra kunder eller kris-läge.",
      inline: "Default på avbrottssidan och kundservice-sidan.",
      badge: "Alltid-på indikator i header för löpande status.",
    },
  },
];

export function Driftstatus() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Driftstatus-banner</p>
        <h1 className="text-h1 mb-3">Driftstatus just nu</h1>
        <p className="text-lede text-ink-secondary">
          Tre sätt att kommunicera live drift-status. Från global topbar vid kris till
          diskret badge-indikator i header.
        </p>
      </header>

      <VariantSwitcher variants={VARIANTS} argumentation={ARGUMENTATION} defaultId="inline" />
    </div>
  );
}
