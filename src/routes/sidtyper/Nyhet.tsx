import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { FaqAccordion } from "../moduler/variants/FaqAccordion";
import { getPostBySlug, KATEGORI_LABEL } from "../moduler/nyhetsrum-data";

/**
 * SIDTYP — Nyhet (skiss)
 *
 * Skiljer sig från Press (formell, citerbar) och Artikel (storytelling).
 * Distinkt: TL;DR-ruta överst, "Vad innebär detta för dig?", FAQ.
 * Kortare än artikel, kund-fokuserad ton.
 */

const POST = getPostBySlug("elnatsavgifter-2026")!;

function formaterDatum(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("sv-SE", { day: "numeric", month: "long", year: "numeric" });
}

export function Nyhet() {
  const blocks: BlockDef[] = [
    /* ─── 1. HEADER ────────────────────────────────────────── */
    {
      id: "header",
      label: "Header — typ + datum",
      variants: [
        {
          key: "default",
          label: "Nyhet-badge + datum + h1",
          render: () => (
            <Annotation
              label="Nyhet-header — datum prominent"
              audience="user"
              rationale="Nyheter handlar om förändringar i tid (priser från visst datum, nya regler etc). Datum måste vara prominent. Typ-badge i blå info-färg signalerar 'detta är information du bör känna till', skiljer från press (grå) och artikel (kategorifärg)."
            >
              <header className="py-8 sm:py-10 max-w-reading">
                <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
                  <span className="px-2 py-1 rounded bg-tint-info text-brand-primary font-bold uppercase tracking-wider">
                    Nyhet
                  </span>
                  <span className="text-ink-muted">{KATEGORI_LABEL[POST.kategori]}</span>
                  <span className="text-ink-muted">·</span>
                  <time dateTime={POST.datum} className="text-ink-secondary font-medium">
                    {formaterDatum(POST.datum)}
                  </time>
                </div>

                <Copy
                  label="Nyhet H1 — direkt och daterad"
                  category="rubrik"
                  text={POST.rubrik}
                  rationale="Datum-bunden rubrik ('Nya elnätsavgifter från 1 juli 2026') gör nyheten ögonblicksbar. Använder 'från [datum]' när det är relevant."
                >
                  <h1 className="text-h1 leading-tight mb-3">{POST.rubrik}</h1>
                </Copy>

                <p className="text-lede text-ink-secondary leading-relaxed">{POST.ingress}</p>
              </header>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 2. TL;DR — sammanfattning ─────────────────────────── */
    {
      id: "tldr",
      label: "TL;DR — sammanfattning",
      variants: [
        {
          key: "default",
          label: "Highlight-ruta med 3-4 punkter",
          render: () => (
            <Annotation
              label="TL;DR — det viktigaste först"
              audience="user"
              rationale="Briefen: 'Finns behov för att kunna läsa en kort sammanfattning, ofta är nyheterna relativt texttunga, vore bra att kunna highlighta det viktigaste.' TL;DR-rutan ger användaren det viktigaste på 5 sek innan de bestämmer om de vill läsa hela brödtexten."
            >
              <section className="py-2">
                <div className="rounded-md bg-tint-notice border-l-4 border-brand-highlight p-5 max-w-reading">
                  <Copy
                    label="TL;DR-rubrik"
                    category="rubrik"
                    text="Det viktigaste"
                    rationale="Försvenskning av TL;DR-konceptet. 'Sammanfattning' är formellt; 'Det viktigaste' är direkt och tjänar samma syfte med vardagsspråk."
                  >
                    <p className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-2">
                      Det viktigaste
                    </p>
                  </Copy>
                  <ul className="space-y-2">
                    {(POST.sammanfattning ?? []).map((s) => (
                      <li key={s} className="flex items-start gap-2 text-sm">
                        <Icon name="check" size={16} className="text-brand-highlight shrink-0 mt-0.5" />
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

    /* ─── 3. BRÖDTEXT ──────────────────────────────────────── */
    {
      id: "brodtext",
      label: "Brödtext",
      variants: [
        {
          key: "default",
          label: "Tre korta stycken",
          render: () => (
            <section className="py-6 max-w-reading space-y-5 text-ink-secondary leading-relaxed">
              <p>
                Från och med 1 juli 2026 justeras elnätsavgifterna för
                Öresundskrafts privatkunder i Helsingborg och Ängelholm.
                Höjningen finansierar den utbyggnad och modernisering av nätet
                som krävs för att möta ökad efterfrågan från elbilsladdning,
                värmepumpar och anslutning av nya bostäder.
              </p>
              <p>
                För en typisk villa med årsförbrukning omkring 20&nbsp;000 kWh
                innebär det cirka 75 kronor mer per månad. För en lägenhet med
                årsförbrukning omkring 2&nbsp;000 kWh blir det cirka 25 kronor mer per månad.
              </p>
              <p>
                Avgifterna gäller alla privatkunder anslutna till
                Öresundskrafts nät. Företagskunder och kommersiella kunder får
                separata informationsutskick.
              </p>
            </section>
          ),
        },
      ],
    },

    /* ─── 4. VAD INNEBÄR DETTA FÖR DIG? ──────────────────── */
    {
      id: "vad-innebar",
      label: "Vad innebär detta för dig?",
      variants: [
        {
          key: "default",
          label: "Konkret konsekvens-block per situation",
          render: () => (
            <Annotation
              label="Konsekvens — översätt till kundens situation"
              audience="user"
              rationale="Nyheter handlar ofta om förändringar — användaren vill veta 'vad behöver JAG göra?'. Tre tydliga situationer (lägenhet/villa/elbilsladdning) ger praktisk översättning. Bryter texttunghet och fokuserar på handling."
            >
              <section className="py-10 border-t border-border-subtle">
                <Copy
                  label="Vad innebär-rubrik"
                  category="rubrik"
                  text="Vad innebär det här för dig?"
                  rationale="Direkt fråga som kunden själv har. 'Konsekvenser' eller 'Påverkan' skulle vara förvaltningssvenska."
                >
                  <h2 className="text-h3 font-medium mb-4">Vad innebär det här för dig?</h2>
                </Copy>
                <div className="grid sm:grid-cols-2 gap-4 max-w-reading">
                  {[
                    {
                      ikon: "apartment",
                      situation: "Bor du i lägenhet?",
                      konsekvens:
                        "~25 kronor mer per månad. Du behöver inte göra något — höjningen sker automatiskt på din faktura.",
                    },
                    {
                      ikon: "home",
                      situation: "Bor du i villa?",
                      konsekvens:
                        "~75 kronor mer per månad i genomsnitt. Du kan se din exakta förbrukning på Mina sidor.",
                    },
                    {
                      ikon: "ev_station",
                      situation: "Har du elbilsladdning hemma?",
                      konsekvens:
                        "Höjningen påverkar effekttariffen lite. Smart laddning på natten är fortfarande billigast.",
                    },
                    {
                      ikon: "solar_power",
                      situation: "Har du solceller?",
                      konsekvens:
                        "Avgiften för uttagen el höjs, men ersättningen för såld el ändras inte. Egen produktion blir därmed ännu mer värdefull.",
                    },
                  ].map((k) => (
                    <div
                      key={k.situation}
                      className="p-4 rounded-md border border-border-subtle bg-surface flex items-start gap-3"
                    >
                      <Icon name={k.ikon} size={24} className="text-brand-accent shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium mb-1">{k.situation}</p>
                        <p className="text-sm text-ink-secondary leading-snug">{k.konsekvens}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 5. FAQ ─────────────────────────────────────────── */
    {
      id: "faq",
      label: "FAQ — vanliga kundfrågor",
      variants: [
        {
          key: "accordion",
          label: "Accordion (FAQ-modul)",
          render: () => (
            <Annotation
              label="FAQ — adresserar kundens följdfrågor"
              audience="user"
              rationale="Briefen: 'Besvara kundens primära frågor kring ämnet via FAQ.' Återanvänder FAQ-modulen så användaren känner igen mönstret från andra sidor. Frågor svarar på 'varför nu?', 'kan jag undvika?', 'när ser jag det på fakturan?'."
            >
              <section className="py-10 border-t border-border-subtle [&_section]:max-w-none">
                <FaqAccordion />
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 6. KONTAKT KUNDSERVICE ───────────────────────────── */
    {
      id: "kontakt",
      label: "Frågor — KC-länk",
      variants: [
        {
          key: "default",
          label: "Banner till kundservice",
          render: () => (
            <section className="py-8 border-t border-border-subtle">
              <div className="rounded-md bg-tint-info p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-reading">
                <Icon name="support_agent" size={28} className="text-brand-accent shrink-0" />
                <div className="flex-1">
                  <p className="font-medium">Frågor om elnätsavgiften?</p>
                  <p className="text-sm text-ink-secondary">
                    Frågor om din egen faktura besvarar vi snabbast direkt.
                  </p>
                </div>
                <Link
                  to="/sidtyper/kundservice-ny"
                  className="inline-flex items-center gap-1.5 bg-brand-primary text-ink-onbrand font-medium px-4 py-2.5 rounded hover:opacity-90 text-sm shrink-0"
                >
                  Kontakta kundservice
                  <Icon name="arrow_forward" size={16} />
                </Link>
              </div>
            </section>
          ),
        },
      ],
    },

    /* ─── 7. RELATERADE NYHETER ─────────────────────────── */
    {
      id: "related",
      label: "Relaterade nyheter",
      variants: [
        {
          key: "default",
          label: "Liknande ämne — 2 kort",
          render: () => (
            <section className="py-10 border-t border-border-subtle">
              <h2 className="text-h4 font-medium mb-4">Mer om {KATEGORI_LABEL[POST.kategori]}</h2>
              <div className="grid sm:grid-cols-2 gap-4 max-w-reading">
                {[
                  { rubrik: "Du kan nu hämta dina mätvärden direkt i appen", datum: "2026-04-02" },
                  { rubrik: "Byggstart för förstärkning av nätet i Rydebäck", datum: "2026-04-22" },
                ].map((r) => (
                  <Link
                    key={r.rubrik}
                    to="/sidtyper/nyhet"
                    className="group p-4 rounded-md border border-border-subtle bg-surface hover:border-brand-accent transition-colors"
                  >
                    <p className="text-[10px] uppercase tracking-wider text-ink-muted font-bold mb-1">Nyhet</p>
                    <p className="font-medium leading-snug mb-1.5 group-hover:text-brand-accent">{r.rubrik}</p>
                    <p className="text-xs text-ink-muted">{formaterDatum(r.datum)}</p>
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
        kategori="Nyhet (skiss)"
        syfte="Information om förändringar — priser, regler, drift. Inte pressrelease (ingen citerbar formell ton), inte artikel (ingen storytelling). Kund-fokus: TL;DR först, konsekvensblock, FAQ. Kortare format."
        malgrupp="Befintliga kunder och allmänhet i Helsingborg/Ängelholm. Inte journalister primärt."
        primarHandling="Skanna TL;DR · Förstå konsekvensen för min situation · Hitta svar i FAQ · Vid frågor → KC."
        ton="Informativ, direkt, inte säljande. 'Vi justerar' inte 'vi har glädjen att meddela'. Inga superlativ — bara fakta + konsekvens."
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
          <li><a href="#" className="hover:text-brand-accent">Nyheter</a></li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="font-medium text-ink truncate max-w-[260px]">{POST.rubrik}</li>
        </ol>
      </nav>

      <BlockList pageId="nyhet" blocks={blocks} />
    </div>
  );
}
