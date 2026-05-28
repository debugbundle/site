import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import Link from 'next/link';
import {
  Bot,
  BookOpen,
  Braces,
  CheckCircle2,
  Coffee,
  FileJson,
  Fingerprint,
  Gem,
  Hexagon,
  Package,
  PanelsTopLeft,
  Radar,
  RotateCcw,
  ShieldCheck,
  SquareTerminal,
  Terminal,
  Workflow,
} from 'lucide-react';

import { SectionTitle, SurfaceCard } from '@/components/content-blocks';
import { JsonLdScript } from '@/components/json-ld';
import { QuickInstallGuide } from '@/components/quick-install-guide';

const docsLinkClassName =
  'text-sm font-medium !text-[var(--site-docs-link)] !underline !decoration-[var(--site-docs-link)] decoration-[0.08em] underline-offset-[0.16em] transition-[color,text-decoration-color,text-decoration-thickness] duration-200 hover:!text-[var(--site-docs-link-hover)] hover:!decoration-[var(--site-docs-link-hover)] hover:!decoration-[0.12em] focus-visible:rounded-sm focus-visible:[outline-color:var(--site-focus)] focus-visible:[outline-style:solid] focus-visible:[outline-width:2px] focus-visible:[outline-offset:2px]';
const buttonFocusClassName =
  'focus-visible:rounded-full focus-visible:[outline-color:var(--site-focus)] focus-visible:[outline-style:solid] focus-visible:[outline-width:2px] focus-visible:[outline-offset:2px]';

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
  const workflowSteps = [
    {
      step: '1',
      label: 'Capture',
      detail: 'SDKs capture exceptions, requests, logs, breadcrumbs, and probes from your app.',
      icon: Radar,
    },
    {
      step: '2',
      label: 'Normalize',
      detail: 'Events are redacted, fingerprinted, and grouped into incidents automatically.',
      icon: Fingerprint,
    },
    {
      step: '3',
      label: 'Bundle',
      detail: 'DebugBundle assembles deterministic incident context with reproduction hints.',
      icon: FileJson,
    },
    {
      step: '4',
      label: 'Resolve',
      detail: 'Humans and agents inspect the same bundle through dashboards, API, CLI, or MCP.',
      icon: CheckCircle2,
    },
  ];

  const installOptions = [
    {
      label: 'CLI',
      command: 'npm install -g @debugbundle/cli',
      href: '/docs/cli/',
      icon: SquareTerminal,
    },
    {
      label: 'Node.js',
      command: 'npm install @debugbundle/sdk-node',
      href: '/docs/sdks/node/',
      icon: Hexagon,
    },
    {
      label: 'Browser',
      command: 'npm install @debugbundle/sdk-browser',
      href: '/docs/sdks/browser/',
      icon: PanelsTopLeft,
    },
    {
      label: 'Python',
      command: 'pip install debugbundle-python',
      href: '/docs/sdks/python/',
      icon: Package,
    },
    {
      label: 'PHP',
      command: 'composer require debugbundle/sdk-php',
      href: '/docs/sdks/php/',
      icon: Package,
    },
    {
      label: 'Java / Spring',
      command: 'com.debugbundle:debugbundle-spring-boot-starter',
      href: '/docs/sdks/java/',
      icon: Coffee,
    },
    {
      label: 'Go',
      command: 'go get github.com/debugbundle/debugbundle-go',
      href: '/docs/sdks/go/',
      icon: Package,
    },
    {
      label: 'Ruby',
      command: 'bundle add debugbundle',
      href: '/docs/sdks/ruby/',
      icon: Gem,
    },
    {
      label: 'WordPress',
      command: 'Install the DebugBundle plugin',
      href: '/docs/integrations/wordpress/',
      icon: Workflow,
    },
  ];

  const agentStrengths = [
    {
      title: 'Human and machine readable',
      detail: 'Structured JSON bundles, llms.txt, OpenAPI, JSON Schemas, and stable examples.',
      icon: FileJson,
    },
    {
      title: 'Agent-native interfaces',
      detail: 'API, CLI, and MCP expose the same workflows. No important capability is dashboard-only.',
      icon: Bot,
    },
    {
      title: 'Same source of truth',
      detail: 'Docs and references are generated from the contracts that power the product.',
      icon: Braces,
    },
  ];

  const productionStrengths = [
    {
      title: 'Local-first by default',
      detail: 'Capture, process, and inspect incidents locally before connecting hosted services.',
      icon: Terminal,
    },
    {
      title: 'Deterministic bundles',
      detail: 'The same events produce byte-identical output with no random IDs or generation-time clocks.',
      icon: RotateCcw,
    },
    {
      title: 'SDK safety guarantee',
      detail: 'SDKs do not throw uncaught exceptions, block requests, or crash the host process.',
      icon: ShieldCheck,
    },
  ];

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
    <div className="space-y-12 sm:space-y-16">
      <JsonLdScript id="software-jsonld" data={softwareJsonLd} />
      {/* Hero */}
      <section className="space-y-6 rounded-[1.75rem] border border-[var(--site-border)] bg-[var(--site-surface)] px-5 py-6 sm:space-y-8 sm:p-12">
        <SectionTitle
          eyebrow="Production debugging for agents"
          title="The agent-native debugging layer for modern products"
          description="DebugBundle captures production incidents, assembles deterministic debugging context, and delivers it through API, CLI, MCP, dashboards, and machine-readable artifacts so humans and AI agents can diagnose failures faster."
        />
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium sm:justify-start ${buttonFocusClassName}`}
            href="/docs/"
            style={{ background: 'var(--site-accent)', color: 'var(--site-accent-foreground)' }}
          >
            <BookOpen className="size-4" aria-hidden="true" />
            Read Docs
          </Link>
          <Link
            className={`inline-flex items-center justify-center rounded-full border border-[var(--site-border)] px-5 py-3 text-sm font-medium ${buttonFocusClassName}`}
            href="https://app.debugbundle.com"
          >
            Open App
          </Link>
        </div>
      </section>

      {/* How it works — high-level */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--site-text)]">
          How it works
        </h2>
        <div className="grid gap-4 md:grid-cols-4">
          {workflowSteps.map((s) => (
            <div key={s.step} className="rounded-lg border border-[var(--site-border)] bg-[var(--site-surface)] p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--site-text-subtle)]">
                  Step {s.step}
                </p>
                <s.icon className="size-5 text-[var(--site-accent)]" aria-hidden="true" />
              </div>
              <p className="mt-3 text-base font-semibold text-[var(--site-text)]">{s.label}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--site-text-muted)]">{s.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Quick installation guide */}
      <QuickInstallGuide />

      {/* Install paths */}
      <section className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--site-text)]">
              Install the path that matches your stack
            </h2>
            <p className="text-base leading-7 text-[var(--site-text-muted)]">
              Start with the CLI, then add the smallest SDK or ingestion path for your app.
            </p>
          </div>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {installOptions.map((option) => (
            <Link
              key={option.label}
              className="group min-w-0 rounded-lg border border-[var(--site-border)] bg-[var(--site-surface)] p-4 transition hover:border-[var(--site-border-strong)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--site-focus)]"
              href={option.href}
            >
              <div className="flex items-center gap-3">
                <option.icon className="size-5 text-[var(--site-accent)]" aria-hidden="true" />
                <p className="font-semibold text-[var(--site-text)]">{option.label}</p>
              </div>
              <code className="mt-3 block overflow-hidden whitespace-normal break-all rounded-md border border-[var(--site-code-border)] bg-[var(--site-code-bg)] px-3 py-2 text-xs leading-5 text-[var(--site-code-text)]">
                {option.command}
              </code>
            </Link>
          ))}
        </div>
      </section>

      {/* Product strengths */}
      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-lg border border-[var(--site-border)] bg-[var(--site-surface)] p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--site-text)]">Built for agents</h2>
          <ul className="mt-5 space-y-5">
            {agentStrengths.map((item) => (
              <li key={item.title} className="flex gap-4">
                <item.icon className="mt-0.5 size-5 shrink-0 text-[var(--site-accent)]" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-[var(--site-text)]">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--site-text-muted)]">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-[var(--site-border)] bg-[var(--site-surface)] p-6">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--site-text)]">Built for production apps</h2>
          <ul className="mt-5 space-y-5">
            {productionStrengths.map((item) => (
              <li key={item.title} className="flex gap-4">
                <item.icon className="mt-0.5 size-5 shrink-0 text-[var(--site-accent)]" aria-hidden="true" />
                <div>
                  <p className="font-semibold text-[var(--site-text)]">{item.title}</p>
                  <p className="mt-1 text-sm leading-6 text-[var(--site-text-muted)]">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

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
            {
              label: 'REST API',
              href: '/docs/v1/api/',
              detail: 'Ingestion, retrieval, management, webhooks, and billing.',
              icon: Braces,
            },
            {
              label: 'CLI',
              href: '/docs/v1/cli/',
              detail: 'Setup, capture, process, inspect, and manage from the terminal.',
              icon: SquareTerminal,
            },
            {
              label: 'MCP',
              href: '/docs/v1/mcp/',
              detail: 'Model Context Protocol tools for agent-driven workflows.',
              icon: Bot,
            },
          ].map((item) => (
            <SurfaceCard key={item.label} href={item.href} icon={item.icon} title={item.label}>
              {item.detail}
            </SurfaceCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-[1.75rem] border border-[var(--site-border-strong)] bg-[var(--site-surface-muted)] p-6 text-center sm:p-12">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--site-text)]">
          Ready to debug smarter?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[var(--site-text-muted)]">
          Start locally, or use the hosted free tier when you want cloud ingestion. Upgrade when you need team collaboration, longer retention, and advanced features.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
          <Link
            className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium ${buttonFocusClassName}`}
            href="/docs/quickstart/"
            style={{ background: 'var(--site-accent)', color: 'var(--site-accent-foreground)' }}
          >
            <BookOpen className="size-4" aria-hidden="true" />
            Quick Start Guide
          </Link>
          <Link
            className={`inline-flex items-center justify-center rounded-full border border-[var(--site-border)] px-6 py-3 text-sm font-medium ${buttonFocusClassName}`}
            href="https://app.debugbundle.com"
          >
            Open App
          </Link>
        </div>
      </section>
    </div>
  );
}
