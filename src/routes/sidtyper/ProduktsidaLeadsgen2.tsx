import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { Icon } from "../../components/Icon";
/* Sticky-panelen importeras INTE i v2 — inline-in-flow-pattern. */
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
 * SIDTYP 11b, Produktsida leadsgenerering v2 (inline-in-flow)
 *
 * Variant av Leadsgen där sticky-kolumnen och sticky-bottom-bar är
 * borttagna helt. Istället: full-bredds-content med kontextuella
 * CTA-banner placerade vid naturliga beslutspunkter i flödet.
 *
 * UX-rationale (Krug + Spool): solceller är ett research-läge-beslut
 * (180 000+ kr investering, lång värdekedja). Sticky-pressur känns
 * påflugen vid den här typen av åtagande. Inline-in-flow respekterar
 * att användaren behöver tid att läsa, beräkna, övertyga sig själv.
 *
 * Tre kontextuella mini-CTA-banner ligger där användaren naturligt
 * når en beslutspunkt:
 *  1. Efter Kundvärde (4 USPs), 'läst om värdet, dags att räkna eller boka?'
 *  2. Efter Spar-kalkylator, 'sett siffrorna, dags att verifiera?'
 *  3. Efter Process, 'förstått stegen, dags att boka?'
 * Befintliga säljkontakt-block och lead-form sist äger den slutliga
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
    text: "Varje kWh ni inte använder säljs tillbaka till nätet. Vi köper med marknadens bästa villkor.",
  },
  {
    ikon: "verified",
    titel: "10 års produktgaranti",
    text: "På paneler och växelriktare. Förväntad livslängd 25–30 år.",
  },
];

