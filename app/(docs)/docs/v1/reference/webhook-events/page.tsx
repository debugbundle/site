import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import Link from 'next/link';

import { Notice, SurfaceCard, SurfaceGrid } from '@/components/content-blocks';
import { ReferencePage } from '@/components/reference-page';
import { buildWebhookReference } from '@/reference-content';
import { createPageMetadata } from '@/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Webhook events',
  description: 'Generated reference for DebugBundle webhook event types and payload schema links.',
  path: '/docs/v1/reference/webhook-events',
});

export default function DocsWebhookEventsReferencePage(): ReactElement {
  const reference = buildWebhookReference();

  return (
    <ReferencePage
      title="Webhook events"
      description="This page is generated from the webhook event contract shared by the API, worker, and webhook client package."
    >
      <SurfaceGrid>
        {reference.eventTypes.map((eventType) => (
          <SurfaceCard key={eventType} title={eventType}>
            Published event type available in webhook configuration and delivery history.
          </SurfaceCard>
        ))}
      </SurfaceGrid>
      <Notice title="Contract links">
        <Link className="font-medium text-[var(--site-text)] underline" href={reference.schemaPath}>
          Open the webhook payload schema
        </Link>
        {' and '}
        <Link className="font-medium text-[var(--site-text)] underline" href={reference.overviewPath}>
          read the higher-level webhook overview
        </Link>
        .
      </Notice>
    </ReferencePage>
  );
}
