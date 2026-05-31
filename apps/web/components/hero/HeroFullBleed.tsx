'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { motion as motionTokens, reveal } from '@weflow/tokens';
import { heroCopy, heroAssets } from './shared';

/**
 * Hero B — Full-bleed Visual
 * 풀스크린 hero 이미지 + 중앙 카피.
 * 적합: 브랜드 인지, 직접 검색
 */
export function HeroFullBleed() {
  return (
    <section className="relative h-[min(100svh,880px)] overflow-hidden bg-text text-surface">
      {/* 풀블리드 이미지 (slow ken-burns 모션) */}
      <motion.div
        initial={{ scale: 1.0 }}
        animate={{ scale: 1.03 }}
        transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'mirror' }}
        className="absolute inset-0"
      >
        <Image
          src={heroAssets.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* 좌→우 gradient mask (텍스트 가독성) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, rgba(17,23,19,0.78) 0%, rgba(17,23,19,0.55) 40%, rgba(17,23,19,0.2) 70%, rgba(17,23,19,0.05) 100%)',
        }}
      />
      {/* 하단 fade */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(17,23,19,0.55) 100%)',
        }}
      />

      {/* 카피 */}
      <div className="relative z-10 flex h-full items-center">
        <motion.div
          initial="initial"
          whileInView="whileInView"
          viewport={reveal.viewport}
          transition={{ staggerChildren: motionTokens.stagger, delayChildren: 0.1 }}
          className="mx-auto w-full max-w-7xl px-[var(--space-gutter)]"
        >
          <motion.p
            variants={reveal}
            className="text-eyebrow text-accent-soft tracking-[0.18em]"
            style={{ color: 'rgb(var(--mint-rgb) / 1)' }}
          >
            {heroCopy.eyebrow}
          </motion.p>
          <motion.h1
            variants={reveal}
            className="text-display ko-heading mt-4 max-w-3xl"
            style={{ color: '#ffffff' }}
          >
            {heroCopy.headline}
          </motion.h1>
          <motion.p
            variants={reveal}
            className="text-body ko-relaxed mt-5 max-w-xl text-surface/85"
          >
            {heroCopy.sub}
          </motion.p>
          <motion.div variants={reveal} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={heroCopy.ctaPrimary.href}
              className="rounded-pill bg-accent px-6 py-3 text-body font-medium text-surface transition-colors hover:bg-accent-strong"
            >
              {heroCopy.ctaPrimary.label}
            </Link>
            <span className="text-small text-surface/60">또는</span>
            <Link
              href={heroCopy.ctaSecondary.href}
              className="rounded-pill border border-surface/30 px-6 py-3 text-body font-medium text-surface transition-colors hover:bg-surface/10"
            >
              {heroCopy.ctaSecondary.label}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        aria-hidden
        initial={{ y: 0 }}
        animate={{ y: 6 }}
        transition={{ duration: 1.2, ease: 'easeInOut', repeat: Infinity, repeatType: 'mirror' }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-surface/60"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
          <path
            d="M5 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="1.6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  );
}
