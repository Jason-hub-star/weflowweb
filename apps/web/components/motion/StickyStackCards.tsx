'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { Children, useRef, type ReactNode } from 'react';

/**
 * Sticky Stack Cards — 카드가 sticky로 위에 쌓이며 뒤 카드는 작아짐.
 * children 각각이 한 카드. 각 카드 자신만의 sticky frame.
 *
 * reduced-motion: 정적 vertical stack.
 *
 * @example
 * <StickyStackCards>
 *   {items.map(item => <ServiceCard key={item.id} {...item} />)}
 * </StickyStackCards>
 */
export function StickyStackCards({
  children,
  topOffset = '6rem',
  scaleStep = 0.04,
  className = '',
}: {
  children: ReactNode;
  topOffset?: string;
  scaleStep?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const items = Children.toArray(children);

  if (reduce) {
    return <div className={`flex flex-col gap-6 ${className}`}>{items}</div>;
  }

  return (
    <div className={className}>
      {items.map((child, i) => (
        <StackFrame
          key={i}
          index={i}
          total={items.length}
          topOffset={topOffset}
          scaleStep={scaleStep}
        >
          {child}
        </StackFrame>
      ))}
    </div>
  );
}

function StackFrame({
  children,
  index,
  total,
  topOffset,
  scaleStep,
}: {
  children: ReactNode;
  index: number;
  total: number;
  topOffset: string;
  scaleStep: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress: entryProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });
  const { scrollYProgress: stickyProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const distFromEnd = total - 1 - index;
  const finalScale = Math.max(0.82, 1 - distFromEnd * scaleStep);
  const scale = useTransform(entryProgress, [0, 1], [1, finalScale]);
  const opacity = useTransform(
    stickyProgress,
    [0, 0.7, 1],
    distFromEnd > 0 ? [1, 1, 0] : [1, 1, 1],
  );

  return (
    <div
      ref={ref}
      style={{ top: topOffset, paddingTop: `${index * 0.5}rem`, zIndex: index + 1 }}
      className="sticky"
    >
      <motion.div style={{ scale, opacity }} className="origin-top">
        {children}
      </motion.div>
    </div>
  );
}
