# tarot-spark

Free tarot card drawing and AI prompt generator built with Next.js.

## Development

Use Node.js 24 LTS and the pinned pnpm version for local development and CI.
This repository includes `.nvmrc` and `.node-version` for local version
managers.

```sh
nvm install
nvm use
corepack enable
corepack prepare pnpm@11.1.1 --activate
pnpm install
pnpm exec playwright install chromium
pnpm dev
```

## Configuration

Set `NEXT_PUBLIC_SITE_URL` to the production origin before deployment. It is used
for canonical URLs, alternate language links, `robots.txt`, and `sitemap.xml`.
Local builds fall back to `http://localhost:3000`.

Set `NEXT_PUBLIC_GA_ID` to the Google Analytics measurement ID, such as
`G-XXXXXXXXXX`, to enable page view tracking and tarot behavior events. Leave it
unset for local development or preview deployments that should not send GA data.

Use `.env.local` for local values. The committed `.env.example` file documents
the expected keys.

## Documentation

- [Docs map](docs/README.md)
- [Frontend structure](docs/architecture/frontend-structure.md)

Run the required verification gates before opening or updating a PR.

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
pnpm run test:e2e
pnpm run build
```
