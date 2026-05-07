import type { Metadata } from 'next';
import type { ReactElement } from 'react';
import Link from 'next/link';

import { SectionTitle, SurfaceCard, SurfaceGrid } from '@/components/content-blocks';

export const metadata: Metadata = {
  title: 'Security — DebugBundle',
  description: 'How DebugBundle protects your data: redaction, token management, and security architecture.',
};

export default function SecurityPage(): ReactElement {
  return (
    <div className="space-y-10">
      <SectionTitle
        eyebrow="Security"
        title="Security posture"
        description="DebugBundle is built with security as a core product concern. Sensitive data redaction, token scope separation, and secure defaults are architectural requirements, not afterthoughts."
      />

      <SurfaceGrid>
        <SurfaceCard title="Automatic redaction">
          Passwords, authentication headers, cookies, card numbers, and SSNs are automatically scrubbed before storage. Custom redaction patterns are supported.{' '}
          <Link className="text-[var(--site-accent)] underline" href="/docs/security/redaction/">
            Learn more
          </Link>
        </SurfaceCard>
        <SurfaceCard title="Token scope separation">
          Project tokens are write-only (SDK ingestion). Member tokens are read/manage (CLI, API, MCP). These scopes are never conflated.{' '}
          <Link className="text-[var(--site-accent)] underline" href="/docs/security/tokens/">
            Token docs
          </Link>
        </SurfaceCard>
        <SurfaceCard title="Hashed credentials">
          All tokens are hashed at rest using SHA-256. Plaintext is shown exactly once at creation and never stored. Passwords use bcrypt.
        </SurfaceCard>
      </SurfaceGrid>

      <SurfaceGrid>
        <SurfaceCard title="Webhook signatures">
          All webhook payloads are signed with HMAC-SHA256 so receivers can verify authenticity. Signing secrets are revealed once at creation.
        </SurfaceCard>
        <SurfaceCard title="Input validation">
          All external inputs are validated with Zod schemas at system boundaries. Internal stack traces are never exposed to clients.
        </SurfaceCard>
        <SurfaceCard title="Local-first privacy">
          In local-only mode, no data leaves your machine. All processing happens locally with zero network requests to DebugBundle servers.
        </SurfaceCard>
      </SurfaceGrid>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[var(--site-text)]">Security documentation</h2>
        <p className="max-w-3xl text-sm leading-7 text-[var(--site-text-muted)]">
          For detailed security information, see the security section in the{' '}
          <Link className="text-[var(--site-accent)] underline" href="/docs/security/">
            documentation
          </Link>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-[var(--site-text)]">Reporting vulnerabilities</h2>
        <p className="max-w-3xl text-sm leading-7 text-[var(--site-text-muted)]">
          If you discover a security vulnerability, please report it responsibly. Do not open public issues for security reports. See the SECURITY.md file in the project repository for reporting instructions.
        </p>
      </section>
    </div>
  );
}