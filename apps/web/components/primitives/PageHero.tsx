import type { ReactNode } from 'react';

export function PageHero({
  eyebrow,
  title,
  sub,
  children,
  align = 'left',
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  children?: ReactNode;
  align?: 'left' | 'center';
}) {
  const isCenter = align === 'center';
  return (
    <section
      className={[
        'brand-depth-section border-line border-b',
        isCenter ? 'text-center' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        className={[
          'mx-auto max-w-5xl px-[var(--space-gutter)] py-[var(--space-section)]',
          isCenter ? 'flex flex-col items-center' : '',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {eyebrow ? <p className="text-eyebrow text-accent">{eyebrow}</p> : null}
        <h1 className="text-display ko-heading mt-4">{title}</h1>
        {sub ? (
          <p
            className={[
              'text-body text-muted ko-relaxed mt-5 max-w-2xl',
              isCenter ? 'mx-auto' : '',
            ]
              .filter(Boolean)
              .join(' ')}
          >
            {sub}
          </p>
        ) : null}
        {children ? <div className="mt-9">{children}</div> : null}
      </div>
    </section>
  );
}
