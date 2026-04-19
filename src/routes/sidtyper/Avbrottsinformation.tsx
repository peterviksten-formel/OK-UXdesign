import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { AVBROTT, STATUS_META } from "../moduler/avbrott-data";

/**
 * SIDTYP 2 — Avbrottsinformation
 *
 * Standalone page using the Avbrottslista module inline.
 * Structure: akut hero → avbrottslista → felanmälan CTA → FAQ.
 */
export function Avbrottsinformation() {
  const pagaendeCount = AVBROTT.filter((a) => a.status === "pagaende").length;

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent inline-block pt-6">← Översikt</Link>

      {/* ─── Hero ──────────────────────────────────────────────────── */}
      <Annotation
        label="Akut-hero"
        audience="user"
        rationale="Dynamisk hero: om pågående avbrott = röd/orange med antal. Om inga = lugn grön/blå. Felanmälan-CTA alltid synlig."
      >
        <section className={`py-10 sm:py-16 rounded-lg my-6 px-6 ${pagaendeCount > 0 ? "bg-brand-highlight/10 border border-brand-highlight/30" : "bg-tint-info"}`}>
          <nav aria-label="Breadcrumb" className="text-xs text-ink-muted mb-4">
            <ol className="flex gap-1">
              <li><a href="#" className="hover:text-brand-accent">Privat</a></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" className="font-medium text-ink">Avbrottsinformation</li>
            </ol>
          </nav>
          <h1 className="text-h1 mb-3">
            {pagaendeCount > 0 ? `${pagaendeCount} pågående avbrott` : "Inga pågående avbrott"}
          </h1>
          <p className="text-lede text-ink-secondary mb-6 max-w-reading">
            {pagaendeCount > 0
              ? "Vi arbetar med att lösa alla pågående avbrott. Se status nedan."
              : "Just nu fungerar allt som det ska i vårt nät. Se planerade underhåll nedan."}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="#" className="bg-brand-primary text-ink-onbrand font-medium px-5 py-3 rounded hover:opacity-90 transition-opacity">
              Gör felanmälan
            </a>
            <a href="#" className="border border-border-strong text-ink-secondary font-medium px-5 py-3 rounded hover:bg-tint-info transition-colors">
              Prenumerera på SMS-avisering
            </a>
          </div>
        </section>
      </Annotation>

      {/* ─── Avbrottslista (inline, not linking to module) ─────────── */}
      <Annotation
        label="Avbrottslista inline"
        audience="design"
        rationale="Hela avbrottslistan renderas direkt på sidan — ingen klick till separat modul. Filter-tabs + expanderbar tidslinje (Progressiv-varianten)."
      >
        <section className="py-8">
          <h2 className="text-h2 mb-4">Alla avbrott</h2>
          <p className="text-ink-secondary text-sm mb-4">
            Se även den fullständiga modulen:{" "}
            <Link to="/moduler/avbrottslista" className="text-brand-accent hover:underline">
              Avbrottslista med varianter →
            </Link>
          </p>
          {/* Status summary */}
          <div className="flex flex-wrap gap-4 mb-6 text-sm">
            {(["pagaende", "planerat", "avslutat"] as const).map((s) => {
              const count = AVBROTT.filter((a) => a.status === s).length;
              const meta = STATUS_META[s];
              return (
                <div key={s} className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${meta.dotColor} ${s === "pagaende" ? "animate-pulse" : ""}`} />
                  <span className="font-medium">{meta.label}</span>
                  <span className="text-ink-muted">({count})</span>
                </div>
              );
            })}
          </div>
          {/* Compact list */}
          <div className="space-y-2">
            {AVBROTT.map((a) => {
              const meta = STATUS_META[a.status];
              return (
                <div key={a.id} className={`p-4 rounded-md border bg-surface flex flex-wrap items-center gap-3 text-sm ${a.status === "pagaende" ? "border-brand-highlight" : "border-border-subtle"}`}>
                  <span className={`w-2 h-2 rounded-full ${meta.dotColor} ${a.status === "pagaende" ? "animate-pulse" : ""}`} />
                  <span className="font-medium flex-1 min-w-0 truncate">{a.rubrik}</span>
                  <span className="text-ink-muted">{a.omrade}</span>
                  <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded ${meta.color}`}>{meta.label}</span>
                </div>
              );
            })}
          </div>
        </section>
      </Annotation>

      {/* ─── FAQ ──────────────────────────────────────────────────── */}
      <Annotation
        label="FAQ — avbrott"
        audience="user"
        rationale="Specifika frågor om avbrott: vad gör jag, vem ringer jag, får jag ersättning. Minskar inkommande samtal."
      >
        <section className="py-10 border-t border-border-subtle max-w-reading">
          <h2 className="text-h3 mb-4">Vanliga frågor om avbrott</h2>
          <div className="space-y-2">
            {[
              { q: "Vad ska jag göra vid strömavbrott?", a: "Kontrollera om avbrottet redan är anmält ovan. Är det inte listat — ring felanmälan [08-455 44 00], dygnet runt." },
              { q: "Får jag ersättning vid långt avbrott?", a: "Avbrott över 12 timmar ger rätt till avbrottsersättning enligt ellagen. Vi kontaktar berörda kunder automatiskt." },
              { q: "Kan jag få SMS när strömmen är tillbaka?", a: "Ja — klicka 'Prenumerera på SMS-avisering' ovan. Du får besked vid start, uppdatering och slut." },
            ].map((f) => (
              <details key={f.q} className="group border border-border-subtle rounded-md bg-surface">
                <summary className="px-5 py-3 cursor-pointer list-none flex items-center justify-between hover:bg-tint-info rounded-md font-medium text-sm">
                  {f.q}
                  <span className="text-ink-muted group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <div className="px-5 pb-4 text-sm text-ink-secondary leading-relaxed border-t border-border-subtle pt-3">
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      </Annotation>
    </div>
  );
}
