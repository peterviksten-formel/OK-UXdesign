import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT A, Global topbar
 *
 * Smal rad ovanför header. Visas endast vid störning (status ≠ normal).
 * Försvinner helt när allt är ok, dold av default.
 *
 * Pro: Hög synlighet vid kris. Opåträngande när inget är fel.
 * Kontra: Tar vertikal yta, flyttar ner innehållet. Behöver stänga-knapp.
 */
export function DriftTopbar() {
  return (
    <Annotation
      label="Driftstatus, global topbar"
      audience="user"
      rationale="Sticky rad över hela sidan. Röd vid avbrott, gul vid längre kötid. Aria-live så screen readers meddelar. Stänga-knapp på samma rad, inte gömd."
    >
      <div className="space-y-2">
        <div
          role="status"
          aria-live="polite"
          className="w-full bg-brand-highlight text-white px-4 py-2 text-sm flex items-center gap-3"
        >
          <Icon name="bolt" size={18} filled />
          <span className="flex-1">
            <strong>Pågående avbrott</strong> i centrala Helsingborg (340 kunder). Beräknad klar 12:00.
          </span>
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-1 underline underline-offset-2 font-medium hover:opacity-80"
          >
            Se status
            <Icon name="arrow_forward" size={14} />
          </a>
          <button
            type="button"
            className="text-white/80 hover:text-white p-1"
            aria-label="Stäng avisering"
          >
            <Icon name="close" size={16} />
          </button>
        </div>
        <p className="text-xs text-ink-muted italic px-1">
          Tre varianter av bannern. Vid kris-läge (avbrott) används röd, vid längre kötid gul, vid normalt är den dold.
        </p>
        {/* Yellow example */}
        <div
          role="status"
          className="w-full bg-tint-notice text-brand-primary px-4 py-2 text-sm flex items-center gap-3 border-y border-yellow-500/40"
        >
          <Icon name="schedule" size={18} />
          <span className="flex-1">
            <strong>Längre kötid till kundservice just nu.</strong> Många ärenden går att lösa via{" "}
            <a href="#" className="underline underline-offset-2 font-medium">Mina sidor</a>.
          </span>
          <button type="button" className="text-ink-muted hover:text-ink p-1" aria-label="Stäng">
            <Icon name="close" size={16} />
          </button>
        </div>
      </div>
    </Annotation>
  );
}
