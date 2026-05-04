import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT C, Status-first
 *
 * Strategy: Sidan svarar på användarens fråga direkt i H1, en dynamisk
 * rubrik baserad på aktuell data. Används på Avbrottsinformation,
 * Kundservice-hub, live-status. Binärt svar, ingen gissning.
 *
 * Pro: Respekterar användarens tid. Hög perceived utility.
 * Kontra: Kräver data-backend. Fungerar inte för sidor utan live-status.
 */
export function HeroStatus({ pagaende = 2 }: { pagaende?: number }) {
  const harPagaende = pagaende > 0;
  return (
    <Annotation
      label="Status-first hero"
      audience="user"
      rationale="H1 är ett direktsvar. Ingen 'Välkommen' eller marknadsspråk, användaren ser svar på den fråga de hade när de klickade. Färgsignal binär: röd vid pågående, grön vid normalt. Respekterar användarens fem sekunder."
    >
      <section
        className={`rounded-lg p-6 sm:p-10 ${
          harPagaende
            ? "bg-tint-highlight border border-brand-highlight"
            : "bg-tint-info border border-brand-accent/40"
        }`}
        aria-live="polite"
      >
        <div className="flex items-start gap-4">
          <div
            className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
              harPagaende ? "bg-brand-highlight" : "bg-brand-accent"
            }`}
          >
            <Icon
              name={harPagaende ? "bolt" : "check"}
              size={28}
              className="text-white"
              filled={harPagaende}
            />
          </div>
          <div className="flex-1">
            <h1 className="text-h1 leading-tight mb-2">
              {harPagaende
                ? `${pagaende} pågående avbrott just nu`
                : "Allt fungerar just nu"}
            </h1>
            <p className="text-lede text-ink-secondary mb-6 max-w-reading">
              {harPagaende
                ? "Vi jobbar på att få igång strömmen. Se status och tidslinje nedan."
                : "Inga kända avbrott i vårt nät. Se kommande planerade arbeten nedan."}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:0424903200"
                className="inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand font-medium px-5 py-3 rounded hover:opacity-90 transition-opacity"
              >
                <Icon name="call" size={18} />
                Felanmälan 042-490 32 00
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 border border-border-strong text-ink-secondary font-medium px-5 py-3 rounded hover:bg-surface transition-colors"
              >
                <Icon name="sms" size={18} />
                SMS-avisering
              </a>
            </div>
          </div>
        </div>
      </section>
    </Annotation>
  );
}
