# emfls tech 프로젝트 기록

## 2026-09-14 — P0 기반 구축

### 만든 것
- Astro + TypeScript 기반 정적 사이트와 `output: static` 설정을 만들었다.
- `BaseLayout.astro`로 공통 header/footer, SEO title·description·canonical·Open Graph·JSON-LD를 통합했다.
- 홈페이지에 증상 중심 Hero, 자주 발생하는 문제, 기기별 탐색, Diagnostic 흐름 소개, 대표 가이드, 전체 카테고리를 구성했다.
- `/about`, `/privacy`, `/contact`, `/404` 페이지와 favicon, `robots.txt`를 추가했다.
- P0의 확장 지점이 될 카테고리·문제·기기·가이드 데이터를 `src/data/site.ts`에 분리했다.

### 기술 결정
- 검색·진단은 정적 UI와 데이터 구조만 제공하고 실제 로직은 P1 이후로 미뤘다.
- vanilla CSS를 사용해 의존성을 최소화하고, 밝은 neutral과 navy 진단 패널, grid 및 monospace 상태 태그로 독립적인 시각 언어를 만들었다.
- canonical 기준은 `https://tech.emfls.com`으로 고정했다.

### 의도적으로 하지 않은 것
- 대량 콘텐츠, 외부 검색 API, AI API, DB, 로그인, SSR, 광고, GA4, 실제 Diagnostic Wizard 로직은 구현하지 않았다.
- 다른 `emfls-*` 저장소나 상위·형제 디렉터리는 수정하지 않았다.

### 다음 단계
- P1에서 카테고리 페이지와 검증된 Troubleshooting 콘텐츠를 추가하고, 현재 Diagnostic 5단계 UI를 MVP 흐름으로 확장한다.

### 검증 기록
- `npm run build` 성공: 정적 모드로 5개 페이지와 sitemap 생성.
- preview 서버에서 `/`, `/about/`, `/privacy/`, `/contact/`, `/404.html`, `/sitemap-index.xml`, `/robots.txt` 모두 HTTP 200 확인.
- 생성된 HTML의 내부 링크 검사 결과 broken link 0건.

## 2026-09-14 — P1-1 콘텐츠 구조와 카테고리

### Content Collection schema
- `src/content.config.ts`의 `guides` collection이 `src/content/guides/*.md`를 glob loader로 읽는다.
- 필수 metadata는 `title`, `description`, `category`, `device`, `problemType`, `updatedDate`, `summary`, `symptoms`, `causes`, `checks`, `solutions`이다.
- `difficulty`는 `easy | moderate | advanced` enum이며 기본값은 `easy`다.
- `warnings`와 `relatedGuides`는 선택 배열이며 기본값은 빈 배열이다.
- `solutions`는 `title`과 `body`를 가진 단계 배열이다.

### 연결과 URL
- `src/data/site.ts`의 `categorySlugs`가 유일한 category slug 소스다. Content schema의 `z.enum(categorySlugs)`, category static paths, category metadata가 모두 이 값을 사용한다.
- Guide의 `category` metadata를 기준으로 `/category/[slug]/`가 `getCollection('guides')` 결과를 자동 필터링한다. 카테고리별 guide 목록을 페이지에 수동 작성하지 않는다.
- Guide URL은 파일명에서 파생된 `/guides/[slug]/`, category URL은 `categorySlugs`에서 파생된 `/category/[slug]/`다.

### 생성한 3개 Guide
- `wifi-slow`: Wi-Fi 속도 저하와 끊김
- `mac-storage-full`: Mac 저장공간 부족
- `bluetooth-not-connecting`: Bluetooth 연결 실패

각 파일은 실제 title/description/device/problemType/difficulty/date/summary와 증상·원인·확인·해결 단계·주의사항·관련 Guide metadata, 그리고 해결 우선 본문을 가진다.

### 확장 방법
- 신규 Guide는 `src/content/guides/<영문-slug>.md`를 만들고 schema 필드와 본문 구조를 채운다. category에는 반드시 `categorySlugs`의 기존 slug를 사용하며, 저장 후 `getCollection` 기반 페이지에 자동 노출된다.
- 신규 category는 `categorySlugs`에 slug를 추가하고 같은 키로 `categoryMeta`에 이름·설명·문제 유형·관련 category를 추가한다. category static page와 schema enum, 홈페이지 목록이 자동으로 확장된다.
- 홈페이지는 `getCollection('guides')`를 직접 호출해 대표 Guide 카드와 URL을 만들고, `categorySlugs`/`categoryMeta`로 category 링크를 만든다.

