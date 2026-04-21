import { useState } from "react";
import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";

/**
 * SIDTYP 1 — Pilot for the editable/editorial-guided composition model.
 *
 * Each section is a <Block> with 2-3 variants. Authors can switch,
 * hide or reorder blocks when "Redigera"-mode is on. Copy snippets
 * are wrapped in <Copy> so each non-obvious wording has a rationale.
 */

const faqs = [
  { id: "elnat", q: "Vad är skillnaden mellan elnät och elhandel?", a: "Elnät är de fysiska ledningarna som transporterar el till ditt hem — du kan inte välja nätägare. Elhandel är vem som säljer elen till dig — här väljer du fritt. Bor du i Helsingborg eller Ängelholm är Öresundskraft redan ditt nätbolag." },
  { id: "anvisat", q: "Vad händer om jag inte väljer avtal?", a: "Då får du ett anvisat avtal som oftast är dyrare. Det är tillfälligt och du kan byta gratis — det tar 3 minuter." },
  { id: "behover", q: "Vad behöver jag för att teckna?", a: "Personnummer och den adress där du vill ha el. Har du inte ett elnätsavtal sedan tidigare ordnar vi det också." },
  { id: "tid", q: "Hur snabbt börjar avtalet gälla?", a: "Normalt inom 2–4 veckor. Vid flytt kan det gå snabbare om anmälan görs i tid." },
  { id: "byta", q: "Kan jag byta avtal senare?", a: "Ja. Avtal utan bindningstid kan sägas upp med en månads uppsägningstid. Logga in på Mina sidor för att byta." },
];

