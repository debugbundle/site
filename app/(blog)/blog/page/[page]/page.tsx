import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { ReactElement } from 'react';

import {
  getBlogPageCount,
  getBlogPagePath,
  getPaginatedBlogPageNumbers,
  parseBlogPageNumber,
} from '@/blog-pagination';
import { BLOG_INDEX_DESCRIPTION, BlogIndexPage } from '@/components/blog-index-page';
import { blogSource } from '@/content-source';
import { createPageMetadata } from '@/seo';

type BlogArchivePageParams = {
  page: string;
};

export const dynamicParams = false;

export function generateStaticParams(): BlogArchivePageParams[] {
  return getPaginatedBlogPageNumbers(blogSource.getPages().length).map((page) => ({ page: String(page) }));
}

function resolveArchivePage(value: string): { currentPage: number; totalPages: number } | null {
  const currentPage = parseBlogPageNumber(value);
  const totalPages = getBlogPageCount(blogSource.getPages().length);

  if (currentPage === null || currentPage < 2 || currentPage > totalPages) {
    return null;
  }

  return { currentPage, totalPages };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<BlogArchivePageParams>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const archivePage = resolveArchivePage(resolvedParams.page);

  if (!archivePage) {
    notFound();
  }

  return createPageMetadata({
    title: `Blog – Page ${archivePage.currentPage}`,
    description: `Page ${archivePage.currentPage} of ${archivePage.totalPages}. ${BLOG_INDEX_DESCRIPTION}`,
    path: getBlogPagePath(archivePage.currentPage),
  });
}

export default async function PaginatedBlogIndexPage({
  params,
}: {
  params: Promise<BlogArchivePageParams>;
}): Promise<ReactElement> {
  const resolvedParams = await params;
  const archivePage = resolveArchivePage(resolvedParams.page);

  if (!archivePage) {
    notFound();
  }

  return <BlogIndexPage currentPage={archivePage.currentPage} />;
}
