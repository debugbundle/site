import type { ReactElement } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DocsDescription, DocsTitle } from 'fumadocs-ui/layouts/docs/page';

import { paginateItems, sortBlogPostSummaries, type BlogPostSummary } from '@/blog-pagination';
import { readBlogPageData } from '@/content-page-data';
import { blogSource } from '@/content-source';
import { normalizePublishedTime, normalizeSiteHref } from '@/seo';
import { BlogPagination } from './blog-pagination';

export const BLOG_INDEX_TITLE = 'Notes on building DebugBundle';
export const BLOG_INDEX_DESCRIPTION =
  'Product updates, implementation decisions, and operator-facing guidance from the DebugBundle docs surface.';

function getSortedBlogPosts(): BlogPostSummary[] {
  return sortBlogPostSummaries(
    blogSource.getPages().map((post) => {
      const postData = readBlogPageData(post);
      const publishedTime = normalizePublishedTime(postData.date);

      return {
        url: normalizeSiteHref(post.url),
        title: postData.title,
        description: postData.description,
        ...(postData.date ? { date: postData.date } : {}),
        ...(publishedTime ? { publishedTime } : {}),
      };
    }),
  );
}

export function BlogIndexPage({ currentPage }: { currentPage: number }): ReactElement {
  const page = paginateItems(getSortedBlogPosts(), currentPage);

  if (!page) {
    notFound();
  }

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-fd-muted-foreground">
          {page.currentPage === 1 ? 'Blog' : `Blog · Page ${page.currentPage} of ${page.totalPages}`}
        </p>
        <DocsTitle>{BLOG_INDEX_TITLE}</DocsTitle>
        <DocsDescription>{BLOG_INDEX_DESCRIPTION}</DocsDescription>
      </header>

      {page.items.length > 0 ? (
        <div className="space-y-10">
          {page.items.map((post) => (
            <article
              key={post.url}
              className="rounded-2xl border border-fd-border bg-fd-card p-6 shadow-sm transition-colors hover:bg-fd-accent/40"
            >
              <div className="space-y-3">
                {post.date ? (
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">
                    {post.date}
                  </p>
                ) : null}
                <h2 className="text-2xl font-semibold tracking-tight text-fd-foreground">
                  <Link
                    className="rounded-sm transition-colors hover:text-fd-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring focus-visible:ring-offset-2"
                    href={post.url}
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="max-w-3xl text-base leading-7 text-fd-muted-foreground">{post.description}</p>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-2xl border border-fd-border bg-fd-card p-6 text-fd-muted-foreground">
          No blog posts have been published yet.
        </p>
      )}

      <BlogPagination currentPage={page.currentPage} totalPages={page.totalPages} />
    </div>
  );
}
