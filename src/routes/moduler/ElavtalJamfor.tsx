import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { VariantTrygg } from "./variants/Trygg";
import { VariantProgressiv } from "./variants/Progressiv";
import { VariantExperimentell } from "./variants/Experimentell";

const VARIANTS: Variant[] = [
  {
    id: "trygg",
    shortName: "A",
    label: "Trygg",
    riskLevel: "låg",
    oneLiner: "Lugn jämförelsetabell utan färg, rekommendationer eller knuffar. Alla avtal visas likvärdigt.",
    bestFor: "Äldre kunder, en bred målgrupp och sidor där juridisk tydlighet väger tyngst.",
    render: () => <VariantTrygg />,
  },
  {
    id: "progressiv",
    shortName: "B",
    label: "Progressiv",
    riskLevel: "medel",
    oneLiner: "Boendeval och egen förbrukning, tre jämförelsekort och en märkning av vanligaste valet.",
    bestFor: "De flesta kunder, till exempel familjer som vill förstå snabbt utan att bli överbelastade.",
    render: () => <VariantProgressiv />,
  },
  {
    id: "experimentell",
    shortName: "C",
    label: "Experimentell",
    riskLevel: "hög",
    oneLiner: "Kalkylator som föreslår avtal direkt, AI-sammanfattning, ordförklaringar och en fast tecknarad.",
    bestFor: "Yngre kunder som gillar siffror och vill räkna på sin egen situation.",
    render: () => <VariantExperimentell />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Strategisk satsning",
    values: {
      trygg: "Förtroende genom tydlighet och förutsägbarhet. Ingen knuff, alla avtal presenteras likadant.",
      progressiv: "Modern upplevelse utan krångel. En mjuk knuff mot det vanligaste valet.",
      experimentell: "Personlig anpassning ska leda till fler avtal. Kunden räknar fram sin egen kostnad.",
    },
  },
  {
    aspect: "Beslutsstöd",
    values: {
      trygg: "En fast tabell där kunden själv jämför och drar slutsatser.",
      progressiv: "Kunden väljer lägenhet eller villa och kan skriva in sin egen förbrukning. Priset i korten räknas om direkt och märkningen Vanligaste valet ger en mjuk rekommendation.",
      experimentell: "Kunden anger förbrukning och hur viktigt ett förutsägbart pris är. Rekommendationen ändras direkt.",
    },
  },
  {
    aspect: "Förklaring av facktermer (påslag, spotpris, anvisat avtal)",
    values: {
      trygg: "Förklaras i en lugn faktaruta och i fotnoter som alltid syns.",
      progressiv: "Korta etiketter i korten. Förklaringen av elnät och elhandel ligger på sidan runt modulen.",
      experimentell: "Streckad understrykning på facktermer. Kunden pekar eller trycker och får förklaringen utan att lämna sidan.",
    },
  },
  {
    aspect: "Risk att det känns som en gimmick",
    values: {
      trygg: "Ingen risk, men kan upplevas som tråkig.",
      progressiv: "Låg. Mönstren är välkända för de flesta.",
      experimentell: "Hög. Rörelse och AI-text kräver att redaktionen granskar allt innehåll.",
    },
  },
  {
    aspect: "Risk för brister i tillgänglighet (WCAG 2.2 AA)",
    values: {
      trygg: "Lägst. Vanliga formulärfält och en riktig tabell fungerar bra med skärmläsare.",
      progressiv: "Medel. Boendeväljaren och Visa detaljer måste berätta för skärmläsare vad som är valt och öppet. Det är löst i prototypen.",
      experimentell: "Högst. Ordförklaringar och reglage måste gå att använda med tangentbord och skärmläsare, och den fasta tecknaraden får inte dölja innehåll.",
    },
  },
  {
    aspect: "Tid att bygga",
    values: {
      trygg: "Kortast, en tabell och lite text.",
      progressiv: "Medel, bygger på mönster som redan finns i designsystemet.",
      experimentell: "Längst, kräver en beräkningsmodell, ordförklaringar och priser som uppdateras direkt.",
    },
  },
  {
    aspect: "Underhåll över tid",
    values: {
      trygg: "Litet. Uppdatera siffrorna i tabellen.",
      progressiv: "Litet. Vilket avtal som märks som Vanligaste valet behöver beslutas varje säsong.",
      experimentell: "Medel. Beräkningsmodellen måste hållas uppdaterad med faktiska påslag och spotpriser.",
    },
  },
  {
    aspect: "Fler tecknade avtal (hypotes)",
    values: {
      trygg: "Minst ökning. Kan ge färre avhopp där juridisk trygghet är avgörande.",
      progressiv: "Måttlig ökning. Den mjuka knuffen hjälper den som har svårt att bestämma sig.",
      experimentell: "Störst potential, eftersom kunden redan har lagt tid på att räkna.",
    },
  },
  {
    aspect: "Passar Öresundskraft just nu",
    values: {
      trygg: "Bra som reserv, eller som tabellvy bakom en annan variant.",
      progressiv: "Säkraste valet om vi väljer en variant för hela webbplatsen.",
      experimentell: "Bra för ett test på /el, där vi mäter mot Progressiv i ett A/B-test.",
    },
  },
];

export function ElavtalJamfor() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Jämför elavtal</p>
        <h1 className="text-h1 mb-3">Hitta elavtalet som passar dig</h1>
        <p className="text-lede text-ink-secondary">
          Här finns tre designvarianter av samma modul, så att vi kan jämföra för- och
          nackdelar konkret. Växla mellan A, B och C i raden nedan, eller öppna{" "}
          <em>Jämför varianter</em> för att se skillnaderna punkt för punkt.
        </p>
      </header>

      <VariantSwitcher
        variants={VARIANTS}
        argumentation={ARGUMENTATION}
        defaultId="progressiv"
      />

      {/* ─── Designnotering till Frida och Matilda ───────────────────── */}
      <section className="mt-16 pt-8 border-t border-border-subtle">
        <h2 className="text-h3 mb-4">Designnotering till Frida och Matilda</h2>
        <div className="text-ink-secondary text-sm space-y-3 max-w-reading">
          <p>
            <strong>Varför tre varianter:</strong> Vi har tre olika synsätt som alla kan
            fungera. I stället för att välja ett i förväg har vi byggt alla tre och
            beskrivit för- och nackdelar. Beslutet fattar ni tillsammans med kundservice
            och juridik.
          </p>
          <p>
            <strong>Min rekommendation:</strong> <em>B (Progressiv)</em> som standard på
            hela webbplatsen, och ett test av <em>C (Experimentell)</em> på /privat/el som
            vi mäter med Plausible eller liknande verktyg. <em>A (Trygg)</em> behåller vi
            som tillgänglig vy bakom en länk, "Visa som tabell", för skärmläsare och äldre
            kunder.
          </p>
          <p>
            <strong>Behöver källa före lansering:</strong> alla siffror för påslag, alla
            antaganden bakom rekommendationen i kalkylatorn i variant C och all text i
            AI-sammanfattningen.
          </p>
        </div>
      </section>
    </div>
  );
}