### 의도적으로 제외한 기능
- P1-2 콘텐츠 확장, 실제 검색, Diagnostic Wizard 로직, API/AI/DB/로그인/분석/광고는 구현하지 않았다.
- 샘플 Guide는 정확히 3개만 생성했다.

## 2026-09-14 — P1-2 Troubleshooting 콘텐츠 확장

### 기존 Guide 검토
- `wifi-slow`, `mac-storage-full`, `bluetooth-not-connecting`을 검토했다. 세 Guide는 동일한 metadata 배열과 `solutions` 단계 구조를 사용하고, 본문은 `한눈에 보기 → 가능한 원인 → 그래도 해결되지 않을 때`의 짧은 해결 우선 흐름을 유지한다.
- 기존 3개 파일은 전면 재작성하지 않았다. 공통 Guide 페이지가 Quick check, 증상, 해결 순서, 주의, 관련 Guide를 렌더링하므로 새 Guide도 동일한 template을 검증할 수 있었다.

### 신규 Guide와 현재 콘텐츠
- 정확히 7개를 추가했다: `pc-running-slow`, `monitor-no-signal`, `usb-not-recognized`, `printer-offline`, `smartphone-storage-full`, `internet-keeps-disconnecting`, `app-not-responding`.
- 현재 Guide 총 10개, Category 총 10개다.
- 모든 신규 Guide는 title, description, category, device, problemType, difficulty, updatedDate, summary, symptoms, causes, checks, solutions, warnings, relatedGuides를 실제 문제 해결 내용으로 채웠다.

### 내부링크와 schema
- `relatedGuides`는 기존 schema의 선택 배열을 그대로 사용했다. schema 변경은 필요하지 않아 하지 않았다.
- Guide route에서 collection의 실제 ID Set과 `relatedGuides`를 비교한다. 존재하지 않는 slug가 들어오면 빌드가 실패하므로 잘못된 내부 링크가 조용히 생성되지 않는다.
- 관련성 기준으로 Wi-Fi↔인터넷 끊김, Mac 저장공간↔스마트폰 저장공간, Bluetooth↔USB·모니터 등을 연결했으며 링크 개수를 인위적으로 맞추지 않았다.

### Category와 홈페이지
- Category 페이지는 계속 `getCollection('guides')`와 `guide.data.category`를 기준으로 자동 분류한다. PC, 스마트폰, 인터넷, 주변기기, 소프트웨어에 신규 Guide 노출을 확인할 수 있다.
- 홈페이지는 전체 Guide collection을 `updatedDate` 내림차순으로 정렬하고 상위 6개만 노출하는 deterministic 규칙을 사용한다. 특정 3개 slug를 하드코딩하지 않는다.

### 향후 Guide 추가 규칙
1. `src/content/guides/<영문-kebab-case-slug>.md` 파일을 하나 만든다.
2. 기존 category slug 중 하나를 `category`에 지정한다.
3. 실제 증상·원인·확인·저위험 해결 순서를 metadata에 작성하고, 본문은 해결 우선 구조로 짧게 작성한다.
4. 삭제·초기화·포맷처럼 데이터 손실 가능성이 있는 조치는 warnings에 명시하고 마지막 단계에 둔다.
5. 실제 존재하는 관련 Guide의 파일명 slug만 `relatedGuides`에 넣는다.
6. `npm run check`와 `npm run build`로 schema, route, sitemap을 확인한다.

### 의도적으로 하지 않은 것
- P1-3 Diagnostic Wizard, 실제 검색, API·AI·DB·로그인·댓글·사용자 저장, GA4·AdSense·Cloudflare는 구현하지 않았다.
- 7개를 초과하는 Guide를 생성하지 않았고, 전체 디자인을 리뉴얼하지 않았다.

## 2026-09-14 — P1-3 Diagnostic Wizard MVP

### 목적과 URL
- `/diagnose/`에서 사용자가 기기·영역, 증상, 기본 확인 질문을 차례로 선택하고 현재 Guide로 이동하도록 했다.
- AI 진단이 아니라 브라우저에서 실행되는 deterministic rule-based navigator로 정의했다. 결과는 고장 확정이 아니라 먼저 확인할 항목, 가능성이 높은 문제 유형, 추천 Guide를 안내한다.

### 데이터 구조
- `src/data/diagnostic.ts`에 `diagnosticAreas`와 `diagnosticFlows`를 분리했다.
- Area는 `pc`, `mac`, `smartphone`, `network`, `peripherals`, `software` 6개다.
- 각 flow는 `id`, `label`, `guideSlug`, `question`, `answers`, `firstCheck`, `problemType`을 가진다.
- Area별 symptom은 해당 flow 배열에서 파생되며, 모든 flow는 하나의 질문과 3개 답변(예/아니요/확인하지 않음)을 가진 결과 branch로 끝난다.

