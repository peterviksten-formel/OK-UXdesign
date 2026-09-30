import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { getPostBySlug, KATEGORI_LABEL } from "../moduler/nyhetsrum-data";

/**
 * SIDTYP: Artikel, marginaltextformat
 *
 * Variant av formatgalleriet där statistikruta, faktaruta, tipsruta och
 * kundberättelse ligger i högermarginalen i stället för infällda mellan
 * styckena.
 *
 * Hypotes: i längre texter ger marginaltext ett bättre läsflöde. Brödtexten
 * löper utan avbrott i vänster spalt, och stödinformationen finns i samma
 * höjd utan att bryta berättelsen.
 *
 * Förebilder: Stratechery, Bloombergs långa reportage, NYT:s granskningar.
 *
 * På mobil och surfplatta (under lg) läggs rutorna i stället efter sitt
 * stycke, eftersom en marginal på 280 px inte får plats.
 */

const POST = getPostBySlug("solceller-storre-nytta")!;

function formaterDatum(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("sv-SE", { day: "numeric", month: "long", year: "numeric" });
}

/* ─── Byggstenar för marginaltext ───────────────────────────────── */

/**
 * Sektion med brödtext i vänster spalt och marginaltext i höger. På mobil
 * staplas allt, och marginaltexten hamnar efter brödtexten.
 * Övriga props (t.ex. från <Annotation>) skickas vidare till <section>.
 */
function SektionMedMarginalia({
  children,
  marginalia,
  id,
  className,
  ...rest
}: {
  children: React.ReactNode;
  marginalia: React.ReactNode;
  id?: string;
} & React.ComponentPropsWithRef<"section">) {
  return (
    <section
      id={id}
      {...rest}
      className={`lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-8 lg:items-start scroll-mt-20${className ? ` ${className}` : ""}`}
    >
      <div className="space-y-5 text-ink-secondary leading-relaxed">{children}</div>
      <aside className="mt-6 lg:mt-0 lg:sticky lg:top-20 space-y-4">{marginalia}</aside>
    </section>
  );
}

function MargStatistik({
  primarVarde,
  primarLabel,
  sekundarVarde,
  sekundarLabel,
}: {
  primarVarde: string;
  primarLabel: React.ReactNode;
  sekundarVarde: string;
  sekundarLabel: React.ReactNode;
}) {
  return (
    <Annotation
      label="Statistikruta i marginalen"
      audience="redaktör"
      rationale="Samma statistikruta som i formatgalleriet, men bredvid texten. Siffran finns i ögonvrån för den som vill ha den, utan att avbryta den som bara läser. Skriv under varje siffra vad den mäter."
    >
      <div className="rounded-md bg-tint-notice p-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-h2 font-medium leading-none">{primarVarde}</p>
            <p className="text-xs text-ink-secondary mt-2 leading-snug">{primarLabel}</p>
          </div>
          <div className="border-l border-border-subtle pl-3">
            <p className="text-h2 font-medium leading-none text-brand-accent">{sekundarVarde}</p>
            <p className="text-xs text-ink-secondary mt-2 leading-snug">{sekundarLabel}</p>
          </div>
        </div>
      </div>
    </Annotation>
  );
}

function MargFaktaruta({ rubrik, text }: { rubrik: string; text: string }) {
  return (
    <Annotation
      label="Faktaruta i marginalen"
      audience="redaktör"
      rationale="Samma faktaruta som i formatgalleriet, men i marginalen. Den som redan kan begreppet läser vidare utan paus, och den som inte kan det hittar förklaringen bredvid. Rubriken är en fråga, svaret högst tre meningar."
    >
      <aside className="rounded-md border border-border-subtle bg-surface p-4">
        <p className="text-[10px] uppercase tracking-wider text-ink-muted font-bold mb-2 inline-flex items-center gap-1.5">
          <Icon name="info" size={12} className="text-brand-accent" filled />
          Faktaruta
        </p>
        <Copy
          label="Faktaruta, rubrik"
          category="rubrik"
          text={rubrik}
          rationale="Frågan är formulerad som läsaren skulle ställa den, så det syns direkt om rutan svarar på något hen undrar. Citattecknen visar att det är själva begreppet som förklaras."
        >
          <p className="font-medium text-sm text-ink mb-1.5">{rubrik}</p>
        </Copy>
        <p className="text-xs leading-relaxed text-ink-secondary">{text}</p>
      </aside>
    </Annotation>
  );
}

