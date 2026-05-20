'use client';

import type { ReactElement } from 'react';
import Link from 'next/link';
import { ThemeSwitch, type ThemeSwitchProps } from 'fumadocs-ui/layouts/shared/slots/theme-switch';

import { releaseInfo } from '@/release-info';
import { siteConfig } from '@/site-config';

export function DocsVersionThemeSwitch(props: ThemeSwitchProps): ReactElement {
  return (
    <>
      <Link
        aria-label={`Current DebugBundle version ${releaseInfo.coreVersion}`}
        className="ms-1 rounded-md px-1.5 text-xs font-medium text-fd-muted-foreground hover:bg-fd-accent hover:text-fd-accent-foreground"
        href={siteConfig.githubUrl}
        rel="noopener noreferrer"
        target="_blank"
      >
        v{releaseInfo.coreVersion}
      </Link>
      <ThemeSwitch {...props} />
    </>
  );
}
