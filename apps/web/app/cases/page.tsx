import { CTASection } from '@/components/primitives';
import { getCasesPage } from '@/lib/content/loaders';
import { CasesFilterableGrid } from './CasesFilterableGrid';

/**
 * `/cases` — 성공 사례
 * 데이터: `apps/web/content/pages/cases.json` (DEC-050)
 * 필터: `<TagFilter>` 인터랙티브 (Phase 4 묶음 B-1)
 */
export default function CasesRoute() {
  const data = getCasesPage();

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
