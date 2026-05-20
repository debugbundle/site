import type { ReactElement, ReactNode } from 'react';
import { DocsLayout as FumadocsDocsLayout } from 'fumadocs-ui/layouts/docs';

import { DocsVersionThemeSwitch } from '@/components/docs-version-theme-switch';
import { FumadocsNavTitle } from '@/components/fumadocs-nav-title';
import { docsSource } from '@/content-source';
import { fumadocsNav } from '@/fumadocs-ui';
import { siteConfig } from '@/site-config';

export default function DocsLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <FumadocsDocsLayout
      tree={docsSource.getPageTree()}
      githubUrl={siteConfig.githubUrl}
      links={[]}
      nav={fumadocsNav}
      slots={{
        navTitle: FumadocsNavTitle,
        themeSwitch: DocsVersionThemeSwitch,
      }}
      themeSwitch={{ enabled: true }}
    >
      {children}
    </FumadocsDocsLayout>
  );
}
