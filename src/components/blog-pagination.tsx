import type { ReactElement } from 'react';
import Link from 'next/link';

import { getBlogPagePath, getBlogPaginationItems } from '@/blog-pagination';

const focusClassName =
  'focus-visible:outline-none focus-visible:[outline-color:var(--site-focus)] focus-visible:[outline-style:solid] focus-visible:[outline-width:2px] focus-visible:[outline-offset:2px]';
const controlClassName =
  `inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-fd-border px-3 text-sm font-medium text-fd-muted-foreground transition-colors hover:border-fd-ring hover:bg-fd-accent hover:text-fd-accent-foreground ${focusClassName}`;
const disabledControlClassName =
  'inline-flex h-10 min-w-10 cursor-not-allowed items-center justify-center rounded-full border border-fd-border px-3 text-sm font-medium text-fd-muted-foreground opacity-45';

function PreviousControl({ currentPage }: { currentPage: number }): ReactElement {
  if (currentPage === 1) {
    return (
      <span aria-disabled="true" className={disabledControlClassName}>
        Previous
      </span>
    );
  }

  return (
    <Link
      aria-label="Go to previous blog page"
      className={controlClassName}
      href={getBlogPagePath(currentPage - 1)}
    >
      Previous
    </Link>
  );
}

function NextControl({ currentPage, totalPages }: { currentPage: number; totalPages: number }): ReactElement {
  if (currentPage === totalPages) {
    return (
      <span aria-disabled="true" className={disabledControlClassName}>
        Next
      </span>
    );
  }

  return (
    <Link
      aria-label="Go to next blog page"
      className={controlClassName}
      href={getBlogPagePath(currentPage + 1)}
    >
      Next
    </Link>
  );
}

export function BlogPagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}): ReactElement | null {
  if (totalPages <= 1) {
    return null;
  }

  const paginationItems = getBlogPaginationItems(currentPage, totalPages);

  return (
    <nav aria-label="Blog pagination" className="border-t border-fd-border pt-8">
      <div className="flex items-center justify-between gap-3 sm:hidden">
        <PreviousControl currentPage={currentPage} />
        <p className="text-sm text-fd-muted-foreground">
          Page {currentPage} of {totalPages}
        </p>
        <NextControl currentPage={currentPage} totalPages={totalPages} />
      </div>

      <ul className="hidden flex-wrap items-center justify-center gap-2 sm:flex">
        <li>
          <PreviousControl currentPage={currentPage} />
        </li>
        {paginationItems.map((item) => {
          if (item.type === 'ellipsis') {
            return (
              <li key={item.key}>
                <span
                  aria-hidden="true"
                  className="inline-flex h-10 min-w-10 items-center justify-center text-fd-muted-foreground"
                >
                  &hellip;
                </span>
              </li>
            );
          }

          const isCurrent = item.page === currentPage;

          return (
            <li key={item.page}>
              {isCurrent ? (
                <span
                  aria-current="page"
                  aria-label={`Blog page ${item.page}, current page`}
                  className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-fd-primary bg-fd-primary px-3 text-sm font-medium text-fd-primary-foreground"
                >
                  {item.page}
                </span>
              ) : (
                <Link
                  aria-label={`Go to blog page ${item.page}`}
                  className={controlClassName}
                  href={getBlogPagePath(item.page)}
                >
                  {item.page}
                </Link>
              )}
            </li>
          );
        })}
        <li>
          <NextControl currentPage={currentPage} totalPages={totalPages} />
        </li>
      </ul>
    </nav>
  );
}
