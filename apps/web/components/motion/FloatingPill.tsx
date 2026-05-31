'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

/**
 * 떠다니는 알약 — devfive scale+blur depth 시그니처 재해석.
 * 무한 cycle로 z-depth 일루전, hover시 정지·확대.
 *
 * 사용처: 키워드·태그·기술 풍선 등.
 *
 * @param depth 0(가장 뒤) ~ 1(가장 앞)
 * @param duration 1 cycle 초
 * @param delay 시작 지연
 */
export function FloatingPill({
  children,
  depth = 0.5,
  duration = 7,
  delay = 0,
  className = '',
  style,
}: {
  children: ReactNode;
  depth?: number;
  duration?: number;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();

  // depth에 따라 base scale·opacity·blur 결정
  const baseScale = 0.78 + depth * 0.22; // 0.78~1.0
  const baseOpacity = 0.55 + depth * 0.45; // 0.55~1.0
  const baseBlur = (1 - depth) * 6; // 0~6px

  if (reduce) {
    return (
      <div
        className={className}
        style={{ ...style, transform: `scale(${baseScale})`, opacity: baseOpacity }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      style={style}
      initial={{
        scale: baseScale,
        opacity: baseOpacity,
        filter: `blur(${baseBlur}px)`,
      }}
      animate={{
        scale: [baseScale, baseScale + 0.06, baseScale],
        opacity: [baseOpacity, Math.min(1, baseOpacity + 0.2), baseOpacity],
        filter: [
          `blur(${baseBlur}px)`,
          `blur(${Math.max(0, baseBlur - 2)}px)`,
          `blur(${baseBlur}px)`,
        ],
        y: [0, -8, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      whileHover={{
        scale: 1.08,
        opacity: 1,
        filter: 'blur(0px)',
        transition: { duration: 0.3 },
      }}
    >
      {children}
    </motion.div>
  );
}
