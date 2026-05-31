import { CTASection, PageHero } from '@/components/primitives';
import { getFaqPage } from '@/lib/content/loaders';
import { FaqFilterableList } from './FaqFilterableList';

/**
 * `/faq` — 자주 묻는 질문
 * 데이터: `apps/web/content/pages/faq.json` (DEC-050)
 * 필터 + 아코디언 인터랙티브 (Phase 4 묶음 B-1)
 */
export default function FaqRoute() {
  const data = getFaqPage();

  return (
    <>
      <PageHero
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        sub={data.hero.sub}
        align="center"
      />
      <FaqFilterableList filters={data.filters} items={data.items} aiAssist={data.aiAssist} />
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
