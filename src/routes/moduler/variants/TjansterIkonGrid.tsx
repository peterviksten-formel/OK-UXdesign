import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

const TJANSTER = [
  { ikon: "bolt", titel: "Elavtal", desc: "Teckna eller byt — tre avtal att välja mellan.", href: "#" },
  { ikon: "solar_power", titel: "Solceller", desc: "Producera din egen el. Vi sköter installation.", href: "#" },
  { ikon: "ev_station", titel: "Laddbox för elbil", desc: "Smart laddning hemma — med appstyrning.", href: "#" },
  { ikon: "local_fire_department", titel: "Fjärrvärme", desc: "Värme från lokal panncentral. Enkelt och effektivt.", href: "#" },
  { ikon: "water_drop", titel: "Fjärrkyla", desc: "Miljövänlig kyla för företag och bostäder.", href: "#" },
  { ikon: "cable", titel: "Fiber (Pingday)", desc: "Snabb och stabil bredband via vårt fibernät.", href: "#" },
];

/**
 * VARIANT A — Ikon-kort-grid
 *
 * Sex klickbara kort. Varje kort har en MD3-ikon, titel, kort beskrivning
 * och en pil som signalerar länk.
 *
 * Pro: Snabbt, lätt att skumma. Skalar utan bildresurser.
 * Kontra: Mindre visuellt intressant än bild-kort.
 */
export function TjansterIkonGrid() {
  return (
    <Annotation
      label="Tjänstegrid — ikon-kort"
      audience="design"
      rationale="Sex kort i 3-kolumns grid. Ikon som visuell markör, titel som primär, beskrivning som sekundär. Hela kortet klickbart — pil längst ner signalerar att det leder någonstans. Hover-tillstånd förstärker affordance."
    >
      <section>
        <h2 className="text-h3 font-medium mb-2">Våra tjänster</h2>
        <p className="text-ink-secondary mb-6">
          Allt du behöver för ett enklare energismart liv.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TJANSTER.map((t) => (
            <a
              key={t.titel}
              href={t.href}
              className="group p-5 rounded-md border border-border-subtle bg-surface hover:border-brand-accent hover:shadow-sm transition-all flex flex-col"
            >
              <Icon name={t.ikon} size={32} className="text-brand-accent mb-3" />
              <h3 className="font-medium mb-1 group-hover:text-brand-accent">{t.titel}</h3>
              <p className="text-sm text-ink-secondary mb-3 flex-1">{t.desc}</p>
              <span className="text-sm text-brand-accent inline-flex items-center gap-1">
                Läs mer
                <Icon name="arrow_forward" size={14} />
              </span>
            </a>
          ))}
        </div>
      </section>
    </Annotation>
  );
}
