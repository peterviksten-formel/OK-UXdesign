import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { Icon } from "../../components/Icon";
import {
  NYHETSRUM,
  KATEGORI_LABEL,
  TYP_LABEL,
  TYP_COLOR,
  type NyhetsrumPost,
  type NyhetsrumTyp,
  type NyhetsrumKategori,
} from "../moduler/nyhetsrum-data";

/**
 * SIDTYP — Startsida Nyhetsrum (YouTube-inspirerad)
 *
 * Layout-koncept lånat från YouTube channel pages:
 *   1. Featured/pinned post överst — det redaktören främst vill pusha.
 *   2. Kategori-rader (horisontell scroll) — en rad per typ:
 *      "Pressmeddelanden", "Nyheter", "Artiklar". Varje rad har "Visa alla".
 *   3. Tematiska rader — t.ex. "På djupet: CCS" för aktuella fokusområden.
 *   4. Bläddra alla — filter + grid längre ner för power-browsing.
 *   5. Press-kontakter + prenumerera.
 *
 * Skiss-läge — strukturen står, detaljer förfinas i nästa iteration.
 */

const ALLA_KATEGORIER: NyhetsrumKategori[] = [
  "energi",
  "klimat",
  "ccs",
  "infrastruktur",
  "kundcase",
  "utbildning",
  "hallbarhet",
];

function formaterDatum(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("sv-SE", { day: "numeric", month: "short", year: "numeric" });
}

