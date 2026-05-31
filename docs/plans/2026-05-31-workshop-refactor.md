# WEFLOW 홈 "작업실(Workshop)" 리팩토링 플랜

> 작성: 2026-05-31  
> 실행: `phase-loop` (각 phase 종료 후 Opus 자기리뷰 → PASS 시 자동 진행, FAIL 시 정지)  
> 상태: Phase 1·2·3·4·6·7 완료. **Phase 5는 사용자 결정으로 삭제됨.** Phase 8(통합 검수) 일부 처리, Phase 9(멀티스텝 폼) 대기.  
> 인계 패킷: `docs/daily/05-31/handoff-workshop-refactor.md`

---

## 0. 확정 결정사항 (변경 금지)

| # | 항목 | 확정값 |
|---|---|---|
| 1 | 스토리 위치 | `/story` 라우트 + 홈 preview 섹션 병행 |
| 2 | 마우스 트레일 마스코트 디폴트 | OFF (opt-in 토글) |
| 3 | 가격 월/연 토글 디폴트 | 월 결제 |
| 4 | 슬로건 | **A: "People move. Technology follows." (사람이 움직이면, 기술은 따라온다)** |
| 5 | before/after 자산 전략 | 데모 4~5건만 우선, 나머지는 placeholder |
| 6 | 스토리 타임라인 | desktop sticky 좌측 연도 + 우측 챕터, mobile vertical |
| 7 | 후기 모달 | fullscreen + ESC + focus trap (자체 구현) |
| 8 | 블로그 FLIP | 태그 클릭 시 재정렬 + URL ?tag=X 쿼리 동기화 |
| 9 | FAQ 디폴트 탭 | 전체 |
| 10 | 자산 전략 | **Unsplash 무료 이미지 + 플레이스홀더 슬롯** (아래 §1 참조) |

---

## 1. 자산 정책 (Asset Policy) — Unsplash + Placeholder

### 1.1. 폴더 컨벤션

```
apps/web/public/assets/
├── story/             # 스토리 챕터 이미지 (신규)
├── blog/              # 블로그 썸네일 (신규)
├── cases-before/      # 사례 before 화면 (신규)
├── reviews-video/     # 비디오 후기 placeholder (신규)
├── cases/             # 기존 — after 화면 (변경 없음)
└── process/           # 기존 — 톱니바퀴 (변경 없음)
```

### 1.2. 파일명 컨벤션

```
{용도}-{슬러그}.{ext}
```

- `story-2024-genesis.jpg`
- `story-2025-care-launch.jpg`
- `blog-trust-elements.jpg`
- `cases-before-onul-studio.jpg`
- `reviews-video-cover.jpg`

### 1.3. Placeholder 처리 (이미지 미준비 시)

이미지가 없을 때는 `placeholder-{용도}-{슬러그}.svg`를 생성한다. SVG는 다음 패턴:

```svg
<!-- 1200x800 그라데이션 + 라벨 -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="var(--token-accent-soft)" />
      <stop offset="1" stop-color="var(--token-accent)" />
    </linearGradient>
  </defs>
  <rect width="1200" height="800" fill="url(#g)" />
  <text x="600" y="400" text-anchor="middle" font-size="48" fill="var(--token-surface)">
    {라벨}
  </text>
</svg>
```

- 토큰 색상만 사용. hex 금지.
- 텍스트로 "교체 예정 — Unsplash 권장" 등 라벨 명시.

### 1.4. Unsplash 메타데이터 사이드카

각 자산마다 `{파일명}.meta.json`을 생성한다. 라이센스 추적 + 교체 가이드.

```json
{
  "slot": "story-2024-genesis",
  "status": "placeholder",
  "preferredKeywords": ["beginning", "small studio", "korean entrepreneur", "warm light"],
  "unsplashSearchUrl": "https://unsplash.com/s/photos/small-studio-warm-light",
  "unsplashId": null,
  "photographer": null,
  "license": "Unsplash License (free, attribution appreciated)",
  "downloadedAt": null,
  "dimensions": "1200x800"
}
```

교체 시 `status: "ready"`, `unsplashId`, `photographer`, `downloadedAt` 채움. 모든 sidecar는 `pnpm check:assets` 스크립트로 일괄 검증 (Phase 1에서 추가).

