# Interaction Catalog — WEFLOW

> 외부 마케팅 컴포넌트 라이브러리(21st.dev · Aceternity · Magic UI · Skiper UI)와 devfive 직접 캡처에서 추출한 **인터랙션 패턴 인벤토리**.  
> 코드/이미지/문구 직접 복제 금지(plan §13) — 패턴 이름·구조·용도만 추출, 우리 자체 재작성.  
> 이 목록에서 골라 `components/motion/` 또는 `components/primitives/`에 신규 추출 → `/kit`에 등재.

작성: 2026-05-30 · 출처: `docs/daily/05-30/evidence/reference/`

---

## 카탈로그 사용법

1. 페이지 작업 전 이 문서에서 필요한 인터랙션 검색
2. WEFLOW 카탈로그(`patterns/motion-primitives.md`, `/kit`)에 이미 있는지 확인
3. 없으면 신규 primitive 추출 → `/kit` 카드 추가
4. PAGE-COMPONENT-MAP.md에 사용 명시

---

## 1. Backgrounds (배경 레이어)

| 패턴 이름 | 설명 | 구현 | WEFLOW 상태 |
|---|---|---|---|
| Mesh Gradient (WebGL) | 부드러운 색 흐름 | `@paper-design/shaders-react` | ✅ `<MeshGradientBackground>` |
| Dot Grid | 점 격자 배경 | SVG/CSS pattern | 🔲 후보 — `<DotGridBackground>` |
| Animated Beams | 사선 빔이 천천히 흐름 | SVG path + Framer animate | 🔲 후보 — `<AnimatedBeams>` |
| Noise/Grain Overlay | 종이 질감 | SVG noise filter | ✅ globals.css `body::after` |
| Diagonal Grid Texture | 사선 그리드 | CSS repeating-linear-gradient | ✅ `<GridTextureOverlay>` |
| Blueprint Depth Background | 옅은 설계도 격자 + gradient wash | CSS layered background + mask | ✅ globals.css `body`, `.brand-depth-section` |
| Aurora Layer | 다중 conic-gradient 회전 | CSS animation | 🔲 후보 — `<AuroraLayer>` |
| Particles/Stars | 작은 점 무작위 떠다님 | Framer motion + RAF | 🔲 후보 — `<FloatingParticles>` (강력 추천) |
| Shader Smoke/Wave | WebGL 셰이더 | paper-design `<SmokeRing>` 등 | 🔲 후보 — layered with mesh |

## 1.1 Surface Depth (표면 깊이)

| 패턴 이름 | 설명 | 구현 | WEFLOW 상태 |
|---|---|---|---|
| Premium Card Surface | 카드/폼 표면에 얇은 highlight와 layered shadow | CSS utility `.premium-card`, `.premium-card-hover` | ✅ 가격·문의·후기·사례 핵심 표면 |

## 2. Heroes

| 패턴 이름 | 설명 | WEFLOW 상태 |
|---|---|---|
| Split Form | 좌 카피 + 우 폼 | ✅ HeroSplitForm (A) |
| Full-bleed Image | 풀스크린 hero | ✅ HeroFullBleed (B) |
| Card Mosaic | 좌 카피 + 4분할 카드 | ✅ HeroCardMosaic (C) |
| Live Dashboard | 가짜 라이브 데이터 | ✅ HeroLiveDashboard (D) |
| Carousel | 슬라이드 전환 | ✅ HeroCarousel (E) |
| Enhanced Full-bleed | + WebGL + 풍선 + magnetic + parallax | ✅ HeroFullBleedPlus (B+) |
| Hero Highlight | 단어에 spotlight glow | 🔲 후보 — text effect |
| Scroll-snap Reveal | 스크롤하며 hero 변형 | 🔲 후보 |
| Spotlight Cursor | 마우스 따라 spotlight | 🔲 후보 — `<SpotlightCursor>` |

## 3. CTA (Calls to Action)

| 패턴 이름 | 설명 | WEFLOW 상태 |
|---|---|---|
| Magnetic Button | 자석 효과 | ✅ `<MagneticButton>` |
| Pill CTA | 알약 버튼 | ✅ Tailwind utility |
| Shimmer Border | 테두리에 빛이 도는 | 🔲 후보 — `<ShimmerBorder>` |
| Gradient Glow Button | 호버 시 글로우 | 🔲 후보 — `<GlowButton>` |
| Floating CTA | 우하단 고정 | ✅ `<FloatingCTA>` |
| Sticky CTA Bar | 페이지 하단 sticky bar | 🔲 후보 — `<StickyCTABar>` |
| Action Sheet | 모바일 시트 | ✅ FloatingCTA 내부 |

## 4. Text Effects

