/**
 * WEFLOW Border Radius Tokens
 * SSOT: docs/ref/DESIGN-TOKENS.md §4
 */
export const radius = {
  sm: '8px',
  md: '12px',
  lg: '20px',
  pill: '9999px',
} as const;

export type RadiusToken = keyof typeof radius;
