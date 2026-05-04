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
 * SIDTYP 9, Avbrottsinformation
 *
 * Skifte från informationssida → beslutsstöd i realtid. Hela flödet styrs
 * av två frågor: "Är jag påverkad?" och "När är det löst?".
 *
 * Fem principer från UX-briefen:
 *   1. Adress först, sidan startar i adressfrågan, inte i en hero-text.
 *   2. Ett tydligt svar, statuskort med påverkan per infrastruktur
 *      (el, värme, gas, fiber), prognos och förenklad orsak.
 *   3. Tydliga nästa steg, kontextuella CTAs som följer av status:
 *      pågående → följ SMS + läs tips · inget → felsök själv först.
 *   4. Kartan som sekundär, under "fördjupning", inte huvudflöde.
 *   5. Enad datakälla, karta, lista och SMS visar samma status.
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
  senasteUppdatering: "08:45, Reparationsteam på plats, kabelfelet lokaliserat",
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

/* ─── Felsökning-wizard (oförändrad sedan v1) ─────────────────────── */

type Diagnos = { id: string; fraga: string; ja: string; nej: string };

const DIAGNOS_STEG: Diagnos[] = [
  { id: "grannar", fraga: "Har dina grannar också strömavbrott?", ja: "natverk", nej: "propp" },
  { id: "natverk", fraga: "Då är det ett nätavbrott. Står avbrottet i listan ovan?", ja: "listad", nej: "rapportera" },
  { id: "propp", fraga: "Har du kontrollerat säkringarna och jordfelsbrytaren?", ja: "proppar-ok", nej: "propp-check" },
  { id: "propp-check", fraga: "Leta upp elcentralen och slå tillbaka utlösta säkringar. Fungerar det nu?", ja: "fungerar", nej: "rapportera" },
  { id: "proppar-ok", fraga: "Har du betalat senaste elräkningen?", ja: "rapportera", nej: "obetald" },
];

