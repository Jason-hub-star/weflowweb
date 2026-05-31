'use client';

import { useState, type ReactNode } from 'react';

export type TabItem = { id: string; label: ReactNode; content: ReactNode };

export function Tabs({ items, defaultId }: { items: TabItem[]; defaultId?: string }) {
  const [active, setActive] = useState(defaultId ?? items[0]?.id);
  return (
    <div>
      <div role="tablist" className="border-line flex gap-1 border-b">
        {items.map((it) => {
          const isActive = it.id === active;
          return (
            <button
              key={it.id}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`tabpanel-${it.id}`}
              id={`tab-${it.id}`}
              onClick={() => setActive(it.id)}
              className={[
                '-mb-px border-b-2 px-4 py-2.5 text-small font-medium transition-colors',
                isActive
                  ? 'border-accent text-accent'
                  : 'border-transparent text-muted hover:text-text',
              ].join(' ')}
            >
              {it.label}
            </button>
          );
        })}
      </div>
      {items.map((it) => (
        <div
          key={it.id}
          role="tabpanel"
          id={`tabpanel-${it.id}`}
          aria-labelledby={`tab-${it.id}`}
          hidden={it.id !== active}
          className="pt-5"
        >
          {it.content}
        </div>
      ))}
    </div>
  );
}
