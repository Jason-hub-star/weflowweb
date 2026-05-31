'use client';

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { useRef, type ReactNode } from 'react';

/**
 * Sticky Horizontal Pin Scroll — 섹션을 sticky로 고정하고 콘텐츠가 가로로 이동.
 * 컨테이너 height 만큼 페이지 스크롤을 가로 translateX로 변환.
 *
 * reduced-motion: 가로 스크롤 비활성, 정적 가로 flex.
 *
 * @example
 * <HorizontalPinScroll travel="-65%" height="320vh">
 *   <Card /> <Card /> <Card />
 * </HorizontalPinScroll>
 */
export function HorizontalPinScroll({
  children,
  height = '300vh',
  travel = '-65%',
  className = '',
}: {
  children: ReactNode;
  height?: string;
  travel?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });
  const x = useTransform(scrollYProgress, [0, 1], ['0%', travel]);

  if (reduce) {
    return (
      <div className={`overflow-x-auto ${className}`}>
        <div className="flex w-max gap-6">{children}</div>
      </div>
    );
  }

  return (
    <section ref={ref} style={{ height }} className={`relative ${className}`}>
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex w-max gap-6 will-change-transform">
          {children}
        </motion.div>
      </div>
    </section>
  );
}
