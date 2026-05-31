import type { HomePage } from '@/lib/content/schemas';

/**
 * Site Build Storyboard — 정적 폴백 (reduced-motion 사용자).
 * 6단계를 ordered list로만 보여줌. 인터랙션 없음.
 */

type ProcessData = HomePage['process'];

export function SiteBuildStoryboardStatic({ data }: { data: ProcessData }) {
  return (
    <section
      className="bg-surface-soft px-[var(--space-gutter)] py-20"
      aria-labelledby="storyboard-heading-static"
    >
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-eyebrow text-accent">{data.eyebrow}</p>
        <h2
          id="storyboard-heading-static"
          className="text-h1 ko-heading text-text mt-3"
        >
          {data.title}
        </h2>
        {data.sub ? (
          <p className="text-body text-muted ko-relaxed mx-auto mt-4">{data.sub}</p>
        ) : null}

        <ol className="mt-12 space-y-5 text-left">
          {data.items.map((item) => (
            <li
              key={item.id}
              className="border-line bg-surface rounded-lg border px-6 py-7"
            >
              <div className="flex items-baseline gap-4">
                <span
                  aria-hidden
                  className="text-h2 text-accent-strong shrink-0 font-mono font-bold tabular-nums"
                >
                  {item.step}
                </span>
                <div>
                  {item.nickname ? (
                    <p className="text-eyebrow text-muted font-mono">{item.nickname}</p>
                  ) : null}
                  <p className="text-h3 ko-heading text-text mt-1">{item.title}</p>
                </div>
              </div>
              <p className="text-small text-muted ko-relaxed mt-4">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
