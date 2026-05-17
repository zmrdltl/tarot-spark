# Commit Messages

## Scope

Use this rule when creating or reviewing Git commit messages.

## Commit Creation

- Do not run `git commit` unless the user explicitly asks for a commit.
- Use `git commit -s` for every commit so branch protection checks receive a
  `Signed-off-by` trailer.
- Use `git commit -S -s` when signed-commit branch protection is enabled or the
  current task explicitly requires a cryptographic signature.
- Use `git commit --amend -s --no-edit` only when the latest local commit is
  missing the trailer.
- Rewrite local history to add the trailer to every commit missing sign-off
  before pushing or updating a PR.
- Before amending or rewriting commits on a published or shared branch, follow
  `docs/contributing/branch-workflow.md`.
- Preserve `Signed-off-by` trailers when rebasing, squashing, or amending
  commits.

## Subject

- Start the subject with the change type when it improves scanability.
- Write the subject in imperative mood.
- Keep the subject at 50 characters or less when practical.
- Capitalize the first word.
- Do not end the subject with a period.
- Use `Fix <broken behavior>` for bug fixes.
- Use `Add <capability>` for new behavior.
- Use `Update <thing>` or `Tighten <rule>` for behavior or policy changes.

Good examples:

```text
Add contributing rules
Tighten tarot content guardrails
Fix result share metadata
```

Bad examples:

```text
update stuff
wip
Add docs stuff
Fix result share metadata.
docs/contributing rules
```

## Body

- Use a body only when the reason or context is not obvious from the diff.
- Separate the subject and body with one blank line.
- Explain what changed and why, not implementation details that are obvious from
  the diff.
- Use stable section labels when the body needs structured context.
- Keep required `Signed-off-by` trailers separate from explanatory body sections.
- Do not include emoji, generated-by trailers, private reasoning, or
  contributor-irrelevant process notes.

For fix commits, use this body shape:

```text
Problem:
- <broken behavior or user-visible risk>

Cause:
- <root cause or incorrect assumption>

Solution:
- <change made>

Reason:
- <why this solution is the right scope>

Verification:
- <checks run or N/A reason>
```

For non-fix commits, use the smallest useful subset of:

```text
Goal:
- <intended outcome>

Change:
- <change made>

Reason:
- <why this belongs in the current scope>

Verification:
- <checks run or N/A reason>
```

## History Hygiene

- Keep commits scoped to a coherent change.
- Avoid mixing product plans, code changes, and formatting-only churn in one commit.
- Prefer follow-up tasks or issues over expanding a branch beyond its original goal.
- Fix commits missing sign-off before review instead of relying on merge-time
  cleanup.
