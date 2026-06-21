import type { MetadataRoute } from 'next';

import { absoluteSiteUrl } from '@/seo';
import { getIndexableSiteRoutes } from '@/public-route-manifest';

export const dynamic = 'force-static';

const lastModified = '2026-06-03T00:00:00.000Z';

export default function sitemap(): MetadataRoute.Sitemap {
  return getIndexableSiteRoutes().map((route) => ({
    url: absoluteSiteUrl(route),
    lastModified,
  }));
}
