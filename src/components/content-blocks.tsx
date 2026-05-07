import type { ReactElement, ReactNode } from 'react';

export function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}): ReactElement {
  return (
    <div className="max-w-3xl space-y-3">
      {eyebrow ? (
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--site-text-subtle)]">{eyebrow}</p>
      ) : null}
      <h1 className="text-4xl font-semibold tracking-tight text-[var(--site-text)] sm:text-5xl">{title}</h1>
      <p className="text-base leading-7 text-[var(--site-text-muted)] sm:text-lg">{description}</p>
    </div>
  );
}

export function SurfaceGrid({ children }: { children: ReactNode }): ReactElement {
  return <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{children}</div>;
}

export function SurfaceCard({ title, children }: { title: string; children: ReactNode }): ReactElement {
  return (
    <section className="rounded-3xl border border-[var(--site-border)] bg-[var(--site-surface)] p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
      <h2 className="text-lg font-semibold text-[var(--site-text)]">{title}</h2>
      <div className="mt-3 text-sm leading-7 text-[var(--site-text-muted)]">{children}</div>
    </section>
  );
}

export function Notice({ title, children }: { title: string; children: ReactNode }): ReactElement {
  return (
    <section className="rounded-3xl border border-[var(--site-border-strong)] bg-[var(--site-surface-muted)] p-6">
      <h2 className="text-base font-semibold text-[var(--site-text)]">{title}</h2>
      <div className="mt-2 text-sm leading-7 text-[var(--site-text-muted)]">{children}</div>
    </section>
  );
}

export function TerminalExample({ title, lines }: { title: string; lines: string[] }): ReactElement {
  return (
    <section className="rounded-3xl border border-[var(--site-code-border)] bg-[var(--site-code-bg)] p-5 text-[var(--site-code-text)]">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--site-text-subtle)]">{title}</p>
      <pre className="overflow-x-auto text-sm leading-7">
        <code>{lines.join('\n')}</code>
      </pre>
    </section>
  );
}