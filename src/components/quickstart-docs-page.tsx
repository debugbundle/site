"use client";

import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import type { TOCItemType } from 'fumadocs-core/toc';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';

const QUICKSTART_TABS_SELECTOR = '[data-toc-scope="quickstart-path"]';
const LOCAL_ONLY_LABEL = 'Local-only';
const LOCAL_ONLY_TOC_START_URL = '#agent-path-1';

type QuickstartDocsPageProps = {
  children: ReactNode;
  description: string;
  title: string;
  toc: TOCItemType[];
};

function splitQuickstartToc(toc: TOCItemType[]): { cloud: TOCItemType[]; localOnly: TOCItemType[] } {
  const localOnlyStartIndex = toc.findIndex((item) => item.url === LOCAL_ONLY_TOC_START_URL);

  if (localOnlyStartIndex === -1) {
    return {
      cloud: toc,
      localOnly: toc,
    };
  }

  return {
    cloud: toc.slice(0, localOnlyStartIndex),
    localOnly: toc.slice(localOnlyStartIndex),
  };
}

function readActivePathTab(): 'cloud' | 'local-only' {
  const root = document.querySelector(QUICKSTART_TABS_SELECTOR);

  if (!(root instanceof HTMLElement)) {
    return 'cloud';
  }

  const activeTab = root.querySelector('[role="tab"][data-state="active"]');
  const activeLabel = activeTab?.textContent?.trim();

  return activeLabel === LOCAL_ONLY_LABEL ? 'local-only' : 'cloud';
}

export function QuickstartDocsPage({ children, description, title, toc }: QuickstartDocsPageProps) {
  const { cloud, localOnly } = useMemo(() => splitQuickstartToc(toc), [toc]);
  const [activePath, setActivePath] = useState<'cloud' | 'local-only'>('cloud');

  useEffect(() => {
    const root = document.querySelector(QUICKSTART_TABS_SELECTOR);

    if (!(root instanceof HTMLElement)) {
      return;
    }

    const updateActivePath = () => {
      setActivePath(readActivePathTab());
    };

    updateActivePath();

    const observer = new MutationObserver(updateActivePath);
    observer.observe(root, {
      subtree: true,
      attributes: true,
      attributeFilter: ['data-state'],
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <DocsPage toc={activePath === 'local-only' ? localOnly : cloud}>
      <DocsTitle>{title}</DocsTitle>
      <DocsDescription>{description}</DocsDescription>
      <DocsBody>{children}</DocsBody>
    </DocsPage>
  );
}
