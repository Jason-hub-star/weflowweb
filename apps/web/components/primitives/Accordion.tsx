'use client';

import { useState, type ReactNode } from 'react';

export type AccordionItem = { id: string; title: ReactNode; body: ReactNode };

export function Accordion({
  items,
  defaultOpen,
  allowMultiple = false,
}: {
  items: AccordionItem[];
  defaultOpen?: string[];
  allowMultiple?: boolean;
}) {
  const [open, setOpen] = useState<Set<string>>(new Set(defaultOpen ?? []));
  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(allowMultiple ? prev : []);
      if (prev.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  return (
    <ul className="border-line divide-line divide-y border-y">
      {items.map((it) => {
        const isOpen = open.has(it.id);
        return (
          <li key={it.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={`acc-${it.id}`}
              onClick={() => toggle(it.id)}
              className="text-text hover:text-accent flex w-full items-center justify-between px-1 py-4 text-left font-medium transition-colors"
            >
              <span>{it.title}</span>
              <span aria-hidden className="text-accent text-h3 font-mono">
                {isOpen ? '−' : '+'}
              </span>
            </button>
            <div
              id={`acc-${it.id}`}
              hidden={!isOpen}
              className="text-small text-muted ko-relaxed pb-5"
            >
              {it.body}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
