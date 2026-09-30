import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { NyhetsGrid } from "./variants/NyhetsGrid";
import { NyhetsUtvald } from "./variants/NyhetsUtvald";
import { NyhetsTidslinje } from "./variants/NyhetsTidslinje";

const VARIANTS: Variant[] = [
  {
    id: "grid",
    shortName: "A",
    label: "Likvärdigt rutnät",
    riskLevel: "låg",
    oneLiner: "Tre lika stora kort i rad. Ingen nyhet väger tyngre än någon annan.",
    bestFor: "Ett block på översiktssidor, där senaste nytt är en av flera delar.",
    render: () => <NyhetsGrid />,
  },
  {
    id: "utvald",
    shortName: "B",
    label: "Utvald nyhet",
    riskLevel: "låg",
    oneLiner: "En stor utvald nyhet och två mindre bredvid.",
    bestFor: "När redaktören vill lyfta en viss nyhet, till exempel en prisändring eller kampanj.",
    render: () => <NyhetsUtvald />,
  },
  {
    id: "tidslinje",
    shortName: "C",
    label: "Tidslinje",
    riskLevel: "låg",
    oneLiner: "Nyheterna i datumordning med datum i marginalen. Rymmer hur många som helst.",
    bestFor: "En egen nyhetssida eller ett arkiv med pressmeddelanden.",
    render: () => <NyhetsTidslinje />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Vad som syns mest",
    values: {
      grid: "Inget, alla nyheter är lika stora.",
      utvald: "Den utvalda nyheten, som tar två tredjedelar av bredden.",
      tidslinje: "Inget särskilt, den senaste nyheten står först.",
    },
  },
  {
    aspect: "Arbete för redaktören",
    values: {
      grid: "Minst, publicera nyheten så hamnar den på plats.",
      utvald: "Medel, välj ut en nyhet varje vecka.",
      tidslinje: "Minst, ordningen sköter sig själv.",
    },
  },
  {
    aspect: "Hur många nyheter",
    values: {
      grid: "Tre kort. Länken till alla nyheter visar resten.",
      utvald: "En utvald och två mindre. Länken till alla nyheter visar resten.",
      tidslinje: "Hur många som helst. Besökaren laddar fler vid behov.",
    },
  },
  {
    aspect: "Behov av bilder",
    values: {
      grid: "En bild per nyhet.",
      utvald: "En stor bild. De mindre nyheterna klarar sig utan.",
      tidslinje: "Inga bilder, bara text.",
    },
  },
  {
    aspect: "Passar bäst för",
    values: {
      grid: "Block på startsidan, översiktssidan för el och kundservice.",
      utvald: "Elhandel och fjärrvärme, när en nyhet är tidskänslig.",
      tidslinje: "Nyhetssidan, pressmeddelanden och artikelarkiv.",
    },
  },
];

export function Nyheter() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Nyheter</p>
        <h1 className="text-h1 mb-3">Nyheter och artiklar</h1>
        <p className="text-lede text-ink-secondary">
          Tre sätt att visa nyheter och artiklar. Rutnätet passar som block på en sida,
          den utvalda nyheten när något ska lyftas och tidslinjen för en egen nyhetssida.
        </p>
      </header>

      <VariantSwitcher variants={VARIANTS} argumentation={ARGUMENTATION} defaultId="grid" />
    </div>
  );
}
