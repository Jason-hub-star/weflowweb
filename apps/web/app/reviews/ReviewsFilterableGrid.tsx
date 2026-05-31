'use client';

import { useMemo, useState } from 'react';
import { FloatingParticles, ReviewModal, TagFilter, type Particle } from '@/components/motion';
import type { ReviewsPage } from '@/lib/content/schemas';
import { ReviewCard } from './ReviewCard';

type SortKey = 'newest' | 'rating' | 'result';

const SORT_LABELS: Record<SortKey, string> = {
  newest: '최신순',
  rating: '별점순',
  result: '결과순',
};

const BACKGROUND_PARTICLES: Particle[] = Array.from({ length: 10 }).map((_, i) => ({
  id: `p-${i}`,
  content: (
    <span className="bg-accent/40 block h-1.5 w-1.5 rounded-full" />
  ),
  depth: 0.3 + (i % 3) * 0.2,
  duration: 8 + (i % 4),
  delay: -((i * 0.7) % 5),
  style: {
    left: `${(i * 11 + 7) % 95}%`,
    top: `${(i * 17 + 12) % 85}%`,
  },
}));

export function ReviewsFilterableGrid({
  filters,
  items,
}: {
  filters: string[];
  items: ReviewsPage['items'];
}) {
  const [active, setActive] = useState<string>(filters[0] ?? '전체');
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('newest');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = items.filter((r) => {
      const tagMatch = active === filters[0] || r.bizType === active;
      if (!tagMatch) return false;
      if (!q) return true;
      return (
        r.body.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q) ||
        r.biz.toLowerCase().includes(q)
      );
    });
    const sorted = [...filtered].sort((a, b) => {
      if (a.comingSoon?.enabled && !b.comingSoon?.enabled) return 1;
      if (!a.comingSoon?.enabled && b.comingSoon?.enabled) return -1;
      if (sort === 'rating') return b.rating - a.rating;
      if (sort === 'result') {
        const an = parseInt(a.result?.replace(/[^\d]/g, '') ?? '0', 10);
        const bn = parseInt(b.result?.replace(/[^\d]/g, '') ?? '0', 10);
        return bn - an;
      }
      // newest
      const ad = a.date ?? '';
      const bd = b.date ?? '';
      return bd.localeCompare(ad);
    });
    return sorted;
  }, [items, active, filters, query, sort]);

  const modalReviews = useMemo(
    () => visible.filter((r) => !r.comingSoon?.enabled),
    [visible],
  );

  return (
    <>
      <section className="border-line relative overflow-hidden border-t">
        <FloatingParticles particles={BACKGROUND_PARTICLES} className="opacity-60" />
        <div className="relative mx-auto max-w-7xl px-[var(--space-gutter)] py-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <SearchInput value={query} onChange={setQuery} />
            <SortToggle value={sort} onChange={setSort} />
          </div>
          <div className="mt-6">
            <TagFilter
              options={filters}
              value={active}
              onChange={setActive}
              ariaLabel="후기 카테고리 필터"
              className="justify-center lg:justify-start"
            />
          </div>
        </div>
      </section>

      <section className="border-line relative overflow-hidden border-t">
        <div
          aria-hidden
          className="bg-accent-soft pointer-events-none absolute -right-32 top-12 h-72 w-72 rounded-full blur-3xl opacity-40"
        />
        <div className="relative mx-auto max-w-7xl px-[var(--space-gutter)] py-[var(--space-section)]">
          {visible.length === 0 ? (
            <p className="text-small text-muted ko-relaxed py-12 text-center">
              조건에 맞는 후기가 아직 없어요.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {visible.map((r, i) => {
                const modalIdx = modalReviews.findIndex((m) => m.id === r.id);
                return (
                  <ReviewCard
                    key={`${r.id}-${active}-${sort}-${query}`}
                    review={r}
                    index={i}
                    onOpen={() => modalIdx >= 0 && setOpenIndex(modalIdx)}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>

      <ReviewModal
        open={openIndex !== null}
        reviews={modalReviews}
        index={openIndex ?? 0}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </>
  );
}

function SearchInput({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="border-line bg-surface focus-within:border-accent focus-within:ring-accent/20 flex w-full items-center gap-2 rounded-pill border px-4 py-2 transition-colors focus-within:ring-2 lg:max-w-md">
      <span aria-hidden className="text-muted text-small">
        ⌕
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="이름·매장·본문 검색"
        aria-label="후기 검색"
        className="text-small text-text placeholder:text-muted/70 flex-1 bg-transparent outline-none"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="검색어 지우기"
          className="text-muted hover:text-text text-small"
        >
          ✕
        </button>
      ) : null}
    </div>
  );
}

function SortToggle({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (s: SortKey) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="후기 정렬"
      className="border-line bg-surface inline-flex shrink-0 rounded-pill border p-1"
    >
      {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => {
        const active = key === value;
        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => onChange(key)}
            className={[
              'text-small rounded-pill px-3 py-1.5 font-mono font-bold transition-colors motion-safe:duration-200',
              active ? 'bg-accent text-surface' : 'text-muted hover:text-text',
            ].join(' ')}
          >
            {SORT_LABELS[key]}
          </button>
        );
      })}
    </div>
  );
}
