import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

const TJANSTER = [
  { ikon: "bolt", titel: "Elavtal", desc: "Teckna nytt eller byt" },
  { ikon: "solar_power", titel: "Solceller", desc: "Producera din egen el" },
  { ikon: "ev_station", titel: "Laddbox för elbil", desc: "Ladda smart hemma" },
  { ikon: "local_fire_department", titel: "Fjärrvärme", desc: "Värme från vår lokala panncentral" },
  { ikon: "water_drop", titel: "Fjärrkyla", desc: "Miljövänlig kyla" },
  { ikon: "cable", titel: "Fiber (Pingday)", desc: "Bredband via vårt fibernät" },
];

/**
 * VARIANT C, Kompakt lista
 *
 * Lodrät lista med små ikoner, namn och länk. Tar minst plats och passar
 * i en sidospalt eller i sidfoten.
 *
 * Fördel: sparar plats och är lätt att skumma uppifrån och ned.
 * Nackdel: liten visuell tyngd, passar inte som huvudsektion.
 */
export function TjansterKompakt() {
  return (
    <Annotation
      label="Tjänster som kompakt lista"
      audience="design"
      rationale="En lodrät lista där namnet är tydligast, med en liten ikon före och en kort beskrivning under. Passar i sidospalten på översiktssidor eller som 'Fler tjänster' i sidfoten."
    >
      <section className="max-w-reading">
        <Copy
          label="Rubrik"
          category="rubrik"
          text="Våra tjänster"
          rationale="Samma rubrik som i de andra varianterna så att besökaren känner igen sektionen. Använd 'Fler tjänster' om listan står på en sida som redan handlar om en av tjänsterna."
        >
          <h2 className="text-h4 font-medium mb-3">Våra tjänster</h2>
        </Copy>
        <Annotation
          label="Listan"
          audience="redaktör"
          rationale="Skriv tjänstens namn och högst fem ord som beskriver den. Håll samma ordning som i den större tjänsteöversikten så att besökaren känner igen sig."
        >
          <ul className="divide-y divide-border-subtle rounded-md border border-border-subtle bg-surface">
            {TJANSTER.map((t, idx) => {
              const rad = (
                <li key={t.titel}>
                  <a
                    href="#"
                    className="group flex items-center gap-4 px-4 py-3 hover:bg-tint-info"
                  >
                    <Icon name={t.ikon} size={20} className="text-brand-accent shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium group-hover:text-brand-accent">{t.titel}</p>
                      {idx === 0 ? (
                        <Copy
                          label="Kort beskrivning"
                          category="ton"
                          text={t.desc}
                          rationale="Några ord som börjar med vad kunden kan göra. Ingen punkt på slutet eftersom det inte är en hel mening. Undvik att upprepa tjänstens namn."
                        >
                          <p className="text-xs text-ink-muted">{t.desc}</p>
                        </Copy>
                      ) : (
                        <p className="text-xs text-ink-muted">{t.desc}</p>
                      )}
                    </div>
                    <Icon name="arrow_forward" size={16} className="text-ink-muted group-hover:text-brand-accent" />
                  </a>
                </li>
              );
              return idx === 0 ? (
                <Annotation
                  key={t.titel}
                  label="En rad i listan"
                  audience="user"
                  rationale="Hela raden är en länk, så den är lätt att träffa även i mobilen. Pilen visar att raden leder vidare till tjänstens sida."
                >
                  {rad}
                </Annotation>
              ) : (
                rad
              );
            })}
          </ul>
        </Annotation>
      </section>
    </Annotation>
  );
}
