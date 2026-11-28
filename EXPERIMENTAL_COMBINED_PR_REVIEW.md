# Experimental combined PR review — 2026-11-28

This branch is an isolated snapshot of the current `main` commit for review of PRs #40, #35, and #27 together.

## Why the PR heads were not copied over

The PR branches are older than current `main`. Their intended functional changes are already represented in the current production source, and replacing current files with their older versions would risk regressions.

- PR #40 — slideshow image paths: current `index.html`, `about.html`, `fa/about.html`, and `tr/about.html` already use the normalized `/images/slides/` paths.
- PR #35 — redundant newsletter script references: current pages no longer reference `newsletter.js`; the current source has retained its newer shared-page implementation.
- PR #27 — API catalogue and sports nutrition: current API pages contain the catalogue and current product data; the current sports nutrition pages retain the whey product list and four reserved brand-logo slots. The older PR #27 page versions would replace newer content.

## Safety boundary

This branch is not merged into `main`. No production deployment, production alias change, or source-branch deletion is intended by this review snapshot.

## Review recommendation

Review the Preview generated from this branch against the live site. Any further code changes should be made as a separate, explicit patch after identifying a concrete difference or defect.
