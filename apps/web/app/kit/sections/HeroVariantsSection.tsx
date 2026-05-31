/* eslint-disable @typescript-eslint/no-unused-vars */
import Link from 'next/link';
import { KitCard, KitSection, KitNote } from '@/components/kit/KitCard';
import {
  MouseParallaxDemo,
  ScrollLinkedDemo,
  VelocityDemo,
  MagneticDemo,
  MaskRevealDemo,
  FloatingPillDemo,
  ScrollCueDemo,
  MeshGradientDemo,
  GridTextureDemo,
  MobileDrawerDemo,
  TagFilterDemo,
} from '../demos';
import {
  MascotOrbit,
  FloatingParticles,
  ServiceRailDrag,
  ProcessAccordion,
  ClientLogoMarquee,
  HeroVideo,
} from '@/components/motion';
import {
  Button,
  Card,
  Badge,
  Tag,
  Input,
  Textarea,
  Select,
  Checkbox,
  Tabs,
  Accordion,
  FaqAccordion,
  Breadcrumbs,
  Pagination,
  RatingStars,
  Avatar,
  StatBar,
} from '@/components/primitives';

export function HeroVariantsSection() {
  return (
    <>
      {/* ============ Hero Variants ============ */}
      <KitSection
        id="hero-variants"
        title="첫 화면"
        description="방문자가 사이트에 들어오자마자 처음 보는 큰 화면입니다."
      >
        <KitNote>
          큰 화면 예시는 각 링크에서 따로 봅니다. 모아보기는{' '}
          <Link href="/hero-lab" className="text-accent hover:underline">
            /hero-lab
          </Link>
          .
        </KitNote>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              id: '1',
              code: 'A',
              name: '<HeroSplitForm />',
              concept: '좌 카피 + 우 무료진단 폼',
            },
            {
              id: '2',
              code: 'B',
              name: '<HeroFullBleed />',
              concept: '풀스크린 hero + 중앙 카피',
            },
            {
              id: '3',
              code: 'C',
              name: '<HeroCardMosaic />',
              concept: '좌 카피 + 우 4분할 카드',
            },
            {
              id: '4',
              code: 'D',
              name: '<HeroLiveDashboard />',
              concept: '가짜 대시보드 라이브',
            },
            {
              id: '5',
              code: 'E',
              name: '<HeroCarousel />',
              concept: '슬라이드 3컷 + CTA 고정',
            },
            {
              id: '2-plus',
              code: 'B+',
              name: '<HeroFullBleedPlus />',
              concept: 'B + 8 인터랙티브 풀세트',
            },
          ].map((h) => (
            <Link
              key={h.id}
              href={`/hero-lab/${h.id}`}
              className="border-line bg-surface hover:border-accent group rounded-md border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="flex items-baseline justify-between">
                <span className="text-h3 text-text font-mono font-bold">{h.code}</span>
                <span className="text-small text-muted group-hover:text-accent font-mono">
                  /hero-lab/{h.id} →
                </span>
              </div>
              <code className="text-small text-accent mt-2 block font-mono">{h.name}</code>
              <p className="text-small text-muted ko-tight mt-2">{h.concept}</p>
              <code className="text-small text-muted mt-3 block font-mono">
                @/components/hero/{h.name.replace(/[<>/\s]/g, '')}
              </code>
            </Link>
          ))}
        </div>
      </KitSection>
    </>
  );
}
