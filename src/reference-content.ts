import { existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

import type { ReferenceData } from './reference-data.js';

export const referenceRouteEntries = [
  {
    title: 'API endpoints',
    href: '/docs/v1/reference/api-endpoints/',
    description: 'Generated from the public OpenAPI document.',
  },
  {
    title: 'CLI commands',
    href: '/docs/v1/reference/cli-commands/',
    description: 'Generated from the shipped CLI usage surface.',
  },
  {
    title: 'MCP tools',
    href: '/docs/v1/reference/mcp-tools/',
    description: 'Generated from the implemented MCP tool catalog.',
  },
  {
    title: 'Webhook events',
    href: '/docs/v1/reference/webhook-events/',
    description: 'Generated from the webhook event contract.',
  },
  {
    title: 'Bundle schema',
    href: '/docs/v1/reference/bundle-schema/',
    description: 'Links to the published schema and example artifacts.',
  },
  {
    title: 'Profile schema',
    href: '/docs/v1/reference/profile-schema/',
    description: 'Links to the published repository profile schema.',
  },
  {
    title: 'Error codes',
    href: '/docs/v1/reference/error-codes/',
    description: 'Extracted from the public interface contract.',
  },
] as const;

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

export function buildCliReferenceEntries(): ReferenceData['cliEntries'] {
  return readReferenceData().cliEntries;
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