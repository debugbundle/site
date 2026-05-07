import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';
import { DocsBody, DocsDescription, DocsTitle } from 'fumadocs-ui/layouts/docs/page';

import { createPageMdxComponents } from '@/content-components';
import { readBlogPageData } from '@/content-page-data';
import { blogSource } from '@/content-source';

type BlogPageParams = {
  slug: string[];
};

export function generateStaticParams(): Array<BlogPageParams> {
  return blogSource.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogPageParams>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const page = blogSource.getPage(resolvedParams.slug);

  if (!page) {
    return {};
  }

  const pageData = readBlogPageData(page);

  return {
    title: pageData.title,
    description: pageData.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<BlogPageParams>;
}): Promise<ReactElement> {
  const resolvedParams = await params;
  const page = blogSource.getPage(resolvedParams.slug);

  if (!page) {
    notFound();
  }

  const pageData = readBlogPageData(page);
  const Content = pageData.body;
  const dateStr = pageData.date;

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: pageData.title,
    description: pageData.description,
    url: `https://debugbundle.com${page.url}`,
    ...(dateStr ? { datePublished: dateStr } : {}),
    publisher: {
      '@type': 'Organization',
      name: 'DebugBundle',
      url: 'https://debugbundle.com',
    },
  };

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <header className="space-y-3">
        {dateStr ? (
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-fd-muted-foreground">{dateStr}</p>
        ) : null}
        <DocsTitle>{pageData.title}</DocsTitle>
        <DocsDescription>{pageData.description}</DocsDescription>
      </header>
      <DocsBody>
        <Content components={createPageMdxComponents(blogSource, page)} />
      </DocsBody>
    </article>
  );
}