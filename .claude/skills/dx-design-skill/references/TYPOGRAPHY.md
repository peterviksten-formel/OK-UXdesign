# TYPOGRAPHY

Rules for typographic refinement at the web-page level. Small details, collectively enormous. Drawn from Rauno Freiberg's *Web Interface Guidelines*.

Typography is the plumbing of a page — when it's right, the reader doesn't notice. When it's wrong, everything else struggles to recover.

## Global defaults every web page should set

Apply at the root so they compound across the whole interface.

```css
html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  -webkit-text-size-adjust: 100%;
}
```

### Why each of these

- `-webkit-font-smoothing: antialiased` — WebKit's grayscale anti-aliasing is lighter and cleaner than the default subpixel AA on macOS/iOS retina displays. Without this, custom fonts on dark backgrounds can look weirdly bold.
- `text-rendering: optimizeLegibility` — enables kerning and ligatures. A pro-level default for body text.
- `-webkit-text-size-adjust: 100%` — prevents iOS Safari from auto-enlarging text when the device rotates to landscape.

## Numerical displays: tabular figures

Any place numbers update or line up vertically — prices, timers, tables, stats, percentages — enable tabular numerals so digits don't jitter as values change.

```css
.number, .price, .timer, .table-cell {
  font-variant-numeric: tabular-nums;
}
```

Most high-quality fonts (Inter, SF Pro, Söhne, Roboto) support this. If your font doesn't, you've chosen the wrong font for a numbers-heavy interface.

## Font weight stability

### Weight must not change on hover, focus, or selection

A common AI-generated mistake: `font-weight: 500` on a link, `font-weight: 700` on hover. The added glyph width on bold triggers layout shift — the text next to it jumps. The whole line jitters as the cursor passes over.

If you want emphasis on hover, change color, opacity, underline, or text-decoration. Never weight.

```css
/* bad */
.link:hover { font-weight: 700; }

/* good */
.link:hover { color: var(--accent); text-decoration: underline; }
```

### Variable fonts can animate weight safely only with care

Variable fonts expose `font-variation-settings`. You *can* animate weight with them without layout shift if the variable font is properly configured with an `opsz` or continuous `wght` axis. For non-variable fonts, just don't do it.

## Font loading and subsetting

### Subset fonts to the character set in use

A typical web font includes thousands of glyphs. A typical English-only page uses maybe 120. Subset the font file to the characters you actually use (and a small safety margin for occasional em-dashes, curly quotes, etc.). Saves tens of kilobytes per font file.

Tools: `pyftsubset`, `glyphhanger`, or a service-side subsetter.

### `font-display: swap` (see PERFORMANCE.md)

Never block text on font load. Fallback font renders immediately; custom font swaps in when ready.

### Preload critical fonts

```html
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
```

Only for fonts used in the first paint. Preloading secondary fonts wastes bandwidth.

## Sizing, spacing, and rhythm

### Line height scales with font size

Tight line-heights (1.1–1.3) for display type; generous line-heights (1.5–1.75) for body text. A 16px paragraph with `line-height: 1.2` is cramped and hard to read.

Rough defaults:
- Display (48–96px): `line-height: 1.05` to `1.15`
- Headings (24–40px): `line-height: 1.15` to `1.3`
- Body (14–18px): `line-height: 1.5` to `1.6`
- Captions / fine print (11–13px): `line-height: 1.4` to `1.5`

### Line length (measure): 50–80 characters

Paragraphs wider than ~80 characters become tiring to read. Narrower than ~45 characters breaks rhythm. Constrain `max-width` on prose.

```css
.prose { max-width: 65ch; }
```

### Letter-spacing on display type, not body

Large type benefits from slight negative tracking; body type rarely does. At small sizes (< 14px), a tiny positive tracking can help legibility, especially on light weights.

## Selection and focus

### Custom `::selection` colors

Default selection colors are ugly and can clash with a brand. Set them:

```css
::selection { background: var(--selection-bg); color: var(--selection-fg); }
```

### Gradient text resets on selection

As in ACCESSIBILITY.md — gradient text combined with selection produces unreadable overlap. Reset gradient properties in `::selection`.

## A short typography self-check

1. Is `-webkit-font-smoothing: antialiased` set globally?
2. Is `text-rendering: optimizeLegibility` set on body text?
3. Do all numeric displays use `font-variant-numeric: tabular-nums`?
4. Does any hover state change `font-weight`? (If yes — fix it.)
5. Are web fonts subsetted to the character set in use?
6. Do critical fonts preload, with `font-display: swap` or `optional`?
7. Does body prose have `max-width: ~65ch`?
8. Are line-heights appropriate to size (tight for display, generous for body)?
9. Is `::selection` customized, and does it not break gradient text?
