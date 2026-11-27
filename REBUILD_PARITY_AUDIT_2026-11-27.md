# NIAZ NET — Live / Unified Rebuild Parity Audit

**Date:** 27 November 2026  
**Work branch:** `rebuild/unified-site-2026-11-27`  
**Production baseline:** `main` at `40cd774b7b7f275cf040fc06088ed9a638660d03`  
**Current production deployment inspected:** `dpl_82iPrspC4hKHU7y2HizuFqShYRYg` (READY; no deployment action taken)

## Scope and safety

- Read-only inspection of the live Vercel deployment, current GitHub `main`, the shared slideshow manifest, API catalogue, and the 25 November local rebuild package.
- No changes to `main`, Production, DNS, Vercel settings, billing, secrets, images, or installed integrations.
- No PR, merge, or deployment created.
- The only GitHub writes in this stage are on the approved isolated work branch: this report and appended master-audit findings #95–#101.

## Current live site — verified facts

- The live sitemap responds HTTP 200 and contains **69 URLs**.
- The repository contains **76 image files**: 54 slideshow images, 21 service icons and one logo.
- `images/slideshow-manifest.json` contains 54 assets across ten groups: Home 19, About 6, Sport 3, API 2, Infant 4, CBD 2, ALL 2, Cosmo 11, Pet 2 and Brand 3.
- The homepage HTML contains 18 static slide nodes, while the manifest contains 19 Home entries and the shared `hero-slideshow.js` builds slides from that manifest. The final rendered count needs real-browser confirmation; the manifest is the source of truth, not a hard-coded README count.
- The live API page responds HTTP 200 and contains **239 table rows**. The canonical `api-catalog.json` has 239 unique product names in seven categories. The live page has search, category filter, result count and empty-state controls.
- The current live homepage exposes EN, TR, ES and FR routes. Persian About exists at `/fa/about.html`; `/fa/` currently returns HTTP 404. The language switcher code currently offers EN/FA/TR.
- The current live Contact and Become Our Partner pages have mailto-based enquiry forms. These prepare an email draft; they do not submit to a server-side backend.
- Contract Manufacturing links to the existing HTML/RTF downloads for solid, non-sterile and sterile manufacturing. The repository contains 15 HTML and 15 RTF documents across five languages (EN/FA/TR/ES/FR).

## 25 November local rebuild package — verified facts

- 102 HTML pages: 34 EN, 34 FA and 34 TR.
- 93 standard pages plus nine standalone FCM/CMO form pages.
- One shared CSS file and one shared JavaScript entry point.
- Central data for 26 service labels and three VIP links.
- 15 mailto forms; no server-side submission backend.
- Its supplied static QA report records zero duplicate IDs, broken local references, broken anchors, inline scripts or inline handlers. These are structural checks, not proof of content completeness or browser behavior.

### Content and feature gaps found by direct inspection

- 31 pages repeat the same generic paragraph (129 occurrences).
- 30 pages repeat the same generic lead paragraph.
- 75 service-page grids are empty.
- 27 pages contain slideshow placeholder frames; 96 placeholder instructions say artwork must be uploaded later.
- The rebuild package contains 40 image assets and does not use the repository's 54-image slideshow manifest.
- The API page has an empty services grid, no API catalogue controls and no reference to the canonical catalogue. Its status file explicitly says the 239-record import is pending.
- It has only EN/FA/TR page families and does not preserve the current ES/FR homepage routes.
- It has nine standalone FCM/CMO forms but omits the current repository's 30 HTML/RTF downloadable documents.

## Verification performed

- Live page fetches returned HTTP 200 for the inspected EN/TR/ES/FR homepages, About, Projects, Contact, Become Our Partner, API Supply, Contract Manufacturing and representative service pages.
- `node --check assets/js/site.js`: passed.
- CSS parser: zero parse errors.
- Static package inspection: 102 HTML pages; findings above reproduced by direct source counts.
- Real-browser testing was **not** completed. Chromium in the available local runtime returned `ERR_BLOCKED_BY_ADMINISTRATOR` for `file://`, `data:` and localhost navigation. No visual or interactive pass is claimed.

## Integration decision

The local rebuild is a useful shared-template/code starting point, but it is **not ready to replace the live site**. The next implementation must use its shared architecture while restoring verified live content and all existing features: the 239-record API catalogue, 54-image manifest, EN/FA/TR plus ES/FR homepage routes, all FCM/CMO downloads, project details, contact/partner routes, and complete page-specific content.

Do not deploy or merge. Do not edit image binaries. Browser verification remains open under master checklist #101.
