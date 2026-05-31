import type { HTMLAttributes, ReactNode } from 'react';

type Variant = 'flat' | 'raised' | 'glass';

const VARIANT: Record<Variant, string> = {
  flat: 'border-line bg-surface',
  raised: 'border-line bg-surface premium-card',
  glass: 'border-line bg-surface/80 premium-card backdrop-blur-md',
};

export function Card({
  variant = 'flat',
  className,
  children,
  ...rest
}: { variant?: Variant; children: ReactNode } & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={['rounded-md border p-6', VARIANT[variant], className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </div>
  );
}
