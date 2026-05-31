---
date: 2026-05-30
page: /
phase: 정공법 Task #5 (홈만)
stage: QA
owner: claude
---

# 홈 `/` 본문 풀 작성 + HeroVideo + devfive 재분석

## 작업 요약

이번 세션 마무리 작업. 주인님 지시 4가지:
1. devfive.kr/ko/ 인터랙션 재분석
2. 추출 가능한 오픈소스 점검
3. 홈 본문 풀 작성 (영상 자리는 placeholder)
4. 문서 정합성 동기화 후 세션 종료

## 1. devfive 재분석 결과

WebFetch로 https://devfive.kr/ko/ HTML 분석 → 인터랙션 인벤토리 추출:

| devfive 패턴 | WEFLOW 상태 |
|---|---|
| Sticky Navigation Bar | ✅ `<StickyHeaderWatcher>` |
| Theme Toggle (Light/Dark) | 🔲 2차 (시안 4 다크 only 잠금 후) |
| Language Selector | 🔲 2차 (DEC-003 ko only) |
| Mobile Menu Toggle | ✅ `<MobileDrawer>` |
| Background Blur SVG (hero) | ✅ `<MeshGradientBackground>` / HeroVideo 그라데이션 |
| **Wave Graphics 파셀럭스** | 🔲 **신규 후보 — `<WaveParallax>`** |
| Service Card Reveal (scroll stagger) | 🔲 후보 — Framer `whileInView` + stagger |
| Tech Stack Marquee | ✅ `<ClientLogoMarquee>` |
| Logo Strip Infinite Loop | ✅ `<ClientLogoMarquee>` |
| Link Hover States | ✅ Tailwind utility |
| Portfolio Card Hovers | 🔲 후보 — `<HoverTilt>` |
| Button Hover Effects | ✅ `<Button>` primitive |
| Floating Action Button "실시간문의" | ✅ `<FloatingCTA>` |
| Accordion (Development Process) | ✅ `<ProcessAccordion>` |
| Responsive Layout Shift | ✅ Tailwind responsive |

**결론**: 핵심 인터랙션 모두 보유. 미세 디테일(Wave Parallax · Hover Tilt · Card Reveal Stagger) 3개만 신규 후보.

## 2. 오픈소스 점검 결과

WebSearch "React Next.js animation component library 2026":
- **Magic UI** (19k★) · **Aceternity UI** (200+ 컴포넌트) · **Motion** (Framer Motion 후속)이 2026 표준
- 우리가 이미 INTERACTION-CATALOG에서 추출하고 있는 라이브러리들 — **추가 도구 불필요**
- 인터랙션 추출은 직접 캡처 + 패턴 재해석이 정공 (라이센스·법적 이슈 회피)

## 3. 홈 `/` 본문 풀 작성

`apps/web/app/page.tsx` 약 360줄로 재작성. PAGE-COMPONENT-MAP.md 매핑 표 그대로.

### 섹션 구성 (11개)

| # | 섹션 | 사용 컴포넌트 | 상태 |
|---|---|---|---|
| 1 | Hero | `<HeroVideo>` + `<MascotOrbit>` + Flow Guide floating | ✅ 영상 placeholder (poster fallback) |
| 2 | SiteBuildStoryboard | (기존) | ✅ |
| 3 | Services | `<ServiceRailDrag>` + 4 카드 | ✅ |
| 4 | Why | 6 체크리스트 (인라인 grid) | ✅ |
| 5 | Mascot Break | `<MascotOrbit>` + Flow Guide hero | ✅ |
| 6 | Cases | 5 카드 + proof-board 배경 (인라인) | ✅ #TODO 진짜 사례 |
| 7 | Reviews | 3 후기 카드 정적 (인라인) | ✅ #TODO ReviewSlider 분리 |
| 8 | Process | `<ProcessAccordion>` 6단계 | ✅ |
| 9 | Pricing | 3 카드 (인라인) + CARE ★ 강조 | ✅ #TODO PricingTable 분리 |
| 10 | Partners | `<ClientLogoMarquee>` 6 로고 | ✅ #TODO 진짜 SVG 로고 |
| 11 | CTA | `<CTASection>` primitive | ✅ |

