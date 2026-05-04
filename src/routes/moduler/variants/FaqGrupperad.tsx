import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT B, Grupperad (per tidslinje)
 *
 * Grupperar frågor efter användarens mentala tidslinje: innan / under /
 * efter. Matchar hur människor tänker om sitt ärende, inte efter
 * företagets kategorier.
 *
 * Pro: Matchar mental modell. Skalar bättre än ren accordion.
 * Kontra: Kräver att frågor faktiskt passar in i tidslinjen.
 */
const GRUPPER = [
  {
    titel: "Innan du tecknar",
    fragor: [
      "Skillnaden mellan elnät och elhandel",
      "Vilket avtal passar mig?",
      "Vad är påslag och spotpris?",
    ],
  },
  {
    titel: "När du tecknar",
    fragor: [
      "Vad behöver jag för att teckna?",
      "Hur snabbt börjar avtalet gälla?",
      "Vad händer om jag inte väljer avtal?",
    ],
  },
  {
    titel: "När du är kund",
    fragor: [
      "Kan jag byta avtal senare?",
      "Hur säger jag upp mitt avtal?",
      "Vad är bindningstid?",
    ],
  },
];

export function FaqGrupperad() {
  return (
    <Annotation
      label="FAQ Grupperad"
      audience="design"
      rationale="Tre kolumner efter tidslinje: innan, under, efter. Matchar vilken 'sida' av beslutet användaren står på. Samma innehåll som accordion, annan sortering."
    >
      <section>
        <h2 className="text-h3 font-medium mb-6">Vanliga frågor</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {GRUPPER.map((g) => (
            <div key={g.titel}>
              <h3 className="font-medium text-brand-primary mb-3">{g.titel}</h3>
              <ul className="space-y-2 text-sm">
                {g.fragor.map((f) => (
                  <li key={f}>
                    <a
                      href="#"
                      className="group flex items-start gap-2 text-ink-secondary hover:text-brand-accent py-1"
                    >
                      <Icon name="arrow_forward" size={14} className="mt-1 text-ink-muted group-hover:text-brand-accent" />
                      <span>{f}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <a
          href="#"
          className="text-sm text-brand-accent hover:underline mt-6 inline-block"
        >
          Se alla vanliga frågor →
        </a>
      </section>
    </Annotation>
  );
}
