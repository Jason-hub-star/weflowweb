/**
 * blog-schema.ts — `/blog` SSOT.
 *
 * Phase 6 확장: readingTimeMinutes(progress ring), comingSoon(잠금 카드).
 */
import { z } from 'zod';
import { ComingSoonSchema } from './shared-schemas';

const BlogPostMetaSchema = z.object({
  id: z.string(),
  title: z.string(),
  summary: z.string(),
  category: z.string(),
  date: z.string(),
  readingTime: z.string().optional(),
  readingTimeMinutes: z.number().int().nonnegative().optional(),
  thumbnail: z.string().optional(),
  href: z.string().optional(),
  featured: z.boolean().optional(),
  comingSoon: ComingSoonSchema.optional(),
});

export const BlogPageSchema = z.object({
  hero: z.object({
    eyebrow: z.string(),
    title: z.string(),
    sub: z.string().optional(),
  }),
  filters: z.array(z.string()).default(['전체']),
  items: z.array(BlogPostMetaSchema).min(1),
  cta: z.object({
    eyebrow: z.string(),
    title: z.string(),
    sub: z.string().optional(),
    primary: z.object({ label: z.string(), href: z.string() }).optional(),
    secondary: z.object({ label: z.string(), href: z.string() }).optional(),
  }),
});
export type BlogPage = z.infer<typeof BlogPageSchema>;
export type BlogPost = z.infer<typeof BlogPostMetaSchema>;
