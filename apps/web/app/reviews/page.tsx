import { CTASection, PageHero, SectionBadge } from '@/components/primitives';
import { getReviewsPage } from '@/lib/content/loaders';
import { ReviewsFilterableGrid } from './ReviewsFilterableGrid';
import { ReviewsMetricBar } from './ReviewsMetricBar';

/**
 * `/reviews` — 고객 후기 (인터랙티브 풀 패키지)
 * 데이터: `apps/web/content/pages/reviews.json` (DEC-050)
 */
export default function ReviewsRoute() {
  const data = getReviewsPage();

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
