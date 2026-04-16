import { useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { PLANS, type BoendeTyp } from "../elavtal-data";

/**
 * VARIANT A — Trygg
 *
 * Strategy: behave like an institution. Strip all color accents from the
 * comparison (reserve color for state/status). No badges, no nudges, no
 * "Vanligaste valet" — every plan presented as equally legitimate so the
 * user feels in control. A real semantic <table> for screen readers.
 * Footnotes and avtalsvillkor visible inline. Verbose where the brief
 * matters. Reading-room feel.
 */
export function VariantTrygg() {
  const [boende, setBoende] = useState<BoendeTyp>("lagenhet");

  return (
    <div>
      {/* ─── Inramning: vad du ska göra här ─────────────────────────── */}
      <Annotation
        label="Tydlig inramning"
        audience="user"
        rationale="Variant A börjar med en lugn redaktionell inramning istället för en interaktiv väljare. Sätter förväntningarna: 'detta är information, du behöver inte fatta beslut nu'."
      >
        <div className="mb-8 max-w-reading">
          <p className="text-lede leading-relaxed text-ink-secondary">
            Hos oss kan du välja mellan tre elhandelsavtal. På denna sida hittar du villkor,
            prismekanism och en uppskattad månadskostnad för varje avtal. När du har valt
            tecknar du själv via Mina sidor — eller hör av dig om du vill ha hjälp.
          </p>
        </div>
      </Annotation>

      {/* ─── Boende-väljare som diskret radio-grupp ─────────────────── */}
      <Annotation
        label="Boendeval som radioknappar"
        audience="design"
        rationale="Använder native form-semantik istället för pill-toggle. Mer institutionellt, tar mindre visuellt utrymme, signalerar 'detta är en parameter, inte ett val du fattar'."
      >
        <fieldset className="mb-8">
          <legend className="text-sm font-medium mb-2">Visa månadskostnad för</legend>
          <div className="flex gap-6 text-sm">
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="boende-a"
                value="lagenhet"
                checked={boende === "lagenhet"}
                onChange={() => setBoende("lagenhet")}
                className="w-4 h-4 accent-brand-primary"
              />
              Lägenhet (~2 000 kWh/år)
            </label>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="boende-a"
                value="villa"
                checked={boende === "villa"}
                onChange={() => setBoende("villa")}
                className="w-4 h-4 accent-brand-primary"
              />
              Villa (~20 000 kWh/år)
            </label>
          </div>
        </fieldset>
      </Annotation>

      {/* ─── Elnät / Elhandel som faktaruta ─────────────────────────── */}
      <Annotation
        label="Faktaruta: Elnät vs elhandel"
        audience="user"
        rationale="Fakta-ramverk istället för callout. Ingen färg, ingen ikon. Behandlas som regulatorisk information som måste läsas. För äldre användare och de som faktiskt vill ha detaljer."
      >
        <aside className="mb-8 border border-border-strong p-5 max-w-reading">
          <p className="text-eyebrow uppercase text-ink-muted mb-2">Bra att veta</p>
          <h3 className="text-h5 mb-2 font-medium">Skillnaden mellan elnät och elhandel</h3>
          <p className="text-sm text-ink-secondary leading-relaxed mb-2">
            <strong>Elnät</strong> är de fysiska ledningarna som transporterar el till ditt
            hem. Du kan inte välja nätägare — det är bestämt av var du bor.
          </p>
          <p className="text-sm text-ink-secondary leading-relaxed mb-2">
            <strong>Elhandel</strong> är vem som säljer själva elen till dig. Här kan du
            välja fritt mellan olika leverantörer.
          </p>
          <p className="text-sm text-ink-secondary leading-relaxed">
            Bor du i Helsingborg eller Ängelholm är Öresundskraft redan ditt nätbolag — du
            ska bara välja elhandel.
          </p>
        </aside>
      </Annotation>

      {/* ─── Semantisk jämförelsetabell ─────────────────────────────── */}
      <Annotation
        label="Jämförelsetabell (semantisk)"
        audience="design"
        rationale="Riktig HTML-tabell med <th scope>. Skärmläsare kan läsa 'Bindning för Säkrat pris: 12 eller 36 månader'. Färre visuella effekter, men varje rad är direkt jämförbar."
      >
        <div className="overflow-x-auto mb-8 border border-border-strong">
          <table className="w-full text-sm">
            <caption className="sr-only">Jämförelse av Öresundskrafts tre elhandelsavtal</caption>
            <thead className="bg-surface border-b border-border-strong">
              <tr>
                <th scope="col" className="text-left px-4 py-3 font-medium w-1/4">
                  Avtal
                </th>
                {PLANS.map((p) => (
                  <th key={p.id} scope="col" className="text-left px-4 py-3 font-medium align-top">
                    <div className="font-medium text-base mb-1">{p.namn}</div>
                    <div className="text-ink-muted font-normal text-xs leading-snug">
                      {p.beskrivning}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              <tr>
                <th scope="row" className="text-left px-4 py-3 font-medium text-ink-secondary align-top">
                  Bäst för
                </th>
                {PLANS.map((p) => (
                  <td key={p.id} className="px-4 py-3 text-ink-secondary align-top">
                    {p.bastFor.replace(/^Bäst för dig som /i, "")}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="text-left px-4 py-3 font-medium text-ink-secondary align-top">
                  Prismekanism
                </th>
                {PLANS.map((p) => (
                  <td key={p.id} className="px-4 py-3 align-top">{p.prismekanism}</td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="text-left px-4 py-3 font-medium text-ink-secondary align-top">
                  Bindningstid
                </th>
                {PLANS.map((p) => (
                  <td key={p.id} className="px-4 py-3 align-top">{p.bindning}</td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="text-left px-4 py-3 font-medium text-ink-secondary align-top">
                  Påslag
                </th>
                {PLANS.map((p) => (
                  <td key={p.id} className="px-4 py-3 text-ink-muted align-top">{p.pasalg}</td>
                ))}
              </tr>
              <tr className="bg-surface">
                <th scope="row" className="text-left px-4 py-3 font-medium text-ink-secondary align-top">
                  Uppskattad månadskostnad<br />
                  <span className="font-normal text-xs text-ink-muted">
                    {boende === "lagenhet" ? "Lägenhet, 2 000 kWh/år" : "Villa, 20 000 kWh/år"}
                  </span>
                </th>
                {PLANS.map((p) => (
                  <td key={p.id} className="px-4 py-3 align-top font-medium">
                    {p.uppskattning[boende]}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="text-left px-4 py-3 font-medium text-ink-secondary align-top">
                  Fördelar
                </th>
                {PLANS.map((p) => (
                  <td key={p.id} className="px-4 py-3 align-top">
                    <ul className="list-disc list-inside space-y-0.5 text-ink-secondary">
                      {p.fordelar.map((f) => <li key={f}>{f}</li>)}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="text-left px-4 py-3 font-medium text-ink-secondary align-top">
                  Att tänka på
                </th>
                {PLANS.map((p) => (
                  <td key={p.id} className="px-4 py-3 align-top">
                    <ul className="list-disc list-inside space-y-0.5 text-ink-secondary">
                      {p.funderingar.map((f) => <li key={f}>{f}</li>)}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="text-left px-4 py-3 font-medium text-ink-secondary align-top">
                  &nbsp;
                </th>
                {PLANS.map((p) => (
                  <td key={p.id} className="px-4 py-3 align-top">
                    <button
                      type="button"
                      className="w-full bg-brand-primary text-ink-onbrand text-sm font-medium py-2.5 rounded hover:opacity-90 transition-opacity"
                    >
                      Teckna {p.kortNamn.toLowerCase()}
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </Annotation>

      {/* ─── Footnoter och avtalsinfo ───────────────────────────────── */}
      <Annotation
        label="Synlig juridik"
        audience="redaktör"
        rationale="Variant A visar fotnoter inline istället för att gömma dem. Bygger förtroende hos äldre kunder och hos jurister. Mindre 'snygg', mer 'redbar'."
      >
        <footer className="text-xs text-ink-muted leading-relaxed border-t border-border-subtle pt-4 max-w-reading">
          <p className="mb-2">
            <strong className="text-ink-secondary">Notera:</strong> Uppskattad månadskostnad
            avser elhandel (vad du betalar oss). Elnätskostnaden faktureras separat av
            ditt nätbolag och varierar med din användning.
          </p>
          <p className="mb-2">
            Påslag och energiskatt tillkommer enligt vid var tid gällande priser. Avtal
            ingås enligt EFET:s standardvillkor. Du har 14 dagars ångerrätt enligt
            distansavtalslagen.
          </p>
          <p>
            <a href="#" className="underline">Fullständiga avtalsvillkor</a> ·{" "}
            <a href="#" className="underline">Prishistorik</a> ·{" "}
            <a href="#" className="underline">Anvisat avtal</a>
          </p>
        </footer>
      </Annotation>
    </div>
  );
}
