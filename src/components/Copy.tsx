import { Children, cloneElement, isValidElement, useEffect, useId, useRef, type ReactElement, type ReactNode } from "react";
import { useEditorialGuide, type CopyCategory } from "../lib/EditorialGuideContext";

type CopyProps = {
  label: string;
  rationale: string;
  category?: CopyCategory;
  /** Optional plain-text mirror for the panel. If omitted, children must be a string. */
  text?: string;
  children: ReactNode;
};

/**
 * Wraps a single element whose WORDING deserves explanation.
 * When the Copy-guide is enabled, the child gets a subtle underline +
 * a numbered marker; clicking the side-panel row scrolls here.
 */
export function Copy({ label, rationale, category = "rubrik", text, children }: CopyProps) {
  const id = useId();
  const { enabled, register, unregister, numFor, focus, focused } = useEditorialGuide();
  const elRef = useRef<HTMLElement | null>(null);

  const textValue = text ?? (typeof children === "string" ? children : label);

  useEffect(() => {
    register({ id, label, rationale, category, text: textValue });
    return () => unregister(id);
  }, [id, label, rationale, category, textValue, register, unregister]);

  const num = numFor(id);

  useEffect(() => {
    if (focused === id && elRef.current) {
      elRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      const t = setTimeout(() => focus(null), 1200);
      return () => clearTimeout(t);
    }
  }, [focused, id, focus]);

  if (!enabled) return <>{children}</>;

  const child = Children.only(children);
  if (!isValidElement(child)) {
    // Children is a plain string or fragment — wrap in a span so we can decorate.
    return (
      <span
        ref={(node) => { elRef.current = node; }}
        data-copy-guide="true"
        data-copy-num={num != null ? String(num) : ""}
        data-copy-category={category}
        style={focused === id ? { boxShadow: "0 0 0 4px var(--color-surface-highlight)" } : undefined}
      >
        {children}
      </span>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childProps = (child.props ?? {}) as Record<string, any>;
  const merged = {
    ...childProps,
    "data-copy-guide": "true",
    "data-copy-num": num != null ? String(num) : "",
    "data-copy-category": category,
    ref: (node: HTMLElement | null) => {
      elRef.current = node;
      const orig = (child as ReactElement & { ref?: unknown }).ref;
      if (typeof orig === "function") orig(node);
      else if (orig && typeof orig === "object" && "current" in (orig as object))
        (orig as { current: unknown }).current = node;
    },
    style: {
      ...(childProps.style ?? {}),
      ...(focused === id ? { boxShadow: "0 0 0 4px var(--color-surface-highlight)" } : {}),
    },
  };

  return cloneElement(child, merged);
}
