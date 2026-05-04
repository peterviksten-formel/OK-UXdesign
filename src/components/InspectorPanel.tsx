import { useEffect, useRef, useState } from "react";
import { useAnnotations } from "../lib/AnnotationContext";
import { useEditorialGuide, type CopyCategory } from "../lib/EditorialGuideContext";
import { useEditMode } from "../lib/EditModeContext";
import { useInspector, type InspectorTab } from "../lib/InspectorContext";
import { Icon } from "./Icon";

/**
 * Inspector-panel (höger kolumn) som samlar tre vyer bakom tabs:
 *   1. UX-guide    ,  designanteckningar per sida
 *   2. Copy-guide  ,  copy-rationaler + sidtyp-brief
 *   3. Redigera    ,  preset + reset + status för aktiv sida
 *
 * Panelen visas när minst ett av de tre lägena är aktivt (flaggorna
 * kontrolleras fortfarande via respektive toggle i headern).
 */
export function InspectorPanel() {
  const { enabled: uxOn, list: uxList, focus: focusUx, focused: focusedUx } = useAnnotations();
  const { enabled: copyOn, list: copyList, brief, focus: focusCopy, focused: focusedCopy } = useEditorialGuide();
  const editMode = useEditMode();
  const { activeTab, setActiveTab, panelOpen, setPanelOpen } = useInspector();

  const anyEnabled = uxOn || copyOn || editMode.enabled;

  // Om aktiv tab hör till ett avstängt läge ,  hoppa till första aktiva.
  useEffect(() => {
    if (!anyEnabled) return;
    const tabEnabled: Record<InspectorTab, boolean> = {
      ux: uxOn,
      copy: copyOn,
      edit: editMode.enabled,
    };
    if (!tabEnabled[activeTab]) {
      const next = (["ux", "copy", "edit"] as InspectorTab[]).find((t) => tabEnabled[t]);
      if (next) setActiveTab(next);
    }
  }, [anyEnabled, uxOn, copyOn, editMode.enabled, activeTab, setActiveTab]);

  if (!anyEnabled) return null;

  const tabs: { id: InspectorTab; label: string; count: number; enabled: boolean }[] = [
    { id: "ux", label: "Design", count: uxList.length, enabled: uxOn },
    { id: "copy", label: "Copy", count: copyList.length, enabled: copyOn },
    { id: "edit", label: "Redigera", count: 0, enabled: editMode.enabled },
  ];

  return (
    <>
      {/* Återöppna-flik när panelen är stängd men minst ett läge är på */}
      {!panelOpen && (
        <button
          type="button"
          onClick={() => setPanelOpen(true)}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 px-3 py-2 rounded-l bg-brand-primary text-white text-xs font-medium shadow-lg hover:opacity-90"
          aria-label="Öppna inspector-panel"
        >
          UX-guide →
        </button>
      )}

      <aside
        className={`fixed top-0 right-0 z-40 h-full w-full sm:w-[380px] bg-elevated border-l border-border-subtle shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="UX-guide"
      >
        <header className="px-4 py-3 border-b border-border-subtle flex items-center justify-between shrink-0">
          <h2 className="text-h5 font-medium">UX-guide</h2>
          <button
            type="button"
            onClick={() => setPanelOpen(false)}
            className="text-ink-muted hover:text-ink p-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent"
            aria-label="Stäng panel"
          >
            <Icon name="close" size={18} />
          </button>
        </header>

        {/* Tabs */}
        <nav
          role="tablist"
          aria-label="UX-guide-vyer"
          className="flex border-b border-border-subtle shrink-0"
        >
          {tabs.map((t) => {
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls={`inspector-panel-${t.id}`}
                id={`inspector-tab-${t.id}`}
                disabled={!t.enabled}
                onClick={() => setActiveTab(t.id)}
                className={`flex-1 px-3 py-2.5 text-xs font-medium transition-colors border-b-2 -mb-px focus:outline-none focus-visible:bg-tint-info ${
                  active
                    ? "border-brand-accent text-brand-primary"
                    : t.enabled
                    ? "border-transparent text-ink-secondary hover:text-ink hover:bg-tint-info/50"
                    : "border-transparent text-ink-muted/50 cursor-not-allowed"
                }`}
                title={t.enabled ? t.label : `${t.label} (avaktiverad ,  slå på i headern)`}
              >
                {t.label}
                {t.enabled && t.count > 0 && (
                  <span className="ml-1 text-[10px] opacity-70">({t.count})</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {activeTab === "ux" && (
            <div
              role="tabpanel"
              id="inspector-panel-ux"
              aria-labelledby="inspector-tab-ux"
            >
              <UxTab list={uxList} onFocus={focusUx} focused={focusedUx} />
            </div>
          )}
          {activeTab === "copy" && (
            <div
              role="tabpanel"
              id="inspector-panel-copy"
              aria-labelledby="inspector-tab-copy"
            >
              <CopyTab list={copyList} brief={brief} onFocus={focusCopy} focused={focusedCopy} />
            </div>
          )}
          {activeTab === "edit" && (
            <div
              role="tabpanel"
              id="inspector-panel-edit"
              aria-labelledby="inspector-tab-edit"
            >
              <EditTab />
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

/* ─── UX-guide tab ───────────────────────────────────────────── */

type UxAnnotation = ReturnType<typeof useAnnotations>["list"][number];

function UxTab({
  list,
  onFocus,
  focused,
}: {
  list: UxAnnotation[];
  onFocus: (id: string) => void;
  focused: string | null;
}) {
  if (list.length === 0) {
    return (
      <p className="px-4 py-6 text-sm text-ink-muted">
        Inga UX-anteckningar på denna sida ännu.
      </p>
    );
  }

  const audienceColor = (a: string) =>
    a === "user"
      ? "bg-tint-info text-brand-primary"
      : a === "redaktör"
      ? "bg-tint-notice text-brand-primary"
      : "bg-tint-highlight text-brand-primary";

  return (
    <>
      <p className="px-4 pt-4 text-xs text-ink-muted">
        {list.length} designbeslut på denna sida. Klicka en rad för att hitta elementet.
      </p>
      <ul className="divide-y divide-border-subtle mt-2">
        {list.map((a) => (
          <li key={a.id}>
            <button
              type="button"
              onClick={() => onFocus(a.id)}
              className={`w-full text-left px-4 py-3.5 hover:bg-tint-info focus:outline-none focus-visible:bg-tint-info transition-colors ${
                focused === a.id ? "bg-tint-highlight" : ""
              }`}
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-highlight text-white text-xs font-bold flex-shrink-0">
                  {a.num}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-2 mb-1">
                    <span className="font-medium truncate">{a.label}</span>
                    <span
                      className={`text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded ${audienceColor(a.audience)}`}
                    >
                      {a.audience}
                    </span>
                  </div>
                  <p className="text-sm text-ink-secondary leading-relaxed">{a.rationale}</p>
                </div>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

/* ─── Copy-guide tab ─────────────────────────────────────────── */

type CopyEntry = ReturnType<typeof useEditorialGuide>["list"][number];
type Brief = ReturnType<typeof useEditorialGuide>["brief"];

const CAT_LABEL: Record<CopyCategory, string> = {
  rubrik: "Rubrik",
  cta: "CTA",
  reassurance: "Reassurance",
  faq: "FAQ",
  ton: "Ton",
  metadata: "Metadata",
};

const CAT_COLOR: Record<CopyCategory, string> = {
  rubrik: "bg-tint-info text-brand-primary",
  cta: "bg-tint-highlight text-brand-primary",
  reassurance: "bg-tint-notice text-brand-primary",
  faq: "bg-tint-info text-brand-primary",
  ton: "bg-tint-highlight text-brand-primary",
  metadata: "bg-tint-notice text-brand-primary",
};

function CopyTab({
  list,
  brief,
  onFocus,
  focused,
}: {
  list: CopyEntry[];
  brief: Brief;
  onFocus: (id: string) => void;
  focused: string | null;
}) {
  return (
    <>
      {brief && (
        <section className="px-4 py-4 bg-tint-info border-b border-border-subtle">
          <h3 className="text-[11px] font-bold uppercase tracking-wider text-brand-primary mb-2">
            Sidtyp-brief
          </h3>
          <dl className="space-y-2 text-sm">
            <div>
              <dt className="text-ink-muted text-xs">Kategori</dt>
              <dd className="font-medium">{brief.kategori}</dd>
            </div>
            <div>
              <dt className="text-ink-muted text-xs">Syfte</dt>
              <dd>{brief.syfte}</dd>
            </div>
            <div>
              <dt className="text-ink-muted text-xs">Målgrupp</dt>
              <dd>{brief.malgrupp}</dd>
            </div>
            <div>
              <dt className="text-ink-muted text-xs">Primär handling</dt>
              <dd>{brief.primarHandling}</dd>
            </div>
            <div>
              <dt className="text-ink-muted text-xs">Ton</dt>
              <dd>{brief.ton}</dd>
            </div>
          </dl>
        </section>
      )}

      {list.length === 0 ? (
        <p className="px-4 py-6 text-sm text-ink-muted">
          Ingen copy-guide på denna sida ännu.
        </p>
      ) : (
        <ul className="divide-y divide-border-subtle">
          {list.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => onFocus(c.id)}
                className={`w-full text-left px-4 py-3.5 hover:bg-tint-info focus:outline-none focus-visible:bg-tint-info transition-colors ${
                  focused === c.id ? "bg-tint-highlight" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded bg-brand-primary text-white text-xs font-bold flex-shrink-0">
                    {c.num}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <span className="font-medium truncate">{c.label}</span>
                      <span
                        className={`text-[10px] font-medium uppercase tracking-wider px-1.5 py-0.5 rounded ${CAT_COLOR[c.category]}`}
                      >
                        {CAT_LABEL[c.category]}
                      </span>
                    </div>
                    <p className="text-sm text-ink leading-snug mb-1.5 font-medium italic">
                      "{c.text}"
                    </p>
                    <p className="text-sm text-ink-secondary leading-relaxed">{c.rationale}</p>
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/* ─── Redigera tab ───────────────────────────────────────────── */

function EditTab() {
  const {
    activePageId,
    resetPage,
    hiddenCount,
    hasChanges,
    listPresets,
    savePreset,
    loadPreset,
    deletePreset,
  } = useEditMode();

  const [saveMode, setSaveMode] = useState(false);
  const [presetName, setPresetName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (saveMode) inputRef.current?.focus();
  }, [saveMode]);

  if (!activePageId) {
    return (
      <p className="px-4 py-6 text-sm text-ink-muted">
        Redigeringsläget är på, men öppna en sidtyp för att göra ändringar.
      </p>
    );
  }

  const hidden = hiddenCount(activePageId);
  const presets = listPresets(activePageId);
  const dirty = hasChanges(activePageId);

  function handleSave() {
    if (!activePageId) return;
    const trimmed = presetName.trim();
    if (!trimmed) return;
    savePreset(activePageId, trimmed);
    setSaveMode(false);
    setPresetName("");
  }

  return (
    <div className="p-4 space-y-5">
      {/* Status */}
      <section>
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-brand-primary mb-2">
          Status
        </h3>
        <dl className="space-y-1.5 text-sm">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-brand-highlight animate-pulse" />
            <dt className="font-medium">Redigeringsläge på</dt>
          </div>
          <div className="flex items-baseline justify-between gap-2 text-xs">
            <dt className="text-ink-muted">Aktiv sida</dt>
            <dd className="font-medium font-mono text-ink">{activePageId}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-2 text-xs">
            <dt className="text-ink-muted">Dolda block</dt>
            <dd className="font-medium">{hidden}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-2 text-xs">
            <dt className="text-ink-muted">Ändringar</dt>
            <dd className="font-medium">{dirty ? "ja" : "nej"}</dd>
          </div>
        </dl>
      </section>

      {/* Reset */}
      <section className="border-t border-border-subtle pt-4">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-brand-primary mb-2">
          Återställ
        </h3>
        <button
          type="button"
          onClick={() => resetPage(activePageId)}
          disabled={!dirty}
          className="w-full inline-flex items-center gap-2 border border-border-strong px-3 py-2 rounded text-sm text-ink hover:bg-tint-info disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Icon name="restart_alt" size={16} className="text-ink-muted" />
          Återställ sidan till rekommendation
        </button>
        <p className="text-xs text-ink-muted mt-1.5">
          Nollställer variant, ordning och dolt-status för alla block på denna sida.
        </p>
      </section>

      {/* Presets */}
      <section className="border-t border-border-subtle pt-4">
        <h3 className="text-[11px] font-bold uppercase tracking-wider text-brand-primary mb-2">
          Sparade presets{presets.length > 0 && ` (${presets.length})`}
        </h3>

        {presets.length === 0 ? (
          <p className="text-xs text-ink-muted italic mb-3">
            Inga sparade varianter för denna sidtyp ännu.
          </p>
        ) : (
          <ul className="mb-3 space-y-1">
            {presets.map((name) => (
              <li key={name} className="group flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => loadPreset(activePageId, name)}
                  className="flex-1 text-left px-2 py-1.5 rounded hover:bg-tint-info text-sm inline-flex items-center gap-2"
                >
                  <Icon name="bookmark" size={14} className="text-brand-accent" filled />
                  <span className="flex-1 truncate">{name}</span>
                  <span className="text-[10px] text-ink-muted opacity-0 group-hover:opacity-100">
                    ladda
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Radera presetet "${name}"?`)) {
                      deletePreset(activePageId, name);
                    }
                  }}
                  className="p-1 rounded hover:bg-tint-highlight text-ink-muted hover:text-brand-highlight opacity-0 group-hover:opacity-100 focus:opacity-100"
                  aria-label={`Radera ${name}`}
                  title="Radera preset"
                >
                  <Icon name="delete" size={14} />
                </button>
              </li>
            ))}
          </ul>
        )}

        {saveMode ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="flex gap-1"
          >
            <input
              ref={inputRef}
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="Namn på preset…"
              className="flex-1 min-w-0 border border-border-strong rounded px-2 py-1.5 text-sm bg-surface focus:outline-none focus:border-brand-accent"
            />
            <button
              type="submit"
              disabled={!presetName.trim()}
              className="px-3 py-1.5 rounded bg-brand-primary text-white text-xs font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Spara
            </button>
            <button
              type="button"
              onClick={() => {
                setSaveMode(false);
                setPresetName("");
              }}
              className="px-2 py-1.5 rounded text-ink-muted hover:text-ink text-xs"
            >
              Avbryt
            </button>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setSaveMode(true)}
            disabled={!dirty}
            className="w-full inline-flex items-center gap-2 border border-dashed border-border-strong px-3 py-2 rounded text-sm text-ink-secondary hover:bg-tint-info hover:text-ink disabled:opacity-40 disabled:cursor-not-allowed"
            title={dirty ? "Spara nuvarande variant-kombination" : "Inga ändringar att spara"}
          >
            <Icon name="add" size={16} className="text-brand-accent" />
            Spara nuvarande som preset
          </button>
        )}
      </section>

      {/* Hjälptext */}
      <section className="border-t border-border-subtle pt-4 text-xs text-ink-muted leading-relaxed">
        Varje block har en egen verktygsrad direkt på sidan där du kan byta
        variant, flytta upp/ner och dölja.
      </section>
    </div>
  );
}
