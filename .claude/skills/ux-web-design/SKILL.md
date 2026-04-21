---
name: ux-web-design
description: Evaluates and improves web pages using foundational UX principles synthesized from Don Norman, Jakob Nielsen, Jared Spool, Vitaly Friedman, and Steve Krug. Use this skill whenever the user asks to design, audit, critique, review, or improve a web page, landing page, form, navigation, hero, content hierarchy, or any user-facing web flow — including phrasings like "is this usable?", "does this page work?", "why isn't this converting?", "look at this UX", or "make this clearer for normal users". Also trigger when the user is building a new marketing page, signup flow, checkout, or content-heavy page and hasn't explicitly asked for a review — the ordinary user perspective should be proactively applied. Focus is clarity, cognitive load reduction, and usability for the general public, NOT aesthetics, motion craft, or visual design systems. Do not use for pure interaction-craft polish (see dx-design-skill), design-system token work (see material-design-3, linear-design), backend concerns, or branding/identity.
---

# UX for the Ordinary User

The north star of this skill: *the page should work for someone in a hurry who doesn't care.*

Web UX is not judged by how the page looks in a portfolio. It is judged by whether a distracted person who arrived from a search, is on a small screen, and has roughly five seconds of attention can understand what the page offers and take the next step. That user is the baseline. Everyone else is easier.

This skill encodes the accumulated judgment of five practitioners — Norman, Nielsen, Spool, Friedman, Krug — who spent careers designing for that baseline rather than for other designers. Their frameworks disagree on vocabulary and overlap heavily in substance. The overlap is the signal.

## The disposition to adopt

You are standing in for a senior UX practitioner who has seen this mistake a thousand times. Your job is not to admire the page, and it is not to rewrite it in your own taste. It is to predict where the user will stall and fix it — specifically, in the order of user impact.

Before calling any page "done", work through these questions. If any answer is uncertain, the work is not done.

- If I landed on this page cold, would I know what it is and what to do within five seconds?
- Is every interactive element obviously interactive, and every non-interactive element obviously not?
- Does each action produce immediate, visible feedback?
- Is the primary action visually dominant over secondary actions?
- Is there any copy, element, or option on this page I could remove without the user losing something they need?
- Would a user's mental model — not the company's org chart — predict where things live in the navigation?

If these feel comfortable, look harder. Most pages fail several of them.

## The five lenses

Cycle through all five when auditing a page. They overlap on purpose; where they all point at the same problem, that is the real problem.

**Norman — Can the user understand it without instruction?** Visibility, feedback, affordance, signifiers, mapping, consistency. The most violated Norman warning on contemporary web: *sleek and simple does not mean intuitive*. Stripping UI for aesthetic minimalism regularly hides signifiers, removes affordances, and collapses feedback. Ghost buttons, invisible form borders, icon-only controls without labels — these are the usual suspects.

**Nielsen — Does it pass the 10 heuristics?** Visibility of system status, match with the real world, user control and freedom, consistency, error prevention, recognition over recall, aesthetic and minimalist design, flexibility for power users, human error messages, findable help. Treat them as diagnostic questions, not rigid rules. Heuristic 7 — aesthetic and minimalist design — is often misread as "remove stuff for looks"; Nielsen means remove *irrelevant* stuff because it competes with relevant stuff. Load `references/HEURISTICS.md` when the task is an explicit audit or you need examples of how each heuristic commonly fails on the web.

**Spool — Is the user reaching their outcome?** Spool's core shift is from screens to outcomes. Before critiquing anything, name the outcome precisely: not "view the product" but "decide to buy"; not "read the docs" but "complete the first quickstart". Then ask whether every element on the page moves the user toward that outcome or distracts from it. The three-click rule is a myth — the real question is whether there is clarity, ease, and feedback at every step.

**Friedman — Is the content structure doing its job?** Visual hierarchy, UX writing, cognitive-load reduction, scannability. A user should be able to scan the page in five to eight seconds and know what it offers and what to do. If they can't, the hierarchy is broken — not the copy, not the colors, the hierarchy. Load `references/CONTENT-HIERARCHY.md` when evaluating or writing visual structure, headings, CTA copy, or body text.

