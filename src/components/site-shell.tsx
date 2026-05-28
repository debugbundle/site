import type { ReactElement, ReactNode } from 'react';
import Link from 'next/link';

import { SiteHeader } from '@/components/site-header';
import { siteConfig } from '@/site-config';

const focusLinkClassName =
  'focus-visible:rounded-sm focus-visible:[outline-color:var(--site-focus)] focus-visible:[outline-style:solid] focus-visible:[outline-width:2px] focus-visible:[outline-offset:2px]';
const focusPillClassName =
  'focus-visible:rounded-full focus-visible:[outline-color:var(--site-focus)] focus-visible:[outline-style:solid] focus-visible:[outline-width:2px] focus-visible:[outline-offset:2px]';

export function SiteShell({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="min-h-screen bg-[var(--site-bg)] text-[var(--site-text)]">
      <a
        className={`absolute left-4 top-4 -translate-y-16 rounded-full border border-[var(--site-border)] bg-[var(--site-surface)] px-4 py-2 text-sm text-[var(--site-text)] focus:translate-y-0 ${focusPillClassName}`}
        href="#content"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="content" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-14 lg:py-16">
        {children}
      </main>
      <footer className="border-t border-[var(--site-border)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-[var(--site-text-muted)] sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>{siteConfig.description}</p>
          <nav className="flex flex-wrap items-center gap-4">
            {siteConfig.footerNav.map((item) => (
              <Link key={item.href} className={`transition hover:text-[var(--site-text)] ${focusLinkClassName}`} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
