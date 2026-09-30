import { Link } from "react-router-dom";
import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT A, Handlingsfokuserad (samma mönster som sidtypen Startsida undersida)
 *
 * Idé: sidans öppning är en handling, inte en välkomsthälsning. Rubriken
 * säger vad besökaren kan göra här. En tydlig huvudknapp och inga
 * konkurrerande val. Ingen bild, texten bär allt.
 *
 * Fördel: flest avslut när besökaren kommit för att göra något.
 * Nackdel: kan kännas kal och säljig. Ger lite varumärkeskänsla.
 */
export function HeroAction() {
  return (
    <Annotation
      label="Handlingsfokuserad hero"
      audience="design"
      rationale="Hela öppningen leder mot en enda handling: rubrik, ingress, knapp och trygghetsrad. Utan bild och sidoval finns inget som drar blicken från beslutet. Samma mönster som sidtypen Startsida undersida."
    >
      <section className="py-12 sm:py-20 max-w-reading">
        <nav aria-label="Brödsmulor" className="text-xs text-ink-muted mb-4">
          <ol className="flex gap-1">
            <li><a href="#" className="hover:text-brand-accent">Privat</a></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page" className="font-medium text-ink">Elhandel</li>
          </ol>
        </nav>
        <Annotation
          label="Rubrik och ingress"
          audience="redaktör"
          rationale="Skriv rubriken som en uppmaning: verb plus det besökaren vill få gjort. Ingressen säger vad som händer på sidan och tar bort ett vanligt orosmoment. Håll ingressen till en eller två meningar."
        >
          <div>
            <Copy
              label="H1, verb plus objekt"
              category="rubrik"
              text="Välj elavtal som passar dig"
              rationale="Börjar med verbet så att besökaren direkt ser vad sidan hjälper till med. 'som passar dig' lovar ett personligt val. Undvik 'Välkommen till elhandel' eller bara 'Elavtal', som inte säger vad man kan göra."
            >
              <h1 className="text-display leading-tight mb-4">
                Välj elavtal som passar dig
              </h1>
            </Copy>
            <Copy
              label="Ingress, tre steg och två löften"
              category="rubrik"
              text="Jämför våra tre avtal, se vad det kostar och teckna direkt. Inga dolda avgifter och ingen bindningstid om du inte vill."
              rationale="Tre verb i den ordning besökaren gör dem: jämför, se, teckna. Andra meningen svarar på de två vanligaste invändningarna. Undvik värdeord som 'enkelt' och 'smidigt' som inte går att kontrollera."
            >
              <p className="text-lede text-ink-secondary mb-6 leading-relaxed">
                Jämför våra tre avtal, se vad det kostar och teckna direkt. Inga dolda avgifter
                och ingen bindningstid om du inte vill.
              </p>
            </Copy>
          </div>
        </Annotation>
        <Annotation
          label="Huvudknapp och trygghetsrad"
          audience="user"
          rationale="En enda knapp gör valet självklart. Raden under svarar på det besökaren undrar precis innan klicket: hur lång tid det tar, vad som behövs och om man kan ångra sig."
        >
          <div>
            <div className="mb-3">
              <Copy
                label="Huvudknapp"
                category="cta"
                text="Teckna elavtal"
                rationale="Verb plus objekt som säger exakt vad som händer. Upprepar ordet elavtal från rubriken så att besökaren känner igen sig. Undvik 'Kom igång' eller 'Läs mer', som inte säger vart knappen leder."
              >
                <Link
                  to="/moduler/elavtal-jamfor"
                  className="inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-7 py-3.5 rounded hover:opacity-90 transition-opacity text-base"
                >
                  Teckna elavtal
                  <Icon name="arrow_forward" size={18} />
                </Link>
              </Copy>
            </div>
            <Copy
              label="Trygghetsrad"
              category="reassurance"
              text="Tar ca 3 minuter · Du behöver personnummer och adress · 14 dagars ångerrätt"
              rationale="Tre korta fakta: tid, vad som behövs och ångerrätt. Konkreta siffror lugnar mer än allmänna löften. Håll raden till högst tre delar så att den går att läsa i en blick."
            >
              <p className="text-xs text-ink-muted">
                Tar ca 3 minuter · Du behöver personnummer och adress · 14 dagars ångerrätt
              </p>
            </Copy>
          </div>
        </Annotation>
      </section>
    </Annotation>
  );
}