### Guide 연결과 검증
- Guide 제목·설명은 Diagnostic 데이터에 복사하지 않고 `getCollection('guides')` 결과에서 `guideData`를 만들어 사용한다.
- `/diagnose/` 빌드 시 모든 flow의 `guideSlug`를 실제 Content Collection ID Set과 비교한다. 없는 slug가 있으면 build가 실패한다.
- 현재 10개 Guide 모두 최소 하나의 outcome에 연결되어 있으며, area와 symptom의 모든 branch가 결과로 도달한다.

### JavaScript와 접근성
- React/Vue/Svelte 없이 `define:vars`와 짧은 DOM 이벤트 코드만 사용한다. 선택·다음·뒤로·초기화·결과·Guide 이동만 클라이언트에서 처리한다.
- 실제 `<button>`과 `<a>`를 사용하고, 선택 상태는 border/background와 텍스트 구조로 구분한다. 결과 패널은 `aria-live="polite"`를 사용하며 기존 focus-visible 스타일을 재사용한다.
- LocalStorage, query state, analytics는 사용하지 않는다.

### 신규 Diagnostic flow 추가 방법
1. `src/data/diagnostic.ts`의 기존 Area 배열에 flow를 추가한다.
2. `guideSlug`에는 `src/content/guides`에 실제 존재하는 파일 slug만 입력한다.
3. `question`, `answers`, `firstCheck`, `problemType`을 해당 증상에 맞게 작성한다.
4. `npm run check`와 `npm run build`를 실행해 type 오류·잘못된 Guide slug·정적 route 생성을 확인한다.
5. 모든 flow가 결과까지 도달하고 각 Guide가 최소 하나의 outcome에 연결되는지 확인한다.

### 의도적으로 하지 않은 것
- 검색, API, AI, DB, 로그인, LocalStorage, Analytics, P2 기능은 구현하지 않았다.
- 신규 Troubleshooting Guide를 추가하지 않았고, 기존 P0/P1-1/P1-2 URL과 디자인을 전면 재작성하지 않았다.

## 2026-09-14 — P2-1 사이트 검색 MVP

### Search 구조
- `/search/`는 정적 페이지이며, `src/pages/search.astro` 빌드 시 Content Collection 전체를 `src/data/search.ts`의 `toSearchIndex()`로 변환한다.
- 검색 대상은 현재 schema에 존재하는 `title`, `description`, `category`, `device`, `problemType`, `summary`, `symptoms`, `causes`다. Guide별 검색용 파일이나 수동 metadata 복사본은 만들지 않았다.
- 신규 Guide가 Content Collection에 추가되면 별도 search 설정 없이 index에 자동 포함된다.

### Normalization과 ranking
- 소문자 변환, trim, 연속 공백 정리, 일부 구분 기호 제거를 사용한다.
- 최소 alias는 `와이파이/무선인터넷/wi-fi → wifi`, `블루투스 → bluetooth`, `저장 공간 → 저장공간`, `컴퓨터 → pc`, `느림 → 느리`다. 마지막 alias는 한국어 활용형 검색을 위해 추가했다.
- ranking은 title 완전 일치 100, title 포함 70, symptoms 포함 50, summary 포함 35, 나머지 metadata 포함 15점이다. 동점은 title과 slug 순으로 정렬해 deterministic하게 유지한다.

### URL·UX·안전성
- `/search/?q=` query를 읽어 새로고침·직접 접근에도 입력과 결과를 복원한다. canonical은 query와 무관하게 `https://tech.emfls.com/search/`다.
- 빈 query는 전체 Guide를 출력하지 않고 검색 안내와 시작 검색어를 보여준다. 결과가 없으면 `/diagnose/`로 안내한다.
- 결과 카드는 클라이언트 DOM API와 `textContent`로 생성하며 사용자 입력을 `innerHTML`에 삽입하지 않는다.
- 홈페이지의 기존 Command/search 영역은 최소 script로 `/search/` form으로 연결한다. Diagnostic 페이지는 기존 구조를 변경하지 않았다.

### SEO 정책
- `/search/`는 query별 정적 랜딩 콘텐츠가 아니라 하나의 검색 도구 페이지다. 따라서 별도 query canonical을 만들지 않고 query 없는 `https://tech.emfls.com/search/` canonical을 유지한다. P2-1에서는 검색 안내 페이지 자체는 indexable로 두되, 검색 결과는 클라이언트에서만 생성되어 검색엔진에 중복 결과 URL이 노출되지 않는다. 향후 검색 결과를 서버 렌더링 랜딩으로 확장할 때 `noindex` 정책을 재검토한다.

