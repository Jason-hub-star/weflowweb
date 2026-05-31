/**
 * MetricBadge — 결과 수치를 강조하는 pill.
 *
 * 예: 후기 카드의 "문의 +180%", 사례 카드의 "예약 +220%",
 *     성장 지표 stat strip의 "전환율 +32%".
 *
 * trend에 따라 색·아이콘 자동 차등:
 *  - up    : success(emerald) + ↑
 *  - down  : success(emerald) + ↓  ("이탈 -41%" 같은 좋은 down)
 *  - neutral : muted
 *  - accent : 일반 강조 (트렌드 없음, 단순 metric)
 *
 * 참고: DogCoach `TestimonialsSection`의 emerald result badge.
 *  https://github.com/Jason-hub-star/DogCoach/blob/main/Frontend/src/components/features/landing/TestimonialsSection.tsx
 */
export function MetricBadge({
  value,
  label,
  trend = 'accent',
  size = 'sm',
  className,
}: {
  value: string;
  label?: string;
  trend?: 'up' | 'down' | 'neutral' | 'accent';
  size?: 'sm' | 'md';
  className?: string;
}) {
  const toneClass =
    trend === 'up' || trend === 'down'
      ? 'bg-success/10 text-success border-success/20'
      : trend === 'neutral'
        ? 'bg-surface-soft text-muted border-line'
        : 'bg-accent-soft text-accent border-accent/25';

  const sizeClass =
    size === 'md' ? 'text-small px-3 py-1' : 'text-eyebrow px-2.5 py-0.5';

  const arrow = trend === 'up' ? '↑' : trend === 'down' ? '↓' : null;

  return (
    <span
      className={[
        'rounded-pill inline-flex items-center gap-1 border font-mono font-bold',
        toneClass,
        sizeClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {arrow ? (
        <span aria-hidden className="shrink-0">
          {arrow}
        </span>
      ) : null}
      {label ? (
        <span className="text-muted/80 font-medium">{label}</span>
      ) : null}
      <span>{value}</span>
    </span>
  );
}
