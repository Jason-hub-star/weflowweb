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

export function LayoutSection() {
  return (
    <>
      {/* ============ Layout ============ */}
      <KitSection
        id="layout"
        title="화면 틀"
        description="사이트의 위, 아래, 메뉴처럼 페이지를 감싸는 기본 모양입니다."
      >
        <KitCard
          name="<SiteHeader />"
          category="Layout"
          importPath="@/components/layout/SiteHeader"
          description="사이트 맨 위에 있는 로고와 메뉴 줄입니다."
          demo={
            <div className="grid h-32 place-items-center">
              <div className="border-line bg-surface flex w-full max-w-md items-center justify-between rounded-md border px-4 py-3">
                <span className="text-small text-text font-mono font-bold">WEFLOW</span>
                <div className="hidden gap-2 sm:flex">
                  <span className="bg-line h-2 w-10 rounded-full" />
                  <span className="bg-line h-2 w-10 rounded-full" />
                  <span className="bg-line h-2 w-10 rounded-full" />
                </div>
                <span className="bg-accent h-7 w-20 rounded-full" />
              </div>
            </div>
          }
          code={`// app/layout.tsx
      import { SiteHeader } from '@/components/layout/SiteHeader';
      <SiteHeader />`}
        />

        <KitCard
          name="<SiteFooter />"
          category="Layout"
          importPath="@/components/layout/SiteFooter"
          description="사이트 맨 아래에 있는 회사 정보와 링크 묶음입니다."
          demo={
            <div className="grid h-32 place-items-center">
              <div className="bg-surface-soft border-line grid w-full max-w-md gap-3 rounded-md border p-4">
                <div className="text-small text-text font-mono font-bold">WEFLOW</div>
                <div className="grid gap-2">
                  <div className="bg-line h-2 rounded-full" />
                  <div className="bg-line h-2 w-2/3 rounded-full" />
                </div>
              </div>
            </div>
          }
          code={`// app/layout.tsx
      import { SiteFooter } from '@/components/layout/SiteFooter';
      <SiteFooter />`}
        />

        <KitCard
          name="<MobileDrawer open onClose />"
          category="Layout"
          importPath="@/components/layout/MobileDrawer"
          description="모바일에서 메뉴 버튼을 누르면 옆에서 나오는 메뉴입니다."
          propsNote={[
            { name: 'open', type: 'boolean' },
            { name: 'onClose', type: '() => void' },
          ]}
          demo={<MobileDrawerDemo />}
          code={`'use client';
      import { useState } from 'react';
      import { MobileDrawer } from '@/components/layout/MobileDrawer';
      
      function Page() {
        const [open, setOpen] = useState(false);
        return (
          <>
            <button onClick={() => setOpen(true)}>열기</button>
            <MobileDrawer open={open} onClose={() => setOpen(false)} />
          </>
        );
      }`}
        />

        <KitCard
          name="<FloatingCTA />"
          category="Layout"
          importPath="@/components/layout/FloatingCTA"
          description="화면 오른쪽 아래에서 무료 진단·카카오톡·전화 문의를 바로 연결합니다."
          demo={
            <div className="relative h-40">
              <div className="border-line bg-surface h-full rounded-md border" />
              <div className="border-line bg-surface absolute bottom-4 right-4 flex w-56 items-center justify-between rounded-lg border px-4 py-3 shadow-md">
                <span>
                  <span className="block text-small font-semibold text-text">문의 바로가기</span>
                  <span className="block text-xs text-muted">진단 · 카카오 · 전화</span>
                </span>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-accent text-small font-bold text-surface">
                  W
                </span>
              </div>
            </div>
          }
          code={`// app/layout.tsx
      import { FloatingCTA } from '@/components/layout/FloatingCTA';
      <FloatingCTA />`}
        />
      </KitSection>
    </>
  );
}
