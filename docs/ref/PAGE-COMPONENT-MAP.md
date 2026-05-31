# Page-Component Map — WEFLOW

> 17 라우트 × 사용 컴포넌트 매핑. 페이지를 만들 때 이 표만 보고 `/kit`에서 끼우면 된다.  
> 신규 컴포넌트는 INTERACTION-CATALOG.md에서 후보 검색 → 추출 → `/kit` 등재.

작성: 2026-05-30 · 출처: `HERO-VARIANTS.md` + `INTERACTION-CATALOG.md` + `PRD.md`

---

## 약속

- **Hero**: 페이지 첫 화면 (대형 또는 mini)
- **Sections**: 본문 섹션 (순서대로)
- **Forms**: 폼 컴포넌트
- **Primitives**: UI 단위 (`<Button>`, `<Card>` 등)
- **Motion**: 추가 모션 primitive
- **Surface**: `brand-depth-section`(hero/CTA 밴드) · `premium-card`(전환 핵심 카드/폼)

---

## 마케팅 17 라우트

### `/` — 홈

| 영역 | 컴포넌트 |
|---|---|
| Hero | **`<HeroVideo>` + `<HeroManagedCards>`** — Imagen blue startup poster, 추후 `hero-bg.mp4` 영상 적용 |
| Section 1 | **`<SiteBuildStoryboard>`** (DEC-048, ✅ 작성 완료) — 6단계 sticky scroll, "만듭니다" 카피 시각 증명 |
| Section 2 | `<WhyGrid>` 6 체크리스트 카드 (`<FeatureCard>` × 6) |
| Section 3 | `<DeveloperBuildBoard>` BUILT BY DEVELOPERS 제작 작업판 + 검수 체크리스트 |
| Section 4 | `<CaseTeaser>` 사례 5 카드 미리보기 (`proof-board.png` 배경) |
| Section 5 | `<ReviewSlider>` 자동 회전 |
| Section 6 | `<PricingSummary>` 3 카드 (간략) |
| Section 7 | `<CTASection>` 무료 진단 + 마스코트 review (`brand-depth-section`) |
| Primitives | `<Button>` · `<Card>` · `<Badge>` · `premium-card` 사례/가격 표면 |
| Motion | reveal · stagger · `<MeshGradientBackground>` (CTA section) · `<SiteBuildStoryboard>` (Section 1) · `<DeveloperBuildBoard>` (Section 3) |

### `/story` — 브랜드 스토리

| 영역 | 컴포넌트 |
|---|---|
| Hero | `<SectionBadge roomLabel="ROOM 01">` + cover image — ROOM 01은 스토리 전용 노출 |
| Section 1 | Naming (`WE` / `FLOW`) |
| Section 2 | Philosophy quote |
| Section 3 | `<ServiceSuccessStack>` — Services 성공 패턴을 스토리 흐름 안에서 재사용 |
| Section 4 | `<StickyStackCards>` 연도별 timeline 카드 |
| Section 5 | CTA |
| Motion | `<StaggerReveal>` · `<ServiceSuccessStack>` · `<StickyStackCards>` |

### `/services` — 서비스

| 영역 | 컴포넌트 |
|---|---|
| Hero | `<PageHero>` (compact, mini, `brand-depth-section`) |
| Section 1 | `<ServiceDetail>` × 4 (제작·광고·운영·진단) + `workflow.png` |
| Section 2 | `<WhyGrid>` 재사용 |
| Section 3 | Sticky Scroll Reveal — 좌 카피 sticky, 우 카드 변경 (`<StickyScrollReveal>` 신규) |
| Section 4 | `<CTASection>` (`brand-depth-section`) |
| Primitives | `<Card>` · `<Badge>` · `<Tabs>` |

### `/products` — 제품 리스트

| 영역 | 컴포넌트 |
|---|---|
| Hero | **`<HeroCardMosaic>`** 재활용 (C) |
| Section 1 | `<TagFilter>` 카테고리 |
| Section 2 | `<ProductGrid>` 카드 그리드 |
| Section 3 | `<CTASection>` |
| Primitives | `<Card>` · `<Badge>` · `<Tabs>` · `<Tag>` |
| Data | `content/products/*.md` (2차) → 현재는 인라인 |

### `/products/[slug]` — 제품 상세

| 영역 | 컴포넌트 |
|---|---|
| Hero | `<PageHero>` (image + title) |
| Section 1 | MDX 본문 + `<TableOfContents>` |
| Section 2 | `<FeatureList>` 기능 카드 |
| Section 3 | `<PricingCard>` 단일 |
| Section 4 | `<CTASection>` |
| Primitives | `<Card>` · `<Tabs>` · `<Accordion>` · `<Breadcrumbs>` |

