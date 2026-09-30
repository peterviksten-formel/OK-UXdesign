import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT A, Toppbanner
 *
 * Smal rad överst på alla sidor, ovanför sidhuvudet. Visas bara när något
 * avviker från det normala. När allt fungerar är den dold.
 *
 * Fördel: Syns för alla vid kris, stör inte när allt är som vanligt.
 * Nackdel: Tar plats och trycker ner innehållet. Måste gå att stänga.
 */
export function DriftTopbar() {
  return (
    <Annotation
      label="Toppbanner för driftstatus"
      audience="design"
      rationale="Smal rad överst på alla sidor som bara visas vid störning. Röd vid avbrott, gul vid lång kötid. Besökaren får veta om problemet direkt, oavsett vilken sida hen landar på."
    >
      <div className="space-y-2">
        <Annotation
          label="Röd banner vid avbrott"
          audience="user"
          rationale="Säger vad som hänt, var, hur många som berörs och när det väntas vara klart. Skärmläsare läser upp meddelandet automatiskt. Stängknappen ligger synligt på samma rad."
        >
          <div
            role="status"
            aria-live="polite"
            className="w-full bg-brand-highlight text-white px-4 py-2 text-sm flex items-center gap-3"
          >
            <Icon name="bolt" size={18} filled />
            <Copy
              label="Avbrottsmeddelande"
              category="metadata"
              text="Pågående avbrott i centrala Helsingborg (340 kunder). Beräknad klar 12:00."
              rationale="Fast ordning: vad, var, hur många, när klart. Besökaren kan avgöra på en sekund om det gäller hen. Undvik vaga ord som 'störningar i området' utan plats och tid."
            >
              <span className="flex-1">
                <strong>Pågående avbrott</strong> i centrala Helsingborg (340 kunder). Beräknad klar 12:00.
              </span>
            </Copy>
            <Copy
              label="Länk till avbrottsinformation"
              category="cta"
              text="Se status"
              rationale="Kort nog för en smal rad och säger vad man får: den fullständiga statusen. Längre formuleringar får inte plats på mobil, därför döljs länken på små skärmar."
            >
              <a
                href="#"
                className="hidden sm:inline-flex items-center gap-1 underline underline-offset-2 font-medium hover:opacity-80"
              >
                Se status
                <Icon name="arrow_forward" size={14} />
              </a>
            </Copy>
            <button
              type="button"
              className="text-white/80 hover:text-white p-1"
              aria-label="Stäng avisering"
            >
              <Icon name="close" size={16} />
            </button>
          </div>
        </Annotation>
        <p className="text-xs text-ink-muted italic px-1">
          Bannern finns i tre lägen: röd vid avbrott, gul vid lång kötid och dold när allt fungerar som vanligt.
        </p>
        {/* Gul banner vid lång kötid */}
        <Annotation
          label="Gul banner vid lång kötid"
          audience="redaktör"
          rationale="Använd gul när det inte är ett avbrott men kundservice har ovanligt lång kö. Skriv alltid ett alternativ som hjälper besökaren vidare, till exempel Mina sidor. Ta bort bannern när kön är normal igen."
        >
          <div
            role="status"
            className="w-full bg-tint-notice text-brand-primary px-4 py-2 text-sm flex items-center gap-3 border-y border-yellow-500/40"
          >
            <Icon name="schedule" size={18} />
            <Copy
              label="Meddelande om lång kötid"
              category="reassurance"
              text="Längre kötid till kundservice just nu. Många ärenden går att lösa via Mina sidor."
              rationale="Erkänner problemet och ger direkt en väg förbi kön. 'Just nu' visar att läget är tillfälligt. Undvik ursäkter som 'Vi ber om överseende', de hjälper inte besökaren vidare."
            >
              <span className="flex-1">
                <strong>Längre kötid till kundservice just nu.</strong> Många ärenden går att lösa via{" "}
                <a href="#" className="underline underline-offset-2 font-medium">Mina sidor</a>.
              </span>
            </Copy>
            <button type="button" className="text-ink-muted hover:text-ink p-1" aria-label="Stäng">
              <Icon name="close" size={16} />
            </button>
          </div>
        </Annotation>
      </div>
    </Annotation>
  );
}
