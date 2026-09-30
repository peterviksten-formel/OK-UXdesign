import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { WizardProgress, type WizardVariant } from "../../components/WizardProgress";
import { AVBROTT, STATUS_META, TYP_LABEL } from "../moduler/avbrott-data";

/**
 * SIDTYP 9: Avbrottsinformation
 *
 * Från informationssida till beslutsstöd i realtid. Hela flödet utgår
 * från två frågor: "Är jag påverkad?" och "När är det löst?".
 *
 * Fem principer från UX-briefen:
 *   1. Adressen först: sidan börjar med adressfrågan, inte med en herotext.
 *   2. Ett tydligt svar: statuskort med påverkan per tjänst
 *      (el, värme, gas, fiber), prognos och enkel förklaring av orsaken.
 *   3. Tydliga nästa steg som beror på läget:
 *      pågående avbrott → SMS och tips · inget avbrott → felsök själv först.
 *   4. Kartan är sekundär och ligger under "Översikt och historik".
 *   5. En gemensam datakälla: karta, lista och SMS visar samma status.
 */

/* ─── Data ──────────────────────────────────────────────────────── */

type Infrastruktur = "el" | "varme" | "gas" | "fiber";

type PaverkanEntry = {
  typ: Infrastruktur;
  ikon: string;
  label: string;
  drabbad: boolean;
  detalj?: string;
};

type DemoResult = {
  kind: "pagaende" | "planerat" | "inget";
  adress: string;
  slutBeraknat?: string;
  minuterKvar?: number;
  senasteUppdatering?: string;
  orsakEnkel?: string;
  paverkan: PaverkanEntry[];
};

const PAVERKAN_OK: PaverkanEntry[] = [
  { typ: "el", ikon: "bolt", label: "El", drabbad: false },
  { typ: "varme", ikon: "thermostat", label: "Fjärrvärme", drabbad: false },
  { typ: "gas", ikon: "local_fire_department", label: "Gas", drabbad: false },
  { typ: "fiber", ikon: "wifi", label: "Fiber", drabbad: false },
];

const MOCK_TRAFF: DemoResult = {
  kind: "pagaende",
  adress: "Storgatan 12, 252 25 Helsingborg",
  slutBeraknat: "12:00",
  minuterKvar: 95,
  senasteUppdatering: "08:45: Reparatörerna är på plats och har hittat kabelfelet.",
  orsakEnkel: "Ett kabelfel vid transformatorstation Söder T4 påverkar området. Reparation pågår just nu.",
  paverkan: [
    { typ: "el", ikon: "bolt", label: "El", drabbad: true, detalj: "Ca 340 kunder utan ström sedan 08:22" },
    { typ: "varme", ikon: "thermostat", label: "Fjärrvärme", drabbad: false },
    { typ: "gas", ikon: "local_fire_department", label: "Gas", drabbad: false },
    { typ: "fiber", ikon: "wifi", label: "Fiber", drabbad: false },
  ],
};

const MOCK_INGET: DemoResult = {
  kind: "inget",
  adress: "Kungsgatan 8, 111 43 Stockholm",
  paverkan: PAVERKAN_OK,
};

/* ─── Felsökningsguide (oförändrad sedan version 1) ──────────────── */

type Diagnos = { id: string; fraga: string; ja: string; nej: string };

const DIAGNOS_STEG: Diagnos[] = [
  { id: "grannar", fraga: "Har dina grannar också strömavbrott?", ja: "natverk", nej: "propp" },
  { id: "natverk", fraga: "Då är det troligen ett avbrott i elnätet. Står det med bland pågående avbrott?", ja: "listad", nej: "rapportera" },
  { id: "propp", fraga: "Har du kollat säkringarna och jordfelsbrytaren?", ja: "proppar-ok", nej: "propp-check" },
  { id: "propp-check", fraga: "Gå till elcentralen och slå tillbaka säkringar som har löst ut. Fungerar det nu?", ja: "fungerar", nej: "rapportera" },
  { id: "proppar-ok", fraga: "Har du betalat senaste elräkningen?", ja: "rapportera", nej: "obetald" },
];

const DIAGNOS_SLUT: Record<string, { rubrik: string; text: string; cta?: { label: string; href: string; primary?: boolean } }> = {
  listad: {
    rubrik: "Vi känner till avbrottet",
    text: "Du behöver inte göra något mer. Vi arbetar med att få tillbaka strömmen, och nya uppdateringar ser du under Pågående avbrott.",
  },
  fungerar: {
    rubrik: "Då var det en säkring som löst ut",
    text: "Händer det ofta? Låt en elektriker se över din elcentral.",
  },
  obetald: {
    rubrik: "Kontakta kundservice",
    text: "Är räkningen obetald kan elen ha stängts av. Logga in på Mina sidor eller ring kundservice.",
    cta: { label: "Logga in på Mina sidor", href: "#" },
  },
  rapportera: {
    rubrik: "Gör en felanmälan",
    text: "Ring 042-490 32 00. Vi svarar dygnet runt. Ha din adress och gärna fastighetsbeteckningen till hands.",
    cta: { label: "Ring 042-490 32 00", href: "tel:0424903200", primary: true },
  },
};

const pagaende = AVBROTT.filter((a) => a.status === "pagaende");
const planerat = AVBROTT.filter((a) => a.status === "planerat");
const avslutat = AVBROTT.filter((a) => a.status === "avslutat");

/* ─── Komponent ─────────────────────────────────────────────────── */

