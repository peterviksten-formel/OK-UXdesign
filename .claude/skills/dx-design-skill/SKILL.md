---
name: dx-design-skill
description: Design-engineering quality standards for building or reviewing web pages and UI components. Enforces interaction patterns, motion restraint, accessibility, touch behavior, typographic refinement, clarity, and performance hygiene synthesized from Rauno Freiberg, Emil Kowalski, Addy Osmani, Bartosz Ciechanowski, Raphael Salaja, and Zander Whitehurst. Use this skill whenever the user is building a new page or view, adding interactive components (forms, menus, modals, drawers, tables), writing animation or transition code, or asks to "polish", "refine", "improve", "make this feel better", "production-ready", "ship-ready", or "like a real design engineer would build it" — even if they don't explicitly ask for a design review. Do NOT use for backend-only work, data modeling, or API design.
---

# Designing Contemporary Pages

The north star of this skill: *make the interface do its job so well that nobody has to think about it.*

Great interfaces are mostly invisible. Their quality is felt in the absence of friction — a form that submits with Enter, a button that depresses just slightly on press, a modal that fades in from `scale(0.93)` not `scale(0)`, a tooltip that never appears on a disabled button. None of these details are dramatic. Together they constitute the standard.

This skill encodes that standard. It is oriented toward clarity and user experience, not visual spectacle. It is **generative** — it guides what to build — not only **auditing**. When you are producing UI code, apply these principles at the point of creation rather than bolting them on in a review pass.

## The disposition to adopt

You are standing in for a staff design engineer — the role that sits at the intersection of taste and technical execution. Your job is to own the result: design, build, and ship a solution with deliberate decisions about spacing, timing, feedback, and interaction. Taste is learnable. It is the ability to look at something and say *this is not right yet*, and keep iterating until it is.

Before you call any UI work done, ask:

- Does this animation serve the user, or is it serving the designer?
- How often will this interaction occur? Does its novelty justify a flourish?
- If a user sees this for the 500th time, does it still feel respectful of their time?
- Is this label describing what the user gets, or what the system does?
- Can this interaction be interrupted mid-gesture without breaking state?
- Is the smallest element on this page still working on a slow connection?

If you can't answer these comfortably, the work is not done.

## When to consult the reference files

`SKILL.md` gives you the core disposition. The depth — the specific rules, the defaults, the curated anti-patterns — lives in the `references/` directory. Load the relevant file(s) into context when the task actually touches that domain. Do not load everything preemptively.

- `references/INTERACTIVITY.md` — forms, inputs, buttons, menus, lists, keyboard behavior, event handling, the Frequency–Novelty principle. Load when building any interactive control.
- `references/MOTION.md` — animation durations, easing, scale values, spring physics, `prefers-reduced-motion`. Load whenever animation or transition code is involved.
- `references/TOUCH.md` — hover scoping, font-size floors, tap highlights, gesture design, target areas. Load for any responsive or mobile-facing work.
- `references/ACCESSIBILITY.md` — ARIA, focus rings, keyboard navigation, image semantics, disabled-state etiquette. Load for any user-facing UI — accessibility is not optional.
- `references/CLARITY.md` — one-intent-per-viewport, action-first labels, copy as design, cognitive load. Load when structuring a new page or view.
- `references/DISCLOSURE.md` — Ciechanowski-style progressive disclosure, interactive explanation, concept atomization. Load when the page carries educational or conceptual content (product pages, onboarding, docs, explainers).
- `references/PERFORMANCE.md` — code-splitting, lazy loading, font strategy, DOM complexity, off-screen pause. Load when shipping a new route, changing bundle shape, or adding media.
- `references/TYPOGRAPHY.md` — font smoothing, tabular numerics, weight stability, font subsetting. Load when introducing or touching text styles.

Read each file in full before writing code for that domain — the rules are terse because the reasoning matters, and skimming loses the *why*.

## Core defaults you should override before generating code

These are the most common places LLM-generated UI code quietly regresses from professional to amateur. Treat each one as a default the skill flips:

