'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ComingSoonChip, FaqAccordion } from '@/components/primitives';
import { TagFilter } from '@/components/motion/TagFilter';
import type { FaqPage } from '@/lib/content/schemas';

const FAQ_ROBOT_SRC = '/mascot/weflow-faq-robot-helper.png';
const FAQ_ROBOT_ICON_SRC = '/mascot/weflow-faq-robot-helper-256.png';

export function FaqFilterableList({
  filters,
  items,
  aiAssist,
}: {
  filters: string[];
  items: FaqPage['items'];
  aiAssist?: FaqPage['aiAssist'];
}) {
  const allTag = filters[0] ?? '전체';
  const [active, setActive] = useState<string>(allTag);
  const [query, setQuery] = useState('');

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((f) => {
      const tagMatch = active === allTag || f.category === active;
      if (!tagMatch) return false;
      if (!q) return true;
      return f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
    });
  }, [items, active, allTag, query]);

  return (
    <>
      {aiAssist ? <AiAssistTeaser aiAssist={aiAssist} /> : null}

      <section className="border-line border-t">
        <div className="mx-auto max-w-5xl px-[var(--space-gutter)] py-10">
          <SearchInput value={query} onChange={setQuery} />
          <div className="mt-6">
            <TagFilter
              options={filters}
              value={active}
              onChange={setActive}
              ariaLabel="FAQ 카테고리 필터"
              className="justify-center"
            />
          </div>
        </div>
      </section>

      <section className="border-line border-t">
        <div className="mx-auto grid max-w-7xl gap-12 px-[var(--space-gutter)] py-[var(--space-section)] lg:grid-cols-[1fr_280px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${active}-${query}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              layout
            >
              {visible.length === 0 ? (
                <EmptyState query={query} />
              ) : (
                <FaqAccordion
                  items={visible.map((f) => ({ id: f.id, q: f.q, a: f.a }))}
                  emptyLabel="해당 카테고리의 질문이 아직 없어요."
                />
              )}
            </motion.div>
          </AnimatePresence>

          <FaqMascotHelper count={visible.length} active={active} />
        </div>
      </section>
    </>
  );
}

function AiAssistTeaser({ aiAssist }: { aiAssist: NonNullable<FaqPage['aiAssist']> }) {
  return (
    <section className="bg-accent-soft/30 border-line border-t">
      <div className="mx-auto max-w-5xl px-[var(--space-gutter)] py-10">
        <label
          htmlFor="faq-ai-input"
          className="border-accent/40 bg-surface flex flex-col gap-4 rounded-2xl border-2 border-dashed p-5 shadow-sm md:flex-row md:items-center md:gap-5"
        >
          <span aria-hidden className="bg-accent/15 grid h-12 w-12 shrink-0 place-items-center overflow-hidden rounded-full">
            <Image
              src={FAQ_ROBOT_ICON_SRC}
              alt=""
              width={44}
              height={44}
              className="object-contain"
            />
          </span>
          <input
            id="faq-ai-input"
            type="text"
            disabled
            placeholder={aiAssist.placeholder}
            aria-label="AI 챗 도우미 — 사전 알림 신청 필요"
            className="text-body text-muted placeholder:text-muted/80 disabled:cursor-not-allowed flex-1 bg-transparent outline-none"
          />
          <ComingSoonChip
            label={aiAssist.comingSoon.label ?? '곧 등장'}
            description={aiAssist.comingSoon.description}
            href={aiAssist.comingSoon.href}
          />
        </label>
      </div>
    </section>
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
    <div className="border-line bg-surface focus-within:border-accent focus-within:ring-accent/20 mx-auto flex max-w-2xl items-center gap-2 rounded-pill border px-4 py-3 transition-colors focus-within:ring-2">
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="질문·답변 본문 검색"
        aria-label="FAQ 검색"
        className="text-body text-text placeholder:text-muted/70 flex-1 bg-transparent outline-none"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="검색어 지우기"
          className="text-muted hover:text-text text-small font-medium"
        >
          지우기
        </button>
      ) : null}
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="border-line bg-surface-soft flex flex-col items-center gap-3 rounded-xl border p-12 text-center">
      <Image src={FAQ_ROBOT_ICON_SRC} alt="" width={84} height={84} className="object-contain" />
      <p className="text-body text-text ko-relaxed break-keep">
        {query
          ? `"${query}"에 해당하는 질문을 못 찾았어요.`
          : '해당 카테고리의 질문이 아직 없어요.'}
      </p>
      <p className="text-small text-muted ko-tight">필터·검색어를 바꿔보거나, 직접 문의해주세요.</p>
    </div>
  );
}

function FaqMascotHelper({ count, active }: { count: number; active: string }) {
  return (
    <aside className="hidden lg:block">
      <div className="border-line bg-surface sticky top-32 rounded-2xl border p-6 shadow-md">
        <div className="relative mx-auto h-32 w-32 motion-safe:animate-[faqMascotFloat_4.5s_ease-in-out_infinite]">
          <Image
            src={FAQ_ROBOT_SRC}
            alt=""
            aria-hidden
            fill
            sizes="128px"
            className="object-contain"
          />
        </div>
        <p className="text-h3 ko-heading text-text mt-4 text-center break-keep">
          도와드릴게요
        </p>
        <p className="text-small text-muted ko-relaxed mt-2 text-center break-keep">
          현재 <span className="text-accent font-mono tabular-nums">#{active}</span> 카테고리에{' '}
          <span className="text-accent font-mono tabular-nums">{count}</span>개 질문이 있어요.
        </p>
        <div className="border-line mt-5 border-t pt-5 text-center">
          <p className="text-eyebrow text-muted font-mono">DIRECT</p>
          <a
            href="/contact"
            className="text-small text-accent mt-2 inline-block font-medium hover:text-accent-strong"
          >
            바로 문의하기
          </a>
        </div>
      </div>
    </aside>
  );
}
