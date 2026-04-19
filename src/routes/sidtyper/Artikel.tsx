import { useState } from "react";
import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";

/**
 * SIDTYP 6 — Artikel / blogg / nyhet / pressmeddelande
 *
 * Four content types sharing one template, differentiated by:
 * - Visual framing (badge + date + author treatment)
 * - Voice register (formal → conversational)
 * - CTA expectations
 *
 * The variant switcher here toggles between the 4 types so the user
 * sees how the same template adapts.
 */

type ContentType = "nyhet" | "pressmeddelande" | "blogg" | "artikel";

const CONTENT: Record<ContentType, {
  label: string;
  badge: string;
  badgeColor: string;
  rubrik: string;
  datum: string;
  forfattare: string;
  ingress: string;
  body: string[];
  cta?: { label: string; href: string };
  ton: string;
  rationale: string;
}> = {
  nyhet: {
    label: "Nyhet",
    badge: "NYHET",
    badgeColor: "bg-brand-accent text-white",
    rubrik: "Elpriset sjunker inför sommaren — vad betyder det för dig?",
    datum: "2026-04-15",
    forfattare: "Redaktionen",
    ingress: "Spotpriset i SE4 har fallit med 20% sedan mars. Vi förklarar varför och vad det innebär för ditt avtal — oavsett om du har fast eller rörligt pris.",
    body: [
      "Sedan mars har det genomsnittliga spotpriset i elprisområde SE4 (södra Sverige) sjunkit från [X öre/kWh] till [Y öre/kWh]. Orsaken är en kombination av mildare väder, ökad vattenkraftproduktion och lägre efterfrågan.",
      "Har du rörligt avtal (Månadspris) märker du sänkningen direkt på nästa faktura. Har du fast avtal (Säkrat pris) påverkas du inte — ditt pris är låst under hela avtalsperioden.",
      "Kvartspriskunder får ett nytt pris vid nästa kvartalsskifte i juli. Det nya priset beräknas utifrån terminspriset för Q3 2026, som just nu ligger [X]% lägre än Q2.",
    ],
    cta: { label: "Jämför våra elavtal", href: "/moduler/elavtal-jamfor" },
    ton: "Saklig, informativ. Korta meningar. Siffror och fakta i fokus.",
    rationale: "Nyhet = redaktionellt innehåll om marknad, tjänster eller företaget. Neutral ton, datumstyrd, inga personliga åsikter. CTA relaterad till ämnet.",
  },
  pressmeddelande: {
    label: "Pressmeddelande",
    badge: "PRESSMEDDELANDE",
    badgeColor: "bg-brand-primary text-white",
    rubrik: "Öresundskraft investerar i havsbaserad vindkraft",
    datum: "2026-02-20",
    forfattare: "Pressbyrån, Öresundskraft AB",
    ingress: "Tillsammans med Helsingborg Energi bygger Öresundskraft nordvästra Skånes första havsbaserade vindkraftpark. Parken beräknas stå klar 2029 och förse 40 000 hushåll med förnybar el.",
    body: [
      "Öresundskraft AB och Helsingborg Energi AB har idag undertecknat en avsiktsförklaring om att gemensamt utveckla en havsbaserad vindkraftpark utanför Helsingborgs kust.",
      "Parken planeras bestå av [X] vindkraftverk med en total installerad effekt om [X] MW. Full driftstart beräknas till 2029.",
      "\"Det här är ett historiskt steg för vår region. Vi tar ansvar för framtidens energiförsörjning och skapar lokal nytta,\" säger [VD-namn], VD för Öresundskraft.",
      "Projektet är i tidig utvecklingsfas. Tillståndsprocess inleds under hösten 2026.",
    ],
    ton: "Formell, tredjeperson. Bolagsnamn utskrivet. Citat från ledning. Kontaktuppgifter i slutet.",
    rationale: "Pressmeddelande = formellt. Tredjepersonsperspektiv, inga 'du'. Kontaktuppgifter + bolagsnamn. Inga köp-CTA.",
  },
  blogg: {
    label: "Blogginlägg",
    badge: "BLOGG",
    badgeColor: "bg-tint-highlight text-brand-primary",
    rubrik: "5 sätt att sänka din elräkning utan att frysa",
    datum: "2026-03-15",
    forfattare: "Åsa, energirådgivare",
    ingress: "Du behöver inte göra om hela hemmet för att spara el. Ibland räcker det med att ändra några vanor. Här är mina fem bästa tips — testade hemma hos mig själv.",
    body: [
      "1. Sänk innetemperaturen med en grad. En grads skillnad motsvarar ungefär 5% lägre uppvärmningskostnad. Du märker knappt skillnaden, men plånboken gör det.",
      "2. Stäng av standby. TVn, datorn, kaffemaskinen — allt som har en liten lampa som lyser drar el dygnet runt. En grenuttag med strömbrytare löser det.",
      "3. Tvätta på 40° istället för 60°. Moderna tvättmedel fungerar lika bra i lägre temperaturer. Du sparar ~40% av energin per tvätt.",
      "4. LED-lampor överallt. Om du fortfarande har halogenspottar i badrummet — byt. En LED drar 80% mindre el och håller 15x längre.",
      "5. Duscha kortare. En minut kortare dusch sparar ~500 kWh per år om du har el-varmvattenberedare. Det är ~[XXX] kr.",
    ],
    cta: { label: "Boka kostnadsfri energirådgivning", href: "/moduler/produktinfo" },
    ton: "Personlig, varm. 'Jag' och 'du'. Vardagsexempel. Humor tillåtet. Namn + roll synligt.",
    rationale: "Blogg = personlig röst. Byline med namn + roll. 'Du/jag'-ton. Tips-format. CTA kopplad till tjänst (inte sälj).",
  },
  artikel: {
    label: "Fördjupning",
    badge: "FÖRDJUPNING",
    badgeColor: "bg-tint-notice text-brand-primary",
    rubrik: "Kvartspris Q2 2026: så sätts ditt nya pris",
    datum: "2026-03-01",
    forfattare: "Redaktionen",
    ingress: "Varje kvartal justeras kvartspriset baserat på terminspriset på Nord Pool. Här förklarar vi exakt hur det fungerar — och vad du kan förvänta dig de kommande tre månaderna.",
    body: [
      "Kvartspriset beräknas av Öresundskraft utifrån terminspriset för det kommande kvartalet på den nordiska elbörsen Nord Pool. Terminspriset speglar marknadens samlade bedömning av vad elen kommer att kosta.",
      "Till terminspriset adderas Öresundskrafts påslag ([X öre/kWh]) samt energiskatt och moms. Det slutgiltiga kvartspriset meddelas senast 4 veckor före kvartalsskiftet.",
      "Just nu (mars 2026) ligger terminspriset för Q2 på [X öre/kWh], att jämföra med [Y öre/kWh] för Q1. Det innebär en [ökning/minskning] med [Z]%.",
      "Om du har kvartspris-avtal och vill byta till fast pris innan det nya kvartalet börjar kan du göra det via Mina sidor. Bytet träder i kraft direkt.",
    ],
    cta: { label: "Se prishistorik", href: "#" },
    ton: "Pedagogisk, saklig. Förklarar med korta meningar. Ingen jargon utan förklaring. Siffror för transparens.",
    rationale: "Artikel = fördjupning. Förklarande, inte säljande. Pedagogisk ton med konkreta siffror. CTA till relaterat verktyg.",
  },
};

