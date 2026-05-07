import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import Link from 'next/link';

import { Notice, SectionTitle } from '@/components/content-blocks';

export const metadata: Metadata = {
  title: 'Pricing — DebugBundle',
  description:
    'Free, Solo ($2.99/mo), and Team ($49/mo) plans. Local-first debugging with optional hosted services, unlimited projects, and shared allowance capacity.',
  openGraph: {
    title: 'Pricing — DebugBundle',
    description: 'Free, Solo, and Team plans for production debugging.',
  },
};

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Local-first onboarding with get-started hosted capacity.',
    cta: 'Get Started',
    ctaHref: '/docs/quickstart/',
    highlight: false,
    features: [
      'Unlimited projects',
      'Get-started capacity',
      '1 member (owner only)',
      '100 bundle requests / month',
      '750 ingested events / month',
      '50 retained bundles',
      '25 alert deliveries / month',
      '7-day bundle retention',
      '7-day raw event retention',
      'Always-on probes',
      'Webhooks',
      'Self-hosted: unlimited',
    ],
    excluded: [
      'Remote probe activation',
      'Extra capacity units',
      'Team collaboration',
      'Slack integration',
    ],
  },
  {
    name: 'Solo',
    price: '$2.99',
    period: '/month',
    description: 'For independent developers and agent-driven projects.',
    cta: 'Start Solo',
    ctaHref: 'https://app.debugbundle.com',
    highlight: true,
    features: [
      'Unlimited projects',
      '2 included capacity units',
      '1 member',
      '500 bundle requests / month',
      '4,000 ingested events / month',
      '300 retained bundles',
      '150 alert deliveries / month',
      '30-day bundle retention',
      '14-day raw event retention',
      'Always-on probes',
      'Remote probe activation',
      'Webhooks',
      'Extra capacity units: +$1.99/unit/mo',
    ],
    excluded: [
      'Team collaboration',
      'Slack integration',
      'Shared dashboards',
    ],
  },
  {
    name: 'Team',
    price: '$49',
    period: '/month',
    description: 'Shared usage, collaboration, and operational surfaces for teams.',
    cta: 'Start Team',
    ctaHref: 'https://app.debugbundle.com',
    highlight: false,
    features: [
      'Unlimited projects',
      '10 included capacity units',
      '5 members',
      '2,500 bundle requests / month',
      '20,000 ingested events / month',
      '1,500 retained bundles',
      '750 alert deliveries / month',
      '90-day bundle retention',
      '30-day raw event retention',
      'Always-on probes',
      'Remote probe activation',
      'Cloud-automated improvement bundles',
      'Webhooks',
      'Slack integration',
      'Shared dashboards',
      'Member invite flow',
      'Priority support',
      'Extra capacity units: +$4.99/unit/mo',
    ],
    excluded: [],
  },
];

const faqs = [
  {
    q: 'Can I use DebugBundle without paying?',
    a: 'Yes. The Free tier gives you local-first debugging with zero cloud dependency, unlimited projects, and get-started hosted capacity.',
  },
  {
    q: 'What happens if I exceed my allowance?',
    a: 'Ingestion is soft-limited. You will receive a notification and can purchase additional capacity units to expand your shared allowance.',
  },
  {
    q: 'Is self-hosting free?',
    a: 'Yes. Self-hosted DebugBundle is unlimited on the Free tier. You run the infrastructure, we provide the software.',
  },
];

export default function PricingPage(): ReactElement {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };

  return (
    <div className="space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SectionTitle
        eyebrow="Pricing"
        title="Simple, developer-friendly pricing"
        description="Start free with local-first debugging. Upgrade when you need hosted processing, remote probes, or team collaboration."
      />

      {/* Tier cards */}
      <div className="grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <section
            key={tier.name}
            className={`flex flex-col rounded-3xl border p-6 ${
              tier.highlight
                ? 'border-[var(--site-accent)] bg-[var(--site-surface)]'
                : 'border-[var(--site-border)] bg-[var(--site-surface)]'
            }`}
          >
            <div className="space-y-2">
              <h2 className="text-lg font-semibold text-[var(--site-text)]">{tier.name}</h2>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-[var(--site-text)]">{tier.price}</span>
                <span className="text-sm text-[var(--site-text-muted)]">{tier.period}</span>
              </div>
              <p className="text-sm leading-6 text-[var(--site-text-muted)]">{tier.description}</p>
            </div>

            <Link
              className={`mt-6 block rounded-full px-5 py-3 text-center text-sm font-medium transition ${
                tier.highlight
                  ? 'hover:opacity-90'
                  : 'border border-[var(--site-border-strong)] text-[var(--site-text)] hover:bg-[var(--site-surface-muted)]'
              }`}
              href={tier.ctaHref}
              style={tier.highlight ? { background: 'var(--site-accent)', color: 'var(--site-accent-foreground)' } : undefined}
            >
              {tier.cta}
            </Link>

            <ul className="mt-6 flex-1 space-y-2 text-sm text-[var(--site-text-muted)]">
              {tier.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span className="mt-0.5 text-[var(--site-success)]">✓</span>
                  <span>{f}</span>
                </li>
              ))}
              {tier.excluded.map((f) => (
                <li key={f} className="flex items-start gap-2 opacity-50">
                  <span className="mt-0.5">—</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* Shared allowance explanation */}
      <Notice title="How shared allowances work">
        Each included or purchased capacity unit contributes the same allowance bucket to your account.
        Allowances are shared across all your projects, not isolated per project. Paid plans support unlimited
        projects, so extra capacity units simply expand your total account headroom.
      </Notice>

      {/* Extra capacity pricing */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--site-text)]">Extra capacity units</h2>
        <p className="max-w-3xl text-sm leading-7 text-[var(--site-text-muted)]">
          Paid plans include a base number of capacity units. Add more at any time to expand shared allowance
          capacity without changing how many projects you can create.
        </p>
        <div className="grid max-w-2xl gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-[var(--site-border)] bg-[var(--site-surface)] p-5">
            <p className="text-sm font-semibold text-[var(--site-text)]">Solo extra unit</p>
            <p className="mt-1 text-2xl font-bold text-[var(--site-text)]">$1.99<span className="text-sm font-normal text-[var(--site-text-muted)]"> /unit/month</span></p>
          </div>
          <div className="rounded-2xl border border-[var(--site-border)] bg-[var(--site-surface)] p-5">
            <p className="text-sm font-semibold text-[var(--site-text)]">Team extra unit</p>
            <p className="mt-1 text-2xl font-bold text-[var(--site-text)]">$4.99<span className="text-sm font-normal text-[var(--site-text-muted)]"> /unit/month</span></p>
          </div>
        </div>
      </section>

      {/* FAQ-style trust section */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--site-text)]">Frequently asked</h2>
        <div className="space-y-3">
          {faqs.map((item) => (
            <div key={item.q} className="rounded-2xl border border-[var(--site-border)] bg-[var(--site-surface)] p-5">
              <p className="text-sm font-semibold text-[var(--site-text)]">{item.q}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--site-text-muted)]">{item.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}