import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { WizardProgress, type WizardVariant } from "../../components/WizardProgress";
import { IntentCardGrid, type IntentCardItem, type IntentCardVariant } from "../../components/IntentCardGrid";

/**
 * SIDTYP 8, Kundservice (ny, UX-skill-driven)
 *
 * Ersätter dagens separata KC-sida + Kontakta-oss-sida med EN sida.
 *
 * UX-beslut drivna av:
 *  - Workshop-noter: "Alla kontaktsätt på samma sida", "Snabbknappar för
 *    vanliga ärenden", "Tydlig knapp till Mina sidor", "Nå snabb avbrottsinfo
 *    direkt från KC-sida", "Bra om man kunde beställa samtal".
 *  - ux-web-design-skill: outcome först (användaren ska hitta hjälp snabbt),
 *    alla kontaktvägar synliga samtidigt (recognition > recall), KC-belastning
 *    som systemstatus (visibility of system status), snabbknappar över triage
 *    (edit aggressively, self-service först).
 *  - Konkurrentreferenser: ICA Banken (pill-snabbknappar), Folksam
 *    ("just nu frågar många om"), Vattenfall ("Längre kötider"-banner),
 *    Länsförsäkringar (öppettider per kanal).
 */

/**
 * Fem ärende-kategorier enligt UX-brief: användaren tänker i ärenden, inte
 * funktioner. "Annat" är medveten escape hatch, signalerar att vi inte
 * gömmer saker bakom "övrigt".
 */
const TOP_INTENTS = [
  { ikon: "home", label: "Flytta", desc: "Anmäl flytt, byta adress", href: "#flytta" },
  { ikon: "description", label: "Faktura", desc: "Betala, förstå, ändra betalsätt", href: "#faktura" },
  { ikon: "bolt", label: "Problem eller fel", desc: "Avbrott, felanmälan, störning", href: "/moduler/avbrottslista" },
  { ikon: "edit_note", label: "Avtal", desc: "Teckna, byta, säga upp", href: "/moduler/elavtal-jamfor" },
  { ikon: "more_horiz", label: "Annat", desc: "Hittar du inte ditt ärende?", href: "#annat" },
];

/**
 * Just nu-frågor med exempel-svar. Svaret öppnas inline som accordion, * samma mönster som FAQ-modulen (FaqAccordion) så modul och sidtyp matchar.
 */
const POPULARA_FRAGOR_JUST_NU = [
  {
    id: "saga-upp",
    q: "Hur säger jag upp mitt elavtal?",
    a: "Logga in på Mina sidor och välj \"Säg upp avtal\", det tar ca 1 minut. Vid bindningstid visar vi slutdatum och eventuella avgifter innan du bekräftar.",
  },
  {
    id: "vilket-avtal",
    q: "Vilket elavtal passar mig bäst?",
    a: "Tre avtal att välja mellan: Månadspris (flexibel), Kvartspris (viss stabilitet) och Säkrat pris (fast hela året). Använd jämförelsen för att se uppskattad månadskostnad per boendetyp.",
  },
  {
    id: "hog-faktura",
    q: "Varför är min faktura högre än vanligt?",
    a: "De vanligaste orsakerna är kall månad med hög förbrukning, spotprisvariation eller att en årsavstämning gjorts. På Mina sidor ser du förbrukning per månad och kan jämföra med föregående år.",
  },
  {
    id: "matarstallning",
    q: "Hur rapporterar jag mätarställning?",
    a: "De flesta kunder har automatisk fjärravläsning och behöver inte rapportera själva. Har du däremot ett gammalt schablonavtal: logga in på Mina sidor → \"Rapportera mätarställning\".",
  },
  {
    id: "elnat-elhandel",
    q: "Vad är skillnaden mellan elnät och elhandel?",
    a: "Elnät är de fysiska ledningarna, du kan inte välja nätägare, det bestäms av var du bor. Elhandel är vem som säljer själva elen till dig, där väljer du fritt. I Helsingborg och Ängelholm är Öresundskraft elnätsbolag.",
  },
];

/**
 * Mina sidor-listan fokuserar på "rena" self-service-saker. Avtal syns inte
 * här eftersom Avtal numera är en top-intent som har sitt eget flöde.
 */
const MINA_SIDOR_SHORTCUTS = [
  "Se och betala fakturor",
  "Rapportera mätarställning",
  "Ändra betalsätt",
  "Hämta avtalsvillkor",
  "Ändra adress och kontaktuppgifter",
];

/** Väntetider för status-bannern, numerisk per kanal, inte "kort/långt". */
const VANTETIDER = {
  normal: { chatt: "< 1 min", telefon: "2 min" },
  langre: { chatt: "3 min", telefon: "8 min" },
} as const;

