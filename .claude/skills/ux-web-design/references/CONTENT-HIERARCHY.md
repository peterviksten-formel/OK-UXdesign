# Content Hierarchy & UX Writing

Visual hierarchy is not decoration. It is a promise to the user about what matters, in what order. A user who scans your page and finds that the biggest thing is the thing they actually needed most will trust every subsequent page. A user who finds the biggest thing is a hero image of someone smiling at a laptop will assume you don't know what they're here for.

This file covers two tightly linked concerns: the visual structure that guides the eye, and the copy that does the thinking for the user. Neither works without the other.

## The reading order contract

For most web pages, the user's eye should move in this order:

1. **Primary headline** — what is this?
2. **Supporting context** — why should I care, in one sentence?
3. **Primary CTA** — what do I do next?
4. **Secondary information** — details, specs, alternatives.

If your page is pulling the eye in a different order, the hierarchy is working against you. Three common signs:

- The user's eye goes to the hero image before the headline.
- The user's eye lands on the nav or the sticky banner before the page content.
- The user's eye hits two CTAs at once and cannot tell which is primary.

## Visual hierarchy rules

**Size differences must be significant, not incremental.** H1 and H2 that differ by 10% read as the same level. Users need roughly 1.5x–2x size differences to perceive hierarchy at a glance.

**Weight differences compound size.** A 32px bold heading reads as more dominant than a 40px regular heading. Use weight to distinguish roles even when sizes are close.

**Contrast carries attention.** High-contrast elements pull the eye. The primary CTA should have the highest contrast on the page within its visible region. Secondary actions should have noticeably lower contrast — outlined buttons, ghost buttons, or text links, depending on priority.

**Placement anchors priority.** The primary outcome belongs above the fold in the left-to-right reading path. Hiding a core CTA "below the fold" was once a myth; mobile screens have made it real again. If users scroll past a primary CTA to a secondary one, they will pick the secondary.

**Whitespace separates groups.** Related items close together, unrelated items further apart. This is the Gestalt proximity principle, and it is the cheapest hierarchy tool available.

**One primary action per viewport.** If the user can see two "primary" buttons at once (same weight, same color, same size), neither is primary. Rank them visually.

## UX writing rules

Good UX writing does the thinking so the user doesn't have to. These rules are from Friedman's published guidelines and are widely agreed among the practitioners cited.

### Buttons

- **Length: 2–4 words, max 25 characters.** Beyond that, users skim and miss.
- **Action-first verb.** "Create account", not "Account creation". "Download report", not "Here's your report — click to download".
- **Describe the outcome, not the system action.** "Save changes" (user's outcome) beats "Submit" (system action). "Book a call" beats "Proceed".
- **Avoid "Click" and "Here".** "Click here" says nothing about what will happen. The button itself is the click target.
- **Never use "Submit" except on a research survey.** It tells the user nothing about what submitting does.

### Links

- **Minimum 8 characters, maximum 55 characters.** Shorter than 8 is hard to click; longer than 55 no longer scans as one unit.
- **Front-load the meaningful words.** "Pricing for teams" beats "Click here for pricing information for teams".
- **Never link the words "here" or "this".** Link the descriptive phrase.
- **Distinguish links from buttons visually and semantically.** Links navigate; buttons act.

### Headings

- **Front-load the keyword.** Users scan the first 2–3 words. "Pricing" as the first word beats "Our transparent pricing" where "our" wastes the scan.
- **Describe the content, not the brand.** "How it works" is weak; "How [product] onboards your team in 10 minutes" is stronger.
- **Sentence case reads faster than Title Case** for most audiences. Use Title Case sparingly, for navigation and component labels.
- **Do not replace headings with images.** Text is scannable, searchable, translatable, and accessible. Images of text are none of these.

### Body copy

- **Write mobile-first: short, plain, bite-sized chunks.** Short sentences, short paragraphs, bulleted where appropriate.
- **Decide what to say, then find the shortest way to say it.** Cut every word that doesn't pay for itself.
- **One idea per paragraph.** If a paragraph contains two distinct ideas, it should be two paragraphs.
- **Use concrete nouns and strong verbs.** "Set up in 5 minutes" beats "Quick setup process". "Pay your invoice" beats "Invoice payment functionality".

### Forms

- **Labels above fields, not inside them.** Placeholder-only labels disappear on focus, fail accessibility, and force users to re-click to see what they're typing into.
- **Mark required fields, not optional ones**, unless optional is the minority. The user's default assumption should be correct.
- **Write the label as the user would say it.** "Your email" or "Email address", not "Email ID".
- **Error messages below the field, in plain red, specific.** "Please enter a valid email" is weak. "This doesn't look like an email address — did you miss the @ sign?" is better.
- **Placeholders show format examples, not instructions.** "name@company.com", not "Enter your email".
- **Never hide required information in tooltips.** If the user needs to know the password requirements, show them — don't make them hover.

### Error messages

Structure every error message as:
1. **What happened** (plain language, no blame).
2. **Why, if helpful** (skip if it doesn't help the user act).
3. **What to do next** (specific, actionable).

Example: "Your card was declined. Your bank may need to authorize the charge. You can try a different card or contact your bank."

### CTAs in context

A CTA is only as good as its surrounding context. The user must understand *what they are about to do* before they click. If the headline is clear and the CTA is specific, the user can click with confidence. If the headline is vague or the CTA is generic, the user hesitates.

**Before** — ambiguous: "Powerful tools for modern teams" / "Get started"
**After** — specific: "Project tracking that takes 5 minutes to set up" / "Create free workspace"

## The scan test

Read only the following on your page, in order, ignoring everything else:

- Every H1 and H2
- Every button label
- Every link text

If that alone conveys what the page is about and what the user should do, the hierarchy and copy are working. If it reads as a sequence of vague phrases, the page is failing.

## Common anti-patterns

- **Everything is loud.** Multiple bold colors, multiple large headings, multiple CTAs at the same weight. Nothing communicates priority.
- **Everything is quiet.** Low contrast, thin weights, uniform sizing. Users cannot find the primary path.
- **The hero is a vibe, not a pitch.** The headline sounds poetic but doesn't say what the product does.
- **The CTA is optimistic but empty.** "Let's go!" / "Join the movement" / "Get started today" — none of these describe an outcome.
- **Icons replace labels.** Icon-only buttons in the header force the user to hover or memorize.
- **Labels describe internals.** "Parameters" / "Configure integration" / "Account object" — users speak in tasks, not objects.
- **Capitalization inconsistency.** "Sign up" / "Sign Up" / "SIGN UP" across the same site.

## Rewriting patterns

When asked to improve copy, apply this sequence:

1. **Cut filler.** "Simply," "just," "easily," "powerful," "seamless," "cutting-edge" — delete unless they carry meaning.
2. **Replace abstract with concrete.** "Solutions" → "Project management". "Platform" → "The app your team opens every morning".
3. **Put the outcome before the feature.** Not "AI-powered search with semantic matching" but "Find the answer without remembering where you put it".
4. **Shorten the button.** Most buttons can lose 1–2 words without losing meaning.
5. **Verify the label can stand alone.** If the button text makes sense without the surrounding paragraph, it's working.
