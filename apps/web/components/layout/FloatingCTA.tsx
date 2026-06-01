'use client';

import Link from 'next/link';
import { useState } from 'react';
import { publicConfig as config } from '@/lib/public-config';

/**
 * 우측 하단 플로팅 CTA — 푸터 연락처와 연결되는 빠른 문의 도크.
 * DEC-020: 모바일·데스크톱 공통 1개, 클릭 시 액션 시트(무료진단·카카오·전화).
 */
export function FloatingCTA() {
  const [open, setOpen] = useState(false);
  const { company, social } = config;

  return (
    <div className="fixed inset-x-4 bottom-4 z-50 flex justify-end md:inset-x-auto md:bottom-6 md:right-6">
      {open && (
        <div className="absolute bottom-[calc(100%+0.75rem)] right-0 w-full rounded-lg border border-line bg-surface p-3 shadow-xl backdrop-blur md:w-64">
          <p className="text-small font-semibold text-text">바로 상담 연결</p>
          <Link
            href="/contact"
            className="mt-3 flex min-h-11 items-center justify-center rounded-md bg-accent px-4 py-2 text-small font-semibold text-surface"
          >
            무료 진단 신청
          </Link>
          <Link
            href={social.kakaoChannelUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 flex min-h-11 items-center justify-center rounded-md border border-line px-4 py-2 text-small font-medium text-text hover:border-accent hover:text-accent-strong"
          >
            카카오톡 상담
          </Link>
          <Link
            href={company.phoneTel}
            className="mt-2 flex min-h-11 items-center justify-center rounded-md border border-line px-4 py-2 text-small font-medium text-text hover:border-accent hover:text-accent-strong"
          >
            전화 문의
          </Link>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="문의 메뉴 열기"
        aria-expanded={open}
        className="group flex min-h-16 w-full max-w-sm items-center justify-between rounded-lg border border-line bg-surface px-4 py-3 text-left shadow-xl ring-1 ring-bg/60 transition-transform hover:-translate-y-0.5 md:w-72"
      >
        <span>
          <span className="block text-small font-semibold text-text">문의 바로가기</span>
          <span className="mt-0.5 block text-xs text-muted">진단 · 카카오 · 전화</span>
        </span>
        <span
          aria-hidden
          className="grid h-10 w-10 place-items-center rounded-full bg-accent text-small font-bold text-surface transition-transform group-hover:scale-105"
        >
          W
        </span>
      </button>
    </div>
  );
}
