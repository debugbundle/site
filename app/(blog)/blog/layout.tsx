import type { ReactElement, ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';

import { FumadocsNavTitle } from '@/components/fumadocs-nav-title';
import { fumadocsLinks, fumadocsNav } from '@/fumadocs-ui';

export default function BlogLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <HomeLayout
      links={fumadocsLinks}
      nav={fumadocsNav}
      slots={{ navTitle: FumadocsNavTitle }}
      themeSwitch={{ enabled: true }}
    >
      {children}
    </HomeLayout>
  );
}
