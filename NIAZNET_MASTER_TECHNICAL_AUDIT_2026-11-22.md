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
19. [ ] Refactor site-shell.js only after behavior/load-order tests exist; no speculative split.
20. [ ] Audit fa-translation-runtime.js (327 KB / 2,237 lines) for coverage, duplicate ownership and observer cost.
21. [ ] Review global CSS injected by site-shell.js and migrate only if computed layout can be preserved.
22. [ ] Review static Header/Footer duplication; retain server-rendered markup unless an SEO-safe build-time alternative is proven.
23. [ ] Browser-test navigation, mobile menu, contact hub, WhatsApp, language switching and dynamic link routing.

## CSS and visual regression
24. [x] Compare CSS overlap against actual page stylesheet loading. `service-page-shared.css` and `service-tile-system.css` are co-loaded on 54 pages; 20 selectors overlap and static comparison found 100 same-context property conflicts. The latter is a deliberate hard-override layer using `!important`; visual validation is required before cleanup.
25. [ ] Audit repeated selectors within homepage.css, service-page-shared.css, secondary-page-base.css, projects-base.css and localized styles.
26. [ ] Remove only proven redundant CSS after checking cascade order, declarations and media context.
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
48. [ ] Verify every Contact / Become Partner / Get in Touch CTA across locales.
49. [ ] Complete EN/FA/TR translation and navigation coverage, including dynamic content and accessibility labels.
50. [ ] Audit ES/FR legacy homepage/service routes, labels and catalogue.
51. [ ] Verify Persian preference, query parameter and translation runtime timing/coverage.
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
66. [ ] The normalized slideshow copies and updated HTML references are in the normalized build package, not yet committed to the GitHub source branch; keep this distinction explicit until the package is approved for deployment or a safe binary-asset commit path is available.
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


80. [x] Create the required Vitacosmetic slide for the third image in the three-slide Cosmoderma portfolio sequence (overall slide 05 of the eight-image page). The 1944×809 slide explicitly covers non-coloured cosmetics/personal care, strengthening/support products, hair-transplant aftercare, and gene/nanotechnology applications; EN/TR page copies in the normalized build now use it, while the eight-image count is preserved.
81. [ ] Commit the new binary slide asset and its EN/TR page references to the GitHub repair branch. It is included and validated in the normalized ZIP, but the GitHub branch still retains the previous image until the binary asset can be added safely; do not merge the old image version as if this item were complete.

82. [x] Rebuild the normalized full-site ZIP after the Vitacosmetic slide correction: 219 files, 27 canonical 1944×809 slide assets, 84 HTML pages, 18 homepage slides in four locales, and 8 Cosmoderma slides per EN/TR page.


83. [x] Run a TypeScript semantic scan across the 12 shared/core JavaScript files: zero undefined-name diagnostics (TS2304/TS2552). Remaining diagnostics are DOM element/event typing and cross-file global-scope warnings; these are not represented as browser-test passes.
84. [x] Add an integrity guard ensuring each EN/TR/ES/FR homepage loads only its own renderer (`homepage.js`, `homepage-tr.js`, or `localized-homepage.js`) and loads `service-grid.js` first, preventing conflicting global `const` declarations.

85. [x] Re-run the integrity checker against the extracted GitHub Actions run #99 normalized artifact; 84 HTML pages, API=239, Cosmoderma=8/8, 26 normalized slide assets, all 1944×809. CI artifact digests: normalized `7820cfda7bbb9abbf71b79e8c402f2de5d537a6c8d82fd2f6d079e6715875209`; raw source `208b6857efcace1e8adee47cfabbd4ef6ecbbdd7a441cf8f1d1c744debac438a`.


86. [x] Reconcile API filter categories against the canonical 239-record JSON: corrected eight rows incorrectly marked `Human APIs` in `data-category` to `API` in EN/TR, matching the JSON and visible category; added integrity assertions for all 239 row/category pairs and the seven filter options.


87. [x] Audit Persian translation coverage across all 33 page dictionaries and visible text nodes. Added 16 missing page-title/coordination translations, translated the uppercase `PARTNERS` heading, replaced the blank `Partner` value, and confirmed no meaningful untranslated English UI text remains in the audited dictionary pages; proper names, logos and product names remain intentionally unchanged.


88. [x] Audit API catalogue data quality and UI: 239 unique product names, seven canonical categories, no duplicate names; EN/TR filter options and all 239 `data-category` values now match `api-catalog.json`. Verified the result-count string is localized for Persian and Turkish and route detection takes precedence over stale query values.


89. [x] Automate the Persian visible-text coverage audit in `tools/check-site-integrity.py`: Node extracts the runtime dictionary and Python checks all dictionary-backed HTML pages; the local run passes with no meaningful untranslated English UI text (brand/product names excluded by design).
