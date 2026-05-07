import type { ReactElement } from 'react';
import Link from 'next/link';

import { SurfaceCard, SurfaceGrid } from '@/components/content-blocks';
import { ReferencePage } from '@/components/reference-page';
import { buildSchemaReferenceLinks } from '@/reference-content';

export default function DocsBundleSchemaReferencePage(): ReactElement {
  const links = buildSchemaReferenceLinks().filter((entry) => entry.href.includes('/bundle.') || entry.href.includes('/examples/bundle.'));

  return (
    <ReferencePage
      title="Bundle schema"
      description="The bundle schema reference links directly to the published JSON Schema and the validated example bundle artifacts."
    >
      <SurfaceGrid>
        {links.map((entry) => (
          <SurfaceCard key={entry.href} title={entry.title}>
            <p>{entry.description}</p>
            <p className="mt-3">
              <Link className="font-medium text-[var(--site-text)] underline" href={entry.href}>
                Open artifact
              </Link>
            </p>
          </SurfaceCard>
        ))}
      </SurfaceGrid>
    </ReferencePage>
  );
}