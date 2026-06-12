import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { buildResponseHeadersManifest } from '../src/search-crawler-policy.js';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const siteRoot = join(scriptDirectory, '..');

async function main(): Promise<void> {
  const manifest = buildResponseHeadersManifest();
  const outputPath = join(siteRoot, 'headers-manifest.json');
  await writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
}

void main();
