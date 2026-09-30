import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT C, Kompakt remsa
 *
 * En enda rad som tar minimal plats. Används som påminnelse på flera
 * sidor eller som extra väg till inloggning längst ner på sidan.
 *
 * Fördel: Tar lite plats. Bra att upprepa på många sidor.
 * Nackdel: För diskret för att vara sidans främsta väg till Mina sidor.
 */
export function MinaSidorStrip() {
  return (
    <Annotation
      label="Kompakt remsa för Mina sidor"
      audience="design"
      rationale="En rad med ikon, en mening om värdet och en knapp. Används som komplement till ett större Mina sidor-block högre upp, eller som påminnelse längst ner på sidan."
    >
      <section className="rounded-md bg-tint-info p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Icon name="person" size={28} className="text-brand-primary" />
        <Annotation
          label="Värdemening och fördelar"
          audience="redaktör"
          rationale="Håll dig till en mening och en kort fördelsrad, annars är det inte längre en remsa. Använd samma formulering på alla sidor där remsan visas, så känns den igen."
        >
          <div className="flex-1">
            <Copy
              label="Värdemening"
              category="rubrik"
              text="De flesta ärenden löser du snabbast själv på Mina sidor."
              rationale="Samma löfte som i den stora bannern, för igenkänning. Utgår från kundens mål att bli klar snabbt, inte från kanalen."
            >
              <p className="font-medium">De flesta ärenden löser du snabbast själv på Mina sidor.</p>
            </Copy>
            <Copy
              label="Fördelsrad"
              category="reassurance"
              text="Ingen kötid · Öppet dygnet runt"
              rationale="Två korta fördelar som besvarar varför man inte ska ringa. Samma ord som i den stora bannern, så budskapet blir konsekvent."
            >
              <p className="text-sm text-ink-secondary">Ingen kötid · Öppet dygnet runt</p>
            </Copy>
          </div>
        </Annotation>
        <Copy
          label="Inloggningsknapp"
          category="cta"
          text="Logga in"
          rationale="Kort nog för en smal rad. Meningen bredvid nämner redan Mina sidor, så det är tydligt vart knappen leder."
        >
          <a
            href="#"
            className="inline-flex items-center gap-1.5 bg-brand-primary text-ink-onbrand font-medium px-5 py-2.5 rounded hover:opacity-90 whitespace-nowrap"
          >
            Logga in
            <Icon name="arrow_forward" size={16} />
          </a>
        </Copy>
      </section>
    </Annotation>
  );
}
