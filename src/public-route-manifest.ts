import { readdirSync } from 'node:fs';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import { shouldIndexSiteRoute } from './site-route-policy';
import { canonicalSitePath } from './url-paths';

export const staticSiteRoutes = [
  '/',
  '/pricing/',
  '/about/',
  '/contact/',
  '/security/',
  '/changelog/',
  '/privacy/',
  '/terms/',
] as const;

export const referenceRoutes = [
  '/docs/v1/reference/',
  '/docs/v1/reference/api-endpoints/',
  '/docs/v1/reference/bundle-schema/',
  '/docs/v1/reference/cli-commands/',
  '/docs/v1/reference/error-codes/',
  '/docs/v1/reference/mcp-tools/',
  '/docs/v1/reference/profile-schema/',
  '/docs/v1/reference/webhook-events/',
] as const;

function uniqueCanonicalRoutes(routes: Iterable<string>): string[] {
  const seen = new Set<string>();
  const canonicalRoutes: string[] = [];

  for (const route of routes) {
    const canonicalRoute = canonicalSitePath(route);

    if (seen.has(canonicalRoute)) {
      continue;
    }

    seen.add(canonicalRoute);
    canonicalRoutes.push(canonicalRoute);
  }

  return canonicalRoutes;
}

function readMdxRoutePaths(contentRoot: string, basePath: string): string[] {
  const pendingDirectories = [contentRoot];
  const routes: string[] = [];

  while (pendingDirectories.length > 0) {
    const currentDirectory = pendingDirectories.pop();

    if (!currentDirectory) {
      continue;
    }

    for (const entry of readdirSync(currentDirectory, { withFileTypes: true })) {
      const absolutePath = join(currentDirectory, entry.name);

      if (entry.isDirectory()) {
        pendingDirectories.push(absolutePath);
        continue;
      }

      if (!entry.isFile() || !entry.name.endsWith('.mdx')) {
        continue;
      }

      const relativePath = relative(contentRoot, absolutePath).split(sep).join('/');
      const slug = relativePath.slice(0, -'.mdx'.length);

      if (slug === 'index') {
        routes.push(basePath);
        continue;
      }

      if (slug.endsWith('/index')) {
        routes.push(`${basePath}/${slug.slice(0, -'/index'.length)}`);
        continue;
      }

      routes.push(`${basePath}/${slug}`);
    }
  }

  return routes;
}

export function getCanonicalSiteRoutes(): string[] {
  const siteRoot = dirname(dirname(fileURLToPath(import.meta.url)));
  const docsContentRoot = join(siteRoot, 'content', 'docs');
  const blogContentRoot = join(siteRoot, 'content', 'blog');

  return uniqueCanonicalRoutes([
    ...staticSiteRoutes,
    ...readMdxRoutePaths(docsContentRoot, '/docs'),
    ...referenceRoutes,
    '/blog/',
    ...readMdxRoutePaths(blogContentRoot, '/blog'),
  ]);
}

export function getIndexableSiteRoutes(): string[] {
  return getCanonicalSiteRoutes().filter((route) => shouldIndexSiteRoute(route));
}

export type RedirectManifest = {
  version: 1;
  rules: Array<{
    source: string;
    destination: string;
    statusCode: 308;
  }>;
};

export function buildRedirectManifest(): RedirectManifest {
  return {
    version: 1,
    rules: getCanonicalSiteRoutes()
      .filter((route) => route !== '/')
      .map((destination) => ({
        source: destination.endsWith('/') ? destination.slice(0, -1) : destination,
        destination,
        statusCode: 308 as const,
      })),
  };
}
