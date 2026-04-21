import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

const STATS = [
  { siffra: "100%", text: "Fossilfri el från 2024", ikon: "eco" },
  { siffra: "200 000", text: "Ton CO₂ fångas in per år från 2030", ikon: "cloud" },
  { siffra: "17 h", text: "Volontärarbete per anställd och år", ikon: "volunteer_activism" },
  { siffra: "3", text: "Nya laddstationer finansierade av Framtidspengen", ikon: "ev_station" },
];

/**
 * VARIANT A — Statistik-grid
 *
 * 3-4 stora siffror med beskrivning. Fokus på mätbara resultat.
 *
 * Pro: Konkret och snabbt begripligt. Trovärdigt.
 * Kontra: Saknar kontext/narrativ. Siffror kan kännas tomma utan berättelse.
 */
export function ImpactStats() {
  return (
    <Annotation
      label="Hållbarhets-block — statistik-grid"
      audience="redaktör"
      rationale="Stora siffror, korta beskrivningar. Gör abstrakta åtaganden konkreta ('100% fossilfri' säger mer än 'ambitiös klimatpolicy'). Kräver löpande underhåll — föråldrade siffror blir fula."
    >
      <section>
        <h2 className="text-h3 font-medium mb-2">Vår påverkan i siffror</h2>
        <p className="text-ink-secondary mb-6 max-w-reading">
          Vi tror på att mäta det som betyder något. Här är några av de siffror vi följer — och jobbar för att förbättra.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div
              key={s.text}
              className="rounded-md border border-border-subtle bg-surface p-5"
            >
              <Icon name={s.ikon} size={24} className="text-brand-accent mb-3" />
              <p className="text-display font-bold text-brand-primary leading-none mb-2">
                {s.siffra}
              </p>
              <p className="text-sm text-ink-secondary">{s.text}</p>
            </div>
          ))}
        </div>
      </section>
    </Annotation>
  );
}
