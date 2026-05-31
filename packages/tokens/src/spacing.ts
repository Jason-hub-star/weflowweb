/**
 * WEFLOW Spacing Tokens
 * SSOT: docs/ref/DESIGN-TOKENS.md §3
 */
export const spacing = {
  section: 'clamp(64px, 8vw, 120px)',
  gutter: 'clamp(20px, 4vw, 40px)',
  stack: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '20px',
    5: '32px',
    6: '56px',
  },
} as const;

export type SpacingToken = typeof spacing;
