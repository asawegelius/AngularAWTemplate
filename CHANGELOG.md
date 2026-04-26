# Changelog

All notable changes to this project will be documented in this file.

The format is inspired by Keep a Changelog, and this repository uses Semantic Versioning for template milestones.

## [Unreleased]

## [0.1.0-beta.1] - 2026-04-26

### Added

- Added GitHub Actions CI for `build` and `test` on `develop`.
- Added Dependabot configuration for Angular, NgRx, and tooling updates.
- Added `RELEASING.md` and `BRANCH_PROTECTION.md` for the current repository workflow.
- Added `CHANGELOG.md` to track template milestone releases.

### Changed

- Upgraded the template to Angular 20, NgRx 20, TypeScript 5.8, and matching build tooling.
- Migrated the application build to `browser-esbuild`.
- Migrated unit testing from Karma/Jasmine to Vitest.
- Migrated the app shell and sample feature to standalone Angular bootstrap, components, and route providers.
- Modernized the sample feature NgRx structure with `createFeature`, `@ngrx/entity`, and a facade layer.
- Simplified the API URL layer to use `ApiUrlService`, endpoint constants, and a smaller reusable resource pattern.
- Refreshed the README and regenerated Compodoc documentation to match the current architecture.

### Removed

- Removed the old `accounts` demo feature and the modal flow that only existed to support it.
- Removed the old shared-module wrappers in favor of direct standalone component imports.
- Removed legacy API URL builder utilities and other outdated module-based template leftovers.

### Notes

- This is a preview milestone release from `develop` while the repository is still using the phase 1 workflow with a single protected branch.
