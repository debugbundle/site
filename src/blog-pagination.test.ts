import test from 'node:test';
import assert from 'node:assert/strict';

import {
  BLOG_POSTS_PER_PAGE,
  getBlogPageCount,
  getBlogPagePath,
  getBlogPaginationItems,
  getBlogPaginationRoutes,
  paginateItems,
  parseBlogPageNumber,
  sortBlogPostSummaries,
} from './blog-pagination';

test('blog pagination limits archive pages to ten posts', () => {
  const posts = Array.from({ length: 23 }, (_, index) => `post-${index + 1}`);

  assert.equal(BLOG_POSTS_PER_PAGE, 10);
  assert.deepEqual(paginateItems(posts, 1)?.items, posts.slice(0, 10));
  assert.deepEqual(paginateItems(posts, 2)?.items, posts.slice(10, 20));
  assert.deepEqual(paginateItems(posts, 3)?.items, posts.slice(20, 23));
  assert.equal(paginateItems(posts, 4), null);
  assert.deepEqual(paginateItems([], 1)?.items, []);
});

test('blog archive routes keep page one canonical and generate later pages only', () => {
  assert.equal(getBlogPageCount(0), 1);
  assert.equal(getBlogPageCount(10), 1);
  assert.equal(getBlogPageCount(11), 2);
  assert.equal(getBlogPagePath(1), '/blog/');
  assert.equal(getBlogPagePath(3), '/blog/page/3/');
  assert.deepEqual(getBlogPaginationRoutes(23), ['/blog/page/2/', '/blog/page/3/']);
});

test('blog page parameters reject aliases and unsafe values', () => {
  assert.equal(parseBlogPageNumber('2'), 2);
  assert.equal(parseBlogPageNumber('02'), null);
  assert.equal(parseBlogPageNumber('2.5'), null);
  assert.equal(parseBlogPageNumber('archive'), null);
  assert.equal(parseBlogPageNumber('9007199254740992'), null);
});

test('blog posts sort newest first with deterministic title fallback', () => {
  const sorted = sortBlogPostSummaries([
    { url: '/older', title: 'Older', description: '', publishedTime: '2026-08-01T00:00:00.000Z' },
    { url: '/beta', title: 'Beta', description: '', publishedTime: '2026-08-12T00:00:00.000Z' },
    { url: '/undated', title: 'Undated', description: '' },
    { url: '/alpha', title: 'Alpha', description: '', publishedTime: '2026-08-12T00:00:00.000Z' },
  ]);

  assert.deepEqual(sorted.map((post) => post.title), ['Alpha', 'Beta', 'Older', 'Undated']);
});

test('blog pagination numbers stay bounded for long archives', () => {
  assert.deepEqual(getBlogPaginationItems(1, 12), [
    { type: 'page', page: 1 },
    { type: 'page', page: 2 },
    { type: 'page', page: 3 },
    { type: 'ellipsis', key: '3-12' },
    { type: 'page', page: 12 },
  ]);
  assert.deepEqual(getBlogPaginationItems(6, 12), [
    { type: 'page', page: 1 },
    { type: 'ellipsis', key: '1-5' },
    { type: 'page', page: 5 },
    { type: 'page', page: 6 },
    { type: 'page', page: 7 },
    { type: 'ellipsis', key: '7-12' },
    { type: 'page', page: 12 },
  ]);
});
