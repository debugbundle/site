'use client';

import type { ComponentProps, ReactElement } from 'react';

import { BrandLockup } from '@/components/brand-lockup';

export function FumadocsNavTitle({
  className,
  href,
}: ComponentProps<'a'>): ReactElement {
  return (
    <BrandLockup
      {...(className === undefined ? {} : { className })}
      {...(href === undefined ? {} : { href })}
    />
  );
}