### HeroVideo 통합

```tsx
<HeroVideo
  src={undefined}                                         // #TODO Veo 영상
  poster="/assets/weflow-dark-charcoal-hero.png"          // 현재 fallback
  mascot={
    <MascotOrbit amplitude={10} duration={6}>
      <Image src="/mascot/weflow-flow-guide-floating.png"
             width={140} height={140} priority alt="" />
    </MascotOrbit>
  }
>
  <p className="text-eyebrow text-accent">{config.brand.eyebrow}</p>
  <h1 className="text-display ko-heading mt-5">{config.brand.slogan}</h1>
  ...
</HeroVideo>
```

영상 파일이 들어오면 `src="/hero/hero-bg.mp4"` 한 줄만 채우면 자동 적용.

## 검증

| 단계 | 결과 |
|---|---|
| typecheck | PASS |
| build | PASS · 17 라우트 SSG/Static prerender |
| agent-browser 1440 | top·mid·bot 3장 캡처 + ERROR_OVERLAY 0건 |
| agent-browser 375 | 캡처 + 가로 오버플로 0건 (scrollWidth=375) |
| 시각 (Hero) | 다크 차콜 + mint CTA + 마스코트 우측 하단 떠다님 ✅ |
| 시각 (Storyboard) | 6단계 sticky scroll + 마지막 토스트 "새 문의가 도착했습니다" ✅ |

## Evidence

- `evidence/mockup/home-full-top.png` — Hero 1440 (다크 + mint + 마스코트)
- `evidence/mockup/home-full-mid.png` — SiteBuildStoryboard sticky 중간
- `evidence/mockup/home-full-bot.png` — Storyboard 마지막 토스트
- `evidence/mockup/home-full-mobile.png` — 375 모바일 풀 Hero
- `evidence/mockup/hero-video-card.png` — `/kit` HeroVideo KitCard demo

## #TODO (출시 전)

| 항목 | 위치 | 처리 시점 |
|---|---|---|
| `hero-bg.mp4` 영상 | `apps/web/public/hero/hero-bg.mp4` | 주인님 Veo 생성 |
| 진짜 사례 5개 | `content/cases/*.md` → page.tsx CASES | 출시 전 |
| 진짜 후기 3+개 | `content/reviews/*.md` → page.tsx REVIEWS | 출시 전 또는 점진 |
| 진짜 파트너 로고 | `public/logos/*.svg` → page.tsx PARTNERS | 출시 전 (선택) |
| 가격 숫자 검증 | page.tsx PRICING | 주인님 확인 |

## 4. 문서 정합성 동기화

- `PROJECT-STATUS.md` — Current Phase / Active Tracks / Recent Changes 갱신
- `PAGE-UPGRADE-BOARD.md` — `/` Stage Building → QA
- `MISSING-AND-UNIMPLEMENTED.md` — 홈 본문 ✅ + 영상 + 더미 콘텐츠 #TODO 추가
- `INTERACTION-CATALOG.md` — §11 devfive 패턴 상태 갱신 + §12 신규 (Video Hero with Watermark Cover)
- 이 일지 — 작업 증거

## 다음 세션 액션

1. **묶음 A**: services · pricing · cases · reviews 4 페이지 (가장 큰 진열)
2. **묶음 B**: blog · notice · faq 3 리스트 페이지
3. **묶음 C**: [slug] 상세 4 (cases · blog · notice · products)
4. **묶음 D**: contact · reservation · landing 3 폼 페이지 (+ api/inquiry)
5. **묶음 E**: privacy · terms 2 텍스트

추가로 필요한 부품: WhyGrid · CaseTeaser · ReviewSlider · PricingSummary · TickNumber · FaqAccordion · TagFilter · SearchBar · BlogList · NoticeList · TableOfContents · StickyScrollReveal · ConsentCheckbox · DatePicker · TimeSlotGrid · StickyCTABar · InquiryForm · ReservationForm

## 한줄정리

devfive 재분석 결과 핵심 인터랙션은 다 보유했고, 홈 본문 11 섹션 풀 작성 + HeroVideo로 영상 자리·워터마크 가림까지 자동 처리됐어요. 다음 세션은 묶음 A부터 16 라우트 진행.
