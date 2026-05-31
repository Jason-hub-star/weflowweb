# Hero Variants — WEFLOW

> `/hero-lab/[id]`에 코드 안으로 배포할 Hero Section 5안.  
> 모두 동일 베이스 카피·CTA·자산 풀에서 출발하되 *목적과 트래픽 종류*에 따라 다른 패턴.  
> 선정 후 1안은 `/` 홈, 잔여 안 중 1~2개는 `/landing`·시즌 캠페인용으로 보관.

작성: 2026-05-29 · 잠금: DEC-029 · 마스터 §13

---

## A · Split Form — 좌 카피 + 우 무료진단 폼 (devfive 정통)

**id**: `/hero-lab/1`  
**적합**: 광고 LP·검색 유입 · **비용**: 0.5d · **차별화**: ★★

```
PC 1440
┌──────────────────────────────────────────────────────────┐
│ [LOGO]  GNB ...                          [무료진단신청]   │
├──────────────────────────────────────────────────────────┤
│  랜딩&홈피·광고·검색                                       │
│  문의로 이어지는              ┌─────────────────────┐    │
│  홈페이지를 만듭니다           │ 1분 무료 진단         │    │
│  단순 제작이 아닌 문의 구조까지 │ 이름                  │    │
│  설계합니다.                  │ 연락처                │    │
│  [무료진단]  [사례보기]         │ 제작종류 [select]      │    │
│  ◯ 케어 ◯ 3~7일 ◯ 합리적        │ □ 동의 [무료진단 후 견적]│    │
│                              └─────────────────────┘    │
└──────────────────────────────────────────────────────────┘
배경: bg-bg + 우상단 mesh-gradient + grain 3%
```

```
Mobile 375
┌────────────┐
│[LOGO]   ☰  │
├────────────┤
│  랜딩&홈피  │
│  문의로     │
│  이어지는   │
│  홈페이지를 │
│  만듭니다   │
│  설명 2줄.. │
│            │
│ [무료진단]  │
│ [사례보기]  │
│            │
│ ┌────────┐ │
│ │  폼 카드 │ │
│ └────────┘ │
└────────────┘
+ Flow Guide 플로팅
```

- **모션**: 폼 카드 `y:24 → 0`, 카피 stagger 0.12
- **자산**: `weflow-flow-guide-hero.png` (폼 왼쪽 상단 작게)
- **컴포넌트 트리**:
  ```
  HeroSplitForm
    Eyebrow
    HeadingDisplay
    Subheading
    CTAGroup (Primary / Secondary)
    BenefitTagRow
    InquiryFormCard (forms/inquiry-form.tsx 재사용)
  ```

---

## B · Full-bleed Visual — 풀스크린 이미지 + 중앙 카피

**id**: `/hero-lab/2`  
**적합**: 브랜드·직접 검색 · **비용**: 0.5d · **차별화**: ★★

```
PC 1440 (h: 100vh, max 880)
┌──────────────────────────────────────────────────────────┐
│ [투명 헤더, 스크롤 시 화이트]            [무료진단신청]    │
├──────────────────────────────────────────────────────────┤
│        [hero asset 풀블리드 + 좌 그라데이션 mask]          │
│              ── 랜딩&홈페이지 · 광고 운영 ──                │
│              문의로 이어지는 홈페이지를 만듭니다             │
│              서브헤드 1줄 (좁은 max-width)                 │
│              [무료 진단 신청]  ─ 또는 ─ [사례 보기]          │
│                                       ⌄ scroll cue       │
└──────────────────────────────────────────────────────────┘
```

- **모션**: ken-burns (scale 1.0 → 1.03 over 20s), 카피 페이드 in
- **자산**: `weflow-devfive-hero.png` 풀블리드
- **접근성**: 이미지 위 텍스트는 contrast overlay 필수
- **컴포넌트 트리**:
  ```
  HeroFullBleed
    BackgroundImage (next/image priority)
    Gradient maskAlpha
    CenterCopy (Eyebrow / HeadingDisplay / Subheading)
    CTAGroup
    ScrollCue
  ```

---

## C · Card Mosaic — 좌 카피 + 우 4분할 미리보기 카드

**id**: `/hero-lab/3`  
**적합**: 비교 탐색 · **비용**: 0.7d · **차별화**: ★★

```
PC 1440
┌──────────────────────────────────────────────────────────┐
│ [LOGO]   GNB ...                          [무료진단신청]  │
├──────────────────────────────────────────────────────────┤
│  랜딩&홈피·광고·검색                                       │
│  문의로 이어지는            ┌─────────┬─────────┐         │
│  홈페이지를                 │ 제작    │ 광고    │         │
│  만듭니다                   │ 3~7일   │ 네이버  │         │
│                            ├─────────┼─────────┤         │
│  [무료진단]  [사례보기]      │ 운영    │ 진단    │         │
│                            │ 케어    │ 무료    │         │
│  ◯ 30~40대 ◯ 모바일 ◯ 데이터 └─────────┴─────────┘         │
└──────────────────────────────────────────────────────────┘
```

