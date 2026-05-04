import type { CSSProperties, ReactNode } from "react";

/**
 * Tiny wireframe primitives used in the variant picker.
 * Kept dumb on purpose ,  each preview is a handful of divs on a
 * 96×64 canvas. No actual content, just shape.
 */

export function SketchFrame({ children }: { children: ReactNode }) {
  return (
    <div
      className="w-full h-full p-1.5 flex flex-col gap-1 bg-canvas"
      style={{ fontSize: 0 }}
    >
      {children}
    </div>
  );
}

type BarProps = {
  w?: string | number;
  h?: number;
  tone?: "primary" | "accent" | "muted" | "line";
  rounded?: boolean;
  style?: CSSProperties;
};

export function Bar({ w = "100%", h = 3, tone = "muted", rounded = true, style }: BarProps) {
  const bg =
    tone === "primary"
      ? "var(--color-brand-primary)"
      : tone === "accent"
        ? "var(--color-brand-accent)"
        : tone === "line"
          ? "var(--color-border-subtle)"
          : "var(--color-text-muted)";
  return (
    <div
      style={{
        width: w,
        height: h,
        background: bg,
        borderRadius: rounded ? 2 : 0,
        opacity: tone === "muted" ? 0.4 : tone === "line" ? 1 : 0.85,
        ...style,
      }}
    />
  );
}

export function Row({ children, gap = 3, style }: { children: ReactNode; gap?: number; style?: CSSProperties }) {
  return <div style={{ display: "flex", gap, ...style }}>{children}</div>;
}

export function Box({
  children,
  accent = false,
  grow = false,
  style,
}: {
  children?: ReactNode;
  accent?: boolean;
  grow?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        flex: grow ? 1 : undefined,
        border: `1px solid ${accent ? "var(--color-brand-accent)" : "var(--color-border-subtle)"}`,
        background: accent ? "var(--color-surface-info)" : "var(--color-bg-surface)",
        borderRadius: 2,
        padding: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function Pill({ w = 16, accent = false }: { w?: number; accent?: boolean }) {
  return (
    <div
      style={{
        width: w,
        height: 5,
        borderRadius: 999,
        background: accent ? "var(--color-brand-primary)" : "var(--color-border-strong)",
      }}
    />
  );
}
