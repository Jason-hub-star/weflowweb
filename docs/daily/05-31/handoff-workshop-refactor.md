# Handoff — WEFLOW "작업실" 리팩토링 (2026-05-31)

> 새 세션에서 5분 안에 컨텍스트 복원하기 위한 인계 패킷.
> 마스터 플랜: `/Users/family/jason/devfive/docs/plans/2026-05-31-workshop-refactor.md`

---

## 0. 현재 진행 상태

| Phase | 상태 | 핵심 산출물 |
|---|---|---|
| **1** — 기초 + Primitive + 자산 정책 | ✅ 완료 (자기리뷰 11/12 + fix) | NAV 정리 / SectionBadge.roomLabel / ComingSoonChip / ScrollProgressRail / shared-schemas.ts / check-assets.mjs |
| **2** — 스토리 신설 | ✅ 완료 (자기리뷰 12/12) | story-schema.ts / story.json / HomeStory / StorySections / Unsplash 자산 5쌍 |
| **3** — 가격 인터랙션 | ✅ 완료 (자기리뷰 12/12) | pricing-schema.ts / BillingSchema / HomePricing(토글 + countup + ENTERPRISE chip) / /pricing 4-column |
| **4** — 후기 모달 | ✅ 완료 (자기리뷰 12/12) | reviews-schema.ts / ReviewModal / HomeReviews / 비디오 placeholder |
| **5** — 사례 before/after | ❌ **삭제** (사용자 결정) | — |
| **6** — 블로그 FLIP | ✅ 완료 (자기리뷰 10/10) | blog-schema.ts / BlogFilterableGrid(FLIP + URL sync) |
| **7** — FAQ 검색·탭·마스코트 | ✅ 완료 (자기리뷰 10/10) | faq-schema.ts / FaqFilterableList(검색 + height fade + sticky 마스코트 + AI 챗 티저) |
| **8** — 통합 검수 | 🟡 진행 중 — 일부 fix 처리됨 | 아래 §3 참조 |
| **추가** — /reviews 풀 인터랙션 | ✅ 완료 | useCountupText hook 추출 / ReviewsMetricBar(4 메트릭 + 분포) / ReviewCard(Tilt + sparkle + countup) / 검색·정렬·FloatingParticles |
| **추가** — 스토리·서비스 시네마틱 풀 | ✅ 완료 | 스토리 HorizontalPinScroll / 서비스 ServicesFlow + ServicesShowcase |
| **추가** — /kit 등재 4건 | ✅ 완료 | ComingSoonChip / ScrollProgressRail / ReviewModal / useCountupText |
| **추가** — 작은 fix 6건 | ✅ 완료 | DeveloperBuildBoard 마스코트 / 가격 줄바꿈 / "월" 중복 / blog ring 제거 / FeaturedCard 축소 / /contact placeholder |

---

## 1. 미해결 결정 사항 (사용자 답변 대기)

다음 세션에서 사용자에게 한 줄로 받아야 진행 가능:

### 1.1. 멀티스텝 자체 폼 (Phase 9 후보) — Naver 폼 34문항 이식
주인님이 Naver 폼 34문항 / 10페이지 콘텐츠를 줬고 자체 폼으로 이전 원함.

- **A**: 풀 멀티스텝 (진행률 + localStorage + 페이지 전환 + API 제출). 2~3시간
- **B**: 단일 페이지 긴 폼. 1시간
- **C**: 임시 유지(현재 `/contact` placeholder 유지). 0

### 1.2. 라우트명 (A 선택 시)
- `/contact/form` · `/diagnose` · 또 다른 이름?

### 1.3. 34문항 압축 여부
- 그대로 vs 핵심 10~15문항만 추리고 나머지는 "추가 자료"로 분리

### 1.4. 제출 방식
- 이메일(Resend) · Slack webhook · Notion DB · Google Sheets · 단순 mailto 중 어디로?

### 1.5. 네이버 폼 URL
- `/contact/page.tsx`의 `NAVER_FORM_URL = 'https://naver.me/your-form-id'` `#TODO` 교체용 실제 URL 1줄

### 📎 폼 원문 보관됨
- **`apps/web/content/forms/diagnose-form-source.md`** — 주인님이 준 Naver 폼 34문항 / 10페이지 원문 보관. Phase 9 시작 시 그대로 SSOT(`diagnose-form.json`)로 구조화 가능. compact 후에도 안전.

### 1.6. Phase 진행 순서
- **D**: 멀티스텝 폼 먼저(Phase 9) → 통합 검수(Phase 8) 마지막
- **E**: 통합 검수 먼저(Phase 8) → 멀티스텝 폼(Phase 9)

---

## 2. 메모리·규약 (필독)

- `feedback_public_ui_persona.md` — 공개 UI(코드/SSOT)에 "주인님" 등 사적 표현 금지. 채팅 응답에만.
- `feedback_room_label_policy.md` — `SectionBadge.roomLabel` prop 유지하되 호출 X (사용자가 HomeStory에서 직접 제거)
- `feedback_kit_auto_register.md` — `components/primitives` · `components/motion` 신규 파일 작성 시 같은 작업 단위 안에서 `/kit/sections`에 KitCard 등재 필수 (DEC-045)
- 기존: hex 금지, 400줄 가드, prefers-reduced-motion 전수, viewport-variant 분리, Next.js 16 App Router

---

## 3. Phase 8 남은 통합 검수 항목

