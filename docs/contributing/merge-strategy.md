# Merge Strategy

## Scope

Use this rule for deciding how a PR is brought into `main`.

## Default

- Prefer a linear history.
- Use rebase as the default strategy for keeping topic branches current.
- Use "Rebase and merge" when repository settings allow it and the PR commits
  are ready to preserve.
- Use "Squash and merge" when the branch contains noisy fixup commits that
  should become one commit and the final squash commit will include the required
  cryptographic signature and `Signed-off-by` trailer.
- Do not use "Squash and merge" when the generated squash commit would fail
  signed-commit or sign-off branch protection.
- Avoid merge commits unless there is a specific reason to preserve branch topology.

## Before Merge

- Confirm the PR satisfies the linked issue, PR goal, or stated scope.
- Confirm required checks pass or unavailable checks have a documented N/A reason.
- Confirm commit messages, signatures, and sign-off trailers satisfy
  `docs/contributing/commit-messages.md`.
- Confirm remaining risks are documented.
- Confirm issue-closing keywords are present only when the issue should close on
  merge.

## After Merge

- Confirm linked issues closed when closing keywords were used.
- Delete merged topic branches unless there is a clear reason to keep them.
- Create follow-up tasks or issues for remaining work instead of reopening
  completed PR scope.
