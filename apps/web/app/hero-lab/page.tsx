import Link from 'next/link';
import type { Metadata } from 'next';
import { heroVariantsMeta } from '@/components/hero/shared';

export const metadata: Metadata = {
  title: 'Hero Lab — 5안 비교',
  description: '/hero-lab/[1..5] 5안 비교 인덱스',
  robots: { index: false, follow: false },
};

const COMPARISON: Record<string, { rows: { label: string; stars: number }[] }> = {
  '1': {
    rows: [
      { label: '전환 거리', stars: 3 },
      { label: '비주얼 임팩트', stars: 2 },
      { label: '정보 밀도', stars: 2 },
      { label: '차별화', stars: 2 },
      { label: '모바일 친화', stars: 3 },
    ],
  },
  '2': {
    rows: [
      { label: '전환 거리', stars: 1 },
      { label: '비주얼 임팩트', stars: 3 },
      { label: '정보 밀도', stars: 1 },
      { label: '차별화', stars: 2 },
      { label: '모바일 친화', stars: 2 },
    ],
  },
  '3': {
    rows: [
      { label: '전환 거리', stars: 2 },
      { label: '비주얼 임팩트', stars: 2 },
      { label: '정보 밀도', stars: 3 },
      { label: '차별화', stars: 2 },
      { label: '모바일 친화', stars: 2 },
    ],
  },
  '4': {
    rows: [
      { label: '전환 거리', stars: 2 },
      { label: '비주얼 임팩트', stars: 2 },
      { label: '정보 밀도', stars: 3 },
      { label: '차별화', stars: 3 },
      { label: '모바일 친화', stars: 2 },
    ],
  },
  '5': {
    rows: [
      { label: '전환 거리', stars: 2 },
      { label: '비주얼 임팩트', stars: 2 },
      { label: '정보 밀도', stars: 2 },
      { label: '차별화', stars: 1 },
      { label: '모바일 친화', stars: 2 },
    ],
  },
  '2-plus': {
    rows: [
      { label: '전환 거리', stars: 2 },
      { label: '비주얼 임팩트', stars: 3 },
      { label: '정보 밀도', stars: 2 },
      { label: '차별화', stars: 3 },
      { label: '모바일 친화', stars: 2 },
    ],
  },
};

function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`${n}/3`} className="font-mono text-small text-accent">
      {'★'.repeat(n)}
      <span className="text-muted/30">{'★'.repeat(3 - n)}</span>
    </span>
  );
}

export default function HeroLabIndex() {
  return (
    <div className="mx-auto max-w-7xl px-[var(--space-gutter)] py-[var(--space-section)]">
      <p className="text-eyebrow text-accent">Hero Lab</p>
      <h1 className="text-h1 ko-heading mt-3">Hero 6안 비교</h1>
      <p className="text-body text-muted ko-relaxed mt-4 max-w-2xl">
        같은 카피·자산·CTA에서 출발하지만 구조와 인터랙션이 달라요. 각 안을 클릭해서 데스크톱과
        모바일에서 직접 확인해주세요. 선정 후 잔여 안은 컴포넌트로 보존돼{' '}
        <code className="font-mono">/landing</code>·시즌 캠페인·다른 hero에서 재사용됩니다.
      </p>

      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {heroVariantsMeta.map((v) => (
          <li key={v.id}>
            <Link
              href={`/hero-lab/${v.id}`}
              className="group block h-full rounded-lg border border-line bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent hover:shadow-md"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-h2 font-bold text-text">{v.code}</span>
                <span className="rounded-pill border border-line bg-bg px-2 py-0.5 text-small text-muted">
                  {v.cost}
                </span>
              </div>
              <p className="text-h3 ko-heading mt-2">{v.name}</p>
              <p className="text-small text-muted ko-tight mt-2">{v.concept}</p>
              <p className="text-small text-accent mt-4">{v.suitFor}</p>
              <dl className="mt-5 space-y-1.5">
                {COMPARISON[v.id]!.rows.map((r) => (
                  <div key={r.label} className="flex items-center justify-between">
                    <dt className="text-small text-muted ko-tight">{r.label}</dt>
                    <dd>
                      <Stars n={r.stars} />
                    </dd>
                  </div>
                ))}
              </dl>
              <span className="mt-5 inline-flex items-center gap-1 text-small font-medium text-accent transition-transform group-hover:translate-x-1">
                /hero-lab/{v.id} →
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <section className="mt-16 rounded-lg border border-line bg-surface-soft p-6">
        <p className="text-eyebrow text-accent">운영 제안</p>
        <ul className="mt-3 space-y-1.5 text-body text-text ko-relaxed">
          <li><code className="font-mono text-accent">/</code> 홈 = A 또는 D 중 1안</li>
          <li><code className="font-mono text-accent">/landing</code> 광고 LP = B</li>
          <li>시즌 캠페인 보관 = E</li>
          <li><code className="font-mono text-accent">/services</code> hero 재활용 = C</li>
        </ul>
        <p className="mt-4 text-small text-muted ko-tight">
          ※ 결정 시 <code className="font-mono">DECISION-LOG.md</code>에 DEC-XXX로 기록.
        </p>
      </section>
    </div>
  );
}
