import type { ReactNode, TextareaHTMLAttributes } from 'react';

export function Textarea({
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
} & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const ta = id ?? `ta-${rest.name ?? 'field'}`;
  const hintId = hint || error ? `${ta}-hint` : undefined;
  return (
    <div className="grid gap-1.5">
      {label ? (
        <label htmlFor={ta} className="text-small text-text font-medium">
          {label}
        </label>
      ) : null}
      <textarea
        id={ta}
        aria-describedby={hintId}
        aria-invalid={error ? true : undefined}
        className={[
          'rounded-md border-line bg-surface text-text placeholder:text-muted focus:border-accent focus:ring-accent-soft min-h-28 border px-3.5 py-2.5 text-body outline-none focus:ring-2',
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
