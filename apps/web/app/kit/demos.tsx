'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  useMouseParallax,
  useLenisVelocity,
  MagneticButton,
  MaskRevealText,
  FloatingPill,
  MeshGradientBackground,
  GridTextureOverlay,
  ScrollCue,
  TagFilter,
  ReviewModal,
  useCountupText,
} from '@/components/motion';
import { ComingSoonChip, RadioGroup } from '@/components/primitives';
import { MobileDrawer } from '@/components/layout/MobileDrawer';
import type { ReviewItem } from '@/lib/content/schemas';

/**
 * /kit 페이지에 들어가는 미니 데모 컴포넌트 모음.
 * 'use client'가 한 곳에 모이도록 의도적으로 한 파일로 분리.
 */

export function MouseParallaxDemo() {
  const { x, y } = useMouseParallax(20);
  return (
    <div className="flex h-32 items-center justify-center">
      <motion.div
        style={{ x, y }}
        className="border-line bg-surface text-small text-text ko-tight rounded-md border px-4 py-3 shadow-md"
      >
        마우스를 따라 살짝 움직이는 카드
      </motion.div>
    </div>
  );
}

export function ScrollLinkedDemo() {
  return (
    <div className="flex h-36 items-center justify-center">
      <div className="border-line bg-surface grid w-full max-w-sm gap-3 rounded-md border p-4">
        <div className="bg-accent h-2 w-1/3 rounded-full" />
        <div className="bg-accent-soft h-16 rounded-md" />
        <div className="text-small text-muted ko-tight flex items-center justify-between">
          <span>위에서는 작게</span>
          <span>내리면 커짐</span>
        </div>
      </div>
    </div>
  );
}

export function VelocityDemo() {
  const v = useLenisVelocity();
  return (
    <div className="flex h-32 flex-col items-start justify-center gap-2">
      <p className="text-eyebrow text-muted">스크롤 빠르기</p>
      <code className="text-h2 text-text font-mono font-bold">{v.toFixed(2)}</code>
      <p className="text-small text-muted ko-tight">페이지를 내리면 숫자가 바뀝니다</p>
    </div>
  );
}

export function MagneticDemo() {
  return (
    <div className="flex h-32 items-center justify-center">
      <MagneticButton strength={14} radius={140}>
        <button
          type="button"
          className="rounded-pill bg-accent text-body text-surface px-6 py-3 font-medium"
        >
          끌려오는 버튼
        </button>
      </MagneticButton>
    </div>
  );
}

export function MaskRevealDemo() {
  return (
    <div className="flex h-32 items-center justify-center">
      <p className="text-h2 ko-heading">
        <MaskRevealText from="var(--accent)" to="var(--text)">
          글자가 천천히 나타나요
        </MaskRevealText>
      </p>
    </div>
  );
}

export function FloatingPillDemo() {
  return (
    <div className="relative h-40">
      {[
        { d: 0.95, x: '10%', y: '20%', label: '앞 카드' },
        { d: 0.55, x: '45%', y: '55%', label: '중간 카드' },
        { d: 0.3, x: '70%', y: '25%', label: '뒤 카드' },
      ].map((p, i) => (
        <FloatingPill
          key={p.label}
          depth={p.d}
          duration={6 + i}
          delay={i * 0.4}
          className="absolute"
          style={{ left: p.x, top: p.y }}
        >
          <span className="rounded-pill border-accent-soft bg-surface text-small text-accent border px-3 py-1 font-mono">
            {p.label}
          </span>
        </FloatingPill>
      ))}
    </div>
  );
}

export function ScrollCueDemo() {
  return (
    <div className="text-accent flex h-32 items-center justify-center">
      <ScrollCue label="아래로" />
    </div>
  );
}

export function MeshGradientDemo() {
  return (
    <div className="border-line relative h-40 overflow-hidden rounded-md border">
      <MeshGradientBackground colors={['#f7f8f5', '#20b486', '#0b8065', '#eef3ef']} speed={0.32} />
    </div>
  );
}

export function GridTextureDemo() {
  return (
    <div className="border-line bg-surface relative h-40 overflow-hidden rounded-md border">
      <GridTextureOverlay opacity={0.18} size={24} rotate={35} />
      <div className="text-small text-muted relative z-10 flex h-full items-center justify-center">
        배경 위에 얇은 선을 깔아요
      </div>
    </div>
  );
}

