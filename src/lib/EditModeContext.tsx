import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * EditMode — lets the user edit the composition of a sidtyp:
 *   - hide/show individual blocks
 *   - switch variant of a block
 *   - reorder blocks (up/down)
 *
 * State is scoped per sidtyp (via sidtypId) and persisted to localStorage.
 */

export type BlockState = {
  hidden: boolean;
  variant: string | null;
  /** explicit order override — unordered blocks use natural mount order */
  order: number | null;
};

type StorePerPage = Record<string, BlockState>;
type AllStore = Record<string, StorePerPage>;

type Ctx = {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (b: boolean) => void;
  activePageId: string | null;
  setActivePageId: (id: string | null) => void;
  get: (pageId: string, blockId: string) => BlockState;
  update: (pageId: string, blockId: string, patch: Partial<BlockState>) => void;
  resetPage: (pageId: string) => void;
  hiddenCount: (pageId: string) => number;
};

const EditModeContext = createContext<Ctx | null>(null);

const ENABLED_KEY = "ok-ux-editmode-enabled";
const STATE_KEY = "ok-ux-editmode-state";

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

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState<boolean>(getInitialEnabled);
  const [store, setStore] = useState<AllStore>(getInitialState);
  const [activePageId, setActivePageId] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem(ENABLED_KEY, enabled ? "on" : "off");
  }, [enabled]);

  useEffect(() => {
    window.localStorage.setItem(STATE_KEY, JSON.stringify(store));
  }, [store]);

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

  const hiddenCount = useCallback(
    (pageId: string) => {
      const page = store[pageId];
      if (!page) return 0;
      return Object.values(page).filter((b) => b.hidden).length;
    },
    [store],
  );

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
      hiddenCount,
    }),
    [enabled, activePageId, get, update, resetPage, hiddenCount],
  );

  return <EditModeContext.Provider value={value}>{children}</EditModeContext.Provider>;
}

export function useEditMode() {
  const ctx = useContext(EditModeContext);
  if (!ctx) throw new Error("useEditMode must be used inside <EditModeProvider>");
  return ctx;
}
