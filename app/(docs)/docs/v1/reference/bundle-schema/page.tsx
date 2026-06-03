import type { Metadata } from 'next';
import type { ReactElement } from 'react';

import { SurfaceCard, SurfaceGrid } from '@/components/content-blocks';
import { ReferencePage } from '@/components/reference-page';
import { buildSchemaReferenceLinks } from '@/reference-content';
import { createPageMetadata } from '@/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Bundle schema',
  description: 'Published DebugBundle bundle schema and validated example bundle artifacts.',
  path: '/docs/v1/reference/bundle-schema',
});

export default function DocsBundleSchemaReferencePage(): ReactElement {
  const links = buildSchemaReferenceLinks().filter((entry) => entry.href.includes('/bundle.') || entry.href.includes('/examples/bundle.'));

  return (
    <ReferencePage
      title="Bundle schema"
      description="The bundle schema reference links directly to the published JSON Schema and the validated example bundle artifacts."
    >
      <SurfaceGrid>
        {links.map((entry) => (
          <SurfaceCard key={entry.href} title={entry.title} href={entry.href} action="Open artifact">
            {entry.description}
          </SurfaceCard>
        ))}
      </SurfaceGrid>
    </ReferencePage>
  );
}
