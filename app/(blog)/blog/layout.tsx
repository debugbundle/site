import type { ReactElement, ReactNode } from 'react';
import { HomeLayout } from 'fumadocs-ui/layouts/home';

import { fumadocsLinks, fumadocsNav } from '@/fumadocs-ui';

export default function BlogLayout({ children }: { children: ReactNode }): ReactElement {
  return (
    <HomeLayout links={fumadocsLinks} nav={fumadocsNav} themeSwitch={{ enabled: true }}>
      {children}
    </HomeLayout>
  );
}