| 패턴 이름 | 설명 | WEFLOW 상태 |
|---|---|---|
| Mask Reveal | gradient mask 좌→우 | ✅ `<MaskRevealText>` |
| Blur In | 글자별 blur→sharp | 🔲 후보 — `<BlurInText>` |
| Typewriter | 한 글자씩 입력 | 🔲 후보 — `<TypewriterText>` |
| Number Tick | 숫자가 카운트 업 | ⚠️ Hero D에서 부분 — `<TickNumber>` 추출 권장 |
| Gradient Text | 색 그라데이션 | ⚠️ inline style — `<GradientText>` 추출 권장 |
| Marquee | 가로 무한 스크롤 | 🔲 후보 — `<Marquee>` |
| Split Letters Hover | 글자별 hover anim | 🔲 후보 |

## 5. Features / Bento (특징·기능 섹션)

| 패턴 이름 | 설명 | WEFLOW 상태 |
|---|---|---|
| Bento Grid | 크기 다른 카드 mosaic | 🔲 후보 — `<BentoGrid>` |
| Icon + Title + Body Card | 표준 feature card | 🔲 `<FeatureCard>` primitive 필요 |
| Tabbed Features | 탭 + 컨텐츠 스위치 | 🔲 후보 |
| Sticky Scroll Reveal | 좌 카피 sticky, 우 컨텐츠 변경 | ✅ `<SiteBuildStoryboard>` (홈, DEC-048) — `/services`에도 재사용 후보 |
| Service Success Stack | 서비스 기능/성공 패턴 카드를 sticky stack으로 쌓아 보여줌 | ✅ `<ServiceSuccessStack>` — 홈 Services + `/story` + `/kit#servicesuccessstack` |
| Developer Build Board | 제작 단계 + 개발자 검수 체크리스트 | ✅ `<DeveloperBuildBoard>` — 홈 BUILT BY DEVELOPERS 적용 |
| 3D Pin / Hover Tilt | 카드 마우스 따라 기울임 | 🔲 후보 — `<HoverTilt>` |
| Comparison Slider | before/after 슬라이더 | 🔲 후보 (사례에 적합) |

## 6. Pricing

| 패턴 이름 | 설명 | WEFLOW 상태 |
|---|---|---|
| Tier Card × 3 | 표준 가격 카드 | 🔲 `<PricingTable>` 필요 (제작·케어·광고) |
| Monthly/Yearly Toggle | 결제 주기 토글 | 🔲 후보 (케어 플랜에 적합) |
| Highlighted Recommended | 추천 카드 강조 | 🔲 WEFLOW CARE 왕관·★ 강조 명세 |
| Pricing Quick Compare | 카테고리 필터 + 포함 항목 토글 + 선택 플랜 패널 | ✅ `/pricing` `<PricingQuickCompare>` |
| Comparison Table | 기능별 비교표 | ✅ `/pricing` 정적 비교표 + 빠른 비교 보조 |
| Sticky Compare | 스크롤 중 비교 강조 | 🔲 후보 |

## 7. Testimonials / Reviews

| 패턴 이름 | 설명 | WEFLOW 상태 |
|---|---|---|
| Auto Slider | 자동 회전 | 🔲 `<ReviewSlider>` 필요 |
| Marquee Wall | 가로 무한 마키 | 🔲 후보 |
| Masonry Grid | 다양한 높이 | 🔲 후보 |
| Rating Stars | 별점 | 🔲 `<RatingStars>` primitive 필요 |
| Avatar + Quote Card | 표준 후기 카드 | 🔲 `<ReviewCard>` primitive |

## 8. Forms

| 패턴 이름 | 설명 | WEFLOW 상태 |
|---|---|---|
| Inline Validation | 실시간 검증 | 🔲 `<InquiryForm>` 미작업 |
| Step Wizard | 다단계 | 🔲 후보 (예약에 적합) |
| Date Picker | 달력 | 🔲 `<DatePicker>` 필요 (예약) |
| Time Slot Grid | 시간대 선택 | 🔲 `<TimeSlotGrid>` 필요 (예약) |
| Consent Checkbox | 동의 체크 | 🔲 `<ConsentCheckbox>` primitive |
| Magnetic Submit | submit 자석 | ✅ MagneticButton 재사용 가능 |

## 9. Navigation

| 패턴 이름 | 설명 | WEFLOW 상태 |
|---|---|---|
| Sticky Header | 스크롤 시 shadow | ✅ StickyHeaderWatcher |
| Mobile Drawer | 우측 슬라이드 | ✅ MobileDrawer |
| Mega Menu | 큰 드롭다운 | 🔲 후보 (제품 카테고리) |
| Command Palette | ⌘K 검색 | 🔲 후보 (관리자 2차) |
| Breadcrumbs | 경로 표시 | 🔲 `<Breadcrumbs>` primitive (상세 페이지) |
| TOC Sidebar | 목차 (블로그) | 🔲 `<TableOfContents>` |

## 10. Content (콘텐츠 렌더)

