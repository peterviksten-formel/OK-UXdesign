import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";
import type { Produkt } from "../produkt-data";

/**
 * VARIANT C — Köp-fokuserad
 *
 * Sticky köp-sidebar på desktop, sticky CTA-fot på mobil. Detaljer scrollar,
 * köp-beslutet följer med. E-handels-mönster.
 *
 * Pro: Hög konvertering. CTA alltid synlig.
 * Kontra: Kräver fast design-system. Svårare på mobil (vertikal scroll-låsning).
 */
export function ProduktinfoKop({
  produkt,
  inline = false,
}: {
  produkt: Produkt;
  /** När true: dölj kategori + namn + tagline (ligger redan i sidans hero). */
  inline?: boolean;
}) {
  const p = produkt;
  return (
    <div>
      <Annotation
        label="Produktinfo — köp-fokuserad med sticky sidebar"
        audience="design"
        rationale="Sticky köp-modul höger: pris, CTA, frakt-info. Vänster kolumn är scrollbar — bild, detaljer, villkor, relaterat. E-handelsmönster som konverterar bättre än klassisk produkt-layout eftersom priset alltid är synligt vid scroll."
      >
        <div className="grid lg:grid-cols-[1fr_340px] gap-8">
          {/* Main content — scrollable */}
          <div>
            {/* Hero image */}
            <div className="rounded-lg bg-tint-info aspect-[4/3] flex items-center justify-center text-ink-muted mb-6 border border-border-subtle">
              <Icon name="image" size={64} />
            </div>

            {/* Title — döljs när modulen ligger inline på en produktsida
                (kategori + namn + tagline står redan i sidans hero). */}
            {!inline && (
              <>
                <p className="text-eyebrow uppercase text-ink-muted mb-1">{p.kategori}</p>
                <h2 className="text-h1 mb-2">{p.namn}</h2>
                <p className="text-lede text-ink-secondary mb-6">{p.tagline}</p>
              </>
            )}

            {/* Description */}
            <div className="prose prose-sm max-w-none mb-8">
              <p className="text-ink-secondary leading-relaxed">{p.beskrivning}</p>
            </div>

            {/* Details — three columns (same content as Trygg/Progressiv) */}
            <div className="grid sm:grid-cols-3 gap-6 py-6 border-y border-border-subtle">
              <div>
                <h3 className="text-h5 font-medium mb-3">Ingår</h3>
                <ul className="space-y-1.5 text-sm text-ink-secondary">
                  {p.inkluderar.map((i) => (
                    <li key={i} className="flex gap-2">
                      <Icon name="check" size={14} className="text-brand-accent mt-1 shrink-0" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-h5 font-medium mb-3">Villkor</h3>
                <ul className="space-y-1.5 text-sm text-ink-secondary">
                  {p.villkor.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-h5 font-medium mb-3">Varför {p.namn}?</h3>
                <ul className="space-y-1.5 text-sm text-ink-secondary">
                  {p.uspar.map((u) => (
                    <li key={u} className="flex gap-2">
                      <Icon name="star" size={14} filled className="text-brand-accent mt-1 shrink-0" />
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Long description placeholder */}
            <div className="py-8">
              <h3 className="text-h4 font-medium mb-3">Så fungerar det</h3>
              <p className="text-ink-secondary leading-relaxed mb-4">
                Placeholder för detaljerad förklaring, tekniska specifikationer, installationsguide,
                garanti-villkor, etc. Kan innehålla accordions, bilder, videos.
              </p>
              <div className="bg-tint-info rounded-md p-5 text-sm text-ink-secondary">
                Här har du plats för 800–1200 ord detaljerad info utan att det stör köp-beslutet —
                priset och CTA:n stannar i vyn när användaren scrollar.
              </div>
            </div>
          </div>

          {/* Sticky buy-sidebar */}
          <aside className="lg:sticky lg:top-20 lg:self-start space-y-4">
            <div className="rounded-lg border-2 border-brand-accent bg-surface p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-ink-muted font-medium">
                {p.pris.typ === "fran" ? "Från" : p.pris.typ === "offert" ? "" : "Pris"}
              </p>
              {p.pris.typ === "offert" ? (
                <p className="text-h3 font-medium mb-1">Offert</p>
              ) : (
                <p className="text-display font-medium mb-1">
                  {p.pris.belopp}
                </p>
              )}
              <p className="text-sm text-ink-muted mb-4">{p.pris.enhet}</p>

              <div className="rounded-md bg-tint-info px-3 py-2 mb-4 text-xs">
                <strong className="text-brand-primary">Passar för:</strong>{" "}
                <span className="text-ink-secondary">{p.passarFor}</span>
              </div>

              <button
                type="button"
                className="w-full bg-brand-primary text-ink-onbrand font-medium py-3 rounded hover:opacity-90 transition-opacity mb-2 inline-flex items-center justify-center gap-2"
              >
                {p.cta.label}
                <Icon name="arrow_forward" size={16} />
              </button>
              <button
                type="button"
                className="w-full border border-border-strong text-ink-secondary font-medium py-3 rounded hover:bg-tint-info transition-colors text-sm"
              >
                Ställ en fråga
              </button>

              <p className="text-[11px] text-ink-muted text-center mt-3 leading-snug">
                {p.cta.typ === "kop"
                  ? "Tar ca 5 min · Personnummer + adress"
                  : p.cta.typ === "offert"
                    ? "Kostnadsfritt · Svar inom 3 arbetsdagar"
                    : "Kostnadsfritt · Inga åtaganden"}
              </p>
            </div>

            <div className="rounded-md bg-tint-info p-4 text-xs text-ink-secondary space-y-2">
              <div className="flex gap-2">
                <Icon name="local_shipping" size={16} className="text-brand-accent mt-0.5 shrink-0" />
                <span>Installation ingår i Helsingborg och Ängelholm</span>
              </div>
              <div className="flex gap-2">
                <Icon name="verified_user" size={16} className="text-brand-accent mt-0.5 shrink-0" />
                <span>5 års garanti på produkten</span>
              </div>
              <div className="flex gap-2">
                <Icon name="support_agent" size={16} className="text-brand-accent mt-0.5 shrink-0" />
                <span>Kundsupport ingår hela avtalstiden</span>
              </div>
            </div>
          </aside>
        </div>
      </Annotation>
    </div>
  );
}
