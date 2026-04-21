import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

type Status = "klart" | "pagaende" | "framtida";

const MAL: { ar: string; mal: string; status: Status; beskrivning: string }[] = [
  { ar: "2024", mal: "100% fossilfri el till alla avtalskunder", status: "klart", beskrivning: "Alla våra elavtal levererar sedan 2024 enbart förnybar och återvunnen energi." },
  { ar: "2025", mal: "17-satsningen lanseras företagsövergripande", status: "klart", beskrivning: "Varje medarbetare får 17 timmar per år för volontärarbete kopplat till FN:s globala mål." },
  { ar: "2026", mal: "Framtidspengen betalar ut till 10 000+ kunder", status: "pagaende", beskrivning: "Uppföljning pågår. Hittills har över 8 000 kunder fått pengar tillbaka genom programmet." },
  { ar: "2030", mal: "Innozhero-anläggningen igång — 200 000 ton CO₂/år", status: "framtida", beskrivning: "Carbon capture-anläggningen är under uppförande. Tekniken finns, investeringen görs nu." },
  { ar: "2035", mal: "Klimatneutralt Helsingborg", status: "framtida", beskrivning: "Ett regionalt mål som vi driver tillsammans med staden." },
];

const STATUS_META: Record<Status, { label: string; dot: string; textColor: string }> = {
  klart: { label: "Klart", dot: "bg-green-500", textColor: "text-green-700" },
  pagaende: { label: "Pågår", dot: "bg-brand-accent animate-pulse", textColor: "text-brand-accent" },
  framtida: { label: "Planerat", dot: "bg-ink-muted", textColor: "text-ink-muted" },
};

/**
 * VARIANT C — Checkpoints-tidslinje
 *
 * Vertikal tidslinje med mål per år. Statusmarkör visar om målet är
 * nått, pågår eller framtida. Visar både historia och ambition.
 *
 * Pro: Strukturerat och ärligt. Visar både fram- och bakåt.
 * Kontra: Kräver tydlig redaktionell copy per mål. Inte lika snabb-skanbart.
 */
export function ImpactTimeline() {
  return (
    <Annotation
      label="Hållbarhets-block — tidslinje"
      audience="redaktör"
      rationale="Vertikal tidslinje med år-markörer. Status per mål (klart / pågår / planerat) — ingen greenwashing. Visar tydligt vad som redan levererats vs vad som är åtagande framåt."
    >
      <section>
        <h2 className="text-h3 font-medium mb-2">Vår hållbarhetsresa</h2>
        <p className="text-ink-secondary mb-8 max-w-reading">
          Så här har vi jobbat och så här fortsätter vi. Med status på varje mål.
        </p>
        <ol className="relative border-l-2 border-border-subtle ml-4 space-y-8 max-w-reading">
          {MAL.map((m) => {
            const meta = STATUS_META[m.status];
            return (
              <li key={m.ar} className="pl-8 relative">
                <span className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full ${meta.dot} border-4 border-canvas shadow-sm`} />
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-h4 font-bold text-brand-primary">{m.ar}</span>
                  <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${meta.textColor} border-current`}>
                    {meta.label}
                  </span>
                </div>
                <h3 className="font-medium mb-1">{m.mal}</h3>
                <p className="text-sm text-ink-secondary leading-relaxed">{m.beskrivning}</p>
              </li>
            );
          })}
        </ol>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 text-brand-accent font-medium mt-8 ml-4 hover:underline"
        >
          Läs vår hållbarhetsrapport
          <Icon name="arrow_forward" size={16} />
        </a>
      </section>
    </Annotation>
  );
}
