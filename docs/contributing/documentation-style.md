# Documentation Style

## Scope

Use this guide for README changes, rule files, PR text, public copy, and
contributor-facing docs.

## Style

- Keep docs short and task-focused.
- Prefer stable rules over plans or brainstormed ideas.
- Use plain language and concrete defaults.
- Avoid repeated rules; link to the source rule instead.
- Use a consistent, direct tone.
- State rules as actions, not commentary about the author or process.

## Clarity

- Separate facts, decisions, exceptions, and examples.
- Use `must` only for hard requirements.
- Use `should` for defaults that allow exceptions.
- Use `may` for optional choices.
- Avoid ambiguous terms such as "maybe", "probably", "nice", "simple", or
  "obvious" unless the next sentence defines the criterion.
- Do not overstate scope with words such as "always", "never", "all", or
  "only" unless the exception boundary is explicit.
- Put exceptions next to the rule they modify.

## Structure

- Use one topic per document.
- Use one rule per bullet.
- Keep bullet lists parallel: start related bullets with the same kind of phrase
  when possible.
- Keep headings descriptive and stable.
- Prefer links to source rules over copying the same rule into multiple documents.

## File Names

- Use lowercase kebab-case for repository docs.
- Use `.md` for Markdown docs.
- Keep platform-defined filenames when a tool or service requires them.
- Treat `.github/pull_request_template.md` as a GitHub-defined exception.
- Use plural filenames for document types that describe repeated repository
  objects, such as `pull-requests.md`.

## Prohibited Content

- Do not use emoji.
- Do not include private reasoning, generated-by notes, or contributor-irrelevant
  process details.
- Do not use jokes, memes, vague hype, or internal shorthand.
- Do not mention implementation tools unless the reader needs them to do the work.
- For credentials, environment values, and public identifiers, follow `docs/contributing/code-quality.md`.

## Examples And Placeholders

- Use placeholders such as `NEXT_PUBLIC_GA_ID` or
  `NEXT_PUBLIC_ADSENSE_CLIENT_ID` instead of real production values.
- Keep examples minimal and directly relevant to the rule.
- If a rule has an exception, state the exception next to the rule.
