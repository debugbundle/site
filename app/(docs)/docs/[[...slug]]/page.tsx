import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';

import { createPageMdxComponents } from '@/content-components';
import { readDocsPageData } from '@/content-page-data';
import { docsSource } from '@/content-source';

type DocsPageParams = {
  slug?: string[];
};

export function generateStaticParams(): Array<DocsPageParams> {
  return docsSource.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<DocsPageParams>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const page = docsSource.getPage(resolvedParams.slug ?? []);

  if (!page) {
    return {};
  }

  const pageData = readDocsPageData(page);

  return {
    title: pageData.title,
    description: pageData.description,
  };
}

export default async function DocsContentPage({
  params,
}: {
  params: Promise<DocsPageParams>;
}): Promise<ReactElement> {
  const resolvedParams = await params;
  const page = docsSource.getPage(resolvedParams.slug ?? []);

  if (!page) {
    notFound();
  }

  const pageData = readDocsPageData(page);
  const Content = pageData.body;
  const docsPageProps = pageData.toc === undefined ? {} : { toc: pageData.toc };

  return (
    <DocsPage {...docsPageProps}>
      <DocsTitle>{pageData.title}</DocsTitle>
      <DocsDescription>{pageData.description}</DocsDescription>
      <DocsBody>
        <Content components={createPageMdxComponents(docsSource, page)} />
      </DocsBody>
    </DocsPage>
  );
}