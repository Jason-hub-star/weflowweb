import Link from 'next/link';
import { KitCard, KitSection } from '@/components/kit/KitCard';

export function PageSectionsSection() {
  return (
    <KitSection
      id="page-sections"
      title="페이지 섹션"
      description="페이지 본문에 통째로 넣는 큰 단위입니다. 한 섹션이 화면 한 페이지 정도를 차지합니다."
    >
      <KitCard
        name="<SiteBuildStoryboard data={home.process} />"
        category="Section · Flow Symbol"
        importPath="@/components/motion"
        description="사장님 시점 6단계를 WEFLOW 전용 Flow Loop 심볼로 보여주는 인터랙티브 섹션입니다. 데스크톱(lg+)은 600vh sticky 안에서 심볼이 화면 중앙으로 이동하고 단계별 텍스트가 교차 등장합니다. 모바일은 단계 카드 이동에 맞춰 -50°씩 회전합니다. 데이터는 home.json `process` SSOT에서 받습니다."
        demo={
          <div className="text-small text-muted ko-relaxed space-y-3">
            <p>
              이 섹션은 데스크톱에서 600vh sticky scroll + 중앙 Flow Loop 심볼 + 단계 텍스트
              전환으로 동작합니다. 카드 안에서 미리보기가 불가하므로{' '}
              <Link href="/" className="text-accent underline">
                홈에서 라이브 확인 →
              </Link>
            </p>
            <div>
              <p className="text-eyebrow text-muted mb-1 mt-3">6단계 (사장님 시점)</p>
              <ol className="ml-4 list-decimal space-y-0.5">
                <li>가게 얘기를 나눠요 (Kickoff)</li>
                <li>페이지 순서를 함께 정해요 (Wireframe)</li>
                <li>브랜드 분위기를 살려내요 (Design)</li>
                <li>콘텐츠를 가득 채워요 (Beta)</li>
                <li>첫 문의를 받아요 (Launch)</li>
                <li>계속 함께 챙겨요 (Care)</li>
              </ol>
            </div>
            <p className="text-muted text-[0.78rem]">
              내부 의존: framer-motion (useScroll · useTransform · useMotionValueEvent ·
              useReducedMotion). 회전 링: /assets/process/weflow-process-flow-ring.png · 고정 W:
              /assets/process/weflow-process-w-logo.png
            </p>
          </div>
        }
        code={`// app/page.tsx 마케팅 본문
import { SiteBuildStoryboard } from '@/components/motion';
import { getHomePage } from '@/lib/content/loaders';

const home = getHomePage();
<SiteBuildStoryboard data={home.process} />`}
      />
    </KitSection>
  );
}
