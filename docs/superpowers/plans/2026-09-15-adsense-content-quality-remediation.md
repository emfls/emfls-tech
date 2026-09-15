# AdSense Content Quality Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve the practical usefulness and differentiation of the existing 20 emfls-tech Guides without adding Guides, ads, or changing site architecture.

**Architecture:** Keep the existing Content Collection schema, page templates, Search index, Diagnostic flows, and related-guide validation. Strengthen only the Markdown body of weak or repetitive Guides, using problem-specific decision branches, device/OS distinctions, and safety warnings.

**Tech Stack:** Astro 5, Markdown Content Collection, TypeScript, existing `npm run check` and `npm run build` validation.

**Spec:** User-provided P2-5 AdSense Content Quality Remediation request in the current conversation.

## Global Constraints

- Keep Guide count at 20, Category count at 10, Search index at 20, and Diagnostic flows at 16.
- Do not add AdSense code, publisher IDs, `ads.txt`, or advertising placeholders.
- Do not modify Search architecture, Diagnostic flows, GA4, canonical, sitemap, robots, or URL architecture.
- Do not invent contact details; keep Contact status unchanged.
- Preserve frontmatter schema and build-time relatedGuide validation.

### Task 1: Audit and classify existing Guides

**Files:**
- Read: `src/content/guides/*.md`
- Modify: `PROJECT_HISTORY.md`

- [x] Classify all 20 Guides by search intent, unique information, diagnostic usefulness, risk warnings, and overlap.
- [x] Record the initial distribution and selected weak targets in `PROJECT_HISTORY.md` after implementation.

### Task 2: Strengthen weak Guide bodies

**Files:**
- Modify: `src/content/guides/*.md` for selected weak targets only.

- [ ] Add concrete, topic-specific decision branches and next actions to weak network, storage, performance, and peripheral Guides.
- [ ] Keep the existing frontmatter, slug, category, and relatedGuide links unless a link is demonstrably irrelevant.
- [ ] Ensure reset, format, deletion, driver removal, and factory reset warnings remain explicit where relevant.

### Task 3: Validate content and site preservation

**Files:**
- Read: all Guide Markdown and generated `dist` output.
- Modify: `PROJECT_HISTORY.md`

- [ ] Run `npm run check` and `npm run build`.
- [ ] Verify Guide 20, Category 10, Search index 20, Diagnostic 16, invalid relatedGuide 0, duplicate intent 0, placeholder 0, and GA4 script duplication 0.
- [ ] Recheck Production representative Guides and record deployment and live spot-check results.
