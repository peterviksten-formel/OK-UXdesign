# PROGRESSIVE DISCLOSURE & INTERACTIVE EXPLANATION

Rules for pages that carry educational or conceptual content — product explainers, onboarding flows, documentation, landing pages that teach a concept. Drawn from Bartosz Ciechanowski's method at [ciechanow.ski](https://ciechanow.ski).

The insight: **interactivity earns comprehension**. Readers who manipulate a parameter understand it. Passive reading produces surface-level recall. When a concept can be made interactive, it should be.

## Put the interactive element before the text

The conventional structure is: explain the concept, then show the diagram. Invert it. Show the interactive first, let the reader play with it for a moment, then explain what they just experienced.

A reader who has already manipulated the thing has built an intuition; the prose that follows adds precision to an existing mental model. A reader who hits a wall of text first is less curious and more likely to skim.

## Atomize into small parts

Long essays break into many small sections, each carrying **one idea**, each completable before the reader encounters the next dependency.

- Each section introduces one concept
- Each section has its own visual or interactive payload
- The reader can rest between sections and come back with the mental model intact

If you catch yourself writing a section with two independent ideas, split it.

## Visuals should speak without the surrounding text

Diagrams and interactive widgets should convey the core idea even if the reader skims past the prose. Language should be secondary to the model. If the image is uninterpretable without the paragraph, redesign the image.

Concretely:
- Label the parts of a diagram directly (not only via legend)
- Animate a concept that is best understood dynamically (orbits, waves, gradients, state machines)
- Let the reader change a parameter and see the effect live, not via "click to advance"

## Progressive disclosure in structure

Reveal complexity *after* the simpler frame is established. A reader who understands the simple case is ready for the edge case. A reader who sees all cases at once bounces.

Order:
1. The default, clean case — with a clear mental model
2. A realistic complication — once the default is understood
3. Edge cases and nuance — as they become relevant
4. Reference-grade exhaustive coverage — linked to, not embedded

Applied to product pages:
- Hero: the one-line claim
- Below hero: the single most important capability, made interactive
- Further down: secondary capabilities, one per section
- Bottom: specs, pricing, FAQ, reference content

## No wall of text before the payoff

A reader lands on a page and sees six paragraphs of prose before any visual or interactive affordance: they leave. Even for text-heavy content, the payoff should be near the top. A compelling one-sentence summary, a pull-quote, a hero image that carries meaning, or a small interactive toy.

Ciechanowski's long-form blog posts follow this religiously. The *pages* are enormous, but the *sections* are dense and quick.

## Applied patterns

### Interactive product page

- Hero has one interactive element that demonstrates the primary value
- Each feature section has its own embedded demo, not a screenshot
- Reader never has to click a "Start demo" button — the demo is always live

### Onboarding flow

- Each step teaches one concept by having the user *do* it, not read about it
- No more than 5 steps before real-use begins
- Each step can be skipped, and skipped steps are gently re-introduced in context later

### Documentation page

- Short, scannable intro (what is this, when would you reach for it)
- A working example near the top
- Deeper API reference below
- Every option is paired with a rationale ("why would I use this?")

## When not to use this approach

Not every page is educational. A settings panel doesn't need to teach; it needs to be fast and obvious. A checkout doesn't need progressive disclosure; it needs to be short. This reference applies to pages whose job is to communicate a concept, not to pages whose job is to capture a transaction.

## A short disclosure self-check

1. Is the first interactive or visual element above or near the top of the page?
2. Does each section introduce exactly one new idea?
3. Can a reader understand each visual without the surrounding prose?
4. Does complexity appear after the default case is established?
5. Is there a payoff within the first viewport (not six paragraphs in)?
6. Are the demos always live, not gated behind "Start" buttons?
