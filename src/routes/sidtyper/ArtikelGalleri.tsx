import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { getPostBySlug, KATEGORI_LABEL } from "../moduler/nyhetsrum-data";

/**
 * SIDTYP, Artikel-galleri (rik editorial-struktur)
 *
 * Galleri av editorial-format: TOC med djuplänkar, faktarutor, fancy
 * numrerade listor, tips & trick-rutor, statistik-highlights, författarbio.
 *
 * Används som referens när redaktören ska välja format för en specifik
 * artikel, den vanliga Artikel-sidtypen är enklare och täcker det
 * vardagliga fallet utan alla varianter.
 */

const POST = getPostBySlug("solceller-storre-nytta")!;

function formaterDatum(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("sv-SE", { day: "numeric", month: "long", year: "numeric" });
}

/**
 * Artikelns inre TOC, speglas i innehåll-blocket och som anchor-id på H2.
 * Genererar både länkar och rubrikerna konsekvent.
 */
const SECTIONS = [
  { id: "vad-batterier-gor", titel: "Vad batterier faktiskt gör" },
  { id: "tre-monster", titel: "Tre mönster vi ser fungera" },
  { id: "smart-styrning", titel: "Smart styrning, det som binder ihop" },
  { id: "vad-du-kan-gora", titel: "Vad du kan göra själv" },
];

