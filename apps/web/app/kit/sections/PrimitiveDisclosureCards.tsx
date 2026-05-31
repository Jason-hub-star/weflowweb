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
  SectionBadge,
  MetricBadge,
} from '@/components/primitives';

export function PrimitiveDisclosureCards() {
  return (
    <>
      <KitCard
        name="<Tabs>"
        category="Primitive"
        importPath="@/components/primitives"
        description="여러 패널을 탭으로 전환. 상품 상세·가격 플랜 비교에 사용."
        propsNote={[
          { name: 'items', type: 'TabItem[]', note: '{id, label, content}' },
          { name: 'defaultId', type: 'string?' },
        ]}
        demo={
          <Tabs
            items={[
              { id: 'a', label: '제작', content: <p className="text-small">3~7일 안에 제작</p> },
              { id: 'b', label: '광고', content: <p className="text-small">픽셀 5종 일괄 세팅</p> },
              { id: 'c', label: '운영', content: <p className="text-small">관리자 직접 수정</p> },
            ]}
          />
        }
        code={`<Tabs items={[
              { id: 'a', label: '제작', content: <p>3~7일</p> },
              { id: 'b', label: '광고', content: <p>픽셀 5종</p> },
            ]} />`}
      />

      <KitCard
        name="<Accordion>"
        category="Primitive"
        importPath="@/components/primitives"
        description="FAQ·프로세스 항목을 접고 펼치는 부품. 모바일 가독성 ↑."
        propsNote={[
          { name: 'items', type: 'AccordionItem[]', note: '{id, title, body}' },
          { name: 'allowMultiple', type: 'boolean', default: 'false' },
        ]}
        demo={
          <Accordion
            defaultOpen={['q1']}
            items={[
              {
                id: 'q1',
                title: '제작 기간이 얼마나 걸리나요?',
                body: '랜딩 3~4일, 홈페이지 4~7일 이내.',
              },
              {
                id: 'q2',
                title: '광고도 같이 해주시나요?',
                body: '네, 픽셀 세팅 + 캠페인 운영까지.',
              },
              {
                id: 'q3',
                title: '수정은 직접 할 수 있나요?',
                body: '관리자 페이지에서 배너·후기·팝업 수정 가능합니다.',
              },
            ]}
          />
        }
        code={`<Accordion items={[
              { id: 'q1', title: '기간?', body: '4~7일' },
              { id: 'q2', title: '비용?', body: '맞춤 견적' },
            ]} />`}
      />

      <KitCard
        name="<FaqAccordion>"
        category="Primitive"
        importPath="@/components/primitives"
        description="FAQ 도메인 wrapper. {id, q, a}만 넘기면 Tag(#질문) · 답변 단락 변환 + 첫 항목 자동 펼침. /faq · /pricing · /services 공통."
        propsNote={[
          { name: 'items', type: 'FaqItem[]', note: '{id, q, a}' },
          { name: 'defaultOpenFirst', type: 'boolean', default: 'true' },
          { name: 'emptyLabel', type: 'string?', note: '빈 배열일 때 안내' },
        ]}
        demo={
          <FaqAccordion
            items={[
              {
                id: 'f1',
                q: '제작 기간은 얼마나 걸리나요?',
                a: '랜딩 3~4일, 홈페이지 7일이 표준입니다.',
              },
              {
                id: 'f2',
                q: '광고비는 별도인가요?',
                a: '네, 운영 대행비와 광고비는 별도이며 권장 예산은 월 50만~150만원입니다.',
              },
            ]}
          />
        }
        code={`<FaqAccordion items={[
              { id: 'f1', q: '제작 기간?', a: '랜딩 3~4일, 홈피 7일' },
              { id: 'f2', q: '광고비?', a: '별도, 권장 월 50~150만원' },
            ]} />`}
      />

      <KitCard
        name="<Breadcrumbs>"
        category="Primitive"
        importPath="@/components/primitives"
        description="현재 위치 표시 네비. 상품/사례/블로그 상세에 사용."
        demo={
          <Breadcrumbs
            items={[
              { label: '홈', href: '/' },
              { label: '성공사례', href: '/cases' },
              { label: '온늘 카페' },
            ]}
          />
        }
        code={`<Breadcrumbs items={[
              { label: '홈', href: '/' },
              { label: '성공사례', href: '/cases' },
              { label: '온늘 카페' },
            ]} />`}
      />

      <KitCard
        name="<Pagination>"
        category="Primitive"
        importPath="@/components/primitives"
        description="목록 페이지 번호 네비. 블로그·사례 리스트에 사용."
        propsNote={[
          { name: 'page', type: 'number', note: '1-based 현재 페이지' },
          { name: 'total', type: 'number' },
          { name: 'hrefFor', type: '(p) => string' },
        ]}
        demo={<Pagination page={2} total={5} hrefFor={(p) => `#p${p}`} />}
        code={`<Pagination
              page={page}
              total={totalPages}
              hrefFor={(p) => \`/blog?page=\${p}\`}
            />`}
      />

      <KitCard
        name="<RatingStars>"
        category="Primitive"
        importPath="@/components/primitives"
        description="별점 표시 (읽기 전용). 후기·리뷰 평균에 사용. 소수점 부분 자동 채움."
        propsNote={[
          { name: 'value', type: 'number' },
          { name: 'max', type: 'number', default: '5' },
          { name: 'showValue', type: 'boolean', default: 'false' },
        ]}
        demo={
          <div className="flex flex-col gap-2">
            <RatingStars value={5} />
            <RatingStars value={4.5} showValue />
            <RatingStars value={3.2} size="md" showValue />
          </div>
        }
        code={`<RatingStars value={4.5} showValue />`}
      />

      <KitCard
        name="<Avatar>"
        category="Primitive"
        importPath="@/components/primitives"
        description="프로필 아이콘. 사진 없으면 이름 첫 글자로 자동 fallback."
        propsNote={[
          { name: 'name', type: 'string', note: '필수, fallback 첫 글자' },
          { name: 'src', type: 'string?' },
          { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'" },
        ]}
        demo={
          <div className="flex items-center gap-3">
            <Avatar name="김위플로우" size="sm" />
            <Avatar name="이대표" />
            <Avatar name="박실장" size="lg" />
          </div>
        }
        code={`<Avatar name="김위플로우" />
            <Avatar name="이대표" src="/profile.jpg" />`}
      />

      <KitCard
        name="<StatBar>"
        category="Primitive"
        importPath="@/components/primitives"
        description="총·평균·만족도 등 통계 항목을 가로로 나열. 후기·랜딩 LP 상단에 사용. 강조 항목은 accent 색으로 자동 부각."
        propsNote={[{ name: 'items', type: 'Stat[]', note: '{label, value, emphasis?, detail?}' }]}
        demo={
          <StatBar
            items={[
              { label: '총 후기', value: 24 },
              { label: '평균 별점', value: '4.8 / 5', emphasis: true },
              { label: '제작 건수', value: 120, detail: '런칭 1년차' },
            ]}
          />
        }
        code={`<StatBar items={[
              { label: '총 후기', value: 24 },
              { label: '평균 별점', value: '4.8 / 5', emphasis: true },
              { label: '제작 건수', value: 120 },
            ]} />`}
      />

      <KitCard
        name="<SectionBadge>"
        category="Primitive"
        importPath="@/components/primitives"
        description="섹션 상단에 단독으로 떠 있는 정체성 pill — '리얼 후기', '신규 기능', '성공 사례' 같은 짧은 라벨. icon 슬롯 + accent/amber/muted tone + sm/md size. 출처: DogCoach TestimonialsSection 패턴."
        propsNote={[
          { name: 'children', type: 'ReactNode', note: '라벨 텍스트' },
          { name: 'icon', type: 'ReactNode?', note: '왼쪽 아이콘 슬롯 (★·SVG 등)' },
          { name: 'tone', type: "'accent' | 'amber' | 'muted'", default: "'accent'" },
          { name: 'size', type: "'sm' | 'md'", default: "'md'" },
        ]}
        demo={
          <div className="flex flex-wrap gap-3">
            <SectionBadge icon="★">리얼 후기</SectionBadge>
            <SectionBadge tone="amber" icon="⚡">신규 기능</SectionBadge>
            <SectionBadge tone="muted" size="sm">BUILT BY DEVELOPERS</SectionBadge>
          </div>
        }
        code={`<SectionBadge icon="★">리얼 후기</SectionBadge>
<SectionBadge tone="amber" icon="⚡">신규 기능</SectionBadge>
<SectionBadge tone="muted" size="sm">BUILT BY DEVELOPERS</SectionBadge>`}
      />

      <KitCard
        name="<MetricBadge>"
        category="Primitive"
        importPath="@/components/primitives"
        description="결과 수치 강조 pill — 후기·사례 카드의 '문의 +180%', '예약 +220%' 같은 성과 지표. trend(up/down/neutral/accent)에 따라 화살표·색 자동 차등. 출처: DogCoach TestimonialsSection result badge 패턴."
        propsNote={[
          { name: 'value', type: 'string', note: '수치 (예: "+180%")' },
          { name: 'label', type: 'string?', note: '앞 라벨 (예: "문의")' },
          { name: 'trend', type: "'up' | 'down' | 'neutral' | 'accent'", default: "'accent'" },
          { name: 'size', type: "'sm' | 'md'", default: "'sm'" },
        ]}
        demo={
          <div className="flex flex-wrap items-center gap-3">
            <MetricBadge label="문의" value="+180%" trend="up" />
            <MetricBadge label="이탈" value="-41%" trend="down" />
            <MetricBadge value="응답 24시간" trend="neutral" />
            <MetricBadge label="예약" value="+220%" trend="accent" size="md" />
          </div>
        }
        code={`<MetricBadge label="문의" value="+180%" trend="up" />
<MetricBadge label="이탈" value="-41%" trend="down" />
<MetricBadge value="응답 24시간" trend="neutral" />
<MetricBadge label="예약" value="+220%" size="md" />`}
      />
    </>
  );
}