export function AvbrottNy() {
  const [query, setQuery] = useState("");
  const [resultat, setResultat] = useState<DemoResult | null>(null);
  const [smsStatus, setSmsStatus] = useState<"idle" | "prenumererad">("idle");

  const [diagnosSteg, setDiagnosSteg] = useState<string>("grannar");
  const [diagnosHistorik, setDiagnosHistorik] = useState<string[]>([]);

  const [openAvbrott, setOpenAvbrott] = useState<string | null>(pagaende[0]?.id ?? null);
  const [fordjupningTab, setFordjupningTab] = useState<"karta" | "pagaende" | "planerade" | "avklarade">("karta");

  // Flytta fokus till statuskortet när användaren har fått ett svar.
  // Skärmläsare läser då upp resultatet och tangentbordsanvändare hamnar rätt.
  const statusCardRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (resultat) statusCardRef.current?.focus();
  }, [resultat]);

  const senastUppdaterad = useMemo(() => {
    const d = new Date();
    return d.toLocaleTimeString("sv-SE", { hour: "2-digit", minute: "2-digit" });
  }, [resultat]);

  function sok(val?: string) {
    const q = (val ?? query).trim().toLowerCase();
    if (!q) return;
    if (q.startsWith("252") || q.startsWith("254") || q.includes("helsingborg") || q.includes("ängelholm")) {
      setResultat(MOCK_TRAFF);
    } else {
      setResultat(MOCK_INGET);
    }
    setSmsStatus("idle");
  }

  function anvandPosition() {
    setQuery("252 25 Helsingborg");
    setResultat(MOCK_TRAFF);
    setSmsStatus("idle");
  }

  function nollstallSok() {
    setQuery("");
    setResultat(null);
    setSmsStatus("idle");
  }

  function diagnosSvara(svar: "ja" | "nej") {
    const steg = DIAGNOS_STEG.find((s) => s.id === diagnosSteg);
    if (!steg) return;
    const next = svar === "ja" ? steg.ja : steg.nej;
    setDiagnosHistorik((h) => [...h, `${steg.fraga} → ${svar === "ja" ? "Ja" : "Nej"}`]);
    if (next in DIAGNOS_SLUT) {
      setDiagnosSteg(`slut:${next}`);
    } else {
      setDiagnosSteg(next);
    }
  }

  function diagnosReset() {
    setDiagnosSteg("grannar");
    setDiagnosHistorik([]);
  }

  const harAvbrott = resultat?.kind === "pagaende" || resultat?.kind === "planerat";
  const antalDrabbade = resultat?.paverkan.filter((p) => p.drabbad).length ?? 0;

  /**
   * Felsökningsguidens innehåll, delat mellan tre blockvarianter som bara
   * visar stegen på olika sätt (cirklar, stapel eller knappar). Samma mönster
   * som kontaktflödet på Kundservice, så guiderna känns igen.
   */
  function renderFelsokningWizard(progressVariant: WizardVariant) {
    const slut = diagnosSteg.startsWith("slut:") ? DIAGNOS_SLUT[diagnosSteg.replace("slut:", "")] : null;
    const aktiv = DIAGNOS_STEG.find((s) => s.id === diagnosSteg);
    const wizardCurrent = slut ? 2 : 1;

    return (
      <Annotation
        label="Felsökningsguide före samtal"
        audience="user"
        rationale="Många strömavbrott hemma beror på en säkring eller jordfelsbrytare som löst ut. Guiden ställer en fråga i taget, och de flesta får svar utan att behöva ringa. Att ringa blir sista steget, inte det första."
      >
        <section id="felsokning" className="py-10 border-t border-border-subtle">
          <Copy
            label="Felsökning, rubrik och löfte"
            category="rubrik"
            text="Testa det här innan du ringer. Oftast beror strömavbrott hemma på en säkring eller jordfelsbrytare som löst ut. Guiden tar en minut och kan spara dig ett samtal."
            rationale="Rubriken säger vad man ska göra och när. Undertexten förklarar varför det lönar sig och hur lång tid det tar. Undvik att låta som att vi inte vill att kunden ringer."
          >
            <div>
              <WizardProgress
                variant={progressVariant}
                title="Testa det här innan du ringer"
                subtitle="Oftast beror strömavbrott hemma på en säkring eller jordfelsbrytare som löst ut. Guiden tar en minut och kan spara dig ett samtal."
                steps={[
                  { key: "fragor", label: "Frågor", hint: aktiv && !slut ? `Fråga ${diagnosHistorik.length + 1}` : undefined },
                  { key: "resultat", label: "Resultat" },
                ]}
                current={wizardCurrent}
              />
            </div>
          </Copy>

          <div className="rounded-md border-2 border-brand-accent bg-surface p-5 sm:p-6 max-w-reading">
            {diagnosHistorik.length > 0 && (
              <ol className="mb-4 space-y-1 text-xs text-ink-muted">
                {diagnosHistorik.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Icon name="check" size={12} className="text-brand-accent mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ol>
            )}

            {aktiv && !slut && (
              <>
                <Copy
                  label="Felsökning, aktuell fråga"
                  category="ton"
                  text={aktiv.fraga}
                  rationale="Varje fråga går att svara ja eller nej på och handlar om en sak i taget. Vardagsord som 'kollat' och 'löst ut' i stället för tekniska termer."
                >
                  <p className="font-medium text-h5 mb-4">{aktiv.fraga}</p>
                </Copy>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => diagnosSvara("ja")}
                    className="flex-1 bg-brand-primary text-ink-onbrand font-medium py-3 rounded hover:opacity-90"
                  >
                    Ja
                  </button>
                  <button
                    type="button"
                    onClick={() => diagnosSvara("nej")}
                    className="flex-1 border border-border-strong text-brand-primary font-medium py-3 rounded hover:bg-tint-info"
                  >
                    Nej
                  </button>
                </div>
              </>
            )}

            {slut && (
              <div role="status" aria-live="polite">
                <Copy
                  label="Felsökning, resultat"
                  category="reassurance"
                  text={`${slut.rubrik}. ${slut.text}`}
                  rationale="Rubriken ger svaret direkt och texten säger vad man gör nu. När kunden inte behöver göra något säger vi det rakt ut, så ingen ringer i onödan."
                >
                  <div>
                    <h3 className="font-medium text-h5 mb-2">{slut.rubrik}</h3>
                    <p className="text-sm text-ink-secondary mb-4 leading-relaxed">{slut.text}</p>
                  </div>
                </Copy>
                <div className="flex flex-wrap gap-3">
                  {slut.cta && (
                    <a
                      href={slut.cta.href}
                      className={`inline-flex items-center gap-2 font-medium px-5 py-2.5 rounded transition-opacity ${
                        slut.cta.primary
                          ? "bg-brand-primary text-ink-onbrand hover:opacity-90"
                          : "border border-border-strong text-brand-primary hover:bg-tint-info"
                      }`}
                    >
                      {slut.cta.primary && <Icon name="call" size={16} />}
                      {slut.cta.label}
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={diagnosReset}
                    className="inline-flex items-center gap-1.5 text-sm text-ink-secondary hover:text-brand-accent px-3 py-2.5"
                  >
                    <Icon name="restart_alt" size={16} />
                    Börja om
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </Annotation>
    );
  }

  const blocks: BlockDef[] = [
    /* ─── 1. START: adressen först, sedan statuskortet ─────────── */
    {
      id: "start",
      label: "Adress först, sedan statuskort",
      variants: [
        {
          key: "unified",
          label: "Adressök och statuskort på samma yta",
          render: () => (
            <Annotation
              label="Adressen först, sedan svaret"
              audience="user"
              rationale="Den som har strömavbrott vill veta om det gäller hen. Därför börjar sidan med adressfältet, utan herotext eller lista före. Ett sök ger ett statuskort med läget för el, fjärrvärme, gas och fiber."
            >
              <section className="pt-6 pb-8">
                {!resultat && (
                  <Copy
                    label="H1, användarens fråga"
                    category="rubrik"
                    text="Är ditt hem påverkat av ett avbrott?"
                    rationale="En fråga med besökarens egna ord. 'Avbrottsinformation' säger vad sidan är, 'Är ditt hem påverkat?' säger vilken fråga den besvarar."
                  >
                    <h1 className="text-h1 leading-tight mb-2">Är ditt hem påverkat av ett avbrott?</h1>
                  </Copy>
                )}
                {!resultat && (
                  <Copy
                    label="Ingress, vad sidan visar"
                    category="reassurance"
                    text="Skriv din adress eller använd din position. Vi visar status för el, fjärrvärme, gas och fiber på en gång."
                    rationale="Säger hur man kommer igång (adress eller position) och vad man får tillbaka (läget för alla fyra tjänster i ett svar). Då förstår besökaren direkt att sidan gäller mer än el."
                  >
                    <p className="text-lede text-ink-secondary mb-5 max-w-reading">
                      Skriv din adress eller använd din position. Vi visar status för el, fjärrvärme, gas och fiber på en gång.
                    </p>
                  </Copy>
                )}

                {/* Adressfältet syns alltid och tar mindre plats när det finns ett resultat */}
                <Copy
                  label="Adressök, fält och knappar"
                  category="cta"
                  text="T.ex. Storgatan 12 eller 252 25 / Se status / Använd min position"
                  rationale="Exemplet i fältet visar att både gatuadress och postnummer fungerar. 'Se status' säger vad man får. Positionsknappen sparar tid för den som står i ett mörkt hus med mobilen."
                >
                <form
                  role="search"
                  onSubmit={(e) => { e.preventDefault(); sok(); }}
                  className={`flex flex-wrap gap-2 ${resultat ? "max-w-reading mb-4" : "max-w-reading mb-3"}`}
                >
                  <label htmlFor="avbrott-adress" className="sr-only">Din adress eller ditt postnummer</label>
                  <div className="flex-1 min-w-[220px] relative">
                    <Icon name="search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
                    <input
                      id="avbrott-adress"
                      type="text"
                      inputMode="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="T.ex. Storgatan 12 eller 252 25"
                      className="w-full border border-border-strong rounded-md pl-10 pr-3 py-3 text-base bg-canvas focus:outline-none focus:border-brand-accent focus-visible:ring-2 focus-visible:ring-brand-accent"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={query.trim().length < 3}
                    className="bg-brand-primary text-ink-onbrand font-medium px-5 py-3 rounded hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed inline-flex items-center gap-2"
                  >
                    Se status
                    <Icon name="arrow_forward" size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={anvandPosition}
                    className="border border-border-strong text-brand-primary font-medium px-4 py-3 rounded hover:bg-tint-info inline-flex items-center gap-2"
                    title="Använd din geoposition"
                  >
                    <Icon name="my_location" size={16} />
                    <span className="hidden sm:inline">Använd min position</span>
                    <span className="sm:hidden">Position</span>
                  </button>
                </form>
                </Copy>

                {!resultat && (
                  <p className="text-xs text-ink-muted">
                    Demo: sök på <button type="button" onClick={() => sok("252 25")} className="text-brand-accent underline underline-offset-2 hover:no-underline">252 25</button> för att se ett pågående avbrott. Andra adresser visar läget utan avbrott.
                  </p>
                )}

                {/* STATUSKORT: briefens princip 2 */}
                {resultat && (
                  <div
                    ref={statusCardRef}
                    tabIndex={-1}
                    role="region"
                    aria-live="polite"
                    aria-label="Status för din adress"
                    className={`mt-4 rounded-lg border-2 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${
                      harAvbrott
                        ? "border-brand-highlight bg-tint-highlight"
                        : "border-brand-accent bg-tint-info"
                    }`}
                  >
                    {/* Översta raden: statusmärke, adress och ändra */}
                    <Copy
                      label="Statuskort, märke och adress"
                      category="metadata"
                      text={`${resultat.kind === "pagaende" ? "Pågående avbrott" : resultat.kind === "planerat" ? "Planerat arbete" : "Inget avbrott"} / Adress: ${resultat.adress} / Ändra adress`}
                      rationale="Märket ger läget med ett par ord, och adressen visar vad svaret gäller. 'Ändra adress' säger vad knappen gör, till skillnad från bara 'Ändra'."
                    >
                    <header className="px-5 py-4 flex flex-wrap items-center gap-3 border-b border-border-subtle bg-surface/50">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded ${
                          resultat.kind === "pagaende"
                            ? "bg-brand-highlight text-white"
                            : resultat.kind === "planerat"
                            ? "bg-tint-notice text-brand-primary"
                            : "bg-brand-accent text-white"
                        }`}
                      >
                        {resultat.kind === "pagaende" && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                        {resultat.kind === "pagaende" ? "Pågående avbrott" : resultat.kind === "planerat" ? "Planerat arbete" : "Inget avbrott"}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-ink-muted">Adress</p>
                        <p className="font-medium truncate">{resultat.adress}</p>
                      </div>
                      <button
                        type="button"
                        onClick={nollstallSok}
                        className="text-sm text-brand-primary hover:underline inline-flex items-center gap-1"
                      >
                        <Icon name="edit" size={14} />
                        Ändra adress
                      </button>
                    </header>
                    </Copy>

                    {/* Statussvar med stor rubrik */}
                    <div className="px-5 py-5">
                      <Copy
                        label="Statusrubrik, direkt svar"
                        category="rubrik"
                        text={
                          harAvbrott
                            ? `${antalDrabbade} av 4 tjänster påverkas just nu`
                            : "Allt fungerar normalt"
                        }
                        rationale="Ett konkret svar, inte en beskrivning. Vid avbrott kommer siffran först, eftersom det är den läsaren letar efter. 'Tjänster' i stället för 'infrastrukturer', som är vårt interna ord."
                      >
                        <h2 className="text-h3 leading-tight mb-1">
                          {harAvbrott
                            ? `${antalDrabbade} av 4 tjänster påverkas just nu`
                            : "Allt fungerar normalt"}
                        </h2>
                      </Copy>
                      {harAvbrott && resultat.slutBeraknat && (
                        <Copy
                          label="Prognos, när det är löst"
                          category="metadata"
                          text={`Beräknas klart: ${resultat.slutBeraknat}${resultat.minuterKvar != null ? ` (om ca ${resultat.minuterKvar} min)` : ""}`}
                          rationale="Svarar på den andra frågan: när är det löst? Klockslaget är lätt att komma ihåg och minuterna gör det konkret. 'Beräknas' visar ärligt att det är en prognos."
                        >
                          <p className="text-ink-secondary">
                            Beräknas klart: <strong className="text-ink">{resultat.slutBeraknat}</strong>
                            {resultat.minuterKvar != null && (
                              <span className="text-ink-muted"> (om ca {resultat.minuterKvar} min)</span>
                            )}
                          </p>
                        </Copy>
                      )}
                      {!harAvbrott && (
                        <Copy
                          label="Inget avbrott, förklaring"
                          category="reassurance"
                          text="Vi känner inte till några avbrott på din adress för el, fjärrvärme, gas eller fiber."
                          rationale="Bekräftar att alla fyra tjänster är kontrollerade. 'Vi känner inte till' är ärligt: felet kan finnas hemma, och då hjälper nästa steg nedanför."
                        >
                          <p className="text-ink-secondary">
                            Vi känner inte till några avbrott på din adress för el, fjärrvärme, gas eller fiber.
                          </p>
                        </Copy>
                      )}
                    </div>

                    {/* Påverkan per tjänst, med briefens ikoner */}
                    <Copy
                      label="Påverkan per tjänst"
                      category="metadata"
                      text={`Påverkan just nu: ${resultat.paverkan.map((p) => `${p.label} ${p.drabbad ? "Avbrott" : "Fungerar"}`).join(" / ")}`}
                      rationale="Ett ord per tjänst: 'Avbrott' eller 'Fungerar'. Vanliga ord i stället för 'Ej i drift' och 'OK'. Status visas både med färg och text, så ingen behöver tolka färgen."
                    >
                    <div className="px-5 pb-5">
                      <p className="text-[11px] uppercase tracking-wider font-medium text-ink-muted mb-2">
                        Påverkan just nu
                      </p>
                      <ul className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {resultat.paverkan.map((p) => (
                          <li
                            key={p.typ}
                            className={`flex items-start gap-2 p-3 rounded-md border ${
                              p.drabbad
                                ? "border-brand-highlight bg-brand-highlight/10"
                                : "border-border-subtle bg-surface/70"
                            }`}
                          >
                            <Icon
                              name={p.ikon}
                              size={20}
                              className={p.drabbad ? "text-brand-highlight" : "text-brand-accent"}
                              filled={p.drabbad}
                            />
                            <div className="min-w-0">
                              <p className="text-sm font-medium">{p.label}</p>
                              <p className={`text-xs ${p.drabbad ? "text-brand-highlight font-medium" : "text-ink-muted"}`}>
                                {p.drabbad ? "Avbrott" : "Fungerar"}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                    </Copy>

                    {/* Orsak och senaste uppdatering */}
                    {harAvbrott && (resultat.orsakEnkel || resultat.senasteUppdatering) && (
                      <Copy
                        label="Orsak och senaste uppdatering"
                        category="ton"
                        text={`Orsak: ${resultat.orsakEnkel ?? ""} / Senaste uppdatering: ${resultat.senasteUppdatering ?? ""}`}
                        rationale="Redaktören skriver orsaken i en eller två meningar utan teknisk jargong: vad som hänt och att vi arbetar med det. Uppdateringen börjar med klockslag, så man ser hur färsk den är."
                      >
                      <div className="px-5 pb-5 border-t border-border-subtle pt-4 space-y-3">
                        {resultat.orsakEnkel && (
                          <div>
                            <p className="text-[11px] uppercase tracking-wider font-medium text-ink-muted mb-1">
                              Orsak
                            </p>
                            <p className="text-sm text-ink-secondary leading-relaxed">{resultat.orsakEnkel}</p>
                          </div>
                        )}
                        {resultat.senasteUppdatering && (
                          <div>
                            <p className="text-[11px] uppercase tracking-wider font-medium text-ink-muted mb-1">
                              Senaste uppdatering
                            </p>
                            <p className="text-sm text-ink-secondary">{resultat.senasteUppdatering}</p>
                          </div>
                        )}
                      </div>
                      </Copy>
                    )}

                    <Copy
                      label="Statuskort, uppdateringstid"
                      category="metadata"
                      text={`Status uppdateras löpande · senast ${senastUppdaterad}`}
                      rationale="Visar att uppgifterna är färska och när de senast uppdaterades. Klockslaget gör det möjligt att se om det är värt att ladda om sidan."
                    >
                      <footer className="px-5 py-2.5 bg-surface/40 border-t border-border-subtle text-xs text-ink-muted">
                        Status uppdateras löpande · senast {senastUppdaterad}
                      </footer>
                    </Copy>
                  </div>
                )}
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 2. NÄSTA STEG: knappar som beror på läget ────────────── */
    {
      id: "nasta-steg",
      label: "Nästa steg (beror på läget)",
      variants: [
        {
          key: "kontextuell",
          label: "Beror på sökresultatet",
          render: () => {
            // Visa ingenting före sökningen. Ingressen säger redan vad som
            // händer när man fyllt i adressen, och ett tomt läge här skulle
            // bara upprepa det.
            if (!resultat) return null;

            return (
              <Annotation
                label="Nästa steg som beror på läget"
                audience="user"
                rationale="Vad man bör göra beror på svaret. Vid avbrott: få SMS när det är löst och läs tips. Utan avbrott: felsök hemma först och ring sedan. Den viktigaste knappen är alltid den som hjälper mest i just det läget."
              >
                <section className="py-6 border-t border-border-subtle">
                  <Copy
                    label="Nästa steg, rubrik"
                    category="rubrik"
                    text={harAvbrott ? "Vad gör jag nu?" : "Har du ändå problem hemma?"}
                    rationale="Rubriken är frågan besökaren ställer sig i just det läget. Utan avbrott bekräftar 'ändå' att problemet kan vara verkligt, även om nätet fungerar."
                  >
                    <h2 className="text-h4 font-medium mb-3">
                      {harAvbrott ? "Vad gör jag nu?" : "Har du ändå problem hemma?"}
                    </h2>
                  </Copy>

                  {harAvbrott ? (
                    <div className="grid sm:grid-cols-3 gap-3 max-w-reading">
                      {/* Viktigaste knappen: få SMS */}
                      {smsStatus === "idle" ? (
                        <Copy
                          label="Primär CTA vid avbrott, SMS"
                          category="cta"
                          text="Få SMS när det är löst"
                          rationale="Säger vad man får och när: ett SMS när det är löst. 'Prenumerera på SMS' beskriver bara en handling. Raden 'Gratis · Avsluta när du vill' svarar på de två vanligaste tvekarna, kostnad och bindning, innan de dyker upp."
                        >
                          <button
                            type="button"
                            onClick={() => setSmsStatus("prenumererad")}
                            className="p-4 rounded-md bg-brand-primary text-ink-onbrand text-left hover:opacity-90 flex flex-col gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
                          >
                            <Icon name="sms" size={22} />
                            <span className="font-medium">Få SMS när det är löst</span>
                            <span className="text-xs opacity-90">Gratis · Avsluta när du vill</span>
                          </button>
                        </Copy>
                      ) : (
                        <Copy
                          label="SMS, bekräftelse"
                          category="reassurance"
                          text="Du får SMS när det är löst / Vi skickar till numret som är kopplat till adressen."
                          rationale="Bekräftar med samma ord som knappen, så det är tydligt att det fungerade. Undertexten säger vart SMS:et går, så ingen undrar om de behöver lämna sitt nummer."
                        >
                          <div className="p-4 rounded-md bg-tint-info border border-brand-accent text-left flex flex-col gap-1.5">
                            <Icon name="check_circle" size={22} className="text-brand-accent" filled />
                            <span className="font-medium">Du får SMS när det är löst</span>
                            <span className="text-xs text-ink-secondary">
                              Vi skickar till numret som är kopplat till adressen.
                            </span>
                          </div>
                        </Copy>
                      )}

                      <Copy
                        label="Tips medan du väntar"
                        category="cta"
                        text="Tips medan du väntar / Det här kan du göra medan vi lagar felet."
                        rationale="Ger den som väntar något att göra. 'Medan du väntar' säger när tipsen passar, till skillnad från det vaga 'Tips just nu'."
                      >
                        <a
                          href="#felsokning"
                          className="p-4 rounded-md border border-border-strong text-brand-primary text-left hover:bg-tint-info flex flex-col gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                        >
                          <Icon name="tips_and_updates" size={22} className="text-brand-accent" />
                          <span className="font-medium">Tips medan du väntar</span>
                          <span className="text-xs text-ink-secondary">
                            Det här kan du göra medan vi lagar felet.
                          </span>
                        </a>
                      </Copy>

                      <Copy
                        label="Ring vid akut behov"
                        category="cta"
                        text="Ring bara vid akut behov / 042-490 32 00 · dygnet runt"
                        rationale="Ovanligt för en knapp: den ber besökaren att bara ringa om det verkligen behövs. Numret syns, men SMS och tips kommer först. 'Akut behov' anger undantaget utan att skrämma bort den som behöver hjälp."
                      >
                        <a
                          href="tel:0424903200"
                          className="p-4 rounded-md border border-border-strong text-brand-primary text-left hover:bg-tint-info flex flex-col gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                        >
                          <Icon name="call" size={22} className="text-brand-accent" />
                          <span className="font-medium">Ring bara vid akut behov</span>
                          <span className="text-xs text-ink-secondary">
                            042-490 32 00 · dygnet runt
                          </span>
                        </a>
                      </Copy>
                    </div>
                  ) : (
                    <Copy
                      label="Utan avbrott, felsök först och ring sedan"
                      category="cta"
                      text="Felsök hemma först / De flesta strömavbrott hemma beror på en säkring som löst ut. / Ring om felsökningen inte hjälper / 042-490 32 00 · dygnet runt"
                      rationale="När nätet fungerar ligger felet oftast hemma. Knapparna står i den ordning man bör ta dem: felsök först, ring sedan. Undertexten ger skälet att börja med felsökningen."
                    >
                    <div className="grid sm:grid-cols-2 gap-3 max-w-reading">
                      {/* Inget avbrott: felsök först, ring sedan */}
                      <a
                        href="#felsokning"
                        className="p-4 rounded-md bg-brand-primary text-ink-onbrand text-left hover:opacity-90 flex flex-col gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
                      >
                        <Icon name="settings_suggest" size={22} />
                        <span className="font-medium">Felsök hemma först</span>
                        <span className="text-xs opacity-90">
                          De flesta strömavbrott hemma beror på en säkring som löst ut.
                        </span>
                      </a>

                      <a
                        href="tel:0424903200"
                        className="p-4 rounded-md border border-border-strong text-brand-primary text-left hover:bg-tint-info flex flex-col gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                      >
                        <Icon name="call" size={22} className="text-brand-accent" />
                        <span className="font-medium">Ring om felsökningen inte hjälper</span>
                        <span className="text-xs text-ink-secondary">
                          042-490 32 00 · dygnet runt
                        </span>
                      </a>
                    </div>
                    </Copy>
                  )}
                </section>
              </Annotation>
            );
          },
        },
      ],
    },

    /* ─── 3. FELSÖKNING: innan du ringer ───────────────────────── */
    {
      id: "felsokning",
      label: "Felsökning innan du ringer",
      variants: [
        {
          key: "stepper",
          label: "Guide med stegcirklar (standard)",
          render: () => renderFelsokningWizard("stepper"),
        },
        {
          key: "bar",
          label: "Guide med stapel (kompakt)",
          render: () => renderFelsokningWizard("bar"),
        },
        {
          key: "chips",
          label: "Guide med stegknappar",
          render: () => renderFelsokningWizard("chips"),
        },
        {
          key: "statisk",
          label: "Checklista med fem steg",
          render: () => (
            <Annotation
              label="Felsökning som checklista"
              audience="design"
              rationale="Ett alternativ till guiden för den som vill se alla steg på en gång, till exempel med skärmläsare. Fungerar även om sidan inte laddats helt."
            >
              <section id="felsokning" className="py-10 border-t border-border-subtle">
                <Copy
                  label="Checklista, rubrik"
                  category="rubrik"
                  text="Testa det här innan du ringer"
                  rationale="Samma rubrik som i guiden, så sektionen känns igen oavsett variant."
                >
                  <h2 className="text-h3 font-medium mb-2">Testa det här innan du ringer</h2>
                </Copy>
                <Copy
                  label="Checklista, ingress"
                  category="ton"
                  text="Gå igenom stegen i tur och ordning. De flesta problem löser du på en minut."
                  rationale="Säger hur listan ska användas och hur lång tid det tar. Tidslöftet gör det lättare att börja."
                >
                  <p className="text-ink-secondary mb-6 max-w-reading">
                    Gå igenom stegen i tur och ordning. De flesta problem löser du på en minut.
                  </p>
                </Copy>
                <Copy
                  label="Checklista, steg"
                  category="ton"
                  text="Har grannarna också avbrott? / Kolla jordfelsbrytaren / Kolla säkringarna / Kolla att räkningen är betald / Gör en felanmälan"
                  rationale="Varje steg börjar med en uppmaning eller en fråga, i den ordning som löser flest problem först. Förklaringen under säger var man hittar saken och vad man gör sedan."
                >
                <ol className="space-y-4 max-w-reading">
                  {[
                    { t: "Har grannarna också avbrott?", d: "Om ja är det troligen ett avbrott i elnätet. Se statusen ovan eller gör en felanmälan." },
                    { t: "Kolla jordfelsbrytaren", d: "Den sitter i elcentralen. Har den löst ut, slå tillbaka den." },
                    { t: "Kolla säkringarna", d: "Slå tillbaka säkringar som har löst ut. Händer det ofta, kontakta en elektriker." },
                    { t: "Kolla att räkningen är betald", d: "En obetald räkning kan leda till att elen stängs av. Du ser dina fakturor på Mina sidor." },
                    { t: "Gör en felanmälan", d: "Hjälper inget av det här? Ring 042-490 32 00, dygnet runt." },
                  ].map((s, i) => (
                    <li key={s.t} className="flex gap-4">
                      <span className="shrink-0 w-8 h-8 rounded-full bg-brand-primary text-white grid place-items-center font-bold text-sm">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-medium">{s.t}</h3>
                        <p className="text-sm text-ink-secondary">{s.d}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                </Copy>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 4. FELANMÄLAN: telefon som sista steg ──────────────── */
    {
      id: "felanmalan",
      label: "Felanmälan",
      variants: [
        {
          key: "telefon-primar",
          label: "Telefon först, dygnet runt",
          render: () => (
            <Annotation
              label="Felanmälan som sista steg"
              audience="user"
              rationale="Ligger efter felsökningen, så att besökaren har hunnit testa själv. Att vi svarar dygnet runt skapar trygghet. Listan över vad man ska ha till hands gör samtalet kortare för både kunden och oss."
            >
              <section className="py-10 border-t border-border-subtle">
                <div className="rounded-lg bg-brand-primary text-white p-6 sm:p-8 grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <Copy
                      label="Felanmälan, sista utväg"
                      category="rubrik"
                      text="Fortfarande fel?"
                      rationale="En kort fråga i stället för ett påstående. 'Fortfarande' visar att vi vet att besökaren redan har försökt. En rubrik som 'Gör en felanmälan' låter mer som en myndighet."
                    >
                      <h2 className="text-h2 text-white mb-2">Fortfarande fel?</h2>
                    </Copy>
                    <Copy
                      label="Felanmälan, brödtext"
                      category="ton"
                      text="Hjälpte inte felsökningen? Ring oss. Vi svarar dygnet runt om avbrott och akuta fel i elnätet."
                      rationale="Kort uppmaning och ett löfte om när vi svarar. 'Akuta fel i elnätet' avgränsar vad numret är till för, utan att skrämma."
                    >
                      <p className="opacity-90 mb-4 max-w-reading">
                        Hjälpte inte felsökningen? Ring oss. Vi svarar dygnet runt
                        om avbrott och akuta fel i elnätet.
                      </p>
                    </Copy>
                    <Copy
                      label="Felanmälan, telefonnummer"
                      category="cta"
                      text="042-490 32 00 / Dygnet runt · alla dagar"
                      rationale="Numret är själva knappen, så man kan ringa direkt från mobilen eller skriva av det. Öppettiden under tar bort tvekan om det är för sent att ringa."
                    >
                      <div>
                        <a
                          href="tel:0424903200"
                          className="inline-flex items-center gap-3 bg-white text-brand-primary font-medium px-6 py-3.5 rounded hover:opacity-90 text-lg"
                        >
                          <Icon name="call" size={22} />
                          042-490 32 00
                        </a>
                        <p className="text-xs opacity-80 mt-2">Dygnet runt · alla dagar</p>
                      </div>
                    </Copy>
                  </div>
                  <Copy
                    label="Felanmälan, ha till hands"
                    category="reassurance"
                    text="Ha det här till hands när du ringer: Din adress (gata och postnummer) / Fastighetsbeteckning, om du har den / Vad som inte fungerar (el, värme, gas, fiber) / Om grannarna också är drabbade"
                    rationale="En kort lista som gör samtalet snabbare. 'Om du har den' visar att fastighetsbeteckning inte är ett krav, så ingen avstår från att ringa för att den saknas."
                  >
                  <div className="bg-white/10 rounded-md p-5">
                    <p className="text-xs uppercase tracking-wider font-medium mb-3 opacity-80">
                      Ha det här till hands när du ringer
                    </p>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Din adress (gata och postnummer)",
                        "Fastighetsbeteckning, om du har den",
                        "Vad som inte fungerar (el, värme, gas, fiber)",
                        "Om grannarna också är drabbade",
                      ].map((s) => (
                        <li key={s} className="flex items-center gap-2">
                          <Icon name="check" size={16} />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  </Copy>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 5. FÖRDJUPNING: karta, pågående, planerade och avklarade */
    {
      id: "fordjupning",
      label: "Fördjupning: karta, pågående och historik",
      variants: [
        {
          key: "tabs",
          label: "Flikar, kartan visas först",
          render: () => (
            <Annotation
              label="Fördjupning i flikar"
              audience="design"
              rationale="Kartan ger överblick men är inte till för att fatta beslut. Därför ligger den, tillsammans med pågående, planerade och avklarade avbrott, i flikar under svaret för den egna adressen. Då konkurrerar de inte med det viktigaste."
            >
              <section className="py-10 border-t border-border-subtle">
                <Copy
                  label="Fördjupning, rubrik"
                  category="rubrik"
                  text="Översikt och historik"
                  rationale="Säger att det här är för den som vill se helheten, inte svaret för den egna adressen. Neutral rubrik för sekundärt innehåll."
                >
                  <h2 className="text-h3 font-medium mb-2">Översikt och historik</h2>
                </Copy>
                <Copy
                  label="Fördjupning, ingress"
                  category="ton"
                  text="Se kartan över hela elnätet och avbrott på andra adresser än din."
                  rationale="Säger vad som finns här och vem det passar. Den som bara bryr sig om sin egen adress förstår att hen kan hoppa över sektionen."
                >
                  <p className="text-ink-secondary mb-5 max-w-reading">
                    Se kartan över hela elnätet och avbrott på andra adresser än din.
                  </p>
                </Copy>

                <Copy
                  label="Fördjupning, flikar"
                  category="metadata"
                  text="Karta / Pågående / Planerade / Avklarade"
                  rationale="Ett ord per flik, och antalet inom parentes visar direkt om det finns något att titta på. Samma ord som statusmärket i statuskortet."
                >
                <div
                  role="tablist"
                  aria-label="Fördjupning"
                  className="flex gap-1 border-b border-border-subtle mb-5 overflow-x-auto"
                >
                  {[
                    { id: "karta" as const, label: "Karta", count: pagaende.length },
                    { id: "pagaende" as const, label: "Pågående", count: pagaende.length },
                    { id: "planerade" as const, label: "Planerade", count: planerat.length },
                    { id: "avklarade" as const, label: "Avklarade", count: avslutat.length },
                  ].map((t) => {
                    const active = fordjupningTab === t.id;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        role="tab"
                        aria-selected={active}
                        id={`fordjupning-tab-${t.id}`}
                        aria-controls={`fordjupning-panel-${t.id}`}
                        onClick={() => setFordjupningTab(t.id)}
                        className={`px-4 py-2.5 text-sm font-medium border-b-2 -mb-px whitespace-nowrap focus:outline-none focus-visible:bg-tint-info ${
                          active
                            ? "border-brand-accent text-brand-primary"
                            : "border-transparent text-ink-secondary hover:text-ink hover:bg-tint-info/50"
                        }`}
                      >
                        {t.label}
                        <span className="ml-1 text-xs opacity-70">({t.count})</span>
                      </button>
                    );
                  })}
                </div>
                </Copy>

                {fordjupningTab === "karta" && (
                  <div role="tabpanel" id="fordjupning-panel-karta" aria-labelledby="fordjupning-tab-karta">
                    <MapPlaceholder avbrott={pagaende} />
                    <Copy
                      label="Karta, förklaring"
                      category="ton"
                      text="Kartan ger en överblick. Vill du veta vad som gäller för din adress, sök på den ovan. Kartan, listan och SMS-tjänsten visar samma uppgifter."
                      rationale="Påminner om att sökningen ger det säkraste svaret för den egna adressen. Att alla kanaler visar samma uppgifter skapar förtroende. Systemnamn hör inte hemma i texten."
                    >
                      <p className="text-xs text-ink-muted mt-3 max-w-reading">
                        Kartan ger en överblick. Vill du veta vad som gäller för din adress, sök på den ovan.
                        Kartan, listan och SMS-tjänsten visar samma uppgifter.
                      </p>
                    </Copy>
                  </div>
                )}

                {fordjupningTab === "pagaende" && (
                  <div role="tabpanel" id="fordjupning-panel-pagaende" aria-labelledby="fordjupning-tab-pagaende">
                    {pagaende.length === 0 ? (
                      <Copy
                        label="Tomt läge, pågående"
                        category="reassurance"
                        text="Inga pågående avbrott just nu."
                        rationale="Ett lugnande besked när listan är tom. 'Just nu' visar att läget kan ändras."
                      >
                        <p className="text-ink-muted italic">Inga pågående avbrott just nu.</p>
                      </Copy>
                    ) : (
                      <ul className="space-y-3">
                        {pagaende.map((a) => {
                          const isOpen = openAvbrott === a.id;
                          const meta = STATUS_META[a.status];
                          return (
                            <li key={a.id}>
                              <article
                                className={`rounded-md border-2 bg-surface overflow-hidden transition-colors ${
                                  isOpen ? "border-brand-highlight" : "border-border-subtle hover:border-brand-highlight/60"
                                }`}
                              >
                                <button
                                  type="button"
                                  onClick={() => setOpenAvbrott(isOpen ? null : a.id)}
                                  className="w-full text-left px-5 py-4 flex items-center gap-3"
                                  aria-expanded={isOpen}
                                >
                                  <span className={`w-2.5 h-2.5 rounded-full ${meta.dotColor} animate-pulse`} />
                                  <div className="flex-1 min-w-0">
                                    <h3 className="font-medium">{a.rubrik}</h3>
                                    <p className="text-sm text-ink-secondary">
                                      {a.omrade} · {a.berordaKunder} kunder · {TYP_LABEL[a.typ]}
                                    </p>
                                  </div>
                                  <span className="hidden sm:block text-right text-sm">
                                    <span className="block text-ink-muted text-xs">Beräknas klart</span>
                                    <span className="font-medium">{a.slutBeraknat?.split(" ")[1] ?? "Okänt"}</span>
                                  </span>
                                  <Icon
                                    name="expand_more"
                                    size={20}
                                    className={`text-ink-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                                  />
                                </button>
                                {isOpen && (
                                  <div className="px-5 pb-5 border-t border-border-subtle pt-4">
                                    <p className="text-sm text-ink-secondary mb-4">{a.beskrivning}</p>
                                    {a.uppdateringar && a.uppdateringar.length > 0 && (
                                      <div>
                                        <h4 className="text-xs uppercase tracking-wider font-medium text-ink-muted mb-2">
                                          Uppdateringar
                                        </h4>
                                        <ol className="space-y-2">
                                          {a.uppdateringar.map((u, i) => (
                                            <li key={i} className="flex gap-3">
                                              <span
                                                className={`shrink-0 w-2 h-2 rounded-full mt-1.5 ${
                                                  i === 0 ? "bg-brand-highlight" : "bg-border-strong"
                                                }`}
                                              />
                                              <div className="pb-1">
                                                <span className="text-xs text-ink-muted font-medium">{u.tid}</span>
                                                <p className="text-sm">{u.text}</p>
                                              </div>
                                            </li>
                                          ))}
                                        </ol>
                                      </div>
                                    )}
                                  </div>
                                )}
                              </article>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                )}

                {fordjupningTab === "planerade" && (
                  <div role="tabpanel" id="fordjupning-panel-planerade" aria-labelledby="fordjupning-tab-planerade">
                    {planerat.length === 0 ? (
                      <Copy
                        label="Tomt läge, planerade"
                        category="reassurance"
                        text="Inga planerade arbeten den här veckan."
                        rationale="Säger vilken period det gäller, så besökaren vet att det kan komma arbeten längre fram."
                      >
                        <p className="text-ink-muted italic">Inga planerade arbeten den här veckan.</p>
                      </Copy>
                    ) : (
                      <ul className="divide-y divide-border-subtle rounded-md border border-border-subtle bg-surface">
                        {planerat.map((a) => (
                          <li key={a.id} className="p-4 flex flex-wrap items-start gap-4">
                            <div className="shrink-0 w-[72px] text-center">
                              <p className="text-xs uppercase text-ink-muted font-medium">
                                {new Date(a.start.replace(" ", "T")).toLocaleDateString("sv-SE", { day: "numeric", month: "short" })}
                              </p>
                              <p className="text-sm text-ink-secondary">{a.start.split(" ")[1]?.slice(0, 5)}</p>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium">{a.rubrik}</h3>
                              <p className="text-sm text-ink-secondary">{a.omrade} · {a.berordaKunder} kunder</p>
                              <p className="text-sm text-ink-secondary mt-1">{a.beskrivning}</p>
                            </div>
                            <span className="text-xs uppercase tracking-wider font-medium px-2 py-1 rounded bg-tint-notice text-brand-primary">
                              {TYP_LABEL[a.typ]}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {fordjupningTab === "avklarade" && (
                  <div role="tabpanel" id="fordjupning-panel-avklarade" aria-labelledby="fordjupning-tab-avklarade">
                    {avslutat.length === 0 ? (
                      <Copy
                        label="Tomt läge, avklarade"
                        category="reassurance"
                        text="Inga avbrott har avslutats de senaste 7 dagarna."
                        rationale="Anger tidsperioden så att den tomma listan inte ser ut som ett fel."
                      >
                        <p className="text-ink-muted italic">Inga avbrott har avslutats de senaste 7 dagarna.</p>
                      </Copy>
                    ) : (
                      <ul className="divide-y divide-border-subtle rounded-md border border-border-subtle bg-surface">
                        {avslutat.map((a) => (
                          <li key={a.id} className="p-4 flex flex-wrap items-center gap-3 text-sm">
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            <div className="flex-1 min-w-0">
                              <p className="font-medium">{a.rubrik}</p>
                              <p className="text-ink-muted text-xs">
                                {a.omrade} · {a.berordaKunder} kunder · {a.start} → {a.slutFaktiskt}
                              </p>
                            </div>
                            <span className="text-xs uppercase tracking-wider font-medium px-2 py-0.5 rounded bg-tint-info text-brand-primary">
                              {TYP_LABEL[a.typ]}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 6. STÖD: ersättning, FAQ och andra kanaler ─────────── */
    {
      id: "stod",
      label: "Stöd: ersättning, FAQ och SMS",
      variants: [
        {
          key: "kompakt",
          label: "Fyra kompakta länkar",
          render: () => (
            <Annotation
              label="Bra att veta, kompakta genvägar"
              audience="redaktör"
              rationale="Här länkar du till fördjupning om ersättning, SMS-tjänsten, vanliga frågor och grävarbeten. Håll dig till fyra kort med en rubrik och en mening var. Detaljerna hör hemma på respektive undersida."
            >
              <section className="py-10 border-t border-border-subtle">
                <Copy
                  label="Bra att veta, rubrik"
                  category="rubrik"
                  text="Bra att veta"
                  rationale="Neutral rubrik som visar att innehållet är extra, inte nödvändigt för att lösa problemet just nu."
                >
                  <h2 className="text-h4 font-medium mb-4">Bra att veta</h2>
                </Copy>
                <Copy
                  label="Bra att veta, kort"
                  category="faq"
                  text="Ersättning / SMS om avbrott / Vanliga frågor / Här gräver vi"
                  rationale="Kortrubrikerna är de ord kunderna söker på. Meningen under säger vad man får veta, till exempel när man har rätt till ersättning, så man vet om det är värt att klicka."
                >
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                  <a href="#" className="group p-4 rounded-md border border-border-subtle bg-surface hover:border-brand-accent hover:shadow-sm flex flex-col gap-1.5">
                    <Icon name="paid" size={20} className="text-brand-accent" />
                    <span className="font-medium group-hover:text-brand-accent">Ersättning</span>
                    <span className="text-xs text-ink-secondary">Har strömmen varit borta i mer än 12 timmar kan du ha rätt till ersättning.</span>
                  </a>
                  <a href="#" className="group p-4 rounded-md border border-border-subtle bg-surface hover:border-brand-accent hover:shadow-sm flex flex-col gap-1.5">
                    <Icon name="sms" size={20} className="text-brand-accent" />
                    <span className="font-medium group-hover:text-brand-accent">SMS om avbrott</span>
                    <span className="text-xs text-ink-secondary">Anmäl ditt nummer och få SMS vid avbrott på din adress.</span>
                  </a>
                  <a href="#" className="group p-4 rounded-md border border-border-subtle bg-surface hover:border-brand-accent hover:shadow-sm flex flex-col gap-1.5">
                    <Icon name="quiz" size={20} className="text-brand-accent" />
                    <span className="font-medium group-hover:text-brand-accent">Vanliga frågor</span>
                    <span className="text-xs text-ink-secondary">Om anvisat avtal, elnät och elhandel och vem som ansvarar för vad.</span>
                  </a>
                  <a href="#" className="group p-4 rounded-md border border-border-subtle bg-surface hover:border-brand-accent hover:shadow-sm flex flex-col gap-1.5">
                    <Icon name="construction" size={20} className="text-brand-accent" />
                    <span className="font-medium group-hover:text-brand-accent">Här gräver vi</span>
                    <span className="text-xs text-ink-secondary">Pågående och kommande grävarbeten.</span>
                  </a>
                </div>
                </Copy>
              </section>
            </Annotation>
          ),
        },
      ],
    },
  ];

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6">
      <PageBrief
        kategori="Avbrottsinformation (Sidtyp 9, beslutsstöd i realtid)"
        syfte="Svara på 'Är jag påverkad?' och 'När är det löst?' på under fem sekunder. Sidan börjar med adressen och ger ett samlat statuskort för el, fjärrvärme, gas och fiber. Därefter kommer nästa steg som passar läget, och felsökning före kontakt. Karta och historik ligger längre ner."
        malgrupp="Kunder med ett akut problem, ofta i mobilen och stressade, med bara några sekunders tålamod. Även fastighetsförvaltare och personal som följer läget."
        primarHandling="Skriva sin adress eller använda sin position, se statuskortet och sedan välja rätt nästa steg: få SMS, felsöka själv eller ringa."
        ton="Saklig, rak och öppen om prognoser och osäkerhet. Inga säljfraser. Avbrott markeras med varningsfärg, normalt läge med lugn färg."
      />

      <Annotation
        label="Inloggning alltid synlig"
        audience="design"
        rationale="Den som redan är kund kan logga in på Mina sidor uppe till höger, där de flesta letar. Inloggningen tar ingen plats från adressfältet, som är sidans viktigaste del."
      >
      <div className="flex items-center justify-between pt-6">
        <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">
          ← Översikt
        </Link>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-sm text-ink-secondary hover:text-brand-accent"
        >
          <Icon name="person" size={16} />
          <Copy
            label="Inloggningslänk"
            category="cta"
            text="Logga in på Mina sidor"
            rationale="Verb plus plats: besökaren vet vart länken leder. Samma formulering som på övriga sidor."
          >
            Logga in på Mina sidor
          </Copy>
        </a>
      </div>
      </Annotation>

      <nav aria-label="Breadcrumb" className="text-xs text-ink-muted mt-4 mb-2">
        <ol className="flex gap-1">
          <li><a href="#" className="hover:text-brand-accent">Privat</a></li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="font-medium text-ink">Avbrottsinformation</li>
        </ol>
      </nav>

      <BlockList pageId="avbrott-ny" blocks={blocks} />
    </div>
  );
}

/* ─── Helpers ───────────────────────────────────────────────────── */

/**
 * Schematisk karta för prototypen, inte en riktig karta. Visar nätets
 * område med markörer för pågående avbrott. I skarp drift ersätts den av
 * Trimble-kartan med samma funktion: klickbara markörer leder till samma
 * statuskort som adressökningen ger.
 *
 * Markörerna är placerade för hand (Helsingborg med omnejd). I skarp drift
 * levererar DMS koordinaterna som kartan visar.
 */
function MapPlaceholder({ avbrott }: { avbrott: typeof pagaende }) {
  const markerPositions: { top: string; left: string }[] = [
    { top: "56%", left: "11%" },  // Söder / centrala Helsingborg
    { top: "32%", left: "16%" },  // Stattena / Dalhem
  ];

  return (
    <div className="rounded-md border border-border-subtle bg-tint-info overflow-hidden">
      <div
        className="relative w-full"
        style={{ aspectRatio: "3 / 2" }}
        role="img"
        aria-label={`Karta över Helsingborg-området med ${avbrott.length} pågående avbrott markerade`}
      >
        <img
          src="/map-placeholder.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        {avbrott.map((a, i) => {
          const pos = markerPositions[i] ?? {
            top: `${30 + (i * 12) % 50}%`,
            left: `${20 + (i * 14) % 60}%`,
          };
          return (
            <div
              key={a.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ top: pos.top, left: pos.left }}
              title={`${a.rubrik}, ${a.omrade}`}
            >
              <span
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-brand-highlight/25 animate-pulse"
                aria-hidden="true"
              />
              <span
                className="relative block w-4 h-4 rounded-full bg-brand-highlight ring-[3px] ring-white shadow-md"
                aria-hidden="true"
              />
            </div>
          );
        })}
      </div>
      <div className="px-4 py-2.5 bg-surface/70 border-t border-border-subtle flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
        <span className="inline-flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-brand-highlight" />
          Pågående avbrott ({avbrott.length})
        </span>
        <span className="inline-flex items-center gap-1.5 text-ink-muted">
          <Icon name="info" size={14} />
          Prototyp. Den riktiga kartan visar var avbrotten finns.
        </span>
      </div>
    </div>
  );
}
