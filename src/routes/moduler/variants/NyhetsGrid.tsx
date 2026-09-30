import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

const NYHETER = [
  { datum: "2026-04-15", tag: "Marknad", rubrik: "Elpriset sjunker inför sommaren: så påverkas du" },
  { datum: "2026-04-08", tag: "Tjänster", rubrik: "Nu kan du följa din elförbrukning i realtid i appen" },
  { datum: "2026-03-28", tag: "Hållbarhet", rubrik: "Framtidspengen gav 3 nya laddstationer i Helsingborg" },
];

/**
 * VARIANT A, Likvärdigt rutnät
 *
 * Tre kort i rad, alla lika stora. Ingen nyhet lyfts fram framför någon annan.
 *
 * Fördel: rättvist, enkelt att fylla och förutsägbart för besökaren.
 * Nackdel: redaktören kan inte lyfta en viktig nyhet.
 */
export function NyhetsGrid() {
  return (
    <Annotation
      label="Likvärdigt rutnät"
      audience="design"
      rationale="Tre lika stora kort ger en lugn överblick av det senaste. Hela kortet är klickbart och rubriken säger vart det leder, så det behövs ingen 'Läs mer'-länk."
    >
      <section>
        <Copy
          label="Blockrubrik"
          category="rubrik"
          text="Senaste nytt om el"
          rationale="Säger både att det är färskt och vilket ämne det gäller. Ämnet ändras efter sidan, till exempel 'om fjärrvärme'. Undvik bara 'Nyheter', som inte säger vilka."
        >
          <h2 className="text-h3 font-medium mb-6">Senaste nytt om el</h2>
        </Copy>
        <Annotation
          label="Nyhetskort"
          audience="redaktör"
          rationale="Varje kort visas automatiskt när du publicerar en nyhet: bild, datum, kategori och rubrik. Skriv rubriken så att den säger vad läsaren får veta, och välj en bild som fungerar i liten storlek."
        >
          <div className="grid sm:grid-cols-3 gap-4 mb-4">
            {NYHETER.map((n, idx) => (
              <a
                key={n.rubrik}
                href="#"
                className="group block rounded-md border border-border-subtle bg-surface overflow-hidden hover:border-brand-accent transition-all"
              >
                <div className="bg-tint-info aspect-[16/9] flex items-center justify-center text-ink-muted">
                  <Icon name="image" size={36} />
                </div>
                <div className="p-4">
                  {idx === 0 ? (
                    <Annotation
                      label="Datum och kategori"
                      audience="user"
                      rationale="Datumet visar hur färsk nyheten är och kategorin vad den handlar om. Besökaren kan då välja bort det som inte är aktuellt utan att öppna kortet."
                    >
                      <div className="flex items-center gap-2 mb-2 text-xs text-ink-muted">
                      <time dateTime={n.datum}>{n.datum}</time>
                      <span className="px-1.5 py-0.5 rounded bg-tint-info text-brand-primary font-medium uppercase tracking-wider text-[10px]">{n.tag}</span>
                    </div>
                    </Annotation>
                  ) : (
                    <div className="flex items-center gap-2 mb-2 text-xs text-ink-muted">
                      <time dateTime={n.datum}>{n.datum}</time>
                      <span className="px-1.5 py-0.5 rounded bg-tint-info text-brand-primary font-medium uppercase tracking-wider text-[10px]">{n.tag}</span>
                    </div>
                  )}
                  {idx === 0 ? (
                    <Copy
                      label="Kortrubrik som länk"
                      category="rubrik"
                      text={n.rubrik}
                      rationale="Rubriken är själva länken och säger vad läsaren får ut av att klicka. 'så påverkas du' lovar ett svar på den fråga besökaren har. Undvik rubriker som bara nämner ämnet, som 'Elpriset i april'."
                    >
                      <h3 className="text-sm font-medium group-hover:text-brand-accent leading-snug">{n.rubrik}</h3>
                    </Copy>
                  ) : (
                    <h3 className="text-sm font-medium group-hover:text-brand-accent leading-snug">{n.rubrik}</h3>
                  )}
                </div>
              </a>
            ))}
          </div>
        </Annotation>
        <Copy
          label="Länk till alla nyheter"
          category="cta"
          text="Se alla nyheter om el →"
          rationale="Verb plus objekt och samma ämne som rubriken, så att besökaren vet vad listan innehåller. Undvik 'Visa fler' eller 'Arkiv', som inte säger vad man får se."
        >
          <a href="#" className="text-sm text-brand-accent hover:underline">Se alla nyheter om el →</a>
        </Copy>
      </section>
    </Annotation>
  );
}
