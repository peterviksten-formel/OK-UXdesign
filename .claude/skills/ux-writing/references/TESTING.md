# Testing UX Copy

Most UX writers correctly identify usability testing as essential — and most underuse it in practice. *Copy that seems perfectly clear to you may be ambiguous or confusing to your audience.* Data from real users is the only reliable ground truth.

This file expands the testing concepts referenced in `SKILL.md`. Read it when the user wants to validate copy before shipping, interpret data from an existing test, or decide which method fits a specific copy decision.

## The testing toolkit

Different methods answer different questions. Pick the method that matches the question.

| Method | What it tells you | When to use |
|---|---|---|
| **A/B testing** | Which version performs better by measurable outcome (CTR, completion rate, conversion). | When you have sufficient traffic and a clearly defined success metric. |
| **Usability testing** | Why users hesitate, misinterpret, or abandon. | Always — especially for onboarding, error messages, and checkout flows. |
| **Five-second testing** | First impressions and immediate comprehension. | Headlines, primary CTAs, value propositions on landing pages. |
| **Cloze testing** | Whether users understand the intended meaning. | Dense instructional copy; legal/compliance copy that must remain accurate while being readable. |
| **Moderated interviews** | Emotional reactions, nuance, unexpected interpretation. | When you need qualitative depth, not just behavioral data. |
| **Feedback loops (in-product)** | Ongoing signals from live users. | Post-launch — embedded "was this helpful?" prompts. |

The critical limitation of A/B testing alone: it tells you *what* performed better, not *why*. Combining A/B results with usability observation gives complete diagnostic information.

## A/B testing copy

Use A/B testing when you have a measurable outcome metric, sufficient traffic to reach statistical significance, and a hypothesis about what change should affect it.

### What's a good copy A/B test

- **Single-variable change.** Test one element at a time — a button label, a headline, an error message. If you change three things at once and conversion goes up, you don't know which change caused it.
- **Clear primary metric.** Conversion rate, click-through rate, completion rate, time-to-task. Define before launching the test.
- **Hypothesis stated upfront.** "Changing the button from 'Submit' to 'Place order' will increase order completion by ≥3% because users will better understand the commitment they're making." Without a hypothesis, you can't interpret the result.

### What's a bad copy A/B test

- **Two versions that say almost the same thing** with cosmetic word swaps. The result will be statistical noise.
- **A test with no hypothesis** — running variants because "let's see what wins" usually produces ambiguous results.
- **A test on a low-traffic surface** that won't reach significance for months.
- **Running too many tests in parallel** on the same flow — you can't isolate which variable caused the change.

### Sample sizes

The sample size required depends on the baseline conversion rate, the effect size you want to detect, and your significance threshold. Online calculators (Optimizely, AB Testguide) will tell you. Rule of thumb: small effects on rare events need a lot of traffic.

### Running an A/B test

1. **Define hypothesis and metric.**
2. **Calculate sample size.** Don't peek at results before reaching it.
3. **Split traffic 50/50** (or 33/33/33 for three variants). Don't change the split mid-test.
4. **Run for a full business cycle** (usually one week minimum) to avoid day-of-week effects.
5. **Don't stop early on apparent winners.** "Peeking" inflates false-positive rates.
6. **Analyze with a statistical test** (not just point estimates). A 1.2% lift can be noise.
7. **Document the result** — including the hypothesis, the data, and the interpretation. Future writers benefit from the institutional record.

## Usability testing for copy

Usability testing tells you *why* — the diagnostic complement to A/B's *what*.

### How to test copy specifically

The mistake most teams make: they run a generic usability test and notice copy problems incidentally. To test copy specifically, design the test around comprehension and decision-making, not just task completion.

Useful prompts during a usability session:

- **"Without clicking, what do you think this button does?"** Reveals whether the label predicts the outcome.
- **"In your own words, what is this page asking you to do?"** Tests heading and CTA clarity.
- **"What would happen if you clicked here?"** Tests link affordance and label specificity.
- **"What does [term] mean to you?"** Tests terminology — especially when you suspect the product's vocabulary doesn't match the user's.
- **"Can you read this back to me?"** If they pause or stumble, the copy isn't scanning.

### What to watch for in the recordings

- **Hesitation before clicking** — the user is interpreting; the label didn't carry the meaning.
- **Re-reading** — the sentence didn't parse on first pass.
- **Backtracking** — the next screen didn't match the user's expectation from the previous label.
- **Asking the moderator** — "Wait, what does this mean?" is a copy failure even if the user eventually completes the task.
- **Talking-aloud confusion** — "I think this is...? Or maybe...?" Even if they recover, they paid a cognitive cost.

### Sample size

