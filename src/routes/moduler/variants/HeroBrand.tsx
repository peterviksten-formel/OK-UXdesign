import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT B, Varumärkesfokuserad
 *
 * Idé: stor bild och ett tydligt löfte om vad Öresundskraft står för.
 * Bygger förtroende och känsla innan besökaren fattar något beslut.
 * Passar kampanjsidor och översiktssidor.
 *
 * Fördel: stärker varumärket och ger förtroende hos nya besökare.
 * Nackdel: färre direkta avslut. Kräver bra bild och välskriven text.
 */
export function HeroBrand() {
  return (
    <Annotation
      label="Varumärkesfokuserad hero"
      audience="design"
      rationale="Bild och löfte kommer före handling. Besökaren får först veta vilka vi är och varför det spelar roll, sedan erbjuds två vägar vidare. Passar besökare som orienterar sig, sämre när någon vill få något gjort."
    >
      <section className="relative overflow-hidden rounded-lg bg-brand-primary text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="w-full h-full bg-gradient-to-br from-white to-transparent" />
        </div>
        <div className="relative z-10 py-16 sm:py-24 px-6 sm:px-10 max-w-reading">
          <Annotation
            label="Avsändare, rubrik och löfte"
            audience="redaktör"
            rationale="Byt bakgrundsbild efter säsong eller kampanj, men låt rubriken vara ett löfte som håller över tid. Ingressen ska förklara löftet med två eller tre konkreta påståenden som vi kan stå för."
          >
            <div>
              <p className="uppercase text-xs font-bold tracking-wider opacity-80 mb-3">
                Öresundskraft
              </p>
              <Copy
                label="H1, varumärkeslöfte"
                category="rubrik"
                text="Energi för ett bättre Helsingborg"
                rationale="Kort löfte som knyter oss till platsen. 'Helsingborg' gör det lokalt och konkret. Undvik tomma superlativer som 'Sveriges bästa energibolag' som ingen kan kontrollera."
              >
                <h1 className="text-display leading-tight mb-4">
                  Energi för ett bättre Helsingborg
                </h1>
              </Copy>
              <Copy
                label="Ingress, löftet förklarat"
                category="ton"
                text="Vi gör det enkelt för dig att använda återvunnen och förnybar energi. Lokalt, öppet och med vinsten tillbaka i regionen."
                rationale="Förklarar löftet i vardagliga ord och med du-tilltal. De tre orden på slutet (lokalt, öppet, vinsten tillbaka) är skäl att lita på oss. 'Öppet' ersätter 'transparent', som är ett lånord."
              >
                <p className="text-lede opacity-90 mb-8 leading-relaxed">
                  Vi gör det enkelt för dig att använda återvunnen och förnybar energi. Lokalt,
                  öppet och med vinsten tillbaka i regionen.
                </p>
              </Copy>
            </div>
          </Annotation>
          <Annotation
            label="Två vägar vidare"
            audience="user"
            rationale="Huvudknappen leder till tjänsterna, länken bredvid till mer om oss. Besökaren som bara vill titta runt får välja själv utan att känna sig pressad att köpa."
          >
            <div className="flex flex-wrap gap-3">
              <Copy
                label="Huvudknapp, inbjudande"
                category="cta"
                text="Se våra tjänster"
                rationale="Verb plus objekt, men mjukare än 'Teckna' eller 'Köp' eftersom besökaren ännu inte bestämt sig. 'Se' är tydligare än 'Utforska', som säger mindre om vad som händer."
              >
                <a
                  href="#"
                  className="inline-flex items-center gap-2 bg-white text-brand-primary font-medium px-6 py-3 rounded hover:opacity-90 transition-opacity"
                >
                  Se våra tjänster
                  <Icon name="arrow_forward" size={18} />
                </a>
              </Copy>
              <Copy
                label="Sekundär knapp"
                category="cta"
                text="Läs om vårt hållbarhetsarbete"
                rationale="Säger vad besökaren får läsa om. 'Vårt arbete' ensamt är för vagt. Håll den sekundära knappen svagare i formen så att den inte tävlar med huvudknappen."
              >
                <a
                  href="#"
                  className="inline-flex items-center gap-2 border-2 border-white/70 text-white font-medium px-6 py-3 rounded hover:bg-white/10 transition-colors"
                >
                  Läs om vårt hållbarhetsarbete
                </a>
              </Copy>
            </div>
          </Annotation>
        </div>
      </section>
    </Annotation>
  );
}
