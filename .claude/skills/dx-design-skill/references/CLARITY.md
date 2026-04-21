# CLARITY

Rules for structuring a page so it solves a problem for a person rather than displaying a set of artifacts. Drawn from Zander Whitehurst's user-centered design lens and from the shared conviction across the practitioners that **great interfaces are mostly invisible**.

Design's job is to solve a problem for a person. If the user has to think about the interface, the interface is losing.

## One primary intent per viewport

Every view in a contemporary page should answer **one question** or enable **one action**. Secondary options can be present — they should be visually subordinate.

Diagnostic: ask "what is the user trying to do on this screen?" The answer should be a single short verb phrase. If you can't produce one ("…um, browse and filter and compare and see recommendations and…"), the structure is doing too much.

When a view has a clear primary intent:
- The primary action is visually the loudest (most contrast, largest target, most prominent position)
- The secondary options are present but demoted (lower contrast, smaller, lower in the visual hierarchy)
- The tertiary options live in a menu, a drawer, or behind a "More" affordance — not on the surface

## Action-first language

Labels describe what happens, not what the thing is.

| Weak (system voice) | Strong (user voice) |
|---|---|
| Submit | Save changes |
| Confirm | Delete account |
| OK | Start free trial |
| Next | Continue to payment |
| Remove | Unsubscribe |

The user is not thinking "I want to submit." They are thinking "I want to save." Match their frame.

Exception: when the action is so universally understood that system voice is fine — "Log in", "Sign up", "Cancel". Short, verbed, concrete.

## Copy is design

Placeholder text, empty states, error messages, button labels, loading states — all design decisions, not fill-in-later tasks. A perfectly structured page with weak copy is still a weak page.

### Empty states

An empty state is a design opportunity, not an oversight. A good empty state:
- Explains what this view is for in one sentence
- Offers a clear, single next action
- Is friendly but not cutesy

```
Your inbox is empty.
[Invite teammates] or [Import from Gmail]
```

### Error messages

Error copy is written from the user's point of view, with a concrete action.

- Weak: "Error: Invalid input."
- Strong: "That email looks off. Double-check the address and try again."
- Strong: "We couldn't reach our servers. Your changes are saved locally — we'll sync when you're back online."

Never blame the user. Never expose stack traces. Always offer a way forward.

### Loading states

Loading states that last longer than ~300ms should tell the user something useful.

- < 300ms: no indicator needed — it'll feel instantaneous
- 300ms–1s: subtle spinner or skeleton
- 1s–5s: skeleton with approximate structure
- > 5s: progress indication + a hint about what's happening ("Analyzing your data — this usually takes about 10 seconds")

## If a screen needs instructional text, the structure is wrong

If you find yourself writing a paragraph to explain how to use a component, the component is failing. Redesign first; document second. This is a hard rule, and a liberating one — it forces the interface to carry its meaning.

Exceptions: genuine educational content (a tutorial, a help article, an onboarding walkthrough). These are *content*, not UI chrome.

## Cognitive load budget

Each decision you ask a user to make costs them. Minimize decisions on the path to the user's goal.

Tactics:
- Pre-fill sensible defaults (don't make the user choose a time zone if you can infer it)
- Progressive disclosure — show simple first, advanced on demand
- Group related options into fieldsets so the user processes them as one cluster, not six
- Replace multi-step forms with single-page forms where possible; they're faster and have higher completion

## Portfolios, landing pages, and product pages

A pattern Zander Whitehurst emphasizes for portfolios applies broadly to any content-driven page: **lead with the problem and the outcome**, not with screenshots, not with features, not with tool-stack lists.

The first screen of a product page should answer:
1. What does this do? (in a sentence)
2. Who is it for?
3. Why should I care?

Screenshots and feature matrices are the *evidence* — they come after the claim, not before it.

## A short clarity self-check

1. Can I state the primary intent of this view in one short verb phrase?
2. Is the primary action the most visually prominent element?
3. Do my button labels describe the user's outcome, not the system's operation?
4. Have I written the empty state, error, and loading copy, or is it boilerplate?
5. Is any instructional text really necessary, or can I simplify the structure?
6. Have I pre-filled every default I reasonably can?
7. Does the landing/product page lead with problem + outcome, not features?
