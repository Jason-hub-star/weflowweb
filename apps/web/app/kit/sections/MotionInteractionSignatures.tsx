import Link from 'next/link';
import { KitCard, KitNote } from '@/components/kit/KitCard';
import {
  DeveloperBuildBoard,
  PauseMarquee,
  ServiceSuccessStack,
  SpotlightCard,
  StaggerReveal,
  TiltCard,
} from '@/components/motion';

export function MotionInteractionSignatures() {
  return (
    <>
      <KitNote>
        시각 압도 패턴 7종: 제작 작업판 · 3D 카드 기울임 · 가로 핀 스크롤 · sticky 스택
        · pause 마퀴 · 단어 stagger · 스포트라이트 글로우. 홈 Why·Cases·Services·Reviews·CTA에
        적용 중.
      </KitNote>

      <KitCard
        name="<DeveloperBuildBoard>"
        category="Interaction"
        importPath="@/components/motion"
        description="작업판 단계와 개발자 검수 체크리스트를 순서대로 보여줍니다. BUILT BY DEVELOPERS 섹션에서 직접 제작감을 전달할 때 사용."
        propsNote={[
          { name: 'mascotSrc', type: 'string?', note: '우측 상단 보조 이미지 경로' },
          { name: 'mascotAlt', type: 'string?', default: "''" },
        ]}
        demo={<DeveloperBuildBoard mascotSrc="/mascot/weflow-blue-developer-hero.png" />}
        code={`<DeveloperBuildBoard mascotSrc="/mascot/weflow-blue-developer-hero.png" />`}
      />

      <KitCard
        name="<TiltCard>"
        category="Interaction"
        importPath="@/components/motion"
        description="마우스 위치에 따라 perspective 1000px + rotateX/Y로 카드가 입체감 있게 기울어집니다. 사례·서비스 카드 hover 강조용. 홈 Cases 6 카드 적용 중."
        propsNote={[
          { name: 'maxTilt', type: 'number', default: '10', note: '최대 기울기 각도' },
          { name: 'children', type: 'ReactNode' },
        ]}
        demo={
          <TiltCard maxTilt={12}>
            <div className="bg-surface border-line rounded-lg border p-8 text-center shadow-md">
              <p className="text-h3 ko-heading">마우스를 올려보세요</p>
              <p className="text-small text-muted mt-2">3D Tilt 효과</p>
            </div>
          </TiltCard>
        }
        code={`<TiltCard maxTilt={10}>
  <article className="rounded-lg border p-6">...</article>
</TiltCard>`}
      />

      <KitCard
        name="<ServiceSuccessStack>"
        category="Interaction · Services"
        importPath="@/components/motion"
        description="SERVICES의 스택되는 성공 패턴 카드입니다. 홈 Services와 /story가 같은 컴포넌트를 import해서 사용합니다. 강조 숫자와 링크는 파란색 대신 amber 톤을 씁니다."
        propsNote={[
          { name: 'items', type: 'ServiceSuccessItem[]', note: '{code, title, body}' },
          { name: 'linkHref', type: 'string?' },
          { name: 'linkLabel', type: 'string', default: "'자세히'" },
          { name: 'topOffset', type: 'string', default: "'6rem'" },
          { name: 'scaleStep', type: 'number', default: '0.04' },
        ]}
        demo={
          <div className="max-h-[420px] overflow-y-auto pr-2">
            <ServiceSuccessStack
              topOffset="1rem"
              scaleStep={0.03}
              linkHref="/services"
              linkLabel="서비스 보기"
              items={[
                {
                  code: '01',
                  title: '알아서 만드는 홈페이지',
                  body: '구성, 문구, 화면을 보기 좋게 정리합니다.',
                },
                {
                  code: '02',
                  title: '문의가 들어오게 연결',
                  body: '상담, 예약, 채널 연결을 헷갈리지 않게 배치합니다.',
                },
                {
                  code: '03',
                  title: '수정·관리도 편하게',
                  body: '공지, 배너, 후기, 문구 수정까지 운영 중 필요한 변경을 처리합니다.',
                },
              ]}
            />
          </div>
        }
        code={`import { ServiceSuccessStack } from '@/components/motion';

<ServiceSuccessStack
  items={services.items}
  linkHref="/services"
  linkLabel="서비스 보기"
/>`}
      />

      <KitCard
        name="<HorizontalPinScroll>"
        category="Interaction"
        importPath="@/components/motion"
        description="섹션이 sticky로 화면에 고정되고 페이지 스크롤이 children의 가로 translateX로 변환됩니다. 사례 갤러리·작업 흐름 강조에 유용. 모바일은 정적 가로 스크롤로 폴백."
        propsNote={[
          { name: 'height', type: 'string', default: "'300vh'" },
          { name: 'travel', type: 'string', default: "'-65%'", note: '가로 이동 거리' },
        ]}
        demo={
          <p className="text-small text-muted ko-relaxed">
            이 인터랙션은 viewport 전체 + 페이지 scroll에 의존하므로 KitCard 안에서 미리보기
            불가.{' '}
            <Link href="/cases" className="text-accent underline">
              /cases 갤러리에서 라이브 확인 →
            </Link>
          </p>
        }
        code={`<HorizontalPinScroll travel="-65%" height="320vh">
  {cases.map(c => <CaseCard key={c.id} {...c} />)}
</HorizontalPinScroll>`}
      />

      <KitCard
        name="<StickyStackCards>"
        category="Interaction"
        importPath="@/components/motion"
        description="children 각 카드가 sticky로 위에 쌓이며 뒤 카드는 scale + opacity로 페이드. 서비스·기능 소개 강조용. 홈 Services 4 단계 적용 중."
        propsNote={[
          { name: 'topOffset', type: 'string', default: "'6rem'" },
          { name: 'scaleStep', type: 'number', default: '0.04', note: '뒤 카드별 scale 감소' },
        ]}
        demo={
          <p className="text-small text-muted ko-relaxed">
            sticky scroll 의존 — 페이지 본문에서 동작.{' '}
            <Link href="/" className="text-accent underline">
              홈 Services 섹션 확인 →
            </Link>
          </p>
        }
        code={`<StickyStackCards>
  {services.map(s => <ServiceCard key={s.id} {...s} />)}
</StickyStackCards>`}
      />

      <KitCard
        name="<PauseMarquee>"
        category="Interaction"
        importPath="@/components/motion"
        description="children이 좌→우로 무한 흐르고 hover 시 일시정지 (CSS animation-play-state). seamless loop 위해 자동 2배 복제. 후기·로고·태그 흐름. 홈 Reviews 3 후기 적용 중."
        propsNote={[{ name: 'speed', type: 'number', default: '32', note: '한 사이클 초' }]}
        demo={
          <PauseMarquee speed={20}>
            {['카페', '필라테스', '세무', '스튜디오', '서점', '학원'].map((label) => (
              <span
                key={label}
                className="bg-accent-soft text-accent-strong text-small shrink-0 rounded-full px-4 py-2 font-medium"
              >
                {label}
              </span>
            ))}
          </PauseMarquee>
        }
        code={`<PauseMarquee speed={32}>
  {reviews.map(r => <ReviewCard key={r.id} {...r} />)}
</PauseMarquee>`}
      />

      <KitCard
        name="<SpotlightCard>"
        category="Interaction"
        importPath="@/components/motion"
        description="마우스 위치에 따라 카드 표면에 radial-gradient 글로우가 따라붙어 hover한 카드 한 장만 또렷이 강조됩니다. 신뢰형 그리드(WHY·기능 비교 카드)에 적합. 홈 Why 6 카드 적용 중."
        propsNote={[
          { name: 'glowColor', type: 'string', default: "'var(--color-accent)'" },
          { name: 'glowSize', type: 'number', default: '320', note: '글로우 반경 px' },
          { name: 'glowOpacity', type: 'number', default: '0.18', note: '최대 글로우 불투명도' },
        ]}
        demo={
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {['먼저 알려드립니다', '문구를 다듬어요'].map((label) => (
              <SpotlightCard
                key={label}
                className="border-line bg-surface rounded-md border p-5"
              >
                <p className="text-body text-text font-semibold">{label}</p>
                <p className="text-small text-muted ko-relaxed mt-1">
                  카드 위에 마우스를 올려보세요.
                </p>
              </SpotlightCard>
            ))}
          </div>
        }
        code={`<SpotlightCard className="border-line bg-surface rounded-md border p-5">
  <h3>...</h3>
</SpotlightCard>`}
      />

      <KitCard
        name="<StaggerReveal>"
        category="Interaction"
        importPath="@/components/motion"
        description="text를 word(기본) 또는 char로 split하고 한 단위씩 fade-up. viewport 진입 시 한 번 재생. 큰 헤딩 강조용. 홈 Why 헤딩 적용 중."
        propsNote={[
          { name: 'text', type: 'string' },
          { name: 'split', type: "'word' | 'char'", default: "'word'" },
          { name: 'stagger', type: 'number', default: '0.08' },
          { name: 'duration', type: 'number', default: '0.5' },
        ]}
        demo={
          <p className="text-h3 ko-heading">
            <StaggerReveal text="단어가 한 개씩 부드럽게 등장합니다" stagger={0.1} />
          </p>
        }
        code={`<h2 className="text-h1">
  <StaggerReveal text="외주를 맡겼는데도..." stagger={0.06} />
</h2>`}
      />
    </>
  );
}
