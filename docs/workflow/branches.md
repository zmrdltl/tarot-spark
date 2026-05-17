# Branches

## Scope

Use this rule for naming, creating, updating, and publishing topic branches.
Protected branches such as `main` are exempt from topic branch naming rules.

## Naming

- Use the format `<type>-<slug>`.
- Use lowercase letters, digits, and hyphens only.
- Hyphen is the only allowed separator.
- Do not use `/`, `_`, `.`, spaces, emoji, or other symbols.
- Allowed types are `feature`, `fix`, `docs`, `chore`, `refactor`, and `test`.
- Keep the slug short but specific enough to show intent.

Valid examples:

```text
docs-structure
feature-card-draw
fix-result-share
chore-ci-setup
test-card-flow
```

Invalid examples:

```text
docs/structure
feature/card-draw
fix_result_share
docs.structure
feature-card-draw!
```

## Creation

- Start topic branches from an up-to-date `main`.
- Create one topic branch per tightly related task or issue.
- Keep each branch scoped to a single reviewable change.
- Push the branch before opening a PR.

## Updating

- Use rebase as the default branch update strategy.
- Rebase topic branches onto `main` instead of merging `main` into the topic branch.
- Use `git pull --rebase` when updating a local topic branch.
- After rewriting a published topic branch, push with `--force-with-lease`.
- Do not use plain `--force`.

## Collaboration

- Do not rewrite a shared branch unless every active contributor on that branch
  agrees.
- Prefer a new branch when a branch has drifted beyond the original task or
  issue scope.
- Document any non-rebase update in the PR, or in the final summary when there
  is no PR.
