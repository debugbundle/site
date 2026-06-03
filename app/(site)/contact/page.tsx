import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';

import { SectionTitle, SurfaceCard, SurfaceGrid } from '@/components/content-blocks';
import { createPageMetadata } from '@/seo';

const supportEmail = 'support@debugbundle.com';
const supportMailto = `mailto:${supportEmail}?subject=DebugBundle%20support`;
const buttonFocusClassName =
  'focus-visible:rounded-full focus-visible:[outline-color:var(--site-focus)] focus-visible:[outline-style:solid] focus-visible:[outline-width:2px] focus-visible:[outline-offset:2px]';

export const metadata: Metadata = createPageMetadata({
  title: 'Contact',
  description: 'Get in touch with the DebugBundle team for support, security reports, or general questions.',
  path: '/contact',
});

export default function ContactPage(): ReactElement {
  return (
    <div className="space-y-10">
      <SectionTitle
        eyebrow="Contact"
        title="Get in touch"
        description="Whether you have a product question, need support, or want to report a security issue, here is how to reach us."
      />
      <SurfaceGrid>
        <SurfaceCard title="Support">
          <div className="space-y-4">
            <p>
              For product questions and technical support, email{' '}
              <a className="text-[var(--site-accent)] underline" href={`mailto:${supportEmail}`}>
                {supportEmail}
              </a>
              . Team plan members have access to priority support.
            </p>
            <a
              className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium ${buttonFocusClassName}`}
              href={supportMailto}
              style={{ background: 'var(--site-accent)', color: 'var(--site-accent-foreground)' }}
            >
              <Mail className="size-4" aria-hidden="true" />
              Email support
            </a>
            <p>
              You can also check the{' '}
              <Link className="text-[var(--site-accent)] underline" href="/docs/troubleshooting/">
                troubleshooting guide
              </Link>{' '}
              and{' '}
              <Link className="text-[var(--site-accent)] underline" href="/docs/faq/">
                FAQ
              </Link>{' '}
              before sending a request.
            </p>
          </div>
        </SurfaceCard>
        <SurfaceCard title="Security">
          To report a security vulnerability, see our{' '}
          <Link className="text-[var(--site-accent)] underline" href="/security/">
            security page
          </Link>.
          Please do not open public issues for security reports.
        </SurfaceCard>
        <SurfaceCard title="General inquiries">
          For partnerships, enterprise plans, or other questions, email{' '}
          <a className="text-[var(--site-accent)] underline" href={`mailto:${supportEmail}`}>
            {supportEmail}
          </a>
          . Community links, including Discord, will be added once they are available.
        </SurfaceCard>
      </SurfaceGrid>
    </div>
  );
}
