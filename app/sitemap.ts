import type { MetadataRoute } from 'next';

import { blogSource, docsSource } from '@/content-source';
import { absoluteSiteUrl } from '@/seo';

export const dynamic = 'force-static';

const lastModified = '2026-06-03T00:00:00.000Z';

const staticRoutes = [
  '/',
  '/pricing/',
  '/about/',
  '/contact/',
  '/security/',
  '/changelog/',
  '/privacy/',
  '/terms/',
];

const referenceRoutes = [
  '/docs/v1/reference/',
  '/docs/v1/reference/api-endpoints/',
  '/docs/v1/reference/bundle-schema/',
  '/docs/v1/reference/cli-commands/',
  '/docs/v1/reference/error-codes/',
  '/docs/v1/reference/mcp-tools/',
  '/docs/v1/reference/profile-schema/',
  '/docs/v1/reference/webhook-events/',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map((route) => ({
    url: absoluteSiteUrl(route),
    lastModified,
  }));

  const docsEntries = docsSource.getPages().map((page) => ({
    url: absoluteSiteUrl(page.url),
    lastModified,
  }));

  const referenceEntries = referenceRoutes.map((route) => ({
    url: absoluteSiteUrl(route),
    lastModified,
  }));

  const blogEntries = [
    { url: absoluteSiteUrl('/blog/'), lastModified },
    ...blogSource.getPages().map((page) => ({
      url: absoluteSiteUrl(page.url),
      lastModified,
    })),
  ];

  return [...staticEntries, ...docsEntries, ...referenceEntries, ...blogEntries];
}
