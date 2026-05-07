import type { ReactElement } from 'react';
import Link from 'next/link';

import { SiteShell } from '@/components/site-shell';

export default function NotFound(): ReactElement {
  return (
    <SiteShell>
      <div className="mx-auto max-w-2xl space-y-6 text-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--site-text-subtle)]">404</p>
        <h1 className="text-4xl font-semibold tracking-tight">Page not found</h1>
        <p className="text-base leading-7 text-[var(--site-text-muted)]">
          This route is not part of the current public-site scaffold yet.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link className="rounded-full border border-[var(--site-border)] px-4 py-2" href="/">
            Go home
          </Link>
          <Link className="rounded-full border border-[var(--site-border)] px-4 py-2" href="/docs/">
            Read docs
          </Link>
          <Link className="rounded-full border border-[var(--site-border)] px-4 py-2" href="/blog/">
            Visit blog
          </Link>
        </div>
      </div>
    </SiteShell>
  );
}