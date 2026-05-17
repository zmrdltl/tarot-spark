# Pull Requests

## Scope

Use this rule when a pull request is useful or explicitly requested.
Use `docs/workflow/reviews.md` for review criteria.

## When To Open A PR

- Do not open a PR by default for small, direct, single-owner work.
- Open a PR when GitHub review, CI, protected-branch rules, or collaboration
  should happen before merge.
- Open a PR when the change is risky, user-facing, or broad enough that review
  history matters.

## Creation

- Open a PR from a topic branch to `main`.
- Link the PR to its issue when an issue exists.
- Use Draft PRs for incomplete work that needs early feedback.
- Keep the PR scoped to the linked issue or stated goal.
- Confirm commits satisfy `docs/workflow/commits.md` before pushing or opening a
  PR.
- Fix every commit missing sign-off before requesting review.
- Fill out `.github/pull_request_template.md`.
- Replace every placeholder with a concrete note or `N/A`.

## Issue Linking

- Use GitHub closing keywords in the PR description when the PR should close an
  issue on merge.
- Prefer `Closes #<issue-number>` for same-repository issues.
- Use a plain issue reference such as `Refs #<issue-number>` when the PR relates
  to an issue but should not close it.
- Do not use a closing keyword unless merging the PR fully satisfies the issue.

## Updates

- Push additional commits to the same branch to update the PR.
- Keep verification notes current when the PR changes.
- Move unrelated follow-up work to a new task, issue, or PR.
