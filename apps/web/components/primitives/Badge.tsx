import type { ReactNode } from 'react';

type Tone = 'accent' | 'amber' | 'muted' | 'success' | 'warning' | 'error';

const TONE: Record<Tone, string> = {
  accent: 'bg-accent-soft text-accent',
  amber: 'bg-amber-soft text-amber',
  muted: 'border-line text-muted border',
  success: 'bg-accent-soft text-accent',
  warning: 'bg-amber-soft text-amber',
  error: 'bg-error/15 text-error',
};

export function Badge({
  tone = 'accent',
  children,
  className,
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={[
        'rounded-pill text-small inline-flex items-center px-2.5 py-0.5 font-medium',
        TONE[tone],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
}
