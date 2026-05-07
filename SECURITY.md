# Security Policy

## Reporting a Vulnerability

Do not report security issues in public issues, discussions, or pull requests.

Report vulnerabilities through GitHub's private vulnerability reporting flow for `debugbundle/site`:

- https://github.com/debugbundle/site/security/advisories/new

Include a clear description, impact assessment, affected version or commit, reproduction steps, and any mitigations you have already validated.

## Supported Versions

DebugBundle is pre-production. Security fixes are applied against the current main branch and the latest unreleased code in this repository.

## Response Expectations

- Initial triage within 3 business days.
- A follow-up status update after reproduction and impact assessment.
- Coordinated disclosure after a fix or mitigation is available.

## Scope

Security concerns for this repository include:

- Supply-chain or dependency issues that affect the public site build.
- Leaks of secrets or private data through vendored generated artifacts.
- Cross-site scripting or content injection flaws in rendered docs, blog, or marketing pages.
- Unsafe client-side handling of search-index or reference-data artifacts.

## Disclosure Process

Please avoid public issues until maintainers confirm a fix or mitigation window. Once a report is confirmed, maintainers will coordinate remediation, validation, and disclosure timing with the reporter when practical.