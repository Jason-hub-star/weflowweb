'use client';

export function DiagnoseProgress({
  current,
  total,
  stepTitles,
}: {
  current: number;
  total: number;
  stepTitles: string[];
}) {
  const percent = Math.round(((current + 1) / total) * 100);
  return (
    <div className="border-line bg-surface-soft premium-card rounded-2xl border p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-eyebrow text-muted font-mono tabular-nums">
          STEP {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <span className="text-small text-accent-strong font-mono tabular-nums font-semibold">
          {percent}%
        </span>
      </div>
      <div
        className="bg-line mt-3 h-2 overflow-hidden rounded-full"
        role="progressbar"
        aria-valuenow={percent}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="진단 폼 진행률"
      >
        <div
          className="bg-accent h-full motion-safe:transition-all motion-safe:duration-500 motion-safe:ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
      <ol className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2" aria-label="진단 폼 단계">
        {stepTitles.map((title, i) => {
          const isActive = i === current;
          const isDone = i < current;
          return (
            <li
              key={title}
              className={[
                'text-small ko-tight inline-flex items-center gap-1.5',
                isActive ? 'text-accent-strong font-semibold' : isDone ? 'text-text' : 'text-muted',
              ].join(' ')}
            >
              <span
                aria-hidden
                className={[
                  'inline-grid h-5 w-5 place-items-center rounded-full font-mono text-xs tabular-nums',
                  isActive
                    ? 'bg-accent text-white'
                    : isDone
                      ? 'bg-accent-soft text-accent-strong'
                      : 'border-line bg-surface text-muted border',
                ].join(' ')}
              >
                {isDone ? '✓' : i + 1}
              </span>
              <span>{title}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
