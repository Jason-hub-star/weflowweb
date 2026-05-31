'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { config } from '@/lib/config';
import { MobileDrawer } from './MobileDrawer';

const NAV = [
  { href: '/story', label: '스토리' },
  { href: '/services', label: '서비스' },
  { href: '/pricing', label: '가격' },
  { href: '/reviews', label: '후기' },
  { href: '/cases', label: '사례' },
  { href: '/blog', label: '블로그' },
  { href: '/faq', label: 'FAQ' },
];

/**
 * 고정 헤더 — devfive 패턴 차용 (좌 로고 · 중앙 nav · 우 CTA, 모바일 드로어).
 * 스크롤 12px+ 시 border + 약한 그림자.
 */
export function SiteHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <header
        data-site-header
        className="sticky top-0 z-40 bg-bg/85 backdrop-blur transition-shadow data-[scrolled=true]:border-b data-[scrolled=true]:border-line data-[scrolled=true]:shadow-sm supports-[backdrop-filter]:bg-bg/70"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-[var(--space-gutter)] py-3">
          <Link href="/" className="flex items-center gap-2.5">
            <Image
              src="/logo/weflow-logo_icon.png"
              alt={config.brand.name}
              width={40}
              height={40}
              priority
              className="h-9 w-9 md:h-10 md:w-10"
            />
            <span className="text-h2 font-bold ko-heading tracking-tight">
              {config.brand.name}
            </span>
          </Link>

          <nav className="hidden gap-7 md:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[0.95rem] font-medium text-text/80 transition-colors hover:text-accent-strong"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/contact"
              className="hidden rounded-pill bg-accent px-5 py-2.5 text-[0.95rem] font-semibold text-surface transition-colors hover:bg-accent-strong md:inline-flex"
            >
              무료 진단 신청
            </Link>
            <button
              type="button"
              aria-label="메뉴 열기"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-line md:hidden"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                <path
                  d="M3 5h14M3 10h14M3 15h14"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
