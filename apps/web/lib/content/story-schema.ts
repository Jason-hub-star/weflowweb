/**
 * story-schema.ts — `/story` 라우트 + 홈 preview 섹션 SSOT 스키마.
 *
 * 스토리는 schemas.ts에 직접 두지 않고 별도 파일로 분리한다. (400줄 가드)
 * schemas.ts에서 re-export 되어 외부에서는 `@/lib/content/schemas` 단일 진입.
 */
import { z } from 'zod';
import { ComingSoonSchema } from './shared-schemas';

const StoryHeroSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().optional(),
  sub: z.string().optional(),
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
});

const NamingItemSchema = z.object({
  letter: z.string().min(1),
  meaning: z.string().min(1),
});

const NamingBlockSchema = z.object({
  eyebrow: z.string().optional(),
  title: z.string().min(1),
  items: z.array(NamingItemSchema).min(1),
  summary: z.string().optional(),
});

const PhilosophyBlockSchema = z.object({
  quote: z.string().min(1),
  attribution: z.string().optional(),
});

const StoryChapterSchema = z.object({
  id: z.string().min(1),
  month: z.string().optional(),
  title: z.string().min(1),
  body: z.string().min(1),
  highlight: z.string().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
});

const StoryYearSchema = z.object({
  year: z.string().min(1),
  label: z.string().optional(),
  chapters: z.array(StoryChapterSchema),
  comingSoon: ComingSoonSchema.optional(),
});

const StoryCtaSchema = z.object({
  slogan: z.string().min(1),
  sloganKo: z.string().optional(),
  primary: z.object({ label: z.string(), href: z.string() }).optional(),
  secondary: z.object({ label: z.string(), href: z.string() }).optional(),
});

export const StoryPageSchema = z.object({
  hero: StoryHeroSchema,
  naming: NamingBlockSchema.optional(),
  philosophy: PhilosophyBlockSchema.optional(),
  years: z.array(StoryYearSchema).min(1),
  cta: StoryCtaSchema,
});
export type StoryPage = z.infer<typeof StoryPageSchema>;

/** home.json에 들어가는 압축형 preview (chapter는 /story 라우트 참조). */
export const HomeStorySchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().optional(),
  sub: z.string().optional(),
  highlights: z
    .array(
      z.object({
        year: z.string(),
        body: z.string(),
      }),
    )
    .default([]),
  linkLabel: z.string().optional(),
  linkHref: z.string().optional(),
});
export type HomeStorySection = z.infer<typeof HomeStorySchema>;
