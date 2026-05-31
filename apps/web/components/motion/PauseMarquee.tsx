'use client';

import { useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * Hover-to-pause 가로 Marquee — children이 좌→우로 무한 흐르고 hover 시 일시정지.
 * children은 한 사이클. 자동으로 2배 복제 (seamless loop).
 *
 * 사용 keyframe: `weflow-marquee-x` (globals.css 정의).
 * reduced-motion: 정적 가로 스크롤 컨테이너.
 *
 * @example
 * <PauseMarquee speed={32}>
 *   {reviews.map(r => <ReviewCard key={r.id} {...r} />)}
 * </PauseMarquee>
 */
export function PauseMarquee({
  children,
  speed = 32,
  className = '',
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div className={`flex gap-6 overflow-x-auto ${className}`}>{children}</div>
    );
  }

  return (
    <div className={`group relative overflow-hidden ${className}`}>
      <div className="from-bg pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent" />
      <div className="from-bg pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent" />
      <div
        className="flex w-max gap-6 group-hover:[animation-play-state:paused]"
        style={{
          animation: `weflow-marquee-x ${speed}s linear infinite`,
          willChange: 'transform',
        }}
      >
        <div className="flex shrink-0 gap-6">{children}</div>
        <div aria-hidden className="flex shrink-0 gap-6">
          {children}
        </div>
      </div>
    </div>
  );
}
