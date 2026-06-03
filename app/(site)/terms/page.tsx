import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import Link from 'next/link';

import { SectionTitle } from '@/components/content-blocks';
import { createPageMetadata } from '@/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Terms of Service',
  description: 'Terms governing the use of DebugBundle hosted services.',
  path: '/terms',
});

export default function TermsPage(): ReactElement {
  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Legal"
        title="Terms of Service"
        description="Last updated: 24 March 2026. These terms govern your use of the DebugBundle hosted platform and related services."
      />

      <div className="max-w-3xl space-y-6 text-sm leading-7 text-[var(--site-text-muted)]">
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-[var(--site-text)]">Acceptance</h2>
          <p>By creating an account or using the hosted DebugBundle service, you agree to these terms. If you do not agree, do not use the service.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-[var(--site-text)]">Service description</h2>
          <p>DebugBundle provides production debugging tools including event ingestion, incident grouping, bundle generation, alerting, and retrieval through API, CLI, MCP, and web interfaces.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-[var(--site-text)]">Accounts and access</h2>
          <p>You are responsible for maintaining the security of your account credentials and project tokens. Do not share project tokens with untrusted parties.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-[var(--site-text)]">Usage limits</h2>
          <p>Each plan tier includes usage allowances for bundle requests, ingested events, retained bundles, alert deliveries, and lifecycle webhook deliveries. Exceeding allowances may result in rate limiting. See the{' '}
            <Link className="text-[var(--site-accent)] underline" href="/pricing/">
              pricing page
            </Link>{' '}
            for current limits.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-[var(--site-text)]">Data ownership</h2>
          <p>You retain ownership of all event data and debugging artifacts submitted to DebugBundle. We do not claim intellectual property rights over your data.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-[var(--site-text)]">Self-hosted use</h2>
          <p>The self-hosted version of DebugBundle is provided under its own license terms. Self-hosted usage is not subject to the hosted service terms in this document.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-[var(--site-text)]">Termination</h2>
          <p>Either party may terminate the agreement at any time. Upon termination, your data will be retained according to your plan tier retention policy and then deleted.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-[var(--site-text)]">Contact</h2>
          <p>
            For questions about these terms, see our{' '}
            <Link className="text-[var(--site-accent)] underline" href="/contact/">
              contact page
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
