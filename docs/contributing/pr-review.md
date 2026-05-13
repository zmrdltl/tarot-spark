# PR Review

## PR Requirements

Every PR should clearly state:

- What changed
- Why it changed
- What user flow is affected
- What checks were run
- What remains unverified

## Review Priorities

Review should prioritize:

- Broken user flows
- Type safety
- Accessibility
- Mobile layout
- SEO metadata
- Analytics event correctness
- Policy or monetization risk
- Unnecessary complexity
- Missing or weak tests

## Code Review Guardrails

- Findings should be concrete and tied to changed behavior.
- Separate confirmed facts, risks, and suggestions.
- Do not request broad refactors unless they are needed for the current scope.
- Prefer small follow-up tasks or issues over expanding a PR beyond its original goal.
- If there are no findings, still mention remaining test gaps or residual risk.
- Check verification against `docs/contributing/quality-gates.md`.

## Ready-To-Merge Baseline

A code-bearing PR is ready only when:

- The scoped user flow works.
- Required checks pass or unavailable checks have a documented N/A reason.
- Relevant tests or smoke coverage exist.
- Product and content guardrails are satisfied.
- Remaining risks are documented in the PR.

A docs-only PR is ready when the changed docs are accurate, scoped, free of prohibited content, and any unavailable checks have a documented N/A reason.
