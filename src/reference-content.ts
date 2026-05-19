import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { ApiReferenceEntry, CliReferenceEntry, ReferenceData } from './reference-data.js';

export const referenceRouteEntries = [
  {
    title: 'API endpoints',
    href: '/docs/v1/reference/api-endpoints/',
    description: 'Generated from the public OpenAPI document.',
    icon: 'Braces',
  },
  {
    title: 'CLI commands',
    href: '/docs/v1/reference/cli-commands/',
    description: 'Generated from the shipped CLI usage surface.',
    icon: 'SquareTerminal',
  },
  {
    title: 'MCP tools',
    href: '/docs/v1/reference/mcp-tools/',
    description: 'Generated from the implemented MCP tool catalog.',
    icon: 'Bot',
  },
  {
    title: 'Webhook events',
    href: '/docs/v1/reference/webhook-events/',
    description: 'Generated from the webhook event contract.',
    icon: 'Webhook',
  },
  {
    title: 'Bundle schema',
    href: '/docs/v1/reference/bundle-schema/',
    description: 'Links to the published schema and example artifacts.',
    icon: 'Package',
  },
  {
    title: 'Profile schema',
    href: '/docs/v1/reference/profile-schema/',
    description: 'Links to the published repository profile schema.',
    icon: 'FileCode',
  },
  {
    title: 'Error codes',
    href: '/docs/v1/reference/error-codes/',
    description: 'Extracted from the public interface contract.',
    icon: 'CircleAlert',
  },
] as const;

type ApiReferenceGroup = {
  group: string;
  label: string;
  entries: ApiReferenceEntry[];
};

type CliReferenceGroup = {
  group: string;
  label: string;
  entries: CliReferenceEntry[];
};

function resolvePublicSiteRoot(): string {
  const cwd = process.cwd();

  if (existsSync(join(cwd, 'public', 'reference-data.json'))) {
    return cwd;
  }

  return join(cwd, 'site');
}

function readReferenceData(): ReferenceData {
  const publicSiteRoot = resolvePublicSiteRoot();
  const content = readFileSync(join(publicSiteRoot, 'public', 'reference-data.json'), 'utf8');
  return JSON.parse(content) as ReferenceData;
}

export function buildApiReferenceEntries(): ReferenceData['apiEntries'] {
  return readReferenceData().apiEntries;
}

export function buildApiReferenceGroups(): ApiReferenceGroup[] {
  const groups = new Map<string, ApiReferenceEntry[]>();

  for (const entry of buildApiReferenceEntries()) {
    const key = entry.tags[0] ?? 'Other';
    const current = groups.get(key);
    if (current) current.push(entry);
    else groups.set(key, [entry]);
  }

  return Array.from(groups.entries()).map(([group, entries]) => ({
    group,
    label: group,
    entries,
  }));
}

export function buildCliReferenceEntries(): ReferenceData['cliEntries'] {
  return readReferenceData().cliEntries;
}

function formatCliGroupLabel(group: string): string {
  return group
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function buildCliReferenceGroups(): CliReferenceGroup[] {
  const groups = new Map<string, CliReferenceEntry[]>();

  for (const entry of buildCliReferenceEntries()) {
    const key = entry.group || 'other';
    const current = groups.get(key);
    if (current) current.push(entry);
    else groups.set(key, [entry]);
  }

  return Array.from(groups.entries()).map(([group, entries]) => ({
    group,
    label: formatCliGroupLabel(group),
    entries,
  }));
}

export function buildMcpToolReferenceGroups(): ReferenceData['mcpGroups'] {
  return readReferenceData().mcpGroups;
}

export function buildWebhookReference(): ReferenceData['webhookReference'] {
  return readReferenceData().webhookReference;
}

export function buildSchemaReferenceLinks(): ReferenceData['schemaLinks'] {
  return readReferenceData().schemaLinks;
}

export function buildErrorCodeReference(): ReferenceData['errorReference'] {
  return readReferenceData().errorReference;
}