### `/pricing` — 가격

| 영역 | 컴포넌트 |
|---|---|
| Hero | `<PageHero>` (`brand-depth-section`) |
| Section 1 | `<PricingRecommended>` 추천 3 카드 — START · FLOW CARE · MASTER (`premium-card`) |
| Section 2 | `<PricingQuickCompare>` 전체 가격 비교 — 카테고리 필터 · 포함 항목 토글 · 선택 행 상세 패널 (`premium-card`) |
| Section 3 | `<PricingPlanGroup>` 카테고리별 상세 카드 — 제작 3 · 케어 3 · 광고 2 · 엔터프라이즈 1 |
| Section 4 | `<ComparisonTable>` 단발 제작 3종 비교 |
| Section 5 | `<FaqAccordion>` 가격 FAQ |
| Section 6 | `<CTASection>` (`brand-depth-section`) |
| Primitives | `<Button>` · `<ComingSoonChip>` · `<FaqAccordion>` |
| Motion | 없음 — 비교 인터랙션은 pricing 전용 client component |

### `/cases` — 성공사례

| 영역 | 컴포넌트 |
|---|---|
| Hero | 없음 — 첫 화면에서 바로 포트폴리오 카드가 보이도록 `<PageHero>` 제거 |
| Section 1 | `<CasesFilterableGrid>` 포트폴리오 우선 레이아웃: compact title + `<TagFilter>` + 카드 그리드 |
| Section 2 | `<CTASection>` |
| Primitives | `<Card>` · `<Badge>` · `<Tag>` |
| Data | `content/pages/cases.json` |

### `/cases/[slug]` — 사례 상세

| 영역 | 컴포넌트 |
|---|---|
| Hero | `<PageHero>` (image + title + period) |
| Section 1 | `<MetricGrid>` before/after (`<TickNumber>` × 3~4) |
| Section 2 | MDX 본문 |
| Section 3 | `<QuoteCard>` 클라이언트 인용 |
| Section 4 | `<RelatedCases>` |
| Section 5 | `<CTASection>` |
| Primitives | `<Card>` · `<Breadcrumbs>` · `<TickNumber>` |

### `/reviews` — 후기

| 영역 | 컴포넌트 |
|---|---|
| Hero | `<PageHero>` + 마스코트 review (`brand-depth-section`) |
| Section 1 | `<StatBar>` (만족도·후기 수·평균 별점) |
| Section 2 | `<ReviewSlider>` 상단 |
| Section 3 | `<TagFilter>` 업종 |
| Section 4 | `<ReviewGrid>` Masonry (`premium-card`) |
| Section 5 | `<CTASection>` (`brand-depth-section`) |
| Primitives | `<ReviewCard>` · `<RatingStars>` · `<Avatar>` · `<Tag>` · `premium-card` |

### `/blog` — 블로그

| 영역 | 컴포넌트 |
|---|---|
| Hero | `<PageHero>` |
| Section 1 | `<TagFilter>` 태그·카테고리 |
| Section 2 | `<BlogList>` 카드 그리드 |
| Section 3 | `<Pagination>` |
| Primitives | `<Card>` · `<Tag>` · `<Avatar>` |

### `/blog/[slug]` — 블로그 글

| 영역 | 컴포넌트 |
|---|---|
| Hero | `<PageHero>` (image + title + author + date) |
| Sticky | `<TableOfContents>` |
| Section 1 | MDX 본문 (코드 블록·이미지·인용) |
| Section 2 | `<AuthorCard>` |
| Section 3 | `<RelatedPosts>` |
| Section 4 | `<CTASection>` |
| Primitives | `<Card>` · `<Tag>` · `<Breadcrumbs>` |

### `/notice` — 공지

| 영역 | 컴포넌트 |
|---|---|
| Hero | `<PageHero>` |
| Section 1 | `<NoticePinned>` 고정 공지 |
| Section 2 | `<NoticeList>` |
| Primitives | `<Card>` · `<Badge>` |

### `/notice/[slug]` — 공지 상세

| 영역 | 컴포넌트 |
|---|---|
| Hero | `<PageHero>` (compact) |
| Section 1 | MD 본문 |
| Primitives | `<Breadcrumbs>` |

### `/faq` — FAQ

| 영역 | 컴포넌트 |
|---|---|
| Hero | `<PageHero>` + 마스코트 review |
| Section 1 | `<SearchBar>` |
| Section 2 | `<TagFilter>` 카테고리 |
| Section 3 | `<FaqAccordion>` |
| Section 4 | `<CTASection>` |
| Primitives | `<Accordion>` · `<Input>` · `<Tag>` |

