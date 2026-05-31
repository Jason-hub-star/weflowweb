# interaction-catalog — 2026-05-30

Stage: ✅ DONE — 카탈로그·매핑·devfive 정렬 (Phase 2.5 마감)

> 동기화 완료: `docs/status/PROJECT-STATUS.md` Recent Changes 3건, `PAGE-UPGRADE-BOARD.md` 시안 라우트 `/mockup/4` 행, `AGENTS.md` Hard Rule 12 중복 제거 + 13·14 신설, `DECISION-LOG.md` DEC-046·047.

## Done today

### 외부 라이브러리 캡처 (5개)
- [x] `ui.aceternity.com/components` → reference/
- [x] `magicui.design` → reference/
- [x] `21st.dev` → reference/ (17 카테고리 사이드바 추출 — Backgrounds·Borders·CTA·Features·Heroes·Hooks·Pricing 등)
- [x] `skiper-ui.com` → reference/
- [x] `devfive.kr/ko` 추가 스크롤 (1500/3000/4500) → Why 섹션 3D 캐릭터+앱 아이콘 orbit 발견

### devfive 색 직접 추출
- 배경: `rgb(38, 38, 40)` ≈ `#262628` 차콜
- 액센트: **`rgb(158, 158, 255)` = `#9e9eff` 라일락 보라** (mint 가정 정정)
- 플로팅 CTA: 보라 알약 + 채팅 아이콘 "실시간문의"
- 캐릭터: VR 헤드셋 + 보라 슈트 (devfive 고유 — 우리는 Flow Guide로 재해석)

### 신규 문서
- [x] `docs/ref/INTERACTION-CATALOG.md` — 11 카테고리 패턴 인벤토리(Backgrounds/Heroes/CTA/Text/Features/Pricing/Testimonials/Forms/Navigation/Content/Devfive). ✅(보유) / 🔲(추출 후보) / ⚠️(검토) 상태 표시. 우선 추출 6 묶음 20+ primitive 권장
- [x] `docs/ref/PAGE-COMPONENT-MAP.md` — 17 라우트 × Hero/Sections/Forms/Primitives/Motion 매핑 표. Phase 3~7 진입 순서.

### 정책 잠금
- [x] `DEC-046` — 인터랙션 카탈로그 + 페이지 매핑 운영
- [x] `DEC-047` — devfive 라일락 발견 정렬, Color 시안 4(다크+라일락) 추가
- [x] `AGENTS.md` Hard Rule 13 추가 — 페이지 작업 전 PAGE-COMPONENT-MAP 확인 의무
- [x] `docs/ref/COLOR-VARIANTS.md` — 시안 4 섹션 + 비교표 8행으로 확장 (devfive 시그니처 행 추가)
- [x] `packages/tokens/src/theme.css` — `[data-mockup='4']` 토큰 추가

### 추출 후보 정리 (Phase 3 진입 전 권장)
**Foundation Primitives 16개**: Button · Card · Badge · Input · Select · Textarea · Checkbox · Tabs · Accordion · Tag · RatingStars · Avatar · Breadcrumbs · Pagination · PageHero · CTASection

**Marketing Sections 17개**: ServiceRail · WhyGrid · CaseTeaser · CaseGrid · ReviewSlider · ReviewGrid · ProcessTimeline · PricingTable · PricingSummary · FeatureList · MetricGrid · QuoteCard · FaqAccordion · BlogList · NoticeList · TagFilter · SearchBar

**Motion 추가 권장**: FloatingParticles · MascotOrbit · DotGridBackground · StickyScrollReveal · TickNumber · GradientText · ShimmerBorder · HoverTilt

## Verification

- (문서/토큰 작업이라 코드 검증 없음 — typecheck는 다음 작업 시점)
- `/mockup/4`는 토큰만 정의됨, `/mockup/[id]` 라우트가 `[id]`를 `'1'|'2'|'3'`로 받아도 동적이라 4 자동 노출. 라우트 작성은 다음 단계.

## Findings

- 21st.dev 카테고리 카운트(73 hero · 36 features · 34 CTA · 17 pricing 등)가 우리 우선 추출 목록의 합리적 출처
- devfive Why 섹션의 "3D 캐릭터 + 떠다니는 앱 아이콘 orbit"이 우리가 이미 가진 자산(Flow Guide hero + 6 알약)과 정확히 같은 구조 → **`<MascotOrbit>`** primitive로 추출 권장 (Why 섹션에 그대로 적용 가능)
- 라일락 발견은 큰 정렬 이슈 — 사용자가 시안 4 선정 시 캐릭터·플로팅 CTA·heroFullBleedPlus 보라 톤으로 일괄 전환 가능 (토큰 교체만으로)

## Blocked / Issues

- 다크 시안 선정 시 DEC-018(라이트 only) 정책과 충돌 → DEC-018 supersede 또는 DEC-047 단독 시안으로 유지 판단 필요 (주인님 선정 시점)

## #TODO 잔여

- `/mockup/4` 라우트가 토큰 4를 적용하도록 `[id]`에 `4` 허용 확인 (이미 dynamic이라 자동, 단 검증 필요)
- INTERACTION-CATALOG의 추출 후보 6 묶음을 Phase 3에서 실제 작성 + /kit 등재

## 결정 변경

- (없음) DEC-046, 047 신규 잠금만. DEC-018은 시안 4 선정 시 재논의.

## 다음 액션

1. 주인님 색 시안 확인 (1·2·3·4 비교) → 선정 → DEC-048
2. Foundation Primitives 16개 작성 (Phase 3 Day 3, 0.5~1일)
3. Marketing Sections 17개 작성 (Phase 3~4 Day 3~5)
