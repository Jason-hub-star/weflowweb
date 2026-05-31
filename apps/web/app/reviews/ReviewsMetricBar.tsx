'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { RatingStars } from '@/components/primitives';
import { useCountupText } from '@/components/motion';

type Metric = {
  id: string;
  label: string;
  /** countup 대상 값. 문자열에서 숫자 부분이 0→target 으로 보간. */
  value: string;
  /** 강조 카드(만족도 등) */
  emphasis?: boolean;
};

const METRICS: Metric[] = [
  { id: 'satisfaction', label: '만족도', value: '5 / 5', emphasis: true },
  { id: 'total', label: '누적 후기', value: '24건' },
  { id: 'response', label: '평균 응답', value: '30분' },
  { id: 'retention', label: '재계약율', value: '92%' },
];

/**
 * ReviewsMetricBar — /reviews 상단 메트릭 카드 4장 + 5점 만족도 막대.
 *
 * 인터랙션:
 *  - viewport 진입 시 IntersectionObserver로 countup 트리거
 *  - reduced-motion: 즉시 표시
 *  - 만족도 카드는 ★ 5개 + "5 / 5" 텍스트 동시 표시
 *  - 하단에 별점 분포 막대 (5★ 100% 차오름)
 */
export function ReviewsMetricBar() {
  const reduce = useReducedMotion();
  const [started, setStarted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) {
      const raf = requestAnimationFrame(() => setStarted(true));
      return () => cancelAnimationFrame(raf);
    }
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <section className="bg-surface-soft border-line border-t" ref={rootRef}>
      <div className="mx-auto max-w-7xl px-[var(--space-gutter)] py-14">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {METRICS.map((m) => (
            <MetricCard key={m.id} metric={m} started={started} reduce={!!reduce} />
          ))}
        </div>
        <SatisfactionBar started={started} reduce={!!reduce} />
      </div>
    </section>
  );
}

function MetricCard({
  metric,
  started,
  reduce,
}: {
  metric: Metric;
  started: boolean;
  reduce: boolean;
}) {
  const target = started ? metric.value : '0';
  const display = useCountupText(target, reduce ? 0 : 900);

  return (
    <article
      className={[
        'rounded-lg border p-6 text-center transition-colors',
        metric.emphasis
          ? 'border-accent bg-surface ring-accent/20 shadow-md ring-2'
          : 'border-line bg-surface hover:border-accent/40',
      ].join(' ')}
    >
      <p className="text-eyebrow text-muted font-mono">{metric.label}</p>
      {metric.id === 'satisfaction' ? (
        <div className="mt-3 flex flex-col items-center gap-2">
          <RatingStars value={5} size="md" showValue={false} />
          <p
            className={[
              'text-h2 font-bold tabular-nums leading-none',
              metric.emphasis ? 'text-accent-strong' : 'text-text',
            ].join(' ')}
          >
            {display}
          </p>
        </div>
      ) : (
        <p
          className={[
            'text-h1 mt-3 font-bold tabular-nums leading-none',
            metric.emphasis ? 'text-accent-strong' : 'text-text',
          ].join(' ')}
        >
          {display}
        </p>
      )}
    </article>
  );
}

function SatisfactionBar({ started, reduce }: { started: boolean; reduce: boolean }) {
  const targetPct = started ? 100 : 0;
  return (
    <div className="border-line bg-surface mt-8 rounded-lg border p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-eyebrow text-muted font-mono">RATING DISTRIBUTION</p>
        <p className="text-small text-muted">전체 후기 5점 만점</p>
      </div>
      <ul className="mt-5 space-y-3">
        {([5, 4, 3, 2, 1] as const).map((bucket) => {
          const isFull = bucket === 5;
          const width = isFull ? targetPct : 0;
          return (
            <li key={bucket} className="flex items-center gap-3">
              <span className="text-small text-muted w-10 font-mono">{bucket}★</span>
              <span className="bg-line/40 relative h-2.5 flex-1 overflow-hidden rounded-full">
                <span
                  className={[
                    'absolute inset-y-0 left-0 rounded-full',
                    isFull ? 'bg-accent' : 'bg-muted/40',
                    reduce ? '' : 'transition-all duration-1000 ease-out',
                  ].join(' ')}
                  style={{ width: `${width}%` }}
                />
              </span>
              <span className="text-small text-muted w-12 text-right font-mono tabular-nums">
                {isFull ? `${targetPct}%` : '0%'}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
