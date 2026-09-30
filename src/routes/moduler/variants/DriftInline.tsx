import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT B, Statusruta i sidan
 *
 * Statusruta i full bredd inne i sidans innehåll. Läses som en del av
 * sidan, inte som en systemavisering. Passar sidor där driftstatus är
 * en naturlig del av det besökaren kommit för att läsa.
 *
 * Fördel: Tydlig och lugn, en del av läsupplevelsen.
 * Nackdel: Kan missas om besökaren redan scrollat förbi. Syns bara på utvalda sidor.
 */
export function DriftInline() {
  return (
    <Annotation
      label="Statusruta i sidan"
      audience="design"
      rationale="Ligger överst i innehållet på avbrotts- och kundservicesidan. Ingen stängknapp, eftersom rutan är innehåll och inte en avisering. Färg och ikon visar hur allvarligt läget är, texten säger vad det betyder."
    >
      <div className="space-y-3">
        {/* Normalläge */}
        <Annotation
          label="Normalläge"
          audience="user"
          rationale="Även när allt fungerar visas en ruta. Besökaren som undrar om det är ett känt fel får ett tydligt svar i stället för en tom sida."
        >
          <section className="rounded-md bg-tint-info border-l-4 border-brand-accent p-4 flex items-center gap-3 text-sm">
            <Icon name="check_circle" size={24} className="text-brand-accent shrink-0" />
            <Copy
              label="Statusmeddelande, normalläge"
              category="reassurance"
              text="Allt fungerar som vanligt. Inga kända avbrott och kort kötid i chatt och telefon."
              rationale="Lugnande och konkret: svarar på både 'är det avbrott?' och 'kommer jag fram?'. Undvik 'Allt normalt' som ensam rad, den säger inte vad som är normalt."
            >
              <span>
                <strong>Allt fungerar som vanligt.</strong> Inga kända avbrott och kort kötid i chatt och telefon.
              </span>
            </Copy>
          </section>
        </Annotation>
        {/* Lång kötid */}
        <section className="rounded-md bg-tint-notice border-l-4 border-yellow-500 p-4 flex items-center gap-3 text-sm">
          <Icon name="schedule" size={24} className="text-yellow-600 shrink-0" />
          <Copy
            label="Statusmeddelande, lång kötid"
            category="metadata"
            text="Längre kötider just nu. Prova gärna Mina sidor, där löser du många ärenden på 1 minut."
            rationale="Erkänner kön och erbjuder ett snabbare alternativ med en konkret tidsvinst. 'Prova gärna' är en vänlig uppmaning, inte en order."
          >
            <span className="flex-1">
              <strong>Längre kötider just nu.</strong> Prova gärna{" "}
              <a href="#" className="text-brand-primary font-medium underline">Mina sidor</a>, där löser du många ärenden på 1 minut.
            </span>
          </Copy>
        </section>
        {/* Avbrott */}
        <Annotation
          label="Avbrott med knapp till detaljer"
          audience="redaktör"
          rationale="Fyll i område, antal berörda kunder och beräknad klartid. Uppdatera klartiden så fort den ändras, och byt till normalläget när avbrottet är åtgärdat."
        >
          <section className="rounded-md bg-tint-highlight border-l-4 border-brand-highlight p-4 flex items-center gap-3 text-sm">
            <Icon name="bolt" size={24} className="text-brand-highlight shrink-0" filled />
            <Copy
              label="Statusmeddelande, avbrott"
              category="metadata"
              text="Pågående avbrott i centrala Helsingborg. 340 kunder berörs. Beräknad klar 12:00."
              rationale="Tre korta meningar i fast ordning: var, hur många, när klart. Besökaren ser direkt om det gäller hen och hur länge det kan dröja."
            >
              <span className="flex-1">
                <strong>Pågående avbrott</strong> i centrala Helsingborg. 340 kunder berörs. Beräknad
                klar 12:00.
              </span>
            </Copy>
            <Copy
              label="Knapp till avbrottsdetaljer"
              category="cta"
              text="Se avbrottet"
              rationale="Verb och objekt som säger exakt vad man får se. 'Se detaljer' är vagt när rutan ligger bland annat innehåll på sidan."
            >
              <a
                href="#"
                className="inline-flex items-center gap-1.5 bg-brand-primary text-white font-medium text-xs px-3 py-1.5 rounded hover:opacity-90 whitespace-nowrap"
              >
                Se avbrottet
                <Icon name="arrow_forward" size={14} />
              </a>
            </Copy>
          </section>
        </Annotation>
      </div>
    </Annotation>
  );
}
