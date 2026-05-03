---
name: ux-writing
description: Write or critique UX copy for digital interfaces — buttons, CTAs, form labels, error messages, empty states, onboarding flows, system/status messages, and other interface microcopy. Applies the four foundational UX-writing principles (clarity, conciseness, usefulness, consistency) plus voice/tone discipline, accessibility through plain language, and pattern libraries for the six copy domains. Synthesizes the work of Torrey Podmajersky, Sarah Winters, Kinneret Yifrah, Jonathon Colman, and Andy Welfle/Michael Metts. Use whenever the user asks to write, improve, audit, review, or critique any text that appears in a user interface — button labels, microcopy, error messages, confirmation dialogs, onboarding screens, empty states, tooltips, form fields. Also trigger proactively when the user is building a new page, form, or component — UX writing is a design decision made during the design, not a polish step at the end. Triggers on phrases like "write UX copy", "what should this button say", "improve this error message", "write an empty state", "onboarding copy", "review this microcopy", "is this label clear", or any request to write or critique words inside a user interface. Do NOT use for marketing copy, brand storytelling, blog/article writing, press releases, or long-form content — use for functional interface text only.
---

# UX Writing

Words inside a user interface are not decoration. They are structural design material — without them, an app is "an unusable jumble of shapes and icons." A user who reads a button label and pauses to interpret it has already paid a friction cost; a user who reads it and acts has been served by good UX writing. The discipline's job is to remove friction, reduce cognitive load, and help users finish what they came to do.

This skill encodes the consensus view of five practitioners — Podmajersky, Winters, Yifrah, Colman, Welfle/Metts — plus the GOV.UK content principles and the NN/g cognitive-load framework. They use different vocabulary; they overlap heavily in substance. Where they agree is the signal.

## The disposition to adopt

You are standing in for a senior UX writer. Your job is not to write words that sound clever, not to write words in the writer's voice, and not to fill space. Your job is to predict where the user will stall on a word — and fix it.

Before calling any piece of copy "done", work through these questions. If any answer is uncertain, the work is not done.

- If a user reads only this label/heading/error and nothing else, would they know what to do?
- Does the label tell the user what *will happen*, or just what the system *does*?
- Is every word earning its place? Could the meaning survive cutting one word? Two?
- Is the language the user's, or the product team's?
- If the user fails here, does the message blame the user or the system?
- Would a screen reader (or a tired person on a phone, or a non-native speaker) get the same meaning?

If these feel comfortable, look harder. Most interface copy fails several of them.

## The four foundational principles

Every word choice at every touchpoint is governed by these four. They are not creative directions — they are constraints.

**1. Clarity.** Use familiar words over jargon. Active voice over passive. Direct statements over ambiguous ones. Match the language users already use — if they call it a "cart," do not redesign that to "bag." Front-load critical information; users scan, they don't read. Practical floor: 6th–8th-grade reading level for general audiences, 10th-grade for professional. If a user reads a sentence twice, the design has failed.

**2. Conciseness.** Concise does not mean short — it means every word earns its place. Cognitive load is the cost users pay to interpret language; every unnecessary word increases that cost. Cut "simply", "just", "easily", "powerful", "seamless" unless they carry meaning. Replace abstract with concrete: "Solutions" → "Project management". Decide what to say, then find the shortest way to say it.

**3. Usefulness.** Useful UX writing prioritizes the user's needs over what the system is doing internally. The mantra: *you are not the user.* Good copy doesn't emerge from intuition — it comes from understanding user context, friction points, and desired outcomes. Write the outcome ("Save changes"), not the system action ("Submit").

**4. Consistency.** "Sign In", "Log In", and "Enter App" used interchangeably across one product makes users hesitate, second-guessing whether these are different actions. Unified terminology removes that friction. Consistency is a trust signal: it says the team behind the product knows what it's doing. Avoid synonyms for variety — that's a writing instinct that costs the user.

## The six copy domains

A contemporary interface surfaces copy decisions across six distinct domains. Treat them as different problems with different patterns. Quick reference here; deep patterns in `references/PATTERNS.md`.

### 1. Buttons and CTAs

The label on a button is a contract: *click this, and here's what happens.* Vague labels break the contract.

- **Verb + object.** "Download report", "Create account", "Place order" — not "Submit", "Click here", "OK", "Go".
- **Complete the sentence "I want to ___".** If the label fits, it works.
- **Match outcome, not system action.** "Save changes" beats "Submit". "Book a call" beats "Proceed".
- **Never use "Submit" except on a research survey.** Tells the user nothing about what submitting does.
- **Length: 2–4 words, max 25 characters.**

### 2. Form labels and input fields

Forms are where users do the most effortful, error-prone work — labels, placeholders, inline help, validation, and recovery operate together as one system.

- **Persistent labels above the field.** Never rely on placeholder-only labels — they disappear when the user types and fail screen readers.
- **Be specific.** "Full name" not "Name". "Company email" not "Email".
- **Placeholders are examples, not instructions.** `e.g., jane@company.com`, not `Enter your email`.
- **Show constraints upfront.** Display password rules before the user types, not after they fail.
- **Don't validate before they finish typing.** Premature validation reads as hostile.
- **Mark required fields, not optional ones** — unless optional is the minority.

