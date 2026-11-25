# Roadmap

- [x] Strengthen the existing Highlands Ranch, Denver, Castle Rock, Englewood and Littleton landing pages: distinct local content, pricing clarity, internal links and consultation CTAs. All five return readable HTML with unique metadata, one H1, self-referencing canonicals and valid JSON-LD; phone pricing-to-consultation flow verified.

- [x] Apply the approved backlinks brief: five exact profiles in schema and footer, exact footer contact details; rendered JSON-LD and phone/desktop footer verified. All URLs respond successfully; Facebook redirects to login, so its public profile content remains unverified. Yelp/BBB excluded.

- [x] Nov 21 audit, in order: unique titles; distinct descriptions; self-referencing canonicals; one H1; useful /search content; server-readable text on the two flagged blog posts — verified across 190 pages.
- [x] Restore both missing blog addresses with new factual downsizing and estate-liquidation guides, as approved by David — both readable without JavaScript and consultation links tested.

- [x] Full SEO/AEO/GEO pass (Oct 6 brief): schema, six service hubs, 102 distinct city pages, homepage copy, titles/alt text, blog bylines and links, mobile speed fixes.
- [x] Server-rendering upgrade (TanStack Start): every page, blog post and city page now arrives fully built from the server.
- [ ] Publish the upgrade and re-measure mobile speed on the live site — waiting on the owner to review the preview and publish.
- [x] Live Google reviews feed — the Google Business Profile connection reaches the verified JSG Liquidators LLC listing; live feed wired via getGoogleReviews.functions.ts.
- [x] Owner approved Facebook and the four other profiles in the Nov 24 brief; LinkedIn excluded from the footer and schema.
- [x] Oct 15 brief, part 1: 35% commission, walk-through cleanout quotes, Vincent Billera/brothers, fully insured, Lone Tree, /search SearchAction, removed keyword tags, single LocalBusiness entity.
- [x] Oct 15 brief, part 2: Hotel/Office/Commercial clean-out pages, weekend phone hours.
- [x] Embed Google reviews — live feed from the verified JSG Liquidators LLC listing (2 reviews); the 6 extra static reviews may come from an older listing — owner to confirm.
- [ ] LinkedIn link, Denver number, photos — optional, waiting on David.
- [x] Walk-through request form at /walkthrough: weekday 1-hour on-site requests, stored in walkthrough_requests, emailed to David; weekend dates rejected, submission verified end-to-end.
- [x] Reviews now come only from the live GBP feed (static merge removed); Yelp/BBB section added to /testimonials, hidden until those profiles go live (add entries in src/data/externalReviews.ts).
- [ ] Live GBP feed returns 404: the JSG Liquidators listing is no longer in David's Google account (only Rodan Heating and Air and Skin Care by Nicole remain). Site falls back to saved review copies. Waiting on David to check business.google.com; re-pin the location ID once the listing is back.
- [ ] WhatsApp assistant (Ask JSG on WhatsApp): 24/7 lead answers, 35% + walk-through quoting, 1-hour walk-through booking (Mon-Fri 8am-6pm Denver), handoff = WhatsApp alert to David (805) 444-4069. BLOCKED: WhatsApp connector declined — code built, activation waits on connection + Incoming messages destination set to this project.
