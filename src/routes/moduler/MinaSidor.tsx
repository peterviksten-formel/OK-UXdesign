import { Link } from "react-router-dom";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { MinaSidorHero } from "./variants/MinaSidorHero";
import { MinaSidorSplit } from "./variants/MinaSidorSplit";
import { MinaSidorStrip } from "./variants/MinaSidorStrip";

const VARIANTS: Variant[] = [
  {
    id: "hero",
    shortName: "A",
    label: "Hero-banner",
    riskLevel: "låg",
    oneLiner: "Stor navy-banner med vad-du-kan-göra-lista och primär CTA.",
    bestFor: "Kundservice-sidan, elavtal-sidan — där self-service ska lyftas.",
    render: () => <MinaSidorHero />,
  },
  {
    id: "split",
    shortName: "B",
    label: "Split — webb + app",
    riskLevel: "låg",
    oneLiner: "Två likvärdiga kort: Mina sidor och mobilappen.",
    bestFor: "När både webb och app är viktiga kanaler att lyfta.",
    render: () => <MinaSidorSplit />,
  },
  {
    id: "strip",
    shortName: "C",
    label: "Kompakt strip",
    riskLevel: "låg",
    oneLiner: "En rad med ikon + CTA. Minimal yta.",
    bestFor: "Återupprepning på flera sidor, eller som footer-reminder.",
    render: () => <MinaSidorStrip />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Yta",
    values: {
      hero: "Stor — dominerar sin sektion.",
      split: "Medel — två kort bredvid varandra.",
      strip: "Liten — en horisontell rad.",
    },
  },
  {
    aspect: "Konverteringsfokus",
    values: {
      hero: "Hög — en tydlig CTA, inget konkurrerande.",
      split: "Medel — delar mellan webb och app.",
      strip: "Låg — kompletterande, inte primär.",
    },
  },
  {
    aspect: "Visar värdet",
    values: {
      hero: "Lista på 5 saker man kan göra.",
      split: "Lista per kort — 3 per kanal.",
      strip: "Två korta meningar — 'ingen kötid, dygnet runt'.",
    },
  },
  {
    aspect: "App-exponering",
    values: {
      hero: "Saknas — endast Mina sidor.",
      split: "Likvärdig med Mina sidor.",
      strip: "Saknas.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      hero: "Kundservice-sidan, elavtal-sidan, produktsidan.",
      split: "Om appen ska marknadsföras — hub-sida, privat/hem.",
      strip: "Upprepning på alla sidor i inloggat läge, footer.",
    },
  },
];

export function MinaSidor() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Mina sidor / App-hub</p>
        <h1 className="text-h1 mb-3">Mina sidor och app</h1>
        <p className="text-lede text-ink-secondary">
          Tre sätt att lyfta self-service. Hero för stort push, split för
          kanalval, strip för subtil återupprepning.
        </p>
      </header>

      <VariantSwitcher variants={VARIANTS} argumentation={ARGUMENTATION} defaultId="hero" />
    </div>
  );
}