### `/reservation` — 예약

| 영역 | 컴포넌트 |
|---|---|
| Hero | `<PageHero>` + `consultation.png` |
| Section 1 | `<ReservationForm>` (좌 폼 / 우 일정 안내) |
| Section 2 | `<ProcessTimeline>` (예약 후 흐름) |
| Forms | `<ReservationForm>` (RHF + zod) |
| Primitives | `<DatePicker>` · `<TimeSlotGrid>` · `<Input>` · `<Select>` · `<Textarea>` · `<ConsentCheckbox>` · `<Button>` |
| Motion | `<MagneticButton>` (submit) |

### `/contact` — 문의

| 영역 | 컴포넌트 |
|---|---|
| Hero | `<PageHero>` + `consultation.png` (`brand-depth-section`) |
| Section 1 | `<InquiryForm>` (좌 폼 / 우 회사 정보 + 카카오 안내, `premium-card`) |
| Section 2 | `<ContactInfo>` (전화·이메일·주소) |
| Section 3 | `<FaqAccordion>` 짧은 |
| Forms | `<InquiryForm>` |
| Primitives | `<Input>` · `<Select>` · `<Textarea>` · `<ConsentCheckbox>` · `premium-card` |

### `/landing` — 광고 LP

| 영역 | 컴포넌트 |
|---|---|
| Hero | **`<HeroFullBleed>`** (B 원안, 광고 친화) |
| Section 1 | 좌 컨텐츠 + 우 sticky `<InquiryForm>` (모바일은 하단 sticky bar) |
| Section 2 | `<WhyGrid>` 3 카드 |
| Section 3 | `<ProcessTimeline>` 6 단계 |
| Section 4 | `<PricingSummary>` |
| Section 5 | `<ReviewSlider>` |
| Section 6 | `<CTASection>` |
| Primitives | `<Card>` · `<StickyCTABar>` |

### `/privacy`, `/terms` — 법무

| 영역 | 컴포넌트 |
|---|---|
| Hero | `<PageHero>` (compact, 텍스트만) |
| Section 1 | MD 본문 (`content/legal/*.md`) |
| Primitives | `<TableOfContents>` · `<Breadcrumbs>` |

---

## 시안 라우트

| Route | Hero | Notes |
|---|---|---|
| ~~`/mockup/1..4`~~ | 폐기 | DEC-051로 삭제. 컬러 SSOT는 블루 라이트 톤 |
| `/hero-lab/1..5, 2-plus` | 각 Hero variant | ✅ 완료 |
| `/kit` | 카탈로그 | ✅ 완료, 컴포넌트 추가될 때마다 자동 등재 |

---

## 우선순위 (Phase 3~7)

**Phase 3 (Day 3) — Foundation Primitives**: `<Button>` · `<Card>` · `<Badge>` · `<Input>` · `<Select>` · `<Textarea>` · `<Checkbox>` · `<Tabs>` · `<Accordion>` · `<Tag>` · `<RatingStars>` · `<Avatar>` · `<Breadcrumbs>` · `<Pagination>` · `<PageHero>` · `<CTASection>` (16 primitives) → `/kit` 등재 + Color 3안 비교

**Phase 4 (Day 4~5) — Marketing Sections**: `<ServiceRail>` · `<WhyGrid>` · `<CaseTeaser>` · `<CaseGrid>` · `<ReviewSlider>` · `<ReviewGrid>` · `<ProcessTimeline>` · `<PricingTable>` · `<PricingSummary>` · `<FeatureList>` · `<MetricGrid>` · `<QuoteCard>` · `<FaqAccordion>` · `<BlogList>` · `<NoticeList>` · `<TagFilter>` · `<SearchBar>` (17 컴포넌트) → 홈·서비스·제품·가격·사례·후기·블로그·공지·FAQ 라우트 작성

**Phase 5 (Day 6) — Forms + API**: `<InquiryForm>` · `<ReservationForm>` · `<DatePicker>` · `<TimeSlotGrid>` · `<ConsentCheckbox>` + `/api/inquiry` · `/api/reservation` + Resend + Sheets + BotID

**Phase 6 (Day 7) — Landing + Mobile Polish**

**Phase 7 (Day 8~10) — SEO·a11y·QA·Deploy**

---

## 한줄정리

**17 라우트 × 사용 컴포넌트 매핑 표를 단일 출처로 — `/` 홈 8섹션·`/pricing` 6섹션 등 페이지마다 무엇을 끼울지 명확. 추출 우선순위는 Foundation Primitives(16) → Marketing Sections(17) → Forms+API 순.**
