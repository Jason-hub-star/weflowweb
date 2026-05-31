'use client';

import { useCallback, useEffect, useId, useMemo, useRef } from 'react';
import type { ReviewItem } from '@/lib/content/schemas';

type ReviewModalProps = {
  open: boolean;
  reviews: ReviewItem[];
  index: number;
  onIndexChange: (next: number) => void;
  onClose: () => void;
};

/**
 * ReviewModal — 후기 상세 모달.
 * - ESC + backdrop click 으로 닫힘
 * - Tab 순환 focus trap
 * - 화살표 좌/우로 prev/next carousel
 * - 우측에 별점 분포 mini chart (전체 리뷰 기준)
 *
 * 영상 후기(comingSoon)는 모달 열기 대상이 아니라 부모에서 직접 ComingSoonChip 처리.
 */
export function ReviewModal({ open, reviews, index, onIndexChange, onClose }: ReviewModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const total = reviews.length;
  const review = reviews[index];

  const distribution = useMemo(() => buildDistribution(reviews), [reviews]);

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    onIndexChange((index - 1 + total) % total);
  }, [index, total, onIndexChange]);

  const handleNext = useCallback(() => {
    if (total === 0) return;
    onIndexChange((index + 1) % total);
  }, [index, total, onIndexChange]);

  useEffect(() => {
    if (!open) return;
    restoreFocusRef.current = (document.activeElement as HTMLElement) ?? null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const firstFocusable = dialogRef.current?.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    firstFocusable?.focus();

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      } else if (e.key === 'Tab' && dialogRef.current) {
        trapFocus(e, dialogRef.current);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = prevOverflow;
      restoreFocusRef.current?.focus?.();
    };
  }, [open, onClose, handlePrev, handleNext]);

  if (!open || !review) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
    >
      <button
        type="button"
        aria-label="모달 닫기"
        onClick={onClose}
        className="bg-text/50 absolute inset-0 backdrop-blur-sm"
      />
      <div
        ref={dialogRef}
        className="border-line bg-surface relative flex max-h-[90vh] w-full max-w-3xl flex-col overflow-y-auto rounded-lg border shadow-2xl"
      >
        <header className="border-line flex items-center justify-between gap-4 border-b px-6 py-4">
          <h3 id={titleId} className="text-h3 ko-heading text-text">
            {review.name} · {review.biz}
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="모달 닫기"
            className="text-muted hover:bg-surface-soft hover:text-text -mr-2 grid h-9 w-9 place-items-center rounded-full"
          >
            <span aria-hidden className="text-h3 leading-none">
              ×
            </span>
          </button>
        </header>

        <div className="grid gap-6 px-6 py-6 md:grid-cols-[1.4fr_1fr]">
          <div>
            <RatingRow rating={review.rating} />
            {review.bizType ? (
              <p className="text-eyebrow text-muted mt-3 font-mono">#{review.bizType}</p>
            ) : null}
            <blockquote className="text-body text-text ko-relaxed mt-5 break-keep">
              &ldquo;{review.body}&rdquo;
            </blockquote>
            {review.result ? (
              <p className="text-small text-accent-strong mt-5 font-medium">→ {review.result}</p>
            ) : null}
            {review.date ? (
              <p className="text-small text-muted mt-2 font-mono">{review.date}</p>
            ) : null}
          </div>

          <aside aria-label="별점 분포" className="border-line bg-surface-soft rounded-md border p-5">
            <p className="text-eyebrow text-muted font-mono">RATING DISTRIBUTION</p>
            <ul className="mt-4 space-y-2">
              {distribution.map((d) => {
                const pct = total === 0 ? 0 : Math.round((d.count / total) * 100);
                return (
                  <li key={d.bucket} className="flex items-center gap-2">
                    <span className="text-small text-muted w-10 font-mono">{d.bucket}★</span>
                    <span className="bg-line/40 relative h-2 flex-1 overflow-hidden rounded-full">
                      <span
                        className="bg-accent absolute inset-y-0 left-0 rounded-full transition-all motion-safe:duration-300"
                        style={{ width: `${pct}%` }}
                      />
                    </span>
                    <span className="text-small text-muted w-9 text-right font-mono tabular-nums">
                      {d.count}
                    </span>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>

        <footer className="border-line flex items-center justify-between gap-4 border-t px-6 py-4">
          <button
            type="button"
            onClick={handlePrev}
            className="text-small text-muted hover:text-accent inline-flex items-center gap-1 font-medium"
          >
            ← 이전 후기
          </button>
          <span className="text-eyebrow text-muted font-mono tabular-nums">
            {index + 1} / {total}
          </span>
          <button
            type="button"
            onClick={handleNext}
            className="text-small text-muted hover:text-accent inline-flex items-center gap-1 font-medium"
          >
            다음 후기 →
          </button>
        </footer>
      </div>
    </div>
  );
}

function RatingRow({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.25 && rating % 1 < 0.75;
  return (
    <p className="text-accent text-h2 font-mono leading-none" aria-label={`별점 ${rating}/5`}>
      {'★'.repeat(full)}
      {half ? '☆' : ''}
      <span className="text-muted text-small ml-2 font-sans">{rating.toFixed(1)} / 5</span>
    </p>
  );
}

function buildDistribution(reviews: ReviewItem[]) {
  const buckets: Record<string, number> = { '5': 0, '4': 0, '3': 0, '2': 0, '1': 0 };
  for (const r of reviews) {
    const rounded = Math.max(1, Math.min(5, Math.round(r.rating)));
    buckets[String(rounded)] = (buckets[String(rounded)] ?? 0) + 1;
  }
  return (['5', '4', '3', '2', '1'] as const).map((bucket) => ({
    bucket,
    count: buckets[bucket] ?? 0,
  }));
}

function trapFocus(e: KeyboardEvent, container: HTMLElement) {
  const focusables = Array.from(
    container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  );
  const first = focusables[0];
  const last = focusables[focusables.length - 1];
  if (!first || !last) return;
  const active = document.activeElement as HTMLElement | null;
  if (e.shiftKey && active === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && active === last) {
    e.preventDefault();
    first.focus();
  }
}