- **Linear easing on UI transitions** → use a curve. Linear feels robotic because nothing in the physical world moves at constant velocity.
- **`scale(0)` entrance animations** → start from `scale(0.93)` or higher. A near-full-size starting point feels gentle; a jump from zero is jarring.
- **Button press `scale(0.8)`** → use `0.97` or `0.98`. The job of a press animation is to say "I heard you", not to perform.
- **Hover states without `@media (hover: hover)` guard** → scope hover to pointer devices. On touch, sticky hover styles are a bug.
- **Inputs not wrapped in `<form>`** → wrap them. Enter-to-submit is the user's expectation and requires a form.
- **`outline` for focus rings** → use `box-shadow`. `outline` does not respect `border-radius`.
- **Icon-only buttons without `aria-label`** → always label icon buttons. Screen readers otherwise announce nothing useful.
- **Tooltips on disabled buttons** → never. They are inaccessible and confusing. If you need to explain why something is disabled, don't disable it — make the obstacle visible another way.
- **Interaction animations exceeding ~200ms** → cap at 200ms. Longer durations make the interface feel sluggish.
- **Fonts loaded without a `font-display` strategy** → set `swap` or `optional`. Invisible text during load is a performance regression dressed as a style choice.
- **Large initial JS bundles without code-splitting** → code-split at the route level. Send only what the current page needs.
- **Dropdown menus opening on `click`** → open on `mousedown`. The one frame of perceived latency is the difference between feeling snappy and feeling slow.
- **CSS-background images for content imagery** → use `<img>`. Screen readers can access them and users can right-click to copy.

## The Frequency–Novelty principle

The single most overlooked principle in AI-generated interfaces. Internalize it before you write motion code.

Actions that are **frequent and low in novelty** should have **no animation, or minimal animation**. A command menu a user triggers a hundred times a day does not need a spring entrance; it needs to appear instantly. An onboarding modal a user sees once deserves attention, and a small fade-in is appropriate.

When you reach for motion, ask first: *how often will this be seen?* Rare, meaningful moments earn flourish. Frequent, functional moments do not. The fastest way to make an interface feel cheap is to animate the things the user is trying to move past.

## Activation context (when this skill runs)

Treat these as strong activation signals:

- Building a new page, view, or route from scratch
- Adding or modifying interactive components: forms, menus, modals, drawers, popovers, tooltips, toasts, tables, lists, tabs, accordions, drag-and-drop
- Writing or touching animation, transition, or scroll-driven motion code
- A request to "polish", "refine", "improve", "production-ready", "ship-ready", "feel better", "feel professional", or "like a real design engineer would build it"
- Auditing or reviewing existing UI code for quality

Treat these as **non-triggers** (do not apply this skill):

- Backend-only work (API routes, database schemas, server-side logic)
- Data modeling, ETL, analytics pipelines
- CLI tools with no GUI surface
- Pure refactor tasks with no behavioral or visual change

## Suggested slash-command companions

These are suggested entry points users may ask for by name. Each corresponds to loading one or two reference files and running the relevant rules against existing code.

- `/motion-audit` — load `MOTION.md`, check durations, easing, entrance scales, reduced-motion handling, off-screen pause
- `/accessibility-check` — load `ACCESSIBILITY.md`, check ARIA, focus, keyboard, image semantics, disabled states
- `/interaction-review` — load `INTERACTIVITY.md` + `TOUCH.md`, check form wrapping, input types, hover scoping, target areas, gesture semantics
- `/performance-pass` — load `PERFORMANCE.md`, check bundle size, font strategy, DOM depth, lazy loading, off-screen animation pauses
- `/clarity-pass` — load `CLARITY.md`, check one-intent-per-viewport, label voice, copy as design, cognitive load

## How this skill relates to adjacent skills

Other UI skills tend to focus on visual aesthetics (boldness, maximalism) or pure auditing against a rule list. This skill sits at the intersection — **generative and restrained**. It is about producing interfaces that feel considered rather than decorated, and it draws its standard from practitioners who work at the product surface every day: Rauno Freiberg (Vercel), Emil Kowalski (Linear), Addy Osmani (Google), Raphael Salaja (Warp), Zander Whitehurst (Memorisely), Bartosz Ciechanowski (explorable explanations).

The goal is not prettier interfaces. The goal is interfaces that work the way a human who cares would have built them.
