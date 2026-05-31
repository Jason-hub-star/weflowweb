import Link from 'next/link';
import { ComingSoonChip, SectionBadge } from '@/components/primitives';
import type { HomePage } from '@/lib/content/schemas';

/**
 * HomeStory — 홈 preview 섹션.
 * 풀 스토리는 `/story` 라우트. 여기서는 짧은 highlights 3장 + 슬로건 + CTA.
 *
 * 작은 viewport 차이만 있어 viewport-variant 분리 없이 인라인 md: 분기.
 * (AGENTS.md Hard Rule 15)
 */
export function HomeStory({ data }: { data: NonNullable<HomePage['story']> }) {
  return (
    <section
      id="story"
      className="border-line bg-surface-soft relative overflow-hidden border-t"
    >
      <div
        aria-hidden
        className="bg-accent-soft pointer-events-none absolute -right-32 top-12 h-72 w-72 rounded-full blur-3xl opacity-60"
      />
      <div className="relative mx-auto grid max-w-7xl items-start gap-12 px-[var(--space-gutter)] py-[var(--space-section)] md:grid-cols-[0.95fr_1.05fr] md:gap-16">
        <header className="max-w-xl">
          <SectionBadge icon="📖" tone="amber">
            {data.eyebrow}
          </SectionBadge>
          <h2 className="text-h1 ko-heading mt-5">{data.title}</h2>
          {data.tagline ? (
            <p className="text-small text-amber mt-4 font-mono uppercase tracking-wide">
              {data.tagline}
            </p>
          ) : null}
          {data.sub ? (
            <p className="text-body text-muted ko-relaxed mt-5 max-w-lg">{data.sub}</p>
          ) : null}
          {data.linkHref && data.linkLabel ? (
            <Link
              href={data.linkHref}
              className="text-small text-amber mt-8 inline-flex items-center font-medium hover:text-text"
            >
              {data.linkLabel} →
            </Link>
          ) : null}
        </header>

        {data.highlights.length > 0 ? (
          <ol className="relative flex flex-col gap-4 md:gap-5">
            <span
              aria-hidden
              className="border-amber/30 pointer-events-none absolute left-[1.05rem] top-3 bottom-3 border-l border-dashed"
            />
            {data.highlights.map((h, idx) => {
              const isLast = idx === data.highlights.length - 1;
              return (
                <li
                  key={`${h.year}-${idx}`}
                  className="border-line bg-surface hover:border-amber/40 relative flex items-start gap-4 rounded-lg border p-5 transition-colors md:p-6"
                >
                  <span className="bg-amber text-surface text-eyebrow font-mono relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-full font-bold shadow-md">
                    {h.year.slice(-2)}
                  </span>
                  <div className="flex-1">
                    <p className="text-eyebrow text-muted font-mono">{h.year}</p>
                    <p className="text-body text-text ko-relaxed mt-1 break-keep">{h.body}</p>
                    {isLast ? (
                      <div className="mt-3">
                        <ComingSoonChip
                          label="다음 챕터"
                          description="함께 이어가기"
                          href={data.linkHref}
                        />
                      </div>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        ) : null}
      </div>
    </section>
  );
}