export function StartsidaNyhetsrum() {
  const [typFilter, setTypFilter] = useState<NyhetsrumTyp | "alla">("alla");
  const [katFilter, setKatFilter] = useState<NyhetsrumKategori | "alla">("alla");
  const [sok, setSok] = useState("");

  const filtrerad = useMemo(() => {
    return NYHETSRUM.filter((p) => {
      if (typFilter !== "alla" && p.typ !== typFilter) return false;
      if (katFilter !== "alla" && p.kategori !== katFilter) return false;
      if (sok.trim()) {
        const q = sok.toLowerCase();
        if (
          !p.rubrik.toLowerCase().includes(q) &&
          !p.ingress.toLowerCase().includes(q)
        ) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => b.datum.localeCompare(a.datum));
  }, [typFilter, katFilter, sok]);

  const utvald = NYHETSRUM.find((p) => p.utvald);

  // Sortera efter datum DESC inom varje typ
  const sortByDatumDesc = (a: NyhetsrumPost, b: NyhetsrumPost) =>
    b.datum.localeCompare(a.datum);

  const press = NYHETSRUM.filter((p) => p.typ === "press").sort(sortByDatumDesc);
  const nyheter = NYHETSRUM.filter((p) => p.typ === "nyhet").sort(sortByDatumDesc);
  const artiklar = NYHETSRUM.filter((p) => p.typ === "artikel").sort(sortByDatumDesc);
  const ccs = NYHETSRUM.filter((p) => p.kategori === "ccs").sort(sortByDatumDesc);

  const blocks: BlockDef[] = [
    /* ─── 1. HEADER + FEATURED — det vi främst vill pusha ──────── */
    {
      id: "featured",
      label: "Header + featured-post",
      variants: [
        {
          key: "default",
          label: "Eyebrow + h1 + utvald featured-card",
          render: () => (
            <Annotation
              label="Featured — det vi främst vill pusha"
              audience="redaktör"
              rationale="YouTube-kanaler har en pinned video överst — sidan tjänar redaktören. Featured-kortet är det Öresundskraft aktivt vill ha läst just nu (typiskt nyaste pressrelease eller ett aktuellt strategiskt budskap). Stort, dominant — separerar 'redaktionellt val' från 'kronologisk lista' nedan."
            >
              <section className="py-8 sm:py-10">
                <p className="text-eyebrow uppercase text-ink-muted mb-3">Nyhetsrum</p>
                <Copy
                  label="H1 — nyhetsrums-rubrik"
                  category="rubrik"
                  text="Senaste från Öresundskraft"
                  rationale="Direkt och innehållsorienterad. Inte 'press och nyheter' (struktur) utan 'senaste' (vad du får)."
                >
                  <h1 className="text-display leading-tight mb-3">Senaste från Öresundskraft</h1>
                </Copy>
                <p className="text-lede text-ink-secondary max-w-reading mb-8 leading-relaxed">
                  Pressmeddelanden, nyheter och artiklar — sorterat per typ. Eller{" "}
                  <a href="#prenumerera" className="text-brand-accent underline underline-offset-2 hover:no-underline">
                    prenumerera
                  </a>{" "}
                  och få det i mejlen.
                </p>

                {utvald && <FeaturedCard post={utvald} />}
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 2. RAD — Pressmeddelanden ──────────────────────────── */
    {
      id: "row-press",
      label: "Rad — Pressmeddelanden",
      variants: [
        {
          key: "default",
          label: "Horisontell scroll-rad med scroll-snap",
          render: () => (
            <Annotation
              label="Kategori-rad — Pressmeddelanden"
              audience="design"
              rationale="YouTube-mönstret: en rad per typ, horisontell scroll för att visa fler poster utan att äta vertikal yta. Scroll-snap gör att korten 'klickar' på plats. På mobil ger det en kort ovanpå mediainnehållet; på desktop blir det 3-4 synliga åt gången."
            >
              <PostRow
                titel="Pressmeddelanden"
                undertitel="Officiella besked från Öresundskraft."
                posts={press}
                visaAllaHref="#filter-alla"
                copyRationale="Front-loadat substantiv (Pressmeddelanden), kort innehållsbeskrivning som underrubrik. Förra versionen sa 'För journalister och allmänheten — citerbar källa' (jargong + målgruppsdefinition i samma fras)."
              />
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 3. RAD — Nyheter ──────────────────────────────────── */
    {
      id: "row-nyheter",
      label: "Rad — Nyheter",
      variants: [
        {
          key: "default",
          label: "Horisontell scroll-rad",
          render: () => (
            <Annotation
              label="Kategori-rad — Nyheter"
              audience="design"
              rationale="Nyheter får egen rad eftersom de har kortare livslängd än artiklar och annan ton än press. Användaren kan skanna rubrik+datum + ingress utan att lämna översikten."
            >
              <PostRow
                titel="Nyheter"
                undertitel="Förändringar som påverkar dig som kund."
                posts={nyheter}
                visaAllaHref="#filter-alla"
                copyRationale="Underrubriken är outcome-fokuserad — 'påverkar dig som kund' säger varför läsaren bör bry sig. Inte 'Senaste nyheterna från oss' (om sändaren) utan om mottagaren."
              />
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 4. RAD — Artiklar ─────────────────────────────────── */
    {
      id: "row-artiklar",
      label: "Rad — Artiklar",
      variants: [
        {
          key: "default",
          label: "Horisontell scroll-rad",
          render: () => (
            <Annotation
              label="Kategori-rad — Artiklar"
              audience="design"
              rationale="Artiklar är längre format, ofta utan tidskritisk komponent. Egen rad signalerar 'browsa när du har tid' — man väljer att läsa, inte tvingas."
            >
              <PostRow
                titel="Artiklar"
                undertitel="Fördjupning, kundcase och förklaringar."
                posts={artiklar}
                visaAllaHref="#filter-alla"
                copyRationale="Tre konkreta substantiv (fördjupning/kundcase/förklaringar) räcker — förra versionen var 'Berättelser, kundcase och utbildning — för dig som vill förstå djupare' (11 ord, scan-fail). Conciseness-princip."
              />
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 5. RAD — Tematisk: CCS ─────────────────────────────── */
    {
      id: "row-ccs",
      label: "Tematisk rad — På djupet: CCS",
      variants: [
        {
          key: "default",
          label: "En rad per fokusområde",
          render: () => {
            if (ccs.length === 0) return null;
            return (
              <Annotation
                label="Tematisk rad — fokusområde"
                audience="redaktör"
                rationale="YouTube har 'Playlists' eller 'Topics' — Öresundskraft kan kuratera tematiska rader för aktuella fokusområden. CCS, hållbarhet, framtidens nät. Redaktören styr vilka som visas."
              >
                <PostRow
                  titel="På djupet: CCS"
                  undertitel="Koldioxidinfångning på Filbornaverket — pressmeddelanden, nyheter och bakgrund."
                  posts={ccs}
                  visaAllaHref="#filter-alla"
                  copyRationale="'På djupet:'-prefix är genrekonvention för redaktionellt kuraterad samling (jämför Spotifys 'Editorial picks' eller Apples 'Today In'). Underrubriken förtydligar kontexten — vad CCS är i konkret form (Filbornaverket)."
                />
              </Annotation>
            );
          },
        },
      ],
    },

    /* ─── 6. FILTER + ALLA ─────────────────────────────────── */
    {
      id: "filter-alla",
      label: "Bläddra alla — filter + grid",
      variants: [
        {
          key: "default",
          label: "Filter-bar + grid (för power-browsing)",
          render: () => (
            <Annotation
              label="Bläddra alla — för dem som vill djupgräva"
              audience="user"
              rationale="Raderna ovan är redaktionellt kuraterade. Filtret här är för dem som har ett specifikt sökmål — datum, ämne, fritext. Demoterat under raderna eftersom det inte är primärt mål för de flesta besökare."
            >
              <section id="filter-alla" className="py-10 border-t border-border-subtle">
                <Copy
                  label="Bläddra alla — rubrik"
                  category="rubrik"
                  text="Bläddra alla"
                  rationale="Verb + objekt-rubrik. 'Bläddra' speglar handlingen användaren ska göra (klicka filter, scrolla grid). 'Arkiv' eller 'Hela materialet' skulle vara abstraktare och systemnära."
                >
                  <h2 className="text-h3 font-medium mb-2">Bläddra alla</h2>
                </Copy>
                <p className="text-ink-secondary mb-6 max-w-reading">
                  Filter, sök eller bläddra i hela arkivet av pressmeddelanden, nyheter och artiklar.
                </p>

                {/* Filter-rad */}
                <div className="flex flex-wrap items-end gap-x-6 gap-y-3 mb-6">
                  <div>
                    <p className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-1.5">Typ</p>
                    <div role="radiogroup" aria-label="Typ av innehåll" className="inline-flex p-1 rounded-md bg-surface border border-border-subtle">
                      {(["alla", "press", "nyhet", "artikel"] as const).map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setTypFilter(t)}
                          aria-checked={typFilter === t}
                          role="radio"
                          className={`px-4 py-1.5 rounded text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${
                            typFilter === t ? "bg-brand-primary text-ink-onbrand" : "text-ink-secondary hover:text-ink"
                          }`}
                        >
                          {t === "alla" ? "Alla" : TYP_LABEL[t]}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="kat-filter" className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-1.5 block">
                      Kategori
                    </label>
                    <select
                      id="kat-filter"
                      value={katFilter}
                      onChange={(e) => setKatFilter(e.target.value as typeof katFilter)}
                      className="h-9 rounded-md border border-border-subtle bg-surface px-3 text-sm focus:outline-none focus:border-brand-accent"
                    >
                      <option value="alla">Alla kategorier</option>
                      {ALLA_KATEGORIER.map((k) => (
                        <option key={k} value={k}>{KATEGORI_LABEL[k]}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1 min-w-[200px]">
                    <label htmlFor="sok-filter" className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-1.5 block">
                      Sök
                    </label>
                    <div className="relative">
                      <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
                      <Copy
                        label="Sök — placeholder"
                        category="metadata"
                        text="T.ex. fjärrvärme, CCS, elnätsavgift"
                        rationale="Placeholder visar EXEMPEL på söktermer (UX-writing-pattern). Förra versionen var 'Sök i rubrik och ingress' — instruktion, inte exempel. Tre konkreta exempel sänker användarens 'vad kan jag söka på?'-friktion."
                      >
                        <input
                          id="sok-filter"
                          type="search"
                          value={sok}
                          onChange={(e) => setSok(e.target.value)}
                          placeholder="T.ex. fjärrvärme, CCS, elnätsavgift"
                          className="w-full h-9 rounded-md border border-border-subtle bg-surface pl-9 pr-3 text-sm focus:outline-none focus:border-brand-accent"
                        />
                      </Copy>
                    </div>
                  </div>

                  {(typFilter !== "alla" || katFilter !== "alla" || sok) && (
                    <button
                      type="button"
                      onClick={() => { setTypFilter("alla"); setKatFilter("alla"); setSok(""); }}
                      className="h-9 px-3 text-sm text-brand-accent hover:underline self-end"
                    >
                      Rensa filter
                    </button>
                  )}
                </div>

                <p className="text-sm text-ink-muted mb-4" aria-live="polite">
                  {filtrerad.length} {filtrerad.length === 1 ? "post" : "poster"}
                  {(typFilter !== "alla" || katFilter !== "alla" || sok) && " (filtrerade)"}
                </p>

                {filtrerad.length === 0 ? (
                  <Copy
                    label="Tomtillstånd — inga träffar"
                    category="reassurance"
                    text="Inga träffar med de filtren. Prova andra filter eller rensa filtret."
                    rationale="Empty-state-pattern: status + förklaring + CTA. 'Inga träffar' (status) + implicit förklaring (filtren är för restriktiva) + två konkreta vägar framåt (prova andra / rensa). Aldrig dead-end. Förra versionen sa 'Inga poster matchade' (system-y)."
                  >
                    <p className="text-ink-muted py-8 text-center">
                      Inga träffar med de filtren. Prova andra filter eller{" "}
                      <button onClick={() => { setTypFilter("alla"); setKatFilter("alla"); setSok(""); }} className="text-brand-accent underline">
                        rensa filtret
                      </button>.
                    </p>
                  </Copy>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtrerad.map((p) => <PostKort key={p.id} post={p} />)}
                  </div>
                )}
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 7. PRESS-KONTAKTER ───────────────────────────────── */
    {
      id: "press-kontakter",
      label: "För journalister — kontaktblock",
      variants: [
        {
          key: "default",
          label: "Presskontakter prominent",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <Copy
                label="Press-kontakt — rubrik"
                category="rubrik"
                text="För journalister"
                rationale="Målgruppsadresserande rubrik — 'För journalister' säger direkt vem detta är för. Alternativ som 'Presskontakt' eller 'Kontakta press' fungerar också men 'För X' signalerar tydligare 'detta block är inte för dig som vanlig läsare'."
              >
                <h2 className="text-h3 font-medium mb-2">För journalister</h2>
              </Copy>
              <p className="text-ink-secondary mb-6 max-w-reading">
                Kontakta vår presstjänst för intervjuer, kommentarer eller högupplöst bildmaterial.
                Vi svarar inom 1 arbetsdag.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 max-w-reading">
                <div className="p-5 rounded-md border-2 border-border-subtle bg-surface flex items-start gap-4">
                  <span className="shrink-0 w-12 h-12 rounded-full bg-brand-primary text-white grid place-items-center font-medium">AL</span>
                  <div>
                    <p className="font-medium">Anna Lindqvist</p>
                    <p className="text-sm text-ink-secondary mb-2">Presschef</p>
                    <p className="text-sm">
                      <a href="tel:0424903250" className="text-brand-accent hover:underline">042-490 32 50</a>
                    </p>
                    <p className="text-sm">
                      <a href="mailto:press@oresundskraft.se" className="text-brand-accent hover:underline">press@oresundskraft.se</a>
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-md border border-border-subtle bg-surface text-sm text-ink-secondary">
                  <p className="font-medium text-ink mb-2">Akut press-ärende?</p>
                  <p className="mb-3">Ring presstjänsten dygnet runt på <a href="tel:0424903250" className="text-brand-accent">042-490 32 50</a>.</p>
                  <p className="font-medium text-ink mt-4 mb-2">Bildbank</p>
                  <p>
                    <a href="#" className="text-brand-accent hover:underline inline-flex items-center gap-1">
                      Ladda ner högupplösta bilder
                      <Icon name="download" size={14} />
                    </a>
                  </p>
                </div>
              </div>
            </section>
          ),
        },
      ],
    },

    /* ─── 8. PRENUMERERA ──────────────────────────────────── */
    {
      id: "prenumerera",
      label: "Prenumerera — mejl-uppdateringar",
      variants: [
        {
          key: "banner",
          label: "Banner med ämnesval",
          render: () => (
            <section id="prenumerera" className="py-10 border-t border-border-subtle">
              <div className="rounded-lg bg-tint-info p-6 sm:p-8 grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <Copy
                    label="Prenumerera — rubrik"
                    category="rubrik"
                    text="Prenumerera på nyheter"
                    rationale="Verb + objekt. Förra versionen var 'Få Öresundskraft i mejlen' — fluff (vad är 'Öresundskraft i mejlen'?). 'Prenumerera på nyheter' säger handlingen och vad som prenumereras på."
                  >
                    <h2 className="text-h3 mb-2">Prenumerera på nyheter</h2>
                  </Copy>
                  <p className="text-ink-secondary mb-4">
                    Välj vad du vill följa — pressmeddelanden, nyheter eller specifika ämnen som CCS och hållbarhet. Avregistrera när som helst.
                  </p>
                </div>
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 max-w-md w-full">
                  <input
                    type="email"
                    placeholder="din.epost@example.se"
                    className="h-11 px-3 rounded-md border border-border-strong bg-canvas focus:outline-none focus:border-brand-accent"
                  />
                  <Copy
                    label="Prenumerera — CTA"
                    category="cta"
                    text="Välj ämnen och prenumerera"
                    rationale="Verb + objekt + outcome-signal. 'Välj ämnen' förkonsumtion-signalerar att nästa steg är ett val (inte 'klicka här och du är prenumerant nu'), 'prenumerera' bekräftar handlingen. Sätter rätt förväntan."
                  >
                    <button type="submit" className="h-11 inline-flex items-center justify-center gap-2 bg-brand-primary text-ink-onbrand font-medium rounded hover:opacity-90">
                      Välj ämnen och prenumerera
                      <Icon name="arrow_forward" size={16} />
                    </button>
                  </Copy>
                  <p className="text-xs text-ink-muted">
                    Du kan välja ämnen på nästa steg · Vi delar inte din e-post med tredje part
                  </p>
                </form>
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
        kategori="Startsida Nyhetsrum (YouTube-inspirerad)"
        syfte="Redaktionellt kuraterad ingång till Öresundskrafts publicistiska innehåll. YouTube-mönster: featured överst (det redaktören främst vill pusha), kategori-rader med horisontell scroll per typ, tematiska rader för fokusområden, filter+grid för power-browsing längre ner."
        malgrupp="Tre målgrupper i samma flöde: journalister (press), kunder/allmänhet (nyheter), och alla tre (artiklar). Raderna gör typvalet visuellt — du behöver inte aktivt filtrera."
        primarHandling="Skanna featured + tre typ-rader → klicka in på en post. För specifika sökmål: filter + sök längre ner."
        ton="Saklig och tillgänglig. Raderna är browsing-vänliga (som en strömmingstjänst) snarare än arkiv-tunga."
      />

      <div className="flex items-center justify-between pt-6">
        <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">
          ← Översikt
        </Link>
        <a href="#" className="inline-flex items-center gap-1.5 text-sm text-ink-secondary hover:text-brand-accent">
          <Icon name="person" size={16} />
          Logga in på Mina sidor
        </a>
      </div>

      <nav aria-label="Breadcrumb" className="text-xs text-ink-muted mt-4 mb-2">
        <ol className="flex gap-1">
          <li><a href="#" className="hover:text-brand-accent">Hem</a></li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="font-medium text-ink">Nyhetsrum</li>
        </ol>
      </nav>

      <BlockList pageId="startsida-nyhetsrum" blocks={blocks} />
    </div>
  );
}

/* ─── Helpers ────────────────────────────────────────────────── */

/**
 * Featured-kort — stort, dominant, som YouTube:s pinned video.
 * Lite mer visuell tyngd än vanliga kort i raderna.
 */
function FeaturedCard({ post }: { post: NyhetsrumPost }) {
  const detaljSlug = post.typ === "press" ? "pressmeddelande" : post.typ === "nyhet" ? "nyhet" : "artikel";
  return (
    <Link
      to={`/sidtyper/${detaljSlug}`}
      className="group block rounded-lg border-2 border-brand-accent overflow-hidden bg-surface hover:shadow-md transition-shadow"
    >
      <div className="grid md:grid-cols-[1.4fr_1fr]">
        <div className="bg-tint-info aspect-[16/10] md:aspect-auto flex items-center justify-center">
          <Icon name="image" size={64} className="text-ink-muted" />
        </div>
        <div className="p-6 sm:p-8 flex flex-col">
          <div className="flex items-center gap-2 mb-3 text-xs">
            <span className="px-2 py-1 rounded bg-brand-accent text-white font-bold uppercase tracking-wider">
              Utvald
            </span>
            <span className={`px-2 py-1 rounded uppercase tracking-wider font-medium ${TYP_COLOR[post.typ]}`}>
              {TYP_LABEL[post.typ]}
            </span>
            <span className="text-ink-muted">
              {KATEGORI_LABEL[post.kategori]} · {formaterDatum(post.datum)}
            </span>
          </div>
          <h2 className="text-h2 mb-3 leading-tight group-hover:text-brand-accent transition-colors">
            {post.rubrik}
          </h2>
          <p className="text-ink-secondary leading-relaxed mb-4 flex-1">{post.ingress}</p>
          <span className="inline-flex items-center gap-1.5 text-sm text-brand-accent font-medium">
            Läs {post.typ === "press" ? "pressmeddelandet" : post.typ === "nyhet" ? "nyheten" : "artikeln"}
            <Icon name="arrow_forward" size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}

/**
 * Horisontell scroll-rad — som YouTube channel rows.
 * Visar 3-4 kort åt gången på desktop, scrolla för fler.
 * scroll-snap gör att korten klickar på plats vid scroll.
 */
function PostRow({
  titel,
  undertitel,
  posts,
  visaAllaHref,
  copyRationale,
}: {
  titel: string;
  undertitel?: string;
  posts: NyhetsrumPost[];
  visaAllaHref: string;
  /** Optional UX-writing-rationale shown in editorial-guide-panel for this row. */
  copyRationale?: string;
}) {
  if (posts.length === 0) return null;

  const headingNode = (
    <div className="min-w-0">
      <h2 className="text-h4 font-medium">{titel}</h2>
      {undertitel && (
        <p className="text-sm text-ink-secondary mt-0.5">{undertitel}</p>
      )}
    </div>
  );

  return (
    <section className="py-6 border-t border-border-subtle">
      <div className="flex items-end justify-between gap-4 mb-4">
        {copyRationale ? (
          <Copy
            label={`Rad-rubrik — ${titel}`}
            category="rubrik"
            text={undertitel ? `${titel} — ${undertitel}` : titel}
            rationale={copyRationale}
          >
            {headingNode}
          </Copy>
        ) : (
          headingNode
        )}
        <a
          href={visaAllaHref}
          aria-label={`Visa alla ${titel.toLowerCase()}`}
          className="text-sm text-brand-accent hover:underline inline-flex items-center gap-1 shrink-0"
        >
          Visa alla
          <Icon name="arrow_forward" size={14} />
        </a>
      </div>

      <div
        className="overflow-x-auto -mx-4 sm:-mx-6 px-4 sm:px-6 snap-x snap-mandatory pb-2"
        role="region"
        aria-label={`${titel} — bläddra horisontellt`}
      >
        <div className="flex gap-4 min-w-max">
          {posts.map((p) => (
            <div key={p.id} className="snap-start w-[280px] sm:w-[300px] flex-shrink-0">
              <PostKort post={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Standardkort — används i både rader och fullt grid längre ner. */
function PostKort({ post }: { post: NyhetsrumPost }) {
  const detaljSlug = post.typ === "press" ? "pressmeddelande" : post.typ === "nyhet" ? "nyhet" : "artikel";
  return (
    <Link
      to={`/sidtyper/${detaljSlug}`}
      className="group flex flex-col h-full rounded-md border border-border-subtle bg-surface overflow-hidden hover:border-brand-accent hover:shadow-sm transition-all"
    >
      <div className="bg-tint-info aspect-[16/10] flex items-center justify-center">
        <Icon name="image" size={36} className="text-ink-muted" />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-2 text-[10px]">
          <span className={`px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${TYP_COLOR[post.typ]}`}>
            {TYP_LABEL[post.typ]}
          </span>
          <span className="text-ink-muted">{KATEGORI_LABEL[post.kategori]}</span>
        </div>
        <h3 className="font-medium leading-snug mb-2 group-hover:text-brand-accent line-clamp-3">{post.rubrik}</h3>
        <p className="text-sm text-ink-secondary leading-snug line-clamp-3 flex-1">{post.ingress}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-ink-muted">
          <time dateTime={post.datum}>{formaterDatum(post.datum)}</time>
          {post.lastid && <span>{post.lastid}</span>}
        </div>
      </div>
    </Link>
  );
}
