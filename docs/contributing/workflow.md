# Workflow

## Scope

Use this rule to choose the lightest process that still protects code and
document quality.

## Default Path

- Do not create a GitHub Issue or PR by default.
- For small, clear, single-owner work, keep the scope in the current task, make
  the change, run the relevant quality gates, and summarize the result.
- Keep commits focused even when there is no issue or PR.

## Use An Issue When

- A plan, roadmap item, feature breakdown, or deferred follow-up needs durable tracking.
- Requirements are unclear enough that acceptance criteria would prevent rework.
- The work affects product direction, monetization, analytics, SEO, policy, or
  another area where decisions should be revisited later.
- More than one contributor or review round needs a shared source of truth.

## Use A PR When

- GitHub review or CI should run before the change reaches `main`.
- The target branch is protected or shared.
- The change is risky, user-facing, or broad enough that review history matters.
- Collaboration would be clearer with threaded review comments.

## Required Quality

- Quality gates apply to code-bearing changes whether or not an issue or PR exists.
- Documentation rules apply to contributor-facing docs, README changes, PR text,
  and public copy.
- Secrets, private identifiers, generated-by notes, and contributor-irrelevant
  internal notes must stay out of committed files.

## Temporary Files

- Remove task-specific temporary files before finishing work.
- If a temporary file must remain for debugging or handoff, explain why and where
  it is in the final summary or PR.
