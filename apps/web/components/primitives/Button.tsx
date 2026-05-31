import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const VARIANT: Record<Variant, string> = {
  primary: 'bg-accent text-bg hover:bg-accent-strong',
  secondary: 'border border-line text-text hover:border-accent hover:text-accent bg-transparent',
  ghost: 'text-text hover:text-accent bg-transparent',
};

const SIZE: Record<Size, string> = {
  sm: 'px-4 py-2 text-small',
  md: 'px-6 py-3 text-body',
  lg: 'px-7 py-3.5 text-body',
};

const BASE =
  'rounded-pill font-medium transition-colors inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed';

type BaseProps = { variant?: Variant; size?: Size; children: ReactNode; className?: string };

export function Button({
  variant = 'primary',
  size = 'md',
  href,
  className,
  children,
  ...rest
}: BaseProps &
  (
    | ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>)
  )) {
  const cn = [BASE, VARIANT[variant], SIZE[size], className].filter(Boolean).join(' ');
  if (href !== undefined) {
    return (
      <a href={href} className={cn} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  return (
    <button className={cn} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
