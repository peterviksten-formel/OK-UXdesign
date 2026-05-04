import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { TjansterIkonGrid } from "./variants/TjansterIkonGrid";
import { TjansterBildGrid } from "./variants/TjansterBildGrid";
import { TjansterKompakt } from "./variants/TjansterKompakt";

const VARIANTS: Variant[] = [
  {
    id: "ikon",
    shortName: "A",
    label: "Ikon-kort-grid",
    riskLevel: "låg",
    oneLiner: "3×2 grid med ikon + titel + beskrivning. Ingen bildkostnad.",
    bestFor: "Huvudingång för tjänstnavigering, startsida, hub-sidor.",
    render: () => <TjansterIkonGrid />,
  },
  {
    id: "bild",
    shortName: "B",
    label: "Bildkort-grid",
    riskLevel: "medel",
    oneLiner: "Samma grid men med bilder. Mer visuellt men dyrare.",
    bestFor: "Marknadsstarka sidor där varumärke och känsla driver beslut.",
    render: () => <TjansterBildGrid />,
  },
  {
    id: "kompakt",
    shortName: "C",
    label: "Kompakt lista",
    riskLevel: "låg",
    oneLiner: "Vertikal lista med ikoner. Minst yta, tätt innehåll.",
    bestFor: "Sidopanel, footer, \"Fler tjänster\"-länkar på inre sidor.",
    render: () => <TjansterKompakt />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Visuell tyngd",
    values: {
      ikon: "Medel, ikoner ger igenkänning.",
      bild: "Hög, bilder dominerar layouten.",
      kompakt: "Låg, känns som navigation, inte feature.",
    },
  },
  {
    aspect: "Bildkostnad",
    values: {
      ikon: "Ingen, MD3-ikoner kommer med.",
      bild: "6 kvalitativa bilder = fotograf eller stockfoto-budget.",
      kompakt: "Ingen.",
    },
  },
  {
    aspect: "Skalbarhet (antal tjänster)",
    values: {
      ikon: "Bra upp till 9 tjänster. Mer = känns brus.",
      bild: "Bra upp till 6. Mer = långa sidor.",
      kompakt: "Obegränsat. Listan skalar.",
    },
  },
  {
    aspect: "Mobilbeteende",
    values: {
      ikon: "Staplas till 2 kolumner, sedan 1.",
      bild: "Samma, men bildproportionerna måste tåla 1-kol.",
      kompakt: "Listan staplar naturligt.",
    },
  },
  {
    aspect: "Tillgänglighet",
    values: {
      ikon: "Ikoner kan behöva aria-hidden när titeln räcker.",
      bild: "Bilder behöver alt-text.",
      kompakt: "Mest tillgänglig, enkel list-struktur.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      ikon: "Default för startsida och privat/hem-hub.",
      bild: "Kampanjlandningar där känsla ska sälja.",
      kompakt: "Footer och sidopaneler.",
    },
  },
];

export function Tjanster() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Tjänstegrid</p>
        <h1 className="text-h1 mb-3">Tjänste-grid</h1>
        <p className="text-lede text-ink-secondary">
          Hur vi visar Öresundskrafts olika tjänster som en navigerbar översikt.
          Ikon / bild / kompakt, beroende på kontext.
        </p>
      </header>

      <VariantSwitcher variants={VARIANTS} argumentation={ARGUMENTATION} defaultId="ikon" />
    </div>
  );
}
