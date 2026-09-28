# emfls tech

`tech.emfls.com`을 위한 생활 IT 문제 해결 사이트입니다.

## Product

현재 제품은 20개 Troubleshooting Guide, 10개 Category, 정적 검색, rule-based Diagnostic으로 구성됩니다. Search와 Diagnostic은 사용자별 서버 저장 없이 브라우저에서 동작합니다.

## Production and Operations

- Production domain: https://tech.emfls.com/
- Static build: `npm run build` → `dist/`
- Production-only GA4 ID in code: `G-ZL5RD70NKY` (`src/data/site.ts`, guarded by `import.meta.env.PROD` in `BaseLayout.astro`)
- AdSense publisher ID / loader: not configured. Do not infer review approval from the presence of a future task.
- Search Console, Naver, Daum and IndexNow account states are tracked in the Site Registry; code and public page reachability do not prove ownership or submission.

## Local verification

```bash
npm ci
npm run check
npm run dev
npm run build
```

Current Production route and browser evidence, plus remaining verification limits, are recorded in `LAUNCH_CHECKLIST.md` and `PROJECT_HISTORY.md`.
