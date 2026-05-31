'use client';

import { useState } from 'react';
import type { ServicesPage } from '@/lib/content/schemas';

/**
 * ServicesFlow — 4개 서비스를 한 흐름으로 보여주는 Process Flow Diagram.
 *
 * 인터랙션:
 *  - 노드 hover/focus 시 강조 + body 패널 전환
 *  - 데스크탑: 가로 흐름 (build → ads → ops → admin)
 *  - 모바일: 세로 흐름 (↓ 화살표)
 *  - 키보드 Tab + Enter/Space로 노드 선택
 */
export function ServicesFlow({ items }: { items: ServicesPage['items'] }) {
  const [active, setActive] = useState(0);
  const current = items[active] ?? items[0];

  return (
    <section className="border-line border-t">
      <div className="mx-auto max-w-7xl px-[var(--space-gutter)] py-[var(--space-section)]">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow text-accent">FLOW</p>
          <h2 className="text-h1 ko-heading mt-3 break-keep">한 줄로 이어지는 작업 흐름</h2>
          <p className="text-body text-muted ko-relaxed mt-4 break-keep">
            네 단계가 어떻게 연결되는지 한눈에 보고, 노드를 눌러 상세를 확인하세요.
          </p>
        </header>

        <ol
          role="tablist"
          aria-label="서비스 흐름 단계"
          className="mt-14 flex flex-col items-stretch gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-2"
        >
          {items.map((item, i) => {
            const isActive = i === active;
            const isLast = i === items.length - 1;
            return (
              <li key={item.id} className="flex flex-col items-stretch gap-4 lg:flex-1 lg:flex-row lg:items-center">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(i)}
                  className={[
                    'group relative flex w-full flex-col items-center gap-2 rounded-2xl border p-5 text-center transition-all motion-safe:duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                    isActive
                      ? 'border-accent bg-accent-soft text-accent-strong shadow-lg ring-accent/20 ring-2 lg:scale-105'
                      : 'border-line bg-surface text-muted hover:border-accent/50 hover:text-text',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'grid h-12 w-12 place-items-center rounded-full font-mono text-lg font-black tabular-nums shadow-md transition-colors motion-safe:duration-300',
                      isActive ? 'bg-accent-strong text-surface' : 'bg-surface-soft text-muted group-hover:bg-accent/15',
                    ].join(' ')}
                  >
                    {item.code}
                  </span>
                  <p className="text-small font-semibold break-keep">{item.title}</p>
                </button>
                {!isLast ? (
                  <span aria-hidden className="text-muted text-h3 lg:text-h2 shrink-0 self-center font-mono">
                    <span className="hidden lg:inline">→</span>
                    <span className="lg:hidden">↓</span>
                  </span>
                ) : null}
              </li>
            );
          })}
        </ol>

        {current ? (
          <article
            key={current.id}
            className="border-accent/30 bg-surface mt-10 rounded-2xl border p-8 shadow-lg motion-safe:animate-[serviceFlowFadeIn_0.4s_ease-out] md:p-12"
            aria-live="polite"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h3 className="text-h2 ko-heading text-text break-keep">{current.title}</h3>
              <span className="text-eyebrow text-accent font-mono">{current.code}</span>
            </div>
            <p className="text-body text-muted ko-relaxed mt-4 max-w-3xl break-keep">{current.body}</p>
            {current.duration || current.price ? (
              <div className="text-small text-muted mt-6 flex flex-wrap gap-x-6 gap-y-2 font-mono">
                {current.duration ? (
                  <span>
                    <span className="text-text font-semibold">기간</span> · {current.duration}
                  </span>
                ) : null}
                {current.price ? (
                  <span>
                    <span className="text-text font-semibold">비용</span> · {current.price}
                  </span>
                ) : null}
              </div>
            ) : null}
          </article>
        ) : null}
      </div>
    </section>
  );
}
