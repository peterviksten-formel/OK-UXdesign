import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

const SAKER = [
  "Se dina fakturor",
  "Rapportera mätarställning",
  "Ändra betalsätt",
  "Byta elavtal",
  "Ändra adress",
];

/**
 * VARIANT A, Stor banner
 *
 * Mörkblå banner med en stor inloggningsknapp och en lista över de fem
 * vanligaste sakerna man kan göra på Mina sidor. Används när Mina sidor
 * ska lyftas som den främsta vägen att lösa ärenden.
 *
 * Fördel: Omöjlig att missa. Gör Mina sidor till huvudvägen.
 * Nackdel: Tar mycket plats.
 */
export function MinaSidorHero() {
  return (
    <Annotation
      label="Stor banner för Mina sidor"
      audience="design"
      rationale="Den mörkblå bakgrunden skiljer blocket från resten av sidan. Den vita knappen är det mest framträdande i blocket, så inloggningen blir det självklara nästa steget."
    >
      <section className="rounded-lg bg-brand-primary text-white p-6 sm:p-8 grid md:grid-cols-2 gap-6 items-center">
        <Annotation
          label="Rubrik, fördelar och inloggning"
          audience="user"
          rationale="Rubriken lovar det besökaren vill ha: att bli klar snabbt. Raden under visar konkret vad hen vinner på att logga in i stället för att ringa."
        >
          <div>
            <Copy
              label="Rubrik"
              category="rubrik"
              text="De flesta ärenden löser du snabbast själv"
              rationale="Utgår från besökarens mål, att bli klar, och inte från vår kanal. 'Välkommen till Mina sidor' skulle handla om oss i stället för om kunden."
            >
              <h2 className="text-h2 mb-2 text-white">De flesta ärenden löser du snabbast själv</h2>
            </Copy>
            <Copy
              label="Fördelsrad"
              category="reassurance"
              text="Ingen kötid. Öppet dygnet runt. Tar 1 minut i stället för 10."
              rationale="Tre korta påståenden som besvarar varför man ska logga in. Jämförelsen 1 mot 10 minuter gör tidsvinsten konkret. Undvik vaga ord som 'smidigt' och 'enkelt'."
            >
              <p className="text-sm opacity-90 mb-4">
                Ingen kötid. Öppet dygnet runt. Tar 1 minut i stället för 10.
              </p>
            </Copy>
            <Copy
              label="Inloggningsknapp"
              category="cta"
              text="Logga in på Mina sidor"
              rationale="Verb och mål i samma knapp, så ingen tvekar om vart den leder. Samma ord som i sidhuvudet och i appen, för igenkänning."
            >
              <a
                href="#"
                className="inline-flex items-center gap-2 bg-white text-brand-primary font-medium px-5 py-3 rounded hover:opacity-90 transition-opacity"
              >
                <Icon name="person" size={18} />
                Logga in på Mina sidor
                <Icon name="arrow_forward" size={16} />
              </a>
            </Copy>
          </div>
        </Annotation>
        <Annotation
          label="Lista över vad du kan göra"
          audience="redaktör"
          rationale="Välj de fem vanligaste ärendena från kundservice. Börja varje punkt med ett verb, så att listan visar vad kunden kan göra. Håll listan till högst fem punkter."
        >
          <div className="bg-white/10 rounded-md p-5">
            <Copy
              label="Listrubrik"
              category="rubrik"
              text="Det här kan du göra:"
              rationale="Direkt och personlig. Kolonet visar att listan hör till rubriken. 'Bland annat' behövs inte, listan visar redan exempel."
            >
              <p className="text-xs uppercase tracking-wider font-medium mb-3 opacity-80">
                Det här kan du göra:
              </p>
            </Copy>
            <ul className="space-y-2">
              {SAKER.map((s) => (
                <li key={s} className="flex items-center gap-2 text-sm">
                  <Icon name="check" size={16} />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </Annotation>
      </section>
    </Annotation>
  );
}
