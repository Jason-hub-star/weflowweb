# Phase 4 묶음 A — `/services` · `/pricing` · `/cases` · `/reviews` (2026-05-30 저녁)

> session-retro + 신규 스킬 2종 등록 + DEC-050 실행 + 묶음 A 4 라우트 작성을 한 세션에서 처리.

작성: 2026-05-30 22시경
오너: claude

---

## 0. 진입 시 4 요청 (주인님)

1. `session-retro` 호출 → 자동 회고 자산화
2. `update-config` 호출 → 신규 스킬 2종 등록 (settings.json)
3. DEC-050 실행 → 홈 `home.json` 추출 + zod 스키마
4. Phase 4 묶음 A 작성 (services·pricing·cases·reviews, 처음부터 JSON 패턴)

---

## 1. session-retro

산출물: `docs/daily/05-30/session-retro.md`
- 4신호 분류: Success / Failure→Fix / Repeated Manual / User Correction
- 승급 결정:
  - 컴포넌트 추출 23번 → **신규 스킬** `weflow-component-extract`
  - 문서 동기화 8번 → **신규 스킬** `weflow-doc-sync-batch`
  - 하드코딩 데이터 누적 → **규칙 후보** (Phase 4 묶음 A에서 즉시 적용으로 회피)
  - agent-browser 시퀀스 → 스크립트 후보 (묶음 B 이후)

---

## 2. 신규 스킬 2종 등록

산출물:
- `.claude/skills/weflow-component-extract/SKILL.md` (9단계: 작성 → index → KitCard → typecheck/build → 캡처 → 일지 → 문서 동기화)
- `.claude/skills/weflow-doc-sync-batch/SKILL.md` (changeType × 동기화 대상 매트릭스 6×8)

검증: 다음 세션 `available-skills` 목록에 두 스킬 자동 노출 확인 ✅

---

## 3. DEC-050 실행 — 홈 JSON SSOT

### 산출물

```
apps/web/content/pages/home.json            # 11 섹션 전체 데이터
apps/web/content/pages/_README.md           # 비개발자 가이드
apps/web/lib/content/schemas.ts             # zod 스키마 (5 페이지 분량)
apps/web/lib/content/loaders.ts             # getHomePage 등 5 함수
apps/web/app/page.tsx                       # 리팩토링: getHomePage() → props
```

### 변경 사항

- 페이지 코드 안 인라인 const 배열(SERVICES·WHY_ITEMS·CASES·REVIEWS·PROCESS·PRICING·PARTNERS) → 모두 home.json으로 이동
- 각 섹션 컴포넌트는 `{ data }: { data: HomePage['xxx'] }` props 패턴
- 빌드 시점 zod parse → 누락·타입 오류는 build fail

### 검증

| Check | Result |
|---|---|
| typecheck | PASS |
| build | PASS (Compiled in 3.6s · TS 4.8s · SSG 17/17) |

---

## 4. Phase 4 묶음 A — 4 신규 라우트

### 산출물 (각 JSON 1개 + page.tsx 1개)

| Route | JSON | page.tsx | 주요 섹션 |
|---|---|---|---|
| `/services` | `services.json` | `app/services/page.tsx` | PageHero · ServiceDetail × 4 (features 배열) · FAQ Accordion · CTASection |
| `/pricing`  | `pricing.json`  | `app/pricing/page.tsx`  | PageHero(center) · PricingPlans × 3 · Compare 표 (7 행 × 4 열) · FAQ · CTASection |
| `/cases`    | `cases.json`    | `app/cases/page.tsx`    | PageHero · 정적 TagFilter 칩 6 · 6 CaseGrid 카드(thumbnail · tag · metric · summary) · CTASection |
| `/reviews`  | `reviews.json`  | `app/reviews/page.tsx`  | PageHero · Stats(total · avg · 별점) · 정적 TagFilter · 6 ReviewGrid 카드 · CTASection |

### 설계 결정

- **인터랙티브 컴포넌트 보류**: TagFilter 필터링·Pagination·ReviewSlider 회전은 묶음 B에서 정식 추출. 1차에는 정적 칩 + 정렬된 카드만.
- **JSON SSOT 처음부터 적용**: 코드 인라인 배열 0건. 4 페이지 모두 `getXxxPage()` → zod parse → props.
- **RSC 우선**: 4 페이지 모두 Server Component, primitives 중 Accordion만 'use client' (이미 격리됨).

### 검증

| Check | Result |
|---|---|
| typecheck | PASS |
| build     | PASS (Compiled 3.7s · TS 4.9s) |
| SSG       | 21/21 prerender — 4 신규 라우트 모두 `○ Static` |

---

## 5. 문서 동기화 (weflow-doc-sync-batch 정신)

| 파일 | 변경 |
|---|---|
| `docs/status/PROJECT-STATUS.md` | Current Phase · Active Tracks 5건 · Recent Changes 1행 · 한줄정리 |
| `docs/status/PAGE-UPGRADE-BOARD.md` | services·pricing·cases·reviews 4 행 Ready → QA, 상단 갱신일 + 한줄정리 |
| `docs/daily/05-30/session-retro.md` | 신규 |
| `docs/daily/05-30/phase-4-bundle-A.md` | 신규 (이 파일) |

---

## 6. 다음 세션 진입점

1. **묶음 B 라우트 작성**: `/blog` · `/notice` · `/faq` · `/contact` · `/reservation` · `/landing` · `/privacy` · `/terms` (8 라우트)
2. **인터랙션 컴포넌트 정식 추출**: TagFilter · FaqAccordion · ReviewSlider · Pagination · StatBar (`weflow-component-extract` 스킬 첫 사용 케이스)
3. **agent-browser 시각 검수**: `/services` · `/pricing` · `/cases` · `/reviews` 1440/375 캡처 + ERROR 0건 (현재 세션은 build 검증까지만, 시각 검수는 다음 세션 첫 액션)
4. **#TODO 추적**: home.json `hero.video` null (영상 Veo 생성 대기) · 사례/후기/로고 더미

---

## 한줄정리

**session-retro · 신규 스킬 2종 · DEC-050 실행 · 묶음 A 4 라우트까지 한 세션에서 잠갔어요. SSG 21/21 prerender PASS, 다음은 묶음 B 8 라우트 + 인터랙션 컴포넌트 추출이에요.**
