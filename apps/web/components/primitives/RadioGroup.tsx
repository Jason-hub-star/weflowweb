'use client';

import { useId } from 'react';

export type RadioOption = { value: string; label: string };

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  ariaLabel,
  className,
}: {
  name: string;
  options: RadioOption[];
  value: string | null;
  onChange: (v: string) => void;
  ariaLabel: string;
  className?: string;
}) {
  const groupId = useId();
  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className={['flex flex-col gap-2', className].filter(Boolean).join(' ')}
    >
      {options.map((opt) => {
        const checked = value === opt.value;
        const optId = `${groupId}-${opt.value}`;
        return (
          <label
            key={opt.value}
            htmlFor={optId}
            className={[
              'border-line bg-surface hover:border-accent flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors',
              checked ? 'border-accent ring-accent/20 ring-2' : '',
            ].join(' ')}
          >
            <input
              id={optId}
              type="radio"
              name={name}
              value={opt.value}
              checked={checked}
              onChange={() => onChange(opt.value)}
              className="accent-accent h-4 w-4"
            />
            <span className="text-body text-text ko-relaxed break-keep">{opt.label}</span>
          </label>
        );
      })}
    </div>
  );
}
