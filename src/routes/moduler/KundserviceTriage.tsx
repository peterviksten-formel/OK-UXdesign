import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { KundserviceTrygg } from "./variants/KundserviceTrygg";
import { KundserviceProgressiv } from "./variants/KundserviceProgressiv";
import { KundserviceExperimentell } from "./variants/KundserviceExperimentell";

const VARIANTS: Variant[] = [
  {
    id: "trygg",
    shortName: "A",
    label: "Trygg",
    riskLevel: "låg",
    oneLiner: "Accordion med native <details>. Alla kategorier synliga direkt.",
    bestFor: "Äldre kunder, tillgänglighet, noll-JS-fallback.",
    render: () => <KundserviceTrygg />,
  },
  {
    id: "progressiv",
    shortName: "B",
    label: "Progressiv",
    riskLevel: "medel",
    oneLiner: "Kategori-kort → underkategori → inline-svar. Två steg.",
    bestFor: "Mainstream. Snabb scanning utan att överväldiga.",
    render: () => <KundserviceProgressiv />,
  },
  {
    id: "experimentell",
    shortName: "C",
    label: "Experimentell",
    riskLevel: "hög",
    oneLiner: "Konversations-tratt. Chatbot-känsla utan chatbot.",
    bestFor: "Yngre kunder. Personlig, snabb, lekfull.",
    render: () => <KundserviceExperimentell />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Strategisk satsning",
    values: {
      trygg: "Förtroende genom överskådlighet. Allt synligt direkt, inga överraskningar.",
      progressiv: "Tydlig tratt: kategori → fråga → svar. Strukturerar utan att styra.",
      experimentell: "Konversation istället för navigation. Personligt utan AI-risk.",
    },
  },
  {
    aspect: "Antal klick till svar",
    values: {
      trygg: "2 (öppna accordion + klicka länk).",
      progressiv: "3 (kategori + underkategori + CTA).",
      experimentell: "3 (kategori + fråga + CTA), men känslan är snabbare, varje steg är lättare.",
    },
  },
  {
    aspect: "Sökbarhet",
    values: {
      trygg: "Nej. Användaren scannar visuellt.",
      progressiv: "Nej. Kort + lista-mönster.",
      experimentell: "Ja, fritextsök i intro-steget matchar mot alla kategorier/frågor.",
    },
  },
  {
    aspect: "Mobil-upplevelse",
    values: {
      trygg: "Bra. Accordions fungerar smalt. Kan bli lång scroll med 6 öppna sektioner.",
      progressiv: "Bra. 2-kolumns grid → staplade kort, kompakt.",
      experimentell: "Utmärkt. Chat-bubblemönster är native-mobilmönster; alla thumbs reach.",
    },
  },
  {
    aspect: "Risk att 'Kontakta oss' blir standard",
    values: {
      trygg: "Låg. Alla alternativ listade inline, kontakt syns sist.",
      progressiv: "Låg. Badges ('Guide' / 'Mina sidor' / 'Chatt') visar vad varje val är.",
      experimentell: "Medel. Konversationsmönster kan lura användaren att tro det finns en agent i andra änden.",
    },
  },
  {
    aspect: "WCAG 2.2 AA",
    values: {
      trygg: "Utmärkt. Native <details>/<summary>, inga custom ARIA-roller.",
      progressiv: "Bra. aria-pressed på kort, aria-expanded på lista. Alla interaktiva element tangentbordsnåbara.",
      experimentell: "Medel. Dynamisk DOM (bubblar läggs till) kräver aria-live-region + fokushantering.",
    },
  },
  {
    aspect: "Underhåll / redaktörens jobb",
    values: {
      trygg: "Enklast. En lista i ett CMS-fält.",
      progressiv: "Medel. Kort-ikoner + badge-logik behöver riktlinjer.",
      experimentell: "Högt. Konversationskopia måste skrivas per gren; varje kombination av steg 1+2 har en unik svarstext.",
    },
  },
  {
    aspect: "Konvertering (hypotes)",
    values: {
      trygg: "Lägst. Ren information, ingen drift.",
      progressiv: "Moderat. Strukturen leder, badges och inline-svar minskar exit rate.",
      experimentell: "Högst. Investerade steg skapar commitment-bias: användaren avslutar tratten.",
    },
  },
];

export function KundserviceTriage() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Kundservice-triage</p>
        <h1 className="text-h1 mb-3">Jag behöver hjälp med…</h1>
        <p className="text-lede text-ink-secondary">
          Interaktiv tratt som leder kunden till rätt svar eller kanal utan att
          "Kontakta oss" är standardvägen. Tre varianter, från statisk lista
          till konversationsflöde.
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
            <strong>Vad vi löser:</strong> Idag finns ingen kundservice-sida som "trattar"
            kunden, alla landar på en generisk kontakt-sida. Det här blocket ersätter
            den med self-serve-logik: varje fråga ska antingen besvaras inline, leda till
            Mina sidor, eller (sista utväg) erbjuda chatt/telefon.
          </p>
          <p>
            <strong>Data som styr kategorier:</strong> Kategorierna speglar de vanligaste
            supportärendena: faktura (35%), avtal (20%), flytta (15%), avbrott (25%),
            elnät (5%). Ordningen sorteras därefter.
          </p>
          <p>
            <strong>Rekommendation:</strong> <em>B (Progressiv)</em> som standard.
            Övervägdes <em>C</em> men konversationsmönstret kräver mer redaktionellt
            underhåll per gren och risken att användaren tror det finns en person i
            andra änden är reell.
          </p>
        </div>
      </section>
    </div>
  );
}
