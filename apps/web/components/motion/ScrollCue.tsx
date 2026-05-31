'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useLenisVelocity } from './useLenisVelocity';

/**
 * 스크롤 안내 cue — Lenis/native velocity를 감지해 사용자가 스크롤 시작하면 페이드.
 * hero 하단에 배치.
 */
export function ScrollCue({
  label = '아래로',
  className = '',
}: {
  label?: string;
  className?: string;
}) {
  const v = useLenisVelocity();
  const reduce = useReducedMotion();
  const visible = Math.abs(v) < 1; // 거의 멈춤 상태일 때만 보임

  return (
    <motion.div
      aria-hidden
      animate={reduce ? { opacity: 1 } : { opacity: visible ? 0.7 : 0, y: visible ? 0 : -6 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`flex flex-col items-center gap-1 ${className}`}
    >
      <span className="text-eyebrow text-current">{label}</span>
      <motion.svg
        width="22"
        height="22"
        viewBox="0 0 22 22"
        initial={{ y: 0 }}
        animate={reduce ? { y: 0 } : { y: 6 }}
        transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
      >
        <path
          d="M5 9l6 6 6-6"
          stroke="currentColor"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </motion.div>
  );
}
