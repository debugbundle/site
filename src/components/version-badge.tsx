import type { ReactElement } from 'react';
import Link from 'next/link';

export function VersionBadge({
  version,
  href,
  className,
  external = false,
}: {
  version: string;
  href: string;
  className?: string;
  external?: boolean;
}): ReactElement {
  return (
    <Link
      aria-label={`Current DebugBundle version ${version}`}
      className={`inline-flex items-center rounded-full border px-3 py-2 text-sm font-medium leading-none transition ${className ?? ''}`.trim()}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span aria-hidden="true">v{version}</span>
    </Link>
  );
}
