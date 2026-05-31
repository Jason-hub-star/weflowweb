'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * 마스코트 떠다님 — 위아래 + 미세 회전을 무한 반복.
 * Why 섹션 · CTA 옆 · 빈 영역 보조 포인트.
 *
 * @param amplitude y축 진폭(px)
 * @param duration 1 cycle 초
 * @param rotate 회전 각도(deg)
 * @param delay 시작 지연
 */
export function MascotOrbit({
  children,
  amplitude = 12,
  duration = 6,
  rotate = 4,
  delay = 0,
  className,
}: {
  children: ReactNode;
  amplitude?: number;
  duration?: number;
  rotate?: number;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      animate={{
        y: [-amplitude, amplitude, -amplitude],
        rotate: [-rotate, rotate, -rotate],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
