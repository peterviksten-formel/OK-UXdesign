import { useMemo, useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { PLANS, TERMER, type PlanId } from "../elavtal-data";

/**
 * VARIANT C — Experimentell
 *
 * Strategy: lead with personalisation. Live calculator that updates a
 * recommended plan as the user moves sliders. Tooltips defuse jargon
 * inline. Visual hierarchy escalates: AI-style summary → sliders →
 * dynamic recommendation card → comparison strip. The user feels they
 * are exploring, not reading.
 */

type Term = keyof typeof TERMER;

function Tooltip({ term, children }: { term: Term; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const t = TERMER[term];
  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((s) => !s)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="border-b border-dashed border-brand-accent text-brand-accent cursor-help focus:outline-none focus:ring-2 focus:ring-focus rounded-sm"
        aria-expanded={open}
        aria-describedby={`tip-${term}`}
      >
        {children}
      </button>
      {open && (
        <span
          id={`tip-${term}`}
          role="tooltip"
          className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-30 w-64 px-3 py-2 rounded-md bg-elevated border border-border-strong text-xs text-ink shadow-lg whitespace-normal"
        >
          <span className="block font-medium text-brand-primary mb-1">{t.kort}</span>
          <span className="block text-ink-secondary leading-relaxed">{t.lang}</span>
        </span>
      )}
    </span>
  );
}

/**
 * Pretend "calculation": maps sliders → an estimated monthly cost per plan.
 * Numbers are fake placeholders — the point is to show the *interaction*.
 */
function calc(kwhPerYear: number, riskAversion: number) {
  const monthlyKwh = kwhPerYear / 12;
  // Fake spot price ~120 öre/kWh, fixed price = spot + 20 (premium)
  const sakratOre = 145;
  const kvartsprisOre = 130;
  // Spot follows risk aversion inversely — higher risk tolerance → lower assumed price
  const manadsprisOre = 115 + riskAversion * 0.3;

  return {
    sakrat: Math.round((monthlyKwh * sakratOre) / 100),
    kvartspris: Math.round((monthlyKwh * kvartsprisOre) / 100),
    manadspris: Math.round((monthlyKwh * manadsprisOre) / 100),
  };
}

function recommend(kwhPerYear: number, riskAversion: number): PlanId {
  if (riskAversion >= 70) return "sakrat";
  if (riskAversion <= 30 && kwhPerYear >= 8000) return "manadspris";
  if (riskAversion <= 30) return "manadspris";
  return "kvartspris";
}

export function VariantExperimentell() {
  const [kwh, setKwh] = useState(8000);
  const [risk, setRisk] = useState(50);

  const costs = useMemo(() => calc(kwh, risk), [kwh, risk]);
  const recId = useMemo(() => recommend(kwh, risk), [kwh, risk]);
  const recPlan = PLANS.find((p) => p.id === recId)!;

  return (
    <div>
      {/* ─── AI-summary hero ────────────────────────────────────────── */}
      <Annotation
        label="AI-sammanfattning"
        audience="user"
        rationale="Låt AI-stilad ruta sammanfatta valets nyckelpoäng. Snabbt för den som har bråttom; signalerar 'modern teknik' utan att kräva interaktion. Ska alltid faktagranskas av redaktör innan release."
      >
        <div className="mb-8 p-5 rounded-lg bg-gradient-to-br from-tint-info via-tint-pink to-tint-notice border border-border-subtle">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-primary text-white text-xs font-bold">
              ✨
            </span>
            <span className="text-eyebrow uppercase font-medium text-brand-primary">
              Snabbsammanfattning
            </span>
          </div>
          <p className="text-ink leading-relaxed">
            Vi har tre elavtal: <Tooltip term="bindningstid"><strong>Säkrat pris</strong></Tooltip> ger förutsägbarhet,{" "}
            <strong>Kvartspris</strong> är ett mellanting, och{" "}
            <Tooltip term="spotpris"><strong>Månadspris</strong></Tooltip>{" "}
            följer marknaden — i snitt billigast över tid. Ditt elprisområde är{" "}
            <Tooltip term="elprisområde"><strong>SE4</strong></Tooltip>, där elen oftast är
            dyrast i landet — det gör <Tooltip term="påslag">påslaget</Tooltip> viktigt att jämföra.
          </p>
        </div>
      </Annotation>

      {/* ─── Interaktiv kalkylator ──────────────────────────────────── */}
      <Annotation
        label="Levande kalkylator"
        audience="design"
        rationale="Ersätter två-knappsväljaren med två sliders: årsförbrukning + risktolerans. Rekommendation och alla tre prissatta avtal uppdateras direkt. Användaren testar 'sin egen verklighet' innan köp."
      >
        <div className="mb-8 rounded-md border border-border-subtle bg-surface p-5 sm:p-6">
          <h3 className="text-h4 mb-1">Räkna ut vad som passar dig</h3>
          <p className="text-sm text-ink-muted mb-6">
            Justera reglagen — vi rekommenderar avtal direkt och visar pris för alla tre.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="kwh-slider" className="flex items-baseline justify-between mb-2">
                <span className="text-sm font-medium">Årsförbrukning</span>
                <span className="text-h4 font-medium text-brand-accent">
                  {kwh.toLocaleString("sv-SE")} <span className="text-sm text-ink-muted">kWh/år</span>
                </span>
              </label>
              <input
                id="kwh-slider"
                type="range"
                min="1000"
                max="30000"
                step="500"
                value={kwh}
                onChange={(e) => setKwh(Number(e.target.value))}
                className="w-full accent-brand-accent"
              />
              <div className="flex justify-between text-xs text-ink-muted mt-1">
                <span>Lägenhet</span>
                <span>Villa</span>
                <span>Stor villa + elbil</span>
              </div>
            </div>

            <div>
              <label htmlFor="risk-slider" className="flex items-baseline justify-between mb-2">
                <span className="text-sm font-medium">Hur känner du för svängande pris?</span>
                <span className="text-h6 font-medium text-brand-accent">
                  {risk < 33 ? "Tar gärna risken" : risk < 66 ? "Mittemellan" : "Vill ha trygghet"}
                </span>
              </label>
              <input
                id="risk-slider"
                type="range"
                min="0"
                max="100"
                step="1"
                value={risk}
                onChange={(e) => setRisk(Number(e.target.value))}
                className="w-full accent-brand-accent"
              />
              <div className="flex justify-between text-xs text-ink-muted mt-1">
                <span>Spelar mig ingen roll</span>
                <span>Måste veta vad jag betalar</span>
              </div>
            </div>
          </div>

          {/* Live recommendation */}
          <div className="rounded-md bg-brand-primary text-ink-onbrand p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <p className="text-eyebrow uppercase opacity-80 mb-1">Vi rekommenderar</p>
              <p className="text-h3 font-medium">{recPlan.namn}</p>
              <p className="text-sm opacity-90 mt-1">{recPlan.beskrivning}</p>
            </div>
            <div className="text-right">
              <p className="text-eyebrow uppercase opacity-80 mb-1">Uppskattat pris</p>
              <p className="text-h2 font-medium leading-none">
                ~{costs[recId].toLocaleString("sv-SE")} <span className="text-sm opacity-80">kr/mån</span>
              </p>
            </div>
            <button
              type="button"
              className="bg-brand-highlight text-white font-medium px-5 py-3 rounded hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Teckna {recPlan.kortNamn.toLowerCase()} →
            </button>
          </div>
        </div>
      </Annotation>

      {/* ─── Live-uppdaterad jämförelsestrip ────────────────────────── */}
      <Annotation
        label="Jämförelsestrip med live-priser"
        audience="design"
        rationale="Tre kompakta kort visar samtliga avtal med priset från kalkylatorn. Den rekommenderade får accent-färg. Användaren kan jämföra utan att tappa sin input."
      >
        <div className="grid md:grid-cols-3 gap-3 mb-8">
          {PLANS.map((p) => {
            const isRec = p.id === recId;
            return (
              <article
                key={p.id}
                className={`rounded-md p-4 border transition-all ${
                  isRec
                    ? "border-brand-accent bg-tint-info"
                    : "border-border-subtle bg-surface"
                }`}
              >
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-medium">{p.namn}</h4>
                  {isRec && (
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-brand-accent text-white font-bold">
                      Rekommenderas
                    </span>
                  )}
                </div>
                <p className="text-h3 font-medium text-brand-primary mb-1">
                  ~{costs[p.id].toLocaleString("sv-SE")}<span className="text-sm text-ink-muted"> kr/mån</span>
                </p>
                <p className="text-xs text-ink-muted mb-3">{p.prismekanism}</p>
                <button
                  type="button"
                  className={`w-full text-sm font-medium py-2 rounded transition-opacity ${
                    isRec
                      ? "bg-brand-primary text-ink-onbrand hover:opacity-90"
                      : "border border-border-strong text-ink-secondary hover:bg-tint-info"
                  }`}
                >
                  Välj {p.kortNamn.toLowerCase()}
                </button>
              </article>
            );
          })}
        </div>
      </Annotation>

      {/* ─── Mini-FAQ via tooltip-länkar ────────────────────────────── */}
      <Annotation
        label="Inline-ordlista"
        audience="user"
        rationale="Istället för en separat FAQ-accordion får jargonglosor en streckad understrykning + tooltip. Användaren får svar i kontext, inte i en sidebar."
      >
        <div className="rounded-md bg-tint-notice p-5 mb-8">
          <p className="text-sm font-medium mb-2">Begrepp att hovra över i texten:</p>
          <p className="text-sm text-ink-secondary leading-relaxed">
            <Tooltip term="påslag">Påslag</Tooltip> ·{" "}
            <Tooltip term="spotpris">Spotpris</Tooltip> ·{" "}
            <Tooltip term="elprisområde">Elprisområde</Tooltip> ·{" "}
            <Tooltip term="bindningstid">Bindningstid</Tooltip> ·{" "}
            <Tooltip term="anvisat_avtal">Anvisat avtal</Tooltip>
          </p>
        </div>
      </Annotation>

      {/* ─── Floating bottom bar (mobile-style) ─────────────────────── */}
      <Annotation
        label="Klistrad sammanfattning"
        audience="user"
        rationale="På mobil följer denna rad med när man scrollar — så att 'Teckna' alltid är ett klick bort. På desktop visas den som en sticky footer i modulen."
      >
        <div className="rounded-md border border-brand-accent bg-elevated p-4 flex flex-wrap items-center gap-3 sticky bottom-4 shadow-lg">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-ink-muted">Du har valt</p>
            <p className="font-medium truncate">
              {recPlan.namn} · ~{costs[recId].toLocaleString("sv-SE")} kr/mån
            </p>
          </div>
          <button
            type="button"
            className="bg-brand-highlight text-white font-medium px-5 py-2.5 rounded hover:opacity-90 transition-opacity"
          >
            Teckna nu →
          </button>
        </div>
      </Annotation>
    </div>
  );
}
