import type { ComponentProps, ReactElement } from 'react';
import { DocsPage } from 'fumadocs-ui/layouts/docs/page';

import type { createPageMdxComponents } from '@/content-components';

type MdxPageBody = (props: {
  components: ReturnType<typeof createPageMdxComponents>;
}) => ReactElement;

export type BlogPageData = {
  title: string;
  description: string;
  body: MdxPageBody;
  date?: string;
};

export type DocsPageData = {
  title: string;
  description: string;
  body: MdxPageBody;
  toc: ComponentProps<typeof DocsPage>['toc'];
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function readStringField(data: Record<string, unknown>, fieldName: string, contextLabel: string): string {
  const value = data[fieldName];

  if (typeof value !== 'string') {
    throw new Error(`Invalid ${contextLabel}: expected string field \"${fieldName}\".`);
  }

  return value;
}

function readBodyField(data: Record<string, unknown>, contextLabel: string): MdxPageBody {
  const value = data['body'];

  if (typeof value !== 'function') {
    throw new Error(`Invalid ${contextLabel}: expected callable field \"body\".`);
  }

  return value as MdxPageBody;
}

export function readBlogPageData(page: { data: unknown }): BlogPageData {
  if (!isRecord(page.data)) {
    throw new Error('Invalid blog page data payload.');
  }

  const title = readStringField(page.data, 'title', 'blog page data');
  const description = readStringField(page.data, 'description', 'blog page data');
  const body = readBodyField(page.data, 'blog page data');
  const date = page.data['date'];

  if (date !== undefined && typeof date !== 'string') {
    throw new Error('Invalid blog page data: expected optional string field "date".');
  }

  return {
    title,
    description,
    body,
    ...(date !== undefined ? { date } : {}),
  };
}

export function readDocsPageData(page: { data: unknown }): DocsPageData {
  if (!isRecord(page.data)) {
    throw new Error('Invalid docs page data payload.');
  }

  return {
    title: readStringField(page.data, 'title', 'docs page data'),
    description: readStringField(page.data, 'description', 'docs page data'),
    body: readBodyField(page.data, 'docs page data'),
    toc: page.data['toc'] as DocsPageData['toc'],
  };
}