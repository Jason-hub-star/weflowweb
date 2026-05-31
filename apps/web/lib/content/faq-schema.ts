/**
 * faq-schema.ts — `/faq` SSOT.
 *
 * Phase 7 확장: aiAssist(상단 비활성 AI 챗 placeholder + ComingSoonChip).
 */
import { z } from 'zod';
import { ComingSoonSchema } from './shared-schemas';

const FaqEntrySchema = z.object({
  id: z.string(),
  category: z.string(),
  q: z.string(),
  a: z.string(),
});

export const FaqPageSchema = z.object({
  hero: z.object({
    eyebrow: z.string(),
    title: z.string(),
    sub: z.string().optional(),
  }),
  filters: z.array(z.string()).default(['전체']),
  items: z.array(FaqEntrySchema).min(1),
  aiAssist: z
    .object({
      placeholder: z.string(),
      comingSoon: ComingSoonSchema,
    })
    .optional(),
  cta: z.object({
    eyebrow: z.string(),
    title: z.string(),
    sub: z.string().optional(),
    primary: z.object({ label: z.string(), href: z.string() }).optional(),
    secondary: z.object({ label: z.string(), href: z.string() }).optional(),
  }),
});
export type FaqPage = z.infer<typeof FaqPageSchema>;
export type FaqEntry = z.infer<typeof FaqEntrySchema>;
