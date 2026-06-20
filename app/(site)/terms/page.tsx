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
        description="Last updated: 20 June 2026. These terms govern your use of the DebugBundle hosted platform and related services."
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
          <h2 className="text-base font-semibold text-[var(--site-text)]">Monitoring and incident response</h2>
          <p>DebugBundle is a debugging, observability, and workflow-assistance product. It is not an emergency response service, managed incident response service, managed security service, safety system, backup system, disaster recovery service, or substitute for your own monitoring, alerting, escalation, operational, and business continuity processes.</p>
          <p>You are solely responsible for deciding how to use DebugBundle, configuring alerts and integrations, monitoring your own systems, validating notifications, responding to incidents, and maintaining redundant safeguards appropriate for your applications and infrastructure. DebugBundle may miss, delay, misclassify, suppress, fail to process, or fail to notify you about events, incidents, health checks, webhooks, alerts, or availability failures.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-[var(--site-text)]">No critical-use reliance</h2>
          <p>You may not rely on DebugBundle as the sole or primary system for detecting, preventing, responding to, or mitigating emergencies, safety incidents, service outages, security incidents, critical infrastructure failures, utility failures, power outages or blackouts, medical or life-support issues, transportation incidents, industrial-control failures, environmental hazards, financial trading failures, or any other high-risk condition where delayed, missed, inaccurate, or unavailable service could cause death, personal injury, property damage, environmental damage, loss of utilities, loss of power, loss of data, business interruption, regulatory harm, or other significant loss.</p>
          <p>To the maximum extent permitted by law, DebugBundle is not responsible or liable for any loss, damage, claim, cost, or expense arising from or related to your reliance on the service to detect, prevent, respond to, mitigate, escalate, or notify anyone about those conditions, including where DebugBundle fails to respond to an incident or fails to send, deliver, or process an alert, webhook, health-check result, incident, bundle, or notification.</p>
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
          <h2 className="text-base font-semibold text-[var(--site-text)]">Disclaimer of warranties</h2>
          <p>The hosted service is provided as is and as available. To the maximum extent permitted by law, DebugBundle disclaims all warranties, whether express, implied, statutory, or otherwise, including warranties of merchantability, fitness for a particular purpose, title, non-infringement, availability, accuracy, security, and uninterrupted or error-free operation.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-semibold text-[var(--site-text)]">Limitation of liability</h2>
          <p>To the maximum extent permitted by law, DebugBundle and its owners, employees, contractors, suppliers, and affiliates will not be liable for indirect, incidental, special, consequential, exemplary, punitive, or enhanced damages, or for lost profits, lost revenue, lost business, lost goodwill, lost data, service interruption, system outage, incident response failure, security incident, infrastructure failure, power outage, blackout, or cost of substitute services, even if advised of the possibility of those damages.</p>
          <p>To the maximum extent permitted by law, DebugBundle's total liability for all claims arising out of or relating to the hosted service or these terms will not exceed the greater of the amount you paid to DebugBundle for the hosted service in the 12 months before the event giving rise to the claim or 100 US dollars. Some jurisdictions do not allow certain limitations, so these limits apply only to the extent permitted by applicable law.</p>
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
