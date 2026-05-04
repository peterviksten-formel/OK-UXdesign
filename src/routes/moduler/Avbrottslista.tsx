import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { AvbrottTrygg } from "./variants/AvbrottTrygg";
import { AvbrottProgressiv } from "./variants/AvbrottProgressiv";
import { AvbrottKarta } from "./variants/AvbrottKarta";

const VARIANTS: Variant[] = [
  {
    id: "trygg",
    shortName: "A",
    label: "Trygg",
    riskLevel: "låg",
    oneLiner: "Statusgrupperad lista. Allt synligt i en scroll, inga filter.",
    bestFor: "Snabb överblick. Fungerar utan JS. Noll inlärningskurva.",
    render: () => <AvbrottTrygg />,
  },
  {
    id: "progressiv",
    shortName: "B",
    label: "Progressiv",
    riskLevel: "medel",
    oneLiner: "Filter-tabs + akutbar + expanderbar tidslinje per avbrott.",
    bestFor: "Användare som vill filtrera och följa ett specifikt avbrott.",
    render: () => <AvbrottProgressiv />,
  },
  {
    id: "experimentell",
    shortName: "C",
    label: "Karta-first",
    riskLevel: "hög",
    oneLiner: "Karta som huvudyta, lista som sekundär. Pulserande pins.",
    bestFor: "\"Är mitt område påverkat?\"-frågan. Geografisk överblick.",
    render: () => <AvbrottKarta />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Strategisk satsning",
    values: {
      trygg: "All info synlig direkt, ingen interaktion krävs. Bulletin-modell.",
      progressiv: "Filtrera + drilla ner. Användaren styr vad de ser.",
      experimentell: "Kartan äger svaret. Lista är backup.",
    },
  },
  {
    aspect: "\"Är mitt område påverkat?\"",
    values: {
      trygg: "Scanna listan efter områdesnamn.",
      progressiv: "Filtrera + scanna.",
      experimentell: "Direkt visuellt svar på kartan.",
    },
  },
  {
    aspect: "Akut-hantering",
    values: {
      trygg: "Pågående avbrott överst med röd punkt.",
      progressiv: "Akutbar med pulserande punkt + felanmälan.",
      experimentell: "Pulsande röda pins + info-bubbel vid klick.",
    },
  },
  {
    aspect: "Tidslinje / uppdateringar",
    values: {
      trygg: "Inline under varje avbrott, alltid synlig.",
      progressiv: "Expanderbar: klicka kort → tidslinje glider ut.",
      experimentell: "I info-bubbel när pin valts. Kompakt.",
    },
  },
  {
    aspect: "Mobil",
    values: {
      trygg: "Lång scroll med 6+ avbrott.",
      progressiv: "Tabs filtrar bort irrelevant info.",
      experimentell: "Karta tar mycket yta på liten skärm. Fallback till lista?",
    },
  },
  {
    aspect: "WCAG 2.2 AA",
    values: {
      trygg: "Utmärkt, ren HTML.",
      progressiv: "Bra, tabs + aria-expanded.",
      experimentell: "Svår, kartpins behöver alt-text, list-view är obligatorisk fallback.",
    },
  },
  {
    aspect: "Implementation",
    values: {
      trygg: "Lägst, en lista.",
      progressiv: "Medel, filter + expand-state.",
      experimentell: "Högst, kartbibliotek (Mapbox/Leaflet), kartdata, geocoding.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      trygg: "Fallback-vy. Print. Screen-readers.",
      progressiv: "Default för avbrottssida.",
      experimentell: "Toppläge på dedikerad avbrottskarta-sida. Inte som enda vy.",
    },
  },
];

export function Avbrottslista() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Avbrottslista</p>
        <h1 className="text-h1 mb-3">Avbrottsinformation</h1>
        <p className="text-lede text-ink-secondary">
          Planerade, pågående och avslutade avbrott i el, fjärrvärme och fiber.
          Två varianter, från statisk bulletin till filtrerbar lista med tidslinje.
        </p>
      </header>

      <VariantSwitcher
        variants={VARIANTS}
        argumentation={ARGUMENTATION}
        defaultId="progressiv"
      />

      <section className="mt-16 pt-8 border-t border-border-subtle">
        <h2 className="text-h3 mb-4">Designnotering</h2>
        <div className="text-ink-secondary text-sm space-y-3 max-w-reading">
          <p>
            <strong>Karta-varianten (C) är en prototyp.</strong> Riktig implementation kräver
            kartbibliotek (Mapbox/Leaflet/MapLibre), geocoding av avbrott, och fallback-vy för
            screen readers. Jag har skissat interaktionsmönstret med fake-pins på en grid-bakgrund
            så vi kan diskutera UX-aspekten utan att bygga kartintegrationen.
          </p>
          <p>
            <strong>Rekommendation:</strong> <em>B (Progressiv)</em> som default. <em>C (Karta)</em>
            som dedikerad avbrottskarta-sida vid sidan om. <em>A (Trygg)</em> behåller vi som
            tillgänglig fallback (print + screen-reader).
          </p>
          <p>
            <strong>Framtida:</strong> Real-time-uppdateringar via WebSocket, SMS-avisering,
            avbrottsersättning kopplad till avslutat-posterna.
          </p>
        </div>
      </section>
    </div>
  );
}
