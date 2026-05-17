# Quality Gates

## Scope

Use this rule for local verification, CI setup, commit readiness, and PR readiness.

## Required Checks

Before running checks, use the Node.js and pnpm versions required by
`package.json`. `README.md` has setup commands.

For code-bearing changes, run:

```text
pnpm run format:check
pnpm run lint
pnpm run docs:lint
pnpm run typecheck
pnpm run test
pnpm run test:e2e
pnpm run build
```

`pnpm run test` runs unit and component tests. `pnpm run test:e2e` runs
Playwright smoke tests.

For docs-only changes, run:

```text
pnpm run format:check
pnpm run docs:lint
```

## Exceptions

- For docs-only changes, mark code-bearing checks as N/A in the final summary or
  PR and explain why.
- For pre-scaffold work where these scripts do not exist, mark the checks as N/A
  in the final summary or PR and explain why.
- Do not bypass failing checks for code-bearing changes without documenting the
  reason in the final summary or PR.

## CI

- Add CI only after the project has matching package scripts.
- CI should run the required checks for pull requests and protected branch
  updates.
