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
- The contact details currently use both info@niaznet.net and info@niaznet.com in different places. Confirm the intended public email before standardizing it.
- The sitemap currently contains 29 URLs. The Projects page is excluded pending confirmation that all displayed project categories, counts and agreement descriptions are approved for public indexing.
- Newsletter and contact forms need a verified backend or form service before they can collect submissions.
- India and Spain office details are described as pending confirmation; do not present them as established offices until addresses are verified.
- The latest Vercel status is blocked by the team's build-rate limit. This is not a successful preview validation and should not be interpreted as proof that the latest code builds correctly.

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
