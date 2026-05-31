# Page Upgrade Board — WEFLOW

> 17 라우트의 진행 상태를 한 표에서 추적. Stage = `Ready → Designing → Building → QA → Done`.  
> 마스터 플랜 §7 참조.

업데이트: 2026-05-31 (문서관리 얇게 정리: 코드 기준 라우트 상태 반영)

---

## 1차 출시 라우트 (17)

| Route              | Page              | Stage    | Owner  | Mockup | Hero          | Notes                                                       |
| ------------------ | ----------------- | -------- | ------ | ------ | ------------- | ----------------------------------------------------------- |
| `/`                | 홈                | QA       | claude | 폐기   | HeroVideo     | 홈 본문에서 Our Story + Services 섹션 제거 ✅ 2026-05-31 · `hero-bg.mp4` 적용 · 더미 후기/파트너 |
| `/story`           | 브랜드 스토리     | QA       | claude | 폐기   | StoryCover    | ROOM 01 전용 노출 · Services `<ServiceSuccessStack>` 재사용 · JSON SSOT · SSG ✅ 2026-05-31 |
| `/services`        | 서비스            | QA       | claude | 폐기   | PageHero      | 4 ServiceDetail + FAQ + CTA · JSON SSOT(DEC-050) · SSG ✅ 2026-05-30 |
| `/products`        | 제품 리스트       | Ready    | —      | 폐기   | C 재활용 가능 | 카드 + 필터 · `products.json` 작성 예정                     |
| `/products/[slug]` | 제품 상세         | Ready    | —      | —      | —             | MD 기반                                                     |
| `/pricing`         | 가격              | QA       | claude | 폐기   | PageHero      | 추천 3 카드 + `<PricingQuickCompare>` + 8 플랜 상세 · JSON SSOT · SSG ✅ 2026-05-31 |
| `/cases`           | 성공사례          | QA       | claude | 폐기   | 없음          | 포트폴리오 우선 레이아웃: compact title + TagFilter + 6 카드 그리드가 첫 화면에서 바로 노출 ✅ 2026-05-31 |
| `/cases/[slug]`    | 사례 상세         | Ready    | —      | —      | —             | MD                                                          |
| `/reviews`         | 후기              | QA       | claude | 폐기   | PageHero      | StatBar(total·avg·만족도) + TagFilter(bizType) + 6 카드 + CTA · JSON SSOT · SSG ✅ 2026-05-30 · 묶음 B-1 전환 |
| `/blog`            | 블로그 리스트     | QA       | claude | 폐기   | PageHero      | JSON SSOT + 필터 그리드 · SSG ✅ 2026-05-30                 |
| `/blog/[slug]`     | 블로그 글         | Ready    | —      | —      | —             | MDX                                                         |
| `/notice`          | 공지 리스트       | QA       | claude | 폐기   | PageHero      | JSON SSOT + pinned/all 리스트 · SSG ✅ 2026-05-30           |
| `/notice/[slug]`   | 공지 상세         | Ready    | —      | —      | —             | MD                                                          |
| `/faq`             | FAQ               | QA       | claude | 폐기   | PageHero      | JSON SSOT + 필터 아코디언 · SSG ✅ 2026-05-30 · FAQ 전용 Imagen 로봇 PNG 교체 ✅ 2026-05-31 |
| `/reservation`     | 예약              | Ready    | —      | 폐기   | —             | 라우트 파일 없음 · 날짜/시간/직접입력 예정 |
| `/contact`         | 문의              | QA       | claude | 폐기   | PageHero      | `/contact/form` 자체 폼 CTA 노출 · 네이버 폼 폐기 · SSG ✅ 2026-05-31 (DEC-058) |
| `/contact/form`    | 진단 폼 멀티스텝  | QA       | claude | 폐기   | PageHero      | 15문항 5스텝 + Progress + localStorage draft + Resend POST · zod 콘텐츠/제출 분리 · honeypot · SSG ✅ 2026-05-31 (DEC-058) |
| `/contact/form/thank-you` | 제출 완료  | QA       | claude | —      | PageHero      | 카카오 채널 + 홈 CTA · SSG ✅ 2026-05-31 (DEC-058) |
| `/landing`         | 광고 LP           | Ready    | —      | 폐기   | B 후보        | 라우트 파일 없음 · sticky form 예정 |
| `/privacy`         | 개인정보 처리방침 | QA       | claude | —      | PageHero      | JSON SSOT legal sections · SSG ✅ 2026-05-30 · 법무 검토 필요 |
| `/terms`           | 이용약관          | QA       | claude | —      | PageHero      | JSON SSOT legal sections · SSG ✅ 2026-05-30 · 법무 검토 필요 |

