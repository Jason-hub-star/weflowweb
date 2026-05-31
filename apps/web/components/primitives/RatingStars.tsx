export function RatingStars({
  value,
  max = 5,
  showValue = false,
  size = 'sm',
}: {
  value: number;
  max?: number;
  showValue?: boolean;
  size?: 'sm' | 'md';
}) {
  const clamped = Math.max(0, Math.min(value, max));
  const percent = (clamped / max) * 100;
  const fontSize = size === 'md' ? 'text-h3' : 'text-body';
  const stars = '★'.repeat(max);

  return (
    <span
      className="inline-flex items-baseline gap-2"
      role="img"
      aria-label={`${clamped} / ${max}`}
    >
      <span className={['relative inline-block font-mono leading-none', fontSize].join(' ')}>
        <span className="text-line">{stars}</span>
        <span
          className="text-amber absolute inset-0 overflow-hidden"
          style={{ width: `${percent}%` }}
          aria-hidden
        >
          {stars}
        </span>
      </span>
      {showValue ? (
        <span className="text-small text-muted font-mono">{clamped.toFixed(1)}</span>
      ) : null}
    </span>
  );
}
