import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { ImpactStats } from "./variants/ImpactStats";
import { ImpactStory } from "./variants/ImpactStory";
import { ImpactTimeline } from "./variants/ImpactTimeline";

const VARIANTS: Variant[] = [
  {
    id: "stats",
    shortName: "A",
    label: "Statistik-grid",
    riskLevel: "låg",
    oneLiner: "Stora siffror + korta beskrivningar. Konkret och scanbart.",
    bestFor: "Startsida, hub-sidor — där läsaren vill få snabb överblick.",
    render: () => <ImpactStats />,
  },
  {
    id: "story",
    shortName: "B",
    label: "Story-narrative",
    riskLevel: "medel",
    oneLiner: "Prosa med siffror integrerade inline. Berättande.",
    bestFor: "Om oss-sida, hållbarhetsrapport-ingångar. Längre läsning.",
    render: () => <ImpactStory />,
  },
  {
    id: "timeline",
    shortName: "C",
    label: "Tidslinje",
    riskLevel: "låg",
    oneLiner: "År-för-år med status (klart / pågår / planerat).",
    bestFor: "Hållbarhetssida, åtagandesida — ärligt och strukturerat.",
    render: () => <ImpactTimeline />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Kognitiv belastning",
    values: {
      stats: "Låg — 4 siffror, skannas på 5 sek.",
      story: "Medel — kräver faktisk läsning.",
      timeline: "Medel — struktur hjälper men det är 5+ punkter.",
    },
  },
  {
    aspect: "Trovärdighet",
    values: {
      stats: "Medel — siffror utan kontext kan läsas som marknadsföring.",
      story: "Hög — berättelse + siffror ger kontext.",
      timeline: "Högst — visar både bakåt (klart) och framåt (åtagande).",
    },
  },
  {
    aspect: "Underhåll",
    values: {
      stats: "Högt — siffror måste stämma med årets rapport.",
      story: "Medel — copy uppdateras vid större händelser.",
      timeline: "Medel — status uppdateras årligen, nya mål läggs till.",
    },
  },
  {
    aspect: "Greenwashing-risk",
    values: {
      stats: "Högre — lätt att välja gynnsamma siffror.",
      story: "Medel — beror på copywriter.",
      timeline: "Lägst — 'Pågår'- och 'Planerat'-status tvingar transparens.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      stats: "Startsidan och produktsidor — som teaser.",
      story: "Om oss-sida, kampanjsida om hållbarhet.",
      timeline: "Dedikerad hållbarhetssida. Det ärligaste formatet.",
    },
  },
];

export function Impact() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Hållbarhet och impact</p>
        <h1 className="text-h1 mb-3">Hållbarhets-block</h1>
        <p className="text-lede text-ink-secondary">
          Tre sätt att visa vad vi åtar oss och vad vi levererar. Siffror för
          snabb överblick, narrativ för kontext, tidslinje för ärlighet.
        </p>
      </header>

      <VariantSwitcher variants={VARIANTS} argumentation={ARGUMENTATION} defaultId="stats" />
    </div>
  );
}
