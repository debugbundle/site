# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog and this project follows Semantic Versioning once production is reached.

## [Unreleased]

## [1.2.4] - 2026-06-21

### Added

- Added a public managing-noise documentation page and linked it from the capture-policy and skill-file workflow docs so operational noise handling has a canonical public explanation.

### Changed

- Expanded the public terms page disclaimer language around incident-response failures and blackout-style outcomes so the hosted legal copy matches the current production risk posture.

## [1.2.1] - 2026-06-17

### Changed

- Promoted the public-site dogfooding manifest to `@debugbundle/sdk-browser@1.3.0` after the published JS SDK release completed.
- Clarified Browser SDK, browser-relay, and split frontend/backend docs so cross-origin first-party trace propagation, handled request-failure promotion, and fetch-header preservation match the shipped SDK behavior.

## [1.2.0] - 2026-06-08

### Added

- Added public availability-check documentation plus pricing, CLI, API, MCP, and workflow reference updates for the hosted health-check release.
- Shifted machine-readable artifact crawl control from `robots.txt` to a deploy-time `headers-manifest.json` so `llms.txt`, OpenAPI, schemas, examples, and search/reference JSON stay fetchable while returning `X-Robots-Tag: noindex, nofollow, noarchive`.

### Changed

- Updated the capture-policy, projects API, and MCP tool documentation for path-scoped client-error incident rules and the rule-management surfaces added in this release train.
- Promoted the public-site dogfooding manifest to `@debugbundle/sdk-browser@1.1.0` after the published browser SDK release completed.

## [1.1.0] - 2026-06-04

### Changed

- Updated pricing, billing, API, CLI, and MCP public documentation for the new 30-day no-card Solo and Team trial onboarding flow, including trial billing-state fields and hosted billing remaining-days guidance.
- Expanded the public pricing and homepage copy so hosted trial signup and no-card conversion expectations match the shipped product flow.

## [1.0.1] - 2026-06-03

### Changed

- Refreshed alert, incident, bundle, API, CLI, and MCP documentation for alert cooldowns and the new opaque browser-native severity defaults.
- Promoted the public-site dogfooding manifest to `@debugbundle/sdk-browser@1.0.1` after the published browser SDK release completed.

## [0.1.2] - 2026-05-19

### Changed

- Updated the public PHP SDK documentation to reflect the supported PHP 8.2+ runtime floor.

## [0.1.1] - 2026-05-13

### Added

- Public documentation for interactive CLI auth bootstrap, including `debugbundle login` TTY selection, GitHub device flow, `gh`-based headless login, and `debugbundle connect` auth recovery.

### Changed

- Refreshed generated Next route types after the latest standalone site build verification.

## [0.1.0] - 2026-05-07

### Added

- Initial standalone `debugbundle/site` repository baseline with public marketing pages, docs, blog content, machine-readable artifacts, and dedicated CI/release workflows.
- Static-export release metadata, governance files, and the public `/.well-known/security.txt` disclosure endpoint for the docs and marketing surface.

### Changed

- Finalized the standalone site build to consume vendored generated artifacts and local search-index generation without importing source directly from the core product repo.
