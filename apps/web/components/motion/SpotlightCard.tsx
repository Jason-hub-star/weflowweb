'use client';

import { useReducedMotion } from 'framer-motion';
import { useRef, useState, type CSSProperties, type ReactNode } from 'react';

/**
 * Spotlight Card — 마우스 위치 따라 카드 표면에 radial-gradient 글로우.
 * CSS variable(--spot-x/--spot-y/--spot-opacity)을 업데이트해 paint만 갱신.
 * 신뢰형(WHY) 섹션처럼 hover 한 카드만 또렷이 강조하고 싶은 그리드에 적합.
 *
 * reduced-motion: 글로우 없이 정적 카드.
 *
 * @example
 * <SpotlightCard className="border-line bg-surface rounded-md border p-5">
 *   ...
 * </SpotlightCard>
 */
export function SpotlightCard({
  children,
  className = '',
  glowColor = 'var(--color-accent, #2563eb)',
  glowSize = 320,
  glowOpacity = 0.18,
}: {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  glowSize?: number;
  glowOpacity?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--spot-x', `${e.clientX - r.left}px`);
    el.style.setProperty('--spot-y', `${e.clientY - r.top}px`);
  };

  const style: CSSProperties = {
    ['--spot-opacity' as string]: active ? glowOpacity : 0,
    backgroundImage: `radial-gradient(${glowSize}px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in oklab, ${glowColor} calc(var(--spot-opacity) * 100%), transparent), transparent 70%)`,
    transition: 'background-color 200ms',
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      style={style}
      className={className}
    >
      {children}
    </div>
  );
}