export function PrivatElhandel() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const blocks: BlockDef[] = [
    {
      id: "hero",
      label: "Hero",
      variants: [
        {
          key: "standard",
          label: "Standard — handlingsorienterad",
          render: () => (
            <Annotation
              label="Hero: tema + huvudhandling"
              audience="user"
              rationale="H1 är handlingsorienterad ('Välj elavtal') inte informerande ('Elhandel hos Öresundskraft'). CTA-texten matchar nästa steg — 'Teckna elavtal' hela vägen. Tidslöfte + kravlista under CTA."
            >
              <section className="py-12 sm:py-20">
                <nav aria-label="Breadcrumb" className="text-xs text-ink-muted mb-4">
                  <ol className="flex gap-1">
                    <li><a href="#" className="hover:text-brand-accent">Privat</a></li>
                    <li aria-hidden="true">›</li>
                    <li aria-current="page" className="font-medium text-ink">Elhandel</li>
                  </ol>
                </nav>
                <div className="max-w-reading">
                  <Copy
                    label="H1 — sidans rubrik"
                    category="rubrik"
                    text="Välj elavtal som passar dig"
                    rationale="Verbet 'Välj' är handlingsorienterat, inte informerande. Alternativet 'Elhandel hos Öresundskraft' berättar bara vad sidan är — 'Välj elavtal' säger vad användaren ska göra. 'Som passar dig' avdramatiserar; det finns inte ett rätt svar."
                  >
                    <h1 className="text-display sm:text-display mb-4 leading-tight">
                      Välj elavtal som passar dig
                    </h1>
                  </Copy>
                  <Copy
                    label="Ingress — vad sidan levererar"
                    category="reassurance"
                    text="Jämför våra tre avtal, se uppskattad kostnad och teckna direkt — utan dolda avgifter, utan bindningstid om du inte vill."
                    rationale="Tre konkreta löften i en mening: jämför, se pris, teckna. 'Utan dolda avgifter' adresserar ett känt branschmisstroende. 'Om du inte vill' ger användaren kontrollen — bindningstid är ett val, inte default."
                  >
                    <p className="text-lede text-ink-secondary mb-6 leading-relaxed">
                      Jämför våra tre avtal, se uppskattad kostnad och teckna direkt — utan dolda avgifter,
                      utan bindningstid om du inte vill.
                    </p>
                  </Copy>
                  <div className="flex flex-wrap gap-3 mb-3">
                    <Copy
                      label="Primär CTA"
                      category="cta"
                      text="Teckna elavtal"
                      rationale="Samma verb + objekt hela vägen — användaren ser 'Teckna elavtal' i hero, i intentkort, i jämförelsen och i formuläret. Inte 'Börja här' eller 'Kom igång' som tvingar användaren att gissa vad som händer."
                    >
                      <Link
                        to="/moduler/elavtal-jamfor"
                        className="bg-brand-primary text-ink-onbrand font-medium px-6 py-3 rounded hover:opacity-90 transition-opacity"
                      >
                        Teckna elavtal
                      </Link>
                    </Copy>
                    <a
                      href="#"
                      className="border border-border-strong text-ink-secondary font-medium px-6 py-3 rounded hover:bg-tint-info transition-colors"
                    >
                      Logga in på Mina sidor
                    </a>
                  </div>
                  <Copy
                    label="Reassurance under CTA"
                    category="reassurance"
                    text="Tar ca 3 minuter · Du behöver personnummer och adress · 14 dagars ångerrätt"
                    rationale="Tre friktionspunkter som är kända från användarintervjuer: 'tar det lång tid?', 'vad måste jag ha tillhands?', 'kan jag ångra?'. Bulletpoints med tydliga mellanslag — scanbara på 2 sekunder."
                  >
                    <p className="text-xs text-ink-muted">
                      Tar ca 3 minuter · Du behöver personnummer och adress · 14 dagars ångerrätt
                    </p>
                  </Copy>
                </div>
              </section>
            </Annotation>
          ),
        },
        {
          key: "kompakt",
          label: "Kompakt — mindre luft",
          render: () => (
            <Annotation
              label="Hero (kompakt): mindre vertikal rymd"
              audience="design"
              rationale="Alternativ för djupare sidor där hero inte behöver dominera. Samma copy, hälften av paddingen, ingen ingress — lämplig när användaren redan navigerat hit från en över-sida."
            >
              <section className="py-6 sm:py-10 border-b border-border-subtle mb-2">
                <nav aria-label="Breadcrumb" className="text-xs text-ink-muted mb-3">
                  <ol className="flex gap-1">
                    <li><a href="#" className="hover:text-brand-accent">Privat</a></li>
                    <li aria-hidden="true">›</li>
                    <li aria-current="page" className="font-medium text-ink">Elhandel</li>
                  </ol>
                </nav>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <h1 className="text-h1 leading-tight">Välj elavtal som passar dig</h1>
                  <Link
                    to="/moduler/elavtal-jamfor"
                    className="bg-brand-primary text-ink-onbrand font-medium px-5 py-2.5 rounded hover:opacity-90"
                  >
                    Teckna elavtal →
                  </Link>
                </div>
              </section>
            </Annotation>
          ),
        },
        {
          key: "split",
          label: "Split — med värdefält",
          render: () => (
            <Annotation
              label="Hero (split): H1 + 3 värdepunkter sida vid sida"
              audience="design"
              rationale="Alternativ där värdeerbjudandet flyttas in i hero. Lämpligt om 'Varför ÖK'-blocket tas bort. Flyttar 3 nyckelargument ovan page fold."
            >
              <section className="py-10 sm:py-16">
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  <div>
                    <nav aria-label="Breadcrumb" className="text-xs text-ink-muted mb-4">
                      <ol className="flex gap-1">
                        <li><a href="#" className="hover:text-brand-accent">Privat</a></li>
                        <li aria-hidden="true">›</li>
                        <li aria-current="page" className="font-medium text-ink">Elhandel</li>
                      </ol>
                    </nav>
                    <h1 className="text-display mb-4 leading-tight">Välj elavtal som passar dig</h1>
                    <p className="text-lede text-ink-secondary mb-6">
                      Tre avtal. Transparent pris. Utan bindningstid om du inte vill.
                    </p>
                    <Link
                      to="/moduler/elavtal-jamfor"
                      className="inline-block bg-brand-primary text-ink-onbrand font-medium px-6 py-3 rounded hover:opacity-90"
                    >
                      Teckna elavtal
                    </Link>
                  </div>
                  <ul className="bg-tint-info rounded-md p-6 space-y-4">
                    {[
                      { ikon: "🏘️", t: "Ditt lokala energibolag" },
                      { ikon: "💰", t: "Inga dolda avgifter" },
                      { ikon: "📱", t: "Allt samlat i appen" },
                    ].map((v) => (
                      <li key={v.t} className="flex items-center gap-3 font-medium">
                        <span className="text-xl" aria-hidden="true">{v.ikon}</span>
                        {v.t}
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
    {
      id: "intent",
      label: "Intentkort",
      variants: [
        {
          key: "grid",
          label: "Grid — 5 intentioner",
          render: () => (
            <Annotation
              label="Intentkort: 'Vad vill du göra?'"
              audience="user"
              rationale="Ersätter 'Vem är du?'-personas. Varje kort = en intention. Korten leder end-to-end — ingen landar på 'Kontakta oss'. Ikoner dekorativa."
            >
              <section className="py-10 border-t border-border-subtle">
                <Copy
                  label="Sektionsrubrik — intentkort"
                  category="rubrik"
                  text="Vad vill du göra?"
                  rationale="Frågan är riktad till användaren, inte till systemet. Alternativet 'Vem är du?' tvingar självkategorisering (ny/befintlig kund) som användaren inte alltid vet svaret på. 'Vad vill du göra?' låter intentionen styra navigationen."
                >
                  <h2 className="text-h2 mb-6">Vad vill du göra?</h2>
                </Copy>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { ikon: "✏️", label: "Jag vill teckna elavtal", desc: "Ny kund eller saknar avtal", href: "/moduler/elavtal-jamfor" },
                    { ikon: "🔄", label: "Jag vill byta elavtal", desc: "Befintlig kund — jämför och byt direkt", href: "#" },
                    { ikon: "🏠", label: "Jag ska flytta", desc: "Flytta inom, till eller från nätet", href: "#" },
                    { ikon: "📊", label: "Jag vill förstå min elkostnad", desc: "Prishistorik, påslag och förbrukning", href: "#" },
                    { ikon: "💬", label: "Jag har en fråga", desc: "Vanliga frågor och kundservice", href: "/moduler/kundservice-triage" },
                  ].map((k) => (
                    <Link
                      key={k.label}
                      to={k.href}
                      className="group p-5 rounded-md border border-border-subtle bg-surface hover:border-brand-accent hover:shadow-sm transition-all flex gap-4"
                    >
                      <span className="text-2xl" aria-hidden="true">{k.ikon}</span>
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
        {
          key: "list",
          label: "Vertikal lista — kompaktare",
          render: () => (
            <Annotation
              label="Intentkort (lista): vertikal för smalare layout"
              audience="design"
              rationale="Samma innehåll som grid men staplat. Bra när sidbredden är begränsad eller när blocket ska flyttas till en sidopanel."
            >
              <section className="py-10 border-t border-border-subtle">
                <h2 className="text-h2 mb-6">Vad vill du göra?</h2>
                <ul className="max-w-reading space-y-2">
                  {[
                    { ikon: "✏️", label: "Jag vill teckna elavtal", desc: "Ny kund eller saknar avtal", href: "/moduler/elavtal-jamfor" },
                    { ikon: "🔄", label: "Jag vill byta elavtal", desc: "Befintlig kund", href: "#" },
                    { ikon: "🏠", label: "Jag ska flytta", desc: "Flytta inom, till eller från nätet", href: "#" },
                    { ikon: "📊", label: "Jag vill förstå min elkostnad", desc: "Prishistorik och förbrukning", href: "#" },
                    { ikon: "💬", label: "Jag har en fråga", desc: "Vanliga frågor och kundservice", href: "/moduler/kundservice-triage" },
                  ].map((k) => (
                    <li key={k.label}>
                      <Link
                        to={k.href}
                        className="group flex items-center gap-4 p-4 rounded-md border border-border-subtle bg-surface hover:border-brand-accent transition-colors"
                      >
                        <span className="text-xl" aria-hidden="true">{k.ikon}</span>
                        <span className="flex-1">
                          <span className="font-medium block group-hover:text-brand-accent">{k.label}</span>
                          <span className="text-sm text-ink-secondary">{k.desc}</span>
                        </span>
                        <span className="text-ink-muted group-hover:text-brand-accent">→</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            </Annotation>
          ),
        },
      ],
    },
    {
      id: "elnat-callout",
      label: "Elnät vs elhandel",
      variants: [
        {
          key: "callout",
          label: "Blå callout — inline",
          render: () => (
            <Annotation
              label="Elnät vs elhandel — inline callout"
              audience="user"
              rationale="Inte i FAQ, inte i blogg. Högst upp, innan jämförelsen. Den enskilt viktigaste informationsbiten. Helsingborg/Ängelholm-reassurance defuserar osäkerhet hos inflyttare."
            >
              <section className="py-8">
                <div className="p-5 rounded-md bg-tint-info border-l-4 border-brand-accent flex gap-4">
                  <div className="text-2xl leading-none">💡</div>
                  <div className="flex-1">
                    <Copy
                      label="Callout-rubrik — lokal reassurance"
                      category="reassurance"
                      text="Bor du i Helsingborg eller Ängelholm?"
                      rationale="Adresserar den största osäkerhetskällan för lokala användare direkt. 'Måste jag byta nätbolag om jag byter elavtal?' är en vanlig miss-förståelse — frågan i rubriken låser in den rätta mentala modellen."
                    >
                      <p className="font-medium mb-1">Bor du i Helsingborg eller Ängelholm?</p>
                    </Copy>
                    <p className="text-sm text-ink-secondary leading-relaxed">
                      Då är vi redan ditt elnätsbolag — du behöver bara välja <strong>elhandelsavtal</strong>.{" "}
                      <strong>Elnät</strong> = ledningarna som transporterar el till ditt hem (bestämt av var du bor).{" "}
                      <strong>Elhandel</strong> = vem som säljer elen (du väljer fritt).
                    </p>
                  </div>
                </div>
              </section>
            </Annotation>
          ),
        },
        {
          key: "expand",
          label: "Expanderbar — kompakt rad",
          render: () => (
            <Annotation
              label="Elnät vs elhandel (expanderbar): en rad som öppnas vid klick"
              audience="design"
              rationale="Alternativet som sparar vertikal rymd. Förutsätter att användaren redan förstår skillnaden — sämre default för Elhandel-sidan men bra om konceptet är förklarat på översta nivån."
            >
              <section className="py-4">
                <details className="group rounded-md border-l-4 border-brand-accent bg-tint-info">
                  <summary className="px-5 py-3 cursor-pointer list-none flex items-center gap-3 font-medium">
                    <span>💡</span>
                    <span>Skillnaden mellan elnät och elhandel</span>
                    <span className="ml-auto text-ink-muted group-open:rotate-180 transition-transform">▾</span>
                  </summary>
                  <div className="px-5 pb-4 pt-1 text-sm text-ink-secondary leading-relaxed">
                    <strong>Elnät</strong> = ledningarna. Bestämt av var du bor — du kan inte välja nätägare.
                    I Helsingborg och Ängelholm är det vi. <strong>Elhandel</strong> = vem som säljer elen till dig.
                    Där väljer du helt fritt.
                  </div>
                </details>
              </section>
            </Annotation>
          ),
        },
      ],
    },
    {
      id: "jamforelse",
      label: "Avtalsjämförelse",
      variants: [
        {
          key: "cards",
          label: "3 kort — preview",
          render: () => (
            <Annotation
              label="Avtalsjämförelse — preview + länk"
              audience="design"
              rationale="Visar en förkortad jämförelse (tre kort med 'Bäst för'-linje + pris). CTA pekar till /moduler/elavtal-jamfor för full jämförelse."
            >
              <section className="py-10 border-t border-border-subtle">
                <h2 className="text-h2 mb-2">Jämför våra elavtal</h2>
                <p className="text-ink-secondary mb-6">Tre avtal, tydligt jämförda. Välj det som passar hur du använder el.</p>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  {[
                    { namn: "Säkrat pris", bast: "Vill ha förutsägbarhet", pris: "[~XXX kr/mån]", accent: false },
                    { namn: "Kvartspris", bast: "Vill ha viss stabilitet", pris: "[~XXX kr/mån]", accent: false },
                    { namn: "Månadspris (rörligt)", bast: "Är flexibel och vill spara", pris: "[~XXX kr/mån]", accent: true },
                  ].map((p) => (
                    <div key={p.namn} className={`rounded-md border-2 p-5 ${p.accent ? "border-brand-accent" : "border-border-subtle"}`}>
                      {p.accent && (
                        <Copy
                          label="Vanligaste valet — nudge"
                          category="cta"
                          text="Vanligaste valet"
                          rationale="Social proof. När 3 alternativ är likvärdiga så letar användaren efter en ankarsignal. 'Vanligaste valet' är hederligare än 'Vi rekommenderar' — informerar utan att pusha."
                        >
                          <p className="text-xs font-medium text-brand-accent mb-2 uppercase tracking-wider">Vanligaste valet</p>
                        </Copy>
                      )}
                      <h3 className="font-medium text-h5 mb-1">{p.namn}</h3>
                      <p className="text-sm text-ink-secondary mb-3">{p.bast}</p>
                      <p className="text-h4 font-medium">{p.pris}</p>
                      <p className="text-xs text-ink-muted">Lägenhet, ~2 000 kWh/år</p>
                    </div>
                  ))}
                </div>
                <Link
                  to="/moduler/elavtal-jamfor"
                  className="text-sm text-brand-accent hover:underline"
                >
                  Se fullständig jämförelse med detaljer →
                </Link>
              </section>
            </Annotation>
          ),
        },
        {
          key: "table",
          label: "Tabell — snabb skanning",
          render: () => (
            <Annotation
              label="Avtalsjämförelse (tabell): alla egenskaper i en matris"
              audience="design"
              rationale="Alternativ för den som redan jämför systematiskt. Sämre som intro men starkare för användare som vet vad de letar efter."
            >
              <section className="py-10 border-t border-border-subtle">
                <h2 className="text-h2 mb-6">Jämför våra elavtal</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-border-strong">
                        <th className="py-3 pr-4 font-medium"></th>
                        <th className="py-3 pr-4 font-medium">Säkrat pris</th>
                        <th className="py-3 pr-4 font-medium">Kvartspris</th>
                        <th className="py-3 pr-4 font-medium text-brand-accent">Månadspris</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ["Bäst för", "Förutsägbarhet", "Viss stabilitet", "Flexibilitet"],
                        ["Pris (~2 000 kWh)", "[~XXX kr/mån]", "[~XXX kr/mån]", "[~XXX kr/mån]"],
                        ["Bindningstid", "1 år", "3 mån", "Ingen"],
                        ["Prisgaranti", "Fast hela året", "Per kvartal", "Rörligt"],
                      ].map((row) => (
                        <tr key={row[0]} className="border-b border-border-subtle">
                          <td className="py-3 pr-4 font-medium text-ink-secondary">{row[0]}</td>
                          <td className="py-3 pr-4">{row[1]}</td>
                          <td className="py-3 pr-4">{row[2]}</td>
                          <td className="py-3 pr-4 text-brand-accent font-medium">{row[3]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Link to="/moduler/elavtal-jamfor" className="text-sm text-brand-accent hover:underline mt-4 inline-block">
                  Se fullständig jämförelse →
                </Link>
              </section>
            </Annotation>
          ),
        },
        {
          key: "cta-only",
          label: "CTA-block — utan preview",
          render: () => (
            <Annotation
              label="Avtalsjämförelse (CTA): kort banner som länkar till modulen"
              audience="design"
              rationale="Den minimala varianten. Ingen preview — användaren måste klicka sig vidare. Bra när resten av sidan är innehållstung och jämförelsen är klicket-bort i alla fall."
            >
              <section className="py-10 border-t border-border-subtle">
                <div className="rounded-md bg-brand-primary text-white p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <h2 className="text-h3 mb-1">Jämför våra elavtal</h2>
                    <p className="text-sm opacity-90">Tre avtal, transparent pris, utan dolda avgifter.</p>
                  </div>
                  <Link
                    to="/moduler/elavtal-jamfor"
                    className="bg-white text-brand-primary font-medium px-5 py-2.5 rounded hover:opacity-90 whitespace-nowrap"
                  >
                    Jämför och teckna →
                  </Link>
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },
    {
      id: "varde",
      label: "Värdeerbjudande",
      variants: [
        {
          key: "cols",
          label: "3 kolumner",
          render: () => (
            <Annotation
              label="Värdeerbjudande — 3 kolumner"
              audience="user"
              rationale="Komprimerat från lång punktlista till scanbar trippel. Varje påstående har en källa-placeholder — inga superlativ utan bevis."
            >
              <section className="py-10 border-t border-border-subtle">
                <h2 className="text-h2 mb-6">Varför Öresundskraft?</h2>
                <div className="grid sm:grid-cols-3 gap-6">
                  {[
                    { ikon: "🏘️", rubrik: "Ditt lokala energibolag", text: "Communityägt sedan [år]. Vinsten stannar i Helsingborg." },
                    { ikon: "📱", rubrik: "Allt på ett ställe", text: "App, faktura och tjänster — samlat för att göra det lätt att ha koll." },
                    { ikon: "💰", rubrik: "Inga dolda avgifter", text: "Reko avtal med [X öre/kWh påslag]. Du vet alltid vad du betalar." },
                  ].map((v) => (
                    <div key={v.rubrik} className="flex gap-3">
                      <span className="text-2xl" aria-hidden="true">{v.ikon}</span>
                      <div>
                        <h3 className="font-medium mb-1">{v.rubrik}</h3>
                        <p className="text-sm text-ink-secondary">{v.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </Annotation>
          ),
        },
        {
          key: "banner",
          label: "Horisontell banner",
          render: () => (
            <Annotation
              label="Värdeerbjudande (banner): en rad med 3 argument"
              audience="design"
              rationale="Alternativ som fungerar som visuell vilopaus mellan jämförelse och FAQ. Mindre fokus, men bra när man vill att jämförelsen ska dominera."
            >
              <section className="py-8 border-t border-border-subtle">
                <div className="rounded-md bg-tint-info p-5 grid sm:grid-cols-3 gap-4 text-sm">
                  {[
                    { ikon: "🏘️", t: "Lokalt · Communityägt sedan [år]" },
                    { ikon: "💰", t: "Transparent · [X öre/kWh påslag]" },
                    { ikon: "📱", t: "Allt samlat · App + Mina sidor" },
                  ].map((v) => (
                    <div key={v.t} className="flex items-center gap-2">
                      <span className="text-lg" aria-hidden="true">{v.ikon}</span>
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
    {
      id: "faq",
      label: "FAQ",
      variants: [
        {
          key: "accordion",
          label: "Accordion — 5 frågor",
          render: () => (
            <Annotation
              label="FAQ — topp 5 support-killers"
              audience="user"
              rationale="De 5 vanligaste frågorna till kundservice. Elnät vs elhandel leder. Accordion med <details>/<summary> — native HTML."
            >
              <section className="py-10 border-t border-border-subtle">
                <h2 className="text-h2 mb-6">Vanliga frågor</h2>
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
                            label="FAQ — anvisat avtal"
                            category="faq"
                            text="Vad händer om jag inte väljer avtal?"
                            rationale="Frågan är formulerad utifrån användarens perspektiv ('jag') och passivitet ('inte väljer') — inte utifrån företagets term 'anvisat avtal'. Användaren vet inte vad 'anvisat' betyder, men vet att hen riskerar att inte välja."
                          >
                            <span>{f.q}</span>
                          </Copy>
                        ) : (
                          <span>{f.q}</span>
                        )}
                        <span className={`text-ink-muted transition-transform ml-3 ${openFaq === f.id ? "rotate-180" : ""}`}>▼</span>
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
        {
          key: "grouped",
          label: "Grupperad — tre kategorier",
          render: () => (
            <Annotation
              label="FAQ (grupperad): Tre kategorier med 2–3 frågor var"
              audience="design"
              rationale="Alternativ när FAQ växer förbi 5 frågor. Grupperar efter 'Innan du tecknar' / 'Under tecknandet' / 'Efter tecknandet' — matchar kundens mentala tidslinje."
            >
              <section className="py-10 border-t border-border-subtle">
                <h2 className="text-h2 mb-6">Vanliga frågor</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { titel: "Innan du tecknar", items: ["Skillnaden mellan elnät och elhandel", "Vad behöver jag för att teckna?"] },
                    { titel: "När du tecknar", items: ["Hur snabbt börjar avtalet gälla?", "Vad händer om jag inte väljer avtal?"] },
                    { titel: "När du är kund", items: ["Kan jag byta avtal senare?", "Hur säger jag upp mitt avtal?"] },
                  ].map((g) => (
                    <div key={g.titel}>
                      <h3 className="font-medium text-brand-primary mb-3">{g.titel}</h3>
                      <ul className="space-y-2 text-sm">
                        {g.items.map((i) => (
                          <li key={i}>
                            <a href="#" className="text-ink-secondary hover:text-brand-accent flex items-start gap-2">
                              <span>→</span>
                              <span>{i}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            </Annotation>
          ),
        },
      ],
    },
    {
      id: "relaterade",
      label: "Relaterade teman",
      variants: [
        {
          key: "cards",
          label: "Bildkort — 3 kolumner",
          render: () => (
            <Annotation
              label="Koppling till relaterade teman"
              audience="design"
              rationale="Korslänkar till andra temaområden. Besökaren som tittar på el kanske också vill veta om solceller eller laddbox. 2–3 kort, inte ett separat nav."
            >
              <section className="py-10 border-t border-border-subtle">
                <h2 className="text-h2 mb-6">Passa på att utforska</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  {[
                    { titel: "Det energismarta hemmet", desc: "Alla tjänster som hjälper dig optimera din elanvändning.", href: "#" },
                    { titel: "Solceller", desc: "Producera din egen el — vi hjälper dig hela vägen.", href: "/moduler/produktinfo" },
                    { titel: "Ladda Smart", desc: "Smart laddning för elbil — hemma eller på jobbet.", href: "/moduler/produktinfo" },
                  ].map((t) => (
                    <Link
                      key={t.titel}
                      to={t.href}
                      className="group rounded-md border border-border-subtle bg-surface overflow-hidden hover:border-brand-accent hover:shadow-sm transition-all"
                    >
                      <div className="bg-tint-info aspect-[16/9] flex items-center justify-center text-3xl">📷</div>
                      <div className="p-4">
                        <h3 className="font-medium group-hover:text-brand-accent mb-1">{t.titel}</h3>
                        <p className="text-sm text-ink-secondary">{t.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            </Annotation>
          ),
        },
        {
          key: "links",
          label: "Länklista — kompakt",
          render: () => (
            <Annotation
              label="Relaterade teman (länklista): utan bilder"
              audience="design"
              rationale="Alternativ när sidan redan är visuellt tung. Listar samma temalänkar med kort beskrivning — läs-först, klick-sen."
            >
              <section className="py-8 border-t border-border-subtle">
                <h2 className="text-h4 font-medium mb-4">Passa på att utforska</h2>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 max-w-reading text-sm">
                  {[
                    { titel: "Det energismarta hemmet", desc: "Tjänster för att optimera elanvändningen" },
                    { titel: "Solceller", desc: "Producera din egen el" },
                    { titel: "Ladda Smart", desc: "Smart laddning för elbil" },
                    { titel: "Fjärrvärme", desc: "Värme från Helsingborgs panncentral" },
                  ].map((t) => (
                    <li key={t.titel}>
                      <a href="#" className="group block py-1.5">
                        <span className="font-medium group-hover:text-brand-accent">{t.titel}</span>
                        <span className="text-ink-muted"> — {t.desc}</span>
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
    {
      id: "nyheter",
      label: "Nyhetsflöde",
      variants: [
        {
          key: "cards",
          label: "3 kort — likvärdiga",
          render: () => (
            <Annotation
              label="Nyhetsflöde"
              audience="redaktör"
              rationale="Visar att sidan är levande. 3 kort med datum, kategori-tag, rubrik. Rubriken är länken — inte 'Läs mer'. Datum i <time>."
            >
              <section className="py-10 border-t border-border-subtle">
                <h2 className="text-h2 mb-6">Senaste nytt om el</h2>
                <div className="grid sm:grid-cols-3 gap-4 mb-4">
                  {[
                    { datum: "2026-04-15", tag: "Marknad", rubrik: "Elpriset sjunker inför sommaren — vad betyder det för dig?" },
                    { datum: "2026-04-08", tag: "Tjänster", rubrik: "Nu kan du följa din förbrukning i realtid via appen" },
                    { datum: "2026-03-28", tag: "Hållbarhet", rubrik: "Framtidspengen finansierade 3 nya laddstationer i Helsingborg" },
                  ].map((n) => (
                    <a key={n.rubrik} href="#" className="group block p-4 rounded-md border border-border-subtle bg-surface hover:border-brand-accent transition-all">
                      <div className="flex items-center gap-2 mb-2 text-xs text-ink-muted">
                        <time dateTime={n.datum}>{n.datum}</time>
                        <span className="px-1.5 py-0.5 rounded bg-tint-info text-brand-primary font-medium uppercase tracking-wider text-[10px]">{n.tag}</span>
                      </div>
                      <h3 className="text-sm font-medium group-hover:text-brand-accent leading-snug">{n.rubrik}</h3>
                    </a>
                  ))}
                </div>
                <a href="#" className="text-sm text-brand-accent hover:underline">Visa alla nyheter om el →</a>
              </section>
            </Annotation>
          ),
        },
        {
          key: "featured",
          label: "Utvald + 2 små",
          render: () => (
            <Annotation
              label="Nyhetsflöde (utvald): en stor + två små"
              audience="redaktör"
              rationale="Hierarkisk variant. Redaktören kan lyfta en artikel — bra när den utvalda nyheten är tidskänslig (t.ex. ett avbrott, en prisförändring)."
            >
              <section className="py-10 border-t border-border-subtle">
                <h2 className="text-h2 mb-6">Senaste nytt om el</h2>
                <div className="grid md:grid-cols-3 gap-4 mb-4">
                  <a href="#" className="group md:col-span-2 block rounded-md border border-border-subtle bg-surface overflow-hidden hover:border-brand-accent">
                    <div className="bg-tint-info aspect-[21/9] flex items-center justify-center text-4xl">📷</div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-2 text-xs text-ink-muted">
                        <time dateTime="2026-04-15">2026-04-15</time>
                        <span className="px-1.5 py-0.5 rounded bg-tint-info text-brand-primary font-medium uppercase tracking-wider text-[10px]">Marknad</span>
                      </div>
                      <h3 className="text-h4 font-medium group-hover:text-brand-accent leading-snug">
                        Elpriset sjunker inför sommaren — vad betyder det för dig?
                      </h3>
                    </div>
                  </a>
                  <div className="space-y-3">
                    {[
                      { datum: "2026-04-08", tag: "Tjänster", rubrik: "Nu kan du följa din förbrukning i realtid" },
                      { datum: "2026-03-28", tag: "Hållbarhet", rubrik: "Framtidspengen finansierade 3 nya laddstationer" },
                    ].map((n) => (
                      <a key={n.rubrik} href="#" className="group block p-3 rounded-md border border-border-subtle bg-surface hover:border-brand-accent">
                        <div className="flex items-center gap-2 mb-1 text-xs text-ink-muted">
                          <time dateTime={n.datum}>{n.datum}</time>
                          <span className="px-1.5 py-0.5 rounded bg-tint-info text-brand-primary font-medium uppercase tracking-wider text-[10px]">{n.tag}</span>
                        </div>
                        <h3 className="text-sm font-medium group-hover:text-brand-accent leading-snug">{n.rubrik}</h3>
                      </a>
                    ))}
                  </div>
                </div>
                <a href="#" className="text-sm text-brand-accent hover:underline">Visa alla nyheter om el →</a>
              </section>
            </Annotation>
          ),
        },
      ],
    },
    {
      id: "genvagar",
      label: "Genvägar",
      variants: [
        {
          key: "grid",
          label: "Grid — med beskrivning",
          render: () => (
            <Annotation
              label="Genvägar / djuplänkar"
              audience="redaktör"
              rationale="'Long tail'-ingångar för en minoritet: prishistorik, anvisat avtal, lagen om elcertifikat. Kompakt lista, inte huvudfokus."
            >
              <section className="py-10 border-t border-border-subtle">
                <h2 className="text-h4 mb-4 font-medium">Bra att veta</h2>
                <nav aria-label="Genvägar inom elhandel">
                  <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2 text-sm">
                    {[
                      { label: "Prishistorik", desc: "Se hur elpriset har förändrats" },
                      { label: "Din elhandelskostnad", desc: "Vad du betalar — och varför" },
                      { label: "Anvisat avtal", desc: "Vad händer om du inte väljer" },
                      { label: "Elens ursprung", desc: "Varifrån vår el kommer" },
                      { label: "Miljötillägg", desc: "Frivilliga miljöval" },
                      { label: "Lagen om elcertifikat", desc: "Regler för förnybar el" },
                      { label: "Ångerrätt", desc: "14 dagar enligt distansavtalslagen" },
                    ].map((g) => (
                      <li key={g.label}>
                        <a href="#" className="flex items-baseline gap-2 py-1.5 hover:text-brand-accent group">
                          <span className="text-ink-muted group-hover:text-brand-accent">→</span>
                          <span>
                            <span className="font-medium">{g.label}</span>
                            <span className="text-ink-muted"> — {g.desc}</span>
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </section>
            </Annotation>
          ),
        },
        {
          key: "tags",
          label: "Tag-cloud — kompakt",
          render: () => (
            <Annotation
              label="Genvägar (tag-cloud): bara etiketter"
              audience="design"
              rationale="Alternativ för när sidan redan är lång. Pill-format — användaren skannar labels, inte beskrivningar. Sparar ~30% vertikal yta."
            >
              <section className="py-8 border-t border-border-subtle">
                <h2 className="text-h5 font-medium mb-3">Bra att veta</h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Prishistorik", "Din elhandelskostnad", "Anvisat avtal", "Elens ursprung",
                    "Miljötillägg", "Lagen om elcertifikat", "Ångerrätt",
                  ].map((label) => (
                    <a
                      key={label}
                      href="#"
                      className="text-xs px-3 py-1.5 rounded-full border border-border-subtle bg-surface text-ink-secondary hover:border-brand-accent hover:text-brand-accent transition-colors"
                    >
                      {label}
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
        kategori="Startsida för undersida (Sidtyp 1)"
        syfte="Låta privatkunden jämföra, förstå och teckna elavtal på minsta möjliga klick — utan att behöva lämna sidan för att hitta grundinformation (elnät vs elhandel, vanliga frågor)."
        malgrupp="Privatperson i Helsingborg/Ängelholm — ny kund, inflyttare eller befintlig kund som vill byta."
        primarHandling="Klicka Teckna elavtal → jämförelse-modul."
        ton="Klar, vänlig, konkret. Inga superlativ. Ärlig om loss aversion (anvisat avtal). Lokal reassurance ('Bor du i Helsingborg…')."
      />

      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent inline-block pt-6">
        ← Översikt
      </Link>

      <BlockList pageId="privat-elhandel" blocks={blocks} />
    </div>
  );
}
