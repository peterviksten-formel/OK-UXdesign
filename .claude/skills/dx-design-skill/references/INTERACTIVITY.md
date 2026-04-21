# INTERACTIVITY

Rules for forms, inputs, buttons, menus, and the behavior layer that separates competent UI from professional UI. Drawn primarily from Rauno Freiberg's *Web Interface Guidelines* and *Invisible Details of Interaction Design*.

## Forms and inputs

### Wrap inputs in `<form>`

Every input that represents user intent goes inside a `<form>`. Enter-to-submit is deeply learned muscle memory on the web; inputs outside a form break it silently. This is free and there is no excuse.

```html
<form onSubmit={handleSubmit}>
  <input type="email" name="email" required />
  <button type="submit">Sign in</button>
</form>
```

### Use the correct `type`

`type="email"`, `type="password"`, `type="search"`, `type="tel"`, `type="number"`, `type="url"`. The right type activates the right mobile keyboard, the right validation, the right autofill, and the right accessibility affordances. `type="text"` for everything is a tell.

### Prefix and suffix icons are absolutely positioned

Don't place an icon *beside* the input with flex and call it a day. Absolutely-position the icon inside the field with sufficient padding so the input still reads as a single unit. This also lets the focus ring wrap the whole thing cleanly.

```css
.input-wrap { position: relative; }
.input-wrap input { padding-left: 2.25rem; }
.input-wrap .icon { position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%); pointer-events: none; }
```

### Toggles take effect immediately

No "Save" button for a toggle. Flip the state the moment the user clicks. Toggles that need confirmation are not toggles — they are actions, and should be styled as buttons.

### Disable buttons after submit to prevent duplicate requests

Submit handlers flip the button to disabled until the network call resolves. Double-submits on flaky networks create duplicate records and duplicate charges. This is a correctness issue, not an aesthetic one.

### Dropdown menus open on `mousedown`, not `click`

`click` fires on pointer-up; `mousedown` fires on pointer-down. The one-frame difference is the difference between a menu that feels instant and one that feels laggy. This is especially noticeable on command palettes and right-click menus.

## Buttons and interactive surfaces

### `user-select: none` on interactive elements

Buttons, menu items, tabs, and similar controls should not accidentally turn into text selections when a user double-clicks or drags. Apply `user-select: none` to them.

### Decorative elements get `pointer-events: none`

Glows, gradients, blurred shapes, decorative icons — anything that sits visually over an interactive region but is not itself interactive — must carry `pointer-events: none` so it never intercepts clicks. This is one of the top three sources of "why isn't this button working?" in production.

### Eliminate dead zones between list items via `padding`, not `gap`

If items in a sequential list have `gap` between them, the space between items is unclickable. Users drift their cursor between rows and click nothing. Replace `gap` with per-item `padding` (top and bottom) so the entire vertical run is live. Fitt's Law applies: a bigger, contiguous target is faster to hit.

## Lists and sequential content

### Sequential lists are keyboard-navigable

Any list the user might iterate (search results, inbox items, autocomplete entries, file rows) supports Up/Down arrow navigation. This is table-stakes keyboard affordance.

### Deletable via ⌘ Backspace / Delete

If an item is deletable in context, ⌘⌫ on macOS (Ctrl+⌫ on Windows) performs the delete from a keyboard-focused item. Trash-can buttons are the slow path; keyboard shortcuts are the fast path.

### Focus a sensible item on enter

When a user enters a list view, focus the first item (or the last-interacted one, if state is restored). Do not leave the user's focus floating on a header or the `<body>`.

## Event handling and navigation

### No hover states that change layout

Hover effects that change font weight, font size, padding, or position cause layout shift — the page jitters as the cursor moves across it. Restrict hover effects to color, background, opacity, transform, and box-shadow.

### Block navigation during in-flight critical actions

If the user submits a form, don't let them click a sidebar link and abandon the request silently. Use `beforeunload` or an in-app confirmation for the critical cases (checkout, save-in-progress, anything with data loss).

## The Frequency–Novelty principle

Actions that are frequent and low in novelty should have no animation, or minimal animation. Frequent, functional actions (open a command menu, toggle a setting, apply a filter) deserve instant response. Rare, meaningful actions (first-time onboarding, destructive confirmation, milestone celebration) deserve appropriate flourish.

The diagnostic question to ask before adding motion: *how many times will a user see this in a week?*

- 100+ times → no animation, or < 120ms with a subtle easing
- 1–10 times → small, purposeful motion (fade, subtle scale)
- Rare/first-time → you have room for a considered entrance

If you cannot answer the frequency question, you do not yet know enough to animate it. Find out.

## A short diagnostic pass before shipping an interactive component

1. Can I submit the form by pressing Enter in any text field?
2. Does the button disable on submit and re-enable on response?
3. Do icon-only buttons have `aria-label`?
4. Can I navigate the list with arrow keys?
5. Does focus go somewhere sensible when the view opens?
6. Are decorative overlays non-interactive (`pointer-events: none`)?
7. Are dead zones between list items closed with padding?
8. Does the hover state survive on touch without becoming sticky?
9. Do menus open on `mousedown`?
10. Is the animation appropriate for the frequency of the interaction?

Ten questions. A few minutes. The difference between amateur and professional.
