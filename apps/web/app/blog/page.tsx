import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CTASection, PageHero, SectionBadge } from '@/components/primitives';
import { getCachedBlogPage } from '@/lib/content/loaders';
import { BlogFilterableGrid } from './BlogFilterableGrid';

export const metadata: Metadata = {
  title: '블로그',
  description: '홈페이지 제작, 문의 전환, 운영 관리에 필요한 WEFLOW 인사이트를 모았습니다.',
};

/**
 * `/blog` — 블로그 리스트
 * 데이터: `apps/web/content/pages/blog.json` (DEC-050)
 * 상세 글(`/blog/[slug]`)은 묶음 B-3에서 MD/MDX 본문과 함께.
 */
export default async function BlogRoute() {
  const data = await getCachedBlogPage();

  return (
    <>
      <PageHero
        eyebrow={<SectionBadge icon="✍">위플로우 인사이트</SectionBadge>}
        title={data.hero.title}
        sub={data.hero.sub}
        align="center"
      />
      <Suspense fallback={null}>
        <BlogFilterableGrid filters={data.filters} items={data.items} />
      </Suspense>
      <CTASection
        eyebrow={data.cta.eyebrow}
        title={data.cta.title}
        sub={data.cta.sub}
        primary={data.cta.primary}
        secondary={data.cta.secondary}
      />
    </>
  );
}
