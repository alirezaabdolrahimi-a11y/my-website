# NIAZ NET — Technical SEO Audit

**Audit date:** 2026-11-28  
**Repository:** `alirezaabdolrahimi-a11y/my-website`  
**Branch reviewed:** `main`  
**Main revision reviewed:** `451fd43158a4468a5a61a910e631efac8c53b863`  
**Audit type:** Read-only source and generated-artifact inspection

## Scope and verified baseline

- Page inventory: 102 records.
- Indexable records: 99.
- Redirect aliases: 3.
- All 99 indexable records have unique, self-referencing canonical URLs on `https://www.niaznet.net`.
- `vercel.json` contains six country-based redirects (root and `/index.html` for Türkiye, Spain and Côte d’Ivoire). All six destinations exist in the page inventory.
- No legacy catch-all `routes` block is present in the current `vercel.json`.

## Findings requiring follow-up

### 1. Committed sitemap is behind the page inventory

The committed `sitemap.xml` contains 69 URL entries, while the current inventory contains 99 indexable pages. Thirty indexable Persian (`/fa/`) pages are absent from the committed sitemap.

The build script regenerates the sitemap from non-redirect inventory records, so a fresh build is expected to produce 99 URL entries. The committed sitemap should nevertheless be regenerated and checked against the inventory before relying on the repository artifact.

### 2. x-default hreflang is not preserved by the current page generator

The existing committed homepage HTML and sitemap contain x-default references in most places. However, the current `pageHtml()` alternate-link builder and the sitemap writer in `tools/prerender-pages.mjs` emit language alternates without an x-default entry.

A fresh build therefore risks removing x-default from generated HTML and sitemap output. The committed sitemap also has two project-details entries without a self-referencing alternate / x-default entry.

### 3. Structured data is present in legacy homepage files but absent from the new generator

The committed `index.html` and `tr/index.html` contain Organization and WebSite JSON-LD blocks. The current `pageHtml()` implementation in `tools/prerender-pages.mjs` does not emit JSON-LD.

Because the Vercel build command runs `node tools/prerender-pages.mjs`, the next generated build can overwrite those homepage files without preserving their existing structured data. This is a build-source preservation issue; this audit does not claim that every currently deployed page has already lost its schema.

### 4. Internal home anchors are not preserved by the new hero renderer

The inventory contains 80 internal links targeting `/index.html#home` or `index.html#home`. The committed legacy `index.html` currently contains a hero section with `id="home"`.

The current `renderHero()` output in `tools/prerender-pages.mjs` emits `<section class="hero">` without that ID. A fresh prerender can therefore leave those 80 links pointing to a missing fragment target. The same renderer is used for localized homepages.

## Not verified in this read-only pass

- Google Search Console indexing, crawl statistics, query performance and coverage.
- Backlink profile and referring-domain quality.
- Live Production behavior: direct retrieval of the live homepage and sitemap was unavailable during this audit, so the findings above are based on the repository’s committed files and build source.
- Search-volume and keyword-difficulty metrics.

## Recommended order for a separate implementation approval

1. Preserve `x-default` in generated HTML and sitemap, and validate reciprocal hreflang links.
2. Preserve Organization and WebSite JSON-LD in the prerendered output.
3. Restore the `home` fragment ID on generated home hero sections.
4. Regenerate and validate the sitemap against all 99 indexable inventory records.
5. Add regression tests for these conditions.

**No website source behavior, Production deployment, or merge was changed by this audit.**
