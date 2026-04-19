import { Link } from "react-router-dom";
import { Annotation } from "../../components/Annotation";
import { PRODUKTER } from "../moduler/produkt-data";

/**
 * SIDTYP 4 — Produktsida (direktköp / leadsgenerering)
 *
 * Composes Produktlisting (filtered grid) + Produktinfo preview.
 * Shows a single product hero + cross-sell grid of related products.
 */
export function Produktsida() {
  const hero = PRODUKTER.find((p) => p.id === "ladda-smart")!;
  const related = PRODUKTER.filter((p) => p.id !== "ladda-smart").slice(0, 3);

  return (
    <div className="max-w-content mx-auto px-4 sm:px-6">
      <Link to="/" className="text-sm text-ink-muted hover:text-brand-accent inline-block pt-6">← Översikt</Link>

      {/* ─── Hero product ──────────────────────────────────────────── */}
      <Annotation
        label="Produkt-hero"
        audience="design"
        rationale="Sidtypen börjar med en utvald produkt i full bredd — samma komponent som Produktinfo B-varianten men inbäddad. Priset syns direkt. CTA matchar nästa steg."
      >
        <section className="py-10 sm:py-16">
          <nav aria-label="Breadcrumb" className="text-xs text-ink-muted mb-4">
            <ol className="flex gap-1">
              <li><a href="#" className="hover:text-brand-accent">Privat</a></li>
              <li aria-hidden="true">›</li>
              <li><a href="#" className="hover:text-brand-accent">Smarta produkter</a></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" className="font-medium text-ink">{hero.namn}</li>
            </ol>
          </nav>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-md bg-tint-info aspect-[4/3] flex items-center justify-center border border-border-subtle">
              <div className="text-center text-ink-muted">
                <p className="text-5xl mb-2">📷</p>
                <p className="text-xs">{hero.bildAlt}</p>
              </div>
            </div>
            <div>
              <span className="text-eyebrow uppercase text-ink-muted">{hero.kategori}</span>
              <h1 className="text-h1 mb-2">{hero.namn}</h1>
              <p className="text-lede text-ink-secondary mb-4">{hero.tagline}</p>
              <div className="rounded-md bg-tint-notice p-4 mb-4">
                <p className="text-xs text-ink-muted">{hero.pris.typ === "fran" ? "Från" : "Pris"}</p>
                <p className="text-h2 font-medium">{hero.pris.belopp} <span className="text-sm text-ink-muted">{hero.pris.enhet}</span></p>
              </div>
              <div className="rounded-md bg-tint-info px-4 py-3 mb-5 text-sm">
                <span className="font-medium">Passar för: </span>{hero.passarFor}
              </div>
              <p className="text-sm text-ink-secondary mb-5 leading-relaxed">{hero.beskrivning}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/moduler/formular-kop" className="flex-1 text-center bg-brand-primary text-ink-onbrand font-medium py-3 rounded hover:opacity-90 transition-opacity">
                  {hero.cta.label}
                </Link>
                <button type="button" className="flex-1 border border-border-strong text-ink-secondary font-medium py-3 rounded hover:bg-tint-info transition-colors">
                  Ställ en fråga
                </button>
              </div>
              <p className="text-xs text-ink-muted text-center mt-2">Tar ca 5 min · Personnummer + adress</p>
            </div>
          </div>
        </section>
      </Annotation>

      {/* ─── Details ───────────────────────────────────────────────── */}
      <Annotation
        label="Detaljsektion"
        audience="redaktör"
        rationale="Tre kolumner: ingår / villkor / varför. Samma struktur som Produktinfo A-varianten. Enhetligt per produkt."
      >
        <section className="py-8 border-t border-border-subtle">
          <div className="grid sm:grid-cols-3 gap-6">
            <div>
              <h2 className="text-h5 font-medium mb-3">Ingår</h2>
              <ul className="space-y-1.5 text-sm text-ink-secondary">
                {hero.inkluderar.map((i) => <li key={i} className="flex gap-2"><span className="text-brand-accent">✓</span> {i}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="text-h5 font-medium mb-3">Villkor</h2>
              <ul className="space-y-1.5 text-sm text-ink-secondary">
                {hero.villkor.map((v) => <li key={v} className="flex gap-2"><span className="text-ink-muted">·</span> {v}</li>)}
              </ul>
            </div>
            <div>
              <h2 className="text-h5 font-medium mb-3">Varför {hero.namn}?</h2>
              <ul className="space-y-1.5 text-sm text-ink-secondary">
                {hero.uspar.map((u) => <li key={u} className="flex gap-2"><span className="text-brand-accent">★</span> {u}</li>)}
              </ul>
            </div>
          </div>
        </section>
      </Annotation>

      {/* ─── Related products ──────────────────────────────────────── */}
      <Annotation
        label="Relaterade produkter"
        audience="design"
        rationale="Korssälj utan att konkurrera med huvudprodukten. 3 kort i grid, samma komponent som Produktlisting. Placerad under detaljer, inte bredvid CTA."
      >
        <section className="py-10 border-t border-border-subtle">
          <h2 className="text-h2 mb-6">Fler smarta produkter</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {related.map((p) => (
              <Link key={p.id} to="/moduler/produktinfo" className="group rounded-md border border-border-subtle bg-surface overflow-hidden hover:border-brand-accent hover:shadow-sm transition-all">
                <div className="bg-tint-info aspect-[3/2] flex items-center justify-center text-3xl">📷</div>
                <div className="p-4">
                  <span className="text-[10px] uppercase tracking-wider text-ink-muted">{p.kategori}</span>
                  <h3 className="font-medium group-hover:text-brand-accent mb-1">{p.namn}</h3>
                  <p className="text-sm text-ink-secondary">{p.tagline}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/moduler/produktlisting" className="text-sm text-brand-accent hover:underline mt-4 inline-block">
            Se alla produkter →
          </Link>
        </section>
      </Annotation>
    </div>
  );
}
