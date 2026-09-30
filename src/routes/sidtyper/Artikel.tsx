import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { getPostBySlug, KATEGORI_LABEL } from "../moduler/nyhetsrum-data";

/**
 * SIDTYP: Artikel (standardformat)
 *
 * Den vanliga artikeln: topp med rubrik och byline, inledande stycke,
 * två eller tre avsnitt med ett lyft citat, källor och taggar,
 * prenumeration och relaterade artiklar.
 *
 * För längre artiklar med innehållsförteckning, faktarutor, numrerade
 * listor, tipsrutor och statistikrutor, se sidtypen "Artikel, formatgalleri".
 */

const POST = getPostBySlug("effekttariffer-forklarade")!;

function formaterDatum(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("sv-SE", { day: "numeric", month: "long", year: "numeric" });
}

export function Artikel() {
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
                  rationale="Rubriken lovar både en förklaring och ett konkret råd ('så undviker du onödiga toppar'). Läsaren ser direkt vad hen får ut av texten. Undvik rubriker som bara namnger ämnet, som 'Om effekttariffer'."
                >
                  <h1 className="text-display leading-tight mb-4 max-w-reading">{POST.rubrik}</h1>
                </Copy>

                <Copy
                  label="Ingress"
                  category="ton"
                  text={POST.ingress}
                  rationale="Ingressen rättar en vanlig missuppfattning och lovar en vinst. Två meningar räcker: läsaren ska förstå poängen även om hen slutar läsa här."
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

    /* ─── 2. INLEDANDE STYCKE ─────────────────────────── */
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
                  De flesta som hör ordet "effekttariff" tror att det är ännu en avgift
                  för att du använder el. Men det är inte mängden el som avgör vad du
                  betalar, utan hur mycket du använder på samma gång. Det betyder att du
                  själv kan påverka kostnaden, ofta utan att använda mindre el alls.
                </p>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 3. AVSNITT 1: mellanrubrik och brödtext ───────── */
    {
      id: "avsnitt-1",
      label: "Avsnitt 1, Så fungerar effekttariffen",
      variants: [
        {
          key: "default",
          label: "Mellanrubrik och stycken",
          render: () => (
            <Annotation
              label="Brödtext med mellanrubrik"
              audience="redaktör"
              rationale="Mellanrubriken låter läsaren skumma fram till det hen söker. Börja avsnittet med kärnan ('I korthet:') och förklara sedan varför. Håll en tanke per stycke, så blir texten lätt att läsa även på mobilen."
            >
              <section className="max-w-reading space-y-5 text-ink-secondary leading-relaxed">
                <Copy
                  label="Mellanrubrik, avsnitt 1"
                  category="rubrik"
                  text="Så fungerar effekttariffen"
                  rationale="Rubriken lovar en förklaring och går att förstå utan resten av texten. 'Så fungerar' är vardagligt och konkret. Undvik abstrakta mellanrubriker som 'Bakgrund'."
                >
                  <h2 className="text-h3 font-medium text-ink mt-8 mb-3">
                    Så fungerar effekttariffen
                  </h2>
                </Copy>
                <p>
                  I korthet: en del av din elnätsavgift räknas på den högsta effekt du
                  använder under månaden, inte på hur mycket el du använder totalt.
                  Använder du 5 kW under en timme räknas det. Använder du 5 kW en hel
                  vecka räknas ändå bara den högsta toppen.
                </p>
                <p>
                  Det betyder att två villor med samma årsförbrukning kan få väldigt olika
                  elnätsräkningar. Den som duschar, lagar mat, laddar bilen och kör
                  torktumlaren samtidigt klockan 18 betalar mer än den som sprider ut
                  samma användning över dygnet.
                </p>
                <p>
                  Förklaringen är att elnätets kostnad styrs av hur mycket effekt nätet
                  måste klara att leverera på samma gång. När alla använder mycket el
                  samtidigt måste nätet vara större. Det är den investeringen tariffen
                  speglar.
                </p>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 4. AVSNITT 2: mellanrubrik och lyft citat ─────── */
    {
      id: "avsnitt-2",
      label: "Avsnitt 2, Så sänker du din topp",
      variants: [
        {
          key: "default",
          label: "Mellanrubrik, stycken och ett lyft citat",
          render: () => (
            <Annotation
              label="Lyft citat, ett per artikel"
              audience="redaktör"
              rationale="Ett lyft citat ger en paus i texten och pekar ut artikelns viktigaste poäng. I standardformatet räcker ett. Välj en mening som står på egen hand och som läsaren kan ta med sig."
            >
              <section className="max-w-reading space-y-5 text-ink-secondary leading-relaxed">
                <Copy
                  label="Mellanrubrik, avsnitt 2"
                  category="rubrik"
                  text="Så sänker du din topp"
                  rationale="Du-tilltal och ett konkret resultat. Läsaren vet direkt att avsnittet handlar om vad hen själv kan göra. 'Vad du faktiskt kan göra' var längre och sa mindre."
                >
                  <h2 className="text-h3 font-medium text-ink mt-8 mb-3">
                    Så sänker du din topp
                  </h2>
                </Copy>
                <p>
                  Det finns två vägar. Den första är att sprida ut förbrukningen själv:
                  kör torktumlaren när du lagat klart maten, ladda bilen på natten i
                  stället för direkt när du kommer hem och schemalägg diskmaskinen.
                </p>

                <Copy
                  label="Lyft citat"
                  category="ton"
                  text="Det enkla greppet, att inte göra allt samtidigt, är ofta värt mer än ny utrustning."
                  rationale="Citatet sammanfattar artikelns råd i en mening som är lätt att minnas. Det är konkret ('inte göra allt samtidigt') och jämför med något läsaren känner till. Undvik citat som bara upprepar rubriken."
                >
                  <blockquote className="my-8 border-l-4 border-brand-accent pl-6 py-2">
                    <p className="text-h4 font-medium leading-snug text-ink">
                      "Det enkla greppet, att inte göra allt samtidigt, är ofta värt
                      mer än ny utrustning."
                    </p>
                  </blockquote>
                </Copy>

                <p>
                  Den andra vägen är att låta tekniken sköta det. En smart elcentral,
                  laddbox och varmvattenberedare kan tillsammans hålla nere topparna utan
                  att du behöver tänka på det. Många elcentraler klarar det redan i dag:
                  det är en inställning, inte en uppgradering.
                </p>
                <p>
                  För en typisk villa i Helsingborg ligger besparingen på mellan 1 000 och
                  2 500 kronor per år. Det är inte revolutionerande, men en investering
                  betalar sig ofta på under två år. Räcker det att ändra vanorna kostar
                  det dig ingenting.
                </p>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 5. AVSNITT 3: avslutning med nästa steg ───────── */
    {
      id: "avsnitt-3",
      label: "Avsnitt 3, Avslutning",
      variants: [
        {
          key: "default",
          label: "Mellanrubrik, avslutande stycken och länk vidare",
          render: () => (
            <Annotation
              label="Avslutning med nästa steg"
              audience="redaktör"
              rationale="Avslutningen gör artikeln till handling: ett första steg läsaren kan ta direkt och en länk vidare. Avsluta med något konkret att göra, inte med en sammanfattning av det läsaren just läst."
            >
              <section className="max-w-reading space-y-5 text-ink-secondary leading-relaxed">
                <Copy
                  label="Mellanrubrik, avsnitt 3"
                  category="rubrik"
                  text="Så kommer du igång"
                  rationale="Du-tilltal och ett löfte om ett första steg. Den tidigare rubriken 'Var börjar man?' var opersonlig, eftersom 'man' skapar avstånd till läsaren."
                >
                  <h2 className="text-h3 font-medium text-ink mt-8 mb-3">
                    Så kommer du igång
                  </h2>
                </Copy>
                <p>
                  Logga in på Mina sidor och titta på din förbrukning timme för timme
                  under förra månaden. Ofta syns toppen direkt, vanligen runt klockan 18
                  på vardagar. Det är den toppen som avgör din effekttariff för månaden.
                </p>
                <p>
                  Ligger toppen på samma timme varje dag är det den timmen du ska börja
                  med. En enda förändring, till exempel att vänta med att ladda bilen
                  när du kommer hem, kan ofta sänka toppen med 20 procent.
                </p>
                <p className="pt-2">
                  <Copy
                    label="Länk vidare"
                    category="cta"
                    text="Läs mer om Ladda Smart-appen"
                    rationale="Länktexten säger exakt vart läsaren kommer. Undvik 'Läs mer' eller 'Klicka här' utan fortsättning: de säger ingenting när de läses utan sammanhang, till exempel av en skärmläsare."
                  >
                    <Link
                      to="/sidtyper/produktsida-direktkop"
                      className="inline-flex items-center gap-1.5 text-brand-accent font-medium hover:underline"
                    >
                      Läs mer om Ladda Smart-appen
                      <Icon name="arrow_forward" size={16} />
                    </Link>
                  </Copy>
                </p>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 6. KÄLLOR OCH TAGGAR ──────────────────────────── */
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
                      <li>Energimarknadsinspektionen: rapport om effekttariffer 2025</li>
                      <li>Öresundskrafts förbrukningsstatistik 2024 till 2026</li>
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
                      {["Effekttariff", "Elnät", "Förbrukning", "Smart styrning"].map((t) => (
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

    /* ─── 7. FÖRFATTARBIO, kort version ────────────────── */
    {
      id: "forfattar-bio",
      label: "Författarbio, kort",
      variants: [
        {
          key: "default",
          label: "Kort bio med foto",
          render: () => (
            <Annotation
              label="Kort författarbio"
              audience="user"
              rationale="En mening om vem som skrivit och varför hen kan ämnet ger förtroende utan att ta plats. Formatgalleriet visar en längre bio med länkar till fler artiklar av samma person."
            >
              <section className="py-8 max-w-reading border-t border-border-subtle">
                <div className="flex items-start gap-4">
                  <span className="shrink-0 w-12 h-12 rounded-full bg-brand-primary text-white grid place-items-center font-medium">
                    {POST.forfattare?.initialer}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{POST.forfattare?.namn}</span> är{" "}
                      {POST.forfattare?.roll?.toLowerCase()} på Öresundskraft och har hjälpt
                      privatkunder med energifrågor i tio år.
                    </p>
                  </div>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 8. PRENUMERERA ──────────────────────────────── */
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

    /* ─── 9. RELATERADE ARTIKLAR ─────────────────────── */
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
                    { rubrik: "Hur kan solceller ge större nytta i hushållen framöver?", kategori: "Utbildning", lastid: "6 min", to: "/sidtyper/artikel-galleri" },
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
        kategori="Artikel, standardformat"
        syfte="Den vanliga artikeln: rubrik och byline, ett inledande stycke, två eller tre avsnitt med ett lyft citat, källor, kort författarbio, prenumeration och relaterade artiklar. Ingen innehållsförteckning eller faktarutor, eftersom texten läses på fyra, fem minuter."
        malgrupp="Kunder och allmänhet som vill förstå ett ämne på några minuter. Sammanfattning saknas medvetet: texten är kort nog att läsas i sin helhet."
        primarHandling="Läsa hela artikeln · Gå vidare till en relaterad artikel · Prenumerera på fler artiklar"
        ton="Öresundskrafts röst: kunnig, personlig och rak. Tilltala läsaren med du och skriv 'vi ser' i stället för 'studier visar'. Enkel typografi där texten får bära, med ett enda lyft citat."
      />

      <div className="flex items-center justify-between pt-6">
        <Link to="/sidtyper/startsida-nyhetsrum" className="text-sm text-ink-muted hover:text-brand-accent">
          ← Nyhetsrum
        </Link>
        <Link to="/sidtyper/artikel-galleri" className="text-sm text-ink-muted hover:text-brand-accent">
          Se formatgalleriet →
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

      <BlockList pageId="artikel" blocks={blocks} />
    </div>
  );
}
