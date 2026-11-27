# NIAZ NET — Master Technical Audit & Repair Checklist
Last updated: 2026-11-22
Repository: alirezaabdolrahimi-a11y/my-website
Working branch: fix/sitewide-rebuild-2026-11-21
Backup baseline commit: 3ac6b2823158e8fd4ad605f28f867cd1e3796bd3
Latest repair commit: b89f6d8ba0cfe8edcbc9e9615a5c56e64d128b95
Production/main: untouched; no merge or production deployment without separate approval.

## Operating rule
This is the single numbered master list. Every newly discovered issue must be appended with a number. Never discard, silently defer or mark an issue complete because work moved to another item. After each repair batch, rerun the earlier checks. Mark complete only with evidence.

## Backup and integrity
1. [x] Create a full ZIP backup before code repairs.
2. [x] Verify ZIP integrity and all archive entries.
3. [x] Record 215 files, 231 entries, 110,201,653 uncompressed bytes.
4. [x] Record SHA-256: f97430a3e4692033b4c83e2c356046fbea59245c5be3ceff3d6c6b2db20e2a60.
5. [x] Preserve the downloadable ZIP independently of the 90-day Actions artifact.
6. [x] Inventory 84 HTML pages, 12 JS files after repair, 14 CSS files, 78 PNG files and 15 RTF files.
7. [x] Check all HTML pages for duplicate IDs — none.
8. [x] Check duplicate script and stylesheet tags per page — none.
9. [x] Check static local HTML/CSS asset references — none missing.
10. [x] Syntax-check all external and inline JavaScript — no failures.
11. [x] Check CSS braces and JSON syntax — no failures.
12. [x] Check image alt text and target=_blank rel=noopener — no failures.
13. [x] Fix tr/contact.html broken About footer link to /tr/index.html#about.
14. [x] Classify 16 remaining #contact fragments as placeholders routed by site-shell.js.
15. [x] Re-run static route and asset checks after first repair batch.

## Core code and cleanup
16. [x] Remove 50 obsolete newsletter.js script references and delete newsletter.js; site-shell removes the form before this script could run.
17. [x] Verify no newsletter.js references remain in the repaired page set.
18. [x] Map site-shell.js responsibilities: global style injection, WhatsApp, mailto forms, contact hub, link routing, MutationObserver, year, language loader, Home links and mobile navigation.
19. [x] Completed the safe shared-shell refactor after dependency/load-order audit: added a document-level singleton guard; moved approximately 15 KB of global CSS into `assets/css/site-shell-enhancements.css`; preserved mailto inquiry forms while removing only `form#newsletterForm`; retained one shared contact hub and scoped dynamic-link observer; and kept the language-switcher fallback for pages without an explicit script. Static audit now verifies exactly one `site-shell.js` per each of the 69 shell-enabled pages, the intended deferred order before `language-switcher.js`, and no shell injection into the 15 standalone FCM/CMO download forms. Mobile click/visual verification remains under #23/#53.
20. [x] Audited `fa-translation-runtime.js` (330 KB / 2,250 lines): translation covers body text nodes, placeholders, ARIA labels, mail-form field names, document title, meta description, localized links and dynamic FCM/CMO downloads/content. Runtime and loader guards prevent duplicate ownership. Fixed duplicate style insertion with `fa-translation-runtime-style` ID guard; changed full-body MutationObserver retranslation from per-frame scheduling to a 120 ms debounced callback that ignores script/style/link/SVG-only additions; set the dynamically inserted runtime script to `async=false` to preserve predictable dynamic-script execution order. Text/attribute mutations are not observed, preventing a self-trigger loop.
21. [~] Extracted the exact existing slideshow-standard, global button, WhatsApp, form, API-table, sports-brand, About/project and contact-visibility rules from `site-shell.js` into `assets/css/site-shell-enhancements.css` (15,049 characters). The shell now loads one cacheable stylesheet instead of constructing two large inline style elements plus the contact visibility style. Extracted CSS brace counts match; no declarations, selectors, values or asset references were intentionally rewritten. Updated `tools/normalize-slides.py` to validate the mandatory slideshow overrides in the extracted stylesheet rather than only inside `site-shell.js`. Actual computed-style/browser comparison remains part of #23, so visual equivalence is not yet claimed.
22. [x] Reviewed representative EN/TR homepage, contact and about pages: each contains exactly one server-rendered `<header>`, one `<main>`, one `<footer>`, one canonical URL and one `site-shell.js` reference. `site-shell.js` does not create or clone Header/Footer; it only rewrites the legacy newsletter footer column into a contact CTA. Retained static semantic markup and canonical/hreflang metadata; no client-side Header/Footer replacement introduced.
23. [~] Static interaction-path checks completed: mobile menu handler updates `.open`, `aria-expanded` and toggle glyph; contact CTA routing targets the locale-specific homepage contact hub; homepage contact section remains hidden until CTA activation; WhatsApp link is created once with localized accessible label and `noopener noreferrer`; language switcher persists EN/FA/TR and builds localized routes; dynamic links are processed by the scoped contact-link observer. A real browser session (clicks, visual layout, network/console and form submission) is not available in this execution environment. PR Preview/CI is building; do not mark browser testing complete until those interactive checks are performed.

