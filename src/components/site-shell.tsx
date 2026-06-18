'use client';

import type { ReactElement, ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { BrandLockup } from '@/components/brand-lockup';
import { SiteHeader } from '@/components/site-header';
import { siteConfig } from '@/site-config';

const focusLinkClassName =
  'focus-visible:rounded-sm focus-visible:[outline-color:var(--site-focus)] focus-visible:[outline-style:solid] focus-visible:[outline-width:2px] focus-visible:[outline-offset:2px]';
const focusPillClassName =
  'focus-visible:rounded-full focus-visible:[outline-color:var(--site-focus)] focus-visible:[outline-style:solid] focus-visible:[outline-width:2px] focus-visible:[outline-offset:2px]';

export function SiteShell({ children }: { children: ReactNode }): ReactElement {
  const copyrightYear = new Date().getFullYear();

  return (
    <div
      className="site-shell min-h-screen text-[var(--site-text)]"
      style={{
        background:
          'radial-gradient(72% 58% at 50% 0%, var(--site-home-glow) 0%, transparent 72%), var(--site-bg)',
      }}
    >
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
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <BrandLockup className={focusLinkClassName} imageClassName="h-6 w-6" labelClassName="sr-only" />
              <p>{siteConfig.description}</p>
            </div>
            <p>© {copyrightYear} DebugBundle. Open source under AGPLv3.</p>
          </div>
          <nav className="flex flex-wrap items-center gap-4">
            {siteConfig.footerNav.map((item) => (
              item.label === 'Privacy' ? (
                <span key={item.href} className="flex items-center gap-4">
                  <a
                    aria-label="DebugBundle on X"
                    className={`transition hover:text-[var(--site-text)] ${focusLinkClassName}`}
                    href={siteConfig.xUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Image alt="" aria-hidden="true" className="h-5 w-5" height={20} src="/images/icons/x.svg" width={20} />
                  </a>
                  <span aria-hidden="true" className="leading-none">
                    &middot;
                  </span>
                  <Link className={`transition hover:text-[var(--site-text)] ${focusLinkClassName}`} href={item.href}>
                    {item.label}
                  </Link>
                </span>
              ) : (
                <Link key={item.href} className={`transition hover:text-[var(--site-text)] ${focusLinkClassName}`} href={item.href}>
                  {item.label}
                </Link>
              )
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
