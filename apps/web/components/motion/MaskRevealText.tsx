'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { CSSProperties } from 'react';

/**
 * Gradient mask reveal 텍스트 — 좌→우로 색이 드러남.
 * 헤드라인·서브카피에 적용.
 *
 * 기술: background-clip: text + linear-gradient + background-size·position 애니메이션.
 * reduced-motion에서는 즉시 fully visible.
 */
export function MaskRevealText({
  children,
  delay = 0,
  duration = 1.4,
  from = 'var(--accent)',
  to = 'var(--text)',
  className = '',
}: {
  children: string;
  delay?: number;
  duration?: number;
  from?: string;
  to?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();

  const style: CSSProperties = {
    backgroundImage: `linear-gradient(90deg, ${to} 0%, ${to} 50%, ${from} 50%, ${from} 100%)`,
    backgroundSize: '200% 100%',
    backgroundPosition: reduce ? '0% 0%' : '100% 0%',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
    WebkitTextFillColor: 'transparent',
    display: 'inline-block',
  };

  if (reduce) {
    return (
      <span className={className} style={{ ...style, color: to, WebkitTextFillColor: to }}>
        {children}
      </span>
    );
  }

  return (
    <motion.span
      className={className}
      style={style}
      initial={{ backgroundPosition: '100% 0%' }}
      whileInView={{ backgroundPosition: '0% 0%' }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.span>
  );
}
