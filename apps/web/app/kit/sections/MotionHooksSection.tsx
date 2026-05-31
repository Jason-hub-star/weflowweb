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
  CountupTextDemo,
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

export function MotionHooksSection() {
  return (
    <>
      {/* ============ Motion Hooks ============ */}
      <KitSection
        id="motion-hooks"
        title="움직임 계산"
        description="화면에서 얼마나 움직일지 숫자로 계산해주는 작은 도구입니다."
      >
        <KitCard
          name="useMouseParallax(strength?)"
          category="Hook"
          importPath="@/components/motion"
          description="마우스가 움직이면 카드가 아주 조금 따라오게 합니다."
          propsNote={[
            { name: 'strength', type: 'number', default: '12', note: 'px 단위 최대 이동' },
          ]}
          demo={<MouseParallaxDemo />}
          code={`'use client';
      import { motion } from 'framer-motion';
      import { useMouseParallax } from '@/components/motion';
      
      function Hero() {
        const { x, y } = useMouseParallax(14);
        return <motion.div style={{ x, y }}>...</motion.div>;
      }`}
        />

        <KitCard
          name="useScrollLinkedValue({ ref, imgScale?, copyOpacity?, copyY? })"
          category="Hook"
          importPath="@/components/motion"
          description="페이지를 내릴수록 이미지가 커지거나 글자가 사라지게 합니다."
          propsNote={[
            { name: 'ref', type: 'RefObject', note: '관찰 대상 요소' },
            { name: 'imgScale', type: '[number, number]', default: '[1, 1]' },
            { name: 'copyOpacity', type: '[number, number]', default: '[1, 1]' },
            { name: 'copyY', type: '[number, number]', default: '[0, 0]' },
          ]}
          demo={<ScrollLinkedDemo />}
          code={`'use client';
      import { useRef } from 'react';
      import { motion } from 'framer-motion';
      import { useScrollLinkedValue } from '@/components/motion';
      
      function Hero() {
        const ref = useRef(null);
        const { imgScale, copyOpacity, copyY } = useScrollLinkedValue({
          ref,
          imgScale: [1, 1.08],
          copyOpacity: [1, 0.35],
          copyY: [0, -40],
        });
        return (
          <section ref={ref}>
            <motion.img style={{ scale: imgScale }} src="..." />
            <motion.div style={{ opacity: copyOpacity, y: copyY }}>...</motion.div>
          </section>
        );
      }`}
        />

        <KitCard
          name="useLenisVelocity()"
          category="Hook"
          importPath="@/components/motion"
          description="사용자가 지금 빠르게 내리는지 천천히 내리는지 알아냅니다."
          demo={<VelocityDemo />}
          code={`'use client';
      import { useLenisVelocity } from '@/components/motion';

      function ScrollIndicator() {
        const v = useLenisVelocity();
        return <code>{v.toFixed(2)}</code>;
      }`}
        />

        <KitCard
          name="useCountupText(target, durationMs)"
          category="Hook"
          importPath="@/components/motion"
          description="문자열 안 숫자만 부드럽게 보간 → 가격/메트릭 카운트업. ko-KR 콤마 자동, reduced-motion 시 즉시."
          propsNote={[
            { name: 'target', type: 'string', note: '예: "월 189,000원", "+180%", "5 / 5"' },
            { name: 'durationMs', type: 'number', note: '0이면 즉시 (reduced-motion 분기)' },
          ]}
          demo={<CountupTextDemo />}
          code={`'use client';
      import { useCountupText } from '@/components/motion';

      function Price({ target }: { target: string }) {
        const display = useCountupText(target, 600);
        return <span className="tabular-nums">{display}</span>;
      }`}
        />
      </KitSection>
    </>
  );
}
