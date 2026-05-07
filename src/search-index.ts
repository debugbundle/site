import { readdir, readFile, writeFile, mkdir } from 'node:fs/promises';
import { join, relative, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { initSimpleSearch, type Index } from 'fumadocs-core/search/server';

const contentDocsDir = fileURLToPath(new URL('../content/docs', import.meta.url));
const publicDirectory = fileURLToPath(new URL('../public', import.meta.url));

/** Walk a directory recursively and return all file paths. */
async function walkDir(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true });
  const paths: string[] = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      paths.push(...(await walkDir(full)));
    } else if (entry.isFile()) {
      paths.push(full);
    }
  }
  return paths;
}

/** Extract YAML frontmatter fields (title, description) from MDX source. */
function parseFrontmatter(source: string): { title: string; description: string } {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match?.[1]) return { title: '', description: '' };
  const block = match[1];

  const titleMatch = block.match(/^title:\s*["']?(.+?)["']?\s*$/m);
  const descMatch = block.match(/^description:\s*["']?(.+?)["']?\s*$/m);

  return {
    title: titleMatch?.[1]?.trim() ?? '',
    description: descMatch?.[1]?.trim() ?? '',
  };
}

/** Strip MDX/Markdown syntax to approximate plain text for indexing. */
function stripMdx(source: string): string {
  // Remove frontmatter
  let text = source.replace(/^---[\s\S]*?---/, '');
  // Remove import/export statements
  text = text.replace(/^(import|export)\s+.*$/gm, '');
  // Remove JSX components (self-closing and block)
  text = text.replace(/<[A-Z][\s\S]*?\/>/g, '');
  text = text.replace(/<[A-Z][^>]*>[\s\S]*?<\/[A-Z][^>]*>/g, '');
  // Remove HTML tags
  text = text.replace(/<[^>]+>/g, '');
  // Remove code fences (keep content inside for searchability)
  text = text.replace(/```[\s\S]*?```/g, '');
  // Remove inline code backticks
  text = text.replace(/`([^`]+)`/g, '$1');
  // Remove markdown headings markers
  text = text.replace(/^#{1,6}\s+/gm, '');
  // Remove markdown links, keep text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  // Remove markdown images
  text = text.replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1');
  // Remove bold/italic markers
  text = text.replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1');
  // Remove horizontal rules
  text = text.replace(/^---+$/gm, '');
  // Remove table pipes
  text = text.replace(/\|/g, ' ');
  // Collapse whitespace
  text = text.replace(/\n{3,}/g, '\n\n');
  return text.trim();
}

/** Convert an MDX file path relative to content/docs/ into a docs URL path. */
function filePathToUrl(relPath: string): string {
  let slug = relPath.replace(extname(relPath), '');
  // `index.mdx` → folder path
  if (slug.endsWith('/index')) {
    slug = slug.replace(/\/index$/, '');
  }
  // Root index → /docs
  if (slug === 'index') return '/docs';
  return `/docs/${slug}`;
}

/** Build search indexes from all MDX files under content/docs/. */
async function buildSearchIndexes(): Promise<Index[]> {
  const allFiles = await walkDir(contentDocsDir);
  const mdxFiles = allFiles
    .filter((f) => extname(f) === '.mdx')
    .sort();

  const indexes: Index[] = [];

  for (const filePath of mdxFiles) {
    const rawSource = await readFile(filePath, 'utf-8');
    const relPath = relative(contentDocsDir, filePath);
    const url = filePathToUrl(relPath);
    const { title, description } = parseFrontmatter(rawSource);
    const content = stripMdx(rawSource);

    if (!title) continue;

    indexes.push({
      title,
      ...(description ? { description } : {}),
      content,
      url,
    });
  }

  return indexes;
}

/** Generate the Orama search index and write it to public/search-index.json. */
export async function writeSearchIndex(): Promise<void> {
  const indexes = await buildSearchIndexes();
  const server = initSimpleSearch({ indexes });
  const exported = await server.export();

  const outputPath = join(publicDirectory, 'search-index.json');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, JSON.stringify(exported), 'utf-8');
}
