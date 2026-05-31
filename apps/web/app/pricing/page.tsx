import { Button, ComingSoonChip, CTASection, FaqAccordion } from '@/components/primitives';
import { getPricingPage } from '@/lib/content/loaders';
import type { PricingPage } from '@/lib/content/schemas';
import { PricingQuickCompare } from './PricingQuickCompare';

/**
 * `/pricing` — 가격
 * 데이터: `apps/web/content/pages/pricing.json` (DEC-050)
 */
export default function PricingRoute() {
  const data = getPricingPage();

  return (
    <>
      <PricingRecommended plans={data.plans} />
      <PricingQuickCompare plans={data.plans} />
      <PricingPlans plans={data.plans} />
      {data.compare ? <PricingCompare data={data.compare} /> : null}
      {data.faq ? <PricingFaq data={data.faq} /> : null}
      {data.disclosures ? <PricingDisclosures items={data.disclosures} /> : null}
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

function PricingRecommended({ plans }: { plans: PricingPage['plans'] }) {
  const recommendedIds = ['start', 'flow-care', 'master'];
  const recommended = recommendedIds
    .map((id) => plans.find((plan) => plan.id === id))
    .filter(Boolean) as PricingPage['plans'];

  return (
    <section className="border-line border-t">
      <div className="mx-auto max-w-7xl px-[var(--space-gutter)] py-[var(--space-section)]">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          {recommended.map((plan) => (
            <PricingPlanCard key={plan.id} plan={plan} compact />
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingPlans({ plans }: { plans: PricingPage['plans'] }) {
  const groups = [
    { key: 'build', label: '제작 플랜', columns: 'xl:grid-cols-3' },
    { key: 'care', label: '운영 케어', columns: 'xl:grid-cols-3' },
    { key: 'ads', label: '광고 운영', columns: 'xl:grid-cols-2' },
    { key: 'enterprise', label: '팀 전담 케어', columns: 'lg:grid-cols-1' },
  ] as const;

  return (
    <section className="border-line border-t">
      <div className="mx-auto flex max-w-7xl flex-col gap-16 px-[var(--space-gutter)] py-[var(--space-section)]">
        {groups.map((group) => {
          const groupPlans = plans.filter((p) => p.category === group.key);
          if (groupPlans.length === 0) return null;

          return (
            <PricingPlanGroup
              key={group.key}
              label={group.label}
              columns={group.columns}
              isEnterprise={group.key === 'enterprise'}
              plans={groupPlans}
            />
          );
        })}
      </div>
    </section>
  );
}

function PricingPlanGroup({
  label,
  columns,
  isEnterprise,
  plans,
}: {
  label: string;
  columns: string;
  isEnterprise?: boolean;
  plans: PricingPage['plans'];
}) {
  return (
    <section aria-label={label}>
      <div
        className={[
          'grid grid-cols-1 gap-6',
          columns,
          isEnterprise ? 'mx-auto w-full max-w-3xl' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {plans.map((p) => (
          <PricingPlanCard key={p.id} plan={p} />
        ))}
      </div>
    </section>
  );
}

function PricingPlanCard({
  plan: p,
  compact = false,
}: {
  plan: PricingPage['plans'][number];
  compact?: boolean;
}) {
  const hasDiscount = !!p.originalPrice;
  const isComingSoon = !!p.comingSoon?.enabled;

  return (
    <article
      className={[
        'premium-card premium-card-hover relative flex h-full min-w-0 flex-col rounded-lg border p-6 transition-all md:p-7',
        isComingSoon
          ? 'border-accent/40 bg-accent-soft/30 border-dashed'
          : p.featured
            ? 'border-accent bg-surface ring-accent/25 z-10 ring-2'
            : 'border-line bg-surface hover:border-accent/40',
      ].join(' ')}
    >
      {p.featured && p.badge ? (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-accent-strong text-surface text-eyebrow rounded-full px-4 py-1 font-mono shadow-md whitespace-nowrap">
            {p.badge}
          </span>
        </div>
      ) : null}
      {isComingSoon ? (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <ComingSoonChip label={p.comingSoon?.label ?? '곧 공개'} />
        </div>
      ) : null}

      <div className="flex min-h-[12rem] flex-col text-center">
        <header className="flex min-h-12 items-start justify-center">
          <span className="text-h3 ko-heading text-text max-w-full break-keep font-semibold leading-tight">
            {p.label}
          </span>
        </header>

        <div className="mt-5 flex min-h-5 items-center justify-center">
          {hasDiscount ? (
            <p className="text-small text-muted font-mono line-through">
              {p.originalPrice}
            </p>
          ) : null}
        </div>
        <p className="mt-1 flex min-h-14 flex-wrap items-baseline justify-center gap-x-1 gap-y-1">
          <span
            className={[
              'text-h1 font-bold leading-none break-keep tabular-nums text-[clamp(2rem,5vw,3rem)]',
              isComingSoon ? 'text-muted' : p.featured ? 'text-accent-strong' : 'text-text',
            ].join(' ')}
          >
            {p.price}
          </span>
          <span className="text-small text-muted">{p.period}</span>
        </p>
        <p className="text-small text-muted mt-2 font-mono">
          {isComingSoon ? '사전 알림 가능' : '부가세 포함'}
        </p>
      </div>

      <p
        className={[
          'text-small text-muted ko-relaxed mx-auto mt-5 max-w-[24rem] text-center xl:text-left',
          compact ? 'min-h-[3.9rem]' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {p.body}
      </p>

      <ul className="mt-6 flex-1 space-y-2.5">
        {(compact ? p.features.slice(0, 5) : p.features).map((f) => (
          <li
            key={f}
            className="text-small text-text mx-auto flex min-w-0 max-w-[24rem] items-start justify-center gap-2 text-center xl:justify-start xl:text-left"
          >
            <span aria-hidden className="text-accent mt-0.5 shrink-0 font-bold">
              ✓
            </span>
            <span className="ko-relaxed min-w-0 break-keep">{f}</span>
          </li>
        ))}
      </ul>

      <Button
        href={p.ctaHref}
        variant={p.featured && !isComingSoon ? 'primary' : 'secondary'}
        className="mt-7 min-h-12 whitespace-normal text-center"
      >
        {p.cta}
      </Button>
    </article>
  );
}

function PricingCompare({ data }: { data: NonNullable<PricingPage['compare']> }) {
  return (
    <section className="bg-surface-soft border-line border-t">
      <div className="mx-auto max-w-5xl px-[var(--space-gutter)] py-[var(--space-section)]">
        <header className="max-w-2xl">
          <p className="text-eyebrow text-accent">{data.eyebrow}</p>
          <h2 className="text-h1 ko-heading mt-3">{data.title}</h2>
        </header>
        <div className="mt-10 overflow-x-auto">
          <table className="text-small w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-line border-b">
                {data.columns.map((col, i) => (
                  <th
                    key={col}
                    scope="col"
                    className={[
                      'text-text px-4 py-3 text-left font-mono font-semibold',
                      i === 0 ? '' : 'text-center',
                    ].join(' ')}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row) => (
                <tr
                  key={row.label}
                  className="border-line border-b last:border-b-0"
                >
                  <th
                    scope="row"
                    className="text-text px-4 py-3 text-left font-medium"
                  >
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td
                      key={`${row.label}-${i}`}
                      className="text-muted px-4 py-3 text-center font-mono"
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function PricingFaq({ data }: { data: NonNullable<PricingPage['faq']> }) {
  return (
    <section className="border-line border-t">
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

function PricingDisclosures({ items }: { items: string[] }) {
  return (
    <section className="border-line border-t" aria-label="가격 안내">
      <div className="mx-auto max-w-3xl px-[var(--space-gutter)] py-12">
        <p className="text-eyebrow text-muted font-mono">NOTICE</p>
        <ul className="mt-4 space-y-3">
          {items.map((item, i) => (
            <li
              key={i}
              className="text-small text-muted ko-relaxed flex items-start gap-3"
            >
              <span aria-hidden className="text-accent/70 mt-0.5 shrink-0 font-mono">
                ·
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
