import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { HeroAction } from "./variants/HeroAction";
import { HeroBrand } from "./variants/HeroBrand";
import { HeroStatus } from "./variants/HeroStatus";

const VARIANTS: Variant[] = [
  {
    id: "action",
    shortName: "A",
    label: "Handlingsfokuserad",
    riskLevel: "låg",
    oneLiner: "Rubriken säger vad besökaren kan göra. En tydlig huvudknapp, ingen bild.",
    bestFor: "Sidor där besökaren ska göra något: teckna elavtal, köpa en produkt, felanmäla.",
    render: () => <HeroAction />,
  },
  {
    id: "brand",
    shortName: "B",
    label: "Varumärkesfokuserad",
    riskLevel: "medel",
    oneLiner: "Stor bild och ett varumärkeslöfte. Knapparna bjuder in snarare än uppmanar.",
    bestFor: "Översiktssidor, kampanjsidor och besökare som är nya hos oss.",
    render: () => <HeroBrand />,
  },
  {
    id: "status",
    shortName: "C",
    label: "Statusfokuserad",
    riskLevel: "medel",
    oneLiner: "Rubriken svarar direkt på besökarens fråga. Färgen visar läget.",
    bestFor: "Avbrott, kundservice och sidor som visar läget i realtid.",
    render: () => <HeroStatus pagaende={2} />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Det besökaren ser först",
    values: {
      action: "En uppmaning: vad du kan göra här.",
      brand: "En bild och ett löfte om vilka vi är.",
      status: "Ett direkt svar på frågan besökaren kom med.",
    },
  },
  {
    aspect: "Syfte",
    values: {
      action: "Få fler att slutföra ärendet. Kortast möjliga väg till knappen.",
      brand: "Bygga förtroende och skapa en känsla för Öresundskraft.",
      status: "Ge snabba svar och spara besökarens tid.",
    },
  },
  {
    aspect: "Behöver bilder",
    values: {
      action: "Nej.",
      brand: "Ja, en bild eller film av hög kvalitet.",
      status: "Nej.",
    },
  },
  {
    aspect: "Behöver data från våra system",
    values: {
      action: "Nej.",
      brand: "Nej.",
      status: "Ja, aktuell driftstatus i realtid.",
    },
  },
  {
    aspect: "Risk att det känns som reklam",
    values: {
      action: "Låg, upplevs som en tjänst snarare än en annons.",
      brand: "Hög om bild eller text inte håller måttet.",
      status: "Låg, fakta upplevs inte som reklam.",
    },
  },
  {
    aspect: "Förväntad effekt",
    values: {
      action: "Flest avslut på sidor där besökaren ska göra något.",
      brand: "Bäst för besökare som vill orientera sig.",
      status: "Mäts i nytta, inte i avslut.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      action: "Förval för elavtal, produktsidor och felanmälan.",
      brand: "Startsidan och kampanjsidor.",
      status: "Avbrott, kundservice och driftstatus.",
    },
  },
];

export function Hero() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Hero</p>
        <h1 className="text-h1 mb-3">Hero: så öppnar sidan</h1>
        <p className="text-lede text-ink-secondary">
          Tre sätt att öppna en sida. Alla fungerar, men passar olika syften: att få
          besökaren att agera, att bygga förtroende eller att ge ett snabbt svar. Växla
          mellan A, B och C och jämför.
        </p>
      </header>

      <VariantSwitcher variants={VARIANTS} argumentation={ARGUMENTATION} defaultId="action" />
    </div>
  );
}
