import { CTASection } from '@/components/primitives';
import { SiteBuildStoryboard } from '@/components/motion';
import { getHomePage } from '@/lib/content/loaders';
import {
  HomeCases,
  HomeHero,
  HomeMascotBreak,
  HomePartners,
  HomePricing,
  HomeReviews,
  HomeWhy,
} from './_home/HomeSections';

/**
 * 홈 `/` — DEC-050: 페이지 데이터는 `content/pages/home.json`에서 로드 + zod 검증.
 * 카피·배열 수정: `apps/web/content/pages/home.json`.
 * DEC-052: 사이트 6단계는 SiteBuildStoryboard(톱니바퀴)에서 home.process SSOT로 통합 렌더.
 */
export default function HomePage() {
  const home = getHomePage();

  return (
    <>
      <HomeHero data={home.hero} />
      <SiteBuildStoryboard data={home.process} />
      <HomeWhy data={home.why} />
      <HomeMascotBreak data={home.mascotBreak} />
      <HomeCases data={home.cases} />
      <HomeReviews data={home.reviews} />
      <HomePricing data={home.pricing} />
      <HomePartners data={home.partners} />
      <CTASection
        eyebrow={home.cta.eyebrow}
        title={home.cta.title}
        sub={home.cta.sub}
        primary={home.cta.primary}
        secondary={home.cta.secondary}
      />
    </>
  );
}
