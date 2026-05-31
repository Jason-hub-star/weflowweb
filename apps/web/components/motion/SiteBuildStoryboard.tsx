'use client';

import { useReducedMotion } from 'framer-motion';
import type { HomePage } from '@/lib/content/schemas';
import { SiteBuildStoryboardDesktop } from './SiteBuildStoryboard.desktop';
import { SiteBuildStoryboardMobile } from './SiteBuildStoryboard.mobile';
import { SiteBuildStoryboardStatic } from './SiteBuildStoryboard.static';

/**
 * 사이트가 만들어지는 6단계 — WEFLOW Flow Loop 인터랙션 (DEC-052 + DEC-057).
 *
 * 데스크톱(lg+): 600vh sticky scroll + WEFLOW 전용 심볼 PNG 회전.
 * 모바일: 단계 카드 이동에 맞춰 같은 PNG 심볼이 -50°씩 회전.
 * reduced-motion: 정적 stack 카드 6장.
 */

type ProcessData = HomePage['process'];

export function SiteBuildStoryboard({ data }: { data: ProcessData }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <SiteBuildStoryboardStatic data={data} />;
  }

  return (
    <>
      <div className="lg:hidden">
        <SiteBuildStoryboardMobile data={data} />
      </div>
      <div className="hidden lg:block">
        <SiteBuildStoryboardDesktop data={data} />
      </div>
    </>
  );
}
