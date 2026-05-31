import Link from 'next/link';
import { Badge, CTASection, PageHero, SectionBadge } from '@/components/primitives';
import { getNoticePage } from '@/lib/content/loaders';
import type { NoticePage } from '@/lib/content/schemas';

/**
 * `/notice` — 공지사항
 * 데이터: `apps/web/content/pages/notice.json` (DEC-050)
 * pin 공지 강조 + 일반 공지 리스트. 상세(`/notice/[slug]`)는 묶음 B-3.
 */
export default function NoticeRoute() {
  const data = getNoticePage();
  const pinned = data.items.filter((n) => n.pinned);
  const general = data.items.filter((n) => !n.pinned);

  return (
    <>
      <PageHero
        eyebrow={<SectionBadge icon="📢">공지사항</SectionBadge>}
        title={data.hero.title}
        sub={data.hero.sub}
        align="center"
      />
      {pinned.length > 0 ? (
        <section className="bg-surface-soft border-line border-t">
          <div className="mx-auto max-w-5xl px-[var(--space-gutter)] py-12">
            <h2 className="text-eyebrow text-accent font-mono">PINNED</h2>
            <ul className="mt-4 space-y-3">
              {pinned.map((n) => (
                <NoticeRow key={n.id} item={n} />
              ))}
            </ul>
          </div>
        </section>
      ) : null}
      <section className="border-line border-t">
        <div className="mx-auto max-w-5xl px-[var(--space-gutter)] py-[var(--space-section)]">
          <h2 className="text-eyebrow text-muted font-mono">ALL</h2>
          <ul className="border-line divide-line mt-4 divide-y border-y">
            {general.map((n) => (
              <li key={n.id}>
                <NoticeRow item={n} />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <CTASection
        eyebrow={data.cta.eyebrow}
        title={data.cta.title}
        sub={data.cta.sub}
        primary={data.cta.primary}
        secondary={data.cta.secondary}
      />
    </>
  );
}

function NoticeRow({ item }: { item: NoticePage['items'][number] }) {
  const inner = (
    <article className="hover:bg-surface group flex flex-col gap-2 py-4 transition-colors sm:flex-row sm:items-center sm:gap-6">
      <div className="flex items-center gap-3 sm:w-40 sm:shrink-0">
        {item.badge ? <Badge tone={item.pinned ? 'amber' : 'muted'}>{item.badge}</Badge> : null}
        <span className="text-small text-muted font-mono">{item.date}</span>
      </div>
      <div className="flex-1">
        <h3 className="text-body text-text group-hover:text-accent font-medium transition-colors">
          {item.title}
        </h3>
        {item.summary ? (
          <p className="text-small text-muted ko-relaxed mt-1">{item.summary}</p>
        ) : null}
      </div>
    </article>
  );
  return item.href ? (
    <Link href={item.href} className="block">
      {inner}
    </Link>
  ) : (
    inner
  );
}
