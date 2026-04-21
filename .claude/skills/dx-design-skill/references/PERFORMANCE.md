# PERFORMANCE

Performance is not a backend concern. It is a design decision, surfaced by the user in the form of trust: a fast page feels taken-care-of; a slow page feels neglected, regardless of how it looks. Drawn from Addy Osmani's web performance checklist and AI coding workflow.

Audit before shipping, not after a complaint.

## Ship less

The first and largest performance improvement is almost always to ship less JavaScript.

### Code-split at the route level

Every route loads only the code for that route. `import()` for anything that isn't needed on first paint. Frameworks (Next.js, Remix, SvelteKit, etc.) do this out of the box — don't subvert it by importing heavy modules at the top level of shared code.

### Lazy-load non-critical resources

- Images below the fold: `loading="lazy"`
- Secondary components (modals, charts, rich editors): dynamic import on first need
- Analytics, error tracking, chat widgets: load after main content is interactive, not before
- Fonts for characters the page doesn't use: don't ship them

### Compress aggressively

Brotli for modern browsers, Gzip fallback. Most platforms (Vercel, Netlify, Cloudflare, Nginx) handle this automatically — verify it's actually on by checking the `Content-Encoding` response header.

### Serve modern JavaScript to modern browsers

ES2020+ to browsers that support it. Transpilation down to ES5 bloats bundles significantly for browsers that never needed it. `browserslist` config + modern build tooling covers this.

## Loading strategy

### Never block initial render with synchronous data fetching

If a route does `await fetch(...)` server-side before responding, every user sees that latency. Stream what you can. Fetch critical data in parallel, not serial. Defer non-critical data until after hydration.

### Preload what you know you'll need

- Critical fonts: `<link rel="preload" as="font" ...>`
- Above-the-fold hero image: `<link rel="preload" as="image" ...>` or `fetchpriority="high"`
- Next-likely route: `<link rel="prefetch">` on idle

### `font-display: swap` or `optional`

Never let a font block text rendering. The three usable strategies:
- `swap`: render fallback immediately, swap in the custom font when it loads (safest default)
- `optional`: render fallback, only swap if the font is ready quickly (best for secondary text)
- `fallback`: in between — short blocking period, then give up

Never `block` in production. "Invisible text while we wait for the font" is a performance regression disguised as a style choice.

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/inter.woff2') format('woff2');
  font-display: swap;
}
```

## Keep the DOM flat

Deeply nested DOM trees slow CSS matching, layout, and JS traversal. Addy Osmani's cardinal rule: *flat is fast*.

- Prefer semantic groupings (`<section>`, `<nav>`, `<article>`) over chains of `<div>` wrappers
- Avoid styling-driven extra layers — CSS Grid and Flexbox can usually collapse two or three wrappers into one
- Virtualize long lists (`react-virtual`, `@tanstack/virtual`, `react-window`) — don't render 10,000 DOM nodes when the viewport shows 30

## Keep the GPU quiet

### Animate `transform` and `opacity`, not layout properties

`transform` and `opacity` are composited on the GPU — they don't trigger layout or paint. Animating `top`, `left`, `width`, `height`, `margin`, `padding` triggers layout on every frame and jank is almost certain.

### Pause animations when off-screen

Repeated from `MOTION.md` because it matters for performance as much as for polish. IntersectionObserver + `animation-play-state` on every looping or scroll-driven animation.

### Avoid CSS filters and backdrop-filter on large areas

`filter: blur(...)` and `backdrop-filter: blur(...)` are beautiful and expensive. Scope them to small regions; avoid applying them to full-viewport elements on low-end devices.

## Images

### `<img>` with `width`, `height`, `loading`, and `decoding`

```html
<img
  src="/hero.jpg"
  width="1200"
  height="800"
  alt="Hero"
  loading="lazy"
  decoding="async"
/>
```

- `width` and `height` reserve space so the page doesn't shift on load (CLS)
- `loading="lazy"` for below-the-fold images; omit for above-the-fold
- `decoding="async"` keeps decoding off the main thread

### Serve the right format and size

AVIF or WebP with JPEG/PNG fallback. `srcset` for responsive sizes. A 3000×2000 photo served to a mobile viewport is 95% waste.

## Measure

The skill's job is to default to performant patterns. The user's job (or the CI's) is to verify. Claude should surface performance issues during the build loop, not in a separate review pass.

Tools to reach for:
- Lighthouse / Pagespeed Insights for Core Web Vitals
- Chrome DevTools Performance panel for runtime profiling
- Bundle analyzers (`webpack-bundle-analyzer`, `vite-plugin-visualizer`)
- `web-vitals` JS library to measure in the field

Core Web Vitals targets:
- LCP (Largest Contentful Paint): ≤ 2.5s
- INP (Interaction to Next Paint): ≤ 200ms
- CLS (Cumulative Layout Shift): ≤ 0.1

## A short performance self-check

1. Is the initial JS bundle code-split at the route level?
2. Is every below-the-fold image `loading="lazy"`?
3. Are images served with explicit `width`/`height` to prevent CLS?
4. Do all fonts have `font-display: swap` or `optional`?
5. Are animations on `transform`/`opacity`, not layout properties?
6. Do looping animations pause off-screen?
7. Is the DOM reasonably flat (no 15-deep nesting for styling)?
8. Is long-list content virtualized?
9. Are non-critical scripts (analytics, chat) deferred until after main content is interactive?
10. Have I actually run Lighthouse, or am I guessing?
