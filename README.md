# debugbundle/site

Public documentation, blog, and marketing site for DebugBundle, built with [Next.js](https://nextjs.org/) and [Fumadocs](https://fumadocs.dev/).

This directory is staged as the future root of [https://github.com/debugbundle/site](https://github.com/debugbundle/site). During the Phase 22 cutover, copy the directory contents to that repo root.

## Generated artifacts

The rendered docs consume vendored generated artifacts checked into `public/`, including OpenAPI output, reference data, `llms.txt`, and published schema/example JSON.

Those vendored generated artifacts are refreshed from the core product repo before cutover. The standalone site repo only regenerates the local search index during `pnpm build`.

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Type-check

```bash
pnpm typecheck
```

## Stack

- **Framework:** Next.js 16 (App Router)
- **Docs Engine:** Fumadocs (MDX-based)
- **Styling:** Tailwind CSS 4
- **Search:** Orama (client-side)

## License

AGPL-3.0-only
