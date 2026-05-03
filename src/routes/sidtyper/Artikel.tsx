import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { getPostBySlug, KATEGORI_LABEL } from "../moduler/nyhetsrum-data";

/**
 * SIDTYP — Artikel (vanlig · standardformat)
 *
 * Det vardagliga artikelfallet: hero, lead-stycke, 2–3 brödtext-sektioner
 * med en enstaka pull-quote, källor + taggar, prenumerera, relaterade.
 *
 * För längre fördjupande artiklar med TOC, faktarutor, fancy numrerade
 * listor, tips & trick och statistik-highlights — se sidtypen
 * "Artikel - format-galleri".
 */

const POST = getPostBySlug("effekttariffer-forklarade")!;

function formaterDatum(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("sv-SE", { day: "numeric", month: "long", year: "numeric" });
}

export function Artikel() {
  const blocks: BlockDef[] = [
    /* ─── 1. HERO — kategori + h1 + byline + lead-bild ──────── */
    {
      id: "hero",
      label: "Artikel-hero",
      variants: [
        {
          key: "default",
          label: "Stor hero-bild + byline med foto + lästid",
          render: () => (
            <Annotation
              label="Artikel-hero — storytelling-format"
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
                  label="Artikel H1 — narrativ rubrik"
                  category="rubrik"
                  text={POST.rubrik}
                  rationale="Förklarande rubrik med löfte om praktiskt värde — 'så undviker du onödiga toppar'. Signalerar att texten ger handling, inte bara fakta."
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

    /* ─── 2. INTRO — lead-stycke ─────────────────────────── */
    {
      id: "intro",
      label: "Introduktion — lead-stycke",
      variants: [
        {
          key: "default",
          label: "Större typ — markerar artikelns ingång",
          render: () => (
            <Annotation
              label="Lead — något större typ än brödtext"
              audience="redaktör"
              rationale="text-lg på första stycket signalerar 'det här är artikelns ingång' utan dramatisk drop-cap. Räcker som typografisk markör i 95 % av artiklarna."
            >
              <section className="max-w-reading">
                <p className="text-lg leading-relaxed text-ink-secondary">
                  De flesta som hör ordet "effekttariff" tänker på en avgift som straffar
                  dem för att använda el. Men det är fel sätt att se det. Effekttariffen
                  straffar inte hur mycket el du använder — den straffar när du använder
                  den mest. Och det betyder att en liten ändring i vanor kan ge större
                  besparing än man tror.
                </p>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 3. AVSNITT 1 — h2 + brödtext ───────────────────── */
    {
      id: "avsnitt-1",
      label: "Avsnitt 1 — Vad effekttariffen är",
      variants: [
        {
          key: "default",
          label: "H2 + paragrafer",
          render: () => (
            <section className="max-w-reading space-y-5 text-ink-secondary leading-relaxed">
              <h2 className="text-h3 font-medium text-ink mt-8 mb-3">
                Vad effekttariffen egentligen är
              </h2>
              <p>
                I korthet: en del av din elnätsavgift baseras på din högsta uppmätta
                effekt under en månad — inte på den totala mängden el du använt. Använder
                du 5 kW under en timme räknas det. Använder du 5 kW i en hel vecka räknas
                fortfarande bara den högsta toppen.
              </p>
              <p>
                Det betyder att två villor med samma årsförbrukning kan ha väldigt olika
                elnätsräkningar. Den som duschar, lagar mat, laddar bilen och kör torktumlaren
                samtidigt klockan 18 betalar mer än den som sprider ut samma användning
                över dygnet.
              </p>
              <p>
                Logiken bakom är att kostnaden för elnätet styrs av kapaciteten — alltså
                hur mycket effekt nätet behöver kunna leverera samtidigt. När alla drar
                el samtidigt behöver nätet vara större. Det är den investeringen tariffen
                speglar.
              </p>
            </section>
          ),
        },
      ],
    },

    /* ─── 4. AVSNITT 2 — h2 + pull-quote ─────────────────── */
    {
      id: "avsnitt-2",
      label: "Avsnitt 2 — Vad du kan göra",
      variants: [
        {
          key: "default",
          label: "H2 + paragrafer + en pull-quote",
          render: () => (
            <Annotation
              label="En pull-quote per artikel — markerar artikelns kärnpunkt"
              audience="redaktör"
              rationale="Det vanliga artikelfallet behöver inte tre olika format-rutor. En enskild pull-quote räcker som typografisk paus och pekar ut det viktigaste budskapet."
            >
              <section className="max-w-reading space-y-5 text-ink-secondary leading-relaxed">
                <h2 className="text-h3 font-medium text-ink mt-8 mb-3">
                  Vad du faktiskt kan göra
                </h2>
                <p>
                  Det finns två vägar. Den ena är att medvetet sprida ut förbrukningen —
                  kör torktumlaren när elen är klar med spisen, ladda bilen på natten i
                  stället för direkt när du kommer hem, schemalägg diskmaskinen.
                </p>

                <Copy
                  label="Pull quote — artikelns sammanfattning"
                  category="ton"
                  text="Det enkla greppet — att inte göra allt samtidigt — är ofta värt mer än ny utrustning."
                  rationale="En enda pull-quote per artikel ankar läsaren vid det viktigaste budskapet. Större typ, vänsterramslinje i accent-färg."
                >
                  <blockquote className="my-8 border-l-4 border-brand-accent pl-6 py-2">
                    <p className="text-h4 font-medium leading-snug text-ink">
                      "Det enkla greppet — att inte göra allt samtidigt — är ofta värt
                      mer än ny utrustning."
                    </p>
                  </blockquote>
                </Copy>

                <p>
                  Den andra vägen är att låta tekniken göra det åt dig. Smart elcentral,
                  smart laddbox och smart varmvattenberedare kan tillsammans hålla nere
                  topparna utan att du behöver tänka på det. Många elcentraler på marknaden
                  klarar redan av det här i dag — det är en inställning, inte en
                  uppgradering.
                </p>
                <p>
                  För en typisk villa i Helsingborg ligger besparingen på 1 000–2 500
                  kronor per år. Inte revolutionerande, men en återbetalning på ofta
                  under två år om du bara behöver ändra vanor.
                </p>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 5. AVSNITT 3 — slutord ─────────────────────────── */
    {
      id: "avsnitt-3",
      label: "Avsnitt 3 — Avslutning",
      variants: [
        {
          key: "default",
          label: "H2 + avslutande paragrafer + handlingslänk",
          render: () => (
            <section className="max-w-reading space-y-5 text-ink-secondary leading-relaxed">
              <h2 className="text-h3 font-medium text-ink mt-8 mb-3">
                Var börjar man?
              </h2>
              <p>
                Logga in på Mina sidor och titta på din timmesvis förbrukning för
                föregående månad. Ofta syns toppen direkt — det är vid 18:00 på
                vardagar. Det är den toppen som styr din effekttariff för månaden.
              </p>
              <p>
                Om du ser att din topp ligger på samma timme varje dag är det den
                timmen du ska titta på först. En enda förändring — till exempel att
                inte ladda bilen direkt när du kommer hem — kan ofta sänka toppen
                med 20 procent.
              </p>
              <p className="pt-2">
                <Link
                  to="/sidtyper/produktsida-direktkop"
                  className="inline-flex items-center gap-1.5 text-brand-accent font-medium hover:underline"
                >
                  Läs mer om Ladda Smart-appen
                  <Icon name="arrow_forward" size={16} />
                </Link>
              </p>
            </section>
          ),
        },
      ],
    },

    /* ─── 6. KÄLLOR + TAGGAR ─────────────────────────────── */
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
                  <p className="text-[11px] uppercase tracking-wider text-ink-muted font-bold mb-3">
                    Källor
                  </p>
                  <ul className="text-sm space-y-1.5 text-ink-secondary">
                    <li>Energimarknadsinspektionen: rapport om effekttariffer 2025</li>
                    <li>Öresundskrafts förbrukningsstatistik 2024–2026</li>
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-ink-muted font-bold mb-3">
                    Taggar
                  </p>
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
          ),
        },
      ],
    },

    /* ─── 7. FÖRFATTAR-BIO — kort version ────────────────── */
    {
      id: "forfattar-bio",
      label: "Författar-bio — kort",
      variants: [
        {
          key: "default",
          label: "Liten bio + en länk vidare",
          render: () => (
            <Annotation
              label="Författar-bio — kort i den vanliga artikeln"
              audience="user"
              rationale="Galleri-versionen har lång bio + flera länkar till andra artiklar. Den vanliga artikeln klarar sig med 1–2 meningar — räcker för förtroende utan att ta plats."
            >
              <section className="py-8 max-w-reading border-t border-border-subtle">
                <div className="flex items-start gap-4">
                  <span className="shrink-0 w-12 h-12 rounded-full bg-brand-primary text-white grid place-items-center font-medium">
                    {POST.forfattare?.initialer}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{POST.forfattare?.namn}</span> är{" "}
                      {POST.forfattare?.roll?.toLowerCase()} på Öresundskraft och har arbetat
                      med energirådgivning till privatkunder i tio år.
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
      label: "Prenumerera — softer-CTA",
      variants: [
        {
          key: "default",
          label: "Tycker du om det här?",
          render: () => (
            <section className="py-8 max-w-reading">
              <div className="rounded-lg bg-tint-info p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Icon name="mail" size={28} className="text-brand-accent shrink-0" />
                <div className="flex-1">
                  <p className="font-medium">Få fler artiklar i mejlen</p>
                  <p className="text-sm text-ink-secondary">
                    Vi skickar inte oftare än en gång i månaden — avregistrera när du vill.
                  </p>
                </div>
                <a
                  href="/sidtyper/startsida-nyhetsrum#prenumerera"
                  className="inline-flex items-center gap-1.5 border border-border-strong bg-canvas font-medium px-4 py-2.5 rounded text-sm hover:bg-tint-info hover:border-brand-accent shrink-0"
                >
                  Prenumerera
                  <Icon name="arrow_forward" size={14} />
                </a>
              </div>
            </section>
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
          label: "Tre kort med samma kategori-färg",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <h2 className="text-h3 font-medium mb-6">Fortsätt läsa</h2>
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
          ),
        },
      ],
    },
  ];

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6">
      <PageBrief
        kategori="Artikel (skiss · standardformat)"
        syfte="Det vardagliga artikelfallet — hero, lead-stycke, två-tre brödtext-sektioner med en pull-quote, källor, kort författar-bio, prenumerera, relaterade. Inga TOC, faktarutor eller fancy listor: räcker för 4–5 minuters läsning utan att ta över sidan."
        malgrupp="Kunder och allmänhet som vill förstå ett ämne på fem minuter. Sammanfattning saknas medvetet — här ska brödtexten räcka."
        primarHandling="Läsa hela artikeln · Klicka vidare till relaterad artikel · Prenumerera på fler artiklar."
        ton="Brand voice. Enklare än galleri-versionen — färre format-grepp, mer fokus på texten. 'Vi ser ...' inte 'Studier visar att ...'. Ren typografi: lead-stycke, brödtext, en pull-quote, klart."
      />

      <div className="flex items-center justify-between pt-6">
        <Link to="/sidtyper/startsida-nyhetsrum" className="text-sm text-ink-muted hover:text-brand-accent">
          ← Nyhetsrum
        </Link>
        <Link to="/sidtyper/artikel-galleri" className="text-sm text-ink-muted hover:text-brand-accent">
          Se format-galleri →
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
