import { useState } from "react";
import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { Copy } from "../../components/Copy";
import { PageBrief } from "../../components/PageBrief";
import { BlockList, type BlockDef } from "../../components/Block";
import { SketchFrame, Bar, Row, Box, Pill } from "../../components/Sketch";
import { Icon } from "../../components/Icon";

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
          preview: (
            <SketchFrame>
              <Bar w="40%" h={2} tone="muted" />
              <Bar w="90%" h={8} tone="primary" />
              <Bar w="75%" h={3} tone="muted" />
              <Row gap={3}>
                <Bar w={26} h={6} tone="primary" />
                <Bar w={22} h={6} tone="line" />
              </Row>
              <Bar w="60%" h={2} tone="muted" />
            </SketchFrame>
          ),
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
          preview: (
            <SketchFrame>
              <Bar w="40%" h={2} tone="muted" />
              <Row gap={4} style={{ alignItems: "center" }}>
                <Bar w="55%" h={6} tone="primary" />
                <Bar w={28} h={6} tone="primary" />
              </Row>
              <Bar w="100%" h={1} tone="line" />
            </SketchFrame>
          ),
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
          preview: (
            <SketchFrame>
              <Row gap={3} style={{ flex: 1 }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                  <Bar w="70%" h={6} tone="primary" />
                  <Bar w="90%" h={2} tone="muted" />
                  <Bar w={22} h={5} tone="primary" />
                </div>
                <Box accent grow>
                  <Pill accent /><Pill accent /><Pill accent />
                </Box>
              </Row>
            </SketchFrame>
          ),
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
                      { ikon: "location_city", t: "Ditt lokala energibolag" },
                      { ikon: "payments", t: "Inga dolda avgifter" },
                      { ikon: "smartphone", t: "Allt samlat i appen" },
                    ].map((v) => (
                      <li key={v.t} className="flex items-center gap-3 font-medium">
                        <Icon name={v.ikon} size={22} className="text-brand-accent" />
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
          preview: (
            <SketchFrame>
              <Bar w="35%" h={3} tone="primary" />
              <Row gap={2} style={{ flex: 1 }}>
                {[0, 1, 2].map((i) => (
                  <Box key={i} grow>
                    <Bar w="60%" h={2} tone="primary" />
                    <Bar w="90%" h={1.5} tone="muted" />
                  </Box>
                ))}
              </Row>
              <Row gap={2} style={{ flex: 1 }}>
                {[0, 1].map((i) => (
                  <Box key={i} grow>
                    <Bar w="60%" h={2} tone="primary" />
                    <Bar w="90%" h={1.5} tone="muted" />
                  </Box>
                ))}
                <div style={{ flex: 1 }} />
              </Row>
            </SketchFrame>
          ),
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
        {
          key: "list",
          label: "Vertikal lista — kompaktare",
          preview: (
            <SketchFrame>
              <Bar w="40%" h={3} tone="primary" />
              {[0, 1, 2, 3].map((i) => (
                <Box key={i} style={{ padding: 3 }}>
                  <Row gap={3} style={{ alignItems: "center" }}>
                    <Bar w={6} h={6} tone="accent" />
                    <Bar w="60%" h={2} tone="primary" />
                  </Row>
                </Box>
              ))}
            </SketchFrame>
          ),
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
                    { ikon: "edit", label: "Jag vill teckna elavtal", desc: "Ny kund eller saknar avtal", href: "/moduler/elavtal-jamfor" },
                    { ikon: "sync", label: "Jag vill byta elavtal", desc: "Befintlig kund", href: "#" },
                    { ikon: "home", label: "Jag ska flytta", desc: "Flytta inom, till eller från nätet", href: "#" },
                    { ikon: "monitoring", label: "Jag vill förstå min elkostnad", desc: "Prishistorik och förbrukning", href: "#" },
                    { ikon: "chat_bubble", label: "Jag har en fråga", desc: "Vanliga frågor och kundservice", href: "/moduler/kundservice-triage" },
                  ].map((k) => (
                    <li key={k.label}>
                      <Link
                        to={k.href}
                        className="group flex items-center gap-4 p-4 rounded-md border border-border-subtle bg-surface hover:border-brand-accent transition-colors"
                      >
                        <Icon name={k.ikon} size={22} className="text-brand-accent" />
                        <span className="flex-1">
                          <span className="font-medium block group-hover:text-brand-accent">{k.label}</span>
                          <span className="text-sm text-ink-secondary">{k.desc}</span>
                        </span>
                        <Icon name="arrow_forward" size={18} className="text-ink-muted group-hover:text-brand-accent" />
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
          preview: (
            <SketchFrame>
              <div style={{ flex: 1 }} />
              <Box accent style={{ padding: 4 }}>
                <Row gap={3} style={{ alignItems: "flex-start" }}>
                  <Bar w={4} h={20} tone="accent" rounded={false} />
                  <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                    <Bar w="70%" h={3} tone="primary" />
                    <Bar w="95%" h={1.5} tone="muted" />
                    <Bar w="80%" h={1.5} tone="muted" />
                  </div>
                </Row>
              </Box>
              <div style={{ flex: 1 }} />
            </SketchFrame>
          ),
          render: () => (
            <Annotation
              label="Elnät vs elhandel — inline callout"
              audience="user"
              rationale="Inte i FAQ, inte i blogg. Högst upp, innan jämförelsen. Den enskilt viktigaste informationsbiten. Helsingborg/Ängelholm-reassurance defuserar osäkerhet hos inflyttare."
            >
              <section className="py-8">
                <div className="p-5 rounded-md bg-tint-info border-l-4 border-brand-accent flex gap-4">
                  <Icon name="lightbulb" size={28} className="text-brand-accent" />
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
          preview: (
            <SketchFrame>
              <div style={{ flex: 1 }} />
              <Box accent style={{ padding: 4 }}>
                <Row gap={3} style={{ alignItems: "center" }}>
                  <Bar w={4} h={8} tone="accent" rounded={false} />
                  <Bar w="60%" h={3} tone="primary" />
                  <div style={{ flex: 1 }} />
                  <Bar w={4} h={3} tone="muted" />
                </Row>
              </Box>
              <div style={{ flex: 1 }} />
            </SketchFrame>
          ),
          render: () => (
            <Annotation
              label="Elnät vs elhandel (expanderbar): en rad som öppnas vid klick"
              audience="design"
              rationale="Alternativet som sparar vertikal rymd. Förutsätter att användaren redan förstår skillnaden — sämre default för Elhandel-sidan men bra om konceptet är förklarat på översta nivån."
            >
              <section className="py-4">
                <details className="group rounded-md border-l-4 border-brand-accent bg-tint-info">
                  <summary className="px-5 py-3 cursor-pointer list-none flex items-center gap-3 font-medium">
                    <Icon name="lightbulb" size={20} className="text-brand-accent" />
                    <span>Skillnaden mellan elnät och elhandel</span>
                    <Icon name="expand_more" size={20} className="ml-auto text-ink-muted group-open:rotate-180 transition-transform" />
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
          preview: (
            <SketchFrame>
              <Bar w="40%" h={3} tone="primary" />
              <Row gap={2} style={{ flex: 1 }}>
                <Box grow><Bar w="60%" h={2} tone="primary" /><Bar w="90%" h={1.5} tone="muted" /><Bar w="40%" h={4} tone="primary" /></Box>
                <Box grow><Bar w="60%" h={2} tone="primary" /><Bar w="90%" h={1.5} tone="muted" /><Bar w="40%" h={4} tone="primary" /></Box>
                <Box accent grow><Bar w="70%" h={1.5} tone="accent" /><Bar w="60%" h={2} tone="primary" /><Bar w="40%" h={4} tone="primary" /></Box>
              </Row>
            </SketchFrame>
          ),
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
          preview: (
            <SketchFrame>
              <Bar w="40%" h={3} tone="primary" />
              <Box style={{ padding: 3, gap: 3 }}>
                <Row gap={3}>
                  <Bar w="22%" h={2} tone="primary" />
                  <Bar w="22%" h={2} tone="primary" />
                  <Bar w="22%" h={2} tone="primary" />
                  <Bar w="22%" h={2} tone="accent" />
                </Row>
                <Bar w="100%" h={0.5} tone="line" />
                <Row gap={3}><Bar w="22%" h={1.5} tone="muted" /><Bar w="22%" h={1.5} tone="muted" /><Bar w="22%" h={1.5} tone="muted" /><Bar w="22%" h={1.5} tone="muted" /></Row>
                <Bar w="100%" h={0.5} tone="line" />
                <Row gap={3}><Bar w="22%" h={1.5} tone="muted" /><Bar w="22%" h={1.5} tone="muted" /><Bar w="22%" h={1.5} tone="muted" /><Bar w="22%" h={1.5} tone="muted" /></Row>
              </Box>
            </SketchFrame>
          ),
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
          preview: (
            <SketchFrame>
              <div style={{ flex: 1 }} />
              <div style={{ background: "var(--color-brand-primary)", padding: 6, borderRadius: 3, display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                  <Bar w="80%" h={3} tone="line" />
                  <Bar w="55%" h={1.5} tone="line" />
                </div>
                <div style={{ width: 28, height: 8, background: "#fff", borderRadius: 2 }} />
              </div>
              <div style={{ flex: 1 }} />
            </SketchFrame>
          ),
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
          preview: (
            <SketchFrame>
              <Bar w="50%" h={3} tone="primary" />
              <Row gap={3} style={{ flex: 1 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ flex: 1, display: "flex", gap: 2 }}>
                    <Bar w={6} h={6} tone="accent" />
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                      <Bar w="70%" h={2} tone="primary" />
                      <Bar w="90%" h={1.5} tone="muted" />
                    </div>
                  </div>
                ))}
              </Row>
            </SketchFrame>
          ),
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
                    { ikon: "location_city", rubrik: "Ditt lokala energibolag", text: "Communityägt sedan [år]. Vinsten stannar i Helsingborg." },
                    { ikon: "smartphone", rubrik: "Allt på ett ställe", text: "App, faktura och tjänster — samlat för att göra det lätt att ha koll." },
                    { ikon: "payments", rubrik: "Inga dolda avgifter", text: "Reko avtal med [X öre/kWh påslag]. Du vet alltid vad du betalar." },
                  ].map((v) => (
                    <div key={v.rubrik} className="flex gap-3">
                      <Icon name={v.ikon} size={26} className="text-brand-accent" />
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
          preview: (
            <SketchFrame>
              <div style={{ flex: 1 }} />
              <Box accent style={{ padding: 4 }}>
                <Row gap={5} style={{ alignItems: "center" }}>
                  {[0, 1, 2].map((i) => (
                    <div key={i} style={{ flex: 1, display: "flex", gap: 2, alignItems: "center" }}>
                      <Bar w={4} h={4} tone="accent" />
                      <Bar w="80%" h={2} tone="primary" />
                    </div>
                  ))}
                </Row>
              </Box>
              <div style={{ flex: 1 }} />
            </SketchFrame>
          ),
          render: () => (
            <Annotation
              label="Värdeerbjudande (banner): en rad med 3 argument"
              audience="design"
              rationale="Alternativ som fungerar som visuell vilopaus mellan jämförelse och FAQ. Mindre fokus, men bra när man vill att jämförelsen ska dominera."
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
    {
      id: "faq",
      label: "FAQ",
      variants: [
        {
          key: "accordion",
          label: "Accordion — 5 frågor",
          preview: (
            <SketchFrame>
              <Bar w="40%" h={3} tone="primary" />
              {[0, 1, 2, 3, 4].map((i) => (
                <Box key={i} style={{ padding: 3, gap: 0 }}>
                  <Row gap={2} style={{ alignItems: "center" }}>
                    <Bar w="85%" h={2} tone="primary" />
                    <div style={{ flex: 1 }} />
                    <Bar w={3} h={2} tone="muted" />
                  </Row>
                </Box>
              ))}
            </SketchFrame>
          ),
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
                        <Icon name="expand_more" size={20} className={`text-ink-muted transition-transform ml-3 ${openFaq === f.id ? "rotate-180" : ""}`} />
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
          preview: (
            <SketchFrame>
              <Bar w="40%" h={3} tone="primary" />
              <Row gap={3} style={{ flex: 1 }}>
                {[0, 1, 2].map((col) => (
                  <div key={col} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                    <Bar w="90%" h={2} tone="accent" />
                    <Bar w="80%" h={1.5} tone="muted" />
                    <Bar w="85%" h={1.5} tone="muted" />
                    <Bar w="75%" h={1.5} tone="muted" />
                  </div>
                ))}
              </Row>
            </SketchFrame>
          ),
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
                              <Icon name="arrow_forward" size={16} className="mt-0.5" />
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
          preview: (
            <SketchFrame>
              <Bar w="40%" h={3} tone="primary" />
              <Row gap={2} style={{ flex: 1 }}>
                {[0, 1, 2].map((i) => (
                  <Box key={i} grow style={{ padding: 0, gap: 0 }}>
                    <div style={{ background: "var(--color-surface-info)", flex: 1, minHeight: 14 }} />
                    <div style={{ padding: 2, display: "flex", flexDirection: "column", gap: 2 }}>
                      <Bar w="70%" h={2} tone="primary" />
                      <Bar w="90%" h={1.5} tone="muted" />
                    </div>
                  </Box>
                ))}
              </Row>
            </SketchFrame>
          ),
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
                      <div className="bg-tint-info aspect-[16/9] flex items-center justify-center text-ink-muted">
                        <Icon name="image" size={40} />
                      </div>
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
          preview: (
            <SketchFrame>
              <Bar w="40%" h={3} tone="primary" />
              <Row gap={4} style={{ flex: 1 }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                  {[0, 1].map((i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      <Bar w="60%" h={2} tone="primary" />
                      <Bar w="90%" h={1.5} tone="muted" />
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                  {[0, 1].map((i) => (
                    <div key={i} style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      <Bar w="60%" h={2} tone="primary" />
                      <Bar w="90%" h={1.5} tone="muted" />
                    </div>
                  ))}
                </div>
              </Row>
            </SketchFrame>
          ),
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
          preview: (
            <SketchFrame>
              <Bar w="50%" h={3} tone="primary" />
              <Row gap={2} style={{ flex: 1 }}>
                {[0, 1, 2].map((i) => (
                  <Box key={i} grow>
                    <Row gap={2}><Bar w={10} h={1.5} tone="muted" /><Bar w={8} h={1.5} tone="accent" /></Row>
                    <Bar w="85%" h={1.5} tone="primary" />
                    <Bar w="70%" h={1.5} tone="primary" />
                  </Box>
                ))}
              </Row>
              <Bar w={20} h={1.5} tone="accent" />
            </SketchFrame>
          ),
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
          preview: (
            <SketchFrame>
              <Bar w="50%" h={3} tone="primary" />
              <Row gap={2} style={{ flex: 1 }}>
                <Box style={{ flex: 2, padding: 0 }}>
                  <div style={{ background: "var(--color-surface-info)", height: 18 }} />
                  <div style={{ padding: 2, display: "flex", flexDirection: "column", gap: 1 }}>
                    <Bar w="60%" h={1.5} tone="muted" />
                    <Bar w="90%" h={2} tone="primary" />
                  </div>
                </Box>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box><Bar w="70%" h={1.5} tone="muted" /><Bar w="90%" h={1.5} tone="primary" /></Box>
                  <Box><Bar w="70%" h={1.5} tone="muted" /><Bar w="90%" h={1.5} tone="primary" /></Box>
                </div>
              </Row>
            </SketchFrame>
          ),
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
                    <div className="bg-tint-info aspect-[21/9] flex items-center justify-center text-ink-muted">
                      <Icon name="image" size={56} />
                    </div>
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
          preview: (
            <SketchFrame>
              <Bar w="40%" h={3} tone="primary" />
              <Row gap={3} style={{ flex: 1 }}>
                {[0, 1, 2].map((col) => (
                  <div key={col} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
                    {[0, 1].map((i) => (
                      <div key={i} style={{ display: "flex", gap: 2, alignItems: "center" }}>
                        <Bar w={3} h={2} tone="accent" />
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
                          <Bar w="70%" h={1.5} tone="primary" />
                          <Bar w="90%" h={1} tone="muted" />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </Row>
            </SketchFrame>
          ),
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
                          <Icon name="arrow_forward" size={14} className="text-ink-muted group-hover:text-brand-accent" />
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
          preview: (
            <SketchFrame>
              <Bar w="40%" h={3} tone="primary" />
              <Row gap={2}>
                <div style={{ padding: "2px 6px", border: "1px solid var(--color-border-subtle)", borderRadius: 999 }}><Bar w={12} h={2} tone="primary" /></div>
                <div style={{ padding: "2px 6px", border: "1px solid var(--color-border-subtle)", borderRadius: 999 }}><Bar w={16} h={2} tone="primary" /></div>
                <div style={{ padding: "2px 6px", border: "1px solid var(--color-border-subtle)", borderRadius: 999 }}><Bar w={10} h={2} tone="primary" /></div>
              </Row>
              <Row gap={2}>
                <div style={{ padding: "2px 6px", border: "1px solid var(--color-border-subtle)", borderRadius: 999 }}><Bar w={14} h={2} tone="primary" /></div>
                <div style={{ padding: "2px 6px", border: "1px solid var(--color-border-subtle)", borderRadius: 999 }}><Bar w={18} h={2} tone="primary" /></div>
              </Row>
              <Row gap={2}>
                <div style={{ padding: "2px 6px", border: "1px solid var(--color-border-subtle)", borderRadius: 999 }}><Bar w={10} h={2} tone="primary" /></div>
                <div style={{ padding: "2px 6px", border: "1px solid var(--color-border-subtle)", borderRadius: 999 }}><Bar w={20} h={2} tone="primary" /></div>
              </Row>
            </SketchFrame>
          ),
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
