import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT B, Webb och app i två kort
 *
 * Två kort bredvid varandra: Mina sidor till vänster, appen till höger.
 * För kunder som vill välja mellan webben och mobilen.
 *
 * Fördel: Kunden får välja. Appen lyfts som ett fullvärdigt alternativ.
 * Nackdel: Uppmärksamheten delas mellan två vägar in.
 */
export function MinaSidorSplit() {
  return (
    <Annotation
      label="Webb och app i två kort"
      audience="design"
      rationale="Två likvärdiga kort med var sin knapp och en kort lista över vad man kan göra. Webben står till vänster och har tjockare ram, eftersom de flesta kunder börjar där. Passar när båda kanalerna är lika viktiga."
    >
      <section className="grid md:grid-cols-2 gap-4">
        {/* Mina sidor */}
        <Annotation
          label="Kort för Mina sidor"
          audience="user"
          rationale="Visar vad webben är bäst på: full överblick över fakturor, avtal och förbrukning. Kunden som vill göra något större, som att byta avtal, ser direkt att det går här."
        >
          <div className="rounded-lg border-2 border-brand-primary bg-surface p-5 sm:p-6 flex flex-col">
            <Icon name="computer" size={28} className="text-brand-primary mb-3" />
            <h3 className="text-h4 font-medium mb-1">Mina sidor</h3>
            <Copy
              label="Beskrivning av Mina sidor"
              category="ton"
              text="Full överblick över fakturor, avtal, förbrukning och inställningar."
              rationale="Lyfter överblicken, det som skiljer webben från appen. Uppräkningen visar vad som finns utan att lova för mycket."
            >
              <p className="text-sm text-ink-secondary mb-4">
                Full överblick över fakturor, avtal, förbrukning och inställningar.
              </p>
            </Copy>
            <ul className="space-y-1 text-xs text-ink-muted mb-5">
              <li className="flex items-center gap-1.5"><Icon name="check" size={12} /> Se fakturahistorik</li>
              <li className="flex items-center gap-1.5"><Icon name="check" size={12} /> Byt avtal</li>
              <li className="flex items-center gap-1.5"><Icon name="check" size={12} /> Rapportera mätarställning</li>
            </ul>
            <Copy
              label="Inloggningsknapp"
              category="cta"
              text="Logga in på Mina sidor"
              rationale="Säger både handlingen och målet. Ett ensamt 'Logga in' blir otydligt när det står två kort bredvid varandra."
            >
              <a
                href="#"
                className="mt-auto inline-flex items-center justify-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-4 py-2.5 rounded hover:opacity-90"
              >
                Logga in på Mina sidor
                <Icon name="arrow_forward" size={16} />
              </a>
            </Copy>
          </div>
        </Annotation>

        {/* Appen */}
        <Annotation
          label="Kort för appen"
          audience="redaktör"
          rationale="Lista högst tre saker som bara appen gör eller gör bättre än webben, till exempel aviseringar. Kontrollera att länkarna går till rätt app i respektive butik."
        >
          <div className="rounded-lg border border-border-subtle bg-surface p-5 sm:p-6 flex flex-col">
            <Icon name="smartphone" size={28} className="text-brand-accent mb-3" />
            <Copy
              label="Appens namn"
              category="rubrik"
              text="Appen Mitt Öresundskraft"
              rationale="Appens namn som det står i appbutikerna, så kunden hittar rätt. Ordet 'appen' först visar direkt vad kortet handlar om."
            >
              <h3 className="text-h4 font-medium mb-1">Appen Mitt Öresundskraft</h3>
            </Copy>
            <Copy
              label="Beskrivning av appen"
              category="ton"
              text="Koll på förbrukningen dygnet runt, direkt i mobilen."
              rationale="Lyfter det appen gör bäst: snabb koll i vardagen. Kort och konkret, utan säljord."
            >
              <p className="text-sm text-ink-secondary mb-4">
                Koll på förbrukningen dygnet runt, direkt i mobilen.
              </p>
            </Copy>
            <ul className="space-y-1 text-xs text-ink-muted mb-5">
              <li className="flex items-center gap-1.5"><Icon name="check" size={12} /> Förbrukning i realtid</li>
              <li className="flex items-center gap-1.5"><Icon name="check" size={12} /> Sms när det är avbrott</li>
              <li className="flex items-center gap-1.5"><Icon name="check" size={12} /> Inloggning med fingeravtryck</li>
            </ul>
            <div className="mt-auto flex gap-2">
              <a
                href="#"
                className="flex-1 inline-flex items-center justify-center gap-1.5 border border-border-strong text-ink-secondary font-medium px-3 py-2.5 rounded hover:bg-tint-info text-sm"
              >
                App Store
              </a>
              <a
                href="#"
                className="flex-1 inline-flex items-center justify-center gap-1.5 border border-border-strong text-ink-secondary font-medium px-3 py-2.5 rounded hover:bg-tint-info text-sm"
              >
                Google Play
              </a>
            </div>
          </div>
        </Annotation>
      </section>
    </Annotation>
  );
}
