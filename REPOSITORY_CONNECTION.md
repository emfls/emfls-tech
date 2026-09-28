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
- Chrome blocked direct reads of `/robots.txt` and `/sitemap.xml` with `net::ERR_BLOCKED_BY_CLIENT`; this run did not verify their public status or contents.
- A browser render does not establish HTTP status, Cloudflare account settings, or Search Console ownership/submission.

## Analytics and ads

- GA4 source ID: `G-ZL5RD70NKY`; `BaseLayout.astro` guards the tag with `import.meta.env.PROD`. The Site Registry records GA4 `SET`.
- AdSense has no configured publisher ID or loader in this repository; Site Registry records `NOT_SET`.
- Search Launch remains `NOT_READY` in Site Registry. Account-based external states must be checked there and must not be inferred from source code or public routes.

## Change boundary

This task began from the verified GitHub `main` commit above. Any local documentation checkpoint is separate from GitHub and Production until an authorized push/deploy occurs. This task did not push, deploy, or modify Cloudflare/DNS.
