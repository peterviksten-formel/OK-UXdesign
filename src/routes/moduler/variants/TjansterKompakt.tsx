import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

const TJANSTER = [
  { ikon: "bolt", titel: "Elavtal", desc: "Teckna eller byt" },
  { ikon: "solar_power", titel: "Solceller", desc: "Installera och producera själv" },
  { ikon: "ev_station", titel: "Laddbox för elbil", desc: "Smart laddning hemma" },
  { ikon: "local_fire_department", titel: "Fjärrvärme", desc: "Värme från lokal panncentral" },
  { ikon: "water_drop", titel: "Fjärrkyla", desc: "Miljövänlig kyla" },
  { ikon: "cable", titel: "Fiber (Pingday)", desc: "Bredband via vårt fibernät" },
];

/**
 * VARIANT C, Kompakt lista
 *
 * Vertikal lista med små ikoner + titel + länk. Tar minst yta, bra för
 * sidopaneler eller footer-navigering.
 *
 * Pro: Sparsamt med yta. Lätt att skanna alfabetiskt.
 * Kontra: Mindre visuell tyngd, passar inte som huvudsektion.
 */
export function TjansterKompakt() {
  return (
    <Annotation
      label="Tjänstelista, kompakt"
      audience="design"
      rationale="Vertikal lista. Ikonen är liten (20px), titeln är primär, beskrivning är sekundär text. Fungerar som side-panel på hub-sidor eller som 'Fler tjänster'-block i footer."
    >
      <section className="max-w-reading">
        <h2 className="text-h4 font-medium mb-3">Våra tjänster</h2>
        <ul className="divide-y divide-border-subtle rounded-md border border-border-subtle bg-surface">
          {TJANSTER.map((t) => (
            <li key={t.titel}>
              <a
                href="#"
                className="group flex items-center gap-4 px-4 py-3 hover:bg-tint-info"
              >
                <Icon name={t.ikon} size={20} className="text-brand-accent shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium group-hover:text-brand-accent">{t.titel}</p>
                  <p className="text-xs text-ink-muted">{t.desc}</p>
                </div>
                <Icon name="arrow_forward" size={16} className="text-ink-muted group-hover:text-brand-accent" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </Annotation>
  );
}