### 의도적으로 하지 않은 것
- 외부 검색 서비스·library, 서버 검색, DB, AI/API, LocalStorage, Analytics, 검색어 사전 대량 구축, P2-2 콘텐츠 확장은 구현하지 않았다.

## 2026-09-14 — P2-2 Troubleshooting 콘텐츠 확장

- 기존 Guide 10개와 schema를 유지하고 신규 Guide 정확히 10개를 추가해 총 20개로 확장했다. Category는 기존 10개를 유지했다.
- 추가 slug: `wifi-connected-no-internet`, `wifi-keeps-disconnecting`, `windows-no-sound`, `laptop-battery-draining-fast`, `mac-running-slow`, `smartphone-battery-draining-fast`, `smartphone-wifi-not-connecting`, `external-drive-not-recognized`, `keyboard-not-working`, `mouse-not-working`.
- 신규 글은 각기 다른 검색 의도를 다루며, 특히 Wi-Fi 속도 저하·무선 연결 끊김·Wi-Fi 연결 후 인터넷 불가·인터넷 회선 끊김을 분리했다.
- 모든 Guide는 기존 Content Collection schema와 해결 우선 본문 규칙을 사용한다. schema 변경은 없고, 관련 Guide slug만 실제 파일 기준으로 연결했다.
- Search index는 Content Collection 자동 생성 방식 그대로 유지되어 20개를 포함한다. alias는 신규 검색에 필요한 `느림 → 느리`, `외장 하드 → 외장하드`, `소리 안남 → 소리`를 유지·확장했다.
- Category 목록은 `guide.data.category` 자동 필터링으로 신규 Guide를 노출하며, 홈페이지는 기존 deterministic 정렬·slice 규칙을 유지한다.
- Diagnostic은 기존 16 flow를 그대로 유지하고 신규 Guide를 연결하지 않았다.

## 2026-09-14 — P2-3 내부 Navigation / Guide Discovery / SEO

### Navigation
- `src/components/Breadcrumbs.astro`를 추가해 Guide는 `홈 > Category > Guide`, Category는 `홈 > Category`의 실제 링크 breadcrumb를 사용한다.
- 같은 컴포넌트가 화면 breadcrumb와 동일한 배열로 `BreadcrumbList` JSON-LD를 생성한다. Guide Article JSON-LD와 함께 사용하며 URL은 모두 현재 페이지와 실제 category URL에서 파생된다.
- Header와 Footer에 Search·Diagnose 링크를 추가했다. Guide 하단에는 Category, Diagnose, Search의 다음 탐색 경로를 작게 제공한다.
- 이전/다음 글은 검색 의도와 무관한 순서 연결이므로 추가하지 않았다.

### Related content
- `relatedGuides`가 항상 우선이다.
- 명시 링크가 2개보다 적을 때만 같은 category의 Guide를 title/slug 안정 정렬로 보조 추천한다.
- 자기 자신, 명시 링크 중복, fallback 중복은 제외한다. Guide별 추천 개수를 강제로 맞추지 않는다.

### Category와 빈 Category 정책
- Category 목록과 Guide 목록은 기존처럼 Content Collection metadata에서 자동 생성된다.
- `설정`과 `문제해결`은 가짜 Guide를 만들지 않고 Search·Diagnose·홈/다른 Category로 이동할 수 있는 empty state를 제공한다.
- 두 빈 Category는 관련 Category 탐색과 문제 해결 도구를 제공하는 유효한 landing page이므로 현재 `index` 정책을 유지한다. 별도 `noindex,follow` meta는 추가하지 않았고 sitemap에도 계속 포함한다. 콘텐츠가 채워질 때까지 검색 가치가 낮아지는지 추후 재검토한다.

### Audit 결과
- Guide 20개, Category 10개, Search index 20개, Diagnostic 16 flow 유지.
- Category·Guide·Search·Diagnose의 주요 경로와 관련 링크를 점검했으며 orphan Guide 0, invalid related 0, duplicate recommendation 0, broken link 0을 확인했다.
- 페이지 title/description 중복, canonical, Article/Breadcrumb JSON-LD URL을 정적 산출물 기준으로 검사했다.

### 향후 navigation 변경 방법
- Category slug나 Guide slug를 직접 복제하지 말고 기존 `categorySlugs`, Content Collection ID, `categoryMeta`, `relatedGuides`를 사용한다.
- Guide 템플릿의 breadcrumb와 하단 탐색은 공통 route에서 유지하며, 관련성 있는 명시 Guide만 frontmatter에 추가한다. category fallback은 자동으로 보완된다.

