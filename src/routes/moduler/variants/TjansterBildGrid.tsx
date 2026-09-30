import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

const TJANSTER = [
  { titel: "Elavtal", desc: "Teckna nytt eller byt. Välj mellan tre avtal.", href: "#" },
  { titel: "Solceller", desc: "Producera din egen el. Vi sköter installationen.", href: "#" },
  { titel: "Laddbox för elbil", desc: "Ladda hemma och styr laddningen i appen.", href: "#" },
  { titel: "Fjärrvärme", desc: "Värme från vår lokala panncentral. Enkelt och effektivt.", href: "#" },
  { titel: "Fjärrkyla", desc: "Miljövänlig kyla för företag och bostäder.", href: "#" },
  { titel: "Fiber (Pingday)", desc: "Snabbt och stabilt bredband via vårt fibernät.", href: "#" },
];

const INGRESS = "El, värme, laddning och bredband, samlat hos oss.";

/**
 * VARIANT B, Bildkort
 *
 * Sex kort med en bild överst och text under. Mer visuellt intressant
 * men kräver sex bra bilder på tjänsterna.
 *
 * Fördel: lockar blicken och påminner om en webbutik.
 * Nackdel: kräver bilder, vilket kostar tid och pengar innan lansering.
 */
export function TjansterBildGrid() {
  return (
    <Annotation
      label="Tjänster som bildkort"
      audience="design"
      rationale="Samma uppbyggnad som ikonkorten men med en bild överst. Bildytan är bred och fungerar för de flesta motiv. Bilden ska visa tjänsten i användning, till exempel en person som laddar bilen, inte bara laddboxen."
    >
      <section>
        <Copy
          label="Rubrik"
          category="rubrik"
          text="Våra tjänster"
          rationale="Kort och tydligt: här finns allt vi erbjuder. Samma rubrik i alla varianter så att besökaren känner igen sektionen."
        >
          <h2 className="text-h3 font-medium mb-2">Våra tjänster</h2>
        </Copy>
        <Copy
          label="Ingress"
          category="rubrik"
          text={INGRESS}
          rationale="Räknar upp vad som faktiskt finns i stället för ett allmänt löfte. Undvik tomma ord som 'energismart liv'."
        >
          <p className="text-ink-secondary mb-6">{INGRESS}</p>
        </Copy>
        <Annotation
          label="Korten och bilderna"
          audience="redaktör"
          rationale="Välj bilder med samma ljus och stil så att korten hänger ihop. Varje bild behöver en alt-text som beskriver vad den visar. Beskrivningen är en eller två korta meningar, högst tio ord."
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {TJANSTER.map((t, idx) => {
              const kort = (
                <a
                  key={t.titel}
                  href={t.href}
                  className="group rounded-md border border-border-subtle bg-surface overflow-hidden hover:border-brand-accent hover:shadow-sm transition-all flex flex-col"
                >
                  <div className="bg-tint-info aspect-[16/10] flex items-center justify-center text-ink-muted">
                    <Icon name="image" size={48} />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-medium mb-1 group-hover:text-brand-accent">{t.titel}</h3>
                    {idx === 0 ? (
                      <Copy
                        label="Beskrivning på kortet"
                        category="ton"
                        text={t.desc}
                        rationale="Börjar med vad kunden kan göra, inte med vad tjänsten är. Två korta meningar räcker. Undvik värdeord som 'smidigt' och 'marknadsledande'."
                      >
                        <p className="text-sm text-ink-secondary flex-1">{t.desc}</p>
                      </Copy>
                    ) : (
                      <p className="text-sm text-ink-secondary flex-1">{t.desc}</p>
                    )}
                  </div>
                </a>
              );
              return idx === 0 ? (
                <Annotation
                  key={t.titel}
                  label="Ett bildkort"
                  audience="user"
                  rationale="Bilden visar hur tjänsten ser ut i vardagen, vilket gör det lättare att föreställa sig den hemma. Hela kortet går att klicka på."
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
