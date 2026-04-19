import { useState } from "react";
import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { ProduktinfoTrygg } from "./variants/ProduktinfoTrygg";
import { ProduktinfoProgressiv } from "./variants/ProduktinfoProgressiv";
import { PRODUKTER, type ProduktId } from "./produkt-data";

function makeVariants(produktId: ProduktId): Variant[] {
  const p = PRODUKTER.find((x) => x.id === produktId)!;
  return [
    {
      id: "trygg",
      shortName: "A",
      label: "Trygg",
      riskLevel: "låg",
      oneLiner: "Bild + info sida vid sida. All info synlig direkt.",
      bestFor: "Tydlighet. Äldre kunder. Print-vänlig.",
      render: () => <ProduktinfoTrygg produkt={p} />,
    },
    {
      id: "progressiv",
      shortName: "B",
      label: "Progressiv",
      riskLevel: "medel",
      oneLiner: "Hero med prisöverlägg + detalj-tabs. E-commerce-känsla.",
      bestFor: "Konvertering. Visuell produkt med tydlig CTA.",
      render: () => <ProduktinfoProgressiv produkt={p} />,
    },
  ];
}

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Känsla",
    values: {
      trygg: "Informationsblad. Sakligt, förtroendeingivande, lite tråkigt.",
      progressiv: "Webbshop. Visuellt, actionorienterat, modernt.",
    },
  },
  {
    aspect: "Pris-exponering",
    values: {
      trygg: "Prisfält i en gul ruta — synligt men inte dominerande.",
      progressiv: "Prisbadge ovanpå bildytan — e-commerce-mönster, omöjligt att missa.",
    },
  },
  {
    aspect: "Detalj-exponering",
    values: {
      trygg: "Tre kolumner (ingår/villkor/varför) synliga direkt. Allt läsbart i en scroll.",
      progressiv: "Tabs — användaren väljer vilken kategori de vill se. Mer kompakt.",
    },
  },
  {
    aspect: "Sekundär CTA ('Ställ en fråga')",
    values: {
      trygg: "Finns inte — bara primär CTA.",
      progressiv: "Finns. Fångar osäkra besökare som inte är redo att köpa.",
    },
  },
  {
    aspect: "Mobil",
    values: {
      trygg: "Bild staplas ovanför info — lång scroll men inga överraskningar.",
      progressiv: "Hero-bild med prisöverlägg → compact info → tabs. Mer 'app-känsla'.",
    },
  },
  {
    aspect: "WCAG",
    values: {
      trygg: "Utmärkt — ren HTML, inga dynamiska kontroller.",
      progressiv: "Bra — tabs behöver korrekt role='tab' + tangentbordsnavigation (implementerat).",
    },
  },
];

export function Produktinfo() {
  const [selectedProdukt, setSelectedProdukt] = useState<ProduktId>("ladda-smart");

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Produktinfo</p>
        <h1 className="text-h1 mb-3">Produktsida med e-commerce-känsla</h1>
        <p className="text-lede text-ink-secondary">
          En produktsida som visar pris, villkor och CTA — "mindre formulär, mer köp". Välj
          produkt nedan för att se hur modulen anpassar sig.
        </p>
      </header>

      {/* Product selector */}
      <div className="mb-6 flex flex-wrap gap-2">
        <span className="text-xs uppercase tracking-wider text-ink-muted self-center mr-2">Visa produkt:</span>
        {PRODUKTER.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelectedProdukt(p.id)}
            className={`text-sm px-3 py-1.5 rounded-md border transition-colors ${
              selectedProdukt === p.id
                ? "bg-brand-primary text-ink-onbrand border-brand-primary"
                : "bg-surface text-ink-secondary border-border-subtle hover:border-brand-accent"
            }`}
          >
            {p.namn}
          </button>
        ))}
      </div>

      <VariantSwitcher
        key={selectedProdukt}
        variants={makeVariants(selectedProdukt)}
        argumentation={ARGUMENTATION}
        defaultId="progressiv"
      />

      <section className="mt-16 pt-8 border-t border-border-subtle">
        <h2 className="text-h3 mb-4">Designnotering</h2>
        <div className="text-ink-secondary text-sm space-y-3 max-w-reading">
          <p>
            <strong>Varför produktväljare ovanför varianter?</strong> Modulen är generisk
            — alla 6 produkter renderas med exakt samma komponent. Produktväljaren visar att
            layouten skalar utan specialfall.
          </p>
          <p>
            <strong>Rekommendation:</strong> <em>B (Progressiv)</em>. E-commerce-känslan gör att
            köp och offert-förfrågan blir lika naturligt som att lägga något i en varukorg.
          </p>
        </div>
      </section>
    </div>
  );
}
