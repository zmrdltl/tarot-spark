# Code Quality

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

## Testing Expectations

- Add or update tests for changed logic and important user flows.
- Use Playwright for smoke coverage of core flows once the app is scaffolded.
- Core smoke flows should cover page load, card draw, result reveal, prompt copy,
  and share entry points.
- Keep tests deterministic; do not depend on live ads, live analytics dashboards,
  or external AI calls.

## Data And Secrets

- Do not store secrets, API keys, or private environment values in committed files.
- Public client identifiers such as analytics measurement IDs or ad client IDs
  must be injected through documented environment variables.
- Use placeholders in docs and examples instead of real production identifiers.
- Avoid collecting personal user data unless a future task explicitly defines
  the data model, retention, consent, and deletion behavior.
