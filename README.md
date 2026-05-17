# tarot-spark

Free tarot card drawing and AI prompt generator built with Next.js.

## Development

Use Node.js 24+ and the pinned pnpm version for local development and CI.

```sh
corepack enable
corepack prepare pnpm@11.1.1 --activate
pnpm install
pnpm dev
```

Run the required quality gates before opening or updating a PR.

For docs-only changes:

```sh
pnpm run format:check
pnpm run docs:lint
```

For code-bearing changes:

```sh
pnpm run format:check
pnpm run lint
pnpm run docs:lint
pnpm run typecheck
pnpm run test
pnpm run build
```
