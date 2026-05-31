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
  ComingSoonChipDemo,
  RadioGroupDemo,
} from '../demos';
import { ComingSoonChip, RadioGroup } from '@/components/primitives';
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

export function PrimitiveBasicsCards() {
  return (
    <>
      <KitCard
        name="<Card>"
        category="Primitive"
        importPath="@/components/primitives"
        description="콘텐츠를 감싸는 상자. 평면 · 그림자 · 유리(블러) 3가지."
        propsNote={[{ name: 'variant', type: "'flat' | 'raised' | 'glass'", default: "'flat'" }]}
        demo={
          <div className="grid gap-3 sm:grid-cols-3">
            <Card>
              <p className="text-small">flat</p>
            </Card>
            <Card variant="raised">
              <p className="text-small">raised</p>
            </Card>
            <Card variant="glass">
              <p className="text-small">glass</p>
            </Card>
          </div>
        }
        code={`<Card variant="raised">
              <h3>제목</h3>
              <p>본문</p>
            </Card>`}
      />

      <KitCard
        name="<Badge>"
        category="Primitive"
        importPath="@/components/primitives"
        description="작은 라벨. 추천 · 신규 · 상태 표시 등에 사용."
        propsNote={[
          {
            name: 'tone',
            type: "'accent' | 'amber' | 'muted' | 'success' | 'warning' | 'error'",
            default: "'accent'",
          },
        ]}
        demo={
          <div className="flex flex-wrap gap-2">
            <Badge>추천</Badge>
            <Badge tone="amber">NEW</Badge>
            <Badge tone="muted">베타</Badge>
            <Badge tone="success">완료</Badge>
            <Badge tone="warning">대기</Badge>
            <Badge tone="error">실패</Badge>
          </div>
        }
        code={`<Badge tone="amber">NEW</Badge>
            <Badge tone="success">완료</Badge>`}
      />

      <KitCard
        name="<Tag>"
        category="Primitive"
        importPath="@/components/primitives"
        description="해시태그 모양 꼬리표. 필터·키워드에 사용."
        demo={
          <div className="flex flex-wrap gap-2">
            <Tag>홈페이지</Tag>
            <Tag>랜딩</Tag>
            <Tag href="#">카페</Tag>
          </div>
        }
        code={`<Tag>홈페이지</Tag>
            <Tag href="/cases?cat=cafe">카페</Tag>`}
      />

      <KitCard
        name="<PageHero>"
        category="Primitive"
        importPath="@/components/primitives"
        description="페이지 상단 큰 타이틀 영역. eyebrow · 제목 · 설명 · 슬롯."
        propsNote={[
          { name: 'eyebrow', type: 'ReactNode?' },
          { name: 'title', type: 'ReactNode' },
          { name: 'sub', type: 'ReactNode?' },
          { name: 'align', type: "'left' | 'center'", default: "'left'" },
        ]}
        demo={
          <div className="border-line bg-surface-soft -mx-6 -my-6 overflow-hidden border-y px-6 py-6">
            <p className="text-eyebrow text-accent">SERVICES</p>
            <h3 className="text-h2 ko-heading mt-2">서비스 안내</h3>
            <p className="text-small text-muted mt-2">제작·광고·운영 한 번에.</p>
          </div>
        }
        code={`<PageHero
              eyebrow="SERVICES"
              title="서비스 안내"
              sub="제작·광고·운영 한 번에."
            />`}
      />

      <KitCard
        name="<CTASection>"
        category="Primitive"
        importPath="@/components/primitives"
        description="페이지 끝의 큰 닫는 CTA. 제목 + 1~2 버튼."
        propsNote={[
          { name: 'title', type: 'ReactNode' },
          { name: 'primary', type: '{label, href}?' },
          { name: 'secondary', type: '{label, href}?' },
        ]}
        demo={
          <div className="border-line -mx-6 -mb-6 border-t px-6 py-6 text-center">
            <p className="text-eyebrow text-accent">FREE</p>
            <h3 className="text-h3 ko-heading mt-1">지금 시작하기</h3>
            <div className="mt-4">
              <Button size="sm">무료 진단</Button>
            </div>
          </div>
        }
        code={`<CTASection
              eyebrow="FREE"
              title="지금 시작하기"
              primary={{ label: '무료 진단', href: '/contact' }}
            />`}
      />

      <KitCard
        name="<RadioGroup>"
        category="Primitive"
        importPath="@/components/primitives"
        description="단일 선택 라디오 그룹. role=radiogroup + 키보드 내장. 선택 시 카드에 accent ring 표시."
        propsNote={[
          { name: 'name', type: 'string', note: '폼 필드 이름' },
          { name: 'options', type: 'RadioOption[]', note: '{value, label}' },
          { name: 'value', type: 'string | null', note: '현재 선택값' },
          { name: 'onChange', type: '(v: string) => void' },
          { name: 'ariaLabel', type: 'string', note: 'screen reader용' },
        ]}
        demo={<RadioGroupDemo />}
        code={`<RadioGroup
              name="deadline"
              options={[{ value: '1-2주', label: '1~2주' }, ...]}
              value={value}
              onChange={setValue}
              ariaLabel="희망 납기"
            />`}
      />

      <KitCard
        name="<ComingSoonChip>"
        category="Primitive"
        importPath="@/components/primitives"
        description="섹션·카드에 미래 기능을 암시하는 점멸 칩. 정적/onClick/href 3분기 자동."
        propsNote={[
          { name: 'label', type: 'string', default: "'곧 공개'" },
          { name: 'description', type: 'ReactNode?', note: '· 뒤 보조 설명' },
          { name: 'onClick', type: '() => void?', note: '있으면 <button>로 렌더' },
          { name: 'href', type: 'string?', note: '있으면 <a>로 렌더' },
        ]}
        demo={<ComingSoonChipDemo />}
        code={`<ComingSoonChip label="ENTERPRISE 곧 공개" description="팀 단위 케어" href="/pricing" />`}
      />
    </>
  );
}
