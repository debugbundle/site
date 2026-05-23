import type { ReactElement, ReactNode } from 'react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowRight } from 'lucide-react';

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
  icon: Icon,
}: {
  title: string;
  children: ReactNode;
  href?: string;
  action?: string;
  icon?: LucideIcon;
}): ReactElement {
  const content = (
    <>
      <div>
        <h2 className="mt-0 flex items-center gap-3 text-lg font-semibold text-[var(--site-text)]">
          {Icon ? <Icon className="size-5 text-[var(--site-accent)]" aria-hidden="true" /> : null}
          <span className="min-w-0 break-words">{title}</span>
        </h2>
        <div className="mt-3 min-w-0 break-words text-sm leading-7 text-[var(--site-text-muted)] [overflow-wrap:anywhere] [&_code]:whitespace-normal [&_code]:break-words [&_code]:[overflow-wrap:anywhere]">
          {children}
        </div>
      </div>
      {action ? (
        <span
          className="mt-5 inline-flex items-center gap-2 self-end text-sm font-medium text-[var(--site-accent)]"
          aria-hidden={href ? true : undefined}
        >
          {action}
          {href ? <ArrowRight className="size-4" aria-hidden="true" /> : null}
        </span>
      ) : null}
    </>
  );

  const className =
    'not-prose group flex h-full min-h-36 flex-col justify-between rounded-lg border border-[var(--site-border)] bg-[var(--site-surface)] p-6 shadow-[0_1px_0_rgba(0,0,0,0.04)] transition hover:border-[var(--site-border-strong)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-focus)]';

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
      <div className="mt-2 min-w-0 break-words text-sm leading-7 text-[var(--site-text-muted)] [overflow-wrap:anywhere] [&_code]:whitespace-normal [&_code]:break-words [&_code]:[overflow-wrap:anywhere]">
        {children}
      </div>
    </section>
  );
}

export function TerminalExample({ title, lines }: { title: string; lines: string[] }): ReactElement {
  return (
    <section className="not-prose rounded-lg border border-[var(--site-code-border)] bg-[var(--site-code-bg)] p-5 text-[var(--site-code-text)]">
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
    <section className="relative min-w-0 rounded-lg border border-[var(--site-border)] bg-[var(--site-surface)] p-4">
      {meta ? <p className="mb-2 text-xs font-medium uppercase text-[var(--site-text-subtle)]">{meta}</p> : null}
      <h3 className="min-w-0 break-words text-base font-semibold text-[var(--site-text)]">{title}</h3>
      <div className="mt-2 min-w-0 break-words text-sm leading-6 text-[var(--site-text-muted)] [overflow-wrap:anywhere] [&_code]:whitespace-normal [&_code]:break-words [&_code]:[overflow-wrap:anywhere]">
        {children}
      </div>
    </section>
  );
}
