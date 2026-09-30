import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { FaqAccordion } from "../moduler/variants/FaqAccordion";
import { getPostBySlug, KATEGORI_LABEL } from "../moduler/nyhetsrum-data";

/**
 * SIDTYP: Nyhet (skiss)
 *
 * Skiljer sig från pressmeddelandet (formellt, citerbart) och artikeln
 * (berättande). Utmärkande: sammanfattning överst, "Vad innebär det här
 * för dig?" och vanliga frågor. Kortare än en artikel, skriven för kunden.
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
      label: "Sidhuvud: typ och datum",
      variants: [
        {
          key: "default",
          label: "Typetikett, datum och rubrik",
          render: () => (
            <Annotation
              label="Sidhuvud med tydligt datum"
              audience="user"
              rationale="En nyhet handlar om en förändring som gäller från ett visst datum, så datumet syns direkt. Den blå etiketten Nyhet visar att det är information till kunder och skiljer sidan från pressmeddelanden (grå) och artiklar."
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
                  label="Rubrik, vad som ändras och när"
                  category="rubrik"
                  text={POST.rubrik}
                  rationale="Rubriken säger vad som ändras och från vilket datum, så kunden förstår nyheten utan att läsa vidare. Skriv 'från [datum]' när förändringen börjar gälla ett visst datum. Undvik säljande ord som 'glädjande'."
                >
                  <h1 className="text-h1 leading-tight mb-3">{POST.rubrik}</h1>
                </Copy>

                <Copy
                  label="Ingress, varför och vad det betyder"
                  category="ton"
                  text={POST.ingress}
                  rationale="Ingressen säger kort varför förändringen görs och lovar att sidan förklarar vad den betyder för kunden. 'Vi höjer' är rakare än 'avgifterna justeras', som döljer vem som gör vad."
                >
                  <p className="text-lede text-ink-secondary leading-relaxed">{POST.ingress}</p>
                </Copy>
              </header>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 2. SAMMANFATTNING ────────────────────────────────── */
    {
      id: "tldr",
      label: "Sammanfattning",
      variants: [
        {
          key: "default",
          label: "Markerad ruta med 3 till 4 punkter",
          render: () => (
            <Annotation
              label="Sammanfattning, det viktigaste först"
              audience="redaktör"
              rationale="Nyheter blir ofta texttunga. Rutan ger kunden det viktigaste på några sekunder, innan hen bestämmer sig för att läsa vidare. Skriv 3 till 4 korta punkter: vad ändras, när, vad det kostar och om kunden behöver göra något."
            >
              <section className="py-2">
                <div className="rounded-md bg-tint-notice border-l-4 border-brand-highlight p-5 max-w-reading">
                  <Copy
                    label="Sammanfattning, rubrik"
                    category="rubrik"
                    text="Det viktigaste"
                    rationale="'Det viktigaste' säger vad rutan ger läsaren, med vardagliga ord. 'Sammanfattning' fungerar men känns mer formellt. Undvik engelska förkortningar som TL;DR."
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
            <Annotation
              label="Brödtext, kort och konkret"
              audience="redaktör"
              rationale="Brödtexten ger bakgrunden för den som vill veta mer än sammanfattningen. Håll den till tre korta stycken: vad och varför, vad det kostar med räkneexempel, och vem som berörs."
            >
              <section className="py-6 max-w-reading space-y-5 text-ink-secondary leading-relaxed">
                <p>
                  Från 1 juli 2026 höjer vi elnätsavgifterna för privatkunder
                  i Helsingborg och Ängelholm. Pengarna går till att bygga ut
                  och förnya elnätet, som behöver klara fler elbilsladdare,
                  fler värmepumpar och nya bostäder.
                </p>
                <p>
                  För en typisk villa som använder omkring 20&nbsp;000 kWh per år
                  blir det cirka 75 kronor mer per månad. För en lägenhet som
                  använder omkring 2&nbsp;000 kWh per år blir det cirka 25 kronor mer per månad.
                </p>
                <p>
                  Höjningen gäller alla privatkunder som är anslutna till
                  Öresundskrafts elnät. Företagskunder får information i ett
                  separat utskick.
                </p>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 4. VAD INNEBÄR DETTA FÖR DIG? ──────────────────── */
    {
      id: "vad-innebar",
      label: "Vad innebär det här för dig?",
      variants: [
        {
          key: "default",
          label: "En ruta per kundsituation",
          render: () => (
            <Annotation
              label="Vad det betyder i din situation"
              audience="user"
              rationale="Kunden vill veta vad förändringen betyder för just hen och om hen behöver göra något. Fyra vanliga situationer (lägenhet, villa, elbilsladdning, solceller) gör det lätt att hitta sin egen och bryter upp texten."
            >
              <section className="py-10 border-t border-border-subtle">
                <Copy
                  label="Rubrik, kundens egen fråga"
                  category="rubrik"
                  text="Vad innebär det här för dig?"
                  rationale="Rubriken ställer den fråga kunden redan har i huvudet. Undvik 'Konsekvenser' eller 'Påverkan', som låter som förvaltningssvenska."
                >
                  <h2 className="text-h3 font-medium mb-4">Vad innebär det här för dig?</h2>
                </Copy>
                <div className="grid sm:grid-cols-2 gap-4 max-w-reading">
                  {[
                    {
                      ikon: "apartment",
                      situation: "Bor du i lägenhet?",
                      konsekvens:
                        "Cirka 25 kronor mer per månad. Du behöver inte göra något, höjningen syns automatiskt på din faktura.",
                    },
                    {
                      ikon: "home",
                      situation: "Bor du i villa?",
                      konsekvens:
                        "Cirka 75 kronor mer per månad i genomsnitt. Du ser din exakta förbrukning på Mina sidor.",
                    },
                    {
                      ikon: "ev_station",
                      situation: "Har du elbilsladdning hemma?",
                      konsekvens:
                        "Effektavgiften höjs något. Det är fortfarande billigast att ladda bilen på natten.",
                    },
                    {
                      ikon: "solar_power",
                      situation: "Har du solceller?",
                      konsekvens:
                        "Avgiften för el du köper höjs, men ersättningen för el du säljer ändras inte. Därför blir din egen solel ännu mer värd.",
                    },
                  ].map((k) => (
                    <div
                      key={k.situation}
                      className="p-4 rounded-md border border-border-subtle bg-surface flex items-start gap-3"
                    >
                      <Icon name={k.ikon} size={24} className="text-brand-accent shrink-0 mt-0.5" />
                      <div>
                        {k.situation === "Bor du i lägenhet?" ? (
                          <Copy
                            label="Situationsrutor, rubriker som frågor"
                            category="reassurance"
                            text="Bor du i lägenhet?"
                            rationale="Varje ruta börjar med en ja/nej-fråga så att kunden snabbt hittar sin situation. Svaret ger först summan och sedan om kunden behöver göra något. 'Du behöver inte göra något' lugnar och minskar samtal till kundservice."
                          >
                            <p className="font-medium mb-1">{k.situation}</p>
                          </Copy>
                        ) : (
                          <p className="font-medium mb-1">{k.situation}</p>
                        )}
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
      label: "Vanliga frågor",
      variants: [
        {
          key: "accordion",
          label: "Fällbara frågor och svar",
          render: () => (
            <Annotation
              label="Vanliga frågor om förändringen"
              audience="redaktör"
              rationale="Här besvaras kundens följdfrågor, så att färre behöver kontakta kundservice. Samma frågemodul som på andra sidor gör mönstret igenkännbart. Skriv frågor om just den här nyheten, till exempel 'Varför höjs avgiften nu?' och 'När syns det på fakturan?'."
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
      label: "Frågor, länk till kundservice",
      variants: [
        {
          key: "default",
          label: "Ruta med länk till kundservice",
          render: () => (
            <Annotation
              label="Väg vidare till kundservice"
              audience="user"
              rationale="Den som inte hittar svar i texten eller bland frågorna ska inte fastna. Rutan ligger direkt efter frågorna, där behovet av hjälp är störst, och leder till kundservice."
            >
            <section className="py-8 border-t border-border-subtle">
              <div className="rounded-md bg-tint-info p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 max-w-reading">
                <Icon name="support_agent" size={28} className="text-brand-accent shrink-0" />
                <div className="flex-1">
                  <Copy
                    label="Kundservice, rubrik"
                    category="rubrik"
                    text="Frågor om elnätsavgiften?"
                    rationale="Rubriken speglar det kunden tänker efter att ha läst nyheten. Undvik 'Kontakta oss', som är för allmänt, och 'Vi hjälper dig', som handlar om avsändaren."
                  >
                    <p className="font-medium">Frågor om elnätsavgiften?</p>
                  </Copy>
                  <Copy
                    label="Kundservice, förklarande text"
                    category="reassurance"
                    text="Gäller det din egen faktura? Då får du snabbast svar av kundservice."
                    rationale="Texten säger när det lönar sig att kontakta kundservice: frågor om den egna fakturan. Det hjälper kunden att välja rätt väg och sparar tid för båda."
                  >
                    <p className="text-sm text-ink-secondary">
                      Gäller det din egen faktura? Då får du snabbast svar av kundservice.
                    </p>
                  </Copy>
                </div>
                <Copy
                  label="Kundservice, knapp"
                  category="cta"
                  text="Kontakta kundservice"
                  rationale="Verb och objekt säger vad knappen gör. Den tidigare texten 'Till kundservice' sa bara vart knappen leder, inte vad kunden kan göra där."
                >
                  <Link
                    to="/sidtyper/kundservice-ny"
                    className="inline-flex items-center gap-1.5 bg-brand-primary text-ink-onbrand font-medium px-4 py-2.5 rounded hover:opacity-90 text-sm shrink-0"
                  >
                    Kontakta kundservice
                    <Icon name="arrow_forward" size={16} />
                  </Link>
                </Copy>
              </div>
            </section>
            </Annotation>
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
          label: "Samma ämne, 2 kort",
          render: () => (
            <Annotation
              label="Relaterade nyheter i samma ämne"
              audience="redaktör"
              rationale="Ger kunden en väg vidare till fler nyheter i samma ämne i stället för en återvändsgränd. Välj två aktuella nyheter som hör ihop med den här, helst sådana som också påverkar kundens ekonomi eller vardag."
            >
            <section className="py-10 border-t border-border-subtle">
              <Copy
                label="Relaterade nyheter, rubrik"
                category="rubrik"
                text={`Mer om ${KATEGORI_LABEL[POST.kategori]}`}
                rationale="Rubriken hämtar nyhetens kategori, till exempel 'Mer om Energi', och säger därmed vad nyheterna har gemensamt. 'Liknande nyheter' och 'Du kanske också vill läsa' är mer allmänna."
              >
                <h2 className="text-h4 font-medium mb-4">Mer om {KATEGORI_LABEL[POST.kategori]}</h2>
              </Copy>
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
            </Annotation>
          ),
        },
      ],
    },
  ];

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6">
      <PageBrief
        kategori="Nyhet (skiss)"
        syfte="Berätta för kunder om förändringar i priser, regler eller drift. Kortare än en artikel och inte formell som ett pressmeddelande. Sidan börjar med en sammanfattning, visar vad förändringen betyder i olika situationer och besvarar vanliga frågor."
        malgrupp="Befintliga kunder och allmänheten i Helsingborg och Ängelholm. Journalister är inte den främsta målgruppen."
        primarHandling="Läsa sammanfattningen, förstå vad förändringen betyder för min situation, hitta svar bland vanliga frågor och vid behov kontakta kundservice."
        ton="Saklig, rak och inte säljande. Skriv 'vi höjer', inte 'avgifterna justeras' eller 'vi har glädjen att meddela'. Inga superlativ, bara fakta och vad det betyder för kunden."
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