**Krug — Would someone who "doesn't care" still get it?** The first law of usability: the page should be self-evident, obvious, and self-explanatory. Users do not read — they scan. Users do not make optimal choices — they take the first reasonable option. Users do not figure out how things work — they muddle through. If the page makes the user pause and think about what to do, the design has already failed. Krug's most under-applied principle: **edit aggressively**. Remove marketing language, remove introductory filler, remove anything that does not serve the user's next decision.

## The six principles

These are the cross-validated commitments — where all five practitioners agree. Apply these before any lens-specific analysis; they catch most failures.

**1. Cognitive load comes first.** Every element costs the user mental effort. More visible options, more copy, more animation, more decisions — all increase load. Design by relentless subtraction. Group related things, space unrelated things, limit visible options per decision, and prefer familiar interaction patterns over novel ones. Load `references/COGNITIVE-LOAD.md` when the page feels busy, the user seems overwhelmed, or you need to pick what to cut.

**2. Clarity beats cleverness, always.** The instinct to create memorable or branded language in navigation, CTAs, and headings consistently costs usability. "Explore our solutions" is worse than "See pricing." "Get started" is worse than "Create free account." Clarity is respect for the user's time.

**3. Visual hierarchy is a user contract.** The order in which elements draw attention is a promise about what matters. Violating it — making everything loud, or burying the primary action — loses trust immediately. There must be a significant size and weight difference between H1, H2, body, and CTA. The primary action must be visually dominant; secondary actions recede but remain discoverable.

**4. Progressive disclosure beats information dumping.** Show users what they need to decide next, not everything at once. Applies to navigation depth, form fields, product page structure, and error messages. Load `references/PROGRESSIVE-DISCLOSURE.md` when designing flows, forms, or detail/overview pages.

**5. The ordinary user is the baseline, not the edge case.** Validate every decision against the least-invested user: arrived from search, distracted, small screen, five seconds of attention. Expert users and edge cases adapt. Ordinary users leave.

**6. Feedback closes every loop.** Every action produces a visible, immediate response. Button pressed → visual state change. Form submitted → success or error state. Page loading → progress indicator. Navigation item selected → active state. Absence of feedback creates uncertainty, and uncertainty creates abandonment.

## The evaluation workflow

When this skill is invoked on a specific page, flow, or screenshot, run this sequence in order. Each step produces at least one concrete finding or an explicit "no issues found here."

1. **Define the outcome.** State what the user is trying to accomplish on this page in one sentence. If the page serves multiple outcomes, rank them. (Spool lens)
2. **Run the five-second scan test.** Pretend you have never seen the page. What do you learn in five seconds? Does it match the outcome? Where does the eye go first, second, third? (Krug + Friedman lens)
3. **Audit the hierarchy.** Does visual weight match user priority? Is the primary CTA dominant? Is supporting content recessive but legible? (Friedman lens)
4. **Step through the 10 heuristics.** For each, either flag a violation with a specific actionable fix or mark it passed. Don't skip — the value is in the discipline. Use `references/HEURISTICS.md` for depth when needed. (Nielsen lens)
5. **Apply Norman's discoverability test.** For every interactive element, ask whether its affordance and signifier are obvious to a first-time user. For every non-interactive element, check that it doesn't look interactive. (Norman lens)
6. **Cut mercilessly.** Identify at least one thing to remove. If you cannot find anything to cut, you have not looked hard enough. (Krug lens — the most under-applied principle)

Then produce output in the structure below.

## Output structure

Use this template unless the user asks for something different. It is shaped to be immediately actionable rather than comprehensive. See `references/EVALUATION-TEMPLATE.md` for a worked example.

```
## Outcome
The user is trying to: <one sentence>

## What works
- <brief, specific — do not over-praise>
- <brief, specific>

## What to fix — ranked by user impact
1. [High] <specific issue> → <specific fix>
2. [High] <specific issue> → <specific fix>
3. [Medium] <specific issue> → <specific fix>
4. [Low] <specific issue> → <specific fix>

## What to cut
- <element or copy to remove, with one-line rationale>
- <element or copy to remove, with one-line rationale>
```

The **What to cut** section matters. It is the most powerful and most ignored recommendation in web UX. Force yourself to name at least two things.

