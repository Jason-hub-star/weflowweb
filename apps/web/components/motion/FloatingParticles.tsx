'use client';

import type { CSSProperties, ReactNode } from 'react';
import { FloatingPill } from './FloatingPill';

/**
 * 떠다니는 입자 다중 — Hero B+ 키워드 6 + parallax 가독성 보강.
 * FloatingPill 하나당 absolute positioned, depth/duration/delay 각자.
 *
 * pointer-events-none 컨테이너 안에 배치.
 */

export type Particle = {
  id: string | number;
  content: ReactNode;
  style?: CSSProperties;
  depth?: number;
  duration?: number;
  delay?: number;
};

export function FloatingParticles({
  particles,
  className,
}: {
  particles: Particle[];
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={['pointer-events-none absolute inset-0', className].filter(Boolean).join(' ')}
    >
      {particles.map((p) => (
        <FloatingPill
          key={p.id}
          depth={p.depth ?? 0.5}
          duration={p.duration ?? 7}
          delay={p.delay ?? 0}
          className="absolute"
          style={p.style ?? {}}
        >
          {p.content}
        </FloatingPill>
      ))}
    </div>
  );
}
