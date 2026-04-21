import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { NyhetsGrid } from "./variants/NyhetsGrid";
import { NyhetsUtvald } from "./variants/NyhetsUtvald";
import { NyhetsTidslinje } from "./variants/NyhetsTidslinje";

const VARIANTS: Variant[] = [
  {
    id: "grid",
    shortName: "A",
    label: "Grid likvärdig",
    riskLevel: "låg",
    oneLiner: "Tre kort i rad, alla lika stora. Ingen hierarki mellan nyheter.",
    bestFor: "Block på hub-sidor där senaste nytt är en av flera sektioner.",
    render: () => <NyhetsGrid />,
  },
  {
    id: "utvald",
    shortName: "B",
    label: "Utvald + 2 små",
    riskLevel: "låg",
    oneLiner: "Hierarkisk — en stor utvald, två mindre vid sidan.",
    bestFor: "När redaktör vill lyfta en specifik nyhet (prisförändring, kampanj).",
    render: () => <NyhetsUtvald />,
  },
  {
    id: "tidslinje",
    shortName: "C",
    label: "Tidslinje",
    riskLevel: "låg",
    oneLiner: "Kronologisk lista med datum-markörer. Skalar obegränsat.",
    bestFor: "Dedikerad nyhetsrum-sida eller pressmeddelande-arkiv.",
    render: () => <NyhetsTidslinje />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Visuell hierarki",
    values: {
      grid: "Ingen — alla nyheter lika stora.",
      utvald: "Stark — en utvald tar 2/3.",
      tidslinje: "Ingen — senaste syns först.",
    },
  },
  {
    aspect: "Redaktionellt arbete",
    values: {
      grid: "Minst — lägg till post.",
      utvald: "Medel — välj utvald per vecka.",
      tidslinje: "Minst — sortering sköter sig självt.",
    },
  },
  {
    aspect: "Skalbarhet",
    values: {
      grid: "3 kort — inga fler. Visa-alla länk tar över.",
      utvald: "3 kort + utvald. Visa-alla för resten.",
      tidslinje: "Obegränsat. Paginering eller 'ladda fler'.",
    },
  },
  {
    aspect: "Bildbehov",
    values: {
      grid: "1 bild per nyhet.",
      utvald: "1 stor + 2 små (eller ingen för små).",
      tidslinje: "Ingen bild — rent textuellt.",
    },
  },
  {
    aspect: "Bästa användning",
    values: {
      grid: "Block på sidor — startsida, el-hub, kundservice.",
      utvald: "Elhandel-sida, fjärrvärme-sida där en nyhet är tidskänslig.",
      tidslinje: "Nyhetsrum, pressmeddelanden, blogg-arkiv.",
    },
  },
];

export function Nyheter() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Nyhets- och artikelkort</p>
        <h1 className="text-h1 mb-3">Nyhets- och artikelflöde</h1>
        <p className="text-lede text-ink-secondary">
          Tre sätt att visa nyheter och artiklar. Grid för block-användning, utvald för
          redaktionell prioritering, tidslinje för dedikerade flöden.
        </p>
      </header>

      <VariantSwitcher variants={VARIANTS} argumentation={ARGUMENTATION} defaultId="grid" />
    </div>
  );
}
