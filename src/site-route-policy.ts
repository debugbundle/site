import type { Metadata } from 'next';

import { canonicalSitePath } from './url-paths';

type SiteRouteSeoOverride = {
  canonicalPath?: string;
  indexInSitemap?: boolean;
  robots?: NonNullable<Metadata['robots']>;
};

const siteRouteSeoOverrides = new Map<string, SiteRouteSeoOverride>([
  [
    '/docs/installation/',
    {
      canonicalPath: '/docs/quickstart/',
      indexInSitemap: false,
      robots: {
        index: false,
        follow: true,
      },
    },
  ],
  [
    '/docs/v1/mcp/',
    {
      canonicalPath: '/docs/mcp/',
      indexInSitemap: false,
      robots: {
        index: false,
        follow: true,
      },
    },
  ],
]);

export function getSiteRouteSeoOverride(path: string): SiteRouteSeoOverride | undefined {
  return siteRouteSeoOverrides.get(canonicalSitePath(path));
}

export function shouldIndexSiteRoute(path: string): boolean {
  return getSiteRouteSeoOverride(path)?.indexInSitemap ?? true;
}
