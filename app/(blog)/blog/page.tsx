import type { ReactElement } from 'react';
import Link from 'next/link';
import { DocsDescription, DocsTitle } from 'fumadocs-ui/layouts/docs/page';

import { readBlogPageData } from '@/content-page-data';
import { blogSource } from '@/content-source';

export default function BlogIndexPage(): ReactElement {
  const posts = blogSource.getPages();

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-4 py-10 sm:px-6 lg:px-8">
      <header className="space-y-4">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-fd-muted-foreground">Blog</p>
        <DocsTitle>Notes on building DebugBundle</DocsTitle>
        <DocsDescription>
          Product updates, implementation decisions, and operator-facing guidance from the DebugBundle docs surface.
        </DocsDescription>
      </header>
      {posts.map((post) => {
        const postData = readBlogPageData(post);

        return (
          <article key={post.url} className="rounded-2xl border border-fd-border bg-fd-card p-6 shadow-sm transition-colors hover:bg-fd-accent/40">
            <div className="space-y-3">
              {postData.date ? (
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-fd-muted-foreground">{postData.date}</p>
              ) : null}
              <h2 className="text-2xl font-semibold tracking-tight text-fd-foreground">
                <Link className="transition-colors hover:text-fd-primary" href={post.url}>
                  {postData.title}
                </Link>
              </h2>
              <p className="max-w-3xl text-base leading-7 text-fd-muted-foreground">{postData.description}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}