# Nielsen's 10 Heuristics — Applied to the Web

These are the most durable diagnostic questions in UX. They are forty years old and they still catch most of what goes wrong. Treat each heuristic as a question to ask the page, not a rule to cite. When you flag a violation, pair it with a specific fix — not "improve feedback" but "add a toast on save and a loading state on the submit button."

The ordering below matches Nielsen's canonical list. When auditing, step through all ten rather than stopping at the first hit; pages typically fail three to five heuristics, and the non-obvious ones often dominate user impact.

## 1. Visibility of system status

*The page should always tell the user what is happening, through timely feedback.*

**What to check on the web:**
- Does a submit button show a loading state while the request is in flight?
- After an action succeeds, is there an unmistakable confirmation (toast, banner, inline state change)?
- During page load, is there a progress indicator or skeleton — not a blank screen?
- Is the current page/section indicated in the navigation (active state)?
- For long operations, does the page show progress, not just a spinner?

**Common violations:**
- Submit buttons that do nothing visible on click, leaving the user to double-submit.
- Saves that show no confirmation, forcing the user to refresh to check.
- Route changes with no loading state on slow connections.
- Navigation without an "you are here" indicator in multi-section apps.

## 2. Match between system and the real world

*Speak the user's language. Use familiar concepts, not internal jargon.*

**What to check on the web:**
- Does the navigation use words users would use, or internal product vocabulary?
- Are error messages in human language, not exception traces?
- Do icons use broadly understood metaphors (magnifying glass for search) rather than novel ones?
- Is the information architecture organized by user tasks, not by company department?

**Common violations:**
- "Resources" as a top-level nav item — means nothing to a user.
- Error copy like "HTTP 500: Internal server error" shown to end users.
- "Solutions" and "Products" as separate nav items with no clear distinction.
- Calendar pickers that use ISO weeks when the audience uses Sunday-start weeks.

## 3. User control and freedom

*Users need clearly marked emergency exits. Undo, redo, back, cancel.*

**What to check on the web:**
- Can the user undo a destructive action (delete, remove, unsubscribe)?
- Is there a visible close/cancel on every modal, not just a click-outside behavior?
- Does the back button work as expected in SPAs?
- Can the user exit a multi-step flow without losing partial work?
- Are there no "traps" where the user can enter a state but not easily leave?

**Common violations:**
- Modals that can only be closed by completing the form.
- Unsubscribe flows hidden behind account settings rather than a one-click link.
- Forms that clear on back-navigation, losing work.
- Onboarding flows with no "skip" or "later" option.

## 4. Consistency and standards

*Follow platform and industry conventions. Similar things should look and behave similarly.*

**What to check on the web:**
- Do primary actions use the same visual treatment across the page and site?
- Do links look like links (color + underline on hover, at minimum)?
- Are form patterns consistent — label position, error style, required-field marking?
- Does the page follow web conventions (logo top-left links home, cart in top-right for commerce)?
- Does terminology stay consistent — "cart" vs "basket" vs "bag" should not alternate?

**Common violations:**
- Three different button styles for three different primary actions, with no meaning behind the difference.
- Links styled as plain text with only a hover underline, invisible on scan.
- Form error styling that varies between inline and top-of-form.
- "Sign in" in the header, "Log in" on the sign-in page, "Login" on the forgot-password page.

## 5. Error prevention

*Better than good error messages is a design that prevents the problem in the first place.*

