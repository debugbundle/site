import type { ReactElement, ReactNode } from 'react';
import Link from 'next/link';

import { BrandLockup } from '@/components/brand-lockup';
import { GitHubMark } from '@/components/github-mark';
import { siteConfig } from '@/site-config';
import { ThemeToggle } from '@/components/theme-toggle';

export function SiteShell({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="min-h-screen bg-[var(--site-bg)] text-[var(--site-text)]">
      <a
        className="absolute left-4 top-4 -translate-y-16 rounded-full border border-[var(--site-border)] bg-[var(--site-surface)] px-4 py-2 text-sm text-[var(--site-text)] focus:translate-y-0"
        href="#content"
      >
        Skip to content
      </a>
      <header className="border-b border-[var(--site-border)] bg-[color:color-mix(in_srgb,var(--site-bg)_88%,transparent)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <div className="flex items-center gap-8">
            <BrandLockup labelClassName="text-lg" />
            <nav className="hidden items-center gap-5 md:flex">
              {siteConfig.primaryNav.map((item) => (
                <Link
                  key={item.href}
                  className="text-sm text-[var(--site-text-muted)] transition hover:text-[var(--site-text)]"
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <a
              className="text-[var(--site-text-muted)] transition hover:text-[var(--site-text)]"
              href={siteConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <GitHubMark className="h-5 w-5" />
            </a>
            <ThemeToggle />
            <Link
              className="rounded-full border border-[var(--site-border-strong)] px-4 py-2 text-sm font-medium transition hover:opacity-90"
              href={siteConfig.appUrl}
              style={{ background: 'var(--site-accent)', color: 'var(--site-accent-foreground)' }}
            >
              Open App
            </Link>
          </div>
        </div>
      </header>
      <main id="content" className="mx-auto w-full max-w-7xl px-6 py-12 sm:py-16">
        {children}
      </main>
      <footer className="border-t border-[var(--site-border)]">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-[var(--site-text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>{siteConfig.description}</p>
          <nav className="flex flex-wrap items-center gap-4">
            {siteConfig.footerNav.map((item) => (
              <Link key={item.href} className="transition hover:text-[var(--site-text)]" href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
