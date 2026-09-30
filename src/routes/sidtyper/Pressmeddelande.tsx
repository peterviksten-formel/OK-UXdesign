import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { getPostBySlug, KATEGORI_LABEL } from "../moduler/nyhetsrum-data";

/**
 * SIDTYP: Pressmeddelande (skiss)
 *
 * Formell layout. Skiljer sig från nyhet och artikel genom:
 *  - ortsrad och "För omedelbar publicering" i sidhuvudet
 *  - presskontakt som följer med vid scroll på större skärmar
 *  - bildbank med högupplösta bilder att ladda ner
 *  - PDF-bilagor (faktablad, rapporter)
 *  - standardtext om företaget längst ner (Om Öresundskraft)
 *
 * Skiss: visar konventionerna för pressmeddelanden, detaljer finputsas senare.
 */

const POST = getPostBySlug("fjarrvarmepris-2026")!;

function formaterDatumLong(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("sv-SE", { day: "numeric", month: "long", year: "numeric" });
}

export function Pressmeddelande() {
  const blocks: BlockDef[] = [
    /* ─── 1. SIDHUVUD: typetikett och ortsrad ──────────────── */
    {
      id: "header",
      label: "Sidhuvud: typ och ortsrad",
      variants: [
        {
          key: "default",
          label: "Typetikett, rubrik, ingress, ort och datum",
          render: () => (
            <Annotation
              label="Sidhuvud i pressmeddelandeformat"
              audience="user"
              rationale="Etiketten Pressmeddelande, ortsraden (ort och datum) och 'För omedelbar publicering' följer etablerad pressmeddelandeform. Journalisten ser direkt att texten är ett officiellt besked från bolaget och att den får citeras och publiceras nu."
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
                  <Copy
                    label="Publiceringsstatus"
                    category="metadata"
                    text="För omedelbar publicering"
                    rationale="Etablerad fras i pressmeddelanden som säger att innehållet får publiceras direkt, utan embargo. Vid embargo byts texten mot datum och klockslag, till exempel 'Under embargo till 12 maj kl. 08.00'."
                  >
                    <span className="px-2 py-1 rounded bg-tint-notice text-brand-primary font-medium text-[10px] uppercase tracking-wider">
                      För omedelbar publicering
                    </span>
                  </Copy>
                </div>

                <Copy
                  label="Rubrik, sakligt besked"
                  category="rubrik"
                  text={POST.rubrik}
                  rationale="Rubriken säger vem som gör vad, med siffror: vem höjer, hur mycket och hur länge. Journalister avgör på rubriken om nyheten är värd att bevaka. Undvik förskönande ord som 'justerar' och säljande ord som 'spännande'."
                >
                  <h1 className="text-h1 leading-tight mb-4">{POST.rubrik}</h1>
                </Copy>

                <Copy
                  label="Ingress, kärnan i nyheten"
                  category="ton"
                  text={POST.ingress}
                  rationale="Ingressen ger det viktigaste i en eller två meningar, så att en journalist kan använda den direkt. Skriv fakta och siffror, inte värderingar."
                >
                  <p className="text-lede text-ink-secondary mb-4 leading-relaxed max-w-reading">
                    {POST.ingress}
                  </p>
                </Copy>

                <Copy
                  label="Ortsrad, ort, datum och avsändare"
                  category="metadata"
                  text={`Helsingborg, ${formaterDatumLong(POST.datum)}, Öresundskraft AB`}
                  rationale="Ortsraden visar var och när beskedet lämnades och vem som står bakom det. Journalister behöver uppgifterna för att ange källan korrekt. Skriv datumet med månaden i bokstäver."
                >
                  <p className="text-sm text-ink-muted">
                    <strong className="text-ink-secondary">Helsingborg, {formaterDatumLong(POST.datum)}</strong>
                    {", "}
                    Öresundskraft AB
                  </p>
                </Copy>
              </header>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 2. BRÖDTEXT med citat-block ──────────────────────── */
    {
      id: "brodtext",
      label: "Brödtext med framhävt citat",
      variants: [
        {
          key: "default",
          label: "Två till tre stycken och ett citat",
          render: () => (
            <Annotation
              label="Brödtext och citat att använda direkt"
              audience="redaktör"
              rationale="Skriv korta stycken på 80 till 120 ord med det viktigaste först. Lägg till ett citat från ledningen som står för sig självt. Citatet är avskilt från texten så att journalister kan kopiera det utan att få med annat."
            >
              <section className="py-6 border-t border-border-subtle">
                <div className="max-w-reading space-y-5 text-ink-secondary leading-relaxed">
                  <p>
                    Öresundskraft har beslutat om ett nytt prisåtagande för fjärrvärme i
                    Helsingborg och Ängelholm som gäller till och med 2028. Bolagets cirka
                    110 000 fjärrvärmekunder får därmed förutsägbara kostnader i tre år.
                    Priset höjs i genomsnitt med 3,9 procent från 1 januari 2026.
                  </p>
                  <p>
                    Beslutet har fattats efter samråd med kundrepresentanter, näringsliv och
                    fastighetsägare i regionen. Det är en del av bolagets långsiktiga arbete
                    för att hålla nere kostnaderna för uppvärmning, trots ökade investeringar
                    i nätet och i koldioxidinfångning på Filbornaverket.
                  </p>
                </div>

                <Copy
                  label="Citat från vd"
                  category="ton"
                  text="Vi vet att förutsägbara kostnader är viktigare än någonsin. Det här åtagandet ger våra kunder ekonomisk trygghet i tre år framåt, utan att vi behöver kompromissa med klimatomställningen."
                  rationale="Citatet ger beslutet en röst och en motivering som journalister kan återge ordagrant. Det är långt nog att stå för sig självt och kort nog att använda i en artikel. Ange alltid namn och titel."
                >
                  <blockquote className="my-8 max-w-reading border-l-4 border-brand-accent pl-6 py-2">
                    <p className="text-h4 font-medium leading-snug mb-3">
                      "Vi vet att förutsägbara kostnader är viktigare än någonsin. Det här
                      åtagandet ger våra kunder ekonomisk trygghet i tre år framåt, utan att
                      vi behöver kompromissa med klimatomställningen."
                    </p>
                    <footer className="text-sm text-ink-muted">
                      Lars Berg, vd Öresundskraft
                    </footer>
                  </blockquote>
                </Copy>

                <div className="max-w-reading space-y-5 text-ink-secondary leading-relaxed">
                  <p>
                    Den genomsnittliga höjningen på 3,9 procent gäller från årsskiftet och
                    motsvarar cirka 90 kronor per månad för en typisk villa. För hushåll i
                    flerbostadshus blir höjningen lägre i kronor räknat.
                  </p>
                  <p>
                    Prisåtagandet gäller till och med 31 december 2028. Om priset behöver
                    ändras under perioden beslutas det i samråd med Kundrådet och meddelas
                    minst sex månader i förväg.
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
          label: "Bilder att ladda ner och PDF-bilagor",
          render: () => (
            <Annotation
              label="Pressbilder och bilagor att ladda ner"
              audience="user"
              rationale="Journalister behöver bilder i hög upplösning och underlag som faktablad. Varje bild har en egen nedladdningslänk med format och filstorlek, och bilagorna listas med storlek. Inget kräver inloggning eller registrering."
            >
              <section className="py-10 border-t border-border-subtle">
                <Copy
                  label="Bildbank, rubrik"
                  category="rubrik"
                  text="Pressbilder och bilagor"
                  rationale="Rubriken säger exakt vad som finns här. Undvik vaga rubriker som 'Material för media'."
                >
                  <h2 className="text-h3 font-medium mb-4">Pressbilder och bilagor</h2>
                </Copy>
                <Copy
                  label="Bildbank, villkor för användning"
                  category="reassurance"
                  text="Du får använda bilderna fritt när du skriver om Öresundskraft. Ange fotograf där det står."
                  rationale="Journalisten ska inte behöva fråga om lov. Texten säger kort att bilderna är fria att använda och vilket enda krav som gäller. 'Ange fotograf' är tydligare än anglicismen 'foto-credit'."
                >
                  <p className="text-ink-secondary mb-6 max-w-reading">
                    Du får använda bilderna fritt när du skriver om Öresundskraft. Ange fotograf där det står.
                  </p>
                </Copy>

                {/* Bildgrid */}
                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { titel: "Filbornaverket utifrån", credit: "Foto: Anders Pedersen/Öresundskraft", storlek: "JPG · 4,2 MB" },
                    { titel: "Fjärrvärmecentral", credit: "Foto: Öresundskraft", storlek: "JPG · 3,1 MB" },
                    { titel: "Karta över fjärrvärmenätet", credit: "Illustration: Öresundskraft", storlek: "PNG · 1,8 MB" },
                  ].map((b) => (
                    <div key={b.titel} className="rounded-md border border-border-subtle bg-surface overflow-hidden">
                      <div className="bg-tint-info aspect-[4/3] flex items-center justify-center">
                        <Icon name="image" size={40} className="text-ink-muted" />
                      </div>
                      <div className="p-3">
                        <p className="text-sm font-medium mb-0.5">{b.titel}</p>
                        <p className="text-xs text-ink-muted mb-3">{b.credit}</p>
                        {b.titel === "Filbornaverket utifrån" ? (
                          <Copy
                            label="Bildbank, nedladdningslänk"
                            category="cta"
                            text={`Ladda ner (${b.storlek})`}
                            rationale="Verbet säger vad som händer, och format och filstorlek i parentes visar vad journalisten får innan hen klickar. Samma mönster används för alla bilder."
                          >
                            <a
                              href="#"
                              className="inline-flex items-center gap-1.5 text-sm text-brand-accent hover:underline"
                            >
                              <Icon name="download" size={14} />
                              Ladda ner ({b.storlek})
                            </a>
                          </Copy>
                        ) : (
                          <a
                            href="#"
                            className="inline-flex items-center gap-1.5 text-sm text-brand-accent hover:underline"
                          >
                            <Icon name="download" size={14} />
                            Ladda ner ({b.storlek})
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bilagor-lista */}
                <h3 className="text-h5 font-medium mb-3">Bilagor</h3>
                <ul className="divide-y divide-border-subtle border border-border-subtle rounded-md bg-surface max-w-reading">
                  {[
                    { titel: "Prislista fjärrvärme 2026 (faktablad)", typ: "PDF · 248 kB" },
                    { titel: "Pressmeddelandet som PDF", typ: "PDF · 162 kB" },
                    { titel: "Faktablad om Öresundskraft AB 2026", typ: "PDF · 412 kB" },
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

    /* ─── 4. OM ÖRESUNDSKRAFT: standardtext om företaget ───── */
    {
      id: "boilerplate",
      label: "Om Öresundskraft, standardtext",
      variants: [
        {
          key: "default",
          label: "Faktaruta i pressmeddelandeformat",
          render: () => (
            <Annotation
              label="Standardtext om företaget"
              audience="redaktör"
              rationale="Pressmeddelanden avslutas med en kort fast text om bolaget, som journalister kan klistra in direkt. Samma text används i alla pressmeddelanden. Håll siffrorna aktuella (kunder, anställda, område) och uppdatera dem minst en gång per år."
            >
              <section className="py-10 border-t border-border-subtle">
                <div className="rounded-md bg-tint-info p-6 max-w-reading">
                  <Copy
                    label="Standardtext, rubrik"
                    category="metadata"
                    text="Om Öresundskraft"
                    rationale="'Om [företaget]' är den etablerade rubriken för standardtexten. Journalister känner igen den och vet att texten under kan användas som den är."
                  >
                    <p className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-3">
                      Om Öresundskraft
                    </p>
                  </Copy>
                  <p className="text-sm leading-relaxed text-ink-secondary">
                    Öresundskraft är ett kommunalägt energibolag med säte i Helsingborg.
                    Bolaget levererar el, fjärrvärme, fjärrkyla, gas och stadsnät till cirka
                    125 000 kunder i nordvästra Skåne. Verksamheten startade 1892 och bolaget
                    har i dag omkring 400 anställda. Öresundskraft ägs av Helsingborgs och
                    Ängelholms kommuner.
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

    /* ─── 5. DELA OCH TIDIGARE PRESSMEDDELANDEN ─────────────── */
    {
      id: "dela-related",
      label: "Dela och tidigare pressmeddelanden",
      variants: [
        {
          key: "default",
          label: "Delningsknappar och tidigare pressmeddelanden",
          render: () => (
            <Annotation
              label="Dela vidare och läs tidigare besked"
              audience="user"
              rationale="Journalister och partner vill ofta skicka pressmeddelandet vidare, så knapparna för att kopiera, mejla och dela ligger samlade. Listan med tidigare pressmeddelanden ger bakgrund och sammanhang för den som bevakar bolaget."
            >
            <section className="py-8 border-t border-border-subtle">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Copy
                    label="Dela, rubrik"
                    category="rubrik"
                    text="Dela pressmeddelandet"
                    rationale="Rubriken säger vad knapparna gör och vad som delas. 'Dela' ensamt säger inte vad."
                  >
                    <p className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-3">
                      Dela pressmeddelandet
                    </p>
                  </Copy>
                  <Copy
                    label="Dela, knappar"
                    category="cta"
                    text="Kopiera länk · Mejla länken · Dela på LinkedIn"
                    rationale="Alla knappar har verb och objekt, så att det syns vad som händer. Därför 'Mejla länken' i stället för bara 'Mejla' och 'Dela på LinkedIn' i stället för bara 'LinkedIn'."
                  >
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
                  </Copy>
                </div>
                <div>
                  <Copy
                    label="Tidigare pressmeddelanden, länkar"
                    category="metadata"
                    text="Tidigare pressmeddelanden"
                    rationale="Varje länk består av rubrik och datum, aldrig 'Läs mer' eller 'Klicka här'. Då beskriver länken sitt mål även när den läses utan sammanhang, till exempel av en skärmläsare som listar sidans länkar."
                  >
                    <p className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-3">
                      Tidigare pressmeddelanden
                    </p>
                  </Copy>
                  <ul className="space-y-1.5 text-sm">
                    <li><a href="#" className="text-brand-accent hover:underline">Industriklivet beviljar 228 miljoner till CCS, 28 mars 2026</a></li>
                    <li><a href="#" className="text-brand-accent hover:underline">Ny avsiktsförklaring för fossilfri fjärrvärme, 12 feb 2026</a></li>
                    <li><a href="#" className="text-brand-accent hover:underline">Bokslutskommuniké 2025, 30 jan 2026</a></li>
                  </ul>
                </div>
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
        kategori="Pressmeddelande (skiss)"
        syfte="Ett officiellt besked från Öresundskraft som journalister kan citera och använda direkt. Sidan har formell layout, presskontakt som alltid syns på större skärmar, pressbilder att ladda ner och en standardtext om företaget. Den skiljer sig från nyheten (kortare, för kunder) och artikeln (berättande)."
        malgrupp="Främst journalister, politiker och samarbetspartner. I andra hand allmänheten."
        primarHandling="Läsa beskedet, ladda ner bilder eller bilagor, kontakta presschefen och dela vidare."
        ton="Formell, saklig och citerbar. Skriv utan värdeord som en redaktion ändå skulle stryka. Citat från ledningen står för sig själva och är avskilda från texten."
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

      {/* Två kolumner: brödtext till vänster, presskontakt som följer med vid scroll till höger */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-8 lg:mt-2">
        <div className="min-w-0">
          <BlockList pageId="pressmeddelande" blocks={blocks} />
        </div>

        <div className="hidden lg:block pt-2">
          <div className="sticky top-20">
            <Annotation
              label="Presskontakt som alltid syns"
              audience="user"
              rationale="Journalister arbetar under tidspress. Presskontakten följer med när man scrollar, så att namn, telefon och e-post alltid finns nära till hands."
            >
            <aside
              aria-label="Presskontakt"
              className="rounded-md border-2 border-brand-accent bg-surface shadow-md p-5"
            >
              <Copy
                label="Presskontakt, rubrik"
                category="metadata"
                text="Presskontakt"
                rationale="Ett ord som säger vem journalisten ska kontakta. 'Kontakta oss' är för allmänt och 'Press' ensamt säger inte vad rutan innehåller."
              >
                <p className="text-[11px] uppercase tracking-wider text-ink-muted font-medium mb-3">
                  Presskontakt
                </p>
              </Copy>
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
              <Copy
                label="Presskontakt, svarstid"
                category="reassurance"
                text="Vi svarar inom 1 arbetsdag. Är det brådskande? Ring presstjänsten, som svarar dygnet runt."
                rationale="Ett konkret tidslöfte gör att journalisten kan planera sitt arbete. Den som har bråttom får veta att telefonen alltid besvaras."
              >
                <p className="text-xs text-ink-muted leading-snug pt-3 border-t border-border-subtle">
                  Vi svarar inom 1 arbetsdag. Är det brådskande? Ring presstjänsten, som svarar dygnet runt.
                </p>
              </Copy>
            </aside>
            </Annotation>
          </div>
        </div>
      </div>
    </div>
  );
}
