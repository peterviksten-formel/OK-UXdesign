import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { getPostBySlug, KATEGORI_LABEL } from "../moduler/nyhetsrum-data";

/**
 * SIDTYP, Artikel-marginalia (editorial-format med marginalia)
 *
 * Variant av Artikel-galleri där editorial-primitives (statistik-highlight,
 * faktaruta, tips & trick, kundberättelse) ligger i höger marginal istället
 * för infällda mellan brödtextstycken.
 *
 * Hypotesen: för längre texter ger marginalia bättre läsflöde, * brödtexten flödar oavbruten i vänster kolumn, sidoinformation finns
 * tillgänglig på samma vertikal nivå utan att bryta narrativet.
 *
 * Mönster: Stratechery, Bloomberg longform, NYT investigations.
 *
 * På mobil/tablet (<lg): kollapsar till inline. Marginalian renderas
 * efter sin tillhörande paragraf eftersom 320px-marginal inte ryms.
 */

const POST = getPostBySlug("solceller-storre-nytta")!;

function formaterDatum(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("sv-SE", { day: "numeric", month: "long", year: "numeric" });
}

/* ─── Marginalia-byggstenar ─────────────────────────────────────── */

/**
 * Wrapper för en sektion som har brödtext i vänster kolumn och
 * marginalia i höger. På mobil kollapsar det till stacked layout
 * (marginalia renderas efter brödtexten).
 */
function SektionMedMarginalia({
  children,
  marginalia,
  id,
}: {
  children: React.ReactNode;
  marginalia: React.ReactNode;
  id?: string;
}) {
  return (
    <section
      id={id}
      className="lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-8 lg:items-start scroll-mt-20"
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
    <Copy
      label="Marginalia, statistik-highlight"
      category="metadata"
      text={`${primarVarde} vs ${sekundarVarde}`}
      rationale="Stora siffror i marginalia-format fungerar som visuell ankarpunkt vid sidan av brödtexten. Två siffror sida vid sida ger inneboende jämförelse utan att bryta läsflödet."
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
    </Copy>
  );
}

function MargFaktaruta({ rubrik, text }: { rubrik: string; text: string }) {
  return (
    <aside className="rounded-md border border-border-subtle bg-surface p-4">
      <p className="text-[10px] uppercase tracking-wider text-ink-muted font-bold mb-2 inline-flex items-center gap-1.5">
        <Icon name="info" size={12} className="text-brand-accent" filled />
        Faktaruta
      </p>
      <p className="font-medium text-sm text-ink mb-1.5">{rubrik}</p>
      <p className="text-xs leading-relaxed text-ink-secondary">{text}</p>
    </aside>
  );
}

function MargTipsTrick({ rubrik, text }: { rubrik: string; text: string }) {
  return (
    <aside className="rounded-md bg-tint-notice border-l-4 border-brand-highlight p-4">
      <p className="text-[10px] uppercase tracking-wider text-brand-highlight font-bold mb-2 inline-flex items-center gap-1.5">
        <Icon name="lightbulb" size={12} filled />
        Tips & trick
      </p>
      <p className="font-medium text-sm text-ink mb-1.5">{rubrik}</p>
      <p className="text-xs leading-relaxed text-ink-secondary">{text}</p>
    </aside>
  );
}

function MargKundberattelse() {
  return (
    <aside className="rounded-md border-l-4 border-brand-accent bg-tint-info p-4">
      <p className="text-[10px] uppercase tracking-wider text-brand-primary font-bold mb-3">
        Kundberättelse
      </p>
      <div className="aspect-square rounded-md bg-tint-highlight border border-border-subtle flex items-center justify-center mb-3">
        <Icon name="image" size={28} className="text-ink-muted" />
      </div>
      <p className="text-sm font-medium leading-snug text-ink mb-2">
        "Vi sänkte elkostnaden med 38 % första året."
      </p>
      <p className="text-xs text-ink-secondary leading-snug">
        Anna & Per, Höganäs, installerade panel + batteri 2024.
      </p>
    </aside>
  );
}