이미 처리됨:
- ✅ 가격 줄바꿈 / "월" 중복 / blog ring · FeaturedCard / DeveloperBuildBoard 마스코트
- ✅ `/contact` 임시 라우트 신설 (404 해결)
- ✅ /kit 등재 4건

남은 검수 (Phase 8 본 작업):
- [ ] 홈 흐름 회귀 확인 (사용자가 `page.tsx`에서 HomeStory/HomeServices 제거함 — 의도된 변경)
- [ ] `ScrollProgressRail` 실제 라우트 연동 여부 결정 (현재 0건 사용)
- [ ] ComingSoonChip 위치 전수 확인 (현재 4건 — 스토리 ??? 카드는 사용자가 제거, 가격 엔터프라이즈 / 후기 비디오 / 블로그 AI연재 / FAQ AI챗)
- [ ] `prefers-reduced-motion` 전수 검증 (수동)
- [ ] a11y 스캔 (role/keyboard/aria)
- [ ] hex 0건 전수 grep (전체 코드)
- [ ] 금기어 0건 grep (의료/병원/치료/시술)
- [ ] `agent-browser-verify`로 1440 / 768 / 375 캡처
- [ ] 자산 sidecar 6건 최종 확인
- [ ] 문서 동기화 (DECISION-LOG, PROJECT-STATUS, PAGE-COMPONENT-MAP)
- [ ] Plan 문서 갱신 (Phase 5 deleted 반영)
- [ ] hero-lab/page.tsx의 `/products` 잔존 카피 정리
- [ ] /contact `#TODO NAVER_FORM_URL` 교체

---

## 4. 신규 파일 카탈로그 (이번 작업 추가/수정)

### Schemas (분리됨, 400줄 가드 위해)
- `apps/web/lib/content/shared-schemas.ts` — ComingSoonSchema, BillingSchema
- `apps/web/lib/content/story-schema.ts` — StoryPage / HomeStorySection
- `apps/web/lib/content/pricing-schema.ts` — HomePricingItem / PricingPlan
- `apps/web/lib/content/reviews-schema.ts` — ReviewsPage / ReviewItem
- `apps/web/lib/content/blog-schema.ts` — BlogPage / BlogPost
- `apps/web/lib/content/faq-schema.ts` — FaqPage / FaqEntry (+ aiAssist)
- `apps/web/lib/content/schemas.ts` — wildcard re-export 진입점

### Primitives / Motion (신규, /kit 등재 완료)
- `apps/web/components/primitives/ComingSoonChip.tsx`
- `apps/web/components/motion/ScrollProgressRail.tsx`
- `apps/web/components/motion/ReviewModal.tsx`
- `apps/web/components/motion/useCountupText.ts`

### 라우트별 컴포넌트
- `apps/web/app/_home/HomeStory.tsx` (홈에서는 사용자가 직접 제거함)
- `apps/web/app/_home/HomePricing.tsx`
- `apps/web/app/_home/HomeReviews.tsx`
- `apps/web/app/story/page.tsx` + `StorySections.tsx` (HorizontalPinScroll)
- `apps/web/app/services/page.tsx` + `ServicesFlow.tsx` + `ServicesShowcase.tsx`
- `apps/web/app/reviews/page.tsx` + `ReviewsMetricBar.tsx` + `ReviewCard.tsx` + `ReviewsFilterableGrid.tsx`
- `apps/web/app/blog/BlogFilterableGrid.tsx` (FLIP + URL sync)
- `apps/web/app/faq/FaqFilterableList.tsx` (검색 + AI 챗 티저)
- `apps/web/app/contact/page.tsx` (임시 placeholder)

### 자산 슬롯 (Unsplash + sidecar)
- `apps/web/public/assets/story/` — 5쌍 (hero-cover, 2024-genesis, 2024-naming, 2025-flow, 2026-future)
- `apps/web/public/assets/reviews-video/reviews-video-cover.svg` + sidecar
- `apps/web/public/assets/{blog,cases-before}/` — 빈 폴더 (사용 X)
- `scripts/check-assets.mjs` — sidecar 무결성 검증

### CSS keyframes (`apps/web/app/globals.css`)
- `reviewCardIn`, `starGlint` — /reviews
- `serviceFeatureIn`, `serviceFlowFadeIn` — /services
- `faqMascotFloat` — /faq

---

## 5. 검증 상태 (현재)

- `pnpm typecheck` ✅
- `pnpm lint` ⚠️ 4 warnings (전부 기존 placeholder `<img>` — Phase 8에서 Unsplash PNG 교체 시 자동 해결)
- `bash scripts/check-file-size.sh` ✅
- `node scripts/check-assets.mjs` ✅
- hex 0건 (코드 부분, SVG 자산 제외)

---

## 6. 컨텍스트 진입 가이드 (다음 세션)

1. 본 핸드오프 읽기 (이 문서)
2. `/Users/family/jason/devfive/docs/plans/2026-05-31-workshop-refactor.md` 마스터 플랜 §1, §4 훑기
3. 메모리 인덱스 확인: `/Users/family/.claude/projects/-Users-family-jason-devfive/memory/MEMORY.md`
4. 사용자에게 §1 미해결 결정 5건 일괄 질문
5. 결정 받으면 Phase 8 또는 Phase 9 진입

---

## 한줄정리

**Phase 1·2·3·4·6·7 완료 + 추가 작업(스토리/서비스/리뷰/키트/작은fix) 완료. 남은 건 Phase 8(통합 검수)와 사용자 결정 대기 중인 Phase 9(멀티스텝 폼) 5건 답변이에요.**
