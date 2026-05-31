import type { InputHTMLAttributes, ReactNode } from 'react';

export function Input({
  label,
  hint,
  error,
  id,
  className,
  ...rest
}: {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>) {
  const inputId = id ?? `in-${rest.name ?? 'field'}`;
  const hintId = hint || error ? `${inputId}-hint` : undefined;
  return (
    <div className="grid gap-1.5">
      {label ? (
        <label htmlFor={inputId} className="text-small text-text font-medium">
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        aria-describedby={hintId}
        aria-invalid={error ? true : undefined}
        className={[
          'rounded-md border-line bg-surface text-text placeholder:text-muted focus:border-accent focus:ring-accent-soft border px-3.5 py-2.5 text-body outline-none focus:ring-2',
          error ? 'border-error' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...rest}
      />
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
