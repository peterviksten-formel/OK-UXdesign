import { useState } from "react";
import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Icon } from "../../components/Icon";
import { VariantSwitcher, type ArgumentRow, type Variant } from "../../components/VariantSwitcher";
import { FormularKonversation } from "./variants/FormularKonversation";

/* ─── Variant A, Traditional form ──────────────────────────────────── */
function FormTrygg() {
  return (
    <Annotation
      label="Traditionellt formulär"
      audience="design"
      rationale="Klassiskt vertikalt formulär med alla fält synliga. En sida, en submit-knapp. Förutsägbart. Inga överraskningar. Bra tillgänglighet med synliga labels."
    >
      <div className="max-w-reading">
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* Order summary */}
          <div className="rounded-md bg-tint-info p-4 mb-6">
            <p className="text-sm font-medium mb-1">Din beställning</p>
            <p className="text-h4 font-medium">Ladda Smart</p>
            <p className="text-sm text-ink-muted">Från 14 900 kr inkl. installation</p>
          </div>

          <fieldset>
            <legend className="text-h5 font-medium mb-3">Dina uppgifter</legend>
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fornamn-a" className="block text-sm font-medium mb-1">Förnamn</label>
                  <input id="fornamn-a" type="text" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                </div>
                <div>
                  <label htmlFor="efternamn-a" className="block text-sm font-medium mb-1">Efternamn</label>
                  <input id="efternamn-a" type="text" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                </div>
              </div>
              <div>
                <label htmlFor="personnr-a" className="block text-sm font-medium mb-1">Personnummer</label>
                <input id="personnr-a" type="text" placeholder="ÅÅÅÅMMDD-XXXX" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm placeholder:text-ink-muted focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                <p className="text-xs text-ink-muted mt-1">Behövs för kreditupplysning och rotavdrag.</p>
              </div>
              <div>
                <label htmlFor="adress-a" className="block text-sm font-medium mb-1">Installationsadress</label>
                <input id="adress-a" type="text" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="postnr-a" className="block text-sm font-medium mb-1">Postnummer</label>
                  <input id="postnr-a" type="text" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                </div>
                <div>
                  <label htmlFor="ort-a" className="block text-sm font-medium mb-1">Ort</label>
                  <input id="ort-a" type="text" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                </div>
              </div>
              <div>
                <label htmlFor="epost-a" className="block text-sm font-medium mb-1">E-post</label>
                <input id="epost-a" type="email" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
              </div>
              <div>
                <label htmlFor="telefon-a" className="block text-sm font-medium mb-1">Telefon</label>
                <input id="telefon-a" type="tel" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
              </div>
            </div>
          </fieldset>

          <div className="flex items-start gap-3">
            <input type="checkbox" id="villkor-a" className="mt-1 w-4 h-4 accent-brand-primary" />
            <label htmlFor="villkor-a" className="text-sm text-ink-secondary">
              Jag godkänner <a href="#" className="text-brand-accent underline">avtalsvillkoren</a> och{" "}
              <a href="#" className="text-brand-accent underline">integritetspolicyn</a>.
            </label>
          </div>

          <button type="submit" className="w-full bg-brand-primary text-ink-onbrand font-medium py-3 rounded hover:opacity-90 transition-opacity">
            Skicka beställning
          </button>
          <p className="text-xs text-ink-muted text-center">
            14 dagars ångerrätt · Vi kontaktar dig inom 3 arbetsdagar
          </p>
        </form>
      </div>
    </Annotation>
  );
}

