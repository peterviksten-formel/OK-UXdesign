# TOUCH

Rules for touch and responsive interaction. Touch is a distinct medium with distinct rules — patterns that work perfectly on a mouse fail quietly on a finger. Drawn from Rauno Freiberg's interface guidelines and his essay on gesture design.

## Hover is a pointer-only construct

On touch, a hover state that triggers on tap will "stick" visually until the user taps elsewhere — a bug dressed as a feature. Scope all hover styles to hover-capable pointers.

```css
@media (hover: hover) {
  .button:hover { background: var(--hover-bg); }
}
```

This is the single most common regression in AI-generated UI on mobile. Treat the `@media (hover: hover)` wrapper as mandatory.

## Input and keyboard behavior

### Font size ≥ 16px on form controls

iOS Safari auto-zooms into any input with a font-size under 16px. The zoom breaks layout, disorients the user, and requires a deliberate gesture to exit. Keep inputs at 16px or larger — use design tokens instead of ad-hoc sizes to enforce this.

```css
input, textarea, select { font-size: 16px; }
```

### No autofocus on mobile

Autofocusing an input on page load opens the keyboard immediately, which obscures half the screen before the user has oriented. On desktop, autofocus is fine; on mobile, it's aggressive. Detect and skip.

```jsx
<input autoFocus={!isMobile()} />
```

### Replace the iOS tap highlight

Safari on iOS paints a gray flash on tap. Always override it — and always pair the override with a visible custom alternative so feedback is not lost.

```css
button, a, [role="button"] {
  -webkit-tap-highlight-color: transparent;
}
button:active, a:active { background: var(--active-bg); } /* or opacity change, scale, etc. */
```

### Prevent iOS landscape zoom

```css
html { -webkit-text-size-adjust: 100%; }
```

This prevents Safari from bumping text sizes when the device rotates, which otherwise subtly breaks layouts.

## Video and media

### Autoplay requires `muted` and `playsinline`

On iOS, a video tag without `muted` and `playsinline` will not autoplay, and will instead try to enter fullscreen on user tap. That is almost never what you want for a hero video or a decorative background clip.

```html
<video src="/hero.mp4" autoplay muted playsinline loop />
```

## Custom pan/zoom components

If you build a component that handles its own pan/zoom (a canvas, a map, a custom gesture surface), disable `touch-action` so the browser doesn't try to scroll the page in parallel.

```css
.canvas { touch-action: none; }
```

Likewise, set `touch-action: manipulation` on buttons to remove the 300ms tap-delay on older mobile browsers.

## Target areas (Fitt's Law on mobile)

### Minimum target 44×44 CSS pixels

Apple's HIG floor; in practice, 48×48 is safer for thumb use. Any smaller and a decent fraction of taps miss.

### Pad the interactive area, not the icon

When an icon looks small but needs to be tappable, pad the surrounding button. The icon stays visually small; the hit area is large.

```css
.icon-button { padding: 12px; min-width: 44px; min-height: 44px; }
```

### Close dead zones between list items

As in `INTERACTIVITY.md`: use per-item `padding` rather than `gap` so the whole vertical run is tappable. On mobile this matters more because thumbs are imprecise.

## Gesture design

### Lightweight actions during gesture; destructive actions on gesture end

The principle from Rauno's essay: actions taken *during* a gesture should be reversible; actions that commit or destroy should only trigger when the gesture completes. The iOS App Switcher never deletes an app mid-swipe because the cost of an accidental deletion is too high.

Applied to web:
- Reordering a list: reorder *during* the drag (reversible)
- Swiping to delete: reveal the delete target during the swipe; only delete on release past a threshold
- Drag-to-dismiss: dismiss only when velocity or displacement exceeds a threshold at release

### Every gesture needs a clear non-gesture path

Swipe-to-delete must also have a tap-to-reveal-delete-button path. Gesture-only is an accessibility and discoverability failure.

### Haptics, sparingly

If you have access to `navigator.vibrate` or a native bridge, use a short tap-haptic only for confirmed actions (toggle flipped, item deleted). Haptics for every hover or every scroll tick become noise the user tunes out.

## A short touch self-check

1. Are all hover styles wrapped in `@media (hover: hover)`?
2. Are all inputs at least 16px font-size?
3. Have I removed the iOS tap highlight and replaced it with a visible state?
4. Do videos that autoplay have `muted` and `playsinline`?
5. Are all interactive targets at least 44×44px?
6. Do list items have `padding` instead of `gap` so there are no dead zones?
7. Do gestures only commit destructive actions at gesture end?
8. Does every gesture have a non-gesture equivalent?
