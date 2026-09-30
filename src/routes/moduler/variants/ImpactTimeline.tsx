import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

type Status = "klart" | "pagaende" | "framtida";

const MAL: { ar: string; mal: string; status: Status; beskrivning: string }[] = [
  { ar: "2024", mal: "100% fossilfri el till alla avtalskunder", status: "klart", beskrivning: "Sedan 2024 kommer all el i våra elavtal från förnybar och återvunnen energi." },
  { ar: "2025", mal: "17-satsningen införs i hela företaget", status: "klart", beskrivning: "Varje medarbetare får 17 timmar per år för volontärarbete kopplat till FN:s globala mål." },
  { ar: "2026", mal: "Framtidspengen betalas ut till över 10 000 kunder", status: "pagaende", beskrivning: "Vi följer upp löpande. Hittills har över 8 000 kunder fått pengar tillbaka." },
  { ar: "2030", mal: "Innozhero-anläggningen i drift, 200 000 ton CO₂ per år", status: "framtida", beskrivning: "Anläggningen för att fånga in koldioxid byggs just nu. Tekniken finns och investeringen görs nu." },
  { ar: "2035", mal: "Klimatneutralt Helsingborg", status: "framtida", beskrivning: "Ett regionalt mål som vi driver tillsammans med staden." },
];

const STATUS_META: Record<Status, { label: string; dot: string; textColor: string }> = {
  klart: { label: "Klart", dot: "bg-green-500", textColor: "text-green-700" },
  pagaende: { label: "Pågår", dot: "bg-brand-accent animate-pulse", textColor: "text-brand-accent" },
  framtida: { label: "Planerat", dot: "bg-ink-muted", textColor: "text-ink-muted" },
};

/**
 * VARIANT C, Tidslinje med delmål
 *
 * Lodrät tidslinje med ett mål per år. En statusmarkering visar om målet
 * är klart, pågår eller är planerat. Visar både vad vi gjort och vad vi lovar.
 *
 * Fördel: Strukturerad och ärlig. Visar både bakåt och framåt.
 * Nackdel: Kräver tydlig text för varje mål. Inte lika snabb att skumma.
 */
export function ImpactTimeline() {
  return (
    <Annotation
      label="Hållbarhetsblock som tidslinje"
      audience="design"
      rationale="Lodrät tidslinje med ett år per punkt och en status för varje mål. Besökaren ser direkt vad som redan är gjort och vad som är löften framåt, vilket minskar risken för grönmålning."
    >
      <section>
        <Copy
          label="Rubrik"
          category="rubrik"
          text="Vår hållbarhetsresa"
          rationale="'Resa' visar att arbetet pågår och inte är färdigt, vilket passar en tidslinje med både klara och planerade mål."
        >
          <h2 className="text-h3 font-medium mb-2">Vår hållbarhetsresa</h2>
        </Copy>
        <Copy
          label="Ingress"
          category="ton"
          text="Det här har vi gjort och det här gör vi härnäst, med status för varje mål."
          rationale="Lovar öppenhet redan innan listan börjar. Kort och rak, utan att sälja in resultaten."
        >
          <p className="text-ink-secondary mb-8 max-w-reading">
            Det här har vi gjort och det här gör vi härnäst, med status för varje mål.
          </p>
        </Copy>
        <Annotation
          label="Mål med år och status"
          audience="redaktör"
          rationale="Ett mål per år: skriv målet som rubrik och en mening om läget under. Uppdatera statusen minst en gång per år. Ta aldrig bort ett mål som inte nåtts, markera det i stället ärligt."
        >
          <ol className="relative border-l-2 border-border-subtle ml-4 space-y-8 max-w-reading">
            {MAL.map((m, idx) => {
              const meta = STATUS_META[m.status];
              const statusEtikett = (
                <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full border ${meta.textColor} border-current`}>
                  {meta.label}
                </span>
              );
              return (
                <li key={m.ar} className="pl-8 relative">
                  <span className={`absolute -left-[11px] top-1 w-5 h-5 rounded-full ${meta.dot} border-4 border-canvas shadow-sm`} />
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="text-h4 font-bold text-brand-primary">{m.ar}</span>
                    {idx === 0 ? (
                      <Copy
                        label="Statusetikett"
                        category="metadata"
                        text={meta.label}
                        rationale="Tre fasta ord: Klart, Pågår och Planerat. Korta och neutrala, så att även mål som inte nåtts än redovisas ärligt. Undvik 'På god väg', det låter som en ursäkt."
                      >
                        {statusEtikett}
                      </Copy>
                    ) : (
                      statusEtikett
                    )}
                  </div>
                  <h3 className="font-medium mb-1">{m.mal}</h3>
                  <p className="text-sm text-ink-secondary leading-relaxed">{m.beskrivning}</p>
                </li>
              );
            })}
          </ol>
        </Annotation>
        <Copy
          label="Länk till hållbarhetsrapporten"
          category="cta"
          text="Läs hela hållbarhetsrapporten"
          rationale="Samma formulering som i berättelsevarianten, så att länken känns igen. Verb och objekt säger vad man får."
        >
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-brand-accent font-medium mt-8 ml-4 hover:underline"
          >
            Läs hela hållbarhetsrapporten
            <Icon name="arrow_forward" size={16} />
          </a>
        </Copy>
      </section>
    </Annotation>
  );
}
