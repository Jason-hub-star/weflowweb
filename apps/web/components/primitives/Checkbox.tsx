import type { InputHTMLAttributes, ReactNode } from 'react';

export function Checkbox({
  label,
  id,
  className,
  ...rest
}: { label: ReactNode } & InputHTMLAttributes<HTMLInputElement>) {
  const cid = id ?? `cb-${rest.name ?? 'field'}`;
  return (
    <label
      htmlFor={cid}
      className={['text-small text-text inline-flex cursor-pointer items-center gap-2.5', className]
        .filter(Boolean)
        .join(' ')}
    >
      <input
        id={cid}
        type="checkbox"
        className="border-line bg-surface accent-accent h-4 w-4 rounded border"
        {...rest}
      />
      <span>{label}</span>
    </label>
  );
}
