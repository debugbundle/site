import type { ReactElement } from 'react';
import Link from 'next/link';

import { Notice } from '@/components/content-blocks';
import { ReferencePage } from '@/components/reference-page';
import { ReferenceTable } from '@/components/reference-table';
import { buildApiReferenceEntries } from '@/reference-content';

export default function DocsApiEndpointsReferencePage(): ReactElement {
  const entries = buildApiReferenceEntries();

  return (
    <ReferencePage title="API endpoints" description="This page is generated from the public OpenAPI document emitted by the API app.">
      <Notice title="Machine-readable source">
        The same source also publishes{' '}
        <Link className="font-medium text-[var(--site-text)] underline" href="/openapi.json">
          /openapi.json
        </Link>
        .
      </Notice>
      <ReferenceTable
        columns={[
          { key: 'method', label: 'Method', render: (entry) => <span className="font-medium text-[var(--site-text)]">{entry.method}</span> },
          { key: 'path', label: 'Path', render: (entry) => <code>{entry.path}</code> },
          { key: 'summary', label: 'Summary', render: (entry) => entry.summary },
          { key: 'auth', label: 'Auth', render: (entry) => entry.auth.join(', ') },
        ]}
        rows={entries}
      />
    </ReferencePage>
  );
}