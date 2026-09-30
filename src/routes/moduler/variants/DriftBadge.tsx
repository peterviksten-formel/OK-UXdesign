import { useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { Copy } from "../../../components/Copy";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT C, Statusmärke med utfällbar panel
 *
 * Litet statusmärke i sidhuvudet. Ett klick fäller ut en panel med
 * detaljerna. Stör minimalt, men besökaren måste själv upptäcka märket.
 *
 * Fördel: Tar nästan ingen plats. Diskret men alltid nära till hands.
 * Nackdel: Lätt att missa. Besökaren måste klicka för att få veta mer.
 */
export function DriftBadge() {
  const [open, setOpen] = useState(false);
  return (
    <Annotation
      label="Statusmärke med utfällbar panel"
      audience="design"
      rationale="Litet märke i sidhuvudet som öppnar en panel med detaljer. Passar när status är bra att ha nära till hands men inte är sidans huvudsak. Märkets färg visar läget även för den som aldrig klickar."
    >
      <div className="space-y-4">
        <Annotation
          label="Statusmärke i sidhuvudet"
          audience="user"
          rationale="Den pulserande punkten och den röda färgen fångar blicken utan att ta över sidan. Texten säger vad som pågår, så besökaren vet om det är värt att klicka."
        >
          <div className="flex items-center justify-end gap-3 bg-surface border border-border-subtle rounded-md px-4 py-2">
            <span className="text-xs text-ink-muted">Exempel på sidhuvud →</span>
            <Copy
              label="Märkestext"
              category="metadata"
              text="Pågående avbrott"
              rationale="Två ord som får plats i sidhuvudet och ändå säger vad det gäller. Undvik 'Driftinfo' eller 'Status', de säger inte om något faktiskt är fel."
            >
              <button
                type="button"
                onClick={() => setOpen(!open)}
                className="inline-flex items-center gap-2 text-xs bg-brand-highlight text-white px-3 py-1.5 rounded-full hover:opacity-90"
                aria-expanded={open}
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                Pågående avbrott
              </button>
            </Copy>
          </div>
        </Annotation>

        {open && (
          <Annotation
            label="Utfällbar panel med detaljer"
            audience="redaktör"
            rationale="Lista ett avbrott per rad: område i fetstil, sedan vad som berörs och beräknad klartid. Ta bort raden när avbrottet är åtgärdat. Länken leder alltid till avbrottssidan."
          >
            <aside
              role="region"
              aria-label="Driftstatus, detaljer"
              className="rounded-md border-2 border-brand-highlight bg-surface shadow-lg p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <Icon name="bolt" size={20} className="text-brand-highlight" filled />
                  <Copy
                    label="Panelrubrik"
                    category="rubrik"
                    text="Driftstatus just nu"
                    rationale="'Just nu' visar att informationen är aktuell. Samma ord som på avbrottssidan, så besökaren känner igen sig."
                  >
                    <h3 className="font-medium">Driftstatus just nu</h3>
                  </Copy>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-ink-muted hover:text-ink p-1"
                  aria-label="Stäng"
                >
                  <Icon name="close" size={18} />
                </button>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full mt-1.5 bg-brand-highlight animate-pulse" />
                  <span>
                    <strong>Centrala Helsingborg</strong>, 340 kunder, beräknad klar 12:00
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 rounded-full mt-1.5 bg-brand-highlight animate-pulse" />
                  <span>
                    <strong>Stattena/Drottninghög</strong>, fjärrvärme, beräknad klar 14:00
                  </span>
                </li>
              </ul>
              <Copy
                label="Länk till avbrottssidan"
                category="cta"
                text="Se alla avbrott"
                rationale="Verb och objekt som säger vad som väntar: en fullständig lista. 'Till avbrottsinformation' beskriver bara en riktning, inte vad man får."
              >
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm text-brand-accent font-medium mt-4 hover:underline"
                >
                  Se alla avbrott
                  <Icon name="arrow_forward" size={14} />
                </a>
              </Copy>
            </aside>
          </Annotation>
        )}
      </div>
    </Annotation>
  );
}
