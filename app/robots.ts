import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const siteDomain = 'https://debugbundle.com';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${siteDomain}/sitemap.xml`,
    host: siteDomain,
  };
}