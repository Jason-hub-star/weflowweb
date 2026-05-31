/**
 * WEFLOW Typography Tokens
 * SSOT: docs/ref/DESIGN-TOKENS.md §2
 * clamp 기반 반응형 스케일 + 한국어 라인 유틸
 */
export const typography = {
  family: {
    sans: 'Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif',
    mono: 'Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace',
  },
  scale: {
    display: 'clamp(2.4rem, 6vw, 4.8rem)',
    h1: 'clamp(2.0rem, 4.4vw, 3.2rem)',
    h2: 'clamp(1.6rem, 3.2vw, 2.4rem)',
    h3: 'clamp(1.25rem, 2.2vw, 1.6rem)',
    body: 'clamp(1.0rem, 1.1vw, 1.0625rem)',
    small: '0.875rem',
    eyebrow: '0.8125rem',
  },
  lineHeight: {
    display: 1.04,
    h1: 1.14,
    h2: 1.2,
    h3: 1.28,
    body: 1.6,
    small: 1.5,
  },
  letterSpacing: {
    display: '-0.02em',
    heading: '-0.015em',
    h2: '-0.01em',
    eyebrow: '0.08em',
  },
  korean: {
    tight: { lineHeight: 1.24, wordBreak: 'keep-all' as const },
    relaxed: { lineHeight: 1.72, wordBreak: 'keep-all' as const },
    heading: { letterSpacing: '-0.01em', wordBreak: 'keep-all' as const },
  },
} as const;

export type TypographyToken = typeof typography;