## CSS and visual regression
24. [x] Compare CSS overlap against actual page stylesheet loading. `service-page-shared.css` and `service-tile-system.css` are co-loaded on 54 pages; 20 selectors overlap and static comparison found 100 same-context property conflicts. The latter is a deliberate hard-override layer using `!important`; visual validation is required before cleanup.
25. [x] Audited repeated selectors and cascade contexts in `homepage.css` (671 rules after cleanup), `service-page-shared.css` (716), `secondary-page-base.css` (588), `projects-base.css` (569), `localized-homepage-before-service.css` (557), `localized-homepage-after-service.css` (82), `turkish-service-overrides.css` (2), `service-tile-system.css` (39), and `site-shell-enhancements.css` (116). After exact duplicate cleanup, no identical selector+declaration+media-context rule remains within any audited file. Cross-file common base rules were retained: they are separate page-family base layers, and removing them from either file would break pages that load that base file alone. The only two base files co-loaded together are the project-detail pair; their independent usage means broad consolidation is not safe without browser/cascade validation.
26. [x] Removed 90 exact duplicate CSS rule blocks with identical selector, declarations, importance flags and at-rule/media context: 20 from `homepage.css`, 24 from `service-page-shared.css`, 15 from `secondary-page-base.css`, 15 from `projects-base.css`, 15 from `localized-homepage-before-service.css`, and 1 from `localized-homepage-after-service.css`. Kept the final occurrence of each rule; no property value, selector, breakpoint or asset reference was changed. Re-parsed all nine audited CSS files with zero parser errors and zero exact duplicate rules; visual regression remains open under #27/#28.
27. [ ] Verify navy/gold palette, typography, icon sizing, hero layout, cards, footer and navigation on desktop/tablet/mobile.
28. [ ] Verify no visual drift after every shared CSS/core change.

