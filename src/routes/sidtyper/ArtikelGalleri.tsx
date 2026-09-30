import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { getPostBySlug, KATEGORI_LABEL } from "../moduler/nyhetsrum-data";

/**
 * SIDTYP: Artikel, formatgalleri (rik redaktionell struktur)
 *
 * Samlar de redaktionella formaten: innehållsförteckning med hopplänkar,
 * sammanfattning, statistikruta, faktaruta, numrerade listor, tipsruta,
 * kundberättelse och författarbio. Rutorna ligger infällda i brödtexten.
 *
 * Används som referens när redaktören väljer format för en artikel. Den
 * vanliga sidtypen Artikel är enklare och räcker för de flesta texter.
 */

const POST = getPostBySlug("solceller-storre-nytta")!;

function formaterDatum(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("sv-SE", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Artikelns innehållsförteckning. Samma id används som ankare på
 * mellanrubrikerna, så länkar och rubriker hålls i synk.
 */
const SECTIONS = [
  { id: "vad-batterier-gor", titel: "Vad batterier faktiskt gör" },
  { id: "tre-monster", titel: "Tre mönster som fungerar" },
  { id: "smart-styrning", titel: "Smart styrning binder ihop allt" },
  { id: "vad-du-kan-gora", titel: "Det här kan du göra själv" },
];

export function ArtikelGalleri() {
  const blocks: BlockDef[] = [
    /* ─── 1. TOPP: kategori, rubrik, byline och bild ──────── */
    {
      id: "hero",
      label: "Artikelns topp",
      variants: [
        {
          key: "default",
          label: "Stor bild, byline med foto och lästid",
          render: () => (
            <Annotation
              label="Artikelns topp: rubrik, byline och bild"
              audience="user"
              rationale="Kategori, rubrik och ingress berättar direkt vad artikeln handlar om, och bylinen visar vem som skrivit den. Lästiden låter läsaren avgöra om hen läser nu eller sparar till senare."
            >
              <header className="py-8 sm:py-10">
                <div className="flex items-center gap-2 mb-4 text-xs">
                  <Link
                    to="/sidtyper/startsida-nyhetsrum"
                    className="px-2 py-1 rounded bg-tint-highlight text-brand-primary font-bold uppercase tracking-wider hover:opacity-80"
                  >
                    {KATEGORI_LABEL[POST.kategori]}
                  </Link>
                  <span className="text-ink-muted">Artikel</span>
                </div>

                <Copy
                  label="Rubrik (H1)"
                  category="rubrik"
                  text={POST.rubrik}
                  rationale="Rubriken är en fråga som läsaren själv kan ha ställt. Den väcker nyfikenhet och visar att artikeln resonerar, inte bara räknar upp fakta. Använd frågeform bara när texten faktiskt svarar på frågan."
                >
                  <h1 className="text-display leading-tight mb-4 max-w-reading">{POST.rubrik}</h1>
                </Copy>

                <Copy
                  label="Ingress"
                  category="ton"
                  text={POST.ingress}
                  rationale="Ingressen ger ett löfte och visar ärlighet genom att även ta upp det som är överdrivet. Två meningar räcker för att läsaren ska veta om artikeln är värd tiden."
                >
                  <p className="text-lede text-ink-secondary mb-6 max-w-reading leading-relaxed">
                    {POST.ingress}
                  </p>
                </Copy>

                <div className="flex items-center gap-3 max-w-reading">
                  <span className="shrink-0 w-11 h-11 rounded-full bg-brand-primary text-white grid place-items-center font-medium text-sm">
                    {POST.forfattare?.initialer}
                  </span>
                  <div>
                    <p className="text-sm font-medium">{POST.forfattare?.namn}</p>
                    <p className="text-xs text-ink-muted">
                      {POST.forfattare?.roll} ·{" "}
                      <time dateTime={POST.datum}>{formaterDatum(POST.datum)}</time> ·{" "}
                      {POST.lastid}
                    </p>
                  </div>
                </div>

                <figure className="mt-8">
                  <div className="rounded-lg bg-tint-info aspect-[16/9] flex items-center justify-center border border-border-subtle">
                    <div className="text-center text-ink-muted">
                      <Icon name="image" size={64} className="mb-2" />
                      <p className="text-xs">{POST.bildAlt}</p>
                    </div>
                  </div>
                  <figcaption className="text-xs text-ink-muted mt-2 max-w-reading">
                    Foto: Öresundskraft / Anders Pedersen
                  </figcaption>
                </figure>
              </header>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 2. SAMMANFATTNING ─────────────────────────────── */
    {
      id: "sammanfattning",
      label: "Sammanfattning",
      variants: [
        {
          key: "default",
          label: "Ruta med tre eller fyra punkter",
          render: () => (
            <Annotation
              label="Sammanfattning"
              audience="user"
              rationale="Tre eller fyra punkter överst ger den som bara skummar det viktigaste direkt, medan den som har tid läser vidare. Rutan har egen bakgrund så att den skiljer sig från brödtexten."
            >
              <section className="max-w-reading">
                <div className="rounded-md bg-tint-info border-l-4 border-brand-accent p-5 sm:p-6">
                  <Copy
                    label="Rubrik: Sammanfattning"
                    category="metadata"
                    text="Sammanfattning"
                    rationale="'Sammanfattning' passar artikelns redaktionella ton. Nyheter använder i stället 'Det viktigaste', som är mer vardagligt. Håll samma ord inom varje sidtyp."
                  >
                    <p className="text-[11px] uppercase tracking-wider text-brand-primary font-bold mb-3">
                      Sammanfattning
                    </p>
                  </Copy>
                  <ul className="space-y-2">
                    {[
                      "Solceller utan batteri täcker cirka 40 % av en typvillas årsförbrukning. Med batteri blir det dubbelt så mycket.",
                      "De största besparingarna kommer från smart styrning: varmvatten, elbil och värmepump som går vid rätt tid.",
                      "Nästa generation batterier väntas hösten 2026 och blir 15 till 20 % billigare per kWh lagring.",
                      "Innan du investerar: titta på din förbrukning timme för timme på Mina sidor.",
                    ].map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm leading-relaxed">
                        <Icon name="check_circle" size={18} className="text-brand-accent shrink-0 mt-0.5" filled />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 3. INNEHÅLLSFÖRTECKNING med hopplänkar ─────────── */
    {
      id: "innehall",
      label: "Innehållsförteckning",
      variants: [
        {
          key: "default",
          label: "Lista med hopplänkar och pilar",
          render: () => (
            <Annotation
              label="Innehållsförteckning"
              audience="user"
              rationale="I längre artiklar vill läsaren kunna hoppa direkt till den del som intresserar hen, eller hitta tillbaka dit hen slutade läsa. Pilen vid varje rad visar att raden är en länk längre ner på sidan."
            >
              <section className="max-w-reading mt-6">
                <div className="rounded-md border border-border-subtle bg-surface p-5">
                  <Copy
                    label="Rubrik: innehållsförteckning"
                    category="metadata"
                    text="I den här artikeln"
                    rationale="Säger med vardagliga ord vad listan visar. 'Innehåll' känns formellt och 'I denna artikel' lite stelt. Raderna är samma som mellanrubrikerna, så läsaren känner igen var hen hamnar."
                  >
                    <p className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-3">
                      I den här artikeln
                    </p>
                  </Copy>
                  <ol className="space-y-1">
                    {SECTIONS.map((s, i) => (
                      <li key={s.id}>
                        <a
                          href={`#${s.id}`}
                          className="group flex items-center gap-3 text-sm py-1.5 -mx-2 px-2 rounded hover:bg-tint-info focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
                        >
                          <span className="text-ink-muted font-medium shrink-0 w-5">{i + 1}.</span>
                          <span className="flex-1 text-brand-accent group-hover:underline underline-offset-2">
                            {s.titel}
                          </span>
                          <Icon
                            name="arrow_downward"
                            size={14}
                            className="text-ink-muted shrink-0 transition-transform duration-150 group-hover:translate-y-0.5 group-hover:text-brand-accent motion-reduce:transition-none"
                          />
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 4. INLEDANDE STYCKE ─────────────────────────── */
    {
      id: "intro",
      label: "Inledande stycke",
      variants: [
        {
          key: "default",
          label: "Större text som markerar var artikeln börjar",
          render: () => (
            <Annotation
              label="Inledande stycke"
              audience="redaktör"
              rationale="Första stycket har något större text och visar var själva artikeln börjar. Använd det för att väcka intresse eller rätta en missuppfattning, och håll det till tre eller fyra meningar."
            >
              <section className="max-w-reading">
                <p className="text-lg leading-relaxed text-ink-secondary">
                  Solceller är inte längre något bara för entusiaster. De har blivit
                  vanliga, och varje månad ser vi fler villor i nordvästra Skåne med
                  paneler på taket. Men frågan om hur stor nytta de gör har förändrats,
                  och svaret beror på hur du använder dem.
                </p>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 5. AVSNITT 1: brödtext, statistikruta och faktaruta ─ */
    {
      id: "avsnitt-1",
      label: "Avsnitt 1, Vad batterier gör",
      variants: [
        {
          key: "default",
          label: "Mellanrubrik, stycken, statistikruta och faktaruta",
          render: () => (
            <Annotation
              label="Brödtext med infällda rutor"
              audience="redaktör"
              rationale="Statistikrutan och faktarutan ligger infällda mellan styckena och stannar läsaren vid det viktigaste. Använd högst två rutor per avsnitt. Marginaltextformatet visar samma rutor bredvid brödtexten i stället."
            >
              <section className="max-w-reading space-y-5 text-ink-secondary leading-relaxed">
                <Copy
                  label="Mellanrubrik, avsnitt 1"
                  category="rubrik"
                  text="Vad batterier faktiskt gör"
                  rationale="Mellanrubrikerna är desamma som i innehållsförteckningen, så läsaren känner igen var hen hamnar. 'Faktiskt' knyter an till ingressens löfte om att skilja det som fungerar från det som är överdrivet."
                >
                  <h2 id="vad-batterier-gor" className="text-h3 font-medium text-ink mt-8 mb-3 scroll-mt-20">
                    Vad batterier faktiskt gör
                  </h2>
                </Copy>
                <p>
                  Det vi ser i våra installationer är att solceller och batteri
                  tillsammans ger störst skillnad. Solceller ensamma täcker omkring
                  40 procent av en typvillas årsförbrukning. Med ett batteri på
                  10 till 13 kWh blir det dubbelt så mycket, eftersom du kan spara elen
                  från mitt på dagen och använda den på kvällen.
                </p>

                {/* Statistikruta */}
                <Annotation
                  label="Statistikruta"
                  audience="redaktör"
                  rationale="Två stora siffror bredvid varandra gör en jämförelse synlig på ett ögonblick. Använd rutan när en siffra bär artikelns argument, och skriv under varje siffra exakt vad den mäter."
                >
                  <div className="rounded-md bg-tint-notice p-5 grid grid-cols-2 gap-4 my-4 not-prose">
                    <div>
                      <p className="text-display font-medium leading-none">40<span className="text-h3 text-ink-muted"> %</span></p>
                      <Copy
                        label="Statistikruta, förklaring under siffran"
                        category="metadata"
                        text="Självförsörjning för en typvilla med endast solceller."
                        rationale="Texten under siffran säger vad den mäter, så att den inte kan missförstås. Fetstilen pekar ut skillnaden mellan siffrorna: endast solceller jämfört med solceller och batteri."
                      >
                        <p className="text-xs text-ink-secondary mt-2 leading-snug">
                          Självförsörjning för en typvilla med <strong>endast solceller</strong>.
                        </p>
                      </Copy>
                    </div>
                    <div className="border-l border-border-subtle pl-4">
                      <p className="text-display font-medium leading-none text-brand-accent">80<span className="text-h3 text-ink-muted"> %</span></p>
                      <p className="text-xs text-ink-secondary mt-2 leading-snug">
                        Med <strong>solceller och batteri</strong> på 10 till 13 kWh.
                      </p>
                    </div>
                  </div>
                </Annotation>

                <p>
                  Skillnaden blir extra tydlig på vintern. Solcellerna producerar el även
                  då, men vid fel tid på dygnet. Batteriet flyttar elen till när du
                  faktiskt använder den.
                </p>

                {/* Faktaruta */}
                <Annotation
                  label="Faktaruta"
                  audience="redaktör"
                  rationale="Förklarar ett begrepp som läsaren behöver för att förstå resten av texten, utan att brödtexten måste stanna. Rubriken är en fråga som läsaren själv kan ha. Håll svaret till tre korta meningar."
                >
                  <aside className="rounded-md border border-border-subtle bg-surface p-5 my-6 not-prose">
                    <p className="text-[11px] uppercase tracking-wider text-ink-muted font-bold mb-2 inline-flex items-center gap-1.5">
                      <Icon name="info" size={14} className="text-brand-accent" filled />
                      Faktaruta
                    </p>
                    <Copy
                      label="Faktaruta, rubrik"
                      category="rubrik"
                      text={'Vad är "självförsörjning"?'}
                      rationale="Frågan är formulerad som läsaren skulle ställa den, så det syns direkt om rutan svarar på något hen undrar. Citattecknen visar att det är själva begreppet som förklaras."
                    >
                      <p className="font-medium text-ink mb-2">Vad är "självförsörjning"?</p>
                    </Copy>
                    <p className="text-sm leading-relaxed">
                      Andelen av din årsförbrukning som täcks av el från dina egna solceller.
                      100 % självförsörjning betyder att du i teorin aldrig behöver köpa el.
                      I praktiken går det sällan, eftersom solen inte lyser dygnet runt.
                    </p>
                  </aside>
                </Annotation>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 6. AVSNITT 2: punktlista, bild och lyft citat ──── */
    {
      id: "avsnitt-2",
      label: "Avsnitt 2, Tre mönster",
      variants: [
        {
          key: "default",
          label: "Punktlista, infälld bild och lyft citat",
          render: () => (
            <Annotation
              label="Punktlista, bild och lyft citat"
              audience="redaktör"
              rationale="Tre olika format i rad ger texten variation: punktlistan går att skumma, bilden ger andrum och det lyfta citatet markerar författarens slutsats. Texten känns skriven av en människa, inte som en sökoptimerad text."
            >
              <section className="max-w-reading space-y-5 text-ink-secondary leading-relaxed">
                <Copy
                  label="Mellanrubrik, avsnitt 2"
                  category="rubrik"
                  text="Tre mönster som fungerar"
                  rationale="Siffran i rubriken säger hur mycket som kommer, och det gör avsnittet lätt att skumma. 'Som fungerar' är enklare svenska än 'vi ser fungera'."
                >
                  <h2 id="tre-monster" className="text-h3 font-medium text-ink mt-8 mb-3 scroll-mt-20">
                    Tre mönster som fungerar
                  </h2>
                </Copy>
                <p>
                  När vi tittar på vilka anläggningar som ger mest ser vi tre vanor som
                  återkommer:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2">
                  <li><strong className="text-ink">Smart styrning av varmvatten.</strong> Att värma vattnet när solen lyser gör konkret skillnad.</li>
                  <li><strong className="text-ink">Elbilsladdning på dagen.</strong> Jobbar du hemifrån passar laddningen perfekt ihop med solproduktionen.</li>
                  <li><strong className="text-ink">Värmepump kopplad till smart styrning.</strong> Huset värms när elen är gratis.</li>
                </ul>

                {/* Infälld bild */}
                <figure className="my-8 not-prose">
                  <div className="rounded-md bg-tint-info aspect-[16/9] flex items-center justify-center border border-border-subtle">
                    <Icon name="battery_charging_full" size={48} className="text-ink-muted" />
                  </div>
                  <figcaption className="text-xs text-ink-muted mt-2">
                    Solcellsbatteri monterat i en villa i Helsingborg. Ett batteri på 10 till
                    13 kWh räcker för en typisk villa. Foto: Öresundskraft / Maria Söderström
                  </figcaption>
                </figure>

                {/* Lyft citat */}
                <Copy
                  label="Lyft citat"
                  category="ton"
                  text="Den största förändringen är inte att solceller blivit billigare, utan att de börjar prata med resten av huset."
                  rationale="Det lyfta citatet är författarens egen slutsats, inte ett citat från en källa. Bilden av solceller som 'pratar med resten av huset' gör smart styrning begriplig utan tekniska ord."
                >
                  <blockquote className="my-8 border-l-4 border-brand-accent pl-6 py-2 not-prose">
                    <p className="text-h4 font-medium leading-snug text-ink">
                      "Den största förändringen är inte att solceller blivit billigare, utan
                      att de börjar prata med resten av huset."
                    </p>
                  </blockquote>
                </Copy>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 7. AVSNITT 3: numrerad lista och tipsruta ──── */
    {
      id: "avsnitt-3",
      label: "Avsnitt 3, Smart styrning",
      variants: [
        {
          key: "default",
          label: "Numrerad lista med färgade siffror och tipsruta",
          render: () => (
            <section className="max-w-reading space-y-5 text-ink-secondary leading-relaxed">
              <Copy
                label="Mellanrubrik, avsnitt 3"
                category="rubrik"
                text="Smart styrning binder ihop allt"
                rationale="Rubriken är ett påstående som sammanfattar avsnittet. Läsaren som bara skummar rubrikerna får ändå med sig poängen."
              >
                <h2 id="smart-styrning" className="text-h3 font-medium text-ink mt-8 mb-3 scroll-mt-20">
                  Smart styrning binder ihop allt
                </h2>
              </Copy>
              <p>
                Det är inte tekniken i sig som ger besparingen, utan att prylarna
                pratar med varandra. Här är de fyra kopplingar vi rekommenderar, i
                ordning efter hur snabbt de lönar sig:
              </p>

              {/* Numrerad lista */}
              <Annotation
                label="Numrerad lista med rubriker"
                audience="redaktör"
                rationale="Stora siffror i färgade cirklar visar att ordningen spelar roll, här efter hur snabbt varje steg lönar sig. Varje punkt har en kort rubrik och en förklarande mening. Använd formatet för steg eller rangordning, inte för vanliga uppräkningar."
              >
                <ol className="space-y-4 my-6 not-prose">
                  {[
                    {
                      titel: "Varmvattenberedaren",
                      text: "Lägst tröskel, eftersom många elcentraler redan har stöd för det. Värmer vattnet mellan klockan 9 och 14, när solcellerna producerar.",
                    },
                    {
                      titel: "Elbilsladdaren",
                      text: "Smart laddning som följer din solproduktion. Kräver en laddbox från Easee, Zaptec eller liknande.",
                    },
                    {
                      titel: "Värmepumpen",
                      text: "Styrs med schema eller en direkt koppling till styrsystemet. Ger störst besparing i kronor per år.",
                    },
                    {
                      titel: "Batteriet",
                      text: "Tar hand om överskottet. Lägg till det sist, när de andra kopplingarna är på plats.",
                    },
                  ].map((s, i) => (
                    <li key={s.titel} className="flex items-start gap-4">
                      <span className="shrink-0 w-9 h-9 rounded-full bg-brand-primary text-white grid place-items-center font-bold text-sm">
                        {i + 1}
                      </span>
                      <div className="flex-1 pt-1">
                        <p className="font-medium text-ink mb-1">{s.titel}</p>
                        <p className="text-sm">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Annotation>

              <p>
                Den första kopplingen står ofta för 60 till 70 procent av besparingen.
                Är du osäker, börja där och utvärdera innan du investerar i mer.
              </p>

              {/* Tipsruta */}
              <Annotation
                label="Tipsruta"
                audience="redaktör"
                rationale="Ger läsaren en konkret sak att göra, mitt i texten. Den gula bakgrunden och glödlampan skiljer tipset från faktarutan, som förklarar i stället för att uppmana. Skriv ett tips per ruta."
              >
                <aside className="rounded-md bg-tint-notice border-l-4 border-brand-highlight p-5 my-6 not-prose">
                  <p className="text-[11px] uppercase tracking-wider text-brand-highlight font-bold mb-2 inline-flex items-center gap-1.5">
                    <Icon name="lightbulb" size={14} filled />
                    Tips
                  </p>
                  <Copy
                    label="Tipsruta, rubrik"
                    category="reassurance"
                    text="Börja smått: testa varmvattnet först"
                    rationale="Rubriken säger vad läsaren ska göra och sänker tröskeln med 'börja smått'. Texten under svarar på det läsaren oroar sig för: kostnad, tid och när resultatet syns."
                  >
                    <p className="font-medium text-ink mb-2">Börja smått: testa varmvattnet först</p>
                  </Copy>
                  <p className="text-sm leading-relaxed">
                    Många elcentraler kan redan styra varmvattnet smart, utan ny utrustning.
                    Kontakta din elektriker. Det tar oftast mindre än en timme att aktivera,
                    och du ser resultatet på elräkningen redan första månaden.
                  </p>
                </aside>
              </Annotation>
            </section>
          ),
        },
      ],
    },

    /* ─── 8. KUNDBERÄTTELSE, infälld i texten ──────────── */
    {
      id: "kundberattelse",
      label: "Kundberättelse",
      variants: [
        {
          key: "default",
          label: "Foto, kundcitat och sammanhang",
          render: () => (
            <Annotation
              label="Kundberättelse"
              audience="user"
              rationale="Ett verkligt exempel mellan teorin och de egna stegen visar att råden fungerar. Foto, citat och sammanhang ger mer trovärdighet än ett anonymt omdöme. Marginaltextformatet visar en kortare version bredvid texten."
            >
              <section className="max-w-reading my-10">
                <div className="rounded-md border-l-4 border-brand-accent bg-tint-info p-6 sm:p-7">
                  <p className="text-[11px] uppercase tracking-wider text-brand-primary font-bold mb-4">
                    Kundberättelse
                  </p>

                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="shrink-0 sm:w-32">
                      <div className="aspect-square rounded-md bg-tint-highlight border border-border-subtle flex items-center justify-center">
                        <Icon name="image" size={32} className="text-ink-muted" />
                      </div>
                      <p className="text-sm font-medium mt-2">Anna & Per</p>
                      <p className="text-xs text-ink-muted">Höganäs, installerade 2024</p>
                    </div>

                    <div className="flex-1 min-w-0">
                      <Copy
                        label="Kundcitat"
                        category="ton"
                        text="Vi sänkte elkostnaden med 38 % första året, och vi ändrade inte våra vanor alls."
                        rationale="En konkret siffra och beskedet att vanorna inte behövde ändras bemöter oron för att det kräver en ny livsstil. Kundens egna ord väger tyngre än våra. Använd riktiga siffror från kunden."
                      >
                        <p className="text-h4 font-medium leading-snug text-ink mb-3">
                          "Vi sänkte elkostnaden med 38 % första året, och vi ändrade inte våra vanor alls."
                        </p>
                      </Copy>

                      <p className="text-sm text-ink-secondary leading-relaxed mb-2">
                        Anna och Per installerade solceller och batteri våren 2024 och slog på smart
                        styrning av varmvattnet direkt. Bilen laddas på dagen, när ingen är hemma och
                        produktionen är som högst.
                      </p>
                      <p className="text-sm text-ink-secondary leading-relaxed">
                        "Det enda vi behövde göra var att ringa elektrikern. Resten skötte sig självt."
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 9. AVSNITT 4: avslutning med egna steg ────────── */
    {
      id: "avsnitt-4",
      label: "Avsnitt 4, Det här kan du göra själv",
      variants: [
        {
          key: "default",
          label: "Avslutande stycken och numrerade steg",
          render: () => (
            <section className="max-w-reading space-y-5 text-ink-secondary leading-relaxed">
              <Copy
                label="Mellanrubrik, avsnitt 4"
                category="rubrik"
                text="Det här kan du göra själv"
                rationale="Du-tilltal och ett löfte om handling. Rubriken markerar övergången från förklaring till egna steg."
              >
                <h2 id="vad-du-kan-gora" className="text-h3 font-medium text-ink mt-8 mb-3 scroll-mt-20">
                  Det här kan du göra själv
                </h2>
              </Copy>
              <p>
                Innan du investerar i batteri eller smart styrning är det bra att veta
                hur din förbrukning ser ut i dag. Här är tre steg du kan ta redan i
                kväll:
              </p>

              <Annotation
                label="Numrerade steg"
                audience="redaktör"
                rationale="Mindre siffror än i listan ovan visar att det här är en enkel checklista, inte en rangordning. Varje steg börjar med ett verb, så läsaren ser direkt vad hen ska göra. Håll dig till tre steg."
              >
                <ol className="space-y-3 my-4 not-prose">
                  {[
                    { titel: "Logga in på Mina sidor", text: "Titta på din förbrukning timme för timme under förra månaden." },
                    { titel: "Se när du använder mest", text: "Är det morgon, kväll eller jämnt över dygnet? Det avgör om ett batteri lönar sig." },
                    { titel: "Boka en kostnadsfri rådgivning", text: "Vi går igenom din förbrukning och föreslår det som ger mest nytta för just dig." },
                  ].map((s, i) => (
                    <li key={s.titel} className="flex items-start gap-3">
                      <span className="shrink-0 w-7 h-7 rounded-full bg-tint-info text-brand-primary grid place-items-center font-bold text-xs border border-brand-accent/30">
                        {i + 1}
                      </span>
                      <div className="pt-0.5">
                        <p className="font-medium text-ink">{s.titel}</p>
                        <p className="text-sm">{s.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Annotation>

              <p>
                Har du redan solceller utan batteri kan det löna sig att vänta på nästa
                generation batterier. De väntas hösten 2026 och blir 15 till 20 procent
                billigare per kWh lagring än dagens.
              </p>
            </section>
          ),
        },
      ],
    },

    /* ─── 10. KÄLLOR OCH TAGGAR ─────────────────────────── */
    {
      id: "kallor",
      label: "Källor och taggar",
      variants: [
        {
          key: "default",
          label: "Källista och ämnestaggar",
          render: () => (
            <Annotation
              label="Källor och taggar"
              audience="redaktör"
              rationale="Källorna visar var siffrorna i artikeln kommer ifrån och gör texten trovärdig. Taggarna leder vidare till fler texter om samma ämne. Ange källan till varje siffra, även när det är Öresundskrafts egen statistik."
            >
              <section className="py-8 max-w-reading border-t border-border-subtle mt-10">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Copy
                      label="Rubrik: Källor"
                      category="metadata"
                      text="Källor"
                      rationale="Ett ord som alla känner igen. 'Referenser' känns akademiskt och 'Mer information' säger inte att det handlar om belägg. Samma rubrik används i alla artikelformat."
                    >
                      <p className="text-[11px] uppercase tracking-wider text-ink-muted font-bold mb-3">
                        Källor
                      </p>
                    </Copy>
                    <ul className="text-sm space-y-1.5 text-ink-secondary">
                      <li>Energimyndighetens årsrapport 2025</li>
                      <li>Öresundskrafts installationsstatistik 2023 till 2026</li>
                      <li>Svenska Solcellsföreningen: marknadsöversikt, första kvartalet 2026</li>
                    </ul>
                  </div>
                  <div>
                    <Copy
                      label="Rubrik: Taggar"
                      category="metadata"
                      text="Taggar"
                      rationale="Samma ord som i Nyhetsrummets lista, så läsaren känner igen funktionen. Växla inte mellan 'Ämnen', 'Kategorier' och 'Taggar', då tror läsaren att det är olika saker."
                    >
                      <p className="text-[11px] uppercase tracking-wider text-ink-muted font-bold mb-3">
                        Taggar
                      </p>
                    </Copy>
                    <div className="flex flex-wrap gap-1.5">
                      {["Solceller", "Batterilagring", "Smart styrning", "Egenproduktion", "Hemmaautomation"].map((t) => (
                        <Link
                          key={t}
                          to="/sidtyper/startsida-nyhetsrum"
                          className="text-xs px-2.5 py-1 rounded-full border border-border-subtle bg-surface hover:border-brand-accent hover:bg-tint-info"
                        >
                          {t}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 11. FÖRFATTARBIO ──────────────────────────────── */
    {
      id: "forfattar-bio",
      label: "Författarbio",
      variants: [
        {
          key: "default",
          label: "Bio och fler artiklar av samma skribent",
          render: () => (
            <Annotation
              label="Författarbio"
              audience="user"
              rationale="Efter en längre text vill läsaren veta vem som skrivit den. Bion visar varför skribenten kan ämnet, och länkarna till fler artiklar av samma person gör det lätt att läsa vidare."
            >
              <section className="py-8 max-w-reading border-t border-border-subtle">
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <span className="shrink-0 w-16 h-16 rounded-full bg-brand-primary text-white grid place-items-center font-medium text-xl">
                    {POST.forfattare?.initialer}
                  </span>
                  <div className="flex-1">
                    <Copy
                      label="Författarbio, rubrik"
                      category="rubrik"
                      text={`Om ${POST.forfattare?.namn}`}
                      rationale="'Om' följt av namnet är personligt och bygger förtroende. 'Författaren' eller 'Skribent' känns distanserat och formellt."
                    >
                      <p className="font-medium mb-0.5">Om {POST.forfattare?.namn}</p>
                    </Copy>
                    <p className="text-sm text-ink-muted mb-3">{POST.forfattare?.roll} på Öresundskraft</p>
                    <p className="text-sm text-ink-secondary leading-relaxed mb-4">
                      Erik har arbetat med energirådgivning till privatkunder i tio år och är
                      certifierad solcellsinstallatör. Han bor med sin familj i Höganäs och
                      installerade själv solceller och batteri 2023.
                    </p>
                    <p className="text-xs text-ink-muted">
                      Fler artiklar av Erik:{" "}
                      <Link to="/sidtyper/artikel" className="text-brand-accent hover:underline">
                        Effekttariffer förklarade
                      </Link>{" "}
                      ·{" "}
                      <Link to="/sidtyper/artikel" className="text-brand-accent hover:underline">
                        Smart laddning på natten
                      </Link>
                    </p>
                  </div>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 12. PRENUMERERA ──────────────────────────────── */
    {
      id: "subscribe",
      label: "Prenumerera",
      variants: [
        {
          key: "default",
          label: "Rubrik om nyttan och knapp",
          render: () => (
            <Annotation
              label="Prenumeration"
              audience="user"
              rationale="En lugn uppmaning efter artikeln, när läsaren redan har fått ut något av texten. Rutan är diskret och lovar få utskick, så den känns som en tjänst och inte som reklam."
            >
              <section className="py-8 max-w-reading">
                <div className="rounded-lg bg-tint-info p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Icon name="mail" size={28} className="text-brand-accent shrink-0" />
                  <div className="flex-1">
                    <Copy
                      label="Prenumeration, rubrik"
                      category="rubrik"
                      text="Få fler artiklar i mejlen"
                      rationale="Rubriken säger vad läsaren får: fler artiklar i mejlen. Den ersatte 'Tycker du om det här?', som frågade efter en känsla i stället för att beskriva nyttan."
                    >
                      <p className="font-medium">Få fler artiklar i mejlen</p>
                    </Copy>
                    <Copy
                      label="Prenumeration, trygghetstext"
                      category="reassurance"
                      text="Vi skickar högst ett mejl i månaden, och du kan avsluta när du vill."
                      rationale="Svarar på den vanligaste invändningen, att det blir för många mejl, innan läsaren hinner ställa den. 'Avsluta när du vill' är enklare än 'avregistrera'."
                    >
                      <p className="text-sm text-ink-secondary">
                        Vi skickar högst ett mejl i månaden, och du kan avsluta när du vill.
                      </p>
                    </Copy>
                  </div>
                  <Copy
                    label="Prenumeration, knapp"
                    category="cta"
                    text="Prenumerera"
                    rationale="Rubriken beskriver vad läsaren får, så knappen behöver bara säga handlingen. Ett ord uppfattas snabbt. Samma knapptext används i alla artikelformat."
                  >
                    <a
                      href="/sidtyper/startsida-nyhetsrum#prenumerera"
                      className="inline-flex items-center gap-1.5 border border-border-strong bg-canvas font-medium px-4 py-2.5 rounded text-sm hover:bg-tint-info hover:border-brand-accent shrink-0"
                    >
                      Prenumerera
                      <Icon name="arrow_forward" size={14} />
                    </a>
                  </Copy>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 13. RELATERADE ARTIKLAR ─────────────────────── */
    {
      id: "related",
      label: "Relaterade artiklar",
      variants: [
        {
          key: "default",
          label: "Tre kort med kategori och lästid",
          render: () => (
            <Annotation
              label="Relaterade artiklar"
              audience="user"
              rationale="Tre artiklar ger läsaren ett naturligt nästa steg när texten är slut. Korten visar kategori och lästid, så läsaren kan välja utan att klicka. Välj artiklar i närliggande ämnen, inte bara de senaste."
            >
              <section className="py-10 border-t border-border-subtle">
                <Copy
                  label="Relaterade artiklar, rubrik"
                  category="rubrik"
                  text="Fortsätt läsa"
                  rationale="'Fortsätt läsa' beskriver det läsaren redan gör och bjuder in till mer. 'Liknande artiklar' och 'Mer från oss' är passiva och säger mindre."
                >
                  <h2 className="text-h3 font-medium mb-6">Fortsätt läsa</h2>
                </Copy>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { rubrik: "Energikartläggningen visade Clemondos besparingspotential", kategori: "Kundcase", lastid: "5 min" },
                    { rubrik: "Framtidens fjärrvärme: lägre temperatur, smartare distribution", kategori: "Hållbarhet", lastid: "7 min" },
                    { rubrik: "Effekttariffer förklarade, så undviker du onödiga toppar", kategori: "Utbildning", lastid: "4 min" },
                  ].map((r) => (
                    <Link
                      key={r.rubrik}
                      to="/sidtyper/artikel"
                      className="group flex flex-col rounded-md border border-border-subtle bg-surface overflow-hidden hover:border-brand-accent hover:shadow-sm transition-all"
                    >
                      <div className="bg-tint-info aspect-[16/10] flex items-center justify-center">
                        <Icon name="image" size={36} className="text-ink-muted" />
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <p className="text-[10px] uppercase tracking-wider text-brand-primary font-bold mb-1.5">
                          {r.kategori}
                        </p>
                        <h3 className="font-medium leading-snug mb-2 group-hover:text-brand-accent flex-1">
                          {r.rubrik}
                        </h3>
                        <p className="text-xs text-ink-muted">{r.lastid}</p>
                      </div>
                    </Link>
                  ))}
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
        kategori="Artikel, formatgalleri (infällda rutor)"
        syfte="Visar alla redaktionella format i en längre artikel: sammanfattning, innehållsförteckning, statistikruta, faktaruta, numrerade listor, tipsruta, kundberättelse och författarbio. Rutorna ligger infällda i brödtexten. Använd sidan som referens när du väljer format för en ny artikel."
        malgrupp="Kunder, allmänhet och journalister som har tid att läsa längre och vill förstå på djupet. Sammanfattningen och innehållsförteckningen hjälper den som har bråttom, fördjupningen belönar den som stannar."
        primarHandling="Läsa hela artikeln · Hoppa till ett avsnitt via innehållsförteckningen · Prenumerera · Gå vidare till en relaterad artikel"
        ton="Öresundskrafts röst: mer personlig än ett pressmeddelande och mer eftertänksam än en nyhet. Skriv 'det vi ser i våra installationer' i stället för 'studier visar'. Varierade format gör att texten känns som hantverk."
      />

      <div className="flex items-center justify-between pt-6">
        <Link to="/sidtyper/startsida-nyhetsrum" className="text-sm text-ink-muted hover:text-brand-accent">
          ← Nyhetsrum
        </Link>
      </div>

      <nav aria-label="Breadcrumb" className="text-xs text-ink-muted mt-4 mb-2">
        <ol className="flex gap-1">
          <li><a href="#" className="hover:text-brand-accent">Hem</a></li>
          <li aria-hidden="true">›</li>
          <li><Link to="/sidtyper/startsida-nyhetsrum" className="hover:text-brand-accent">Nyhetsrum</Link></li>
          <li aria-hidden="true">›</li>
          <li><a href="#" className="hover:text-brand-accent">Artiklar</a></li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="font-medium text-ink truncate max-w-[260px]">{POST.rubrik}</li>
        </ol>
      </nav>

      <BlockList pageId="artikel-galleri" blocks={blocks} />
    </div>
  );
}
