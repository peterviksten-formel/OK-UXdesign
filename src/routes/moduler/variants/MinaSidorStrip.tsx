import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT C — Kompakt strip
 *
 * Horisontell rad, minimalt med yta. Används som upprepning på flera
 * sidor eller som sekundär CTA i footer.
 *
 * Pro: Minimal yta. Bra för återupprepning.
 * Kontra: Inte tillräckligt dominant för primärt self-service-push.
 */
export function MinaSidorStrip() {
  return (
    <Annotation
      label="Mina sidor — kompakt strip"
      audience="design"
      rationale="En rad. Ikon + en mening om värde + CTA. Används tillsammans med en mer prominent Mina sidor-block tidigare på sidan, eller som återupprepning i footer."
    >
      <section className="rounded-md bg-tint-info p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Icon name="person" size={28} className="text-brand-primary" />
        <div className="flex-1">
          <p className="font-medium">De flesta ärenden löser du snabbast själv på Mina sidor.</p>
          <p className="text-sm text-ink-secondary">Ingen kötid · fungerar dygnet runt</p>
        </div>
        <a
          href="#"
          className="inline-flex items-center gap-1.5 bg-brand-primary text-ink-onbrand font-medium px-5 py-2.5 rounded hover:opacity-90 whitespace-nowrap"
        >
          Logga in
          <Icon name="arrow_forward" size={16} />
        </a>
      </section>
    </Annotation>
  );
}
