# Repository Connection · emfls-tech

## Source

- GitHub repository: https://github.com/emfls/emfls-tech
- Production branch: `main`
- Latest GitHub `main` verified at the start of the 2026-09-29 audit: `bd9ebc2866f08adcce445d1c3873d4d7700b8615`.
- Build contract: `npm run build` → Astro static output in `dist/`.
- Isolated writable checkout used for this task: `/Users/whitesmile/Documents/emfls-all/emfls-tech`.

## Public Production

- Public domain: https://tech.emfls.com/
- On 2026-09-29 Chrome rendered Home, Search, Diagnostic, a representative Guide, a Category, About, Privacy, Contact, Editorial Policy, and custom 404 content. Search and one Diagnostic branch were exercised.
- Chrome direct opens of `/robots.txt` and `/sitemap.xml` returned `net::ERR_BLOCKED_BY_CLIENT`; later direct read-only HTTP GETs confirmed both endpoints return 200. The single sitemap urlset contains 37 URLs, all on the custom domain.
- Direct HTTP GET also confirmed the homepage canonical uses `https://tech.emfls.com/` and an unknown path returns a real HTTP 404.
- The exact Naver verifier `.html` URL returns 308 to its extensionless route on both the custom domain and immutable Pages deployment. A local fix is on `codex/site6-foundation-search`; it is not deployed.
- A browser render does not establish HTTP status, Cloudflare account settings, or Search Console ownership/submission.

## Analytics and ads

- GA4 source ID: `G-ZL5RD70NKY`; `BaseLayout.astro` guards the tag with `import.meta.env.PROD`. The Site Registry records GA4 `SET`.
- AdSense has no configured publisher ID or loader in this repository; Site Registry records `NOT_SET`.
- Search Launch has a confirmed Production Naver-route blocker. Google/Naver/Daum/IndexNow ownership and sitemap submissions remain unverified; account states must not be inferred from source code or public routes.

## Change boundary

This cycle starts from the local `main` checkout's existing documentation checkpoint `06d5a931b367e0246aec887ffd522ca592eeef50`, one commit ahead of GitHub `main`; that checkpoint is preserved on the local feature branch. The current verifier fix is still local until a branch push and Cloudflare Preview are verified. Production, Cloudflare project settings, and DNS remain unchanged.
