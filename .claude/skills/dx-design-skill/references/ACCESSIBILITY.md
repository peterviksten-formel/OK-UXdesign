# ACCESSIBILITY

Accessibility is something design engineering *owns*, not something it audits later. The standard is Vercel's: no dropped frames, no cross-browser inconsistencies, and no keyboard user left stranded. Rules below are drawn from Rauno Freiberg's guidelines and Addy Osmani's Web Quality checks, which encode WCAG 2.1 into build-time behavior.

Encode quality at the point of creation. By the time you are running an audit after shipping, the work costs 10× more to fix.

## Labels and semantics

### Every icon-only interactive element has `aria-label`

A trash-can icon button with no text: screen-reader users hear nothing useful. Always label it.

```html
<button aria-label="Delete item">
  <TrashIcon />
</button>
```

### `role` and `aria` attributes on non-semantic interactive patterns

If you build a custom disclosure, tabs, menu, combobox, dialog — attach the right `role` and state attributes. `role="dialog"`, `aria-expanded`, `aria-selected`, `aria-controls`. Prefer native elements (`<button>`, `<details>`, `<dialog>`) whenever possible — they get most of this for free.

### `<img>` tags for content images, not CSS backgrounds

Screen readers can access `<img>` with `alt` text. CSS `background-image` is invisible to them. Users can also right-click an `<img>` to save or copy. Reserve `background-image` for genuinely decorative imagery (gradients, textures, patterns).

```html
<img src="/hero.jpg" alt="A mountain range at dusk" />
```

### Illustrations built from HTML carry `aria-label`

If an "illustration" is a composed `<div>` structure (think: a fake UI mockup in a marketing hero), add `aria-label` to the container and `aria-hidden="true"` to the decorative children. Otherwise a screen reader reads the raw DOM and it makes no sense.

## Focus

### `box-shadow` for focus rings, not `outline`

`outline` does not respect `border-radius`, so it produces square rings around rounded buttons. `box-shadow` with a second shadow layer or `outline-offset` with care can work, but `box-shadow` is the reliable cross-browser choice.

```css
button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--focus-ring);
}
```

Use `:focus-visible`, not `:focus` — this shows the ring on keyboard focus but not on mouse click, which is the correct behavior.

### Focus is always visible and always sequential

`tabindex="-1"` only on truly non-tabbable elements. Never `tabindex="0"` on non-interactive content. The tab order should follow reading order; if you find yourself using `tabindex` to fix tab order, the DOM order is wrong.

### Modals trap focus; closing restores it

When a modal opens, focus moves into the modal and is trapped there (Tab stays inside). When it closes, focus returns to the element that triggered it. Libraries like `@radix-ui/react-dialog` do this correctly — use them rather than rolling your own.

## Keyboard navigation

### Sequential lists support ↑ ↓ arrow navigation

Any list of items a user might iterate (search results, inbox, autocomplete, file tree) supports arrow keys. Home/End jump to first/last. Enter activates.

### ⌘ Backspace deletes focused item

If an item is deletable, ⌘⌫ (macOS) / Ctrl+⌫ (Windows) deletes it from keyboard focus. Pair with a toast + undo for reversibility.

### Escape closes overlays

Modals, popovers, drawers, menus — all close on Escape. This is a user expectation so consistent that violating it feels broken.

## Disabled states

### Disabled buttons have no tooltips

Tooltips on disabled elements are inaccessible to screen readers and keyboard users: you can't focus the disabled element, so you can never trigger the tooltip. If you feel the need to explain why a button is disabled, don't disable it — instead, show the obstacle another way (inline error, a banner, a popover on a different element).

A common good pattern: keep the button enabled, but on click show a message explaining what's missing, rather than disabling the button and leaving the user to guess.

### Disabled controls have a visible distinction beyond just color

Color alone fails for colorblind users and in high-contrast modes. Combine: reduced opacity, cursor change, and (ideally) a small icon or label change.

## Text, color, and contrast

### WCAG AA minimum; AAA for body text

4.5:1 for body, 3:1 for large text (≥ 18.66px bold or ≥ 24px regular). Tools: Chrome DevTools color picker, axe, Lighthouse.

### Gradient text unsets gradient on `::selection`

Text with a CSS gradient becomes unreadable when selected (the selection color fights the gradient). Reset it:

```css
.gradient-text::selection {
  background: var(--selection-bg);
  color: var(--selection-color);
  -webkit-background-clip: unset;
  background-clip: unset;
  -webkit-text-fill-color: unset;
}
```

### Respect `prefers-contrast` and `prefers-color-scheme`

If you ship a dark mode, honor `prefers-color-scheme`. If you have a high-contrast variant, honor `prefers-contrast: more`. These are free accessibility wins.

## Motion

See `MOTION.md` for the full story. The accessibility-critical rule: every decorative animation respects `prefers-reduced-motion: reduce`.

## A short accessibility self-check

1. Does every icon-only button have `aria-label`?
2. Are focus rings visible and implemented with `box-shadow`?
3. Do modals trap focus and restore it on close?
4. Does Escape close every overlay?
5. Do lists support arrow-key navigation?
6. Are disabled buttons free of tooltips?
7. Are all content images `<img>` with `alt`, not CSS backgrounds?
8. Does the page meet WCAG AA contrast?
9. Is `prefers-reduced-motion` respected?
10. Does Tab order follow reading order without `tabindex` hacks?
