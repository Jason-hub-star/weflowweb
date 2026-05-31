'use client';

import Link from 'next/link';
import { useEffect } from 'react';

const NAV = [
  { href: '/story', label: '스토리' },
  { href: '/services', label: '서비스' },
  { href: '/pricing', label: '가격' },
  { href: '/reviews', label: '후기' },
  { href: '/cases', label: '사례' },
  { href: '/blog', label: '블로그' },
  { href: '/notice', label: '공지' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: '문의' },
];

/**
 * 모바일 우측 드로어 — Day 1 부팅 스텁.
 * Day 2에 Framer Motion AnimatePresence + body scroll lock 적용.
 */
export function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="모바일 메뉴"
      className="fixed inset-0 z-50 md:hidden"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="메뉴 닫기"
        className="absolute inset-0 bg-text/40"
      />
      <aside className="absolute right-0 top-0 h-full w-72 bg-surface p-6 shadow-lg">
        <nav className="mt-12 flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="rounded-md px-3 py-3 text-h3 ko-heading text-text transition-colors hover:bg-surface-soft"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/contact"
          onClick={onClose}
          className="mt-8 block rounded-pill bg-accent px-4 py-3 text-center text-body font-medium text-surface"
        >
          무료 진단 신청
        </Link>
      </aside>
    </div>
  );
}