## Homepage and slideshows
29. [x] Compare homepage content/sections with the authoritative Library reference index(1).html; core text and section structure are substantially preserved.
30. [x] Restore the missing baseline homepage slide 09 (“Performance Nutrition”) in EN/TR/ES/FR between slides 08 and 10. The authoritative `index(1).html` includes it; its original image bytes match the existing Sports Nutrition asset, so the exact visual is reused without editing artwork.
31. [x] Confirm Cosmoderma EN/TR each have exactly 8 slides in identical order.
32. [x] Create normalized `1944×809` MASPORT copies in the offline normalized build, preserving full artwork without cropping; original source images remain unchanged. The CI normalized artifact verifies both copies and all other slide assets.
33. [x] Confirm the other six Cosmoderma slides are 1944x809.
34. [x] Confirm Sports Nutrition EN/TR each retain four empty logo placeholders.
35. [x] Confirm Infant Formula EN/TR dynamically receive four existing slideshow images, each 1944x809.
36. [x] Confirm Infant Formula EN/TR each retain four empty brand/project placeholders.
37. [ ] Browser-test slideshow order, dots, swipe, loading, reduced-motion and missing-image behavior.
38. [x] Preserve all existing slideshow artwork and order except the explicitly restored homepage slide 09 and the specifically requested Vitacosmetic replacement in the offline Cosmoderma build; all other source artwork remains unchanged.

## API catalogue
39. [x] Confirm EN API table has 239 unique rows.
40. [x] Confirm TR API table has the same 239 unique product names as EN.
41. [x] Unify ES/FR data: api-catalog.json now has the canonical 239 EN/TR records; localized-homepage.js consumes this single source and builds all seven category filters with ES/FR labels.
42. [ ] Browser-test search, category filters, sorting, counts, empty state and mobile readability.

## Forms, downloads and locale
43. [x] Confirm 15 FCM/CMO RTF files exist (3 form types × EN/FA/TR/ES/FR).
44. [x] Validate RTF headers, balanced braces and info@niaznet.net address in all 15.
45. [x] Confirm FCM/CMO EN/TR download cards and required data attributes.
46. [ ] Browser-test FCM/CMO dynamic fields, locale switch, submit-to-mailto, print and editable HTML download.
47. [ ] Browser-test Contact and Become Partner forms in EN/TR and Persian query mode.
48. [x] Audited the Contact, Become Partner, Get in Touch, Discuss and email-enquiry routes across all 69 shared-shell pages. Existing `contact.html` and `become-our-partner.html` destinations are redirected by `routeContactLinks()` to the correct locale-specific homepage contact hub; direct mailto actions retain `info@niaznet.net` (or the approved partner inquiry sender) and the shared dynamic-link observer applies the same routing to subsequently inserted links. Dedicated EN/TR forms and the EN/FA/TR/ES/FR homepage contact hub retain their localized field labels and mailto destination. Real form submission/click confirmation remains under #46/#47/#53.
49. [x] Completed the source-level EN/FA/TR locale-routing and translation-coverage audit: language-switcher targets, route-priority handling, WhatsApp accessible labels, slideshow labels/content, API catalogue language, service-grid links, FCM/CMO form/download locale, Persian dynamic text, placeholders and ARIA labels are all covered by the integrity checks. The Persian visible-text dictionary audit remains automated by #89; real browser interaction is still tracked separately under #46/#47/#53.
50. [x] Audited ES/FR legacy homepage/service routes, labels and catalogue. Fixed About/Projects navigation to stay on the localized `/es/index.html` and `/fr/index.html` sections; preserved the ES/FR language-menu labels (`Idioma`/`Langue`); localized all 23 service names, service-card labels, VIP labels and Import/Export labels; verified service-detail query routes return to the correct localized homepage; and retained the single canonical 239-record API catalogue with ES/FR category labels. Legacy descriptive service paragraphs remain the original English copy; no separate ES/FR service-detail HTML pages are claimed.
51. [x] Corrected and tested Persian preference/query precedence. A saved Persian preference now applies only when no explicit `lang` query exists; explicit `?lang=en` is respected; `/tr/`, `/es/` and `/fr/` routes take precedence over stale `?lang=fa` and saved Persian preferences; the runtime has a defense-in-depth route guard; and dynamic insertion remains `async=false`. Added `tools/test-locale-precedence.js` with seven passing scenarios and wired it into the site-integrity workflow.
52. [x] Fix mixed-language Turkish service label: International İş Geliştirme → Uluslararası İş Geliştirme.

