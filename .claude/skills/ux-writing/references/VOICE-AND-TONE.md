# Voice and Tone

Voice and tone are the most commonly misunderstood concepts in UX writing. Get them confused and you ship clever error messages that read as mockery during user stress, formal success messages that feel cold, or brand inconsistency across screens written by different writers.

## The distinction

**Voice** is the constant personality of the product — who the brand *is*, regardless of context. It reflects core values, culture, and attitude. It does not change.

**Tone** is the mood that voice takes in a specific situation — how the personality behaves when circumstances change. It changes by context.

A useful analogy: a doctor has one voice (their personality, their way of speaking) but shifts tone constantly through a single appointment — warm when greeting a patient, calm when delivering a diagnosis, direct when prescribing, gentle when discussing prognosis. They are recognizably the same doctor. But the *tone* matches the moment.

Slack has a casual, humor-adjacent voice — but its error messages do not crack jokes. Its onboarding is friendly; its connection-failure messages are direct and helpful. Same voice, different tone. Same writer, different choices.

## Why this matters for UX writing

Tone-deaf copy is one of the most common product complaints in usability sessions. "It feels like the app is making fun of me" usually means the brand voice survived intact into a moment where the *tone* should have shifted. The user lost their work, or got their card declined, or hit an outage — and the system said "Whoops! Something went sideways!" instead of acknowledging the friction.

The fix is not to write *blander* copy. It is to define how voice **expresses itself** across emotional contexts.

## Building a voice chart

A voice chart is the structural artifact that makes consistent UX writing possible across a team larger than one person. It has six parts.

### 1. Define brand values and personality

Two or three sentences. What does the brand stand for? What do users feel after interacting with it? Avoid generic adjectives ("innovative", "best-in-class"). Reach for the specific feeling.

> Example: "We help small business owners feel competent, not overwhelmed. They should leave each interaction feeling like a sharp operator — even on bad days."

### 2. Map voice dimensions (3–5 adjectives, each with a "but not")

The "but not" qualifier is the most important part. Without it, "friendly" can mean "cloying"; "confident" can mean "arrogant".

| Voice dimension | Means | But not |
|---|---|---|
| Friendly | We greet users warmly; we use contractions; we sound human. | Overly casual or fake-buddy. We don't say "Hey buddy!" |
| Confident | We make claims we can support; we don't hedge unnecessarily. | Arrogant. We don't say "Obviously" or "Of course". |
| Direct | We say what we mean in the fewest words. | Curt or cold. We use complete sentences. |
| Empathetic | We acknowledge user effort and frustration. | Patronizing. We don't say "Don't worry, this is easy!" |

### 3. Define the audience

Not just demographics, but what they care about, how they want to feel, what vocabulary they use. This is where listening to support tickets and usability sessions feeds directly into the voice chart.

> Example: "Our users are small business owners aged 30–55. They are competent at their craft but anxious about admin. They've been burned by accounting software before. They want a tool that respects their intelligence and doesn't waste their time."

### 4. Map emotional contexts

This is where voice meets tone. Identify the moments that recur across the product, and define how tone shifts at each.

| Emotional context | Tone | Example phrasing |
|---|---|---|
| Onboarding (new user, low confidence) | Encouraging, calm, light | "Welcome — let's set up your first invoice. Takes about a minute." |
| Success (low stakes) | Warm, brief | "Your changes are saved." |
| Success (high stakes — payment, send) | Reassuring, specific | "Order placed. Confirmation sent to your email." |
| Error (user mistake) | Calm, helpful, system-blaming | "That email didn't match — check for typos or [reset password]." |
| Error (system failure) | Apologetic, transparent, actionable | "We're having trouble loading your data. Refresh, or try again in a minute." |
| Destructive confirmation | Direct, consequence-naming | "Delete project? This permanently removes all 24 files." |
| High-effort moment (form, complex flow) | Supportive, brief, specific | "One more step — confirm your shipping address." |
| Empty state (low stakes) | Warm, inviting | "No projects yet. Create your first to get started." |
| Empty state (no-results, mid-stakes) | Helpful, suggestive | "No results for 'inovice'. Try 'invoice' or [browse all]." |

