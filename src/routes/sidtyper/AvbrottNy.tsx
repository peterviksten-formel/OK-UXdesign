import { useState } from "react";
import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { AVBROTT, STATUS_META, TYP_LABEL } from "../moduler/avbrott-data";

/**
 * SIDTYP 9 — Avbrottsinformation (ny)
 *
 * UX-driven omstrukturering av dagens avbrottssida.
 *
 * Huvuddrag:
 *  1. Statusfrågan besvaras i hero: "Är det avbrott just nu?" — inte en lång
 *     intro om vad avbrott är. Användaren vet redan vad avbrott är, de vill
 *     veta om det PÅGÅR.
 *  2. Adresskontroll överst: "Är jag påverkad?" med postnummer-sök. Det är
 *     den första frågan en användare i mörkret har — inte "berätta om alla
 *     avbrott i hela Helsingborg".
 *  3. Interaktiv felsökningsguide INNAN kontaktvägar. De flesta "avbrott"
 *     är säkringar/jordfelsbrytare. Ta bort fel från KC-kön genom att låta
 *     användaren diagnosticera själv.
 *  4. Tidslinje per pågående avbrott — när uppdaterad, vad har hänt.
 *     Motverkar "ni gör inget!"-frustration genom synlighet.
 *  5. Avklarade avbrott synliga senaste 7 dagar — transparens + underlag
 *     för ersättningsfrågor.
 */

type Diagnos = {
  id: string;
  fraga: string;
  ja: string | "rapportera";
  nej: string | "rapportera";
};

const DIAGNOS_STEG: Diagnos[] = [
  {
    id: "grannar",
    fraga: "Har dina grannar också strömavbrott?",
    ja: "natverk",
    nej: "propp",
  },
  {
    id: "natverk",
    fraga: "Då är det ett nätavbrott. Står avbrottet listat ovan?",
    ja: "listad",
    nej: "rapportera",
  },
  {
    id: "propp",
    fraga: "Har du kontrollerat säkringarna och jordfelsbrytaren?",
    ja: "proppar-ok",
    nej: "propp-check",
  },
  {
    id: "propp-check",
    fraga: "Leta upp elcentralen och slå tillbaka utlösta säkringar. Fungerar det nu?",
    ja: "fungerar",
    nej: "rapportera",
  },
  {
    id: "proppar-ok",
    fraga: "Har du betalat senaste elräkningen?",
    ja: "rapportera",
    nej: "obetald",
  },
];

const DIAGNOS_SLUT: Record<string, { rubrik: string; text: string; cta?: { label: string; href: string; primary?: boolean } }> = {
  listad: {
    rubrik: "Då vet vi om det.",
    text: "Vi jobbar på att få tillbaka strömmen. Se tidslinjen för uppdateringar. Du behöver inte göra något mer.",
  },
  fungerar: {
    rubrik: "Bra — då var det en utlöst säkring.",
    text: "Om det händer ofta kan det vara värt att kontakta en elektriker för en genomgång.",
  },
  obetald: {
    rubrik: "Kontakta kundservice.",
    text: "Om en räkning är obetald kan leveransen ha stängts av. Logga in på Mina sidor eller ring kundservice.",
    cta: { label: "Till Mina sidor", href: "#" },
  },
  rapportera: {
    rubrik: "Gör felanmälan.",
    text: "Ring felanmälan nedan. Dygnet runt, 042-490 32 00. Ha gärna din adress och fastighetsbeteckning till hands.",
    cta: { label: "Ring 042-490 32 00", href: "tel:0424903200", primary: true },
  },
};

const pagaende = AVBROTT.filter((a) => a.status === "pagaende");
const planerat = AVBROTT.filter((a) => a.status === "planerat");
const avslutat = AVBROTT.filter((a) => a.status === "avslutat");

