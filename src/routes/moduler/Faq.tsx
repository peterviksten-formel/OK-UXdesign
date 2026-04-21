import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { FaqAccordion } from "./variants/FaqAccordion";
import { FaqGrupperad } from "./variants/FaqGrupperad";
import { FaqSokTopplista } from "./variants/FaqSokTopplista";

const VARIANTS: Variant[] = [
  {
    id: "accordion",
    shortName: "A",
    label: "Accordion",
    riskLevel: "låg",
    oneLiner: "5 frågor staplade. Native details/summary. Den mest välkända FAQ-typen.",
    bestFor: "Liten FAQ (≤8 frågor). Sidtyper där FAQ är ett av flera block.",
    render: () => <FaqAccordion />,
  },
  {
    id: "grupperad",
    shortName: "B",
    label: "Grupperad",
    riskLevel: "låg",
    oneLiner: "Tre kolumner efter mental tidslinje — innan / under / efter.",
    bestFor: "Mellanstor FAQ (8–15 frågor). Sidor där frågor faller naturligt i faser.",
    render: () => <FaqGrupperad />,
  },
  {
    id: "sok",
    shortName: "C",
    label: "Sök + topplista",
    riskLevel: "medel",
    oneLiner: "Sökfält + kuraterad topp-5. Skalar till stora kunskapsbaser.",
    bestFor: "Dedikerad FAQ-sida med 30+ frågor. Kundservice-sidor.",
    render: () => <FaqSokTopplista />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Skalar till",
    values: {
      accordion: "~8 frågor innan sidan blir oöversiktlig.",
      grupperad: "~15 frågor om grupperna är balanserade.",
      sok: "50+ frågor. Sökningen gör listan navigerbar.",
    },
  },
  {
    aspect: "Tekniskt",
    values: {
      accordion: "Native details/summary. Fungerar utan JS.",
      grupperad: "Statisk HTML. Grupper bestäms i innehållet.",
      sok: "Kräver sök-filter (client-side JS) eller backend-API.",
    },
  },
  {
    aspect: "Tillgänglighet",
    values: {
      accordion: "Perfekt — semantic HTML hanterar allt.",
      grupperad: "Bra — heading-hierarkin är tydlig.",
      sok: "Kräver aria-live för resultat + tangentbords-shortcut.",
    },
  },
  {
    aspect: "Underhåll",
    values: {
      accordion: "Lågt — lägg till/ta bort fråga i listan.",
      grupperad: "Medel — tänka om vilken fas frågan hör till.",
      sok: "Medel — topp-5 behöver kuratering varje/varannan vecka.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      accordion: "Default-mönster för FAQ på inre sidor.",
      grupperad: "Elhandel-sidan, produktsidan — där tidslinjen är naturlig.",
      sok: "Endast på dedikerad Kundservice/hjälpcenter-sida.",
    },
  },
];

export function Faq() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · FAQ</p>
        <h1 className="text-h1 mb-3">Vanliga frågor</h1>
        <p className="text-lede text-ink-secondary">
          Tre strategier för FAQ — valet beror på hur många frågor ni har och var
          modulen sitter. Accordion är default för block-nivå, sök för dedikerad
          hjälpsida.
        </p>
      </header>

      <VariantSwitcher variants={VARIANTS} argumentation={ARGUMENTATION} defaultId="accordion" />
    </div>
  );
}
