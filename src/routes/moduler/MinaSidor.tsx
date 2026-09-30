import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { MinaSidorHero } from "./variants/MinaSidorHero";
import { MinaSidorSplit } from "./variants/MinaSidorSplit";
import { MinaSidorStrip } from "./variants/MinaSidorStrip";

const VARIANTS: Variant[] = [
  {
    id: "hero",
    shortName: "A",
    label: "Stor banner",
    riskLevel: "låg",
    oneLiner: "Stor mörkblå banner med en lista över vad du kan göra och en tydlig inloggningsknapp.",
    bestFor: "Kundservicesidan och elavtalssidan, där besökaren ska lockas att lösa ärendet själv.",
    render: () => <MinaSidorHero />,
  },
  {
    id: "split",
    shortName: "B",
    label: "Webb och app",
    riskLevel: "låg",
    oneLiner: "Två likvärdiga kort sida vid sida: Mina sidor och appen.",
    bestFor: "När både webben och appen är viktiga kanaler att lyfta.",
    render: () => <MinaSidorSplit />,
  },
  {
    id: "strip",
    shortName: "C",
    label: "Kompakt remsa",
    riskLevel: "låg",
    oneLiner: "En rad med ikon, kort värde och inloggningsknapp. Tar minimal plats.",
    bestFor: "Påminnelse på flera sidor, till exempel längst ner på sidan.",
    render: () => <MinaSidorStrip />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Plats på sidan",
    values: {
      hero: "Stor, dominerar sin del av sidan.",
      split: "Medel, två kort bredvid varandra.",
      strip: "Liten, en enda rad.",
    },
  },
  {
    aspect: "Fokus på inloggning",
    values: {
      hero: "Högt. En tydlig knapp och inget som konkurrerar.",
      split: "Medel. Uppmärksamheten delas mellan webb och app.",
      strip: "Lågt. Ett komplement, inte huvudvägen.",
    },
  },
  {
    aspect: "Hur värdet visas",
    values: {
      hero: "En lista med fem saker du kan göra.",
      split: "Tre saker per kanal.",
      strip: "En kort rad: ingen kötid, öppet dygnet runt.",
    },
  },
  {
    aspect: "Lyfter appen",
    values: {
      hero: "Nej, bara Mina sidor.",
      split: "Ja, lika mycket som Mina sidor.",
      strip: "Nej.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      hero: "Kundservicesidan, elavtalssidan och produktsidan.",
      split: "När appen ska marknadsföras, på översiktssidor och Privat/Hem.",
      strip: "Återkommande påminnelse på många sidor, till exempel längst ner.",
    },
  },
];

export function MinaSidor() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Mina sidor och appen</p>
        <h1 className="text-h1 mb-3">Mina sidor och appen</h1>
        <p className="text-lede text-ink-secondary">
          Tre sätt att få fler kunder att lösa sina ärenden själva. En stor banner när det
          ska synas mycket, två kort när kunden ska välja mellan webb och app, och en
          kompakt remsa som diskret påminnelse.
        </p>
      </header>

      <VariantSwitcher variants={VARIANTS} argumentation={ARGUMENTATION} defaultId="hero" />
    </div>
  );
}
