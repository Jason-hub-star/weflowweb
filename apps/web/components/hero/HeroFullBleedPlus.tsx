'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import {
  useMouseParallax,
  useScrollLinkedValue,
  MagneticButton,
  MaskRevealText,
  FloatingPill,
  MeshGradientBackground,
  GridTextureOverlay,
  ScrollCue,
} from '@/components/motion';
import { heroCopy, heroAssets } from './shared';

const KEYWORDS = [
  { label: '랜딩페이지', depth: 0.95, x: '8%', y: '18%', duration: 7, delay: 0 },
  { label: '홈페이지', depth: 0.55, x: '78%', y: '14%', duration: 9, delay: 0.6 },
  { label: '광고운영', depth: 0.7, x: '14%', y: '74%', duration: 8, delay: 1.2 },
  { label: '검색등록', depth: 0.4, x: '68%', y: '72%', duration: 11, delay: 1.8 },
  { label: '케어플랜', depth: 0.85, x: '72%', y: '42%', duration: 7.5, delay: 0.3 },
  { label: '운영관리', depth: 0.5, x: '6%', y: '46%', duration: 10, delay: 0.9 },
] as const;

/**
 * Hero B+ · Enhanced Full-bleed
 * SSOT: docs/ref/HERO-VARIANTS.md B+ 섹션 / DEC-041/042/043
 *
 * 8개 인터랙티브 primitive 조합:
 *  1 WebGL MeshGradient · 2 GridTextureOverlay · 3 useMouseParallax
 *  4 useScrollLinkedValue · 5 FloatingPill × 6 · 6 MagneticButton
 *  7 MaskRevealText · 8 ScrollCue
 */
export function HeroFullBleedPlus() {
  const rootRef = useRef<HTMLElement>(null);
  const { x, y } = useMouseParallax(14);
  const { imgScale, copyOpacity, copyY } = useScrollLinkedValue({
    ref: rootRef,
    imgScale: [1, 1.08],
    copyOpacity: [1, 0.35],
    copyY: [0, -40],
  });

  return (
    <section ref={rootRef} className="relative h-[min(100svh,920px)] overflow-hidden bg-text">
      {/* 1. WebGL mesh gradient — mint·deep·ivory·white */}
      <MeshGradientBackground
        colors={['#0b1a14', '#20b486', '#0b8065', '#1a2a22']}
        speed={0.14}
      />

      {/* 풀블리드 hero 이미지 — parallax + scroll scale */}
      <motion.div
        style={{ x, y, scale: imgScale }}
        className="absolute inset-0"
      >
        <Image
          src={heroAssets.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-65 mix-blend-overlay"
        />
      </motion.div>

      {/* 2. 사선 그리드 텍스처 (우상단) */}
      <GridTextureOverlay opacity={0.06} size={32} rotate={35} />

      {/* 좌→우 가독성 mask (다크) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(95deg, rgba(8,14,11,0.86) 0%, rgba(8,14,11,0.6) 38%, rgba(8,14,11,0.18) 70%, rgba(8,14,11,0.04) 100%)',
        }}
      />

      {/* 하단 fade */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-40"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(8,14,11,0.6) 100%)',
        }}
      />

      {/* 5. 떠다니는 키워드 풍선 × 6 (depth + scale + blur + hover) */}
      {KEYWORDS.map((k) => (
        <FloatingPill
          key={k.label}
          depth={k.depth}
          duration={k.duration}
          delay={k.delay}
          className="absolute select-none"
          style={{ left: k.x, top: k.y }}
        >
          <span
            className="rounded-pill border px-3.5 py-1.5 font-mono text-small backdrop-blur"
            style={{
              borderColor: 'rgb(var(--mint-rgb) / 0.45)',
              background: 'rgba(8, 14, 11, 0.42)',
              color: 'rgb(var(--mint-rgb) / 1)',
              boxShadow: '0 8px 24px rgba(8, 14, 11, 0.35)',
            }}
          >
            #{k.label}
          </span>
        </FloatingPill>
      ))}

      {/* 카피 + CTA */}
      <motion.div
        style={{ opacity: copyOpacity, y: copyY }}
        className="relative z-10 flex h-full items-center"
      >
        <div className="mx-auto w-full max-w-7xl px-[var(--space-gutter)]">
          <p
            className="text-eyebrow tracking-[0.18em]"
            style={{ color: 'rgb(var(--mint-rgb) / 1)' }}
          >
            {heroCopy.eyebrow}
          </p>
          {/* 7. Mask reveal headline */}
          <h1 className="text-display ko-heading mt-4 max-w-3xl">
            <MaskRevealText from="rgb(var(--mint-rgb))" to="#ffffff">
              {heroCopy.headline}
            </MaskRevealText>
          </h1>
          <p
            className="text-body ko-relaxed mt-5 max-w-xl"
            style={{ color: 'rgba(255, 255, 255, 0.82)' }}
          >
            {heroCopy.sub}
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            {/* 6. Magnetic CTA */}
            <MagneticButton strength={14} radius={140}>
              <Link
                href={heroCopy.ctaPrimary.href}
                className="rounded-pill bg-accent px-7 py-3.5 text-body font-medium text-surface transition-colors hover:bg-accent-strong"
              >
                {heroCopy.ctaPrimary.label}
              </Link>
            </MagneticButton>
            <span className="text-small" style={{ color: 'rgba(255,255,255,0.55)' }}>
              또는
            </span>
            <Link
              href={heroCopy.ctaSecondary.href}
              className="rounded-pill border px-6 py-3 text-body font-medium transition-colors hover:bg-white/10"
              style={{ borderColor: 'rgba(255,255,255,0.28)', color: '#ffffff' }}
            >
              {heroCopy.ctaSecondary.label}
            </Link>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-5 gap-y-2">
            {heroCopy.benefits.map((b) => (
              <li
                key={b.title}
                className="flex items-center gap-2 text-small ko-tight"
                style={{ color: 'rgba(255,255,255,0.72)' }}
              >
                <span
                  aria-hidden
                  className="size-2 rounded-pill"
                  style={{ background: 'rgb(var(--mint-rgb))' }}
                />
                <span className="font-medium text-surface">{b.title}</span>
                <span>· {b.body}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* 8. Lenis-aware scroll cue */}
      <div
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        style={{ color: 'rgba(255,255,255,0.7)' }}
      >
        <ScrollCue label="스크롤" />
      </div>
    </section>
  );
}
