# 10 — IA Mapping

| Route | App 경로 | 컴포넌트 진입 | 콘텐츠 출처 |
|---|---|---|---|
| `/` | `app/page.tsx` | motion + primitives 조합 | `content/pages/home.json` |
| `/services` | `app/services/page.tsx` | `<PageHero>` + service detail + FAQ | `content/pages/services.json` |
| `/products` | `app/products/page.tsx` | `components/marketing/ProductGrid` | `content/pages/products.json` (작성 예정) |
| `/products/[slug]` | `app/products/[slug]/page.tsx` | MDX 렌더 | `content/products/*.md` (2차) |
| `/pricing` | `app/pricing/page.tsx` | price cards + compare + FAQ | `content/pages/pricing.json` |
| `/cases` | `app/cases/page.tsx` | `<CasesFilterableGrid>` | `content/pages/cases.json` |
| `/cases/[slug]` | `app/cases/[slug]/page.tsx` | MDX | `content/cases/*.md` |
| `/reviews` | `app/reviews/page.tsx` | `<StatBar>` + `<ReviewsFilterableGrid>` | `content/pages/reviews.json` |
| `/blog` | `app/blog/page.tsx` | `<BlogList>` | `content/pages/blog.json` |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | MDX | `content/blog/*.md` |
| `/notice` | `app/notice/page.tsx` | `<NoticeList>` | `content/pages/notice.json` |
| `/notice/[slug]` | `app/notice/[slug]/page.tsx` | MD | `content/notice/*.md` |
| `/faq` | `app/faq/page.tsx` | `<FaqAccordion>` + `<TagFilter>` | `content/pages/faq.json` |
| `/reservation` | `app/reservation/page.tsx` | `components/forms/ReservationForm` | `content/pages/reservation.json` (작성 예정) |
| `/contact` | `app/contact/page.tsx` | `components/forms/InquiryForm` | `content/pages/contact.json` (작성 예정) |
| `/landing` | `app/landing/page.tsx` | Hero B 후보 + sticky form | — |
| `/mockup/[id]` | `app/mockup/[id]/page.tsx` | 데모 컴포넌트 + data-mockup | — |
| `/hero-lab/[id]` | `app/hero-lab/[id]/page.tsx` | `components/hero/Hero<*>` 분기 | — |
| `/privacy`, `/terms` | `app/{privacy,terms}/page.tsx` | legal sections 렌더 | `content/pages/{privacy,terms}.json` |
