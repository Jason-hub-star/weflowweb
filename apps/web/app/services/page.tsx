import { CTASection, FaqAccordion, PageHero } from '@/components/primitives';
import { getServicesPage } from '@/lib/content/loaders';
import type { ServicesPage } from '@/lib/content/schemas';
import { ServicesShowcase } from './ServicesShowcase';
import { ServicesFlow } from './ServicesFlow';

/**
 * `/services` — 서비스 소개 (시네마틱 풀)
 * - ServicesShowcase: StickyStackCards + Tilt + Spotlight + features stagger
 * - ServicesFlow: 4단계 Process Flow Diagram (build → ads → ops → admin)
 */
export default function ServicesPage() {
  const data = getServicesPage();

  return (
    <>
      <PageHero
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        sub={data.hero.sub}
        align="center"
      />
      <ServicesFlow items={data.items} />
      <ServicesShowcase items={data.items} />
      {data.faq ? <ServicesFaq data={data.faq} /> : null}
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

function ServicesFaq({ data }: { data: NonNullable<ServicesPage['faq']> }) {
  return (
    <section className="bg-surface-soft border-line border-t">
      <div className="mx-auto max-w-3xl px-[var(--space-gutter)] py-[var(--space-section)]">
        <header className="text-center">
          <p className="text-eyebrow text-accent">{data.eyebrow}</p>
          <h2 className="text-h1 ko-heading mt-3">{data.title}</h2>
        </header>
        <div className="mt-10">
          <FaqAccordion items={data.items.map((f) => ({ id: f.id, q: f.q, a: f.a }))} />
        </div>
      </div>
    </section>
  );
}
