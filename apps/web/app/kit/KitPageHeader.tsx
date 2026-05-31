import Link from 'next/link';

const CATEGORIES = [
  { id: 'globals', title: '전체 효과' },
  { id: 'motion-hooks', title: '움직임 계산' },
  { id: 'motion-components', title: '움직이는 부품' },
  { id: 'motion-signatures', title: 'devfive 시그니처' },
  { id: 'background-layers', title: '배경 효과' },
  { id: 'layout', title: '화면 틀' },
  { id: 'primitives', title: '기본 부품' },
  { id: 'hero-variants', title: '첫 화면' },
  { id: 'page-sections', title: '페이지 섹션' },
] as const;

export function KitPageHeader() {
  return (
    <header className="border-line border-b pb-10">
      <p className="text-eyebrow text-accent">Kit · 컴포넌트 카탈로그</p>
      <h1 className="text-display ko-heading mt-3">눈으로 고르는 WEFLOW 부품</h1>
      <p className="text-body text-muted ko-relaxed mt-5 max-w-2xl">
        각 카드는 “무엇인지”와 “어떻게 보이는지”만 먼저 보여줍니다. 자세한 조절값과 코드는 필요할
        때만 펼쳐서 확인합니다.
      </p>
      <nav className="mt-8 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <Link
            key={c.id}
            href={`#${c.id}`}
            className="rounded-pill border-line bg-surface text-small text-text hover:border-accent hover:text-accent border px-3 py-1.5 transition-colors"
          >
            {c.title}
          </Link>
        ))}
      </nav>
    </header>
  );
}
