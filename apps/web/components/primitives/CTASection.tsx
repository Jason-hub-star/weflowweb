import type { ReactNode } from 'react';
import { Button } from './Button';

export function CTASection({
  eyebrow,
  title,
  sub,
  primary,
  secondary,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="brand-depth-section border-line border-t">
      <div className="mx-auto max-w-4xl px-[var(--space-gutter)] py-[var(--space-section)] text-center">
        {eyebrow ? <p className="text-eyebrow text-accent">{eyebrow}</p> : null}
        <h2 className="text-h1 ko-heading mt-3">{title}</h2>
        {sub ? <p className="text-body text-muted ko-relaxed mt-5">{sub}</p> : null}
        {(primary || secondary) && (
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            {primary ? (
              <Button href={primary.href} size="lg">
                {primary.label} →
              </Button>
            ) : null}
            {secondary ? (
              <Button href={secondary.href} variant="secondary" size="lg">
                {secondary.label}
              </Button>
            ) : null}
          </div>
        )}
      </div>
    </section>
  );
}
