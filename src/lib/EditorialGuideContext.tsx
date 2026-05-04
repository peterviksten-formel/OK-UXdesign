import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

/**
 * EditorialGuide ,  "why is the copy written this way?"
 *
 * Annotations explain WHY a section exists. EditorialGuide explains
 * WHY a specific word/phrase was chosen ,  tone, voice, loss aversion,
 * tidslöfte, etc. Authored inline with <Copy rationale="...">...</Copy>.
 *
 * Lives in a LEFT side-panel so it never collides with the right
 * Annotation panel ,  both can be open simultaneously.
 */

export type CopyCategory = "rubrik" | "cta" | "reassurance" | "faq" | "ton" | "metadata";

export type CopyData = {
  id: string;
  label: string;
  text: string;
  rationale: string;
  category: CopyCategory;
};

export type CopyDataWithNum = CopyData & { num: number };

export type PageBrief = {
  kategori: string;
  syfte: string;
  malgrupp: string;
  primarHandling: string;
  ton: string;
};

type Ctx = {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (b: boolean) => void;
  brief: PageBrief | null;
  setBrief: (b: PageBrief | null) => void;
  register: (c: CopyData) => void;
  unregister: (id: string) => void;
  list: CopyDataWithNum[];
  numFor: (id: string) => number | null;
  focus: (id: string | null) => void;
  focused: string | null;
};

const EditorialGuideContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "ok-ux-editorial-guide";

function getInitial(): boolean {
  if (typeof window === "undefined") return false;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "on") return true;
  if (stored === "off") return false;
  return false;
}

export function EditorialGuideProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState<boolean>(getInitial);
  const [brief, setBrief] = useState<PageBrief | null>(null);
  const [rawList, setRawList] = useState<CopyData[]>([]);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
  }, [enabled]);

  // Sync enabled state across tabs/iframes ,  håller mobil-/tablet-
  // simulator i iframen i synk med parent-appens UX-guide-toggle.
  useEffect(() => {
    function handleStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) {
        setEnabled(e.newValue === "on");
      }
    }
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const register = useCallback((c: CopyData) => {
    setRawList((prev) => {
      const existing = prev.findIndex((x) => x.id === c.id);
      if (existing >= 0) {
        const next = prev.slice();
        next[existing] = c;
        return next;
      }
      return [...prev, c];
    });
  }, []);

  const unregister = useCallback((id: string) => {
    setRawList((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const list: CopyDataWithNum[] = useMemo(
    () => rawList.map((c, i) => ({ ...c, num: i + 1 })),
    [rawList],
  );

  const numFor = useCallback(
    (id: string) => {
      const i = rawList.findIndex((x) => x.id === id);
      return i >= 0 ? i + 1 : null;
    },
    [rawList],
  );

  const value = useMemo(
    () => ({
      enabled,
      toggle: () => setEnabled((v) => !v),
      setEnabled,
      brief,
      setBrief,
      register,
      unregister,
      list,
      numFor,
      focus: setFocused,
      focused,
    }),
    [enabled, brief, list, register, unregister, numFor, focused],
  );

  return <EditorialGuideContext.Provider value={value}>{children}</EditorialGuideContext.Provider>;
}

export function useEditorialGuide() {
  const ctx = useContext(EditorialGuideContext);
  if (!ctx) throw new Error("useEditorialGuide must be used inside <EditorialGuideProvider>");
  return ctx;
}
