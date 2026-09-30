import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { AvbrottTrygg } from "./variants/AvbrottTrygg";
import { AvbrottProgressiv } from "./variants/AvbrottProgressiv";
import { AvbrottKarta } from "./variants/AvbrottKarta";

const VARIANTS: Variant[] = [
  {
    id: "trygg",
    shortName: "A",
    label: "Samlad lista",
    riskLevel: "låg",
    oneLiner: "Alla avbrott i en lista, grupperade efter läge: pågående, planerade och avslutade. Inga filter.",
    bestFor: "Snabb överblick, utskrift och skärmläsare. Kräver ingen inlärning.",
    render: () => <AvbrottTrygg />,
  },
  {
    id: "progressiv",
    shortName: "B",
    label: "Filtrerbar lista",
    riskLevel: "medel",
    oneLiner: "En varningsrad för pågående avbrott, filter per läge och kort som fälls ut med en tidslinje.",
    bestFor: "Besökare som vill sålla bland avbrotten och följa ett avbrott steg för steg.",
    render: () => <AvbrottProgressiv />,
  },
  {
    id: "experimentell",
    shortName: "C",
    label: "Kartfokuserad",
    riskLevel: "hög",
    oneLiner: "Kartan är huvudytan och listan finns bredvid. Pågående avbrott pulserar på kartan.",
    bestFor: "Frågan \"Berörs mitt område?\". Ger en geografisk överblick.",
    render: () => <AvbrottKarta />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Grundidé",
    values: {
      trygg: "All information syns direkt, inget behöver klickas fram. Som en anslagstavla.",
      progressiv: "Besökaren väljer själv vad som visas och kan fälla ut detaljer.",
      experimentell: "Kartan ger svaret. Listan är ett komplement.",
    },
  },
  {
    aspect: "\"Berörs mitt område?\"",
    values: {
      trygg: "Besökaren läser igenom listan och letar efter sitt område.",
      progressiv: "Besökaren filtrerar först och letar sedan i en kortare lista.",
      experimentell: "Svaret syns direkt på kartan.",
    },
  },
  {
    aspect: "Pågående avbrott",
    values: {
      trygg: "Hamnar överst med en röd punkt.",
      progressiv: "En varningsrad överst visar antalet och länkar till felanmälan.",
      experimentell: "Pulserande röda markeringar. Klick visar en informationsruta.",
    },
  },
  {
    aspect: "Tidslinje och uppdateringar",
    values: {
      trygg: "Visas under varje avbrott, alltid synliga.",
      progressiv: "Visas när besökaren klickar på ett kort.",
      experimentell: "Kort sammanfattning i informationsrutan för vald markering.",
    },
  },
  {
    aspect: "Mobil",
    values: {
      trygg: "Blir en lång sida när det finns många avbrott.",
      progressiv: "Filtren tar bort det som inte är relevant, så sidan blir kortare.",
      experimentell: "Kartan tar stor plats på en liten skärm. Behöver en listvy som alternativ.",
    },
  },
  {
    aspect: "Tillgänglighet (WCAG 2.2 AA)",
    values: {
      trygg: "Mycket god. Enkel struktur som fungerar med skärmläsare.",
      progressiv: "God, om filter och utfällbara kort är korrekt märkta för skärmläsare.",
      experimentell: "Svår. Varje markering behöver en textbeskrivning och listvyn måste alltid finnas.",
    },
  },
  {
    aspect: "Arbetsinsats att bygga",
    values: {
      trygg: "Liten. En lista.",
      progressiv: "Mellan. Filter och utfällbara kort.",
      experimentell: "Stor. Kräver kartunderlag och att varje avbrott kopplas till en plats.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      trygg: "Reservvy för utskrift och skärmläsare.",
      progressiv: "Förval på avbrottssidan.",
      experimentell: "Överst på en egen kartsida för avbrott, aldrig som enda vy.",
    },
  },
];

export function Avbrottslista() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Avbrottslista</p>
        <h1 className="text-h1 mb-3">Avbrottslista: så visar vi läget</h1>
        <p className="text-lede text-ink-secondary">
          Listan visar pågående, planerade och avslutade avbrott i el, fjärrvärme och fiber.
          Tre varianter, från en enkel lista till en karta. Växla mellan A, B och C och jämför.
        </p>
      </header>

      <VariantSwitcher
        variants={VARIANTS}
        argumentation={ARGUMENTATION}
        defaultId="progressiv"
      />

      <section className="mt-16 pt-8 border-t border-border-subtle">
        <h2 className="text-h3 mb-4">Att tänka på</h2>
        <div className="text-ink-secondary text-sm space-y-3 max-w-reading">
          <p>
            <strong>Kartvarianten (C) är en skiss.</strong> Kartan och markeringarna är påhittade.
            En riktig version kräver ett kartunderlag, att varje avbrott kopplas till en plats och
            en listvy för den som använder skärmläsare. Skissen räcker för att diskutera hur
            besökaren ska använda kartan.
          </p>
          <p>
            <strong>Rekommendation:</strong> <em>B (Filtrerbar lista)</em> som förval på avbrottssidan.{" "}
            <em>C (Kartfokuserad)</em> på en egen kartsida för avbrott. <em>A (Samlad lista)</em> behåller
            vi som tillgänglig reservvy för utskrift och skärmläsare.
          </p>
          <p>
            <strong>Nästa steg:</strong> uppdateringar i realtid utan att besökaren laddar om sidan,
            avisering via sms och information om avbrottsersättning på avslutade avbrott.
          </p>
        </div>
      </section>
    </div>
  );
}