### 1.5. Unsplash 검색어 권장 매핑 (예시)

| 슬롯 | 추천 검색어 |
|---|---|
| `story-2024-genesis` | small studio, beginning, korean desk |
| `story-2025-care-launch` | team collaboration, warm office |
| `story-2026-future` | sunrise path, open road, abstract flow |
| `blog-trust-elements` | trust handshake, business meeting |
| `blog-landing-conversion` | analytics dashboard, growth chart |
| `blog-naver-ads` | search ad, korean marketing |
| `blog-cafe-ia` | cafe interior, korean cafe |
| `blog-care-plan` | maintenance, workflow, calm work |
| `cases-before-*` | wireframe sketch, blueprint, draft layout |
| `reviews-video-cover` | video play, customer interview |

---

## 2. 스토리 카피 (확정 SSOT 인풋)

### 2.1. story.hero
```
eyebrow: OUR STORY
title: 사람이 움직이면, 기술은 따라온다
tagline: WE = 우리·관계   FLOW = 흐름·성장
sub: 사람과 기술이 함께 흘러가며 더 좋은 방향을 만드는 회사
```

### 2.2. story.naming (이름 풀이 블록)
```
WE  → 우리, 사람, 관계, 함께하는 가치
FLOW → 흐름, 성장, 연결, 앞으로 나아가는 움직임
요약: 기술은 뒤에서 받쳐주고, 사람은 앞에서 빛나게 하는 흐름
```

### 2.3. story.philosophy (강조 인용)
```
"기술은 뒤에서 받쳐주고, 사람은 앞에서 빛나게 하는 흐름"
```

### 2.4. story.years (연도별 챕터)

#### 2024 — 시작
- 챕터 1: "처음엔 돈도, 스펙도, 대단한 기술도 없었습니다. 하지만 사람과 관계, 그리고 좋은 흐름은 결국 큰 결과를 만든다고 믿었습니다."
- 챕터 2: "혼자 성공하는 회사보다, 함께 흘러가며 성장하는 회사를 만들고 싶었습니다. 그래서 이름은 WEFLOW입니다."

#### 2025 — 흐름을 만들다
- (실제 마일스톤은 phase-loop 실행 중 사용자 보강 가능, 일단 placeholder 카피)

#### 2026 — ???
- 빈 카드 + 점선 보더 + ComingSoonChip
- 카피: "다음 흐름은 주인님과 함께 씁니다."

### 2.5. story.cta
```
slogan: People move. Technology follows.
sloganKo: 사람이 움직이면, 기술은 따라온다
primary: "함께 흘러가기"  → /contact
secondary: "사례 보기"  → /cases
```

---

## 3. 영향받는 파일 매트릭스

