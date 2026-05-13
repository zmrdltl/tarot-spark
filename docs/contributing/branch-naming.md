# Branch Naming

## Scope

This rule applies to topic branches.
Protected branches such as `main` are exempt.

## Format

- Use the format `<type>-<slug>`.
- Use lowercase letters, digits, and hyphens only.
- Hyphen is the only allowed separator.
- Do not use `/`, `_`, `.`, spaces, emoji, or other symbols.
- Allowed types are `feature`, `fix`, `docs`, `chore`, `refactor`, and `test`.
- Keep the slug short but specific enough to show intent.

Valid examples:

```text
docs-contributing-rules
feature-card-draw
fix-result-share
chore-ci-setup
test-card-flow
```

Invalid examples:

```text
docs/contributing-rules
feature/card-draw
fix_result_share
docs.contributing.rules
feature-card-draw!
```
