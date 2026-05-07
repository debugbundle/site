import { writeSearchIndex } from '../src/search-index.js';

async function main(): Promise<void> {
  await writeSearchIndex();
}

void main();