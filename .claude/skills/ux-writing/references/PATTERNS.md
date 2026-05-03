# UX Writing Patterns — Six Domains in Depth

This reference is the deep-dive companion to `SKILL.md`. It expands each of the six copy domains with extended patterns, before/after tables, and the reasoning that justifies each rewrite. Read the relevant section in full when writing or critiquing a specific component — the rules are terse because the reasoning matters.

## Table of contents

1. Buttons and CTAs
2. Form labels and input fields
3. Error messages
4. Empty states
5. Onboarding and setup copy
6. System and status messages

---

## 1. Buttons and CTAs

The label on a button is a contract: *click this, and here's what happens.* Vague labels break the contract and cost the user a moment of hesitation — the moment of highest abandonment risk.

### Core rule: verb + object

The label should complete the sentence "I want to ___". If it fits, it works.

| Before | After | Why |
|---|---|---|
| Submit | Send message | Specifies the actual outcome |
| Click here | Start your free trial | Motivates + describes |
| Continue | Save and continue | Tells the user what persists |
| OK | Got it / Done | Conversational, acknowledges read |
| Go | Search flights | Verb + object |
| Proceed | Place order | Names the commitment |
| Buy now | Pay $49 | If the price is known, putting it on the button measurably outperforms |

### Match outcome, not system action

Users care about what *they* are doing, not what the system is doing under the hood.

| System-focused | User-focused |
|---|---|
| Submit form | Send application |
| Process request | Get my files |
| Execute search | Search flights |
| Initiate transfer | Send $50 to Anna |

### Length

2–4 words, max ~25 characters. Beyond that, users skim and miss the meaning. If the label needs more context, the *surrounding copy* should carry it — not the label itself.

### Avoid

- "Submit" outside research-survey contexts (tells the user nothing)
- "Click here" / "Click now" (the button is already the click target)
- "Here" or "this" as link text (no meaning out of context — fails screen readers)
- Optimistic-but-empty: "Let's go!", "Join the movement", "Get started today"

### When the CTA needs personalization

Personalized CTAs measurably outperform generic ones. "Start *my* free trial" outperforms "Start free trial". Use first-person possessive when the CTA is about the user's own thing — but don't overdo it (every button as "my X" reads as gimmicky).

---

## 2. Form labels and input fields

Forms are where users do the most effortful, error-prone work. Labels, placeholders, inline help, validation, and error recovery operate together as one usability system. Get one wrong and you compromise the others.

### Persistent labels above fields

Never rely on placeholder-only labels. The placeholder disappears when the user types — they have to delete what they wrote to remember which field they're in. Fails screen readers (placeholder text is often skipped), fails working memory under stress, fails accessibility audits.

Labels go **above** the field, not inside or beside, for two reasons: above-field labels survive translation expansion (German/French often expand 30–50%), and they read top-to-bottom in a single saccade.

### Be specific

Label specificity tells the user *exactly* what to enter. Vague labels invite wrong answers, then errors.

