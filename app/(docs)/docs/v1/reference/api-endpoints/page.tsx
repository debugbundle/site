import type { ReactElement } from 'react';
import Link from 'next/link';

import { Notice } from '@/components/content-blocks';
import { ReferencePage } from '@/components/reference-page';
import { ReferenceTable } from '@/components/reference-table';
import { buildApiReferenceGroups } from '@/reference-content';

export default function DocsApiEndpointsReferencePage(): ReactElement {
  const groups = buildApiReferenceGroups();

  return (
    <ReferencePage title="API endpoints" description="This page is generated from the public OpenAPI document emitted by the API app.">
      <Notice title="Machine-readable source">
        The same source also publishes{' '}
        <Link className="font-medium text-[var(--site-text)] underline" href="/openapi.json">
          /openapi.json
        </Link>
        .
      </Notice>
      {groups.map((group) => (
        <section key={group.group} className="space-y-4">
          <h2 className="mt-0 text-2xl font-semibold tracking-tight text-[var(--site-text)]">{group.label}</h2>
          <ReferenceTable
            columns={[
              { key: 'method', label: 'Method', render: (entry) => <span className="font-medium text-[var(--site-text)]">{entry.method}</span> },
              { key: 'path', label: 'Path', render: (entry) => <code>{entry.path}</code> },
              { key: 'summary', label: 'Summary', render: (entry) => entry.summary },
              { key: 'auth', label: 'Auth', render: (entry) => entry.auth.join(', ') },
            ]}
            rows={group.entries}
          />
        </section>
      ))}
    </ReferencePage>
  );
}
