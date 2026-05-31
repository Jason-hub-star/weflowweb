import { config } from '@/lib/config';

/**
 * Hero 5안 공통 카피·벤핏·자산.
 * SSOT: docs/ref/HERO-VARIANTS.md
 */
export const heroCopy = {
  eyebrow: config.brand.eyebrow,
  headline: config.brand.slogan,
  sub: config.brand.subSlogan,
  ctaPrimary: { label: '편하게 맡기기', href: '/contact' },
  ctaSecondary: { label: '작업 흐름 보기', href: '/services' },
  ctaTertiary: { label: '사례 보기', href: '/cases' },
  benefits: [
    { title: '맡기면 끝', body: '구성·문구·화면 정리' },
    { title: '데이터 전달', body: '문의·방문 흐름 리포트' },
    { title: '관리 쉬움', body: '수정·공지·배너 케어' },
  ],
} as const;

export const heroAssets = {
  hero: '/assets/weflow-blue-startup-hero.png',
  workflow: '/assets/weflow-blue-startup-service-workflow.png',
  proof: '/assets/weflow-blue-startup-proof-board.png',
  consultation: '/assets/weflow-blue-startup-consultation.png',
  guideHero: '/mascot/weflow-flow-guide-hero.png',
  guideFloating: '/mascot/weflow-flow-guide-floating.png',
  guideReview: '/mascot/weflow-flow-guide-review.png',
  logo: '/logo/weflow-logo_icon.png',
} as const;

export const heroVariantsMeta = [
  {
    id: '1',
    code: 'A',
    name: 'Split Form',
    concept: '좌 카피 · 우 무료진단 폼',
    suitFor: '광고 LP · 검색 유입',
    cost: '0.5d',
  },
  {
    id: '2',
    code: 'B',
    name: 'Full-bleed Visual',
    concept: '풀스크린 hero + 중앙 카피',
    suitFor: '브랜드 인지 · 직접 검색',
    cost: '0.5d',
  },
  {
    id: '3',
    code: 'C',
    name: 'Card Mosaic',
    concept: '좌 카피 + 우 4분할 미리보기',
    suitFor: '비교 탐색',
    cost: '0.7d',
  },
  {
    id: '4',
    code: 'D',
    name: 'Live Mini-Dashboard',
    concept: '우 가짜 대시보드 라이브',
    suitFor: 'B2B 대표 · 실무자',
    cost: '1.5d',
  },
  {
    id: '5',
    code: 'E',
    name: 'Carousel Hero',
    concept: '슬라이드 3컷 + 고정 CTA',
    suitFor: '시즌 캠페인',
    cost: '1.0d',
  },
  {
    id: '2-plus',
    code: 'B+',
    name: 'Enhanced Full-bleed',
    concept: 'WebGL mesh + 떠다니는 키워드 6 + parallax + magnetic + mask reveal',
    suitFor: '홈 / 브랜드 인지 (선정 후보)',
    cost: '1.2d',
  },
] as const;
