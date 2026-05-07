"use client";

import { create, load, search as searchOrama } from '@orama/orama';
import { useDocsSearch, type SearchClient } from 'fumadocs-core/search/client';
import { useOnChange } from 'fumadocs-core/utils/use-on-change';
import { useI18n } from 'fumadocs-ui/contexts/i18n';
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
  TagsList,
  TagsListItem,
} from 'fumadocs-ui/components/dialog/search';
import type { DefaultSearchDialogProps } from 'fumadocs-ui/components/dialog/search-default';
import { useMemo, useState, type ReactElement } from 'react';

type SearchDocument = {
  title: string;
  url: string;
  breadcrumbs?: string[];
};

type SearchDatabase = {
  type: string | undefined;
  db: ReturnType<typeof create>;
};

type ExportedSearchDatabase = Parameters<typeof load>[1] & {
  type: string | undefined;
};

type SearchResult = {
  hits: Array<{
    document: SearchDocument;
  }>;
};

const databaseCache = new Map<string, Promise<SearchDatabase>>();

function getCacheKey(from: string, locale?: string): string {
  return `${from}::${locale ?? 'default'}`;
}

async function loadDatabase(from: string, locale?: string): Promise<SearchDatabase> {
  const response = await fetch(from);
  if (!response.ok) {
    throw new Error(`Failed to fetch search index from ${from}.`);
  }

  const responseData: unknown = await response.json();
  const exportedDatabase = responseData as ExportedSearchDatabase;
  const db = create({
    schema: { _: 'string' },
    language: locale ?? 'english',
  });

  load(db, exportedDatabase);

  return {
    type: exportedDatabase.type,
    db,
  };
}

function getDatabase(from: string, locale?: string): Promise<SearchDatabase> {
  const cacheKey = getCacheKey(from, locale);
  const cached = databaseCache.get(cacheKey);
  if (cached) return cached;

  const pending = loadDatabase(from, locale);
  databaseCache.set(cacheKey, pending);
  return pending;
}

function createStaticClient(from: string, locale?: string, delayMs = 100): SearchClient {
  return {
    deps: [from, locale, delayMs],
    async search(query: string) {
      const database = await getDatabase(from, locale);
      if (database.type !== 'simple') return [];

      const rawResult: unknown = searchOrama(database.db as never, {
        term: query,
        tolerance: 1,
        boost: { title: 2 },
      });
      const result = rawResult as SearchResult;

      return result.hits.map((hit) => {
        const document = hit.document;
        return {
          type: 'page' as const,
          id: document.url,
          url: document.url,
          content: document.title,
          ...(document.breadcrumbs ? { breadcrumbs: document.breadcrumbs } : {}),
        };
      });
    },
  };
}

export function DocsSearchDialog({
  defaultTag,
  tags = [],
  api = '/search-index.json',
  delayMs = 100,
  allowClear = false,
  links = [],
  footer,
  ...props
}: DefaultSearchDialogProps): ReactElement {
  const { locale } = useI18n();
  const [tag, setTag] = useState(defaultTag);
  const client = useMemo(() => createStaticClient(api, locale, delayMs), [api, delayMs, locale]);
  const { search, setSearch, query } = useDocsSearch({ client, delayMs });

  const defaultItems = useMemo(() => {
    if (links.length === 0) return null;

    return links.map(([name, link]) => ({
      type: 'page' as const,
      id: name,
      content: name,
      url: link,
    }));
  }, [links]);

  useOnChange(defaultTag, (value) => {
    setTag(value);
  });

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== 'empty' ? query.data : defaultItems} />
      </SearchDialogContent>
      <SearchDialogFooter>
        {tags.length > 0 && (
          <TagsList
            {...(tag ? { tag } : {})}
            onTagChange={setTag}
            allowClear={allowClear}
          >
            {tags.map((item) => (
              <TagsListItem key={item.value} value={item.value}>
                {item.name}
              </TagsListItem>
            ))}
          </TagsList>
        )}
        {footer}
      </SearchDialogFooter>
    </SearchDialog>
  );
}