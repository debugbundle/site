import type { ReactElement, ReactNode } from 'react';
import { DocsLayout as FumadocsDocsLayout } from 'fumadocs-ui/layouts/docs';

import { docsSource } from '@/content-source';
import { fumadocsNav } from '@/fumadocs-ui';

export default function DocsLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <FumadocsDocsLayout
      tree={docsSource.getPageTree()}
      links={[]}
      nav={fumadocsNav}
      themeSwitch={{ enabled: true }}
    >
      {children}
    </FumadocsDocsLayout>
  );
}