| Vague | Specific |
|---|---|
| Name | Full name (first and last) |
| Email | Company email |
| Address | Shipping address |
| Phone | Mobile phone (we'll text the verification code) |
| Date | Date of birth (DD/MM/YYYY) |
| Number | Order number (10 digits, on your receipt) |

### Placeholders are examples, not instructions

Use placeholder text to show the *format*, not to instruct.

| Placeholder mistake | Placeholder right |
|---|---|
| Enter your email | jane@company.com |
| Type your phone number here | 0701-23 45 67 |
| Insert order number | OK-2026-001234 |
| Search... | Search by name, project, or tag |

### Show constraints upfront

Display rules **before** the user fails them, not after. Password rules, character limits, accepted file types — show them as inline help text below the label, not in a tooltip the user has to hover.

```
Password
[                    ]
At least 8 characters, including a number and a symbol.
```

Not:

```
Password
[                    ]
[Submit] → Error: Password too weak
```

### Don't validate before the user finishes typing

Premature validation reads as hostile — the field flashes red while the user is still mid-thought. Validate on **blur** (when the user moves to the next field) or on **submit**. Inline validation can show *positive* state ("looks good") in real time without being aggressive.

### Mark required, not optional

Default assumption should be correct. If most fields are required, mark optional ones with `(optional)` after the label. If most are optional, mark required ones with `*` (with a key explaining what * means).

### Help text vs. tooltips

| Use help text (always visible, below label) when... | Use a tooltip (on hover/focus) when... |
|---|---|
| The information is required for most users | The information helps only some users |
| Constraints affect what the user types | The information is supplementary context |
| The field is asking for something unexpected | The field is standard and self-explanatory |

If a tooltip contains required information, it should be inline text instead — never make required information hover-only.

---

## 3. Error messages

Error messages arrive at the moment of highest user frustration. They either repair the relationship between user and system, or deepen the rupture. The difference is structural.

### Error message anatomy

```
[What happened] + [What to do] + [Optional: why it matters]
```

- **What happened**: plain language, no jargon, no error codes ("Error 404" tells the user nothing).
- **What to do**: specific, actionable next step.
- **Why it matters** (optional): include only if it helps the user act. Skip if it's just context for the support team.

### Examples

| Bad | Good |
|---|---|
| Invalid input | That email isn't in our system. Check for typos or [create an account]. |
| Error occurred | We couldn't process your payment. Check your card details or try a different card. |
| You entered the wrong data | The password doesn't match. Try again or [reset your password]. |
| Something went wrong | We're having trouble connecting. Check your internet and try again. |
| Required field | Please enter your full name |
| 404 — Not found | This page doesn't exist anymore. Try [searching] or go [back to home]. |

### Blame the system, not the user

Subject of the sentence matters. "*You* entered an invalid email" puts the user in the wrong; "*We* couldn't verify your email" puts the system in the wrong. Even when the user did make a typo, the system sentence reads as warmer.

| User-blaming | System-owned |
|---|---|
| You entered an incorrect password | That password didn't match — try again |
| You haven't filled in all fields | A few fields still need filling in |
| Your card was declined | The card was declined — your bank may need to authorize the charge |
| You typed the email wrong | The email address looks off — check for typos |

Note the small wins: "an incorrect password" (object) → "that password" (referenced more neutrally); "all fields" (vague) → "a few fields" (concrete).

### Place inline, never grouped at top

Errors collected at the top of a form force the user to memorize the issue, scroll back to the field, and fix it. Place each error directly below the field it refers to. Use both color *and* an icon *and* text — never color alone.

### Avoid "Oops" and "Whoops"

They trivialize real frustration. The user just lost their work, or got their card declined, or failed to log in for the third time — "Oops!" reads as if the system is laughing about it. Drop them.

### Match brand voice but shift tone

Even a casual brand becomes calm and directive in errors. The voice (word choice rhythm, sentence length, contractions) stays — the *tone* shifts from playful to helpful.

| Brand voice | Error voice |
|---|---|
| Casual, friendly | Calm, helpful, concise |
| Witty, irreverent | Direct, no jokes |
| Formal, professional | Formal, but warmer |
| Playful, encouraging | Encouraging without joking |

---

## 4. Empty states

Empty states are screens with no content yet. Most teams treat them as edge cases. Leading products treat them as some of the highest-value UX real estate. An empty state can reach three quality levels:

1. **Baseline**: the user knows nothing is broken. ("You have no messages yet.")
2. **Informative**: the user understands what the space is for and how to fill it.
3. **Action-driving**: the user is inspired, guided, and emotionally engaged.

Aim for level 2 minimum. Level 3 when the state is high-value (first-use, key feature).

### Three types — three different jobs

#### First-use (onboarding)

Goal: orient + invite. The user just opened a feature for the first time. They need to know what this space is for and how to fill it.

```
Heading: No projects yet
Body:    A project keeps your team's tasks, files, and conversations in one place.
CTA:     Create a project
Optional: [Or import from Trello]
```

Pattern: define the noun being introduced (here: "project"), state the user benefit, offer one clear primary CTA, optionally a secondary path.

#### No-results (search/filter)

Goal: explain + suggest alternatives. The user searched, the system returned nothing. The state must not feel like a dead end.

```
Heading: No results for "inovice"
Body:    Did you mean "invoice"? Or try browsing all templates.
CTA:     Try "invoice" | Browse all templates | Clear search
```

Pattern: echo the user's input (so they see what they typed), suggest a fix if obvious (typo correction), offer alternatives, always provide at least one path forward.

#### Cleared (success)

Goal: confirm + reassure. The user finished everything. Don't leave a void.

```
Heading: All caught up!
Body:    New items will appear here when they arrive.
Optional CTA: View archive
```

Pattern: positive confirmation, set expectation for when content returns, optional action to access historical content.

### Empty-state copy structure

```
[Status: what the situation is]
+ [Explanation: what this space is for / why it's empty]
+ [CTA or next step: what to do]
```

Never leave a dead end. If the user can't take action, at least set an expectation ("New items appear here automatically when X happens").

### Add personality (carefully)

A blank state is a low-stakes moment — the user is not stressed, not failing, not committing. Brand voice can show. But: low stakes does not mean cleverness for its own sake. The state still has a job (orient, suggest, prompt). Personality is in the rhythm and word choice, not in puns.

---

## 5. Onboarding and setup copy

Onboarding is where users build their mental model of the product. The nouns and verbs introduced here become the conceptual vocabulary they apply throughout. If onboarding calls it a "workspace" and the app later calls it a "project", the user's mental model fractures — every screen forces a re-translation.

### Core principles

#### Introduce terms when they appear, not all upfront

Don't drop a glossary screen. Introduce a term the first time the user encounters it, with a one-line definition. By the time they need the term again, they've used it once and it's already familiar.

```
Welcome to [Product]. Let's set up your first project.

A project is where your team's tasks, files, and conversations live.

[Create a project]
```

Note: "project" is defined the first time it's used.

### Use the exact terminology that appears in the interface

If the next screen has a button labeled "Create project", the onboarding heading should also use "project" — not "workspace", not "container", not "team area". Consistency is the foundation of mental-model formation.

### Focus on user outcome, not feature description

| Feature-focused | Outcome-focused |
|---|---|
| Explore the file browser | See all your files in one place |
| Configure your dashboard | Build a view that fits your workflow |
| Set up integrations | Connect the tools your team already uses |
| Customize notifications | Control when and how you're interrupted |

### Progressive disclosure

Don't dump every feature in step 1. Reveal complexity as the user reaches it. Onboarding should walk the user to *first meaningful success* — the moment they accomplish the thing the product exists for. Save power features for after that moment.

### Add "because"

Reasons measurably increase compliance. Wherever onboarding asks for something unexpected (email, phone, permission), say *why*.

| No reason | With reason |
|---|---|
| Enter your phone number | Enter your phone number — we'll text a verification code |
| Allow notifications | Allow notifications so we can alert you when a teammate replies |
| Connect your calendar | Connect your calendar to schedule meetings without leaving the app |

### Skip links

Always offer an "I'll do this later" path on non-essential onboarding steps. The user who *won't* set up their notifications today is more valuable than the user who abandons the flow because they were forced to.

| Pressuring | Inviting |
|---|---|
| Skip (greyed out) | I'll do this later |
| You can't continue without this | This step is optional |
| Setup required | Set up later in Settings |

---

## 6. System and status messages

Confirmations, loading states, success screens, notifications. High-frequency, low-attention touchpoints that establish whether the system feels trustworthy. Each interaction is small; their cumulative effect is enormous.

### Confirmations: name what happened

| Vague | Specific |
|---|---|
| Success | Your changes are saved |
| Done | Order placed — confirmation sent to jane@company.com |
| Completed | Password updated |
| Saved | Draft saved (just now) |

Specificity does two jobs: confirms the user's mental model of what just happened, and provides a recovery anchor ("did I save? — yes, just now").

### Loading states: communicate progress and duration

The user staring at a spinner with no information has only their imagination, which goes pessimistic. Tell them what's happening and roughly how long.

| Bare | Useful |
|---|---|
| Loading... | Verifying your payment — usually takes a few seconds. |
| Please wait | Generating your report (about 30 seconds for 1 month of data). |
| Processing | Uploading 4 files (2 of 4 done). |

When duration is uncertain, name what's running: "Building your sandbox environment — this can take a minute or two on a fresh setup."

### Notifications: what + why + what-to-do

A notification interrupting the user must earn the interruption.

```
[What happened]: Sara replied to your message.
[Why it matters]: about the Q3 launch.
[What to do — implicit]: tap to read.
```

Notifications without "what to do" are noise. If there's no action, ask whether the notification needs to fire at all.

### Destructive confirmations: name the consequence

The user is about to do something they can't undo. The confirmation must name the consequence in plain language — not just "Are you sure?".

| Weak | Strong |
|---|---|
| Are you sure? | Delete project? This permanently removes all 24 files and can't be undone. |
| Confirm delete | Delete account? You'll lose access to your 3 active subscriptions and won't be able to recover this account. |
| Cancel subscription? | Cancel subscription? You'll lose access at the end of your billing period (March 31). You can resubscribe anytime. |

Note: name the *specific* count or date when possible. "all 24 files" beats "all files" because the number anchors what's at stake.

### Tooltips and helper text — when the surrounding UI doesn't carry the answer

If the user is likely to ask "why?" at this exact moment, answer it inline:

```
Phone number (optional)
We'll only use it for delivery notifications.
```

Not:

```
Phone number  ⓘ ← user has to hover to find out why
```

Required information must never live in tooltips. Tooltips are for *supplementary* context — "what is this?" hints, not "must read to proceed" instructions.
