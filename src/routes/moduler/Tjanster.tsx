import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { TjansterIkonGrid } from "./variants/TjansterIkonGrid";
import { TjansterBildGrid } from "./variants/TjansterBildGrid";
import { TjansterKompakt } from "./variants/TjansterKompakt";

const VARIANTS: Variant[] = [
  {
    id: "ikon",
    shortName: "A",
    label: "Ikonkort",
    riskLevel: "låg",
    oneLiner: "Sex kort i rutnät med ikon, namn och kort beskrivning. Inga bilder behövs.",
    bestFor: "Huvudingången till våra tjänster: startsidan och översiktssidor.",
    render: () => <TjansterIkonGrid />,
  },
  {
    id: "bild",
    shortName: "B",
    label: "Bildkort",
    riskLevel: "medel",
    oneLiner: "Samma rutnät men med bilder. Mer visuellt men dyrare att ta fram.",
    bestFor: "Sidor där varumärke och känsla ska hjälpa besökaren att bestämma sig.",
    render: () => <TjansterBildGrid />,
  },
  {
    id: "kompakt",
    shortName: "C",
    label: "Kompakt lista",
    riskLevel: "låg",
    oneLiner: "Lodrät lista med små ikoner. Tar minst plats och rymmer mycket.",
    bestFor: "Sidospalt, sidfot och \"Fler tjänster\" längre in på webbplatsen.",
    render: () => <TjansterKompakt />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Visuell tyngd",
    values: {
      ikon: "Medel, ikonerna gör tjänsterna lätta att känna igen.",
      bild: "Hög, bilderna tar över sidan.",
      kompakt: "Låg, känns som en meny snarare än ett utvalt inslag.",
    },
  },
  {
    aspect: "Bildkostnad",
    values: {
      ikon: "Ingen, ikonerna finns redan.",
      bild: "Sex bra bilder kräver fotograf eller budget för bildbyrå.",
      kompakt: "Ingen.",
    },
  },
  {
    aspect: "Antal tjänster som ryms",
    values: {
      ikon: "Fungerar upp till 9 tjänster. Fler blir rörigt.",
      bild: "Fungerar upp till 6. Fler gör sidan lång.",
      kompakt: "Obegränsat, listan växer nedåt.",
    },
  },
  {
    aspect: "I mobilen",
    values: {
      ikon: "Två kort i bredd, sedan ett.",
      bild: "Samma, men bilderna måste fungera i full bredd.",
      kompakt: "Listan fungerar som den är.",
    },
  },
  {
    aspect: "Tillgänglighet",
    values: {
      ikon: "Ikonerna är dekor, skärmläsare läser tjänstens namn.",
      bild: "Varje bild behöver en alt-text.",
      kompakt: "Mest tillgänglig, en enkel lista.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      ikon: "Förval för startsidan och översiktssidan för privatkunder.",
      bild: "Kampanjsidor där känslan ska sälja.",
      kompakt: "Sidfot och sidospalter.",
    },
  },
];

export function Tjanster() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Tjänsteöversikt</p>
        <h1 className="text-h1 mb-3">Tjänsteöversikt</h1>
        <p className="text-lede text-ink-secondary">
          Tre sätt att visa Öresundskrafts tjänster så att besökaren hittar rätt: med ikoner,
          med bilder eller som en kompakt lista, beroende på var på sidan översikten står.
        </p>
      </header>

      <VariantSwitcher variants={VARIANTS} argumentation={ARGUMENTATION} defaultId="ikon" />
    </div>
  );
}
