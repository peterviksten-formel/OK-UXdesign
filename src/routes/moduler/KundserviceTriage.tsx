import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { KundserviceTrygg } from "./variants/KundserviceTrygg";
import { KundserviceProgressiv } from "./variants/KundserviceProgressiv";
import { KundserviceExperimentell } from "./variants/KundserviceExperimentell";

const VARIANTS: Variant[] = [
  {
    id: "trygg",
    shortName: "A",
    label: "Ämneslista",
    riskLevel: "låg",
    oneLiner: "Alla ämnen syns direkt som en lista. Kunden fäller ut ett ämne och väljer sin fråga.",
    bestFor: "Kunder som vill se alla alternativ på en gång, äldre kunder och den som använder skärmläsare.",
    render: () => <KundserviceTrygg />,
  },
  {
    id: "progressiv",
    shortName: "B",
    label: "Stegvis",
    riskLevel: "medel",
    oneLiner: "Kunden väljer ämne, sedan fråga, och får svaret direkt i sidan. Två steg.",
    bestFor: "De flesta kunder. Går snabbt att överblicka utan att visa allt på en gång.",
    render: () => <KundserviceProgressiv />,
  },
  {
    id: "experimentell",
    shortName: "C",
    label: "Samtal",
    riskLevel: "hög",
    oneLiner: "Frågorna ställs som i en chatt, men svaren är färdigskrivna. Ingen chattrobot.",
    bestFor: "Yngre kunder och mobilanvändare. Känns personligt, snabbt och lättsamt.",
    render: () => <KundserviceExperimentell />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Syfte",
    values: {
      trygg: "Skapa förtroende genom överblick. Allt syns direkt, inga överraskningar.",
      progressiv: "Leda kunden i tydliga steg: ämne, fråga, svar. Ger struktur utan att styra för hårt.",
      experimentell: "Ersätta menyer med ett samtal. Känns personligt utan riskerna med en chattrobot.",
    },
  },
  {
    aspect: "Antal klick till svar",
    values: {
      trygg: "2 (öppna ämnet och klicka på frågan).",
      progressiv: "3 (ämne, fråga och knapp).",
      experimentell: "3 (ämne, fråga och knapp), men varje steg känns lättare och flödet upplevs snabbare.",
    },
  },
  {
    aspect: "Sökfunktion",
    values: {
      trygg: "Nej. Kunden läser igenom listan.",
      progressiv: "Nej. Kunden väljer bland kort och listor.",
      experimentell: "Ja. Kunden kan skriva ett ord i första steget, till exempel \"faktura\", och få förslag på ämnen.",
    },
  },
  {
    aspect: "I mobilen",
    values: {
      trygg: "Bra. Listan fungerar på smala skärmar, men sidan blir lång om kunden öppnar många ämnen.",
      progressiv: "Bra. Korten staplas i två kolumner och tar lite plats.",
      experimentell: "Mycket bra. Chattbubblor är ett välkänt mönster i mobilen och allt nås med tummen.",
    },
  },
  {
    aspect: "Risk att kunden går direkt till \"Kontakta oss\"",
    values: {
      trygg: "Låg. Alla svar syns i listan och kontaktuppgifterna ligger sist.",
      progressiv: "Låg. Etiketterna (Guide, Mina sidor, Chatt) visar vad varje val leder till.",
      experimentell: "Medel. Chattformen kan få kunden att tro att en person svarar.",
    },
  },
  {
    aspect: "Tillgänglighet (WCAG 2.2 AA)",
    values: {
      trygg: "Mycket bra. Bygger på webbläsarens egna utfällbara listor som fungerar med skärmläsare och tangentbord.",
      progressiv: "Bra. Skärmläsare får veta vilket kort som är valt och vilken fråga som är öppen. Allt går att nå med tangentbordet.",
      experimentell: "Medel. Nya bubblor dyker upp efter hand, så skärmläsare måste få veta när något nytt visas och var fokus ska hamna.",
    },
  },
  {
    aspect: "Redaktörens arbete",
    values: {
      trygg: "Enklast. En lista med ämnen och frågor.",
      progressiv: "Medel. Ikoner och etiketter behöver tydliga riktlinjer.",
      experimentell: "Störst. Varje fråga behöver en egen svarstext i samtalston, och alla vägar måste skrivas.",
    },
  },
  {
    aspect: "Andel som hittar rätt (hypotes)",
    values: {
      trygg: "Lägst. Ren information som inte leder kunden vidare.",
      progressiv: "Medel. Stegen leder kunden, och etiketter och svar i sidan gör att färre lämnar sidan utan svar.",
      experimentell: "Högst. Den som har tagit ett steg vill gärna slutföra resten.",
    },
  },
];

export function KundserviceTriage() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Kundservice</p>
        <h1 className="text-h1 mb-3">Kundservice: jag behöver hjälp med…</h1>
        <p className="text-lede text-ink-secondary">
          Ett stöd som leder kunden till rätt svar eller rätt kontaktväg, så att
          "Kontakta oss" inte blir första valet. Tre varianter, från en enkel lista
          till ett samtal i chattform. Växla mellan A, B och C och jämför.
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
            <strong>Problemet vi löser:</strong> I dag finns ingen kundservicesida som
            leder kunden vidare. Alla hamnar på en allmän kontaktsida. Den här modulen
            ersätter den med självservice: varje fråga ska få svar direkt i sidan, leda
            till Mina sidor eller, i sista hand, erbjuda chatt eller telefon.
          </p>
          <p>
            <strong>Så valdes ämnena:</strong> Ämnena speglar de vanligaste ärendena
            till kundservice: faktura (35 %), avbrott (25 %), avtal (20 %), flytt (15 %)
            och elnät (5 %). Ordningen i listan bör följa den fördelningen.
          </p>
          <p>
            <strong>Rekommendation:</strong> <em>B (Stegvis)</em> som standard.
            Vi övervägde <em>C (Samtal)</em>, men den kräver mer redaktionellt arbete
            för varje fråga, och risken att kunden tror att en person svarar är verklig.
          </p>
        </div>
      </section>
    </div>
  );
}
