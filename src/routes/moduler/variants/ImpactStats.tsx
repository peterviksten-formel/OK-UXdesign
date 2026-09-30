import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

const STATS = [
  { siffra: "100%", text: "Fossilfri el sedan 2024", ikon: "eco" },
  { siffra: "200 000", text: "Ton CO₂ som fångas in per år från 2030", ikon: "cloud" },
  { siffra: "17 h", text: "Volontärarbete per anställd och år", ikon: "volunteer_activism" },
  { siffra: "3", text: "Nya laddstationer finansierade av Framtidspengen", ikon: "ev_station" },
];

/**
 * VARIANT A, Nyckeltal
 *
 * Tre till fyra stora siffror med en kort beskrivning var. Fokus på
 * resultat som går att mäta.
 *
 * Fördel: Konkret och snabbt att förstå.
 * Nackdel: Saknar sammanhang. Siffror utan berättelse kan kännas tomma.
 */
export function ImpactStats() {
  return (
    <Annotation
      label="Hållbarhetsblock med nyckeltal"
      audience="design"
      rationale="Stora siffror med korta beskrivningar gör abstrakta åtaganden konkreta. '100% fossilfri el' säger mer än 'en ambitiös klimatpolicy'. Besökaren får en snabb bild utan att behöva läsa löptext."
    >
      <section>
        <Copy
          label="Rubrik"
          category="rubrik"
          text="Vår påverkan i siffror"
          rationale="Säger rakt ut vad blocket innehåller. Undvik värdeladdade rubriker som 'Vi gör skillnad', siffrorna ska tala för sig själva."
        >
          <h2 className="text-h3 font-medium mb-2">Vår påverkan i siffror</h2>
        </Copy>
        <Copy
          label="Ingress"
          category="ton"
          text="Vi mäter det som betyder något. Här är några av siffrorna vi följer och jobbar för att förbättra."
          rationale="Ödmjuk ton: vi följer och förbättrar, vi har inte löst allt. Det gör siffrorna mer trovärdiga än om ingressen skryter."
        >
          <p className="text-ink-secondary mb-6 max-w-reading">
            Vi mäter det som betyder något. Här är några av siffrorna vi följer och jobbar för att förbättra.
          </p>
        </Copy>
        <Annotation
          label="Kort med nyckeltal"
          audience="redaktör"
          rationale="Använd tre eller fyra siffror som går att belägga i årets hållbarhetsrapport. Skriv en kort beskrivning som förklarar siffran. Byt ut eller ta bort en siffra så fort den är inaktuell."
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((s, idx) => {
              const beskrivning = <p className="text-sm text-ink-secondary">{s.text}</p>;
              return (
                <div
                  key={s.text}
                  className="rounded-md border border-border-subtle bg-surface p-5"
                >
                  <Icon name={s.ikon} size={24} className="text-brand-accent mb-3" />
                  <p className="text-display font-bold text-brand-primary leading-none mb-2">
                    {s.siffra}
                  </p>
                  {idx === 0 ? (
                    <Copy
                      label="Beskrivning av nyckeltal"
                      category="metadata"
                      text={s.text}
                      rationale="Siffran står först och beskrivningen förklarar den med ett konkret årtal. Varje beskrivning ska kunna läsas fristående, utan resten av blocket."
                    >
                      {beskrivning}
                    </Copy>
                  ) : (
                    beskrivning
                  )}
                </div>
              );
            })}
          </div>
        </Annotation>
      </section>
    </Annotation>
  );
}
