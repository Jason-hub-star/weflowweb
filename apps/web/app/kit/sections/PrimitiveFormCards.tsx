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

export function PrimitiveFormCards() {
  return (
    <>
      <KitCard
        name="<Input>"
        category="Primitive"
        importPath="@/components/primitives"
        description="텍스트 한 줄 입력칸. 라벨 · 도움말 · 에러 메시지 자동 처리."
        propsNote={[
          { name: 'label', type: 'ReactNode?' },
          { name: 'hint', type: 'ReactNode?' },
          { name: 'error', type: 'ReactNode?' },
        ]}
        demo={
          <div className="grid gap-3">
            <Input label="이름" placeholder="홍길동" />
            <Input
              label="이메일"
              type="email"
              placeholder="you@example.com"
              hint="답변을 보낼 주소"
            />
            <Input label="전화" defaultValue="010" error="형식이 맞지 않습니다" />
          </div>
        }
        code={`<Input
              label="이메일"
              type="email"
              placeholder="you@example.com"
              hint="답변을 보낼 주소"
            />`}
      />

      <KitCard
        name="<Textarea>"
        category="Primitive"
        importPath="@/components/primitives"
        description="여러 줄 입력칸. 문의·후기에 사용."
        demo={
          <Textarea
            label="문의 내용"
            placeholder="현재 사이트와 원하시는 점을 알려주세요"
            hint="500자 이내"
          />
        }
        code={`<Textarea label="문의 내용" placeholder="..." hint="500자 이내" />`}
      />

      <KitCard
        name="<Select>"
        category="Primitive"
        importPath="@/components/primitives"
        description="드롭다운 선택. 업종·예산·일정 등 옵션 선택."
        demo={
          <Select label="업종" defaultValue="">
            <option value="" disabled>
              선택하세요
            </option>
            <option>카페</option>
            <option>의류</option>
            <option>학원</option>
          </Select>
        }
        code={`<Select label="업종" name="industry">
              <option>카페</option>
              <option>의류</option>
            </Select>`}
      />

      <KitCard
        name="<Checkbox>"
        category="Primitive"
        importPath="@/components/primitives"
        description="동의·옵션 체크. 약관·마케팅 수신 등."
        demo={
          <div className="grid gap-2">
            <Checkbox label="개인정보 처리방침에 동의합니다" defaultChecked />
            <Checkbox label="마케팅 정보 수신 동의 (선택)" />
          </div>
        }
        code={`<Checkbox label="이용약관 동의" required />`}
      />
    </>
  );
}