export function KundserviceNy() {
  // Accordion-state för "Just nu frågar många om", topp-frågan öppen default.
  const [openJustNu, setOpenJustNu] = useState<string | null>("saga-upp");

  /**
   * Kontaktflöde, 3-stegs mini-form enligt brief D.
   *   1. Välj ärende (chip)  2. Namn + e-post + meddelande  3. Bekräftelse
   * Demo-state, i produktion skickas svaret till backend och steg 3 visas
   * efter serversvaret.
   */
  const [flowStep, setFlowStep] = useState<1 | 2 | 3>(1);
  const [flowIntent, setFlowIntent] = useState<string | null>(null);
  const [flowName, setFlowName] = useState("");
  const [flowEmail, setFlowEmail] = useState("");
  const [flowMessage, setFlowMessage] = useState("");

  const svarstidPer: Record<string, string> = {
    "Flytta": "2 arbetsdagar",
    "Faktura": "1 arbetsdag",
    "Problem eller fel": "Samma dag",
    "Avtal": "1 arbetsdag",
    "Annat": "1–2 arbetsdagar",
  };

  function reinitFlow() {
    setFlowStep(1);
    setFlowIntent(null);
    setFlowName("");
    setFlowEmail("");
    setFlowMessage("");
  }

  // Stabilt per submission-tillfälle, nytt id varje gång flödet går in i steg 3.
  const ticketId = useMemo(
    () => "KC-2026-" + (Math.floor(Math.random() * 90000) + 10000),
    [flowStep],
  );

  /**
   * Focus management för multi-step form (a11y). När steget ändras flyttas
   * fokus till det aktiva stegets rubrik så skärmläsare hör var de är och
   * tangentbords-användare hamnar i rätt region utan att behöva tabba om.
   * Kör inte på initial mount för att inte stjäla fokus vid sidladdning.
   */
  const stepHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const isInitialRender = useRef(true);
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    stepHeadingRef.current?.focus();
  }, [flowStep]);

  /**
   * Kontaktflödets body, tre block-varianter delar samma innehåll men byter
   * progress-header (stepper / bar / chips) via WizardProgress-komponenten.
   * Samma grammatik används i felsökningsguiden så guides känns enhetliga.
   */
  function renderKontaktFlow(progressVariant: WizardVariant) {
    const svarstid = flowIntent ? svarstidPer[flowIntent] : "1 arbetsdag";
    const kanFortsatta = flowStep === 2
      ? flowName.trim() !== "" && flowEmail.trim() !== "" && flowMessage.trim() !== ""
      : flowIntent !== null;

    return (
      <Annotation
        label="Kontaktflöde, förenklat formulär"
        audience="user"
        rationale="Briefens krav D: 3 steg istället för långt formulär. Progressive disclosure (en fråga i taget) sänker kognitiv belastning. Steg 3 stänger loopen: bekräftelse, svarstid, vad händer nu, ärende-id. Progress-headern (WizardProgress) är delad med felsökningsguiden."
      >
        <section id="kontaktflode" className="py-10 border-t border-border-subtle">
          <WizardProgress
            variant={progressVariant}
            title="Skicka ett ärende, tar under en minut"
            subtitle="Tre korta steg. Du får ett ärendenummer och ser exakt när vi svarar."
            steps={[
              { key: "arende", label: "Ärende" },
              { key: "detaljer", label: "Detaljer" },
              { key: "klart", label: "Klart" },
            ]}
            current={flowStep}
          />

          <div className="rounded-md border-2 border-border-subtle bg-surface p-5 sm:p-6 max-w-reading">
            {flowStep === 1 && (
              <div>
                <Copy
                  label="Kontaktflöde steg 1, rubrik"
                  category="rubrik"
                  text="Vad gäller det?"
                  rationale="Samma fråga som snabbknappar-sektionen ovan, medvetet återanvänd så användaren ser att det är samma kategori-val i ett annat sammanhang. Konsekvent vokabulär över stegen sänker kognitiv belastning."
                >
                  <h3
                    ref={stepHeadingRef}
                    tabIndex={-1}
                    className="font-medium mb-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded"
                  >
                    Vad gäller det?
                  </h3>
                </Copy>
                <p className="text-sm text-ink-secondary mb-4">
                  Välj kategori så hamnar ditt ärende hos rätt person direkt.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {TOP_INTENTS.map((it) => (
                    <button
                      key={it.label}
                      type="button"
                      onClick={() => setFlowIntent(it.label)}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm transition-colors ${
                        flowIntent === it.label
                          ? "border-brand-accent bg-tint-info font-medium text-brand-primary"
                          : "border-border-subtle bg-surface hover:border-brand-accent hover:bg-tint-info/60"
                      }`}
                      aria-pressed={flowIntent === it.label}
                    >
                      <Icon name={it.ikon} size={16} className="text-brand-accent" />
                      {it.label}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  disabled={!kanFortsatta}
                  onClick={() => setFlowStep(2)}
                  className="inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-5 py-2.5 rounded hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Fortsätt
                  <Icon name="arrow_forward" size={16} />
                </button>
              </div>
            )}

            {flowStep === 2 && (
              <form
                onSubmit={(e) => { e.preventDefault(); if (kanFortsatta) setFlowStep(3); }}
              >
                <Copy
                  label="Kontaktflöde steg 2, rubrik"
                  category="rubrik"
                  text="Lägg till detaljer"
                  rationale="Imperativform + objekt. 'Dina uppgifter' skulle fokusera på användaren, 'Lägg till detaljer' fokuserar på handlingen. Parar med sub-text 'Tre korta fält, inget mer' som sätter förväntan på längden."
                >
                  <h3
                    ref={stepHeadingRef}
                    tabIndex={-1}
                    className="font-medium mb-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded"
                  >
                    Lägg till detaljer
                  </h3>
                </Copy>
                <p className="text-sm text-ink-secondary mb-4">
                  Ärende: <strong className="text-ink">{flowIntent}</strong>.
                  Tre korta fält, inget mer.
                </p>
                <div className="space-y-3 mb-5">
                  <div>
                    <label htmlFor="flow-name" className="text-sm font-medium block mb-1">
                      Namn
                    </label>
                    <input
                      id="flow-name"
                      type="text"
                      value={flowName}
                      onChange={(e) => setFlowName(e.target.value)}
                      required
                      className="w-full border border-border-strong rounded-md px-3 py-2.5 text-base bg-canvas focus:border-brand-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="flow-email" className="text-sm font-medium block mb-1">
                      E-post
                    </label>
                    <input
                      id="flow-email"
                      type="email"
                      value={flowEmail}
                      onChange={(e) => setFlowEmail(e.target.value)}
                      required
                      className="w-full border border-border-strong rounded-md px-3 py-2.5 text-base bg-canvas focus:border-brand-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="flow-message" className="text-sm font-medium block mb-1">
                      Beskriv kort
                    </label>
                    <textarea
                      id="flow-message"
                      rows={3}
                      value={flowMessage}
                      onChange={(e) => setFlowMessage(e.target.value)}
                      required
                      className="w-full border border-border-strong rounded-md px-3 py-2.5 text-base bg-canvas focus:border-brand-accent focus:outline-none resize-y"
                    />
                    <p className="text-xs text-ink-muted mt-1">
                      Vi frågar om mer bara om det behövs.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setFlowStep(1)}
                    className="inline-flex items-center gap-1.5 border border-border-strong text-brand-primary font-medium px-4 py-2.5 rounded hover:bg-tint-info"
                  >
                    <Icon name="arrow_back" size={16} />
                    Tillbaka
                  </button>
                  <button
                    type="submit"
                    disabled={!kanFortsatta}
                    className="inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-5 py-2.5 rounded hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Skicka
                    <Icon name="send" size={16} />
                  </button>
                </div>
              </form>
            )}

            {flowStep === 3 && (
              <div role="status" aria-live="polite">
                <div className="flex items-start gap-3 mb-4">
                  <Icon
                    name="check_circle"
                    size={28}
                    className="text-brand-accent shrink-0"
                    filled
                  />
                  <div>
                    <Copy
                      label="Kontaktflöde steg 3, bekräftelse"
                      category="rubrik"
                      text="Vi har tagit emot ditt ärende"
                      rationale="Påstående i perfekt, 'har tagit emot' är fait accompli, användaren kan släppa oron. 'Vi' (institutionell röst) tar ansvar. 'Ditt ärende' (inte 'din förfrågan' eller 'ditt meddelande') matchar termen som används i statusbanner och ärendenummer-formatet."
                    >
                      <h3
                        ref={stepHeadingRef}
                        tabIndex={-1}
                        className="text-h5 font-medium mb-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded"
                      >
                        Vi har tagit emot ditt ärende
                      </h3>
                    </Copy>
                    <p className="text-sm text-ink-secondary">
                      En bekräftelse är skickad till <strong className="text-ink">{flowEmail || "din e-post"}</strong>.
                    </p>
                  </div>
                </div>
                <dl className="text-sm grid sm:grid-cols-2 gap-3 mb-5 p-4 rounded-md bg-tint-info">
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-ink-muted font-medium">Ärendenummer</dt>
                    <dd className="font-medium font-mono">{ticketId}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-ink-muted font-medium">Kategori</dt>
                    <dd className="font-medium">{flowIntent}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-ink-muted font-medium">Svar senast</dt>
                    <dd className="font-medium">Inom {svarstid}</dd>
                  </div>
                  <div>
                    <dt className="text-xs uppercase tracking-wider text-ink-muted font-medium">Hanteras av</dt>
                    <dd className="font-medium">Kundservice, Helsingborg</dd>
                  </div>
                </dl>
                <div className="mb-5">
                  <p className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-2">
                    Så här händer det
                  </p>
                  <ol className="space-y-2">
                    {[
                      "Vi bekräftar att ärendet är registrerat (redan klart)",
                      `En handläggare läser ärendet inom ${svarstid}`,
                      "Du får svar via e-post, eller vi ringer om något är oklart",
                    ].map((t, i) => (
                      <li key={i} className="flex gap-3 text-sm">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-brand-primary text-white grid place-items-center text-[11px] font-bold">
                          {i + 1}
                        </span>
                        <span className={i === 0 ? "text-ink-secondary line-through" : ""}>
                          {t}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 border border-border-strong text-brand-primary font-medium px-4 py-2.5 rounded hover:bg-tint-info text-sm"
                  >
                    <Icon name="person" size={16} />
                    Följ ärendet på Mina sidor
                  </a>
                  <button
                    type="button"
                    onClick={reinitFlow}
                    className="inline-flex items-center gap-1.5 text-ink-secondary hover:text-brand-accent text-sm px-3 py-2.5"
                  >
                    <Icon name="restart_alt" size={16} />
                    Starta om
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
    /* ─── 1. STATUSBANNER, live belastning ─────────────────────── */
    {
      id: "status",
      label: "Statusbanner, KC-belastning just nu",
      variants: [
        {
          key: "normal",
          label: "Normal kötid, numerisk",
          render: () => (
            <Annotation
              label="Statusbanner: normal drift, numerisk väntetid"
              audience="user"
              rationale="Briefen: 'Just nu är väntetiden X min'. Numeriska tider slår vaga ord ('kort kötid'), användaren kan välja kanal direkt utan att gissa. Visibility of system status (Nielsen H1) blir operativ, inte dekorativ."
            >
              <section className="pt-4">
                <Copy
                  label="Status normaldrift, systemstatus"
                  category="metadata"
                  text="Allt fungerar just nu. Kötid: chatt X min · telefon Y min"
                  rationale="Två delar: påstående (Allt fungerar) + siffror (konkret kötid). 'Allt fungerar' är ärligt utan att vara självberömmande, inte 'Vi är redo för dig' som skulle vara reklam. Numeriska kötider respekterar användarens val: 'under 1 min i chatt' är ett löfte man mäts mot."
                >
                  <div className="rounded-md bg-tint-info border-l-4 border-brand-accent px-4 py-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    <span className="inline-flex items-center gap-2">
                      <Icon name="check_circle" size={20} className="text-brand-accent" />
                      <strong>Allt fungerar just nu.</strong>
                    </span>
                    <span className="text-ink-secondary">
                      Kötid: chatt <strong className="text-ink">{VANTETIDER.normal.chatt}</strong> ·
                      telefon <strong className="text-ink">{VANTETIDER.normal.telefon}</strong>
                    </span>
                  </div>
                </Copy>
              </section>
            </Annotation>
          ),
        },
        {
          key: "langre",
          label: "Längre kötider, styr till self-service",
          render: () => (
            <Annotation
              label="Statusbanner: längre kötider"
              audience="user"
              rationale="Briefens trafikstyrning: visa faktisk kötid + föreslå snabbare väg. Inte en ursäkt, ett konkret erbjudande. Vattenfall-stil men med siffror istället för adjektiv."
            >
              <section className="pt-4">
                <div className="rounded-md bg-tint-notice border-l-4 border-brand-highlight px-4 py-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                  <span className="inline-flex items-center gap-2">
                    <Icon name="schedule" size={20} className="text-brand-highlight" />
                    <strong>Längre kötider just nu.</strong>
                  </span>
                  <span className="text-ink-secondary">
                    Chatt <strong className="text-ink">{VANTETIDER.langre.chatt}</strong> ·
                    telefon <strong className="text-ink">{VANTETIDER.langre.telefon}</strong>.
                    Snabbare väg:{" "}
                    <a href="#mina-sidor" className="text-brand-primary font-medium underline underline-offset-2">Mina sidor</a>.
                  </span>
                </div>
              </section>
            </Annotation>
          ),
        },
        {
          key: "avbrott",
          label: "Avbrott pågår",
          render: () => (
            <Annotation
              label="Statusbanner: pågående avbrott"
              audience="user"
              rationale="Vid avbrott ska användaren INTE gå via kundservice, de ska se status direkt. Banner:n lyfter länken till avbrottslistan så att KC inte överbelastas av folk som vill veta 'finns det ett avbrott?'"
            >
              <section className="pt-4">
                <div className="rounded-md bg-tint-highlight border-l-4 border-brand-highlight px-4 py-3 flex items-center gap-3 text-sm">
                  <Icon name="bolt" size={20} className="text-brand-highlight" filled />
                  <span className="flex-1">
                    <strong>Avbrott pågår i ditt område.</strong> Vi jobbar på att få tillbaka strömmen.
                  </span>
                  <Link
                    to="/moduler/avbrottslista"
                    className="inline-flex items-center gap-1.5 bg-brand-primary text-white font-medium px-3 py-1.5 rounded text-xs hover:opacity-90"
                  >
                    Se status
                    <Icon name="arrow_forward" size={14} />
                  </Link>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 2. HERO, fråga + sök ─────────────────────────────────── */
    {
      id: "hero",
      label: "Hero",
      variants: [
        {
          key: "sok-first",
          label: "Sök-first, stort sökfält",
          render: () => (
            <Annotation
              label="Hero: fråga + sök"
              audience="user"
              rationale="H1 är en användarfråga, inte ett varumärkesord ('Kundservice'). Folksam-stil: sök dominerar. 70% av KC-besökare kommer med en specifik fråga, sök ska vara det första de kan göra, inte klicka sig genom en meny."
            >
              <section className="py-10 sm:py-14">
                <Copy
                  label="H1, användarfråga"
                  category="rubrik"
                  text="Vad behöver du hjälp med?"
                  rationale="Direkt fråga till användaren. 'Kundservice' som rubrik säger vad sidan är; 'Vad behöver du hjälp med?' säger vad användaren kan göra. Matchar det mentala tillståndet när man landar hit, man har ett problem."
                >
                  <h1 className="text-display leading-tight mb-2">Vad behöver du hjälp med?</h1>
                </Copy>
                <p className="text-lede text-ink-secondary mb-6 max-w-reading">
                  Sök bland svar, välj ett vanligt ärende, eller kontakta oss direkt.
                </p>

                <Copy
                  label="Sökfält"
                  category="cta"
                  text="Sök bland frågor och svar"
                  rationale="Placeholder på sökfältet säger både vad man kan göra och vart resultatet kommer ifrån. Inte bara 'Sök', det är för vagt."
                >
                  <form
                    role="search"
                    onSubmit={(e) => e.preventDefault()}
                    className="flex gap-2 max-w-reading"
                  >
                    <div className="flex-1 relative">
                      <Icon
                        name="search"
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
                      />
                      <input
                        type="search"
                        placeholder="Sök bland frågor och svar"
                        className="w-full border border-border-strong rounded-md pl-10 pr-3 py-3 text-base bg-surface focus:border-brand-accent focus:outline-none"
                        aria-label="Sök bland frågor och svar"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-brand-primary text-ink-onbrand font-medium px-5 py-3 rounded hover:opacity-90"
                    >
                      Sök
                    </button>
                  </form>
                </Copy>
              </section>
            </Annotation>
          ),
        },
        {
          key: "intent-first",
          label: "Intent-first, utan sök",
          render: () => (
            <Annotation
              label="Hero (alt): direkt till snabbknappar"
              audience="design"
              rationale="Alternativ om data visar att användare inte söker. Sparar vertikal yta och sätter fokus på snabbknapparna direkt. Sök flyttas till sticky header eller tas bort helt."
            >
              <section className="py-8 sm:py-10">
                <h1 className="text-h1 leading-tight mb-3">Vad behöver du hjälp med?</h1>
                <p className="text-lede text-ink-secondary max-w-reading">
                  Välj ett vanligt ärende nedan, eller kontakta oss direkt.
                </p>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 3. SNABBKNAPPAR, delad komponent, 3 layout-varianter ─── */
    {
      id: "snabb",
      label: "Snabbknappar, topp ärenden",
      variants: (() => {
        const items: IntentCardItem[] = TOP_INTENTS;
        const renderWith = (v: IntentCardVariant) => (
          <Annotation
            label="Snabbknappar, 5 ärende-kategorier"
            audience="user"
            rationale="Briefens kärninsikt: kunden tänker i ärenden, inte funktioner. Fem kort enligt briefens taxonomi, Flytta, Faktura, Problem/fel, Avtal, Annat. Samma IntentCardGrid-komponent som StartsidaUndersidaUX så mönstret är delat, sidtypen väljer bara layout."
          >
            <section className="py-8 border-t border-border-subtle">
              <Copy
                label="Sektionsrubrik, snabbknappar"
                category="rubrik"
                text="Vad gäller det?"
                rationale="Direkt användarfråga, inte kategori-etikett. 'Vanligaste ärendena' är redaktörens språk; 'Vad gäller det?' är användarens."
              >
                <h2 className="text-h4 font-medium mb-4">Vad gäller det?</h2>
              </Copy>
              <IntentCardGrid items={items} variant={v} columns={5} />
            </section>
          </Annotation>
        );
        return [
          { key: "vertical", label: "Vertikal, ikon över text (default)", render: () => renderWith("vertical") },
          { key: "horizontal", label: "Horisontell, ikon vänster om text", render: () => renderWith("horizontal") },
          { key: "chips", label: "Chips, kompakt pill-rad", render: () => renderWith("chips") },
        ];
      })(),
    },

    /* ─── 5. MINA SIDOR-CALLOUT, självhjälp-push ──────────────── */
    {
      id: "mina-sidor",
      label: "Mina sidor, stor CTA",
      variants: [
        {
          key: "banner-stor",
          label: "Stor banner med topp 5-listor",
          render: () => (
            <Annotation
              label="Mina sidor, prominent, inte gömd"
              audience="user"
              rationale="Workshop-önskan: 'Tydlig knapp till Mina Sidor, STOR TYDLIG KNAPP'. De flesta KC-ärenden är faktiskt självbetjänings-saker, men användare vet inte alltid det. Visa vad man KAN göra själv."
            >
              <section className="py-10 border-t border-border-subtle">
                <div className="rounded-lg bg-brand-primary text-white p-6 sm:p-8 grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <Copy
                      label="Mina sidor-rubrik"
                      category="cta"
                      text="De flesta ärenden löser du snabbast själv"
                      rationale="Påstående, inte fråga. Säger rakt ut att Mina sidor är snabbaste vägen. Ingen 'kanske' eller 'kan också'."
                    >
                      <h2 className="text-h2 mb-2 text-white">De flesta ärenden löser du snabbast själv</h2>
                    </Copy>
                    <Copy
                      label="Mina sidor, tre konkreta fördelar"
                      category="reassurance"
                      text="Ingen kötid. Fungerar när som helst. Tar 1 minut istället för 10."
                      rationale="Tre korta meningar, inga adjektiv. Varje sats är en jämförelse med alternativet (kontakt): ingen kö vs kö, dygnet runt vs öppettider, 1 min vs 10 min. Parallell struktur gör jämförelsen lättare att scanna."
                    >
                      <p className="text-sm opacity-90 mb-4">
                        Ingen kötid. Fungerar när som helst. Tar 1 minut istället för 10.
                      </p>
                    </Copy>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 bg-white text-brand-primary font-medium px-5 py-3 rounded hover:opacity-90 transition-opacity"
                    >
                      <Icon name="person" size={18} />
                      Logga in på Mina sidor
                      <Icon name="arrow_forward" size={16} />
                    </a>
                  </div>
                  <div className="bg-white/10 rounded-md p-5">
                    <p className="text-xs uppercase tracking-wider font-medium mb-3 opacity-80">
                      Här kan du bland annat:
                    </p>
                    <ul className="space-y-2">
                      {MINA_SIDOR_SHORTCUTS.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-sm">
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
        {
          key: "kompakt",
          label: "Kompakt, horisontell",
          render: () => (
            <Annotation
              label="Mina sidor (kompakt): en rad"
              audience="design"
              rationale="Alternativ om stor banner dominerar för mycket när sidan är tung. Samma budskap, mindre yta."
            >
              <section className="py-6 border-t border-border-subtle">
                <div className="rounded-md bg-tint-info p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Icon name="person" size={28} className="text-brand-primary" />
                  <div className="flex-1">
                    <p className="font-medium">De flesta ärenden löser du snabbast själv på Mina sidor.</p>
                    <p className="text-sm text-ink-secondary">Ingen kötid · fungerar dygnet runt</p>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 bg-brand-primary text-ink-onbrand font-medium px-5 py-2.5 rounded hover:opacity-90 whitespace-nowrap"
                  >
                    Logga in
                    <Icon name="arrow_forward" size={16} />
                  </a>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 6. KONTAKTVÄGAR, alla synliga samtidigt ──────────────── */
    {
      id: "kontakt",
      label: "Kontaktvägar",
      variants: [
        {
          key: "fyra-kanaler",
          label: "Fyra kanaler, inkl. bokning",
          render: () => (
            <Annotation
              label="Kontaktvägar, alla synliga"
              audience="user"
              rationale="Workshop: 'Alla kontaktsätt på samma sida' + 'Bra om man kunde beställa samtal/möten'. Varje kanal har tydlig förväntan (svarstid + öppettider + vad kanalen passar för). Vattenfall-modell. Chatt föreslås överst, snabbast + AI-assistans via Ebbot."
            >
              <section className="py-10 border-t border-border-subtle">
                <Copy
                  label="Sektionsrubrik, kontakt"
                  category="rubrik"
                  text="Eller kontakta oss direkt"
                  rationale="'Eller' signalerar att detta är alternativet till self-service, inte första steget. Ordvalet styr användaren till Mina sidor först, kontakt sedan."
                >
                  <h2 className="text-h2 mb-2">Eller kontakta oss direkt</h2>
                </Copy>
                <p className="text-ink-secondary mb-6 max-w-reading">
                  Olika kanaler passar olika ärenden. Välj efter hur snabbt du behöver svar.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <ContactCard
                    icon="smart_toy"
                    kanal="Chatt"
                    lead="Snabbast för enkla frågor"
                    svar="Under 1 min"
                    oppettider="Dygnet runt · AI-assistent (Ebbot)"
                    cta="Starta chatt"
                    ctaHref="#"
                    primary
                  />
                  <ContactCard
                    icon="call"
                    kanal="Telefon"
                    lead="För komplexa ärenden"
                    svar="Kötid 2 min"
                    oppettider="Mån–tor 08–16 · Fre 10–15"
                    cta="Ring 042-490 32 00"
                    ctaHref="tel:0424903200"
                  />
                  <ContactCard
                    icon="mail"
                    kanal="E-post"
                    lead="När det inte är bråttom"
                    svar="Inom 1 arbetsdag"
                    oppettider="Dygnet runt"
                    cta="Skicka meddelande"
                    ctaHref="#kontaktflode"
                  />
                  <ContactCard
                    icon="event_available"
                    kanal="Boka samtal"
                    lead="När det passar dig"
                    svar="Du väljer tiden"
                    oppettider="Välj tid inom 14 dagar"
                    cta="Boka tid"
                    ctaHref="#"
                  />
                </div>
                <Copy
                  label="Språk-fallback"
                  category="reassurance"
                  text="Contact us in other languages, English · العربية · Polski"
                  rationale="Länsförsäkringar-inspiration. En rad längst ner är en signal om att sidan tänker på användare som inte har svenska som första språk, utan att tränga undan huvudflödet."
                >
                  <p className="text-sm text-ink-muted mt-6">
                    <strong className="text-ink-secondary">Contact us in other languages:</strong>{" "}
                    <a href="#" className="text-brand-accent hover:underline">English</a> ·{" "}
                    <a href="#" className="text-brand-accent hover:underline">العربية</a> ·{" "}
                    <a href="#" className="text-brand-accent hover:underline">Polski</a>
                  </p>
                </Copy>
              </section>
            </Annotation>
          ),
        },
        {
          key: "tre-kanaler",
          label: "Tre kanaler, utan bokning",
          render: () => (
            <Annotation
              label="Kontaktvägar (tre kanaler)"
              audience="design"
              rationale="Klassiska tre. Alternativ om bokning inte är live ännu. Samma förväntan-format på varje kanal."
            >
              <section className="py-10 border-t border-border-subtle">
                <h2 className="text-h2 mb-2">Eller kontakta oss direkt</h2>
                <p className="text-ink-secondary mb-6 max-w-reading">
                  Välj kanal efter hur snabbt du behöver svar.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <ContactCard icon="smart_toy" kanal="Chatt" lead="Snabbast för enkla frågor" svar="Under 1 min" oppettider="Dygnet runt · AI-assistent" cta="Starta chatt" ctaHref="#" primary />
                  <ContactCard icon="call" kanal="Telefon" lead="För komplexa ärenden" svar="Kötid 2 min" oppettider="Mån–tor 08–16 · Fre 10–15" cta="Ring 042-490 32 00" ctaHref="tel:0424903200" />
                  <ContactCard icon="mail" kanal="E-post" lead="När det inte är bråttom" svar="Inom 1 arbetsdag" oppettider="Dygnet runt" cta="Skicka meddelande" ctaHref="#kontaktflode" />
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 7. KONTAKTFLÖDE, 3-stegs demo enligt brief D ─────────── */
    {
      id: "kontaktflode",
      label: "Kontaktflöde, 3-stegs mini-form",
      variants: [
        {
          key: "stepper",
          label: "Stepper, cirklar med etiketter (default)",
          render: () => renderKontaktFlow("stepper"),
        },
        {
          key: "bar",
          label: "Progress-bar, kompakt (bäst på mobil)",
          render: () => renderKontaktFlow("bar"),
        },
        {
          key: "chips",
          label: "Pill-chips, samma vikt per steg",
          render: () => renderKontaktFlow("chips"),
        },
      ],
    },

    /* ─── 8. POPULÄRA FRÅGOR "JUST NU" ──────────────────────────── */
    {
      id: "just-nu",
      label: "Populära frågor just nu",
      variants: [
        {
          key: "accordion",
          label: "Accordion med exempel-svar",
          render: () => (
            <Annotation
              label="Just nu-frågor, accordion"
              audience="redaktör"
              rationale="Folksam-inspiration: 'Just nu frågar många om'. Redaktionellt kurerad lista, uppdateras veckovis från supportdata. Samma accordion-mönster som FAQ-modulen (FaqAccordion), svaret öppnas inline och animeras smidigt via grid-template-rows så modul och sidtyp matchar visuellt."
            >
              <section className="py-10 border-t border-border-subtle">
                <h2 className="text-h3 font-medium mb-2">Just nu frågar många om</h2>
                <p className="text-sm text-ink-muted mb-4">Baserat på senaste veckans ärenden</p>
                <ul className="space-y-2 max-w-reading">
                  {POPULARA_FRAGOR_JUST_NU.map((f) => {
                    const isOpen = openJustNu === f.id;
                    return (
                      <li
                        key={f.id}
                        className="border border-border-subtle rounded-md bg-surface overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenJustNu(isOpen ? null : f.id)}
                          aria-expanded={isOpen}
                          aria-controls={`just-nu-panel-${f.id}`}
                          id={`just-nu-trigger-${f.id}`}
                          className="w-full text-left px-5 py-4 flex items-center justify-between gap-3 hover:bg-tint-info font-medium text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:-outline-offset-2"
                        >
                          <span>{f.q}</span>
                          <Icon
                            name="expand_more"
                            size={20}
                            className={`text-ink-muted shrink-0 transition-transform duration-200 motion-reduce:transition-none ${isOpen ? "rotate-180" : ""}`}
                          />
                        </button>
                        <div
                          id={`just-nu-panel-${f.id}`}
                          role="region"
                          aria-labelledby={`just-nu-trigger-${f.id}`}
                          className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${
                            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <div className="px-5 pb-4 pt-3 border-t border-border-subtle text-sm text-ink-secondary leading-relaxed">
                              {f.a}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 9. FOOTER, driftstörning + öppettider återupprepas ───── */
    {
      id: "fot",
      label: "Fot, driftstörning + öppettider",
      variants: [
        {
          key: "kompakt",
          label: "Kompakt",
          render: () => (
            <Annotation
              label="Fot-sektion: driftstörning + återupprepa öppettider"
              audience="design"
              rationale="Recognition över recall: öppettider för kundtjänst ska vara synliga nära sidans slut också, för den som skrollat förbi kontaktvägarna. Driftstörnings-länk ligger kvar som fallback även när bannern är 'normal'."
            >
              <section className="py-10 border-t border-border-subtle grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-h5 font-medium mb-3">Driftstörning?</h3>
                  <p className="text-sm text-ink-secondary mb-2">
                    Se om det pågår ett avbrott i ditt område, planerade arbeten, eller gör en felanmälan.
                  </p>
                  <Link
                    to="/moduler/avbrottslista"
                    className="inline-flex items-center gap-1.5 text-sm text-brand-accent hover:underline"
                  >
                    Avbrottsinformation
                    <Icon name="arrow_forward" size={14} />
                  </Link>
                </div>
                <div>
                  <h3 className="text-h5 font-medium mb-3">Kundtjänst öppettider</h3>
                  <dl className="text-sm text-ink-secondary space-y-1">
                    <div className="flex gap-3">
                      <dt className="font-medium min-w-[80px]">Chatt</dt>
                      <dd>Dygnet runt</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="font-medium min-w-[80px]">Telefon</dt>
                      <dd>Mån–tor 08–16 · Fre 10–15</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="font-medium min-w-[80px]">E-post</dt>
                      <dd>Svar inom 1 arbetsdag</dd>
                    </div>
                  </dl>
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
        kategori="Kundservice (Sidtyp 8, ersätter KC + Kontakta-oss)"
        syfte="Snabbast möjliga väg till lösning, antingen self-service eller rätt kontaktväg med rätt förväntan. Minska belastning på KC genom att göra självhjälp tydligare än kontakt."
        malgrupp="Privatkund med ett konkret ärende. Ofta stressad, ibland osäker på om ärendet är akut. Toppen av tratten = distraherad användare från sökträff."
        primarHandling="Hitta svar direkt (sök eller snabbknapp) ELLER nå rätt kontaktkanal med känd svarstid."
        ton="Direkt, konkret, respektfull mot användarens tid. Inga marknadsföringsfraser. Säger ärligt vilken kanal som är snabbast för vilket ärende."
      />

      {/* Utility-rad */}
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
          <li aria-current="page" className="font-medium text-ink">Kundservice</li>
        </ol>
      </nav>

      <BlockList pageId="kundservice-ny" blocks={blocks} />
    </div>
  );
}

/* ─── Helpers ───────────────────────────────────────────────────── */

type ContactCardProps = {
  icon: string;
  kanal: string;
  lead: string;
  svar: string;
  oppettider: string;
  cta: string;
  ctaHref: string;
  primary?: boolean;
};

function ContactCard({ icon, kanal, lead, svar, oppettider, cta, ctaHref, primary }: ContactCardProps) {
  return (
    <div
      className={`rounded-md border-2 p-5 flex flex-col ${
        primary ? "border-brand-accent bg-tint-info/40" : "border-border-subtle bg-surface"
      }`}
    >
      <Icon name={icon} size={28} className="text-brand-accent mb-3" />
      <h3 className="font-medium mb-1">{kanal}</h3>
      <p className="text-sm text-ink-secondary mb-3">{lead}</p>
      <dl className="text-xs text-ink-muted space-y-1 mb-4">
        <div>
          <dt className="inline font-medium text-ink-secondary">Svar: </dt>
          <dd className="inline">{svar}</dd>
        </div>
        <div>
          <dt className="inline font-medium text-ink-secondary">Öppettider: </dt>
          <dd className="inline">{oppettider}</dd>
        </div>
      </dl>
      <a
        href={ctaHref}
        className={`mt-auto inline-flex items-center justify-center gap-2 font-medium text-sm py-2.5 rounded transition-opacity ${
          primary
            ? "bg-brand-primary text-ink-onbrand hover:opacity-90"
            : "border border-border-strong text-brand-primary hover:bg-tint-info"
        }`}
      >
        {cta}
        <Icon name="arrow_forward" size={16} />
      </a>
    </div>
  );
}
