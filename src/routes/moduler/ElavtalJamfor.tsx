import { useState } from "react";
import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";

type BoendeTyp = "lagenhet" | "villa";

type Plan = {
  id: "sakrat" | "kvartspris" | "manadspris";
  namn: string;
  beskrivning: string;
  bastFor: string;
  prismekanism: string;
  bindning: string;
  pasalg: string; // placeholder
  uppskattning: { lagenhet: string; villa: string };
  fordelar: string[];
  funderingar: string[];
};

const PLANS: Plan[] = [
  {
    id: "sakrat",
    namn: "Säkrat pris",
    beskrivning: "Du vet vad du betalar varje månad. Ingen prischock.",
    bastFor: "Bäst för dig som vill ha förutsägbarhet och slippa hålla koll.",
    prismekanism: "Fast pris hela avtalsperioden",
    bindning: "12 eller 36 månader",
    pasalg: "[Påslag X öre/kWh]",
    uppskattning: { lagenhet: "[~XXX kr/mån]", villa: "[~X XXX kr/mån]" },
    fordelar: ["Samma månadskostnad", "Skydd mot prisökningar", "Inga överraskningar"],
    funderingar: ["Du tjänar inte på att priset sjunker", "Bindningstid"],
  },
  {
    id: "kvartspris",
    namn: "Kvartspris",
    beskrivning: "Priset bestäms en gång i kvartalet. Mellanting mellan rörligt och fast.",
    bastFor: "Bäst för dig som vill ha viss stabilitet utan lång bindning.",
    prismekanism: "Nytt pris var tredje månad",
    bindning: "Ingen bindningstid",
    pasalg: "[Påslag X öre/kWh]",
    uppskattning: { lagenhet: "[~XXX kr/mån]", villa: "[~X XXX kr/mån]" },
    fordelar: ["Mindre svängningar än rörligt", "Ingen bindningstid", "Du följer marknaden"],
    funderingar: ["Priset kan stiga vid omräkning"],
  },
  {
    id: "manadspris",
    namn: "Månadspris (rörligt)",
    beskrivning: "Du betalar genomsnittspriset på elbörsen för månaden.",
    bastFor: "Bäst för dig som är flexibel och vill kunna styra elanvändningen.",
    prismekanism: "Spotpris per timme, debiterat månadsvis",
    bindning: "Ingen bindningstid",
    pasalg: "[Påslag X öre/kWh]",
    uppskattning: { lagenhet: "[~XXX kr/mån]", villa: "[~X XXX kr/mån]" },
    fordelar: ["Lägst kostnad i snitt över tid", "Du belönas för smart förbrukning", "Ingen bindningstid"],
    funderingar: ["Vintermånader kan kosta mer", "Kräver lite koll"],
  },
];