### P2-3 검증 기록
- `npm run check`: 0 errors, 0 warnings. 기존 inline-script 관련 hint 4개가 표시되며 Breadcrumb component의 `set:html` hint가 추가되었다.
- `npm run build`: 37개 정적 페이지 생성.
- Guide 20, Category 10, Search index 20, Diagnostic 16 유지.
- orphan Guide 0, orphan Category 0, duplicate related recommendation 0, invalid relatedGuide 0, broken link 0.
- title/description 중복 0, invalid canonical 0, structured-data URL 오류 0.
- 화면 breadcrumb의 item 배열과 동일한 배열을 BreadcrumbList JSON-LD에 전달하는 구조를 확인했다.
- 신규 Guide 추가 시 `src/content/guides/<slug>.md`에 기존 schema와 해결 우선 구조를 사용하면 Search와 Category에 자동 반영된다. 실제 관련 Guide만 `relatedGuides`에 입력하고 `npm run check`/`npm run build`를 실행한다.

### 검증 기록
- 검색어 10개를 index에 대해 직접 실행해 의도한 상위 Guide를 확인했다.
- Guide index 10개, duplicate 0개, invalid Guide URL 0개, zero-result 상태 정상, broken internal link 0건을 확인했다.

## 2026-09-15 — P2-4 Production / 운영 QA

### Repository readiness
- 작업 범위는 이 저장소 내부로 제한했다. 현재 사이트의 기준 도메인은 `https://tech.emfls.com`, Astro static build command는 `npm run build`, output directory는 `dist`다.
- 정적 산출물 기준 Guide 20개, Category 10개, Search index 20개, Diagnostic flow 16개를 재확인했다. 내부 링크, orphan Guide, invalid relatedGuide, 중복 title/description, canonical 및 JSON-LD URL을 audit했다.
- `public/robots.txt`는 `/`를 허용하고 `https://tech.emfls.com/sitemap-index.xml`을 선언한다. sitemap에는 생성된 공개 페이지가 포함되고 404는 포함하지 않는다.
- About/Privacy/Contact는 현재 동작과 일치하도록 검토했다. 회원가입·로그인·DB·광고·분석 도구를 사용한다고 주장하지 않으며, 존재하지 않는 연락처를 만들지 않는다.
- 저장소 전체에서 localhost, 127.0.0.1, example.com, 다른 프로젝트 도메인, Pages/preview URL, GA4 ID, AdSense publisher ID, 광고·tracking 코드는 발견되지 않았다. 따라서 가짜 tracking request, publisher ID, ads.txt, 광고 placeholder를 추가하지 않았다.
- secret/API key/token 하드코딩, 1MB 초과 파일, 의도하지 않은 파일, dist 추적 여부를 점검했다. package는 Astro, sitemap, check, TypeScript로 정적 사이트에 필요한 최소 구성이다.

### Production QA 판정
- 실제 `https://tech.emfls.com` endpoint는 이번 환경에서 안전한 URL 접근 및 검색 결과 확인이 되지 않아 HTTP status, HTTPS 인증, live canonical, live custom 404, 실제 sitemap/robots 내용을 검증하지 못했다. Repository 산출물만으로 production 정상으로 간주하지 않고 Production readiness를 `BLOCKED / 미확인`으로 기록한다.
- Cloudflare dashboard, DNS, custom domain, 배포 상태는 접근·변경하지 않았다.

### GA4 / AdSense
- 실제 GA4 Measurement ID와 실제 AdSense publisher ID가 저장소·환경에서 제공되지 않아 둘 다 연결하지 않았다. 임의 ID, tracking code, 가짜 ads.txt를 사용하지 않았다.
- AdSense review readiness는 사이트 코드 기준 검토 준비는 되었으나 계정·publisher ID·실제 production 배포 및 심사 상태가 필요하므로 `사용자 설정 필요`다.

### 검증
- `npm run check`: 0 errors, 0 warnings, 기존 Astro inline-script 정보성 hint 4개 유지. 대상은 Breadcrumbs.astro의 JSON-LD set:html, BaseLayout.astro의 JSON-LD set:html, diagnose.astro의 define:vars, search.astro의 set:html이다.
- `npm run build`: 성공, 37개 정적 페이지 생성.
- Repository QA에서 broken internal link 0, orphan Guide 0, invalid relatedGuide 0, duplicate title 0, duplicate description 0, invalid canonical 0, placeholder 0, user-facing TODO/FIXME 0, cross-project contamination 0을 확인했다.
- P2-4에서는 신규 Guide/Category/기능, Search ranking/index 변경, Diagnostic flow 변경을 하지 않았다.

