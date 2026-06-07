import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import Link from 'next/link';

import { SectionTitle, SurfaceCard, SurfaceGrid } from '@/components/content-blocks';
import { createPageMetadata } from '@/seo';

export const metadata: Metadata = createPageMetadata({
  title: 'About',
  description: 'DebugBundle is a production debugging tool designed for AI agents and human developers.',
  path: '/about',
});

export default function AboutPage(): ReactElement {
  return (
    <div className="space-y-12">
      <SectionTitle
        eyebrow="About"
        title="A debugging tool built for agent workflows"
        description="DebugBundle is designed around one idea: agents and humans both debug faster when the input artifact is structured, compact, and deterministic."
      />

      <section className="max-w-3xl space-y-4 text-sm leading-7 text-[var(--site-text-muted)]">
        <p>
          Modern production systems generate enormous volumes of logs, traces, and error reports. The challenge is not collecting signals — it is turning those signals into actionable debugging context.
        </p>
        <p>
          DebugBundle captures production incidents, normalizes and groups events by fingerprint, assembles deterministic debug bundles, and delivers them through API, CLI, and MCP. The same bundle that a human developer reads in the terminal is the same artifact an AI agent processes programmatically.
        </p>
        <p>
          The project is built with a local-first architecture. You can capture, process, and inspect incidents without DebugBundle Cloud anywhere you control the filesystem and can run the CLI, from a laptop to a self-managed server. The hosted platform adds team collaboration, longer retention, remote probes, and automated improvement analysis, but the core debugging workflow is not locked behind the hosted service.
        </p>
      </section>

      <SurfaceGrid>
        <SurfaceCard title="Interface parity">
          API, CLI, and MCP are first-class equals. No capability is dashboard-only. Automation is not a second-class integration.
        </SurfaceCard>
        <SurfaceCard title="Deterministic output">
          Given the same events, DebugBundle produces byte-identical bundles. No random IDs, no wall-clock timestamps. Reproducible debugging artifacts every time.
        </SurfaceCard>
        <SurfaceCard title="SDK safety">
          SDKs never throw uncaught exceptions, block your request cycle, or crash the host process. Failures are caught internally and swallowed silently.
        </SurfaceCard>
      </SurfaceGrid>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[var(--site-text)]">Learn more</h2>
        <div className="flex flex-wrap gap-3">
          <Link className="text-sm text-[var(--site-accent)] underline" href="/docs/">
            Documentation
          </Link>
          <Link className="text-sm text-[var(--site-accent)] underline" href="/docs/quickstart/">
            Quick Start Guide
          </Link>
          <Link className="text-sm text-[var(--site-accent)] underline" href="/blog/">
            Blog
          </Link>
        </div>
      </section>
    </div>
  );
}
