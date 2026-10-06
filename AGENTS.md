# Project rules

- The app runs on TanStack Start with file routes in `src/routes/`; pages stay in `src/pages/` and route files only wire them up — keeps every page server-rendered for search engines without duplicating page code.
- Per-page titles, meta tags and JSON-LD render from page components (`SEOHead`, the local `Helmet` passthrough) and React hoists them into the server HTML; sitewide head tags, Google tags and the Organization/LocalBusiness graph live in `src/routes/__root.tsx` — one source per tag, no duplicates.
- City service page copy lives in `src/data/cityLocalProfiles.ts`, `serviceLocalAngles.ts` and `cityServiceCopy.ts` — keeps every city page distinct and the server HTML identical to visible content.
- Core service hub titles, H1s, descriptions, long-form sections and FAQs live in `src/data/coreServiceSeo.ts` — one source for the page and its FAQ schema.
- City text fields in `serviceAreas.ts` are derived from the local profiles at export time — prevents invented testimonials or unsupported claims from reappearing on city hubs.
- Contact form, Google reviews and review-request emails run as server functions in `src/lib/*.functions.ts`; the auth email hook, blog generators and MCP server stay as backend functions because external callers or schedules depend on their URLs.
