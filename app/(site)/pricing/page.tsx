import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import Link from 'next/link';

import { Notice, SectionTitle } from '@/components/content-blocks';
import { JsonLdScript } from '@/components/json-ld';
import { createPageMetadata } from '@/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'Pricing',
  description:
    'Free, Solo ($2.99/mo), and Team ($19/mo) plans. Local-first debugging with optional hosted services, unlimited projects, and shared allowance capacity.',
  path: '/pricing',
});

const tiers = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Get started with debugging at no cost.',
    footnote: '* Free forever, no credit card required',
    cta: 'Get Started',
    ctaHref: 'https://app.debugbundle.com/signup',
    highlight: false,
    features: [
      'Unlimited projects',
      '1 member',
      '100 bundle requests /month',
      '750 ingested events /month',
      '50 retained bundles',
      '25 alert deliveries /month',
      '100 lifecycle webhook deliveries /month',
      '7-day bundle retention',
      '7-day raw event retention',
      'Webhooks',
      'Always-on probes',
    ],
    excluded: [
      'Remote probe activation',
      'Automated improvement bundles',
      'GitHub automation',
      'Extra capacity units',
      'Team collaboration',
      'Slack integration',
      'Priority support',
    ],
  },
  {
    name: 'Solo',
    price: '$2.99',
    period: '/month',
    description: 'Shared allowance for independent developers.',
    footnote: '* 30-day trial, no credit card required',
    cta: 'Start Solo trial',
    ctaHref: 'https://app.debugbundle.com/signup?trial=solo',
    highlight: true,
    features: [
      'Unlimited projects',
      '1 member',
      '750 bundle requests /month',
      '10,500 ingested events /month',
      '450 retained bundles',
      '225 alert deliveries /month',
      '750 lifecycle webhook deliveries /month',
      '30-day bundle retention',
      '14-day raw event retention',
      'Webhooks',
      'Always-on probes',
      'Remote probe activation',
      'Automated improvement bundles',
      'GitHub automation',
      'Extra capacity units: +$0.99/unit/mo',
    ],
    excluded: [
      'Slack integration',
      'Team collaboration',
      'Priority support',
    ],
  },
  {
    name: 'Team',
    price: '$19',
    period: '/month',
    description: 'Shared allowance and collaboration for teams.',
    footnote: '* 30-day trial, no credit card required',
    cta: 'Start Team trial',
    ctaHref: 'https://app.debugbundle.com/signup?trial=team',
    highlight: false,
    features: [
      'Unlimited projects',
      'Unlimited members',
      '15,000 bundle requests /month',
      '150,000 ingested events /month',
      '6,000 retained bundles',
      '4,500 alert deliveries /month',
      '15,000 lifecycle webhook deliveries /month',
      '90-day bundle retention',
      '30-day raw event retention',
      'Webhooks',
      'Always-on probes',
      'Remote probe activation',
      'Automated improvement bundles',
      'GitHub automation',
      'Extra capacity units: +$1.99/unit/mo',
      'Slack integration',
      'Team collaboration',
      'Priority support',
    ],
    excluded: [],
  },
];

const faqs = [
  {
    q: 'Can I use DebugBundle without paying?',
    a: 'Yes. The Free tier gives you local-first debugging without DebugBundle Cloud, unlimited projects, and get-started hosted capacity.',
  },
  {
    q: 'Can I still get improvement analysis on the Free tier?',
    a: 'Yes. Free still supports local/manual improvement analysis through the CLI and local bundles. Hosted automated improvement bundles are available on Solo and Team.',
  },
  {
    q: 'What happens if I exceed my allowance?',
    a: 'New hosted usage for that meter pauses until the monthly reset or until you add capacity. Existing incidents, bundles, and delivery history stay visible.',
  },
  {
    q: 'Is self-hosting free?',
    a: 'Yes. Self-hosted DebugBundle is unlimited on the Free tier. You run the infrastructure, we provide the software.',
  },
];

const extraCapacityUnits = [
  {
    name: 'Solo extra unit',
    price: '$0.99',
    increases: [
      '+250 bundle requests /month',
      '+3,500 ingested events /month',
      '+150 retained bundles',
      '+75 alert deliveries /month',
      '+250 lifecycle webhook deliveries /month',
    ],
  },
  {
    name: 'Team extra unit',
    price: '$1.99',
    increases: [
      '+1,000 bundle requests /month',
      '+10,000 ingested events /month',
      '+400 retained bundles',
      '+300 alert deliveries /month',
      '+1,000 lifecycle webhook deliveries /month',
    ],
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
      <JsonLdScript id="pricing-faq-jsonld" data={faqJsonLd} />
      <SectionTitle
        eyebrow="Pricing"
        title="Simple, developer-friendly pricing"
        description="Start free with hosted or local-first debugging. Upgrade when you need higher limits, remote probes, GitHub automation, or team collaboration."
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
            <p className="mt-6 border-t border-[var(--site-border)] pt-4 text-xs leading-5 text-[var(--site-text-muted)]">
              {tier.footnote}
            </p>
          </section>
        ))}
      </div>

      {/* Extra capacity pricing */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--site-text)]">Extra capacity units</h2>
        <p className="max-w-3xl text-sm leading-7 text-[var(--site-text-muted)]">
          Paid plans include a base number of capacity units. Add more at any time to expand shared allowance
          capacity after paid conversion. Each extra unit adds more shared allowance for your plan.
        </p>
        <div className="grid max-w-2xl gap-4 md:grid-cols-2">
          {extraCapacityUnits.map((unit) => (
            <div
              key={unit.name}
              className="rounded-2xl border border-[var(--site-border)] bg-[var(--site-surface)] p-5"
            >
              <p className="text-sm font-semibold text-[var(--site-text)]">{unit.name}</p>
              <p className="mt-1 text-2xl font-bold text-[var(--site-text)]">
                {unit.price}
                <span className="text-sm font-normal text-[var(--site-text-muted)]"> /unit/month</span>
              </p>
              <ul className="mt-4 space-y-1 text-xs leading-6 text-[var(--site-text-muted)]">
                {unit.increases.map((increase) => (
                  <li key={increase}>{increase}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Shared allowance explanation */}
      <Notice title="How shared allowances work">
        Each included or purchased capacity unit contributes the same allowance bucket to your account.
        Allowances are shared across all your projects, not isolated per project.
      </Notice>

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
