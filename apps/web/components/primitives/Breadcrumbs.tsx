import { Fragment, type ReactNode } from 'react';

export type Crumb = { label: ReactNode; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="text-small text-muted flex flex-wrap items-center gap-2">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={i}>
              <li>
                {c.href && !isLast ? (
                  <a href={c.href} className="hover:text-accent transition-colors">
                    {c.label}
                  </a>
                ) : (
                  <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'text-text' : ''}>
                    {c.label}
                  </span>
                )}
              </li>
              {!isLast ? (
                <li aria-hidden className="text-muted">
                  /
                </li>
              ) : null}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
