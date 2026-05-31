import type { ReactNode, SelectHTMLAttributes } from 'react';

export function Select({
  label,
  hint,
  error,
  id,
  className,
  children,
  ...rest
}: {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  children: ReactNode;
} & SelectHTMLAttributes<HTMLSelectElement>) {
  const sid = id ?? `sel-${rest.name ?? 'field'}`;
  const hintId = hint || error ? `${sid}-hint` : undefined;
  return (
    <div className="grid gap-1.5">
      {label ? (
        <label htmlFor={sid} className="text-small text-text font-medium">
          {label}
        </label>
      ) : null}
      <select
        id={sid}
        aria-describedby={hintId}
        aria-invalid={error ? true : undefined}
        className={[
          'rounded-md border-line bg-surface text-text focus:border-accent focus:ring-accent-soft appearance-none border px-3.5 py-2.5 text-body outline-none focus:ring-2',
          error ? 'border-error' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      >
        {children}
      </select>
      {hint && !error ? (
        <p id={hintId} className="text-small text-muted">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={hintId} className="text-small text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
