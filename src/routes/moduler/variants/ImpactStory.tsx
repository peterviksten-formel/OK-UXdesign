import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT B, Story-narrative
 *
 * Text-tung layout med siffror integrerade inline. Kompakt men
 * sammanhängande. Bygger trovärdighet genom kontext.
 *
 * Pro: Ger siffrorna kontext. Bygger trovärdighet genom berättelse.
 * Kontra: Kräver redaktionell copy. Tar mer läs-tid.
 */
export function ImpactStory() {
  return (
    <Annotation
      label="Hållbarhets-block, story-narrative"
      audience="redaktör"
      rationale="Prosa med siffror som highlights. Siffrorna står ut typografiskt (bold, större) men läses i sammanhang. Visar att Öresundskraft inte bara listar mål, vi berättar varför och hur."
    >
      <section className="rounded-lg bg-tint-info p-6 sm:p-10">
        <div className="max-w-reading">
          <p className="uppercase text-xs font-bold tracking-wider text-brand-accent mb-3">
            Tillsammans för 17
          </p>
          <h2 className="text-h2 leading-tight mb-4">
            Vår del av de globala målen
          </h2>
          <div className="prose prose-sm max-w-none text-ink-secondary leading-relaxed space-y-4">
            <p>
              Sedan 2024 levererar vi <strong className="text-brand-primary text-lg">100% fossilfri el</strong>{" "}
              till alla våra avtalskunder. Det är första steget, men inte det sista.
            </p>
            <p>
              Genom <strong>Innozhero-projektet</strong> i Helsingborg ska vi fånga in{" "}
              <strong className="text-brand-primary text-lg">200 000 ton CO₂ per år</strong> från och
              med 2030. Tekniken finns. Vi bygger den nu.
            </p>
            <p>
              Och våra <strong className="text-brand-primary text-lg">17 timmar</strong> volontärarbete
              per anställd och år, det kallar vi "17-satsningen" efter FN:s globala mål. Förra året
              hjälpte vi till att finansiera <strong>3 nya laddstationer</strong> i staden genom
              Framtidspengen.
            </p>
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-brand-accent font-medium mt-5 hover:underline"
          >
            Läs hela vår hållbarhetsrapport
            <Icon name="arrow_forward" size={16} />
          </a>
        </div>
      </section>
    </Annotation>
  );
}
