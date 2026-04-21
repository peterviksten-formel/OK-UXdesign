# Cognitive Load — How to Subtract

The central insight: every element on a page costs the user mental effort, whether or not they consciously notice. More visible options, more copy, more animation, more choice — all increase load. The most powerful UX tool is subtraction, and it is almost never applied thoroughly enough.

This file teaches you what to cut and why. It combines Friedman's five pillars of cognitive-load reduction, Krug's scanning behavior, and the practical anti-patterns that inflate load in contemporary web design.

## The scanning reality (Krug)

Before reducing load, internalize how users actually behave. These are not preferences to design around — they are defaults you cannot override.

- **Users do not read — they scan.** They take in headings, links, buttons, and bold words. Body paragraphs are often skipped entirely on first pass.
- **Users do not make optimal choices — they take the first reasonable option.** If the first plausible button looks like it might work, they click it, even if there's a better one two rows down.
- **Users do not figure out how things work — they muddle through.** They use trial and error, form hypotheses, and rarely read instructions. Pages that require reading to use are pages that fail.

The design consequence: if the first plausible path on your page is wrong, users will still take it. Make the right path the most obvious path.

## Friedman's five pillars

Apply these in order. Each catches a different cause of load.

### 1. Beware oversimplification

Reducing the visible UI is not the same as reducing load. Strip away useful context — labels, secondary info, signposts — and the user now has to construct the context themselves, which costs *more* than seeing it would have.

Signs you have oversimplified:
- Icon-only controls that require hovering or tapping to understand.
- Form fields with placeholder-only labels that disappear on focus.
- "Clean" pricing tables with no feature labels, forcing the user to guess what $29 buys.
- Headings stripped of context ("Fast" instead of "Fast to deploy").

Fix: restore the minimum context needed for a user to make the next decision without guessing.

### 2. Make choices more manageable

Every visible choice point competes for attention. The user's cost is not linear in the number of options — it is worse.

Tactics:
- Limit visible options per decision point. Long menus should be categorized, searchable, or progressively disclosed.
- Default to the most-likely-correct option for the user.
- Hide rarely-used options behind "More" or "Advanced" controls, not on the main screen.
- Present choices in order of likely preference, not alphabetical, unless the audience is searching by name.

### 3. Create order around a task

Break complex flows into sequential, focused steps. Each step should ask one question or confirm one thing.

Good patterns:
- Signup → confirm email → choose plan → first action, each on its own screen.
- Multi-step forms with progress indicators, grouped by purpose (account info / shipping / payment), not by field type.
- Confirmation screens that separate "did this work?" from "what's next?"

Anti-patterns:
- Single forms that ask twelve fields worth of unrelated information at once.
- Wizards where the step count is hidden and the user cannot see what remains.
- Flows that branch early and invisibly, so the user cannot predict what comes next.

### 4. Use consistent, familiar patterns

Unfamiliar interaction patterns require learning. Learning costs load. Familiar patterns cost nearly zero.

Check:
- Does the page use common web conventions (logo links home, search is top-right or top-center, cart icon in header)?
- Do controls look like the controls users have seen elsewhere? A filter drawer should look like a filter drawer.
- Are novel metaphors introduced only when the existing ones genuinely fail?

The cost of novelty is almost always higher than designers expect. Novelty is welcome in marketing pages for differentiation; it is a tax in functional UI.

### 5. Remove noise relentlessly

Every non-functional element dims the functional ones. This is the active subtraction work.

What counts as noise:
- Decorative imagery that doesn't carry information.
- Social-proof stacks (logos + testimonials + press + ratings) where each piece dilutes the rest.
- "Learn more" links placed next to every feature card.
- Background gradients, dividers, and ornamental lines with no semantic purpose.
- Duplicate CTAs in close proximity ("Get started" in the hero, again in the sticky header, again in the feature section).
- Stock photography that could be removed without the page losing meaning.

The subtraction test: if you remove this element, does the user lose anything they need for their current decision? If not, cut it.

## The five-second test

Open the page. Close your eyes for five seconds. Open them. Look at the page for five seconds, then close your eyes again.

Now answer:
- What is this page offering?
- What is the first action I could take?
- Where am I in the broader site?

If any answer is "I'm not sure", the hierarchy is broken and load is too high.

## Common sources of invisible load

These appear clean but cost the user heavily. Watch for them.

- **Dense navigation.** More than 7 items in a top bar forces re-scanning on every visit.
- **Mega-menus that open on hover.** Load is paid on every accidental hover.
- **Carousels on product pages.** Users don't know how many slides exist or what they'll miss.
- **Modals stacked on modals.** Each level of nesting doubles the mental model.
- **Branded terminology in navigation.** "Spaces," "Workflows," "Canvases" — if they aren't self-explanatory to a first-time visitor, they cost load forever.
- **CTAs that shift meaning depending on context.** "Get started" means something different in the hero than in the footer — the user must re-parse each time.
- **Animation on frequent actions.** Each animation demands attention the user didn't choose to give. Reserve motion for rare, meaningful events.

## The cutting exercise

When a page feels busy, use this prompt:

> If I could only keep 60% of what's on this page, what would I cut first?

Then actually cut it — in the recommendation, if not in the code. Users almost never miss what was removed. They almost always thank you for what remains.

If the page still feels busy after 40% removal, cut more. The stopping point is: every remaining element is clearly serving the primary outcome, and the primary action is the most visually dominant thing.

## When load is not the problem

Not every slow or confusing page is a load problem. Before prescribing subtraction, rule out:

- **The outcome is wrong.** The page is clear but the CTA leads somewhere the user doesn't want to go.
- **The audience is wrong.** The page is fine for experts but this is a first-time user's landing page.
- **The hierarchy is inverted.** There's a reasonable amount of content, but the visually dominant thing isn't the primary thing. That's a CONTENT-HIERARCHY problem, not a load problem.
- **The labels are wrong.** Load looks high because nothing is self-evident, but the content volume is fine. Fix the copy before cutting elements.

Name the right problem before prescribing the cut.
