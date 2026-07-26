import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const homepageSource = await readFile(
  new URL('../app/(site)/page.tsx', import.meta.url),
  'utf8',
);
const siteConfigSource = await readFile(new URL('./site-config.ts', import.meta.url), 'utf8');

test('homepage uses the approved production-error positioning consistently', () => {
  const title = 'Production error reporting for AI agents';
  const eyebrow = 'Detect, investigate, and resolve failures faster';
  const heading = 'Turn production errors into agent-ready debug bundles';
  const description =
    'DebugBundle detects errors in production, groups related failures into incidents, and delivers agent-ready debugging context through API, CLI, MCP, and the dashboard so humans and AI agents can find and fix the underlying bugs.';

  assert.ok(homepageSource.includes(`title: '${title}'`));
  assert.ok(homepageSource.includes(eyebrow));
  assert.ok(homepageSource.includes(heading));
  assert.equal(homepageSource.split(description).length - 1, 3);
  assert.ok(siteConfigSource.includes(`description: '${title}.'`));
});
