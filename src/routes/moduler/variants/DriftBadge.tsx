import { useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";

/**
 * VARIANT C, Badge + drawer
 *
 * Liten status-badge i header. Klick öppnar en drawer med detaljer.
 * Minimalt påträngande, men kräver att användaren upptäcker badgen.
 *
 * Pro: Tar minimalt utrymme. Diskret men tillgänglig.
 * Kontra: Lätt att missa. Användaren måste klicka för att få info.
 */
export function DriftBadge() {
  const [open, setOpen] = useState(false);
  return (
    <Annotation
      label="Driftstatus, badge + drawer"
      audience="design"
      rationale="Badge i header eller utility-rad. Klick → drawer eller popover med fullständig info. Bra för sidor där status är sekundär. Badge-färg signalerar status även om användaren inte klickar."
    >
      <div className="space-y-4">
        <div className="flex items-center justify-end gap-3 bg-surface border border-border-subtle rounded-md px-4 py-2">
          <span className="text-xs text-ink-muted">Simulerar sidans header/utility-rad →</span>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex items-center gap-2 text-xs bg-brand-highlight text-white px-3 py-1.5 rounded-full hover:opacity-90"
            aria-expanded={open}
          >
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            Pågående avbrott
          </button>
        </div>

        {open && (
          <aside
            role="region"
            aria-label="Driftstatus-detaljer"
            className="rounded-md border-2 border-brand-highlight bg-surface shadow-lg p-5"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2">
                <Icon name="bolt" size={20} className="text-brand-highlight" filled />
                <h3 className="font-medium">Driftstatus just nu</h3>
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
            <a
              href="#"
              className="inline-flex items-center gap-1 text-sm text-brand-accent font-medium mt-4 hover:underline"
            >
              Till avbrottsinformation
              <Icon name="arrow_forward" size={14} />
            </a>
          </aside>
        )}
      </div>
    </Annotation>
  );
}
