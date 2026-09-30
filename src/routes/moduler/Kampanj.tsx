import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { KampanjHero } from "./variants/KampanjHero";
import { KampanjStory } from "./variants/KampanjStory";
import { KampanjStrip } from "./variants/KampanjStrip";

const VARIANTS: Variant[] = [
  {
    id: "hero",
    shortName: "A",
    label: "Stor banner",
    riskLevel: "medel",
    oneLiner: "Stor färgyta med rubrik och en tydlig huvudknapp. Syns mest av de tre.",
    bestFor: "Stora kampanjer, nya tjänster och säsongserbjudanden.",
    render: () => <KampanjHero />,
  },
  {
    id: "story",
    shortName: "B",
    label: "Berättelse",
    riskLevel: "låg",
    oneLiner: "Bild och text sida vid sida. Berättar och förklarar, länken är diskret.",
    bestFor: "Hållbarhet, klimatarbete, partnerskap och bakgrunden till ett projekt.",
    render: () => <KampanjStory />,
  },
  {
    id: "strip",
    shortName: "C",
    label: "Remsa",
    riskLevel: "hög",
    oneLiner: "Smal färgstark remsa med datum och knapp. Kan lätt kännas påträngande.",
    bestFor: "Erbjudanden med ett verkligt sista datum. Högst en per sida.",
    render: () => <KampanjStrip />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Hur mycket den syns",
    values: {
      hero: "Mycket, den tar över sidan.",
      story: "Måttligt, den bjuder in till läsning.",
      strip: "Liten yta men märks, beroende på färg.",
    },
  },
  {
    aspect: "Textbehov",
    values: {
      hero: "Kort: rubrik, en mening och ett datum.",
      story: "Längre: brödtext på 50-100 ord.",
      strip: "En mening, högst 15 ord.",
    },
  },
  {
    aspect: "Risk att pressa besökaren",
    values: {
      hero: "Låg, tydlig knapp och ingen konstlad brådska.",
      story: "Ingen, det är redaktionellt innehåll.",
      strip: "Hög om datumet inte stämmer. Använd bara när erbjudandet verkligen tar slut.",
    },
  },
  {
    aspect: "Bildbehov",
    values: {
      hero: "Färgytan räcker. En bild lyfter den.",
      story: "Ja, bilden gör berättelsen konkret.",
      strip: "Nej, en ikon räcker.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      hero: "Framtidspengen, solcellskampanjer och lansering av nya tjänster.",
      story: "Koldioxidinfångning, resultat från Framtidspengen och volontärarbete.",
      strip: "Bara med ett verkligt sista datum (till exempel 31 mars). Aldrig permanent.",
    },
  },
];

export function Kampanj() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Kampanj och berättelse</p>
        <h1 className="text-h1 mb-3">Kampanj och berättelse</h1>
        <p className="text-lede text-ink-secondary">
          Tre format för kampanjer och berättelser. Den stora bannern syns mest, berättelsen
          ger djup och remsan passar erbjudanden med ett sista datum.
        </p>
      </header>

      <VariantSwitcher variants={VARIANTS} argumentation={ARGUMENTATION} defaultId="hero" />
    </div>
  );
}
