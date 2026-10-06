# Project rules

- City service page copy lives in `src/data/cityLocalProfiles.ts`, `serviceLocalAngles.ts` and `cityServiceCopy.ts`, shared by the React pages and `scripts/prerender.ts` — keeps crawler HTML identical to visible content and every city page distinct.
- Core service hub titles, H1s, descriptions, long-form sections and FAQs live in `src/data/coreServiceSeo.ts` — one source for the page, its FAQ schema and the prerendered HTML.
- City text fields in `serviceAreas.ts` are derived from the local profiles at export time — prevents invented testimonials or unsupported claims from reappearing on city hubs.
