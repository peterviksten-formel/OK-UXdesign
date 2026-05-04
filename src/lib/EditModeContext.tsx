import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * EditMode ,  lets the user edit the composition of a sidtyp:
 *   - hide/show individual blocks
 *   - switch variant of a block
 *   - reorder blocks (up/down)
 *
 * Three piece of state:
 *  1. `enabled` ,  is the Redigera-toggle on?
 *  2. `store` ,  current block-state per sidtyp (the "working copy")
 *  3. `presets` ,  named snapshots per sidtyp, user can save/load
 */

export type BlockState = {
  hidden: boolean;
  variant: string | null;
  /** explicit order override ,  unordered blocks use natural mount order */
  order: number | null;
};

type StorePerPage = Record<string, BlockState>;
type AllStore = Record<string, StorePerPage>;

/** Presets: keyed first by pageId, then by preset name. */
type PresetsStore = Record<string, Record<string, StorePerPage>>;

type Ctx = {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (b: boolean) => void;
  activePageId: string | null;
  setActivePageId: (id: string | null) => void;
  get: (pageId: string, blockId: string) => BlockState;
  update: (pageId: string, blockId: string, patch: Partial<BlockState>) => void;
  resetPage: (pageId: string) => void;
  resetAll: () => void;
  hiddenCount: (pageId: string) => number;
  hasChanges: (pageId: string) => boolean;
  /** Presets */
  listPresets: (pageId: string) => string[];
  savePreset: (pageId: string, name: string) => void;
  loadPreset: (pageId: string, name: string) => void;
  deletePreset: (pageId: string, name: string) => void;
};

const EditModeContext = createContext<Ctx | null>(null);

const ENABLED_KEY = "ok-ux-editmode-enabled";
const STATE_KEY = "ok-ux-editmode-state";
const PRESETS_KEY = "ok-ux-editmode-presets";

const DEFAULT: BlockState = { hidden: false, variant: null, order: null };

function getInitialEnabled(): boolean {
  if (typeof window === "undefined") return false;
  const stored = window.localStorage.getItem(ENABLED_KEY);
  return stored === "on";
}

function getInitialState(): AllStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STATE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as AllStore;
  } catch {
    return {};
  }
}

function getInitialPresets(): PresetsStore {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(PRESETS_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as PresetsStore;
  } catch {
    return {};
  }
}

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState<boolean>(getInitialEnabled);
  const [store, setStore] = useState<AllStore>(getInitialState);
  const [presets, setPresets] = useState<PresetsStore>(getInitialPresets);
  const [activePageId, setActivePageId] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem(ENABLED_KEY, enabled ? "on" : "off");
  }, [enabled]);

  useEffect(() => {
    window.localStorage.setItem(STATE_KEY, JSON.stringify(store));
  }, [store]);

  useEffect(() => {
    window.localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
  }, [presets]);

  /**
   * Sync state across tabs/iframes. När man t.ex. stänger av
   * redigeringsläget i parent-appen ska mobil-/tablet-iframen som
   * simulerar viewport reagera direkt ,  annars ligger edit-overlays
   * kvar i iframen även efter toggle off.
   */
  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === ENABLED_KEY) {
        setEnabled(e.newValue === "on");
      } else if (e.key === STATE_KEY) {
        try {
          setStore(e.newValue ? (JSON.parse(e.newValue) as AllStore) : {});
        } catch {
          /* ignore parse errors */
        }
      } else if (e.key === PRESETS_KEY) {
        try {
          setPresets(e.newValue ? (JSON.parse(e.newValue) as PresetsStore) : {});
        } catch {
          /* ignore parse errors */
        }
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const get = useCallback(
    (pageId: string, blockId: string): BlockState => {
      return store[pageId]?.[blockId] ?? DEFAULT;
    },
    [store],
  );

  const update = useCallback(
    (pageId: string, blockId: string, patch: Partial<BlockState>) => {
      setStore((prev) => {
        const page = prev[pageId] ?? {};
        const current = page[blockId] ?? DEFAULT;
        return {
          ...prev,
          [pageId]: {
            ...page,
            [blockId]: { ...current, ...patch },
          },
        };
      });
    },
    [],
  );

  const resetPage = useCallback((pageId: string) => {
    setStore((prev) => {
      const next = { ...prev };
      delete next[pageId];
      return next;
    });
  }, []);

  const resetAll = useCallback(() => {
    setStore({});
  }, []);

  const hiddenCount = useCallback(
    (pageId: string) => {
      const page = store[pageId];
      if (!page) return 0;
      return Object.values(page).filter((b) => b.hidden).length;
    },
    [store],
  );

  const hasChanges = useCallback(
    (pageId: string) => {
      const page = store[pageId];
      if (!page) return false;
      return Object.keys(page).length > 0;
    },
    [store],
  );

  /* ─── Preset helpers ─────────────────────────────────────────── */

  const listPresets = useCallback(
    (pageId: string): string[] => {
      return Object.keys(presets[pageId] ?? {}).sort();
    },
    [presets],
  );

  const savePreset = useCallback(
    (pageId: string, name: string) => {
      const trimmed = name.trim();
      if (!trimmed) return;
      setPresets((prev) => ({
        ...prev,
        [pageId]: {
          ...(prev[pageId] ?? {}),
          [trimmed]: store[pageId] ?? {},
        },
      }));
    },
    [store],
  );

  const loadPreset = useCallback(
    (pageId: string, name: string) => {
      const preset = presets[pageId]?.[name];
      if (!preset) return;
      setStore((prev) => ({ ...prev, [pageId]: { ...preset } }));
    },
    [presets],
  );

  const deletePreset = useCallback((pageId: string, name: string) => {
    setPresets((prev) => {
      const pagePresets = { ...(prev[pageId] ?? {}) };
      delete pagePresets[name];
      if (Object.keys(pagePresets).length === 0) {
        const next = { ...prev };
        delete next[pageId];
        return next;
      }
      return { ...prev, [pageId]: pagePresets };
    });
  }, []);

  const value = useMemo(
    () => ({
      enabled,
      toggle: () => setEnabled((v) => !v),
      setEnabled,
      activePageId,
      setActivePageId,
      get,
      update,
      resetPage,
      resetAll,
      hiddenCount,
      hasChanges,
      listPresets,
      savePreset,
      loadPreset,
      deletePreset,
    }),
    [enabled, activePageId, get, update, resetPage, resetAll, hiddenCount, hasChanges, listPresets, savePreset, loadPreset, deletePreset],
  );

  return <EditModeContext.Provider value={value}>{children}</EditModeContext.Provider>;
}

export function useEditMode() {
  const ctx = useContext(EditModeContext);
  if (!ctx) throw new Error("useEditMode must be used inside <EditModeProvider>");
  return ctx;
}
