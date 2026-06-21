# Contributing

## Development Workflow

1. Create a feature branch from `main`.
2. Keep changes focused on the public site surface: content, layout, metadata, or site-local build configuration.
3. If a change depends on refreshed vendored generated artifacts, regenerate them from the core product repo before updating this repo snapshot.
4. Run local checks:
   - `pnpm typecheck`
   - `pnpm build`
5. Update docs or release notes when behavior or repository workflows change.
6. Open a pull request with validation evidence.

## Rules

- Keep the site standalone: do not add runtime-relative imports back into the core product repo.
- Treat `public/openapi.json`, `public/reference-data.json`, `public/llms.txt`, and the published schema/example JSON as vendored generated artifacts.
- Keep `headers-manifest.json` aligned with the intended crawler policy for public machine-readable artifacts. Static deploys should apply those response headers at the CDN/object level.
- Keep `redirects-manifest.json` aligned with the canonical trailing-slash URL policy. Static deploys should apply those permanent redirects at the CDN/object level so slashless duplicates do not stay crawlable as alternate `200` pages.
- Keep CI and release workflows validation-only. Do not add deploy secrets, cloud credentials, or infrastructure steps to this repository.
