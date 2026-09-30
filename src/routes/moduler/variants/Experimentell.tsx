import { useMemo, useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";
import { PLANS, TERMER, type PlanId } from "../elavtal-data";

/**
 * VARIANT C, Experimentell
 *
 * Idé: börja med det personliga. En kalkylator föreslår ett avtal direkt
 * när kunden drar i reglagen. Facktermer förklaras där de står, utan att
 * kunden lämnar sidan. Ordningen bygger upp mot beslutet: sammanfattning,
 * reglage, förslag och sist en kompakt jämförelse av alla tre avtal.
 * Kunden ska känna att hen utforskar, inte läser.
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
 * Låtsasberäkning: gör om reglagens värden till en uppskattad månadskostnad
 * per avtal. Siffrorna är påhittade, poängen är att visa hur det känns att
 * använda kalkylatorn.
 */
function calc(kwhPerYear: number, riskAversion: number) {
  const monthlyKwh = kwhPerYear / 12;
  // Påhittat spotpris runt 120 öre/kWh, fast pris = spotpris + cirka 20 öre
  const sakratOre = 145;
  const kvartsprisOre = 130;
  // Ju mer kunden tål svängningar, desto lägre antaget pris för rörligt avtal
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
      {/* ─── Sammanfattning överst ──────────────────────────────────── */}
      <Annotation
        label="Snabbsammanfattning"
        audience="redaktör"
        rationale="En kort sammanfattning av de tre avtalen för den som har bråttom. Texten ser AI-skriven ut men ska skrivas eller godkännas av en redaktör. Faktagranska den före publicering och varje gång priser eller avtal ändras."
      >
        <div className="mb-8 p-5 rounded-lg bg-gradient-to-br from-tint-info via-tint-pink to-tint-notice border border-border-subtle">
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-primary text-white">
              <Icon name="auto_awesome" size={14} />
            </span>
            <Copy
              label="Sammanfattningens rubrik"
              category="rubrik"
              text="Snabbsammanfattning"
              rationale="Säger vad rutan är och att den går fort att läsa. Undvik 'AI-sammanfattning', kunden bryr sig om innehållet, inte om hur det har tagits fram."
            >
              <span className="text-eyebrow uppercase font-medium text-brand-primary">
                Snabbsammanfattning
              </span>
            </Copy>
          </div>
          <Copy
            label="Sammanfattningens text"
            category="ton"
            text="Vi har tre elavtal. Säkrat pris ger samma pris varje månad, Kvartspris är ett mellanting och Månadspris följer marknaden och är i snitt billigast över tid. Du bor i elprisområde SE4, där elen oftast är dyrast i landet. Därför lönar det sig att jämföra påslaget."
            rationale="Tre korta meningar: vilka avtalen är, var kunden bor och vad det betyder. Ett konkret råd på slutet ger sammanfattningen en nytta. Undvik värdeord som 'bäst' om ett enskilt avtal, rekommendationen kommer först i kalkylatorn."
          >
            <p className="text-ink leading-relaxed">
              Vi har tre elavtal. <Tooltip term="bindningstid"><strong>Säkrat pris</strong></Tooltip> ger
              samma pris varje månad, <strong>Kvartspris</strong> är ett mellanting och{" "}
              <Tooltip term="spotpris"><strong>Månadspris</strong></Tooltip> följer marknaden och är
              i snitt billigast över tid. Du bor i elprisområde{" "}
              <Tooltip term="elprisområde"><strong>SE4</strong></Tooltip>, där elen oftast är dyrast
              i landet. Därför lönar det sig att jämföra <Tooltip term="påslag">påslaget</Tooltip>.
            </p>
          </Copy>
        </div>
      </Annotation>

      {/* ─── Interaktiv kalkylator ──────────────────────────────────── */}
      <Annotation
        label="Kalkylator med förslag"
        audience="design"
        rationale="I stället för att välja lägenhet eller villa drar kunden i två reglage: förbrukning per år och hur viktigt ett förutsägbart pris är. Förslaget och priserna för alla tre avtal ändras direkt, så kunden kan pröva sin egen situation innan hen tecknar."
      >
        <div className="mb-8 rounded-md border border-border-subtle bg-surface p-5 sm:p-6">
          <Copy
            label="Kalkylatorns rubrik"
            category="rubrik"
            text="Räkna ut vilket avtal som passar dig"
            rationale="Beskriver vad kunden får ut av kalkylatorn, ett avtal som passar, i stället för vad verktyget heter. Undvik 'Kalkylator' eller 'Prisverktyg' som rubrik."
          >
            <h3 className="text-h4 mb-1">Räkna ut vilket avtal som passar dig</h3>
          </Copy>
          <p className="text-sm text-ink-muted mb-6">
            Dra i reglagen så föreslår vi ett avtal och visar priset för alla tre.
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="kwh-slider" className="flex items-baseline justify-between mb-2">
                <span className="text-sm font-medium">Förbrukning per år</span>
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
                <Copy
                  label="Fråga om prisrisk"
                  category="rubrik"
                  text="Hur viktigt är ett förutsägbart pris för dig?"
                  rationale="En vardaglig fråga i stället för facktermen 'risktolerans'. Kunden svarar utifrån sin känsla, och vi översätter svaret till ett avtal."
                >
                  <span className="text-sm font-medium">Hur viktigt är ett förutsägbart pris för dig?</span>
                </Copy>
                <span className="text-h6 font-medium text-brand-accent">
                  {risk < 33 ? "Inte så viktigt" : risk < 66 ? "Ganska viktigt" : "Mycket viktigt"}
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
                <span>Spelar ingen roll</span>
                <span>Vill veta vad jag betalar</span>
              </div>
            </div>
          </div>

          {/* Förslag som uppdateras direkt */}
          <div className="rounded-md bg-brand-primary text-ink-onbrand p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <Copy
                label="Rubrik för förslaget"
                category="ton"
                text="Förslag till dig"
                rationale="'Förslag' låter kunden behålla beslutet. 'Vi rekommenderar' kan uppfattas som att vi vet bättre än kunden, och ett råd bygger ju bara på två reglage."
              >
                <p className="text-eyebrow uppercase opacity-80 mb-1">Förslag till dig</p>
              </Copy>
              <p className="text-h3 font-medium">{recPlan.namn}</p>
              <p className="text-sm opacity-90 mt-1">{recPlan.beskrivning}</p>
            </div>
            <div className="text-right">
              <p className="text-eyebrow uppercase opacity-80 mb-1">Uppskattat pris</p>
              <p className="text-h2 font-medium leading-none">
                ~{costs[recId].toLocaleString("sv-SE")} <span className="text-sm opacity-80">kr/mån</span>
              </p>
            </div>
            <Copy
              label="Knapp för att teckna förslaget"
              category="cta"
              text={`Teckna ${recPlan.kortNamn.toLowerCase()} →`}
              rationale="Verb och avtalets namn. Namnet byts när förslaget ändras, så kunden ser alltid vilket avtal hen tecknar. Undvik 'Kom igång' eller 'Fortsätt'."
            >
              <button
                type="button"
                className="bg-brand-highlight text-white font-medium px-5 py-3 rounded hover:opacity-90 transition-opacity whitespace-nowrap"
              >
                Teckna {recPlan.kortNamn.toLowerCase()} →
              </button>
            </Copy>
          </div>
        </div>
      </Annotation>

      {/* ─── Jämförelseremsa med priser som uppdateras direkt ──────── */}
      <Annotation
        label="Jämförelseremsa med alla tre avtal"
        audience="user"
        rationale="Tre små kort visar alla avtal med priset från kalkylatorn. Det föreslagna avtalet är markerat med färg. Kunden kan jämföra de andra avtalen utan att förlora sina inställningar."
      >
        <div className="grid md:grid-cols-3 gap-3 mb-8">
          {PLANS.map((p, idx) => {
            const isRec = p.id === recId;
            const valjKnapp = (
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
            );
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
                    <Copy
                      label="Märkning av föreslaget avtal"
                      category="ton"
                      text="Förslag"
                      rationale="Samma ord som i förslagsrutan ovanför, så att kunden ser att det är samma avtal. Ett kort ord får plats på märket även i mobil."
                    >
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-brand-accent text-white font-bold">
                        Förslag
                      </span>
                    </Copy>
                  )}
                </div>
                <p className="text-h3 font-medium text-brand-primary mb-1">
                  ~{costs[p.id].toLocaleString("sv-SE")}<span className="text-sm text-ink-muted"> kr/mån</span>
                </p>
                <p className="text-xs text-ink-muted mb-3">{p.prismekanism}</p>
                {idx === 0 ? (
                  <Copy
                    label="Knapp för att välja ett annat avtal"
                    category="cta"
                    text={`Välj ${p.kortNamn.toLowerCase()}`}
                    rationale="'Välj' i stället för 'Teckna' eftersom knappen ska göra det här avtalet till förslaget på sidan, inte starta tecknandet. Håll isär orden: 'Teckna' används bara där kunden faktiskt tecknar."
                  >
                    {valjKnapp}
                  </Copy>
                ) : (
                  valjKnapp
                )}
              </article>
            );
          })}
        </div>
      </Annotation>

      {/* ─── Ordlista med förklaringar i sidan ──────────────────────── */}
      <Annotation
        label="Ordlista i sidan"
        audience="user"
        rationale="I stället för en separat FAQ har facktermerna en streckad understrykning. Kunden pekar eller trycker på ordet och får förklaringen direkt, där frågan uppstår."
      >
        <div className="rounded-md bg-tint-notice p-5 mb-8">
          <Copy
            label="Ordlistans rubrik"
            category="faq"
            text="Osäker på ett ord? Peka eller tryck på det för att se vad det betyder."
            rationale="Börjar med kundens egen känsla och säger sedan vad hen ska göra. 'Hovra' är ett tekniskt ord som inte fungerar på mobil, därför 'peka eller tryck'."
          >
            <p className="text-sm font-medium mb-2">Osäker på ett ord? Peka eller tryck på det för att se vad det betyder.</p>
          </Copy>
          <p className="text-sm text-ink-secondary leading-relaxed">
            <Tooltip term="påslag">Påslag</Tooltip> ·{" "}
            <Tooltip term="spotpris">Spotpris</Tooltip> ·{" "}
            <Tooltip term="elprisområde">Elprisområde</Tooltip> ·{" "}
            <Tooltip term="bindningstid">Bindningstid</Tooltip> ·{" "}
            <Tooltip term="anvisat_avtal">Anvisat avtal</Tooltip>
          </p>
        </div>
      </Annotation>

      {/* ─── Fast rad längst ner (som i mobil) ──────────────────────── */}
      <Annotation
        label="Fast rad med förslag och knapp"
        audience="user"
        rationale="Raden följer med när kunden skrollar, så att knappen för att teckna alltid är ett klick bort. På dator ligger den fast längst ner i modulen."
      >
        <div className="rounded-md border border-brand-accent bg-elevated p-4 flex flex-wrap items-center gap-3 sticky bottom-4 shadow-lg">
          <div className="flex-1 min-w-0">
            <Copy
              label="Rubrik i den fasta raden"
              category="ton"
              text="Förslag till dig"
              rationale="Kunden har inte valt något ännu, därför inte 'Du har valt'. Samma ord som i förslagsrutan håller ihop sidan."
            >
              <p className="text-xs text-ink-muted">Förslag till dig</p>
            </Copy>
            <p className="font-medium truncate">
              {recPlan.namn} · ~{costs[recId].toLocaleString("sv-SE")} kr/mån
            </p>
          </div>
          <Copy
            label="Knapp i den fasta raden"
            category="cta"
            text="Teckna avtalet →"
            rationale="Verb och objekt. 'Teckna nu' skapar stress utan att säga vad kunden tecknar. Avtalets namn står redan bredvid, så 'avtalet' räcker."
          >
            <button
              type="button"
              className="bg-brand-highlight text-white font-medium px-5 py-2.5 rounded hover:opacity-90 transition-opacity"
            >
              Teckna avtalet →
            </button>
          </Copy>
        </div>
      </Annotation>
    </div>
  );
}
