'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { SpotlightCard } from '@/components/motion';
import type { HomePage } from '@/lib/content/schemas';

export function HomeWhyCards({ items }: { items: HomePage['why']['items'] }) {
  const reduce = useReducedMotion();

  return (
    <motion.ul
      className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      initial={reduce ? false : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ staggerChildren: 0.08 }}
    >
      {items.map((w) => (
        <motion.li
          key={w.title}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          whileTap={{ scale: 0.98 }}
        >
          <SpotlightCard className="border-line bg-surface relative flex h-full flex-col items-center gap-3 overflow-hidden rounded-md border p-5 text-center active:border-accent">
            <motion.span
              aria-hidden
              className="bg-accent-strong absolute left-0 top-0 h-full w-[3px] origin-top"
              initial={reduce ? false : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
            />
            <span
              aria-hidden
              className="bg-accent text-bg grid h-7 w-7 shrink-0 place-items-center rounded-full text-[0.85rem] font-bold"
            >
              ✓
            </span>
            <div className="mx-auto max-w-[18rem]">
              <h3 className="text-body text-text font-semibold">{w.title}</h3>
              <p className="text-small text-muted ko-relaxed mt-1">{w.body}</p>
            </div>
          </SpotlightCard>
        </motion.li>
      ))}
    </motion.ul>
  );
}
