import { KitSection, KitNote } from '@/components/kit/KitCard';
import { PrimitiveBasicsCards } from './PrimitiveBasicsCards';
import { PrimitiveDisclosureCards } from './PrimitiveDisclosureCards';
import { PrimitiveFormCards } from './PrimitiveFormCards';

export function PrimitivesSection() {
  return (
    <>
      <KitSection
        id="primitives"
        title="기본 부품"
        description="버튼·카드·꼬리표·폼 입력칸·탭·아코디언 같은 가장 작은 단위 16종. 페이지를 만들 때 이 부품들을 조합합니다."
      >
        <KitNote>
          카테고리: 버튼·꼬리표 4 · 카드 큰 단위 3 · 폼 입력 4 · 네비 4 · 소품 2 = 총 16. (DEC-049
          정공법 Phase 3)
        </KitNote>
        <PrimitiveBasicsCards />
        <PrimitiveFormCards />
        <PrimitiveDisclosureCards />
      </KitSection>
    </>
  );
}
