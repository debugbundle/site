import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import Link from 'next/link';

import { SectionTitle } from '@/components/content-blocks';

export const metadata: Metadata = {
  title: 'Privacy Policy — DebugBundle',
  description: 'How DebugBundle collects, uses, and protects your data.',
};

export default function PrivacyPage(): ReactElement {
  return (
    <div className="space-y-8">
      <SectionTitle
        eyebrow="Legal"
        title="Privacy Policy"
        description="Last updated: 24 March 2026. This policy describes how DebugBundle collects, uses, and protects information."
      />

      <div className="max-w-3xl space-y-6 text-sm leading-7 text-[var(--site-text-muted)]">
        <section className="space-y-2">
          <h2 className="text-base font-semibold text-[var(--site-text)]">What we collect</h2>
          <p>When you use the hosted DebugBundle service, we collect:</p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Account information (email address, hashed password)</li>
            <li>Event data submitted through SDKs and the ingestion API</li>
            <li>Usage metrics (bundle requests, event counts, alert deliveries)</li>
            <li>Session data for authentication purposes</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-[var(--site-text)]">How we use your data</h2>
          <p>Event data is used solely to provide DebugBundle services: incident grouping, bundle generation, alerting, and retrieval. We do not sell event data or use it for advertising.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-[var(--site-text)]">Redaction</h2>
          <p>
            DebugBundle applies automatic redaction to sensitive patterns (passwords, authentication headers, cookies, card numbers, SSNs) before storage. See the{' '}
            <Link className="text-[var(--site-accent)] underline" href="/docs/security/redaction/">
              redaction documentation
            </Link>{' '}
            for details.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-[var(--site-text)]">Data retention</h2>
          <p>Data retention follows your plan tier: Free (7 days), Solo (14–30 days), Team (30–90 days). Self-hosted instances control their own retention.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-[var(--site-text)]">Access, export, and deletion</h2>
          <p>
            Hosted organization owners can review their account settings to download a JSON export of retained organization-account data and to permanently delete the current organization account.
            Deletion removes retained projects, incidents, tokens, audit history, and stored debugging artifacts for that organization.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-[var(--site-text)]">Local-first mode</h2>
          <p>When using DebugBundle in local-only mode, no data leaves your machine. All processing happens locally and no information is transmitted to DebugBundle servers.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-[var(--site-text)]">Contact</h2>
          <p>
            For privacy-related questions, see our{' '}
            <Link className="text-[var(--site-accent)] underline" href="/contact/">
              contact page
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}