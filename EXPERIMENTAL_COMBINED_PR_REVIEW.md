# Experimental combined PR review — 2026-11-28

This isolated branch ports the relevant changes from PRs #40, #35, and #27 into the current unified site renderer. It is not merged into `main`.

## What is included

- PR #40 — slideshow paths: the current renderer uses the slideshow manifest and normalized image paths. Existing slide assets and their order are preserved; no image files were changed.
- PR #35 — redundant newsletter scripts: the current site uses the unified renderer and does not depend on the legacy `newsletter.js` references. The current source already has those redundant references removed.
- PR #27 — API and sports content: the API catalogue remains the current 239-item catalogue with its existing search, category filter, and sort controls. The additional API coordination, approach, enquiry-information and disclaimer content has been ported into the live page inventory in English, Turkish and Persian.
- PR #27 — sports nutrition: the brand, bulk powder, and vitamins/wellness sourcing content has been ported into the live page inventory in English, Turkish and Persian. The existing whey product table, prices, four brand-logo placeholders, and regulatory disclaimer are preserved. The renderer's existing sports slideshow and brand section remain in use.

## Validation boundary

The preview is isolated from Production. No changes were made to `main`, Production aliases, or image assets. Review the Vercel Preview before deciding whether any of this should be promoted.

The legacy PR HTML files were not copied wholesale because the deployed site renders service pages from `rebuild/site.js` and `data/live-page-inventory.jsonl`; replacing the legacy HTML alone would not update the rendered pages and could overwrite newer source content.