export function Artikel() {
  const [typ, setTyp] = useState<ContentType>("nyhet");
  const c = CONTENT[typ];

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent inline-block pt-6">← Översikt</Link>

      <header className="py-8 max-w-reading">
        <p className="text-eyebrow uppercase text-ink-muted mb-3">Sidtyp · Artikel / blogg / nyhet / pressmeddelande</p>
        <h1 className="text-h1 mb-3">Fyra innehållstyper, en mall</h1>
        <p className="text-lede text-ink-secondary mb-6">
          Samma sidmall för alla redaktionella innehållstyper — differentierade via badge,
          ton, byline och CTA. Växla mellan typerna nedan.
        </p>

        {/* Type switcher */}
        <div className="flex flex-wrap gap-2">
          {(Object.keys(CONTENT) as ContentType[]).map((t) => {
            const isActive = typ === t;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTyp(t)}
                className={`text-sm px-3 py-1.5 rounded-md border transition-colors ${isActive ? "bg-brand-primary text-ink-onbrand border-brand-primary" : "bg-surface text-ink-secondary border-border-subtle hover:border-brand-accent"}`}
              >
                {CONTENT[t].label}
              </button>
            );
          })}
        </div>
      </header>

      {/* ─── Article rendering ─────────────────────────────────────── */}
      <Annotation
        label="Artikelvy"
        audience="redaktör"
        rationale={c.rationale}
      >
        <article className="max-w-reading pb-10 border-t border-border-subtle pt-8" key={typ}>
          {/* Badge + date + author */}
          <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
            <span className={`font-medium px-2 py-0.5 rounded uppercase tracking-wider ${c.badgeColor}`}>
              {c.badge}
            </span>
            <time dateTime={c.datum} className="text-ink-muted">{c.datum}</time>
            <span className="text-ink-muted">·</span>
            <span className="text-ink-muted">{c.forfattare}</span>
          </div>

          <h2 className="text-h1 mb-4 leading-tight">{c.rubrik}</h2>
          <p className="text-lede text-ink-secondary mb-8 leading-relaxed">{c.ingress}</p>

          <div className="space-y-4 text-body text-ink-secondary leading-relaxed">
            {c.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {c.cta && (
            <div className="mt-8 p-5 rounded-md bg-tint-info">
              <Link
                to={c.cta.href}
                className="inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-5 py-3 rounded hover:opacity-90 transition-opacity"
              >
                {c.cta.label} <span aria-hidden="true">→</span>
              </Link>
            </div>
          )}

          {typ === "pressmeddelande" && (
            <footer className="mt-8 pt-6 border-t border-border-subtle text-xs text-ink-muted space-y-1">
              <p><strong>Kontakt:</strong> [Pressansvarig namn], [telefonnummer], [epost]</p>
              <p>Öresundskraft AB · Org.nr [XXXXXX-XXXX] · Helsingborg</p>
            </footer>
          )}
        </article>
      </Annotation>

      {/* ─── Voice differentiation guide ───────────────────────────── */}
      <Annotation
        label="Ton-guide för redaktören"
        audience="redaktör"
        rationale="Visar hur tonen skiljer sig mellan de fyra typerna. Redaktören ser direkt vilken röst som förväntas."
      >
        <section className="py-10 border-t border-border-subtle max-w-reading">
          <h2 className="text-h3 mb-4">Ton och röst per typ</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border-subtle">
                  <th className="text-left py-2 pr-4 font-medium text-ink-muted">Typ</th>
                  <th className="text-left py-2 pr-4 font-medium text-ink-muted">Ton</th>
                  <th className="text-left py-2 font-medium text-ink-muted">Byline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle">
                {(Object.entries(CONTENT) as [ContentType, typeof CONTENT[ContentType]][]).map(([, v]) => (
                  <tr key={v.label}>
                    <td className="py-2 pr-4 font-medium">{v.label}</td>
                    <td className="py-2 pr-4 text-ink-secondary">{v.ton}</td>
                    <td className="py-2 text-ink-secondary">{v.forfattare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Annotation>
    </div>
  );
}
