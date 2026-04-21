import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Viewport = "desktop" | "tablet" | "mobile";

export const VIEWPORT_WIDTH: Record<Viewport, number | null> = {
  desktop: null,
  tablet: 834,
  mobile: 390,
};

type Ctx = {
  viewport: Viewport;
  set: (v: Viewport) => void;
};

const ViewportContext = createContext<Ctx | null>(null);

const STORAGE_KEY = "ok-ux-viewport";

function getInitial(): Viewport {
  if (typeof window === "undefined") return "desktop";
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "desktop" || stored === "tablet" || stored === "mobile") return stored;
  return "desktop";
}

export function ViewportProvider({ children }: { children: ReactNode }) {
  const [viewport, setViewport] = useState<Viewport>(getInitial);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, viewport);
  }, [viewport]);

  const value = useMemo(() => ({ viewport, set: setViewport }), [viewport]);

  return <ViewportContext.Provider value={value}>{children}</ViewportContext.Provider>;
}

export function useViewport() {
  const ctx = useContext(ViewportContext);
  if (!ctx) throw new Error("useViewport must be used inside <ViewportProvider>");
  return ctx;
}
