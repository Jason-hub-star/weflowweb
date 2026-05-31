# Phase 4 묶음 B-1 — 정적 5 라우트 + 인터랙티브 컴포넌트 3종 (2026-05-30 밤)

> 묶음 B 8 라우트를 B-1(정적 5 + 컴포넌트 3) / B-2(폼 3 + 인프라) / B-3([slug] 상세)로 3분할. 이번은 B-1.

작성: 2026-05-30 밤
오너: claude

---

## 0. 진입 시 요청 (주인님)

```
ㄱ (= 묶음 B 진행)
```

플랜모드 진입 → 묶음 B 8 라우트 한 세션에 모두 처리하면 토큰 + 일관성 위험 → 3분할 결정 → B-1 작업 범위 확정 → 승인 → 실행.

---

## 1. 분할 결정

| 분할 | 라우트 | 컴포넌트 추출 | 인프라 | 상태 |
|---|---|---|---|---|
| **B-1 (이번)** | `/blog` · `/notice` · `/faq` · `/privacy` · `/terms` (5) + `/cases`·`/reviews` 인터랙티브 전환 | TagFilter · FaqAccordion · StatBar | 없음 | ✅ |
| **B-2 (다음)** | `/contact` · `/reservation` · `/landing` (3) | DatePicker · TimeSlotGrid · StickyCTABar | `pnpm add resend googleapis` + `/api/*` + env | 대기 |
| **B-3 (그 이후)** | `/blog/[slug]` · `/notice/[slug]` · `/cases/[slug]` · `/products` · `/products/[slug]` | (콘텐츠 위주) | MD/MDX 본문 | 대기 |

---

## 2. 컴포넌트 추출 3종 (weflow-component-extract 첫 사용 케이스)

| 컴포넌트 | 경로 | 'use client' | 사용처 |
|---|---|---|---|
| `<TagFilter>` | `apps/web/components/motion/TagFilter.tsx` | ✅ | cases · reviews · blog · notice · faq 5 라우트 공통 |
| `<FaqAccordion>` | `apps/web/components/primitives/FaqAccordion.tsx` | ✅ (Accordion wrapper) | faq · pricing · services (점진 적용) |
| `<StatBar>` | `apps/web/components/primitives/StatBar.tsx` | ❌ RSC | reviews · landing(B-2) · 홈 추후 |

각 컴포넌트는 9단계 스킬 정신대로:
- 작성 · index export · KitCard 등재 · typecheck/build PASS · 일지 기록 · 문서 동기화
- 하드코딩 hex 0건 · 한국어 친화 props (ariaLabel 등) · 빈 상태 처리

---

## 3. zod 스키마 4 신규 + 로더 5 신규

`apps/web/lib/content/schemas.ts`:
- `BlogPageSchema` (BlogPostMeta[])
- `NoticePageSchema` (NoticePost[], pinned 플래그)
- `FaqPageSchema` (FaqEntry[], category 필드)
- `LegalPageSchema` (LegalSection[], lastUpdated, draftNotice 옵션) — privacy · terms 공용

`apps/web/lib/content/loaders.ts`:
- `getBlogPage` · `getNoticePage` · `getFaqPage` · `getPrivacyPage` · `getTermsPage`

---

## 4. 콘텐츠 JSON 5 신규

| 파일 | 내용 |
|---|---|
| `content/pages/blog.json` | hero · 카테고리 6 · 글 8개 메타 |
| `content/pages/notice.json` | hero · 공지 6건(pin 2 + 일반 4, badge) |
| `content/pages/faq.json` | hero · 카테고리 5 · 질문 12개(제작·가격·운영·계약) · CTA. PRD §8 가격은 단순 인용만 |
| `content/pages/privacy.json` | hero · 8 sections · lastUpdated · draftNotice |
| `content/pages/terms.json` | hero · 12 sections · lastUpdated · draftNotice |

`draftNotice` 필드로 "초안 — 법무 검토 후 정식 본문" 배너 자동 노출.

---

## 5. 신규 5 page.tsx

| 라우트 | 구성 | 'use client' 격리 |
|---|---|---|
| `/privacy` | PageHero + sections + draftNotice 배너 | 전체 RSC |
| `/terms` | PageHero + sections + draftNotice 배너 | 전체 RSC |
| `/faq` | PageHero + `<FaqFilterableList>` + CTASection | FaqFilterableList만 |
| `/blog` | PageHero + `<BlogFilterableGrid>` + CTASection | BlogFilterableGrid만 |
| `/notice` | PageHero + Pinned 섹션 + 일반 리스트 + CTASection | 전체 RSC (필터 없음) |

페이지 라우트는 RSC 유지, 인터랙티브 부분만 자식 wrapper(`*FilterableGrid.tsx`)에 'use client' 격리.

---

## 6. 묶음 A 인터랙티브 전환

| 파일 | 변경 |
|---|---|
| `app/cases/page.tsx` | RSC 유지 · 인라인 CasesFilters 제거 · `<CasesFilterableGrid>` 추출 |
| `app/cases/CasesFilterableGrid.tsx` | 신규 'use client', `useMemo` 카테고리 필터링 |
| `app/reviews/page.tsx` | RSC 유지 · ReviewsStats 인라인 → `<StatBar>` 교체 · ReviewsFilters → `<ReviewsFilterableGrid>` |
| `app/reviews/ReviewsFilterableGrid.tsx` | 신규 'use client', bizType 필터링 |

---

## 7. /kit 카탈로그 등재

- `motion-signatures` 섹션 끝: `<TagFilter>` KitCard (TagFilterDemo로 라이브 인터랙션)
- `primitives` 섹션: `<FaqAccordion>` KitCard (Accordion 카드 직후)
- `primitives` 섹션: `<StatBar>` KitCard (Avatar 카드 직후)

각 카드에 description · propsNote · demo · code 스니펫 포함.

---

## 8. 검증

| Check | Result |
|---|---|
| typecheck | PASS |
| build | PASS (Compiled 4.3s · TS 6.3s) |
| SSG | **26/26** prerender (기존 21 + 신규 5: `/blog` · `/faq` · `/notice` · `/privacy` · `/terms` 모두 ○ Static) |
| 하드코딩 hex grep (신규 컴포넌트 3 + 신규 5 라우트 + 묶음 A 전환) | **0건** |
| 금기어 grep (병원·치료·시술 in 신규 5 콘텐츠) | **0건** |

---

## 9. 다음 (B-2 진입 조건)

1. `pnpm add -F web resend googleapis` (BotID 확인: `@vercel/botid` 이미 설치 여부)
2. `.env.example`에 `RESEND_API_KEY` · `RESEND_FROM_EMAIL` · `OWNER_EMAIL` · `GOOGLE_SHEETS_ID` · `GOOGLE_SERVICE_ACCOUNT_JSON` 추가
3. `apps/web/app/api/contact/route.ts` + `/api/reservation/route.ts` 신규
4. 3 라우트: `/contact` · `/reservation` · `/landing` page.tsx
5. 3 컴포넌트 추출: `DatePicker` · `TimeSlotGrid` · `StickyCTABar`

---

## 한줄정리

**묶음 B-1 ✅ — 정적 5 라우트(`/blog`·`/notice`·`/faq`·`/privacy`·`/terms`) + 인터랙티브 컴포넌트 3종(TagFilter·FaqAccordion·StatBar) 추출 + 묶음 A 2 라우트(`/cases`·`/reviews`) 인터랙티브 전환까지 한 세션에서 잠갔어요. SSG 26/26 PASS, hex 0건, 금기어 0건. 다음은 묶음 B-2(폼 3 + 인프라)예요.**
