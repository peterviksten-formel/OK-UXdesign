import { Annotation } from "../../../components/Annotation";
import { KATEGORIER } from "../kundservice-data";

/**
 * VARIANT A — Trygg
 *
 * Strategy: structured link list with icons. Zero interaction — pure nav.
 * Every category is an accordion section. Every item is a link. Nothing
 * is conditional. The user scans, clicks, leaves. Closest to a traditional
 * help centre / FAQ hub. Lowest development cost, lowest risk.
 */
export function KundserviceTrygg() {
  return (
    <div>
      <Annotation
        label="Inledande text"
        audience="user"
        rationale="En lugn mening som sätter förväntningen: du är på rätt ställe, vi listar alternativen, du väljer själv."
      >
        <div className="mb-8 max-w-reading">
          <p className="text-lede text-ink-secondary leading-relaxed">
            Välj det ämne som bäst beskriver din fråga. Du kan också{" "}
            <a href="#" className="text-brand-accent underline underline-offset-2">söka bland vanliga frågor</a>{" "}
            eller{" "}
            <a href="#" className="text-brand-accent underline underline-offset-2">logga in på Mina sidor</a>.
          </p>
        </div>
      </Annotation>

      <Annotation
        label="Kategorilista"
        audience="design"
        rationale="Alla 6 kategorier synliga direkt, inga steg. Varje kategori expanderas med <details>/<summary> — native HTML, inget JS, fungerar utan JavaScript. Lägsta möjliga komplexitet."
      >
        <div className="space-y-3 max-w-reading">
          {KATEGORIER.map((k) => (
            <details
              key={k.id}
              className="group border border-border-subtle rounded-md bg-surface"
            >
              <summary className="px-5 py-4 cursor-pointer list-none flex items-center gap-3 hover:bg-tint-info focus-visible:ring-2 focus-visible:ring-focus rounded-md">
                <span className="text-xl" aria-hidden="true">{k.ikon}</span>
                <div className="flex-1">
                  <span className="font-medium block">{k.label}</span>
                  <span className="text-sm text-ink-muted">{k.beskrivning}</span>
                </div>
                <span className="text-ink-muted group-open:rotate-180 transition-transform text-sm">▼</span>
              </summary>
              <div className="px-5 pb-4 border-t border-border-subtle">
                <ul className="divide-y divide-border-subtle">
                  {k.underkategorier.map((u) => (
                    <li key={u.id} className="py-3">
                      <a
                        href={u.action.type === "link" ? u.action.href : "#"}
                        className="flex items-start gap-3 group/link hover:text-brand-accent"
                      >
                        <span className="text-xs mt-1 text-ink-muted">→</span>
                        <div>
                          <span className="font-medium block group-hover/link:underline">{u.label}</span>
                          <span className="text-sm text-ink-secondary block">{u.action.description}</span>
                          {u.action.type === "kontakt" && u.action.tid && (
                            <span className="text-xs text-ink-muted mt-1 block">{u.action.tid}</span>
                          )}
                          {u.action.type === "mina-sidor" && (
                            <span className="text-xs text-brand-accent mt-1 block">→ Mina sidor</span>
                          )}
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          ))}
        </div>
      </Annotation>

      <Annotation
        label="Kontakt-fallback"
        audience="user"
        rationale="Sist: kontaktuppgifter i klartext. Aldrig gömd. Telefonnummer, öppettider, chattlänk. Den som inte hittade sitt svar ska aldrig behöva leta efter 'Kontakta oss'."
      >
        <aside className="mt-8 p-5 border border-border-strong rounded-md max-w-reading">
          <h3 className="text-h5 font-medium mb-2">Hittade du inte svaret?</h3>
          <div className="text-sm text-ink-secondary space-y-2">
            <p>📞 Ring oss: <strong>[08-455 44 00]</strong> · Vardagar 08–17</p>
            <p>💬 <a href="#" className="text-brand-accent underline underline-offset-2">Chatta med oss</a> · Vardagar 08–17 · Svarstid ~2 min</p>
            <p>✉️ <a href="#" className="text-brand-accent underline underline-offset-2">Skicka e-post</a> · Svar inom 1 arbetsdag</p>
          </div>
        </aside>
      </Annotation>
    </div>
  );
}
