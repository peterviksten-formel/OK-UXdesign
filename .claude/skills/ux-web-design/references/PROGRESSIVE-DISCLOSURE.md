# Progressive Disclosure

The core principle: show users what they need to make the next decision, not everything at once. Anything beyond that is noise to the current moment and noise to every subsequent moment.

Progressive disclosure is the structural answer to cognitive load. COGNITIVE-LOAD.md tells you what to cut; this file tells you how to *stage* what remains, so the user sees the right thing at the right time.

## When to disclose progressively

Apply progressive disclosure whenever the user's decision happens in stages. If the user needs A to decide, then B, then C, the page should show A prominently, B when A is settled, C when B is settled.

Typical contexts:

- **Product pages** — headline → price and primary decision factors → CTA → detailed specs
- **Forms** — ask for what's needed now; defer the rest
- **Navigation** — top-level destinations visible; deep routes behind one click
- **Onboarding** — one thing per screen; the next thing appears when the previous is done
- **Dashboards** — key status first; drill-down on demand
- **Error messages** — problem statement, then cause if helpful, then fix
- **Settings** — common settings visible; advanced behind "Advanced" or a separate tab

Do **not** apply progressive disclosure when:

- The user is comparing items side-by-side (comparison needs parallel visibility).
- The user is in an expert/power-user mode and expects density.
- Withholding information feels manipulative (pricing behind a signup, for example, usually fails the user's trust).

## The four staging patterns

### 1. Overview → detail

Show summary first, expose detail on demand.

- Product page: hero with core value and price, specs and feature matrix below or in accordion sections.
- Pricing table: plan names and headline price visible; full feature list expandable or on a dedicated comparison view.
- Dashboard card: headline metric and direction, drill-through to the full report.

Make the detail discoverable (not hidden behind a non-obvious control) and predictable (the user should know what opening it will show).

### 2. Need-now → need-later

Ask for information in the order the user needs to give it. This especially matters in forms.

- Signup: email → password. That's it. Company name, role, team size belong in onboarding or first-use flows, not on the signup form.
- Checkout: shipping first, payment second, review third. Not all three on one screen.
- Account settings: identity and notifications up top; billing, integrations, and advanced controls in separate sections.

The rule: every field on a form must answer the question "why do I need this right now?" If the answer is "we could use it later," defer it.

### 3. Common → rare

Surface the options most users need; hide the rest behind "More" or "Advanced."

- Email composer: to/subject/body visible; CC, BCC, scheduling, read-receipts in expandable controls or an overflow menu.
- Search: basic search prominent; filters and advanced operators available but not overwhelming.
- Export: "Export as CSV" on the main button; PDF, JSON, XML in a menu.

Hiding the rare options is not denying them — it's removing them from the scan path. Power users know where to look.

### 4. Default → alternative

Choose a smart default, let users change it.

- Plan selection: pre-select the recommended plan; don't ask them to guess.
- Region/language: detect and default; let them switch.
- Permissions: default to sensible (e.g., private); let them open up.

Every explicit choice you can remove is load you removed.

## Form disclosure in detail

Forms are where progressive disclosure pays off most. The anti-pattern is the "kitchen sink" signup that asks for everything upfront because "we'll need it eventually."

**The litmus test for every field:**
1. Do we need this *to create the account / complete the purchase / deliver the value*?
2. If not, is this the point in the user's journey where asking makes sense?

If the answer to both is no, the field does not belong here.

**Good patterns:**
- Two-step signup: email only → onboarding collects the rest contextually.
- Address forms that auto-complete from a single search, revealing the structured fields only if needed.
- Conditional fields: "Do you have a referral code?" / text field appears only if yes.
- "Save for later" on long forms, so the user isn't penalized for interruption.

**Bad patterns:**
- A signup form asking job title, company size, use case, and phone number before the user has tried the product.
- Forms with 20 fields where 18 are optional but all shown — the user has to evaluate each one.
- Multi-step forms that hide the step count, making the user feel trapped.

## Navigation disclosure

The top-level nav is the most expensive real estate on the site. Every item there competes for scan attention.

**Rules:**

- Top-level items should be the destinations 80% of users need 80% of the time.
- Maximum 5–7 top-level items. Beyond that, scanning fails.
- Secondary navigation appears on hover/click of a top-level item, not pre-rendered.
- Deep routes live under the section they logically belong to, not in a flat mega-menu.
- "Resources," "Company," and "More" are often signals of a nav that has stopped making choices — they hide everything the team couldn't decide where to put.

**The navigation test:** A first-time visitor, looking only at your top-level nav, should be able to predict where to go for:
- Pricing
- Signing up or signing in
- Support or help
- A specific feature they already know the name of

If any of those requires hunting, the nav is doing too much or not enough.

## Error disclosure

Errors are a special form of progressive disclosure: give the user what they need to recover, in the order they need it.

Structure:
1. **Problem statement** — what went wrong, in plain language.
2. **Cause** — only if it helps the user act. "Your card was declined" is enough. "Your card was declined due to an AVS mismatch with the billing address provided" is helpful. "Your card was declined due to gateway response code 0x4A" is not.
3. **Fix** — what the user can do next. Specific and actionable.

For validation errors, show them where the problem is (inline, next to the field), not only at the top.

## Onboarding disclosure

Onboarding is progressive disclosure applied over time. The user should learn the product by using it, not by reading about it.

**Principles:**

- **One concept per screen.** If onboarding introduces five features, that's five steps — not one overwhelming tour.
- **Introduce features when they become relevant**, not at account creation. Feature tours that run before the user has context are forgotten immediately.
- **Let the user skip.** The user's real onboarding happens the first time they accomplish something real. Coach marks and tooltips shown to users who already get it become noise.
- **Remove onboarding affordances once the user is past them.** The "Complete your profile" prompt that persists for months is debt, not help.

## Measuring disclosure quality

When auditing a page or flow, ask:

- **Is the next decision obvious?** If the user has to hunt for what to do next, disclosure failed.
- **Is anything visible now that the user doesn't need yet?** If yes, it's noise — stage it for later.
- **Is anything hidden now that the user does need?** If yes, disclosure hid the wrong thing — bring it forward.
- **Does the disclosure have a clear control?** The user should know how to see the deferred information when they need it.

Progressive disclosure fails in two directions: showing too much (load) and hiding the wrong thing (friction). The target is the narrow band between them, and finding it requires knowing the user's stage-by-stage mental journey.
