import type { Metadata } from 'next';
import { CTASection, PageHero, SectionBadge } from '@/components/primitives';
import { getCachedReviewsPage } from '@/lib/content/loaders';
import { ReviewsFilterableGrid } from './ReviewsFilterableGrid';
import { ReviewsMetricBar } from './ReviewsMetricBar';

export const metadata: Metadata = {
  title: '후기',
  description: 'WEFLOW와 함께 홈페이지 흐름을 정리한 고객 후기와 작업 경험을 확인하세요.',
};

/**
 * `/reviews` — 고객 후기 (인터랙티브 풀 패키지)
 * 데이터: `apps/web/content/pages/reviews.json` (DEC-050)
 */
export default async function ReviewsRoute() {
  const data = await getCachedReviewsPage();

  return (
    <>
      <PageHero
        eyebrow={<SectionBadge icon="★">리얼 후기</SectionBadge>}
        title={data.hero.title}
        sub={data.hero.sub}
        align="center"
      />
      <ReviewsMetricBar />
      <ReviewsFilterableGrid filters={data.filters} items={data.items} />
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
