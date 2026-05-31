'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { motion as motionTokens, reveal } from '@weflow/tokens';
import { heroCopy } from './shared';

const TOAST_FEED = [
  '김** 님이 무료 진단 신청',
  '박** 님이 가격 페이지 확인',
  '최** 님이 카카오 상담 연결',
  '정** 님이 사례 페이지 열람',
  '이** 님이 무료 진단 신청',
] as const;

/**
 * Hero D — Live Mini-Dashboard
 * 우측에 가짜 대시보드 (토스트 슬라이드 + 카운트 tick + 미니 차트).
 * 적합: B2B 대표 · 실무자
 */
export function HeroLiveDashboard() {
  const [count, setCount] = useState(12);
  const [toastIndex, setToastIndex] = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setCount((c) => c + 1), 4500);
    const t2 = setInterval(
      () => setToastIndex((i) => (i + 1) % TOAST_FEED.length),
      3200,
    );
    return () => {
      clearInterval(t1);
      clearInterval(t2);
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-bg">
      <div className="mx-auto max-w-7xl px-[var(--space-gutter)] py-[var(--space-section)]">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
          {/* LEFT — 카피 */}
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={reveal.viewport}
            transition={{ staggerChildren: motionTokens.stagger }}
            className="space-y-6"
          >
            <motion.p variants={reveal} className="text-eyebrow text-accent">
              운영 · 데이터 · 전환
            </motion.p>
            <motion.h1 variants={reveal} className="text-display ko-heading">
              문의가 자동으로 이어지도록 설계합니다
            </motion.h1>
            <motion.p variants={reveal} className="text-body text-muted ko-relaxed max-w-md">
              단순 제작이 아닌 광고 유입·문의 동선·운영 관리까지 한 번에 설계합니다. 들어오는
              문의가 흘러나가지 않게.
            </motion.p>
            <motion.div variants={reveal} className="flex flex-wrap gap-3">
              <Link
                href={heroCopy.ctaPrimary.href}
                className="rounded-pill bg-accent px-6 py-3 text-body font-medium text-surface transition-colors hover:bg-accent-strong"
              >
                {heroCopy.ctaPrimary.label}
              </Link>
              <Link
                href={heroCopy.ctaSecondary.href}
                className="rounded-pill border border-line px-6 py-3 text-body font-medium text-text transition-colors hover:bg-surface-soft"
              >
                {heroCopy.ctaSecondary.label}
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT — 라이브 대시보드 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={reveal.viewport}
            transition={{ duration: 0.7, ease: motionTokens.ease, delay: 0.15 }}
            className="relative"
          >
            <div className="rounded-lg border border-line bg-surface p-5 shadow-md">
              {/* 헤더 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span aria-hidden className="size-2 animate-pulse rounded-pill bg-accent" />
                  <span className="text-small font-medium text-text">Inquiries (예시)</span>
                </div>
                <span className="text-small text-muted">오늘</span>
              </div>
              {/* 카운트 */}
              <div className="mt-3 flex items-baseline gap-2">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={count}
                    initial={{ y: 12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -12, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-mono text-h1 ko-heading text-text"
                  >
                    {count}
                  </motion.span>
                </AnimatePresence>
                <span className="text-small font-medium text-accent">▲ 활성</span>
              </div>

              {/* 차트 */}
              <svg viewBox="0 0 320 80" className="mt-4 w-full" aria-hidden>
                <motion.polyline
                  points="0,60 30,52 60,55 90,40 120,45 150,30 180,38 210,22 240,28 270,18 300,24 320,12"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.6, ease: motionTokens.ease }}
                />
                <line x1="0" y1="78" x2="320" y2="78" stroke="var(--line)" strokeWidth="1" />
              </svg>

              {/* 활동 피드 */}
              <div className="mt-4 border-t border-line pt-3">
                <p className="text-eyebrow text-muted">활동</p>
                <ul className="mt-2 space-y-1.5 text-small text-muted ko-tight">
                  <AnimatePresence mode="popLayout">
                    <motion.li
                      key={toastIndex}
                      initial={{ y: -8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: 8, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      className="flex items-center gap-2"
                    >
                      <span aria-hidden className="size-1.5 rounded-pill bg-accent" />
                      <span>{TOAST_FEED[toastIndex]}</span>
                    </motion.li>
                  </AnimatePresence>
                  {[1, 2].map((i) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 opacity-40"
                    >
                      <span aria-hidden className="size-1.5 rounded-pill bg-muted" />
                      <span>
                        {TOAST_FEED[(toastIndex + i) % TOAST_FEED.length]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* integration badges */}
              <div className="mt-4 flex flex-wrap gap-1.5 border-t border-line pt-3">
                {['Resend', 'Sheets', 'Kakao', 'GA4'].map((b) => (
                  <span
                    key={b}
                    className="font-mono rounded-pill border border-line bg-bg px-2 py-0.5 text-small text-muted"
                  >
                    {b}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-small text-muted/60">* 예시 화면입니다.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