const PROCESS = [
  {
    n: 1,
    titel: "Intresseanmälan",
    text: "Du fyller i adress och ungefärlig årsförbrukning. Vi återkommer inom 2 arbetsdagar.",
    tid: "5 min",
  },
  {
    n: 2,
    titel: "Kostnadsfri besiktning",
    text: "Vi besöker er fastighet, mäter taket och gör en preliminär dimensionering. Helt kostnadsfri.",
    tid: "Inom 2 veckor",
  },
  {
    n: 3,
    titel: "Skriftlig offert",
    text: "Du får en exakt offert med pris, paneler, växelriktare, beräknad produktion och återbetalningstid.",
    tid: "Inom 1 vecka",
  },
  {
    n: 4,
    titel: "Installation",
    text: "Certifierad montör monterar och kopplar in mot nätet. Vi hanterar bygganmälan och nätanslutning.",
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

  // Schablon: söderläge ger ~80 % självförsörjning, ost/väst ~60 %, norr ~30 %
  const sjalvforsorjning =
    taklage === "sader" ? 0.4 : taklage === "ost-vast" ? 0.3 : 0.18;
  const arsbesparing = Math.round((arsforbrukning * sjalvforsorjning * 1.3) / 100) * 100; // kr/år
  const aterbetalning = Math.round((180000 / Math.max(arsbesparing, 1)) * 10) / 10; // år

  /* ─── Lead-form state ────────────────────────────────────────── */
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
    /* ─── 1. HERO, värdepropositions-fokus ────────────────────── */
    {
      id: "hero",
      label: "Hero",
      variants: [
        {
          key: "varde",
          label: "Värde-hero, sänk elkostnaden",
          render: () => (
            <Annotation
              label="Hero, bygger förtroende, inte konvertering direkt"
              audience="user"
              rationale="Leadsgen-tröskel är hög (boka rådgivning = avsätta tid). Hero säljer drömmen i konkreta siffror (40 % lägre elkostnad, X kr/år) snarare än en transaktion. Två CTA-tier: primär 'Boka kostnadsfri rådgivning', sekundär 'Räkna själv' som låter osäkra utforska utan att prata med säljare."
            >
              <section className="py-8 sm:py-12 grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <p className="text-eyebrow uppercase text-ink-muted mb-3">Egen elproduktion</p>
                  <Copy
                    label="H1, utfallsbaserad rubrik"
                    category="rubrik"
                    text="Solceller på taket, sänk elkostnaden upp till 40 %"
                    rationale="Konkret löfte med siffra istället för 'Investera i solceller'. Siffran (40 %) skapar nyfikenhet utan att lova för mycket, 'upp till' är ärlig disclaimer som ändå låter ambitiös."
                  >
                    <h1 className="text-display leading-tight mb-3">
                      Solceller på taket, sänk elkostnaden upp till 40 %
                    </h1>
                  </Copy>
                  <Copy
                    label="USP-mening"
                    category="reassurance"
                    text="Vi dimensionerar efter ditt tak och din förbrukning. Kostnadsfri besiktning, skriftlig offert, du bestämmer."
                    rationale="Tre ledtrådar i en mening: dimensionerat åt dig (inte standardpaket), kostnadsfri första kontakt (sänker tröskel), 'du bestämmer' (ingen säljpress). Avslutar med agency hos läsaren."
                  >
                    <p className="text-lede text-ink-secondary mb-6 leading-relaxed">
                      Vi dimensionerar efter ditt tak och din förbrukning. Kostnadsfri besiktning,
                      skriftlig offert, du bestämmer.
                    </p>
                  </Copy>
                  {/* Primär + sekundär CTA i hero. v2 har ingen sticky-panel,
                     så heron äger den primära handlingen direkt. */}
                  <div className="flex flex-wrap gap-3">
                    <Copy
                      label="Primär CTA, kostnadsfri rådgivning"
                      category="cta"
                      text="Boka kostnadsfri rådgivning"
                      rationale="'Boka' är konsultativ, inte transaktionell. 'Kostnadsfri' tar bort den primära oron innan klick. 'Rådgivning' (inte 'samtal' eller 'kontakt') signalerar expert-värde, du får något, inte ger något."
                    >
                      <a
                        href="#lead-form"
                        className="inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-7 py-3.5 rounded hover:opacity-90 transition-opacity text-base"
                      >
                        Boka kostnadsfri rådgivning
                        <Icon name="arrow_forward" size={18} />
                      </a>
                    </Copy>
                    <a
                      href="#kalkylator"
                      className="inline-flex items-center gap-2 border border-border-strong text-brand-primary font-medium px-6 py-3.5 rounded hover:bg-tint-info text-base"
                    >
                      <Icon name="calculate" size={18} />
                      Räkna själv först
                    </a>
                  </div>
                  <p className="text-xs text-ink-muted mt-3">
                    Vi ringer upp inom 2 arbetsdagar · Ingen säljpress · Du bestämmer själv när och om
                  </p>
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

    /* ─── 2. KUNDVÄRDE, fyra USPs ────────────────────────────── */
    {
      id: "kundvarde",
      label: "Kundvärde, fyra USPs",
      variants: [
        {
          key: "ikoner",
          label: "Ikon-kort, fyra kolumner",
          render: () => (
            <Annotation
              label="Kundvärde, varför just denna lösning"
              audience="user"
              rationale="Här ligger leadsgens viktigaste arbete: bygga övertygelse innan formuläret. Fyra fakta med siffror där det går, inte 'miljövänligt' utan '20 % grönt skatteavdrag'. Varje USP svarar på en typisk tvekan: pris, ekonomi, miljö, garanti."
            >
              <section className="py-10 border-t border-border-subtle">
                <Copy
                  label="Sektionsrubrik, varför solceller"
                  category="rubrik"
                  text="Varför solceller från oss"
                  rationale="'Från oss' lägger till företagsförtroende-vinkeln. Skiljer från generiska 'Varför solceller?'-sidor som finns överallt, ger anledning att stanna här istället för att jämföra på Google."
                >
                  <h2 className="text-h3 font-medium mb-2">Varför solceller från oss</h2>
                </Copy>
                <p className="text-ink-secondary mb-6 max-w-reading">
                  Konkret värde, inte gröna fraser. Här är fyra anledningar varför just nu kan vara rätt tid.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  {KUNDVARDE.map((u) => (
                    <div key={u.titel} className="p-5 rounded-md border border-border-subtle bg-surface">
                      <Icon name={u.ikon} size={32} className="text-brand-accent mb-3" />
                      <h3 className="font-medium mb-2">{u.titel}</h3>
                      <p className="text-sm text-ink-secondary leading-snug">{u.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 3. SPAR-KALKYLATOR, interaktiv ─────────────────────── */
    {
      id: "kalkylator",
      label: "Spar-kalkylator",
      variants: [
        {
          key: "interaktiv",
          label: "Interaktiv kalkyl, förbrukning + takläge",
          render: () => (
            <Annotation
              label="Spar-kalkylator, låt osäkra utforska"
              audience="user"
              rationale="För osäkra som inte är redo för intresseanmälan ännu. Live-kalkyl ger personlig siffra utan att lämna kontaktuppgifter, sänker tröskel för 'is it worth it'-frågan. Är medvetet en uppskattning ('exakta siffror i offerten') så användaren förstår nästa steg."
            >
              <section id="kalkylator" className="py-10 border-t border-border-subtle">
                <Copy
                  label="Kalkylator-rubrik"
                  category="rubrik"
                  text="Räkna själv, vad sparar du?"
                  rationale="Direkt fråga + verbet 'räkna'. 'Vad sparar du?' framför 'spara' eller 'din potentiella besparing', direkt och personligt. 'Räkna själv' signalerar agency och att kalkyleringen är genomskinlig."
                >
                  <h2 className="text-h3 font-medium mb-2">Räkna själv, vad sparar du?</h2>
                </Copy>
                <p className="text-ink-secondary mb-6 max-w-reading">
                  Två frågor ger en uppskattning. Exakta siffror får du i offerten efter besiktning.
                </p>

                <div className="grid lg:grid-cols-2 gap-6 max-w-content">
                  {/* Input-sida */}
                  <div className="space-y-5 p-6 rounded-md border border-border-subtle bg-surface">
                    <div>
                      <label
                        htmlFor="kalk-forbrukning"
                        className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-1.5 block"
                      >
                        Din årliga elförbrukning
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
                        Typvilla i Sverige: ~20 000 kWh/år. Står på din senaste årsfaktura.
                      </p>
                    </div>

                    <fieldset>
                      <legend className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-1.5 block">
                        Takläge
                      </legend>
                      <div role="radiogroup" className="space-y-2">
                        {[
                          { id: "sader" as const, label: "Söderläge", hint: "Bäst, full sol mitt på dagen" },
                          { id: "ost-vast" as const, label: "Öst eller väst", hint: "Bra, sol morgon eller eftermiddag" },
                          { id: "norr" as const, label: "Norrläge", hint: "Fungerar men låg avkastning" },
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
                  </div>

                  {/* Resultat-sida */}
                  <div
                    className="p-6 rounded-md bg-tint-info border-2 border-brand-accent flex flex-col"
                    aria-live="polite"
                  >
                    <p className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-2">
                      Uppskattad besparing
                    </p>
                    <p className="text-display font-medium leading-none mb-1">
                      ~{formatInt(arsbesparing)}
                      <span className="text-h4 text-ink-secondary"> kr/år</span>
                    </p>
                    <p className="text-sm text-ink-secondary mb-5">
                      Baserat på {formatInt(arsforbrukning)} kWh/år och{" "}
                      {taklage === "sader"
                        ? "söderläge"
                        : taklage === "ost-vast"
                        ? "öst-/västläge"
                        : "norrläge"}
                      .
                    </p>

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
                        <dt className="text-ink-secondary">CO₂-besparing</dt>
                        <dd className="font-medium">~{formatInt(Math.round(arsforbrukning * sjalvforsorjning * 0.05))} kg/år</dd>
                      </div>
                    </dl>

                    <a
                      href="#lead-form"
                      className="mt-auto inline-flex items-center justify-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-5 py-3 rounded hover:opacity-90"
                    >
                      Få exakt offert för min adress
                      <Icon name="arrow_forward" size={16} />
                    </a>
                    <p className="text-xs text-ink-muted text-center mt-2">
                      Uppskattning, exakt offert efter besiktning
                    </p>
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
          label: "Fyra steg horisontellt med tidsangivelser",
          render: () => (
            <Annotation
              label="Process-steg, sänker tröskel före formulär"
              audience="user"
              rationale="Den enskilt viktigaste delen av leadsgen. Användaren undrar 'vad händer om jag fyller i?', process-blocket svarar exakt: 4 steg, tidsangivelser, kostnadsfri-stämpel där det gäller. Reducerar 'vill jag verkligen lämna mina uppgifter?' från ja/nej till 'OK, det här är begripligt'."
            >
              <section className="py-10 border-t border-border-subtle">
                <Copy
                  label="Process-rubrik"
                  category="rubrik"
                  text="Så här går det till, från intresse till installation"
                  rationale="'Från intresse till installation' definierar hela bågen. Användaren ser 'jag är på steg 0, här är 4 steg framåt' istället för en obegripligt lång process."
                >
                  <h2 className="text-h3 font-medium mb-2">Så här går det till, från intresse till installation</h2>
                </Copy>
                <p className="text-ink-secondary mb-6 max-w-reading">
                  Du går aldrig blint. Varje steg har en tydlig leverans och du bestämmer själv om du vill gå vidare.
                </p>
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
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 4b. INLINE-CTA, efter process ─────────────────────── */
    {
      id: "inline-cta-nasta-steg",
      label: "Inline-CTA, Nästa steg (efter process)",
      variants: [
        {
          key: "fullbredd",
          label: "Fullbredds-CTA-banner efter process-stegen",
          render: () => (
            <Annotation
              label="Inline-CTA, beslutspunkt efter förståelse av processen"
              audience="user"
              rationale="Användaren har sett: värdet (USPs), siffran (kalkylator), och stegen (process). Tre steg av research klara, dags att handla. Fullbredd matchar process-blockets fullbredd direkt ovanför, ger en visuell vikt till handlingen utan att kännas påflugen. Banner-stil med 'Nästa steg'-eyebrow signalerar att detta är ett naturligt led i flödet, inte en avbrytande säljpitch."
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
                        rationale="Frågeform som speglar exakt var användaren är just nu efter att ha läst processen. 'Redo' adresserar tvekan utan att förneka den, frågan inviterar till svar utan att kräva."
                      >
                        <h2 className="text-h3 font-medium text-ink mb-2">
                          Redo för en exakt offert?
                        </h2>
                      </Copy>
                      <p className="text-base text-ink-secondary max-w-reading">
                        Kalkylatorn ger en uppskattning. För en exakt offert mäter vi ditt
                        tak, räknar på er förbrukning och dimensionerar paneler + växelriktare.
                        Allt kostnadsfritt och utan åtagande.
                      </p>
                    </div>
                    <a
                      href="#lead-form"
                      className="inline-flex items-center justify-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-7 py-3.5 rounded text-base hover:opacity-90 shrink-0"
                    >
                      Boka kostnadsfri besiktning
                      <Icon name="arrow_forward" size={18} />
                    </a>
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

    /* ─── 6. TEKNISKA SPECS, info utan pris/CTA ─────────────────
     * Sticky-panelen ansvarar för CTA. Detta block är ren info. */
    {
      id: "specs",
      label: "Tekniska specs",
      variants: [
        {
          key: "info-only",
          label: "Renodlad info, ingår + villkor + varför (default)",
          render: () => (
            <Annotation
              label="Tekniska specs, renodlad till information"
              audience="design"
              rationale="Pris och CTA är borttaget, sticky-panelen i höger kolumn ansvarar för 'Boka rådgivning'. Här bara: bild, beskrivning, vad som ingår i installationen, villkor, kundvärden. Renar hierarkin: en plats för åtagande, en plats för information."
            >
              <section className="py-10 border-t border-border-subtle">
                <Copy
                  label="Specs-rubrik"
                  category="rubrik"
                  text="Vad ingår i en solcellsanläggning från oss"
                  rationale="Specifik och praktisk istället för 'Tekniska specifikationer'. Användaren får svar på 'vad får jag för pengarna' utan branschterminologi."
                >
                  <h2 className="text-h3 font-medium mb-2">Vad ingår i en solcellsanläggning från oss</h2>
                </Copy>
                <p className="text-ink-secondary mb-6 max-w-reading">
                  Anläggningen dimensioneras efter ditt tak och din förbrukning. Inga standardpaket, alla siffror är från en typisk villa i Helsingborg.
                </p>

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
              </section>
            </Annotation>
          ),
        },
        {
          key: "progressiv",
          label: "Progressiv, tabs med pris/CTA (dubblerar panelen)",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <ProduktinfoProgressiv produkt={PRODUKT} inline />
            </section>
          ),
        },
        {
          key: "trygg",
          label: "Trygg, 2-kolumns med pris/CTA (dubblerar panelen)",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <ProduktinfoTrygg produkt={PRODUKT} inline />
            </section>
          ),
        },
      ],
    },

    /* ─── 7. SÄLJKONTAKT, personlig ──────────────────────────── */
    {
      id: "saljkontakt",
      label: "Säljkontakt, personlig",
      variants: [
        {
          key: "person",
          label: "Säljare med foto + boka tid",
          render: () => (
            <Annotation
              label="Säljkontakt, sänk tröskel via person"
              audience="user"
              rationale="Workshop-input: 'Vi har gärna med säljkontakt i dessa flöden för personlig kontakt'. Foto + namn + roll humaniserar, 'jag pratar med Anna' är lägre tröskel än 'jag fyller i ett formulär till sälj-avdelningen'. Två kontaktvägar: telefon (direkt) och bokning (asynkron) så användaren kan välja efter sin egen rytm."
            >
              <section className="py-10 border-t border-border-subtle">
                <div className="rounded-lg bg-tint-info p-6 sm:p-8 grid md:grid-cols-[280px_1fr] gap-8 items-center">
                  {/* Stort foto-block av rådgivaren, placeholder */}
                  <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-brand-primary shrink-0">
                    <div className="absolute inset-0 grid place-items-center text-white">
                      <div className="text-center">
                        <span className="text-[80px] font-medium leading-none">AL</span>
                        <p className="text-xs uppercase tracking-wider mt-3 opacity-80">
                          Foto: Anna Lindqvist
                        </p>
                      </div>
                    </div>
                    {/* Nederkant-overlay med namn + roll */}
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
                      label="Säljkontakt-rubrik"
                      category="rubrik"
                      text="Hellre prata än fylla i?"
                      rationale="Fråga som ger användaren en alternativ väg utan att kännas pushy. 'Hellre' (inte 'Vill du hellre') är kortast möjliga form."
                    >
                      <h2 className="text-h3 font-medium text-ink">Hellre prata än fylla i?</h2>
                    </Copy>
                    <p className="text-base text-ink-secondary leading-relaxed">
                      Anna eller hennes kollegor svarar gärna på frågor utan att du måste lämna
                      intresseanmälan först. Ingen säljpress, bara en konsultativ pratstund om
                      vad solceller skulle innebära för just ditt hus.
                    </p>
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
                        Boka tid när du vill
                      </a>
                    </div>
                    <p className="text-xs text-ink-muted">
                      Mån–tor 08–16 · Fre 10–15 · Bokade samtal: alla dagar
                    </p>
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
          label: "Synergi-curering, 3 ikon-kort",
          render: () => (
            <RelateradeProdukter
              produkter={[
                {
                  ikon: "ev_station",
                  titel: "Ladda Smart",
                  text: "Ladda elbilen med din egen el, smart styrning hittar timmar med högst egen-produktion.",
                  href: "/sidtyper/produktsida-direktkop",
                },
                {
                  ikon: "support_agent",
                  titel: "Energirådgivning",
                  text: "Kostnadsfri genomgång av huset innan du investerar, vi hittar lågt hängande optimering.",
                  href: "#",
                },
                {
                  ikon: "heat_pump",
                  titel: "Värmepump",
                  text: "Värm huset med din egen el, sänk uppvärmningskostnaden ytterligare.",
                  href: "#",
                },
              ]}
            />
          ),
        },
      ],
    },

    /* ─── 10. LEAD-FORMULÄR, kort, låg-commitment ─────────────── */
    {
      id: "lead-form",
      label: "Lead-formulär",
      variants: [
        {
          key: "kort",
          label: "Kort, 4 fält",
          render: () => (
            <Annotation
              label="Lead-form, låg commitment"
              audience="user"
              rationale="Briefen: 'lämna intresse men inte slutföra köp'. Fyra fält max: namn, e-post, telefon, adress. Inget personnummer (för stort åtagande för intresseanmälan), ingen tariff-info, ingen takbild. Sub-text under CTA bekräftar VAD som händer härnäst, användaren ska veta att de inte 'köper', de bara 'pratar'."
            >
              <section id="lead-form" className="py-10 border-t border-border-subtle">
                {!leadSubmitted ? (
                  <div className="grid lg:grid-cols-2 gap-8 items-start">
                    <div>
                      <Copy
                        label="Lead-form rubrik"
                        category="rubrik"
                        text="Boka kostnadsfri rådgivning"
                        rationale="Samma formulering som hero-CTA. Konsistent ordval över sidan så användaren ser tydligt: detta är samma sak. 'Boka' (inte 'Skicka' eller 'Anmäl') ger känslan av en avtalad tid, inte en formulär-överlämning."
                      >
                        <h2 className="text-h3 font-medium mb-2">Boka kostnadsfri rådgivning</h2>
                      </Copy>
                      <p className="text-ink-secondary mb-4">
                        Fyra fält. Vi ringer upp inom 2 arbetsdagar och bokar en kostnadsfri besiktning.
                      </p>
                      <ul className="space-y-2 text-sm text-ink-secondary">
                        {[
                          "Ingen säljpress, du bestämmer själv",
                          "Kostnadsfri besiktning på plats",
                          "Skriftlig offert med exakta siffror",
                          "Ångerrätt 14 dagar om du ändrar dig",
                        ].map((t) => (
                          <li key={t} className="flex items-start gap-2">
                            <Icon name="check" size={16} className="text-brand-accent mt-0.5 shrink-0" />
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <form
                      onSubmit={skickaLead}
                      className="p-6 rounded-md border-2 border-border-subtle bg-surface space-y-4"
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
                      <div>
                        <label htmlFor="lead-adress" className="text-sm font-medium block mb-1">
                          Adress för installation
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
                        <p className="text-xs text-ink-muted mt-1">Vi använder den för att förbereda besiktningen.</p>
                      </div>
                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 bg-brand-primary text-ink-onbrand font-medium py-3 rounded hover:opacity-90 disabled:opacity-40"
                      >
                        Skicka intresseanmälan
                        <Icon name="arrow_forward" size={16} />
                      </button>
                      <p className="text-xs text-ink-muted text-center">
                        Vi ringer upp inom 2 arbetsdagar · Ingen säljpress
                      </p>
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
                        <h3
                          ref={leadHeadingRef}
                          tabIndex={-1}
                          className="text-h5 font-medium mb-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded"
                        >
                          Tack, vi hör av oss inom 2 arbetsdagar
                        </h3>
                        <p className="text-sm text-ink-secondary">
                          En bekräftelse är skickad till <strong className="text-ink">{leadEmail}</strong>.
                          Anna eller en kollega ringer dig på <strong className="text-ink">{leadPhone}</strong>.
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider text-ink-muted font-medium mb-2">
                        Så här händer det härnäst
                      </p>
                      <ol className="space-y-2">
                        {[
                          "Vi har tagit emot din intresseanmälan (klart)",
                          "En rådgivare ringer dig inom 2 arbetsdagar för en kort introduktion",
                          "Vi bokar en kostnadsfri besiktning på din adress",
                          "Du får skriftlig offert med exakta siffror",
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
        kategori="Produktsida leadsgenerering (Solceller)"
        syfte="Bygga förtroende för en stor investering. Användaren ska kunna utforska kostnaden via kalkylator innan de lämnar uppgifter, läsa case som bygger förtroende, se processen tydligt, och slutligen lämna en LÅGRISK intresseanmälan (4 fält). Säljkontakten är personifierad, namn + foto, så det känns mänskligt."
        malgrupp="Villaägare i nordvästra Skåne, ofta i mitt-livet, som överväger en investering på ~150 000+ kr. Behöver utvärdera över tid, prata med partner, jämföra leverantörer. Har inte bestämt sig vid första besöket, sidan ska räcka för flera besök."
        primarHandling="Boka kostnadsfri rådgivning (lead-formulär) ELLER ring/boka tid med rådgivare ELLER räkna själv i kalkylatorn."
        ton="Konsultativ, inte säljande. Inga 'fantastiska besparingar', siffror med 'upp till' och 'baserat på'. Personlig (säljarens namn + foto) men inte påflugen ('ingen säljpress' upprepas på flera ställen)."
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
          <li><a href="#" className="hover:text-brand-accent">Smarta produkter</a></li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="font-medium text-ink">Solceller</li>
        </ol>
      </nav>

      {/* Full-bredd inline-in-flow. Inga sticky-paneler. Inline-CTA-banner
          och saljkontakt-blocket äger konverteringspunkter genom flödet,
          lead-form sist. */}
      <BlockList pageId="produktsida-leadsgen2" blocks={blocks} />
    </div>
  );
}
