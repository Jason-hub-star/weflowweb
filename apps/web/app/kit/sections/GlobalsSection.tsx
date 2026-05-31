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

export function GlobalsSection() {
  return (
    <>
      {/* ============ Globals ============ */}
      <KitSection
        id="globals"
        title="전체 효과"
        description="한 번 켜두면 모든 페이지에 같이 적용되는 기본 장치입니다."
      >
        <KitNote>
          이미 사이트 전체에 연결된 부품입니다. 새 화면 틀을 만들 때만 다시 확인하면 됩니다.
        </KitNote>

        <KitCard
          name="<SmoothScrollProvider />"
          category="Global"
          importPath="@/components/motion"
          description="페이지가 딱딱 끊기지 않고 부드럽게 내려가게 합니다."
          demo={
            <div className="grid h-32 place-items-center">
              <div className="border-line bg-surface w-full max-w-sm rounded-md border p-4">
                <div className="bg-accent h-2 w-24 rounded-full" />
                <div className="mt-4 grid gap-2">
                  <div className="bg-line h-2 rounded-full" />
                  <div className="bg-line h-2 w-4/5 rounded-full" />
                  <div className="bg-line h-2 w-2/3 rounded-full" />
                </div>
              </div>
            </div>
          }
          code={`// app/layout.tsx
      import { SmoothScrollProvider } from '@/components/motion';
      
      export default function RootLayout({ children }) {
        return (
          <html>
            <body>
              <SmoothScrollProvider />
              {children}
            </body>
          </html>
        );
      }`}
        />

        <KitCard
          name="<StickyHeaderWatcher />"
          category="Global"
          importPath="@/components/layout/StickyHeaderWatcher"
          description="아래로 내리면 상단 메뉴가 살짝 구분되어 보이게 합니다."
          demo={
            <div className="grid h-32 place-items-center">
              <div className="border-line bg-surface w-full max-w-sm overflow-hidden rounded-md border">
                <div className="border-line flex items-center justify-between border-b px-4 py-3 shadow-sm">
                  <span className="text-small text-text font-mono">WEFLOW</span>
                  <span className="bg-accent h-2 w-16 rounded-full" />
                </div>
                <div className="grid gap-2 p-4">
                  <div className="bg-line h-2 rounded-full" />
                  <div className="bg-line h-2 w-3/4 rounded-full" />
                </div>
              </div>
            </div>
          }
          code={`// app/layout.tsx
      <StickyHeaderWatcher />
      
      // SiteHeader 안
      <header data-site-header
        className="sticky top-0 ... data-[scrolled=true]:border-b data-[scrolled=true]:shadow-sm">
        ...
      </header>`}
        />
      </KitSection>
    </>
  );
}
