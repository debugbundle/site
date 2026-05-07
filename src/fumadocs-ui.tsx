import type { ReactNode } from 'react';

import { siteConfig } from '@/site-config';

type FumadocsLinkItem = {
  text: ReactNode;
  url: string;
};

export const fumadocsNav = {
  title: siteConfig.title,
  url: '/',
};

export const fumadocsLinks: FumadocsLinkItem[] = siteConfig.primaryNav.map((item) => ({
  text: item.label,
  url: item.href,
}));