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

104. [x] Complete shared slideshow-family routing for all 26 service cards: add manifest mappings for Licensing Partnerships, Medical Devices, Nutraceuticals, Pharmaceutical Products, Private Label and Regulatory Affairs. Verified all 26 service slugs resolve to a non-empty existing manifest group and the updated shared JavaScript compiles. Browser rendering and final visual grouping remain open under #101.

105. [x] Make the unified renderer apply page-specific SEO metadata from the verified live inventory: document title, meta description (with first-paragraph fallback for service pages lacking an explicit meta description), canonical URL and Open Graph title/description/URL. Preserve the preview's noindex directive. Verified JavaScript compilation and metadata inputs/fallbacks across all 69 inventory routes. Browser/head-tag inspection remains part of #101.

106. [x] Preserve verified external reference links in the unified renderer. The previous link filter omitted non-WhatsApp HTTPS references, including official market-regulator and import-procedure sources. Include HTTP/HTTPS, mailto, tel, download and internal HTML links; open external links in a new tab with `noopener noreferrer`; apply the correct locale prefix for relative links from EN/TR/ES/FR/FA routes. Verified JavaScript compilation and identified 7 unique external URLs in the 69-page inventory; browser click-through remains open under #101.

107. [x] Repair link behavior in the unified renderer: preserve homepage `#contact` and FCM/CMO `#fcm-downloads` anchors, give the rendered footer/download section the matching IDs, keep all 30 HTML/RTF download links as direct file URLs instead of incorrectly routing them through the page renderer, and resolve relative internal links using the current EN/FA/TR/ES/FR locale with a valid locale fallback. Verified JavaScript compilation and all six inventoried anchor targets map to a rendered section; download target existence remains covered by the 30-file inventory check. Browser click-through remains open under #101.

108. [x] Add dedicated Playwright coverage for the unified rebuild: shared homepage/service cards, 239-row API catalogue search/sorting, five-language switcher, direct FCM/CMO downloads and anchor, contact form, external regulator links, and mobile API controls. Test source syntax verified. The existing workflow does not trigger on this rebuild branch and no PR/dispatch action is authorized or available here; actual browser execution remains open under #101.

109. [x] Avoid duplicate FCM/CMO download links in the unified Contract Manufacturing page: the dedicated language selector already exposes all 30 HTML/RTF files, so suppress the scraped duplicate download links on that page while retaining downloads elsewhere. Correct the Playwright category-sort assertion to compare actual table cells rather than concatenated row text. Verified both JavaScript and Playwright spec syntax.

110. [x] Refine Contract Manufacturing link filtering so both RTF and HTML files in `/downloads/fcm-cmo/` are excluded from the scraped generic link list on EN/TR Contract Manufacturing pages; the dedicated selector remains the single source of download links. Verified the unified JavaScript compiles and the filtering condition explicitly covers both file extensions.

111. [x] Extend unified rebuild Playwright coverage to assert slideshow/dot count consistency, no arrow controls, successful first-image loading, dot navigation, and reduced-motion autoplay suppression. Use an explicit local URL for the FCM/CMO RTF response check. Playwright test source syntax verified; browser execution remains open under #101.

112. [ ] Preserve original visual and section-level parity in the unified preview. The current renderer uses a simplified shared hero/content-panel/service-grid/footer layout and does not yet reproduce all original homepage sections and page-family compositions (including partner/project/network/news/contact presentation). It also does not render scraped `record.images`; only the approved 54-image shared manifest is rendered through mapped slideshow groups. Compare against the live site's original markup/CSS and the approved 102-page static rebuild before considering this preview a replacement. No visual parity or browser pass is claimed; keep release blocked under #101.

113. [x] Restore homepage section structure from the verified live inventory instead of flattening all home content into one panel: render localized feature cards (8), project cards (12), office cards (3), a contact CTA band, and stable `#services`, `#about`, `#projects`, `#news`, `#contact`, and `#offices` anchors. Add matching responsive shared CSS. Fix ES/FR navigation so About/Projects use their localized homepage anchors and Contact/Partner fall back to the existing English forms rather than incorrectly returning to the homepage. Verified JavaScript and Playwright source syntax; browser execution remains open under #101.

