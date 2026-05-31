import type { ReactNode } from 'react';

type ComingSoonChipProps = {
  label?: string;
  description?: ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
};

/**
 * ComingSoonChip — "방(Room)" 섹션마다 미래 기능을 암시하는 점멸 칩.
 * 점멸 도트는 `motion-safe:animate-ping`이라 prefers-reduced-motion에서 멈춘다.
 */
export function ComingSoonChip({
  label = '곧 공개',
  description,
  onClick,
  href,
  className,
}: ComingSoonChipProps) {
  const interactive = Boolean(onClick || href);
  const base = [
    'rounded-pill inline-flex items-center gap-2 border border-accent/25 bg-accent-soft px-3 py-1 text-eyebrow font-mono font-bold text-accent transition-colors',
    interactive ? 'hover:bg-accent/15 hover:border-accent/40 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const inner = (
    <>
      <span aria-hidden className="relative inline-flex h-2 w-2 shrink-0">
        <span className="absolute inset-0 rounded-full bg-accent opacity-75 motion-safe:animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
      </span>
      <span>{label}</span>
      {description ? (
        <span className="text-muted font-normal">· {description}</span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <a href={href} aria-label={`${label} — 안내`} className={base}>
        {inner}
      </a>
    );
  }
  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={base}>
        {inner}
      </button>
    );
  }
  return (
    <span aria-live="polite" className={base}>
      {inner}
    </span>
  );
}