## 2026-09-15 — Production Deployment + Live QA

### 배포
- Cloudflare Pages project `emfls-tech`를 생성하고 GitHub `emfls/emfls-tech`의 `main` branch에 연결했다.
- Build command는 `npm run build`, output directory는 `dist`이며 별도 environment variable은 만들지 않았다.
- 첫 production deployment 후 `/search/?q=` 직접 접근에서 query가 복원되지 않는 문제를 확인했다.
- 기존 검색 구조는 유지하고 `src/scripts/search.ts`에 URL query를 초기 입력값으로 반영하는 최소 수정만 추가했다. 수정 커밋 `de24833`을 `main`에 push하고 production deployment `ef471615`를 실행했다.
- 최종 deployment는 성공했으며 Pages URL은 `https://ef471615.emfls-tech.pages.dev`, production alias는 `https://tech.emfls.com`이다.

### Domain / DNS
- `tech.emfls.com`을 Pages custom domain으로 등록했다.
- 해당 hostname에만 `CNAME tech.emfls.com → emfls-tech.pages.dev`를 추가했고 proxied 상태로 두었다. 다른 subdomain은 변경하지 않았다.

### Live QA
- Homepage, Search, Diagnose, About, Privacy, Contact, 대표 Guide 3개, 대표 Category 3개가 정상 렌더링되고 production canonical을 사용함을 확인했다.
- Search `wifi` query에서 결과가 표시되고 실제 Guide 링크로 연결되는 것을 확인했으며, 직접 URL 접근 후 query 입력값과 결과가 복원된다.
- Diagnostic `PC → 컴퓨터가 느리다 → 예` 흐름에서 결과 문구와 `/guides/pc-running-slow/` CTA를 확인했다. Reset과 이전 선택 버튼도 확인했다.
- custom 404 경로에서 custom 404 UI와 홈 복귀 링크를 확인했다. 브라우저 도구에서 응답 status 숫자는 노출되지 않아 HTTP 404 status 자체는 미확인이다.
- robots.txt와 sitemap 파일은 최종 deployment manifest에 존재한다. 브라우저 클라이언트가 두 endpoint를 차단해 live body와 HTTP status는 미확인으로 남겼다.

### 운영 범위
- GA4 Measurement ID와 AdSense publisher ID가 없어 연결하지 않았다. Web Analytics 설정도 비어 있다.
- 신규 Guide/Category/기능, Search ranking/index 재작성, Diagnostic flow 변경, 다른 subdomain 변경은 하지 않았다.

## 2026-09-15 — Final Production Live QA

### HTTP endpoint QA
- `curl`로 `https://tech.emfls.com/robots.txt`, `/sitemap-index.xml`, `/__emfls-tech-404-test__/`를 요청했으나 현재 실행 환경의 DNS resolver가 hostname을 해석하지 못해 status `000`으로 종료됐다. 따라서 이 세 endpoint의 HTTP status와 body는 미확인이다.
- Cloudflare Pages 최종 deployment manifest에는 `/robots.txt`, `/sitemap-index.xml`, `/sitemap-0.xml`, `/404.html`이 존재한다. 이것은 배포 파일 존재 확인이며 live HTTP 200/404를 대신하지 않는다.

### Diagnostic live QA
- `인터넷/Wi-Fi → Wi-Fi 속도가 느리다 → 예`에서 `/guides/wifi-slow/` 결과를 확인했다.
- `스마트폰 → 저장공간이 부족하다 → 예`에서 `/guides/smartphone-storage-full/` 결과를 확인했다.
- `주변기기 → USB 장치가 인식되지 않는다 → 예`에서 `/guides/usb-not-recognized/` 결과를 확인했다.
- 세 흐름 모두 area 선택, symptom, question, outcome, Guide CTA를 확인했고 Reset 및 이전 선택 컨트롤이 존재함을 확인했다.

### Mobile QA
- 현재 in-app browser에는 viewport override 기능이 제공되지 않아 375px/390px 기준의 실제 모바일 viewport 검증은 미확인이다. 데스크톱 live DOM 기준으로 Homepage, Search, Diagnose, Guide, Category의 기본 구조와 overflow 없는 텍스트 표시만 확인했다.

### 최종 판정
- Repository readiness는 `COMPLETE`다.
- Production deployment와 custom domain은 `LIVE`이며, 주요 페이지·검색·Diagnostic·canonical을 확인했다.
- 다만 HTTP status/body 기반 robots·sitemap·custom 404 QA와 모바일 viewport QA가 환경 제약으로 미확인이므로 Final Production readiness는 `COMPLETE`로 확정하지 않고 `LIVE / 일부 QA 미확인`으로 유지한다.

