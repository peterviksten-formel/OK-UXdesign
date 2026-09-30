import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";
import type { Produkt } from "../produkt-data";

/**
 * VARIANT A, Trygg
 *
 * Klassisk produktsida: bild till vänster och fakta till höger på stor skärm.
 * Pris, beskrivning och en tydlig knapp följs av tre listor (ingår, villkor,
 * varför). Inga flikar och inget dolt innehåll: kunden ser allt på en gång.
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
  const trygghetsrad =
    p.cta.typ === "kop" ? "Tar cirka 5 minuter · Du behöver personnummer och adress" :
    p.cta.typ === "offert" ? "Kostnadsfritt · Svar inom 3 arbetsdagar" :
    "Kostnadsfritt · Du förbinder dig inte till något";
  return (
    <div>
      <Annotation
        label="Produktöversikt"
        audience="design"
        rationale="Bild till vänster och fakta till höger, allt synligt direkt utan flikar eller utfällbara delar. Kunden behöver inte leta, vilket passar enkla beslut och den som vill läsa allt innan hen bestämmer sig."
      >
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Platshållare för produktbild */}
          <div className="rounded-md bg-tint-info aspect-[4/3] flex items-center justify-center border border-border-subtle">
            <div className="text-center text-ink-muted">
              <Icon name="image" size={48} className="mb-2" />
              <p className="text-xs">{p.bildAlt}</p>
            </div>
          </div>

          {/* Produktfakta */}
          <Annotation
            label="Produktfakta och knapp"
            audience="redaktör"
            rationale="Fylls i från produktens grunddata: namn, kort nyttomening, pris, beskrivning och knapptext. Håll beskrivningen till 2-3 meningar och skriv knappen som verb plus objekt, till exempel Beställ Ladda Smart."
          >
          <div>
            {/* Rubrikblocket döljs när modulen ligger i en produktsida,
                eftersom kategori, namn och nyttomening redan står i sidans hero. */}
            {!inline && (
              <>
                <p className="text-eyebrow uppercase text-ink-muted mb-1">{p.kategori}</p>
                <h2 className="text-h2 mb-2">{p.namn}</h2>
                <Copy
                  label="Nyttomening under produktnamnet"
                  category="rubrik"
                  text={p.tagline}
                  rationale="En mening om vad kunden får ut av produkten, inte vad den är. Skriv nyttan först (Smart laddning för elbil) och undvik tekniska produktnamn och säljord som unik eller revolutionerande."
                >
                  <p className="text-lede text-ink-secondary mb-4">{p.tagline}</p>
                </Copy>
              </>
            )}

            {/* Pris */}
            <Annotation
              label="Prisruta"
              audience="user"
              rationale="Priset står i en egen färgad ruta direkt under rubriken. Kunden ser vad det kostar innan hen läser vidare, och kan avgöra tidigt om produkten är värd att läsa om."
            >
            <div className="rounded-md bg-tint-notice p-4 mb-4">
              {p.pris.typ === "offert" ? (
                <Copy
                  label="Pris vid offert"
                  category="metadata"
                  text="Pris: offert efter besiktning"
                  rationale="Säger rakt ut att priset beror på en besiktning, i stället för att lämna fältet tomt. Kunden förstår varför det inte finns ett fast pris och vad nästa steg är."
                >
                  <p className="font-medium">Pris: offert efter besiktning</p>
                </Copy>
              ) : (
                <Copy
                  label="Pris med belopp"
                  category="metadata"
                  text={`${p.pris.typ === "fran" ? "Från " : ""}${p.pris.belopp} ${p.pris.enhet}`}
                  rationale="Beloppet står störst och enheten bredvid, till exempel kr inkl. installation. Från används bara när slutpriset kan bli högre, så att kunden inte känner sig lurad senare."
                >
                <p className="font-medium">
                  {p.pris.typ === "fran" ? "Från " : ""}
                  <span className="text-h3">{p.pris.belopp}</span>{" "}
                  <span className="text-sm text-ink-muted">{p.pris.enhet}</span>
                </p>
                </Copy>
              )}
            </div>
            </Annotation>

            <p className="text-sm text-ink-secondary mb-4 leading-relaxed">{p.beskrivning}</p>

            <Copy
              label="Huvudknapp"
              category="cta"
              text={p.cta.label}
              rationale="Verb plus produktnamn, till exempel Beställ Ladda Smart eller Boka rådgivning. Kunden vet exakt vad som händer vid klick. Undvik Läs mer, Skicka och Gå vidare."
            >
              <button
                type="button"
                className="w-full bg-brand-primary text-ink-onbrand font-medium py-3 rounded hover:opacity-90 transition-opacity mb-2"
              >
                {p.cta.label}
              </button>
            </Copy>
            <Copy
              label="Trygghetsrad under knappen"
              category="reassurance"
              text={trygghetsrad}
              rationale="Svarar på frågan kunden har precis innan klicket: hur lång tid tar det, vad behöver jag och kostar det något. Raden ändras efter om knappen leder till köp, offert eller kontakt."
            >
              <p className="text-xs text-ink-muted text-center">{trygghetsrad}</p>
            </Copy>
          </div>
          </Annotation>
        </div>
      </Annotation>

      {/* Detaljer under produktfakta */}
      <Annotation
        label="Ingår, villkor och fördelar"
        audience="redaktör"
        rationale="Tre listor med samma upplägg för alla produkter, så att kunden kan jämföra. Skriv 2-5 korta punkter per lista. Villkor skrivs som hela meningar som kunden förstår utan fackkunskap."
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
            <Copy
              label="Rubrik för fördelar"
              category="rubrik"
              text={`Varför ${p.namn}?`}
              rationale="En fråga med produktens namn låter som kundens egen fundering och gör listan personlig. Mer levande än en neutral rubrik som Fördelar eller Säljargument."
            >
              <h3 className="text-h5 font-medium mb-3">Varför {p.namn}?</h3>
            </Copy>
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
