import { useEffect, useRef, useState } from "react";
import { useEditMode } from "../lib/EditModeContext";
import { Icon } from "./Icon";

/**
 * Thin top bar shown below header when edit mode is on.
 * Gives the user preset controls + escape hatches.
 */
export function EditModeBar() {
  const {
    enabled,
    activePageId,
    resetPage,
    hiddenCount,
    hasChanges,
    listPresets,
    savePreset,
    loadPreset,
    deletePreset,
  } = useEditMode();

  const [menuOpen, setMenuOpen] = useState(false);
  const [saveMode, setSaveMode] = useState(false);
  const [presetName, setPresetName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (saveMode) inputRef.current?.focus();
  }, [saveMode]);

  useEffect(() => {
    if (!enabled) {
      setMenuOpen(false);
      setSaveMode(false);
      setPresetName("");
    }
  }, [enabled]);

  if (!enabled || !activePageId) return null;

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
    setMenuOpen(false);
  }

  return (
    <div className="sticky top-14 z-30 bg-brand-primary text-white text-xs">
      <div className="max-w-content mx-auto px-4 sm:px-6 min-h-9 py-1.5 flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-brand-highlight animate-pulse" />
          <strong>Redigeringsläge</strong>
          <span className="hidden sm:inline opacity-80">
            Ändringar sparas lokalt
          </span>
          {hidden > 0 && (
            <span className="ml-1 px-2 py-0.5 rounded bg-white/15">
              {hidden} dolt{hidden === 1 ? "" : "a"}
            </span>
          )}
          {dirty && (
            <span className="ml-1 px-2 py-0.5 rounded bg-white/15">
              ändrat
            </span>
          )}
        </span>

        <div className="flex items-center gap-2 relative">
          {/* Presets menu */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setMenuOpen((v) => !v);
                setSaveMode(false);
              }}
              className="px-3 py-1 rounded border border-white/30 hover:bg-white/10 inline-flex items-center gap-1.5"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
            >
              <Icon name="bookmark" size={14} />
              Preset
              {presets.length > 0 && (
                <span className="text-[10px] opacity-70">({presets.length})</span>
              )}
              <Icon name="expand_more" size={14} />
            </button>
            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-20"
                  onClick={() => { setMenuOpen(false); setSaveMode(false); }}
                  aria-hidden="true"
                />
                <div
                  role="menu"
                  className="absolute right-0 top-full mt-1 min-w-[280px] rounded-md border border-border-subtle bg-elevated text-ink shadow-xl p-2 z-30"
                >
                  <p className="text-[10px] uppercase tracking-wider text-ink-muted font-medium px-2 py-1">
                    Sparade varianter
                  </p>

                  {presets.length === 0 ? (
                    <p className="px-2 py-2 text-xs text-ink-muted italic">
                      Inga sparade presets för denna sidtyp ännu.
                    </p>
                  ) : (
                    <ul className="mb-2">
                      {presets.map((name) => (
                        <li key={name} className="group flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              if (!activePageId) return;
                              loadPreset(activePageId, name);
                              setMenuOpen(false);
                            }}
                            className="flex-1 text-left px-2 py-1.5 rounded hover:bg-tint-info text-xs flex items-center gap-2"
                            role="menuitem"
                          >
                            <Icon name="bookmark" size={14} className="text-brand-accent" filled />
                            <span className="flex-1 truncate">{name}</span>
                            <span className="text-[10px] text-ink-muted opacity-0 group-hover:opacity-100">
                              ladda
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!activePageId) return;
                              if (confirm(`Radera presetet "${name}"?`)) {
                                deletePreset(activePageId, name);
                              }
                            }}
                            className="p-1 rounded hover:bg-tint-highlight text-ink-muted hover:text-brand-highlight opacity-0 group-hover:opacity-100"
                            aria-label={`Radera ${name}`}
                            title="Radera"
                          >
                            <Icon name="delete" size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="border-t border-border-subtle pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (!activePageId) return;
                        resetPage(activePageId);
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-2 py-1.5 rounded hover:bg-tint-info text-xs flex items-center gap-2"
                      role="menuitem"
                    >
                      <Icon name="restart_alt" size={14} className="text-ink-muted" />
                      <span className="flex-1">Rekommendation</span>
                      <span className="text-[10px] text-ink-muted">default</span>
                    </button>
                  </div>

                  <div className="border-t border-border-subtle pt-2 mt-2">
                    {saveMode ? (
                      <form
                        onSubmit={(e) => { e.preventDefault(); handleSave(); }}
                        className="px-1 flex gap-1"
                      >
                        <input
                          ref={inputRef}
                          type="text"
                          value={presetName}
                          onChange={(e) => setPresetName(e.target.value)}
                          placeholder="Namn på preset…"
                          className="flex-1 min-w-0 border border-border-strong rounded px-2 py-1 text-xs bg-surface focus:border-brand-accent focus:outline-none"
                        />
                        <button
                          type="submit"
                          disabled={!presetName.trim()}
                          className="px-2 py-1 rounded bg-brand-primary text-white text-xs font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          Spara
                        </button>
                        <button
                          type="button"
                          onClick={() => { setSaveMode(false); setPresetName(""); }}
                          className="px-2 py-1 rounded text-ink-muted hover:text-ink text-xs"
                        >
                          Avbryt
                        </button>
                      </form>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSaveMode(true)}
                        disabled={!dirty}
                        className="w-full text-left px-2 py-1.5 rounded hover:bg-tint-info text-xs flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent"
                        title={dirty ? "Spara nuvarande variant-kombination" : "Inga ändringar att spara"}
                      >
                        <Icon name="add" size={14} className="text-brand-accent" />
                        Spara nuvarande som preset
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => activePageId && resetPage(activePageId)}
            disabled={!dirty}
            className="px-3 py-1 rounded border border-white/30 hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Återställ sidan
          </button>
        </div>
      </div>
    </div>
  );
}
