# Quality Gates

## Scope

Use this rule for local verification, CI setup, commit readiness, and PR readiness.

## Required Checks

For code-bearing changes, run:

```text
npm run format:check
npm run lint
npm run typecheck
npm run test
```

Run `npm run build` before release, deployment, protected branch updates, or changes that affect routing, metadata, static generation, dependencies, or build configuration.

## Exceptions

- For docs-only changes, mark unavailable checks as N/A in the final summary or PR and explain why.
- For pre-scaffold work where these scripts do not exist, mark the checks as N/A in the final summary or PR and explain why.
- Do not bypass failing checks for code-bearing changes without documenting the reason in the final summary or PR.

## CI

- Add CI only after the project has matching package scripts.
- CI should run the required checks for pull requests and protected branch updates.
