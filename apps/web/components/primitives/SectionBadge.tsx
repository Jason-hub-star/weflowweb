import type { ReactNode } from 'react';

/**
 * SectionBadge — 섹션 상단에 독립으로 떠 있는 정체성 pill.
 *
 * 예: hero 위 "리얼 후기", "신규 기능", "성공 사례" 같은 짧은 라벨.
 * Badge primitive는 inline 메타데이터(tag/category)용이지만,
 * SectionBadge는 섹션 헤더 위 단독 강조용이라 sizing과 색이 더 강함.
 *
 * 참고: DogCoach `TestimonialsSection` "리얼 후기" pill 패턴.
 *  https://github.com/Jason-hub-star/DogCoach/blob/main/Frontend/src/components/features/landing/TestimonialsSection.tsx
 */
export function SectionBadge({
  children,
  icon,
  tone = 'accent',
  size = 'md',
  roomLabel,
  className,
}: {
  children: ReactNode;
  icon?: ReactNode;
  tone?: 'accent' | 'amber' | 'muted';
  size?: 'sm' | 'md';
  roomLabel?: string;
  className?: string;
}) {
  const toneClass =
    tone === 'amber'
      ? 'bg-amber-soft text-amber border-amber/30'
      : tone === 'muted'
        ? 'bg-surface-soft text-muted border-line'
        : 'bg-accent-soft text-accent border-accent/25';

  const sizeClass = size === 'sm' ? 'text-eyebrow px-3 py-1' : 'text-small px-4 py-1.5';

  return (
    <span
      className={[
        'rounded-pill inline-flex items-center gap-1.5 border font-bold',
        toneClass,
        sizeClass,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {icon ? (
        <span aria-hidden className="inline-flex shrink-0">
          {icon}
        </span>
      ) : null}
      {roomLabel ? (
        <span className="text-eyebrow font-mono opacity-70">{roomLabel} ·</span>
      ) : null}
      {children}
    </span>
  );
}
