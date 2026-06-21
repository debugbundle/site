import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildRedirectManifest } from '../src/public-route-manifest.js';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const siteRoot = join(scriptDirectory, '..');

async function main(): Promise<void> {
  const manifest = buildRedirectManifest();
  const outputPath = join(siteRoot, 'redirects-manifest.json');
  await writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

void main();
