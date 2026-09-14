# emfls-tech P0 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a stable Astro static-site foundation for tech.emfls.com focused on everyday IT troubleshooting.

**Architecture:** Use Astro pages, shared layout/components, TypeScript data modules, and one vanilla CSS system. Keep search and diagnostics as non-functional, extensible UI/data structures.

**Tech Stack:** Astro, TypeScript, vanilla CSS, @astrojs/sitemap.

**Spec:** User-provided emfls-tech P0 requirements in the task conversation.

## Global Constraints

- Work only inside `/Users/whitesmile/Documents/emfls-tech`.
- Use static output and no server, database, authentication, external search, or AI API.
- Do not create bulk content or implement P1 features.
- Canonical site URL is `https://tech.emfls.com`.

### Task 1: Scaffold and shared foundation

**Files:** `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/data/site.ts`, `src/layouts/BaseLayout.astro`, `src/styles/global.css`, `public/favicon.svg`.

- Create Astro configuration with static output and sitemap integration.
- Define site metadata, categories, and homepage navigation data in TypeScript.
- Create shared semantic layout with title, description, canonical, Open Graph, JSON-LD, header, footer, and responsive CSS.
- Add favicon and scripts for build/dev/preview.

### Task 2: P0 pages and UI

**Files:** `src/pages/index.astro`, `src/pages/about.astro`, `src/pages/privacy.astro`, `src/pages/contact.astro`, `src/pages/404.astro`.

- Build the homepage sections in the specified support/editorial order.
- Add only representative guide cards and category/navigation data; no bulk articles.
- Build concise policy/contact pages and a real 404 page.

### Task 3: SEO and project documentation

**Files:** `public/robots.txt`, `README.md`, `AGENTS.md`, `SITE_STRATEGY.md`, `DESIGN_SYSTEM.md`, `TASKS.md`, `PROJECT_HISTORY.md`.

- Document strategy, design rules, roadmap, and implementation history.
- Add robots.txt and verify sitemap output/canonical metadata.

### Task 4: Verification

- Install dependencies only as required by the Astro scaffold.
- Run the production build.
- Inspect generated routes and metadata, and check internal links against the built site.
- Run the local preview and request all required routes.
