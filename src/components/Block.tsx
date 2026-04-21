import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useEditMode } from "../lib/EditModeContext";

export type BlockVariant = {
  key: string;
  label: string;
  render: () => ReactNode;
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
                    className="px-2 py-1 rounded hover:bg-tint-info text-ink-secondary"
                    aria-haspopup="menu"
                    aria-expanded={menuOpen}
                    title="Byt variant"
                  >
                    {active?.label ?? "Variant"} ▾
                  </button>
                  {menuOpen && (
                    <div
                      role="menu"
                      className="absolute right-0 top-full mt-1 min-w-[200px] rounded-md border border-border-subtle bg-elevated shadow-lg py-1 z-30"
                    >
                      {def.variants.map((v) => (
                        <button
                          key={v.key}
                          type="button"
                          onClick={() => {
                            update(pageId, def.id, { variant: v.key });
                            setMenuOpen(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 text-xs hover:bg-tint-info ${
                            v.key === activeKey ? "bg-tint-info font-medium text-brand-primary" : "text-ink-secondary"
                          }`}
                          role="menuitemradio"
                          aria-checked={v.key === activeKey}
                        >
                          {v.key === activeKey ? "✓ " : "   "}
                          {v.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
              <button
                type="button"
                onClick={onMoveUp}
                disabled={isFirst}
                className="px-2 py-1 rounded hover:bg-tint-info text-ink-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                title="Flytta upp"
              >
                ↑
              </button>
              <button
                type="button"
                onClick={onMoveDown}
                disabled={isLast}
                className="px-2 py-1 rounded hover:bg-tint-info text-ink-secondary disabled:opacity-30 disabled:cursor-not-allowed"
                title="Flytta ner"
              >
                ↓
              </button>
              <button
                type="button"
                onClick={() => update(pageId, def.id, { hidden: !state.hidden })}
                className="px-2 py-1 rounded hover:bg-tint-highlight text-ink-secondary"
                title={state.hidden ? "Visa blocket igen" : "Ta bort blocket"}
              >
                {state.hidden ? "↻ Återställ" : "✕ Ta bort"}
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