### 2026-09-15 재확인
- robots.txt, sitemap-index.xml, custom 404에 대해 curl 재요청을 수행했으나 동일한 DNS resolver 오류로 status `000`이 반환되어 HTTP 수준 확인은 계속 미확인이다.
- 이번 재확인에서 코드·콘텐츠·Diagnostic 데이터·Search 구조는 변경하지 않았다.

## 2026-09-15 — Final Production Live QA 완료

### robots.txt
- `https://tech.emfls.com/robots.txt` 실제 HTTP 요청 결과 status `200`, body 접근 가능.
- 전체 차단 없음: `User-agent: *`에 `Allow: /`가 존재한다. 일부 확장 crawler 차단 지시는 사이트 전체 차단으로 보지 않았다.
- sitemap directive는 `https://tech.emfls.com/sitemap-index.xml`이며 다른 domain/subdomain은 없다.

### sitemap
- `https://tech.emfls.com/sitemap-index.xml` status `200`, 정상 XML index.
- child `https://tech.emfls.com/sitemap-0.xml` status `200`, 정상 XML body.
- Production URL 36개: Guide 20개, Category 10개, Search 1개, Diagnose 1개, About/Privacy/Contact 및 homepage 포함.
- 404 URL, `pages.dev` URL, 다른 domain/subdomain은 확인되지 않았다.

### custom 404
- `https://tech.emfls.com/__emfls-tech-404-test__/` 실제 HTTP status `404`.
- custom title은 `페이지를 찾을 수 없습니다 — emfls tech`, body에 404 안내와 홈 링크가 존재한다.

### Diagnostic 추가 flow
- `인터넷/Wi-Fi → Wi-Fi 속도가 느리다 → 예` 결과 Guide `/guides/wifi-slow/` 확인.
- `스마트폰 → 저장공간이 부족하다 → 예` 결과 Guide `/guides/smartphone-storage-full/` 확인.
- `주변기기 → USB 장치가 인식되지 않는다 → 예` 결과 Guide `/guides/usb-not-recognized/` 확인.
- 세 flow에서 area, symptom, question, outcome, Guide CTA를 확인했고 Reset 및 이전 선택 컨트롤을 확인했다.

### Canonical
- homepage: `https://tech.emfls.com/`
- Guide: `https://tech.emfls.com/guides/wifi-slow`
- Category: `https://tech.emfls.com/category/wifi`
- Search: `https://tech.emfls.com/search/`
- Diagnose: `https://tech.emfls.com/diagnose/`

### Mobile QA
- 실제 Production DOM/CSS와 모바일 User-Agent 응답을 점검했다.
- CSS에는 모바일 기본 레이아웃, `min-width: 0`, breadcrumb horizontal scroll, Search button 모바일 padding, 760px/700px 이상에서만 desktop grid가 적용되어 모바일 overflow 방지 규칙이 있다.
- 현재 브라우저 제어 표면에 375px/390px viewport override가 노출되지 않아 두 폭의 실제 viewport screenshot 직접 검증은 미확인으로 남긴다. 코드상 명백한 Production bug는 발견하지 못했고 수정하지 않았다.

### 변경 및 최종 판정
- 신규 기능/콘텐츠/Search/Diagnostic/SEO 변경 없음. `PROJECT_HISTORY.md`에 QA 결과만 기록했다.
- Repository readiness = `COMPLETE`
- Production readiness = `LIVE / 일부 QA 미확인` (HTTP QA 및 Diagnostic/canonical 통과; 모바일 실제 viewport 직접 검증은 환경상 미확인)
- GA4 = `USER CONFIGURATION REQUIRED`
- AdSense = `USER CONFIGURATION REQUIRED`
- blocker: 375px/390px 실제 viewport 직접 검증 미확인. 브라우저 viewport 지원 시 재확인 필요.

## 2026-09-15 — Final Closure QA

### Canonical trailing slash
- Astro static output 정책은 directory index URL을 생성하며 Cloudflare Production은 slash 없는 Guide/Category URL을 slash URL로 `308` redirect한다.
- `/guides/wifi-slow` → `/guides/wifi-slow/`, 최종 HTML canonical은 `https://tech.emfls.com/guides/wifi-slow/`다.
- `/category/wifi` → `/category/wifi/`, 최종 HTML canonical은 `https://tech.emfls.com/category/wifi/`다.
- Homepage/Search/Diagnose/About의 기존 canonical 생성 방식은 유지했다. Homepage/Search/Diagnose는 기존 slash 정책과 일치하며 About은 기존 `/about` 정책을 변경하지 않았다.
- 수정 commit `8a997d7`을 `main`에 push했고 Cloudflare Pages Production 배포 후 live HTML에서 재검증했다.

