import { useEditMode } from "../lib/EditModeContext";

/**
 * Thin top bar shown below header when edit mode is on.
 * Gives the user an obvious "återställ" escape and reminds them
 * changes persist locally.
 */
export function EditModeBar() {
  const { enabled, activePageId, resetPage, hiddenCount } = useEditMode();

  if (!enabled || !activePageId) return null;

  const hidden = hiddenCount(activePageId);

  return (
    <div className="sticky top-14 z-30 bg-brand-primary text-white text-xs">
      <div className="max-w-content mx-auto px-4 sm:px-6 h-9 flex items-center justify-between gap-4">
        <span className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 rounded-full bg-brand-highlight animate-pulse" />
          <strong>Redigeringsläge</strong>
          <span className="hidden sm:inline opacity-80">
            Ändringar sparas lokalt i din webbläsare
          </span>
          {hidden > 0 && (
            <span className="ml-2 px-2 py-0.5 rounded bg-white/15">
              {hidden} dolt{hidden === 1 ? "" : "a"}
            </span>
          )}
        </span>
        <button
          type="button"
          onClick={() => resetPage(activePageId)}
          className="px-3 py-1 rounded border border-white/30 hover:bg-white/10"
        >
          Återställ hela sidan
        </button>
      </div>
    </div>
  );
}
