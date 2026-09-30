import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { KundcaseGrid } from "./variants/KundcaseGrid";
import { KundcaseHero } from "./variants/KundcaseHero";
import { KundcaseStory } from "./variants/KundcaseStory";

const VARIANTS: Variant[] = [
  {
    id: "grid",
    shortName: "A",
    label: "Citatkort",
    riskLevel: "låg",
    oneLiner: "Tre citatkort i rad, utan bilder. Balanserat och sakligt.",
    bestFor: "Visa flera kunders erfarenheter på produktsidor och översiktssidor.",
    render: () => <KundcaseGrid />,
  },
  {
    id: "hero",
    shortName: "B",
    label: "Stort citat",
    riskLevel: "medel",
    oneLiner: "Ett stort citat tar hela ytan. Syns mycket, men citatet måste vara starkt.",
    bestFor: "Kampanjsidor där ett utvalt citat ska fastna.",
    render: () => <KundcaseHero />,
  },
  {
    id: "story",
    shortName: "C",
    label: "Kundberättelse",
    riskLevel: "medel",
    oneLiner: "Bild, berättelse och nyckeltal. Läses som en artikel.",
    bestFor: "Företagskunder och produktsidor där beslutet är stort och kräver mer övertygelse.",
    render: () => <KundcaseStory />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Arbetsinsats",
    values: {
      grid: "Bara text. En kort intervju och kundens godkännande räcker.",
      hero: "Text, namn och gärna foto. Kräver ett starkt citat.",
      story: "Fotografering, intervju och text. Mest arbete.",
    },
  },
  {
    aspect: "Djup eller bredd",
    values: {
      grid: "Bredd: flera röster och olika situationer.",
      hero: "En tydlig röst som gör stort intryck.",
      story: "Djup: svarar på 'fungerar det för någon som jag?'",
    },
  },
  {
    aspect: "Trovärdighet",
    values: {
      grid: "Medel, ser ut som en vanlig sektion med kundomdömen.",
      hero: "Beror på citatet, kan kännas tillrättalagt.",
      story: "Högst, konkreta siffror och bild på en verklig kund.",
    },
  },
  {
    aspect: "Risk att kännas som reklam",
    values: {
      grid: "Medel.",
      hero: "Högre, ett stort citat läses lätt som marknadsföring.",
      story: "Lägst, artikelformatet känns redaktionellt.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      grid: "Produktsidor, Jämför elavtal och Smarta produkter.",
      hero: "Sparsamt: kampanjsidor eller en översiktssida.",
      story: "Solceller, laddbox och fjärrvärme, där beslutet är större.",
    },
  },
];

export function Kundcase() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Kundcase och omdömen</p>
        <h1 className="text-h1 mb-3">Kundcase och omdömen</h1>
        <p className="text-lede text-ink-secondary">
          Tre sätt att visa vad kunder säger: från flera korta citat till en längre
          kundberättelse med mätbara resultat.
        </p>
      </header>

      <VariantSwitcher variants={VARIANTS} argumentation={ARGUMENTATION} defaultId="grid" />
    </div>
  );
}