export function ElavtalJamfor() {
  const [boende, setBoende] = useState<BoendeTyp>("lagenhet");
  const [openPlan, setOpenPlan] = useState<string | null>(null);

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6 py-8 sm:py-12">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">← Översikt</Link>

      <div className="mt-6 mb-10 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Modul · Jämför elavtal</p>
        <h1 className="text-h1 mb-3">Hitta elavtalet som passar dig</h1>
        <p className="text-lede text-ink-secondary">
          Tre avtal, tydligt jämförda. Välj boendetyp för att se uppskattad månadskostnad.
        </p>
      </div>

      {/* ─── 1. Boende-väljare ─────────────────────────────────────────── */}
      <Annotation
        label="Boendeväljare"
        audience="user"
        rationale="Två tydliga val istället för ett sliderfält. Lägenhet = ~2 000 kWh/år, villa = ~20 000 kWh/år. Användaren behöver inte veta sin förbrukning för att se ett pris."
      >
        <div className="mb-8 inline-flex p-1 rounded-md bg-surface border border-border-subtle">
          <button
            type="button"
            onClick={() => setBoende("lagenhet")}
            className={`px-5 py-2 rounded text-sm font-medium transition-colors ${
              boende === "lagenhet"
                ? "bg-brand-primary text-ink-onbrand"
                : "text-ink-secondary hover:text-ink"
            }`}
            aria-pressed={boende === "lagenhet"}
          >
            Lägenhet
          </button>
          <button
            type="button"
            onClick={() => setBoende("villa")}
            className={`px-5 py-2 rounded text-sm font-medium transition-colors ${
              boende === "villa"
                ? "bg-brand-primary text-ink-onbrand"
                : "text-ink-secondary hover:text-ink"
            }`}
            aria-pressed={boende === "villa"}
          >
            Villa
          </button>
        </div>
      </Annotation>

      {/* ─── 2. Elnät / Elhandel callout ─────────────────────────────── */}
      <Annotation
        label="Elnät vs elhandel-callout"
        audience="user"
        rationale="Den enskilt mest värdefulla informationsbiten på sidan. Bor du i Helsingborg/Ängelholm är ÖK redan nätägare — du ska bara välja elhandel. En meningar i en ruta, inte i FAQ."
      >
        <div className="mb-8 p-5 rounded-md bg-tint-info border-l-4 border-brand-accent flex gap-4">
          <div className="text-2xl leading-none">💡</div>
          <div className="flex-1">
            <p className="font-medium mb-1">Bor du i Helsingborg eller Ängelholm?</p>
            <p className="text-sm text-ink-secondary leading-relaxed">
              Då är vi redan ditt elnätsbolag. Du behöver bara välja vilket{" "}
              <strong>elhandelsavtal</strong> du vill ha.{" "}
              <Link to="#" className="text-brand-accent underline underline-offset-2">
                Vad är skillnaden?
              </Link>
            </p>
          </div>
        </div>
      </Annotation>

      {/* ─── 3. Jämförelsetabell ──────────────────────────────────────── */}
      <Annotation
        label="Jämförelsetabell"
        audience="design"
        rationale="Tre kolumner med EXAKT samma fältordning: Bäst för → Pris → Bindning → Påslag → Uppskattad månadskostnad → Detaljer. Symmetri = jämförbarhet. På mobil staplas korten med sticky 'Bäst för' längst upp."
      >
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {PLANS.map((p) => (
            <article
              key={p.id}
              className={`rounded-md border-2 bg-surface flex flex-col transition-colors ${
                p.id === "manadspris"
                  ? "border-brand-accent shadow-md"
                  : "border-border-subtle"
              }`}
            >
              {p.id === "manadspris" && (
                <div className="bg-brand-accent text-white text-xs font-medium px-3 py-1.5 rounded-t-[6px] text-center">
                  Vanligaste valet
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-h4 mb-1">{p.namn}</h3>
                <p className="text-sm text-ink-secondary mb-4">{p.beskrivning}</p>

                <div className="rounded bg-tint-info px-3 py-2 mb-4 text-sm">
                  <span className="font-medium">{p.bastFor}</span>
                </div>

                <dl className="text-sm space-y-2 mb-4">
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-muted">Pris</dt>
                    <dd className="text-right font-medium">{p.prismekanism}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-muted">Bindning</dt>
                    <dd className="text-right font-medium">{p.bindning}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-muted">Påslag</dt>
                    <dd className="text-right font-medium text-ink-muted">{p.pasalg}</dd>
                  </div>
                </dl>

                <div className="rounded-md bg-tint-notice p-3 mb-4">
                  <p className="text-xs text-ink-muted uppercase tracking-wider mb-1">
                    Uppskattad månadskostnad
                  </p>
                  <p className="text-h3 font-medium">{p.uppskattning[boende]}</p>
                  <p className="text-xs text-ink-muted mt-1">
                    Baserat på snittförbrukning {boende === "lagenhet" ? "~2 000" : "~20 000"} kWh/år
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setOpenPlan(openPlan === p.id ? null : p.id)}
                  className="text-sm text-brand-accent hover:underline mb-4 self-start"
                  aria-expanded={openPlan === p.id}
                >
                  {openPlan === p.id ? "Dölj detaljer" : "Visa detaljer"}
                </button>

                {openPlan === p.id && (
                  <div className="text-sm space-y-3 mb-4 pb-4 border-b border-border-subtle">
                    <div>
                      <p className="font-medium mb-1">Fördelar</p>
                      <ul className="list-disc list-inside text-ink-secondary space-y-0.5">
                        {p.fordelar.map((f) => <li key={f}>{f}</li>)}
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Att tänka på</p>
                      <ul className="list-disc list-inside text-ink-secondary space-y-0.5">
                        {p.funderingar.map((f) => <li key={f}>{f}</li>)}
                      </ul>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  className="mt-auto w-full bg-brand-primary text-ink-onbrand font-medium py-3 rounded hover:opacity-90 transition-opacity"
                >
                  Teckna {p.namn.toLowerCase()}
                </button>
                <p className="text-xs text-ink-muted text-center mt-2">
                  Tar ca 3 min · Personnummer + adress
                </p>
              </div>
            </article>
          ))}
        </div>
      </Annotation>

      {/* ─── 4. Tillägg: Framtidspengen ───────────────────────────────── */}
      <Annotation
        label="Framtidspengen som tillägg"
        audience="design"
        rationale="Tidigare presenterad som ett fjärde 'avtal' — felaktigt. Det är ett påslag, inte ett val mellan fyra. Här som opt-in toggle UNDER jämförelsen, kopplad till valt avtal."
      >
        <div className="rounded-md border border-border-subtle bg-surface p-5 flex items-start gap-4">
          <input
            type="checkbox"
            id="framtidspengen"
            className="mt-1 w-5 h-5 rounded border-border-strong accent-brand-primary"
          />
          <label htmlFor="framtidspengen" className="flex-1 cursor-pointer">
            <span className="font-medium block mb-1">Lägg till Framtidspengen</span>
            <span className="text-sm text-ink-secondary block">
              [+ X öre/kWh] som går till lokala miljöprojekt i nordvästra Skåne. Du kan slå
              av det när som helst.
            </span>
          </label>
        </div>
      </Annotation>

      {/* ─── 5. Trygghetsrad ──────────────────────────────────────────── */}
      <Annotation
        label="Trygghetsrad"
        audience="user"
        rationale="Reducerar osäkerhet i sista sekunden innan klick på 'Teckna'. Tre faktiska påståenden — inga superlativ utan källa."
      >
        <div className="mt-6 p-5 rounded-md bg-tint-highlight grid sm:grid-cols-3 gap-4 text-center text-sm">
          <div>
            <p className="font-medium">[Källa krävs]</p>
            <p className="text-ink-secondary">NKI / kundnöjdhet</p>
          </div>
          <div>
            <p className="font-medium">[Källa krävs]</p>
            <p className="text-ink-secondary">Svarstid kundservice</p>
          </div>
          <div>
            <p className="font-medium">[Källa krävs]</p>
            <p className="text-ink-secondary">Antal kunder i regionen</p>
          </div>
        </div>
      </Annotation>

      {/* ─── Notes om modulen ─────────────────────────────────────────── */}
      <section className="mt-16 pt-8 border-t border-border-subtle">
        <h2 className="text-h3 mb-4">Designnotering till Frida / Matilda</h2>
        <div className="prose-like text-ink-secondary text-sm space-y-3 max-w-reading">
          <p>
            <strong>Syfte:</strong> Ge användaren tillräckligt med beslutsstöd för att välja avtal
            <em> på sidan</em> — inte i en blogg eller via kundtjänst.
          </p>
          <p>
            <strong>Fältsymmetri:</strong> Alla tre kort har exakt samma fält i samma ordning.
            Asymmetri här = osäkerhet hos användaren.
          </p>
          <p>
            <strong>Mobil:</strong> Korten staplas. "Vanligaste valet" hamnar överst.
            Klistrad CTA längst ner när användaren scrollar förbi första kortet.
          </p>
          <p>
            <strong>Vad som behöver källa innan release:</strong> alla siffror i påslag,
            uppskattad månadskostnad och trygghetsraden. Tom = <code className="text-xs">[hakparentes-platshållare]</code>.
          </p>
        </div>
      </section>
    </div>
  );
}
