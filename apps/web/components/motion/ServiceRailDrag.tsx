import type { ReactNode } from 'react';

/**
 * 서비스 카드 가로 스크롤 레일 — devfive 시그니처 패턴 재해석.
 * 모바일·데스크톱 모두 자연스러운 가로 스와이프 + scroll-snap.
 * native scroll이라 'use client' 불필요, 모든 브라우저 호환.
 *
 * 사용처: 서비스 카드 4종, 사례 카드 그리드, 가로 카드 컬렉션.
 */
export function ServiceRailDrag({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        'snap-x snap-mandatory overflow-x-auto scroll-smooth',
        '-mx-[var(--space-gutter)] px-[var(--space-gutter)]',
        '[scrollbar-width:thin]',
        '[&::-webkit-scrollbar]:h-1.5',
        '[&::-webkit-scrollbar-thumb]:bg-line',
        '[&::-webkit-scrollbar-thumb]:rounded-full',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex w-max gap-4 pb-3">{children}</div>
    </div>
  );
}
