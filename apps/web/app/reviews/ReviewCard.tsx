'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { Avatar, Badge, ComingSoonChip, MetricBadge } from '@/components/primitives';
import { TiltCard, useCountupText } from '@/components/motion';
import type { ReviewItem } from '@/lib/content/schemas';

type ReviewCardProps = {
  review: ReviewItem;
  index: number;
  onOpen: () => void;
};

/**
 * ReviewCard — /reviews 그리드 카드.
 *
 * 인터랙션:
 *  - TiltCard 3D 기울기 (maxTilt 6도, 절제)
 *  - 별점에 motion-safe:animate-pulse sparkle 1회
 *  - result 메트릭 (+180%) 카드 마운트 시 0→target 카운트업
 *  - 카드 전체가 button overlay → 모달 트리거
 *  - 진입 stagger animation-delay (index 기반)
 *  - comingSoon 분기: 모달 X, ▶ + ComingSoonChip 표시
 */
export function ReviewCard({ review, index, onOpen }: ReviewCardProps) {
  if (review.comingSoon?.enabled) {
    return <VideoTeaserCard review={review} index={index} />;
  }
  const delayMs = Math.min(400, index * 60);
  return (
    <div
      className="opacity-0 motion-safe:animate-[reviewCardIn_0.55s_ease-out_forwards] motion-reduce:opacity-100"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <TiltCard maxTilt={6} className="h-full">
        <CardBody review={review} onOpen={onOpen} />
      </TiltCard>
    </div>
  );
}

function CardBody({ review, onOpen }: { review: ReviewItem; onOpen: () => void }) {
  const reduce = useReducedMotion();
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setArmed(true), 80);
    return () => clearTimeout(t);
  }, []);

  const resultTarget = armed && review.result ? review.result : (review.result?.replace(/\d+/, '0') ?? '');
  const resultDisplay = useCountupText(resultTarget, reduce ? 0 : 900);

  return (
    <article className="border-line bg-surface premium-card premium-card-hover relative flex h-full flex-col rounded-md border p-6">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${review.name} 후기 상세 보기`}
        className="focus-visible:ring-accent absolute inset-0 z-10 cursor-pointer rounded-md focus-visible:outline-none focus-visible:ring-2"
      />
      <header className="flex items-center justify-between">
        <span aria-hidden className="text-accent text-h3 font-mono leading-none">
          <span className="inline-flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="motion-safe:animate-[starGlint_2.4s_ease-in-out_infinite]"
                style={{ animationDelay: `${i * 0.25}s` }}
              >
                ★
              </span>
            ))}
          </span>
          <span className="sr-only">별점 {review.rating}/5</span>
        </span>
        {review.bizType ? <Badge tone="muted">{review.bizType}</Badge> : null}
      </header>
      <p className="text-body text-text ko-relaxed mt-4 flex-1 break-keep">
        &ldquo;{review.body}&rdquo;
      </p>
      {review.result ? (
        <div className="mt-4">
          <MetricBadge value={resultDisplay} trend="up" />
        </div>
      ) : null}
      <footer className="border-line mt-5 flex items-center gap-3 border-t pt-4">
        <Avatar name={review.name} size="md" />
        <div className="text-small flex-1">
          <p className="text-text font-medium">{review.name}</p>
          <p className="text-muted">{review.biz}</p>
        </div>
        {review.date ? (
          <span className="text-small text-muted font-mono">{review.date}</span>
        ) : null}
      </footer>
    </article>
  );
}

function VideoTeaserCard({ review, index }: { review: ReviewItem; index: number }) {
  const delayMs = Math.min(400, index * 60);
  return (
    <article
      className="border-accent/40 bg-accent-soft/30 opacity-0 motion-safe:animate-[reviewCardIn_0.55s_ease-out_forwards] motion-reduce:opacity-100 flex h-full flex-col rounded-md border-2 border-dashed p-6"
      style={{ animationDelay: `${delayMs}ms` }}
    >
      <div className="bg-text/90 relative grid h-28 place-items-center overflow-hidden rounded-md">
        <span aria-hidden className="grid h-12 w-12 place-items-center rounded-full bg-surface">
          <span className="text-h3 text-text leading-none">▶</span>
        </span>
      </div>
      <p className="text-body text-text ko-relaxed mt-4 flex-1 break-keep">
        &ldquo;{review.body}&rdquo;
      </p>
      <div className="mt-5">
        <ComingSoonChip
          label={review.comingSoon?.label ?? '곧 공개'}
          description={review.comingSoon?.description}
          href={review.comingSoon?.href}
        />
      </div>
    </article>
  );
}
