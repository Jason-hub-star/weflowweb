import type { ReactNode } from 'react';

export function Tag({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
}) {
  const cn = [
    'rounded-pill border-line bg-surface text-small text-muted hover:border-accent hover:text-accent inline-flex items-center border px-3 py-1 font-mono transition-colors',
    className,
  ]
    .filter(Boolean)
    .join(' ');
  if (href) {
    return (
      <a href={href} className={cn}>
        #{children}
      </a>
    );
  }
  return <span className={cn}>#{children}</span>;
}
