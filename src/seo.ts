import type { Metadata } from 'next';

import { siteConfig } from '@/site-config';
import { canonicalSitePath } from './url-paths';

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  openGraphType?: 'article' | 'website';
  publishedTime?: string;
};

export function normalizeSiteHref(href: string): string {
  if (
    href.length === 0 ||
    href.startsWith('#') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    /^[a-zA-Z][a-zA-Z\d+.-]*:/.test(href) ||
    !href.startsWith('/') ||
    href.startsWith('/v1/')
  ) {
    return href;
  }

  const hashIndex = href.indexOf('#');
  const hash = hashIndex === -1 ? '' : href.slice(hashIndex);
  const hrefWithoutHash = hashIndex === -1 ? href : href.slice(0, hashIndex);
  const queryIndex = hrefWithoutHash.indexOf('?');
  const query = queryIndex === -1 ? '' : hrefWithoutHash.slice(queryIndex);
  const pathname = queryIndex === -1 ? hrefWithoutHash : hrefWithoutHash.slice(0, queryIndex);

  return `${canonicalSitePath(pathname)}${query}${hash}`;
}

export function absoluteSiteUrl(path: string): string {
  return new URL(canonicalSitePath(path), siteConfig.domain).toString();
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
