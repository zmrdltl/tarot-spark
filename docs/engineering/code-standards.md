# Code Standards

## Defaults

- Use Next.js App Router, TypeScript, Tailwind CSS, and Vercel.
- Keep the app static-first for MVP work.
- Prefer typed local data for cards, spreads, prompts, and interpretation templates.
- Prefer small, focused components and plain data structures before adding abstractions.
- Keep one source of truth for repeated code, data, and UI copy.
- Use plain function components for React UI; avoid class components and avoid
  `React.FC` unless there is a concrete typing benefit.

## Scope Control

- Keep changes scoped to the current task, issue, or PR goal.
- Do not add auth, database, payment, or server-side AI calls unless the current
  task explicitly asks for it.
- Do not introduce new runtime dependencies unless they directly support the
  current task.

## Fix Strategy

- Problem fixes must address the root cause, not only hide or work around the
  visible symptom.
- Before changing code for a bug or review finding, identify the failed
  contract: state, input, output, permission, accessibility, analytics,
  guardrail, or user flow.
- Do not mark a fix complete when the underlying failed contract can still
  produce the same incorrect behavior through another path.
- Temporary containment may be used to reduce immediate risk, but it does not
  count as the final fix unless the root cause is also resolved in the same
  change or tracked as a separate accepted follow-up.
- Tests should cover the failed contract or regression path that proved the root
  cause was fixed.

## Data And Content Structure

- Keep card, spread, topic, prompt template, and interpretation data typed.
- Add new tarot topics through the existing data shape and routing pattern.
- Keep SEO metadata, visible headings, analytics events, and public copy aligned
  when adding or changing a user-facing topic.
- Move repeated tarot content, UI copy, or prompt text to one source of truth
  before it appears in multiple places.

## Testing Expectations

- Add or update tests for changed logic and important user flows.
- Before writing tests, identify the changed contracts and choose the test layer
  that can prove each contract: data transform, render state, user interaction,
  browser permission, analytics event, routing, or end-to-end flow.
- Use Vitest for unit and component coverage of changed logic, rendering states,
  local helpers, error branches, browser API fallbacks, and analytics payloads.
- Use Playwright for end-to-end smoke coverage of core flows once the app is
  scaffolded.
- Core smoke flows should cover page load, card draw, result reveal, prompt copy,
  and share entry points.
- Do not count an interactive entry point as covered until a test performs the
  action and verifies an observable result, such as UI state, copied text,
  navigation, or an emitted event.
- When a changed behavior touches a documented core smoke flow, update the
  Playwright smoke in the same change or document the accepted exception.
- Keep tests deterministic; do not depend on live ads, live analytics dashboards,
  or external AI calls.

## Data And Secrets

- Do not store secrets, API keys, or private environment values in committed files.
- Public client identifiers such as analytics measurement IDs or ad client IDs
  must be injected through documented environment variables.
- Use placeholders in docs and examples instead of real production identifiers.
- Avoid collecting personal user data unless a future task explicitly defines
  the data model, retention, consent, and deletion behavior.
