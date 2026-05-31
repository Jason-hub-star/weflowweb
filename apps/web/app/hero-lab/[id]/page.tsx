import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { HeroSplitForm } from '@/components/hero/HeroSplitForm';
import { HeroFullBleed } from '@/components/hero/HeroFullBleed';
import { HeroCardMosaic } from '@/components/hero/HeroCardMosaic';
import { HeroLiveDashboard } from '@/components/hero/HeroLiveDashboard';
import { HeroCarousel } from '@/components/hero/HeroCarousel';
import { HeroFullBleedPlus } from '@/components/hero/HeroFullBleedPlus';
import { heroVariantsMeta } from '@/components/hero/shared';

export const dynamicParams = false;

export async function generateStaticParams() {
  return heroVariantsMeta.map((v) => ({ id: v.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const meta = heroVariantsMeta.find((v) => v.id === id);
  return {
    title: meta ? `Hero ${meta.code} · ${meta.name}` : 'Hero Lab',
    description: meta?.concept,
    robots: { index: false, follow: false },
  };
}

const COMPONENTS: Record<string, React.ComponentType> = {
  '1': HeroSplitForm,
  '2': HeroFullBleed,
  '3': HeroCardMosaic,
  '4': HeroLiveDashboard,
  '5': HeroCarousel,
  '2-plus': HeroFullBleedPlus,
};

export default async function HeroLabPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const Comp = COMPONENTS[id];
  const meta = heroVariantsMeta.find((v) => v.id === id);
  if (!Comp || !meta) notFound();

  return (
    <>
      <Comp />

      {/* 라보 인디케이터 — 시안 라우트임을 알림 + 다른 안 빠른 전환 */}
      <div className="fixed bottom-24 left-1/2 z-30 max-w-[calc(100vw-24px)] -translate-x-1/2 overflow-x-auto rounded-pill border border-line bg-surface/95 px-3 py-1.5 shadow-md backdrop-blur">
        <div className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="text-eyebrow text-muted">시안</span>
          <span className="font-mono text-small font-bold text-text">{meta.code}</span>
          <span className="hidden text-small text-muted ko-tight sm:inline">· {meta.name}</span>
          <span className="mx-1 h-3 w-px bg-line" />
          {heroVariantsMeta.map((v) => (
            <Link
              key={v.id}
              href={`/hero-lab/${v.id}`}
              className={`inline-flex h-6 items-center justify-center rounded-pill px-2 font-mono text-small transition-colors ${
                v.id === id
                  ? 'bg-accent text-surface'
                  : 'bg-bg text-muted hover:bg-surface-soft'
              }`}
              aria-current={v.id === id}
              title={v.code + ' · ' + v.name}
            >
              {v.code}
            </Link>
          ))}
          <Link
            href="/hero-lab"
            className="ml-1 rounded-pill border border-line px-2 py-0.5 text-small text-muted hover:bg-surface-soft"
          >
            비교
          </Link>
        </div>
      </div>
    </>
  );
}
