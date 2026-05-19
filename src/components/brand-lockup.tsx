import type { ReactElement } from 'react';
import Link from 'next/link';

import { siteConfig } from '@/site-config';

type BrandLockupProps = {
  className?: string;
  href?: string;
  imageClassName?: string;
  labelClassName?: string;
};

export function BrandLockup({
  className,
  href = '/',
  imageClassName,
  labelClassName,
}: BrandLockupProps): ReactElement {
  return (
    <Link
      href={href}
      className={['inline-flex items-center gap-2.5 text-inherit transition-opacity hover:opacity-90', className]
        .filter(Boolean)
        .join(' ')}
    >
      <img
        src="/favicon.svg"
        alt=""
        aria-hidden="true"
        className={['h-6 w-6 shrink-0', imageClassName].filter(Boolean).join(' ')}
      />
      <span className={['font-semibold tracking-tight', labelClassName].filter(Boolean).join(' ')}>
        {siteConfig.title}
      </span>
    </Link>
  );
}
