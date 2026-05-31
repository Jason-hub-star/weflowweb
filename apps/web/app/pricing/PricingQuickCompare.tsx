'use client';

import { useMemo, useState } from 'react';
import { Button, ComingSoonChip } from '@/components/primitives';
import type { PricingPage } from '@/lib/content/schemas';

type PricingPlan = PricingPage['plans'][number];
type CategoryKey = 'all' | 'build' | 'care' | 'ads' | 'enterprise';

const categoryOptions: Array<{ key: CategoryKey; label: string }> = [
  { key: 'all', label: '전체' },
  { key: 'build', label: '제작' },
  { key: 'care', label: '케어' },
  { key: 'ads', label: '광고' },
  { key: 'enterprise', label: '전담' },
];

const categoryLabel: Record<string, string> = {
  build: '제작',
  care: '케어',
  ads: '광고',
  enterprise: '전담',
};

const planTone: Record<string, string> = {
  start: '광고·이벤트',
  grow: '정식 홈페이지',
  master: '풀패키지',
  'we-care': '가벼운 관리',
  'flow-care': '추천 케어',
  'weflow-care': '풀 케어',
  'naver-ads': '검색 광고',
  'carrot-ads': '동네 광고',
  enterprise: '팀 운영',
};

export function PricingQuickCompare({ plans }: { plans: PricingPage['plans'] }) {
  const [category, setCategory] = useState<CategoryKey>('all');
  const [selectedId, setSelectedId] = useState(plans.find((p) => p.featured)?.id ?? plans[0]?.id);
  const [showFeatures, setShowFeatures] = useState(false);

  const visiblePlans = useMemo(
    () => plans.filter((plan) => category === 'all' || plan.category === category),
    [plans, category],
  );
  const selected = plans.find((plan) => plan.id === selectedId) ?? visiblePlans[0];

  return (
    <section className="bg-surface-soft border-line border-t">
      <div className="mx-auto max-w-7xl px-[var(--space-gutter)] py-[var(--space-section)]">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-eyebrow text-accent font-mono">COMPARE ALL</p>
          <h2 className="text-h1 ko-heading mt-3">모든 가격을 한눈에 비교하세요</h2>
          <p className="text-body text-muted ko-relaxed mx-auto mt-4">
            먼저 전체 가격을 훑고, 필요한 묶음만 필터링해서 비교하세요. 행을 누르면 포함 항목을 바로 확인할 수 있어요.
          </p>
        </header>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="border-line bg-surface inline-flex flex-wrap justify-center gap-1 rounded-full border p-1">
            {categoryOptions.map((option) => {
              const active = option.key === category;
              return (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setCategory(option.key)}
                  className={[
                    'rounded-full px-4 py-2 text-small font-mono transition-colors',
                    active ? 'bg-accent text-surface' : 'text-muted hover:text-accent',
                  ].join(' ')}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => setShowFeatures((value) => !value)}
            className="border-line bg-surface text-small text-text hover:border-accent hover:text-accent rounded-full border px-4 py-2 font-medium transition-colors"
          >
            {showFeatures ? '핵심만 보기' : '포함 항목 같이 보기'}
          </button>
        </div>

        <div className="border-line bg-surface premium-card mt-8 overflow-hidden rounded-lg border">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[920px] border-collapse text-small">
              <thead className="bg-surface-soft">
                <tr className="border-line border-b">
                  <th scope="col" className="px-5 py-4 text-left font-mono text-muted">
                    플랜
                  </th>
                  <th scope="col" className="px-5 py-4 text-left font-mono text-muted">
                    가격
                  </th>
                  <th scope="col" className="px-5 py-4 text-left font-mono text-muted">
                    추천 상황
                  </th>
                  <th scope="col" className="px-5 py-4 text-left font-mono text-muted">
                    한 줄 요약
                  </th>
                  <th scope="col" className="px-5 py-4 text-right font-mono text-muted">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody>
                {visiblePlans.map((plan) => {
                  const active = plan.id === selected?.id;
                  return (
                    <PlanCompareRow
                      key={plan.id}
                      plan={plan}
                      active={active}
                      showFeatures={showFeatures}
                      onSelect={() => setSelectedId(plan.id)}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {selected ? <SelectedPlanPanel plan={selected} /> : null}
      </div>
    </section>
  );
}

function PlanCompareRow({
  plan,
  active,
  showFeatures,
  onSelect,
}: {
  plan: PricingPlan;
  active: boolean;
  showFeatures: boolean;
  onSelect: () => void;
}) {
  const isComingSoon = !!plan.comingSoon?.enabled;
  const tone = planTone[plan.id] ?? categoryLabel[plan.category ?? ''] ?? '상담';

  return (
    <>
      <tr
        className={[
          'border-line cursor-pointer border-b transition-colors last:border-b-0',
          active ? 'bg-accent-soft/45' : 'hover:bg-surface-soft',
        ].join(' ')}
        onClick={onSelect}
      >
        <th scope="row" className="px-5 py-4 text-left align-top">
          <div className="flex flex-col gap-2">
            <span className="text-body ko-heading text-text font-semibold">{plan.label}</span>
            <span className="text-small text-muted font-mono">
              {categoryLabel[plan.category ?? ''] ?? '기타'}
            </span>
            <span className="flex flex-wrap gap-2">
              {plan.featured && plan.badge ? (
                <span className="bg-accent text-surface rounded-full px-2.5 py-1 text-xs font-bold">
                  {plan.badge}
                </span>
              ) : null}
              {isComingSoon ? <ComingSoonChip label={plan.comingSoon?.label ?? '곧 공개'} /> : null}
            </span>
          </div>
        </th>
        <td className="px-5 py-4 align-top">
          {plan.originalPrice ? (
            <p className="text-small text-muted font-mono line-through">{plan.originalPrice}</p>
          ) : null}
          <p className="mt-1">
            <span className="text-h3 text-text font-bold tabular-nums">{plan.price}</span>
            <span className="text-small text-muted ml-1">{plan.period}</span>
          </p>
          <p className="text-small text-muted mt-1 font-mono">
            {isComingSoon ? '사전 알림 가능' : 'VAT 포함'}
          </p>
        </td>
        <td className="px-5 py-4 align-top">
          <span className="border-line bg-bg text-text rounded-full border px-3 py-1 font-medium">
            {tone}
          </span>
        </td>
        <td className="text-muted ko-relaxed max-w-md px-5 py-4 align-top">
          {plan.body}
        </td>
        <td className="px-5 py-4 text-right align-top">
          <Button
            href={plan.ctaHref}
            variant={plan.featured && !isComingSoon ? 'primary' : 'secondary'}
            size="sm"
            className="whitespace-nowrap"
          >
            {isComingSoon ? '알림 신청' : '상담'}
          </Button>
        </td>
      </tr>
      {showFeatures ? (
        <tr className={active ? 'bg-accent-soft/25' : 'bg-bg/40'}>
          <td colSpan={5} className="border-line border-b px-5 py-4">
            <div className="flex flex-wrap gap-2">
              {plan.features.map((feature) => (
                <span
                  key={feature}
                  className="border-line bg-surface text-small text-text rounded-full border px-3 py-1"
                >
                  ✓ {feature}
                </span>
              ))}
            </div>
          </td>
        </tr>
      ) : null}
    </>
  );
}

function SelectedPlanPanel({ plan }: { plan: PricingPlan }) {
  return (
    <aside className="border-line bg-bg premium-card mt-6 rounded-lg border p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-eyebrow text-accent font-mono">SELECTED</p>
          <h3 className="text-h2 ko-heading mt-2">{plan.label}</h3>
          <p className="text-body text-muted ko-relaxed mt-3 max-w-2xl">{plan.body}</p>
        </div>
        <div className="shrink-0 text-left md:text-right">
          <p className="text-h2 text-text font-bold">{plan.price}</p>
          <p className="text-small text-muted font-mono">{plan.period}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {plan.features.slice(0, 5).map((feature) => (
          <span
            key={feature}
            className="border-line bg-surface text-small text-text rounded-full border px-3 py-1"
          >
            ✓ {feature}
          </span>
        ))}
      </div>
    </aside>
  );
}
