import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import { Bot, Braces, CircleAlert, FileCode, Package, SquareTerminal, Webhook } from 'lucide-react';

import { Notice, SurfaceCard, SurfaceGrid } from '@/components/content-blocks';
import { ReferencePage } from '@/components/reference-page';
import { referenceRouteEntries } from '@/reference-content';
import { createPageMetadata } from '@/seo';

const referenceIcons = {
  Bot,
  Braces,
  CircleAlert,
  FileCode,
  Package,
  SquareTerminal,
  Webhook,
} as const;

export const metadata: Metadata = createPageMetadata({
  title: 'Generated reference docs',
  description:
    'Generated reference docs derived from shipped contracts and machine-readable DebugBundle artifacts.',
  path: '/docs/v1/reference',
});

export default function DocsReferencePage(): ReactElement {
  return (
    <ReferencePage
      title="Generated reference docs"
      description="This section is generated from shipped contracts and machine-readable artifacts so interface changes can land without a second handwritten reference surface."
    >
      <SurfaceGrid>
        {referenceRouteEntries.map((entry) => (
          <SurfaceCard key={entry.href} title={entry.title} href={entry.href} action="Open" icon={referenceIcons[entry.icon]}>
            {entry.description}
          </SurfaceCard>
        ))}
      </SurfaceGrid>
      <Notice title="Grounding rule">
        These pages are derived from the public OpenAPI output, the implemented CLI usage text, the MCP tool catalog,
        the webhook contract, and the published schema artifacts.
      </Notice>
    </ReferencePage>
  );
}
