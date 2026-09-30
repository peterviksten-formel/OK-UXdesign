import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { ImpactStats } from "./variants/ImpactStats";
import { ImpactStory } from "./variants/ImpactStory";
import { ImpactTimeline } from "./variants/ImpactTimeline";

const VARIANTS: Variant[] = [
  {
    id: "stats",
    shortName: "A",
    label: "Nyckeltal",
    riskLevel: "låg",
    oneLiner: "Stora siffror med korta beskrivningar. Konkret och lätt att skumma.",
    bestFor: "Startsidan och översiktssidor, där besökaren vill få en snabb bild.",
    render: () => <ImpactStats />,
  },
  {
    id: "story",
    shortName: "B",
    label: "Berättelse",
    riskLevel: "medel",
    oneLiner: "Löptext där siffrorna vävs in i texten och lyfts fram.",
    bestFor: "Om oss-sidan och ingångar till hållbarhetsrapporten, där besökaren läser längre.",
    render: () => <ImpactStory />,
  },
  {
    id: "timeline",
    shortName: "C",
    label: "Tidslinje",
    riskLevel: "låg",
    oneLiner: "Mål år för år med status: klart, pågår eller planerat.",
    bestFor: "Hållbarhetssidan och sidor om våra åtaganden, där ärlighet och struktur väger tyngst.",
    render: () => <ImpactTimeline />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Hur mycket läsaren måste anstränga sig",
    values: {
      stats: "Lite. Fyra siffror som går att ta in på några sekunder.",
      story: "Medel. Kräver att man faktiskt läser.",
      timeline: "Medel. Strukturen hjälper, men det är fem punkter eller fler.",
    },
  },
  {
    aspect: "Trovärdighet",
    values: {
      stats: "Medel. Siffror utan sammanhang kan uppfattas som reklam.",
      story: "Hög. Berättelsen ger siffrorna ett sammanhang.",
      timeline: "Högst. Visar både vad som är gjort och vad vi lovar framåt.",
    },
  },
  {
    aspect: "Underhåll",
    values: {
      stats: "Mycket. Siffrorna måste stämma med årets hållbarhetsrapport.",
      story: "Medel. Texten uppdateras vid större händelser.",
      timeline: "Medel. Status uppdateras en gång per år och nya mål läggs till.",
    },
  },
  {
    aspect: "Risk för grönmålning",
    values: {
      stats: "Högre. Det är lätt att välja ut de mest fördelaktiga siffrorna.",
      story: "Medel. Beror på hur texten skrivs.",
      timeline: "Lägst. Statusen 'Pågår' och 'Planerat' tvingar fram öppenhet.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      stats: "Startsidan och produktsidor, som en aptitretare.",
      story: "Om oss-sidan och kampanjsidor om hållbarhet.",
      timeline: "En egen hållbarhetssida. Det ärligaste formatet.",
    },
  },
];

export function Impact() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Hållbarhet och påverkan</p>
        <h1 className="text-h1 mb-3">Hållbarhetsblock</h1>
        <p className="text-lede text-ink-secondary">
          Tre sätt att visa vad vi lovar och vad vi faktiskt har gjort. Nyckeltal för
          snabb överblick, berättelse för sammanhang och tidslinje för öppenhet.
        </p>
      </header>

      <VariantSwitcher variants={VARIANTS} argumentation={ARGUMENTATION} defaultId="stats" />
    </div>
  );
}
