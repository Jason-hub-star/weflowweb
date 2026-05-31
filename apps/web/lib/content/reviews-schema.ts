/**
 * reviews-schema.ts — `/reviews` 라우트 + 홈 reviews 섹션 SSOT.
 *
 * Phase 4 확장: bizType(필터링용), videoUrl(영상 후기), comingSoon(비디오 placeholder).
 */
import { z } from 'zod';
import { ComingSoonSchema } from './shared-schemas';

const SectionHeader = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  sub: z.string().optional(),
});

const ReviewBase = {
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  biz: z.string(),
  bizType: z.string().optional(),
  rating: z.number().min(0).max(5),
  body: z.string(),
  date: z.string().optional(),
  result: z.string().optional(),
  videoUrl: z.string().optional(),
  videoThumbnail: z.string().optional(),
  comingSoon: ComingSoonSchema.optional(),
};

export const HomeReviewItemSchema = z.object(ReviewBase);

export const HomeReviewsSchema = SectionHeader.extend({
  linkLabel: z.string().optional(),
  linkHref: z.string().optional(),
  filters: z.array(z.string()).default([]),
  items: z.array(HomeReviewItemSchema).min(1),
});

export const ReviewListItemSchema = z.object(ReviewBase);

export const ReviewsPageSchema = z.object({
  hero: SectionHeader,
  stats: z
    .object({
      total: z.number().int().nonnegative(),
      avg: z.number().min(0).max(5),
    })
    .optional(),
  filters: z.array(z.string()).default(['전체']),
  items: z.array(ReviewListItemSchema).min(1),
  cta: z.object({
    eyebrow: z.string(),
    title: z.string(),
    sub: z.string().optional(),
    primary: z.object({ label: z.string(), href: z.string() }).optional(),
    secondary: z.object({ label: z.string(), href: z.string() }).optional(),
  }),
});
export type ReviewsPage = z.infer<typeof ReviewsPageSchema>;
export type ReviewItem = z.infer<typeof ReviewListItemSchema>;
