import { useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { BOENDE_KWH, PLANS, type BoendeTyp, type PlanId } from "../elavtal-data";

/**
 * Format integer with Swedish non-breaking space as thousand separator.
 * "2000" → "2 000", "20000" → "20 000".
 */
function formatSvInt(n: number): string {
  return n.toLocaleString("sv-SE").replace(/\u00a0/g, " ");
}

/** Round to nearest 5 so prisvisningen känns jämn. */
function roundKr(n: number): number {
  return Math.round(n / 5) * 5;
}

/**
 * Ordningen i jämförelsekorten: "Vanligaste valet" (Månadspris) först så det
 * blir det läsögat landar på. De övriga två behåller sin relativa ordning.
 * Rör inte PLANS-datan, den används av Trygg-variantens semantiska tabell
 * som har sin egen logik.
 */
const KORT_ORDNING: PlanId[] = ["manadspris", "sakrat", "kvartspris"];

/**
 * VARIANT B, Progressiv
 *
 * Strategy: middle path. Quiz-style boendeväljare → comparison cards with
 * progressive disclosure. Sticky elnät callout. Keeps cognitive load low
 * while still being engaging. The "vanligaste valet" badge nudges without
 * forcing.
 */
export function VariantProgressiv() {
  const [boende, setBoende] = useState<BoendeTyp>("lagenhet");
  // Förbrukning i kWh/år. Sätts till boendetypens schablon när man växlar
  // pill, men kan finjusteras fritt i input-fältet (schablonen är en startpunkt,
  // inte en låsning).
  const [kwh, setKwh] = useState<number>(BOENDE_KWH.lagenhet);
  const [kwhInput, setKwhInput] = useState<string>(formatSvInt(BOENDE_KWH.lagenhet));
  const [openPlan, setOpenPlan] = useState<string | null>(null);

  function valjBoende(typ: BoendeTyp) {
    setBoende(typ);
    const def = BOENDE_KWH[typ];
    setKwh(def);
    setKwhInput(formatSvInt(def));
  }

  function updateKwhFromInput(val: string) {
    setKwhInput(val);
    const n = parseInt(val.replace(/\s/g, ""), 10);
    if (!isNaN(n) && n > 0 && n <= 99999) {
      setKwh(n);
    }
  }

  function formatKwhOnBlur() {
    setKwhInput(formatSvInt(kwh));
  }

  return (
    <div>
      {/* ─── Förbrukningsväljare: boende-pill + kWh-input ──────────── */}
      <Annotation
        label="Förbrukningsväljare, boende + kWh"
        audience="user"
        rationale="Briefens krav: visa exakt pris direkt. Pill-knapparna sätter schablonen för bostadstypen (Lägenhet ≈ 2 000 kWh, Villa ≈ 20 000 kWh). Fältet intill är editerbart så användaren kan mata in sin riktiga årsförbrukning från senaste fakturan, priset i varje kort räknas om live."
      >
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-[auto_auto_minmax(0,1fr)] gap-x-6 gap-y-4 items-end">
          {/* Boendetyp */}
          <div>
            <p className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-1.5">
              Jag bor i
            </p>
            <div
              role="radiogroup"
              aria-label="Bostadstyp"
              className="inline-flex h-11 p-1 rounded-md bg-surface border border-border-subtle"
            >
              <button
                type="button"
                onClick={() => valjBoende("lagenhet")}
                className={`px-5 rounded text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${
                  boende === "lagenhet" ? "bg-brand-primary text-ink-onbrand" : "text-ink-secondary hover:text-ink"
                }`}
                role="radio"
                aria-checked={boende === "lagenhet"}
              >
                Lägenhet
              </button>
              <button
                type="button"
                onClick={() => valjBoende("villa")}
                className={`px-5 rounded text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${
                  boende === "villa" ? "bg-brand-primary text-ink-onbrand" : "text-ink-secondary hover:text-ink"
                }`}
                role="radio"
                aria-checked={boende === "villa"}
              >
                Villa
              </button>
            </div>
          </div>

          {/* Årlig förbrukning */}
          <div>
            <label
              htmlFor="elavtal-kwh"
              className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-1.5 block"
            >
              Årlig förbrukning
            </label>
            <div className="inline-flex items-stretch h-11 rounded-md border border-border-subtle bg-surface focus-within:border-brand-accent focus-within:ring-2 focus-within:ring-brand-accent/30 transition-colors overflow-hidden">
              <input
                id="elavtal-kwh"
                type="text"
                inputMode="numeric"
                value={kwhInput}
                onChange={(e) => updateKwhFromInput(e.target.value)}
                onBlur={formatKwhOnBlur}
                aria-describedby="elavtal-kwh-hint"
                className="w-[96px] bg-transparent px-3 text-sm font-medium text-right focus:outline-none"
              />
              <span className="px-3 text-sm text-ink-muted border-l border-border-subtle flex items-center whitespace-nowrap">
                kWh/år
              </span>
            </div>
          </div>

          {/* Hjälp-text, baseline-linjerad med kontrollerna */}
          <p
            id="elavtal-kwh-hint"
            className="text-xs text-ink-muted leading-snug max-w-[260px] py-2"
          >
            Auto-fylld från bostadstypen. Ändra för en exaktare uppskattning, du hittar din förbrukning på senaste årsfakturan.
          </p>
        </div>
      </Annotation>

      {/* Elnät/elhandel-callouten är borttagen ur modulen. Den hör till
         sidtyp-nivån (se t.ex. 'elnat-callout'-blocket i StartsidaUndersidaUX)
         så placeringen styrs per sida där informationen är relevant. */}

      {/* ─── Jämförelsetabell ───────────────────────────────────────── */}
      <Annotation
        label="Jämförelsekort"
        audience="design"
        rationale="Tre kort med samma fältordning, symmetri = jämförbarhet. 'Vanligaste valet' ligger först (vänster) så läsögat landar där. Banner-fliken ligger absolut-positionerad ovanför Månadspris-kortet så övriga kort behåller samma höjd. Den tidigare 'Bäst för'-boxen är borttagen, sentensen läggs i subhead-position istället, vilket minskar antalet visuella behållare per kort från fyra till två."
      >
        <div className="grid md:grid-cols-3 gap-4 mb-6 mt-8">
          {KORT_ORDNING.map((id) => {
            const p = PLANS.find((pl) => pl.id === id);
            if (!p) return null;
            const isHighlight = p.id === "manadspris";
            return (
            <article
              key={p.id}
              className={`relative rounded-md border-2 bg-surface flex flex-col transition-colors ${
                isHighlight
                  ? "border-brand-accent shadow-md rounded-t-none"
                  : "border-border-subtle"
              }`}
            >
              {isHighlight && (
                <div
                  className="absolute -top-[30px] left-[-2px] right-[-2px] bg-brand-accent text-white text-xs font-bold uppercase tracking-wider py-2 rounded-t-md text-center"
                  aria-label="Vanligaste valet"
                >
                  Vanligaste valet
                </div>
              )}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-h4 mb-1">{p.namn}</h3>
                <p className="text-sm text-ink-secondary mb-5 leading-relaxed">{p.bastFor}</p>

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

                <div className="rounded-md bg-tint-notice p-3 mb-4" aria-live="polite">
                  <p className="text-xs text-ink-muted uppercase tracking-wider mb-1">
                    Uppskattad månadskostnad
                  </p>
                  <p className="text-h3 font-medium">
                    ~{formatSvInt(roundKr((p.krPerKwh * kwh) / 12))} kr/mån
                  </p>
                  <p className="text-xs text-ink-muted mt-1">
                    Baserat på {formatSvInt(kwh)} kWh/år
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
                  Teckna {p.kortNamn.toLowerCase()}
                </button>
                <p className="text-xs text-ink-muted text-center mt-2">
                  Tar ca 3 min · Personnummer + adress
                </p>
              </div>
            </article>
            );
          })}
        </div>
      </Annotation>

      {/* ─── Tillägg: Framtidspengen ────────────────────────────────── */}
      <Annotation
        label="Framtidspengen som tillägg"
        audience="design"
        rationale="Tidigare presenterad som ett fjärde 'avtal', felaktigt. Det är ett påslag, inte ett val mellan fyra. Här som opt-in toggle UNDER jämförelsen, kopplad till valt avtal."
      >
        <div className="rounded-md border border-border-subtle bg-surface p-5 flex items-start gap-4">
          <input
            type="checkbox"
            id="framtidspengen-b"
            className="mt-1 w-5 h-5 rounded border-border-strong accent-brand-primary"
          />
          <label htmlFor="framtidspengen-b" className="flex-1 cursor-pointer">
            <span className="font-medium block mb-1">Lägg till Framtidspengen</span>
            <span className="text-sm text-ink-secondary block">
              +3 öre/kWh som går till lokala miljöprojekt i nordvästra Skåne. Du kan slå
              av det när som helst.
            </span>
          </label>
        </div>
      </Annotation>

      {/* ─── Trygghetsrad ───────────────────────────────────────────── */}
      <Annotation
        label="Trygghetsrad"
        audience="user"
        rationale="Reducerar osäkerhet i sista sekunden innan klick på 'Teckna'. Tre faktiska påståenden, inga superlativ utan källa."
      >
        <div className="mt-6 p-5 rounded-md bg-tint-highlight grid sm:grid-cols-3 gap-4 text-center text-sm">
          <div>
            <p className="font-medium">4,3 av 5</p>
            <p className="text-ink-secondary">NKI / kundnöjdhet</p>
          </div>
          <div>
            <p className="font-medium">Under 2 min i chatt</p>
            <p className="text-ink-secondary">Svarstid kundservice</p>
          </div>
          <div>
            <p className="font-medium">~125 000</p>
            <p className="text-ink-secondary">Antal kunder i regionen</p>
          </div>
        </div>
      </Annotation>
    </div>
  );
}
