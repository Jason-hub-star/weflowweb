# Missing & Unimplemented — WEFLOW

> UI에 보이는데 실제 작동하지 않거나, 명세에 있는데 코드 없음, 더미인데 진짜처럼 보이는 모든 항목.  
> **출시 전 0건이 되어야 함.**  
> TaillogToss 패턴 채택 — 구현 거짓말 탐지 보드.

업데이트: 2026-05-31 (문서관리 얇게 정리: 현재 코드 기준 placeholder만 유지)

---

## 1. 작동하지 않는 UI (Visible-But-Broken)

| Location | What | Reason | Owner | Fix Plan |
|---|---|---|---|---|
| `/reservation` · `/landing` · `/products` | 1차 출시 라우트 중 아직 파일 없음 | Phase 4 잔여 라우트 | claude | 라우트 작성 → typecheck/build → 375/768/1440 검수 |

## 2. 명세에 있으나 코드 없음 (Spec-No-Code)

| Spec Source | Item | Owner | Priority | Target Day | Status |
|---|---|---|---|---|---|
| DEC-005 / 마스터 §6 | `apps/web` Next.js 16 앱 | claude | P0 | Day 1 | ✅ 2026-05-29 부팅 완료 |
| DEC-017 / 마스터 §6 | `packages/tokens` 디자인 토큰 패키지 | claude | P0 | Day 1 | ✅ 2026-05-29 골격 완료 |
| 마스터 §6 | 모노레포 부팅 (pnpm + turborepo) | claude | P0 | Day 1 | ✅ 2026-05-29 |
| 마스터 §7 | 헤더/푸터/드로어/플로팅 CTA 컴포넌트 | claude | P0 | Day 1 | ✅ 2026-05-29 스텁 완료 |
| DEC-023 (부분) | `sitemap.ts`, `robots.ts` | claude | P1 | Day 8 | ✅ 2026-05-29 기본 형태 |
| DEC-029 / 마스터 §13 | `/hero-lab/[id]` 5안 라우트 | claude | P0 | Day 2 | ✅ 2026-05-29 5안 + 인덱스 배포, agent-browser 시각 검수 PASS |
| DEC-029 / 마스터 §12 | `/mockup/[id]` 4안 라우트 (DEC-047로 3→4안 확장) | claude | P0 | Day 3 | ✅ 2026-05-30 검증 후 DEC-051로 폐기·삭제 |
| 마스터 §7 | 마케팅 17 라우트 본문 | claude | P0 | Day 3~7 | 홈 + `/story` + `/services`·`/pricing`·`/cases`·`/reviews` + `/blog`·`/notice`·`/faq`·`/privacy`·`/terms` + `/contact/form` ✅, 나머지 진행 중 |
| DEC-013 | Resend 이메일 전송 (`api/inquiry`) | claude | P1 | Day 6 | — |
| DEC-014 | Google Sheets append | claude | P1 | Day 6 | — |
| DEC-015 | Vercel BotID 검증 | claude | P1 | Day 6 | — |
| DEC-023 (전체) | 동적 OG · JSON-LD | claude | P1 | Day 8 | — |
| DEC-021 | 픽셀 5종 (production만) | claude | P2 | Day 8 | — |
| 마스터 §15 | `app/layout.tsx` 에 SiteHeader/Footer/FloatingCTA 연결 | claude | P0 | Day 2 | ✅ 2026-05-29 |
| 마스터 §15 | 헤더에 SiteHeader 통합 + MobileDrawer 연결 | claude | P0 | Day 2 | ✅ 2026-05-29 |
| 마스터 §4 | Lenis 부드러운 스크롤 (데스크톱) | claude | P1 | Day 2 | ✅ 2026-05-29 |
| Hero D | DECISION 후 선정안에 따른 `/` 홈 교체 | 주인님 + claude | P0 | Day 3 | ✅ Hero B+ 1차 선정 후 현재 HeroVideo 운영 |
| DEC-041~044 | Hero B+ Enhanced Full-bleed + 모션 primitives 8종 (motion/) | claude | P0 | Day 2 | ✅ 2026-05-29 |
| DEC-045 | `/kit` 라이브 카탈로그 + KitCard 헬퍼 + 15 카드 + 6 hero 링크 | claude | P0 | Day 3 | ✅ 2026-05-30 |
| 마스터 §7 | Foundation Primitives 16개 추출 + `/kit#primitives` 등재 | claude | P0 | Day 3 | ✅ 2026-05-30 (Button·Card·Badge·Tag·PageHero·CTASection·Input·Textarea·Select·Checkbox·Tabs·Accordion·Breadcrumbs·Pagination·RatingStars·Avatar) |
| DEC-049 | :root 다크 승격 (시안 4 dark-charcoal 정착) | claude | P0 | Day 3 | ✅ 2026-05-30 |
| 마스터 §13 / Phase 2.5 | devfive 시그니처 모션 5종 (MascotOrbit·FloatingParticles·ServiceRailDrag·ProcessAccordion·ClientLogoMarquee) | claude | P0 | Day 4 | ✅ 2026-05-30 |
| Phase 4 / 마스터 §7 | `<HeroVideo>` 영상 hero + 워터마크 자동 가림 | claude | P0 | Day 4 | ✅ 2026-05-30 |
| Phase 4 / 마스터 §7 | 홈 `/` 본문 풀 작성 (11 섹션) | claude | P0 | Day 5 | ✅ 2026-05-30 — QA 단계, 더미 후기/파트너는 별도 추적 |
| Phase 4 | 남은 라우트 본문 (`reservation` · `landing` · `products` + 상세 라우트) | claude | P0 | Day 5~7 | — `/contact/form` 완료 후 잔여 |
| Hero B+ 보강 | 떠다니는 키워드 가독성 — z-index/배경 대비 보강 (데스크톱) | claude | P1 | Day 3 | — 1차 검수에서 식별 |

