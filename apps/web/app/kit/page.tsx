import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { KitPageFooter } from './KitPageFooter';
import { KitPageHeader } from './KitPageHeader';
import {
  BackgroundLayersSection,
  GlobalsSection,
  HeroVariantsSection,
  LayoutSection,
  MotionComponentsSection,
  MotionHooksSection,
  MotionSignaturesSection,
  PageSectionsSection,
  PrimitivesSection,
} from './sections';

export const metadata: Metadata = {
  title: 'Kit — 재사용 컴포넌트 카탈로그',
  description: '레고처럼 끼워 만드는 WEFLOW 컴포넌트 카탈로그',
  robots: { index: false, follow: false },
};

export default function KitPage() {
  if (process.env.VERCEL_ENV === 'production') {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-[var(--space-gutter)] py-[var(--space-section)]">
      <KitPageHeader />
      <div className="mt-16 space-y-20">
        <GlobalsSection />
        <MotionHooksSection />
        <MotionComponentsSection />
        <MotionSignaturesSection />
        <BackgroundLayersSection />
        <LayoutSection />
        <PrimitivesSection />
        <HeroVariantsSection />
        <PageSectionsSection />
      </div>
      <KitPageFooter />
    </div>
  );
}
