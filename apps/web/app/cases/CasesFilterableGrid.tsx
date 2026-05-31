'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge, MetricBadge, SectionBadge } from '@/components/primitives';
import { TagFilter } from '@/components/motion/TagFilter';
import type { CasesPage } from '@/lib/content/schemas';

export function CasesFilterableGrid({
  hero,
  filters,
  items,
}: {
  hero: CasesPage['hero'];
  filters: string[];
  items: CasesPage['items'];
}) {
  const [active, setActive] = useState<string>(filters[0] ?? '전체');
  const visible = useMemo(
    () =>
      active === filters[0]
        ? items
        : items.filter((c) => c.category === active),
    [items, active, filters],
  );

  return (
    <section className="border-line bg-surface-soft/40 border-t">
      <div className="mx-auto max-w-7xl px-[var(--space-gutter)] py-10 md:py-14">
        <header className="grid gap-6 md:grid-cols-[minmax(0,0.95fr)_minmax(360px,1fr)] md:items-end">
          <div>
            <SectionBadge icon="↗">포트폴리오</SectionBadge>
            <h1 className="text-h1 ko-heading mt-4">{hero.title}</h1>
            <p className="text-body text-muted ko-relaxed mt-4 max-w-2xl">
              {hero.sub}
            </p>
          </div>
          <div className="md:justify-self-end">
            <p className="text-small text-muted mb-3 text-left md:text-right">
              {visible.length}개 포트폴리오
            </p>
            <TagFilter
              options={filters}
              value={active}
              onChange={setActive}
              ariaLabel="사례 카테고리 필터"
              className="justify-start md:justify-end"
            />
          </div>
        </header>

        <div className="mt-8 md:mt-10">
          {visible.length === 0 ? (
            <p className="text-small text-muted ko-relaxed py-12 text-center">
              해당 카테고리의 사례가 아직 없어요.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-24">
              {visible.map((c, index) => (
                <Link
                  key={c.id}
                  href={c.href ?? `/cases/${c.id}`}
                  className={`group block ${index % 2 === 1 ? 'lg:translate-y-16' : ''}`}
                >
                  <article className="border-line bg-surface hover:border-accent/50 hover:shadow-accent/10 overflow-hidden rounded-md border transition-all hover:-translate-y-1 hover:shadow-2xl">
                    {c.thumbnail ? (
                      <div className="bg-bg/40 relative aspect-[604/419] w-full overflow-hidden">
                        <Image
                          src={c.thumbnail}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 44vw, 100vw"
                          className="object-cover object-top transition duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-70" />
                        <span className="absolute bottom-5 left-5 text-[clamp(3rem,7vw,7rem)] leading-none font-black text-white/15">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                    ) : (
                      <div
                        className="bg-bg/40 aspect-[604/419] w-full"
                        aria-hidden
                      />
                    )}
                    <div className="p-6 md:p-7">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <Badge tone="muted">{c.tag}</Badge>
                        <MetricBadge
                          value={c.metric}
                          trend="accent"
                          className="max-w-full whitespace-normal break-keep"
                        />
                      </div>
                      <div className="mt-5 flex items-start justify-between gap-6">
                        <div>
                          <p className="text-small text-muted">
                            {c.client} · {c.year ?? '2026'}
                          </p>
                          <h3 className="text-h3 ko-heading mt-2">
                            {c.title}
                          </h3>
                        </div>
                        <span className="text-accent text-h3 transition group-hover:translate-x-1">
                          →
                        </span>
                      </div>
                      <p className="text-small text-muted ko-relaxed mt-4">
                        {c.summary}
                      </p>
                      {c.scope.length > 0 ? (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {c.scope.slice(0, 3).map((scope) => (
                            <span
                              key={scope}
                              className="border-line text-small text-muted rounded-full border px-3 py-1"
                            >
                              {scope}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
