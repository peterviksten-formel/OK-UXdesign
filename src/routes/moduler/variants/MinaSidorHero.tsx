import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

const SAKER = [
  "Se fakturor",
  "Rapportera mätarställning",
  "Ändra betalsätt",
  "Byta elavtal",
  "Ändra adress",
];

/**
 * VARIANT A — Stor hero-banner
 *
 * Mörk navy banner med stor CTA "Logga in" och topp 5-listorna av vad
 * man kan göra. Används som prominent self-service-push.
 *
 * Pro: Omöjligt att missa. Lyfter Mina sidor som primär väg.
 * Kontra: Tar mycket yta.
 */
export function MinaSidorHero() {
  return (
    <Annotation
      label="Mina sidor — hero-banner"
      audience="user"
      rationale="Navy-bakgrund ger kontrast till resten av sidan. Listan till höger visar konkret VAD man kan göra, inte bara 'Logga in'. Logga-in-knappen är vit på navy — högsta visuella prioritet i blocket."
    >
      <section className="rounded-lg bg-brand-primary text-white p-6 sm:p-8 grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h2 className="text-h2 mb-2 text-white">De flesta ärenden löser du snabbast själv</h2>
          <p className="text-sm opacity-90 mb-4">
            Ingen kötid. Fungerar när som helst. Tar 1 minut istället för 10.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-white text-brand-primary font-medium px-5 py-3 rounded hover:opacity-90 transition-opacity"
          >
            <Icon name="person" size={18} />
            Logga in på Mina sidor
            <Icon name="arrow_forward" size={16} />
          </a>
        </div>
        <div className="bg-white/10 rounded-md p-5">
          <p className="text-xs uppercase tracking-wider font-medium mb-3 opacity-80">
            Här kan du bland annat:
          </p>
          <ul className="space-y-2">
            {SAKER.map((s) => (
              <li key={s} className="flex items-center gap-2 text-sm">
                <Icon name="check" size={16} />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Annotation>
  );
}
