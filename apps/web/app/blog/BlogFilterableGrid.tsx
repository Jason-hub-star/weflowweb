'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Badge, ComingSoonChip } from '@/components/primitives';
import { TagFilter } from '@/components/motion/TagFilter';
import type { BlogPage, BlogPost } from '@/lib/content/schemas';

export function BlogFilterableGrid({
  filters,
  items,
}: {
  filters: string[];
  items: BlogPage['items'];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const reduce = useReducedMotion();
  const allTag = filters[0] ?? '전체';

  const initialTag = useMemo(() => {
    const fromUrl = searchParams.get('tag');
    if (fromUrl && filters.includes(fromUrl)) return fromUrl;
    return allTag;
  }, [searchParams, filters, allTag]);

  const [active, setActive] = useState<string>(initialTag);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setActive(initialTag));
    return () => cancelAnimationFrame(raf);
  }, [initialTag]);

  const setTag = useCallback(
    (tag: string) => {
      setActive(tag);
      const params = new URLSearchParams(searchParams.toString());
      if (tag === allTag) params.delete('tag');
      else params.set('tag', tag);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [searchParams, router, pathname, allTag],
  );

  const visible = useMemo(() => {
    const filtered =
      active === allTag ? items : items.filter((p) => p.category === active);
    // comingSoon 항목은 항상 마지막
    return [...filtered].sort((a, b) => {
      if (a.comingSoon?.enabled && !b.comingSoon?.enabled) return 1;
      if (!a.comingSoon?.enabled && b.comingSoon?.enabled) return -1;
      return 0;
    });
  }, [items, active, allTag]);

  const featured = visible.find((p) => !p.comingSoon?.enabled);
  const rest = visible.filter((p) => p.id !== featured?.id);

  return (
    <section className="border-line border-t">
      <div className="mx-auto max-w-7xl px-[var(--space-gutter)] py-12 md:py-16">
        <TagFilter
          options={filters}
          value={active}
          onChange={setTag}
          ariaLabel="블로그 카테고리 필터"
          className="justify-center"
        />

        {visible.length === 0 ? (
          <p className="text-small text-muted ko-relaxed py-16 text-center">
            해당 카테고리의 글이 아직 없어요.
          </p>
        ) : (
          <div className="mt-8 space-y-6 md:mt-10 md:space-y-8">
            {featured ? <FeaturedWide post={featured} /> : null}
            <AnimatePresence mode="popLayout">
              <motion.div
                key={`grid-${active}`}
                layout
                className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                aria-label="블로그 글 목록"
              >
                {rest.map((p) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                    transition={reduce ? { duration: 0 } : { duration: 0.32, ease: 'easeOut' }}
                  >
                    {p.comingSoon?.enabled ? <LockedCard post={p} /> : <GridCard post={p} />}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedWide({ post: p }: { post: BlogPost }) {
  return (
    <Link
      href={p.href ?? `/blog/${p.id}`}
      className="border-line bg-surface hover:border-accent group relative grid overflow-hidden rounded-2xl border transition-all hover:shadow-lg md:grid-cols-[1.4fr_1fr]"
    >
      <div className="flex flex-col gap-3 p-6 md:p-8">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">★ EDITOR&apos;S PICK</Badge>
          <Badge tone="muted">{p.category}</Badge>
          {p.readingTimeMinutes ? (
            <span className="text-small text-muted font-mono tabular-nums">
              · {p.readingTimeMinutes}분 읽기
            </span>
          ) : null}
        </div>
        <h2 className="text-h1 ko-heading text-text mt-1 break-keep group-hover:text-accent-strong transition-colors">
          {p.title}
        </h2>
        <p className="text-body text-muted ko-relaxed line-clamp-3 break-keep">
          {p.summary}
        </p>
        <footer className="border-line mt-auto flex items-center justify-between border-t pt-4">
          <span className="text-small text-muted font-mono">{p.date}</span>
          <span className="text-small text-accent-strong font-medium">전체 글 읽기 →</span>
        </footer>
      </div>
      <div
        aria-hidden
        className="bg-accent-soft relative isolate hidden min-h-[200px] overflow-hidden md:block"
      >
        <div className="from-accent/25 via-accent-soft absolute inset-0 bg-gradient-to-br to-transparent" />
        <span className="text-eyebrow text-accent-strong absolute right-6 top-6 font-mono">
          ★ FEATURED
        </span>
        <span
          className="text-display ko-heading text-accent/25 absolute bottom-4 left-6 right-6 break-keep font-mono leading-none"
          aria-hidden
        >
          {p.category}
        </span>
      </div>
    </Link>
  );
}

function GridCard({ post: p }: { post: BlogPost }) {
  return (
    <Link
      href={p.href ?? `/blog/${p.id}`}
      className="border-line bg-surface hover:border-accent group flex h-full flex-col rounded-xl border p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-center gap-2">
        <Badge tone="muted">{p.category}</Badge>
        {p.readingTimeMinutes ? (
          <span className="text-small text-muted font-mono tabular-nums">
            {p.readingTimeMinutes}분
          </span>
        ) : null}
      </div>
      <h3 className="text-h3 ko-heading text-text mt-3 break-keep group-hover:text-accent-strong transition-colors">
        {p.title}
      </h3>
      <p className="text-small text-muted ko-relaxed mt-2 line-clamp-2 break-keep">
        {p.summary}
      </p>
      <footer className="border-line mt-auto flex items-center justify-between border-t pt-3">
        <span className="text-small text-muted font-mono">{p.date}</span>
        <span aria-hidden className="text-muted group-hover:text-accent transition-colors">
          →
        </span>
      </footer>
    </Link>
  );
}

function LockedCard({ post: p }: { post: BlogPost }) {
  return (
    <article className="border-accent/40 bg-accent-soft/30 flex h-full flex-col rounded-xl border-2 border-dashed p-5">
      <div className="flex items-center gap-2">
        <span
          aria-hidden
          className="bg-accent/15 text-accent grid h-7 w-7 place-items-center rounded-full text-xs"
        >
          🔒
        </span>
        <Badge tone="accent">{p.category}</Badge>
      </div>
      <h3 className="text-h3 ko-heading text-text mt-3 break-keep">{p.title}</h3>
      <p className="text-small text-muted ko-relaxed mt-2 line-clamp-2 break-keep">
        {p.summary}
      </p>
      <div className="mt-auto pt-4">
        <ComingSoonChip
          label={p.comingSoon?.label ?? '곧 공개'}
          description={p.comingSoon?.description}
          href={p.comingSoon?.href}
        />
      </div>
    </article>
  );
}
