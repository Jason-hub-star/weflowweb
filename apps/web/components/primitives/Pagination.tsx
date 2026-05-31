export function Pagination({
  page,
  total,
  hrefFor,
}: {
  page: number;
  total: number;
  hrefFor: (p: number) => string;
}) {
  const pages: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(total, start + 4);
  for (let i = start; i <= end; i++) pages.push(i);

  const linkCls =
    'rounded-md border-line bg-surface text-small text-muted hover:border-accent hover:text-accent inline-flex h-9 min-w-9 items-center justify-center border px-3 transition-colors';
  const activeCls = 'rounded-md border-accent bg-accent text-bg text-small inline-flex h-9 min-w-9 items-center justify-center border px-3 font-medium';
  const disabledCls = 'rounded-md border-line text-muted/50 inline-flex h-9 min-w-9 cursor-not-allowed items-center justify-center border px-3 text-small';

  return (
    <nav aria-label="pagination">
      <ul className="flex flex-wrap items-center gap-1.5">
        <li>
          {page > 1 ? (
            <a href={hrefFor(page - 1)} className={linkCls} aria-label="이전">
              ←
            </a>
          ) : (
            <span className={disabledCls} aria-hidden>
              ←
            </span>
          )}
        </li>
        {pages.map((p) => (
          <li key={p}>
            <a
              href={hrefFor(p)}
              aria-current={p === page ? 'page' : undefined}
              className={p === page ? activeCls : linkCls}
            >
              {p}
            </a>
          </li>
        ))}
        <li>
          {page < total ? (
            <a href={hrefFor(page + 1)} className={linkCls} aria-label="다음">
              →
            </a>
          ) : (
            <span className={disabledCls} aria-hidden>
              →
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
