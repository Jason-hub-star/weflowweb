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
  ScrollProgressRailDemo,
  ReviewModalDemo,
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

export function MotionComponentsSection() {
  return (
    <>
      {/* ============ Motion Components ============ */}
      <KitSection
        id="motion-components"
        title="움직이는 부품"
        description="그대로 끼우면 버튼, 글자, 태그가 움직이는 부품입니다."
      >
        <KitCard
          name="<MagneticButton>"
          category="Component"
          importPath="@/components/motion"
          description="마우스가 가까이 오면 버튼이 살짝 끌려옵니다."
          propsNote={[
            { name: 'strength', type: 'number', default: '8' },
            { name: 'radius', type: 'number', default: '120', note: 'px 범위' },
            { name: 'children', type: 'ReactNode', note: '<Link>·<button>·<a> 등' },
          ]}
          demo={<MagneticDemo />}
          code={`<MagneticButton strength={14} radius={140}>
        <Link href="/contact" className="rounded-pill bg-accent px-6 py-3 text-surface">
          무료 진단 신청
        </Link>
      </MagneticButton>`}
        />

        <KitCard
          name="<MaskRevealText>"
          category="Component"
          importPath="@/components/motion"
          description="중요한 문장이 왼쪽에서 오른쪽으로 천천히 드러납니다."
          propsNote={[
            { name: 'children', type: 'string' },
            { name: 'from', type: 'string', default: "'var(--accent)'" },
            { name: 'to', type: 'string', default: "'var(--text)'" },
            { name: 'duration', type: 'number', default: '1.4' },
            { name: 'delay', type: 'number', default: '0' },
          ]}
          demo={<MaskRevealDemo />}
          code={`<h1 className="text-display ko-heading">
        <MaskRevealText from="var(--accent)" to="var(--text)">
          문의로 이어지는 홈페이지를 만듭니다
        </MaskRevealText>
      </h1>`}
        />

        <KitCard
          name="<FloatingPill>"
          category="Component"
          importPath="@/components/motion"
          description="작은 태그 카드가 앞뒤 깊이감을 가지고 천천히 떠다닙니다."
          propsNote={[
            { name: 'depth', type: 'number 0~1', default: '0.5', note: '0=뒤, 1=앞' },
            { name: 'duration', type: 'number', default: '7' },
            { name: 'delay', type: 'number', default: '0' },
            { name: 'children', type: 'ReactNode' },
          ]}
          demo={<FloatingPillDemo />}
          code={`<FloatingPill depth={0.95} duration={7} delay={0}
        className="absolute" style={{ left: '10%', top: '20%' }}>
        <span className="rounded-pill border border-accent-soft bg-surface px-3 py-1 font-mono text-small text-accent">
          #랜딩페이지
        </span>
      </FloatingPill>`}
        />

        <KitCard
          name="<ScrollCue>"
          category="Component"
          importPath="@/components/motion"
          description="첫 화면 아래에 더 볼 내용이 있다는 표시를 보여줍니다."
          propsNote={[{ name: 'label', type: 'string', default: "'아래로'" }]}
          demo={<ScrollCueDemo />}
          code={`<div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-surface/70">
        <ScrollCue label="스크롤" />
      </div>`}
        />

        <KitCard
          name="<ScrollProgressRail>"
          category="Component"
          importPath="@/components/motion"
          description="lg+ 화면 좌측에 sticky 세로 진행 인디케이터. IntersectionObserver로 활성 섹션 자동 감지."
          propsNote={[
            { name: 'sections', type: '{id, label}[]', note: '대응하는 element에 같은 id 필요' },
            { name: 'className', type: 'string?', note: '추가 tailwind' },
          ]}
          demo={<ScrollProgressRailDemo />}
          code={`<ScrollProgressRail
        sections={[
          { id: 'story', label: '스토리' },
          { id: 'pricing', label: '가격' },
          { id: 'reviews', label: '후기' },
        ]}
      />`}
        />

        <KitCard
          name="<ReviewModal>"
          category="Component"
          importPath="@/components/motion"
          description="후기 상세 모달. focus trap + ESC + 화살표 키 carousel + 별점 분포 mini chart."
          propsNote={[
            { name: 'open', type: 'boolean' },
            { name: 'reviews', type: 'ReviewItem[]', note: '@/lib/content/schemas' },
            { name: 'index', type: 'number' },
            { name: 'onIndexChange', type: '(n: number) => void' },
            { name: 'onClose', type: '() => void' },
          ]}
          demo={<ReviewModalDemo />}
          code={`const [openIndex, setOpenIndex] = useState<number | null>(null);
      <ReviewModal
        open={openIndex !== null}
        reviews={reviews}
        index={openIndex ?? 0}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />`}
        />
      </KitSection>
    </>
  );
}
