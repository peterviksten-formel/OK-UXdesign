import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { FaqAccordion } from "./variants/FaqAccordion";
import { FaqGrupperad } from "./variants/FaqGrupperad";
import { FaqSokTopplista } from "./variants/FaqSokTopplista";

const VARIANTS: Variant[] = [
  {
    id: "accordion",
    shortName: "A",
    label: "Utfällbar lista",
    riskLevel: "låg",
    oneLiner: "Fem frågor under varandra. Svaret fälls ut när du klickar. Den mest välkända FAQ-formen.",
    bestFor: "Korta FAQ:er med upp till 8 frågor, som ett av flera block på en sida.",
    render: () => <FaqAccordion />,
  },
  {
    id: "grupperad",
    shortName: "B",
    label: "Grupperad",
    riskLevel: "låg",
    oneLiner: "Tre kolumner efter var besökaren befinner sig: innan, under och efter.",
    bestFor: "Mellanstora FAQ:er med 8-15 frågor som naturligt hör till olika skeden.",
    render: () => <FaqGrupperad />,
  },
  {
    id: "sok",
    shortName: "C",
    label: "Sök och topplista",
    riskLevel: "medel",
    oneLiner: "Sökfält och en utvald lista med de fem vanligaste frågorna. Fungerar även med många frågor.",
    bestFor: "En egen FAQ-sida med 30 frågor eller fler, till exempel kundservice.",
    render: () => <FaqSokTopplista />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Fungerar för",
    values: {
      accordion: "Upp till cirka 8 frågor, sedan blir listan svår att överblicka.",
      grupperad: "Upp till cirka 15 frågor, om grupperna är ungefär lika stora.",
      sok: "50 frågor eller fler. Sökningen gör det lätt att hitta rätt.",
    },
  },
  {
    aspect: "Hur den fungerar",
    values: {
      accordion: "Svaren fälls ut i sidan. Enkel teknik som fungerar överallt.",
      grupperad: "Vanliga länkar. Grupperna bestäms av redaktören.",
      sok: "Kräver en sökfunktion som filtrerar frågorna medan besökaren skriver.",
    },
  },
  {
    aspect: "Tillgänglighet",
    values: {
      accordion: "Mycket god, fungerar med skärmläsare och tangentbord.",
      grupperad: "God, rubrikerna ger en tydlig struktur.",
      sok: "Kräver att sökresultaten läses upp för skärmläsare och att allt går att nå med tangentbord.",
    },
  },
  {
    aspect: "Underhåll",
    values: {
      accordion: "Lite, lägg till eller ta bort frågor i listan.",
      grupperad: "Medel, varje ny fråga måste placeras i rätt grupp.",
      sok: "Medel, topplistan behöver ses över varje eller varannan vecka.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      accordion: "Förval för FAQ på undersidor.",
      grupperad: "Elhandel och produktsidor, där frågorna följer ett förlopp.",
      sok: "Bara på en egen sida för kundservice eller hjälp.",
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
          Tre sätt att visa vanliga frågor. Valet beror på hur många frågor ni har och var
          på sidan de ska stå. Den utfällbara listan är förval för ett block på en sida,
          sök passar en egen hjälpsida.
        </p>
      </header>

      <VariantSwitcher variants={VARIANTS} argumentation={ARGUMENTATION} defaultId="accordion" />
    </div>
  );
}
