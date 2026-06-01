import type { Metadata } from 'next';
import { Suspense } from 'react';
import { CTASection, PageHero } from '@/components/primitives';
import { getCachedFaqPage } from '@/lib/content/loaders';
import { FaqFilterableList } from './FaqFilterableList';

export const metadata: Metadata = {
  title: 'FAQ',
  description: '홈페이지 제작, 자료 준비, 운영 케어에 대해 자주 묻는 질문을 정리했습니다.',
};

/**
 * `/faq` — 자주 묻는 질문
 * 데이터: `apps/web/content/pages/faq.json` (DEC-050)
 * 필터 + 아코디언 인터랙티브 (Phase 4 묶음 B-1)
 */
export default async function FaqRoute() {
  const data = await getCachedFaqPage();

  return (
    <>
      <PageHero
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        sub={data.hero.sub}
        align="center"
      />
      <Suspense fallback={null}>
        <FaqFilterableList filters={data.filters} items={data.items} aiAssist={data.aiAssist} />
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
