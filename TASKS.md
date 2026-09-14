# emfls tech 작업 로드맵

## P0 — 기반 구축
- [x] Astro + TypeScript 정적 사이트 골격
- [x] 홈페이지와 공통 레이아웃
- [x] SEO 기본 구조, sitemap, robots.txt, favicon
- [x] about / privacy / contact / 404
- [x] 모바일 우선 Tech Support + Editorial 디자인 시스템

## P1-1 — 콘텐츠 구조와 카테고리
- [x] Astro Content Collection과 schema validation
- [x] 10개 카테고리 페이지와 metadata 자동 필터링
- [x] 정확히 3개 샘플 Troubleshooting Guide
- [x] 홈페이지·카테고리·Guide 연결

## P1-2 — 콘텐츠 확장
- [x] 초기 Troubleshooting Guide를 정확히 7개 추가해 총 10개 구성
- [x] Guide template와 해결 우선 UX 검증
- [x] `relatedGuides` 기반 내부링크 강화 및 존재 slug 검증

## P1-3 — 진단
- [x] Diagnostic Wizard MVP
- [x] Guide 10개를 deterministic outcome으로 연결

## P2-1 — 검색
- [x] 사이트 검색 MVP
- [x] Content Collection 기반 자동 검색 index
- [x] 한국어/영문 normalization 및 deterministic ranking
- [x] 홈페이지·Diagnostic 연결

## P2-2 — 콘텐츠
- [ ] Troubleshooting 콘텐츠 확장

## P2-3 — 탐색과 SEO
- [x] 내부 navigation 개선
- [x] Breadcrumb와 Guide discovery 강화
- [x] SEO 구조화 데이터 및 메타 audit
- [x] 빈 Category UX 개선

## P2-4 — 운영
- [x] Repository production-readiness QA
- [x] 도메인·SEO·정책·보안·의존성 audit
- [ ] 실제 production endpoint QA (배포/DNS 접근 확인 필요)
- [ ] 실제 GA4 Measurement ID 설정 후 연결 검토
- [ ] 실제 AdSense publisher ID 및 심사 상태 확인

## P2-4 QA 판정
- Repository readiness: 준비됨 (정적 build와 산출물 audit 기준)
- Production readiness: BLOCKED / 미확인 (현재 외부 endpoint 접근 확인 불가)
- AdSense review readiness: 사용자 계정·publisher ID 설정 필요
