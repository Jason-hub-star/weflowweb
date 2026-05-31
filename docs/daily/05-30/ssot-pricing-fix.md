# SSOT 가격 보정 — PRD §8 Pricing Lock 정렬 (2026-05-30 밤)

> 묶음 A에서 약식 표기로 작성된 가격이 PRD §8 잠금값과 충돌하는 위반을 발견하고 즉시 보정.

작성: 2026-05-30 밤
오너: claude

---

## 0. 진입 시 요청 (주인님)

```
1. home.json Pricing 3 카드 + pricing.json Plans 전체 → PRD §8 잠금값 8종 정확 적용
2. pricing.json에 푸터 필수 안내 3종 추가
3. services.json 가격 표기 PRD §8 인용으로 정렬
4. 홈 카피 PRD §5 Brand Copy Lock과 1:1 매칭 점검
5. 그 다음 묶음 B 진입 (플랜모드)
```

플랜모드 진입 후 권장안 A3·B1·C1·D1 잠금 → 승인 → 5 파일 보정 + 검증.

---

## 1. SSOT 정확값 (PRD §8, VAT 포함)

| 분류 | 항목 | 잠금값 |
|---|---|---|
| 단발 | 랜딩 페이지 | 249,000원 / 건 (3~4일) |
| 단발 | 홈페이지 | 999,000원 / 건 (7일) |
| 단발 | 랜딩&홈페이지 | 1,099,000원 / 건 (10~11일) |
| 케어 | WE CARE | 월 89,000원~ |
| 케어 | FLOW CARE | 월 189,000원~ |
| 케어 | WEFLOW CARE ★ | 월 339,000원~ |
| 광고 | 네이버 키워드 세팅 | 월 149,000원~ |
| 광고 | 당근 플레이스 세팅 | 월 79,000원~ |

푸터 필수 안내 3종 (PRD §8 라인 90–92, 원문):
1. 도메인은 고객 명의로 등록, 비용 별도. 위플로우가 등록·연결 세팅은 무료 지원.
2. 광고비는 고객 계정에서 직접 결제. 위플로우는 운영·세팅만.
3. 유지보수는 텍스트·이미지·링크 경미 수정 기준. 페이지 추가·기능 개발은 별도 비용.

> WEFLOW CARE 가격 충돌 노트: `WEFLOW_PRE_DESIGN_SPEC.md` 라인 1048–1052에 "289,000원도 언급" 메모. **PRD가 SSOT이므로 339,000원~으로 확정.** PRE_DESIGN_SPEC 동기화는 별도 추적.

---

## 2. 의사결정 (권장안 + 승인)

| 결정 | 채택 | 근거 |
|---|---|---|
| A. home.json 3 카드 | **A3 (랜딩 + 홈피 + WEFLOW CARE ★)** | 의사결정 흐름(제작→운영) 자연스럽고 단발 2종 정확가가 가장 강한 메시지. 광고는 `/pricing` 유도. |
| B. pricing.json 8종 구조 | **B1 (category 필드 추가)** | zod 변경 최소, plans 배열 유지, 묶음 B 카테고리 필터 도입 시 컴포넌트만 수정. |
| C. compare 표 | **C1 (단발 3종만)** | 케어/광고는 성격 달라 한 표 비교 불가. 8 컬럼은 375px 가독성 폭망. 케어/광고 비교는 카드 features로 대체. |
| D. 푸터 안내 배치 | **D1 (`disclosures: string[]`)** | 단순 배열로 zod 변경 최소. `/pricing` 컴포넌트에서 FAQ 다음·CTA 이전 회색 텍스트 섹션 1개로 렌더. |

---

## 3. 변경 산출물

| 파일 | 변경 |
|---|---|
| `apps/web/lib/content/schemas.ts` | `PricingPlanItem.category: z.enum(['build','care','ads']).optional()` + `PricingPageSchema.disclosures: z.array(z.string()).optional()` |
| `apps/web/content/pages/home.json` | pricing.items 3 카드 교체 (id: landing/homepage/weflow-care), 정확값 + WEFLOW CARE featured |
| `apps/web/content/pages/pricing.json` | hero 제목 "제작 플랜 & 가격 안내", plans 3→8 (build×3 / care×3 / ads×2, 모두 category), compare 단발 3종 6 행, FAQ p3 광고 운영 대행비 정확값 인용, 신규 `disclosures` 3종 |
| `apps/web/content/pages/services.json` | items[build].price 정확값, items[ads].price 네이버/당근 정확값, FAQ f4 WEFLOW CARE + WE/FLOW 옵션 명시 |
| `apps/web/app/pricing/page.tsx` | `<PricingDisclosures>` 섹션(PricingFaq 다음·CTASection 이전, max-w-3xl text-small text-muted) 추가 |

PRD §5 Brand Copy Lock vs home.json hero 1:1 점검: 헤드라인·서브헤드·아이브로우·CTA·benefits 5종 모두 이미 일치 → **변경 0**.

---

## 4. 검증

| Check | Result |
|---|---|
| typecheck | PASS |
| build | PASS (Compiled 2.8s · TS 4.5s) |
| SSG | 21/21 prerender — `/pricing` ○ Static |
| 금기어 grep (병원·치료·시술) | **0건** |
| PRD §8 8종 정확값 home·pricing·services 등장 | ✅ |
| 푸터 안내 3종 pricing.json `disclosures`에 원문 | ✅ |

---

## 5. 다음 세션 진입점

1. **묶음 B 라우트 작성** (8 라우트): `/blog` · `/notice` · `/faq` · `/contact` · `/reservation` · `/landing` · `/privacy` · `/terms`
2. **인터랙티브 컴포넌트 정식 추출** (`weflow-component-extract` 첫 사용): TagFilter · FaqAccordion · ReviewSlider · Pagination · StatBar
3. **agent-browser 시각 검수**: `/services` · `/pricing` · `/cases` · `/reviews` 1440/375 캡처 — 가격 보정 후 PRD §8 위반 0건 시각 확인
4. **PRE_DESIGN_SPEC 동기화**: 라인 1048 "289,000원도 언급" 메모 PRD §8 잠금값으로 정렬 (별도 트랙)

---

## 한줄정리

**PRD §8 8종 잠금값을 home·pricing·services 3 JSON에 1:1 정렬, `/pricing`에 푸터 필수 안내 3종 노출까지 잠갔어요. SSG 21/21 PASS, 금기어 0건. 이제 묶음 B 8 라우트 + 인터랙티브 컴포넌트 추출로 들어가요.**
