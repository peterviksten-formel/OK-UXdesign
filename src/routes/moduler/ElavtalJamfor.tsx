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
    oneLiner: "Monokrom, formell, semantisk tabell. Inga nudgar.",
    bestFor: "Äldre kunder, regulatorisk trygghet, bred målgrupp.",
    render: () => <VariantTrygg />,
  },
  {
    id: "progressiv",
    shortName: "B",
    label: "Progressiv",
    riskLevel: "medel",
    oneLiner: "Pill-väljare + jämförelsekort + 'vanligaste valet'.",
    bestFor: "Mainstream, yngre familjer som vill förstå utan att överbelastas.",
    render: () => <VariantProgressiv />,
  },
  {
    id: "experimentell",
    shortName: "C",
    label: "Experimentell",
    riskLevel: "hög",
    oneLiner: "Live-kalkylator, AI-summary, tooltips, klistrad CTA.",
    bestFor: "Yngre, datadrivna kunder som vill testa sin egen verklighet.",
    render: () => <VariantExperimentell />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Strategisk satsning",
    values: {
      trygg: "Förtroende = klarhet och förutsägbarhet. Ingen nudge, allt presenteras lika.",
      progressiv: "Modern UX utan komplexitet. En mjuk knuff mot rekommenderat val.",
      experimentell: "Personalisering driver konvertering. Användaren testar 'sin egen' kostnad.",
    },
  },
  {
    aspect: "Beslutsstöd",
    values: {
      trygg: "Statisk semantisk tabell. Användaren tolkar själv.",
      progressiv: "Lägenhet/villa-väljare ger ungefärligt pris. 'Vanligaste valet' rekommenderar mjukt.",
      experimentell: "Kalkylator + risktolerans → live-rekommendation som ändras direkt.",
    },
  },
  {
    aspect: "Hantering av jargon (påslag, spotpris, anvisat avtal)",
    values: {
      trygg: "Förklaras i en lugn faktaruta som måste läsas.",
      progressiv: "Förklaring som callout + länk till 'Vad är skillnaden?'.",
      experimentell: "Tooltips med streckad understrykning, kontext utan att lämna sidan.",
    },
  },
  {
    aspect: "Risk för 'känns gimmickig'",
    values: {
      trygg: "Ingen risk, kan kännas tråkig istället.",
      progressiv: "Låg. Mönstren är väl etablerade.",
      experimentell: "Hög. Animationer + AI-text kräver redaktionell granskning.",
    },
  },
  {
    aspect: "WCAG 2.2 AA-risk",
    values: {
      trygg: "Lägst. Native form + semantisk tabell ger skärmläsare allt.",
      progressiv: "Medel. Pill-toggle behöver aria-pressed (gjort), accordion behöver aria-expanded.",
      experimentell: "Högst. Tooltips behöver tangentbordsstöd, sliders behöver aria-värden, klistrad CTA får inte täcka innehåll.",
    },
  },
  {
    aspect: "Implementeringstid",
    values: {
      trygg: "Lägst, en tabell + lite copy.",
      progressiv: "Medel, komponenter finns redan i Material/Tailwind.",
      experimentell: "Högst, kräver kalkyleringsmodell + tooltip-komponent + live-state.",
    },
  },
  {
    aspect: "Underhåll över tid",
    values: {
      trygg: "Lågt. Ändra siffror i tabellen.",
      progressiv: "Lågt. 'Vanligaste valet'-flagga kräver beslut per säsong.",
      experimentell: "Medel. Kalkyleringsmodellen ska hållas i synk med faktiska påslag och spotpris.",
    },
  },
  {
    aspect: "Konvertering (hypotes)",
    values: {
      trygg: "Lägst lyft. Möjligen lägre avhopp i juridiskt känsliga fall.",
      progressiv: "+ moderat. Mjuk nudge fungerar för obeslutsamma.",
      experimentell: "Störst potential, användaren har 'investerat' i sliders.",
    },
  },
  {
    aspect: "Lämplig för Öresundskraft just nu",
    values: {
      trygg: "Bra som fallback / som 'detalj-vy' bakom annan variant.",
      progressiv: "Säkraste valet om vi väljer EN variant för hela siten.",
      experimentell: "Bra för en pilot på /el, mätbart mot Progressiv via A/B-test.",
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
          Tre designvarianter av samma modul, så vi kan diskutera trade-offs konkret.
          Växla mellan A, B och C i raden nedan, eller öppna <em>Jämför varianter</em> för
          en punktvis genomgång.
        </p>
      </header>

      <VariantSwitcher
        variants={VARIANTS}
        argumentation={ARGUMENTATION}
        defaultId="progressiv"
      />

      {/* ─── Designnotering till Frida / Matilda ─────────────────────── */}
      <section className="mt-16 pt-8 border-t border-border-subtle">
        <h2 className="text-h3 mb-4">Designnotering till Frida / Matilda</h2>
        <div className="text-ink-secondary text-sm space-y-3 max-w-reading">
          <p>
            <strong>Syfte med tre varianter:</strong> Vi har tre olika filosofier som alla
            kan funka. I stället för att i förväg välja en, bygger vi alla tre och
            argumenterar för/emot. Beslutet hör hemma hos er + KC + juridik tillsammans.
          </p>
          <p>
            <strong>Vad jag rekommenderar:</strong> <em>B (Progressiv)</em> som standard
            för hela siten + en pilot på <em>C (Experimentell)</em> för /privat/el som vi
            mäter med Plausible eller liknande. <em>A (Trygg)</em> behåller vi som
            tillgänglig vy bakom en "Visa som tabell"-länk för skärmläsare och äldre.
          </p>
          <p>
            <strong>Vad som behöver källa innan release:</strong> alla siffror i påslag,
            alla rekommendationskorrekta antaganden i Variant C:s kalkylator, samt all
            text i AI-sammanfattningen.
          </p>
        </div>
      </section>
    </div>
  );
}
