import type { ReactElement, ReactNode } from 'react';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';

export function ReferencePage({
  title,
  description,
  children,
  eyebrow = 'Reference',
}: {
  title: string;
  description: string;
  children: ReactNode;
  eyebrow?: string;
}): ReactElement {
  return (
    <DocsPage toc={[]}>
      <div className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--site-text-subtle)]">{eyebrow}</p>
        <DocsTitle>{title}</DocsTitle>
        <DocsDescription>{description}</DocsDescription>
      </div>
      <DocsBody>
        <div className="space-y-8">{children}</div>
      </DocsBody>
    </DocsPage>
  );
}