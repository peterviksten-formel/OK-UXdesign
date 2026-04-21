# Evaluation Template — Worked Example

This is what a good UX audit looks like using the standard output structure. Use it as a model for granularity, tone, and ranking. Notice that the findings are specific (element names, exact copy changes, exact fix), ranked by user impact, and include at least two things to cut.

Load this file when you are uncertain how granular to be, or when the user wants to see the format demonstrated before you run your audit.

## The standard template

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

## Worked example — SaaS pricing page

Imagine a pricing page with the following characteristics (you can picture this from memory — most pricing pages look like this):

- Hero headline: "Pricing that scales with your ambition"
- Sub-headline: "Simple, transparent pricing for teams of every size"
- Three plan cards: Starter ($19), Growth ($49, labeled "Most popular"), Enterprise ("Contact us")
- Each card has a feature list of 8 items in identical gray text
- CTAs on each card: "Get started" / "Get started" / "Contact sales"
- FAQ section below with 6 questions
- Logo strip of 12 company logos with the heading "Trusted by teams at"
- Sticky header with nav: Product, Solutions, Pricing, Resources, Company, Log in, Start free trial
- Footer with 40+ links in 5 columns

### The audit

```
## Outcome
The user is trying to: compare plans and decide which to buy (or which to trial).

## What works
- Three-tier structure is conventional and scannable.
- "Most popular" label on Growth gives a clear default, reducing choice paralysis.
- Prices are shown, not hidden behind a contact form.

## What to fix — ranked by user impact

1. [High] The headline "Pricing that scales with your ambition" describes a feeling, not a product. A user who arrived from search sees no confirmation they're in the right place.
   → Replace with "Pricing for [product name]" or a concrete value claim like "$19/month per user, no credit card to start."

2. [High] Both paid plans use the same CTA ("Get started"), and it tells the user nothing about what happens next. Do they pay now? Start a trial? Create an account?
   → Change Starter/Growth CTAs to "Start 14-day trial" (or whatever the actual outcome is). Use the same label on both to signal equivalence; differentiate by plan card, not button verb.

3. [High] Feature lists on each card are 8 items in identical gray text, so nothing distinguishes "Unlimited projects" from "SSO included." Users can't scan for what matters to them.
   → Bold the 2–3 features per plan that most commonly drive the decision (e.g., user limit, the signature feature, the plan-specific perk). Keep the rest plain.

4. [Medium] The FAQ section is below the fold and repeats information already in the plan cards. If the plan cards did their job, FAQ wouldn't be needed; if they don't, FAQ is too far.
   → Pull the 2 most common questions ("Can I change plans later?" "What counts as a user?") into tooltips or sub-labels on the plan cards. Remove the rest or move to help docs.

5. [Medium] Nav has 6 items + 2 auth actions = 8 targets in the header. Over the 5–7 threshold for scanning.
   → Consolidate "Solutions" and "Resources" or move one under another top-level item. "Company" rarely serves the visitor's task — consider moving to footer.

6. [Low] Enterprise card's "Contact us" creates an uncomfortable gap in rhythm. The user's mental model was "pick a plan and start"; Enterprise breaks it.
   → Either show a starting Enterprise price ("From $X/user, custom") to preserve the pattern, or make Enterprise visually distinct (different card style) so the break is intentional rather than accidental.

## What to cut
- The "Trusted by teams at" logo strip. Twelve logos on a pricing page is social proof aimed at a user who has already decided to be here — they are past that stage.
- The sub-headline "Simple, transparent pricing for teams of every size." It says nothing the three plan cards don't demonstrate more clearly, and it pushes the cards lower on the screen.
- Footer columns 3–5 for the purposes of this page. (Scope: the audit is pricing; the footer is sitewide, but if the team has discretion, deep footer links dilute attention at the decision point.)
```

## Notes on granularity

The audit above is roughly 450 words across 6 fix items and 3 cut items. That's close to the right density for a mid-size page audit. Calibration notes:

- **Single-screen pages (hero + CTA):** 3–4 fix items, 1–2 cut items is usually right.
- **Mid-size pages (pricing, product detail, landing):** 5–7 fix items, 2–3 cut items.
- **Complex pages (dashboard, settings, multi-step flow):** 7–10 fix items, 3–4 cut items. Consider splitting into sections.

If you find yourself producing 15+ fix items on a single page, something is wrong. Either the page is so broken it needs redesign (say so), or you are picking nits. Nitpicks dilute the real fixes.

## Ranking by user impact

A simple scoring rubric when you're unsure:

- **High:** Blocks the primary outcome for most users, or loses trust on first impression. Examples: broken CTA, confusing pricing, missing feedback on critical action.
- **Medium:** Slows, confuses, or frustrates users but doesn't stop them. Examples: inconsistent button labels, missing inline validation, minor hierarchy issues.
- **Low:** Polish items that matter in aggregate but not individually. Examples: a slightly-too-small label, an icon that could be clearer, inconsistent capitalization.

Put High items first. If everything is High, you haven't ranked. If nothing is High, either the page is strong or you aren't being honest.

## Tone calibration

**Too soft:** "It might be worth considering whether the headline could be a bit more specific."
**Too harsh:** "The headline is terrible and conveys nothing. Rewrite it."
**Right:** "The headline describes a feeling, not a product. Users arriving from search can't confirm they're in the right place. Replace with a concrete value claim."

Direct, specific, and paired with a fix. Not performatively humble, not performatively blunt.

## When there's no page, just a description

If the user describes a page in words rather than providing a screenshot or URL, ask for at least one of:

- A rough sketch or wireframe description (what's in each region of the page)
- The headline, sub-headline, and CTA text
- The primary user action

Without those, the audit will be generic. Generic audits are worse than no audits.

## When to break the template

Break the template when:

- The user is building from scratch and doesn't have an existing page to critique. Use the six principles and Spool's outcome-first framing to propose structure, not an audit.
- The user is asking about a specific narrow question ("is this button label good?"). Answer that question directly — don't force it into the template.
- The page has a single, dominant problem. Lead with it, then consider whether the other sections even add value.

The template serves the user, not the skill. If the template isn't serving the user, drop it.
