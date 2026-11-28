# Experimental combined PR review — 2026-11-28

This isolated branch ports the relevant changes from PRs #40, #35, and #27 into the current unified site renderer. It is not merged into `main`.

## What is included

- PR #40 — slideshow paths: the live renderer uses `images/slideshow-manifest.json`, with sport slides under `/images/Sport/` and API slides under `/images/API/`. These manifest assets were verified to return HTTP 200. The legacy `/images/slides/...` paths proposed by the old HTML PR return 404 on the current deployment, so those paths were not copied into the active renderer. No image files or slide order were changed.
- PR #35 — redundant newsletter scripts: the deployed site uses the unified renderer and does not depend on the legacy `newsletter.js` references. The current source already has those redundant references removed.
- PR #27 — API: the current 239-item catalogue remains in place with its existing search, category filter, and sort controls. Additional API coordination, approach, enquiry-information and disclaimer content has been ported into the live page inventory in English, Turkish and Persian.
- PR #27 — sports nutrition: brand, bulk powder, and vitamins/wellness sourcing content has been ported into the live page inventory in English, Turkish and Persian. The existing whey product table, prices, four brand-logo placeholders, regulatory disclaimer and renderer slideshow remain in place.

## Validation boundary

The preview is isolated from Production. No changes were made to `main`, Production aliases, or image assets. The Vercel Preview build completed with `READY`.

The preview's page inventory endpoint returned HTTP 200 and parsed as 102 records. The API catalogue endpoint returned HTTP 200 with 239 records. The slideshow manifest returned HTTP 200, and the active sports/API slideshow assets tested returned HTTP 200.

The legacy PR HTML files were not copied wholesale because the deployed site renders service pages from `rebuild/site.js` and `data/live-page-inventory.jsonl`; replacing the legacy HTML alone would not update the rendered pages and could overwrite newer source content.
