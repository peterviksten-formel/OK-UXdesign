import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

const TJANSTER = [
  { ikon: "bolt", titel: "Elavtal", desc: "Teckna nytt eller byt. Välj mellan tre avtal.", href: "#" },
  { ikon: "solar_power", titel: "Solceller", desc: "Producera din egen el. Vi sköter installationen.", href: "#" },
  { ikon: "ev_station", titel: "Laddbox för elbil", desc: "Ladda hemma och styr laddningen i appen.", href: "#" },
  { ikon: "local_fire_department", titel: "Fjärrvärme", desc: "Värme från vår lokala panncentral. Enkelt och effektivt.", href: "#" },
  { ikon: "water_drop", titel: "Fjärrkyla", desc: "Miljövänlig kyla för företag och bostäder.", href: "#" },
  { ikon: "cable", titel: "Fiber (Pingday)", desc: "Snabbt och stabilt bredband via vårt fibernät.", href: "#" },
];

const INGRESS = "El, värme, laddning och bredband, samlat hos oss.";

/**
 * VARIANT A, Ikonkort
 *
 * Sex klickbara kort. Varje kort har en ikon, ett namn, en kort
 * beskrivning och en pil som visar att kortet är en länk.
 *
 * Fördel: snabbt att skumma. Fungerar utan bilder.
 * Nackdel: mindre visuellt intressant än kort med bilder.
 */
export function TjansterIkonGrid() {
  return (
    <Annotation
      label="Tjänster som ikonkort"
      audience="design"
      rationale="Sex kort i tre kolumner. Ikonen gör tjänsten lätt att känna igen, namnet är störst och beskrivningen kommer efter. Hela kortet är klickbart och markeras när besökaren för muspekaren över det."
    >
      <section>
        <Copy
          label="Rubrik"
          category="rubrik"
          text="Våra tjänster"
          rationale="Kort och tydligt: här finns allt vi erbjuder. Undvik säljiga rubriker som 'Upptäck våra lösningar'."
        >
          <h2 className="text-h3 font-medium mb-2">Våra tjänster</h2>
        </Copy>
        <Copy
          label="Ingress"
          category="rubrik"
          text={INGRESS}
          rationale="Räknar upp vad som faktiskt finns i stället för ett allmänt löfte. Undvik tomma ord som 'energismart liv' och 'helhetslösningar'."
        >
          <p className="text-ink-secondary mb-6">{INGRESS}</p>
        </Copy>
        <Annotation
          label="Korten"
          audience="redaktör"
          rationale="Skriv tjänstens namn som kunden känner igen det. Beskrivningen är en eller två korta meningar, högst tio ord, som börjar med vad kunden kan göra eller få. Sortera efter hur ofta tjänsten efterfrågas."
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TJANSTER.map((t, idx) => {
              const kort = (
                <a
                  key={t.titel}
                  href={t.href}
                  className="group p-5 rounded-md border border-border-subtle bg-surface hover:border-brand-accent hover:shadow-sm transition-all flex flex-col"
                >
                  <Icon name={t.ikon} size={32} className="text-brand-accent mb-3" />
                  <h3 className="font-medium mb-1 group-hover:text-brand-accent">{t.titel}</h3>
                  <p className="text-sm text-ink-secondary mb-3 flex-1">{t.desc}</p>
                  {idx === 0 ? (
                    <Copy
                      label="Länktext på kortet"
                      category="cta"
                      text="Läs mer"
                      rationale="Kortet har redan tjänstens namn som rubrik, så 'Läs mer' räcker här och är samma på alla kort. Hela kortet är länken, så skärmläsare läser upp namnet tillsammans med länktexten."
                    >
                      <span className="text-sm text-brand-accent inline-flex items-center gap-1">
                        Läs mer
                        <Icon name="arrow_forward" size={14} />
                      </span>
                    </Copy>
                  ) : (
                    <span className="text-sm text-brand-accent inline-flex items-center gap-1">
                      Läs mer
                      <Icon name="arrow_forward" size={14} />
                    </span>
                  )}
                </a>
              );
              return idx === 0 ? (
                <Annotation
                  key={t.titel}
                  label="Ett tjänstekort"
                  audience="user"
                  rationale="Besökaren ser på en gång vad tjänsten heter och vad den ger. Hela kortet går att klicka på, så det är lätt att träffa även i mobilen."
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
