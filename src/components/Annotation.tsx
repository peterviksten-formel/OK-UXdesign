import { Children, cloneElement, isValidElement, useEffect, useId, useRef, type ReactElement, type ReactNode } from "react";
import { useAnnotations, type AnnotationAudience } from "../lib/AnnotationContext";

type AnnotationProps = {
  label: string;
  rationale: string;
  audience?: AnnotationAudience;
  children: ReactNode;
};

/**
 * Wraps a single child element. When annotations are enabled, attaches
 * data-annotated attributes (which the global CSS picks up to draw the
 * dashed outline + numbered chip). When disabled, renders children clean.
 */
export function Annotation({ label, rationale, audience = "design", children }: AnnotationProps) {
  const id = useId();
  const { enabled, register, unregister, numFor, focus, focused } = useAnnotations();
  const elRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    register({ id, label, rationale, audience });
    return () => unregister(id);
  }, [id, label, rationale, audience, register, unregister]);

  const num = numFor(id);

  // Scroll into view when focused from the side panel
  useEffect(() => {
    if (focused === id && elRef.current) {
      elRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      const t = setTimeout(() => focus(null), 1200);
      return () => clearTimeout(t);
    }
  }, [focused, id, focus]);

  const child = Children.only(children);
  if (!isValidElement(child)) return <>{children}</>;

  if (!enabled) return <>{child}</>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const childProps = (child.props ?? {}) as Record<string, any>;
  const merged = {
    ...childProps,
    "data-annotated": "true",
    "data-annotation-num": num != null ? String(num) : "",
    "data-annotation-id": id,
    ref: (node: HTMLElement | null) => {
      elRef.current = node;
      const orig = (child as ReactElement & { ref?: unknown }).ref;
      if (typeof orig === "function") orig(node);
      else if (orig && typeof orig === "object" && "current" in (orig as object))
        (orig as { current: unknown }).current = node;
    },
    onClick: (e: React.MouseEvent) => {
      if (focused === id) focus(null);
      childProps.onClick?.(e);
    },
    style: {
      ...(childProps.style ?? {}),
      ...(focused === id ? { boxShadow: "0 0 0 4px var(--color-brand-highlight)" } : {}),
    },
  };

  return cloneElement(child, merged);
}
