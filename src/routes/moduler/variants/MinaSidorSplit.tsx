import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT B — Split-kort (Mina sidor + App)
 *
 * Två kort: Mina sidor på vänster, appen på höger. För användare som
 * vill ha val mellan webb och mobil.
 *
 * Pro: Ger användaren val. Lyfter appen som första-klass-alternativ.
 * Kontra: Delar uppmärksamheten mellan två ingångar.
 */
export function MinaSidorSplit() {
  return (
    <Annotation
      label="Mina sidor + App — split-kort"
      audience="design"
      rationale="Två likvärdiga kort. Webben till vänster, appen till höger. Varje kort har egen CTA och liten lista över vad man kan göra där. Fungerar när både kanaler är lika viktiga."
    >
      <section className="grid md:grid-cols-2 gap-4">
        {/* Mina sidor */}
        <div className="rounded-lg border-2 border-brand-primary bg-surface p-5 sm:p-6 flex flex-col">
          <Icon name="computer" size={28} className="text-brand-primary mb-3" />
          <h3 className="text-h4 font-medium mb-1">Mina sidor</h3>
          <p className="text-sm text-ink-secondary mb-4">
            Full översikt — fakturor, avtal, förbrukning, inställningar.
          </p>
          <ul className="space-y-1 text-xs text-ink-muted mb-5">
            <li className="flex items-center gap-1.5"><Icon name="check" size={12} /> Fakturahistorik</li>
            <li className="flex items-center gap-1.5"><Icon name="check" size={12} /> Byt avtal</li>
            <li className="flex items-center gap-1.5"><Icon name="check" size={12} /> Rapportera mätarställning</li>
          </ul>
          <a
            href="#"
            className="mt-auto inline-flex items-center justify-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-4 py-2.5 rounded hover:opacity-90"
          >
            Logga in
            <Icon name="arrow_forward" size={16} />
          </a>
        </div>

        {/* Appen */}
        <div className="rounded-lg border border-border-subtle bg-surface p-5 sm:p-6 flex flex-col">
          <Icon name="smartphone" size={28} className="text-brand-accent mb-3" />
          <h3 className="text-h4 font-medium mb-1">Mitt Öresundskraft — appen</h3>
          <p className="text-sm text-ink-secondary mb-4">
            För koll på förbrukningen dygnet runt.
          </p>
          <ul className="space-y-1 text-xs text-ink-muted mb-5">
            <li className="flex items-center gap-1.5"><Icon name="check" size={12} /> Realtidsförbrukning</li>
            <li className="flex items-center gap-1.5"><Icon name="check" size={12} /> SMS-avisering vid avbrott</li>
            <li className="flex items-center gap-1.5"><Icon name="check" size={12} /> Fingeravtrycks-login</li>
          </ul>
          <div className="mt-auto flex gap-2">
            <a
              href="#"
              className="flex-1 inline-flex items-center justify-center gap-1.5 border border-border-strong text-ink-secondary font-medium px-3 py-2.5 rounded hover:bg-tint-info text-sm"
            >
              App Store
            </a>
            <a
              href="#"
              className="flex-1 inline-flex items-center justify-center gap-1.5 border border-border-strong text-ink-secondary font-medium px-3 py-2.5 rounded hover:bg-tint-info text-sm"
            >
              Google Play
            </a>
          </div>
        </div>
      </section>
    </Annotation>
  );
}
