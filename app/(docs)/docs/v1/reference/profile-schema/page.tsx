import type { ReactElement } from 'react';

import { SurfaceCard, SurfaceGrid } from '@/components/content-blocks';
import { ReferencePage } from '@/components/reference-page';
import { buildSchemaReferenceLinks } from '@/reference-content';

export default function DocsProfileSchemaReferencePage(): ReactElement {
  const links = buildSchemaReferenceLinks().filter((entry) => entry.href === '/schemas/profile.json');

  return (
    <ReferencePage
      title="Profile schema"
      description="The profile schema reference links to the published repository-profile contract used by the local setup and validation workflows."
    >
      <SurfaceGrid>
        {links.map((entry) => (
          <SurfaceCard key={entry.href} title={entry.title} href={entry.href} action="Open schema">
            {entry.description}
          </SurfaceCard>
        ))}
      </SurfaceGrid>
    </ReferencePage>
  );
}
