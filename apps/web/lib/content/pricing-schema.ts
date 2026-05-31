/**
 * pricing-schema.ts — 가격 페이지(`/pricing`) + 홈 pricing 섹션 SSOT.
 *
 * BillingSchema(월/연 토글 데이터) + ComingSoonSchema(엔터프라이즈 티저)를
 * 두 곳(HomePricingItem, PricingPlanItem)에 일관 적용.
 */
import { z } from 'zod';
import { BillingSchema, ComingSoonSchema } from './shared-schemas';

const SectionHeader = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  sub: z.string().optional(),
});

export const HomePricingItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  originalPrice: z.string().optional(),
  price: z.string(),
  period: z.string(),
  body: z.string(),
  cta: z.string(),
  ctaHref: z.string(),
  featured: z.boolean().default(false),
  badge: z.string().optional(),
  billing: BillingSchema.optional(),
  comingSoon: ComingSoonSchema.optional(),
});

export const HomePricingSchema = SectionHeader.extend({
  linkLabel: z.string().optional(),
  linkHref: z.string().optional(),
  items: z.array(HomePricingItemSchema).min(1),
});

export const PricingPlanItemSchema = z.object({
  id: z.string(),
  category: z.enum(['build', 'care', 'ads', 'enterprise']).optional(),
  label: z.string(),
  originalPrice: z.string().optional(),
  price: z.string(),
  period: z.string(),
  body: z.string(),
  features: z.array(z.string()).default([]),
  cta: z.string(),
  ctaHref: z.string(),
  featured: z.boolean().default(false),
  badge: z.string().optional(),
  billing: BillingSchema.optional(),
  comingSoon: ComingSoonSchema.optional(),
});

const PricingCompareRowSchema = z.object({
  label: z.string(),
  values: z.array(z.string()),
});

const PricingFaqItemSchema = z.object({
  id: z.string(),
  q: z.string(),
  a: z.string(),
});

export const PricingPageSchema = z.object({
  hero: SectionHeader,
  plans: z.array(PricingPlanItemSchema).min(1),
  compare: z
    .object({
      eyebrow: z.string(),
      title: z.string(),
      columns: z.array(z.string()),
      rows: z.array(PricingCompareRowSchema),
    })
    .optional(),
  faq: z
    .object({
      eyebrow: z.string(),
      title: z.string(),
      items: z.array(PricingFaqItemSchema),
    })
    .optional(),
  disclosures: z.array(z.string()).optional(),
  cta: z.object({
    eyebrow: z.string(),
    title: z.string(),
    sub: z.string().optional(),
    primary: z.object({ label: z.string(), href: z.string() }).optional(),
    secondary: z.object({ label: z.string(), href: z.string() }).optional(),
  }),
});
export type PricingPage = z.infer<typeof PricingPageSchema>;
export type PricingPlan = z.infer<typeof PricingPlanItemSchema>;
export type HomePricingItem = z.infer<typeof HomePricingItemSchema>;