## Regression, QA and release
53. [ ] Perform real browser visual/interactive regression on desktop/tablet/mobile. Static checks and HTTP 200 are not browser tests.
54. [x] Re-run all prior static checks after every repair batch; the final local integrity, syntax, normalization, route, asset and ZIP checks passed. Browser-only checks remain explicitly open.
55. [x] Keep this numbered checklist in sync with every new finding and repair; unresolved browser, visual and binary-commit items remain explicitly open.
56. [x] Keep PR #34 draft/unmerged; no merge or publication approval has been assumed.
57. [x] Keep `main` and Production unchanged; latest verified `main` SHA remains the PR base SHA.
58. [x] Search for the historical industryItems undefined-reference issue; no remaining references found.
59. [x] Preserve and re-verify prior fixes: Turkish Cosmoderma navigation, CBD icon paths, ES/FR home links, Persian runtime loading, API count, FCM/CMO duplicate guards, locale-specific downloads, shared contact routing and read-only slideshow CI safeguards. These are now asserted by `tools/check-site-integrity.py`.

60. [x] Align FCM/CMO form locale detection with download locale precedence: `/tr/` route takes priority over `?lang=fa`, preventing a Turkish page from generating a Persian form when a stale or manually added query parameter is present.

61. [x] Deep-review the co-loaded `service-page-shared.css` + `service-tile-system.css` cascade and representative EN/TR route markup. Confirmed the 54-page load order (shared stylesheet first, tile override second; see #72). Compared matching selectors and media contexts: the conflicts are concentrated in the service-card grid, Import/Export lead card, VIP panel/links and responsive layout. Sampled EN/TR detail pages (`import-export`, `business-development`, `market-entry`) contain none of the `.services-layout`, `.services-grid`, `.vip-services`, `.vip-service-list` or `.service-card` elements, so those grid-specific conflicts are not active on those detail pages; the conflicts matter only where the matching service-grid markup is rendered. The later tile layer deliberately fixes the 5 cm × 2 cm service tiles, card/icon treatment, Import/Export lead-card geometry and VIP layout; its 761–900 px two-column tablet layout changes to one column at 760 px and below, while narrow screens use centered auto-fit tiles. The overrides are explicit and use `!important`; no demonstrably dead declaration can be safely removed from source-only evidence. No CSS was changed. Browser visual confirmation remains open under #62/#27/#28.

62. [ ] Browser visual/interactive testing remains open: headless Chromium in this execution environment did not complete even a minimal `data:` page, so no page-level browser results are claimed. Retry in a functioning browser environment before merge.

63. [x] Correct the API filter initialization order introduced during catalogue unification: bind the `filter` DOM element before assigning its dynamically generated options. Verified by source-order assertion and `node --check`; browser interaction remains open.


64. [x] Repair the CI syntax list after removing `newsletter.js`: remove the stale `node --check newsletter.js` command, add `assets/js/localized-homepage.js`, and include `assets/js`, `assets/css` and `api-catalog.json` in the relevant push path filters.
65. [x] Run `tools/normalize-slides.py` in a separate normalized build copy: the PR CI artifact contains 26 exact-size 1944×809 assets, 59 slideshow pages and 31 locale pairs; the complete offline package additionally contains the new Vitacosmetic slide (27 assets). Original source images remain preserved.
66. [~] The normalized build contains 26 exact-size slide assets and the updated EN/TR Cosmoderma references. Source comparison proves only two binary files are missing from GitHub: `images/slides/01 masport.png` and `images/slides/02 masport.png`; the 24 other normalized assets already exist in the branch. Added `.github/workflows/commit-normalized-slides.yml`, restricted to the repair branch, to regenerate/validate the two images and commit only those two files plus `cosmoderma.html` and `tr/cosmoderma.html`. This task becomes complete only after the workflow is manually run and the resulting commit/Preview is verified.
67. [x] Run GitHub Actions workflow run #99 (`44986573536`) on latest PR head `dde7fd615502afb069aa7b094f8187ace6071c2b`; both raw-source and normalized-site artifacts downloaded and ZIP-tested successfully. Browser QA remains open.


68. [x] Fix Turkish-route precedence across site-shell.js, hero-slideshow.js, api-catalog.js and service-grid.js: a stale `?lang=fa` or saved Persian preference no longer overrides a `/tr/` route. FCM/CMO form and download locale precedence are aligned.
69. [x] Add `tools/check-site-integrity.py` and wire it into the normalized build workflow after slideshow normalization; the local normalized build passed the equivalent comprehensive integrity checks.
70. [x] Verify the latest PR-head workflow run #99 and both uploaded artifacts (raw source + normalized site); both ZIPs pass integrity checks. Browser visual/interactive testing remains open.


71. [x] Delete the unreferenced 190-byte `assets/css/turkish-overrides.css`; no HTML, JS or CSS file referenced it, and its only rule was already present in `homepage.css` and other active shared stylesheets.


72. [x] Verify stylesheet cascade order on every page that loads both `service-page-shared.css` and `service-tile-system.css`: 54 pages co-load them, and all 54 load the hard-override tile system after the shared stylesheet.
73. [x] Generate and verify the normalized full-site ZIP after the repair batch: 219 files, ZIP integrity passed; final SHA-256 is recorded in the handoff.
74. [x] Final local static regression pass: slideshow normalizer, site-integrity checker, all JavaScript syntax checks, and unreferenced JS/CSS inventory passed; no unreferenced JS or CSS files remain.


75. [x] Remove two redundant same-value keys from the Persian translation dictionaries (`Strategic Distribution & Trade` and `Contact Our Team`); a top-level object-literal audit now finds no duplicate keys in the common/page translation maps, and `node --check` passes.


76. [x] Extend locale precedence to every localized route (`/tr/`, `/es/`, `/fr/`, `/fa/`) in the WhatsApp label, slideshow and API UI. ES/FR WhatsApp accessibility labels are now localized, and stale `?lang=fa` no longer triggers Persian-only slideshow content on ES/FR pages.


77. [x] Restore the missing Performance Nutrition homepage slide in EN/TR/ES/FR at its original position between slides 08 and 10. The authoritative `index(1).html` includes this slide; its original image bytes match the existing Sports Nutrition image, so the existing normalized asset is reused without editing or adding duplicate artwork. All four homepages now have 18 slides in identical order.


78. [x] Compare the old compact base ZIP with the current source. Legacy `shared-site.js`/`contact-actions.js` and their old CSS counterparts are not restored because their duties are now handled by `site-shell.js`, `secondary-page-base.css` and `service-tile-system.css`; the integrity suite now checks the shared contact/partner form markers and mailto destination.


79. [x] Extend the integrity suite to assert 18 homepage slides in EN/TR/ES/FR, identical order in all four locales, and the Performance Nutrition image at slide position 09.


80. [x] Created the final standalone Vitacosmetic slide for the third image in the three-slide Cosmoderma portfolio sequence (overall slide 05 of the eight-image page). Final PNG is exactly 1944×809, with no crop or stretch; SHA-256 `a6f5c13b80c7033c29e280d6f98a30480f253c387573cef976eeb4d54cd8942e`. The normalized offline build replaces only slide 05 in EN/TR, preserves the eight-slide count and matching order, and validates 27 exact-size slide assets.
81. [~] The Vitacosmetic slide and its EN/TR slide-05 references are complete in the new offline normalized package, but the binary PNG and two HTML reference changes are not yet committed to the GitHub branch. The current GitHub connector supports text-file commits but not direct binary blob upload from the working container; do not merge until the exact PNG is added and the Preview confirms the two pages load it. The downloadable offline package contains the exact 1944×809 asset and matching references.

82. [x] Rebuilt the normalized offline-ready package after the Vitacosmetic slide correction: 222 files, 27 canonical 1944×809 slide assets, 84 HTML pages, 18 homepage slides in four locales, and 8 Cosmoderma slides per EN/TR page. ZIP integrity and full site-integrity checks passed. This offline package is not yet identical to the GitHub branch because #81 remains pending.


83. [x] Run a TypeScript semantic scan across the 12 shared/core JavaScript files: zero undefined-name diagnostics (TS2304/TS2552). Remaining diagnostics are DOM element/event typing and cross-file global-scope warnings; these are not represented as browser-test passes.
84. [x] Add an integrity guard ensuring each EN/TR/ES/FR homepage loads only its own renderer (`homepage.js`, `homepage-tr.js`, or `localized-homepage.js`) and loads `service-grid.js` first, preventing conflicting global `const` declarations.

85. [x] Re-run the integrity checker against the extracted GitHub Actions run #99 normalized artifact; 84 HTML pages, API=239, Cosmoderma=8/8, 26 normalized slide assets, all 1944×809. CI artifact digests: normalized `7820cfda7bbb9abbf71b79e8c402f2de5d537a6c8d82fd2f6d079e6715875209`; raw source `208b6857efcace1e8adee47cfabbd4ef6ecbbdd7a441cf8f1d1c744debac438a`.


86. [x] Reconcile API filter categories against the canonical 239-record JSON: corrected eight rows incorrectly marked `Human APIs` in `data-category` to `API` in EN/TR, matching the JSON and visible category; added integrity assertions for all 239 row/category pairs and the seven filter options.


87. [x] Audit Persian translation coverage across all 33 page dictionaries and visible text nodes. Added 16 missing page-title/coordination translations, translated the uppercase `PARTNERS` heading, replaced the blank `Partner` value, and confirmed no meaningful untranslated English UI text remains in the audited dictionary pages; proper names, logos and product names remain intentionally unchanged.


88. [x] Audit API catalogue data quality and UI: 239 unique product names, seven canonical categories, no duplicate names; EN/TR filter options and all 239 `data-category` values now match `api-catalog.json`. Verified the result-count string is localized for Persian and Turkish and route detection takes precedence over stale query values.


89. [x] Automate the Persian visible-text coverage audit in `tools/check-site-integrity.py`: Node extracts the runtime dictionary and Python checks all dictionary-backed HTML pages; the local run passes with no meaningful untranslated English UI text (brand/product names excluded by design).

90. [x] Create the requested slideshow upload directories under `images/`: `Home page`, `About us`, `Sport`, `API`, `INFANT`, `CBD`, `ALL`, `COSMO`, `PET`, and `BRAND`. Each directory contains a README with the 1944×809 px requirement. These changes are isolated to `prep/sitewide-final-2026-11-23`; no production deployment or merge was performed.

91. [x] Reapply the audited non-binary sitewide code repairs from the isolated repair branch onto the current-main-based preparation branch, without restoring any slideshow images that the user explicitly requested to clear. Applied 84 changed non-image paths, including the shared shell, translation runtime, API catalogue, FCM/CMO forms, locale routing, integrity checker, and CI validation. The obsolete newsletter script and unused Turkish override stylesheet are absent from the preparation tree.

92. [x] The user uploaded 54 PNG assets across the ten approved folders. `images/slideshow-manifest.json` maps all 54 assets to their matching page families in numeric filename order; shared controller now reads this manifest and no longer depends on legacy `/images/slides/` arrays. Source pixel dimensions and browser rendering remain release checks.

93. [~] Browser-based visual and interactive regression remains open. Static integrity, slideshow normalization, JavaScript syntax, and seven locale-precedence scenarios pass in the normalized working package; Chromium did not complete a minimal headless page in this runtime, so no browser-level pass is claimed.


94. [x] Connect all 54 uploaded slideshow PNGs from the ten approved folders through one shared JSON manifest and the shared slideshow controller; map Home page, About us, Brand, Sport, Infant, CBD, API, Cosmoderma, Pet Food, and ALL/Business Development page families. Hide all left/right arrow controls globally. The controller and manifest are committed on the preparation branch; browser verification and physical image-dimension validation remain open under #93 and release QA.


95. [ ] New unified rebuild content parity: the 25 November local rebuild contains 102 HTML pages, but 31 pages repeat the same generic paragraph 129 times, 30 pages repeat the same generic lead text, and 75 service-page grids are empty. Replace generic filler with verified page-specific content from the current live site and approved source material. Do not treat structural page counts as content completeness.

96. [ ] Restore the complete API catalogue in the new rebuild. The current live site has 239 unique records across seven categories, with search, category filtering, result count and empty-state behavior. The local rebuild's `api-supply.html` has no catalogue UI and `data/api-catalog-status.txt` explicitly says import is pending. Reuse the canonical repository-root `api-catalog.json`; do not recreate or fabricate records.

97. [ ] Integrate the current 54-image slideshow manifest into the new shared slideshow controller. The local rebuild contains 40 assets (18 legacy homepage slides, 21 service icons and one logo), 27 pages still show slide placeholders, and 96 placeholder instructions say artwork must be uploaded later. The current repository already contains 54 approved PNGs across ten manifest families. Use the existing manifest and images without modifying, renaming, moving, cropping, resizing or replacing any binary artwork. Resolve the 18-static-slide versus 19-home-manifest-entry discrepancy against the approved browser behavior before finalizing slide count. Preserve the no-arrow-controls requirement.

98. [ ] Preserve language and route parity during migration. The local rebuild contains 34 pages each for EN, FA and TR, but the current online sitemap has EN/TR service routes, separate ES and FR homepages, and a Persian About page; the root `/fa/` homepage currently returns 404. Keep all existing working EN/TR/ES/FR/FA routes and ensure language switching has a valid destination or an explicit fallback. Do not silently drop ES/FR pages or imply that every language has full page coverage when it does not.

99. [ ] Preserve FCM/CMO document delivery. The current repository contains 15 HTML and 15 RTF download files covering solid, non-sterile and sterile manufacturing in EN/FA/TR/ES/FR. The local rebuild contains nine standalone form pages (three each in EN/FA/TR) but does not include the existing 30 downloadable documents. Verify every download link and retain all five language variants.

100. [ ] Complete full route and sitemap reconciliation between the current 69-URL live sitemap and the 102-page local rebuild. Preserve current project-detail routes, contact/partner routes, market pages, aliases, localized pages, canonical URLs and hreflang relationships; add new routes only when their content and navigation are complete.

101. [ ] Complete browser-based visual and interactive regression for the integrated rebuild on desktop, tablet and mobile, including navigation, all slideshow families, API search/filter/count/empty state, contact and partner forms, FCM/CMO downloads, locale switching and route links. Static checks and HTTP 200 responses are not browser verification. Local Chromium currently returns `ERR_BLOCKED_BY_ADMINISTRATOR` for file, data and localhost navigation; use an approved functioning browser/CI environment and leave this item open until real results are recorded.

102. [x] Remove the duplicate `normalizePath()` function declaration from `rebuild/site.js`; retain the single shared implementation. Verified exactly one declaration remains, JavaScript source compiles, the 69-record live page inventory parses, the canonical API catalogue contains 239 records, the 54-image slideshow manifest parses, and the shared services data parses. No image, route inventory, page content, styling or production file was changed.

103. [x] Add an accessible API catalogue sort control to the unified renderer (original order, product A–Z, product Z–A, and category/name) with EN/FA/TR/ES/FR labels; localize the table column headings and expand the shared toolbar grid to three controls with the existing mobile single-column breakpoint. Verified JavaScript compilation and CSS brace balance. Browser interaction and responsive appearance remain open under #101.
