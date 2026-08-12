export const BLOG_POSTS_PER_PAGE = 10;

export type BlogPostSummary = {
  url: string;
  title: string;
  description: string;
  date?: string;
  publishedTime?: string;
};

export type BlogPaginationItem =
  | { type: 'page'; page: number }
  | { type: 'ellipsis'; key: string };

export type PaginatedItems<T> = {
  items: T[];
  currentPage: number;
  totalPages: number;
};

export function getBlogPageCount(postCount: number): number {
  if (!Number.isSafeInteger(postCount) || postCount < 0) {
    throw new Error('Blog post count must be a non-negative safe integer.');
  }

  return Math.max(1, Math.ceil(postCount / BLOG_POSTS_PER_PAGE));
}

export function getBlogPagePath(page: number): string {
  if (!Number.isSafeInteger(page) || page < 1) {
    throw new Error('Blog page must be a positive safe integer.');
  }

  return page === 1 ? '/blog/' : `/blog/page/${page}/`;
}

export function getPaginatedBlogPageNumbers(postCount: number): number[] {
  const totalPages = getBlogPageCount(postCount);

  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, index) => index + 2);
}

export function getBlogPaginationRoutes(postCount: number): string[] {
  return getPaginatedBlogPageNumbers(postCount).map((page) => getBlogPagePath(page));
}

export function parseBlogPageNumber(value: string): number | null {
  if (!/^[1-9]\d*$/.test(value)) {
    return null;
  }

  const page = Number(value);
  return Number.isSafeInteger(page) ? page : null;
}

export function paginateItems<T>(items: readonly T[], currentPage: number): PaginatedItems<T> | null {
  const totalPages = getBlogPageCount(items.length);

  if (!Number.isSafeInteger(currentPage) || currentPage < 1 || currentPage > totalPages) {
    return null;
  }

  const start = (currentPage - 1) * BLOG_POSTS_PER_PAGE;

  return {
    items: items.slice(start, start + BLOG_POSTS_PER_PAGE),
    currentPage,
    totalPages,
  };
}

export function sortBlogPostSummaries(posts: readonly BlogPostSummary[]): BlogPostSummary[] {
  return [...posts].sort((left, right) => {
    if (left.publishedTime && right.publishedTime && left.publishedTime !== right.publishedTime) {
      return right.publishedTime.localeCompare(left.publishedTime);
    }

    if (left.publishedTime && !right.publishedTime) {
      return -1;
    }

    if (!left.publishedTime && right.publishedTime) {
      return 1;
    }

    return left.title.localeCompare(right.title);
  });
}

export function getBlogPaginationItems(currentPage: number, totalPages: number): BlogPaginationItem[] {
  if (
    !Number.isSafeInteger(currentPage) ||
    !Number.isSafeInteger(totalPages) ||
    totalPages < 1 ||
    currentPage < 1 ||
    currentPage > totalPages
  ) {
    throw new Error('Blog pagination requires a current page within the total page range.');
  }

  const visiblePages = new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1]);

  if (currentPage <= 3) {
    visiblePages.add(2);
    visiblePages.add(3);
  }

  if (currentPage >= totalPages - 2) {
    visiblePages.add(totalPages - 2);
    visiblePages.add(totalPages - 1);
  }

  const pages = [...visiblePages]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((left, right) => left - right);
  const items: BlogPaginationItem[] = [];

  for (const page of pages) {
    const previousPage = items.at(-1);

    if (previousPage?.type === 'page' && page - previousPage.page > 1) {
      items.push({ type: 'ellipsis', key: `${previousPage.page}-${page}` });
    }

    items.push({ type: 'page', page });
  }

  return items;
}
