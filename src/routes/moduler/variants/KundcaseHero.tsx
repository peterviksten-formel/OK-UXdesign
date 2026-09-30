import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT B, Stort citat
 *
 * Ett stort citat tar hela ytan. Visuellt djärvt. Fungerar för ett utvalt
 * kundcase eller på en kampanjsida där ett påstående ska fastna.
 *
 * Fördel: gör stort intryck och känns genomtänkt, inte som mer av samma.
 * Nackdel: allt hänger på ett citat, som måste vara starkt. Kan kännas tillrättalagt.
 */
export function KundcaseHero() {
  return (
    <Annotation
      label="Stort kundcitat"
      audience="design"
      rationale="Ett enda citat i stor text på en lugn bakgrund. Under citatet står vem kunden är och vilka tjänster hen har, så att läsaren kan avgöra om det gäller dem själva."
    >
      <section className="rounded-lg bg-tint-info py-12 sm:py-16 px-6 sm:px-10">
        <div className="max-w-reading mx-auto text-center">
          <Icon name="format_quote" size={40} className="text-brand-accent mx-auto mb-4" />
          <Annotation
            label="Citatet"
            audience="user"
            rationale="Ett konkret resultat med kundens egna ord, i stor text. Läsaren får ett tydligt svar på vad tjänsten gav någon annan."
          >
            <blockquote className="text-h2 text-brand-primary leading-tight mb-6 italic">
              "Vi fick ner elkostnaden med 30 % första året efter solcellerna. Öresundskraft
              skötte hela installationen, vi behövde inte tänka."
            </blockquote>
          </Annotation>
          <Annotation
            label="Namn och tjänster"
            audience="redaktör"
            rationale="Håll citatet under 25 ord och behåll kundens egna ord. Skriv förnamn, initial, boendeform och ort, sedan hur länge hen varit kund och vilka tjänster hen har. Få kundens godkännande."
          >
            <figcaption className="text-sm">
              <Copy
                label="Vem kunden är"
                category="metadata"
                text="Anders L., villaägare i Helsingborg"
                rationale="Namn, boendeform och ort i en rad gör citatet verkligt och hjälper läsaren att jämföra med sig själv."
              >
                <p className="font-medium text-brand-primary">Anders L., villaägare i Helsingborg</p>
              </Copy>
              <Copy
                label="Kundhistorik och tjänster"
                category="metadata"
                text="Kund sedan 2019 · Solceller och laddbox"
                rationale="Visar att erfarenheten bygger på flera år och vilka tjänster den gäller. Skriv 'och' i stället för plustecken så att raden läses som vanlig text."
              >
                <p className="text-ink-muted mt-1">Kund sedan 2019 · Solceller och laddbox</p>
              </Copy>
            </figcaption>
          </Annotation>
          <Copy
            label="Länk till hela berättelsen"
            category="cta"
            text="Läs Anders berättelse"
            rationale="Kundens namn gör länken konkret och personlig. Undvik 'kundcase', som är ett internt ord, och tomma länktexter som 'Läs mer'."
          >
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-sm text-brand-accent font-medium mt-6 hover:underline"
            >
              Läs Anders berättelse
              <Icon name="arrow_forward" size={16} />
            </a>
          </Copy>
        </div>
      </section>
    </Annotation>
  );
}
