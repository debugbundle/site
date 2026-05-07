import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import Link from 'next/link';

import { SectionTitle, SurfaceCard, SurfaceGrid } from '@/components/content-blocks';

export const metadata: Metadata = {
  title: 'Contact — DebugBundle',
  description: 'Get in touch with the DebugBundle team for support, security reports, or general questions.',
};

export default function ContactPage(): ReactElement {
  return (
    <div className="space-y-10">
      <SectionTitle
        eyebrow="Contact"
        title="Get in touch"
        description="Whether you have a question, need support, or want to report a security issue — here is how to reach us."
      />
      <SurfaceGrid>
        <SurfaceCard title="Support">
          For product questions and technical support, check the{' '}
          <Link className="text-[var(--site-accent)] underline" href="/docs/troubleshooting/">
            troubleshooting guide
          </Link>{' '}
          and{' '}
          <Link className="text-[var(--site-accent)] underline" href="/docs/faq/">
            FAQ
          </Link>{' '}
          first. Team plan members have access to priority support.
        </SurfaceCard>
        <SurfaceCard title="Security">
          To report a security vulnerability, see our{' '}
          <Link className="text-[var(--site-accent)] underline" href="/security/">
            security page
          </Link>.
          Please do not open public issues for security reports.
        </SurfaceCard>
        <SurfaceCard title="General inquiries">
          For partnerships, enterprise plans, or other questions, reach out through the project repository or documentation channels.
        </SurfaceCard>
      </SurfaceGrid>
    </div>
  );
}