# MOTION

Rules for UI motion — durations, easing, scale values, springs, and respect for user preference. Drawn from Emil Kowalski's *animations.dev* body of work and Rauno Freiberg's interface guidelines.

The core insight: **animation's job is to communicate state and afford confidence, not to entertain**. A subtle scale on button press tells the user "I heard you." That is its entire purpose.

## Duration

### Interactive motion caps at ~200ms

Button presses, hover transitions, menu opens, popover appearances — all ≤ 200ms. Longer durations make the interface feel sluggish because the user's action and the system's response drift apart.

| Interaction type | Duration |
|---|---|
| Button press, hover, toggle | 80–150ms |
| Menu / popover / tooltip open | 120–200ms |
| Modal / drawer entrance | 200–320ms (acceptable, longer than interactive) |
| Page transition | 250–400ms (rare, meaningful) |
| Onboarding / celebration | ≥ 400ms (earned by rarity) |

### Durations must match the weight of the element

A small tooltip does not take the same time as a full drawer. Small, local elements move fast; large, displacing elements move slower to feel physically credible. If in doubt, smaller = shorter.

## Easing

### Never use linear easing on UI

Linear easing feels robotic because nothing in the physical world moves at constant velocity. Every UI transition needs a curve.

| Situation | Easing |
|---|---|
| Default, most transitions | `ease-in-out` or `cubic-bezier(0.4, 0, 0.2, 1)` |
| Element entering (fade in, slide in) | `ease-out` (decelerates into final state) |
| Element exiting (fade out, slide out) | `ease-in` (accelerates out of view) |
| Gesture-driven (drag, swipe) | spring physics, not easing curves |
| Never | `linear` |

### Spring physics for gesture-driven interactions

Drag handles, swipe-to-dismiss, pull-to-refresh, rubber-banding — use spring curves. Springs have overshoot and damping, which is what makes a physical-feeling interaction feel physical. `react-spring`, `framer-motion`, `motion-one` all expose spring configs; pick one and use it consistently.

Reasonable spring defaults for UI:
- `stiffness: 300, damping: 30` — snappy, responsive
- `stiffness: 170, damping: 26` — softer, more "spring-like"

## Scale values

### Entrance animations never start from `scale(0)`

Starting from zero is jarring — the element pops into existence rather than appearing. Start from `scale(0.93)` to `scale(0.97)` for a gentle entrance that still reads as "something new arrived."

```css
@keyframes enter {
  from { opacity: 0; transform: scale(0.96); }
  to   { opacity: 1; transform: scale(1); }
}
```

### Button press scale: `0.97` or `0.98`

On `:active`, scale to `0.97` or `0.98`. Not `0.9`, not `0.8`. The job of a press animation is a tiny micro-compression that signals responsiveness, not a theatrical shrink.

```css
.button { transition: transform 80ms ease-in-out; }
.button:active { transform: scale(0.98); }
```

### Hover scale if used: `1.01`–`1.03`

If you scale on hover (most buttons should not), stay in a subtle range. Anything above `1.05` competes with the content and makes the page feel jittery.

## Looping and ambient animation

### Pause looping animations off-screen

Any animation that loops — shimmer placeholders, spinner, decorative motion — must pause when it leaves the viewport. Use `IntersectionObserver`:

```js
const observer = new IntersectionObserver(([entry]) => {
  element.style.animationPlayState = entry.isIntersecting ? 'running' : 'paused';
});
observer.observe(element);
```

Every unpaused off-screen animation is GPU work and battery spend for no user benefit.

### Scroll-driven animations gate on visibility

`scroll-timeline`, `@scroll-timeline`, IntersectionObserver-driven progress — do not run when the element is off-screen. This is the same rule as looping animations, restated for the scroll case.

## Respecting user preference

### `prefers-reduced-motion` is non-negotiable

Every decorative animation respects it. This is an accessibility requirement and it's one line of CSS.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Functional motion (e.g., a disclosure expanding so the content is reachable) should still play; a reduced-motion user still needs to understand state changes. The distinction is: decorative motion → eliminate; functional motion → minimize.

## Common motion anti-patterns to refuse

- `scale(0) → scale(1)` on entrance — start from `0.93+`
- Button press scaling to `0.8` — cap at `0.97`–`0.98`
- Linear easing on any UI transition
- Motion over 200ms on a frequent interaction (menu open, toggle, button)
- Looping animations that run off-screen
- Decorative animation that ignores `prefers-reduced-motion`
- Spring physics on a click (springs are for gestures)
- Animating `top`/`left` instead of `transform` (triggers layout, not composite — janky)
- Animating `width`/`height` instead of `transform: scale()` when visual-only change suffices

## A short motion self-check

1. Does each animation serve a clear communicative purpose?
2. Is the duration ≤ 200ms for frequent interactions?
3. Is every easing a curve (never `linear`)?
4. Do entrance animations start from `scale(0.93)` or higher, not `scale(0)`?
5. Do looping animations pause off-screen?
6. Is `prefers-reduced-motion` respected?
7. For gestures, is the motion spring-based?
8. Am I animating `transform`/`opacity`, not layout properties?
