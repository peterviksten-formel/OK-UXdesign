import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { KampanjHero } from "./variants/KampanjHero";
import { KampanjStory } from "./variants/KampanjStory";
import { KampanjStrip } from "./variants/KampanjStrip";

const VARIANTS: Variant[] = [
  {
    id: "hero",
    shortName: "A",
    label: "Hero-banner",
    riskLevel: "medel",
    oneLiner: "Stor banner med gradient + primär CTA. Max impact.",
    bestFor: "Stora kampanjer, nya tjänster, säsongs-erbjudanden.",
    render: () => <KampanjHero />,
  },
  {
    id: "story",
    shortName: "B",
    label: "Story-block",
    riskLevel: "låg",
    oneLiner: "Text + bild sida vid sida. Berättande. Diskret CTA.",
    bestFor: "Hållbarhet, klimatarbete, partnerskap, backstory.",
    render: () => <KampanjStory />,
  },
  {
    id: "strip",
    shortName: "C",
    label: "Strip",
    riskLevel: "hög",
    oneLiner: "Smal färgstark rad med tidsmarkör + CTA. Risk för dark pattern.",
    bestFor: "Tidskritiska erbjudanden med äkta deadline. Max 1 per sida.",
    render: () => <KampanjStrip />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Visuell impact",
    values: {
      hero: "Hög, dominerar sidan.",
      story: "Medel, inbjuder till läsning.",
      strip: "Låg yta, medel uppmärksamhet, beror på färg.",
    },
  },
  {
    aspect: "Copy-behov",
    values: {
      hero: "Kort: verb + objekt + tidslinje.",
      story: "Längre: brödtext på 50-100 ord.",
      strip: "En mening. Max 15 ord.",
    },
  },
  {
    aspect: "Risk för dark pattern",
    values: {
      hero: "Låg, tydlig CTA, ingen dold urgency.",
      story: "Inget. Det är redaktionellt innehåll.",
      strip: "Hög om 'Senast X' inte är sant. Riktlinje: använd bara med äkta deadline.",
    },
  },
  {
    aspect: "Bildbehov",
    values: {
      hero: "Gradient räcker. Bild höjer ribban.",
      story: "Ja, konkretiserar berättelsen.",
      strip: "Nej, ikon räcker.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      hero: "Framtidspengen, solceller-kampanjer, nya tjänstelanseringar.",
      story: "Carbon capture, Framtidspengen-results, volontärarbete.",
      strip: "Endast med äkta deadline (senast 31 mars etc). Aldrig permanent.",
    },
  },
];

export function Kampanj() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Kampanj- och story-banner</p>
        <h1 className="text-h1 mb-3">Kampanj- och story-banner</h1>
        <p className="text-lede text-ink-secondary">
          Tre format för kampanj- och berättelse-inslag. Hero för hög impact, Story för
          djup, Strip för tidskritiska erbjudanden.
        </p>
      </header>

      <VariantSwitcher variants={VARIANTS} argumentation={ARGUMENTATION} defaultId="hero" />
    </div>
  );
}
