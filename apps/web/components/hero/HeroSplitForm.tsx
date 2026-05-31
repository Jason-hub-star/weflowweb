'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { reveal, motion as motionTokens } from '@weflow/tokens';
import { heroCopy, heroAssets } from './shared';

/**
 * Hero A — Split Form
 * 좌 카피 · 우 무료진단 폼 카드. devfive 정통 패턴.
 * 적합: 광고 LP, 검색 유입 (전환 거리 최단)
 */
export function HeroSplitForm() {
  return (
    <section className="relative overflow-hidden bg-bg">
      {/* 우상단 mesh gradient — radial-gradient로 mint 분위기 */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 -top-24 h-[520px] w-[520px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(var(--mint-rgb)/0.18), rgba(var(--mint-rgb)/0.04) 60%, transparent 75%)',
        }}
      />
      <div className="mx-auto max-w-7xl px-[var(--space-gutter)] py-[var(--space-section)]">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
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
            <motion.p variants={reveal} className="text-body text-muted ko-relaxed max-w-xl">
              {heroCopy.sub}
            </motion.p>
            <motion.div variants={reveal} className="flex flex-wrap gap-3 pt-2">
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
            <motion.ul variants={reveal} className="flex flex-wrap gap-x-5 gap-y-2 pt-2">
              {heroCopy.benefits.map((b) => (
                <li
                  key={b.title}
                  className="flex items-center gap-2 text-small text-muted ko-tight"
                >
                  <span aria-hidden className="size-2 rounded-pill bg-accent" />
                  <span className="font-medium text-text">{b.title}</span>
                  <span>· {b.body}</span>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* RIGHT — 폼 카드 */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={reveal.viewport}
            transition={{ duration: 0.7, ease: motionTokens.ease, delay: 0.15 }}
            className="relative"
          >
            {/* Flow Guide 캐릭터 — 폼 좌상단 살짝 */}
            <Image
              src={heroAssets.guideHero}
              alt=""
              width={120}
              height={120}
              className="pointer-events-none absolute -left-8 -top-10 z-10 size-24 select-none"
            />
            <div className="rounded-lg border border-line bg-surface p-6 shadow-md sm:p-7">
              <p className="text-eyebrow text-accent">1분 무료 진단</p>
              <p className="text-h3 ko-heading mt-1">지금 신청하면 견적까지</p>
              <form className="mt-5 space-y-3">
                <label className="block">
                  <span className="text-small text-muted">이름</span>
                  <input
                    type="text"
                    name="name"
                    autoComplete="name"
                    className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2.5 text-body text-text focus:border-accent focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-small text-muted">연락처</span>
                  <input
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    placeholder="010-0000-0000"
                    className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2.5 text-body text-text focus:border-accent focus:outline-none"
                  />
                </label>
                <label className="block">
                  <span className="text-small text-muted">제작종류</span>
                  <select
                    name="type"
                    className="mt-1 w-full rounded-md border border-line bg-bg px-3 py-2.5 text-body text-text focus:border-accent focus:outline-none"
                    defaultValue=""
                  >
                    <option value="" disabled>
                      선택해주세요
                    </option>
                    <option value="landing">랜딩 페이지 제작</option>
                    <option value="home">홈페이지 제작</option>
                    <option value="combo">랜딩 & 홈페이지 제작</option>
                    <option value="care">기타 (WEFLOW 케어 플랜)</option>
                  </select>
                </label>
                <label className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    name="consent"
                    className="mt-1 size-4 rounded border-line accent-accent"
                  />
                  <span className="text-small text-muted ko-tight">
                    개인정보 수집 및 상담 동의
                  </span>
                </label>
                <button
                  type="button"
                  className="mt-2 w-full rounded-md bg-accent px-4 py-3 text-body font-medium text-surface transition-colors hover:bg-accent-strong"
                >
                  무료진단 후 견적 받기
                </button>
                <p className="pt-1 text-small text-muted ko-tight">
                  접수 즉시 담당 매니저가 연락드립니다.
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
