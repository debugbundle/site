import type { MetadataRoute } from 'next';

import { blogSource, docsSource } from '@/content-source';

export const dynamic = 'force-static';

const siteDomain = 'https://debugbundle.com';
const lastModified = '2026-03-24T00:00:00.000Z';

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

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteDomain}${route}`,
    lastModified,
  }));

  const docsEntries = docsSource.getPages().map((page) => ({
    url: `${siteDomain}${page.url}`,
    lastModified,
  }));

  const blogEntries = [
    { url: `${siteDomain}/blog/`, lastModified },
    ...blogSource.getPages().map((page) => ({
      url: `${siteDomain}${page.url}`,
      lastModified,
    })),
  ];

  return [...staticEntries, ...docsEntries, ...blogEntries];
}