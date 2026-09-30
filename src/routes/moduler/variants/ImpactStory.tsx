import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT B, Berättelse
 *
 * Textbaserat block där siffrorna vävs in i löptexten. Kort men
 * sammanhängande. Bygger trovärdighet genom att ge siffrorna ett sammanhang.
 *
 * Fördel: Siffrorna får sammanhang. Berättelsen bygger förtroende.
 * Nackdel: Kräver redaktionellt skriven text. Tar längre tid att läsa.
 */
export function ImpactStory() {
  return (
    <Annotation
      label="Hållbarhetsblock som berättelse"
      audience="design"
      rationale="Löptext där siffrorna lyfts fram med fetare och större text men läses i sitt sammanhang. Visar att vi inte bara listar mål utan förklarar varför och hur."
    >
      <section className="rounded-lg bg-tint-info p-6 sm:p-10">
        <div className="max-w-reading">
          <Annotation
            label="Etikett och rubrik"
            audience="user"
            rationale="Etiketten knyter blocket till satsningen Tillsammans för 17. Rubriken säger vad texten handlar om, så besökaren kan avgöra om den vill läsa vidare."
          >
            <div>
              <Copy
                label="Etikett ovanför rubriken"
                category="metadata"
                text="Tillsammans för 17"
                rationale="Satsningens namn, som känns igen från andra kanaler. Siffran syftar på FN:s 17 globala mål, vilket förklaras längre ner i texten."
              >
                <p className="uppercase text-xs font-bold tracking-wider text-brand-accent mb-3">
                  Tillsammans för 17
                </p>
              </Copy>
              <Copy
                label="Rubrik"
                category="rubrik"
                text="Vår del av de globala målen"
                rationale="Ödmjuk formulering: 'vår del' visar att vi bidrar till något större, utan att ta åt oss hela äran. Undvik superlativ som 'ledande inom hållbarhet'."
              >
                <h2 className="text-h2 leading-tight mb-4">
                  Vår del av de globala målen
                </h2>
              </Copy>
            </div>
          </Annotation>
          <Annotation
            label="Löptext med framlyfta siffror"
            audience="redaktör"
            rationale="Skriv korta stycken med en siffra var. Lyft fram siffran i fetstil och förklara vad den betyder i vardagen. Kontrollera att alla siffror stämmer med årets hållbarhetsrapport."
          >
            <div className="prose prose-sm max-w-none text-ink-secondary leading-relaxed space-y-4">
              <p>
                Sedan 2024 levererar vi <strong className="text-brand-primary text-lg">100% fossilfri el</strong>{" "}
                till alla våra avtalskunder. Det är ett första steg, men inte det sista.
              </p>
              <p>
                Genom <strong>Innozhero-projektet</strong> i Helsingborg ska vi fånga in{" "}
                <strong className="text-brand-primary text-lg">200 000 ton CO₂ per år</strong> från och
                med 2030. Tekniken finns. Vi bygger anläggningen nu.
              </p>
              <p>
                Varje anställd har <strong className="text-brand-primary text-lg">17 timmar</strong> om året
                för volontärarbete. Vi kallar det 17-satsningen, efter FN:s 17 globala mål. Förra året
                var vi med och finansierade <strong>3 nya laddstationer</strong> i staden genom
                Framtidspengen.
              </p>
            </div>
          </Annotation>
          <Copy
            label="Länk till hållbarhetsrapporten"
            category="cta"
            text="Läs hela hållbarhetsrapporten"
            rationale="Verb och objekt som säger exakt vad man får. 'Hela' visar att blocket bara är ett urval och att det finns mer för den som vill fördjupa sig."
          >
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-brand-accent font-medium mt-5 hover:underline"
            >
              Läs hela hållbarhetsrapporten
              <Icon name="arrow_forward" size={16} />
            </a>
          </Copy>
        </div>
      </section>
    </Annotation>
  );
}
