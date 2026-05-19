import type { ReactElement } from 'react';

import { Notice } from '@/components/content-blocks';
import { ReferencePage } from '@/components/reference-page';
import { ReferenceTable } from '@/components/reference-table';
import { buildMcpToolReferenceGroups } from '@/reference-content';

export default function DocsMcpToolsReferencePage(): ReactElement {
  const groups = buildMcpToolReferenceGroups();

  return (
    <ReferencePage
      title="MCP tools"
      description="This page is generated from the implemented MCP tool catalog so descriptions and argument lists stay aligned with the live server surface."
    >
      {groups.map((group) => (
        <section key={group.group} className="space-y-4">
          <h2 className="mt-0 text-2xl font-semibold tracking-tight text-[var(--site-text)]">{group.label}</h2>
          <ReferenceTable
            columns={[
              { key: 'name', label: 'Tool', render: (tool) => <code>{tool.name}</code> },
              { key: 'description', label: 'Description', render: (tool) => tool.description },
              {
                key: 'requiredArguments',
                label: 'Required arguments',
                render: (tool) => (tool.requiredArguments.length > 0 ? tool.requiredArguments.join(', ') : 'None'),
              },
              {
                key: 'optionalArguments',
                label: 'Optional arguments',
                render: (tool) => (tool.optionalArguments.length > 0 ? tool.optionalArguments.join(', ') : 'None'),
              },
            ]}
            rows={group.tools}
          />
        </section>
      ))}
      <Notice title="Parity rule">
        These entries are meant to describe the same behavior as the API and CLI equivalents, not a separate MCP-only implementation.
      </Notice>
    </ReferencePage>
  );
}
