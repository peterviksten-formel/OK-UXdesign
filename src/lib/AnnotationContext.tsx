import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type AnnotationAudience = "user" | "redaktör" | "design";

export type AnnotationData = {
  id: string;
  label: string;
  rationale: string;
  audience: AnnotationAudience;
};

export type AnnotationDataWithNum = AnnotationData & { num: number };

type AnnotationContextValue = {
  enabled: boolean;
  toggle: () => void;
  setEnabled: (b: boolean) => void;
  register: (a: AnnotationData) => void;
  unregister: (id: string) => void;
  list: AnnotationDataWithNum[];
  numFor: (id: string) => number | null;
  focus: (id: string | null) => void;
  focused: string | null;
};

const AnnotationContext = createContext<AnnotationContextValue | null>(null);

const STORAGE_KEY = "ok-ux-annotations";

function getInitial(): boolean {
  if (typeof window === "undefined") return true;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "on") return true;
  if (stored === "off") return false;
  return true; // default ON per the brief
}

export function AnnotationProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState<boolean>(getInitial);
  const [rawList, setRawList] = useState<AnnotationData[]>([]);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, enabled ? "on" : "off");
  }, [enabled]);

  // Sync enabled state across tabs/iframes — håller mobil-/tablet-
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

  const register = useCallback((a: AnnotationData) => {
    setRawList((prev) => {
      // Update if id already known (rationale/label may have changed); otherwise append.
      const existing = prev.findIndex((x) => x.id === a.id);
      if (existing >= 0) {
        const next = prev.slice();
        next[existing] = a;
        return next;
      }
      return [...prev, a];
    });
  }, []);

  const unregister = useCallback((id: string) => {
    setRawList((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const list: AnnotationDataWithNum[] = useMemo(
    () => rawList.map((a, i) => ({ ...a, num: i + 1 })),
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
      register,
      unregister,
      list,
      numFor,
      focus: setFocused,
      focused,
    }),
    [enabled, list, register, unregister, numFor, focused],
  );

  return <AnnotationContext.Provider value={value}>{children}</AnnotationContext.Provider>;
}

export function useAnnotations() {
  const ctx = useContext(AnnotationContext);
  if (!ctx) throw new Error("useAnnotations must be used inside <AnnotationProvider>");
  return ctx;
}