## 디자인 시안 라우트 (선정 후 제거 가능)

| Route              | Page                                  | Stage | Owner  | Notes                                                                                                  |
| ------------------ | ------------------------------------- | ----- | ------ | ------------------------------------------------------------------------------------------------------ |
| ~~`/mockup/[1..4]`~~ | 컬러 시안 비교 (폐기됨)              | —     | —      | **DEC-051로 폐기 ✅ 2026-05-30 밤** — 사이트 SSOT를 블루 라이트 톤으로 재정의하면서 시안 비교 라우트 + `[data-mockup='*']` 토큰 4 블록 모두 삭제. DEC-049 supersede |
| `/hero-lab`        | 인덱스 비교 페이지                 | QA    | claude | 5안 카드 + 별점 매트릭스 + 운영 제안                                                          |
| `/hero-lab/1`      | Hero A · Split Form                | QA    | claude | 폼 카드 + Flow Guide + mint mesh / 광고 LP 후보                                               |
| `/hero-lab/2`      | Hero B · Full-bleed Visual         | QA    | claude | 풀스크린 hero asset + ken-burns + 좌 mask / 브랜드                                            |
| `/hero-lab/3`      | Hero C · Card Mosaic               | QA    | claude | 4분할 hover lift / `/products` 재활용 후보                                                    |
| `/hero-lab/4`      | Hero D · Live Mini-Dashboard       | QA    | claude | 카운트 tick + line draw + 토스트 슬라이드 / B2B                                               |
| `/hero-lab/5`      | Hero E · Carousel                  | QA    | claude | 3슬라이드 crossfade + 마스코트 교체 / 시즌 캠페인                                             |
| `/hero-lab/2-plus` | Hero B+ · Enhanced Full-bleed      | QA    | claude | WebGL mesh + 떠다니는 키워드 6 + parallax + magnetic + mask reveal + Lenis cue / 홈 선정 후보 |
| `/kit`             | Kit · 재사용 컴포넌트 카탈로그     | Done  | claude | primitives/motion 라이브 카탈로그 · 신규 재사용 단위 등재 위치 · noindex · Vercel production 404(DEC-059)      |

---

## Stage 정의

| Stage     | 의미                | 진입 조건                 | 통과 조건                      |
| --------- | ------------------- | ------------------------- | ------------------------------ |
| Ready     | 사양 잠금 완료      | DEC + content/\* MD 존재  | Designing으로 이동             |
| Designing | 와이어/시안 작업 중 | wireframe in PR           | hi-fi mockup 확정              |
| Building  | 코드 작성 중        | 컴포넌트 트리 정의        | `pnpm build` 0 error           |
| QA        | 검수 중             | agent-browser-verify pass | 375/768/1440 + Lighthouse pass |
| Done      | 1차 완료            | 모든 게이트 통과          | MISSING-AND-UNIMPLEMENTED 0건  |

---

## 일일 일지 연결

각 라우트의 작업 증거는 `docs/daily/MM-DD/page-<route>.md`로 기록. 예:

- `docs/daily/05-30/page-home.md`
- `docs/daily/05-30/page-hero-lab.md`

주간 압축은 `docs/weekly/YYYY-Www.md`에서 라우트별 묶음으로.

---

## 한줄정리

**현재 코드 기준 `/contact`는 자체 `/contact/form` 진단 폼까지 QA 상태이고, `/reservation`·`/landing`·`/products`는 아직 라우트 없음(Ready). `/kit`은 production 404로 내부 전용 처리됐고, 최신 진행률은 이 표만 보면 되게 얇게 유지한다.**
