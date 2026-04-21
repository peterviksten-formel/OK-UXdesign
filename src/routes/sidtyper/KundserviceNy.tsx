import { useState } from "react";
import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { Icon } from "../../components/Icon";
import { KATEGORIER, type KategoriId } from "../moduler/kundservice-data";

/**
 * SIDTYP 8 — Kundservice (ny, UX-skill-driven)
 *
 * Ersätter dagens separata KC-sida + Kontakta-oss-sida med EN sida.
 *
 * UX-beslut drivna av:
 *  - Workshop-noter: "Alla kontaktsätt på samma sida", "Snabbknappar för
 *    vanliga ärenden", "Tydlig knapp till Mina sidor", "Nå snabb avbrottsinfo
 *    direkt från KC-sida", "Bra om man kunde beställa samtal".
 *  - ux-web-design-skill: outcome först (användaren ska hitta hjälp snabbt),
 *    alla kontaktvägar synliga samtidigt (recognition > recall), KC-belastning
 *    som systemstatus (visibility of system status), snabbknappar över triage
 *    (edit aggressively — self-service först).
 *  - Konkurrentreferenser: ICA Banken (pill-snabbknappar), Folksam
 *    ("just nu frågar många om"), Vattenfall ("Längre kötider"-banner),
 *    Länsförsäkringar (öppettider per kanal).
 */

const TOP_INTENTS = [
  { ikon: "home", label: "Jag ska flytta", href: "#" },
  { ikon: "description", label: "Fråga om fakturan", href: "#" },
  { ikon: "edit", label: "Teckna elavtal", href: "/moduler/elavtal-jamfor" },
  { ikon: "sync", label: "Byta elavtal", href: "#" },
  { ikon: "bolt", label: "Avbrott just nu", href: "/moduler/avbrottslista" },
  { ikon: "speed", label: "Rapportera mätarställning", href: "#" },
];

const POPULARA_FRAGOR_JUST_NU = [
  { q: "Hur säger jag upp mitt elavtal?", href: "#" },
  { q: "Vilket elavtal passar mig bäst?", href: "#" },
  { q: "Varför är min faktura högre än vanligt?", href: "#" },
  { q: "Hur rapporterar jag mätarställning?", href: "#" },
  { q: "Vad är skillnaden mellan elnät och elhandel?", href: "#" },
];

const MINA_SIDOR_SHORTCUTS = [
  "Se fakturor",
  "Rapportera mätarställning",
  "Ändra betalsätt",
  "Byta elavtal",
  "Ändra adress",
];

