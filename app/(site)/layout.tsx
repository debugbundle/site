import type { ReactElement, ReactNode } from 'react';

import { SiteShell } from '@/components/site-shell';

export default function MarketingLayout({ children }: { children: ReactNode }): ReactElement {
  return <SiteShell>{children}</SiteShell>;
}