/* ─── Variant B, Checkout-style stepper ────────────────────────────── */
function FormProgressiv() {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Produkt", icon: "shopping_cart" },
    { label: "Uppgifter", icon: "person" },
    { label: "Bekräfta", icon: "check" },
  ];

  return (
    <div className="max-w-reading">
      {/* Stepper */}
      <Annotation
        label="Stegindikator"
        audience="user"
        rationale="3 steg synliga hela tiden, du vet var du är och vad som kommer. Minskar osäkerhet. Verb-konsistens: 'Beställ' hela vägen, aldrig 'Sök pris' eller 'Kontakta'."
      >
        <div className="flex items-center mb-8">
          {steps.map((s, i) => (
            <div key={s.label} className="flex items-center flex-1">
              <button
                type="button"
                onClick={() => setStep(i)}
                className={`flex items-center gap-2 text-sm font-medium ${
                  i === step ? "text-brand-primary" : i < step ? "text-brand-accent" : "text-ink-muted"
                }`}
              >
                <span className={`w-8 h-8 rounded-full grid place-items-center ${
                  i === step ? "bg-brand-primary text-white" :
                  i < step ? "bg-brand-accent text-white" :
                  "bg-border-subtle text-ink-muted"
                }`}>
                  <Icon name={i < step ? "check" : s.icon} size={16} />
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {i < steps.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 ${i < step ? "bg-brand-accent" : "bg-border-subtle"}`} />
              )}
            </div>
          ))}
        </div>
      </Annotation>

      <form onSubmit={(e) => e.preventDefault()}>
        {/* Step 0: Product confirmation */}
        {step === 0 && (
          <Annotation
            label="Steg 1: Produktbekräftelse"
            audience="design"
            rationale="Inte ett 'tomt' steg, användaren bekräftar vad de köper och ser pris + villkor innan de lämnar personuppgifter. Minskar avhopp i steg 2."
          >
            <div className="space-y-4">
              <div className="rounded-md border border-border-subtle bg-surface p-5">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded bg-tint-info flex items-center justify-center text-ink-muted flex-shrink-0">
                    <Icon name="image" size={32} />
                  </div>
                  <div className="flex-1">
                    <p className="text-eyebrow uppercase text-ink-muted mb-1">Elbil & laddning</p>
                    <h3 className="text-h4 font-medium mb-1">Ladda Smart</h3>
                    <p className="text-sm text-ink-secondary">Smart laddning för elbil, hemma eller på jobbet.</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-ink-muted">Från</p>
                    <p className="text-h4 font-medium">14 900 kr</p>
                  </div>
                </div>
              </div>

              <div className="rounded-md bg-tint-notice p-4 text-sm">
                <p className="font-medium mb-2">Så fungerar det:</p>
                <ol className="list-decimal list-inside space-y-1 text-ink-secondary">
                  <li>Du beställer, vi kontaktar dig inom 3 arbetsdagar</li>
                  <li>Besiktning av din bostad (ingår)</li>
                  <li>Installation av certifierad elektriker</li>
                  <li>Klart, börja ladda</li>
                </ol>
              </div>

              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-full bg-brand-primary text-ink-onbrand font-medium py-3 rounded hover:opacity-90 transition-opacity"
              >
                Fortsätt till dina uppgifter →
              </button>
            </div>
          </Annotation>
        )}

        {/* Step 1: Personal details */}
        {step === 1 && (
          <Annotation
            label="Steg 2: Uppgifter"
            audience="design"
            rationale="Formulärfält med synliga labels (inte enbart placeholder). Hjälptexter under känsliga fält (personnummer, adress). Två fält per rad max."
          >
            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="fornamn-b" className="block text-sm font-medium mb-1">Förnamn</label>
                  <input id="fornamn-b" type="text" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                </div>
                <div>
                  <label htmlFor="efternamn-b" className="block text-sm font-medium mb-1">Efternamn</label>
                  <input id="efternamn-b" type="text" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                </div>
              </div>
              <div>
                <label htmlFor="personnr-b" className="block text-sm font-medium mb-1">Personnummer</label>
                <input id="personnr-b" type="text" placeholder="ÅÅÅÅMMDD-XXXX" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm placeholder:text-ink-muted focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                <p className="text-xs text-ink-muted mt-1">Behövs för kreditupplysning och rotavdrag.</p>
              </div>
              <div>
                <label htmlFor="adress-b" className="block text-sm font-medium mb-1">Installationsadress</label>
                <input id="adress-b" type="text" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="postnr-b" className="block text-sm font-medium mb-1">Postnummer</label>
                  <input id="postnr-b" type="text" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                </div>
                <div>
                  <label htmlFor="ort-b" className="block text-sm font-medium mb-1">Ort</label>
                  <input id="ort-b" type="text" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="epost-b" className="block text-sm font-medium mb-1">E-post</label>
                  <input id="epost-b" type="email" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                </div>
                <div>
                  <label htmlFor="telefon-b" className="block text-sm font-medium mb-1">Telefon</label>
                  <input id="telefon-b" type="tel" className="w-full px-3 py-2.5 rounded border border-border-strong bg-canvas text-sm focus:border-brand-accent focus:outline-none focus:ring-2 focus:ring-focus" />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(0)} className="flex-1 border border-border-strong text-ink-secondary font-medium py-3 rounded hover:bg-tint-info transition-colors">
                  ← Tillbaka
                </button>
                <button type="button" onClick={() => setStep(2)} className="flex-1 bg-brand-primary text-ink-onbrand font-medium py-3 rounded hover:opacity-90 transition-opacity">
                  Granska beställning →
                </button>
              </div>
            </div>
          </Annotation>
        )}

        {/* Step 2: Confirmation */}
        {step === 2 && (
          <Annotation
            label="Steg 3: Granska & bekräfta"
            audience="user"
            rationale="Sista steget: granska allt innan du skickar. Redigerbar, klicka 'Ändra' för att gå tillbaka. Villkor-kryssrutan och ångerrätt-texten sitter här, inte i steg 1."
          >
            <div className="space-y-4">
              <div className="rounded-md border border-border-subtle bg-surface p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium">Produkt</h3>
                  <button type="button" onClick={() => setStep(0)} className="text-sm text-brand-accent hover:underline">Ändra</button>
                </div>
                <p className="text-sm text-ink-secondary">Ladda Smart · Från 14 900 kr</p>
              </div>

              <div className="rounded-md border border-border-subtle bg-surface p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-medium">Dina uppgifter</h3>
                  <button type="button" onClick={() => setStep(1)} className="text-sm text-brand-accent hover:underline">Ändra</button>
                </div>
                <div className="text-sm text-ink-secondary space-y-1">
                  <p>Anna Andersson</p>
                  <p>19850412-1234</p>
                  <p>Storgatan 12, 252 25 Helsingborg</p>
                  <p>anna.andersson@example.se · 070-123 45 67</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <input type="checkbox" id="villkor-b" className="mt-1 w-4 h-4 accent-brand-primary" />
                <label htmlFor="villkor-b" className="text-sm text-ink-secondary">
                  Jag godkänner <a href="#" className="text-brand-accent underline">avtalsvillkoren</a> och har läst{" "}
                  <a href="#" className="text-brand-accent underline">integritetspolicyn</a>.
                </label>
              </div>

              <button type="submit" className="w-full bg-brand-highlight text-white font-medium py-3 rounded hover:opacity-90 transition-opacity">
                Skicka beställning
              </button>
              <p className="text-xs text-ink-muted text-center">
                14 dagars ångerrätt enligt distansavtalslagen · Vi kontaktar dig inom 3 arbetsdagar
              </p>
            </div>
          </Annotation>
        )}
      </form>
    </div>
  );
}

/* ─── Host page ─────────────────────────────────────────────────────── */

const VARIANTS: Variant[] = [
  {
    id: "trygg",
    shortName: "A",
    label: "Formulär",
    riskLevel: "låg",
    oneLiner: "Klassiskt vertikalt formulär. Alla fält synliga, en submit.",
    bestFor: "Enkel implementation. Inga steg-beroenden.",
    render: () => <FormTrygg />,
  },
  {
    id: "progressiv",
    shortName: "B",
    label: "Checkout",
    riskLevel: "medel",
    oneLiner: "3-stegs checkout: produkt → uppgifter → bekräfta.",
    bestFor: "E-commerce-känsla. Minskar visuellt brus per steg.",
    render: () => <FormProgressiv />,
  },
  {
    id: "experimentell",
    shortName: "C",
    label: "Konversation",
    riskLevel: "hög",
    oneLiner: "En fråga per skärm, Typeform-stil. Känns inte som formulär.",
    bestFor: "Ovana användare, komplexa formulär med få men specifika frågor.",
    render: () => <FormularKonversation />,
  },
];

const ARGUMENTATION: ArgumentRow[] = [
  {
    aspect: "Känsla",
    values: {
      trygg: "Myndighetsformulär. Förutsägbart, lite tungt.",
      progressiv: "Webbshop-checkout. Lätt, stegvis, modernt.",
      experimentell: "Chatt-assistent. Känns inte som ett formulär alls.",
    },
  },
  {
    aspect: "Antal fält synliga åt gången",
    values: {
      trygg: "Alla (~8 fält + checkbox). Kan kännas mycket.",
      progressiv: "3–4 per steg. Visuellt lättare, samma data totalt.",
      experimentell: "En fråga åt gången. Ingen överblick.",
    },
  },
  {
    aspect: "Avhopp-risk",
    values: {
      trygg: "Högre, alla fält synliga skapar 'formulär-ångest'.",
      progressiv: "Lägre, steget 'Produkt' kräver noll input men skapar commitment.",
      experimentell: "Lägst för ovana användare. Hög för power-users som vill scanna.",
    },
  },
  {
    aspect: "Upplevd tid",
    values: {
      trygg: "Snabbt, se allt, fyll i, klar.",
      progressiv: "Medium, tre 'sidor' men tydlig progress.",
      experimentell: "Känns snabb (en fråga i taget) men är långsammast totalt.",
    },
  },
  {
    aspect: "Validering",
    values: {
      trygg: "Valideras vid submit. Fel högst upp.",
      progressiv: "Valideras per steg. Användaren fixar fel innan nästa steg.",
      experimentell: "Per fråga. Fel visas direkt, omöjligt att gå vidare med trasig data.",
    },
  },
  {
    aspect: "Ångra/ändra",
    values: {
      trygg: "Redigera direkt i formuläret.",
      progressiv: "Steg 3 har 'Ändra'-länkar per sektion → rätt steg.",
      experimentell: "'Gå tillbaka'-knapp per fråga. Inget granska-steg.",
    },
  },
  {
    aspect: "WCAG",
    values: {
      trygg: "Utmärkt, standard HTML, synliga labels.",
      progressiv: "Bra, steg-skiften behöver fokus-hantering.",
      experimentell: "Känsligt, autofocus per steg, men screen-readers behöver aria-live.",
    },
  },
  {
    aspect: "Rekommendation",
    values: {
      trygg: "Enkla ärenden som felanmälan, byte av betalsätt.",
      progressiv: "Default för köp/avtalsflöden.",
      experimentell: "Onboarding, kampanjer där 'känns nytt' är ett plus.",
    },
  },
];

export function FormularKop() {
  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <header className="mt-6 mb-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Formulär-köp</p>
        <h1 className="text-h1 mb-3">Beställning som känns som köp</h1>
        <p className="text-lede text-ink-secondary">
          Alla köp hos Öresundskraft är formulärbaserade, men vi kan få dem att <em>kännas</em>{" "}
          som en checkout istället för ett myndighetsformulär. Två varianter.
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
            <strong>Vad vi löser:</strong> Idag känns alla beställningar som ett långt
            kontaktformulär. Checkout-varianten bryter upp flödet i tre steg där varje steg
            har ett tydligt jobb. Stegindikatorn skapar förväntan och verbet ('Beställ' →
            'Granska' → 'Skicka') stannar i samma familj hela vägen.
          </p>
          <p>
            <strong>Ångerrätt-texten</strong> sitter i steg 3 (bekräftelse-steget), inte i
            steg 1. Psykologiskt: den dyker upp som en trygghetssignal precis innan submit,
            inte som ett varningstecken i början.
          </p>
          <p>
            <strong>Rekommendation:</strong> <em>B (Checkout)</em>. Steg 1 ("Produkt") kostar
            noll ansträngning men skapar commitment-bias: användaren har redan "börjat
            beställa" innan de fyller i personnummer.
          </p>
        </div>
      </section>
    </div>
  );
}
