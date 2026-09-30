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
 * SIDTYP 8: Kundservice (ny version)
 *
 * Ersätter dagens separata kundservicesida och Kontakta oss-sida med EN sida.
 *
 * UX-besluten bygger på:
 *  - Workshopanteckningar: "Alla kontaktsätt på samma sida", "Snabbknappar för
 *    vanliga ärenden", "Tydlig knapp till Mina sidor", "Nå snabb avbrottsinfo
 *    direkt från kundservicesidan", "Bra om man kunde beställa samtal".
 *  - UX-principer: besökaren ska hitta hjälp snabbt, alla kontaktvägar syns
 *    samtidigt (känna igen i stället för att minnas), kundservice visar hur
 *    belastat det är just nu, och självservice kommer före kontakt.
 *  - Förebilder: ICA Banken (runda snabbknappar), Folksam
 *    ("Just nu frågar många om"), Vattenfall (banner om längre kötider),
 *    Länsförsäkringar (öppettider per kanal).
 */

/**
 * Fem ärendekategorier enligt UX-briefen: besökaren tänker i ärenden, inte
 * i funktioner. "Annat" är en medveten reservutgång som visar att vi inte
 * gömmer saker bakom "Övrigt".
 */
const TOP_INTENTS = [
  { ikon: "home", label: "Flytta", desc: "Anmäl flytt eller ny adress", href: "#flytta" },
  { ikon: "description", label: "Faktura", desc: "Betala, förstå eller ändra betalsätt", href: "#faktura" },
  { ikon: "bolt", label: "Problem eller fel", desc: "Avbrott, störning eller felanmälan", href: "/moduler/avbrottslista" },
  { ikon: "edit_note", label: "Avtal", desc: "Teckna, byta eller säga upp", href: "/moduler/elavtal-jamfor" },
  { ikon: "more_horiz", label: "Annat", desc: "Hittar du inte ditt ärende?", href: "#annat" },
];

/**
 * "Just nu"-frågor med exempelsvar. Svaret fälls ut på plats, med samma
 * mönster som FAQ-modulen (FaqAccordion) så att modul och sidtyp matchar.
 */
const POPULARA_FRAGOR_JUST_NU = [
  {
    id: "saga-upp",
    q: "Hur säger jag upp mitt elavtal?",
    a: "Logga in på Mina sidor och välj \"Säg upp avtal\". Det tar ungefär en minut. Har du bindningstid ser du slutdatum och eventuella avgifter innan du bekräftar.",
  },
  {
    id: "vilket-avtal",
    q: "Vilket elavtal passar mig bäst?",
    a: "Du kan välja mellan tre avtal: Månadspris (flexibelt), Kvartspris (lite stabilare) och Säkrat pris (fast hela året). I jämförelsen ser du ungefär vad varje avtal kostar per månad för ditt boende.",
  },
  {
    id: "hog-faktura",
    q: "Varför är min faktura högre än vanligt?",
    a: "Oftast beror det på en kall månad med hög förbrukning, ett högre spotpris eller en årsavstämning. På Mina sidor ser du din förbrukning per månad och kan jämföra med förra året.",
  },
  {
    id: "matarstallning",
    q: "Hur rapporterar jag mätarställning?",
    a: "De flesta mätare läses av automatiskt, så du behöver oftast inte göra något. Har du ett äldre schablonavtal loggar du in på Mina sidor och väljer \"Rapportera mätarställning\".",
  },
  {
    id: "elnat-elhandel",
    q: "Vad är skillnaden mellan elnät och elhandel?",
    a: "Elnätet är ledningarna som leder elen hem till dig. Vilket elnätsbolag du har bestäms av var du bor. Elhandel handlar om vem som säljer elen till dig, och det väljer du själv. I Helsingborg och Ängelholm är Öresundskraft elnätsbolag.",
  },
];

/**
 * Mina sidor-listan visar sådant du kan göra helt själv. Avtal syns inte
 * här eftersom Avtal är ett eget ärende bland snabbknapparna.
 */
const MINA_SIDOR_SHORTCUTS = [
  "Se och betala fakturor",
  "Rapportera mätarställning",
  "Ändra betalsätt",
  "Hämta avtalsvillkor",
  "Ändra adress och kontaktuppgifter",
];

/** Väntetider för statusbannern: siffror per kanal, inte "kort" eller "lång". */
const VANTETIDER = {
  normal: { chatt: "< 1 min", telefon: "2 min" },
  langre: { chatt: "3 min", telefon: "8 min" },
} as const;

