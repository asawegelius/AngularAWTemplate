# Releasing

This repository is currently in a phase 1 workflow where `develop` is the only protected branch.

## Current flow

1. Create a `feature/*` branch from `develop`.
2. Open a pull request back into `develop`.
3. Wait for the `build` and `test` checks to pass.
4. Merge through the pull request.

Approval requirements are intentionally disabled in this phase so the workflow works for a solo maintainer.

## Versioning

Use Semantic Versioning: `MAJOR.MINOR.PATCH`.

While the repository only has `develop`, treat versions as template milestones or preview releases instead of production releases.

If you need a shareable tagged snapshot before `test` and `main` exist, use a pre-release tag on `develop`, for example:

- `v0.3.0-beta.1`
- `v0.3.0-rc.1`

## Current preview milestone

The first release milestone for the modernized template is `v0.1.0-beta.1`.

Use this as a preview release from `develop` while the repository is still in the phase 1 workflow.

## GitHub releases

When you create a tagged milestone, prefer GitHub Releases with auto-generated release notes. That keeps dependency upgrades, fixes, and template changes easy to review later.

## Planned expansion

When `test` and `main` are added, move to the full strategy:

1. `feature/*` -> `develop`
2. `develop` -> `test`
3. `fix/*` from `test` when stabilization is needed
4. `test` -> `main`
5. Final release tags on `main`
