import type { ReactElement } from 'react';

import { TerminalExample } from '@/components/content-blocks';
import { ReferencePage } from '@/components/reference-page';
import { ReferenceTable } from '@/components/reference-table';
import { buildCliReferenceEntries } from '@/reference-content';

export default function DocsCliCommandsReferencePage(): ReactElement {
  const entries = buildCliReferenceEntries();

  return (
    <ReferencePage title="CLI commands" description="This page is generated from the same usage text returned by the CLI help surface.">
      <TerminalExample title="CLI help source" lines={entries.slice(0, 4).map((entry) => entry.usage)} />
      <ReferenceTable
        columns={[
          { key: 'commandPath', label: 'Command', render: (entry) => <code>{entry.commandPath}</code> },
          { key: 'usage', label: 'Usage', render: (entry) => <code>{entry.usage}</code> },
        ]}
        rows={entries}
      />
    </ReferencePage>
  );
}