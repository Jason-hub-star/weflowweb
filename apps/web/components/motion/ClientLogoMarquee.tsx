'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * 클라이언트 로고 좌우 흐름 띠 — devfive 신뢰 섹션 패턴.
 * items를 2배 복제해 seamless loop, framer-motion 무한 x: 0% → -50%.
 *
 * 사용처: 신뢰 클라이언트, 파트너, 사용 기술 스택.
 */

export type LogoItem = {
  id: string | number;
  content: ReactNode;
};

export function ClientLogoMarquee({
  items,
  speed = 30,
  className,
}: {
  items: LogoItem[];
  speed?: number; // seconds per loop
  className?: string;
}) {
  const reduce = useReducedMotion();
  const seq = [...items, ...items];
  return (
    <div
      className={['relative overflow-hidden', className].filter(Boolean).join(' ')}
      aria-label="파트너 로고"
    >
      {/* 좌우 페이드 마스크 */}
      <div className="from-bg pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r to-transparent" />
      <div className="from-bg pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l to-transparent" />

      <motion.div
        className="flex w-max items-center gap-12"
        animate={reduce ? undefined : { x: ['0%', '-50%'] }}
        transition={
          reduce
            ? undefined
            : { duration: speed, ease: 'linear', repeat: Infinity, repeatType: 'loop' }
        }
      >
        {seq.map((it, i) => (
          <div key={`${it.id}-${i}`} className="shrink-0">
            {it.content}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
