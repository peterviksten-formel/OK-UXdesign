import { useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { BOENDE_KWH, PLANS, type BoendeTyp, type PlanId } from "../elavtal-data";

/**
 * Skriver heltal med mellanslag som tusentalsavgränsare, som i svensk text.
 * "2000" blir "2 000", "20000" blir "20 000".
 */
function formatSvInt(n: number): string {
  return n.toLocaleString("sv-SE").replace(/ /g, " ");
}

/** Avrundar till närmaste 5 kr så att priserna känns jämna. */
function roundKr(n: number): number {
  return Math.round(n / 5) * 5;
}

/**
 * Ordningen på jämförelsekorten: Vanligaste valet (Månadspris) först, så att
 * blicken landar där. De två andra behåller sin inbördes ordning.
 * Ändra inte ordningen i det gemensamma innehållet, den trygga varianten
 * använder det för sin tabell.
 */
const KORT_ORDNING: PlanId[] = ["manadspris", "sakrat", "kvartspris"];

/**
 * VARIANT B, Progressiv
 *
 * Idé: en mellanväg. Kunden väljer först boende (och kan skriva in sin
 * egen förbrukning), sedan kommer jämförelsekort där detaljerna fälls ut
 * vid behov. Det håller den upplevda ansträngningen låg men gör sidan
 * engagerande. Märkningen Vanligaste valet ger en knuff utan att tvinga.
 */
export function VariantProgressiv() {
  const [boende, setBoende] = useState<BoendeTyp>("lagenhet");
  // Förbrukning i kWh per år. Sätts till ett typiskt värde för boendetypen
  // när kunden byter boende, men kan ändras fritt i fältet. Det typiska
  // värdet är en startpunkt, inte en låsning.
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
      {/* ─── Förbrukning: boendeval och eget kWh-värde ─────────────── */}
      <Annotation
        label="Boendeval och egen förbrukning"
        audience="user"
        rationale="Kunden ser ett pris direkt. Boendevalet fyller i en typisk förbrukning (lägenhet cirka 2 000 kWh, villa cirka 20 000 kWh). Den som vill kan skriva in sin egen förbrukning från fakturan, och priset i varje kort räknas om direkt."
      >
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-[auto_auto_minmax(0,1fr)] gap-x-6 gap-y-4 items-end">
          {/* Boendetyp */}
          <div>
            <Copy
              label="Rubrik för boendeval"
              category="rubrik"
              text="Jag bor i"
              rationale="Skrivet i jagform så att knapparna läses som en mening: 'Jag bor i lägenhet'. Kortare och mer personligt än 'Välj bostadstyp'."
            >
              <p className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-1.5">
                Jag bor i
              </p>
            </Copy>
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

          {/* Förbrukning per år */}
          <div>
            <label
              htmlFor="elavtal-kwh"
              className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-1.5 block"
            >
              Förbrukning per år
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

          {/* Hjälptext, i linje med fälten */}
          <Copy
            label="Hjälptext för förbrukning"
            category="ton"
            text="Vi har fyllt i en vanlig förbrukning för ditt boende. Skriv in din egen för ett säkrare pris. Du hittar den på din senaste årsfaktura."
            rationale="Förklarar varför det redan står en siffra och var kunden hittar sin egen. Undvik tekniska ord som 'autofylld' och 'schablon', de betyder inget för kunden."
          >
            <p
              id="elavtal-kwh-hint"
              className="text-xs text-ink-muted leading-snug max-w-[260px] py-2"
            >
              Vi har fyllt i en vanlig förbrukning för ditt boende. Skriv in din egen för ett
              säkrare pris. Du hittar den på din senaste årsfaktura.
            </p>
          </Copy>
        </div>
      </Annotation>

      {/* Rutan om elnät och elhandel finns inte i modulen. Den hör hemma på
         sidnivå (se till exempel blocket om elnät på startsidans undersida),
         så att varje sida kan visa den där informationen behövs. */}

      {/* ─── Jämförelsekort ─────────────────────────────────────────── */}
      <Annotation
        label="Jämförelsekort"
        audience="design"
        rationale="Tre kort med samma uppgifter i samma ordning gör avtalen lätta att jämföra. Vanligaste valet står först så att blicken landar där. Märkningen ligger ovanför kortet, så alla kort är lika höga. Varje kort har bara två ytor, uppgifter och pris, för att hålla det luftigt."
      >
        <div className="grid md:grid-cols-3 gap-4 mb-6 mt-8">
          {KORT_ORDNING.map((id, idx) => {
            const p = PLANS.find((pl) => pl.id === id);
            if (!p) return null;
            const isHighlight = p.id === "manadspris";
            const forst = idx === 0;

            const bastFor = <p className="text-sm text-ink-secondary mb-5 leading-relaxed">{p.bastFor}</p>;
            const prisRubrik = (
              <p className="text-xs text-ink-muted uppercase tracking-wider mb-1">
                Uppskattad månadskostnad
              </p>
            );
            const tecknaKnapp = (
              <button
                type="button"
                className="mt-auto w-full bg-brand-primary text-ink-onbrand font-medium py-3 rounded hover:opacity-90 transition-opacity"
              >
                Teckna {p.kortNamn.toLowerCase()}
              </button>
            );
            const trygghet = (
              <p className="text-xs text-ink-muted text-center mt-2">
                Tar cirka 3 minuter · Du behöver personnummer och adress
              </p>
            );

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
                <Copy
                  label="Märkning Vanligaste valet"
                  category="ton"
                  text="Vanligaste valet"
                  rationale="Beskriver vad andra kunder har valt, inte vad vi tycker. Det är en mjukare knuff än 'Rekommenderas' eller 'Bäst'. Påståendet måste stämma med verklig statistik."
                >
                  <div
                    className="absolute -top-[30px] left-[-2px] right-[-2px] bg-brand-accent text-white text-xs font-bold uppercase tracking-wider py-2 rounded-t-md text-center"
                    aria-label="Vanligaste valet"
                  >
                    Vanligaste valet
                  </div>
                </Copy>
              )}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-h4 mb-1">{p.namn}</h3>
                {forst ? (
                  <Copy
                    label="Vem avtalet passar"
                    category="ton"
                    text={p.bastFor}
                    rationale="Alla kort inleds med 'Bäst för dig som' och ett behov kunden känner igen. Det hjälper kunden att välja utifrån sin situation i stället för att jämföra siffror."
                  >
                    {bastFor}
                  </Copy>
                ) : (
                  bastFor
                )}

                <dl className="text-sm space-y-2 mb-4">
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-muted">Pris</dt>
                    <dd className="text-right font-medium">{p.prismekanism}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-muted">Bindningstid</dt>
                    <dd className="text-right font-medium">{p.bindning}</dd>
                  </div>
                  <div className="flex justify-between gap-3">
                    <dt className="text-ink-muted">Påslag</dt>
                    <dd className="text-right font-medium text-ink-muted">{p.pasalg}</dd>
                  </div>
                </dl>

                <div className="rounded-md bg-tint-notice p-3 mb-4" aria-live="polite">
                  {forst ? (
                    <Copy
                      label="Prisrubrik i kortet"
                      category="rubrik"
                      text="Uppskattad månadskostnad"
                      rationale="Ordet 'uppskattad' är viktigt: det faktiska priset beror på förbrukning och elpris. Utan det kan kunden uppfatta siffran som ett löfte."
                    >
                      {prisRubrik}
                    </Copy>
                  ) : (
                    prisRubrik
                  )}
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

                {forst ? (
                  <Copy
                    label="Knapp för att teckna avtal"
                    category="cta"
                    text={`Teckna ${p.kortNamn.toLowerCase()}`}
                    rationale="Verb och avtalets namn, samma mönster i alla kort. Knappen säger vilket avtal den gäller, även om kunden bara läser den. Undvik 'Välj' eller 'Beställ', de säger inte att det är ett avtal."
                  >
                    {tecknaKnapp}
                  </Copy>
                ) : (
                  tecknaKnapp
                )}
                {forst ? (
                  <Copy
                    label="Tid och underlag under knappen"
                    category="reassurance"
                    text="Tar cirka 3 minuter · Du behöver personnummer och adress"
                    rationale="Svarar på två frågor kunden har precis innan klicket: hur lång tid tar det och vad behöver jag ha framme. Ange bara tider som stämmer i den riktiga tecknarvägen."
                  >
                    {trygghet}
                  </Copy>
                ) : (
                  trygghet
                )}
              </div>
            </article>
            );
          })}
        </div>
      </Annotation>

      {/* ─── Tillval: Framtidspengen ────────────────────────────────── */}
      <Annotation
        label="Framtidspengen som tillval"
        audience="design"
        rationale="Framtidspengen visades tidigare som ett fjärde avtal, vilket var fel. Det är ett tillägg till priset. Därför ligger den under jämförelsen som en ruta kunden själv kryssar i."
      >
        <div className="rounded-md border border-border-subtle bg-surface p-5 flex items-start gap-4">
          <input
            type="checkbox"
            id="framtidspengen-b"
            className="mt-1 w-5 h-5 rounded border-border-strong accent-brand-primary"
          />
          <label htmlFor="framtidspengen-b" className="flex-1 cursor-pointer">
            <Copy
              label="Tillvalets rubrik"
              category="cta"
              text="Lägg till Framtidspengen"
              rationale="Verb och objekt, så att kryssrutan läses som ett aktivt val. 'Lägg till' visar att det är frivilligt och kommer utöver avtalet."
            >
              <span className="font-medium block mb-1">Lägg till Framtidspengen</span>
            </Copy>
            <span className="text-sm text-ink-secondary block">
              Du betalar 3 öre extra per kWh, som går till lokala miljöprojekt i nordvästra
              Skåne. Du kan ta bort tillägget när du vill.
            </span>
          </label>
        </div>
      </Annotation>

      {/* ─── Trygghetsrad ───────────────────────────────────────────── */}
      <Annotation
        label="Trygghetsrad med nyckeltal"
        audience="redaktör"
        rationale="Tre fakta som minskar osäkerheten precis innan kunden tecknar. Uppdatera siffrorna minst en gång per år och ha en källa för varje. Skriv inga superlativ som inte går att belägga."
      >
        <div className="mt-6 p-5 rounded-md bg-tint-highlight grid sm:grid-cols-3 gap-4 text-center text-sm">
          <div>
            <p className="font-medium">4,3 av 5</p>
            <p className="text-ink-secondary">Kundnöjdhet (NKI)</p>
          </div>
          <div>
            <Copy
              label="Nyckeltal om kundservice"
              category="reassurance"
              text="Under 2 min i chatten"
              rationale="Ett konkret löfte om snabb hjälp väger tyngre än 'Vi finns här för dig'. Siffran måste stämma med den faktiska svarstiden."
            >
              <p className="font-medium">Under 2 min i chatten</p>
            </Copy>
            <p className="text-ink-secondary">Svarstid i kundservice</p>
          </div>
          <div>
            <p className="font-medium">~125 000</p>
            <p className="text-ink-secondary">Kunder i regionen</p>
          </div>
        </div>
      </Annotation>
    </div>
  );
}
