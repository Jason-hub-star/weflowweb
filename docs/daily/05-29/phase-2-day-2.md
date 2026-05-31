# phase-2-day-2 — 2026-05-29

Stage: Phase 1.5 + Phase 2 Day 2 — Hero 5안 배포 완료

## Done today

### Phase 1.5 — 글로벌 셸 통합
- [x] `SmoothScrollProvider` (Lenis, 데스크톱만, reduced-motion·모바일 우회)
- [x] `StickyHeaderWatcher` (스크롤 12px+ → `data-scrolled` attribute → border+shadow)
- [x] `SiteHeader` client component로 전환 (드로어 트리거 통합)
- [x] `app/layout.tsx`에 SiteHeader/SiteFooter/FloatingCTA + 스크롤 프로바이더 연결
- [x] 임시 홈(`app/page.tsx`)에 자산 활용 — `weflow-devfive-hero.png` 미리보기 figure + `/hero-lab` 진입 카드

### Phase 2 Day 2 — Hero 5안
- [x] `components/hero/shared.ts` — 공통 카피·자산·메타(A/B/C/D/E)
- [x] `HeroSplitForm` (A) — 좌 카피 stagger + 우 폼 카드 + Flow Guide 마스코트 + mint mesh gradient
- [x] `HeroFullBleed` (B) — 풀스크린 `weflow-devfive-hero.png` + ken-burns 20s + 좌→우 그라데이션 mask + 카피 stagger + scroll cue
- [x] `HeroCardMosaic` (C) — 좌 카피 + 우 4 타일 hover lift + 마이크로 인덱스 라벨
- [x] `HeroLiveDashboard` (D) — 펄스 dot + mono 카운트 tick + SVG line draw 1.6s + 토스트 활동 피드 슬라이드 + Resend/Sheets/Kakao/GA4 배지
- [x] `HeroCarousel` (E) — 3슬라이드 crossfade 6s + dot indicator + Flow Guide 마스코트 슬라이드별 교체 + hover 자동재생 일시정지
- [x] `app/hero-lab/[id]/page.tsx` — `generateStaticParams` + `dynamicParams=false` + `noindex` + 라보 인디케이터(시안 코드 + 1~5 핫링크 + 비교 링크)
- [x] `app/hero-lab/page.tsx` — 5안 카드 그리드 + ★별 비교 매트릭스 + 운영 제안 박스

### 자산 활용 확인 (자산 9개 중 6개 실제 노출)
- ✅ `logo/weflow-logo_icon.png` — SiteHeader 로고
- ✅ `logo/weflow-main_icon.png` — (푸터·OG 예약, 아직 미사용)
- ✅ `assets/weflow-devfive-hero.png` — Hero B 풀블리드 + 홈 figure
- ✅ `mascot/weflow-flow-guide-hero.png` — Hero A 폼 좌상단 + Hero E 슬라이드 1
- ✅ `mascot/weflow-flow-guide-floating.png` — FloatingCTA + Hero E 슬라이드 2
- ✅ `mascot/weflow-flow-guide-review.png` — Hero E 슬라이드 3
- ⏭ `assets/weflow-devfive-service-workflow.png` — `/services` 페이지 예약 (Phase 4)
- ⏭ `assets/weflow-devfive-proof-board.png` — `/cases` + 홈 사례 섹션 예약 (Phase 4)
- ⏭ `assets/weflow-devfive-consultation.png` — `/contact`, `/reservation` 예약 (Phase 6)

## Verification

- ✅ `pnpm typecheck` — 2 packages PASS, 2.9s
- ✅ `agent-browser` 시각 검수 (데스크톱 1440 + 모바일 375 = 12 라우트)
  - 모든 라우트 200 OK
  - 모든 h1/h2/a/button overflow="OK" (텍스트 넘침 0건)
- ✅ 증거 스크린샷 `docs/daily/05-29/evidence/hero-lab/{index,1,2,3,4,5}-{desktop,mobile}.png`
- ✅ devfive 참고 스크린샷 `docs/daily/05-29/evidence/reference/devfive-hero-{desktop,mobile}.png`

## Findings

- **devfive 시그니처 요약**: 다크 hero + 떠다니는 기술 태그 풍선 + 보라/파랑 글로우. WEFLOW는 라이트 톤이라 `mesh-gradient(mint alpha)`로 분위기 차용, 떠다니는 태그는 Hero D의 활동 피드/배지로 재해석.
- **Hero D Live Dashboard**가 가장 차별화 ★★★. 다만 사용자에게 "예시 화면입니다" 명시로 오해 방지.
- **Hero A Split Form**이 전환 거리 최단 ★★★. 모바일에서도 카피→폼 한 화면에 들어옴.
- **Hero B Full-bleed**는 hero asset 임팩트가 가장 강함. `/landing` 광고 LP 최적.
- **Hero C Card Mosaic**는 `/products` hero로 재활용 가능 (디자인이 카탈로그 친화).
- **Hero E Carousel**는 자동재생 OFF가 기본, 5초마다 슬라이드. hover 일시정지로 사용자 통제권.
- Lenis 부드러운 스크롤은 데스크톱에서만 작동 — 모바일 터치 UX 보존.

## Blocked / Issues

- (없음) 모든 컴포넌트 작동, 검증 통과.

## #TODO 잔여

- **주인님 Hero 1안 선정** → DEC-041 잠금 → `/` 홈을 선정 hero로 교체
- 잔여 안은 컴포넌트로 보존 (`/landing`, `/products`, 시즌 캠페인용)

## 결정 변경

- (없음) DEC-029 일정대로 진행.

## 다음 액션 (Phase 3 Day 3)

1. 주인님 Hero 선정 결정 받기
2. `app/(marketing)/page.tsx`에 선정 Hero 적용 (현재 임시 홈 교체)
3. `/mockup/[1..3]` Color 3안 라우트
4. 홈 본문 섹션: 서비스 rail, Why 그리드, 케이스 미리보기, 프로세스 타임라인
5. `/pricing` 가격 페이지
