import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Centra No1"', "system-ui", "sans-serif"],
      },
      fontWeight: {
        light: "300",
        book: "400",
        medium: "500",
        bold: "700",
      },
      colors: {
        // Semantic tokens — values come from CSS vars (see index.css)
        canvas: "var(--color-bg-canvas)",
        surface: "var(--color-bg-surface)",
        elevated: "var(--color-bg-elevated)",
        ink: {
          DEFAULT: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          muted: "var(--color-text-muted)",
          onbrand: "var(--color-text-on-brand)",
        },
        brand: {
          primary: "var(--color-brand-primary)",
          accent: "var(--color-brand-accent)",
          highlight: "var(--color-brand-highlight)",
        },
        tint: {
          info: "var(--color-surface-info)",
          highlight: "var(--color-surface-highlight)",
          notice: "var(--color-surface-notice)",
        },
        border: {
          subtle: "var(--color-border-subtle)",
          strong: "var(--color-border-strong)",
        },
        focus: "var(--color-focus)",
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "10px",
        md: "12px",
        lg: "16px",
        xl: "24px",
      },
      maxWidth: {
        reading: "720px",
        content: "1200px",
        wide: "1440px",
      },
      fontSize: {
        // Type ramp — design-system-centric, matches Centra No1 weight options
        eyebrow: ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.08em", fontWeight: "500" }],
        body: ["1rem", { lineHeight: "1.55" }],
        lede: ["1.125rem", { lineHeight: "1.55" }],
        h6: ["0.875rem", { lineHeight: "1.3", fontWeight: "500" }],
        h5: ["1rem", { lineHeight: "1.3", fontWeight: "500" }],
        h4: ["1.25rem", { lineHeight: "1.3", fontWeight: "500" }],
        h3: ["1.5rem", { lineHeight: "1.25", fontWeight: "500" }],
        h2: ["2rem", { lineHeight: "1.2", fontWeight: "500" }],
        h1: ["2.75rem", { lineHeight: "1.1", fontWeight: "500", letterSpacing: "-0.01em" }],
        display: ["3.75rem", { lineHeight: "1.05", fontWeight: "500", letterSpacing: "-0.02em" }],
      },
    },
  },
} satisfies Config;
