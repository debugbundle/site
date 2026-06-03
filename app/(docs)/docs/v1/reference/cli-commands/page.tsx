import type { Metadata } from 'next';
import type { ReactElement } from 'react';

import { TerminalExample } from '@/components/content-blocks';
import { ReferencePage } from '@/components/reference-page';
import { ReferenceTable } from '@/components/reference-table';
import { buildCliReferenceEntries, buildCliReferenceGroups } from '@/reference-content';
import { createPageMetadata } from '@/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'CLI commands',
  description: 'Generated reference for the shipped DebugBundle CLI command surface.',
  path: '/docs/v1/reference/cli-commands',
});

export default function DocsCliCommandsReferencePage(): ReactElement {
  const entries = buildCliReferenceEntries();
  const groups = buildCliReferenceGroups();

  return (
    <ReferencePage title="CLI commands" description="This page is generated from the same usage text returned by the CLI help surface.">
      <TerminalExample title="CLI help source" lines={entries.slice(0, 4).map((entry) => entry.usage)} />
      {groups.map((group) => (
        <section key={group.group} className="space-y-4">
          <h2 className="mt-0 text-2xl font-semibold tracking-tight text-[var(--site-text)]">{group.label}</h2>
          <ReferenceTable
            columns={[
              { key: 'commandPath', label: 'Command', render: (entry) => <code>{entry.commandPath}</code> },
              { key: 'usage', label: 'Usage', render: (entry) => <code>{entry.usage}</code> },
            ]}
            rows={group.entries}
          />
        </section>
      ))}
    </ReferencePage>
  );
}