| 경로 | 변경 | 예상 줄수 | 비고 |
|---|---|---|---|
| `apps/web/components/layout/SiteHeader.tsx` | edit | 90 | `/products` 제거, `/story` 추가 |
| `apps/web/components/layout/MobileDrawer.tsx` | edit | 70 | 동기화 |
| `apps/web/components/primitives/SectionBadge.tsx` | edit | 70 | `roomLabel?` prop |
| `apps/web/components/primitives/ComingSoonChip.tsx` | new | 80 | 점멸 도트, reduced-motion |
| `apps/web/components/motion/ScrollProgressRail.tsx` | new | 120 | IntersectionObserver |
| `apps/web/components/motion/BeforeAfterSlider.tsx` | new | 100 | 드래그 + keyboard |
| `apps/web/components/motion/ReviewModal.tsx` | new | 140 | focus trap, ESC |
| `apps/web/components/motion/MascotTrail.tsx` | new | 80 | opt-in, rAF |
| `apps/web/lib/content/schemas.ts` | edit | +60 | story/billing/comingSoon |
| `apps/web/content/pages/story.json` | new | 200 | 스토리 SSOT |
| `apps/web/content/pages/home.json` | edit | +30 | story preview 필드 |
| `apps/web/content/pages/pricing.json` | edit | +40 | billing + 엔터프라이즈 |
| `apps/web/content/pages/reviews.json` | edit | +20 | filters + videoUrl |
| `apps/web/content/pages/cases.json` | edit | +30 | beforeImage |
| `apps/web/content/pages/blog.json` | edit | +20 | readingTimeMinutes + thumbnail |
| `apps/web/content/pages/faq.json` | edit | +10 | comingSoon 항목 |
| `apps/web/app/page.tsx` | edit | 50 | roomLabel 전달 |
| `apps/web/app/_home/HomeSections.tsx` | split | 분할 | feature folder로 |
| `apps/web/app/_home/HomeStory.tsx` | new | 40 | entry (viewport split) |
| `apps/web/app/_home/HomeStory.desktop.tsx` | new | 240 | sticky timeline |
| `apps/web/app/_home/HomeStory.mobile.tsx` | new | 160 | vertical timeline |
| `apps/web/app/_home/HomePricing.tsx` | new | 180 | 토글 + countup |
| `apps/web/app/_home/HomeReviews.tsx` | new | 160 | modal + filter |
| `apps/web/app/_home/HomeCases.tsx` | new | 170 | before/after |
| `apps/web/app/_home/HomeBlog.tsx` | new | 180 | FLIP + tag |
| `apps/web/app/_home/HomeFaq.tsx` | new | 170 | 검색 + 탭 |
| `apps/web/app/story/page.tsx` | new | 80 | 라우트 entry |
| `apps/web/app/story/StorySections.tsx` | new | 220 | 전체 스토리 |
| `apps/web/app/pricing/page.tsx` | edit | 100 | 인터랙션 통합 |
| `apps/web/app/reviews/page.tsx` | edit | 100 | 모달 통합 |
| `apps/web/app/cases/page.tsx` | edit | 100 | before/after |
| `apps/web/app/blog/page.tsx` | edit | 120 | FLIP 통합 |
| `apps/web/app/faq/page.tsx` | edit | 100 | 검색/탭 |
| `scripts/check-assets.mjs` | new | 80 | sidecar 검증 |
| `apps/web/public/assets/{story,blog,cases-before,reviews-video}/*.svg` | new | placeholder | SVG + sidecar |

---

## 4. Phase 분할 (총 8단계)

각 phase 종료 시 Opus 자기리뷰로 다음 검증 계약을 통과해야 다음 phase로 자동 전진.

### Phase 1: 기초 정리 + 공통 Primitive + 자산 정책
- 목표: `/products` 제거, SectionBadge 확장, ComingSoonChip & ScrollProgressRail 신설, zod 스키마 공통 확장, 자산 sidecar 검증 스크립트 추가
- 변경: 위 매트릭스의 Phase 1 항목 7개
- 검증 계약:
  - `pnpm typecheck` ✅
  - `pnpm lint` ✅
  - `bash scripts/check-file-size.sh` ✅ (400줄 이하)
  - `node scripts/check-assets.mjs` ✅ (sidecar 무결성)
  - `grep -r "#[0-9a-fA-F]\{3,6\}" apps/web/components/primitives apps/web/components/motion` → 0 hits
  - `prefers-reduced-motion: reduce` 적용 시 ComingSoonChip 점멸 멈춤 (수동 확인)
- Opus 자기리뷰 체크: 헤더/드로어 동기화, ComingSoonChip reduced-motion 분기, ScrollProgressRail IntersectionObserver root 설정, 토큰 미사용 hex 0건

### Phase 2: 스토리 신설 (SSOT + 컴포넌트 + 라우트)
- 목표: story.json 작성 (위 §2 카피 그대로 주입), zod 스키마 확장, HomeStory 3파일 + /story 라우트 2파일, 자산 슬롯 + Unsplash 사이드카 7개 (2024×2, 2025×3, 2026×1, hero×1)
- 검증 계약: typecheck, lint, file-size, check-assets, /story 라우트 200 OK (dev server), desktop/mobile 스크린샷 확인 (수동)
- Opus 자기리뷰: 슬로건 카피 정확성, sticky offset, ComingSoonChip "2026 — ???" 배치, mobile 줄바꿈

### Phase 3: 가격 인터랙션 + 티저
- 목표: 월/연 토글 + tabular-nums countup + featured hover fade + 엔터프라이즈 placeholder
- 검증 계약: typecheck/lint/file-size, /pricing 라우트 작동, 토글 ARIA role 검증
- Opus 자기리뷰: countup duration, featured 카드 order, reduced-motion 분기

