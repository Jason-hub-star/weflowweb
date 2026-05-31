'use client';

import { useEffect } from 'react';

/**
 * 스크롤 12px 이상에서 헤더 그림자/보더 활성화.
 * AGENTS.md Hard Rules와 디자인 명세 §2.1 Header 일치.
 */
export function StickyHeaderWatcher() {
  useEffect(() => {
    const el = document.querySelector('[data-site-header]');
    if (!el) return;
    const onScroll = () => {
      if (window.scrollY > 12) {
        el.setAttribute('data-scrolled', 'true');
      } else {
        el.removeAttribute('data-scrolled');
      }
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return null;
}
