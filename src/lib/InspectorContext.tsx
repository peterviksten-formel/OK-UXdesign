import { createContext, useContext, useState, type ReactNode } from "react";

/**
 * Inspector — samlar UX-guide, Copy-guide och Redigera i en högerkolumn.
 * Kontexten tracka:
 *   - activeTab: vilken av de tre flikarna som visas
 *   - panelOpen: visuell öppen/stängd på panelen (när minst ett läge är på)
 *
 * Flaggorna för respektive läge (annotations.enabled, editorial.enabled,
 * editMode.enabled) bor kvar i sina egna kontexter — Inspector består bara
 * av navigation.
 */

export type InspectorTab = "ux" | "copy" | "edit";

type Ctx = {
  activeTab: InspectorTab;
  setActiveTab: (tab: InspectorTab) => void;
  panelOpen: boolean;
  setPanelOpen: (v: boolean) => void;
  openOn: (tab: InspectorTab) => void;
};

const InspectorContext = createContext<Ctx | null>(null);

export function InspectorProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState<InspectorTab>("ux");
  const [panelOpen, setPanelOpen] = useState(true);

  function openOn(tab: InspectorTab) {
    setActiveTab(tab);
    setPanelOpen(true);
  }

  return (
    <InspectorContext.Provider value={{ activeTab, setActiveTab, panelOpen, setPanelOpen, openOn }}>
      {children}
    </InspectorContext.Provider>
  );
}

export function useInspector() {
  const ctx = useContext(InspectorContext);
  if (!ctx) throw new Error("useInspector must be used inside <InspectorProvider>");
  return ctx;
}