export function AvbrottNy() {
  const [postnr, setPostnr] = useState("");
  const [sokResultat, setSokResultat] = useState<"tomt" | "trafad" | "inget">("tomt");
  const [openAvbrott, setOpenAvbrott] = useState<string | null>(pagaende[0]?.id ?? null);
  const [diagnosSteg, setDiagnosSteg] = useState<string>("grannar");
  const [diagnosHistorik, setDiagnosHistorik] = useState<string[]>([]);

  function soek() {
    // Fake matchning — postnr som börjar på 252/254 = Helsingborg-område
    if (postnr.startsWith("252") || postnr.startsWith("254")) {
      setSokResultat("trafad");
    } else if (postnr.length >= 5) {
      setSokResultat("inget");
    }
  }

  function diagnosSvara(svar: "ja" | "nej") {
    const steg = DIAGNOS_STEG.find((s) => s.id === diagnosSteg);
    if (!steg) return;
    const next = svar === "ja" ? steg.ja : steg.nej;
    setDiagnosHistorik((h) => [...h, `${steg.fraga} → ${svar === "ja" ? "Ja" : "Nej"}`]);
    if (next in DIAGNOS_SLUT) {
      setDiagnosSteg(`slut:${next}`);
    } else {
      setDiagnosSteg(next);
    }
  }

  function diagnosReset() {
    setDiagnosSteg("grannar");
    setDiagnosHistorik([]);
  }

  const harPagaende = pagaende.length > 0;

  const blocks: BlockDef[] = [
    /* ─── 1. STATUS-HERO ────────────────────────────────────────── */
    {
      id: "status",
      label: "Status-hero",
      variants: [
        {
          key: "dynamisk",
          label: "Dynamisk — röd/grön baserat på status",
          render: () => (
            <Annotation
              label="Status-hero: svar på första frågan"
              audience="user"
              rationale="Användaren kommer hit med EN fråga: 'Är det avbrott?' Svaret ska ta <1 sekund att läsa. Dynamisk färg och rubrik gör det binärt. Ingen intro om 'vad är ett avbrott' — det vet alla som landar här."
            >
              <section
                className={`rounded-lg my-6 p-6 sm:p-10 ${
                  harPagaende
                    ? "bg-tint-highlight border border-brand-highlight"
                    : "bg-tint-info border border-brand-accent/40"
                }`}
                aria-live="polite"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      harPagaende ? "bg-brand-highlight" : "bg-brand-accent"
                    }`}
                  >
                    <Icon
                      name={harPagaende ? "bolt" : "check"}
                      size={28}
                      className="text-white"
                      filled={harPagaende}
                    />
                  </div>
                  <div className="flex-1">
                    <Copy
                      label="H1 — binärt statussvar"
                      category="rubrik"
                      text={harPagaende ? `${pagaende.length} pågående avbrott just nu` : "Allt fungerar just nu"}
                      rationale="Direkt svar, inte beskrivning. Siffran först om det finns avbrott — den är det läsaren letar efter."
                    >
                      <h1 className="text-h1 leading-tight mb-2">
                        {harPagaende
                          ? `${pagaende.length} pågående avbrott just nu`
                          : "Allt fungerar just nu"}
                      </h1>
                    </Copy>
                    <p className="text-lede text-ink-secondary mb-6 max-w-reading">
                      {harPagaende
                        ? `${pagaende.reduce((n, a) => n + a.berordaKunder, 0).toLocaleString("sv-SE")} kunder berörs. Vi jobbar på att få igång strömmen så snabbt som möjligt.`
                        : "Inga kända avbrott i vårt elnät eller fjärrvärmenät. Se kommande planerade arbeten nedan."}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="tel:0424903200"
                        className="inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-5 py-3 rounded hover:opacity-90 transition-opacity"
                      >
                        <Icon name="call" size={18} />
                        Felanmälan 042-490 32 00
                      </a>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 border border-border-strong text-ink-secondary font-medium px-5 py-3 rounded hover:bg-surface transition-colors"
                      >
                        <Icon name="sms" size={18} />
                        Prenumerera på SMS-avisering
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </Annotation>
          ),
        },
        {
          key: "stor-storning",
          label: "Stor störning — framhävt varningsläge",
          render: () => (
            <Annotation
              label="Stor störning-hero: aktiverar vid kris"
              audience="design"
              rationale="Används vid stora störningar (>1000 kunder, flera timmar). Hela sidan signalerar akutläge, inkl mörkare bakgrund och fetare typografi. Normal-läget är för vardagsdrift, detta är för kris."
            >
              <section className="rounded-lg my-6 p-6 sm:p-10 bg-brand-highlight text-white">
                <div className="flex items-start gap-4">
                  <Icon name="warning" size={40} className="shrink-0" filled />
                  <div>
                    <p className="uppercase text-xs font-bold tracking-wider opacity-90 mb-1">
                      Stor driftstörning
                    </p>
                    <h1 className="text-display leading-tight mb-3">Omfattande strömavbrott</h1>
                    <p className="text-lede opacity-95 mb-5 max-w-reading">
                      Ovanligt stor störning som påverkar flera områden. Vi uppdaterar här och
                      via SMS till prenumeranter. Undvik att ringa kundservice om ärendet inte är
                      akut — kötiderna är långa.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="#sms"
                        className="inline-flex items-center gap-2 bg-white text-brand-primary font-medium px-5 py-3 rounded hover:opacity-90"
                      >
                        <Icon name="sms" size={18} />
                        Få SMS när det är klart
                      </a>
                      <a
                        href="tel:0424903200"
                        className="inline-flex items-center gap-2 border-2 border-white text-white font-medium px-5 py-3 rounded hover:bg-white/10"
                      >
                        <Icon name="call" size={18} />
                        Akut felanmälan
                      </a>
                    </div>
                  </div>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 2. ADRESSKONTROLL — "är jag påverkad?" ────────────────── */
    {
      id: "adresskontroll",
      label: "Adresskontroll — postnummer-sök",
      variants: [
        {
          key: "postnr",
          label: "Postnummer-sök med direktsvar",
          render: () => (
            <Annotation
              label="Adresskontroll: 'är jag påverkad?'"
              audience="user"
              rationale="Den viktigaste frågan som användaren i mörkret har är INTE 'vilka avbrott finns i hela Helsingborg?' utan 'är det avbrott just där jag bor?'. Postnummer-sök ger det svaret på en klickning. Cut mercilessly: många andra avbrottssidor saknar detta helt."
            >
              <section className="py-8 border-t border-border-subtle">
                <Copy
                  label="Sektionsrubrik — adresskontroll"
                  category="rubrik"
                  text="Är du påverkad?"
                  rationale="Du-form, direkt fråga. 'Kolla status för din adress' är vagt; 'Är du påverkad?' är binärt och kräver handling."
                >
                  <h2 className="text-h3 font-medium mb-2">Är du påverkad?</h2>
                </Copy>
                <p className="text-ink-secondary mb-4 max-w-reading">
                  Skriv in ditt postnummer så ser du direkt om ditt område har ett pågående eller
                  planerat avbrott.
                </p>
                <form
                  onSubmit={(e) => { e.preventDefault(); soek(); }}
                  className="flex flex-wrap gap-2 max-w-reading"
                  role="search"
                >
                  <label htmlFor="postnr" className="sr-only">Postnummer</label>
                  <input
                    id="postnr"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9 ]*"
                    maxLength={6}
                    value={postnr}
                    onChange={(e) => { setPostnr(e.target.value); setSokResultat("tomt"); }}
                    placeholder="Ex. 252 25"
                    className="flex-1 min-w-[160px] border border-border-strong rounded-md px-4 py-3 bg-surface text-base focus:border-brand-accent focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={postnr.length < 5}
                    className="bg-brand-primary text-ink-onbrand font-medium px-5 py-3 rounded hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Kontrollera
                  </button>
                </form>
                {sokResultat !== "tomt" && (
                  <div
                    role="status"
                    aria-live="polite"
                    className={`mt-4 p-4 rounded-md border-l-4 ${
                      sokResultat === "trafad"
                        ? "bg-tint-highlight border-brand-highlight"
                        : "bg-tint-info border-brand-accent"
                    }`}
                  >
                    {sokResultat === "trafad" ? (
                      <div className="flex items-start gap-3">
                        <Icon name="bolt" size={24} className="text-brand-highlight" filled />
                        <div>
                          <p className="font-medium">Ja, ditt område har ett pågående avbrott.</p>
                          <p className="text-sm text-ink-secondary mt-1">
                            {pagaende[0]?.rubrik} · Beräknad klar {pagaende[0]?.slutBeraknat}.
                          </p>
                          <a
                            href="#avbrott"
                            className="inline-flex items-center gap-1 text-sm text-brand-primary font-medium mt-2 hover:underline"
                          >
                            Se detaljer och tidslinje
                            <Icon name="arrow_forward" size={14} />
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <Icon name="check_circle" size={24} className="text-brand-accent" />
                        <div>
                          <p className="font-medium">Inga kända avbrott i ditt område.</p>
                          <p className="text-sm text-ink-secondary mt-1">
                            Har du ändå strömbortfall? Gå genom felsökningen nedan innan du ringer
                            felanmälan.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <p className="text-xs text-ink-muted mt-3">
                  Demo: prova 252 25 för träff, annars för ej träffat område.
                </p>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 3. PÅGÅENDE AVBROTT — med tidslinje ──────────────────── */
    {
      id: "pagaende",
      label: "Pågående avbrott",
      variants: [
        {
          key: "med-tidslinje",
          label: "Expanderbara kort med uppdateringstidslinje",
          render: () => (
            <Annotation
              label="Pågående: tidslinje per avbrott"
              audience="user"
              rationale="Workshop-observation: 'ni gör inget'-frustration kommer från otydlighet kring framsteg. Tidslinjen visar varje steg (felanmält kl 08:22 → team på plats 08:45 → reparation 09:30). Gör arbetet synligt."
            >
              <section id="avbrott" className="py-10 border-t border-border-subtle">
                <h2 className="text-h2 mb-2">Pågående avbrott</h2>
                <p className="text-ink-secondary mb-6">
                  {pagaende.length} {pagaende.length === 1 ? "avbrott" : "avbrott"} just nu.
                </p>
                {pagaende.length === 0 ? (
                  <p className="text-ink-muted italic">Inga pågående avbrott.</p>
                ) : (
                  <div className="space-y-3">
                    {pagaende.map((a) => {
                      const isOpen = openAvbrott === a.id;
                      const meta = STATUS_META[a.status];
                      return (
                        <article
                          key={a.id}
                          className={`rounded-md border-2 bg-surface overflow-hidden ${
                            isOpen ? "border-brand-highlight" : "border-border-subtle hover:border-brand-highlight/60"
                          } transition-colors`}
                        >
                          <button
                            type="button"
                            onClick={() => setOpenAvbrott(isOpen ? null : a.id)}
                            className="w-full text-left px-5 py-4 flex items-center gap-3"
                            aria-expanded={isOpen}
                          >
                            <span className={`w-2.5 h-2.5 rounded-full ${meta.dotColor} animate-pulse`} />
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium">{a.rubrik}</h3>
                              <p className="text-sm text-ink-secondary">
                                {a.omrade} · {a.berordaKunder} kunder berörs
                              </p>
                            </div>
                            <span className="hidden sm:block text-right text-sm">
                              <span className="block text-ink-muted text-xs">Beräknad klar</span>
                              <span className="font-medium">{a.slutBeraknat?.split(" ")[1] ?? "–"}</span>
                            </span>
                            <Icon
                              name="expand_more"
                              size={20}
                              className={`text-ink-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                            />
                          </button>
                          {isOpen && (
                            <div className="px-5 pb-5 border-t border-border-subtle pt-4">
                              <dl className="grid sm:grid-cols-3 gap-4 mb-5 text-sm">
                                <div>
                                  <dt className="text-xs text-ink-muted uppercase tracking-wider">Typ</dt>
                                  <dd className="font-medium">{TYP_LABEL[a.typ]}</dd>
                                </div>
                                <div>
                                  <dt className="text-xs text-ink-muted uppercase tracking-wider">Startade</dt>
                                  <dd className="font-medium">{a.start}</dd>
                                </div>
                                <div>
                                  <dt className="text-xs text-ink-muted uppercase tracking-wider">Beräknat slut</dt>
                                  <dd className="font-medium">{a.slutBeraknat ?? "Meddelas senare"}</dd>
                                </div>
                              </dl>
                              <p className="text-sm text-ink-secondary mb-5">{a.beskrivning}</p>
                              {a.uppdateringar && a.uppdateringar.length > 0 && (
                                <div>
                                  <h4 className="text-xs uppercase tracking-wider font-medium text-ink-muted mb-2">
                                    Uppdateringar
                                  </h4>
                                  <ol className="space-y-3">
                                    {a.uppdateringar.map((u, i) => (
                                      <li key={i} className="flex gap-3">
                                        <div className="flex flex-col items-center">
                                          <span
                                            className={`w-2 h-2 rounded-full mt-1.5 ${
                                              i === 0 ? "bg-brand-highlight" : "bg-border-strong"
                                            }`}
                                          />
                                          {i < (a.uppdateringar?.length ?? 0) - 1 && (
                                            <span className="w-px flex-1 bg-border-subtle my-1" />
                                          )}
                                        </div>
                                        <div className="pb-2">
                                          <span className="text-xs text-ink-muted font-medium">{u.tid}</span>
                                          <p className="text-sm">{u.text}</p>
                                        </div>
                                      </li>
                                    ))}
                                  </ol>
                                </div>
                              )}
                            </div>
                          )}
                        </article>
                      );
                    })}
                  </div>
                )}
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 4. PLANERADE AVBROTT ──────────────────────────────────── */
    {
      id: "planerade",
      label: "Planerade avbrott",
      variants: [
        {
          key: "lista",
          label: "Lista — kommande veckan",
          render: () => (
            <Annotation
              label="Planerade avbrott"
              audience="user"
              rationale="Framåtblickande. Kompakta rader — datum, område, orsak. SMS-prenumeration direkt i blocket så användaren kan välja att få notis när det gäller dem."
            >
              <section className="py-10 border-t border-border-subtle">
                <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
                  <div>
                    <h2 className="text-h2">Planerade avbrott</h2>
                    <p className="text-ink-secondary text-sm">Kommande underhåll och förstärkningsarbeten</p>
                  </div>
                  <a
                    href="#sms"
                    className="text-sm text-brand-accent hover:underline inline-flex items-center gap-1"
                  >
                    <Icon name="sms" size={14} />
                    Få SMS när det gäller mig
                  </a>
                </div>
                {planerat.length === 0 ? (
                  <p className="text-ink-muted italic">Inga planerade avbrott denna veckan.</p>
                ) : (
                  <ul className="divide-y divide-border-subtle rounded-md border border-border-subtle bg-surface">
                    {planerat.map((a) => (
                      <li key={a.id} className="p-4 flex flex-wrap items-start gap-4">
                        <div className="shrink-0 w-[72px] text-center">
                          <p className="text-xs uppercase text-ink-muted font-medium">
                            {new Date(a.start.replace(" ", "T")).toLocaleDateString("sv-SE", {
                              day: "numeric",
                              month: "short",
                            })}
                          </p>
                          <p className="text-sm text-ink-secondary">{a.start.split(" ")[1]?.slice(0, 5)}</p>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium">{a.rubrik}</h3>
                          <p className="text-sm text-ink-secondary">{a.omrade} · {a.berordaKunder} kunder</p>
                          <p className="text-sm text-ink-secondary mt-1">{a.beskrivning}</p>
                        </div>
                        <span className="text-xs uppercase tracking-wider font-medium px-2 py-1 rounded bg-tint-notice text-brand-primary">
                          {TYP_LABEL[a.typ]}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 5. FELSÖKNINGSGUIDE — self-help INNAN felanmälan ──────── */
    {
      id: "felsokning",
      label: "Felsökningsguide",
      variants: [
        {
          key: "wizard",
          label: "Interaktiv wizard — steg för steg",
          render: () => {
            const slut = diagnosSteg.startsWith("slut:") ? DIAGNOS_SLUT[diagnosSteg.replace("slut:", "")] : null;
            const aktiv = DIAGNOS_STEG.find((s) => s.id === diagnosSteg);
            return (
              <Annotation
                label="Felsökning: wizard som minskar felanmälningar"
                audience="user"
                rationale="De flesta 'strömavbrott' är utlösta säkringar eller jordfelsbrytare. En wizard som frågar 'har grannarna också det?' → 'har du kollat säkringarna?' löser majoriteten utan att belasta KC. Workshop: 'Knappar för vad du kan göra själv'."
              >
                <section className="py-10 border-t border-border-subtle">
                  <Copy
                    label="Sektionsrubrik — felsökning"
                    category="rubrik"
                    text="Kolla själv först"
                    rationale="Direkt uppmaning, inte beskrivning. 'Felsökningsguide' är en kategori; 'Kolla själv först' är en handling och gör syftet tydligt."
                  >
                    <h2 className="text-h3 font-medium mb-2">Kolla själv först</h2>
                  </Copy>
                  <p className="text-ink-secondary mb-6 max-w-reading">
                    De flesta strömproblem beror på utlösta säkringar eller jordfelsbrytare. Den
                    här guiden tar en minut och kan spara dig en onödig felanmälan.
                  </p>
                  <div className="rounded-md border-2 border-brand-accent bg-surface p-5 sm:p-6 max-w-reading">
                    {diagnosHistorik.length > 0 && (
                      <ol className="mb-4 space-y-1 text-xs text-ink-muted">
                        {diagnosHistorik.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Icon name="check" size={12} className="text-brand-accent mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ol>
                    )}

                    {aktiv && !slut && (
                      <>
                        <p className="text-xs uppercase tracking-wider font-medium text-brand-accent mb-2">
                          Fråga {diagnosHistorik.length + 1}
                        </p>
                        <p className="font-medium text-h5 mb-4">{aktiv.fraga}</p>
                        <div className="flex gap-3">
                          <button
                            type="button"
                            onClick={() => diagnosSvara("ja")}
                            className="flex-1 bg-brand-primary text-ink-onbrand font-medium py-3 rounded hover:opacity-90"
                          >
                            Ja
                          </button>
                          <button
                            type="button"
                            onClick={() => diagnosSvara("nej")}
                            className="flex-1 border border-border-strong text-brand-primary font-medium py-3 rounded hover:bg-tint-info"
                          >
                            Nej
                          </button>
                        </div>
                      </>
                    )}

                    {slut && (
                      <div>
                        <p className="text-xs uppercase tracking-wider font-medium text-brand-accent mb-2">
                          Resultat
                        </p>
                        <h3 className="font-medium text-h5 mb-2">{slut.rubrik}</h3>
                        <p className="text-sm text-ink-secondary mb-4 leading-relaxed">{slut.text}</p>
                        <div className="flex flex-wrap gap-3">
                          {slut.cta && (
                            <a
                              href={slut.cta.href}
                              className={`inline-flex items-center gap-2 font-medium px-5 py-2.5 rounded transition-opacity ${
                                slut.cta.primary
                                  ? "bg-brand-primary text-ink-onbrand hover:opacity-90"
                                  : "border border-border-strong text-brand-primary hover:bg-tint-info"
                              }`}
                            >
                              {slut.cta.primary && <Icon name="call" size={16} />}
                              {slut.cta.label}
                            </a>
                          )}
                          <button
                            type="button"
                            onClick={diagnosReset}
                            className="inline-flex items-center gap-1.5 text-sm text-ink-secondary hover:text-brand-accent px-3 py-2.5"
                          >
                            <Icon name="restart_alt" size={16} />
                            Börja om
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </Annotation>
            );
          },
        },
        {
          key: "statisk",
          label: "Statisk lista — 5 steg",
          render: () => (
            <Annotation
              label="Felsökning (statisk): checklista istället för wizard"
              audience="design"
              rationale="Alternativ för användare som föredrar att scanna allt på en gång istället för att klicka sig genom. Samma innehåll, annan interaktion. Tillgänglighet: fungerar helt utan JavaScript."
            >
              <section className="py-10 border-t border-border-subtle">
                <h2 className="text-h3 font-medium mb-2">Kolla själv först</h2>
                <p className="text-ink-secondary mb-6 max-w-reading">
                  Gå igenom listan innan du gör felanmälan. De flesta strömproblem löser du på en minut.
                </p>
                <ol className="space-y-4 max-w-reading">
                  {[
                    { t: "Har grannarna också avbrott?", d: "Om ja: det är ett nätavbrott, kolla listan ovan eller ring felanmälan." },
                    { t: "Kolla jordfelsbrytaren", d: "Den sitter i elcentralen. Slå om den om den är nedslagen." },
                    { t: "Kolla utlösta säkringar", d: "Slå tillbaka utlösta säkringar i elcentralen. Sker det ofta, kontakta elektriker." },
                    { t: "Kolla om räkningen är betald", d: "Obetalda räkningar kan leda till avstängning. Logga in på Mina sidor." },
                    { t: "Gör felanmälan", d: "Om inget ovan hjälpt: 042-490 32 00, dygnet runt. Ha adress och fastighetsbeteckning redo." },
                  ].map((s, i) => (
                    <li key={s.t} className="flex gap-4">
                      <span className="shrink-0 w-8 h-8 rounded-full bg-brand-primary text-white grid place-items-center font-bold text-sm">
                        {i + 1}
                      </span>
                      <div>
                        <h3 className="font-medium">{s.t}</h3>
                        <p className="text-sm text-ink-secondary">{s.d}</p>
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

    /* ─── 6. FELANMÄLAN-BANNER ──────────────────────────────────── */
    {
      id: "felanmalan",
      label: "Felanmälan — kontaktvägar",
      variants: [
        {
          key: "telefon-primar",
          label: "Telefon primär (akuta ärenden)",
          render: () => (
            <Annotation
              label="Felanmälan: telefon som primär"
              audience="user"
              rationale="Vid elnätsfel är telefon snabbast — teknikern behöver ofta fråga vidare. Chatt och formulär är sekundära, för icke-akuta. Dygnet-runt-tillgänglighet på telefonen är en trovärdighetssignal."
            >
              <section className="py-10 border-t border-border-subtle">
                <div className="rounded-lg bg-brand-primary text-white p-6 sm:p-8 grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <h2 className="text-h2 text-white mb-2">Fortfarande ström borta?</h2>
                    <p className="opacity-90 mb-4 max-w-reading">
                      Om felsökningen inte hjälpte — ring oss. Vi svarar dygnet runt när det
                      gäller avbrott och akuta elnätsfel.
                    </p>
                    <a
                      href="tel:0424903200"
                      className="inline-flex items-center gap-3 bg-white text-brand-primary font-medium px-6 py-3.5 rounded hover:opacity-90 text-lg"
                    >
                      <Icon name="call" size={22} />
                      042-490 32 00
                    </a>
                    <p className="text-xs opacity-80 mt-2">Dygnet runt · Alla dagar</p>
                  </div>
                  <div className="bg-white/10 rounded-md p-5">
                    <p className="text-xs uppercase tracking-wider font-medium mb-3 opacity-80">
                      Ha redo när du ringer:
                    </p>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Din adress (gata + postnummer)",
                        "Fastighetsbeteckning om du har",
                        "Om det är el, fjärrvärme eller fiber",
                        "Om grannarna också är drabbade",
                      ].map((s) => (
                        <li key={s} className="flex items-center gap-2">
                          <Icon name="check" size={16} />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 7. AVKLARADE AVBROTT ──────────────────────────────────── */
    {
      id: "avklarade",
      label: "Avklarade avbrott — senaste 7 dagar",
      variants: [
        {
          key: "kollapsbar",
          label: "Kollapsbar lista",
          render: () => (
            <Annotation
              label="Avklarade: transparens + ersättningsunderlag"
              audience="redaktör"
              rationale="Inte huvudfokus men viktig för: (a) transparens — historik synlig, (b) ersättningsfrågor — användaren kan själv se tidsstämplar. Kollapsbar så den inte dominerar layouten."
            >
              <section className="py-10 border-t border-border-subtle">
                <details className="group">
                  <summary className="cursor-pointer list-none flex items-center gap-3 font-medium">
                    <Icon
                      name="expand_more"
                      size={20}
                      className="text-ink-muted group-open:rotate-180 transition-transform"
                    />
                    <h2 className="text-h4">
                      Avklarade avbrott senaste 7 dagar ({avslutat.length})
                    </h2>
                  </summary>
                  <ul className="mt-4 divide-y divide-border-subtle rounded-md border border-border-subtle bg-surface">
                    {avslutat.map((a) => (
                      <li key={a.id} className="p-4 flex flex-wrap items-center gap-3 text-sm">
                        <span className="w-2 h-2 rounded-full bg-green-500" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium">{a.rubrik}</p>
                          <p className="text-ink-muted text-xs">
                            {a.omrade} · {a.berordaKunder} kunder · {a.start} → {a.slutFaktiskt}
                          </p>
                        </div>
                        <span className="text-xs uppercase tracking-wider font-medium px-2 py-0.5 rounded bg-tint-info text-brand-primary">
                          {TYP_LABEL[a.typ]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </details>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 8. BRA ATT VETA — ersättning, SMS, grävarbeten ──────── */
    {
      id: "bra-att-veta",
      label: "Bra att veta — ersättning, SMS, grävarbeten",
      variants: [
        {
          key: "tre-kort",
          label: "Tre kompakta kort",
          render: () => (
            <Annotation
              label="Bra att veta-block"
              audience="redaktör"
              rationale="Behåller den struktur ÖK-sidan har idag men strippar bort marknadsspråk. Ersättning, SMS-avisering och 'Här gräver vi' som tre likvärdiga ingångar."
            >
              <section className="py-10 border-t border-border-subtle">
                <h2 className="text-h3 font-medium mb-6">Bra att veta</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    {
                      ikon: "paid",
                      rubrik: "Ersättning vid långt avbrott",
                      text: "Avbrott över 12 timmar ger rätt till ersättning enligt ellagen. Vi kontaktar berörda automatiskt.",
                      cta: "Läs om ersättning",
                    },
                    {
                      ikon: "sms",
                      rubrik: "Prenumerera på SMS",
                      text: "Få besked vid start, uppdatering och slut på avbrott i ditt område.",
                      cta: "Registrera nummer",
                    },
                    {
                      ikon: "construction",
                      rubrik: "Här gräver vi just nu",
                      text: "Karta över pågående och kommande grävarbeten i Helsingborg och Ängelholm.",
                      cta: "Se karta",
                    },
                  ].map((k) => (
                    <a
                      key={k.rubrik}
                      href="#"
                      className="group p-5 rounded-md border border-border-subtle bg-surface hover:border-brand-accent hover:shadow-sm transition-all flex flex-col"
                    >
                      <Icon name={k.ikon} size={24} className="text-brand-accent mb-3" />
                      <h3 className="font-medium mb-2 group-hover:text-brand-accent">{k.rubrik}</h3>
                      <p className="text-sm text-ink-secondary mb-4 flex-1">{k.text}</p>
                      <span className="text-sm text-brand-accent inline-flex items-center gap-1">
                        {k.cta}
                        <Icon name="arrow_forward" size={14} />
                      </span>
                    </a>
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
        kategori="Avbrottsinformation (Sidtyp 9 — ny)"
        syfte="Svara på 'är det avbrott i mitt område?' på under 5 sekunder, minska felanmälningar via self-service-diagnos, och göra arbetsframsteg synligt via tidslinjer."
        malgrupp="Kund med akut strömbortfall eller nyss fått SMS om planerat arbete. Ofta stressad, mobil, distraherad — fem sekunder av uppmärksamhet."
        primarHandling="Skriv in postnummer och se status ELLER gå genom felsökningen och lös själv ELLER ring felanmälan."
        ton="Saklig, direkt, transparent om tidsplan och osäkerhet. Inga marknadsfraser. Pågående avbrott får röd accent, lugnt grönt när det inte är något."
      />

      <div className="flex items-center justify-between pt-6">
        <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent">
          ← Översikt
        </Link>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-sm text-ink-secondary hover:text-brand-accent"
        >
          <Icon name="person" size={16} />
          Logga in på Mina sidor
        </a>
      </div>

      <nav aria-label="Breadcrumb" className="text-xs text-ink-muted mt-4 mb-2">
        <ol className="flex gap-1">
          <li><a href="#" className="hover:text-brand-accent">Privat</a></li>
          <li aria-hidden="true">›</li>
          <li aria-current="page" className="font-medium text-ink">Avbrottsinformation</li>
        </ol>
      </nav>

      <BlockList pageId="avbrott-ny" blocks={blocks} />
    </div>
  );
}