**What to check on the web:**
- Do destructive actions require confirmation (with the exact name of what's being deleted)?
- Do forms validate inline as the user types, not only on submit?
- Are irreversible actions made visually distinct from reversible ones?
- Are defaults sensible and safe for the common case?
- Do date/number inputs constrain input rather than accept anything and error later?

**Common violations:**
- "Delete account" button with no confirmation dialog.
- Email field that accepts any string and only validates on submit.
- Required fields that aren't marked required until submission fails.
- Forms that wipe on validation error rather than preserving input.

## 6. Recognition rather than recall

*Minimize what the user must remember. Make options, actions, and information visible.*

**What to check on the web:**
- Are options visible on the current screen rather than requiring the user to remember what's possible?
- Do search fields show recent searches and autocomplete suggestions?
- In multi-step forms, is earlier-entered information visible (or easily reviewed) without navigating back?
- Are tooltips used to enhance, not to hide required information?
- Do selects with many options include search/autocomplete?

**Common violations:**
- Critical instructions shown once on step 1, not repeated when relevant on step 3.
- Country dropdowns with 200 entries and no search.
- Password requirements hidden until the user types a wrong one.
- Commands-only interfaces where the user must know the syntax.

## 7. Aesthetic and minimalist design

*Interfaces should not contain information that is irrelevant or rarely needed. Every extra unit competes with the relevant ones.*

This is the heuristic most commonly misread. It does **not** mean "remove visual elements for a cleaner look." It means: every element, every word, every option must earn its place. If it doesn't serve the user's current decision, it is noise — and it dims the relative visibility of everything that does matter.

**What to check on the web:**
- Is there supporting copy on the page that doesn't support the primary decision?
- Are there UI elements that exist because they existed in a prior version?
- Is the page giving the user all available information, or the information needed for *this* step?
- Would a one-sentence description of the page match what's actually on it?

**Common violations:**
- Hero sections with four paragraphs of copy before the CTA.
- Marketing banners on logged-in dashboards.
- "Learn more" links next to every feature, fragmenting attention.
- Social-proof logos, testimonials, awards, and press mentions all stacked — each diluting the others.

## 8. Flexibility and efficiency of use

*Accelerators — invisible to novices — can speed up the expert user. Let users tailor frequent actions.*

**What to check on the web:**
- Do power users have keyboard shortcuts for frequent actions (save, search, new)?
- Can users customize defaults for actions they perform often?
- Is there bulk-action capability on lists and tables?
- Are recently used or favorited items surfaced for quick access?

This heuristic is about adding power for experts *without blocking novices*. A keyboard shortcut should never replace a visible button.

**Common violations:**
- Keyboard shortcuts implemented but never discoverable (no "press ? for help").
- Bulk actions missing from list views, forcing one-at-a-time operations.
- No personalization of dashboard or quick links for returning users.

## 9. Help users recognize, diagnose, and recover from errors

*Error messages should be plain language, pinpoint the problem, and suggest a solution.*

**What to check on the web:**
- Does each error message say what went wrong, why, and what to do next?
- Are errors shown next to the field they relate to, not only at the top?
- Is the tone non-blaming (not "You entered an invalid email")?
- Does the error preserve the user's input rather than wipe it?
- Does the page guide the user toward the fix — for example, focus on the first errored field?

**Common violations:**
- "An error occurred. Please try again." with no detail or corrective action.
- Validation errors shown only at the top of a long form, requiring the user to hunt.
- 404 pages with no search or recent-destinations links — just the error.
- Login errors that say "invalid email or password" without indicating which is wrong (good for security but often paired with no lockout guidance).

## 10. Help and documentation

*Even better if no help is needed. If it is needed, make it findable, task-focused, and concrete.*

**What to check on the web:**
- Is help reachable from every page, not just a top-level menu?
- Is the help content task-oriented ("How to change your plan") rather than feature-oriented ("The Billing module")?
- Are the top 5 help topics identifiable and visible without searching?
- Is help content searchable, and does search return the right answer for common queries?
- Where relevant, is help inline (contextual hints, placeholder examples) rather than a separate trip?

**Common violations:**
- Help articles written as feature reference manuals instead of task walkthroughs.
- Support hidden behind a footer link, invisible when the user is actually stuck.
- Contextual help icons that open generic documentation instead of the specific topic.
- Chat/contact options requiring a user to explain their issue from scratch despite being mid-flow.

## Auditing pattern

When asked for a heuristic audit specifically:

1. Step through all ten. Do not skip.
2. For each, mark: **Pass**, **Minor issue**, or **Violation**.
3. For every Violation, give the specific fix — not the category of fix.
4. Rank violations by user impact (how many users, how blocking, how recoverable) before presenting.
5. Do not invent issues to fill slots. A short list of real problems beats a long list of nitpicks.
