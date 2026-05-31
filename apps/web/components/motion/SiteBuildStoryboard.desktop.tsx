'use client';

import Image from 'next/image';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { useRef, useState } from 'react';
import type { HomePage } from '@/lib/content/schemas';

/**
 * Site Build Storyboard — 데스크톱(lg+) 전용 WEFLOW Flow Loop 인터랙션.
 * 600vh sticky scroll. WEFLOW 심볼이 화면 중앙으로 들어오고, 단계별 텍스트가 교차 등장.
 */

type ProcessData = HomePage['process'];
type ProcessItem = ProcessData['items'][number];

const TOTAL = 6;
const PROCESS_RING_SRC = '/assets/process/weflow-process-flow-ring.png';
const PROCESS_W_LOGO_SRC = '/assets/process/weflow-process-w-logo.png';

export function SiteBuildStoryboardDesktop({ data }: { data: ProcessData }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end end'],
  });

  const rotation = useTransform(scrollYProgress, [0, 1], [0, -360]);
  const gearX = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], ['18vw', '0vw', '0vw', '-8vw']);
  const gearScale = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.82, 1, 1, 0.9]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const activeIndexMV = useTransform(scrollYProgress, (v) =>
    Math.min(TOTAL - 1, Math.max(0, Math.floor(v * TOTAL))),
  );

  const [activeIdx, setActiveIdx] = useState(0);
  useMotionValueEvent(activeIndexMV, 'change', (v) => setActiveIdx(v));

  const activeItem = data.items[activeIdx] ?? data.items[0];

  return (
    <section
      ref={ref}
      className="bg-surface-soft relative"
      style={{ height: '600vh' }}
      aria-labelledby="storyboard-heading"
    >
      <div className="sticky top-0 h-screen overflow-hidden px-[var(--space-gutter)] pb-36 pt-10">
        <div className="mx-auto flex h-full max-w-7xl flex-col gap-6">
          <header className="mx-auto max-w-3xl shrink-0 text-center">
            <p className="text-eyebrow text-accent">{data.eyebrow}</p>
            <h2 id="storyboard-heading" className="text-h1 ko-heading text-text mt-3">
              {data.title}
            </h2>
          </header>

          <div className="mb-6 shrink-0">
            <ProgressTrack progressScale={progressScale} activeIdx={activeIdx} total={TOTAL} />
          </div>

          <div className="grid min-h-0 flex-1 grid-rows-[minmax(100px,0.34fr)_auto] items-center justify-items-center gap-16 pb-72">
            <motion.div
              style={{ x: gearX, scale: gearScale }}
              className="relative grid aspect-square w-[min(22vh,240px)] place-items-center"
            >
              <ProcessSymbolVisual rotation={rotation} />
            </motion.div>

            {activeItem ? <ActiveStageCard item={activeItem} /> : null}
          </div>
          <StageRail items={data.items} activeIdx={activeIdx} />
        </div>
      </div>
    </section>
  );
}

function ActiveStageCard({ item }: { item: ProcessItem }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 28, scale: 0.96, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
        exit={{ opacity: 0, y: -28, scale: 0.96, filter: 'blur(10px)' }}
        transition={{ duration: 0.42, ease: [0.25, 0.1, 0.25, 1] }}
        className="border-line bg-surface/95 min-h-[200px] w-full max-w-3xl rounded-lg border px-12 py-6 text-center shadow-lg backdrop-blur"
      >
        <div className="flex items-center justify-center gap-4">
          <span className="text-h2 text-accent-strong font-mono font-bold tabular-nums">
            {item.step}
          </span>
          {item.nickname ? <span className="text-eyebrow text-muted">{item.nickname}</span> : null}
        </div>
        <h3 className="text-h2 ko-heading text-text mt-4 leading-tight">{item.title}</h3>
        <p className="text-body text-muted ko-relaxed mx-auto mt-4 max-w-xl">{item.body}</p>
      </motion.div>
    </AnimatePresence>
  );
}

function ProgressTrack({
  progressScale,
}: {
  progressScale: MotionValue<number>;
  activeIdx: number;
  total: number;
}) {
  return (
    <div className="mx-auto w-full max-w-xl shrink-0 py-1" aria-hidden>
      <div className="bg-line relative h-1 overflow-hidden rounded-full">
        <motion.span
          style={{ scaleX: progressScale, transformOrigin: '0% 50%' }}
          className="bg-accent-strong absolute inset-y-0 left-0 w-full rounded-full"
        />
      </div>
    </div>
  );
}

function StageRail({ items, activeIdx }: { items: ProcessData['items']; activeIdx: number }) {
  return (
    <div className="absolute inset-x-0 bottom-14 z-20 flex justify-center px-[var(--space-gutter)]" aria-hidden>
      <div className="flex w-full max-w-5xl flex-wrap items-center justify-center gap-4 px-4">
      {items.map((item, i) => {
        const active = i === activeIdx;

        return (
          <motion.span
            key={item.id}
            animate={{ opacity: active ? 1 : 0.5, scale: active ? 1 : 0.94 }}
            transition={{ duration: 0.25 }}
            className={
              active
                ? 'bg-accent-strong text-bg text-small block rounded-full px-5 py-2.5 font-bold shadow-lg'
                : 'bg-surface/80 text-muted border-line text-small block rounded-full border px-4 py-2 shadow-sm backdrop-blur'
            }
          >
            {item.step} {item.nickname}
          </motion.span>
        );
      })}
      </div>
    </div>
  );
}

function ProcessSymbolVisual({ rotation }: { rotation: MotionValue<number> }) {
  return (
    <div className="relative aspect-square w-full">
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
        width={160}
        height={160}
        className="absolute left-1/2 top-1/2 w-[25%] -translate-x-1/2 -translate-y-1/2 select-none drop-shadow-lg"
        draggable={false}
      />
    </div>
  );
}
