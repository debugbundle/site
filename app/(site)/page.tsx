import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import Link from 'next/link';

import { SectionTitle, SurfaceCard, SurfaceGrid, TerminalExample } from '@/components/content-blocks';

export const metadata: Metadata = {
  title: 'DebugBundle — Production debugging for AI agents',
  description:
    'DebugBundle captures incidents, assembles deterministic debugging context, and delivers structured bundles through API, CLI, and MCP.',
  openGraph: {
    title: 'DebugBundle — Production debugging for AI agents',
    description:
      'Structured debug bundles for humans and AI agents. Capture incidents, reproduce failures, and resolve issues faster.',
    url: 'https://debugbundle.com',
    siteName: 'DebugBundle',
    type: 'website',
  },
};

export default function HomePage(): ReactElement {
  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'DebugBundle',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cross-platform',
    url: 'https://debugbundle.com',
    description:
      'AI-agent-first runtime debugging platform. Captures production failures, packages them into structured debug bundles, and delivers them through API, CLI, and MCP.',
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: '0',
      highPrice: '49',
      priceCurrency: 'USD',
    },
  };

  return (
    <div className="space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      {/* Hero */}
      <section className="space-y-8 rounded-[2rem] border border-[var(--site-border)] bg-[var(--site-surface)] p-8 sm:p-12">
        <SectionTitle
          eyebrow="Production debugging for agents"
          title="The agent-native debugging layer for modern products"
          description="DebugBundle captures production incidents, assembles deterministic debugging context, and delivers the result through API, CLI, MCP, and agent-friendly machine-readable artifacts — so both humans and AI agents can diagnose and fix failures faster."
        />
        <div className="flex flex-wrap gap-3">
          <Link
            className="rounded-full px-5 py-3 text-sm font-medium"
            href="/docs/"
            style={{ background: 'var(--site-accent)', color: 'var(--site-accent-foreground)' }}
          >
            Read Docs
          </Link>
          <Link
            className="rounded-full border border-[var(--site-border)] px-5 py-3 text-sm font-medium"
            href="https://app.debugbundle.com"
          >
            Open App
          </Link>
        </div>
      </section>

      {/* How it works — high-level */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--site-text)]">
          How DebugBundle works
        </h2>
        <div className="grid gap-4 md:grid-cols-4">
          {[
            { step: '1', label: 'Capture', detail: 'SDKs capture exceptions, requests, logs, and probes from your application.' },
            { step: '2', label: 'Normalize', detail: 'Events are fingerprinted, grouped into incidents, and redacted automatically.' },
            { step: '3', label: 'Bundle', detail: 'A deterministic debug bundle is assembled with full incident context.' },
            { step: '4', label: 'Resolve', detail: 'Agents and humans retrieve bundles via API, CLI, or MCP and fix the issue.' },
          ].map((s) => (
            <div key={s.step} className="rounded-2xl border border-[var(--site-border)] bg-[var(--site-surface)] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--site-accent)]">Step {s.step}</p>
              <p className="mt-1 text-base font-semibold text-[var(--site-text)]">{s.label}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--site-text-muted)]">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Value propositions */}
      <SurfaceGrid>
        <SurfaceCard title="Human and machine readable">
          Every bundle is a structured JSON artifact. The public site publishes llms.txt, OpenAPI, JSON Schemas, and examples under stable URLs.
        </SurfaceCard>
        <SurfaceCard title="Local-first by default">
          Start with zero cloud dependencies. DebugBundle runs entirely on your machine — capture, process, and inspect incidents locally before connecting to hosted services.
        </SurfaceCard>
        <SurfaceCard title="Agent-native interfaces">
          API, CLI, and MCP are first-class equals. No capability is dashboard-only. Agents can fetch bundles, run reproductions, and resolve incidents programmatically.
        </SurfaceCard>
      </SurfaceGrid>

      <SurfaceGrid>
        <SurfaceCard title="Deterministic bundles">
          Given the same events, DebugBundle produces byte-identical output. No random IDs, no wall-clock timestamps in generation. Reproducible debugging artifacts every time.
        </SurfaceCard>
        <SurfaceCard title="SDK safety guarantee">
          SDKs never throw uncaught exceptions, block your request/response cycle, or crash the host process. Failures are caught internally and swallowed silently.
        </SurfaceCard>
        <SurfaceCard title="Same source of truth">
          Docs, examples, schemas, and reference pages are generated from the same contracts that power the product. What you read is what the system enforces.
        </SurfaceCard>
      </SurfaceGrid>

      {/* Quick-start terminal example */}
      <TerminalExample
        title="Get started in under 5 minutes"
        lines={[
          '$ npm install @debugbundle/sdk-node @debugbundle/cli',
          '$ npx debugbundle setup',
          '$ npx debugbundle doctor',
          '# Trigger an error in your app, then:',
          '$ npx debugbundle process',
          '$ npx debugbundle incidents',
        ]}
      />

      {/* Interfaces overview */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--site-text)]">
          Every interface, same capabilities
        </h2>
        <p className="max-w-3xl text-base leading-7 text-[var(--site-text-muted)]">
          DebugBundle enforces interface parity. If a capability matters for automation, it is available through API, CLI, and MCP — not locked behind a dashboard.
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { label: 'REST API', href: '/docs/v1/api/', detail: 'Ingestion, retrieval, management, webhooks, and billing.' },
            { label: 'CLI', href: '/docs/v1/cli/', detail: 'Setup, capture, process, inspect, and manage from the terminal.' },
            { label: 'MCP', href: '/docs/v1/mcp/', detail: 'Model Context Protocol tools for agent-driven workflows.' },
          ].map((item) => (
            <Link
              key={item.label}
              className="rounded-2xl border border-[var(--site-border)] bg-[var(--site-surface)] p-5 transition hover:border-[var(--site-accent)]"
              href={item.href}
            >
              <p className="text-base font-semibold text-[var(--site-text)]">{item.label}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--site-text-muted)]">{item.detail}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-[2rem] border border-[var(--site-border-strong)] bg-[var(--site-surface-muted)] p-8 text-center sm:p-12">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--site-text)]">
          Ready to debug smarter?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[var(--site-text-muted)]">
          Start local-first with the free tier. Connect to hosted DebugBundle when you need cloud processing, team collaboration, and remote probes.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            className="rounded-full px-6 py-3 text-sm font-medium"
            href="/docs/quickstart/"
            style={{ background: 'var(--site-accent)', color: 'var(--site-accent-foreground)' }}
          >
            Quick Start Guide
          </Link>
          <Link
            className="rounded-full border border-[var(--site-border)] px-6 py-3 text-sm font-medium"
            href="/pricing/"
          >
            View Pricing
          </Link>
        </div>
      </section>
    </div>
  );
}