export function MobileDrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex h-32 items-center justify-center">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="border-line bg-surface text-small text-text hover:bg-bg rounded-md border px-4 py-2 font-medium"
      >
        메뉴 열기
      </button>
      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export function TagFilterDemo() {
  const options = ['전체', '카페·F&B', '운동/뷰티', '교육'];
  const [active, setActive] = useState(options[0] ?? '전체');
  return (
    <div className="flex flex-col gap-3">
      <TagFilter options={options} value={active} onChange={setActive} />
      <p className="text-small text-muted">
        선택: <span className="text-accent font-mono">#{active}</span>
      </p>
    </div>
  );
}

export function RadioGroupDemo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <RadioGroup
      name="kit-radio-demo"
      options={[
        { value: '1-2주', label: '1~2주' },
        { value: '3-4주', label: '3~4주' },
        { value: '협의', label: '협의' },
      ]}
      value={value}
      onChange={setValue}
      ariaLabel="희망 납기 데모"
    />
  );
}

export function ComingSoonChipDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <ComingSoonChip label="곧 공개" />
      <ComingSoonChip
        label="ENTERPRISE"
        description="팀 단위 케어"
        onClick={() => alert('사전 알림 신청 모달')}
      />
      <ComingSoonChip label="AI 챗" description="안내 받기" href="#" />
    </div>
  );
}

export function ScrollProgressRailDemo() {
  // 실제 컴포넌트는 fixed lg:flex 라 데모는 정적 미니어처로 표시.
  const sections = [
    { id: 'story', label: '스토리' },
    { id: 'pricing', label: '가격' },
    { id: 'reviews', label: '후기', active: true },
    { id: 'cases', label: '사례' },
  ];
  return (
    <div className="border-line bg-surface-soft relative flex h-40 items-center justify-center gap-6 rounded-md border">
      <nav aria-label="미니 진행 인디케이터" className="flex flex-col gap-3">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="group flex items-center gap-3"
            aria-current={s.active ? 'true' : undefined}
          >
            <span
              className={[
                'h-2 w-2 rounded-full transition-all',
                s.active ? 'bg-accent scale-150' : 'bg-line group-hover:bg-accent/60',
              ].join(' ')}
            />
            <span
              className={[
                'text-eyebrow font-mono transition-opacity',
                s.active ? 'text-accent opacity-100' : 'text-muted opacity-0 group-hover:opacity-100',
              ].join(' ')}
            >
              {s.label}
            </span>
          </a>
        ))}
      </nav>
      <p className="text-small text-muted ko-tight max-w-[12rem]">
        실제 컴포넌트는 lg+ 화면 좌측 sticky로 표시됩니다.
      </p>
    </div>
  );
}

const DEMO_REVIEWS: ReviewItem[] = [
  {
    id: 'demo-1',
    name: '김대표',
    biz: '온늘 카페',
    bizType: '카페·F&B',
    rating: 5,
    body: '제작도 빠르고 광고까지 한 번에 정리되니까 운영하면서 헤맬 일이 없었어요.',
    date: '2026-04-12',
    result: '문의 +180%',
  },
  {
    id: 'demo-2',
    name: '이실장',
    biz: '필라테스 스튜디오',
    bizType: '운동/뷰티',
    rating: 5,
    body: '예약 폼이랑 알림이 자동으로 가니까 전화 응대 시간이 절반으로 줄었어요.',
    date: '2026-04-05',
    result: '예약 +220%',
  },
];

export function ReviewModalDemo() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={() => setOpenIndex(0)}
        className="border-accent bg-accent text-surface rounded-pill self-start border px-4 py-2 text-sm font-semibold"
      >
        모달 열기
      </button>
      <p className="text-small text-muted ko-tight">
        ESC · backdrop click · 화살표 키로 이전/다음.
      </p>
      <ReviewModal
        open={openIndex !== null}
        reviews={DEMO_REVIEWS}
        index={openIndex ?? 0}
        onIndexChange={setOpenIndex}
        onClose={() => setOpenIndex(null)}
      />
    </div>
  );
}

export function CountupTextDemo() {
  const [mode, setMode] = useState<'monthly' | 'yearly'>('monthly');
  const target = mode === 'monthly' ? '월 189,000원' : '월 159,000원';
  const display = useCountupText(target, 600);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        {(['monthly', 'yearly'] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={[
              'rounded-pill text-small border px-3 py-1.5 font-mono',
              mode === m
                ? 'border-accent bg-accent text-surface'
                : 'border-line bg-surface text-muted hover:text-text',
            ].join(' ')}
          >
            {m === 'monthly' ? '월 결제' : '연 결제'}
          </button>
        ))}
      </div>
      <p className="text-h2 text-accent-strong font-bold tabular-nums">{display}</p>
    </div>
  );
}
