# Accessibility in UX Writing

Accessible UX writing is not a compliance pass. It is what good UX writing already is. When copy is clear, plain-language, and free of jargon, it serves everyone: people with cognitive disabilities, non-native speakers, users under stress, users on slow connections, users on small screens, users with low literacy.

The accessibility argument made precisely (Sarah Winters): *if the words you write for someone aren't accessible to everyone, you've made a design choice that prevents people from using that thing.*

This file expands the accessibility considerations referenced in `SKILL.md`. Read it when accessibility is the explicit concern, when writing for high-stakes flows where comprehension across audiences matters, or when designing for neurodiverse users.

## Plain language as accessibility

Plain language is the single highest-leverage accessibility practice in UX writing. It serves cognitive disabilities, non-native speakers, and users under stress simultaneously.

### Core practices

- **Short sentences.** Aim for 15–20 words on average. Sentences over 25 words become hard to parse on a phone, hard to remember, hard for screen readers to chunk.
- **Familiar words.** "Find out" beats "discover". "But" beats "however". "Help" beats "assist". "Use" beats "utilize". The shorter, more common word almost always wins.
- **Active voice.** "Save your file" beats "Your file will be saved". Active voice tells the user who is doing the action.
- **No idioms or regional expressions in functional copy.** "Hit the ground running", "let's circle back", "low-hanging fruit" — invisible in casual speech, invisible in marketing, opaque in functional UI for non-native speakers and literal-minded readers.
- **Reading level**: 6th–8th grade for general audiences, 10th grade for professional. Tools like Hemingway Editor or built-in readability analyzers help calibrate.

### Specificity

Vague labels and instructions are an accessibility cost. The user has to *infer* — and inference is the cognitive load that disproportionately taxes users with cognitive disabilities, users under stress, and non-native speakers.

| Vague | Specific |
|---|---|
| Take action | Send invoice |
| Learn more | Learn more about pricing |
| Click here | Read the privacy policy |
| Submit | Send your application |
| Continue | Save and continue to payment |

## Screen-reader-friendly patterns

Screen readers do not see visual layout. They read the DOM in order, often jumping by headings, links, and form fields. Copy that depends on visual context fails.

### Specific link and CTA text

The most common screen reader failure: a screen reader user listens to a list of links pulled out of context — "click here, click here, learn more, learn more, click here". They have no idea what any of those links go to.

| Bad | Good |
|---|---|
| Click here for our pricing | View our pricing |
| Learn more | Learn more about how billing works |
| Read more | Read more about Project Orca |
| Here is the privacy policy | Privacy policy |
| Download | Download the Q3 financial report (PDF, 240 kB) |

Rule: the link text alone, read out of context, should describe the destination.

### Persistent form labels

Placeholder-only labels are a screen-reader and cognitive-accessibility failure. Many screen readers skip placeholder text entirely; users with working-memory limitations cannot recover the label after it disappears.

Always: persistent label above the field, using the `<label>` element with `for=` matching the input `id=`.

### Don't depend on visual cues

Screen readers do not see color, position, or icon-only buttons.

- **Errors must include text**, not just a red border or red checkmark icon. "Email isn't valid" is read; a red border is not.
- **Success states need text.** "Saved" reads to screen readers; a green checkmark alone does not.
- **Icon-only buttons need aria-labels.** A `🗑` button is silent without `aria-label="Delete"`.
- **Status changes need announcements.** When something updates without a page reload (a search result, a saved state, a count), use `aria-live` regions so screen readers hear the change.

### Heading hierarchy is navigation

Screen reader users navigate by jumping between headings. A page with no `<h2>` structure, or with skipped levels (h1 → h4), forces them to read everything in order. Copy contributes here: heading text should describe the section's content, not be decorative.

## Alt text

Alt text is interface text. Treat it with the same craft as any other UX writing.

### Functional rules

- **Describe the function, not the appearance.** For a button-icon: "Delete" not "trash can icon". For a decorative photo: empty `alt=""` so screen readers skip it.
- **Be specific.** "Photo of woman" tells screen readers nothing useful. "Sara reviewing the Q3 spreadsheet at her desk" describes what's relevant.
- **Don't repeat surrounding text.** If the caption already says "Filbornaverket exteriör", the alt text shouldn't repeat that; it can describe the visual differently or stay minimal.
- **Length: under ~125 characters.** Most screen readers cut off longer alt text.

### Decorative vs. informational