5 users is sufficient for catching ~85% of usability issues with a single round of testing (Nielsen). For copy specifically, 5–8 is enough for most decisions. The cost is time, not statistical significance.

## Five-second testing

Show users the screen for five seconds, then ask what it was about. Tests:

- **Headline / value prop** comprehension
- **Primary CTA** identification ("what would you click first?")
- **Visual hierarchy** ("what stood out to you?")

Useful early in the design process — before you've polished, before you've committed. If users describe the screen accurately in their own words, the structure is working. If they describe it with marketing language echoing the copy, the structure is performing brand recognition but not communication.

Tools: UsabilityHub, Loop11, Maze. Most run 50–100 participants for a few hundred dollars. Useful for objectively comparing two layouts or two heading variants without recruiting individual users.

## Cloze testing

Cloze testing measures whether users understand the *intended meaning* of dense or unfamiliar copy. Method:

1. Take a passage of copy.
2. Replace every sixth word with a blank.
3. Ask users to fill in the blanks.
4. Count correct answers (allowing for synonyms).

The 60% threshold: **if 60% or more of answers are correct on average, the passage is comprehensible.** Below 60%, users are guessing or the language is unfamiliar.

Cloze testing is particularly valuable for:
- **Onboarding flows** with conceptual content
- **Legal/compliance copy** that must remain accurate while being readable
- **Help center articles** explaining a complex feature
- **Translated copy** — does the translation preserve meaning?

### Worked example

Original: "We will send a verification code to your phone. Enter it on the next screen to continue."

Cloze (every 6th word): "We will send a verification ___ to your phone. Enter it ___ the next screen to continue."

If most users fill in "code" and "on", the copy passes. If users guess "message" and "to", the copy is comprehensible but reveals that "code" and "on" are slightly less natural than the alternatives.

## Moderated interviews

The richest method, the most expensive. Use when you need to understand:

- Why users feel uncomfortable with a phrase.
- What vocabulary users actually use to describe the product or task (terminology research).
- Whether copy lands as warm, cold, condescending, helpful — emotional dimensions A/B can't measure.
- How users from a specific demographic or audience segment react differently.

Interview protocol for copy:
- 30–60 minutes per session.
- 5–8 participants per audience segment.
- Open-ended prompts, not yes/no questions.
- Read copy aloud and ask reactions; don't just hand them a screen.
- Probe vocabulary: "what would you call this thing?"

## Feedback loops in production

After a flow ships, embed lightweight feedback mechanisms:

- **"Was this helpful?" yes/no with optional comment** at the end of help articles, error messages, or onboarding steps.
- **NPS-adjacent survey** post-task: "On a scale of 1–10, how easy was that?"
- **Free-text "anything we should improve?"** in non-disruptive moments.
- **Session recordings** (with consent and privacy-preserving setup) — watching where users hesitate.

The advantage: real users in real contexts, not lab conditions. The disadvantage: signal-to-noise is low; you need volume.

## When testing isn't worth it

Not every copy decision needs validation. Skip testing for:

- **Microcopy with obvious answers.** A button that says "Cancel" doesn't need testing.
- **Single-word changes** that don't affect meaning (synonyms within the same register).
- **Internal-only tooling** with one or two users.
- **Time-critical fixes** that are clearly improvements (changing "Submit" to "Send message" doesn't need an A/B test — ship it).

The rule: test when the cost of getting it wrong exceeds the cost of testing. For high-traffic, high-stakes copy (checkout, sign-up, primary CTA), test. For everything else, apply the principles in `SKILL.md` and ship.

## What this skill should recommend

When the user asks "should I test this?", apply this decision tree:

1. **Is the surface high-stakes** (checkout, sign-up, primary conversion)? → Test.
2. **Is it likely to be read by users in a fragile state** (error messages, payment, onboarding)? → Test, especially with usability sessions and tone validation.
3. **Is there an obvious "right answer" by the principles?** → Don't test, just ship.
4. **Is the team uncertain or in disagreement?** → Test — but to break the tie, not to validate the obvious.
5. **Is the change a small wording polish?** → Don't test. Apply principles. Ship.

When the user reports test results, help them interpret:

- **Statistically significant lift?** Did the variant test align with the hypothesis? If yes, ship the variant. If no, investigate (a result that doesn't match the hypothesis often means the hypothesis was wrong, or the metric was wrong).
- **No significant difference?** Either the change wasn't meaningful, or the test didn't have enough power. Don't interpret null results as "they're equivalent" without checking sample size.
- **Negative result?** Don't ship the variant — and write up *why* you think it lost. The institutional record matters.

The deepest principle of testing UX copy: it is the discipline of replacing your taste with the user's experience. The skill should never let user-validated copy be overridden by writer preference.
