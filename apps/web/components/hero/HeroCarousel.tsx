'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { motion as motionTokens } from '@weflow/tokens';
import { heroCopy, heroAssets } from './shared';

type Slide = {
  eyebrow: string;
  headline: string;
  sub: string;
  mascot: string;
};

const SLIDES: Slide[] = [
  {
    eyebrow: heroCopy.eyebrow,
    headline: heroCopy.headline,
    sub: heroCopy.sub,
    mascot: heroAssets.guideHero,
  },
  {
    eyebrow: '제작 · 빠른 일정',
    headline: '랜딩 3~4일 · 홈피 4~7일',
    sub: '랜딩&홈페이지 묶음도 10일 이내. 디자인·문의 구조·검색 등록까지 한 흐름.',
    mascot: heroAssets.guideFloating,
  },
  {
    eyebrow: '광고 · 운영',
    headline: '네이버 · 카카오 · 당근',
    sub: '키워드 광고, 검색 등록 세팅, 케어 플랜 운영을 패키지로. 광고비는 고객 직접 결제.',
    mascot: heroAssets.guideReview,
  },
];

/**
 * Hero E — Carousel
 * 슬라이드 3컷 + CTA 고정. 자동재생 OFF, 사용자 선택.
 * 적합: 시즌 캠페인, 다양한 메시지 노출
 */
export function HeroCarousel() {
  const [idx, setIdx] = useState(0);
  const [autoPaused, setAutoPaused] = useState(false);

  useEffect(() => {
    if (autoPaused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % SLIDES.length), 6000);
    return () => clearInterval(t);
  }, [autoPaused]);

  const slide = SLIDES[idx]!;

  return (
    <section
      className="relative overflow-hidden bg-bg"
      onMouseEnter={() => setAutoPaused(true)}
      onMouseLeave={() => setAutoPaused(false)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-0 top-0 h-full w-1/2"
        style={{
          background:
            'radial-gradient(circle at 80% 30%, rgba(var(--mint-rgb)/0.14), transparent 70%)',
        }}
      />
      <div className="mx-auto max-w-7xl px-[var(--space-gutter)] py-[var(--space-section)]">
        {/* dot indicator */}
        <div className="flex gap-2 pb-6">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              aria-label={`슬라이드 ${i + 1}`}
              aria-current={i === idx}
              className={`h-2 transition-all ${
                i === idx ? 'w-10 bg-accent' : 'w-2 bg-line hover:bg-muted'
              } rounded-pill`}
            />
          ))}
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          {/* 카피 슬라이드 */}
          <div className="relative min-h-[340px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.6, ease: motionTokens.ease }}
                className="space-y-5"
              >
                <p className="text-eyebrow text-accent">{slide.eyebrow}</p>
                <h1 className="text-display ko-heading">{slide.headline}</h1>
                <p className="text-body text-muted ko-relaxed max-w-xl">{slide.sub}</p>
              </motion.div>
            </AnimatePresence>

            {/* CTA 고정 */}
            <div className="mt-8 flex flex-wrap gap-3">
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
            </div>
          </div>

          {/* 마스코트 슬라이드 */}
          <div className="relative h-[280px] md:h-[360px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={`m-${idx}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.55, ease: motionTokens.ease }}
                className="relative h-full w-full"
              >
                <Image
                  src={slide.mascot}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 40vw, 80vw"
                  className="object-contain"
                  priority={idx === 0}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
