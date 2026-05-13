import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const nextEnvPath = fileURLToPath(new URL('../next-env.d.ts', import.meta.url));
const content = readFileSync(nextEnvPath, 'utf8');
const sanitizedContent = content.replace('import "./.next/types/routes.d.ts";\n', '');

if (sanitizedContent !== content) {
  writeFileSync(nextEnvPath, sanitizedContent);
}