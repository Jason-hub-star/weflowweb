import type { ReactNode } from 'react';

export type Stat = {
  label: string;
  value: ReactNode;
  emphasis?: boolean;
  detail?: ReactNode;
};

/**
 * StatBar — 총·평균·만족도 등 통계 항목 가로 나열 (RSC).
 * 기본 3열 grid, label / value(display 폰트) / detail 옵션.
 */
export function StatBar({
  items,
  className,
}: {
  items: Stat[];
  className?: string;
}) {
  const cols = items.length === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3';
  return (
    <dl
      className={[
        'grid grid-cols-1 gap-6',
        cols,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {items.map((s, i) => (
        <div key={i} className="text-center">
          <dt className="text-eyebrow text-muted font-mono">{s.label}</dt>
          <dd
            className={[
              'text-display mt-3 font-bold',
              s.emphasis ? 'text-accent' : 'text-text',
            ].join(' ')}
          >
            {s.value}
          </dd>
          {s.detail ? (
            <p className="text-small text-muted mt-2">{s.detail}</p>
          ) : null}
        </div>
      ))}
    </dl>
  );
}