function MargTipsTrick({ rubrik, text }: { rubrik: string; text: string }) {
  return (
    <Annotation
      label="Tipsruta i marginalen"
      audience="redaktör"
      rationale="Samma tipsruta som i formatgalleriet, men i marginalen. Den ger läsaren en konkret sak att göra utan att avbryta resonemanget i brödtexten. Skriv ett tips per ruta."
    >
      <aside className="rounded-md bg-tint-notice border-l-4 border-brand-highlight p-4">
        <p className="text-[10px] uppercase tracking-wider text-brand-highlight font-bold mb-2 inline-flex items-center gap-1.5">
          <Icon name="lightbulb" size={12} filled />
          Tips
        </p>
        <Copy
          label="Tipsruta, rubrik"
          category="reassurance"
          text={rubrik}
          rationale="Rubriken säger vad läsaren ska göra och sänker tröskeln med 'börja smått'. Texten under svarar på det läsaren oroar sig för: kostnad, tid och när resultatet syns."
        >
          <p className="font-medium text-sm text-ink mb-1.5">{rubrik}</p>
        </Copy>
        <p className="text-xs leading-relaxed text-ink-secondary">{text}</p>
      </aside>
    </Annotation>
  );
}

function MargKundberattelse() {
  return (
    <Annotation
      label="Kundberättelse i marginalen"
      audience="user"
      rationale="Anna och Per är ett konkret exempel på mönstren i texten bredvid. Kortversionen i marginalen ger förtroende medan läsaren tar in råden, utan att avbryta uppräkningen. Formatgalleriet visar en längre version infälld i texten."
    >
      <aside className="rounded-md border-l-4 border-brand-accent bg-tint-info p-4">
        <p className="text-[10px] uppercase tracking-wider text-brand-primary font-bold mb-3">
          Kundberättelse
        </p>
        <div className="aspect-square rounded-md bg-tint-highlight border border-border-subtle flex items-center justify-center mb-3">
          <Icon name="image" size={28} className="text-ink-muted" />
        </div>
        <Copy
          label="Kundcitat"
          category="ton"
          text="Vi sänkte elkostnaden med 38 % första året."
          rationale="I marginalen räcker den konkreta siffran. Kundens egna ord väger tyngre än våra, och en kort mening går att läsa i ögonvrån. Använd riktiga siffror från kunden."
        >
          <p className="text-sm font-medium leading-snug text-ink mb-2">
            "Vi sänkte elkostnaden med 38 % första året."
          </p>
        </Copy>
        <p className="text-xs text-ink-secondary leading-snug">
          Anna och Per i Höganäs installerade solceller och batteri 2024.
        </p>
      </aside>
    </Annotation>
  );
}

/* ─── Sidtyp-export ───────────────────────────────────────────── */

