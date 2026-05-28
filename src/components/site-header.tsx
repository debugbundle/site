'use client';

import type { ReactElement } from 'react';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

import { BrandLockup } from '@/components/brand-lockup';
import { GitHubMark } from '@/components/github-mark';
import { releaseInfo } from '@/release-info';
import { ThemeToggle } from '@/components/theme-toggle';
import { siteConfig } from '@/site-config';

const focusLinkClassName =
  'focus-visible:rounded-sm focus-visible:[outline-color:var(--site-focus)] focus-visible:[outline-style:solid] focus-visible:[outline-width:2px] focus-visible:[outline-offset:2px]';
const focusPillClassName =
  'focus-visible:rounded-full focus-visible:[outline-color:var(--site-focus)] focus-visible:[outline-style:solid] focus-visible:[outline-width:2px] focus-visible:[outline-offset:2px]';

export function SiteHeader(): ReactElement {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="border-b border-[var(--site-border)] bg-[color:color-mix(in_srgb,var(--site-bg)_88%,transparent)] backdrop-blur">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-8">
            <BrandLockup className={focusLinkClassName} labelClassName="text-lg" />
            <nav className="hidden items-center gap-5 md:flex">
              {siteConfig.primaryNav.map((item) => (
                <Link
                  key={item.href}
                  className={`text-sm text-[var(--site-text-muted)] transition hover:text-[var(--site-text)] ${focusLinkClassName}`}
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              aria-label={`DebugBundle GitHub repository, version ${releaseInfo.coreVersion}`}
              className={`inline-flex h-9 items-center gap-2 rounded-full border border-[var(--site-border)] bg-[var(--site-surface)] px-4 text-sm font-medium leading-none text-[var(--site-text-muted)] transition hover:border-[var(--site-border-strong)] hover:text-[var(--site-text)] ${focusPillClassName}`}
              href={siteConfig.githubUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <GitHubMark className="h-5.5 w-5.5" />
              <span aria-hidden="true">v{releaseInfo.coreVersion}</span>
            </Link>
            <ThemeToggle />
            <Link
              className={`inline-flex h-9 items-center rounded-full px-4 text-sm font-medium transition hover:opacity-90 ${focusPillClassName}`}
              href={siteConfig.appUrl}
              style={{ background: 'var(--site-accent)', color: 'var(--site-accent-foreground)' }}
            >
              Open App
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <Link
              className={`inline-flex h-9 items-center rounded-full px-4 text-sm font-medium transition hover:opacity-90 ${focusPillClassName}`}
              href={siteConfig.appUrl}
              style={{ background: 'var(--site-accent)', color: 'var(--site-accent-foreground)' }}
            >
              Open App
            </Link>
            <button
              aria-controls="site-mobile-menu"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--site-border)] bg-[var(--site-surface)] text-[var(--site-text)] transition hover:border-[var(--site-border-strong)] ${focusPillClassName}`}
              onClick={() => setMobileMenuOpen((current) => !current)}
              type="button"
            >
              {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen ? (
        <div className="md:hidden">
          <button
            aria-label="Close menu overlay"
            className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]"
            onClick={() => setMobileMenuOpen(false)}
            type="button"
          />
          <div
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-[20rem] flex-col border-l border-[var(--site-border)] bg-[var(--site-bg)] px-5 py-5 shadow-2xl"
            id="site-mobile-menu"
          >
            <div className="flex items-center justify-between gap-3">
              <BrandLockup className={focusLinkClassName} labelClassName="text-base" />
              <button
                aria-label="Close menu"
                className={`inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--site-border)] bg-[var(--site-surface)] text-[var(--site-text)] transition hover:border-[var(--site-border-strong)] ${focusPillClassName}`}
                onClick={() => setMobileMenuOpen(false)}
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <nav className="mt-8 flex flex-col">
              {siteConfig.primaryNav.map((item) => (
                <Link
                  key={item.href}
                  className={`px-1 py-3 text-base font-medium text-[var(--site-text)] transition hover:text-[var(--site-text-muted)] ${focusLinkClassName}`}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-[var(--site-border)] pt-5">
              <Link
                aria-label={`DebugBundle GitHub repository, version ${releaseInfo.coreVersion}`}
                className={`inline-flex h-9 items-center gap-2 rounded-full border border-[var(--site-border)] bg-[var(--site-surface)] px-4 text-sm font-medium leading-none text-[var(--site-text-muted)] transition hover:border-[var(--site-border-strong)] hover:text-[var(--site-text)] ${focusPillClassName}`}
                href={siteConfig.githubUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <GitHubMark className="h-5.5 w-5.5" />
                <span aria-hidden="true">v{releaseInfo.coreVersion}</span>
              </Link>
              <ThemeToggle />
            </div>

            <div className="mt-auto pt-6">
              <Link
                className={`inline-flex h-11 w-full items-center justify-center rounded-full px-4 text-sm font-medium transition hover:opacity-90 ${focusPillClassName}`}
                href={siteConfig.appUrl}
                onClick={() => setMobileMenuOpen(false)}
                style={{ background: 'var(--site-accent)', color: 'var(--site-accent-foreground)' }}
              >
                Open App
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
