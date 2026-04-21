import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { KundcaseGrid } from "./variants/KundcaseGrid";
import { KundcaseHero } from "./variants/KundcaseHero";
import { KundcaseStory } from "./variants/KundcaseStory";

const VARIANTS: Variant[] = [
  {
    id: "grid",
    shortName: "A",
    label: "Citatkort-grid",
    riskLevel: "låg",
    oneLiner: "Tre citatkort, inga bilder. Balanserat och formellt.",
    bestFor: "Bred social proof på produktsidor och hubbsidor.",
    render: () => <KundcaseGrid />,
  },
  {
    id: "hero",
    shortName: "B",
    label: "Hero-citat",
    riskLevel: "medel",
    oneLiner: "Ett stort citat dominerar. Hög impact, högre risk.",
    bestFor: "Kampanjlandningar där ett utvalt citat ska slå.",
    render: () => <KundcaseHero />,
  },
  {
    id: "story",
    shortName: "C",
    label: "Case-story",
    riskLevel: "medel",
    oneLiner: "Bild + narrativ + siffror. Redaktionell artikel-känsla.",
    bestFor: "B2B-case. Produktsidor där beslutet kräver djupare övertygelse.",
    render: () => <KundcaseStory />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Produktion",
    values: {
      grid: "Text-only. Intervju + godkännande räcker.",
      hero: "Text + namn + foto-valfritt. Starkt citat krävs.",
      story: "Fotografering + intervju + copy. Tyngst.",
    },
  },
  {
    aspect: "Djup vs bredd",
    values: {
      grid: "Bredd — flera röster, olika situationer.",
      hero: "En tydlig röst i taget. Hög påverkan.",
      story: "Ett djup-case. Svarar på 'fungerar det för någon som jag?'",
    },
  },
  {
    aspect: "Trovärdighet",
    values: {
      grid: "Medel — ser ut som typisk testimonial-sektion.",
      hero: "Beror på citatets kvalitet — kan kännas staged.",
      story: "Högst — konkreta siffror + bild av verklig person.",
    },
  },
  {
    aspect: "Risk för känsla av reklam",
    values: {
      grid: "Medel.",
      hero: "Högre — stort citat läses som marknadsföring.",
      story: "Lägst — artikel-formatet signalerar journalistik.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      grid: "Produktsidor, Jämför elavtal, Smarta produkter.",
      hero: "Sparsamt — kampanjlandningar eller hub-startsida.",
      story: "Solceller, laddbox, fjärrvärme — där beslutet är större.",
    },
  },
];

export function Kundcase() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Kundcase och testimonials</p>
        <h1 className="text-h1 mb-3">Kundcase och testimonials</h1>
        <p className="text-lede text-ink-secondary">
          Tre sätt att visa vad kunder säger. Från breda grid till djupa
          case-stories med mätbara resultat.
        </p>
      </header>

      <VariantSwitcher variants={VARIANTS} argumentation={ARGUMENTATION} defaultId="grid" />
    </div>
  );
}
