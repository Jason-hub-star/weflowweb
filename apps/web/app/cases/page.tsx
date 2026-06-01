import type { Metadata } from 'next';
import { CTASection } from '@/components/primitives';
import { getCachedCasesPage } from '@/lib/content/loaders';
import { CasesFilterableGrid } from './CasesFilterableGrid';

export const metadata: Metadata = {
  title: '사례',
  description: 'WEFLOW가 정리한 업종별 홈페이지 제작 사례와 화면 흐름을 확인하세요.',
};

/**
 * `/cases` — 성공 사례
 * 데이터: `apps/web/content/pages/cases.json` (DEC-050)
 * 필터: `<TagFilter>` 인터랙티브 (Phase 4 묶음 B-1)
 */
export default async function CasesRoute() {
  const data = await getCachedCasesPage();

  return (
    <>
      <CasesFilterableGrid hero={data.hero} filters={data.filters} items={data.items} />
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
