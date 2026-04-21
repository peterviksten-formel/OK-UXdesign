import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT B — Stor hero-citat
 *
 * Ett stort citat dominerar. Visuellt djärvt. Fungerar för en utvald
 * story eller på en kampanjsida där ett påstående ska sitta kvar.
 *
 * Pro: Hög impact. Känns intentionell — inte "mer av samma".
 * Kontra: Ett citat är känsligt — måste vara starkt. Risk för staged-känsla.
 */
export function KundcaseHero() {
  return (
    <Annotation
      label="Kundcase Hero-citat"
      audience="design"
      rationale="Ett citat, stor typografi, lugnt bakgrundstryck. Namn + roll + koppling till produkt/tjänst (så läsaren vet om hen själv är i den gruppen). Max 25 ord i själva citatet."
    >
      <section className="rounded-lg bg-tint-info py-12 sm:py-16 px-6 sm:px-10">
        <div className="max-w-reading mx-auto text-center">
          <Icon name="format_quote" size={40} className="text-brand-accent mx-auto mb-4" />
          <blockquote className="text-h2 text-brand-primary leading-tight mb-6 italic">
            "Vi fick ner elkostnaden med 30% första året efter solcellerna. Öresundskraft
            skötte hela installationen — vi behövde inte tänka."
          </blockquote>
          <figcaption className="text-sm">
            <p className="font-medium text-brand-primary">Anders L., villaägare i Helsingborg</p>
            <p className="text-ink-muted mt-1">Kund sedan 2019 · Solceller + laddbox</p>
          </figcaption>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm text-brand-accent font-medium mt-6 hover:underline"
          >
            Läs hela kundcaset
            <Icon name="arrow_forward" size={16} />
          </a>
        </div>
      </section>
    </Annotation>
  );
}
