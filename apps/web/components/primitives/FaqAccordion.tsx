'use client';

import { Accordion } from './Accordion';
import { Tag } from './Tag';

export type FaqItem = {
  id: string;
  q: string;
  a: string;
};

/**
 * FaqAccordion — FAQ 도메인 wrapper.
 * Accordion primitive 위에 질문 → Tag(#질문) · 답변 → p 변환을 표준화.
 * faq / pricing / services 등에서 공통 사용.
 */
export function FaqAccordion({
  items,
  defaultOpenFirst = true,
  emptyLabel = '표시할 질문이 없어요.',
}: {
  items: FaqItem[];
  defaultOpenFirst?: boolean;
  emptyLabel?: string;
}) {
  if (items.length === 0) {
    return (
      <p className="text-small text-muted py-12 text-center">{emptyLabel}</p>
    );
  }
  return (
    <Accordion
      items={items.map((f) => ({
        id: f.id,
        title: <Tag>{f.q}</Tag>,
        body: <p className="text-body text-muted ko-relaxed">{f.a}</p>,
      }))}
      defaultOpen={defaultOpenFirst && items[0] ? [items[0].id] : []}
    />
  );
}
