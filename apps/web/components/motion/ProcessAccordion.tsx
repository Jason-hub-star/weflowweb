'use client';

import { useState, type ReactNode } from 'react';

/**
 * 프로세스 타임라인 + 아코디언 — 개발 단계를 좌측 세로선 + 번호 dot으로 표시.
 * 클릭 시 본문 펼침, 한 번에 하나만 열림.
 *
 * 사용처: 제작 프로세스, 케어플랜 단계, 광고 운영 흐름.
 */

export type ProcessStep = {
  id: string;
  step: string; // '01', '02'
  title: ReactNode;
  body: ReactNode;
  duration?: string; // '1~2일'
};

export function ProcessAccordion({
  items,
  defaultOpenId,
}: {
  items: ProcessStep[];
  defaultOpenId?: string;
}) {
  const [openId, setOpenId] = useState(defaultOpenId ?? items[0]?.id ?? '');
  return (
    <ol className="border-line relative ml-6 space-y-0 border-l">
      {items.map((it) => {
        const isOpen = it.id === openId;
        return (
          <li key={it.id} className="relative pl-6 pb-6 last:pb-0">
            <span
              className={[
                'absolute -left-4 top-0 grid h-8 w-8 place-items-center rounded-full font-mono text-small font-bold transition-colors',
                isOpen ? 'bg-accent text-bg' : 'bg-surface text-muted border-line border',
              ].join(' ')}
            >
              {it.step}
            </span>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`pa-${it.id}`}
              onClick={() => setOpenId(isOpen ? '' : it.id)}
              className="text-text hover:text-accent flex w-full items-baseline justify-between gap-3 text-left transition-colors"
            >
              <span className="text-h3 ko-heading font-semibold">{it.title}</span>
              {it.duration ? (
                <span className="text-small text-muted shrink-0 font-mono">{it.duration}</span>
              ) : null}
            </button>
            <div
              id={`pa-${it.id}`}
              hidden={!isOpen}
              className="text-small text-muted ko-relaxed mt-3"
            >
              {it.body}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
