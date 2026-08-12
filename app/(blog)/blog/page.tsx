import type { Metadata } from 'next';
import type { ReactElement } from 'react';

import { BLOG_INDEX_DESCRIPTION, BlogIndexPage as BlogArchiveIndexPage } from '@/components/blog-index-page';
import { createPageMetadata } from '@/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Blog',
  description: BLOG_INDEX_DESCRIPTION,
  path: '/blog',
});

export default function BlogIndexPage(): ReactElement {
  return <BlogArchiveIndexPage currentPage={1} />;
}
