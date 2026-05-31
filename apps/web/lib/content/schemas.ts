/**
 * Page Data Schemas — DEC-050
 *
 * 각 페이지 데이터 JSON을 빌드 시점에 zod로 검증.
 * 누락 필드·잘못된 타입은 build/typecheck 단계에서 즉시 실패.
 *
 * SSOT: docs/ref/CONTENT-MODEL.md §6
 */
import { z } from 'zod';
import { HomeStorySchema } from './story-schema';
import { HomePricingSchema } from './pricing-schema';
import { HomeReviewsSchema } from './reviews-schema';

export * from './shared-schemas';
export * from './story-schema';
export * from './pricing-schema';
export * from './reviews-schema';
export * from './blog-schema';
export * from './faq-schema';
export * from './diagnose-form-schema';

/* 공통 primitives */

export const CTASchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  variant: z.enum(['primary', 'secondary', 'ghost']).optional(),
  size: z.enum(['sm', 'md', 'lg']).optional(),
});
export type CTA = z.infer<typeof CTASchema>;

export const MascotSchema = z.object({
  src: z.string().startsWith('/'),
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  amplitude: z.number().optional(),
  duration: z.number().optional(),
  rotate: z.number().optional(),
});
export type Mascot = z.infer<typeof MascotSchema>;

const SectionHeaderSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  sub: z.string().optional(),
});

/* Home — content/pages/home.json */

const HomeHeroSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  sub: z.string().optional(),
  video: z.string().nullable().optional(),
  poster: z.string().optional(),
  posterAlt: z.string().optional(),
  minHeight: z.string().optional(),
  mascot: MascotSchema.optional(),
  ctas: z.array(CTASchema).min(1),
  benefits: z
    .array(z.object({ title: z.string(), body: z.string() }))
    .default([]),
});

const HomeServiceItem = z.object({
  code: z.string(),
  title: z.string(),
  body: z.string(),
});
const HomeServicesSchema = SectionHeaderSchema.extend({
  linkHref: z.string().optional(),
  items: z.array(HomeServiceItem).min(1),
});

const HomeWhyItem = z.object({ title: z.string(), body: z.string() });
const HomeWhySchema = SectionHeaderSchema.extend({
  items: z.array(HomeWhyItem).min(1),
});

const HomeMascotBreakSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  body: z.string().optional(),
  mascot: MascotSchema,
});

const HomeCaseItem = z.object({
  id: z.string(),
  title: z.string(),
  tag: z.string(),
  metric: z.string(),
  thumbnail: z.string().optional(),
});
const HomeCasesSchema = SectionHeaderSchema.extend({
  linkLabel: z.string().optional(),
  linkHref: z.string().optional(),
  background: z.string().optional(),
  items: z.array(HomeCaseItem).min(1),
});

const HomeProcessItem = z.object({
  id: z.string(),
  step: z.string(),
  nickname: z.string().optional(),
  title: z.string(),
  body: z.string(),
  result: z.string().optional(),
  duration: z.string().optional(),
});
const HomeProcessSchema = SectionHeaderSchema.extend({
  defaultOpenId: z.string().optional(),
  items: z.array(HomeProcessItem).min(1),
});

const HomePartnerItem = z.object({
  id: z.union([z.string(), z.number()]),
  label: z.string(),
});
const HomePartnersSchema = z.object({
  label: z.string(),
  speed: z.number().optional(),
  items: z.array(HomePartnerItem).min(1),
});

const HomeCTASchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  sub: z.string().optional(),
  primary: CTASchema.optional(),
  secondary: CTASchema.optional(),
});

export const HomePageSchema = z.object({
  hero: HomeHeroSchema,
  story: HomeStorySchema.optional(),
  services: HomeServicesSchema,
  why: HomeWhySchema,
  mascotBreak: HomeMascotBreakSchema,
  cases: HomeCasesSchema,
  reviews: HomeReviewsSchema,
  process: HomeProcessSchema,
  pricing: HomePricingSchema,
  partners: HomePartnersSchema,
  cta: HomeCTASchema,
});
export type HomePage = z.infer<typeof HomePageSchema>;

/* ============================================================ */
/* Phase 4 묶음 A — services·pricing·cases·reviews 페이지       */
/* (각 페이지는 같은 SectionHeader + 페이지별 items 패턴)        */
/* ============================================================ */

const ServicesDetailItem = z.object({
  id: z.string(),
  code: z.string(),
  title: z.string(),
  body: z.string(),
  features: z.array(z.string()).default([]),
  duration: z.string().optional(),
  price: z.string().optional(),
});
const ServicesFaqItem = z.object({
  id: z.string(),
  q: z.string(),
  a: z.string(),
});
export const ServicesPageSchema = z.object({
  hero: z.object({
    eyebrow: z.string(),
    title: z.string(),
    sub: z.string().optional(),
  }),
  items: z.array(ServicesDetailItem).min(1),
  process: HomeProcessSchema.optional(),
  faq: z
    .object({
      eyebrow: z.string(),
      title: z.string(),
      items: z.array(ServicesFaqItem),
    })
    .optional(),
  cta: HomeCTASchema,
});
export type ServicesPage = z.infer<typeof ServicesPageSchema>;

const CaseListItem = z.object({
  id: z.string(),
  title: z.string(),
  client: z.string(),
  tag: z.string(),
  category: z.enum(['전체', '교육', '로컬 서비스', 'B2B', '커머스', '브랜드/스튜디오', '전문 서비스', 'SaaS', '비즈니스', '제품']),
  metric: z.string(),
  summary: z.string(),
  thumbnail: z.string().optional(),
  heroImage: z.string().optional(),
  year: z.string().optional(),
  role: z.string().optional(),
  repo: z.string().optional(),
  sourcePath: z.string().optional(),
  stack: z.array(z.string()).default([]),
  scope: z.array(z.string()).default([]),
  overview: z.string().optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  process: z.array(z.object({ step: z.string(), title: z.string(), body: z.string() })).default([]),
  outputs: z.array(z.string()).default([]),
  href: z.string().optional(),
});
export const CasesPageSchema = z.object({
  hero: z.object({
    eyebrow: z.string(),
    title: z.string(),
    sub: z.string().optional(),
  }),
  filters: z.array(z.string()).default(['전체']),
  items: z.array(CaseListItem).min(1),
  cta: HomeCTASchema,
});
export type CasesPage = z.infer<typeof CasesPageSchema>;

/* Phase 4 묶음 B-1 — notice · faq · privacy · terms */

const NoticePost = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string().optional(),
  date: z.string(),
  pinned: z.boolean().default(false),
  badge: z.string().optional(),
  href: z.string().optional(),
});
export const NoticePageSchema = z.object({
  hero: z.object({
    eyebrow: z.string(),
    title: z.string(),
    sub: z.string().optional(),
  }),
  items: z.array(NoticePost).min(1),
  cta: HomeCTASchema,
});
export type NoticePage = z.infer<typeof NoticePageSchema>;

const LegalSection = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
});
export const LegalPageSchema = z.object({
  hero: z.object({
    eyebrow: z.string(),
    title: z.string(),
    sub: z.string().optional(),
  }),
  lastUpdated: z.string(),
  draftNotice: z.string().optional(),
  sections: z.array(LegalSection).min(1),
});
export type LegalPage = z.infer<typeof LegalPageSchema>;
