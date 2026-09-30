import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

const CITAT = [
  {
    text: "Vi fick ner elkostnaden med 30 % första året efter solcellerna. Öresundskraft skötte hela installationen.",
    namn: "Anders L.",
    roll: "Villaägare, Helsingborg",
  },
  {
    text: "Jag bytte till Månadspris när spotpriset var lågt, enkelt via Mina sidor. Skönt att inte vara bunden.",
    namn: "Linda S.",
    roll: "Lägenhet, Centrum",
  },
  {
    text: "Framtidspengen är en schysst grej. Jag har fått cirka 400 kr tillbaka två år i rad.",
    namn: "Mikael H.",
    roll: "Radhus, Ängelholm",
  },
];

/**
 * VARIANT A, Citatkort
 *
 * Tre kort i rad. Varje kort har ett citat, ett namn och vem kunden är.
 * Sakligt och balanserat. Inga bilder.
 *
 * Fördel: ger flera kunder lika stor plats, går snabbt att ta fram och
 * fungerar med 3-4 kort.
 * Nackdel: utan bilder kan det kännas opersonligt.
 */
export function KundcaseGrid() {
  return (
    <Annotation
      label="Citatkort i rad"
      audience="design"
      rationale="Tre kort med lika stor vikt. Citatet är störst, namn och bostad kommer efter. Citattecknet visar direkt att det är en kund som talar, inte vi."
    >
      <section>
        <Copy
          label="Rubrik"
          category="rubrik"
          text="Vad våra kunder säger"
          rationale="Enkel och vardaglig rubrik som säger precis vad sektionen innehåller. Undvik engelska ord som 'Testimonials' och överdrifter som 'Nöjda kunder berättar'."
        >
          <h2 className="text-h3 font-medium mb-6">Vad våra kunder säger</h2>
        </Copy>
        <Annotation
          label="Citaten"
          audience="redaktör"
          rationale="Välj tre citat från kunder i olika situationer, till exempel villa, lägenhet och radhus. Håll varje citat till högst två rader och behåll kundens egna ord. Få alltid kundens godkännande innan publicering."
        >
          <div className="grid sm:grid-cols-3 gap-4">
            {CITAT.map((c, idx) => {
              const kort = (
                <figure
                  key={c.namn}
                  className="rounded-md border border-border-subtle bg-surface p-5"
                >
                  <Icon name="format_quote" size={28} className="text-brand-accent mb-2" />
                  <blockquote className="text-sm text-ink-secondary leading-relaxed mb-4">
                    {c.text}
                  </blockquote>
                  <figcaption className="text-xs">
                    <p className="font-medium text-brand-primary">{c.namn}</p>
                    {idx === 0 ? (
                      <Copy
                        label="Vem kunden är"
                        category="metadata"
                        text={c.roll}
                        rationale="Boendeform och ort hjälper läsaren att känna igen sig: 'det här är någon som jag'. Skriv förnamn och initial, aldrig hela efternamnet utan godkännande."
                      >
                        <p className="text-ink-muted">{c.roll}</p>
                      </Copy>
                    ) : (
                      <p className="text-ink-muted">{c.roll}</p>
                    )}
                  </figcaption>
                </figure>
              );
              return idx === 0 ? (
                <Annotation
                  key={c.namn}
                  label="Ett citatkort"
                  audience="user"
                  rationale="Ett konkret resultat med kundens egna ord känns mer trovärdigt än vad vi själva säger. Namn och bostad visar att det är en verklig person."
                >
                  {kort}
                </Annotation>
              ) : (
                kort
              );
            })}
          </div>
        </Annotation>
      </section>
    </Annotation>
  );
}