Rank user-impact by asking: how many users does this affect, how severely does it block the primary outcome, and how recoverable is the error? High = blocks primary outcome for most users. Medium = slows or confuses. Low = minor polish.

## When to consult reference files

`SKILL.md` gives you the framework and workflow. Depth lives in `references/`. Load the relevant file when the task actually touches that domain — do not preload everything.

- `references/HEURISTICS.md` — Nielsen's 10 heuristics, each with a web-specific applied example and the common ways each one is violated. Load for explicit heuristic audits or when you need to give the user a specific fix and want the precedent.
- `references/COGNITIVE-LOAD.md` — Friedman's five pillars of cognitive-load reduction, Krug's scanning laws, and practical subtraction patterns. Load when the page feels cluttered, the user seems overwhelmed, or you are deciding what to remove.
- `references/CONTENT-HIERARCHY.md` — Visual hierarchy rules, UX writing rules (button length, link length, heading front-loading), and scannability patterns. Load when structuring a new page, writing CTA or heading copy, or diagnosing "users aren't seeing the thing."
- `references/PROGRESSIVE-DISCLOSURE.md` — How to stage information so the user gets what they need for the next decision without drowning. Load when designing forms, navigation, product pages, onboarding, or error messages.
- `references/EVALUATION-TEMPLATE.md` — A fully worked audit using the output structure above, against a realistic example. Load when the user wants to see the format demonstrated, or when you're unsure how granular to be.

Read each file in full before applying it — the rules are terse because the reasoning matters, and skimming loses the *why*.

## What this skill explicitly excludes

The five practitioners are consistent on one point: the following are not UX. They are aesthetics, trends, or marketing masquerading as design. Do not optimize for them here, and if the user asks for them, redirect or name the trade-off.

- **Animation for its own sake.** Micro-interactions that don't confirm a state change cost attention without paying for it. (Motion craft lives in `dx-design-skill`.)
- **Dark patterns.** Urgency timers, pre-checked opt-ins, obscured cancellation flows, fake social proof. Never recommend, always flag when present.
- **Visual complexity as credibility signal.** Dense imagery and elaborate layouts do not make a product feel trustworthy — clarity does.
- **Novel interaction models.** Requiring users to learn a new metaphor is a tax. Pay it only when the payoff is real.
- **"Wow" moments that interrupt task flow.** Scroll-jacking, forced animations, intro splash pages — these fail the ordinary-user test.
- **Brand-voice copy in functional UI.** Clever button labels, punny 404 pages, branded loading states. They fail recognition over recall.
- **Visual design system work.** Token design, component libraries, color theming — those belong in `material-design-3`, `linear-design`, or a design-system skill.
- **Accessibility as a separate pass.** Accessibility concerns are user concerns. They surface naturally inside the heuristics (especially visibility, feedback, and recognition). For specific ARIA, focus, and keyboard guidance, defer to `dx-design-skill/references/ACCESSIBILITY.md`.

## How this skill relates to adjacent skills

This skill asks *will the ordinary user succeed on this page?*

- `dx-design-skill` asks *does the interaction craft feel professional?* — motion, touch, focus rings, form wrapping, disabled-state etiquette. It is generative; this one is primarily diagnostic.
- `material-design-3` and `linear-design` ask *does this match the spec?* — tokens, components, theming.

When a user is building a new page, these can and should run together: ux-web-design sets the outcome and hierarchy, dx-design-skill handles the interaction quality, and the design-system skill provides the vocabulary. When a user asks "is this usable?" or "why isn't this converting?", this skill runs alone.

## Writing notes for use

When producing an audit, keep the tone direct, warm, and specific. Avoid generic advice — "improve the hierarchy" is not a fix; "make the H1 3x larger than the subhead and remove the eyebrow label" is a fix. Name elements by their content when possible ("the 'Learn more' link in the pricing row") so the user can find what you mean without guessing.

When the user is building rather than auditing, apply the six principles and the output structure at the point of creation. The goal is to produce pages that pass the five-second test on the first draft, not pages that need rescuing later.

The standard is Norman's: *design must work well for people, not just look good.* Anything that improves aesthetics at the cost of usability has failed the brief.
