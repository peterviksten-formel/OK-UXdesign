import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT C, Statusfokuserad
 *
 * Idé: sidan svarar på besökarens fråga direkt i rubriken, som ändras
 * efter aktuellt läge. Används för avbrottsinformation, kundservice och
 * andra sidor som visar läget i realtid. Ett tydligt svar, ingen gissning.
 *
 * Fördel: sparar besökarens tid. Upplevs som mycket nyttig.
 * Nackdel: kräver aktuell data från våra system. Passar inte sidor utan ett läge att visa.
 */
export function HeroStatus({ pagaende = 2 }: { pagaende?: number }) {
  const harPagaende = pagaende > 0;
  const rubrik = harPagaende
    ? `${pagaende} pågående avbrott just nu`
    : "Inga avbrott just nu";
  const ingress = harPagaende
    ? "Vi arbetar med att få tillbaka strömmen. Se läget och när vi räknar med att vara klara längre ned."
    : "Det finns inga kända avbrott i vårt elnät. Se planerade arbeten längre ned.";
  return (
    <Annotation
      label="Statusfokuserad hero"
      audience="design"
      rationale="Rubriken är svaret på frågan besökaren kom med: är det avbrott eller inte? Färgen förstärker svaret, korallröd vid avbrott och turkos när allt fungerar. Ingen välkomsttext som står i vägen."
    >
      <section
        className={`rounded-lg p-6 sm:p-10 ${
          harPagaende
            ? "bg-tint-highlight border border-brand-highlight"
            : "bg-tint-info border border-brand-accent/40"
        }`}
        aria-live="polite"
      >
        <div className="flex items-start gap-4">
          <div
            className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
              harPagaende ? "bg-brand-highlight" : "bg-brand-accent"
            }`}
          >
            <Icon
              name={harPagaende ? "bolt" : "check"}
              size={28}
              className="text-white"
              filled={harPagaende}
            />
          </div>
          <div className="flex-1">
            <Annotation
              label="Statusrubrik och förklaring"
              audience="redaktör"
              rationale="Rubriken och antalet avbrott hämtas automatiskt från driftsystemet. Redaktören skriver bara de två ingresserna, en för avbrott och en för normalläge. Håll dem korta och säg var besökaren hittar mer."
            >
              <div>
                <Copy
                  label="H1, direkt svar"
                  category="rubrik"
                  text={rubrik}
                  rationale="Svarar ja eller nej på besökarens fråga med en siffra. 'just nu' visar att uppgiften är aktuell. Undvik 'Driftinformation' eller 'Välkommen', som tvingar besökaren att leta efter svaret."
                >
                  <h1 className="text-h1 leading-tight mb-2">{rubrik}</h1>
                </Copy>
                <Copy
                  label="Ingress, vad händer nu"
                  category="ton"
                  text={ingress}
                  rationale="Vid avbrott: säg att vi arbetar med saken och var besökaren ser mer. I normalläge: bekräfta lugnt och peka mot planerade arbeten. 'Vi' tar ansvar. Undvik tekniska ord som 'driftstörning i nätstation'."
                >
                  <p className="text-lede text-ink-secondary mb-6 max-w-reading">{ingress}</p>
                </Copy>
              </div>
            </Annotation>
            <Annotation
              label="Snabba kontaktvägar"
              audience="user"
              rationale="Den som har strömavbrott vill kunna ringa direkt. Numret står i knappen så att det går att läsa av även utan att ringa. SMS-aviseringen ger besökaren besked nästa gång utan att behöva söka."
            >
              <div className="flex flex-wrap gap-3">
                <Copy
                  label="Huvudknapp, ring felanmälan"
                  category="cta"
                  text="Ring felanmälan 042-490 32 00"
                  rationale="Verbet 'Ring' säger vad som händer när man trycker. Numret syns i knappen så att det går att skriva av från en annan skärm. Undvik bara 'Kontakta oss', som inte säger hur."
                >
                  <a
                    href="tel:0424903200"
                    className="inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-5 py-3 rounded hover:opacity-90 transition-opacity"
                  >
                    <Icon name="call" size={18} />
                    Ring felanmälan 042-490 32 00
                  </a>
                </Copy>
                <Copy
                  label="Sekundär knapp, SMS-avisering"
                  category="cta"
                  text="Få avbrott på SMS"
                  rationale="Säger vad besökaren får, inte vad tjänsten heter. 'SMS-avisering' ensamt är ett substantiv utan handling."
                >
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 border border-border-strong text-ink-secondary font-medium px-5 py-3 rounded hover:bg-surface transition-colors"
                  >
                    <Icon name="sms" size={18} />
                    Få avbrott på SMS
                  </a>
                </Copy>
              </div>
            </Annotation>
          </div>
        </div>
      </section>
    </Annotation>
  );
}
