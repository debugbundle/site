import type { Metadata } from 'next';

import { siteConfig } from '@/site-config';

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  openGraphType?: 'article' | 'website';
  publishedTime?: string;
};

function ensureTrailingSlash(path: string): string {
  if (path === '' || path === '/') {
    return '/';
  }

  if (path.split('/').pop()?.includes('.')) {
    return path;
  }

  return path.endsWith('/') ? path : `${path}/`;
}

export function absoluteSiteUrl(path: string): string {
  return new URL(ensureTrailingSlash(path), siteConfig.domain).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  openGraphType = 'website',
  publishedTime,
}: PageMetadataOptions): Metadata {
  const url = absoluteSiteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.title,
      locale: 'en_US',
      type: openGraphType,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  };
}

export function normalizePublishedTime(value: string | undefined): string | undefined {
  if (!value) {
    return undefined;
  }

  const utcDate = new Date(`${value} UTC`);
  const date = Number.isNaN(utcDate.valueOf()) ? new Date(value) : utcDate;

  return Number.isNaN(date.valueOf()) ? undefined : date.toISOString();
}
