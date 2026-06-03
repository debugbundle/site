import type { Metadata } from 'next';
import type { ReactElement } from 'react';

import { Notice } from '@/components/content-blocks';
import { ReferencePage } from '@/components/reference-page';
import { ReferenceTable } from '@/components/reference-table';
import { buildErrorCodeReference } from '@/reference-content';
import { createPageMetadata } from '@/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Error codes',
  description: 'Generated reference for public DebugBundle API error codes and categories.',
  path: '/docs/v1/reference/error-codes',
});

export default function DocsErrorCodesReferencePage(): ReactElement {
  const reference = buildErrorCodeReference();

  return (
    <ReferencePage
      title="Error codes"
      description="This page is extracted from the public interface contract so the reference follows the shipped API behavior."
    >
      <ReferenceTable
        columns={[
          { key: 'code', label: 'Error code', render: (entry) => <code>{entry.code}</code> },
          { key: 'statusCodes', label: 'HTTP status', render: (entry) => entry.statusCodes.join(', ') },
        ]}
        rows={reference.codes}
      />
      <Notice title="Structured categories">{reference.categories.join(', ')}</Notice>
    </ReferencePage>
  );
}
