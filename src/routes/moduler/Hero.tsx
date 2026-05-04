import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { HeroAction } from "./variants/HeroAction";
import { HeroBrand } from "./variants/HeroBrand";
import { HeroStatus } from "./variants/HeroStatus";

const VARIANTS: Variant[] = [
  {
    id: "action",
    shortName: "A",
    label: "Action-first",
    riskLevel: "låg",
    oneLiner: "H1 = verb + objekt. Primär CTA dominant. Ingen bild.",
    bestFor: "Transaktionssidor: teckna elavtal, köpa produkt, göra felanmälan.",
    render: () => <HeroAction />,
  },
  {
    id: "brand",
    shortName: "B",
    label: "Brand-first",
    riskLevel: "medel",
    oneLiner: "Bildbakgrund + värdeproposition. Mjukare CTA:s.",
    bestFor: "Hub-sidor, kampanjlandningar, första-besökare.",
    render: () => <HeroBrand />,
  },
  {
    id: "status",
    shortName: "C",
    label: "Status-first",
    riskLevel: "medel",
    oneLiner: "H1 är ett direktsvar på sidans fråga. Dynamisk färg.",
    bestFor: "Avbrott, kundservice, live-data-sidor.",
    render: () => <HeroStatus pagaende={2} />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Vad läsaren ser först",
    values: {
      action: "Ett verb + objekt. 'Gör X.'",
      brand: "En bild och ett varumärkeslöfte.",
      status: "Ett direktsvar på deras fråga.",
    },
  },
  {
    aspect: "Syfte",
    values: {
      action: "Driva konvertering. Minst friktion till CTA.",
      brand: "Bygga trovärdighet. Etablera känsla.",
      status: "Snabba svar. Respektera användarens tid.",
    },
  },
  {
    aspect: "Kräver bildresurser",
    values: {
      action: "Nej.",
      brand: "Ja, högkvalitativ bild eller video.",
      status: "Nej.",
    },
  },
  {
    aspect: "Kräver data-backend",
    values: {
      action: "Nej.",
      brand: "Nej.",
      status: "Ja, live-status från backend.",
    },
  },
  {
    aspect: "Risk för 'känns som en reklam'",
    values: {
      action: "Låg, ser ut som en mjukvaru-app.",
      brand: "Hög om bild/copy inte är på nivå.",
      status: "Låg, data är inte reklam.",
    },
  },
  {
    aspect: "Hypotes om konvertering",
    values: {
      action: "Högst på transaktions-sidor.",
      brand: "Bäst för navigerande besök.",
      status: "Neutral, det är utility, inte konvertering.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      action: "Default för privat/el, privat/produktsida, privat/felanmälan.",
      brand: "Startsidan och kampanjsidor.",
      status: "Avbrott, kundservice, driftstatus.",
    },
  },
];

export function Hero() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Hero</p>
        <h1 className="text-h1 mb-3">Hero, sidans öppning</h1>
        <p className="text-lede text-ink-secondary">
          Tre strategier för hur en sida ska öppna. Alla tre är rimliga, valet beror på
          sidans syfte. Växla mellan A, B och C för att känna skillnaden.
        </p>
      </header>

      <VariantSwitcher variants={VARIANTS} argumentation={ARGUMENTATION} defaultId="action" />
    </div>
  );
}
