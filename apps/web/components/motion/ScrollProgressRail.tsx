'use client';

import { useEffect, useState } from 'react';

export type ScrollProgressSection = {
  id: string;
  label: string;
};

type ScrollProgressRailProps = {
  sections: ScrollProgressSection[];
  className?: string;
};

/**
 * ScrollProgressRail — "작업실 투어" 좌측 세로 진행 인디케이터.
 * 데스크탑(lg+) 전용. 모바일에선 숨김.
 * IntersectionObserver로 현재 viewport에 들어온 섹션을 추적.
 */
export function ScrollProgressRail({ sections, className }: ScrollProgressRailProps) {
  const [activeId, setActiveId] = useState<string | null>(sections[0]?.id ?? null);

  useEffect(() => {
    if (typeof window === 'undefined' || sections.length === 0) return;

    const elements = sections
      .map((s) => ({ id: s.id, el: document.getElementById(s.id) }))
      .filter((s): s is { id: string; el: HTMLElement } => s.el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((max, cur) =>
          cur.intersectionRatio > max.intersectionRatio ? cur : max,
        );
        setActiveId(top.target.id);
      },
      { threshold: [0.25, 0.5, 0.75], rootMargin: '-30% 0px -30% 0px' },
    );

    elements.forEach(({ el }) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  if (sections.length === 0) return null;

  return (
    <nav
      aria-label="페이지 섹션 가이드"
      className={[
        'fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 lg:flex',
        'flex-col gap-3',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {sections.map((s) => {
        const isActive = activeId === s.id;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={`${s.label} 섹션으로 이동`}
            aria-current={isActive ? 'true' : undefined}
            className="group relative flex items-center gap-3 focus-visible:outline-none"
          >
            <span
              className={[
                'h-2 w-2 rounded-full transition-all motion-safe:duration-300',
                isActive
                  ? 'bg-accent scale-150'
                  : 'bg-line group-hover:bg-accent/60 group-focus-visible:bg-accent/60',
              ].join(' ')}
            />
            <span
              className={[
                'text-eyebrow font-mono opacity-0 transition-opacity motion-safe:duration-200',
                isActive
                  ? 'text-accent opacity-100'
                  : 'text-muted group-hover:opacity-100 group-focus-visible:opacity-100',
              ].join(' ')}
            >
              {s.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
