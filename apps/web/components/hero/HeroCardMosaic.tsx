'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { motion as motionTokens, reveal } from '@weflow/tokens';
import { heroCopy } from './shared';

const TILES = [
  { eyebrow: '제작', title: '랜딩 · 홈피', body: '3~7일 빠른 출시' },
  { eyebrow: '광고', title: '네이버 · 카카오', body: '키워드 + 당근' },
  { eyebrow: '운영', title: '케어 플랜', body: '월 단위 관리' },
  { eyebrow: '진단', title: '무료', body: '문의 동선 점검' },
] as const;

/**
 * Hero C — Card Mosaic
 * 좌 카피 + 우 4분할 미리보기 카드.
 * 적합: 비교 탐색, 데스크톱 우선
 */
export function HeroCardMosaic() {
  return (
    <section className="relative overflow-hidden bg-bg">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-32 h-[420px] w-[420px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(var(--mint-rgb)/0.12), transparent 70%)',
        }}
      />
      <div className="mx-auto max-w-7xl px-[var(--space-gutter)] py-[var(--space-section)]">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          {/* LEFT — 카피 */}
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={reveal.viewport}
            transition={{ staggerChildren: motionTokens.stagger }}
            className="space-y-6"
          >
            <motion.p variants={reveal} className="text-eyebrow text-accent">
              {heroCopy.eyebrow}
            </motion.p>
            <motion.h1 variants={reveal} className="text-display ko-heading">
              {heroCopy.headline}
            </motion.h1>
            <motion.p variants={reveal} className="text-body text-muted ko-relaxed max-w-md">
              {heroCopy.sub}
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
            <motion.ul variants={reveal} className="flex flex-wrap gap-4 pt-2">
              {['30~40대 신뢰', '모바일 최적', '데이터 기반'].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2 text-small text-muted ko-tight"
                >
                  <span aria-hidden className="size-2 rounded-pill bg-accent" />
                  {t}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* RIGHT — 4 mosaic */}
          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={reveal.viewport}
            transition={{ staggerChildren: motionTokens.stagger }}
            className="grid grid-cols-2 gap-3"
          >
            {TILES.map((t, i) => (
              <motion.div
                key={t.title}
                variants={reveal}
                whileHover={{ y: -4 }}
                transition={{ duration: motionTokens.duration.hover }}
                className="group relative rounded-lg border border-line bg-surface p-5 transition-colors hover:border-accent"
                style={{ minHeight: 180 }}
              >
                <p className="text-eyebrow text-accent">{t.eyebrow}</p>
                <p className="text-h3 ko-heading mt-3">{t.title}</p>
                <p className="text-small text-muted ko-tight mt-2">{t.body}</p>
                <span
                  aria-hidden
                  className="absolute right-4 top-4 size-1.5 rounded-pill bg-accent opacity-0 transition-opacity group-hover:opacity-100"
                />
                {/* index micro-label */}
                <span className="absolute bottom-3 right-4 font-mono text-small text-muted/40">
                  0{i + 1}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
