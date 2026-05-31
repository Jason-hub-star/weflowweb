import { KitCard, KitSection, KitNote } from '@/components/kit/KitCard';
import { TagFilterDemo } from '../demos';
import {
  MascotOrbit,
  FloatingParticles,
  ServiceRailDrag,
  ProcessAccordion,
  ClientLogoMarquee,
  HeroVideo,
} from '@/components/motion';
import { MotionInteractionSignatures } from './MotionInteractionSignatures';

export function MotionSignaturesSection() {
  return (
    <>
      {/* ============ Motion Signatures (devfive) ============ */}
      <KitSection
        id="motion-signatures"
        title="devfive 시그니처 움직임"
        description="참고 사이트(devfive.kr)에서 가져온 시그니처 패턴 5종. Why 섹션·Hero·서비스 레일·프로세스·파트너 띠에 사용."
      >
        <KitNote>
          5종: 마스코트 떠다님 · 떠다니는 키워드 · 가로 드래그 레일 · 프로세스 타임라인 · 로고 띠.
          (Task #4 정공법 Phase 3 Day 4)
        </KitNote>

        <KitCard
          name="<MascotOrbit>"
          category="Signature"
          importPath="@/components/motion"
          description="마스코트가 위아래로 둥둥 떠다니며 미세하게 회전합니다. Why 섹션 · 빈 영역 보조 포인트."
          propsNote={[
            { name: 'amplitude', type: 'number', default: '12', note: 'px 진폭' },
            { name: 'duration', type: 'number', default: '6', note: '1 cycle 초' },
            { name: 'rotate', type: 'number', default: '4', note: '회전 각도(deg)' },
            { name: 'delay', type: 'number', default: '0' },
          ]}
          demo={
            <div className="grid h-44 place-items-center">
              <MascotOrbit amplitude={10} duration={5} rotate={6}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/mascot/weflow-flow-guide-floating.png"
                  alt=""
                  className="h-28 w-28 object-contain"
                />
              </MascotOrbit>
            </div>
          }
          code={`<MascotOrbit amplitude={14} duration={6}>
        <Image src="/mascot/weflow-flow-guide-floating.png" width={120} height={120} alt="" />
      </MascotOrbit>`}
        />

        <KitCard
          name="<FloatingParticles>"
          category="Signature"
          importPath="@/components/motion"
          description="키워드·태그 N개가 깊이감을 가지고 동시에 떠다닙니다. Hero 배경 보강에 사용."
          propsNote={[
            {
              name: 'particles',
              type: 'Particle[]',
              note: '{id, content, style, depth, duration, delay}',
            },
          ]}
          demo={
            <div className="bg-surface-soft border-line relative h-48 overflow-hidden rounded-md border">
              <FloatingParticles
                particles={[
                  {
                    id: 1,
                    content: (
                      <span className="rounded-pill border-accent-soft bg-surface text-accent text-small border px-3 py-1 font-mono">
                        #랜딩페이지
                      </span>
                    ),
                    depth: 0.95,
                    duration: 6,
                    delay: 0,
                    style: { left: '8%', top: '20%' },
                  },
                  {
                    id: 2,
                    content: (
                      <span className="rounded-pill border-accent-soft bg-surface text-accent text-small border px-3 py-1 font-mono">
                        #광고연동
                      </span>
                    ),
                    depth: 0.5,
                    duration: 8,
                    delay: 1,
                    style: { left: '60%', top: '15%' },
                  },
                  {
                    id: 3,
                    content: (
                      <span className="rounded-pill border-line bg-surface text-muted text-small border px-3 py-1 font-mono">
                        #예약시스템
                      </span>
                    ),
                    depth: 0.3,
                    duration: 9,
                    delay: 2,
                    style: { left: '30%', top: '60%' },
                  },
                  {
                    id: 4,
                    content: (
                      <span className="rounded-pill border-accent-soft bg-surface text-accent text-small border px-3 py-1 font-mono">
                        #검색등록
                      </span>
                    ),
                    depth: 0.8,
                    duration: 7,
                    delay: 0.5,
                    style: { left: '70%', top: '55%' },
                  },
                ]}
              />
            </div>
          }
          code={`<section className="relative">
        <FloatingParticles particles={[
          { id: 1, content: <Tag>홈페이지</Tag>, depth: 0.9,
            style: { left: '10%', top: '20%' } },
          { id: 2, content: <Tag>광고</Tag>, depth: 0.5,
            style: { left: '60%', top: '40%' } },
        ]} />
      </section>`}
        />

        <KitCard
          name="<ServiceRailDrag>"
          category="Signature"
          importPath="@/components/motion"
          description="카드들을 가로로 드래그하거나 스와이프해서 볼 수 있습니다. 모바일에 특히 좋아요."
          demo={
            <ServiceRailDrag>
              {['01 제작', '02 광고', '03 운영', '04 관리'].map((label) => (
                <article
                  key={label}
                  className="border-line bg-surface w-56 shrink-0 snap-start rounded-md border p-5"
                >
                  <span className="text-eyebrow text-accent font-mono">{label.split(' ')[0]}</span>
                  <h3 className="text-h3 ko-heading mt-3">{label.split(' ')[1]}</h3>
                  <p className="text-small text-muted mt-2">한 줄 설명</p>
                </article>
              ))}
            </ServiceRailDrag>
          }
          code={`<ServiceRailDrag>
        {services.map((s) => (
          <Card key={s.id} className="w-64 shrink-0 snap-start">
            ...
          </Card>
        ))}
      </ServiceRailDrag>`}
        />

        <KitCard
          name="<ProcessAccordion>"
          category="Signature"
          importPath="@/components/motion"
          description="제작 단계가 좌측 세로선 + 번호 dot으로 표시됩니다. 클릭하면 본문이 펼쳐져요."
          propsNote={[
            { name: 'items', type: 'ProcessStep[]', note: '{id, step, title, body, duration}' },
            { name: 'defaultOpenId', type: 'string?' },
          ]}
          demo={
            <ProcessAccordion
              defaultOpenId="s1"
              items={[
                {
                  id: 's1',
                  step: '01',
                  title: '맞춤 기획',
                  body: '업종과 목표를 듣고 페이지 구조를 잡습니다.',
                  duration: '1일',
                },
                {
                  id: 's2',
                  step: '02',
                  title: '디자인 + 제작',
                  body: '브랜드 톤에 맞는 디자인과 콘텐츠로 페이지 완성.',
                  duration: '2~5일',
                },
                {
                  id: 's3',
                  step: '03',
                  title: '광고·운영 연결',
                  body: '픽셀 세팅 + 첫 캠페인 + 관리자 인계.',
                  duration: '1일',
                },
              ]}
            />
          }
          code={`<ProcessAccordion items={[
        { id: 's1', step: '01', title: '맞춤 기획', body: '...', duration: '1일' },
        { id: 's2', step: '02', title: '디자인+제작', body: '...', duration: '2~5일' },
      ]} />`}
        />

        <KitCard
          name="<HeroVideo>"
          category="Signature"
          importPath="@/components/motion"
          description="Hero 배경에 영상을 깔고 좌측 카피 + 우측 하단 마스코트로 Gemini Veo 워터마크 자동 가림. 영상 src 없으면 poster 이미지 → 그라데이션 순으로 fallback."
          propsNote={[
            { name: 'src', type: 'string?', note: 'mp4/webm 경로 (예: /hero/hero-bg.mp4)' },
            { name: 'poster', type: 'string?', note: '영상 로딩 전 + fallback 이미지' },
            { name: 'children', type: 'ReactNode', note: '좌측 카피·CTA 슬롯' },
            { name: 'visualOverlay', type: 'ReactNode?', note: '우측 인터랙티브 카드 슬롯' },
            {
              name: 'mascot',
              type: 'ReactNode?',
              note: '우측 하단 워터마크 점유 (MascotOrbit 추천)',
            },
            { name: 'minHeight', type: 'string', default: "'80vh'" },
          ]}
          bgVariant="plain"
          demo={
            <HeroVideo
              poster="/assets/weflow-blue-startup-hero.png"
              posterAlt=""
              minHeight="280px"
              mascot={
                <MascotOrbit amplitude={8} duration={5}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/mascot/weflow-flow-guide-floating.png"
                    alt=""
                    className="h-20 w-20 object-contain"
                  />
                </MascotOrbit>
              }
            >
              <p className="text-eyebrow text-accent">WEFLOW</p>
              <h3 className="text-h1 ko-heading mt-3">문의로 이어지는 홈페이지</h3>
              <p className="text-small text-muted mt-3">5초 영상 loop + 카피 + 마스코트.</p>
            </HeroVideo>
          }
          code={`<HeroVideo
        src="/hero/hero-bg.mp4"
        poster="/assets/weflow-blue-startup-hero.png"
        mascot={
          <MascotOrbit amplitude={10} duration={6}>
            <Image src="/mascot/weflow-flow-guide-floating.png"
                   width={140} height={140} alt="" />
          </MascotOrbit>
        }
      >
        <p className="text-eyebrow text-accent">WEFLOW</p>
        <h1 className="text-display ko-heading mt-4">{slogan}</h1>
        <p className="text-body text-muted mt-6">{subSlogan}</p>
        <Button href="/contact" size="lg" className="mt-9">편하게 맡기기</Button>
      </HeroVideo>`}
        />

        <KitCard
          name="<ClientLogoMarquee>"
          category="Signature"
          importPath="@/components/motion"
          description="파트너·클라이언트 로고가 좌우로 무한히 흐릅니다. 양옆은 페이드 처리."
          propsNote={[
            { name: 'items', type: 'LogoItem[]', note: '{id, content}' },
            { name: 'speed', type: 'number', default: '30', note: '한 cycle 초' },
          ]}
          demo={
            <ClientLogoMarquee
              speed={20}
              items={[
                { id: 1, content: <span className="text-h2 text-muted font-mono">CAFE</span> },
                { id: 2, content: <span className="text-h2 text-muted font-mono">ONNEUL</span> },
                { id: 3, content: <span className="text-h2 text-muted font-mono">STUDIO·B</span> },
                { id: 4, content: <span className="text-h2 text-muted font-mono">PILATES</span> },
                { id: 5, content: <span className="text-h2 text-muted font-mono">TAXLAB</span> },
              ]}
            />
          }
          code={`<ClientLogoMarquee speed={25} items={[
        { id: 1, content: <Image src="/logos/cafe.svg" width={120} height={40} alt="Cafe" /> },
        { id: 2, content: <Image src="/logos/onneul.svg" width={120} height={40} alt="Onneul" /> },
      ]} />`}
        />

        <KitCard
          name="<TagFilter>"
          category="Signature"
          importPath="@/components/motion"
          description="카테고리 칩 단일 선택 (controlled). 부모는 RSC 유지, 본 컴포넌트만 'use client'로 격리. cases · reviews · blog · notice · faq 5 라우트 공통."
          propsNote={[
            { name: 'options', type: 'string[]' },
            { name: 'value', type: 'string', note: '현재 활성 칩' },
            { name: 'onChange', type: '(next: string) => void' },
            { name: 'ariaLabel', type: 'string?', default: "'카테고리 필터'" },
          ]}
          demo={<TagFilterDemo />}
          code={`'use client';
      import { useState } from 'react';
      import { TagFilter } from '@/components/motion';
      
      const options = ['전체', '카페·F&B', '운동/뷰티'];
      const [active, setActive] = useState(options[0]);
      <TagFilter options={options} value={active} onChange={setActive} />`}
        />

        <MotionInteractionSignatures />
      </KitSection>
    </>
  );
}