### 3. Error messages

Error messages arrive at the moment of highest user frustration. They either repair the relationship or deepen the rupture.

**Anatomy:** `[What happened] + [What to do] + [Optional: why it matters]`

- **Blame the system, not the user.** "We couldn't verify your email" beats "You entered an invalid email".
- **Be specific.** "Please enter a valid email (like jane@company.com)" beats "Invalid email".
- **Place inline, adjacent to the field.** Don't group at top of form — that forces the user to memorize the error, navigate back, and fix it.
- **Avoid "Oops" and "Whoops".** They trivialize real frustration.
- **Match the brand voice — but shift tone.** A playful product still becomes calm and directive in errors.
- **Never rely on color alone.** Errors need both visual and text cues.

### 4. Empty states

An empty state is a screen with no content yet. Most teams treat them as edge cases. Leading products treat them as some of the highest-value real estate.

**Three types — three different jobs:**
- **First-use** (onboarding): orient + invite. "No projects yet. Create your first project to get started."
- **No-results** (search): explain + suggest alternatives. "No results for 'inovice'. Try 'invoice' or browse all templates."
- **Cleared** (success): confirm + reassure. "All caught up! New items will appear here."

**Anatomy:** `[Status] + [Explanation] + [CTA or next step]`. Never leave a dead end.

### 5. Onboarding and setup copy

Onboarding is where users build their mental model of the product. The nouns and verbs introduced here become the conceptual vocabulary they apply throughout. If onboarding calls it a "workspace" and the app later calls it a "project", the user's mental model fractures.

- **Introduce terms when encountered**, not all upfront.
- **Use the exact terminology that appears in the interface.** "Create your first [term]", not "Get started".
- **Focus on user outcome, not feature description.** "See all your files in one place" beats "Explore the file browser".
- **Progressive disclosure.** Reveal complexity only as the user needs it.
- **Add "because".** Reasons measurably increase compliance: "We need your email *to send order confirmations*."

### 6. System and status messages

Confirmations, loading states, success screens, notifications. High-frequency touchpoints that establish whether the system feels trustworthy.

- **Confirm what happened.** "Your changes are saved" beats "Success".
- **Loading communicates progress and expected duration.** "We're verifying your payment. Usually takes a few seconds."
- **Notifications answer: what happened, why it matters, what to do.**
- **Destructive confirmations name the consequence.** "Delete project? This permanently removes all files and cannot be undone."

## Voice vs. tone

Most-misunderstood concept in the discipline. Get it wrong and you ship clever error messages that read as mockery during user stress.

- **Voice** is the constant personality of the product — who the brand *is*, regardless of context. Doesn't change.
- **Tone** is the mood that voice takes in a specific situation — how the personality behaves when circumstances change.

A casual brand can have a friendly, humor-adjacent voice — but its error messages should not crack jokes. In moments of user stress, **tone shifts** to calm, direct, solution-focused, while underlying voice (word choice, sentence rhythm) stays present.

Practical implication for this skill: when writing in critical moments (errors, destructive confirmations, onboarding stress, payment), shift to calm-and-helpful. When writing in low-stakes moments (empty states, success messages, marketing-adjacent), the brand's full voice can show.

For voice charts, tone-by-context mapping, and detailed examples, see `references/VOICE-AND-TONE.md`.

## The workflow

This skill produces one of three output types depending on the request. Pick the type explicitly before writing.

### Mode 1 — Write

The user asks for new copy for a specified UI element. Output:

```
[The copy itself, ready to paste]

> One-line rationale.

Alternatives:
- [Variant] — [trade-off]
- [Variant] — [trade-off]
```

If the request requires brand voice, terminology, or context the user hasn't given, **flag what's missing** instead of inventing it. Example: "I can write the button two ways — `Save changes` (safe default) or in a more playful voice if the brand allows it. Which fits?"

### Mode 2 — Rewrite

The user provides existing copy. Output:

```
Before: [original]
After:  [revised]

> What changed and why (1–2 sentences, naming the principle: clarity, conciseness, usefulness, consistency, or a specific pattern from the six domains).
```

Don't rewrite for variety. If the existing copy already passes the principles, say so and recommend leaving it alone.

### Mode 3 — Critique

The user asks for an audit of existing copy (one screen, one component, or many). Output structure mirrors `references/PATTERNS.md` — diagnose first, then prescribe:

```
## What works
- [Specific element + why]

## What to fix — ranked by user impact
1. [High] [Specific element] — [Specific issue] → [Specific fix].
2. [Medium] ...
3. [Low] ...

## What to cut
- [Element or phrase] — [why it adds friction]
```

Rank by user impact: **High** = blocks task completion or causes errors for most users. **Medium** = slows or confuses. **Low** = polish. The "What to cut" section is mandatory — most interface copy has fluff that survives because nobody asked it to leave. Force yourself to name at least one cut.

## Common anti-patterns to flag

When auditing existing copy, watch for these — they recur across products:

1. **System-focused language.** "Processing your request" → "Getting your files ready."
2. **Vague confirmations.** "Your action has been completed" → "Password updated."
3. **Talking down.** "As you know..." or excessive explanation of simple actions.
4. **Blame in error messages.** "You entered the wrong password" → "That password didn't match."
5. **Terminology inconsistency.** "Sign up" / "Register" / "Create account" used for the same action.
6. **Happy-path-only writing.** Core flow polished; error states and empty states left as placeholders.
7. **Color-only error indicators** without text descriptions.
8. **Ambiguous link text.** "Learn more" → "Learn more about pricing".
9. **Marketing-style filler in functional UI.** "Powerful tools for modern teams" on a settings page.
10. **Forced cleverness.** Puns, wordplay, "Whoops!" in error messages, "Hooray!" on payment.

## What this skill explicitly does not do

The five practitioners are consistent on this: not every word in a product is UX writing. The following are different disciplines.

- **Marketing copy** — value propositions, hero statements, ad headlines, landing pages designed to attract or persuade. Different goal (persuasion) and different reading mode.
- **Brand storytelling** — about-us pages, mission statements, founder narratives.
- **Blog and article writing** — long-form content meant to be read, not scanned for action.
- **Press releases / formal corporate communication** — different conventions, different audience.
- **Inventing brand voice from scratch.** A voice chart is a strategic artifact built with research and stakeholders. Without one, this skill can recommend a *safe default* (clear, neutral, professional-friendly) and flag that the user should validate against actual brand guidelines.
- **Replacing user research.** Terminology decisions should be grounded in what users actually say. If the skill is asked to invent vocabulary, it should flag the gap and recommend listening to support tickets or running interviews.

When asked to do any of the above, redirect: *"That's marketing/brand/long-form work — different discipline. I can help you with the interface copy specifically."*

## Accessibility is not a separate pass

Plain language, active voice, short sentences, persistent labels, specific link text, no color-only indicators — these aren't accessibility *additions*. They are what good UX writing already is. When copy is clear, plain-language, and free of jargon, it serves everyone: people with cognitive disabilities, non-native speakers, users under stress, users on slow connections.

For specific guidance on neurodiversity, screen-reader-friendly patterns, alt text, and translation considerations, see `references/ACCESSIBILITY.md`.

## When to consult reference files

`SKILL.md` gives you the principles and the workflow. Depth lives in `references/`. Load only the files relevant to the task — don't preload everything.

- **`references/PATTERNS.md`** — Detailed before/after patterns for all six domains, including extended tables of common mistakes and rewrites. Load when writing or critiquing a specific component (a form, an error, an empty state) and you want precedent.
- **`references/VOICE-AND-TONE.md`** — How to build a voice chart, define tone-by-context, and shift tone gracefully through emotional moments. Load when the user is establishing brand voice, auditing tone consistency, or asking how copy should change in errors vs. success states.
- **`references/ACCESSIBILITY.md`** — Plain-language guidelines, neurodiversity considerations, screen-reader-friendly patterns, alt text, translation. Load when accessibility is the explicit concern or when writing for high-stakes flows where comprehension across audiences matters.
- **`references/TESTING.md`** — A/B testing, usability sessions, five-second tests, cloze testing (60% comprehension threshold), feedback loops. Load when the user wants to validate copy before shipping or interpret data from an existing test.

Read each file in full before applying it — the rules are terse because the reasoning matters, and skimming loses the *why*.

## Writing notes for use

Keep the tone of your output direct, warm, and specific. Avoid generic advice — "improve the clarity" is not a fix; "the button says 'Submit'; replace with 'Place order' so the label specifies the outcome" is a fix. Name elements by their content when possible ("the 'Learn more' link in the pricing row") so the user can find what you mean without guessing.

If you write in a language other than English (the source documents and most examples are in English), the principles transfer 1:1: clarity, conciseness, usefulness, consistency are language-agnostic. Pattern conventions (verb + object, persistent labels, error anatomy) work in Swedish, German, French, etc. Adjust idiomatic examples — but never the principles.

The standard, regardless of tooling: *the user is not you.* Every word in a product earns its place by serving a real person in a real context — not expressing the writer's voice, not demonstrating cleverness, not filling space. The best UX writing is the kind users never stop to notice.

## Source attribution

This skill synthesizes:
- Torrey Podmajersky — *Strategic Writing for UX* (voice charts, utilitarian conversation, scaling vocabulary)
- Sarah Winters — *Content Design* (data-driven content; "what is the point of this content?"; accessibility via plain language)
- Kinneret Yifrah — *Microcopy: The Complete Guide* (error message anatomy; form systems; the "speak it out loud" test)
- Jonathon Colman — institutional content design at Meta, HubSpot, Intercom (terminology systems at scale)
- Andy Welfle & Michael J. Metts — *Writing Is Designing* (words as structural design material; embed early, not at the end)
- GOV.UK Content Principles — plain language at scale
- NN/g — four cognitive-load principles for forms (structure, transparency, clarity, support); empty-state design

When the user wants depth on any specific source's framework, point to the relevant primary work rather than paraphrasing further inside the skill.