## 3. 더미·플레이스홀더 (Dummy-But-Looks-Real)

| Location | Dummy Item | Real Source | Replace By |
|---|---|---|---|
| `apps/web/public/hero/hero-bg.mp4` | ✅ 2026-05-31 해소 — 파일 존재, `home.json`에서 `/hero/hero-bg.mp4` 참조 | 필요 시 최종 영상으로 재교체 | 출시 전 (선택) |
| `apps/web/content/pages/home.json` 사례 항목 | ✅ 2026-05-31 해소 — Landingfolio 기반 대표 컨펌용 레퍼런스 목업 6종으로 교체, 가짜 수치형 성과 제거 | 실제 클라이언트 사례가 생기면 `content/pages/cases.json` 또는 상세 MD로 점진 교체 | 출시 전 또는 출시 후 점진 |
| `apps/web/content/pages/home.json` 후기·파트너 항목 | 더미 카피 | 실제 후기/파트너 | 출시 전 |
| ~~`apps/web/app/contact/page.tsx`~~ | ✅ 2026-05-31 해소 — 자체 멀티스텝 폼 `/contact/form` 도입(DEC-058), 네이버 폼 의존 제거 | — | — |
| `lib/config.ts.social.kakaoChannelUrl` | ✅ 2026-05-31 해소 — fallback 실제 채널 URL 적용 | 필요 시 env로 교체 | 출시 전 확인 |
| `lib/config.ts.company` | 상호·대표·사업자번호·통신판매업번호·주소·이메일 placeholder | 주인님 전달 | 출시 전 |
| `lib/config.ts.social.daangn` | `#TODO_DAANGN` | 당근플레이스 URL | 출시 후/필요 시 |
| `lib/config.ts.email.to` / `OWNER_EMAIL` env | `#TODO_OWNER_EMAIL` — `/contact/form` 제출 시 운영자 수신 메일 | 실제 메일 주소 | 출시 전 (`.env.local`에 `OWNER_EMAIL` + `RESEND_API_KEY` 입력) |
| `apps/web/content/pages/reviews.json` · `home.json` | 후기·파트너 더미 카피 | 실제 후기/파트너 | 출시 전 또는 출시 후 점진 |
| `apps/web/content/pages/blog.json` | 블로그 더미/예정 콘텐츠 | 주인님 작성 | 출시 후 점진 |
| `apps/web/content/pages/notice.json` | 공지 더미/예정 콘텐츠 | 실제 공지 | 출시 직전 |
| `apps/web/content/pages/privacy.json` | 표준 템플릿 + `#TODO_PRIVACY_*` | 검토 통과본 | 출시 전 필수 |
| `apps/web/content/pages/terms.json` | 표준 템플릿 | 검토 통과본 | 출시 전 필수 |
| env `GA_MEASUREMENT_ID` | placeholder | GA4 속성 발급 | 출시 전 |
| env `GTM_ID` | placeholder | GTM 컨테이너 발급 | 출시 전 |
| env `META_PIXEL_ID` | placeholder | Meta 비즈니스 계정 | 출시 전 |
| env `NAVER_WISETOOL_ID` | placeholder | Naver 광고 계정 | 출시 전 |
| env `KAKAO_PIXEL_ID` | placeholder | Kakao 비즈니스 | 출시 전 |
| env `RESEND_API_KEY` | placeholder | Resend 가입 + 도메인 인증 | 출시 전 |
| env `GOOGLE_SHEETS_ID` | placeholder | 시트 생성 | 출시 전 |
| env `GOOGLE_SERVICE_ACCOUNT_JSON` | placeholder | GCP 서비스 계정 생성 | 출시 전 |

## 4. 의존 외부 상태 (External-Pending)

| Item | Required For | Blocked By | Action |
|---|---|---|---|
| weflowlab.kr DNS Vercel 연결 | 도메인 활성 | Vercel 프로젝트 생성 | 출시 직전 |
| Google Search Console 인증 메타값 | 검색 등록 | 도메인 활성 | 출시 직후 |
| Naver 서치어드바이저 인증 메타값 | 국내 검색 | 도메인 활성 | 출시 직후 |
| 당근플레이스 등록 | 지역 노출 | 주인님 등록 | 출시 후 |

---

## 정리 규칙

- 항목 해소 시 **삭제하지 말고 ✅ 표시 + 해소 날짜 + 커밋 해시** 표기 (감사 추적).
- 출시 전 모든 P0/P1 0건이어야 한다.
- 신규 발견은 가장 위 섹션부터 추가.

---

## 한줄정리

**현재 남은 구현 거짓말은 아직 없는 `/reservation`·`/landing`·`/products`, Sheets/BotID/예약 API, 법무/사업자 정보와 일부 더미 콘텐츠다. `/contact` 네이버 폼 placeholder는 자체 폼으로 해소됐다.**
