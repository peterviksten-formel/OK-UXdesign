import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT B, Grupperad efter skede
 *
 * Frågorna delas in efter var besökaren befinner sig: innan avtalet,
 * när det tecknas och som kund. Det följer hur människor tänker kring sitt ärende,
 * inte hur företaget är organiserat.
 *
 * Fördel: stämmer med hur besökaren tänker. Klarar fler frågor än en utfällbar lista.
 * Nackdel: fungerar bara om frågorna verkligen hör till ett visst skede.
 */
const GRUPPER = [
  {
    titel: "Innan du tecknar",
    fragor: [
      "Vad är skillnaden mellan elnät och elhandel?",
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

function fragelista(fragor: string[]) {
  return (
    <ul className="space-y-2 text-sm">
      {fragor.map((f) => (
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
  );
}

export function FaqGrupperad() {
  return (
    <Annotation
      label="FAQ grupperad efter skede"
      audience="design"
      rationale="Tre kolumner som följer besökarens väg: innan, under och efter att avtalet tecknats. Besökaren känner igen var den själv står och hittar rätt grupp direkt. Samma frågor som i den utfällbara listan, bara sorterade annorlunda."
    >
      <section>
        <Copy
          label="Rubrik för FAQ-blocket"
          category="rubrik"
          text="Vanliga frågor"
          rationale="Samma rubrik som i de andra varianterna, så att besökaren känner igen blocket oavsett form. Grupprubrikerna under gör resten av jobbet."
        >
          <h2 className="text-h3 font-medium mb-6">Vanliga frågor</h2>
        </Copy>
        <Annotation
          label="Grupper och frågor"
          audience="redaktör"
          rationale="Placera varje fråga i det skede då kunden ställer den. Håll grupperna ungefär lika stora, tre till fem frågor i varje. Passar en fråga inte in är det ett tecken på att grupperna behöver ses över."
        >
        <div className="grid md:grid-cols-3 gap-6">
          {GRUPPER.map((g, idx) => (
            <div key={g.titel}>
              {idx === 0 ? (
                <Copy
                  label="Grupprubrik efter skede"
                  category="rubrik"
                  text={g.titel}
                  rationale="Grupprubrikerna beskriver var besökaren står ('Innan du tecknar', 'När du är kund'), inte vilken avdelning som äger frågan. Du-tilltalet gör det lätt att känna igen sig."
                >
                  <h3 className="font-medium text-brand-primary mb-3">{g.titel}</h3>
                </Copy>
              ) : (
                <h3 className="font-medium text-brand-primary mb-3">{g.titel}</h3>
              )}
              {idx === 0 ? (
                <Annotation
                  label="Frågor som länkar"
                  audience="user"
                  rationale="Varje fråga leder direkt till sitt svar. Besökaren läser bara frågorna i den grupp som gäller och slipper bläddra igenom resten."
                >
                  {fragelista(g.fragor)}
                </Annotation>
              ) : (
                fragelista(g.fragor)
              )}
            </div>
          ))}
        </div>
        </Annotation>
        <Copy
          label="Länk till alla frågor"
          category="cta"
          text="Se alla vanliga frågor →"
          rationale="Verb plus objekt som säger vart länken leder. Upprepar rubrikens ord så att sambandet är tydligt. Undvik 'Visa fler' som inte säger fler av vad."
        >
          <a
            href="#"
            className="text-sm text-brand-accent hover:underline mt-6 inline-block"
          >
            Se alla vanliga frågor →
          </a>
        </Copy>
      </section>
    </Annotation>
  );
}
