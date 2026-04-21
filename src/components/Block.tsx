import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useEditMode } from "../lib/EditModeContext";
import { Icon } from "./Icon";

export type BlockVariant = {
  key: string;
  label: string;
  render: () => ReactNode;
  /** Optional schematic shown in the variant picker */
  preview?: ReactNode;
};

export type BlockDef = {
  id: string;
  label: string;
  variants: BlockVariant[];
};

type BlockListProps = {
  pageId: string;
  blocks: BlockDef[];
};

/**
 * Renders a sidtyp's sections as a stack of editable blocks.
 * Reads ordering + variant + hidden state from EditModeContext, keyed by pageId.
 *
 * When edit mode is on, each block gets a sticky inline toolbar
 * (byt variant, flytta upp/ner, ta bort).
 */
export function BlockList({ pageId, blocks }: BlockListProps) {
  const { enabled, setActivePageId, get, update } = useEditMode();

  useEffect(() => {
    setActivePageId(pageId);
    return () => setActivePageId(null);
  }, [pageId, setActivePageId]);

  const ordered = useMemo(() => {
    return blocks
      .map((b, i) => {
        const s = get(pageId, b.id);
        const order = s.order ?? i;
        return { def: b, naturalIndex: i, order };
      })
      .sort((a, b) => a.order - b.order);
  }, [blocks, pageId, get]);

  const moveUp = (blockId: string) => {
    const idx = ordered.findIndex((b) => b.def.id === blockId);
    if (idx <= 0) return;
    const prev = ordered[idx - 1];
    const curr = ordered[idx];
    update(pageId, curr.def.id, { order: prev.order });
    update(pageId, prev.def.id, { order: curr.order });
  };

  const moveDown = (blockId: string) => {
    const idx = ordered.findIndex((b) => b.def.id === blockId);
    if (idx < 0 || idx >= ordered.length - 1) return;
    const next = ordered[idx + 1];
    const curr = ordered[idx];
    update(pageId, curr.def.id, { order: next.order });
    update(pageId, next.def.id, { order: curr.order });
  };

  return (
    <>
      {ordered.map(({ def }, i) => (
        <BlockRenderer
          key={def.id}
          pageId={pageId}
          def={def}
          isFirst={i === 0}
          isLast={i === ordered.length - 1}
          editEnabled={enabled}
          onMoveUp={() => moveUp(def.id)}
          onMoveDown={() => moveDown(def.id)}
        />
      ))}
    </>
  );
}

type RendererProps = {
  pageId: string;
  def: BlockDef;
  isFirst: boolean;
  isLast: boolean;
  editEnabled: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
};

function BlockRenderer({ pageId, def, isFirst, isLast, editEnabled, onMoveUp, onMoveDown }: RendererProps) {
  const { get, update } = useEditMode();
  const state = get(pageId, def.id);
  const [menuOpen, setMenuOpen] = useState(false);

  const activeKey = state.variant ?? def.variants[0]?.key;
  const active = def.variants.find((v) => v.key === activeKey) ?? def.variants[0];

  if (state.hidden && !editEnabled) return null;

  const hasVariants = def.variants.length > 1;

  return (
    <div data-block-id={def.id} className="relative">
      {editEnabled && (
        <div className="sticky top-14 z-20 pointer-events-none">
          <div className="flex justify-end pr-1">
            <div className="pointer-events-auto -mt-1 inline-flex items-center gap-1 rounded-md border border-brand-primary bg-elevated shadow-md px-1.5 py-1 text-xs">
              <span className="font-medium text-brand-primary px-1.5">
                {def.label}
              </span>
              {hasVariants && (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setMenuOpen((v) => !v)}
                    className="px-2 py-1 rounded hover:bg-tint-info text-ink-secondary inline-flex items-center gap-1"
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                    title="Byt variant"
                  >
                    {active?.label ?? "Variant"}
                    <Icon name="expand_more" size={14} />
                  </button>
                  {menuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-20"
                        onClick={() => setMenuOpen(false)}
                        aria-hidden="true"
                      />
                      <div
                        role="menu"
                        className="absolute right-0 top-full mt-1 w-[280px] sm:w-[320px] rounded-md border border-border-subtle bg-elevated shadow-xl p-2 z-30"
                      >
                        <p className="text-[10px] uppercase tracking-wider text-ink-muted font-medium px-1 pb-1.5 pt-0.5">
                          Välj variant
                        </p>
                        <ul className="grid grid-cols-1 gap-1.5">
                          {def.variants.map((v) => {
                            const selected = v.key === activeKey;
                            return (
                              <li key={v.key}>
                                <button
                                  type="button"
                                  onClick={() => {
                                    update(pageId, def.id, { variant: v.key });
                                    setMenuOpen(false);
                                  }}
                                  className={`w-full text-left rounded-md border transition-colors overflow-hidden flex items-stretch ${
                                    selected
                                      ? "border-brand-accent bg-tint-info"
                                      : "border-border-subtle hover:border-brand-accent hover:bg-tint-info"
                                  }`}
                                  role="menuitemradio"
                                  aria-checked={selected}
                                >
                                  <div className="w-[96px] h-[64px] bg-canvas border-r border-border-subtle flex items-center justify-center shrink-0 overflow-hidden">
                                    {v.preview ?? (
                                      <span className="text-[10px] text-ink-muted">Ingen preview</span>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0 px-3 py-2 flex items-center justify-between gap-2">
                                    <span className={`text-xs leading-tight ${selected ? "font-medium text-brand-primary" : "text-ink-secondary"}`}>
                                      {v.label}
                                    </span>
                                    <span
                                      className={`shrink-0 w-4 h-4 rounded-full border flex items-center justify-center ${
                                        selected ? "bg-brand-accent border-brand-accent text-white" : "border-border-strong"
                                      }`}
                                      aria-hidden="true"
                                    >
                                      {selected && <Icon name="check" size={12} />}
                                    </span>
                                  </div>
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </>
                  )}
                </div>
              )}
              <button
                type="button"
                onClick={onMoveUp}
                disabled={isFirst}
                className="p-1 rounded hover:bg-tint-info text-ink-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                title="Flytta upp"
              >
                <Icon name="arrow_upward" size={14} />
              </button>
              <button
                type="button"
                onClick={onMoveDown}
                disabled={isLast}
                className="p-1 rounded hover:bg-tint-info text-ink-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                title="Flytta ner"
              >
                <Icon name="arrow_downward" size={14} />
              </button>
              <button
                type="button"
                onClick={() => update(pageId, def.id, { hidden: !state.hidden })}
                className="px-2 py-1 rounded hover:bg-tint-highlight text-ink-secondary inline-flex items-center gap-1"
                title={state.hidden ? "Visa blocket igen" : "Ta bort blocket"}
              >
                <Icon name={state.hidden ? "restart_alt" : "close"} size={14} />
                {state.hidden ? "Återställ" : "Ta bort"}
              </button>
            </div>
          </div>
        </div>
      )}

      {editEnabled && state.hidden ? (
        <div className="py-6 px-4 my-2 border-2 border-dashed border-border-strong rounded-md text-center text-sm text-ink-muted">
          <span className="font-medium">{def.label}</span> är borttaget.
          Klicka <strong>Återställ</strong> i verktygsraden ovan.
        </div>
      ) : (
        active?.render()
      )}
    </div>
  );
}
