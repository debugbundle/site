import test from 'node:test';
import assert from 'node:assert/strict';

import { buildRedirectManifest, getCanonicalSiteRoutes, getIndexableSiteRoutes } from './public-route-manifest';
import { getSiteRouteSeoOverride, shouldIndexSiteRoute } from './site-route-policy';

test('canonical site routes are unique and slash-normalized', () => {
  const routes = getCanonicalSiteRoutes();

  assert.ok(routes.includes('/docs/sdks/browser/'));
  assert.ok(routes.includes('/privacy/'));
  assert.ok(routes.includes('/blog/'));
  assert.equal(routes.length, new Set(routes).size);
  assert.ok(routes.every((route) => route === '/' || route.endsWith('/')));
});

test('redirect manifest permanently redirects slashless duplicates to canonical slash routes', () => {
  const manifest = buildRedirectManifest();
  const browserSdkRule = manifest.rules.find((rule) => rule.destination === '/docs/sdks/browser/');

  assert.equal(manifest.version, 1);
  assert.deepEqual(browserSdkRule, {
    source: '/docs/sdks/browser',
    destination: '/docs/sdks/browser/',
    statusCode: 308,
  });
  assert.ok(!manifest.rules.some((rule) => rule.source === ''));
  assert.ok(manifest.rules.every((rule) => !rule.source.endsWith('/')));
  assert.ok(manifest.rules.every((rule) => rule.destination.endsWith('/')));
});

test('non-primary duplicate routes are removed from the sitemap and point at the chosen canonical', () => {
  const routeOverride = getSiteRouteSeoOverride('/docs/installation/');
  const indexableRoutes = getIndexableSiteRoutes();

  assert.deepEqual(routeOverride, {
    canonicalPath: '/docs/quickstart/',
    indexInSitemap: false,
    robots: {
      index: false,
      follow: true,
    },
  });
  assert.equal(shouldIndexSiteRoute('/docs/installation/'), false);
  assert.equal(shouldIndexSiteRoute('/docs/v1/mcp/'), false);
  assert.ok(!indexableRoutes.includes('/docs/installation/'));
  assert.ok(!indexableRoutes.includes('/docs/v1/mcp/'));
  assert.ok(indexableRoutes.includes('/docs/quickstart/'));
  assert.ok(indexableRoutes.includes('/docs/mcp/'));
});
