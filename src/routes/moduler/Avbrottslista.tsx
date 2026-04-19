import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { AvbrottTrygg } from "./variants/AvbrottTrygg";
import { AvbrottProgressiv } from "./variants/AvbrottProgressiv";

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
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Strategisk satsning",
    values: {
      trygg: "All info synlig direkt — ingen interaktion krävs. Bulletin-modell.",
      progressiv: "Filtrera + drilla ner. Användaren styr vad de ser.",
    },
  },
  {
    aspect: "Akut-hantering",
    values: {
      trygg: "Pågående avbrott överst med röd punkt och detaljerad info.",
      progressiv: "Akutbar med pulserande punkt + felanmälningslänk. Pågående tab med räknare.",
    },
  },
  {
    aspect: "Tidslinje / uppdateringar",
    values: {
      trygg: "Inline under varje avbrott — alltid synlig.",
      progressiv: "Expanderbar: klicka kort → tidslinje glider ut. Sparar yta.",
    },
  },
  {
    aspect: "Mobil-upplevelse",
    values: {
      trygg: "Kan bli lång scroll med 6+ avbrott. Inga överraskningar.",
      progressiv: "Tabs filtrar bort irrelevant info. Kompakta kort.",
    },
  },
  {
    aspect: "WCAG 2.2 AA",
    values: {
      trygg: "Utmärkt — ren HTML, landmarks, inga dynamiska kontroller.",
      progressiv: "Bra — tab-rollen + aria-expanded behöver korrekt implementation. Pulserande punkt bör respektera prefers-reduced-motion.",
    },
  },
  {
    aspect: "Real-time-potential",
    values: {
      trygg: "Reload-beroende. Kan lägga på auto-refresh med meta-tag.",
      progressiv: "Bättre förberedd för websocket/SSE — filtertillståndet behålls vid uppdatering.",
    },
  },
  {
    aspect: "Underhåll",
    values: {
      trygg: "Enklast. Flat lista i CMS.",
      progressiv: "Medel. Tab-logik + akutbar-villkor behöver drift-övervakning.",
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
          Två varianter — från statisk bulletin till filtrerbar lista med tidslinje.
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
            <strong>Varför bara två varianter?</strong> Avbrottsinformation är en status-vy,
            inte en kreativ yta. "Experimentell" skulle behöva en kartintegration (Mapbox/Google
            Maps) eller push-notiser — båda är infrastrukturprojekt utanför UX-prototypens scope.
          </p>
          <p>
            <strong>Rekommendation:</strong> <em>B (Progressiv)</em>. Akutbaren ger omedelbar
            relevans. Filtertabs sparar scroll-tid. Expanderbar tidslinje gör det möjligt att
            följa ett enskilt avbrott utan att lämna sidan.
          </p>
          <p>
            <strong>Framtida möjlighet:</strong> Kartvy som lager ovanpå B-varianten, plus
            SMS-notiser med "Jag vill bli meddelad". Utanför fas 1.
          </p>
        </div>
      </section>
    </div>
  );
}