- **모션**: 카드 stagger 0.12, hover lift -4px + accent border
- **재활용**: `/products` 또는 `/services` hero로도 적합
- **컴포넌트 트리**:
  ```
  HeroCardMosaic
    LeftCopy (Eyebrow / Heading / Subheading / CTA)
    RightMosaic
      MosaicCard × 4 (제작 / 광고 / 운영 / 진단)
    BenefitTagRow
  ```

---

## D · Live Mini-Dashboard — 우측 가짜 대시보드 라이브

**id**: `/hero-lab/4`  
**적합**: B2B 대표·실무자 · **비용**: 1.5d · **차별화**: ★★★

```
PC 1440
┌──────────────────────────────────────────────────────────┐
│ [LOGO]   GNB ...                          [무료진단신청]  │
├──────────────────────────────────────────────────────────┤
│  운영 · 데이터 · 전환                                      │
│  문의가 자동으로            ┌─────────────────────┐       │
│  이어지도록                 │  ▣ Inquiries  ▲ 12   │       │
│  설계합니다                 │  ━━━━━━━━━━━━━━     │       │
│                            │  · 김XX님 무료진단    │       │
│  단순 제작이 아닌            │  · 박XX님 가격 확인   │       │
│  운영까지 한 번에 설계합니다  │  [ 미니 차트 +21% ]  │       │
│  [무료진단]  [데모보기]      │  ⤴ Resend·Sheets·KK │       │
│                            └─────────────────────┘       │
└──────────────────────────────────────────────────────────┘
```

- **모션**: 5초마다 토스트 슬라이드 in · 카운트 tick up · 차트 line draw
- **데이터**: 정적 더미 (실제 데이터 노출 아님, "예시" 레이블 작게)
- **컴포넌트 트리**:
  ```
  HeroLiveDashboard
    LeftCopy
    LiveDashboardPanel
      InquiriesCount (tick animation)
      ActivityFeed (auto rotate)
      MiniLineChart (Framer Motion path draw)
      IntegrationBadgeRow (Resend / Sheets / Kakao)
      DemoLabel "예시 화면입니다"
  ```

---

## B+ · Enhanced Full-bleed (선정안 1차 후보) — 풀스크린 + 인터랙티브 풀세트

**id**: `/hero-lab/2-plus`  
**적합**: 홈 `/` 메인 + 브랜드 인지 · **비용**: 1.2d · **차별화**: ★★★

기본은 B(Full-bleed)와 동일하되, 다음 **인터랙티브 인벤토리 8종**을 모두 탑재. devfive의 "scale + blur depth" 시그니처를 떠다니는 키워드 풍선으로 재해석하고, paper.design의 사선 그리드 텍스처를 차용, WebGL mesh gradient로 프리미엄 분위기 강화.

### 인터랙티브 인벤토리 8종 (DEC-043)

| # | 이름 | 구현 | 동작 |
|---|---|---|---|
| 1 | WebGL Mesh Gradient 배경 | `@paper-design/shaders-react` MeshGradient 컴포넌트, mint(`#20b486`)·deep(`#0b8065`)·ivory 셰이더 colors | hero 영역 배경, 매우 느린 motion (40~60s loop) |
| 2 | 사선 그리드 텍스처 | SVG pattern, mint alpha 0.05 | hero 우상단 1/3 영역에 fade overlay |
| 3 | 마우스 parallax | `useMotionValue` + `useTransform`로 hero asset ±12px 미세 이동 | mousemove에 부드럽게 follow, lerp |
| 4 | Scroll-linked scale + fade | `useScroll({ target, offset })` + `useTransform` | scrollYProgress 0→0.5 동안 image scale 1→1.06, 카피 opacity 1→0.4 |
| 5 | 떠다니는 키워드 풍선 6개 (devfive 시그니처 재해석) | Framer `animate` infinite, 각각 다른 z-depth | 6개 알약 카드(`랜딩페이지`·`홈페이지`·`광고운영`·`검색등록`·`케어플랜`·`운영관리`)가 각자 scale 0.8~1, blur 0~8px, opacity 0.4~1 사이 무한 cycle. hover시 scale 1.08 + blur 0 + 1초간 멈춤 |
| 6 | Magnetic CTA | mousemove 좌표 → 버튼 center 거리 계산 → 120px 이내일 때 ±8px 자석 | `무료 진단 신청` 버튼에 적용, transform spring |
| 7 | Mask reveal 카피 | CSS `background-clip: text` + `linear-gradient` + Framer scroll trigger | 헤드라인이 좌→우로 mint→white gradient mask 드러남 |
| 8 | Lenis-aware scroll cue | Lenis instance subscribe로 velocity 추출 → cue opacity·pulse 매핑 | 사용자가 스크롤 시작하면 cue 페이드아웃 |

