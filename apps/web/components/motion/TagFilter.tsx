'use client';

/**
 * TagFilter — 카테고리 칩 단일 선택 (controlled)
 *
 * 부모는 RSC, 본 컴포넌트만 'use client'로 격리. 부모에서 useState로 활성값을 관리.
 * cases / reviews / blog / notice / faq 모두 사용.
 */
export function TagFilter({
  options,
  value,
  onChange,
  ariaLabel = '카테고리 필터',
  className,
}: {
  options: string[];
  value: string;
  onChange: (next: string) => void;
  ariaLabel?: string;
  className?: string;
}) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={['flex flex-wrap gap-2', className].filter(Boolean).join(' ')}
    >
      {options.map((opt) => {
        const isActive = opt === value;
        return (
          <button
            key={opt}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt)}
            className={[
              'rounded-pill text-small inline-flex items-center border px-3 py-1 font-mono transition-colors',
              isActive
                ? 'border-accent bg-accent-soft text-accent'
                : 'border-line bg-surface text-muted hover:border-accent hover:text-accent',
            ].join(' ')}
          >
            #{opt}
          </button>
        );
      })}
    </div>
  );
}
