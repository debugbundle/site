# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog and this project follows Semantic Versioning once production is reached.

## [Unreleased]

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
