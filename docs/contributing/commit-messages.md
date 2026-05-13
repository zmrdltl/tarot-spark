# Commit Messages

## Scope

Use this rule when creating or reviewing Git commit messages.

## Commit Creation

- Do not run `git commit` unless the user explicitly asks for a commit.

## Subject

- Write the subject in imperative mood.
- Keep the subject at 50 characters or less when practical.
- Capitalize the first word.
- Do not end the subject with a period.

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
- Explain what changed and why, not implementation details that are obvious from the diff.
- Do not include emoji, generated-by trailers, private reasoning, or contributor-irrelevant process notes.

## History Hygiene

- Keep commits scoped to a coherent change.
- Avoid mixing product plans, code changes, and formatting-only churn in one commit.
- Prefer follow-up tasks or issues over expanding a branch beyond its original goal.
