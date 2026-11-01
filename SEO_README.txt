NIAZ NET — SEO FOUNDATION & MULTILINGUAL ROADMAP
Last reviewed: 2026-10-31

WORKING STATUS
- Working branch: seo-multilingual-foundation
- Review: https://github.com/alirezaabdolrahimi-a11y/my-website/pull/8
- The PR is draft and unmerged. The production branch (main) has not been changed.
- No production deployment has been requested or performed.

COMPLETED IN THE WORKING BRANCH
- Homepage: canonical URL, robots directives, Open Graph and Twitter metadata, Organization and WebSite structured data.
- Public-facing brand name standardized to NIAZ NET across all 30 HTML pages.
- All 30 HTML pages checked for title, meta description, canonical, Open Graph title and Twitter card metadata.
- All 30 page titles reviewed and found distinct.
- Existing 23 standalone service pages retained; their Service and Breadcrumb structured data remains in place.
- Page-level structured data added to About, Contact, Industries, Projects and Become Our Partner.
- Business Development and Cross-Border Business Development pages now have distinct search intent and metadata.
- The nine industry descriptions have been rewritten to describe their respective commercial scope rather than repeating generic copy.
- Regulatory wording on the homepage and About page has been clarified: NIAZ NET coordinates commercial and documentation discussions; regulatory decisions and approvals remain with the relevant authorities.
- Sitemap and robots.txt retained; projects.html remains intentionally outside the sitemap pending confirmation of the project and active-agreement claims shown on that page.

KNOWN ITEMS TO CONFIRM OR COMPLETE
- The current language selector is only a partial client-side English/Persian text switch. It is not a complete SEO multilingual implementation.
- Localized, crawlable page sets for Persian (/fa/), Arabic (/ar/), Turkish (/tr/) and Spanish (/es/) have not yet been created.
- Do not add hreflang annotations until matching translated pages exist and each alternate points reciprocally to the others.
- Official domain: https://niaznet.net/. Confirmed contact emails: info@niaznet.net, agent@niaznet.net and alireza@niaznet.net. All HTML pages and the sitemap have been standardized to the apex domain and the confirmed info address.
- The sitemap currently contains 29 URLs. The Projects page is excluded pending confirmation that all displayed project categories, counts and agreement descriptions are approved for public indexing.
- Newsletter and contact forms need a verified backend or form service before they can collect submissions.
- India and Spain office details are described as pending confirmation; do not present them as established offices until addresses are verified.
- A Vercel Preview deployment has previously reached READY, but every new commit still requires a fresh build and browser-level QA before release.

MULTILINGUAL IMPLEMENTATION REQUIREMENTS
For every supported language:
1. Create a complete, human-reviewed localized page set under /fa/, /ar/, /tr/ or /es/.
2. Translate visible content, page titles, descriptions, navigation, forms, accessibility labels and relevant structured data.
3. Set the correct html lang attribute; use RTL layout for Persian and Arabic.
4. Give each localized page a self-referencing canonical URL.
5. Add reciprocal hreflang links for en, fa, ar, tr and es only where equivalent pages exist.
6. Update internal links so visitors remain in their selected language wherever a translated page is available.
7. Add the localized URLs to sitemap.xml after the pages are complete and tested.
8. Preserve the existing NIAZ NET visual identity and existing English content; do not replace the site with a new design.

FINAL QA AND RELEASE
- Retry preview builds when the Vercel team build-rate limit is cleared.
- Test all changed URLs, mobile navigation, language switching, RTL layout, forms, image paths, canonical tags, hreflang reciprocity, sitemap and structured data.
- Review Google Search Console and Bing Webmaster Tools after the approved release.
- Do not merge the draft PR or deploy to production without the user's explicit approval.

SEO NOTE
Technical SEO improvements do not guarantee rankings. Prioritize accurate, original business information, useful sector-specific content, crawlable URLs, genuine experience and relevant authority. Avoid keyword stuffing, mass-generated thin pages and unsupported business or regulatory claims.


UPDATES — 2026-11-01
- Canonical, Open Graph and other absolute site URLs standardized to https://niaznet.net/ (without the unconfirmed www host).
- Replaced info@niaznet.com references throughout the HTML pages with info@niaznet.net.
- Contact page now displays all three confirmed addresses: info@niaznet.net, agent@niaznet.net and alireza@niaznet.net.
- Homepage Organization structured data includes the three confirmed contact points.
- API page now contains all 209 catalogue entries as crawlable static HTML rows, with a client-side search/filter as progressive enhancement and an ItemList JSON-LD description. Product names no longer depend on fetching api-catalog.json to appear in the initial page HTML.
- Homepage slideshow reduced from 18 hero slides to 3 smaller assets; secondary images use lazy loading and async decoding.
- Persian toggle on homepage no longer sets dir=rtl on the whole body or reverses the page grids. Text direction is applied to selected text elements while the layout containers remain LTR.
- Persian translation remains incomplete. The current client-side translation map is not a complete localized site and does not create indexable Persian URLs. Do not claim multilingual SEO is complete; next phase must create fully translated /fa/ page equivalents and then add reciprocal hreflang and localized sitemap URLs.
- Large PNG/JPG hero assets across service pages remain a performance opportunity. A proper WebP/AVIF conversion pipeline is still recommended; do not claim all slideshow images have been compressed.