export function KundserviceNy() {
  // Vilken fråga i "Just nu frågar många om" som är utfälld. Den översta är öppen från start.
  const [openJustNu, setOpenJustNu] = useState<string | null>("saga-upp");

  /**
   * Kontaktflöde: kort formulär i tre steg enligt brief D.
   *   1. Välj ärende  2. Namn, e-post och meddelande  3. Bekräftelse
   * Endast demo. I skarp drift skickas ärendet till servern och steg 3 visas
   * när svaret kommit.
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

  // Samma nummer under hela bekräftelsen. Nytt nummer varje gång flödet når steg 3.
  const ticketId = useMemo(
    () => "KC-2026-" + (Math.floor(Math.random() * 90000) + 10000),
    [flowStep],
  );

  /**
   * Fokushantering i flerstegsformuläret (tillgänglighet). När steget ändras
   * flyttas fokus till stegets rubrik, så skärmläsare läser upp var man är och
   * tangentbordsanvändare hamnar rätt utan att tabba om.
   * Körs inte vid första visningen, så fokus inte flyttas när sidan laddas.
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
   * Kontaktflödets innehåll. De tre blockvarianterna delar innehåll men visar
   * stegen på olika sätt (steg med cirklar, stapel eller knappar) via
   * WizardProgress. Samma mönster används i felsökningsguiden.
   */
  function renderKontaktFlow(progressVariant: WizardVariant) {
    const svarstid = flowIntent ? svarstidPer[flowIntent] : "1 arbetsdag";
    const kanFortsatta = flowStep === 2
      ? flowName.trim() !== "" && flowEmail.trim() !== "" && flowMessage.trim() !== ""
      : flowIntent !== null;

    return (
      <Annotation
        label="Kontaktformulär i tre korta steg"
        audience="user"
        rationale="En fråga i taget i stället för ett långt formulär, så det känns lätt att komma igång. Sista steget ger besökaren det den behöver för att släppa ärendet: ärendenummer, svarstid och vad som händer sedan. Stegvisningen är samma som i felsökningsguiden."
      >
        <section id="kontaktflode" className="py-10 border-t border-border-subtle">
          <Copy
            label="Kontaktformulär, rubrik och tidslöfte"
            category="rubrik"
            text="Skicka ett ärende på under en minut. Tre korta steg. Du får ett ärendenummer och ser när vi svarar."
            rationale="Rubriken lovar en tid, så besökaren vet vad det kostar att börja. Undertexten säger vad man får tillbaka. Lova inte 'exakt' svarstid om den inte kan hållas."
          >
            <div>
              <WizardProgress
                variant={progressVariant}
                title="Skicka ett ärende på under en minut"
                subtitle="Tre korta steg. Du får ett ärendenummer och ser när vi svarar."
                steps={[
                  { key: "arende", label: "Ärende" },
                  { key: "detaljer", label: "Detaljer" },
                  { key: "klart", label: "Klart" },
                ]}
                current={flowStep}
              />
            </div>
          </Copy>

          <div className="rounded-md border-2 border-border-subtle bg-surface p-5 sm:p-6 max-w-reading">
            {flowStep === 1 && (
              <div>
                <Copy
                  label="Kontaktflöde steg 1, rubrik"
                  category="rubrik"
                  text="Vad gäller det?"
                  rationale="Samma fråga som över snabbknapparna, med samma kategorier. Besökaren känner igen valet och slipper lära sig nya ord mitt i formuläret."
                >
                  <h3
                    ref={stepHeadingRef}
                    tabIndex={-1}
                    className="font-medium mb-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent focus-visible:ring-offset-2 rounded"
                  >
                    Vad gäller det?
                  </h3>
                </Copy>
                <Copy
                  label="Kontaktflöde steg 1, förklaring"
                  category="ton"
                  text="Välj det som passar bäst, så hamnar ditt ärende direkt hos rätt person."
                  rationale="Förklarar varför vi frågar: valet gör att ärendet går direkt till rätt person. Ett skäl gör det lättare att svara. 'Det som passar bäst' tar bort pressen att välja exakt rätt."
                >
                  <p className="text-sm text-ink-secondary mb-4">
                    Välj det som passar bäst, så hamnar ditt ärende direkt hos rätt person.
                  </p>
                </Copy>
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
                <Copy
                  label="Kontaktflöde steg 1, knapp"
                  category="cta"
                  text="Fortsätt"
                  rationale="'Fortsätt' räcker här eftersom stegvisningen ovanför visar vad som kommer härnäst. Knappen går att trycka först när ett ärende är valt."
                >
                  <button
                    type="button"
                    disabled={!kanFortsatta}
                    onClick={() => setFlowStep(2)}
                    className="inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-5 py-2.5 rounded hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Fortsätt
                    <Icon name="arrow_forward" size={16} />
                  </button>
                </Copy>
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
                  rationale="Uppmaning med verb, som säger vad som ska göras. 'Dina uppgifter' låter som en blankett. Undertexten 'Tre korta fält, inget mer' visar att det är snart klart."
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
                <Copy
                  label="Kontaktflöde steg 2, fältetiketter"
                  category="metadata"
                  text="Ditt namn / Din e-post / Beskriv ditt ärende kort / Vi hör av oss om vi behöver veta mer."
                  rationale="Etiketterna står alltid ovanför fälten och försvinner inte när man skriver. 'Ditt' och 'din' gör det personligt. Hjälptexten under meddelandet lugnar: det räcker med en kort beskrivning."
                >
                <div className="space-y-3 mb-5">
                  <div>
                    <label htmlFor="flow-name" className="text-sm font-medium block mb-1">
                      Ditt namn
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
                      Din e-post
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
                      Beskriv ditt ärende kort
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
                      Vi hör av oss om vi behöver veta mer.
                    </p>
                  </div>
                </div>
                </Copy>
                <Copy
                  label="Kontaktflöde steg 2, knappar"
                  category="cta"
                  text="Tillbaka / Skicka ärendet"
                  rationale="'Skicka ärendet' säger vad som händer när man trycker, till skillnad från bara 'Skicka'. 'Tillbaka' ligger som en mindre knapp så att huvudvalet syns tydligt."
                >
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
                    Skicka ärendet
                    <Icon name="send" size={16} />
                  </button>
                </div>
                </Copy>
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
                      rationale="'Har tagit emot' säger att det redan är gjort, så besökaren kan släppa oron. 'Vi' visar att vi tar ansvar. Vi skriver 'ärende' överallt, inte 'förfrågan' eller 'meddelande', så att ordet stämmer med ärendenumret."
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
                      Vi har skickat en bekräftelse till <strong className="text-ink">{flowEmail || "din e-post"}</strong>.
                    </p>
                  </div>
                </div>
                <Copy
                  label="Kontaktflöde steg 3, ärendeuppgifter"
                  category="metadata"
                  text="Ärendenummer / Kategori / Svar senast / Hanteras av"
                  rationale="Fyra fakta som besökaren kan spara och hänvisa till. 'Svar senast' är ett löfte vi kan mätas mot, inte ett ungefär. 'Hanteras av' visar att en riktig person i Helsingborg tar hand om ärendet."
                >
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
                </Copy>
                <Copy
                  label="Kontaktflöde steg 3, nästa steg"
                  category="reassurance"
                  text={`Så här går det till: Ärendet är registrerat / En handläggare läser ärendet inom ${svarstid} / Du får svar via e-post. Är något oklart ringer vi dig.`}
                  rationale="Visar vad som händer efter att man skickat, så ingen behöver undra eller ringa och fråga. Första steget är överstruket för att visa att det redan är klart."
                >
                <div className="mb-5">
                  <p className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-2">
                    Så här går det till
                  </p>
                  <ol className="space-y-2">
                    {[
                      "Ärendet är registrerat",
                      `En handläggare läser ärendet inom ${svarstid}`,
                      "Du får svar via e-post. Är något oklart ringer vi dig.",
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
                </Copy>
                <Copy
                  label="Kontaktflöde steg 3, knappar"
                  category="cta"
                  text="Följ ärendet på Mina sidor / Skicka ett nytt ärende"
                  rationale="Två tydliga vägar vidare: följa ärendet eller skicka ett till. 'Skicka ett nytt ärende' säger vad som händer, till skillnad från 'Starta om' som kan låta som att ärendet raderas."
                >
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
                    Skicka ett nytt ärende
                  </button>
                </div>
                </Copy>
              </div>
            )}
          </div>
        </section>
      </Annotation>
    );
  }

  const blocks: BlockDef[] = [
    /* ─── 1. STATUSBANNER: belastning just nu ──────────────────── */
    {
      id: "status",
      label: "Statusbanner: kundservice just nu",
      variants: [
        {
          key: "normal",
          label: "Normal kötid, i minuter",
          render: () => (
            <Annotation
              label="Statusbanner: normal drift med kötid"
              audience="user"
              rationale="Visar hur lång kön är just nu, i minuter per kanal. Med siffror kan besökaren välja kanal direkt i stället för att gissa. Bannern ska spegla verkligt läge, annars tappar den förtroende."
            >
              <section className="pt-4">
                <Copy
                  label="Status vid normal drift"
                  category="metadata"
                  text={`Allt fungerar just nu. Kötid: chatt ${VANTETIDER.normal.chatt} · telefon ${VANTETIDER.normal.telefon}`}
                  rationale="Först läget, sedan siffrorna. 'Allt fungerar' är sakligt, inte säljande som 'Vi är redo för dig'. Kötid i minuter är ett löfte vi mäts mot, så skriv aldrig 'kort kö'."
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
          label: "Längre kötider, hänvisa till Mina sidor",
          render: () => (
            <Annotation
              label="Statusbanner: längre kötider"
              audience="user"
              rationale="När det är långa köer visar bannern den faktiska kötiden och föreslår en snabbare väg. Det är ett konkret erbjudande, inte en ursäkt, och minskar trycket på telefon och chatt."
            >
              <section className="pt-4">
                <Copy
                  label="Status vid längre kötider"
                  category="metadata"
                  text={`Längre kötider just nu. Chatt ${VANTETIDER.langre.chatt} · telefon ${VANTETIDER.langre.telefon}. Snabbare väg: Mina sidor.`}
                  rationale="Säger ärligt att det är kö och hur lång, och ger direkt ett alternativ. Siffror i stället för ord som 'hög belastning'. Undvik ursäkter som tar plats utan att hjälpa."
                >
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
                </Copy>
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
              rationale="Vid avbrott vill besökaren veta läget, inte prata med kundservice. Bannern leder direkt till avbrottssidan, så att färre behöver ringa och fråga om det är ett avbrott."
            >
              <section className="pt-4">
                <Copy
                  label="Status vid pågående avbrott"
                  category="metadata"
                  text="Avbrott pågår i ditt område. Vi arbetar med att få tillbaka strömmen. Se status för avbrottet"
                  rationale="Först vad som händer, sedan att vi jobbar på det. Knappen säger var man får veta mer. Skriv inte ut tider här om de inte är säkra, dem visar avbrottssidan."
                >
                <div className="rounded-md bg-tint-highlight border-l-4 border-brand-highlight px-4 py-3 flex items-center gap-3 text-sm">
                  <Icon name="bolt" size={20} className="text-brand-highlight" filled />
                  <span className="flex-1">
                    <strong>Avbrott pågår i ditt område.</strong> Vi arbetar med att få tillbaka strömmen.
                  </span>
                  <Link
                    to="/moduler/avbrottslista"
                    className="inline-flex items-center gap-1.5 bg-brand-primary text-white font-medium px-3 py-1.5 rounded text-xs hover:opacity-90"
                  >
                    Se status för avbrottet
                    <Icon name="arrow_forward" size={14} />
                  </Link>
                </div>
                </Copy>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 2. HERO: fråga och sök ───────────────────────────────── */
    {
      id: "hero",
      label: "Hero",
      variants: [
        {
          key: "sok-first",
          label: "Sökfokuserad, stort sökfält",
          render: () => (
            <Annotation
              label="Hero med fråga och sökfält"
              audience="user"
              rationale="Sju av tio besökare kommer med en bestämd fråga. Därför är sökfältet det första de kan använda, i stället för en meny att klicka sig igenom. Rubriken är en fråga till besökaren, inte ordet 'Kundservice'."
            >
              <section className="py-10 sm:py-14">
                <Copy
                  label="H1, användarfråga"
                  category="rubrik"
                  text="Vad behöver du hjälp med?"
                  rationale="'Kundservice' säger vad sidan är. 'Vad behöver du hjälp med?' säger vad besökaren kan göra här, och möter hen där hen är: med ett problem att lösa."
                >
                  <h1 className="text-display leading-tight mb-2">Vad behöver du hjälp med?</h1>
                </Copy>
                <Copy
                  label="Ingress, tre vägar"
                  category="ton"
                  text="Sök bland svaren, välj ett vanligt ärende eller kontakta oss direkt."
                  rationale="Ingressen räknar upp sidans tre vägar i samma ordning som de kommer på sidan. Besökaren får en karta på en rad."
                >
                  <p className="text-lede text-ink-secondary mb-6 max-w-reading">
                    Sök bland svaren, välj ett vanligt ärende eller kontakta oss direkt.
                  </p>
                </Copy>

                <Copy
                  label="Sökfält"
                  category="cta"
                  text="Sök bland frågor och svar"
                  rationale="Texten i sökfältet säger både vad man kan göra och var svaren kommer ifrån. Bara 'Sök' är för vagt."
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
          label: "Ärendefokuserad, utan sök",
          render: () => (
            <Annotation
              label="Hero utan sök, direkt till snabbknapparna"
              audience="design"
              rationale="Ett alternativ om statistiken visar att få söker. Heron blir lägre och snabbknapparna hamnar högre upp. Sökfältet flyttas då till det fasta sidhuvudet eller tas bort."
            >
              <section className="py-8 sm:py-10">
                <Copy
                  label="H1, användarfråga"
                  category="rubrik"
                  text="Vad behöver du hjälp med?"
                  rationale="Samma fråga som i sökvarianten, så rubriken är densamma oavsett vilken hero som används."
                >
                  <h1 className="text-h1 leading-tight mb-3">Vad behöver du hjälp med?</h1>
                </Copy>
                <Copy
                  label="Ingress, två vägar"
                  category="ton"
                  text="Välj ett vanligt ärende nedan eller kontakta oss direkt."
                  rationale="Utan sökfält finns två vägar, och ingressen nämner bara dem. Nämn inte sök om det inte finns på sidan."
                >
                  <p className="text-lede text-ink-secondary max-w-reading">
                    Välj ett vanligt ärende nedan eller kontakta oss direkt.
                  </p>
                </Copy>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 3. SNABBKNAPPAR: delad komponent med tre layouter ───── */
    {
      id: "snabb",
      label: "Snabbknappar, vanligaste ärendena",
      variants: (() => {
        const items: IntentCardItem[] = TOP_INTENTS;
        const renderWith = (v: IntentCardVariant) => (
          <Annotation
            label="Snabbknappar för fem vanliga ärenden"
            audience="user"
            rationale="Kunder tänker i ärenden, inte i funktioner. Fem kort täcker det vanligaste: Flytta, Faktura, Problem eller fel, Avtal och Annat. Samma mönster finns på startsidans undersida, bara layouten skiljer."
          >
            <section className="py-8 border-t border-border-subtle">
              <Copy
                label="Sektionsrubrik, snabbknappar"
                category="rubrik"
                text="Vad gäller det?"
                rationale="En fråga till besökaren i stället för en kategorirubrik. 'Vanligaste ärendena' är vårt språk, 'Vad gäller det?' är besökarens."
              >
                <h2 className="text-h4 font-medium mb-4">Vad gäller det?</h2>
              </Copy>
              <Copy
                label="Snabbknapparnas etiketter"
                category="cta"
                text={items.map((i) => i.label).join(" / ")}
                rationale="Korta ord som kunderna själva använder, med exempel under. 'Annat' finns med så att ingen känner sig bortglömd. Håll antalet till fem, fler gör valet svårare."
              >
                <div>
                  <IntentCardGrid items={items} variant={v} columns={5} />
                </div>
              </Copy>
            </section>
          </Annotation>
        );
        return [
          { key: "vertical", label: "Vertikal, ikon ovanför texten (standard)", render: () => renderWith("vertical") },
          { key: "horizontal", label: "Horisontell, ikon till vänster om texten", render: () => renderWith("horizontal") },
          { key: "chips", label: "Kompakta knappar på en rad", render: () => renderWith("chips") },
        ];
      })(),
    },

    /* ─── 4. MINA SIDOR: lyft självservice ─────────────────────── */
    {
      id: "mina-sidor",
      label: "Mina sidor, stor knapp",
      variants: [
        {
          key: "banner-stor",
          label: "Stor banner med lista över vanliga ärenden",
          render: () => (
            <Annotation
              label="Mina sidor syns tydligt"
              audience="user"
              rationale="De flesta ärenden kan kunden lösa själv på Mina sidor, men många vet inte om det. Bannern visar vad man kan göra där och har en stor, tydlig knapp, precis som workshopen önskade."
            >
              <section className="py-10 border-t border-border-subtle">
                <div className="rounded-lg bg-brand-primary text-white p-6 sm:p-8 grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <Copy
                      label="Mina sidor, rubrik"
                      category="rubrik"
                      text="De flesta ärenden löser du snabbast själv"
                      rationale="Ett påstående, inte en fråga. Säger rakt ut att Mina sidor är snabbaste vägen. Undvik reservationer som 'kanske' eller 'kan också'."
                    >
                      <h2 className="text-h2 mb-2 text-white">De flesta ärenden löser du snabbast själv</h2>
                    </Copy>
                    <Copy
                      label="Mina sidor, tre konkreta fördelar"
                      category="reassurance"
                      text="Ingen kö. Öppet dygnet runt. Tar 1 minut i stället för 10."
                      rationale="Tre korta meningar utan adjektiv. Var och en jämför med att kontakta oss: ingen kö mot kö, dygnet runt mot öppettider, 1 minut mot 10. Samma form gör dem lätta att skumma."
                    >
                      <p className="text-sm opacity-90 mb-4">
                        Ingen kö. Öppet dygnet runt. Tar 1 minut i stället för 10.
                      </p>
                    </Copy>
                    <Copy
                      label="Mina sidor, knapp"
                      category="cta"
                      text="Logga in på Mina sidor"
                      rationale="Verb plus plats, samma formulering som i sidhuvudet. Samma ord överallt gör att besökaren känner igen knappen."
                    >
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 bg-white text-brand-primary font-medium px-5 py-3 rounded hover:opacity-90 transition-opacity"
                      >
                        <Icon name="person" size={18} />
                        Logga in på Mina sidor
                        <Icon name="arrow_forward" size={16} />
                      </a>
                    </Copy>
                  </div>
                  <Copy
                    label="Mina sidor, lista över vad du kan göra"
                    category="reassurance"
                    text={`Det här kan du göra på Mina sidor: ${MINA_SIDOR_SHORTCUTS.join(" / ")}`}
                    rationale="Varje rad börjar med ett verb, så det blir tydligt vad man kan göra själv. Redaktören håller listan till de fem vanligaste ärendena som går att lösa helt på Mina sidor."
                  >
                  <div className="bg-white/10 rounded-md p-5">
                    <p className="text-xs uppercase tracking-wider font-medium mb-3 opacity-80">
                      Det här kan du göra på Mina sidor
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
                  </Copy>
                </div>
              </section>
            </Annotation>
          ),
        },
        {
          key: "kompakt",
          label: "Kompakt, en rad",
          render: () => (
            <Annotation
              label="Mina sidor i kompakt format"
              audience="design"
              rationale="Ett alternativ när den stora bannern tar för mycket plats på en redan lång sida. Samma budskap på en rad."
            >
              <section className="py-6 border-t border-border-subtle">
                <div className="rounded-md bg-tint-info p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Icon name="person" size={28} className="text-brand-primary" />
                  <Copy
                    label="Mina sidor kompakt, budskap"
                    category="reassurance"
                    text="De flesta ärenden löser du snabbast själv på Mina sidor. Ingen kö · öppet dygnet runt"
                    rationale="Samma budskap som den stora bannern, kortat till en rad och två fördelar. Använd samma ord som i den stora varianten så budskapet känns igen."
                  >
                  <div className="flex-1">
                    <p className="font-medium">De flesta ärenden löser du snabbast själv på Mina sidor.</p>
                    <p className="text-sm text-ink-secondary">Ingen kö · öppet dygnet runt</p>
                  </div>
                  </Copy>
                  <Copy
                    label="Mina sidor kompakt, knapp"
                    category="cta"
                    text="Logga in"
                    rationale="Kort eftersom meningen bredvid redan nämner Mina sidor. Står knappen ensam ska den heta 'Logga in på Mina sidor'."
                  >
                    <a
                      href="#"
                      className="inline-flex items-center gap-1.5 bg-brand-primary text-ink-onbrand font-medium px-5 py-2.5 rounded hover:opacity-90 whitespace-nowrap"
                    >
                      Logga in
                      <Icon name="arrow_forward" size={16} />
                    </a>
                  </Copy>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 5. KONTAKTVÄGAR: alla synliga samtidigt ──────────────── */
    {
      id: "kontakt",
      label: "Kontaktvägar",
      variants: [
        {
          key: "fyra-kanaler",
          label: "Fyra kanaler, med bokning",
          render: () => (
            <Annotation
              label="Alla kontaktvägar på samma ställe"
              audience="user"
              rationale="Alla sätt att nå oss syns samtidigt, som workshopen önskade, inklusive att boka samtal. Varje kanal visar svarstid, öppettider och vad den passar för, så besökaren kan välja själv. Chatten ligger först eftersom den är snabbast."
            >
              <section className="py-10 border-t border-border-subtle">
                <Copy
                  label="Sektionsrubrik, kontakt"
                  category="rubrik"
                  text="Eller kontakta oss direkt"
                  rationale="'Eller' visar att kontakt är alternativet till att lösa ärendet själv, inte första steget. Ordvalet leder besökaren till Mina sidor först och kontakt sedan."
                >
                  <h2 className="text-h2 mb-2">Eller kontakta oss direkt</h2>
                </Copy>
                <Copy
                  label="Kontakt, ingress"
                  category="ton"
                  text="Olika kanaler passar olika ärenden. Välj efter hur snabbt du behöver svar."
                  rationale="Ger besökaren en enkel regel för att välja kanal: hur bråttom är det? Då behövs ingen lång förklaring av varje kanal."
                >
                  <p className="text-ink-secondary mb-6 max-w-reading">
                    Olika kanaler passar olika ärenden. Välj efter hur snabbt du behöver svar.
                  </p>
                </Copy>
                <Copy
                  label="Kontaktkort, knappar och förväntan"
                  category="cta"
                  text="Starta chatt / Ring 042-490 32 00 / Skicka meddelande / Boka tid"
                  rationale="Varje knapp säger exakt vad som händer. Telefonknappen visar numret så att man kan ringa direkt eller skriva av det. Svarstid och öppettider står på varje kort, så ingen behöver leta."
                >
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
                    lead="För krångligare ärenden"
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
                </Copy>
                <Copy
                  label="Kontakt på andra språk"
                  category="reassurance"
                  text="Contact us in other languages: English · العربية · Polski"
                  rationale="Raden är på engelska eftersom den riktar sig till den som inte läser svenska. Varje språk står på sitt eget språk. En rad längst ner räcker och tar inte plats från huvudflödet."
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
              label="Kontaktvägar med tre kanaler"
              audience="design"
              rationale="Chatt, telefon och e-post. Används så länge det inte går att boka samtal. Varje kanal visar svarstid och öppettider på samma sätt."
            >
              <section className="py-10 border-t border-border-subtle">
                <Copy
                  label="Sektionsrubrik, kontakt"
                  category="rubrik"
                  text="Eller kontakta oss direkt"
                  rationale="Samma rubrik som i varianten med fyra kanaler. 'Eller' visar att kontakt är alternativet till att lösa ärendet själv."
                >
                  <h2 className="text-h2 mb-2">Eller kontakta oss direkt</h2>
                </Copy>
                <Copy
                  label="Kontakt, ingress"
                  category="ton"
                  text="Välj kanal efter hur snabbt du behöver svar."
                  rationale="En enkel regel för att välja kanal. Kortare än i varianten med fyra kanaler eftersom valet är mindre."
                >
                  <p className="text-ink-secondary mb-6 max-w-reading">
                    Välj kanal efter hur snabbt du behöver svar.
                  </p>
                </Copy>
                <Copy
                  label="Kontaktkort, knappar och förväntan"
                  category="cta"
                  text="Starta chatt / Ring 042-490 32 00 / Skicka meddelande"
                  rationale="Varje knapp säger exakt vad som händer. Svarstid och öppettider står på varje kort, så ingen behöver leta."
                >
                <div className="grid sm:grid-cols-3 gap-4">
                  <ContactCard icon="smart_toy" kanal="Chatt" lead="Snabbast för enkla frågor" svar="Under 1 min" oppettider="Dygnet runt · AI-assistent" cta="Starta chatt" ctaHref="#" primary />
                  <ContactCard icon="call" kanal="Telefon" lead="För krångligare ärenden" svar="Kötid 2 min" oppettider="Mån–tor 08–16 · Fre 10–15" cta="Ring 042-490 32 00" ctaHref="tel:0424903200" />
                  <ContactCard icon="mail" kanal="E-post" lead="När det inte är bråttom" svar="Inom 1 arbetsdag" oppettider="Dygnet runt" cta="Skicka meddelande" ctaHref="#kontaktflode" />
                </div>
                </Copy>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 6. KONTAKTFLÖDE: tre steg enligt brief D ─────────────── */
    {
      id: "kontaktflode",
      label: "Kontaktformulär i tre steg",
      variants: [
        {
          key: "stepper",
          label: "Steg med cirklar och etiketter (standard)",
          render: () => renderKontaktFlow("stepper"),
        },
        {
          key: "bar",
          label: "Stapel, kompakt (bäst i mobilen)",
          render: () => renderKontaktFlow("bar"),
        },
        {
          key: "chips",
          label: "Knappar, alla steg lika stora",
          render: () => renderKontaktFlow("chips"),
        },
      ],
    },

    /* ─── 7. POPULÄRA FRÅGOR "JUST NU" ─────────────────────────── */
    {
      id: "just-nu",
      label: "Populära frågor just nu",
      variants: [
        {
          key: "accordion",
          label: "Utfällbara frågor med svar",
          render: () => (
            <Annotation
              label="Frågor som många ställer just nu"
              audience="redaktör"
              rationale="Uppdatera listan varje vecka utifrån de vanligaste ärendena hos kundservice. Håll den till fem frågor, skrivna som kunden skulle fråga, med korta svar som leder vidare. Svaren fälls ut på samma sätt som i FAQ-modulen."
            >
              <section className="py-10 border-t border-border-subtle">
                <Copy
                  label="Just nu-frågor, rubrik"
                  category="rubrik"
                  text="Just nu frågar många om"
                  rationale="Visar att listan är aktuell och att andra undrar samma sak, vilket gör det lättare att fråga. Mer levande än 'Vanliga frågor'."
                >
                  <h2 className="text-h3 font-medium mb-2">Just nu frågar många om</h2>
                </Copy>
                <Copy
                  label="Just nu-frågor, källa"
                  category="metadata"
                  text="Baserat på senaste veckans ärenden"
                  rationale="Säger var listan kommer ifrån, så den känns trovärdig. Texten stämmer bara om listan faktiskt uppdateras varje vecka."
                >
                  <p className="text-sm text-ink-muted mb-4">Baserat på senaste veckans ärenden</p>
                </Copy>
                <Copy
                  label="Just nu-frågor, frågor och svar"
                  category="faq"
                  text={POPULARA_FRAGOR_JUST_NU.map((f) => f.q).join(" / ")}
                  rationale="Frågorna är skrivna i jagform, som kunden själv skulle fråga. Svaren börjar med det viktigaste och säger var man gör saken, oftast på Mina sidor."
                >
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
                </Copy>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 8. SIDFOT: driftstörning och öppettider igen ─────────── */
    {
      id: "fot",
      label: "Sidfot: driftstörning och öppettider",
      variants: [
        {
          key: "kompakt",
          label: "Kompakt",
          render: () => (
            <Annotation
              label="Sidfot med driftstörning och öppettider"
              audience="design"
              rationale="Den som scrollat förbi kontaktvägarna ska ändå se öppettiderna utan att scrolla tillbaka. Länken till avbrottsinformation finns alltid kvar, även när statusbannern visar normal drift."
            >
              <section className="py-10 border-t border-border-subtle grid md:grid-cols-2 gap-6">
                <Copy
                  label="Sidfot, driftstörning"
                  category="rubrik"
                  text="Driftstörning? Se om det är avbrott eller planerade arbeten i ditt område, eller gör en felanmälan. Se avbrott och planerade arbeten"
                  rationale="Rubriken är frågan besökaren ställer sig. Texten nämner de tre saker man kan göra, och länken säger vad man hittar. Undvik bara 'Avbrottsinformation' som länktext."
                >
                <div>
                  <h3 className="text-h5 font-medium mb-3">Driftstörning?</h3>
                  <p className="text-sm text-ink-secondary mb-2">
                    Se om det är avbrott eller planerade arbeten i ditt område, eller gör en felanmälan.
                  </p>
                  <Link
                    to="/moduler/avbrottslista"
                    className="inline-flex items-center gap-1.5 text-sm text-brand-accent hover:underline"
                  >
                    Se avbrott och planerade arbeten
                    <Icon name="arrow_forward" size={14} />
                  </Link>
                </div>
                </Copy>
                <Copy
                  label="Sidfot, öppettider"
                  category="metadata"
                  text="Öppettider för kundservice: Chatt: Dygnet runt / Telefon: Mån–tor 08–16 · Fre 10–15 / E-post: Svar inom 1 arbetsdag"
                  rationale="Samma tider som på kontaktkorten, så att uppgifterna aldrig säger emot varandra. Vi skriver 'kundservice' överallt, inte 'kundtjänst'. Ändras tiderna ska de ändras på båda ställena."
                >
                <div>
                  <h3 className="text-h5 font-medium mb-3">Öppettider för kundservice</h3>
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
        kategori="Kundservice (Sidtyp 8, ersätter kundservicesidan och Kontakta oss)"
        syfte="Ge kunden snabbaste vägen till en lösning: antingen att lösa ärendet själv eller att hitta rätt kontaktväg och veta när svaret kommer. Självservice lyfts före kontakt för att minska trycket på kundservice."
        malgrupp="Privatkunder med ett konkret ärende. Ofta stressade och ibland osäkra på om ärendet är akut. Många kommer direkt från en sökträff."
        primarHandling="Hitta svaret direkt via sök eller snabbknapp, eller välja rätt kontaktväg med känd svarstid."
        ton="Rak, konkret och respektfull mot kundens tid. Inga säljfraser. Säg ärligt vilken kanal som är snabbast för vilket ärende."
      />

      {/* Rad med tillbakalänk och inloggning */}
      <Annotation
        label="Inloggning alltid synlig"
        audience="design"
        rationale="Många som besöker kundservice är redan kunder och vill till Mina sidor. Inloggningen ligger uppe till höger, där folk brukar leta, redan innan sidan börjar."
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
            rationale="Verb plus plats: besökaren vet vart länken leder. Samma formulering som på den stora Mina sidor-knappen längre ner."
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
