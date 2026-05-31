'use client';

import { useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Button, ComingSoonChip, SectionBadge } from '@/components/primitives';
import { useCountupText } from '@/components/motion';
import type { HomePage, HomePricingItem } from '@/lib/content/schemas';

type Mode = 'monthly' | 'yearly';

/**
 * HomePricing — ROOM 03 · 가격 인터랙티브 섹션.
 *
 * 인터랙션:
 *  - 월/연 토글 (billing 있는 카드만 가격 변경, countup)
 *  - featured 카드 호버 시 다른 카드 살짝 fade
 *  - 카드 묶음 하단에 "엔터프라이즈 곧 공개" ComingSoonChip 한 줄 띠
 */
export function HomePricing({ data }: { data: HomePage['pricing'] }) {
  const hasBilling = data.items.some((i) => i.billing);
  const [mode, setMode] = useState<Mode>('monthly');

  return (
    <section id="pricing" className="border-line border-t">
      <div className="mx-auto max-w-7xl px-[var(--space-gutter)] py-[var(--space-section)]">
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <SectionBadge icon="💰" tone="accent">
              {data.eyebrow}
            </SectionBadge>
            <h2 className="text-h1 ko-heading mt-5">{data.title}</h2>
          </div>
          {hasBilling ? <BillingToggle mode={mode} onChange={setMode} /> : null}
        </header>

        <div className="group/cards mt-12 grid grid-cols-1 gap-6 pt-6 md:grid-cols-3">
          {data.items.map((item) => (
            <PricingCard key={item.id} item={item} mode={mode} />
          ))}
        </div>

        <div className="border-line mt-10 flex flex-wrap items-center justify-between gap-4 border-t pt-6">
          <ComingSoonChip
            label="ENTERPRISE 곧 공개"
            description="팀 단위 전담 케어"
            href="/pricing"
          />
          {data.linkHref && data.linkLabel ? (
            <a
              href={data.linkHref}
              className="text-small text-accent font-medium hover:text-accent-strong"
            >
              {data.linkLabel}
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function BillingToggle({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="결제 주기"
      className="border-line bg-surface inline-flex rounded-full border p-1 shadow-sm"
    >
      {(['monthly', 'yearly'] as const).map((m) => {
        const active = mode === m;
        return (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(m)}
            className={[
              'text-small rounded-full px-4 py-2 font-mono font-bold transition-colors motion-safe:duration-200',
              active
                ? 'bg-accent text-surface shadow-sm'
                : 'text-muted hover:text-text',
            ].join(' ')}
          >
            {m === 'monthly' ? '월 결제' : '연 결제'}
            {m === 'yearly' && !active ? (
              <span className="text-accent ml-1 text-[0.65rem]">−16%</span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

function PricingCard({ item, mode }: { item: HomePricingItem; mode: Mode }) {
  const reduce = useReducedMotion();
  const targetPrice = item.billing
    ? mode === 'yearly'
      ? item.billing.yearly
      : item.billing.monthly
    : item.price;
  const display = useCountupText(targetPrice, reduce ? 0 : 600);
  const hint = item.billing && mode === 'yearly' ? item.billing.yearlyHint : null;
  const hasDiscount = !!item.originalPrice;

  return (
    <article
      className={[
        'premium-card premium-card-hover relative flex h-full flex-col rounded-lg border p-7 transition-all motion-safe:duration-200',
        item.featured
          ? 'border-accent bg-surface ring-accent/25 z-10 ring-2 md:scale-[1.03] -order-1 md:order-none'
          : 'border-line bg-surface hover:border-accent/40',
        item.featured
          ? ''
          : 'group-hover/cards:opacity-60 hover:!opacity-100 group-focus-within/cards:opacity-100',
      ].join(' ')}
    >
      {item.featured && item.badge ? (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="bg-accent-strong text-surface text-eyebrow rounded-full px-4 py-1 font-mono shadow-md whitespace-nowrap">
            {item.badge}
          </span>
        </div>
      ) : null}

      <header>
        <span className="text-h3 ko-heading text-text font-semibold">{item.label}</span>
      </header>

      {hasDiscount ? (
        <p className="text-small text-muted mt-5 font-mono line-through">{item.originalPrice}</p>
      ) : null}
      <p className={[hasDiscount ? 'mt-1' : 'mt-5', 'whitespace-nowrap'].join(' ')}>
        <span
          className={[
            'text-h1 font-bold leading-none break-keep tabular-nums',
            item.featured ? 'text-accent-strong' : 'text-text',
          ].join(' ')}
        >
          {display}
        </span>
        <span className="text-small text-muted ml-1">{item.period}</span>
      </p>
      <p className="text-small text-muted mt-2 whitespace-nowrap font-mono">
        {hint ?? '부가세 포함'}
      </p>

      <p className="text-small text-muted ko-relaxed mt-4 flex-1">{item.body}</p>

      <Button
        href={item.ctaHref}
        variant={item.featured ? 'primary' : 'secondary'}
        className="mt-6"
      >
        {item.cta}
      </Button>
    </article>
  );
}