const DIAGNOS_SLUT: Record<string, { rubrik: string; text: string; cta?: { label: string; href: string; primary?: boolean } }> = {
  listad: {
    rubrik: "Då vet vi om det.",
    text: "Vi arbetar med att få tillbaka strömmen. Se tidslinjen för uppdateringar. Du behöver inte göra något mer.",
  },
  fungerar: {
    rubrik: "Bra, då var det en utlöst säkring.",
    text: "Händer det ofta är det värt att låta en elektriker gå igenom din elcentral.",
  },
  obetald: {
    rubrik: "Kontakta kundservice.",
    text: "Vid obetald räkning kan leveransen ha stängts av. Logga in på Mina sidor eller ring kundservice.",
    cta: { label: "Till Mina sidor", href: "#" },
  },
  rapportera: {
    rubrik: "Gör en felanmälan.",
    text: "Ring 042-490 32 00, dygnet runt. Ha din adress och fastighetsbeteckning redo.",
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

  // Flytta fokus till statuskortet när användaren har fått ett svar
  //, skärmläsare hör resultatet, tangentbordsanvändare landar i nästa region.
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
   * Felsökningsguidens body, delad mellan tre block-varianter som bara
   * byter progress-header (stepper/bar/chips). Samma WizardProgress-grammatik
   * som kontaktflödet i Kundservice-sidtypen, så guides känns enhetliga.
   */
  function renderFelsokningWizard(progressVariant: WizardVariant) {
    const slut = diagnosSteg.startsWith("slut:") ? DIAGNOS_SLUT[diagnosSteg.replace("slut:", "")] : null;
    const aktiv = DIAGNOS_STEG.find((s) => s.id === diagnosSteg);
    const wizardCurrent = slut ? 2 : 1;

    return (
      <Annotation
        label="Felsökning, wizard, minskar felanmälningar"
        audience="user"
        rationale="De flesta 'strömavbrott' är utlösta säkringar eller jordfelsbrytare. Att fråga grannar först → kolla säkringar → ring som sista utväg löser majoriteten utan att belasta KC. Briefens princip 6.1: felsökning FÖRE kontakt, explicit. Progress-header är delad med kontaktflödet så guides känns enhetliga."
      >
        <section id="felsokning" className="py-10 border-t border-border-subtle">
          <WizardProgress
            variant={progressVariant}
            title="Testa det här innan du ringer"
            subtitle="De flesta strömproblem beror på utlösta säkringar eller jordfelsbrytare. Guiden tar en minut och sparar ofta ett samtal."
            steps={[
              { key: "fragor", label: "Frågor", hint: aktiv && !slut ? `Fråga ${diagnosHistorik.length + 1}` : undefined },
              { key: "resultat", label: "Resultat" },
            ]}
            current={wizardCurrent}
          />

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
                <p className="font-medium text-h5 mb-4">{aktiv.fraga}</p>
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
                <h3 className="font-medium text-h5 mb-2">{slut.rubrik}</h3>
                <p className="text-sm text-ink-secondary mb-4 leading-relaxed">{slut.text}</p>
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
    /* ─── 1. START, Adress först → statuskort ──────────────────── */
    {
      id: "start",
      label: "Adress först → statuskort",
      variants: [
        {
          key: "unified",
          label: "Sök adress + statuskort i en yta",
          render: () => (
            <Annotation
              label="Adress först"
              audience="user"
              rationale="Briefens princip 1: sidan startar i adressfrågan. 'Är jag påverkad?' är frågan, adressfältet är sättet att få svar. Ingen generell hero-text före, ingen lista först. En klick från sökträff till fullt statuskort."
            >
              <section className="pt-6 pb-8">
                {!resultat && (
                  <Copy
                    label="H1, användarens fråga"
                    category="rubrik"
                    text="Är ditt hem påverkat av ett avbrott?"
                    rationale="Direkt fråga i användarens språk. 'Avbrottsinformation' säger vad sidan är; 'Är ditt hem påverkat?' säger vad den svarar på."
                  >
                    <h1 className="text-h1 leading-tight mb-2">Är ditt hem påverkat av ett avbrott?</h1>
                  </Copy>
                )}
                {!resultat && (
                  <Copy
                    label="Hero-lede, förklarar scope"
                    category="reassurance"
                    text="Skriv in din adress eller använd din position, vi visar status för el, fjärrvärme, gas och fiber på en gång."
                    rationale="Sätter förväntan i två dimensioner: hur man kommer igång (input eller geoposition) och vad man får tillbaka (alla fyra infrastruktur-typer i ett svar, inte 'el' separat). Klargör att sidan hanterar mer än strömavbrott innan användaren börjar gissa."
                  >
                    <p className="text-lede text-ink-secondary mb-5 max-w-reading">
                      Skriv in din adress eller använd din position, vi visar status för el, fjärrvärme, gas och fiber på en gång.
                    </p>
                  </Copy>
                )}

                {/* Adress-input, alltid synlig, blir smalare när resultat finns */}
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
                      placeholder="Ex. Storgatan 12 eller 252 25"
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

                {!resultat && (
                  <p className="text-xs text-ink-muted">
                    Tips: prova <button type="button" onClick={() => sok("252 25")} className="text-brand-accent underline underline-offset-2 hover:no-underline">252 25</button> för att se ett avbrott i demon, annars "inget avbrott".
                  </p>
                )}

                {/* STATUSKORT, briefens princip 2 */}
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
                    {/* Header-rad: status-badge + adress + ändra */}
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
                        Ändra
                      </button>
                    </header>

                    {/* Statussvar, stor rubrik */}
                    <div className="px-5 py-5">
                      <Copy
                        label="Statusrubrik, binärt svar"
                        category="rubrik"
                        text={
                          harAvbrott
                            ? `${antalDrabbade} av 4 infrastrukturer påverkas just nu`
                            : "Allt fungerar normalt"
                        }
                        rationale="Konkret svar, inte beskrivning. Siffran först när det finns problem, det är det läsaren letar efter."
                      >
                        <h2 className="text-h3 leading-tight mb-1">
                          {harAvbrott
                            ? `${antalDrabbade} av 4 infrastrukturer påverkas just nu`
                            : "Allt fungerar normalt"}
                        </h2>
                      </Copy>
                      {harAvbrott && resultat.slutBeraknat && (
                        <p className="text-ink-secondary">
                          Beräknad klar: <strong className="text-ink">{resultat.slutBeraknat}</strong>
                          {resultat.minuterKvar != null && (
                            <span className="text-ink-muted"> (om ca {resultat.minuterKvar} min)</span>
                          )}
                        </p>
                      )}
                      {!harAvbrott && (
                        <p className="text-ink-secondary">
                          Inga kända avbrott på din adress för el, fjärrvärme, gas eller fiber.
                        </p>
                      )}
                    </div>

                    {/* Påverkan per infrastruktur, briefens ikoner */}
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
                                {p.drabbad ? "Ej i drift" : "OK"}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Orsak + senaste uppdatering */}
                    {harAvbrott && (resultat.orsakEnkel || resultat.senasteUppdatering) && (
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
                    )}

                    <footer className="px-5 py-2.5 bg-surface/40 border-t border-border-subtle text-xs text-ink-muted">
                      Status uppdateras i realtid · senast {senastUppdaterad}
                    </footer>
                  </div>
                )}
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 2. NÄSTA STEG, kontextuell CTA-rad ─────────────────── */
    {
      id: "nasta-steg",
      label: "Nästa steg (kontextuellt)",
      variants: [
        {
          key: "kontextuell",
          label: "Beror på sök-status",
          render: () => {
            // Innan sökresultat, rendera ingenting. Hero:ns lede säger redan
            // vad som händer efter att man fyllt i adressen; ett tomt-state
            // här skulle bara upprepa det.
            if (!resultat) return null;

            return (
              <Annotation
                label="Nästa steg, styrda av status"
                audience="user"
                rationale="Briefens princip 3: nästa steg beror på status. Vid avbrott → SMS + tips. Inget avbrott → felsök själv först, därefter ring. Primär-CTA är alltid den insats som ger mest värde för det tillståndet."
              >
                <section className="py-6 border-t border-border-subtle">
                  <h2 className="text-h4 font-medium mb-3">
                    {harAvbrott ? "Vad gör jag nu?" : "Har du ändå problem hemma?"}
                  </h2>

                  {harAvbrott ? (
                    <div className="grid sm:grid-cols-3 gap-3 max-w-reading">
                      {/* PRIMÄR: Prenumerera på SMS */}
                      {smsStatus === "idle" ? (
                        <Copy
                          label="Primär CTA vid avbrott, SMS"
                          category="cta"
                          text="Få SMS när det är löst"
                          rationale="Verbformulering med utfall: 'Få SMS när det är löst', användaren får en sak, vid en konkret tidpunkt. 'Prenumerera på SMS' skulle vara en transaktion, inte ett utfall. Pair: 'Gratis · Avregistrera när som helst' adresserar de två vanligaste tvekansfrågorna (kostnad, kontroll) innan de uppstår."
                        >
                          <button
                            type="button"
                            onClick={() => setSmsStatus("prenumererad")}
                            className="p-4 rounded-md bg-brand-primary text-ink-onbrand text-left hover:opacity-90 flex flex-col gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
                          >
                            <Icon name="sms" size={22} />
                            <span className="font-medium">Få SMS när det är löst</span>
                            <span className="text-xs opacity-90">Gratis · Avregistrera när som helst</span>
                          </button>
                        </Copy>
                      ) : (
                        <div className="p-4 rounded-md bg-tint-info border border-brand-accent text-left flex flex-col gap-1.5">
                          <Icon name="check_circle" size={22} className="text-brand-accent" filled />
                          <span className="font-medium">Du får SMS när det är löst</span>
                          <span className="text-xs text-ink-secondary">
                            Vi skickar till numret kopplat till adressen.
                          </span>
                        </div>
                      )}

                      <a
                        href="#felsokning"
                        className="p-4 rounded-md border border-border-strong text-brand-primary text-left hover:bg-tint-info flex flex-col gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                      >
                        <Icon name="tips_and_updates" size={22} className="text-brand-accent" />
                        <span className="font-medium">Tips just nu</span>
                        <span className="text-xs text-ink-secondary">
                          Vad du kan göra medan vi reparerar.
                        </span>
                      </a>

                      <Copy
                        label="Tertiär CTA, styr bort från telefon"
                        category="cta"
                        text="Ring endast vid akut behov"
                        rationale="Ovanlig formulering för en CTA: 'Ring endast' är faktiskt en instruktion att inte ringa utan skäl. Medvetet val för att minska onödiga samtal, användaren ser att telefonen finns men uppmanas att överväga SMS/tips först. 'Akut behov' definierar undantaget utan att vara avskräckande."
                      >
                        <a
                          href="tel:0424903200"
                          className="p-4 rounded-md border border-border-strong text-brand-primary text-left hover:bg-tint-info flex flex-col gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                        >
                          <Icon name="call" size={22} className="text-brand-accent" />
                          <span className="font-medium">Ring endast vid akut behov</span>
                          <span className="text-xs text-ink-secondary">
                            042-490 32 00 · dygnet runt
                          </span>
                        </a>
                      </Copy>
                    </div>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-3 max-w-reading">
                      {/* Ingen avbrott, felsök först, ring sen */}
                      <a
                        href="#felsokning"
                        className="p-4 rounded-md bg-brand-primary text-ink-onbrand text-left hover:opacity-90 flex flex-col gap-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2"
                      >
                        <Icon name="settings_suggest" size={22} />
                        <span className="font-medium">Felsök hemma först</span>
                        <span className="text-xs opacity-90">
                          De flesta strömbortfall beror på utlösta säkringar.
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
                  )}
                </section>
              </Annotation>
            );
          },
        },
      ],
    },

    /* ─── 3. FELSÖKNING, innan du ringer ───────────────────────── */
    {
      id: "felsokning",
      label: "Felsökning, innan du ringer",
      variants: [
        {
          key: "stepper",
          label: "Wizard · stepper (default)",
          render: () => renderFelsokningWizard("stepper"),
        },
        {
          key: "bar",
          label: "Wizard · progress-bar (kompakt)",
          render: () => renderFelsokningWizard("bar"),
        },
        {
          key: "chips",
          label: "Wizard · pill-chips",
          render: () => renderFelsokningWizard("chips"),
        },
        {
          key: "statisk",
          label: "Statisk lista, 5 steg",
          render: () => (
            <Annotation
              label="Felsökning, statisk checklista"
              audience="design"
              rationale="Alternativ för skärmläsaranvändare och de som föredrar att se allt på en gång. Fungerar utan JS."
            >
              <section id="felsokning" className="py-10 border-t border-border-subtle">
                <h2 className="text-h3 font-medium mb-2">Testa det här innan du ringer</h2>
                <p className="text-ink-secondary mb-6 max-w-reading">
                  Gå igenom listan i tur och ordning. De flesta strömproblem löser du på en minut.
                </p>
                <ol className="space-y-4 max-w-reading">
                  {[
                    { t: "Har grannarna också avbrott?", d: "Om ja: det är ett nätavbrott, se statusen ovan eller ring felanmälan." },
                    { t: "Kolla jordfelsbrytaren", d: "Den sitter i elcentralen. Slå om den om den är nedslagen." },
                    { t: "Kolla utlösta säkringar", d: "Slå tillbaka utlösta säkringar. Händer det ofta, kontakta en elektriker." },
                    { t: "Kolla om räkningen är betald", d: "Obetalda räkningar kan leda till avstängning. Logga in på Mina sidor." },
                    { t: "Gör en felanmälan", d: "Hjälper inget av ovan: 042-490 32 00, dygnet runt." },
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
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 4. FELANMÄLAN, telefon som sista utväg ────────────── */
    {
      id: "felanmalan",
      label: "Felanmälan",
      variants: [
        {
          key: "telefon-primar",
          label: "Telefon primär, dygnet runt",
          render: () => (
            <Annotation
              label="Felanmälan, explicit sista steg"
              audience="user"
              rationale="Placerad efter felsökning så användaren har testat själv först. Dygnet-runt-tillgänglighet signalerar trovärdighet. Checklistan reducerar samtalstiden, handläggaren behöver inte gräva fram uppgifterna."
            >
              <section className="py-10 border-t border-border-subtle">
                <div className="rounded-lg bg-brand-primary text-white p-6 sm:p-8 grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <Copy
                      label="Felanmälan, sista utväg"
                      category="rubrik"
                      text="Fortfarande fel?"
                      rationale="Kort fråga istället för påstående. 'Fortfarande' antyder att användaren redan försökt något (felsökning ovan), sätter samtalet rätt innan de ringer. 'Gör en felanmälan' skulle vara förvaltningssvenska; frågan är personlig."
                    >
                      <h2 className="text-h2 text-white mb-2">Fortfarande fel?</h2>
                    </Copy>
                    <p className="opacity-90 mb-4 max-w-reading">
                      Har felsökningen inte löst det, ring oss. Vi svarar dygnet runt
                      när det gäller avbrott och akuta nätfel.
                    </p>
                    <a
                      href="tel:0424903200"
                      className="inline-flex items-center gap-3 bg-white text-brand-primary font-medium px-6 py-3.5 rounded hover:opacity-90 text-lg"
                    >
                      <Icon name="call" size={22} />
                      042-490 32 00
                    </a>
                    <p className="text-xs opacity-80 mt-2">Dygnet runt · alla dagar</p>
                  </div>
                  <div className="bg-white/10 rounded-md p-5">
                    <p className="text-xs uppercase tracking-wider font-medium mb-3 opacity-80">
                      Ha redo när du ringer:
                    </p>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Din adress (gata + postnummer)",
                        "Fastighetsbeteckning om du har",
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
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 5. FÖRDJUPNING, karta + pågående + planerade + avklarade */
    {
      id: "fordjupning",
      label: "Fördjupning, karta, pågående, historik",
      variants: [
        {
          key: "tabs",
          label: "Tab-struktur, karta default",
          render: () => (
            <Annotation
              label="Fördjupning, sekundärt innehåll bakom tabs"
              audience="design"
              rationale="Briefens princip 6.3: kartan är sekundär, för överblick, inte för beslut. Samlar karta + hela nätets pågående + planerade + avklarade bakom tabs så de inte konkurrerar med användarens adress-svar ovan."
            >
              <section className="py-10 border-t border-border-subtle">
                <h2 className="text-h3 font-medium mb-2">Översikt och historik</h2>
                <p className="text-ink-secondary mb-5 max-w-reading">
                  Karta över hela nätet samt avbrott utanför din adress, för dig som vill se helheten.
                </p>

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

                {fordjupningTab === "karta" && (
                  <div role="tabpanel" id="fordjupning-panel-karta" aria-labelledby="fordjupning-tab-karta">
                    <MapPlaceholder avbrott={pagaende} />
                    <p className="text-xs text-ink-muted mt-3 max-w-reading">
                      Kartan är en överblick. För beslut om din adress, använd statuskortet ovan.
                      Datan kommer från samma driftsystem (DMS/Trimble) som listan och SMS-tjänsten.
                    </p>
                  </div>
                )}

                {fordjupningTab === "pagaende" && (
                  <div role="tabpanel" id="fordjupning-panel-pagaende" aria-labelledby="fordjupning-tab-pagaende">
                    {pagaende.length === 0 ? (
                      <p className="text-ink-muted italic">Inga pågående avbrott just nu.</p>
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
                                    <span className="block text-ink-muted text-xs">Beräknad klar</span>
                                    <span className="font-medium">{a.slutBeraknat?.split(" ")[1] ?? "–"}</span>
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
                      <p className="text-ink-muted italic">Inga planerade avbrott denna vecka.</p>
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
                      <p className="text-ink-muted italic">Inga avklarade avbrott senaste 7 dagar.</p>
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

    /* ─── 6. STÖD, ersättning, FAQ, andra kanaler ────────────── */
    {
      id: "stod",
      label: "Stöd, ersättning, FAQ, SMS",
      variants: [
        {
          key: "kompakt",
          label: "Fyra kompakta länkar",
          render: () => (
            <Annotation
              label="Stöd, komprimerad sekundärt"
              audience="redaktör"
              rationale="Briefens innehållsstrategi: juridiska förklaringar, ersättning, djup FAQ ska vara tillgängligt men inte konkurrera med huvudflödet. Fyra korta kort med länk vidare till respektive detaljsida."
            >
              <section className="py-10 border-t border-border-subtle">
                <h2 className="text-h4 font-medium mb-4">Bra att veta</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 text-sm">
                  <a href="#" className="group p-4 rounded-md border border-border-subtle bg-surface hover:border-brand-accent hover:shadow-sm flex flex-col gap-1.5">
                    <Icon name="paid" size={20} className="text-brand-accent" />
                    <span className="font-medium group-hover:text-brand-accent">Ersättning</span>
                    <span className="text-xs text-ink-secondary">Rätt till ersättning vid avbrott &gt; 12 timmar.</span>
                  </a>
                  <a href="#" className="group p-4 rounded-md border border-border-subtle bg-surface hover:border-brand-accent hover:shadow-sm flex flex-col gap-1.5">
                    <Icon name="sms" size={20} className="text-brand-accent" />
                    <span className="font-medium group-hover:text-brand-accent">SMS-prenumeration</span>
                    <span className="text-xs text-ink-secondary">Registrera ditt nummer utan att söka just nu.</span>
                  </a>
                  <a href="#" className="group p-4 rounded-md border border-border-subtle bg-surface hover:border-brand-accent hover:shadow-sm flex flex-col gap-1.5">
                    <Icon name="quiz" size={20} className="text-brand-accent" />
                    <span className="font-medium group-hover:text-brand-accent">Vanliga frågor</span>
                    <span className="text-xs text-ink-secondary">Anvisat avtal, elnät vs elhandel, vem ansvarar.</span>
                  </a>
                  <a href="#" className="group p-4 rounded-md border border-border-subtle bg-surface hover:border-brand-accent hover:shadow-sm flex flex-col gap-1.5">
                    <Icon name="construction" size={20} className="text-brand-accent" />
                    <span className="font-medium group-hover:text-brand-accent">Här gräver vi</span>
                    <span className="text-xs text-ink-secondary">Pågående och kommande grävarbeten.</span>
                  </a>
                </div>
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
        syfte="Svara på 'Är jag påverkad?' och 'När är det löst?' på under 5 sekunder. Adress först, ett samlat statuskort med påverkan per infrastruktur, kontextuella nästa steg och felsökning före kontakt. Karta och historik som sekundärt innehåll."
        malgrupp="Kund med akut problem, ofta mobil, stressad, fem sekunder av uppmärksamhet. Även förvaltare och redaktionell personal som följer läget."
        primarHandling="Skriv in adress (eller använd position) → se statuskort → gör rätt nästa steg: prenumerera på SMS / felsök själv / ring."
        ton="Saklig, direkt, transparent om prognos och osäkerhet. Inga marknadsfraser. Avbrott får röd signal, normaltillstånd får lugnt grönt."
      />

      <div className="flex items-center justify-between pt-6">
        <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">
          ← Översikt
        </Link>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-sm text-ink-secondary hover:text-brand-accent"
        >
          <Icon name="person" size={16} />
          Logga in på Mina sidor
        </a>
      </div>

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
 * Schematisk karta (prototyp), inte en riktig kartmotor. Visar nätets
 * geografi med markörer för pågående avbrott. I produktion ersätts denna
 * med Trimble-kartan, gränssnittet är detsamma: klickbara markörer
 * leder till samma statuskort som adresssöket ger.
 *
 * Positioner är manuellt satta för prototypen (Helsingborg/omland). I
 * produktion kommer DMS att leverera koordinater som kartmotorn renderar.
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
          Prototyp, kartmotorn (Trimble) renderar riktiga koordinater i produktion.
        </span>
      </div>
    </div>
  );
}
