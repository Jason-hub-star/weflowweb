'use client';

import { motion, useReducedMotion } from 'framer-motion';

/**
 * Stagger Text Reveal — text를 word(기본) 또는 char로 split하고 한 단위씩 fade-up.
 * viewport 진입 시 한 번 재생.
 *
 * reduced-motion: 즉시 fully visible.
 *
 * @example
 * <h2 className="text-h1"><StaggerReveal text="외주를 맡겼는데도 내가 계속 챙겨야 하는 일을 줄입니다" /></h2>
 * <StaggerReveal text="WEFLOW" split="char" stagger={0.05} />
 */
export function StaggerReveal({
  text,
  split = 'word',
  stagger = 0.08,
  duration = 0.5,
  className = '',
}: {
  text: string;
  split?: 'word' | 'char';
  stagger?: number;
  duration?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const units = split === 'word' ? text.split(' ') : Array.from(text);

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ staggerChildren: stagger }}
      aria-label={text}
    >
      {units.map((unit, i) => (
        <motion.span
          key={i}
          aria-hidden
          variants={{
            hidden: { opacity: 0, y: '0.4em' },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration, ease: [0.25, 0.1, 0.25, 1] }}
          className="inline-block"
          style={{ whiteSpace: 'pre' }}
        >
          {unit}
          {split === 'word' && i < units.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
}