### Phase 4: 후기 모달 + 필터 + 비디오 placeholder
- 목표: PauseMarquee 유지 + 클릭 모달 + 별점 분포 mini chart + 업종 필터칩 + 비디오 placeholder
- 검증 계약: typecheck/lint, ESC 닫기, focus trap 동작, marquee 필터링
- Opus 자기리뷰: focus trap tab 순환, 모달 a11y(role/aria), 별점 chart 토큰 색상

### Phase 5: ~~사례 before/after + 마우스 트레일 + 스켈레톤~~ **DELETED (2026-05-31)**
- 사용자 결정으로 Phase 5 제거. 그 시간을 스토리/서비스 시네마틱 풀 개선에 투입.
- 대체 산출물: 스토리 `HorizontalPinScroll`, 서비스 `ServicesFlow` + `ServicesShowcase` (StickyStackCards + TiltCard + SpotlightCard).
- `apps/web/public/assets/cases-before/` 폴더는 빈 상태 유지(자산 사용 0건).

### Phase 6: 블로그 FLIP + 태그 + 읽기시간 링
- 목표: featured + mini list + 태그 클라우드 FLIP + URL ?tag=X 동기화 + readingTimeMinutes
- 자산: blog/ placeholder 8개 (각 카테고리 색상별)
- 검증 계약: FLIP 동작, URL 쿼리 새로고침 유지, 읽기시간 정확도
- Opus 자기리뷰: FLIP duration(300~500ms), 토큰 색상, 모바일 layout

### Phase 7: FAQ 검색 + 탭 + 마스코트 peek + AI 챗 placeholder
- 목표: 검색 input + 카테고리 탭 + height 트랜지션 + 아코디언 + 마스코트 peek + AI 챗 비활성 placeholder
- 검증 계약: 검색 실시간 필터, 탭 height 부드러움, peek 동기화
- Opus 자기리뷰: height 측정 정확성, ARIA tab/panel, 검색 쿼리 URL 반영

### Phase 8: 통합 검수 (회귀 + a11y + 성능 + 자산)
- 목표: 홈 흐름 회귀, roomLabel 전달, ScrollProgressRail 연동, 모든 ComingSoonChip 6개 확인, 토큰 hex 0건, prefers-reduced-motion 전수, agent-browser-verify 데스크탑/모바일 캡처
- 검증 계약:
  - `pnpm build` ✅
  - `pnpm typecheck` ✅
  - `pnpm lint` ✅
  - `bash scripts/check-file-size.sh` ✅
  - `node scripts/check-assets.mjs` ✅
  - `grep -r "#[0-9a-fA-F]\{3,6\}" apps/web/app apps/web/components` → 0 hits (배경/디버그 제외)
  - 의료/병원/치료/시술 문구 0건
  - 모든 라우트 200: `/`, `/story`, `/pricing`, `/reviews`, `/cases`, `/blog`, `/faq`, `/services`
  - agent-browser-verify로 1440 / 768 / 375 캡처
- Opus 자기리뷰: 섹션 id 일치, roomLabel 전체 적용, SSOT 로드 경로 일관, 성능 회귀

---

## 5. 강제 규약 (위반 시 phase FAIL)

- 디자인 토큰만 사용 (hex 금지)
- 모든 파일 400줄 이하 (`scripts/check-file-size.sh`)
- SSOT는 `content/pages/*.json` + zod
- 모든 신규 모션 `prefers-reduced-motion` 분기
- 인터랙티브 a11y 필수 (role, keyboard, ARIA)
- Next.js 16 App Router RSC 우선, 인터랙티브만 `'use client'`
- import 경로 `@/components/...`, `@/lib/...`
- 금기어(의료/병원/치료/시술) 0건

---

## 6. 롤백 전략

phase별 git 브랜치 분리. FAIL 시 해당 phase 브랜치만 revert. Vercel Preview로 phase별 자동 배포 확인.

---

## 7. 한줄정리

WEFLOW 홈을 "작업실" 컨셉 8단계로 phase-loop 자동 진행. 자산은 Unsplash + placeholder SVG + 사이드카 메타로 슬롯 잠금. 각 phase 종료 시 Opus 자기리뷰 PASS 후 자동 전진.
