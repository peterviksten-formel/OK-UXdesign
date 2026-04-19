import { useState } from "react";
import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";

/**
 * SIDTYP 1 — Startsida för undersida: Privat Elhandel
 *
 * The worked example. Composes modules into a full page with the
 * 8-section structure from the Sidtyp brief:
 * 1. Hero + CTA
 * 2. Intentbaserad routing ("Vem är du?")
 * 3. Avtalsjämförelse (→ elavtal-jamfor modul)
 * 4. Värdeerbjudande ("Varför Öresundskraft?")
 * 5. Utbildande innehåll / Guide
 * 6. Koppling till relaterade teman
 * 7. Nyhetsflöde
 * 8. Genvägar / djuplänkar
 */

export function PrivatElhandel() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const faqs = [
    { id: "elnat", q: "Vad är skillnaden mellan elnät och elhandel?", a: "Elnät är de fysiska ledningarna som transporterar el till ditt hem — du kan inte välja nätägare. Elhandel är vem som säljer elen till dig — här väljer du fritt. Bor du i Helsingborg eller Ängelholm är Öresundskraft redan ditt nätbolag." },
    { id: "anvisat", q: "Vad händer om jag inte väljer avtal?", a: "Då får du ett anvisat avtal som oftast är dyrare. Det är tillfälligt och du kan byta gratis — det tar 3 minuter." },
    { id: "behover", q: "Vad behöver jag för att teckna?", a: "Personnummer och den adress där du vill ha el. Har du inte ett elnätsavtal sedan tidigare ordnar vi det också." },
    { id: "tid", q: "Hur snabbt börjar avtalet gälla?", a: "Normalt inom 2–4 veckor. Vid flytt kan det gå snabbare om anmälan görs i tid." },
    { id: "byta", q: "Kan jag byta avtal senare?", a: "Ja. Avtal utan bindningstid kan sägas upp med en månads uppsägningstid. Logga in på Mina sidor för att byta." },
  ];

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent inline-block pt-6">← Översikt</Link>

      {/* ─── 1. HERO ───────────────────────────────────────────────────── */}
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
            <h1 className="text-display sm:text-display mb-4 leading-tight">
              Välj elavtal som passar dig
            </h1>
            <p className="text-lede text-ink-secondary mb-6 leading-relaxed">
              Jämför våra tre avtal, se uppskattad kostnad och teckna direkt — utan dolda avgifter,
              utan bindningstid om du inte vill.
            </p>
            <div className="flex flex-wrap gap-3 mb-3">
              <Link
                to="/moduler/elavtal-jamfor"
                className="bg-brand-primary text-ink-onbrand font-medium px-6 py-3 rounded hover:opacity-90 transition-opacity"
              >
                Teckna elavtal
              </Link>
              <a
                href="#"
                className="border border-border-strong text-ink-secondary font-medium px-6 py-3 rounded hover:bg-tint-info transition-colors"
              >
                Logga in på Mina sidor
              </a>
            </div>
            <p className="text-xs text-ink-muted">
              Tar ca 3 minuter · Du behöver personnummer och adress · 14 dagars ångerrätt
            </p>
          </div>
        </section>
      </Annotation>

      {/* ─── 2. INTENTBASERAD ROUTING ──────────────────────────────────── */}
      <Annotation
        label="Intentkort: 'Vad vill du göra?'"
        audience="user"
        rationale="Ersätter den nuvarande punktlistan 'Vem är du?'. Varje kort = en intention, inte en persona. Korten leder end-to-end — ingen landar på 'Kontakta oss'. Ikoner dekorativa, texten bär allt."
      >
        <section className="py-10 border-t border-border-subtle">
          <h2 className="text-h2 mb-6">Vad vill du göra?</h2>
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

      {/* ─── 3. ELNÄT VS ELHANDEL ─────────────────────────────────────── */}
      <Annotation
        label="Elnät vs elhandel — inline callout"
        audience="user"
        rationale="Inte i FAQ, inte i blogg. Högst upp, innan jämförelsen. Den enskilt viktigaste informationsbiten. Helsingborg/Ängelholm-reassurance defuserar osäkerhet hos inflyttare."
      >
        <section className="py-8">
          <div className="p-5 rounded-md bg-tint-info border-l-4 border-brand-accent flex gap-4">
            <div className="text-2xl leading-none">💡</div>
            <div className="flex-1">
              <p className="font-medium mb-1">Bor du i Helsingborg eller Ängelholm?</p>
              <p className="text-sm text-ink-secondary leading-relaxed">
                Då är vi redan ditt elnätsbolag — du behöver bara välja <strong>elhandelsavtal</strong>.{" "}
                <strong>Elnät</strong> = ledningarna som transporterar el till ditt hem (bestämt av var du bor).{" "}
                <strong>Elhandel</strong> = vem som säljer elen (du väljer fritt).
              </p>
            </div>
          </div>
        </section>
      </Annotation>

      {/* ─── 4. AVTALSJÄMFÖRELSE (preview → modul) ─────────────────────── */}
      <Annotation
        label="Avtalsjämförelse — preview + länk"
        audience="design"
        rationale="Visar en förkortad jämförelse direkt på sidan (tre kort med 'Bäst för'-linje + pris). CTA pekar till /moduler/elavtal-jamfor för full jämförelse med detaljer."
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
                {p.accent && <p className="text-xs font-medium text-brand-accent mb-2 uppercase tracking-wider">Vanligaste valet</p>}
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

      {/* ─── 5. VÄRDEERBJUDANDE ────────────────────────────────────────── */}
      <Annotation
        label="Värdeerbjudande — 3 kolumner"
        audience="user"
        rationale="Komprimerat från lång punktlista till scanbar trippel. Varje påstående har en källa-placeholder — inga superlativ utan bevis. Ikoner dekorativa."
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

      {/* ─── 6. FAQ — TOP SUPPORT-KILLERS ─────────────────────────────── */}
      <Annotation
        label="FAQ — topp 5 support-killers"
        audience="user"
        rationale="De 5 vanligaste frågorna till kundservice. Elnät vs elhandel leder. Accordion med <details>/<summary> — native HTML. Anvisat avtal-frågan har ärlig loss aversion, inte skrämselpropaganda."
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
                  {f.q}
                  <span className={`text-ink-muted transition-transform ${openFaq === f.id ? "rotate-180" : ""}`}>▼</span>
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

      {/* ─── 7. RELATERADE TEMAN ──────────────────────────────────────── */}
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

      {/* ─── 8. NYHETER ───────────────────────────────────────────────── */}
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

      {/* ─── 9. GENVÄGAR ──────────────────────────────────────────────── */}
      <Annotation
        label="Genvägar / djuplänkar"
        audience="redaktör"
        rationale="'Long tail'-ingångar för en minoritet: prishistorik, anvisat avtal, lagen om elcertifikat. Kompakt lista, inte huvudfokus. Placerad sist, före footer."
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
    </div>
  );
}
