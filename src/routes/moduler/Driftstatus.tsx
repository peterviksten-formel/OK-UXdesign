import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { DriftTopbar } from "./variants/DriftTopbar";
import { DriftInline } from "./variants/DriftInline";
import { DriftBadge } from "./variants/DriftBadge";

const VARIANTS: Variant[] = [
  {
    id: "topbar",
    shortName: "A",
    label: "Toppbanner",
    riskLevel: "medel",
    oneLiner: "Smal rad överst på alla sidor. Syns bara när något är fel.",
    bestFor: "Större störningar som alla besökare behöver känna till, oavsett vilken sida de landar på.",
    render: () => <DriftTopbar />,
  },
  {
    id: "inline",
    shortName: "B",
    label: "I sidan",
    riskLevel: "låg",
    oneLiner: "Statusruta i sidans innehåll, i samma ton som resten av sidan.",
    bestFor: "Avbrottssidan och kundservicesidan, där driftstatus är det besökaren kommit för.",
    render: () => <DriftInline />,
  },
  {
    id: "badge",
    shortName: "C",
    label: "Märke",
    riskLevel: "medel",
    oneLiner: "Litet statusmärke i sidhuvudet. Detaljerna visas när man klickar.",
    bestFor: "När status ska finnas nära till hands men inte ta fokus från sidans innehåll.",
    render: () => <DriftBadge />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Synlighet",
    values: {
      topbar: "Hög. Alla som besöker webbplatsen ser bannern.",
      inline: "Medel. Syns för den som är på avbrotts- eller kundservicesidan.",
      badge: "Låg. Lätt att missa för den som inte tittar i sidhuvudet.",
    },
  },
  {
    aspect: "Hur mycket den stör",
    values: {
      topbar: "Mycket. Den trycker ner sidans innehåll.",
      inline: "Lite. Den ligger där informationen hör hemma.",
      badge: "Nästan inte alls. Ett litet märke i hörnet.",
    },
  },
  {
    aspect: "Var den visas",
    values: {
      topbar: "På alla sidor.",
      inline: "Bara på utvalda sidor.",
      badge: "På alla sidor, men diskret.",
    },
  },
  {
    aspect: "Tillgänglighet",
    values: {
      topbar: "Skärmläsare läser upp meddelandet automatiskt när det dyker upp.",
      inline: "Läses som vanlig text i sidans ordning.",
      badge: "Detaljerna nås först när man öppnar märket.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      topbar: "Större avbrott som berör flera hundra kunder, eller krisläge.",
      inline: "Förval på avbrottssidan och kundservicesidan.",
      badge: "Ständigt synlig statusindikator i sidhuvudet.",
    },
  },
];

export function Driftstatus() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Driftstatus</p>
        <h1 className="text-h1 mb-3">Driftstatus just nu</h1>
        <p className="text-lede text-ink-secondary">
          Tre sätt att visa aktuell driftstatus för besökaren. Från en toppbanner på alla
          sidor vid kris till ett diskret märke i sidhuvudet.
        </p>
      </header>

      <VariantSwitcher variants={VARIANTS} argumentation={ARGUMENTATION} defaultId="inline" />
    </div>
  );
}
