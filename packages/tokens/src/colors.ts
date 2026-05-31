/**
 * WEFLOW Color Tokens
 * SSOT: docs/ref/DESIGN-TOKENS.md §1
 * 시안 1 (ivory + mint) 기본. /mockup/[id]로 2·3 비교.
 */
export const colors = {
  bg: 'var(--bg)',
  surface: 'var(--surface)',
  surfaceSoft: 'var(--surface-soft)',
  text: 'var(--text)',
  muted: 'var(--muted)',
  line: 'var(--line)',
  accent: 'var(--accent)',
  accentStrong: 'var(--accent-strong)',
  accentSoft: 'var(--accent-soft)',
  amber: 'var(--amber)',
  success: 'var(--success)',
  warning: 'var(--warning)',
  error: 'var(--error)',
} as const;

export type ColorToken = keyof typeof colors;
