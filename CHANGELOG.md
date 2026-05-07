# Changelog

All notable changes to this project will be documented in this file.

The format is based on Keep a Changelog and this project follows Semantic Versioning once production is reached.

## [Unreleased]

## [0.1.0] - 2026-05-07

### Added

- Initial standalone `debugbundle/site` repository baseline with public marketing pages, docs, blog content, machine-readable artifacts, and dedicated CI/release workflows.
- Static-export release metadata, governance files, and the public `/.well-known/security.txt` disclosure endpoint for the docs and marketing surface.

### Changed

- Finalized the standalone site build to consume vendored generated artifacts and local search-index generation without importing source directly from the core product repo.