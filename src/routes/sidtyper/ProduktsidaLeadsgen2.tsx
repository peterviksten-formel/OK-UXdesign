import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { Icon } from "../../components/Icon";
/* Den fasta panelen importeras INTE i v2: all CTA ligger i flödet. */
import { RelateradeProdukter } from "../../components/RelateradeProdukter";
import { ProduktinfoProgressiv } from "../moduler/variants/ProduktinfoProgressiv";
import { ProduktinfoTrygg } from "../moduler/variants/ProduktinfoTrygg";
import { PRODUKTER } from "../moduler/produkt-data";

const PRODUKT = PRODUKTER.find((p) => p.id === "solceller")!;
import { KundcaseStory } from "../moduler/variants/KundcaseStory";
import { KundcaseHero } from "../moduler/variants/KundcaseHero";
import { KundcaseGrid } from "../moduler/variants/KundcaseGrid";
import { FaqAccordion } from "../moduler/variants/FaqAccordion";
import { FaqGrupperad } from "../moduler/variants/FaqGrupperad";
import { FaqSokTopplista } from "../moduler/variants/FaqSokTopplista";

/**
 * SIDTYP 11b, Produktsida leadsgenerering v2 (CTA i flödet)
 *
 * Variant av Leadsgen där den fasta panelen till höger och den fasta
 * listen längst ned på mobil är borttagna. I stället: innehåll i full
 * bredd med CTA:er placerade där besökaren naturligt fattar beslut.
 *
 * UX-motivering (Krug, Spool): solceller är ett beslut man researchar
 * länge (investering på 180 000 kr eller mer). En panel som hela tiden
 * följer med kan kännas påträngande. Här får besökaren läsa, räkna och
 * övertyga sig själv i egen takt.
 *
 * Beslutspunkter i flödet:
 *  1. Heron: primär CTA "Boka kostnadsfri rådgivning" och väg till kalkylatorn.
 *  2. Kalkylatorn: "Få en exakt offert för ditt hus".
 *  3. Efter processen: banner "Redo för en exakt offert?".
 * Rådgivarblocket och intresseformuläret sist tar hand om själva
 * konverteringen.
 */

const KUNDVARDE = [
  {
    ikon: "savings",
    titel: "Sänk elkostnaden upp till 40 %",
    text: "Med söderläge och 30 m² panel sparar en typvilla i Helsingborg 8 000–12 000 kr per år.",
  },
  {
    ikon: "currency_exchange",
    titel: "20 % grönt skatteavdrag",
    text: "Avdraget gäller hela installationen. Vi hanterar ansökan åt dig.",
  },
  {
    ikon: "energy_savings_leaf",
    titel: "Producera lokalt, sälj överskottet",
    text: "Den el du inte använder själv säljer du till nätet. Vi köper den på marknadens bästa villkor.",
  },
  {
    ikon: "verified",
    titel: "10 års produktgaranti",
    text: "Gäller paneler och växelriktare. Anläggningen håller i 25–30 år.",
  },
];

const PROCESS = [
  {
    n: 1,
    titel: "Intresseanmälan",
    text: "Du fyller i namn, kontaktuppgifter och adress. Vi ringer upp inom 2 arbetsdagar.",
    tid: "5 min",
  },
  {
    n: 2,
    titel: "Kostnadsfri besiktning",
    text: "Vi kommer hem till dig, mäter taket och gör en första beräkning av hur stor anläggning du behöver.",
    tid: "Inom 2 veckor",
  },
  {
    n: 3,
    titel: "Skriftlig offert",
    text: "Du får en offert med exakt pris, vilka paneler och vilken växelriktare vi föreslår, beräknad produktion och återbetalningstid.",
    tid: "Inom 1 vecka",
  },
  {
    n: 4,
    titel: "Installation",
    text: "En certifierad montör installerar och kopplar in anläggningen. Vi sköter bygganmälan och anslutningen till elnätet.",
    tid: "1–3 dagar",
  },
];

