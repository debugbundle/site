import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';

import { QuickstartDocsPage } from '@/components/quickstart-docs-page';
import { createPageMdxComponents } from '@/content-components';
import { readDocsPageData } from '@/content-page-data';
import { docsSource } from '@/content-source';
import { createPageMetadata } from '@/seo';
import { canonicalSitePath } from '@/url-paths';
import { getSiteRouteSeoOverride } from '@/site-route-policy';

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
  const routePath = canonicalSitePath(page.url);
  const seoOverride = getSiteRouteSeoOverride(routePath);

  const metadata = createPageMetadata({
    title: pageData.title,
    description: pageData.description,
    path: seoOverride?.canonicalPath ?? routePath,
  });

  return seoOverride?.robots ? { ...metadata, robots: seoOverride.robots } : metadata;
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
  const isQuickstartPage = (resolvedParams.slug ?? []).join('/') === 'quickstart';

  if (isQuickstartPage && pageData.toc !== undefined) {
    return (
      <QuickstartDocsPage
        description={pageData.description}
        title={pageData.title}
        toc={pageData.toc}
      >
        <Content components={createPageMdxComponents(docsSource, page)} />
      </QuickstartDocsPage>
    );
  }

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
