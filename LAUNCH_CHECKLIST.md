# emfls-tech · Production and Launch Evidence

## Local repository checks

- `npm ci`: PASS on 2026-09-29; npm reported the existing deprecated `tsconfck@3.1.6` dependency warning.
- `npm run check`: PASS on 2026-09-29; 21 files, 0 errors, 0 warnings, 5 existing Astro hints.
- `npm run build`: PASS on 2026-09-29; 38 static pages generated.
- `git diff --check`: PASS after the documentation sync.

## Fresh Chrome Production smoke · 2026-09-29

Production URL: https://tech.emfls.com/

- [x] Homepage rendered in Chrome; desktop screenshot inspected.
- [x] Search page rendered; query `wifi` returned six matching Guides.
- [x] Diagnostic flow completed for Internet → repeated disconnection → “No”; result linked to the corresponding Guide.
- [x] Representative Guide rendered: `/guides/internet-keeps-disconnecting/`.
- [x] Representative Category rendered: `/category/pc/`.
- [x] About, Privacy, Contact, and Editorial Policy rendered. Contact correctly states that no official public channel is available yet.
- [x] An unknown route rendered the custom 404 content. HTTP status was not exposed by this browser check.
- [ ] Read `/robots.txt` and `/sitemap.xml` directly in the selected Chrome session. Both direct opens returned `net::ERR_BLOCKED_BY_CLIENT`; HTTP status/body are therefore unverified in this run. Do not use a proxy or alternate browser to bypass this restriction.
- [ ] Fresh exact viewport checks at 1440px, 390px, and 320px. This run used the normal Chrome viewport only; prior responsive evidence is historical, not a new capture.

## Search, analytics, and advertising

- Search Launch remains `NOT_READY` in Site Registry. Google/Naver/Daum/IndexNow account ownership or submission cannot be inferred from public page reachability. This run did not sign into accounts or change submissions.
- GA4 `G-ZL5RD70NKY` is configured in source and guarded for production builds; Site Registry records GA4 `SET`.
- AdSense publisher ID/review remains `NOT_SET` in Site Registry. No advertising loader or `ads.txt` was added.
- Production and DNS were not changed. No push or deployment was performed.

## Previous source and production evidence

The 2026-09-15 `PROJECT_HISTORY.md` records a 37-URL `/sitemap.xml`, `/robots.txt` Sitemap directive, canonical/trailing-slash checks, 404, and full responsive visual QA. Those are historical results; the current Chrome restriction prevented refreshing the two text endpoints on 2026-09-29.
