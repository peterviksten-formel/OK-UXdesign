import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { getPostBySlug, KATEGORI_LABEL } from "../moduler/nyhetsrum-data";

/**
 * SIDTYP — Pressmeddelande (skiss)
 *
 * Formell publicistisk layout. Skiljer sig från Nyhet/Artikel via:
 *  - Dateline + "FÖR OMEDELBAR PUBLICERING" i header
 *  - Sticky press-kontakt-kort på desktop
 *  - Bildbank med högupplöst nedladdning
 *  - PDF-bilagor (rapporter, kvartalssiffror)
 *  - Boilerplate-fakta-ruta nederst (om Öresundskraft)
 *
 * Skiss-läge — visar pressrelease-konventioner, finputsas senare.
 */

const POST = getPostBySlug("fjarrvarmepris-2026")!;

function formaterDatumLong(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("sv-SE", { day: "numeric", month: "long", year: "numeric" });
}

export function Pressmeddelande() {
  const blocks: BlockDef[] = [
    /* ─── 1. HEADER — typ-badge + dateline ──────────────────── */
    {
      id: "header",
      label: "Header — typ + dateline",
      variants: [
        {
          key: "default",
          label: "Pressmeddelande-badge + ort + datum",
          render: () => (
            <Annotation
              label="Press-header — formell, citerbar"
              audience="user"
              rationale="Pressrelease-konventioner: typ-badge, dateline (ort + datum), 'FÖR OMEDELBAR PUBLICERING'-stämpel. Journalister känner igen formatet — det signalerar att texten är fri att citera och att källan är officiell."
            >
              <header className="py-8 sm:py-10">
                <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
                  <span className="px-2 py-1 rounded bg-ink/10 text-ink-secondary font-bold uppercase tracking-wider">
                    Pressmeddelande
                  </span>
                  <span className="text-ink-muted">
                    {KATEGORI_LABEL[POST.kategori]}
                  </span>
                  <span className="text-ink-muted">·</span>
                  <span className="px-2 py-1 rounded bg-tint-notice text-brand-primary font-medium text-[10px] uppercase tracking-wider">
                    För omedelbar publicering
                  </span>
                </div>

                <Copy
                  label="Press H1 — informativ, inte säljande"
                  category="rubrik"
                  text={POST.rubrik}
                  rationale="Pressrubriker ska vara informationsdense: vem, vad, var, när — inte 'spännande nyhet om ...'. Journalister bedömer källan på rubriken."
                >
                  <h1 className="text-h1 leading-tight mb-4">{POST.rubrik}</h1>
                </Copy>

                <p className="text-lede text-ink-secondary mb-4 leading-relaxed max-w-reading">
                  {POST.ingress}
                </p>

                <p className="text-sm text-ink-muted">
                  <strong className="text-ink-secondary">Helsingborg, {formaterDatumLong(POST.datum)}</strong>
                  {" — "}
                  Öresundskraft AB
                </p>
              </header>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 2. BRÖDTEXT med citat-block ──────────────────────── */
    {
      id: "brodtext",
      label: "Brödtext med highlight-citat",
      variants: [
        {
          key: "default",
          label: "Två-tre stycken + citat-block",
          render: () => (
            <Annotation
              label="Brödtext + citat — citerbar källtext"
              audience="redaktör"
              rationale="Pressreleaser har stycken som är 80–120 ord och ofta ett tydligt citat från ledning som journalister kan plocka direkt. Citatet är visuellt avskilt — det ska gå att kopiera utan att ta med löpande text."
            >
              <section className="py-6 border-t border-border-subtle">
                <div className="max-w-reading space-y-5 text-ink-secondary leading-relaxed">
                  <p>
                    Öresundskraft har tecknat ett nytt prisåtagande för fjärrvärme i Helsingborg
                    och Ängelholm som gäller fram till 2028. Det innebär att bolagets
                    cirka 110 000 fjärrvärmekunder får förutsägbara kostnader under tre år och
                    en genomsnittlig prisökning på 3,9 procent från och med 1 januari 2026.
                  </p>
                  <p>
                    Beslutet följer ett samråd med kundrepresentanter, näringsliv och
                    fastighetsägare i regionen. Det är en del av bolagets långsiktiga arbete
                    för att hålla nere uppvärmningskostnaderna — trots ökade investeringar i
                    nätet och anslutning till koldioxidinfångning på Filbornaverket.
                  </p>
                </div>

                <Copy
                  label="Citat — VD-kommentar"
                  category="ton"
                  text="Vi vet att förutsägbara kostnader är viktigare än någonsin. Det här åtagandet ger våra kunder ekonomisk trygghet i tre år framåt — utan att vi behöver kompromissa med klimatomställningen."
                  rationale="Citat-blocken är medvetet visuellt avskilda så journalister kan plocka dem ren-textuellt. Långt nog att stå för sig självt, kort nog att fungera som löp i en artikel."
                >
                  <blockquote className="my-8 max-w-reading border-l-4 border-brand-accent pl-6 py-2">
                    <p className="text-h4 font-medium leading-snug mb-3">
                      "Vi vet att förutsägbara kostnader är viktigare än någonsin. Det här
                      åtagandet ger våra kunder ekonomisk trygghet i tre år framåt — utan att
                      vi behöver kompromissa med klimatomställningen."
                    </p>
                    <footer className="text-sm text-ink-muted">
                      — Lars Berg, VD Öresundskraft
                    </footer>
                  </blockquote>
                </Copy>

                <div className="max-w-reading space-y-5 text-ink-secondary leading-relaxed">
                  <p>
                    Den genomsnittliga prishöjningen om 3,9 procent gäller från årsskiftet och
                    motsvarar cirka 90 kronor per månad för en typvilla. För lägenheter i
                    flerbostadshus blir effekten lägre i kronor per hushåll.
                  </p>
                  <p>
                    Prisåtagandet löper till och med 31 december 2028. Eventuella justeringar
                    inom denna period beslutas i samråd med Kundrådet och meddelas minst
                    sex månader i förväg.
                  </p>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 3. BILDBANK + BILAGOR ────────────────────────────── */
    {
      id: "bildbank",
      label: "Bildbank + bilagor",
      variants: [
        {
          key: "default",
          label: "Bilder med nedladdning + PDF-bilagor",
          render: () => (
            <Annotation
              label="Bildbank — högupplöst nedladdning"
              audience="user"
              rationale="Briefen: 'Journalister behöver pressbilder i hög upplösning samt kompletterande dokument.' Tydlig nedladdnings-CTA per bild + lista över PDF-bilagor med storlek. Inget gömt bakom registrering."
            >
              <section className="py-10 border-t border-border-subtle">
                <Copy
                  label="Bildbank-rubrik"
                  category="rubrik"
                  text="Pressbilder och bilagor"
                  rationale="Direkt funktionsetikett. Inga 'Material för media' — säg vad det är."
                >
                  <h2 className="text-h3 font-medium mb-4">Pressbilder och bilagor</h2>
                </Copy>
                <p className="text-ink-secondary mb-6 max-w-reading">
                  Använd fritt vid rapportering om Öresundskraft. Ange foto-credit där den finns.
                </p>

                {/* Bildgrid */}
                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { titel: "Filbornaverket exteriör", credit: "Foto: Öresundskraft / Anders Pedersen", storlek: "JPG · 4,2 MB" },
                    { titel: "Fjärrvärmecentral", credit: "Foto: Öresundskraft", storlek: "JPG · 3,1 MB" },
                    { titel: "Fjärrvärmenät karta", credit: "Illustration: Öresundskraft", storlek: "PNG · 1,8 MB" },
                  ].map((b) => (
                    <div key={b.titel} className="rounded-md border border-border-subtle bg-surface overflow-hidden">
                      <div className="bg-tint-info aspect-[4/3] flex items-center justify-center">
                        <Icon name="image" size={40} className="text-ink-muted" />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium mb-0.5">{b.titel}</p>
                        <p className="text-xs text-ink-muted mb-3">{b.credit}</p>
                        <a
                          href="#"
                          className="inline-flex items-center gap-1.5 text-sm text-brand-accent hover:underline"
                        >
                          <Icon name="download" size={14} />
                          Ladda ner ({b.storlek})
                        </a>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bilagor-lista */}
                <h3 className="text-h5 font-medium mb-3">Bilagor</h3>
                <ul className="divide-y divide-border-subtle border border-border-subtle rounded-md bg-surface max-w-reading">
                  {[
                    { titel: "Prislista fjärrvärme 2026 (faktablad)", typ: "PDF · 248 kB" },
                    { titel: "Pressrelease som PDF", typ: "PDF · 162 kB" },
                    { titel: "Öresundskraft AB · faktaark 2026", typ: "PDF · 412 kB" },
                  ].map((b) => (
                    <li key={b.titel}>
                      <a href="#" className="flex items-center gap-3 px-4 py-3 hover:bg-tint-info">
                        <Icon name="picture_as_pdf" size={20} className="text-brand-accent shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{b.titel}</p>
                          <p className="text-xs text-ink-muted">{b.typ}</p>
                        </div>
                        <Icon name="download" size={16} className="text-ink-muted shrink-0" />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 4. BOILERPLATE — om Öresundskraft ─────────────────── */
    {
      id: "boilerplate",
      label: "Boilerplate — företagsfakta",
      variants: [
        {
          key: "default",
          label: "Faktaruta i pressrelease-format",
          render: () => (
            <Annotation
              label="Boilerplate — pressrelease-konvention"
              audience="redaktör"
              rationale="Pressreleaser avslutas traditionellt med en kort faktaruta om bolaget. Journalister känner igen den och kan klippa in den direkt i artiklar. Innehåller siffror som ger kontext (kunder, anställda, geografi)."
            >
              <section className="py-10 border-t border-border-subtle">
                <div className="rounded-md bg-tint-info p-6 max-w-reading">
                  <p className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-3">
                    Om Öresundskraft
                  </p>
                  <p className="text-sm leading-relaxed text-ink-secondary">
                    Öresundskraft är ett kommunalägt energibolag med säte i Helsingborg.
                    Bolaget levererar el, fjärrvärme, fjärrkyla, gas och stadsnät till cirka
                    125 000 kunder i nordvästra Skåne. Verksamheten startade 1892 och bolaget
                    har idag omkring 400 anställda. Ägs av Helsingborgs och Ängelholms kommuner.
                  </p>
                  <p className="text-xs text-ink-muted mt-3">
                    <a href="https://www.oresundskraft.se" className="text-brand-accent hover:underline">
                      oresundskraft.se
                    </a>
                  </p>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 5. DELA + RELATERADE PRESSMEDDELANDEN ─────────────── */
    {
      id: "dela-related",
      label: "Dela + relaterade",
      variants: [
        {
          key: "default",
          label: "Sociala medier + tidigare press",
          render: () => (
            <section className="py-8 border-t border-border-subtle">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-3">
                    Dela pressmeddelandet
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { ikon: "share", label: "Kopiera länk" },
                      { ikon: "mail", label: "Mejla länken" },
                      { ikon: "logo_dev", label: "Dela på LinkedIn" },
                    ].map((d) => (
                      <button
                        key={d.label}
                        type="button"
                        className="inline-flex items-center gap-1.5 border border-border-strong px-3 py-2 rounded text-sm hover:bg-tint-info"
                      >
                        <Icon name={d.ikon} size={16} className="text-brand-accent" />
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-3">
                    Tidigare pressmeddelanden
                  </p>
                  <ul className="space-y-1.5 text-sm">
                    <li><a href="#" className="text-brand-accent hover:underline">Industriklivet beviljar 228 mkr till CCS — 28 mars 2026</a></li>
                    <li><a href="#" className="text-brand-accent hover:underline">Ny avsiktsförklaring för fossilfri fjärrvärme — 12 feb 2026</a></li>
                    <li><a href="#" className="text-brand-accent hover:underline">Bokslutskommuniké 2025 — 30 jan 2026</a></li>
                  </ul>
                </div>
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
        kategori="Pressmeddelande (skiss)"
        syfte="Officiell, citerbar källa för journalister och press. Formell layout, sticky press-kontakt på desktop, bildbank med nedladdning, boilerplate-fakta. Skiljer sig från nyhet (kortare, kund-fokus) och artikel (storytelling, brand voice)."
        malgrupp="Primärt journalister, politiker, partners. Sekundärt allmänheten."
        primarHandling="Läs hela texten · Ladda ner pressbilder/PDF · Kontakta presschef · Dela vidare."
        ton="Formell, faktabaserad, citerbar. Inga adjektiv som skulle tas bort av en redaktion. Citat från ledning är visuellt avskilda och fristående."
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
          <li><a href="#" className="hover:text-brand-accent">Press</a></li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="font-medium text-ink truncate max-w-[260px]">{POST.rubrik}</li>
        </ol>
      </nav>

      {/* 2-col layout: brödtext vänster, sticky press-kontakt höger */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8 lg:mt-2">
        <div className="min-w-0">
          <BlockList pageId="pressmeddelande" blocks={blocks} />
        </div>

        <div className="hidden lg:block pt-2">
          <div className="sticky top-20">
            <aside
              aria-label="Presskontakt"
              className="rounded-md border-2 border-brand-accent bg-surface shadow-md p-5"
            >
              <p className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-3">
                Presskontakt
              </p>
              <div className="flex items-start gap-3 mb-4">
                <span className="shrink-0 w-12 h-12 rounded-full bg-brand-primary text-white grid place-items-center font-medium">
                  {POST.presskontakt!.initialer}
                </span>
                <div>
                  <p className="font-medium">{POST.presskontakt!.namn}</p>
                  <p className="text-sm text-ink-secondary">{POST.presskontakt!.titel}</p>
                </div>
              </div>
              <dl className="text-sm space-y-2 mb-4">
                <div>
                  <dt className="text-xs text-ink-muted uppercase tracking-wider mb-0.5">Telefon</dt>
                  <dd>
                    <a href={`tel:${POST.presskontakt!.tel.replace(/\s/g, "")}`} className="text-brand-accent hover:underline font-medium">
                      {POST.presskontakt!.tel}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-muted uppercase tracking-wider mb-0.5">E-post</dt>
                  <dd>
                    <a href={`mailto:${POST.presskontakt!.mejl}`} className="text-brand-accent hover:underline font-medium break-all">
                      {POST.presskontakt!.mejl}
                    </a>
                  </dd>
                </div>
              </dl>
              <p className="text-xs text-ink-muted leading-snug pt-3 border-t border-border-subtle">
                Vi svarar inom 1 arbetsdag.
                Akut: ring presstjänsten dygnet runt.
              </p>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
