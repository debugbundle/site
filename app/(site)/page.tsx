import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import Link from 'next/link';
import {
  Bot,
  BellRing,
  BookOpen,
  Braces,
  FileJson,
  Lightbulb,
  Radar,
  RotateCcw,
  ShieldCheck,
  GitPullRequestArrow,
  SquareTerminal,
  Terminal,
  Workflow,
  Siren,
} from 'lucide-react';

import { SurfaceCard } from '@/components/content-blocks';
import { HeroSignalField } from '@/components/hero-signal-field';
import { JsonLdScript } from '@/components/json-ld';
import { QuickInstallGuide } from '@/components/quick-install-guide';
import { absoluteSiteUrl, createPageMetadata } from '@/seo';

const buttonFocusClassName =
  'focus-visible:rounded-full focus-visible:[outline-color:var(--site-focus)] focus-visible:[outline-style:solid] focus-visible:[outline-width:2px] focus-visible:[outline-offset:2px]';

export const metadata: Metadata = createPageMetadata({
  title: 'Production debugging for AI agents',
  description:
    'DebugBundle captures incidents, assembles deterministic debugging context, and delivers structured bundles through API, CLI, and MCP.',
  path: '/',
});

export default function HomePage(): ReactElement {
  const workflowSteps = [
    {
      step: '1',
      label: 'Capture',
      detail: 'SDKs capture exceptions, requests, logs, breadcrumbs, and probes from your app.',
    },
    {
      step: '2',
      label: 'Normalize',
      detail: 'Events are redacted, fingerprinted, and grouped into incidents automatically.',
    },
    {
      step: '3',
      label: 'Bundle',
      detail: 'DebugBundle assembles deterministic incident context with reproduction hints.',
    },
    {
      step: '4',
      label: 'Resolve',
      detail: 'Humans and agents inspect the same bundle through dashboards, API, CLI, or MCP.',
    },
  ];

  const agentStrengths = [
    {
      title: 'Agent-ready artifacts',
      detail: 'JSON bundles, schemas, and examples that agents can inspect reliably.',
      icon: FileJson,
    },
    {
      title: 'Same workflow everywhere',
      detail: 'API, CLI, and MCP expose the same capture, inspect, and resolve flow.',
      icon: Workflow,
    },
    {
      title: 'Deterministic by design',
      detail: 'The same incident produces stable, repeatable output.',
      icon: RotateCcw,
    },
    {
      title: 'Safe in production',
      detail: 'SDKs avoid blocking requests, crashing hosts, or throwing uncaught exceptions.',
      icon: ShieldCheck,
    },
  ];

  const debugBenefits = [
    {
      title: 'Know when errors happen',
      detail:
        'Turn unexpected exceptions, request failures, and critical logs into incidents and alerts instead of waiting for someone to notice a log line.',
      icon: BellRing,
    },
    {
      title: 'Capture the full context',
      detail:
        'Keep the surrounding request, response, logs, breadcrumbs, deploy metadata, and runtime details with the incident so debugging starts with evidence, not guesswork.',
      icon: FileJson,
    },
    {
      title: 'Find hidden improvements',
      detail:
        'Promote repeated warnings, slow paths, and recurring request patterns into improvement opportunities before they grow into failures.',
      icon: Lightbulb,
    },
    {
      title: 'Alert on critical paths',
      detail:
        'Create custom alerts for high-value routes, jobs, and services that may never surface in user-facing dashboards but still matter to the business.',
      icon: Siren,
    },
    {
      title: 'Incident to PR',
      detail:
        'Send bundles through webhooks, API, CLI, or MCP so an agent can inspect the incident, reason over the codebase, and open a proposed fix.',
      icon: GitPullRequestArrow,
    },
    {
      title: 'Remote probes on demand',
      detail:
        'Enable remote probes temporarily to expose deeper runtime details on a running service without deploying new debugging code.',
      icon: Radar,
    },
  ];

  const softwareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'DebugBundle',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cross-platform',
    url: absoluteSiteUrl('/'),
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
    <div className="space-y-12 sm:space-y-16 lg:space-y-32">
      <JsonLdScript id="software-jsonld" data={softwareJsonLd} />
      {/* Hero */}
      <section className="relative isolate overflow-visible py-2 text-center sm:py-4 lg:pt-10">
        <HeroSignalField />
        <div className="relative z-10 space-y-6 sm:space-y-8">
          <div className="mx-auto max-w-4xl space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--site-text-subtle)]">
              Production debugging <span className="whitespace-nowrap">for AI agents</span>
            </p>
            <h1 className="mx-auto max-w-[700px] text-4xl font-semibold tracking-tight text-[var(--site-text)] sm:text-5xl">
              Turn production errors into agent-ready debug bundles
            </h1>
            <p className="mx-auto max-w-3xl text-base leading-7 text-[var(--site-text-muted)] sm:text-lg">
              DebugBundle turns production incidents into deterministic debugging context, available through API, CLI, MCP, and the dashboard, so humans and AI agents can diagnose and resolve failures faster.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium ${buttonFocusClassName}`}
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
        </div>
      </section>

      {/* Quick installation guide */}
      <div className="relative z-10">
        <QuickInstallGuide className="site-home-elevated" />
      </div>

      {/* Why DebugBundle */}
      <section className="space-y-6">
        <div className="max-w-3xl space-y-3">
          <div className="flex items-center gap-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--site-text-subtle)]">
              Why use DebugBundle?
            </p>
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--site-text)] sm:text-3xl">
            Logs tell you what happened.
            <br />
            DebugBundle tells you what to do next.
          </h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {debugBenefits.map((item) => (
            <div
              key={item.title}
              className="site-home-elevated rounded-lg border border-[var(--site-border)] bg-[var(--site-surface)] p-5"
            >
              <item.icon className="size-8 text-[var(--site-accent)]" aria-hidden="true" />
              <h3 className="mt-4 text-base font-semibold leading-6 text-[var(--site-text)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--site-text-muted)]">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

            {/* How it works — high-level */}
      <section className="space-y-8 text-center">
        <div className="mx-auto max-w-[600px] space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--site-text)] sm:text-3xl">
            How it works
          </h2>
          <p className="text-base leading-7 text-[var(--site-text-muted)]">
            Capture the incident, normalize the signal, assemble the bundle, and inspect the same artifact everywhere.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl gap-4 lg:max-w-[900px] md:grid-cols-2">
          {workflowSteps.map((s) => (
            <div
              key={s.step}
              className="site-home-elevated rounded-lg border border-[var(--site-border)] bg-[var(--site-surface)] p-5 text-left"
            >
              <div className="flex items-center gap-3">
                <div
                  className="flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                  style={{
                    background: 'var(--site-accent)',
                    color: 'var(--site-accent-foreground)',
                  }}
                  aria-hidden="true"
                >
                  {s.step}
                </div>
                <p className="text-base font-semibold text-[var(--site-text)]">{s.label}</p>
              </div>
              <p className="mt-3 text-sm leading-6 text-[var(--site-text-muted)]">{s.detail}</p>
            </div>
          ))}
        </div>
        <div className="site-home-elevated mx-auto max-w-[1000px] overflow-hidden rounded-[1rem]">
          <img
            src="/images/how-it-works-light.jpg"
            alt="DebugBundle workflow overview in light mode"
            className="block w-full dark:hidden"
          />
          <img
            src="/images/how-it-works-dark.jpg"
            alt="DebugBundle workflow overview in dark mode"
            className="hidden w-full dark:block"
          />
        </div>
      </section>

      {/* Platform strengths */}
      <section>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-10">
          <div className="space-y-4 lg:pr-6">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[var(--site-text-subtle)]">
              Platform strengths
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-[var(--site-text)] sm:text-3xl">
              Built for production AI debugging
            </h2>
            <p className="max-w-xl text-base leading-7 text-[var(--site-text-muted)]">
              DebugBundle is shaped for real incident response: stable artifacts for agents, the same operational flow across interfaces, and runtime safety that does not fight your production stack.
            </p>
          </div>

          <div className="site-home-elevated rounded-[1.5rem] border border-[var(--site-border)] bg-[var(--site-surface)]">
            <div className="grid lg:grid-cols-2">
              {agentStrengths.map((item, index) => (
                <div
                  key={item.title}
                  className={[
                    'p-6 sm:p-7',
                    index < agentStrengths.length - 1 ? 'border-b border-[var(--site-border)]' : '',
                    index >= 2 ? 'lg:border-b-0' : '',
                    index % 2 === 0 ? 'lg:border-r lg:border-[var(--site-border)]' : '',
                  ]
                    .filter(Boolean)
                    .join(' ')}
                >
                  <div className="min-w-0">
                    {/* <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--site-text-subtle)]">
                      {String(index + 1).padStart(2, '0')}
                    </p> */}
                    <h3 className="mt-2 text-base font-semibold leading-6 text-[var(--site-text)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--site-text-muted)]">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Interfaces overview */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight text-[var(--site-text)]">
          Every interface, same capabilities
        </h2>
        <p className="max-w-3xl text-base leading-7 text-[var(--site-text-muted)]">
          DebugBundle keeps the API, CLI, and MCP in sync, so every automation-critical capability is available wherever teams work, with the dashboard available for visual triage.
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
            <SurfaceCard
              key={item.label}
              className="site-home-elevated"
              href={item.href}
              icon={item.icon}
              title={item.label}
            >
              {item.detail}
            </SurfaceCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="p-6 text-center sm:p-12">
        <h2 className="text-4xl font-semibold tracking-tight text-[var(--site-text)] sm:text-5xl">
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