export function ArtikelMarginalia() {
  const blocks: BlockDef[] = [
    /* ─── 1. TOPP, samma som formatgalleriet ──────────────── */
    {
      id: "hero",
      label: "Artikelns topp",
      variants: [
        {
          key: "default",
          label: "Stor bild och byline",
          render: () => (
            <Annotation
              label="Artikelns topp: rubrik, byline och bild"
              audience="user"
              rationale="Samma topp som i formatgalleriet, så att de två formaten går att jämföra rättvist. Kategori, rubrik och byline visar vad artikeln handlar om och vem som skrivit den. Skillnaden syns först längre ner."
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
                    rationale="Samma ord och innehåll som i formatgalleriet, så att de två formaten är lätta att jämföra. 'Sammanfattning' passar artikelns redaktionella ton; nyheter använder 'Det viktigaste'."
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

    /* ─── 3. INLEDANDE STYCKE ─────────────────────────── */
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

    /* ─── 4. AVSNITT 1: brödtext och statistikruta i marginalen ── */
    {
      id: "avsnitt-1",
      label: "Avsnitt 1, Vad batterier gör",
      variants: [
        {
          key: "default",
          label: "Brödtext till vänster, statistikruta i marginalen",
          render: () => (
            <Annotation
              label="Brödtext med marginaltext"
              audience="design"
              rationale="Brödtexten löper utan avbrott i vänster spalt, och rutorna ligger i marginalen i höjd med stycket de hör till. På stora skärmar följer marginalen med när du scrollar. På mobil hamnar rutorna efter sitt stycke."
            >
              <SektionMedMarginalia
                id="vad-batterier-gor"
                marginalia={
                  <MargStatistik
                    primarVarde="40 %"
                    primarLabel={
                      <Copy
                        label="Statistikruta, förklaring under siffran"
                        category="metadata"
                        text="Självförsörjning för en typvilla med endast solceller."
                        rationale="Texten under siffran säger vad den mäter, så att den inte kan missförstås. Fetstilen pekar ut skillnaden mellan siffrorna: endast solceller jämfört med solceller och batteri."
                      >
                        <span>
                          Självförsörjning för en typvilla med <strong>endast solceller</strong>.
                        </span>
                      </Copy>
                    }
                    sekundarVarde="80 %"
                    sekundarLabel={
                      <>
                        Med <strong>solceller och batteri</strong> på 10 till 13 kWh.
                      </>
                    }
                  />
                }
              >
                <Copy
                  label="Mellanrubrik, avsnitt 1"
                  category="rubrik"
                  text="Vad batterier faktiskt gör"
                  rationale="Samma mellanrubriker som i formatgalleriet, så att formaten går att jämföra. 'Faktiskt' knyter an till ingressens löfte om att skilja det som fungerar från det som är överdrivet."
                >
                  <h2 className="text-h3 font-medium text-ink mt-8 mb-3">
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
                <p>
                  Skillnaden blir extra tydlig på vintern. Solcellerna producerar el även
                  då, men vid fel tid på dygnet. Batteriet flyttar elen till när du
                  faktiskt använder den.
                </p>
                <p>
                  Sätt det i perspektiv: solcellerna kostar i dag ungefär hälften så
                  mycket per watt som för fem år sedan. Batteriet är fortfarande den
                  dyrare delen, men priset sjunker stadigt och utbudet växer snabbt.
                </p>
              </SektionMedMarginalia>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 5. AVSNITT 2: brödtext och kundberättelse i marginalen ── */
    {
      id: "avsnitt-2",
      label: "Avsnitt 2, Tre mönster och kundberättelse",
      variants: [
        {
          key: "default",
          label: "Brödtext, punktlista och kundberättelse i marginalen",
          render: () => (
            <SektionMedMarginalia id="tre-monster" marginalia={<MargKundberattelse />}>
              <Copy
                label="Mellanrubrik, avsnitt 2"
                category="rubrik"
                text="Tre mönster som fungerar"
                rationale="Siffran i rubriken säger hur mycket som kommer, och det gör avsnittet lätt att skumma. 'Som fungerar' är enklare svenska än 'vi ser fungera'."
              >
                <h2 className="text-h3 font-medium text-ink mt-8 mb-3">
                  Tre mönster som fungerar
                </h2>
              </Copy>
              <p>
                När vi tittar på vilka anläggningar som ger mest ser vi tre vanor som
                återkommer:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                <li>
                  <strong className="text-ink">Smart styrning av varmvatten.</strong> Att värma vattnet när solen lyser gör konkret skillnad.
                </li>
                <li>
                  <strong className="text-ink">Elbilsladdning på dagen.</strong> Jobbar du hemifrån passar laddningen perfekt ihop med solproduktionen.
                </li>
                <li>
                  <strong className="text-ink">Värmepump kopplad till smart styrning.</strong> Huset värms när elen är gratis.
                </li>
              </ul>
              <p>
                Det här är inte teori. Vi ser samma tre val hos de anläggningar som har
                högst självförsörjning, oavsett hur stora de är.
              </p>

              <Copy
                label="Lyft citat"
                category="ton"
                text="Den största förändringen är inte att solceller blivit billigare, utan att de börjar prata med resten av huset."
                rationale="Det lyfta citatet stannar i brödtexten och flyttas inte till marginalen, eftersom det är författarens egen röst och inte kompletterande fakta. Det ska bryta texten, inte ligga vid sidan av."
              >
                <blockquote className="my-8 border-l-4 border-brand-accent pl-6 py-2 not-prose">
                  <p className="text-h4 font-medium leading-snug text-ink">
                    "Den största förändringen är inte att solceller blivit billigare, utan
                    att de börjar prata med resten av huset."
                  </p>
                </blockquote>
              </Copy>
            </SektionMedMarginalia>
          ),
        },
      ],
    },

    /* ─── 6. AVSNITT 3: numrerad lista, faktaruta och tips i marginalen ── */
    {
      id: "avsnitt-3",
      label: "Avsnitt 3, Smart styrning, faktaruta och tips",
      variants: [
        {
          key: "default",
          label: "Brödtext, numrerad lista och två rutor i marginalen",
          render: () => (
            <Annotation
              label="Flera rutor staplade i marginalen"
              audience="design"
              rationale="Avsnittet har två rutor, en faktaruta och ett tips. Infällda skulle de bryta brödtexten två gånger. Här ligger de under varandra i marginalen och följer med så länge avsnittet syns, utan att ta över."
            >
              <SektionMedMarginalia
                id="smart-styrning"
                marginalia={
                  <>
                    <MargFaktaruta
                      rubrik={'Vad är "självförsörjning"?'}
                      text="Andelen av din årsförbrukning som täcks av el från dina egna solceller. 100 % betyder att du i teorin aldrig behöver köpa el, men i praktiken går det sällan."
                    />
                    <MargTipsTrick
                      rubrik="Börja smått: testa varmvattnet först"
                      text="Många elcentraler kan redan styra varmvattnet smart, utan ny utrustning. Kontakta din elektriker. Det tar oftast mindre än en timme, och du ser resultatet på elräkningen redan första månaden."
                    />
                  </>
                }
              >
                <Copy
                  label="Mellanrubrik, avsnitt 3"
                  category="rubrik"
                  text="Smart styrning binder ihop allt"
                  rationale="Rubriken är ett påstående som sammanfattar avsnittet. Läsaren som bara skummar rubrikerna får ändå med sig poängen."
                >
                  <h2 className="text-h3 font-medium text-ink mt-8 mb-3">
                    Smart styrning binder ihop allt
                  </h2>
                </Copy>
                <p>
                  Det är inte tekniken i sig som ger besparingen, utan att prylarna
                  pratar med varandra. Här är de fyra kopplingar vi rekommenderar, i
                  ordning efter hur snabbt de lönar sig:
                </p>

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
              </SektionMedMarginalia>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 7. AVSNITT 4: avslutning utan marginaltext ──────── */
    {
      id: "avsnitt-4",
      label: "Avsnitt 4, Det här kan du göra själv",
      variants: [
        {
          key: "default",
          label: "Avslutande stycke och numrerade steg i full bredd",
          render: () => (
            <Annotation
              label="Avslutning utan marginaltext"
              audience="design"
              rationale="Avslutningen går tillbaka till en spalt utan marginal. Mitt i artikeln passar rutor bredvid texten, men när läsaren ska ta till sig stegen ska inget annat konkurrera om uppmärksamheten."
            >
              <section
                id="vad-du-kan-gora"
                className="max-w-reading space-y-5 text-ink-secondary leading-relaxed scroll-mt-20"
              >
                <Copy
                  label="Mellanrubrik, avsnitt 4"
                  category="rubrik"
                  text="Det här kan du göra själv"
                  rationale="Du-tilltal och ett löfte om handling. Rubriken markerar övergången från förklaring till egna steg."
                >
                  <h2 className="text-h3 font-medium text-ink mt-8 mb-3">
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
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 8. KÄLLOR OCH TAGGAR ──────────────────────────── */
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

    /* ─── 9. PRENUMERERA ─────────────────────────────── */
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

    /* ─── 10. RELATERADE ARTIKLAR ───────────────────────── */
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
                    { rubrik: "Effekttariffer förklarade, så undviker du onödiga toppar", kategori: "Utbildning", lastid: "4 min", to: "/sidtyper/artikel" },
                    { rubrik: "Energikartläggningen visade Clemondos besparingspotential", kategori: "Kundcase", lastid: "5 min", to: "/sidtyper/artikel" },
                    { rubrik: "Framtidens fjärrvärme: lägre temperatur, smartare distribution", kategori: "Hållbarhet", lastid: "7 min", to: "/sidtyper/artikel" },
                  ].map((r) => (
                    <Link
                      key={r.rubrik}
                      to={r.to}
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
        kategori="Artikel, marginaltextformat"
        syfte="Samma artikel som formatgalleriet, men statistikruta, faktaruta, tipsruta och kundberättelse ligger i högermarginalen i stället för infällda i texten. Vi testar om det ger ett bättre läsflöde i längre texter, eftersom brödtexten kan löpa utan avbrott."
        malgrupp="Samma som formatgalleriet: kunder, allmänhet och journalister som vill läsa på djupet. Formatet passar den som vill hålla tråden i texten och själv välja vilka rutor hen läser."
        primarHandling="Läsa artikeln · Läsa rutorna i marginalen vid behov · Prenumerera · Gå vidare till en relaterad artikel"
        ton="Öresundskrafts röst. Rutorna i marginalen är sakliga och säljer inte. Helheten ska påminna mer om en tidning än om en blogg."
      />

      <div className="flex items-center justify-between pt-6">
        <Link to="/sidtyper/startsida-nyhetsrum" className="text-sm text-ink-muted hover:text-brand-accent">
          ← Nyhetsrum
        </Link>
        <Link to="/sidtyper/artikel-galleri" className="text-sm text-ink-muted hover:text-brand-accent">
          Jämför med infällda rutor →
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

      <BlockList pageId="artikel-marginalia" blocks={blocks} />
    </div>
  );
}