/* ─── Sidtyp-export ───────────────────────────────────────────── */

export function ArtikelMarginalia() {
  const blocks: BlockDef[] = [
    /* ─── 1. HERO, samma som galleri ───────────────────────── */
    {
      id: "hero",
      label: "Artikel-hero",
      variants: [
        {
          key: "default",
          label: "Stor hero-bild + byline",
          render: () => (
            <Annotation
              label="Artikel-hero, storytelling-format"
              audience="user"
              rationale="Identisk hero som ArtikelGalleri, same content, same byline-treatment. Skillnaden mellan formaten ligger i hur brödtext + marginalia samspelar längre ner, inte i header-blocken."
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
                  label="Artikel H1"
                  category="rubrik"
                  text={POST.rubrik}
                  rationale="Frågeform, signalerar att texten har en röst, inte bara fakta."
                >
                  <h1 className="text-display leading-tight mb-4 max-w-reading">{POST.rubrik}</h1>
                </Copy>

                <p className="text-lede text-ink-secondary mb-6 max-w-reading leading-relaxed">
                  {POST.ingress}
                </p>

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
          label: "Highlight-ruta med 3-4 punkter",
          render: () => (
            <section className="max-w-reading">
              <div className="rounded-md bg-tint-info border-l-4 border-brand-accent p-5 sm:p-6">
                <Copy
                  label="Sammanfattning, eyebrow"
                  category="metadata"
                  text="Sammanfattning"
                  rationale="Behåller editorial-register från Galleri-versionen, samma innehåll, samma label, så de två varianterna är lätta att jämföra för redaktören."
                >
                  <p className="text-[11px] uppercase tracking-wider text-brand-primary font-bold mb-3">
                    Sammanfattning
                  </p>
                </Copy>
                <ul className="space-y-2">
                  {[
                    "Solceller utan batteri täcker ca 40 % av en typvillas årsförbrukning. Med batteri dubblas siffran.",
                    "De största besparingarna kommer från smart styrning, varmvatten, elbil och värmepump på rätt tid.",
                    "Nästa generation batterier väntas hösten 2026 och blir 15–20 % billigare per kWh lagring.",
                    "Innan du investerar, kolla din timmesvis förbrukning på Mina sidor.",
                  ].map((s) => (
                    <li key={s} className="flex items-start gap-2 text-sm leading-relaxed">
                      <Icon name="check_circle" size={18} className="text-brand-accent shrink-0 mt-0.5" filled />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ),
        },
      ],
    },

    /* ─── 3. INTRO, lead-stycke ───────────────────────── */
    {
      id: "intro",
      label: "Introduktion, lead-stycke",
      variants: [
        {
          key: "default",
          label: "Större typ utan drop-cap",
          render: () => (
            <section className="max-w-reading">
              <p className="text-lg leading-relaxed text-ink-secondary">
                Solceller är inte längre en investering för entusiasten. De har blivit
                en mainstream-produkt och vi ser fler villor i nordvästra Skåne med
                paneler på taket varje månad. Men frågan om hur mycket nytta de
                faktiskt ger har förändrats, och svaret beror på hur du använder dem.
              </p>
            </section>
          ),
        },
      ],
    },

    /* ─── 4. AVSNITT 1, brödtext + statistik i marginal ── */
    {
      id: "avsnitt-1",
      label: "Avsnitt 1, Vad batterier gör",
      variants: [
        {
          key: "default",
          label: "Brödtext vänster + statistik-highlight i marginal",
          render: () => (
            <Annotation
              label="Marginalia, statistik utanför brödtextflödet"
              audience="design"
              rationale="Brödtexten flödar oavbruten i vänster kolumn. Den stora statistik-jämförelsen (40 % vs 80 %) ligger i höger marginal vid samma vertikalnivå som det stycke som beskriver siffran. Läsare som vill ha siffran i ögonvrån får den; läsare som bara följer texten avbryts inte. Sticky-positioning på lg+ gör att marginalian följer med medan användaren skannar avsnittet."
            >
              <SektionMedMarginalia
                id="vad-batterier-gor"
                marginalia={
                  <MargStatistik
                    primarVarde="40 %"
                    primarLabel={
                      <>
                        Självförsörjning för en typvilla med <strong>endast solceller</strong>.
                      </>
                    }
                    sekundarVarde="80 %"
                    sekundarLabel={
                      <>
                        Med <strong>panel + batteri</strong> 10–13 kWh.
                      </>
                    }
                  />
                }
              >
                <h2 className="text-h3 font-medium text-ink mt-8 mb-3">
                  Vad batterier faktiskt gör
                </h2>
                <p>
                  Det vi ser i våra installationer är att kombinationen av panel +
                  batteri ger den största skillnaden. Panel ensam täcker omkring
                  40 procent av en typvillas årsförbrukning. Med ett batteri på
                  10–13 kWh dubblas den siffran, eftersom du kan lagra
                  middagsproduktionen och använda kvällen.
                </p>
                <p>
                  Skillnaden blir extra tydlig på vintern. En anläggning utan batteri
                  producerar fortfarande på vintern, men på fel tid på dagen.
                  Batteriet flyttar elen till när du faktiskt använder den.
                </p>
                <p>
                  Det är värt att sätta detta i kontext: själva panelen kostar idag
                  cirka hälften så mycket per watt som för fem år sedan. Batteriet
                  är fortfarande den dyrare komponenten, men priset rör sig stadigt
                  nedåt och utbudet växer snabbt.
                </p>
              </SektionMedMarginalia>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 5. AVSNITT 2, brödtext + kundberättelse i marginal ── */
    {
      id: "avsnitt-2",
      label: "Avsnitt 2, Tre mönster + kundberättelse",
      variants: [
        {
          key: "default",
          label: "Brödtext + punktlista + kundberättelse i marginal",
          render: () => (
            <Annotation
              label="Marginalia, kundberättelse som social proof"
              audience="user"
              rationale="Kundberättelsen ligger bredvid avsnittet om 'tre mönster vi ser fungera', Anna & Per är ett konkret exempel på just dessa mönster. Marginalia-positionen gör att social proof finns i ögonvrån när läsaren tar in mönstren, men avbryter inte själva uppräkningen."
            >
              <SektionMedMarginalia id="tre-monster" marginalia={<MargKundberattelse />}>
                <h2 className="text-h3 font-medium text-ink mt-8 mb-3">
                  Tre mönster vi ser fungera
                </h2>
                <p>
                  När vi tittar på vilka anläggningar som ger störst utdelning ser vi tre
                  beteenden som återkommer:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2">
                  <li>
                    <strong className="text-ink">Smart styrning av varmvatten.</strong> Att värma vatten under solens timmar gör en konkret skillnad.
                  </li>
                  <li>
                    <strong className="text-ink">Elbilsladdning på dagen.</strong> Hemmakontoret + elbilen = perfekt match med produktionen.
                  </li>
                  <li>
                    <strong className="text-ink">Värmepump kopplad till smart styrning.</strong> Värm huset när elen är gratis.
                  </li>
                </ul>
                <p>
                  Det här är inte teoretiskt. Vi har sett samma tre val återkomma hos
                  installationerna med högst självförsörjning, oavsett storlek på
                  anläggning.
                </p>

                <Copy
                  label="Pull quote, författarens slutsats"
                  category="ton"
                  text="Den största förändringen är inte att solceller blivit billigare, det är att de börjar prata med resten av huset."
                  rationale="Pull-quote behålls inline (inte i marginalia) eftersom det är författarens röst, inte kompletterande information. Det ska bryta brödtexten, inte ligga vid sidan."
                >
                  <blockquote className="my-8 border-l-4 border-brand-accent pl-6 py-2 not-prose">
                    <p className="text-h4 font-medium leading-snug text-ink">
                      "Den största förändringen är inte att solceller blivit billigare, det
                      är att de börjar prata med resten av huset."
                    </p>
                  </blockquote>
                </Copy>
              </SektionMedMarginalia>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 6. AVSNITT 3, brödtext + faktaruta + tips i marginal ── */
    {
      id: "avsnitt-3",
      label: "Avsnitt 3, Smart styrning + faktaruta + tips",
      variants: [
        {
          key: "default",
          label: "Brödtext + numrerad lista + två marginalia-rutor",
          render: () => (
            <Annotation
              label="Marginalia, flera rutor staplade vertikalt"
              audience="design"
              rationale="Avsnittet har två stödelement (faktaruta + tips & trick). I inline-versionen bröt de varsin gång brödtexten. Här staplas de vertikalt i marginalen, separerade av space-y. Sticky-beteende: så länge avsnittet är synligt följer marginalian med utan att ta över."
            >
              <SektionMedMarginalia
                id="smart-styrning"
                marginalia={
                  <>
                    <MargFaktaruta
                      rubrik="Vad är 'självförsörjning'?"
                      text="Andelen av din årsförbrukning som täcks av el från egna paneler. 100 % betyder att du teoretiskt inte behöver köpa el alls, i praktiken sällan möjligt."
                    />
                    <MargTipsTrick
                      rubrik="Börja smått, testa varmvattnet först"
                      text="Många elcentraler har redan stöd för smart styrning av varmvatten utan ny utrustning. Kontakta din elektriker, det tar oftast under en timme och du ser resultatet på elräkningen redan första månaden."
                    />
                  </>
                }
              >
                <h2 className="text-h3 font-medium text-ink mt-8 mb-3">
                  Smart styrning, det som binder ihop
                </h2>
                <p>
                  Det är inte teknik i sig som ger besparingen, det är att tekniken
                  pratar med varandra. Här är de fyra integrationerna vi rekommenderar
                  i ordning av ROI:
                </p>

                <ol className="space-y-4 my-6 not-prose">
                  {[
                    {
                      titel: "Varmvattenberedaren",
                      text: "Lägsta tröskel, många elcentraler stödjer det redan. Värmer vatten 09–14 när solen producerar.",
                    },
                    {
                      titel: "Elbilsladdaren",
                      text: "Smart laddning som följer din solproduktion. Kräver Easee, Zaptec eller liknande.",
                    },
                    {
                      titel: "Värmepumpen",
                      text: "Schemaläggning eller direkt API-koppling. Ger störst absolut besparing per år.",
                    },
                    {
                      titel: "Batteriet",
                      text: "Tar hand om det som blir över. Bör läggas till sist, när andra integrationer är på plats.",
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

                <p>
                  Det är värt att notera att den första integrationen ofta gör 60–70
                  procent av jobbet. Om du är osäker, börja där och utvärdera innan
                  du investerar i fler.
                </p>
              </SektionMedMarginalia>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 7. AVSNITT 4, slutord, ingen marginalia ──────── */
    {
      id: "avsnitt-4",
      label: "Avsnitt 4, Vad du kan göra själv",
      variants: [
        {
          key: "default",
          label: "Avslutande paragrafer + numrerad CTA, full bredd",
          render: () => (
            <Annotation
              label="Slutord, utan marginalia"
              audience="design"
              rationale="Avslutningen återgår till full reading-bredd. Marginalia funkar bra mitt i artikeln för stödelement; vid slutet behöver brödtexten få vara central när läsaren ska ta åt sig handlingen."
            >
              <section
                id="vad-du-kan-gora"
                className="max-w-reading space-y-5 text-ink-secondary leading-relaxed scroll-mt-20"
              >
                <h2 className="text-h3 font-medium text-ink mt-8 mb-3">
                  Vad du kan göra själv
                </h2>
                <p>
                  Innan du investerar i ett batteri eller smart styrning är det värt att
                  veta din nuvarande förbrukningsprofil. Tre konkreta steg du kan ta i
                  kväll:
                </p>

                <ol className="space-y-3 my-4 not-prose">
                  {[
                    { titel: "Logga in på Mina sidor", text: "Och titta på din timmesvis förbrukning för senaste månaden." },
                    { titel: "Notera när du använder mest", text: "Är det morgon, kväll eller dygnet runt? Det styr om batteri är värt det." },
                    { titel: "Boka en kostnadsfri rådgivning", text: "Vi tittar på din specifika profil och föreslår vad som ger störst nytta för just dig." },
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
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 8. KÄLLOR + TAGGAR ─────────────────────────────── */
    {
      id: "kallor",
      label: "Källor + taggar",
      variants: [
        {
          key: "default",
          label: "Källista + ämnestaggar",
          render: () => (
            <section className="py-8 max-w-reading border-t border-border-subtle mt-10">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <Copy
                    label="Källor, eyebrow"
                    category="metadata"
                    text="Källor"
                    rationale="Genrekonvention. Konsekvent med övriga artikel-varianter."
                  >
                    <p className="text-[11px] uppercase tracking-wider text-ink-muted font-bold mb-3">
                      Källor
                    </p>
                  </Copy>
                  <ul className="text-sm space-y-1.5 text-ink-secondary">
                    <li>Energimyndighetens årsrapport 2025</li>
                    <li>Öresundskrafts installationsstatistik 2023–2026</li>
                    <li>Svenska Solcellsföreningen: marknadsöversikt 2026 Q1</li>
                  </ul>
                </div>
                <div>
                  <Copy
                    label="Taggar, eyebrow"
                    category="metadata"
                    text="Taggar"
                    rationale="Konsekvent med övriga artikel-varianter, en vokabulär."
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
          ),
        },
      ],
    },

    /* ─── 9. SUBSCRIBE ──────────────────────────────────── */
    {
      id: "subscribe",
      label: "Prenumerera",
      variants: [
        {
          key: "default",
          label: "Outcome-rubrik + CTA",
          render: () => (
            <section className="py-8 max-w-reading">
              <div className="rounded-lg bg-tint-info p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Icon name="mail" size={28} className="text-brand-accent shrink-0" />
                <div className="flex-1">
                  <Copy
                    label="Subscribe, outcome-rubrik"
                    category="rubrik"
                    text="Få fler artiklar i mejlen"
                    rationale="Konsekvent med övriga artikel-varianter."
                  >
                    <p className="font-medium">Få fler artiklar i mejlen</p>
                  </Copy>
                  <p className="text-sm text-ink-secondary">
                    Vi skickar inte oftare än en gång i månaden, avregistrera när du vill.
                  </p>
                </div>
                <Copy
                  label="Subscribe, CTA"
                  category="cta"
                  text="Prenumerera"
                  rationale="Konsekvent med övriga artikel-varianter."
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
          label: "Tre kort",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <Copy
                label="Related, rubrik"
                category="rubrik"
                text="Fortsätt läsa"
                rationale="Konsekvent med övriga artikel-varianter."
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
          ),
        },
      ],
    },
  ];

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6">
      <PageBrief
        kategori="Artikel, marginalia-format (skiss)"
        syfte="Variant av Artikel-galleri där editorial-primitives (statistik-highlight, faktaruta, tips & trick, kundberättelse) ligger i höger marginal istället för infällda i brödtexten. Hypotes: för längre texter ger marginalia bättre läsflöde, brödtexten flödar oavbruten medan stödelement finns tillgängliga i ögonvrån."
        malgrupp="Samma som Artikel-galleri, kunder, allmänhet, journalister med tid att läsa fördjupande. Marginalia-formatet är optimerat för läsare som vill behålla läsflöde och kunna 'glide forbi' stödelement utan att tvingas pausa vid varje."
        primarHandling="Läsa artikeln · Använda marginalia-element selektivt · Klicka vidare till relaterad artikel."
        ton="Brand voice. Saklig stödinformation i marginal, inte säljande. Utseendemässigt mer 'tidning' / longform än 'blog'."
      />

      <div className="flex items-center justify-between pt-6">
        <Link to="/sidtyper/startsida-nyhetsrum" className="text-sm text-ink-muted hover:text-brand-accent">
          ← Nyhetsrum
        </Link>
        <Link to="/sidtyper/artikel-galleri" className="text-sm text-ink-muted hover:text-brand-accent">
          Jämför med inline-format →
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