- **Decorative** (the image is purely visual flourish — a hero gradient, a decorative pattern): `alt=""`. Empty alt tells screen readers to skip.
- **Functional** (the image is a button or link): describe the *function*. `alt="Open shopping cart"` for a cart icon link.
- **Informational** (the image conveys content not present in surrounding text): describe the content. `alt="Map of Helsingborg fjärrvärme network, showing primary lines in blue and customer connections in grey"`.

## Cognitive accessibility

Beyond plain language, cognitive accessibility considers users with ADHD, dyslexia, autism, working-memory limitations, and many other variations.

### Practices

- **Progressive disclosure for complex flows.** Don't show everything at once. Reveal complexity as the user reaches it.
- **Step-by-step guidance for multi-step tasks.** Numbered steps, clear "next" affordance, ability to go back.
- **Clear field labels reduce recall burden.** The user shouldn't have to remember what they were entering when they look down at the form.
- **Confirmation before destructive actions.** Always — never let "Delete" be a single click in a high-stakes context.
- **Avoid timers when possible.** If a flow times out, the user with cognitive disabilities or those interrupted by life events fails. Sessions can persist; auto-saves can preserve state.
- **Provide structure.** Headings, bullets, short paragraphs. A wall of text is a cognitive-accessibility failure.

### Designing for neurodiversity

New standards (2025+) explicitly address neurodiverse users. UX writing practices that help include:

- **Short sentences and high predictability** in interface language. Reduces cognitive load for users with ADHD.
- **Clear, literal instructions.** Avoids misinterpretation for users with autism. "Click 'Save'" beats "Don't forget to save your work" (which can be parsed multiple ways).
- **No idioms or metaphors in functional copy.** "Pull the trigger", "draw the line", "blue-sky thinking" are opaque to literal readers.
- **Consistent labeling and structure across the product.** Predictability reduces the cognitive cost of using the product.
- **Allow user control over motion and notifications.** Some users find animation distracting or overwhelming; allow it to be turned off.

## Translation and internationalization

Copy that ships in one language often translates to many. Decisions made in the source language affect every translated version.

### Practical rules

- **Avoid culturally specific phrases.** "Ballpark figure", "back to square one", "Monday-morning quarterback" don't translate.
- **Allow space for text expansion.** German and French frequently expand English copy by 30–50%. A button that says "Save" (4 chars) becomes "Speichern" (9 chars) in German. Budget for that in your design.
- **Don't concatenate strings programmatically.** "You have %d new %s" works in English but breaks in languages with different word order, gendered nouns, or case-by-case agreement. Write full sentences for each variant.
- **Avoid clever wordplay.** Puns rarely translate. If your tagline depends on a pun, it's an English tagline only.
- **Date, time, currency, number formats** are locale-specific. Don't hardcode "12/3/2026" — let the locale render it ("12/3/2026" in US English; "3/12/2026" in most of the world; "2026-12-03" in Swedish; "3 dec 2026" formatted).

### Designing for translation review

When the source copy is translated, a reviewer (or translator) needs context to make good choices. Add comments in the source files:

```
"button.save" — verb, button label, "save current changes"
"label.email" — noun, form label, "user's primary email address"
"error.payment_declined" — apologetic but specific, suggests next step
```

The metadata helps translators avoid awkward variants and matches the brand tone across languages.

## What this skill should flag

When auditing existing copy for accessibility, watch for:

1. **Vague link text** — "click here", "here", "learn more" with no destination.
2. **Color-only state indicators** — red border without text, green check without text.
3. **Placeholder-only labels** — disappear when the user types.
4. **Long sentences** — over 25 words, especially in body or instructions.
5. **Jargon and idioms** in functional copy.
6. **Missing alt text** on functional images, or repetitive alt that copies surrounding text.
7. **Instructions that depend on visual position** — "see the box on the right" fails on mobile and screen readers.
8. **Hover-only information** — required information in tooltips that aren't accessible by keyboard.
9. **Inconsistent terminology** across screens — increases cognitive load for everyone.
10. **No skip links or keyboard navigation hints** in flows that require many tab-stops.

## What this skill should not pretend to do

This skill is not a WCAG compliance audit. It addresses copy-related accessibility — not focus order, not color contrast ratios, not keyboard trap audits, not semantic HTML structure. When the user needs full accessibility audit, recommend:

- **Automated tools**: axe DevTools, Lighthouse, WAVE.
- **Manual review**: keyboard-only navigation, screen reader (NVDA, JAWS, VoiceOver) walk-through.
- **User testing with disabled users** — the only ground truth.

Copy can pass every plain-language check and still ship in a product that fails screen readers due to bad markup. Accessibility is a system, not a prose pass.
