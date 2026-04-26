# Branch protection

This repository currently protects `develop` only. That is enough for the current solo-maintainer phase and still matches the intent of the broader branching strategy.

## Recommended `develop` settings

Enable the following settings for `develop` in GitHub:

- Require a pull request before merging
- Do not require approvals
- Require status checks to pass before merging
- Require conversation resolution before merging
- Require linear history
- Do not allow force pushes
- Do not allow branch deletion

## Required status checks

Use these checks from the CI workflow:

- `build`
- `test`

Approvals stay off on purpose because a pull request author cannot approve their own pull request. In a solo workflow, PR + CI gives control without creating a dead end.

## Later expansion

When the repository is ready for the full strategy, add equivalent protection to:

- `test`
- `main`

At that point, keep the same pull-request requirement and CI checks, and decide whether `main` should be stricter than `develop`.
