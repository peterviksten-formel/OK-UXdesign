import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT B — Story-block
 *
 * Berättande. Text + liten bild sida vid sida. Fokus ligger på innehåll,
 * inte på CTA. Används för hållbarhets- och backstory-kampanjer.
 *
 * Pro: Bygger trovärdighet. Passar komplext budskap.
 * Kontra: Lägre klickfrekvens. Kräver längre copy.
 */
export function KampanjStory() {
  return (
    <Annotation
      label="Kampanj Story-block"
      audience="design"
      rationale="Text-tung layout. Bild som stöd, inte huvudfokus. CTA är diskret — primärt för läsare som är intresserade av djupet, inte för snabb konvertering. Bra för backstory, partnerskap, hållbarhetsrapporter."
    >
      <section className="rounded-lg border border-border-subtle bg-surface overflow-hidden">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="bg-tint-info aspect-[4/3] md:aspect-auto flex items-center justify-center text-ink-muted">
            <Icon name="image" size={64} />
          </div>
          <div className="p-6 sm:p-8">
            <p className="uppercase text-xs font-bold tracking-wider text-brand-accent mb-2">
              Hållbarhet · Klimat
            </p>
            <h2 className="text-h2 leading-tight mb-3">
              Därför ska vi fånga in koldioxid i Helsingborg
            </h2>
            <p className="text-ink-secondary leading-relaxed mb-4">
              Innozhero-projektet siktar på att göra Helsingborg klimatneutralt till 2030
              genom att fånga in 200 000 ton koldioxid per år. Vi berättar hur tekniken
              fungerar, vad den kostar, och varför Öresundskraft är en partner i projektet.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-brand-accent font-medium hover:underline"
            >
              Läs hela berättelsen
              <Icon name="arrow_forward" size={16} />
            </a>
          </div>
        </div>
      </section>
    </Annotation>
  );
}
