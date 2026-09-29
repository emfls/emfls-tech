# emfls-tech · Production and Launch Evidence

## Local repository checks

- `npm ci`: PASS on 2026-09-29; npm reported the existing deprecated `tsconfck@3.1.6` dependency warning.
- `npm run check`: PASS on 2026-09-29 after the local verifier-route change; 23 files, 0 errors, 0 warnings, 5 existing Astro hints.
- `npm run build`: PASS on 2026-09-29; 38 static pages generated.
- `node --test tests/search-foundation.test.mjs`: PASS, 2/2 focused verifier-route tests.
- `git diff --check`: PASS for the current local patch and documentation changes.

## Fresh Chrome Production smoke · 2026-09-29

Production URL: https://tech.emfls.com/

- [x] Homepage rendered in Chrome; desktop screenshot inspected.
- [x] Search page rendered; query `wifi` returned six matching Guides.
- [x] Diagnostic flow completed for Internet → repeated disconnection → “No”; result linked to the corresponding Guide.
- [x] Representative Guide rendered: `/guides/internet-keeps-disconnecting/`.
- [x] Representative Category rendered: `/category/pc/`.
- [x] About, Privacy, Contact, and Editorial Policy rendered. Contact correctly states that no official public channel is available yet.
- [x] An unknown route rendered the custom 404 content. HTTP status was not exposed by this browser check.
- Chrome direct opens of `/robots.txt` and `/sitemap.xml` returned `net::ERR_BLOCKED_BY_CLIENT`; separate read-only HTTP GETs are recorded below.
- [ ] Fresh exact viewport checks at 1440px, 390px, and 320px. This run used the normal Chrome viewport only; prior responsive evidence is historical, not a new capture.

## Read-only Production HTTP endpoints · 2026-09-29

- [x] `https://tech.emfls.com/`: HTTP 200; page title, description, and custom-domain canonical present.
- [x] `/robots.txt`: HTTP 200; allows crawl and points to `https://tech.emfls.com/sitemap.xml`.
- [x] `/sitemap.xml`: HTTP 200, `application/xml`, single `urlset` with 37 URLs; every `<loc>` uses `https://tech.emfls.com/`.
- [x] Random unknown route: HTTP 404 with the site's custom 404 HTML.
- [ ] Naver verification `/naverf25a6a23decbc53256c83fd625d68e88.html`: Production HTTP 308 to the extensionless path. The extensionless path returns the token body with 200, but the exact `.html` URL is still a launch blocker.
- Evidence source: direct no-redirect HTTP GET against the custom domain and current immutable Pages deployment URL. No Production or DNS change was made.

## Local Search Foundation patch · 2026-09-29

- Branch: `codex/site6-foundation-search`; no push/PR/Preview/Production deployment yet.
- A site-local Pages Function now returns the exact Naver token at the requested `.html` route. `public/_routes.json` includes only that exact route; other paths remain static.
- Local Pages HTTP and Chrome route checks show the exact `.html` URL returns 200 without a redirect, and homepage / robots / sitemap / 404 checks still pass.
- Google/Naver/Daum/IndexNow ownership/submission remains unverified and unchanged; no external account login was attempted.

## Search, analytics, and advertising

- Search Launch remains blocked by the Production Naver `.html` 308 and account-owned registration/submission steps. Registry external account states remain `NOT_SET`; no sign-in or submission was attempted.
- GA4 `G-ZL5RD70NKY` is configured in source and guarded for production builds; Site Registry records GA4 `SET`.
- AdSense publisher ID/review remains `NOT_SET` in Site Registry. No advertising loader or `ads.txt` was added.
- Production and DNS were not changed. No push or deployment was performed.

## Previous source and production evidence

The current 37-URL sitemap, robots directive, canonical host, and HTTP 404 were rechecked directly on 2026-09-29. Fixed viewport visual checks remain outstanding. The Naver `.html` path still fails on current Production; its local fix awaits a branch Preview and release.
