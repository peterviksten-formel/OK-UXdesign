import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";
import type { Produkt } from "../produkt-data";

/**
 * VARIANT A, Trygg
 *
 * Traditional product detail page. Image left, info right (desktop).
 * Plain spec table + bullet list of inclusions. CTA at bottom of info.
 * No tabs, no progressive disclosure. All information visible at once.
 */
export function ProduktinfoTrygg({
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
        label="Produktöversikt"
        audience="design"
        rationale="Klassisk tvåkolumnslayout: bild vänster, info höger. All info synlig direkt, ingen accordion, inga tabs. Läsbarheten prioriteras."
      >
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Image placeholder */}
          <div className="rounded-md bg-tint-info aspect-[4/3] flex items-center justify-center border border-border-subtle">
            <div className="text-center text-ink-muted">
              <Icon name="image" size={48} className="mb-2" />
              <p className="text-xs">{p.bildAlt}</p>
            </div>
          </div>

          {/* Product info */}
          <div>
            {/* Header döljs när modulen ligger inline på en produktsida
                (kategori + namn + tagline står redan i sidans hero). */}
            {!inline && (
              <>
                <p className="text-eyebrow uppercase text-ink-muted mb-1">{p.kategori}</p>
                <h2 className="text-h2 mb-2">{p.namn}</h2>
                <p className="text-lede text-ink-secondary mb-4">{p.tagline}</p>
              </>
            )}

            {/* Price */}
            <div className="rounded-md bg-tint-notice p-4 mb-4">
              {p.pris.typ === "offert" ? (
                <p className="font-medium">Pris: Offert efter besiktning</p>
              ) : (
                <p className="font-medium">
                  {p.pris.typ === "fran" ? "Från " : ""}
                  <span className="text-h3">{p.pris.belopp}</span>{" "}
                  <span className="text-sm text-ink-muted">{p.pris.enhet}</span>
                </p>
              )}
            </div>

            <p className="text-sm text-ink-secondary mb-4 leading-relaxed">{p.beskrivning}</p>

            <button
              type="button"
              className="w-full bg-brand-primary text-ink-onbrand font-medium py-3 rounded hover:opacity-90 transition-opacity mb-2"
            >
              {p.cta.label}
            </button>
            <p className="text-xs text-ink-muted text-center">
              {p.cta.typ === "kop" ? "Tar ca 5 min · Personnummer + adress" :
               p.cta.typ === "offert" ? "Kostnadsfritt · Svar inom 3 arbetsdagar" :
               "Kostnadsfritt · Inga åtaganden"}
            </p>
          </div>
        </div>
      </Annotation>

      {/* Details below the fold */}
      <Annotation
        label="Detaljsektion"
        audience="redaktör"
        rationale="Tre kolumner: ingår / villkor / argument. Symmetrisk layout gör det enkelt att jämföra med andra produkter. Redaktören fyller i tabellformat."
      >
        <div className="grid sm:grid-cols-3 gap-6 border-t border-border-subtle pt-6">
          <div>
            <h3 className="text-h5 font-medium mb-3">Ingår</h3>
            <ul className="space-y-1.5 text-sm text-ink-secondary">
              {p.inkluderar.map((i) => (
                <li key={i} className="flex gap-2"><Icon name="check" size={16} className="text-brand-accent mt-0.5" /> {i}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-h5 font-medium mb-3">Villkor</h3>
            <ul className="space-y-1.5 text-sm text-ink-secondary">
              {p.villkor.map((v) => (
                <li key={v} className="flex gap-2"><span className="text-ink-muted">·</span> {v}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-h5 font-medium mb-3">Varför {p.namn}?</h3>
            <ul className="space-y-1.5 text-sm text-ink-secondary">
              {p.uspar.map((u) => (
                <li key={u} className="flex gap-2"><Icon name="star" size={16} filled className="text-brand-accent mt-0.5" /> {u}</li>
              ))}
            </ul>
          </div>
        </div>
      </Annotation>
    </div>
  );
}