### 5. Establish micro rules

Specifics that survive across writers and screens.

- **Contractions**: yes / no? (Yes = warmer, no = more formal.)
- **Emojis**: yes / no? Where? (Notifications? Success messages? Never in errors.)
- **Exclamation marks**: cap at one per screen? (Common rule: never in errors, sparingly elsewhere.)
- **Address**: "you" or the user's name? (Almost always "you".)
- **Capitalization**: sentence case on everything except brand names? (Usually yes; sentence case scans faster than Title Case for body and labels.)
- **Numerals**: spelled out under 10, digits 10+? Or always digits? (Pick one and apply consistently.)
- **Currency, dates, times**: locale-specific format. Define which locale is canonical and how it adapts.

### 6. Distribute and govern

The chart only works if writers and designers actually use it. Tactics:

- Embed it where copy gets written (Figma plugin, design system page, Notion linked from the design file).
- Pair the chart with a **non-examples** section: "We do not say…", "Avoid…". Often easier to onboard a new writer with the failure modes than the rules.
- Audit periodically — pull a month of new copy, check it against the chart, surface drift.

## Tone shifts through the user journey

A single user task crosses multiple emotional contexts. The voice stays constant; the tone shifts.

> Example: a user signs up, fills in onboarding, creates their first project, and then encounters an error.
>
> 1. **Sign-up screen** (low stakes, anticipation): warm, inviting tone. "Welcome — let's get your first project up and running."
> 2. **Onboarding form** (mild effort, requires trust): calm, supportive. "We need your email to send order confirmations."
> 3. **Project created** (success, high satisfaction): warm, specific. "Your first project is ready! Add your team or jump in."
> 4. **Error: file upload failed** (frustration, lost work): apologetic, actionable, system-blaming. "We couldn't upload that file — looks like the connection dropped. Try again, or [save a draft] so you don't lose your work."

Same voice. Four different tones. Each tone match the user's emotional state at that exact moment.

## When in doubt: shift toward calm

The default fallback when the right tone is unclear: shift toward calm and helpful, away from playful or clever. Calm copy rarely offends; clever copy can land badly.

The "speak it out loud" test (Yifrah): read the copy aloud as if you were saying it to a real person in the user's situation. If you cringe, would feel like a robot, or would feel patronizing, the copy is wrong. Plain enough that you'd say it to a friend, neutral enough that you wouldn't mind if the user is having a bad day.

## Auditing tone consistency at scale

For products with hundreds of strings written by many writers across many surfaces, tone drift is inevitable. Practical audit tactics:

- **Pull all error messages into one spreadsheet** — read in sequence. Tone inconsistency is obvious when you see them side by side.
- **Compare success messages across features** — same product but "Saved!" vs "Update successful." vs "Your changes have been recorded." reads as different products.
- **Compare onboarding to in-product copy** — onboarding tends to be over-friendly; in-product can drift formal. Bringing them into the same register builds trust.
- **AI-assisted audit** — feed the voice chart and a batch of strings into a model and ask it to flag tone inconsistencies. Human review the output, but the AI catches more than a human alone in the same time.

## What this skill recommends when no voice chart exists

If the user asks for copy and there is no voice chart, this skill should:

1. **Default to calm-and-clear**: short sentences, contractions allowed, sentence case, no exclamation marks, no jokes, no jargon.
2. **Flag the gap explicitly**: "I'm writing in a safe, neutral voice because no voice chart was provided. If your brand has a specific voice, share the guidelines or examples and I can match them."
3. **Offer alternatives** in 2–3 voice registers if it helps the user pick: "I wrote this neutral; here's a slightly warmer variant and a slightly more formal variant. Which fits?"

Never invent a brand voice. That is a strategic decision that requires research and stakeholder buy-in, not an LLM heuristic.