114. [x] Align the ES homepage navigation Playwright selector with the actual localized menu label `Quiénes somos`; the About menu points to the Spanish homepage's `#about` section. Verified Playwright test source syntax.

115. [x] Static verification batch on branch head `2041278d533014b5d1a28fd3c88f7e0756c87885`: JavaScript and Playwright spec syntax pass; CSS brace balance is zero; 69/69 unique live routes; 239 API records across 7 categories; 26 service cards; 54/54 slideshow assets present; 30 FCM/CMO files (15 HTML + 15 RTF); EN/TR/ES/FR home sections each contain 8 feature cards, 12 project cards and 3 office cards. Main remains at `40cd774b7b7f275cf040fc06088ed9a638660d03`; no PR or deployment created. Browser execution and visual parity remain open (#101, #112).

116. [x] Re-check the actual Production site read-only on 2026-11-27: homepage and About, Projects, Contact, Become Partner, API Supply, and Turkish homepage returned HTTP 200; `/fa/` returned 404. The live homepage contains the partner strip, network map, 12 project cards, contact band and office details. Route inventory reconciliation confirms 69 live routes: 33 EN, 33 TR, one ES homepage, one FR homepage and one Persian About page. The 102-page local archive contains 34 pages each for EN/FA/TR; it does not itself represent the current live route set.

117. [x] Restore missing live-homepage components in the unified preview using source-verified text and existing image assets: 11 partner entries, the five-location network map, all 12 project-card icons, and the four contact details. Extend the existing homepage inventory records and shared renderer/CSS; do not modify or relocate any binary image. Added Playwright assertions for all restored components. JavaScript and Playwright source syntax pass; CSS brace balance is zero. Real browser execution remains open under #101 and visual parity remains open under #112.

118. [x] Correct localized partner-section detection for Turkish homepage heading `Küresel İş Ortakları` by matching the shared `ortak` stem; extend Playwright coverage to assert partner strip, network map, project icons and contact details on EN/TR/ES/FR homepages. JavaScript and Playwright source syntax pass. Browser execution remains open under #101.

119. [x] Restore Persian homepage and core business routes in the unified preview using the approved 102-page archive as the translation reference and current live EN content as the source of truth: `/fa/`, `/fa/contact.html`, `/fa/become-our-partner.html`, and `/fa/projects.html`. Add Persian page copy and localized contact/partner forms; retain the existing Persian About route. Fix locale routing so translated FA routes are selected when available and otherwise fall back to the corresponding English route instead of sending every request to About. Add a Persian homepage notice that remaining service pages are still English. Verified JSONL parsing, JavaScript and Playwright syntax; browser execution remains open under #101.

120. [x] Extend homepage section classification to Persian headings so the restored `/fa/` homepage renders its translated partner strip, feature/network split, project cards, news, success CTA and offices instead of silently omitting those sections. Include FA in the cross-locale homepage Playwright assertions. JavaScript and Playwright source syntax pass; browser execution remains open under #101.

121. [~] Persian route coverage after the first translation batch: 5 of the 34 FA pages in the approved 102-page archive are now represented in the unified route inventory (`/fa/`, About, Contact, Become Partner, Projects). The remaining 29 FA routes are not yet imported because their archive copies contain generic repeated filler; translate from verified EN/TR live content rather than copying placeholders. Keep the explicit English fallback for untranslated routes. Verified all seven homepage sections, 11 partner entries, 12 project icons, five network locations and four contact details in the FA data record; corrected the Persian office-section matcher and added a three-office Playwright assertion. Static syntax passes; browser execution remains open under #101.

122. [x] Add six Persian service routes translated from verified live EN content: API Supply, Import & Export, Sports Nutrition, Infant Formula, Cosmoderma and Contract Manufacturing. Preserve the shared 239-record API catalogue and all 30 FCM/CMO download documents. Restore the six-row bulk whey product-price table as structured shared data in EN/TR/FA; product codes and EUR/kg prices were checked against both live EN and TR pages. JavaScript and Playwright source syntax pass; browser execution remains open under #101.

123. [x] Add five more Persian service routes translated from verified live EN content: Brand Registration, Business Development, CBD_NON THC coordination, Chamber of Commerce and Exclusive Agency. Preserve legal-scope caveats and avoid copying generic placeholder text from the 102-page archive. Add route-level Playwright assertions. JavaScript and Playwright source syntax pass; browser execution remains open under #101.

124. [x] Add five Persian routes translated from verified live EN content: International Business Development, International Markets, Kenya Market, Licensing & Partnerships, and Market Entry. Preserve the Kenya regulator source links and commercial/legal caveats. Add Playwright route assertions and verify the PPB link opens externally. JavaScript and Playwright source syntax pass; browser execution remains open under #101.

125. [x] Add five Persian service routes translated from verified live EN content: Medical Devices, Nutraceuticals, Pet Food, Pharmaceutical Finished Products and Private Label. Preserve product-specific regulatory, quality and market-eligibility caveats. Add Playwright route assertions. JavaScript and Playwright source syntax pass; browser execution remains open under #101.

126. [x] Add five Persian routes translated from verified live EN content: Product Registration, Regulatory Affairs, South Africa Market, Supply Chain Solutions and Technology Transfer. Preserve regulatory responsibility disclaimers and official SAHPRA source links. Add Playwright route assertions and verify the external SAHPRA link behavior. JavaScript and Playwright source syntax pass; browser execution remains open under #101.

127. [x] Preserve all 102 route entries from the approved 102-page archive without duplicating three FCM form pages: add legacy Persian aliases for the non-sterile, sterile and solid-form pages, each redirecting to the single shared Contract Manufacturing download section and its corresponding category card. The three actual categories and all 30 language-specific HTML/RTF documents remain served by the unified selector. This keeps 102 routes while avoiding three duplicate form implementations. JavaScript and Playwright source syntax pass; browser execution remains open under #101.

128. [x] Remove duplicate dynamic/static content in the shared renderer: API catalogue heading, search/count/empty-state and regulatory note are now rendered once by `renderApiCatalog` before the API coordination content; the duplicate scraped API blocks are removed from EN/TR/FA records. FCM technical-form heading and category descriptions are rendered once by the shared downloads selector, with localized descriptions for EN/FA/TR/ES/FR. Contact and Partner form headings/intros are stored as form metadata and rendered once by `renderForm`; duplicate static form blocks and duplicate mail-note paragraphs are removed. Rename local update handlers to `updateApiResults` and `updateDownloads` to avoid same-name function declarations. JavaScript and Playwright source syntax pass; browser execution remains open under #101.

129. [x] Final static verification batch at branch head `16b751ea7e93ee6f94a3d3d761867c7d1560f2d2`: 102 unique routes (32 EN, 33 TR, 2 FR, 1 ES, 34 FA); all 34 Persian archive routes are represented; no duplicate route paths; JavaScript and Playwright spec syntax pass; CSS brace balance is zero; no duplicate function names remain. Data checks: 239 API records / 7 categories, 26 services, 54/54 slideshow assets present, 30 FCM/CMO files (15 HTML + 15 RTF), five homepages with 11 partners, 12 project icons, five network locations and four contact details; the six-row sports-nutrition price table is present in EN/TR/FA; six contact/partner forms are present (7 and 9 fields per form); 23 Playwright test cases are authored. These are static checks, not browser execution.

130. [ ] Resolve the homepage slideshow discrepancy before release: the current live homepage and the 102-page archive show 18 home slides, while the shared slideshow manifest contains 19 `home` entries. The rebuild currently follows the 19-entry manifest. Do not remove, reorder or edit any image until the owner confirms whether the 19th entry is an approved new slide or an unused asset.

131. [ ] Run the 23 Playwright cases and desktop/tablet/mobile visual comparison in a real browser. The current ChatGPT runtime has Chromium but no Playwright package; a direct headless Chromium smoke attempt did not return rendered DOM. No workflow dispatch, PR or Preview deployment was initiated. Do not mark browser QA complete based on syntax/static checks.

132. [ ] Legacy source cleanup remains gated on browser and visual parity. The unified rebuild now uses one shared renderer and stylesheet and removes duplicated API, FCM-download and form content, but old production files remain intact as rollback/reference material until the replacement is verified.

133. [x] Consolidate repeated base CSS selector blocks in the shared stylesheet. Merged base declarations for `a`, `button`, `select`, `.content-panel h2/h3`, `.api-table th`, `.form-field textarea`, `.footer a`, `.project-grid` and `.office-grid`; retained responsive overrides in their media queries. This removes same-context duplicate selector blocks without deleting mobile/tablet behavior. CSS brace balance remains zero.

134. [x] Correction to #133: the first CSS consolidation pass treated additive selector groups (for example `.content-panel h2,.content-panel h3` plus element-specific sizing, and `.api-table th,.api-table td` plus header styling) as duplicates and produced invalid CSS. Restored `rebuild/site.css` exactly to the last verified pre-consolidation version from commit `b2c08f4a88e769748a3b0adc01bdc6ac9b680e37`. No selector consolidation is claimed. Keep the CSS cleanup open; only merge rules after preserving grouped-selector semantics and validating with a real CSS parser.

135. [x] Refreshed static source audit at the current branch head: 102 unique routes; 35 named functions, all referenced and no duplicate function names; no single-use top-level `const` candidates; 23 unique Playwright test titles; JavaScript and test syntax pass; stylesheet brace balance is zero. The only apparent unused CSS class candidate, `.loading-mark`, is used by `rebuild/index.html`; partner color classes are data-driven. Responsive selector overrides are retained. This does not replace browser QA.

136. [ ] GitHub Actions browser QA execution is authorized by the repository owner on 2026-11-27. The Playwright workflow trigger is narrowed to the existing isolated branch `rebuild/unified-site-2026-11-27` in addition to its pre-existing triggers; no `main` or Production trigger changes. A single commit to that branch is intended to start one run. The workflow installs pinned `@playwright/test@1.56.1` and Chromium on GitHub-hosted `ubuntu-24.04`, then runs all tests in `tests/e2e` (the 23 unified-rebuild tests plus the existing locale smoke tests). This uses GitHub Actions hosted runner minutes; it does not create a Vercel deployment or touch production. Leave this item open until the workflow run completes and results/logs are reviewed.


137. [x] First real GitHub Actions browser run (run 46020978759) completed with 27 passing and 4 failing tests. Root-cause review of source and inventory identified: (a) the homepage feature renderer correctly emits eight `.reason` items, while the test incorrectly queried `.feature-card`; (b) Spanish About/Projects paths were prematurely resolved to the Spanish homepage before the navigation helper could add the local section anchors; (c) the Persian API route exists and is translated, so the test's expected English fallback was incorrect; (d) the Persian sports-nutrition inventory repeats table block index 0, causing the shared renderer to display the same six-row table twice. Corrected the test selector and language-route assertions, changed header navigation to pass canonical page paths to one navigation resolver, and made `renderBlocks` render each table index once per page. These changes are isolated to the experimental branch. Re-run browser QA and inspect results before marking complete; responsive visual comparison and full page-family parity remain open.


138. [ ] Capture and inspect desktop (1440px), tablet (820px) and mobile (390px) full-page screenshots for both the isolated rebuild and the live NIAZ NET homepage when reachable. Store screenshots as a GitHub Actions artifact even on successful runs. Compare page structure, typography, spacing, navigation, hero/slideshow, section order, card grids, contact/footer and responsive overflow. Do not claim visual parity or remove legacy source until the comparison is reviewed and remaining differences are recorded.
