# emfls tech 디자인 시스템

## Design concept
지원센터의 명료함과 기술 매거진의 편집 감각을 결합한다. 상태·진단 언어를 작은 UI 요소로 사용한다.

## Typography
본문은 Manrope, 보조 상태/태그는 DM Mono를 사용한다. 큰 제목은 짧고 강한 계층으로 구성한다.

## Layout
넓은 여백, 얇은 경계선, 카드 그리드, 증상 중심 섹션을 사용한다. 배경은 밝은 neutral, 진단 섹션은 깊은 navy다.

## Colors
Ink `#15243a`, paper `#f7f9fb`, white `#ffffff`, muted `#667085`, blue `#2674d9`, orange `#f2a65a`.

## Navigation
Header에는 문제 유형, 기기별 해결, Tech Diagnostic, 소개를 둔다. Footer에는 소개·정책·문의를 둔다.

## Card system
얇은 border와 작은 radius를 기본으로 하며, 문제 카드에는 색상 top rule로 유형을 구분한다.

## Diagnostic UI
`기기 선택 → 증상 선택 → 기본 확인 → 원인 후보 → 해결 순서`의 5단계 상태 흐름을 사용한다.

## Responsive behavior
모바일에서는 단일/2열 그리드와 축약된 navigation을 사용하고, 넓은 화면에서 3~5열로 확장한다.

## Forbidden patterns
과한 neon·cyberpunk, 큰 gradient, 과도한 animation, 일반적인 AI SaaS 랜딩페이지, 다른 EMFLS 사이트 복제를 금지한다.
