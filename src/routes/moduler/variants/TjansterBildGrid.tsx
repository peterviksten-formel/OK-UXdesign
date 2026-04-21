import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

const TJANSTER = [
  { titel: "Elavtal", desc: "Teckna eller byt — tre avtal att välja mellan.", href: "#" },
  { titel: "Solceller", desc: "Producera din egen el. Vi sköter installation.", href: "#" },
  { titel: "Laddbox för elbil", desc: "Smart laddning hemma — med appstyrning.", href: "#" },
  { titel: "Fjärrvärme", desc: "Värme från lokal panncentral. Enkelt och effektivt.", href: "#" },
  { titel: "Fjärrkyla", desc: "Miljövänlig kyla för företag och bostäder.", href: "#" },
  { titel: "Fiber (Pingday)", desc: "Snabb och stabil bredband via vårt fibernät.", href: "#" },
];

/**
 * VARIANT B — Bildkort-grid
 *
 * Sex kort med bildruta ovanför text. Mer visuellt intressant men
 * kräver sex kvalitativa produktbilder.
 *
 * Pro: Visuellt lockande. Känns mer som e-handel.
 * Kontra: Kräver bildresurser. Stort fotpris innan go-live.
 */
export function TjansterBildGrid() {
  return (
    <Annotation
      label="Tjänstegrid — bildkort"
      audience="design"
      rationale="Samma struktur som ikon-grid men med bildruta överst. Aspect 16/10 ger plats åt både landskaps- och porträttbilder. Bilden bör visa användning, inte produkt (människa som laddar bil, inte bara laddbox)."
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
              className="group rounded-md border border-border-subtle bg-surface overflow-hidden hover:border-brand-accent hover:shadow-sm transition-all flex flex-col"
            >
              <div className="bg-tint-info aspect-[16/10] flex items-center justify-center text-ink-muted">
                <Icon name="image" size={48} />
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="font-medium mb-1 group-hover:text-brand-accent">{t.titel}</h3>
                <p className="text-sm text-ink-secondary flex-1">{t.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </Annotation>
  );
}
