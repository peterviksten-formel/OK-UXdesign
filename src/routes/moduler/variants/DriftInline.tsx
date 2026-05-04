import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT B, Inline-sektion
 *
 * Full-bredd banner inne i sidans flöde. Läses som en del av sidan,
 * inte som en systemavisering. Bra för sidor där status är en naturlig
 * del av innehållet.
 *
 * Pro: Tydlig, lugn, del av läsupplevelsen.
 * Kontra: Kan missas om användaren scrollat förbi. Inte global.
 */
export function DriftInline() {
  return (
    <Annotation
      label="Driftstatus, inline-sektion"
      audience="design"
      rationale="Placeras inne i sidan, typ överst på avbrotts- eller kundservice-sidan. Ingen stänga-knapp, det är innehåll. Ikon + färg signalerar status-nivå. Kort intro + CTA till detaljer."
    >
      <div className="space-y-3">
        {/* Normal */}
        <section className="rounded-md bg-tint-info border-l-4 border-brand-accent p-4 flex items-center gap-3 text-sm">
          <Icon name="check_circle" size={24} className="text-brand-accent shrink-0" />
          <span>
            <strong>Allt normalt.</strong> Inga kända avbrott. Kort kötid i chatt och telefon.
          </span>
        </section>
        {/* Längre kötid */}
        <section className="rounded-md bg-tint-notice border-l-4 border-yellow-500 p-4 flex items-center gap-3 text-sm">
          <Icon name="schedule" size={24} className="text-yellow-600 shrink-0" />
          <span className="flex-1">
            <strong>Längre kötider just nu.</strong> Försök gärna{" "}
            <a href="#" className="text-brand-primary font-medium underline">Mina sidor</a>,            många ärenden går att lösa där på 1 minut.
          </span>
        </section>
        {/* Avbrott */}
        <section className="rounded-md bg-tint-highlight border-l-4 border-brand-highlight p-4 flex items-center gap-3 text-sm">
          <Icon name="bolt" size={24} className="text-brand-highlight shrink-0" filled />
          <span className="flex-1">
            <strong>Pågående avbrott</strong> i centrala Helsingborg. 340 kunder berörs. Beräknad
            klar 12:00.
          </span>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 bg-brand-primary text-white font-medium text-xs px-3 py-1.5 rounded hover:opacity-90 whitespace-nowrap"
          >
            Se detaljer
            <Icon name="arrow_forward" size={14} />
          </a>
        </section>
      </div>
    </Annotation>
  );
}
