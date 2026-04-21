import { useState } from "react";
import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { Icon } from "../../components/Icon";

/**
 * SIDTYP 7 — Startsida undersida, UX-optimerad
 *
 * Samma innehåll som Sidtyp 1 (Privat Elhandel) men omstrukturerad enligt
 * UX-auditens High-impact-fixar:
 *
 *  1. Elnät-callouten FÖRE intentkorten — den största missförståelsen
 *     (elnät ≠ elhandel) adresseras innan användaren klickar vidare.
 *  2. Jämförelsekorten är helt klickbara med en synlig CTA per kort.
 *     Affordancen ljuger inte — du ser att du kan välja.
 *  3. "Logga in på Mina sidor" är flyttad till utility-raden vid breadcrumb.
 *     Hero:n har ingen konkurrerande persona-CTA.
 *  4. FAQ ligger direkt efter jämförelsen — där loss-aversion-svaren
 *     ("Vad händer om jag inte väljer?") gör mest jobb.
 *  5. Relaterade teman + genvägar är komprimerade till en footer-sektion
 *     så "jag vill bara teckna"-användaren inte skrollar förbi dem.
 */

const faqs = [
  { id: "anvisat", q: "Vad händer om jag inte väljer avtal?", a: "Då får du ett anvisat avtal som oftast är dyrare. Det är tillfälligt och du kan byta gratis — det tar 3 minuter." },
  { id: "elnat", q: "Vad är skillnaden mellan elnät och elhandel?", a: "Elnät är de fysiska ledningarna som transporterar el till ditt hem — du kan inte välja nätägare. Elhandel är vem som säljer elen till dig — här väljer du fritt. Bor du i Helsingborg eller Ängelholm är Öresundskraft redan ditt nätbolag." },
  { id: "behover", q: "Vad behöver jag för att teckna?", a: "Personnummer och den adress där du vill ha el. Har du inte ett elnätsavtal sedan tidigare ordnar vi det också." },
  { id: "tid", q: "Hur snabbt börjar avtalet gälla?", a: "Normalt inom 2–4 veckor. Vid flytt kan det gå snabbare om anmälan görs i tid." },
  { id: "byta", q: "Kan jag byta avtal senare?", a: "Ja. Avtal utan bindningstid kan sägas upp med en månads uppsägningstid. Logga in på Mina sidor för att byta." },
];

const planer = [
  {
    namn: "Säkrat pris",
    bast: "Vill ha förutsägbarhet",
    pris: "[~XXX kr/mån]",
    egenskap: "Fast pris hela året · 1 års bindning",
    href: "/moduler/elavtal-jamfor",
    accent: false,
    badge: null as string | null,
  },
  {
    namn: "Kvartspris",
    bast: "Vill ha viss stabilitet",
    pris: "[~XXX kr/mån]",
    egenskap: "Fast per kvartal · 3 mån bindning",
    href: "/moduler/elavtal-jamfor",
    accent: false,
    badge: null,
  },
  {
    namn: "Månadspris",
    bast: "Är flexibel och vill spara",
    pris: "[~XXX kr/mån]",
    egenskap: "Rörligt pris · Ingen bindning",
    href: "/moduler/elavtal-jamfor",
    accent: true,
    badge: "Vanligaste valet",
  },
];

