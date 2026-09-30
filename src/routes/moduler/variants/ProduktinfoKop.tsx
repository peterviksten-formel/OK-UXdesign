import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";
import type { Produkt } from "../produkt-data";

/**
 * VARIANT C, Köpfokuserad
 *
 * En köpruta med pris och knappar följer med i högerkanten när kunden
 * scrollar genom detaljerna. På mobil blir den en fast list längst ned.
 * Samma mönster som i större webbshoppar.
 *
 * För: köpknappen syns hela tiden, vilket underlättar beslut.
 * Emot: kräver noggrann design, särskilt på mobil där den fasta listen
 * tar plats från innehållet.
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
  const trygghetsrad =
    p.cta.typ === "kop"
      ? "Tar cirka 5 minuter · Du behöver personnummer och adress"
      : p.cta.typ === "offert"
        ? "Kostnadsfritt · Svar inom 3 arbetsdagar"
        : "Kostnadsfritt · Du förbinder dig inte till något";
  return (
    <div>
      <Annotation
        label="Produktinfo med köpruta som följer med"
        audience="design"
        rationale="Till vänster bild, beskrivning och detaljer som kunden scrollar igenom. Till höger en köpruta med pris och knappar som stannar kvar i bild. Kunden kan läsa länge utan att tappa bort var man köper."
      >
        <div className="grid lg:grid-cols-[1fr_340px] gap-8">
          {/* Huvudinnehåll som scrollar */}
          <div>
            {/* Produktbild */}
            <div className="rounded-lg bg-tint-info aspect-[4/3] flex items-center justify-center text-ink-muted mb-6 border border-border-subtle">
              <Icon name="image" size={64} />
            </div>

            {/* Rubrikblocket döljs när modulen ligger i en produktsida,
                eftersom kategori, namn och nyttomening redan står i sidans hero. */}
            {!inline && (
              <>
                <p className="text-eyebrow uppercase text-ink-muted mb-1">{p.kategori}</p>
                <Copy
                  label="Produktnamn som rubrik"
                  category="rubrik"
                  text={p.namn}
                  rationale="Produktens namn står ensamt som rubrik, precis som kunden skriver det i en sökning. Lägg inte till säljord i rubriken; nyttan förklaras i meningen under."
                >
                  <h2 className="text-h1 mb-2">{p.namn}</h2>
                </Copy>
                <p className="text-lede text-ink-secondary mb-6">{p.tagline}</p>
              </>
            )}

            {/* Beskrivning */}
            <div className="prose prose-sm max-w-none mb-8">
              <p className="text-ink-secondary leading-relaxed">{p.beskrivning}</p>
            </div>

            {/* Detaljer i tre kolumner (samma innehåll som i Trygg och Progressiv) */}
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

            {/* Platshållare för fördjupande text */}
            <Annotation
              label="Fördjupning: så fungerar det"
              audience="redaktör"
              rationale="Här skriver du den längre förklaringen: hur produkten fungerar, hur installationen går till och vad garantin täcker. Dela upp texten med mellanrubriker så att kunden kan skumma. Köprutan stannar kvar medan hen läser."
            >
            <div className="py-8">
              <Copy
                label="Rubrik för fördjupning"
                category="rubrik"
                text="Så fungerar det"
                rationale="Vardaglig rubrik som lovar en förklaring och inte en teknisk specifikation. Tydligare för kunden än Produktbeskrivning eller Teknisk information."
              >
                <h3 className="text-h4 font-medium mb-3">Så fungerar det</h3>
              </Copy>
              <p className="text-ink-secondary leading-relaxed mb-4">
                Här beskriver du hur produkten fungerar: tekniska data, hur installationen går till
                och vad garantin täcker. Du kan använda utfällbara avsnitt, bilder och film.
              </p>
              <div className="bg-tint-info rounded-md p-5 text-sm text-ink-secondary">
                Här får 800 till 1 200 ord plats utan att köpet hamnar ur sikte. Priset och knappen
                stannar kvar i köprutan när kunden scrollar.
              </div>
            </div>
            </Annotation>
          </div>

          {/* Köpruta som följer med vid scroll */}
          <Annotation
            label="Köpruta"
            audience="user"
            rationale="Pris, vem produkten passar för och knapparna samlade i en ruta som följer med när kunden scrollar. Hen behöver aldrig leta sig tillbaka upp för att köpa eller ställa en fråga."
          >
          <aside className="lg:sticky lg:top-20 lg:self-start space-y-4">
            <div className="rounded-lg border-2 border-brand-accent bg-surface p-5 shadow-sm">
              <p className="text-xs uppercase tracking-wider text-ink-muted font-medium">
                {p.pris.typ === "fran" ? "Från" : p.pris.typ === "offert" ? "" : "Pris"}
              </p>
              {p.pris.typ === "offert" ? (
                <Copy
                  label="Pris vid offert"
                  category="metadata"
                  text="Pris enligt offert"
                  rationale="Säger att priset tas fram i en offert, så att kunden inte undrar varför beloppet saknas. Ett ensamt Offert kan läsas som en knapp eller en rubrik."
                >
                  <p className="text-h3 font-medium mb-1">Pris enligt offert</p>
                </Copy>
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

              <Copy
                label="Huvudknapp"
                category="cta"
                text={p.cta.label}
                rationale="Verb plus produktnamn, till exempel Beställ Ladda Smart eller Boka rådgivning. Kunden vet exakt vad som händer vid klick. Undvik Läs mer, Skicka och Gå vidare."
              >
                <button
                  type="button"
                  className="w-full bg-brand-primary text-ink-onbrand font-medium py-3 rounded hover:opacity-90 transition-opacity mb-2 inline-flex items-center justify-center gap-2"
                >
                  {p.cta.label}
                  <Icon name="arrow_forward" size={16} />
                </button>
              </Copy>
              <Copy
                label="Sekundär knapp"
                category="cta"
                text="Ställ en fråga"
                rationale="Ett lågt steg för den som inte är redo att köpa. Verb plus objekt som säger vad kunden gör. Kontakta oss låter mer formellt och säger inte att det går bra att bara fråga."
              >
                <button
                  type="button"
                  className="w-full border border-border-strong text-ink-secondary font-medium py-3 rounded hover:bg-tint-info transition-colors text-sm"
                >
                  Ställ en fråga
                </button>
              </Copy>

              <Copy
                label="Trygghetsrad i köprutan"
                category="reassurance"
                text={trygghetsrad}
                rationale="Svarar på frågan kunden har precis innan klicket: hur lång tid tar det, vad behöver jag och kostar det något. Raden ändras efter om knappen leder till köp, offert eller kontakt."
              >
                <p className="text-[11px] text-ink-muted text-center mt-3 leading-snug">{trygghetsrad}</p>
              </Copy>
            </div>

            <Annotation
              label="Trygghetslista under köprutan"
              audience="redaktör"
              rationale="Tre korta löften som minskar oron inför köpet: installation, garanti och hjälp efteråt. Anpassa punkterna efter produkten, till exempel rätt antal garantiår, och skriv bara det som faktiskt gäller."
            >
            <div className="rounded-md bg-tint-info p-4 text-xs text-ink-secondary space-y-2">
              <div className="flex gap-2">
                <Icon name="local_shipping" size={16} className="text-brand-accent mt-0.5 shrink-0" />
                <Copy
                  label="Trygghetslöfte om installation"
                  category="reassurance"
                  text="Installation ingår i Helsingborg och Ängelholm"
                  rationale="Konkret om vad som ingår och var. Att nämna orterna gör löftet trovärdigt och svarar direkt på frågan om kunden bor inom området. Undvik vaga ord som smidigt eller enkelt."
                >
                  <span>Installation ingår i Helsingborg och Ängelholm</span>
                </Copy>
              </div>
              <div className="flex gap-2">
                <Icon name="verified_user" size={16} className="text-brand-accent mt-0.5 shrink-0" />
                <span>5 års garanti på produkten</span>
              </div>
              <div className="flex gap-2">
                <Icon name="support_agent" size={16} className="text-brand-accent mt-0.5 shrink-0" />
                <span>Kundservice hjälper dig under hela avtalstiden</span>
              </div>
            </div>
            </Annotation>
          </aside>
          </Annotation>
        </div>
      </Annotation>
    </div>
  );
}