export function ArtikelGalleri() {
  const blocks: BlockDef[] = [
    /* ─── 1. HERO, kategori + h1 + byline + lead-bild ──────── */
    {
      id: "hero",
      label: "Artikel-hero",
      variants: [
        {
          key: "default",
          label: "Stor hero-bild + byline med foto + lästid",
          render: () => (
            <Annotation
              label="Artikel-hero, storytelling-format"
              audience="user"
              rationale="Kategori-pill (kategorifärg), stor hero-bild, författar-byline med foto + roll + datum + lästid. Lästid sätter förväntan så användaren kan välja om de ska läsa nu eller spara."
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
                  label="Artikel H1, narrativ rubrik"
                  category="rubrik"
                  text={POST.rubrik}
                  rationale="Frågeform eller berättande, signalerar att texten har en röst, inte bara fakta."
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

    /* ─── 2. SAMMANFATTNING, key takeaways ──────────────── */
    {
      id: "sammanfattning",
      label: "Sammanfattning, key takeaways",
      variants: [
        {
          key: "default",
          label: "Ruta med 3-4 punkter",
          render: () => (
            <Annotation
              label="Sammanfattning överst, för dem som inte hinner läsa allt"
              audience="user"
              rationale="Editorial-konvention: ge bortskumningsläsaren det viktigaste i 3-4 punkter. Den som har 30 sekunder får värde direkt; den som har 6 minuter scrollar förbi och läser fördjupningen. Stylad som highlight-ruta så den syns mot brödtexten."
            >
              <section className="max-w-reading">
                <div className="rounded-md bg-tint-info border-l-4 border-brand-accent p-5 sm:p-6">
                  <Copy
                    label="Sammanfattning, eyebrow"
                    category="metadata"
                    text="Sammanfattning"
                    rationale="Editorial register passar artikel-genren, 'Sammanfattning' speglar redaktionellt språkbruk. Jämför med Nyhet som använder 'Det viktigaste' (vardagssvenska för kund). Konsekvens: olika typsidor, olika register."
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
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 3. INNEHÅLL, TOC med djuplänkar ─────────────── */
    {
      id: "innehall",
      label: "Innehåll, TOC med djuplänkar",
      variants: [
        {
          key: "default",
          label: "Lista med ankarlänkar + pil-indikator",
          render: () => (
            <Annotation
              label="Innehållsförteckning, djuplänkar i längre artiklar"
              audience="user"
              rationale="Vid 5+ minuter lästid uppskattar läsaren att kunna hoppa till en specifik del. Ankarlänkar med smooth-scroll fungerar både för 'jag är tillbaka från igår, vart läste jag?' och 'jag bryr mig bara om del 3'. Pil-ikonen vid varje länk + hover-shift gör djuplänken affordance entydig, det är inte en numrerad lista, det är klickbara hopp."
            >
              <section className="max-w-reading mt-6">
                <div className="rounded-md border border-border-subtle bg-surface p-5">
                  <Copy
                    label="TOC, eyebrow"
                    category="metadata"
                    text="I denna artikel"
                    rationale="Editorial-konvention för innehållsförteckning i longform. 'Innehåll' (för formellt) eller 'Det här tar vi upp' (för vardagligt) skulle bryta artikelns redaktionella register. Pilen vid varje länk gör djuplänk-affordancen entydig."
                  >
                    <p className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-3">
                      I denna artikel
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

    /* ─── 4. INTRO, större lead-stycke ───────────────────── */
    {
      id: "intro",
      label: "Introduktion, lead-stycke",
      variants: [
        {
          key: "default",
          label: "Större typ, markerar artikelns ingång",
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

    /* ─── 5. AVSNITT 1, h2 + brödtext + faktaruta + statistik ─ */
    {
      id: "avsnitt-1",
      label: "Avsnitt 1, Vad batterier gör",
      variants: [
        {
          key: "default",
          label: "H2 + paragrafer + statistik-highlight + faktaruta",
          render: () => (
            <Annotation
              label="Editorial-mix, paragraf, statistik, faktaruta"
              audience="redaktör"
              rationale="Traditionell brödtext bryts av med en stor statistik (visar siffran man pratar om visuellt) och en faktaruta som pausar läsaren vid något hen behöver veta för att förstå resten. Båda är scrollbara förbi för dem som inte vill ha alla detaljer."
            >
              <section className="max-w-reading space-y-5 text-ink-secondary leading-relaxed">
                <h2 id="vad-batterier-gor" className="text-h3 font-medium text-ink mt-8 mb-3 scroll-mt-20">
                  Vad batterier faktiskt gör
                </h2>
                <p>
                  Det vi ser i våra installationer är att kombinationen av panel +
                  batteri ger den största skillnaden. Panel ensam täcker omkring
                  40 procent av en typvillas årsförbrukning. Med ett batteri på
                  10–13 kWh dubblas den siffran, eftersom du kan lagra
                  middagsproduktionen och använda kvällen.
                </p>

                {/* Statistik-highlight */}
                <Copy
                  label="Statistik-highlight"
                  category="metadata"
                  text="40 % självförsörjning utan batteri · 80 % med"
                  rationale="Stora siffror i editorial-format, 'pull stat' istället för 'pull quote'. Drar uppmärksamhet, gör abstrakt argument konkret. Två siffror sida vid sida ger inneboende jämförelse."
                >
                  <div className="rounded-md bg-tint-notice p-5 grid grid-cols-2 gap-4 my-4 not-prose">
                    <div>
                      <p className="text-display font-medium leading-none">40<span className="text-h3 text-ink-muted"> %</span></p>
                      <p className="text-xs text-ink-secondary mt-2 leading-snug">
                        Självförsörjning för en typvilla med <strong>endast solceller</strong>.
                      </p>
                    </div>
                    <div className="border-l border-border-subtle pl-4">
                      <p className="text-display font-medium leading-none text-brand-accent">80<span className="text-h3 text-ink-muted"> %</span></p>
                      <p className="text-xs text-ink-secondary mt-2 leading-snug">
                        Med <strong>panel + batteri</strong> 10–13 kWh.
                      </p>
                    </div>
                  </div>
                </Copy>

                <p>
                  Skillnaden blir extra tydlig på vintern. En anläggning utan batteri
                  producerar fortfarande på vintern, men på fel tid på dagen.
                  Batteriet flyttar elen till när du faktiskt använder den.
                </p>

                {/* Faktaruta */}
                <aside className="rounded-md border border-border-subtle bg-surface p-5 my-6 not-prose">
                  <p className="text-[11px] uppercase tracking-wider text-ink-muted font-bold mb-2 inline-flex items-center gap-1.5">
                    <Icon name="info" size={14} className="text-brand-accent" filled />
                    Faktaruta
                  </p>
                  <p className="font-medium text-ink mb-2">Vad är "självförsörjning"?</p>
                  <p className="text-sm leading-relaxed">
                    Andelen av din årsförbrukning som täcks av el från dina egna paneler.
                    100 % självförsörjning betyder att du teoretiskt inte behöver köpa el alls.
                    I praktiken är det sällan möjligt eftersom solen inte producerar dygnet runt.
                  </p>
                </aside>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 6. AVSNITT 2, punktlista + bild + citat ───────── */
    {
      id: "avsnitt-2",
      label: "Avsnitt 2, Tre mönster",
      variants: [
        {
          key: "default",
          label: "Punktlista + inline-bild + citat",
          render: () => (
            <Annotation
              label="Punktlista + bild + citat, varierad rytm"
              audience="redaktör"
              rationale="Tre format på rad bryter monotoni: punktlista för skanbarhet, bild med bildtext för andrum, indraget citat som markerar redaktionellt grepp. Användaren upplever det som att läsa något skrivet av en människa, inte en SEO-text."
            >
              <section className="max-w-reading space-y-5 text-ink-secondary leading-relaxed">
                <h2 id="tre-monster" className="text-h3 font-medium text-ink mt-8 mb-3 scroll-mt-20">
                  Tre mönster vi ser fungera
                </h2>
                <p>
                  När vi tittar på vilka anläggningar som ger störst utdelning ser vi tre
                  beteenden som återkommer:
                </p>
                <ul className="list-disc list-inside space-y-1.5 pl-2">
                  <li><strong className="text-ink">Smart styrning av varmvatten.</strong> Att värma vatten under solens timmar gör en konkret skillnad.</li>
                  <li><strong className="text-ink">Elbilsladdning på dagen.</strong> Hemmakontoret + elbilen = perfekt match med produktionen.</li>
                  <li><strong className="text-ink">Värmepump kopplad till smart styrning.</strong> Värm huset när elen är gratis.</li>
                </ul>

                {/* Inline-bild */}
                <figure className="my-8 not-prose">
                  <div className="rounded-md bg-tint-info aspect-[16/9] flex items-center justify-center border border-border-subtle">
                    <Icon name="battery_charging_full" size={48} className="text-ink-muted" />
                  </div>
                  <figcaption className="text-xs text-ink-muted mt-2">
                    Solcellsbatteri monterat i Helsingborg-villa. Ett batteri på 10–13 kWh
                    räcker för en typisk villa. Foto: Öresundskraft / Maria Söderström
                  </figcaption>
                </figure>

                {/* Inline pull-quote */}
                <Copy
                  label="Pull quote, författarens slutsats"
                  category="ton"
                  text="Den största förändringen är inte att solceller blivit billigare, det är att de börjar prata med resten av huset."
                  rationale="Pull-quote är editorial-konvention: en mening lyfts ut ur brödtexten i större typ för att ankra läsarens minne. Inte ett externt citat utan författarens egen slutsats."
                >
                  <blockquote className="my-8 border-l-4 border-brand-accent pl-6 py-2 not-prose">
                    <p className="text-h4 font-medium leading-snug text-ink">
                      "Den största förändringen är inte att solceller blivit billigare, det
                      är att de börjar prata med resten av huset."
                    </p>
                  </blockquote>
                </Copy>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 7. AVSNITT 3, fancy numrerad lista + tips&trick ── */
    {
      id: "avsnitt-3",
      label: "Avsnitt 3, Smart styrning",
      variants: [
        {
          key: "default",
          label: "Numrerad lista med färgade siffror + tips-ruta",
          render: () => (
            <Annotation
              label="Numrerad lista, fancy circle numbers"
              audience="design"
              rationale="Numrerade listor i editorial-format är inte default <ol> utan fina siffror på färgad cirkel, visuellt distinkt från punktlistan ovan, gör steg-för-steg-innehåll lätt att skanna. Varje punkt har titel + utvecklingstext (subtitle-style)."
            >
              <section className="max-w-reading space-y-5 text-ink-secondary leading-relaxed">
                <h2 id="smart-styrning" className="text-h3 font-medium text-ink mt-8 mb-3 scroll-mt-20">
                  Smart styrning, det som binder ihop
                </h2>
                <p>
                  Det är inte teknik i sig som ger besparingen, det är att tekniken
                  pratar med varandra. Här är de fyra integrationerna vi rekommenderar
                  i ordning av ROI:
                </p>

                {/* Fancy numbered list */}
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
                  Det är värt att notera att den första integrationen ofta gör 60–70 procent
                  av jobbet. Om du är osäker, börja där och utvärdera innan du investerar
                  i fler.
                </p>

                {/* Tips & trick callout */}
                <Copy
                  label="Tips & trick-ruta"
                  category="reassurance"
                  text="Tips: börja med varmvattnet, det ger 60-70 % av besparingen direkt"
                  rationale="Editorial 'tips'-rutor är välkända i populärvetenskaplig press. Visuellt skild med gul/varning-bakgrund + glödlampa-ikon. Pausar läsaren med en konkret handling att ta med sig."
                >
                  <aside className="rounded-md bg-tint-notice border-l-4 border-brand-highlight p-5 my-6 not-prose">
                    <p className="text-[11px] uppercase tracking-wider text-brand-highlight font-bold mb-2 inline-flex items-center gap-1.5">
                      <Icon name="lightbulb" size={14} filled />
                      Tips & trick
                    </p>
                    <p className="font-medium text-ink mb-2">Börja smått, testa varmvattnet först</p>
                    <p className="text-sm leading-relaxed">
                      Många elcentraler har redan stöd för smart styrning av varmvatten utan att
                      du behöver ny utrustning. Kontakta din elektriker, det tar oftast under
                      en timme att aktivera och du ser resultatet på elräkningen redan första
                      månaden.
                    </p>
                  </aside>
                </Copy>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 8. KUNDBERÄTTELSE, social proof inline ──────────── */
    {
      id: "kundberattelse",
      label: "Kundberättelse, proof of concept",
      variants: [
        {
          key: "default",
          label: "Foto + pull-quote + kontext",
          render: () => (
            <Annotation
              label="Kundberättelse, social proof i editorial-format"
              audience="user"
              rationale="Mellan smart-styrning-avsnittet (teori) och 'vad du kan göra själv' (handling), bryter med konkret bevis att rådet fungerar. Editorial-stil (foto + citat + kontext) snarare än generisk testimonial-card. Stärker artikelns trovärdighet på samma sätt som en case-studie gör i en längre essä."
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
                        label="Kundberättelse, pull-quote"
                        category="ton"
                        text="Vi sänkte elkostnaden med 38 % första året, och vi gjorde inget alls med vanorna."
                        rationale="Konkret siffra (38 %) + 'vi gjorde inget alls med vanorna' = motbevis mot 'detta kräver att jag ändrar livsstil'. Ger läsaren tillåtelse att tro att förändringen är hanterbar."
                      >
                        <p className="text-h4 font-medium leading-snug text-ink mb-3">
                          "Vi sänkte elkostnaden med 38 % första året, och vi gjorde inget alls med vanorna."
                        </p>
                      </Copy>

                      <p className="text-sm text-ink-secondary leading-relaxed mb-2">
                        Anna och Per installerade panel + batteri våren 2024. De aktiverade smart styrning av
                        varmvatten direkt. Bilen laddas på dagen när hemmet är tomt och produktionen är som högst.
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

    /* ─── 9. AVSNITT 4, slutord + handling ──────────────── */
    {
      id: "avsnitt-4",
      label: "Avsnitt 4, Vad du kan göra själv",
      variants: [
        {
          key: "default",
          label: "Avslutande paragrafer + numrerad call-to-action",
          render: () => (
            <section className="max-w-reading space-y-5 text-ink-secondary leading-relaxed">
              <h2 id="vad-du-kan-gora" className="text-h3 font-medium text-ink mt-8 mb-3 scroll-mt-20">
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

              <p>
                Om du redan har solceller utan batteri är det ofta värt att vänta in
                nästa generation batterier (väntat hösten 2026) som är 15–20 % billigare per kWh
                lagring jämfört med dagens.
              </p>
            </section>
          ),
        },
      ],
    },

    /* ─── 9. KÄLLOR + TAGGAR ─────────────────────────────── */
    {
      id: "kallor",
      label: "Källor + taggar",
      variants: [
        {
          key: "default",
          label: "Källista + ämnestaggar",
          render: () => (
            <Annotation
              label="Källor, trovärdighet via transparens"
              audience="redaktör"
              rationale="Editorial-konvention: artiklar med statistik och fakta avslutas med källor. Skiljer från press-boilerplate (faktaruta om avsändaren), detta är externa referenser. Taggar bredvid gör artikeln upptäckbar via filter."
            >
              <section className="py-8 max-w-reading border-t border-border-subtle mt-10">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Copy
                      label="Källor, eyebrow"
                      category="metadata"
                      text="Källor"
                      rationale="Genrekonvention. Externa belägg för det som påstås, skiljer sig från press-boilerplate (faktaruta om avsändaren). Konsekvens: samma 'Källor'-eyebrow i både Artikel och ArtikelGalleri."
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
                      rationale="Konsekvent med Artikel.tsx, samma label, samma plats. Två sidtyper, en vokabulär."
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

    /* ─── 10. FÖRFATTAR-BIO ──────────────────────────────── */
    {
      id: "forfattar-bio",
      label: "Författar-bio",
      variants: [
        {
          key: "default",
          label: "Bio + andra artiklar av samma författare",
          render: () => (
            <Annotation
              label="Författar-bio, bygger förtroende"
              audience="user"
              rationale="Längre bio i fot är editorial-konvention: läsaren har just investerat 6 minuter och vill veta vem som skrev. Bio + 2-3 andra artiklar av samma författare ökar trolighet att de klickar vidare på samma röst."
            >
              <section className="py-8 max-w-reading border-t border-border-subtle">
                <div className="flex flex-col sm:flex-row gap-5 items-start">
                  <span className="shrink-0 w-16 h-16 rounded-full bg-brand-primary text-white grid place-items-center font-medium text-xl">
                    {POST.forfattare?.initialer}
                  </span>
                  <div className="flex-1">
                    <Copy
                      label="Bio, rubrik"
                      category="rubrik"
                      text={`Om ${POST.forfattare?.namn}`}
                      rationale="'Om [namn]' är genrekonvention för bio i editorial-format. Personlig, namn istället för titel, bygger förtroende. 'Författaren' eller 'Skribent' skulle vara distanserande och formellt."
                    >
                      <p className="font-medium mb-0.5">Om {POST.forfattare?.namn}</p>
                    </Copy>
                    <p className="text-sm text-ink-muted mb-3">{POST.forfattare?.roll} på Öresundskraft</p>
                    <p className="text-sm text-ink-secondary leading-relaxed mb-4">
                      Erik har arbetat med energirådgivning till privatkunder i tio år och är
                      certifierad solcellsinstallatör. Han bor i Höganäs med familj och har
                      själv installerat solceller och batteri 2023.
                    </p>
                    <p className="text-xs text-ink-muted">
                      Senaste artiklar:{" "}
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

    /* ─── 11. PRENUMERERA ──────────────────────────────── */
    {
      id: "subscribe",
      label: "Prenumerera, softer-CTA",
      variants: [
        {
          key: "default",
          label: "Tycker du om det här?",
          render: () => (
            <section className="py-8 max-w-reading">
              <div className="rounded-lg bg-tint-info p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Icon name="mail" size={28} className="text-brand-accent shrink-0" />
                <div className="flex-1">
                  <Copy
                    label="Subscribe, outcome-rubrik"
                    category="rubrik"
                    text="Få fler artiklar i mejlen"
                    rationale="Konsekvent med Artikel.tsx, samma utfallsorienterade rubrik på båda sidtyperna. Subscribe-blocket är funktionellt, inte editorial, därför förmår användaren det utfall de får (artiklar i mejlen) snarare än känslo-opener."
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
                  rationale="Enstavig action-verb. Rubriken bär outcome; knappen bär bara handlingen. Konsekvent med Artikel.tsx."
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

    /* ─── 12. RELATERADE ARTIKLAR ─────────────────────── */
    {
      id: "related",
      label: "Relaterade artiklar",
      variants: [
        {
          key: "default",
          label: "Tre kort med samma kategori-färg",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <Copy
                label="Related, rubrik"
                category="rubrik"
                text="Fortsätt läsa"
                rationale="Konsekvent med Artikel.tsx. Action-fras inviterar till nästa läsning istället för 'Liknande' (passiv)."
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
          ),
        },
      ],
    },
  ];

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6">
      <PageBrief
        kategori="Artikel (skiss · rik editorial-struktur)"
        syfte="Storytelling-format med editorial primitives: TOC med djuplänkar, sammanfattning, faktarutor, fancy numrerade listor med färgade siffror, tips & trick-rutor, statistik-highlights, författar-bio. Varje element bryter monotoni och ger artikeln rytm, användaren upplever det som skrivet av en människa, inte en SEO-generator."
        malgrupp="Kunder, allmänhet, journalister. Brett, den som har tid att läsa något längre och vill förstå djupare. Sammanfattning + TOC ger den otåliga ett snabbt värde, fördjupningsformat ger den intresserade rik läsning."
        primarHandling="Läsa hela artikeln · Hoppa via TOC till relevant sektion · Prenumerera · Klicka vidare till relaterad artikel."
        ton="Brand voice. Mer personlig än press, mer reflekterande än nyhet. 'Det vi ser i våra installationer ...' inte 'Studier visar att ...'. Rik typografi och format-mix gör texten upplevd som hantverk, inte produktion."
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