export function StartsidaUndersidaUX() {
  const [openFaq, setOpenFaq] = useState<string | null>("anvisat");

  const blocks: BlockDef[] = [
    /* ─── 1. HERO — ingen konkurrerande persona-CTA ─────────────── */
    {
      id: "hero",
      label: "Hero",
      variants: [
        {
          key: "fokus",
          label: "Enkelt fokus — en CTA",
          render: () => (
            <Annotation
              label="Hero: en CTA, inget konkurrerande beslut"
              audience="user"
              rationale="Till skillnad från Sidtyp 1: bara EN CTA här. 'Logga in på Mina sidor' sitter i utility-raden — en befintlig kund har egen ingång och ska inte konkurrera om uppmärksamheten med en tecknande användare."
            >
              <section className="py-12 sm:py-20">
                <div className="max-w-reading">
                  <Copy
                    label="H1 — handlingsorienterad"
                    category="rubrik"
                    text="Välj elavtal som passar dig"
                    rationale="Verbet 'Välj' flyttar fokus från företag till användare. 'Som passar dig' avdramatiserar — det finns inte ett rätt svar, och vi har inte en dold agenda."
                  >
                    <h1 className="text-display mb-4 leading-tight">
                      Välj elavtal som passar dig
                    </h1>
                  </Copy>
                  <Copy
                    label="Ingress"
                    category="reassurance"
                    text="Jämför våra tre avtal, se uppskattad kostnad och teckna direkt — utan dolda avgifter, utan bindningstid om du inte vill."
                    rationale="Tre konkreta löften i en mening. 'Utan dolda avgifter' adresserar ett känt branschmisstroende direkt."
                  >
                    <p className="text-lede text-ink-secondary mb-6 leading-relaxed">
                      Jämför våra tre avtal, se uppskattad kostnad och teckna direkt —
                      utan dolda avgifter, utan bindningstid om du inte vill.
                    </p>
                  </Copy>
                  <Copy
                    label="Enda CTA — dominerar hero"
                    category="cta"
                    text="Teckna elavtal"
                    rationale="UX-audit fix #3: 'Logga in på Mina sidor' är borttagen härifrån. Hero har nu ETT beslut, vilket gör primäråtgärden visuellt dominant istället för att dela uppmärksamhet med en konkurrerande persona."
                  >
                    <Link
                      to="/moduler/elavtal-jamfor"
                      className="inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-7 py-3.5 rounded hover:opacity-90 transition-opacity text-base"
                    >
                      Teckna elavtal
                      <Icon name="arrow_forward" size={18} />
                    </Link>
                  </Copy>
                  <p className="text-xs text-ink-muted mt-3">
                    Tar ca 3 minuter · Du behöver personnummer och adress · 14 dagars ångerrätt
                  </p>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 2. ELNÄT-CALLOUT — FLYTTAD HIT (UX-audit High #1) ───────── */
    {
      id: "elnat-callout",
      label: "Elnät-callout — ovanför intentkort",
      variants: [
        {
          key: "ovanfor-intent",
          label: "Före intentkorten",
          render: () => (
            <Annotation
              label="Elnät vs elhandel — före intentkort"
              audience="user"
              rationale="UX-audit fix #1: I Sidtyp 1 låg den här efter intentkorten. En användare som klickar 'Jag ska flytta' eller 'Jag vill teckna' missade den helt. Här är den det första de möter efter hero:n — innan de förgrenar sig."
            >
              <section className="py-6">
                <div className="p-5 rounded-md bg-tint-info border-l-4 border-brand-accent flex gap-4">
                  <Icon name="lightbulb" size={28} className="text-brand-accent" />
                  <div className="flex-1">
                    <Copy
                      label="Lokal reassurance — rubrik"
                      category="reassurance"
                      text="Bor du i Helsingborg eller Ängelholm?"
                      rationale="Adresserar den vanligaste missförståelsen (måste jag byta nätbolag?) innan användaren hinner bli förvirrad av jämförelsen. Detta är den #1 supportkälla vi identifierat."
                    >
                      <p className="font-medium mb-1">Bor du i Helsingborg eller Ängelholm?</p>
                    </Copy>
                    <p className="text-sm text-ink-secondary leading-relaxed">
                      Då är vi redan ditt elnätsbolag — du behöver bara välja{" "}
                      <strong>elhandelsavtal</strong>.{" "}
                      <strong>Elnät</strong> = ledningarna (bestämt av var du bor).{" "}
                      <strong>Elhandel</strong> = vem som säljer elen (du väljer fritt).
                    </p>
                  </div>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 3. INTENTKORT — alternativt flöde ────────────────────── */
    {
      id: "intent",
      label: "Intentkort",
      variants: [
        {
          key: "grid",
          label: "Grid — 5 intentioner",
          render: () => (
            <Annotation
              label="Intentkort: alternativ ingång efter hero"
              audience="user"
              rationale="För den som inte landar med 'jag vill teckna' som given intention. Placerad efter elnät-callouten (så missförståelsen är klargjord) men före jämförelsen (så rätt väg är öppen)."
            >
              <section className="py-10 border-t border-border-subtle">
                <h2 className="text-h2 mb-6">Eller välj efter vad du vill göra</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { ikon: "edit", label: "Jag vill teckna elavtal", desc: "Ny kund eller saknar avtal", href: "/moduler/elavtal-jamfor" },
                    { ikon: "sync", label: "Jag vill byta elavtal", desc: "Befintlig kund — jämför och byt direkt", href: "#" },
                    { ikon: "home", label: "Jag ska flytta", desc: "Flytta inom, till eller från nätet", href: "#" },
                    { ikon: "monitoring", label: "Jag vill förstå min elkostnad", desc: "Prishistorik, påslag och förbrukning", href: "#" },
                    { ikon: "chat_bubble", label: "Jag har en fråga", desc: "Vanliga frågor och kundservice", href: "/moduler/kundservice-triage" },
                  ].map((k) => (
                    <Link
                      key={k.label}
                      to={k.href}
                      className="group p-5 rounded-md border border-border-subtle bg-surface hover:border-brand-accent hover:shadow-sm transition-all flex gap-4"
                    >
                      <Icon name={k.ikon} size={26} className="text-brand-accent" />
                      <div>
                        <span className="font-medium block group-hover:text-brand-accent">{k.label}</span>
                        <span className="text-sm text-ink-secondary">{k.desc}</span>
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

    /* ─── 4. JÄMFÖRELSE — HELA KORT KLICKBART (UX-audit High #2) ─── */
    {
      id: "jamforelse",
      label: "Avtalsjämförelse",
      variants: [
        {
          key: "klickbara-kort",
          label: "Klickbara kort med CTA per kort",
          render: () => (
            <Annotation
              label="Jämförelsekort — affordance ljuger inte"
              audience="user"
              rationale="UX-audit fix #2: I Sidtyp 1 såg korten klickbara ut men var det inte. Här är HELA KORTET klickbart med en tydlig CTA längst ner per kort — 'Välj X →'. Ingen gissar vad som händer vid klick."
            >
              <section className="py-10 border-t border-border-subtle">
                <h2 className="text-h2 mb-2">Jämför våra elavtal</h2>
                <p className="text-ink-secondary mb-6">Tre avtal, tydligt jämförda. Välj det som passar hur du använder el.</p>
                <div className="grid md:grid-cols-3 gap-4">
                  {planer.map((p) => (
                    <Link
                      key={p.namn}
                      to={p.href}
                      className={`group rounded-md border-2 p-5 flex flex-col hover:shadow-md transition-all ${
                        p.accent
                          ? "border-brand-accent bg-tint-info/30 hover:bg-tint-info/60"
                          : "border-border-subtle bg-surface hover:border-brand-accent"
                      }`}
                    >
                      {p.badge && (
                        <Copy
                          label="Social proof — nudge"
                          category="cta"
                          text={p.badge}
                          rationale="Hederligare än 'Vi rekommenderar'. Social proof informerar utan att pusha."
                        >
                          <p className="text-xs font-medium text-brand-accent mb-2 uppercase tracking-wider">
                            {p.badge}
                          </p>
                        </Copy>
                      )}
                      <h3 className="font-medium text-h5 mb-1">{p.namn}</h3>
                      <p className="text-sm text-ink-secondary mb-3">{p.bast}</p>
                      <p className="text-h4 font-medium mb-1">{p.pris}</p>
                      <p className="text-xs text-ink-muted mb-4">Lägenhet, ~2 000 kWh/år</p>
                      <p className="text-xs text-ink-secondary mb-5">{p.egenskap}</p>
                      <span
                        className={`mt-auto inline-flex items-center justify-center gap-2 py-2.5 rounded font-medium text-sm transition-opacity ${
                          p.accent
                            ? "bg-brand-primary text-ink-onbrand group-hover:opacity-90"
                            : "border border-border-strong text-brand-primary group-hover:bg-tint-info"
                        }`}
                      >
                        Välj {p.namn}
                        <Icon name="arrow_forward" size={16} />
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/moduler/elavtal-jamfor"
                  className="inline-flex items-center gap-1 text-sm text-brand-accent hover:underline mt-4"
                >
                  Se fullständig jämförelse med detaljer
                  <Icon name="arrow_forward" size={14} />
                </Link>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 5. FAQ — DIREKT EFTER JÄMFÖRELSE (UX-audit Medium #4) ──── */
    {
      id: "faq",
      label: "FAQ",
      variants: [
        {
          key: "loss-aversion",
          label: "Direkt efter jämförelse",
          render: () => (
            <Annotation
              label="FAQ — placerad för loss aversion"
              audience="user"
              rationale="UX-audit fix #4: I Sidtyp 1 låg FAQ som block 6. Här är den direkt efter jämförelsen — där tvekan uppstår. 'Vad händer om jag inte väljer avtal?' är topp-1 av supportfrågorna och ligger öppen by default."
            >
              <section className="py-10 border-t border-border-subtle">
                <h2 className="text-h2 mb-6">Vanliga frågor när man tvekar</h2>
                <div className="max-w-reading space-y-2">
                  {faqs.map((f) => (
                    <details
                      key={f.id}
                      open={openFaq === f.id}
                      className="group border border-border-subtle rounded-md bg-surface"
                    >
                      <summary
                        onClick={(e) => { e.preventDefault(); setOpenFaq(openFaq === f.id ? null : f.id); }}
                        className="px-5 py-4 cursor-pointer list-none flex items-center justify-between hover:bg-tint-info rounded-md font-medium text-sm"
                      >
                        {f.id === "anvisat" ? (
                          <Copy
                            label="FAQ — loss aversion öppen by default"
                            category="faq"
                            text="Vad händer om jag inte väljer avtal?"
                            rationale="Öppen redan från start. Besvarar den största tvekansfrågan innan användaren ens klickar. Ärligt, inte skrämselpropaganda."
                          >
                            <span>{f.q}</span>
                          </Copy>
                        ) : (
                          <span>{f.q}</span>
                        )}
                        <Icon
                          name="expand_more"
                          size={20}
                          className={`text-ink-muted transition-transform ml-3 ${openFaq === f.id ? "rotate-180" : ""}`}
                        />
                      </summary>
                      {openFaq === f.id && (
                        <div className="px-5 pb-4 text-sm text-ink-secondary leading-relaxed border-t border-border-subtle pt-3">
                          {f.a}
                        </div>
                      )}
                    </details>
                  ))}
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 6. VÄRDEERBJUDANDE — efter beslutsmomentet ────────────── */
    {
      id: "varde",
      label: "Värdeerbjudande",
      variants: [
        {
          key: "banner",
          label: "Horisontell banner — lätt närvaro",
          render: () => (
            <Annotation
              label="Värdeerbjudande — lätt banner efter beslutet"
              audience="user"
              rationale="Placerad efter FAQ (inte före) eftersom värde-argument påverkar tecknings-beslut mindre än svar på loss aversion. Banner-format istället för tre spalter — tar mindre yta när det inte är huvudbeslut."
            >
              <section className="py-8 border-t border-border-subtle">
                <div className="rounded-md bg-tint-info p-5 grid sm:grid-cols-3 gap-4 text-sm">
                  {[
                    { ikon: "location_city", t: "Lokalt · Communityägt sedan [år]" },
                    { ikon: "payments", t: "Transparent · [X öre/kWh påslag]" },
                    { ikon: "smartphone", t: "Allt samlat · App + Mina sidor" },
                  ].map((v) => (
                    <div key={v.t} className="flex items-center gap-2">
                      <Icon name={v.ikon} size={20} className="text-brand-accent" />
                      <span className="font-medium text-brand-primary">{v.t}</span>
                    </div>
                  ))}
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },

    /* ─── 7. FOOTER-SEKTION — relaterade + genvägar + nyheter ───── */
    {
      id: "fot",
      label: "Footer — relaterade, genvägar, nyheter",
      variants: [
        {
          key: "kompakt",
          label: "Kompakt trippelspalt",
          render: () => (
            <Annotation
              label="Long-tail-ingångar komprimerade"
              audience="redaktör"
              rationale="UX-audit fix #5: Sidtyp 1 hade tre separata sektioner (relaterade teman, nyheter, genvägar) — 3 × stora H2:s, mycket skroll för den som bara vill teckna. Här är allt samlat i en sektion med H4:s, så det finns kvar för SEO/long-tail men inte konkurrerar med huvudbeslutet."
            >
              <section className="py-10 border-t border-border-subtle">
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Relaterade teman */}
                  <div>
                    <h3 className="text-h5 font-medium mb-3">Utforska mer</h3>
                    <ul className="space-y-2 text-sm">
                      {[
                        { titel: "Det energismarta hemmet", href: "#" },
                        { titel: "Solceller", href: "/moduler/produktinfo" },
                        { titel: "Ladda Smart", href: "/moduler/produktinfo" },
                      ].map((t) => (
                        <li key={t.titel}>
                          <Link to={t.href} className="group inline-flex items-center gap-1.5 hover:text-brand-accent">
                            <Icon name="arrow_forward" size={14} className="text-ink-muted group-hover:text-brand-accent" />
                            <span>{t.titel}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Genvägar */}
                  <div>
                    <h3 className="text-h5 font-medium mb-3">Bra att veta</h3>
                    <ul className="space-y-2 text-sm">
                      {[
                        "Prishistorik",
                        "Anvisat avtal",
                        "Elens ursprung",
                        "Ångerrätt",
                      ].map((label) => (
                        <li key={label}>
                          <a href="#" className="group inline-flex items-center gap-1.5 hover:text-brand-accent">
                            <Icon name="arrow_forward" size={14} className="text-ink-muted group-hover:text-brand-accent" />
                            <span>{label}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Nyheter */}
                  <div>
                    <h3 className="text-h5 font-medium mb-3">Senaste nytt</h3>
                    <ul className="space-y-3 text-sm">
                      {[
                        { datum: "2026-04-15", rubrik: "Elpriset sjunker inför sommaren" },
                        { datum: "2026-04-08", rubrik: "Följ din förbrukning i realtid i appen" },
                      ].map((n) => (
                        <li key={n.rubrik}>
                          <a href="#" className="group block hover:text-brand-accent">
                            <time dateTime={n.datum} className="text-xs text-ink-muted block mb-0.5">{n.datum}</time>
                            <span className="leading-snug">{n.rubrik}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                    <a href="#" className="text-xs text-brand-accent hover:underline mt-2 inline-block">
                      Visa alla nyheter
                    </a>
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
        kategori="Startsida undersida (Sidtyp 7 — UX-optimerad)"
        syfte="UX-audit-driven variant av Sidtyp 1. Applicerar fem konkreta fixar: elnät-callout före intentkort, klickbara jämförelsekort med CTA per kort, ingen konkurrerande persona-CTA i hero, FAQ direkt efter jämförelsen, komprimerad footer-sektion för long-tail-länkar."
        malgrupp="Samma som Sidtyp 1: privatperson i Helsingborg/Ängelholm som ska teckna/byta elavtal."
        primarHandling="Klicka 'Teckna elavtal' eller ett jämförelsekort → jämförelse-modul."
        ton="Samma som Sidtyp 1. UX-skillnaden ligger i struktur och affordances, inte i ton."
      />

      {/* Utility-rad — 'Logga in' har flyttats HIT från hero */}
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
          <li aria-current="page" className="font-medium text-ink">Elhandel</li>
        </ol>
      </nav>

      <BlockList pageId="startsida-undersida-ux" blocks={blocks} />
    </div>
  );
}