### 컴포넌트 트리

```
HeroFullBleedPlus
  WebGLBackground (paper-design MeshGradient)
  GridTextureOverlay (SVG pattern)
  HeroImage (Framer Image, parallax + scroll-scale)
  GradientMask (좌→우 텍스트 가독성)
  CopyStack
    Eyebrow (mint accent-soft)
    HeadlineMaskReveal
    Sub (opacity scroll-linked)
    CTAGroup
      MagneticButton (primary)
      Link (secondary outline)
  FloatingKeywords
    KeywordPill × 6 (서로 다른 z·delay·duration)
  ScrollCue (Lenis-aware)
```

### 사용 자산

- `weflow-devfive-hero.png` — 풀블리드 배경 (parallax + scroll scale 적용)
- 키워드 풍선은 자산 없음, 코드 컴포넌트만 (가벼움)
- Flow Guide는 의도적 미사용 (우측 키워드 풍선이 시각 기억점 역할)

### 운영 위치

- `/` 홈 (선정 시)
- `/hero-lab/2-plus` 시안 라우트 (검수용)
- `/landing` (잔여 안 B 동일하게 보존)

---

### B vs B+ 차이 요약

| 기준 | B (Plain) | B+ (Enhanced) |
|---|:-:|:-:|
| 비주얼 임팩트 | ★★★ | ★★★★ |
| 인터랙티브 | ★ | ★★★★ |
| 차별화 | ★★ | ★★★★ |
| 구현 비용 | 0.5d | 1.2d |
| 의존성 | Framer | Framer + paper-design/shaders |
| 모바일 | 동일 (parallax/magnetic 자동 우회, mesh-gradient는 정적 fallback) | 동일 |

---

## E · Carousel Hero — 슬라이드 3컷 · CTA 고정

**id**: `/hero-lab/5`  
**적합**: 시즌 캠페인 · **비용**: 1.0d · **차별화**: ★

슬라이드:
1. **문의 구조 설계** (현재 명세 카피)
2. **3~7일 빠른 제작** — 가격 강조
3. **검색 등록 + 광고 운영** — 채널 강조

- **인터랙션**: crossfade 0.6s, dot active mint, **자동 재생 OFF** (사용자 액션으로 전환), keyboard arrow 지원
- **자산**: `weflow-devfive-hero.png` + 슬라이드별 캐릭터/배경 교체 가능
- **컴포넌트 트리**:
  ```
  HeroCarousel
    SlideViewport
      Slide × 3 (Eyebrow / Heading / Subheading / Background)
    DotIndicator
    StickyCTAGroup (모든 슬라이드 공통, 위치 고정)
    ArrowControls
  ```

---

## 비교 매트릭스

| 기준 | A | B | C | D | E |
|---|:-:|:-:|:-:|:-:|:-:|
| 전환 거리 | ★★★ | ★ | ★★ | ★★ | ★★ |
| 비주얼 임팩트 | ★★ | ★★★ | ★★ | ★★ | ★★ |
| 정보 밀도 | ★★ | ★ | ★★★ | ★★★ | ★★ |
| 차별화 | ★★ | ★★ | ★★ | ★★★ | ★ |
| 구현 비용 | 0.5d | 0.5d | 0.7d | 1.5d | 1.0d |
| 모바일 친화 | ★★★ | ★★ | ★★ | ★★ | ★★ |
| 추천 트래픽 | 광고 LP | 브랜드 | 비교 | B2B | 캠페인 |

---

## 운영 제안

| 위치 | 후보 |
|---|---|
| `/` 홈 | **A** (전환 최강) 또는 **D** (차별화 최강) |
| `/landing` | **B** (브랜드 임팩트) |
| 시즌 캠페인 보관 | **E** |
| `/products` hero 재활용 | **C** |

---

## 결정 절차

1. Day 2에 5안 모두 `/hero-lab/[1..5]`에 배포 (정적 시안)
2. agent-browser-verify로 1440·375 양쪽 검수
3. 주인님 비교 → 선정 1안 결정
4. `DECISION-LOG.md`에 `DEC-XXX: Hero 선정 — <A/B/C/D/E>` 기록
5. 선정 안을 `/`에 적용 (`apps/web/app/page.tsx`)
6. 잔여 안은 컴포넌트로 남겨두고 `/landing`·캠페인에서 재사용

---

## 한줄정리

**5안 모두 같은 카피·자산·CTA를 공유하지만 구조와 인터랙션이 달라요 — `/hero-lab/[id]` 배포 후 주인님이 1대1 비교해 선정해주세요.**
