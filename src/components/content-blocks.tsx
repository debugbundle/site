import type { ReactElement, ReactNode } from 'react';
import Link from 'next/link';

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
  return <div className="grid items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">{children}</div>;
}

export function SurfaceCard({
  title,
  children,
  href,
  action,
}: {
  title: string;
  children: ReactNode;
  href?: string;
  action?: string;
}): ReactElement {
  const content = (
    <>
      <div>
        <h2 className="text-lg font-semibold text-[var(--site-text)]">{title}</h2>
        <div className="mt-3 text-sm leading-7 text-[var(--site-text-muted)]">{children}</div>
      </div>
      {action ? (
        <span className="mt-5 self-end text-sm font-medium text-[var(--site-accent)]" aria-hidden={href ? true : undefined}>
          {action}
        </span>
      ) : null}
    </>
  );

  const className =
    'group flex h-full min-h-36 flex-col justify-between rounded-lg border border-[var(--site-border)] bg-[var(--site-surface)] p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition hover:border-[var(--site-border-strong)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-focus)]';

  if (href) {
    return (
      <Link className={className} href={href}>
        {content}
      </Link>
    );
  }

  return <section className={className}>{content}</section>;
}

export function Notice({ title, children }: { title: string; children: ReactNode }): ReactElement {
  return (
    <section className="rounded-lg border border-[var(--site-border-strong)] bg-[var(--site-surface-muted)] p-6">
      <h2 className="text-base font-semibold text-[var(--site-text)]">{title}</h2>
      <div className="mt-2 text-sm leading-7 text-[var(--site-text-muted)]">{children}</div>
    </section>
  );
}

export function TerminalExample({ title, lines }: { title: string; lines: string[] }): ReactElement {
  return (
    <section className="rounded-lg border border-[var(--site-code-border)] bg-[var(--site-code-bg)] p-5 text-[var(--site-code-text)]">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--site-text-subtle)]">{title}</p>
      <pre className="overflow-x-auto text-sm leading-7">
        <code>{lines.join('\n')}</code>
      </pre>
    </section>
  );
}

export function WorkflowDiagram({ children }: { children: ReactNode }): ReactElement {
  return <div className="my-6 grid gap-3 md:grid-cols-[repeat(auto-fit,minmax(10rem,1fr))]">{children}</div>;
}

export function WorkflowStep({
  title,
  children,
  meta,
}: {
  title: string;
  children: ReactNode;
  meta?: string;
}): ReactElement {
  return (
    <section className="relative rounded-lg border border-[var(--site-border)] bg-[var(--site-surface)] p-4">
      {meta ? <p className="mb-2 text-xs font-medium uppercase text-[var(--site-text-subtle)]">{meta}</p> : null}
      <h3 className="text-base font-semibold text-[var(--site-text)]">{title}</h3>
      <div className="mt-2 text-sm leading-6 text-[var(--site-text-muted)]">{children}</div>
    </section>
  );
}