### Mobile viewport QA
- 실제 Production browser viewport `375px × 844px`와 `390px × 844px`에서 Homepage, Search, Diagnose, Guide, Category를 각각 열었다.
- 두 viewport 모두 다섯 페이지에서 `document.documentElement.scrollWidth === window.innerWidth`로 horizontal overflow가 없었다.
- Homepage: header, search input/button, category cards, footer 정상.
- Search: header, search input/button, footer 정상.
- Diagnose: header, 6개 diagnostic buttons, footer 정상.
- Guide: header, breadcrumb, Guide 본문, related Guide, footer 정상.
- Category: header, breadcrumb, category/Guide cards, footer 정상.
- 모바일 명백한 Production bug는 발견되지 않아 추가 수정하지 않았다.

### Closure 판정
- `npm run check`: 0 errors, 0 warnings, 기존 4 hints.
- `npm run build`: 성공, 37 pages.
- Production deployment: commit `8a997d7` push 후 live canonical/viewport 재검증 완료.
- broken links: 이번 범위에서 발견 없음.
- Repository readiness = `COMPLETE`
- Production readiness = `COMPLETE / LIVE`
- blocker = 없음.

## 2026-09-15 — GA4 Production Analytics 연결 점검

### 결과
- 대상은 `emfls-tech` / `https://tech.emfls.com`으로 한정했다.
- 저장소 전체에서 실제 GA4 Measurement ID(`G-...`), Google tag, `gtag.js`, Google Tag Manager, 중복 Analytics script, analytics 관련 environment/config를 찾지 못했다.
- 실제 Measurement ID가 제공되지 않았으므로 placeholder나 가짜 ID를 Production 코드에 삽입하지 않았다.
- GA4 코드 추가, Privacy 수정, check/build, commit/push, Cloudflare Pages 배포, live tag 검증은 수행하지 않았다.
- 현재 Privacy 문구의 “분석 도구를 사용하지 않습니다” 상태는 실제 구현과 일치하므로 수정하지 않았다.

### 최종 판정
- GA4 implementation = `BLOCKED`
- Reason = `실제 GA4 Measurement ID 필요`
- GA4 live collection = `사용자 확인 필요`
- 향후 Measurement ID가 제공되면 단일 설정 지점과 공통 `BaseLayout`의 Production-only Google tag로 연결한다.

## 2026-09-15 — GA4 Production Analytics 연결 완료

### 구현
- 사용자 제공 Measurement ID `G-ZL5RD70NKY`를 `src/data/site.ts`의 단일 설정 지점에 저장했다.
- 공통 `src/layouts/BaseLayout.astro`에서 Google tag와 `gtag('config', ...)`를 한 번만 로드한다.
- `import.meta.env.PROD` 조건으로 Production build에서만 활성화되며, 페이지별·Guide별 analytics 코드는 추가하지 않았다.
- 별도 analytics library, GTM, custom event는 추가하지 않았다. 기본 page_view 수집만 구성했다.

### Privacy 및 검증
- `src/pages/privacy.astro`를 실제 GA4 사용 상태에 맞게 최소 수정했다.
- `npm run check`: 0 errors, 0 warnings, 기존 정보성 hints 5개.
- `npm run build`: 성공, 37 pages.
- 산출물의 Homepage, Guide, Search, Diagnose에 동일 ID의 Google tag가 각각 1개씩 생성되고 중복 script가 없음을 확인했다.

### 배포 및 live 확인
- 이후 `main`에 commit/push하고 Cloudflare Pages Production 배포를 진행한다.
- Homepage, Guide, Search, Diagnose의 live Google tag request와 JS error를 확인한다.
- GA4 Realtime/DebugView는 현재 property 화면 접근 여부를 확인한 뒤 결과를 추가 기록한다.

### 연결 완료 업데이트
- 실제 최종 ID는 `G-ZL5RD70NKY`이며, 이전 입력 오타 `G-ZL5RD70NK`는 사용하지 않는다.
- commit `4f231c1`을 `main`에 push했다.
- Production cache-busting URL에서 Homepage, Guide, Search, Diagnose 모두 Google tag script와 `G-ZL5RD70NKY`를 확인했다.
- 실제 브라우저에서 네 페이지 모두 `https://www.google-analytics.com/g/collect` 요청과 `en=page_view`를 확인했고 JS error는 없었다.
- GA4 Realtime/DebugView property 화면은 현재 접근하지 못해 실제 보고서 반영 여부는 `사용자 확인 필요`다.
- GA4 implementation = `LIVE`
