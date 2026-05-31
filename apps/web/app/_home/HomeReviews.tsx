'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ComingSoonChip, SectionBadge } from '@/components/primitives';
import { PauseMarquee, ReviewModal, TagFilter } from '@/components/motion';
import type { HomePage, ReviewItem } from '@/lib/content/schemas';

/**
 * HomeReviews — 후기 인터랙티브 섹션.
 *
 * 인터랙션:
 *  - 업종 필터칩 → PauseMarquee 동적 필터링
 *  - 카드 클릭 → ReviewModal (focus trap + ESC + 별점 분포 chart + carousel)
 *  - 비디오 후기(comingSoon) 카드는 모달 대신 ComingSoonChip 노출
 */
export function HomeReviews({ data }: { data: HomePage['reviews'] }) {
  const filters = useMemo(
    () => (data.filters.length > 0 ? data.filters : ['전체']),
    [data.filters],
  );
  const [active, setActive] = useState<string>(filters[0] ?? '전체');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const visible = useMemo<ReviewItem[]>(
    () =>
      active === filters[0]
        ? data.items
        : data.items.filter((r) => r.bizType === active),
    [active, filters, data.items],
  );

  const modalReviews = visible.filter((r) => !r.comingSoon?.enabled);

  return (
    <section id="reviews" className="border-line border-t">
      <div className="mx-auto max-w-7xl px-[var(--space-gutter)] py-[var(--space-section)]">
        <header className="mx-auto max-w-2xl text-center">
          <SectionBadge icon="★" tone="accent">
            {data.eyebrow}
          </SectionBadge>
          <h2 className="text-h1 ko-heading mt-5">{data.title}</h2>
        </header>

        {filters.length > 1 ? (
          <div className="mt-8">
            <TagFilter
              options={filters}
              value={active}
              onChange={setActive}
              ariaLabel="후기 업종 필터"
              className="justify-center"
            />
          </div>
        ) : null}

        <div className="mt-10">
          <PauseMarquee speed={50}>
            {visible.map((r) => (
              <ReviewCard
                key={r.id}
                review={r}
                onOpen={() => {
                  const idx = modalReviews.findIndex((m) => m.id === r.id);
                  if (idx >= 0) setOpenIndex(idx);
                }}
              />
            ))}
          </PauseMarquee>
        </div>

        {data.linkHref && data.linkLabel ? (
          <div className="mt-10 text-center">
            <Link href={data.linkHref} className="text-small text-accent font-medium">
              {data.linkLabel}
            </Link>
          </div>
        ) : null}
      </div>

      <ReviewModal
        open={openIndex !== null}
        reviews={modalReviews}
        index={openIndex ?? 0}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </section>
  );
}

function ReviewCard({
  review,
  onOpen,
}: {
  review: ReviewItem;
  onOpen: () => void;
}) {
  if (review.comingSoon?.enabled) {
    return <VideoTeaserCard review={review} />;
  }
  return (
    <button
      type="button"
      onClick={onOpen}
      className="border-line bg-surface hover:border-accent focus-visible:border-accent focus-visible:outline-none flex h-full w-80 shrink-0 cursor-pointer flex-col rounded-md border p-6 text-left transition-all hover:-translate-y-0.5 hover:shadow-lg"
    >
      <span
        className="text-accent text-h3 font-mono leading-none"
        aria-label={`별점 ${review.rating}/5`}
      >
        {'★'.repeat(Math.floor(review.rating))}
        {review.rating % 1 ? '☆' : ''}
      </span>
      <p className="text-body text-text ko-relaxed mt-4 flex-1 line-clamp-4">
        &ldquo;{review.body}&rdquo;
      </p>
      <footer className="border-line mt-5 flex items-center gap-3 border-t pt-4">
        <span className="bg-accent-soft text-accent grid h-9 w-9 place-items-center rounded-full font-semibold">
          {review.name.charAt(0)}
        </span>
        <div className="text-small flex-1">
          <p className="text-text font-medium">{review.name}</p>
          <p className="text-muted">{review.biz}</p>
        </div>
        <span className="text-eyebrow text-muted font-mono">자세히 →</span>
      </footer>
    </button>
  );
}

function VideoTeaserCard({ review }: { review: ReviewItem }) {
  return (
    <article className="border-accent/40 bg-accent-soft/30 flex h-full w-80 shrink-0 flex-col rounded-md border-2 border-dashed p-6">
      <div className="bg-text/90 relative grid h-28 place-items-center overflow-hidden rounded-md">
        <span aria-hidden className="grid h-12 w-12 place-items-center rounded-full bg-surface">
          <span className="text-h3 text-text leading-none">▶</span>
        </span>
      </div>
      <p className="text-body text-text ko-relaxed mt-4 flex-1">
        &ldquo;{review.body}&rdquo;
      </p>
      <div className="mt-5">
        <ComingSoonChip
          label={review.comingSoon?.label ?? '비디오 후기 곧 공개'}
          description={review.comingSoon?.description}
          href={review.comingSoon?.href}
        />
      </div>
    </article>
  );
}