export function ProduktsidaLeadsgen2() {
  /* ─── Spar-kalkylator state ──────────────────────────────────── */
  const [arsforbrukning, setArsforbrukning] = useState<number>(20000);
  const [forbrukningInput, setForbrukningInput] = useState<string>("20 000");
  const [taklage, setTaklage] = useState<"sader" | "ost-vast" | "norr">("sader");

  function formatInt(n: number) {
    return n.toLocaleString("sv-SE").replace(/ /g, " ");
  }

  function uppdateraForbrukning(v: string) {
    setForbrukningInput(v);
    const n = parseInt(v.replace(/\s/g, ""), 10);
    if (!isNaN(n) && n > 0 && n <= 99999) setArsforbrukning(n);
  }

  // Schablon för självförsörjning: söderläge ~40 %, öst/väst ~30 %, norr ~18 %
  const sjalvforsorjning =
    taklage === "sader" ? 0.4 : taklage === "ost-vast" ? 0.3 : 0.18;
  const arsbesparing = Math.round((arsforbrukning * sjalvforsorjning * 1.3) / 100) * 100; // kr/år
  const aterbetalning = Math.round((180000 / Math.max(arsbesparing, 1)) * 10) / 10; // år

  /* ─── Intresseformulär state ─────────────────────────────────── */
  const [leadName, setLeadName] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");
  const [leadAdress, setLeadAdress] = useState("");
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const leadHeadingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    if (leadSubmitted) leadHeadingRef.current?.focus();
  }, [leadSubmitted]);

  function skickaLead(e: React.FormEvent) {
    e.preventDefault();
    if (
      leadName.trim() &&
      leadEmail.trim() &&
      leadPhone.trim() &&
      leadAdress.trim()
    ) {
      setLeadSubmitted(true);
    }
  }

  /* ─── Block-array ─────────────────────────────────────────────── */
  const blocks: BlockDef[] = [
    /* ─── 1. HERO, fokus på kundvärdet ───────────────────────── */
    {
      id: "hero",
      label: "Hero",
      variants: [
        {
          key: "varde",
          label: "Värde-hero, sänk elkostnaden",
          render: () => (
            <Annotation
              label="Hero, bygger förtroende före bokning"
              audience="user"
              rationale="Att boka rådgivning kräver tid, så heron visar först vad kunden vinner i konkreta siffror. Utan fast panel äger heron den primära knappen 'Boka kostnadsfri rådgivning'. Den sekundära knappen leder osäkra besökare till kalkylatorn."
            >
              <section className="py-8 sm:py-12 grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <p className="text-eyebrow uppercase text-ink-muted mb-3">Egen elproduktion</p>
                  <Copy
                    label="H1, rubrik med konkret löfte"
                    category="rubrik"
                    text="Solceller på taket: sänk elkostnaden med upp till 40 %"
                    rationale="Ett konkret löfte med siffra i stället för 'Investera i solceller'. 'Upp till' gör löftet ärligt utan att det tappar kraft. Undvik värdeord som 'fantastisk' eller 'enorm'."
                  >
                    <h1 className="text-display leading-tight mb-3">
                      Solceller på taket: sänk elkostnaden med upp till 40 %
                    </h1>
                  </Copy>
                  <Copy
                    label="Ingress, tre löften"
                    category="reassurance"
                    text="Vi anpassar anläggningen efter ditt tak och din förbrukning. Besiktningen är kostnadsfri, du får en skriftlig offert och sedan bestämmer du."
                    rationale="Tre löften i två meningar: anpassat efter dig (inget standardpaket), kostnadsfri första kontakt och ingen säljpress. Meningen slutar med att beslutet är ditt."
                  >
                    <p className="text-lede text-ink-secondary mb-6 leading-relaxed">
                      Vi anpassar anläggningen efter ditt tak och din förbrukning. Besiktningen är
                      kostnadsfri, du får en skriftlig offert och sedan bestämmer du.
                    </p>
                  </Copy>
                  {/* Primär och sekundär CTA i heron. v2 har ingen fast panel,
                     så heron äger den primära handlingen direkt. */}
                  <div className="flex flex-wrap gap-3">
                    <Copy
                      label="Primär CTA, kostnadsfri rådgivning"
                      category="cta"
                      text="Boka kostnadsfri rådgivning"
                      rationale="'Boka' låter som ett avtalat samtal, inte ett köp. 'Kostnadsfri' tar bort den första oron redan före klicket. 'Rådgivning' visar att kunden får något. Samma formulering används i formuläret längre ned."
                    >
                      <a
                        href="#lead-form"
                        className="inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-7 py-3.5 rounded hover:opacity-90 transition-opacity text-base"
                      >
                        Boka kostnadsfri rådgivning
                        <Icon name="arrow_forward" size={18} />
                      </a>
                    </Copy>
                    <Copy
                      label="Sekundär CTA, till kalkylatorn"
                      category="cta"
                      text="Räkna ut din besparing"
                      rationale="Verb plus det användaren får. Knappen är till för den som inte är redo att boka och säger tydligt att man kan räkna själv utan att lämna några uppgifter."
                    >
                      <a
                        href="#kalkylator"
                        className="inline-flex items-center gap-2 border border-border-strong text-brand-primary font-medium px-6 py-3.5 rounded hover:bg-tint-info text-base"
                      >
                        <Icon name="calculate" size={18} />
                        Räkna ut din besparing
                      </a>
                    </Copy>
                  </div>
                  <Copy
                    label="Trygghetsrad under knapparna"
                    category="reassurance"
                    text="Vi ringer upp inom 2 arbetsdagar · Ingen säljpress · Du bestämmer själv om och när"
                    rationale="Svarar på de tre vanligaste farhågorna precis vid knappen: hur snabbt, om det blir säljtryck och om man binder sig. Samma formuleringar som i formuläret."
                  >
                    <p className="text-xs text-ink-muted mt-3">
                      Vi ringer upp inom 2 arbetsdagar · Ingen säljpress · Du bestämmer själv om och när
                    </p>
                  </Copy>
                </div>

                <div className="bg-tint-info aspect-[4/3] rounded-md flex items-center justify-center">
                  <Icon name="solar_power" size={120} className="text-brand-accent" />
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 2. KUNDVÄRDE, fyra USP:ar ──────────────────────────── */
    {
      id: "kundvarde",
      label: "Kundvärde, fyra USP:ar",
      variants: [
        {
          key: "ikoner",
          label: "Ikonkort, fyra stycken",
          render: () => (
            <Annotation
              label="Kundvärde, varför välja oss"
              audience="user"
              rationale="Här byggs övertygelsen innan formuläret. Fyra fakta med siffror där det går, till exempel '20 % grönt skatteavdrag' i stället för 'miljövänligt'. Varje kort svarar på en vanlig tvekan: pris, ekonomi, miljö och garanti."
            >
              <section className="py-10 border-t border-border-subtle">
                <Copy
                  label="Sektionsrubrik, varför oss"
                  category="rubrik"
                  text="Varför solceller från oss"
                  rationale="'Från oss' flyttar fokus från solceller i allmänhet till varför man ska välja Öresundskraft. Det ger ett skäl att stanna här i stället för att jämföra vidare på Google."
                >
                  <h2 className="text-h3 font-medium mb-2">Varför solceller från oss</h2>
                </Copy>
                <Copy
                  label="Ingress, kundvärde"
                  category="ton"
                  text="Fyra konkreta skäl att skaffa solceller nu."
                  rationale="Kort och saklig. Lovar siffror och fakta i stället för gröna fraser, och säger hur många punkter som kommer så att läsaren vet vad som väntar."
                >
                  <p className="text-ink-secondary mb-6 max-w-reading">
                    Fyra konkreta skäl att skaffa solceller nu.
                  </p>
                </Copy>
                <Copy
                  label="USP-rubriker, fyra kort"
                  category="rubrik"
                  text={KUNDVARDE.map((u) => u.titel).join(" · ")}
                  rationale="Varje rubrik är ett konkret värde med siffra eller handling ('Sänk', 'Producera'). Brödtexten under ger beviset. Håll rubrikerna korta och undvik ord som 'hållbar' utan innehåll."
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    {KUNDVARDE.map((u) => (
                      <div key={u.titel} className="p-5 rounded-md border border-border-subtle bg-surface">
                        <Icon name={u.ikon} size={32} className="text-brand-accent mb-3" />
                        <h3 className="font-medium mb-2">{u.titel}</h3>
                        <p className="text-sm text-ink-secondary leading-snug">{u.text}</p>
                      </div>
                    ))}
                  </div>
                </Copy>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 3. SPARKALKYLATOR, interaktiv ──────────────────────── */
    {
      id: "kalkylator",
      label: "Sparkalkylator",
      variants: [
        {
          key: "interaktiv",
          label: "Interaktiv kalkyl, förbrukning och takläge",
          render: () => (
            <Annotation
              label="Sparkalkylator, låt osäkra räkna själva"
              audience="user"
              rationale="För den som inte är redo att lämna sina uppgifter. Två frågor ger en personlig siffra direkt och svarar på 'lönar det sig för mig?'. Resultatet kallas tydligt en uppskattning så att nästa steg, offerten, känns naturligt."
            >
              <section id="kalkylator" className="py-10 border-t border-border-subtle">
                <Copy
                  label="Kalkylatorrubrik"
                  category="rubrik"
                  text="Räkna ut vad du kan spara"
                  rationale="Verb först och du-tilltal. Samma ord som knappen i heron ('Räkna ut din besparing') så att användaren känner igen var hen hamnat. Undvik 'potentiell besparing', det låter som ett förbehåll."
                >
                  <h2 className="text-h3 font-medium mb-2">Räkna ut vad du kan spara</h2>
                </Copy>
                <Copy
                  label="Ingress, förväntan på kalkylen"
                  category="reassurance"
                  text="Svara på två frågor så får du en uppskattning. Exakta siffror får du i offerten efter besiktningen."
                  rationale="Säger hur lite som krävs (två frågor) och sätter rätt förväntan: det här är en uppskattning, det exakta kommer i offerten."
                >
                  <p className="text-ink-secondary mb-6 max-w-reading">
                    Svara på två frågor så får du en uppskattning. Exakta siffror får du i offerten
                    efter besiktningen.
                  </p>
                </Copy>

                <div className="grid lg:grid-cols-2 gap-6 max-w-content">
                  {/* Frågor */}
                  <div className="space-y-5 p-6 rounded-md border border-border-subtle bg-surface">
                    <Copy
                      label="Fält, elförbrukning med hjälptext"
                      category="metadata"
                      text="Din elförbrukning per år. Hjälptext: Du hittar den på din senaste årsfaktura. En vanlig villa använder cirka 20 000 kWh per år."
                      rationale="Hjälptexten säger först var siffran finns och ger sedan ett riktvärde för den som inte har fakturan framför sig. Fältet är förifyllt med riktvärdet så att kalkylen visar ett resultat direkt."
                    >
                      <div>
                        <label
                          htmlFor="kalk-forbrukning"
                          className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-1.5 block"
                        >
                          Din elförbrukning per år
                        </label>
                        <div className="inline-flex items-stretch h-11 rounded-md border border-border-subtle bg-canvas focus-within:border-brand-accent focus-within:ring-2 focus-within:ring-brand-accent/30">
                          <input
                            id="kalk-forbrukning"
                            type="text"
                            inputMode="numeric"
                            value={forbrukningInput}
                            onChange={(e) => uppdateraForbrukning(e.target.value)}
                            onBlur={() => setForbrukningInput(formatInt(arsforbrukning))}
                            className="w-[110px] bg-transparent px-3 text-base font-medium text-right focus:outline-none"
                          />
                          <span className="px-3 text-sm text-ink-muted border-l border-border-subtle flex items-center">
                            kWh/år
                          </span>
                        </div>
                        <p className="text-xs text-ink-muted mt-1.5">
                          Du hittar den på din senaste årsfaktura. En vanlig villa använder cirka
                          20 000 kWh per år.
                        </p>
                      </div>
                    </Copy>

                    <Copy
                      label="Val, takets riktning"
                      category="metadata"
                      text="Åt vilket håll vetter taket? Söderläge (Bäst: full sol mitt på dagen) · Öst eller väst (Bra: sol på morgonen eller eftermiddagen) · Norrläge (Fungerar, men ger mindre el)"
                      rationale="Frågan ställs som man skulle säga den högt, i stället för fackordet 'Takläge'. Varje alternativ har en kort bedömning så att användaren förstår hur valet påverkar resultatet."
                    >
                      <fieldset>
                        <legend className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-1.5 block">
                          Åt vilket håll vetter taket?
                        </legend>
                        <div role="radiogroup" className="space-y-2">
                          {[
                            { id: "sader" as const, label: "Söderläge", hint: "Bäst: full sol mitt på dagen" },
                            { id: "ost-vast" as const, label: "Öst eller väst", hint: "Bra: sol på morgonen eller eftermiddagen" },
                            { id: "norr" as const, label: "Norrläge", hint: "Fungerar, men ger mindre el" },
                          ].map((o) => (
                            <label
                              key={o.id}
                              className={`flex items-start gap-3 p-3 rounded-md border cursor-pointer transition-colors ${
                                taklage === o.id
                                  ? "border-brand-accent bg-tint-info"
                                  : "border-border-subtle hover:border-brand-accent/60"
                              }`}
                            >
                              <input
                                type="radio"
                                name="taklage"
                                value={o.id}
                                checked={taklage === o.id}
                                onChange={() => setTaklage(o.id)}
                                className="mt-0.5 accent-brand-primary"
                              />
                              <span className="flex-1">
                                <span className="font-medium block text-sm">{o.label}</span>
                                <span className="text-xs text-ink-secondary">{o.hint}</span>
                              </span>
                            </label>
                          ))}
                        </div>
                      </fieldset>
                    </Copy>
                  </div>

                  {/* Resultat */}
                  <div
                    className="p-6 rounded-md bg-tint-info border-2 border-brand-accent flex flex-col"
                    aria-live="polite"
                  >
                    <p className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-2">
                      Din uppskattade besparing
                    </p>
                    <Copy
                      label="Kalkylresultat, besparing per år"
                      category="rubrik"
                      text="Din uppskattade besparing: ~[belopp] kr/år. Baserat på [förbrukning] kWh/år och [takets riktning]."
                      rationale="Tecknet '~' och ordet 'uppskattade' visar att siffran är ungefärlig. Raden under upprepar användarens egna svar så att det syns vad siffran bygger på."
                    >
                      <p className="text-display font-medium leading-none mb-1">
                        ~{formatInt(arsbesparing)}
                        <span className="text-h4 text-ink-secondary"> kr/år</span>
                      </p>
                    </Copy>
                    <p className="text-sm text-ink-secondary mb-5">
                      Baserat på {formatInt(arsforbrukning)} kWh/år och{" "}
                      {taklage === "sader"
                        ? "söderläge"
                        : taklage === "ost-vast"
                        ? "öst- eller västläge"
                        : "norrläge"}
                      .
                    </p>

                    <Copy
                      label="Kalkylresultat, nyckeltal"
                      category="metadata"
                      text="Självförsörjning · Återbetalningstid · Minskade CO₂-utsläpp"
                      rationale="Tre nyckeltal som svarar på följdfrågorna: hur mycket el gör jag själv, när har jag tjänat in investeringen och vad gör det för klimatet."
                    >
                      <dl className="space-y-2 text-sm mb-6 pb-6 border-b border-brand-accent/30">
                        <div className="flex justify-between gap-3">
                          <dt className="text-ink-secondary">Självförsörjning</dt>
                          <dd className="font-medium">~{Math.round(sjalvforsorjning * 100)} %</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt className="text-ink-secondary">Återbetalningstid</dt>
                          <dd className="font-medium">~{aterbetalning.toFixed(1)} år</dd>
                        </div>
                        <div className="flex justify-between gap-3">
                          <dt className="text-ink-secondary">Minskade CO₂-utsläpp</dt>
                          <dd className="font-medium">~{formatInt(Math.round(arsforbrukning * sjalvforsorjning * 0.05))} kg/år</dd>
                        </div>
                      </dl>
                    </Copy>

                    <Copy
                      label="CTA från kalkylen, till formuläret"
                      category="cta"
                      text="Få en exakt offert för ditt hus"
                      rationale="Knappen tar vid där uppskattningen slutar: från ungefärlig siffra till exakt offert. 'Ditt hus' gör nästa steg personligt. Undvik 'Skicka' eller 'Gå vidare'."
                    >
                      <a
                        href="#lead-form"
                        className="mt-auto inline-flex items-center justify-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-5 py-3 rounded hover:opacity-90"
                      >
                        Få en exakt offert för ditt hus
                        <Icon name="arrow_forward" size={16} />
                      </a>
                    </Copy>
                    <Copy
                      label="Förbehåll under knappen"
                      category="reassurance"
                      text="Det här är en uppskattning. Exakta siffror får du efter besiktningen."
                      rationale="Upprepar förbehållet precis där beslutet tas, så att ingen tror att siffran är ett löfte."
                    >
                      <p className="text-xs text-ink-muted text-center mt-2">
                        Det här är en uppskattning. Exakta siffror får du efter besiktningen.
                      </p>
                    </Copy>
                  </div>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 4. SÅ GÅR DET TILL, 4 steg ─────────────────────────── */
    {
      id: "process",
      label: "Så går det till",
      variants: [
        {
          key: "fyra-steg",
          label: "Fyra steg med tidsangivelser",
          render: () => (
            <Annotation
              label="Processteg, visar vad som händer efter anmälan"
              audience="user"
              rationale="Den viktigaste delen på en sida för intresseanmälan. Besökaren undrar vad som händer om hen fyller i formuläret. Fyra steg med tidsangivelser och tydligt 'kostnadsfri' gör svaret begripligt och sänker tröskeln."
            >
              <section className="py-10 border-t border-border-subtle">
                <Copy
                  label="Processrubrik"
                  category="rubrik"
                  text="Så går det till: från intresseanmälan till installation"
                  rationale="Rubriken visar hela vägen från första till sista steget. Användaren ser att processen har ett tydligt slut och inte är oöverskådlig."
                >
                  <h2 className="text-h3 font-medium mb-2">Så går det till: från intresseanmälan till installation</h2>
                </Copy>
                <Copy
                  label="Ingress, du bestämmer"
                  category="reassurance"
                  text="Du vet alltid vad som händer härnäst. Efter varje steg bestämmer du själv om du vill gå vidare."
                  rationale="Svarar på oron att binda sig för tidigt. Säg rakt ut att beslutet ligger hos kunden i varje steg. Undvik bildspråk som 'du går aldrig blint'."
                >
                  <p className="text-ink-secondary mb-6 max-w-reading">
                    Du vet alltid vad som händer härnäst. Efter varje steg bestämmer du själv om du
                    vill gå vidare.
                  </p>
                </Copy>
                <Copy
                  label="Stegen, rubrik och tidsangivelse"
                  category="metadata"
                  text={PROCESS.map((s) => `${s.n}. ${s.titel} (${s.tid})`).join(" · ")}
                  rationale="Varje steg har ett substantiv som rubrik, en mening om vad som händer och en tidsangivelse. Tiden svarar på 'hur lång tid tar det?' innan någon behöver fråga."
                >
                  <ol className="grid sm:grid-cols-2 gap-4">
                    {PROCESS.map((s) => (
                      <li
                        key={s.n}
                        className="p-5 rounded-md border border-border-subtle bg-surface flex flex-col gap-2 relative"
                      >
                        <span className="inline-flex w-8 h-8 rounded-full bg-brand-primary text-white items-center justify-center font-bold text-sm">
                          {s.n}
                        </span>
                        <h3 className="font-medium">{s.titel}</h3>
                        <p className="text-sm text-ink-secondary leading-snug flex-1">{s.text}</p>
                        <span className="text-xs text-ink-muted font-medium uppercase tracking-wider mt-2 inline-flex items-center gap-1">
                          <Icon name="schedule" size={12} />
                          {s.tid}
                        </span>
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

    /* ─── 4b. CTA-BANNER, efter processen ───────────────────── */
    {
      id: "inline-cta-nasta-steg",
      label: "CTA i flödet, nästa steg (efter processen)",
      variants: [
        {
          key: "fullbredd",
          label: "Banner i full bredd efter processtegen",
          render: () => (
            <Annotation
              label="CTA-banner, beslutspunkt efter processen"
              audience="user"
              rationale="Här har besökaren sett värdet, räknat på sin besparing och förstått stegen. Det är ett naturligt läge att boka. Överrubriken 'Nästa steg' visar att bannern är en del av flödet och inte ett avbrott."
            >
              <section className="py-10 border-t border-border-subtle">
                <div className="rounded-lg bg-tint-notice border-l-4 border-brand-highlight p-6 sm:p-8">
                  <div className="grid md:grid-cols-[1fr_auto] gap-6 items-center">
                    <div>
                      <p className="text-[11px] uppercase tracking-wider text-brand-highlight font-bold mb-2 inline-flex items-center gap-1.5">
                        <Icon name="lightbulb" size={14} filled />
                        Nästa steg
                      </p>
                      <Copy
                        label="Nästa steg, rubrik"
                        category="rubrik"
                        text="Redo för en exakt offert?"
                        rationale="En fråga som möter besökaren där hen är efter att ha läst processen. 'Redo' erkänner att man kanske tvekar, och frågeformen bjuder in utan att kräva något."
                      >
                        <h2 className="text-h3 font-medium text-ink mb-2">
                          Redo för en exakt offert?
                        </h2>
                      </Copy>
                      <Copy
                        label="Brödtext, från uppskattning till offert"
                        category="reassurance"
                        text="Kalkylatorn ger en uppskattning. För en exakt offert mäter vi ditt tak, går igenom din förbrukning och räknar ut vilka paneler och vilken växelriktare du behöver. Det kostar ingenting och du binder dig inte."
                        rationale="Förklarar skillnaden mellan kalkylen och offerten och vad besiktningen innebär. Slutar med de två viktigaste beskeden: gratis och inget åtagande."
                      >
                        <p className="text-base text-ink-secondary max-w-reading">
                          Kalkylatorn ger en uppskattning. För en exakt offert mäter vi ditt tak, går
                          igenom din förbrukning och räknar ut vilka paneler och vilken växelriktare
                          du behöver. Det kostar ingenting och du binder dig inte.
                        </p>
                      </Copy>
                    </div>
                    <Copy
                      label="CTA-banner, knapp"
                      category="cta"
                      text="Boka kostnadsfri besiktning"
                      rationale="Namnger det konkreta steget som följer, besiktningen, i stället för ett allmänt 'Kontakta oss'. Leder till samma formulär som övriga bokningsknappar."
                    >
                      <a
                        href="#lead-form"
                        className="inline-flex items-center justify-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-7 py-3.5 rounded text-base hover:opacity-90 shrink-0"
                      >
                        Boka kostnadsfri besiktning
                        <Icon name="arrow_forward" size={18} />
                      </a>
                    </Copy>
                  </div>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 5. KUNDCASE, utförlig story default ────────────────── */
    {
      id: "kundcase",
      label: "Kundcase",
      variants: [
        {
          key: "story",
          label: "Case-story (default, djup för stora investeringar)",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <KundcaseStory />
            </section>
          ),
        },
        {
          key: "hero",
          label: "Hero-citat",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <KundcaseHero />
            </section>
          ),
        },
        {
          key: "grid",
          label: "Citatkort-grid",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <KundcaseGrid />
            </section>
          ),
        },
      ],
    },

    /* ─── 6. PRODUKTINFO, utan pris och CTA ─────────────────────
     * CTA:n finns i heron, bannern och formuläret. Det här blocket är ren information. */
    {
      id: "specs",
      label: "Produktinfo, vad ingår",
      variants: [
        {
          key: "info-only",
          label: "Bara information: ingår, villkor och fördelar (standard)",
          render: () => (
            <Annotation
              label="Produktinfo, bara information"
              audience="design"
              rationale="Blocket har medvetet varken pris eller knapp. Bokningen finns i heron, i bannern efter processen och i formuläret. Här finns bara bild, beskrivning, vad som ingår, villkor och fördelar, vilket gör sidan lättare att läsa."
            >
              <section className="py-10 border-t border-border-subtle">
                <Copy
                  label="Rubrik, vad som ingår"
                  category="rubrik"
                  text="Det här ingår i din solcellsanläggning"
                  rationale="Konkret och praktisk i stället för 'Tekniska specifikationer'. Svarar på 'vad får jag för pengarna?' utan fackspråk."
                >
                  <h2 className="text-h3 font-medium mb-2">Det här ingår i din solcellsanläggning</h2>
                </Copy>
                <Copy
                  label="Ingress, inget standardpaket"
                  category="reassurance"
                  text="Vi anpassar anläggningen efter ditt tak och din förbrukning, så du får inget standardpaket. Siffrorna nedan gäller en typisk villa i Helsingborg."
                  rationale="Förklarar varför det inte finns ett fast pris här och var siffrorna kommer ifrån. Det gör exemplet trovärdigt utan att det uppfattas som ett löfte."
                >
                  <p className="text-ink-secondary mb-6 max-w-reading">
                    Vi anpassar anläggningen efter ditt tak och din förbrukning, så du får inget
                    standardpaket. Siffrorna nedan gäller en typisk villa i Helsingborg.
                  </p>
                </Copy>

                <div className="grid md:grid-cols-2 gap-8 mb-6">
                  <div className="rounded-md bg-tint-info aspect-[4/3] flex items-center justify-center border border-border-subtle">
                    <div className="text-center text-ink-muted">
                      <Icon name="solar_power" size={64} className="mb-2 text-brand-accent" />
                      <p className="text-xs">{PRODUKT.bildAlt}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-ink-secondary leading-relaxed mb-4">{PRODUKT.beskrivning}</p>
                    <p className="text-sm">
                      <span className="font-medium">Passar för: </span>
                      <span className="text-ink-secondary">{PRODUKT.passarFor}</span>
                    </p>
                  </div>
                </div>

                <Copy
                  label="Underrubriker, ingår, villkor och fördelar"
                  category="rubrik"
                  text={`Ingår · Villkor · Varför ${PRODUKT.namn}?`}
                  rationale="Tre korta rubriker som delar upp informationen efter de frågor kunden har: vad får jag, vad gäller och varför ska jag välja det här. Innehållet i listorna hämtas från produktdatan och redigeras där."
                >
                  <div className="grid sm:grid-cols-3 gap-6 border-t border-border-subtle pt-6">
                    <div>
                      <h3 className="text-h5 font-medium mb-3">Ingår</h3>
                      <ul className="space-y-1.5 text-sm text-ink-secondary">
                        {PRODUKT.inkluderar.map((i) => (
                          <li key={i} className="flex gap-2">
                            <Icon name="check" size={16} className="text-brand-accent shrink-0 mt-0.5" />
                            <span>{i}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-h5 font-medium mb-3">Villkor</h3>
                      <ul className="space-y-1.5 text-sm text-ink-secondary">
                        {PRODUKT.villkor.map((v) => (
                          <li key={v} className="flex gap-2">
                            <span className="text-ink-muted shrink-0">·</span>
                            <span>{v}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-h5 font-medium mb-3">Varför {PRODUKT.namn}?</h3>
                      <ul className="space-y-1.5 text-sm text-ink-secondary">
                        {PRODUKT.uspar.map((u) => (
                          <li key={u} className="flex gap-2">
                            <Icon name="star" size={16} filled className="text-brand-accent shrink-0 mt-0.5" />
                            <span>{u}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </Copy>
              </section>
            </Annotation>
          ),
        },
        {
          key: "progressiv",
          label: "Progressiv, flikar med pris och CTA (dubblerar formuläret)",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <ProduktinfoProgressiv produkt={PRODUKT} inline />
            </section>
          ),
        },
        {
          key: "trygg",
          label: "Trygg, två kolumner med pris och CTA (dubblerar formuläret)",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <ProduktinfoTrygg produkt={PRODUKT} inline />
            </section>
          ),
        },
      ],
    },

    /* ─── 7. RÅDGIVARE, personlig kontakt ────────────────────── */
    {
      id: "saljkontakt",
      label: "Rådgivare, personlig kontakt",
      variants: [
        {
          key: "person",
          label: "Rådgivare med stort foto och bokning",
          render: () => (
            <Annotation
              label="Rådgivare, en person i stället för ett formulär"
              audience="user"
              rationale="Från workshopen: säljkontakten ska synas i de här flödena. Utan fast panel får rådgivaren större plats med ett stort foto. 'Jag pratar med Anna' känns enklare än att skicka ett formulär. Två vägar: ring direkt eller boka ett samtal som passar."
            >
              <section className="py-10 border-t border-border-subtle">
                <div className="rounded-lg bg-tint-info p-6 sm:p-8 grid md:grid-cols-[280px_1fr] gap-8 items-center">
                  {/* Stort foto av rådgivaren, platshållare */}
                  <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-brand-primary shrink-0">
                    <div className="absolute inset-0 grid place-items-center text-white">
                      <div className="text-center">
                        <span className="text-[80px] font-medium leading-none">AL</span>
                        <p className="text-xs uppercase tracking-wider mt-3 opacity-80">
                          Foto: Anna Lindqvist
                        </p>
                      </div>
                    </div>
                    {/* Namn och roll ovanpå fotots nederkant */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-5 pt-12">
                      <p className="text-[10px] uppercase tracking-wider text-white/80 font-medium mb-0.5">
                        Din rådgivare
                      </p>
                      <p className="text-white font-medium text-lg leading-tight">Anna Lindqvist</p>
                      <p className="text-white/80 text-xs">
                        Solrådgivare · 8 års erfarenhet
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4 max-w-reading">
                    <Copy
                      label="Rubrik, rådgivare"
                      category="rubrik"
                      text="Vill du hellre prata med någon?"
                      rationale="En fråga som erbjuder en annan väg än formuläret utan att kännas påträngande. Kort och vardaglig, som man skulle säga det i telefon."
                    >
                      <h2 className="text-h3 font-medium text-ink">Vill du hellre prata med någon?</h2>
                    </Copy>
                    <Copy
                      label="Brödtext, rådgivare"
                      category="reassurance"
                      text="Anna och hennes kollegor svarar gärna på dina frågor. Du behöver inte lämna en intresseanmälan först. Det är ingen säljpress, bara ett samtal om vad solceller skulle innebära för just ditt hus."
                      rationale="Tar bort ett vanligt hinder: tron att man måste anmäla intresse innan man får ställa frågor. Sista meningen säger vad samtalet handlar om."
                    >
                      <p className="text-base text-ink-secondary leading-relaxed">
                        Anna och hennes kollegor svarar gärna på dina frågor. Du behöver inte lämna en
                        intresseanmälan först. Det är ingen säljpress, bara ett samtal om vad
                        solceller skulle innebära för just ditt hus.
                      </p>
                    </Copy>
                    <Copy
                      label="Knappar, ring eller boka samtal"
                      category="cta"
                      text="Ring 042-490 32 00 · Boka ett samtal"
                      rationale="Numret står i knappen så att man kan ringa direkt eller skriva av det. 'Boka ett samtal' säger exakt vad man får, till skillnad från 'Kontakta oss'."
                    >
                      <div className="flex flex-wrap gap-3 pt-1">
                        <a
                          href="tel:0424903200"
                          className="inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-5 py-3 rounded hover:opacity-90 text-base"
                        >
                          <Icon name="call" size={18} />
                          Ring 042-490 32 00
                        </a>
                        <a
                          href="#"
                          className="inline-flex items-center gap-2 border border-border-strong text-brand-primary font-medium px-5 py-3 rounded hover:bg-surface text-base"
                        >
                          <Icon name="event_available" size={18} />
                          Boka ett samtal
                        </a>
                      </div>
                    </Copy>
                    <Copy
                      label="Öppettider"
                      category="metadata"
                      text="Telefon mån–tor 08–16, fre 10–15 · Bokade samtal alla dagar"
                      rationale="Säger när man kan ringa och att bokade samtal fungerar även utanför telefontiden. Håll formatet kort och samma som på övriga kontaktytor."
                    >
                      <p className="text-xs text-ink-muted">
                        Telefon mån–tor 08–16, fre 10–15 · Bokade samtal alla dagar
                      </p>
                    </Copy>
                  </div>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 8. FAQ, modul ──────────────────────────────────────── */
    {
      id: "faq",
      label: "FAQ",
      variants: [
        {
          key: "grupperad",
          label: "Grupperad (default, innan/under/efter)",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <FaqGrupperad />
            </section>
          ),
        },
        {
          key: "accordion",
          label: "Accordion",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <FaqAccordion />
            </section>
          ),
        },
        {
          key: "sok",
          label: "Sök + topplista",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <FaqSokTopplista />
            </section>
          ),
        },
      ],
    },

    /* ─── 9. RELATERADE PRODUKTER ──────────────────────────────── */
    {
      id: "relaterade",
      label: "Relaterade produkter",
      variants: [
        {
          key: "default",
          label: "Produkter som passar ihop, 3 ikonkort",
          render: () => (
            <RelateradeProdukter
              produkter={[
                {
                  ikon: "ev_station",
                  titel: "Ladda Smart",
                  text: "Ladda elbilen med din egen solel. Laddningen styrs automatiskt till timmarna när du producerar mest.",
                  href: "/sidtyper/produktsida-direktkop",
                },
                {
                  ikon: "support_agent",
                  titel: "Energirådgivning",
                  text: "En kostnadsfri genomgång av huset innan du investerar. Vi visar enkla sätt att spara energi.",
                  href: "#",
                },
                {
                  ikon: "heat_pump",
                  titel: "Värmepump",
                  text: "Värm huset med din egen el och sänk kostnaden för uppvärmning ännu mer.",
                  href: "#",
                },
              ]}
            />
          ),
        },
      ],
    },

    /* ─── 10. INTRESSEFORMULÄR, kort och enkelt ─────────────── */
    {
      id: "lead-form",
      label: "Intresseformulär",
      variants: [
        {
          key: "kort",
          label: "Kort, 4 fält",
          render: () => (
            <Annotation
              label="Intresseformulär, lätt att fylla i"
              audience="user"
              rationale="Målet är en intresseanmälan, inte ett köp. Därför bara fyra fält: namn, e-post, telefon och adress. Inget personnummer eller takfoto, det är för mycket i det här läget. Texten under knappen säger vad som händer sedan."
            >
              <section id="lead-form" className="py-10 border-t border-border-subtle">
                {!leadSubmitted ? (
                  <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <div>
                      <Copy
                        label="Formulärrubrik"
                        category="rubrik"
                        text="Boka kostnadsfri rådgivning"
                        rationale="Samma ord som den primära knappen i heron, så att användaren ser att det är samma handling. 'Boka' ger känslan av ett avtalat samtal, inte av att skicka iväg ett formulär. Undvik 'Anmäl' och 'Skicka'."
                      >
                        <h2 className="text-h3 font-medium mb-2">Boka kostnadsfri rådgivning</h2>
                      </Copy>
                      <Copy
                        label="Ingress, vad som händer"
                        category="reassurance"
                        text="Fyra fält. Vi ringer upp inom 2 arbetsdagar och bokar en kostnadsfri besiktning."
                        rationale="Säger först hur lite som krävs och sedan exakt vad som händer och när. Tidslöftet ska vara detsamma överallt på sidan (2 arbetsdagar)."
                      >
                        <p className="text-ink-secondary mb-4">
                          Fyra fält. Vi ringer upp inom 2 arbetsdagar och bokar en kostnadsfri besiktning.
                        </p>
                      </Copy>
                      <Copy
                        label="Trygghetspunkter"
                        category="reassurance"
                        text="Ingen säljpress, du bestämmer själv · Kostnadsfri besiktning hemma hos dig · Skriftlig offert med exakta siffror · 14 dagars ångerrätt om du ändrar dig"
                        rationale="Fyra korta punkter som svarar på de vanligaste farhågorna innan man fyller i: säljpress, kostnad, oklara siffror och att vara bunden."
                      >
                        <ul className="space-y-2 text-sm text-ink-secondary">
                          {[
                            "Ingen säljpress, du bestämmer själv",
                            "Kostnadsfri besiktning hemma hos dig",
                            "Skriftlig offert med exakta siffror",
                            "14 dagars ångerrätt om du ändrar dig",
                          ].map((t) => (
                            <li key={t} className="flex items-start gap-2">
                              <Icon name="check" size={16} className="text-brand-accent mt-0.5 shrink-0" />
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </Copy>
                    </div>

                    <form
                      onSubmit={skickaLead}
                      className="p-6 rounded-md border-2 border-border-subtle bg-surface space-y-4"
                    >
                      <Copy
                        label="Fältetikett, namn"
                        category="metadata"
                        text="För- och efternamn"
                        rationale="'För- och efternamn' i stället för 'Namn' så att ingen undrar om förnamnet räcker. Etiketterna står ovanför fälten och syns även när man skriver. 'E-post' och 'Telefon' är tydliga som de är."
                      >
                        <div>
                          <label htmlFor="lead-namn" className="text-sm font-medium block mb-1">
                            För- och efternamn
                          </label>
                          <input
                            id="lead-namn"
                            type="text"
                            value={leadName}
                            onChange={(e) => setLeadName(e.target.value)}
                            required
                            className="w-full border border-border-strong rounded-md px-3 py-2.5 text-base bg-canvas focus:border-brand-accent focus:outline-none"
                          />
                        </div>
                      </Copy>
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <label htmlFor="lead-epost" className="text-sm font-medium block mb-1">
                            E-post
                          </label>
                          <input
                            id="lead-epost"
                            type="email"
                            value={leadEmail}
                            onChange={(e) => setLeadEmail(e.target.value)}
                            required
                            className="w-full border border-border-strong rounded-md px-3 py-2.5 text-base bg-canvas focus:border-brand-accent focus:outline-none"
                          />
                        </div>
                        <div>
                          <label htmlFor="lead-tel" className="text-sm font-medium block mb-1">
                            Telefon
                          </label>
                          <input
                            id="lead-tel"
                            type="tel"
                            value={leadPhone}
                            onChange={(e) => setLeadPhone(e.target.value)}
                            required
                            className="w-full border border-border-strong rounded-md px-3 py-2.5 text-base bg-canvas focus:border-brand-accent focus:outline-none"
                          />
                        </div>
                      </div>
                      <Copy
                        label="Adressfält med förklaring"
                        category="reassurance"
                        text="Adress där solcellerna ska sitta. Exempel: Storgatan 12, 252 25 Helsingborg. Hjälptext: Vi behöver den för att förbereda besiktningen."
                        rationale="Etiketten säger vilken adress som avses, exemplet visar formatet och hjälptexten förklarar varför vi frågar. Att ge ett skäl gör fler villiga att fylla i."
                      >
                        <div>
                          <label htmlFor="lead-adress" className="text-sm font-medium block mb-1">
                            Adress där solcellerna ska sitta
                          </label>
                          <input
                            id="lead-adress"
                            type="text"
                            value={leadAdress}
                            onChange={(e) => setLeadAdress(e.target.value)}
                            required
                            placeholder="Storgatan 12, 252 25 Helsingborg"
                            className="w-full border border-border-strong rounded-md px-3 py-2.5 text-base bg-canvas focus:border-brand-accent focus:outline-none"
                          />
                          <p className="text-xs text-ink-muted mt-1">Vi behöver den för att förbereda besiktningen.</p>
                        </div>
                      </Copy>
                      <Copy
                        label="Skicka-knapp"
                        category="cta"
                        text="Skicka intresseanmälan"
                        rationale="Verb plus det som skickas. 'Intresseanmälan' visar att det inte är ett köp. Undvik bara 'Skicka' eller 'Beställ'."
                      >
                        <button
                          type="submit"
                          className="w-full inline-flex items-center justify-center gap-2 bg-brand-primary text-ink-onbrand font-medium py-3 rounded hover:opacity-90 disabled:opacity-40"
                        >
                          Skicka intresseanmälan
                          <Icon name="arrow_forward" size={16} />
                        </button>
                      </Copy>
                      <Copy
                        label="Trygghetsrad under knappen"
                        category="reassurance"
                        text="Vi ringer upp inom 2 arbetsdagar · Ingen säljpress"
                        rationale="Upprepar tidslöftet och 'ingen säljpress' precis vid knappen, där tvekan är som störst."
                      >
                        <p className="text-xs text-ink-muted text-center">
                          Vi ringer upp inom 2 arbetsdagar · Ingen säljpress
                        </p>
                      </Copy>
                    </form>
                  </div>
                ) : (
                  <div
                    role="status"
                    aria-live="polite"
                    className="rounded-md bg-tint-info border-2 border-brand-accent p-6 max-w-reading"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <Icon name="check_circle" size={28} className="text-brand-accent shrink-0" filled />
                      <div>
                        <Copy
                          label="Bekräftelse, rubrik"
                          category="rubrik"
                          text="Tack! Vi hör av oss inom 2 arbetsdagar"
                          rationale="Bekräftar att anmälan kommit fram och upprepar tidslöftet, så att användaren vet när hen kan vänta sig ett samtal."
                        >
                          <h3
                            ref={leadHeadingRef}
                            tabIndex={-1}
                            className="text-h5 font-medium mb-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded"
                          >
                            Tack! Vi hör av oss inom 2 arbetsdagar
                          </h3>
                        </Copy>
                        <Copy
                          label="Bekräftelse, e-post och telefon"
                          category="ton"
                          text="Vi har skickat en bekräftelse till [e-post]. Anna eller en kollega ringer dig på [telefon]."
                          rationale="Visar användarens egna uppgifter så att hen kan se att de stämmer. Namnet på rådgivaren gör fortsättningen personlig."
                        >
                          <p className="text-sm text-ink-secondary">
                            Vi har skickat en bekräftelse till <strong className="text-ink">{leadEmail}</strong>.
                            Anna eller en kollega ringer dig på <strong className="text-ink">{leadPhone}</strong>.
                          </p>
                        </Copy>
                      </div>
                    </div>
                    <Copy
                      label="Bekräftelse, nästa steg"
                      category="metadata"
                      text="Det här händer nu: Vi har fått din intresseanmälan (klart) · En rådgivare ringer dig inom 2 arbetsdagar · Vi bokar en kostnadsfri besiktning hemma hos dig · Du får en skriftlig offert med exakta siffror"
                      rationale="Samma steg som i processblocket, nu med det första avklarat. Ordet '(klart)' står med i texten så att även skärmläsare får informationen, inte bara överstrykningen."
                    >
                      <div>
                        <p className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-2">
                          Det här händer nu
                        </p>
                        <ol className="space-y-2">
                          {[
                            "Vi har fått din intresseanmälan (klart)",
                            "En rådgivare ringer dig inom 2 arbetsdagar",
                            "Vi bokar en kostnadsfri besiktning hemma hos dig",
                            "Du får en skriftlig offert med exakta siffror",
                          ].map((t, i) => (
                            <li key={i} className="flex gap-3 text-sm">
                              <span className="shrink-0 w-5 h-5 rounded-full bg-brand-primary text-white grid place-items-center text-[11px] font-bold">
                                {i + 1}
                              </span>
                              <span className={i === 0 ? "text-ink-secondary line-through" : ""}>{t}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </Copy>
                  </div>
                )}
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
        kategori="Produktsida leadsgenerering v2, CTA i flödet (Solceller)"
        syfte="Bygga förtroende inför en stor investering. Besökaren ska kunna räkna på sin besparing innan hen lämnar några uppgifter, läsa kundcase, förstå processen och till sist lämna en enkel intresseanmälan med fyra fält. Rådgivaren visas med namn och foto så att kontakten känns personlig. Sidan har ingen fast panel. Bokningen erbjuds i stället där besökaren naturligt fattar beslut: i heron, i kalkylatorn, efter processen och i formuläret."
        malgrupp="Villaägare i nordvästra Skåne, ofta mitt i livet, som funderar på en investering på 150 000 kr eller mer. De vill tänka efter, prata med sin partner och jämföra leverantörer. De bestämmer sig sällan vid första besöket, så sidan ska fungera vid flera besök."
        primarHandling="Boka kostnadsfri rådgivning via intresseformuläret. Alternativ: ring eller boka ett samtal med rådgivaren, eller räkna själv i kalkylatorn."
        ton="Rådgivande, inte säljande. Inga 'fantastiska besparingar', utan siffror med 'upp till' och 'baserat på'. Personlig (rådgivarens namn och foto) men inte påträngande. 'Ingen säljpress' och tidslöftet '2 arbetsdagar' återkommer på flera ställen och ska formuleras likadant."
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

      <Annotation
        label="Brödsmulor, visar var du är"
        audience="design"
        rationale="Många kommer hit direkt från Google eller en kampanj. Brödsmulorna visar var sidan ligger och ger en enkel väg tillbaka till övriga smarta produkter."
      >
        <nav aria-label="Brödsmulor" className="text-xs text-ink-muted mt-4 mb-2">
          <ol className="flex gap-1">
            <li><a href="#" className="hover:text-brand-accent">Privat</a></li>
            <li aria-hidden="true">›</li>
            <li><a href="#" className="hover:text-brand-accent">Smarta produkter</a></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page" className="font-medium text-ink">Solceller</li>
          </ol>
        </nav>
      </Annotation>

      {/* Full bredd, inga fasta paneler. CTA-bannern och rådgivarblocket
          är beslutspunkter i flödet, intresseformuläret kommer sist. */}
      <BlockList pageId="produktsida-leadsgen2" blocks={blocks} />
    </div>
  );
}
