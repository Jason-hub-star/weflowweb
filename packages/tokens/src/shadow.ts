/**
 * WEFLOW Shadow Tokens
 * SSOT: docs/ref/DESIGN-TOKENS.md §6
 */
export const shadow = {
  sm: '0 1px 2px rgba(17, 23, 19, 0.04)',
  md: '0 4px 12px rgba(17, 23, 19, 0.06)',
  lg: '0 12px 32px rgba(17, 23, 19, 0.08)',
  hover: '0 6px 16px rgba(32, 180, 134, 0.18)',
} as const;

export type ShadowToken = keyof typeof shadow;
