'use client';

import Image from 'next/image';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import type { HomePage } from '@/lib/content/schemas';

/**
 * Site Build Storyboard — 모바일 인터랙티브 버전.
 * 상단 WEFLOW 심볼(260px)이 활성 스텝에 맞춰 회전(-50°/step)하고
 * 하단 6장 카드는 스냅 가로 스크롤 + 좌우 화살표·dots tap으로 이동.
 *
 * reduced-motion은 부모(SiteBuildStoryboard)에서 정적 폴백으로 분기.
 */

type ProcessData = HomePage['process'];
const PROCESS_RING_SRC = '/assets/process/weflow-process-flow-ring.png';
const PROCESS_W_LOGO_SRC = '/assets/process/weflow-process-w-logo.png';

export function SiteBuildStoryboardMobile({ data }: { data: ProcessData }) {
  const total = data.items.length;
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const rotationTarget = useMotionValue(0);
  const rotation = useSpring(rotationTarget, { stiffness: 80, damping: 18 });

  useEffect(() => {
    rotationTarget.set(-50 * activeIdx);
  }, [activeIdx, rotationTarget]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      const cardW = el.clientWidth * 0.85;
      const idx = Math.round(el.scrollLeft / cardW);
      setActiveIdx(Math.max(0, Math.min(total - 1, idx)));
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => el.removeEventListener('scroll', onScroll);
  }, [total]);

  const scrollTo = (idx: number) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardW = el.clientWidth * 0.85;
    el.scrollTo({ left: cardW * idx, behavior: 'smooth' });
  };

  return (
    <section
      className="bg-surface-soft px-[var(--space-gutter)] py-20"
      aria-labelledby="storyboard-heading-mobile"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-eyebrow text-accent">{data.eyebrow}</p>
        <h2 id="storyboard-heading-mobile" className="text-h1 ko-heading text-text mt-3">
          {data.title}
        </h2>

        <div className="relative mx-auto mt-12 grid place-items-center pb-6">
          <div className="relative aspect-square w-[300px] max-w-[82vw]">
            <motion.img
              src={PROCESS_RING_SRC}
              alt=""
              aria-hidden
              style={{ rotate: rotation }}
              className="size-full select-none drop-shadow-2xl"
              draggable={false}
            />
            <Image
              src={PROCESS_W_LOGO_SRC}
              alt=""
              aria-hidden
              width={120}
              height={120}
              className="absolute left-1/2 top-1/2 w-[25%] -translate-x-1/2 -translate-y-1/2 select-none drop-shadow-lg"
              draggable={false}
            />
            <ActiveStepBadge activeIdx={activeIdx} total={total} />
          </div>
        </div>

        <div className="mt-12">
          <div
            ref={scrollerRef}
            className="-mx-[var(--space-gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--space-gutter)] pb-4"
            style={{ scrollbarWidth: 'none' }}
          >
            {data.items.map((item, i) => (
              <StepCard key={item.id} item={item} isActive={i === activeIdx} />
            ))}
          </div>
        </div>

        <div className="mt-7 flex items-center justify-between gap-4">
          <button
            type="button"
            aria-label="이전 단계"
            disabled={activeIdx === 0}
            onClick={() => scrollTo(activeIdx - 1)}
            className="border-line bg-surface text-text flex h-10 w-10 items-center justify-center rounded-full border disabled:opacity-40"
          >
            ←
          </button>

          <div className="flex items-center gap-2" aria-hidden>
            {data.items.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`${i + 1}단계로 이동`}
                onClick={() => scrollTo(i)}
                className={
                  i === activeIdx
                    ? 'bg-accent-strong h-2 w-8 rounded-full transition-all'
                    : 'bg-line h-2 w-2 rounded-full transition-all'
                }
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="다음 단계"
            disabled={activeIdx === total - 1}
            onClick={() => scrollTo(activeIdx + 1)}
            className="border-line bg-surface text-text flex h-10 w-10 items-center justify-center rounded-full border disabled:opacity-40"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

function ActiveStepBadge({ activeIdx, total }: { activeIdx: number; total: number }) {
  return (
    <div className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2">
      <div className="bg-surface border-line grid h-16 w-16 place-items-center rounded-full border shadow-md">
        <span className="text-eyebrow text-muted font-mono">STEP</span>
        <span className="text-h2 text-accent-strong font-mono font-bold tabular-nums leading-none">
          {String(activeIdx + 1).padStart(2, '0')}
        </span>
        <span className="text-muted text-[0.65rem]">/{String(total).padStart(2, '0')}</span>
      </div>
    </div>
  );
}

function StepCard({ item, isActive }: { item: ProcessData['items'][number]; isActive: boolean }) {
  return (
    <article
      data-active={isActive}
      className="border-line bg-surface w-[85%] shrink-0 snap-center rounded-lg border px-6 py-7 shadow-sm transition-opacity data-[active=false]:opacity-60"
    >
      {item.nickname ? <p className="text-eyebrow text-muted font-mono">{item.nickname}</p> : null}
      <h3 className="text-h2 ko-heading text-text mt-3 leading-tight">{item.title}</h3>
      <p className="text-body text-muted ko-relaxed mt-4">{item.body}</p>
    </article>
  );
}
