# Branch Workflow

## Scope

Use this rule for creating, updating, and publishing topic branches.
Use `docs/contributing/branch-naming.md` for branch names.

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
