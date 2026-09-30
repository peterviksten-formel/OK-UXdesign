import { useState } from "react";
import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { ProduktinfoTrygg } from "./variants/ProduktinfoTrygg";
import { ProduktinfoProgressiv } from "./variants/ProduktinfoProgressiv";
import { ProduktinfoKop } from "./variants/ProduktinfoKop";
import { PRODUKTER, type ProduktId } from "./produkt-data";

function makeVariants(produktId: ProduktId): Variant[] {
  const p = PRODUKTER.find((x) => x.id === produktId)!;
  return [
    {
      id: "trygg",
      shortName: "A",
      label: "Trygg",
      riskLevel: "låg",
      oneLiner: "Bild och fakta sida vid sida. All information syns direkt, inget är dolt.",
      bestFor: "Enkla beslut, kunder som vill se allt på en gång och sidor som ska gå att skriva ut.",
      render: () => <ProduktinfoTrygg produkt={p} />,
    },
    {
      id: "progressiv",
      shortName: "B",
      label: "Progressiv",
      riskLevel: "medel",
      oneLiner: "Stor bild med priset ovanpå och detaljerna i flikar. Känns som en webbshop.",
      bestFor: "Produkter där en bild säger mycket och kunden ska kunna köpa eller fråga direkt.",
      render: () => <ProduktinfoProgressiv produkt={p} />,
    },
    {
      id: "experimentell",
      shortName: "C",
      label: "Köpfokuserad",
      riskLevel: "medel",
      oneLiner: "En köpruta med pris och knapp följer med när kunden scrollar genom detaljerna.",
      bestFor: "Större köp där kunden läser mycket innan beslut, till exempel laddbox och solceller.",
      render: () => <ProduktinfoKop produkt={p} />,
    },
  ];
}

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Känsla",
    values: {
      trygg: "Som ett informationsblad. Sakligt och förtroendeingivande, men lite torrt.",
      progressiv: "Som en webbshop. Visuellt, modernt och inbjuder till handling.",
      experimentell: "Som IKEA eller Amazon. Köpet finns alltid inom räckhåll medan du läser.",
    },
  },
  {
    aspect: "Hur priset visas",
    values: {
      trygg: "I en gul ruta bredvid bilden. Syns tydligt men tar inte över.",
      progressiv: "Som en etikett ovanpå bilden. Det första man ser, svårt att missa.",
      experimentell: "I köprutan som följer med vid scroll. Priset syns hela tiden.",
    },
  },
  {
    aspect: "Hur detaljerna visas",
    values: {
      trygg: "Tre kolumner (ingår, villkor, varför) som syns direkt.",
      progressiv: "Flikar där kunden själv väljer vad hen vill läsa om.",
      experimentell: "Detaljer, längre text och fördjupning ligger öppet i en lång sida. Inget är dolt.",
    },
  },
  {
    aspect: "Sekundär knapp (Ställ en fråga)",
    values: {
      trygg: "Saknas. Bara en huvudknapp.",
      progressiv: "Finns. Fångar kunder som är intresserade men inte redo att köpa.",
      experimentell: "Finns, i köprutan direkt under huvudknappen.",
    },
  },
  {
    aspect: "Mobil",
    values: {
      trygg: "Bilden hamnar ovanför texten. Lång sida, men inga överraskningar.",
      progressiv: "Bild med pris överst, sedan kort info och flikarna.",
      experimentell: "Köprutan behöver bli en fast list längst ned på skärmen. Kräver noggrann design.",
    },
  },
  {
    aspect: "Tillgänglighet (WCAG)",
    values: {
      trygg: "Mycket bra. Ren text utan dolt innehåll eller interaktiva kontroller.",
      progressiv: "Bra, om flikarna går att använda med tangentbord och skärmläsare.",
      experimentell: "Bra, om köprutan aldrig skymmer innehåll som får tangentbordsfokus.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      trygg: "Produkter med enkla beslut där en kort text räcker.",
      progressiv: "Förval för sidorna om smarta produkter och tjänster.",
      experimentell: "Laddbox, solceller och andra köp där kunden vill läsa mycket först.",
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
        <h1 className="text-h1 mb-3">Produktinfo: pris, innehåll och köp på ett ställe</h1>
        <p className="text-lede text-ink-secondary">
          Modulen visar vad produkten kostar, vad som ingår, vilka villkor som gäller och hur
          kunden går vidare. Målet är färre formulär och fler avslutade köp. Välj en produkt
          nedan och se hur samma modul fungerar för olika erbjudanden.
        </p>
      </header>

      {/* Produktväljare */}
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
            <strong>Varför en produktväljare ovanför varianterna?</strong> Modulen är gemensam
            för alla produkter. Alla 6 produkter visas med exakt samma upplägg, och väljaren
            visar att det håller för både fast pris, från-pris och offert utan specialanpassningar.
          </p>
          <p>
            <strong>Rekommendation:</strong> <em>B (Progressiv)</em>. Webbshopskänslan gör att
            det känns lika naturligt att beställa eller begära offert som att lägga något i en varukorg.
          </p>
        </div>
      </section>
    </div>
  );
}
