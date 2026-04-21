import { useState } from "react";
import { Annotation } from "../../../components/Annotation";
import { Icon } from "../../../components/Icon";
import { KATEGORIER, type KategoriId, type Underkategori } from "../kundservice-data";

/**
 * VARIANT B — Progressiv
 *
 * Strategy: two-step triage. Step 1: pick your category (icon cards).
 * Step 2: pick your specific question (reveal answers inline).
 * The page never reloads, never scrolls to a new page, never opens a
 * modal. Everything resolves inline. "Kontakta oss" only appears when
 * no self-serve path exists.
 */
export function KundserviceProgressiv() {
  const [activeKategori, setActiveKategori] = useState<KategoriId | null>(null);
  const [activeUnder, setActiveUnder] = useState<string | null>(null);
  const kategori = activeKategori ? KATEGORIER.find((k) => k.id === activeKategori) : null;

  return (
    <div>
      {/* ─── Steg 1: Kategori-väljare ───────────────────────────────── */}
      <Annotation
        label="Kategori-kort"
        audience="user"
        rationale="Sex klickbara kort i ett grid. Varje kort = en intention, inte en produktkategori. Användaren identifierar sig med ett problem, inte med organisationsstrukturen."
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
          {KATEGORIER.map((k) => {
            const isActive = k.id === activeKategori;
            return (
              <button
                key={k.id}
                type="button"
                onClick={() => {
                  setActiveKategori(isActive ? null : k.id);
                  setActiveUnder(null);
                }}
                className={`p-4 rounded-md border-2 text-left transition-all ${
                  isActive
                    ? "border-brand-accent bg-tint-info shadow-sm"
                    : "border-border-subtle bg-surface hover:border-brand-accent hover:shadow-sm"
                }`}
                aria-pressed={isActive}
              >
                <Icon name={k.ikon} size={28} className="text-brand-accent mb-2 block" />
                <span className="font-medium block text-sm">{k.label}</span>
                <span className="text-xs text-ink-muted block mt-0.5 leading-snug">{k.beskrivning}</span>
              </button>
            );
          })}
        </div>
      </Annotation>

      {/* ─── Steg 2: Underkategorier ─────────────────────────────────── */}
      {kategori && (
        <Annotation
          label="Underkategori-lista"
          audience="design"
          rationale="Steg 2 visas inline under korten — ingen ny sida. Varje underkategori expanderar till ett svar med CTA. Svaret löser frågan eller pekar mot en destination."
        >
          <div className="rounded-md border border-brand-accent bg-surface overflow-hidden mb-8">
            <header className="px-5 py-3 bg-tint-info flex items-center gap-3">
              <Icon name={kategori.ikon} size={22} className="text-brand-accent" />
              <div>
                <h3 className="font-medium">{kategori.label}</h3>
                <p className="text-xs text-ink-muted">Välj det som bäst beskriver din fråga</p>
              </div>
              <button
                type="button"
                onClick={() => { setActiveKategori(null); setActiveUnder(null); }}
                className="ml-auto text-ink-muted hover:text-ink p-1"
                aria-label="Stäng och välj annan kategori"
              >
                <Icon name="close" size={18} />
              </button>
            </header>
            <ul className="divide-y divide-border-subtle">
              {kategori.underkategorier.map((u) => (
                <UnderItem
                  key={u.id}
                  item={u}
                  isOpen={activeUnder === u.id}
                  onToggle={() => setActiveUnder(activeUnder === u.id ? null : u.id)}
                />
              ))}
            </ul>
          </div>
        </Annotation>
      )}

      {/* ─── Alltid synlig kontaktrad ────────────────────────────────── */}
      <Annotation
        label="Kontakt-fallback"
        audience="user"
        rationale="Ligger kvar oavsett steg. Aldrig gömd. 'Kontakta oss' som sista utväg, inte som standard."
      >
        <div className="flex flex-wrap gap-3 text-sm">
          <a href="#" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-border-subtle hover:border-brand-accent hover:bg-tint-info transition-colors">
            <Icon name="chat_bubble" size={16} className="text-brand-accent" />
            <span>Chatta · Vardagar 08–17</span>
          </a>
          <a href="#" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-border-subtle hover:border-brand-accent hover:bg-tint-info transition-colors">
            <Icon name="call" size={16} className="text-brand-accent" />
            <span>Ring · [08-455 44 00]</span>
          </a>
          <a href="#" className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-border-subtle hover:border-brand-accent hover:bg-tint-info transition-colors">
            <Icon name="mail" size={16} className="text-brand-accent" />
            <span>E-post · Svar inom 1 arbetsdag</span>
          </a>
        </div>
      </Annotation>
    </div>
  );
}

function UnderItem({ item, isOpen, onToggle }: { item: Underkategori; isOpen: boolean; onToggle: () => void }) {
  const a = item.action;

  const actionBadge =
    a.type === "mina-sidor" ? "Mina sidor" :
    a.type === "kontakt" ? (a.kanal === "chatt" ? "Chatt" : a.kanal === "telefon" ? "Ring" : "E-post") :
    a.type === "link" ? "Guide" :
    "Info";

  const badgeColor =
    a.type === "mina-sidor" ? "bg-tint-notice text-brand-primary" :
    a.type === "kontakt" ? "bg-tint-highlight text-brand-primary" :
    "bg-tint-info text-brand-primary";

  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        className="w-full px-5 py-3 flex items-center gap-3 hover:bg-tint-info transition-colors text-left"
        aria-expanded={isOpen}
      >
        <span className="flex-1 font-medium text-sm">{item.label}</span>
        <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded ${badgeColor}`}>
          {actionBadge}
        </span>
        <Icon name="expand_more" size={18} className={`text-ink-muted transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="px-5 pb-4 flex flex-col sm:flex-row items-start gap-4">
          <div className="flex-1">
            <p className="text-sm text-ink-secondary leading-relaxed">{a.description}</p>
            {a.type === "kontakt" && a.tid && (
              <p className="text-xs text-ink-muted mt-1">{a.tid}</p>
            )}
          </div>
          <a
            href={a.type === "link" ? a.href : "#"}
            className="inline-flex items-center gap-2 bg-brand-primary text-ink-onbrand text-sm font-medium px-4 py-2.5 rounded hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            {a.type === "link" || a.type === "info" ? a.label : a.label}
            <Icon name="arrow_forward" size={16} />
          </a>
        </div>
      )}
    </li>
  );
}