export function KundserviceNy() {
  const [activeKat, setActiveKat] = useState<KategoriId | null>(null);
  const kategori = activeKat ? KATEGORIER.find((k) => k.id === activeKat) : null;

  const blocks: BlockDef[] = [
    /* ─── 1. STATUSBANNER — live belastning ─────────────────────── */
    {
      id: "status",
      label: "Statusbanner — KC-belastning just nu",
      variants: [
        {
          key: "normal",
          label: "Normal kötid",
          render: () => (
            <Annotation
              label="Statusbanner: normal drift"
              audience="user"
              rationale="Visibility of system status (Nielsen H1). Workshop-önskan: 'Nå snabb avbrottsinfo direkt från KC-sida'. Även när allt är normalt ska statusen kommuniceras — det bygger förtroende att det finns en kanal för informationen."
            >
              <section className="pt-4">
                <div className="rounded-md bg-tint-info border-l-4 border-brand-accent px-4 py-3 flex items-center gap-3 text-sm">
                  <Icon name="check_circle" size={20} className="text-brand-accent" />
                  <span>
                    <strong>Allt normalt just nu.</strong> Kort kötid i chatt och telefon. Inga kända avbrott.
                  </span>
                </div>
              </section>
            </Annotation>
          ),
        },
        {
          key: "langre",
          label: "Längre kötider",
          render: () => (
            <Annotation
              label="Statusbanner: längre kötider"
              audience="user"
              rationale="Vattenfall-inspirerat: lugn ton, pekar på Mina sidor som snabbare alternativ. Inte en ursäkt — ett erbjudande om snabbare väg."
            >
              <section className="pt-4">
                <div className="rounded-md bg-tint-notice border-l-4 border-brand-highlight px-4 py-3 flex items-center gap-3 text-sm">
                  <Icon name="schedule" size={20} className="text-brand-highlight" />
                  <span className="flex-1">
                    <strong>Längre kötider just nu.</strong> Många ärenden går att lösa själv via{" "}
                    <a href="#" className="text-brand-primary font-medium underline underline-offset-2">Mina sidor</a>{" "}
                    — det tar 1 minut istället för att vänta i kö.
                  </span>
                </div>
              </section>
            </Annotation>
          ),
        },
        {
          key: "avbrott",
          label: "Avbrott pågår",
          render: () => (
            <Annotation
              label="Statusbanner: pågående avbrott"
              audience="user"
              rationale="Vid avbrott ska användaren INTE gå via kundservice — de ska se status direkt. Banner:n lyfter länken till avbrottslistan så att KC inte överbelastas av folk som vill veta 'finns det ett avbrott?'"
            >
              <section className="pt-4">
                <div className="rounded-md bg-tint-highlight border-l-4 border-brand-highlight px-4 py-3 flex items-center gap-3 text-sm">
                  <Icon name="bolt" size={20} className="text-brand-highlight" filled />
                  <span className="flex-1">
                    <strong>Avbrott pågår i ditt område.</strong> Vi jobbar på att få tillbaka strömmen.
                  </span>
                  <Link
                    to="/moduler/avbrottslista"
                    className="inline-flex items-center gap-1.5 bg-brand-primary text-white font-medium px-3 py-1.5 rounded text-xs hover:opacity-90"
                  >
                    Se status
                    <Icon name="arrow_forward" size={14} />
                  </Link>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 2. HERO — fråga + sök ─────────────────────────────────── */
    {
      id: "hero",
      label: "Hero",
      variants: [
        {
          key: "sok-first",
          label: "Sök-first — stort sökfält",
          render: () => (
            <Annotation
              label="Hero: fråga + sök"
              audience="user"
              rationale="H1 är en användarfråga, inte ett varumärkesord ('Kundservice'). Folksam-stil: sök dominerar. 70% av KC-besökare kommer med en specifik fråga — sök ska vara det första de kan göra, inte klicka sig genom en meny."
            >
              <section className="py-10 sm:py-14">
                <Copy
                  label="H1 — användarfråga"
                  category="rubrik"
                  text="Vad behöver du hjälp med?"
                  rationale="Direkt fråga till användaren. 'Kundservice' som rubrik säger vad sidan är; 'Vad behöver du hjälp med?' säger vad användaren kan göra. Matchar det mentala tillståndet när man landar hit — man har ett problem."
                >
                  <h1 className="text-display leading-tight mb-2">Vad behöver du hjälp med?</h1>
                </Copy>
                <p className="text-lede text-ink-secondary mb-6 max-w-reading">
                  Sök bland svar, välj ett vanligt ärende, eller kontakta oss direkt.
                </p>

                <Copy
                  label="Sökfält"
                  category="cta"
                  text="Sök bland frågor och svar"
                  rationale="Placeholder på sökfältet säger både vad man kan göra och vart resultatet kommer ifrån. Inte bara 'Sök' — det är för vagt."
                >
                  <form
                    role="search"
                    onSubmit={(e) => e.preventDefault()}
                    className="flex gap-2 max-w-reading"
                  >
                    <div className="flex-1 relative">
                      <Icon
                        name="search"
                        size={20}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none"
                      />
                      <input
                        type="search"
                        placeholder="Sök bland frågor och svar"
                        className="w-full border border-border-strong rounded-md pl-10 pr-3 py-3 text-base bg-surface focus:border-brand-accent focus:outline-none"
                        aria-label="Sök bland frågor och svar"
                      />
                    </div>
                    <button
                      type="submit"
                      className="bg-brand-primary text-ink-onbrand font-medium px-5 py-3 rounded hover:opacity-90"
                    >
                      Sök
                    </button>
                  </form>
                </Copy>
              </section>
            </Annotation>
          ),
        },
        {
          key: "intent-first",
          label: "Intent-first — utan sök",
          render: () => (
            <Annotation
              label="Hero (alt): direkt till snabbknappar"
              audience="design"
              rationale="Alternativ om data visar att användare inte söker. Sparar vertikal yta och sätter fokus på snabbknapparna direkt. Sök flyttas till sticky header eller tas bort helt."
            >
              <section className="py-8 sm:py-10">
                <h1 className="text-h1 leading-tight mb-3">Vad behöver du hjälp med?</h1>
                <p className="text-lede text-ink-secondary max-w-reading">
                  Välj ett vanligt ärende nedan, eller kontakta oss direkt.
                </p>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 3. SNABBKNAPPAR — vanliga ärenden ─────────────────────── */
    {
      id: "snabb",
      label: "Snabbknappar — topp ärenden",
      variants: [
        {
          key: "pills",
          label: "Pill-knappar (ICA-stil)",
          render: () => (
            <Annotation
              label="Snabbknappar: topp ärenden"
              audience="user"
              rationale="Workshop-önskan: 'snabbknappar för flytt, fel, faktura'. Placerad ABOVE the fold, FÖRE triage-modulen. En klick tar användaren dit — inte två. ICA Banken-stil men i kort-format för att få plats med ikon + label."
            >
              <section className="py-8 border-t border-border-subtle">
                <Copy
                  label="Sektionsrubrik — snabbknappar"
                  category="rubrik"
                  text="Vanligaste ärendena"
                  rationale="Konkret och ärligt. 'Snabba ingångar' eller 'Kom igång' är vagt. 'Vanligaste ärendena' signalerar: 'det här är troligen varför du är här'."
                >
                  <h2 className="text-h4 font-medium mb-4">Vanligaste ärendena</h2>
                </Copy>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                  {TOP_INTENTS.map((it) => (
                    <Link
                      key={it.label}
                      to={it.href}
                      className="group flex flex-col items-start gap-2 p-4 rounded-md border border-border-subtle bg-surface hover:border-brand-accent hover:shadow-sm transition-all"
                    >
                      <Icon name={it.ikon} size={24} className="text-brand-accent" />
                      <span className="text-sm font-medium leading-snug group-hover:text-brand-accent">
                        {it.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            </Annotation>
          ),
        },
        {
          key: "chips",
          label: "Chips — kompakt",
          render: () => (
            <Annotation
              label="Snabbknappar (chips): kompaktare"
              audience="design"
              rationale="Alternativ om ytan är begränsad. Ikonerna försvinner, bara text. Fungerar som taggmoln — lättare att skumma men mindre visuellt dominant."
            >
              <section className="py-6 border-t border-border-subtle">
                <h2 className="text-h5 font-medium mb-3">Vanligaste ärendena</h2>
                <div className="flex flex-wrap gap-2">
                  {TOP_INTENTS.map((it) => (
                    <Link
                      key={it.label}
                      to={it.href}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border-subtle bg-surface text-sm hover:border-brand-accent hover:text-brand-accent hover:bg-tint-info transition-colors"
                    >
                      <Icon name={it.ikon} size={16} className="text-brand-accent" />
                      {it.label}
                    </Link>
                  ))}
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 4. TRIAGE-MODUL — självhjälp ──────────────────────────── */
    {
      id: "triage",
      label: "Triage — djupare kategorier",
      variants: [
        {
          key: "progressiv",
          label: "Kategori-grid → underkategorier inline",
          render: () => (
            <Annotation
              label="Interaktiv triage — för den som inte hittade i snabbknappar"
              audience="design"
              rationale="Återbruk av Kundservice-triage-modulens Progressiv-variant. Placerad EFTER snabbknappar, för den som inte hittat sin fråga där. Använder befintlig data — 6 kategorier × underkategorier."
            >
              <section className="py-10 border-t border-border-subtle">
                <h2 className="text-h3 font-medium mb-2">Eller välj efter kategori</h2>
                <p className="text-ink-secondary mb-6">Bläddra bland ämnen för att hitta svar på din fråga.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
                  {KATEGORIER.map((k) => (
                    <button
                      key={k.id}
                      type="button"
                      onClick={() => setActiveKat(activeKat === k.id ? null : k.id)}
                      className={`p-4 rounded-md border-2 text-left transition-all ${
                        activeKat === k.id
                          ? "border-brand-accent bg-tint-info"
                          : "border-border-subtle bg-surface hover:border-brand-accent"
                      }`}
                      aria-pressed={activeKat === k.id}
                    >
                      <Icon name={k.ikon} size={24} className="text-brand-accent mb-2 block" />
                      <span className="font-medium block text-sm">{k.label}</span>
                    </button>
                  ))}
                </div>
                {kategori && (
                  <div className="rounded-md border border-brand-accent bg-surface p-5">
                    <h3 className="font-medium mb-3">{kategori.label}</h3>
                    <ul className="space-y-2">
                      {kategori.underkategorier.map((u) => (
                        <li key={u.id}>
                          <a
                            href={u.action.type === "link" ? u.action.href : "#"}
                            className="group flex items-center gap-2 text-sm hover:text-brand-accent py-1.5"
                          >
                            <Icon name="arrow_forward" size={14} className="text-ink-muted group-hover:text-brand-accent" />
                            <span className="font-medium">{u.label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 5. MINA SIDOR-CALLOUT — självhjälp-push ──────────────── */
    {
      id: "mina-sidor",
      label: "Mina sidor — stor CTA",
      variants: [
        {
          key: "banner-stor",
          label: "Stor banner med topp 5-listor",
          render: () => (
            <Annotation
              label="Mina sidor — prominent, inte gömd"
              audience="user"
              rationale="Workshop-önskan: 'Tydlig knapp till Mina Sidor, STOR TYDLIG KNAPP'. De flesta KC-ärenden är faktiskt självbetjänings-saker — men användare vet inte alltid det. Visa vad man KAN göra själv."
            >
              <section className="py-10 border-t border-border-subtle">
                <div className="rounded-lg bg-brand-primary text-white p-6 sm:p-8 grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <Copy
                      label="Mina sidor-rubrik"
                      category="cta"
                      text="De flesta ärenden löser du snabbast själv"
                      rationale="Påstående, inte fråga. Säger rakt ut att Mina sidor är snabbaste vägen. Ingen 'kanske' eller 'kan också'."
                    >
                      <h2 className="text-h2 mb-2 text-white">De flesta ärenden löser du snabbast själv</h2>
                    </Copy>
                    <p className="text-sm opacity-90 mb-4">
                      Ingen kötid. Fungerar när som helst. Tar 1 minut istället för 10.
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 bg-white text-brand-primary font-medium px-5 py-3 rounded hover:opacity-90 transition-opacity"
                    >
                      <Icon name="person" size={18} />
                      Logga in på Mina sidor
                      <Icon name="arrow_forward" size={16} />
                    </a>
                  </div>
                  <div className="bg-white/10 rounded-md p-5">
                    <p className="text-xs uppercase tracking-wider font-medium mb-3 opacity-80">
                      Här kan du bland annat:
                    </p>
                    <ul className="space-y-2">
                      {MINA_SIDOR_SHORTCUTS.map((s) => (
                        <li key={s} className="flex items-center gap-2 text-sm">
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
        {
          key: "kompakt",
          label: "Kompakt — horisontell",
          render: () => (
            <Annotation
              label="Mina sidor (kompakt): en rad"
              audience="design"
              rationale="Alternativ om stor banner dominerar för mycket när sidan är tung. Samma budskap, mindre yta."
            >
              <section className="py-6 border-t border-border-subtle">
                <div className="rounded-md bg-tint-info p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <Icon name="person" size={28} className="text-brand-primary" />
                  <div className="flex-1">
                    <p className="font-medium">De flesta ärenden löser du snabbast själv på Mina sidor.</p>
                    <p className="text-sm text-ink-secondary">Ingen kötid · fungerar dygnet runt</p>
                  </div>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 bg-brand-primary text-ink-onbrand font-medium px-5 py-2.5 rounded hover:opacity-90 whitespace-nowrap"
                  >
                    Logga in
                    <Icon name="arrow_forward" size={16} />
                  </a>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 6. KONTAKTVÄGAR — alla synliga samtidigt ──────────────── */
    {
      id: "kontakt",
      label: "Kontaktvägar",
      variants: [
        {
          key: "fyra-kanaler",
          label: "Fyra kanaler — inkl. bokning",
          render: () => (
            <Annotation
              label="Kontaktvägar — alla synliga"
              audience="user"
              rationale="Workshop: 'Alla kontaktsätt på samma sida' + 'Bra om man kunde beställa samtal/möten'. Varje kanal har tydlig förväntan (svarstid + öppettider + vad kanalen passar för). Vattenfall-modell. Chatt föreslås överst — snabbast + AI-assistans via Ebbot."
            >
              <section className="py-10 border-t border-border-subtle">
                <Copy
                  label="Sektionsrubrik — kontakt"
                  category="rubrik"
                  text="Eller kontakta oss direkt"
                  rationale="'Eller' signalerar att detta är alternativet till self-service — inte första steget. Ordvalet styr användaren till Mina sidor först, kontakt sedan."
                >
                  <h2 className="text-h2 mb-2">Eller kontakta oss direkt</h2>
                </Copy>
                <p className="text-ink-secondary mb-6 max-w-reading">
                  Olika kanaler passar olika ärenden. Välj efter hur snabbt du behöver svar.
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <ContactCard
                    icon="smart_toy"
                    kanal="Chatt"
                    lead="Snabbast för enkla frågor"
                    svar="Svarstid under 1 min"
                    oppettider="Dygnet runt · AI-assistent (Ebbot)"
                    cta="Starta chatt"
                    ctaHref="#"
                    primary
                  />
                  <ContactCard
                    icon="call"
                    kanal="Telefon"
                    lead="För komplexa ärenden"
                    svar="042-490 32 00"
                    oppettider="Mån–tor 08–16 · Fre 10–15"
                    cta="Ring"
                    ctaHref="tel:0424903200"
                  />
                  <ContactCard
                    icon="mail"
                    kanal="E-post"
                    lead="När det inte är bråttom"
                    svar="Svar inom 1 arbetsdag"
                    oppettider="Dygnet runt"
                    cta="Skicka meddelande"
                    ctaHref="#"
                  />
                  <ContactCard
                    icon="event_available"
                    kanal="Boka samtal"
                    lead="Komplexa frågor, tid du väljer"
                    svar="Vi ringer när du vill"
                    oppettider="Välj tid de kommande 14 dagarna"
                    cta="Boka tid"
                    ctaHref="#"
                  />
                </div>
                <Copy
                  label="Språk-fallback"
                  category="reassurance"
                  text="Contact us in other languages — English · العربية · Polski"
                  rationale="Länsförsäkringar-inspiration. En rad längst ner är en signal om att sidan tänker på användare som inte har svenska som första språk, utan att tränga undan huvudflödet."
                >
                  <p className="text-sm text-ink-muted mt-6">
                    <strong className="text-ink-secondary">Contact us in other languages:</strong>{" "}
                    <a href="#" className="text-brand-accent hover:underline">English</a> ·{" "}
                    <a href="#" className="text-brand-accent hover:underline">العربية</a> ·{" "}
                    <a href="#" className="text-brand-accent hover:underline">Polski</a>
                  </p>
                </Copy>
              </section>
            </Annotation>
          ),
        },
        {
          key: "tre-kanaler",
          label: "Tre kanaler — utan bokning",
          render: () => (
            <Annotation
              label="Kontaktvägar (tre kanaler)"
              audience="design"
              rationale="Klassiska tre. Alternativ om bokning inte är live ännu. Samma förväntan-format på varje kanal."
            >
              <section className="py-10 border-t border-border-subtle">
                <h2 className="text-h2 mb-2">Eller kontakta oss direkt</h2>
                <p className="text-ink-secondary mb-6 max-w-reading">
                  Välj kanal efter hur snabbt du behöver svar.
                </p>
                <div className="grid sm:grid-cols-3 gap-4">
                  <ContactCard icon="smart_toy" kanal="Chatt" lead="Snabbast för enkla frågor" svar="Svarstid under 1 min" oppettider="Dygnet runt · AI-assistent" cta="Starta chatt" ctaHref="#" primary />
                  <ContactCard icon="call" kanal="Telefon" lead="För komplexa ärenden" svar="042-490 32 00" oppettider="Mån–tor 08–16 · Fre 10–15" cta="Ring" ctaHref="tel:0424903200" />
                  <ContactCard icon="mail" kanal="E-post" lead="När det inte är bråttom" svar="Svar inom 1 arbetsdag" oppettider="Dygnet runt" cta="Skicka meddelande" ctaHref="#" />
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 7. POPULÄRA FRÅGOR "JUST NU" ──────────────────────────── */
    {
      id: "just-nu",
      label: "Populära frågor just nu",
      variants: [
        {
          key: "lista",
          label: "Lista — 5 topp-frågor",
          render: () => (
            <Annotation
              label="Just nu-frågor"
              audience="redaktör"
              rationale="Folksam-inspiration: 'Just nu frågar många om det här'. Redaktionellt kurerad lista som uppdateras veckovis baserat på supportdata. Signalerar att sidan är levande och hjälper användare som inte vet vad de letar efter."
            >
              <section className="py-10 border-t border-border-subtle">
                <h2 className="text-h3 font-medium mb-2">Just nu frågar många om</h2>
                <p className="text-sm text-ink-muted mb-4">Baserat på senaste veckans ärenden</p>
                <ul className="divide-y divide-border-subtle max-w-reading">
                  {POPULARA_FRAGOR_JUST_NU.map((f) => (
                    <li key={f.q}>
                      <a
                        href={f.href}
                        className="group flex items-center justify-between py-3 hover:text-brand-accent"
                      >
                        <span className="font-medium">{f.q}</span>
                        <Icon name="arrow_forward" size={16} className="text-ink-muted group-hover:text-brand-accent flex-shrink-0" />
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

    /* ─── 8. FOOTER — driftstörning + öppettider återupprepas ───── */
    {
      id: "fot",
      label: "Fot — driftstörning + öppettider",
      variants: [
        {
          key: "kompakt",
          label: "Kompakt",
          render: () => (
            <Annotation
              label="Fot-sektion: driftstörning + återupprepa öppettider"
              audience="design"
              rationale="Recognition över recall: öppettider för kundtjänst ska vara synliga nära sidans slut också, för den som skrollat förbi kontaktvägarna. Driftstörnings-länk ligger kvar som fallback även när bannern är 'normal'."
            >
              <section className="py-10 border-t border-border-subtle grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-h5 font-medium mb-3">Driftstörning?</h3>
                  <p className="text-sm text-ink-secondary mb-2">
                    Se om det pågår ett avbrott i ditt område, planerade arbeten, eller gör en felanmälan.
                  </p>
                  <Link
                    to="/moduler/avbrottslista"
                    className="inline-flex items-center gap-1.5 text-sm text-brand-accent hover:underline"
                  >
                    Avbrottsinformation
                    <Icon name="arrow_forward" size={14} />
                  </Link>
                </div>
                <div>
                  <h3 className="text-h5 font-medium mb-3">Kundtjänst öppettider</h3>
                  <dl className="text-sm text-ink-secondary space-y-1">
                    <div className="flex gap-3">
                      <dt className="font-medium min-w-[80px]">Chatt</dt>
                      <dd>Dygnet runt</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="font-medium min-w-[80px]">Telefon</dt>
                      <dd>Mån–tor 08–16 · Fre 10–15</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="font-medium min-w-[80px]">E-post</dt>
                      <dd>Svar inom 1 arbetsdag</dd>
                    </div>
                  </dl>
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
        kategori="Kundservice (Sidtyp 8 — ersätter KC + Kontakta-oss)"
        syfte="Snabbast möjliga väg till lösning — antingen self-service eller rätt kontaktväg med rätt förväntan. Minska belastning på KC genom att göra självhjälp tydligare än kontakt."
        malgrupp="Privatkund med ett konkret ärende. Ofta stressad, ibland osäker på om ärendet är akut. Toppen av tratten = distraherad användare från sökträff."
        primarHandling="Hitta svar direkt (sök, snabbknapp, triage) ELLER nå rätt kontaktkanal med känd svarstid."
        ton="Direkt, konkret, respektfull mot användarens tid. Inga marknadsföringsfraser. Säger ärligt vilken kanal som är snabbast för vilket ärende."
      />

      {/* Utility-rad */}
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
          <li aria-current="page" className="font-medium text-ink">Kundservice</li>
        </ol>
      </nav>

      <BlockList pageId="kundservice-ny" blocks={blocks} />
    </div>
  );
}

/* ─── Helpers ───────────────────────────────────────────────────── */

type ContactCardProps = {
  icon: string;
  kanal: string;
  lead: string;
  svar: string;
  oppettider: string;
  cta: string;
  ctaHref: string;
  primary?: boolean;
};

function ContactCard({ icon, kanal, lead, svar, oppettider, cta, ctaHref, primary }: ContactCardProps) {
  return (
    <div
      className={`rounded-md border-2 p-5 flex flex-col ${
        primary ? "border-brand-accent bg-tint-info/40" : "border-border-subtle bg-surface"
      }`}
    >
      <Icon name={icon} size={28} className="text-brand-accent mb-3" />
      <h3 className="font-medium mb-1">{kanal}</h3>
      <p className="text-sm text-ink-secondary mb-3">{lead}</p>
      <dl className="text-xs text-ink-muted space-y-1 mb-4">
        <div>
          <dt className="inline font-medium text-ink-secondary">Svar: </dt>
          <dd className="inline">{svar}</dd>
        </div>
        <div>
          <dt className="inline font-medium text-ink-secondary">Öppettider: </dt>
          <dd className="inline">{oppettider}</dd>
        </div>
      </dl>
      <a
        href={ctaHref}
        className={`mt-auto inline-flex items-center justify-center gap-2 font-medium text-sm py-2.5 rounded transition-opacity ${
          primary
            ? "bg-brand-primary text-ink-onbrand hover:opacity-90"
            : "border border-border-strong text-brand-primary hover:bg-tint-info"
        }`}
      >
        {cta}
        <Icon name="arrow_forward" size={16} />
      </a>
    </div>
  );
}
