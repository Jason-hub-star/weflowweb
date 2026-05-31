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

export function BackgroundLayersSection() {
  return (
    <>
      {/* ============ Background Layers ============ */}
      <KitSection
        id="background-layers"
        title="배경 효과"
        description="화면 뒤쪽에 깔아서 분위기를 만드는 부품입니다."
      >
        <KitCard
          name="<MeshGradientBackground>"
          category="Background"
          importPath="@/components/motion"
          description="여러 색이 부드럽게 섞인 움직이는 배경입니다."
          propsNote={[
            {
              name: 'colors',
              type: 'string[]',
              default: "['#f7f8f5', '#20b486', '#0b8065', '#ffffff']",
            },
            { name: 'speed', type: 'number', default: '0.18', note: '클수록 빠른 흐름' },
          ]}
          demo={<MeshGradientDemo />}
          bgVariant="plain"
          code={`<section className="relative h-[600px] overflow-hidden">
        <MeshGradientBackground
          colors={['#0b1a14', '#20b486', '#0b8065', '#1a2a22']}
          speed={0.14}
        />
        <div className="relative z-10">...</div>
      </section>`}
        />

        <KitCard
          name="<GridTextureOverlay>"
          category="Background"
          importPath="@/components/motion"
          description="밋밋한 배경 위에 얇은 선 무늬를 올립니다."
          propsNote={[
            { name: 'opacity', type: 'number', default: '0.08' },
            { name: 'size', type: 'number', default: '28', note: '라인 간격(px)' },
            { name: 'rotate', type: 'number', default: '35', note: '각도(°)' },
          ]}
          demo={<GridTextureDemo />}
          bgVariant="plain"
          code={`<section className="relative">
        <GridTextureOverlay opacity={0.06} size={32} rotate={35} />
        <div className="relative z-10">...</div>
      </section>`}
        />
      </KitSection>
    </>
  );
}
