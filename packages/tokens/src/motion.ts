/**
 * WEFLOW Motion Tokens
 * SSOT: docs/ref/DESIGN-TOKENS.md §5
 * fabric-smooth easing + 표준 duration + stagger
 */
export const motion = {
  ease: [0.25, 0.1, 0.25, 1] as const,
  easeCss: 'cubic-bezier(0.25, 0.1, 0.25, 1)' as const,
  duration: {
    enter: 0.7,
    hover: 0.18,
    exit: 0.4,
  },
  stagger: 0.12,
} as const;

/** Framer Motion reveal variants — Section 진입 표준 */
export const reveal = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '0px 0px -10% 0px' },
  transition: { duration: motion.duration.enter, ease: motion.ease },
} as const;

/** Framer Motion stagger children — Grid reveal 표준 */
export const staggerChildren = {
  initial: {},
  whileInView: {},
  viewport: { once: true },
  transition: { staggerChildren: motion.stagger },
} as const;

/** Hover lift 표준 */
export const hoverLift = {
  whileHover: { y: -2 },
  whileTap: { scale: 0.98 },
  transition: { duration: motion.duration.hover },
} as const;

export type MotionToken = typeof motion;
