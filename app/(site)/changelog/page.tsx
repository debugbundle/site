import type { Metadata } from 'next';
import type { ReactElement } from 'react';

import { SectionTitle, SurfaceCard } from '@/components/content-blocks';

export const metadata: Metadata = {
  title: 'Changelog — DebugBundle',
  description: 'Product updates, releases, and notable changes to DebugBundle.',
};

const entries = [
  {
    date: '24 March 2026',
    title: 'Public site launch',
    items: [
      'Landing page with product framing and quick-start guide',
      'Real pricing page with Free, Solo, and Team tier details',
      'Blog with launch posts on agent-first debugging and local-first development',
      'Privacy policy, terms of service, and security posture pages',
      'SEO metadata on all marketing pages',
      'Dynamic sitemap covering all marketing, docs, and blog routes',
    ],
  },
  {
    date: '23 March 2026',
    title: 'Documentation content complete',
    items: [
      '65 authored MDX documentation pages across P0/P1/P2 priority tiers',
      'Full sidebar navigation with consolidated section grouping',
      'Reference page styling parity',
      'Orama-based static search enabled across the full docs surface',
    ],
  },
  {
    date: '19 March 2026',
    title: 'Documentation infrastructure',
    items: [
      'Static public site scaffold with Next.js + Fumadocs',
      'Source-backed machine-readable artifacts (OpenAPI, JSON Schemas, MCP tools, llms.txt)',
      'Generated reference doc subtree from contracts',
      'MDX-backed docs and blog wiring',
    ],
  },
  {
    date: '15 March 2026',
    title: 'Browser SDK relay and durable delivery',
    items: [
      'Framework-agnostic browser relay core',
      'Express, Fastify, and Next.js relay adapters',
      'Durable spool-and-forward with server-side credential attachment',
      'Browser transport mode resolution per FR-REL-11',
    ],
  },
  {
    date: '10 March 2026',
    title: 'Local-first onboarding and runtime',
    items: [
      'Node SDK file transport for local event capture',
      'CLI local processing pipeline (process, incidents, bundle, reproduce)',
      'Log-based capture with debugbundle-ndjson, php-error, and apache-error formats',
      'Connected-mode upgrade path via debugbundle connect',
    ],
  },
];

export default function ChangelogPage(): ReactElement {
  return (
    <div className="space-y-10">
      <SectionTitle
        eyebrow="Changelog"
        title="Product updates"
        description="Notable releases, features, and changes to DebugBundle."
      />
      <div className="space-y-6">
        {entries.map((entry) => (
          <SurfaceCard key={entry.date} title={`${entry.date} — ${entry.title}`}>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {entry.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </SurfaceCard>
        ))}
      </div>
    </div>
  );
}