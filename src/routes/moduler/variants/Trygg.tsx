import { useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { PLANS, type BoendeTyp } from "../elavtal-data";

/**
 * VARIANT A, Trygg
 *
 * Idé: uppträd som en institution. Jämförelsen har inga färgaccenter (färg
 * används bara för status), inga märken, ingen knuff och inget "Vanligaste
 * valet". Alla avtal presenteras som lika bra val, så att kunden känner att
 * beslutet är kundens eget. En riktig tabell gör jämförelsen läsbar
 * för skärmläsare. Fotnoter och avtalsvillkor syns direkt i sidan. Utförlig
 * text där det behövs, med känslan av en lugn läsesal.
 */
export function VariantTrygg() {
  const [boende, setBoende] = useState<BoendeTyp>("lagenhet");

  return (
    <div>
      {/* ─── Inledning: vad kunden kan göra här ─────────────────────── */}
      <Annotation
        label="Lugn inledning"
        audience="user"
        rationale="Varianten börjar med en kort text i stället för en väljare. Kunden får veta vad sidan innehåller och att kunden inte behöver bestämma sig direkt, vilket minskar stressen inför valet."
      >
        <div className="mb-8 max-w-reading">
          <Copy
            label="Ingress, vad sidan hjälper dig med"
            category="ton"
            text="Du kan välja mellan tre elavtal hos oss. Här ser du villkoren, hur priset sätts och vad varje avtal ungefär kostar per månad. När du har bestämt dig kan du teckna avtalet själv, eller kontakta oss om du vill ha hjälp."
            rationale="Saklig och lugn ton med du-tilltal. Beskriver vad kunden får på sidan och att hjälp finns. Undvik säljande ord som 'bästa' eller 'unikt', de bryter mot variantens neutrala hållning."
          >
            <p className="text-lede leading-relaxed text-ink-secondary">
              Du kan välja mellan tre elavtal hos oss. Här ser du villkoren, hur priset sätts
              och vad varje avtal ungefär kostar per månad. När du har bestämt dig kan du
              teckna avtalet själv, eller kontakta oss om du vill ha hjälp.
            </p>
          </Copy>
        </div>
      </Annotation>

      {/* ─── Boendeval som diskreta radioknappar ────────────────────── */}
      <Annotation
        label="Boendeval med radioknappar"
        audience="design"
        rationale="Vanliga radioknappar i stället för stora växlingsknappar. De tar lite plats och visar att valet bara ändrar vilken månadskostnad som visas, inte vilket avtal kunden väljer."
      >
        <fieldset className="mb-8">
          <Copy
            label="Rubrik för boendeval"
            category="rubrik"
            text="Visa månadskostnad för"
            rationale="Säger exakt vad valet påverkar: bara vilken kostnad som visas. En rubrik som 'Välj boende' kunde tolkas som att kunden binder sig till något."
          >
            <legend className="text-sm font-medium mb-2">Visa månadskostnad för</legend>
          </Copy>
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

      {/* ─── Faktaruta om elnät och elhandel ────────────────────────── */}
      <Annotation
        label="Faktaruta om elnät och elhandel"
        audience="redaktör"
        rationale="En enkel ram utan färg och ikon, för kunder som vill förstå grunderna. Håll texten till tre korta stycken: vad elnät är, vad elhandel är och vad det betyder för kunden i Helsingborg och Ängelholm."
      >
        <aside className="mb-8 border border-border-strong p-5 max-w-reading">
          <p className="text-eyebrow uppercase text-ink-muted mb-2">Bra att veta</p>
          <Copy
            label="Faktarutans rubrik"
            category="rubrik"
            text="Skillnaden mellan elnät och elhandel"
            rationale="Rubriken säger rakt ut vad rutan förklarar. Många kunder blandar ihop begreppen, därför nämns båda orden så att de känner igen sin egen fråga."
          >
            <h3 className="text-h5 mb-2 font-medium">Skillnaden mellan elnät och elhandel</h3>
          </Copy>
          <p className="text-sm text-ink-secondary leading-relaxed mb-2">
            <strong>Elnät</strong> är ledningarna som för elen hem till dig. Du kan inte välja
            nätbolag, det bestäms av var du bor.
          </p>
          <p className="text-sm text-ink-secondary leading-relaxed mb-2">
            <strong>Elhandel</strong> är företaget som säljer själva elen till dig. Här kan du
            välja fritt mellan olika elbolag.
          </p>
          <p className="text-sm text-ink-secondary leading-relaxed">
            Bor du i Helsingborg eller Ängelholm är Öresundskraft redan ditt nätbolag. Du
            behöver bara välja elavtal.
          </p>
        </aside>
      </Annotation>

      {/* ─── Jämförelsetabell ───────────────────────────────────────── */}
      <Annotation
        label="Jämförelsetabell"
        audience="design"
        rationale="En riktig tabell med rad- och kolumnrubriker. Skärmläsare kan läsa upp till exempel 'Bindningstid för Säkrat pris: 12 eller 36 månader'. Få visuella effekter, men varje rad går att jämföra direkt."
      >
        <div className="overflow-x-auto mb-8 border border-border-strong">
          <table className="w-full text-sm">
            <caption className="sr-only">Jämförelse av Öresundskrafts tre elavtal</caption>
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
                  Bäst för dig som
                </th>
                {PLANS.map((p) => (
                  <td key={p.id} className="px-4 py-3 text-ink-secondary align-top">
                    {p.bastFor.replace(/^Bäst för dig som /i, "")}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row" className="text-left px-4 py-3 font-medium text-ink-secondary align-top">
                  Så sätts priset
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
                {PLANS.map((p, idx) => {
                  const knapp = (
                    <button
                      type="button"
                      className="w-full bg-brand-primary text-ink-onbrand text-sm font-medium py-2.5 rounded hover:opacity-90 transition-opacity"
                    >
                      Teckna {p.kortNamn.toLowerCase()}
                    </button>
                  );
                  return (
                    <td key={p.id} className="px-4 py-3 align-top">
                      {idx === 0 ? (
                        <Copy
                          label="Knapp för att teckna avtal"
                          category="cta"
                          text={`Teckna ${p.kortNamn.toLowerCase()}`}
                          rationale="Verb och avtalets namn, så att kunden vet exakt vilket avtal knappen gäller. Samma formulering i alla kolumner. Undvik 'Välj' eller 'Gå vidare', de säger inte att kunden tecknar ett avtal."
                        >
                          {knapp}
                        </Copy>
                      ) : (
                        knapp
                      )}
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </Annotation>

      {/* ─── Fotnoter och avtalsinformation ─────────────────────────── */}
      <Annotation
        label="Villkor som syns direkt"
        audience="redaktör"
        rationale="Fotnoterna visas öppet i stället för att gömmas, vilket bygger förtroende hos kunder och jurister. Stäm av texten med juridik vid varje prisändring och kontrollera att länkarna går till gällande villkor."
      >
        <footer className="text-xs text-ink-muted leading-relaxed border-t border-border-subtle pt-4 max-w-reading">
          <p className="mb-2">
            <strong className="text-ink-secondary">Bra att veta:</strong> Den uppskattade
            månadskostnaden gäller elhandel, alltså det du betalar till oss. Elnätet
            faktureras separat av ditt nätbolag och beror på hur mycket el du använder.
          </p>
          <Copy
            label="Villkorstext och ångerrätt"
            category="reassurance"
            text="Påslag och energiskatt tillkommer enligt de priser som gäller vid varje tillfälle. Avtalen följer EFET:s standardvillkor. Du har 14 dagars ångerrätt enligt distansavtalslagen."
            rationale="Korta meningar i stället för avtalsspråk som 'vid var tid gällande'. Ångerrätten står sist så att den är det kunden minns. Ändra inte sakinnehållet utan att juridik har godkänt."
          >
            <p className="mb-2">
              Påslag och energiskatt tillkommer enligt de priser som gäller vid varje
              tillfälle. Avtalen följer EFET:s standardvillkor. Du har 14 dagars ångerrätt
              enligt distansavtalslagen.
            </p>
          </Copy>
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