| 패턴 이름 | 설명 | WEFLOW 상태 |
|---|---|---|
| MDX Code Block | 신택스 하이라이트 | 🔲 후보 (블로그) |
| Inline Image Lightbox | 이미지 확대 | 🔲 후보 |
| Tags / Filters | 태그 필터 | 🔲 `<TagFilter>` primitive |
| Accordion | 펼치기 | 🔲 `<Accordion>` primitive 필요 (FAQ) |
| Tabs | 탭 전환 | 🔲 `<Tabs>` primitive 필요 (제품 상세) |
| Pagination | 페이지 네비 | 🔲 `<Pagination>` primitive |
| Empty State | 빈 상태 + Flow Guide | 🔲 후보 (review.png 활용) |

## 11. Devfive 직접 추출 (재해석 패턴)

| 패턴 이름 | devfive 사용 위치 | WEFLOW 적용 |
|---|---|---|
| **scale + blur + opacity depth** | 떠다니는 기술 태그 | ✅ `<FloatingPill>` |
| **3D 캐릭터 + 주변 앱 아이콘 orbit** | Why 섹션 (VR 캐릭터 + 5개 작은 앱 아이콘) | ✅ `<MascotOrbit>` (Flow Guide + 떠다님) |
| **라일락 보라 액센트 `#9e9eff`** | devfive 원본 | ⚠️ DEC-047 → DEC-049 supersede (mint로 교체, 보라 폐기) |
| **다크 차콜 배경 `#262628`** | devfive 원본 | ✅ DEC-049 시안 4 (`#101417` SSOT 정렬) |
| **테마 토글(라이트/다크)** | 우상단 | 🔲 2차 — 시안 4 다크 only 선정으로 일시 보류 (DEC-018 supersede 필요) |
| **언어 드롭다운** | 우상단 | 🔲 2차 (DEC-003 한국어 only) |
| **Wave Graphics 파셀럭스** | 페이지 하단 wave1·wave2.svg | 🔲 후보 — `<WaveParallax>` (footer/cta 배경) |
| **Tech Stack Marquee** | 하단 기술 스택 자동 흐름 | ✅ `<ClientLogoMarquee>` (홈 Partners 섹션 적용) |
| **Service Card scroll reveal stagger** | "Our Service" 섹션 | 🔲 후보 — Framer `whileInView` + stagger |
| **Floating Action Button "실시간문의"** | 우하단 fixed | ✅ `<FloatingCTA>` |
| **Portfolio Card Hover** | 프로젝트 썸네일 | 🔲 후보 — `<HoverTilt>` 또는 scale+overlay |
| **Background Blur SVG (hero)** | hero 영역 장식 blur | ✅ `<MeshGradientBackground>` 또는 HeroVideo 그라데이션 |

## 12. Phase 4 추가 발견 — 영상 hero + 워터마크 가림

| 패턴 이름 | 설명 | WEFLOW 상태 |
|---|---|---|
| **Video Hero with Watermark Cover** | autoPlay loop muted 영상 + 우측 하단 마스코트 absolute로 AI 영상 워터마크(Veo 등) 자동 점유 | ✅ `<HeroVideo>` (DEC-049 다크 자산 fallback) |
| **Gradient Fade Mask (left copy)** | 좌측 카피 가독성 위해 `from-bg/85` 그라데이션 | ✅ `<HeroVideo>` 내장 |
| **Gradient Fade Mask (bottom-right)** | 워터마크 자리 어둡게 처리 | ✅ `<HeroVideo>` 내장 |
| **Managed Flow Cards** | Hero 우측에 제작·리포트·유지관리 흐름을 클릭으로 바꾸는 카드 | ✅ `<HeroManagedCards>` — 홈 Hero 적용 + `/kit` 등재 |

---

## 우선 추출 권장 (Phase 3 진입 전)

`/kit`에 다음 8개 primitive를 추가하면 마케팅 17 라우트 진입 가능:

1. `<Button>` · `<Card>` · `<Badge>` · `<Input>` · `<Select>` · `<Textarea>` · `<Checkbox>` (UI primitives)
2. `<Accordion>` · `<Tabs>` · `<Tag>` (콘텐츠)
3. `<RatingStars>` · `<TickNumber>` · `<GradientText>` (text/data primitives)
4. `<FeatureCard>` · `<ReviewCard>` · `<PricingCard>` (마케팅 카드)
5. `<DatePicker>` · `<TimeSlotGrid>` · `<ConsentCheckbox>` (폼)
6. `<FloatingParticles>` · `<MascotOrbit>` · `<DotGridBackground>` (배경 강화, devfive 시그니처)

---

## 한줄정리

**11 카테고리 인터랙션 카탈로그 — WEFLOW가 이미 보유한 것 ✅, 외부 라이브러리에서 발견했지만 미추출인 것 🔲, 도입 검토 필요한 것 ⚠️로 표시. Phase 3 진입 전 6개 묶음(20+ primitive) 추출 권장.**
