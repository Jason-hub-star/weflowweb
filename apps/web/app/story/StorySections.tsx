import Link from 'next/link';
import Image from 'next/image';
import { Button, SectionBadge } from '@/components/primitives';
import { HorizontalPinScroll, StaggerReveal } from '@/components/motion';
import type { StoryPage } from '@/lib/content/schemas';

/**
 * /story 라우트 본문 — 작업실(Workshop) 스토리 풀 페이지.
 *
 * 구성:
 *  - HeroCover (이미지 + 슬로건 오버레이)
 *  - Naming (WE / FLOW)
 *  - Philosophy (인용)
 *  - YearsTimeline (HorizontalPinScroll: desktop 시네마 가로 / mobile vertical fallback)
 *  - CTA (슬로건 + 행동 버튼)
 */
export function StorySections({ data }: { data: StoryPage }) {
  return (
    <>
      <StoryHeroCover hero={data.hero} />
      {data.naming ? <StoryNaming naming={data.naming} /> : null}
      {data.philosophy ? <StoryPhilosophy philosophy={data.philosophy} /> : null}
      <StoryYears years={data.years} />
      <StoryCta cta={data.cta} />
    </>
  );
}

function StoryHeroCover({ hero }: { hero: StoryPage['hero'] }) {
  return (
    <section className="border-line bg-surface-soft relative overflow-hidden border-b">
      {hero.cover ? (
        <Image
          src={hero.cover}
          alt={hero.coverAlt ?? ''}
          aria-hidden={!hero.coverAlt}
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 -z-10 h-full w-full object-cover opacity-25"
        />
      ) : null}
      <div className="bg-bg/40 absolute inset-0 -z-10" aria-hidden />
      <div className="mx-auto max-w-5xl px-[var(--space-gutter)] py-[var(--space-section)] text-center">
        <SectionBadge icon="📖" roomLabel="ROOM 01" tone="accent">
          {hero.eyebrow}
        </SectionBadge>
        <h1 className="text-display ko-heading mt-6 break-keep">
          <StaggerReveal text={hero.title} stagger={0.05} />
        </h1>
        {hero.tagline ? (
          <p className="text-small text-amber mx-auto mt-5 max-w-md font-mono uppercase tracking-wide">
            {hero.tagline}
          </p>
        ) : null}
        {hero.sub ? (
          <p className="text-body text-muted ko-relaxed mx-auto mt-6 max-w-2xl">{hero.sub}</p>
        ) : null}
      </div>
    </section>
  );
}

function StoryNaming({ naming }: { naming: NonNullable<StoryPage['naming']> }) {
  return (
    <section id="naming" className="border-line border-b">
      <div className="mx-auto max-w-5xl px-[var(--space-gutter)] py-[var(--space-section)] text-center">
        {naming.eyebrow ? (
          <p className="text-eyebrow text-amber">{naming.eyebrow}</p>
        ) : null}
        <h2 className="text-h1 ko-heading mt-3 break-keep">{naming.title}</h2>
        <dl className="mt-10 grid gap-6 sm:grid-cols-2">
          {naming.items.map((item) => (
            <div
              key={item.letter}
              className="border-line bg-surface hover:border-amber/40 rounded-lg border p-7 transition-colors"
            >
              <dt className="text-display text-amber font-mono font-black leading-none">
                {item.letter}
              </dt>
              <dd className="text-body text-text ko-relaxed mt-4 break-keep">{item.meaning}</dd>
            </div>
          ))}
        </dl>
        {naming.summary ? (
          <p className="text-body text-muted ko-relaxed mx-auto mt-8 max-w-3xl break-keep">
            {naming.summary}
          </p>
        ) : null}
      </div>
    </section>
  );
}

function StoryPhilosophy({
  philosophy,
}: {
  philosophy: NonNullable<StoryPage['philosophy']>;
}) {
  return (
    <section className="bg-amber-soft border-line border-b">
      <div className="mx-auto max-w-4xl px-[var(--space-gutter)] py-[var(--space-section)] text-center">
        <blockquote className="text-h1 ko-heading text-text break-keep">
          &ldquo;{philosophy.quote}&rdquo;
        </blockquote>
        {philosophy.attribution ? (
          <p className="text-eyebrow text-amber mt-6 font-mono">— {philosophy.attribution}</p>
        ) : null}
      </div>
    </section>
  );
}

type TimelineCard =
  | {
      kind: 'chapter';
      year: StoryPage['years'][number];
      chapter: StoryPage['years'][number]['chapters'][number];
    }
  | { kind: 'comingSoon'; year: StoryPage['years'][number] };

function flattenTimeline(years: StoryPage['years']): TimelineCard[] {
  const out: TimelineCard[] = [];
  for (const year of years) {
    for (const chapter of year.chapters) {
      out.push({ kind: 'chapter', year, chapter });
    }
    if (year.comingSoon?.enabled) {
      out.push({ kind: 'comingSoon', year });
    }
  }
  return out;
}

function StoryYears({ years }: { years: StoryPage['years'] }) {
  const cards = flattenTimeline(years);

  return (
    <section id="timeline" className="border-line bg-surface-soft border-b">
      <div className="mx-auto max-w-7xl px-[var(--space-gutter)] pt-[var(--space-section)]">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow text-amber">TIMELINE</p>
          <h2 className="text-h1 ko-heading mt-3 break-keep">시간 위의 흐름</h2>
          <p className="text-body text-muted ko-relaxed mt-4 break-keep">
            <span className="hidden lg:inline">아래로 스크롤하면 시간이 옆으로 흘러요.</span>
            <span className="lg:hidden">한 챕터씩 천천히 내려가며 읽어보세요.</span>
          </p>
        </header>
      </div>

      <div className="mt-12 hidden lg:block">
        <HorizontalPinScroll height={`${Math.max(200, cards.length * 90)}vh`} travel="-78%">
          <div aria-hidden className="w-[16vw] shrink-0" />
          {cards.map((card, i) => (
            <TimelineCardWide key={timelineKey(card)} card={card} index={i} total={cards.length} />
          ))}
          <div aria-hidden className="w-[12vw] shrink-0" />
        </HorizontalPinScroll>
      </div>

      <div className="lg:hidden">
        <ol className="relative mx-auto max-w-3xl space-y-6 px-[var(--space-gutter)] pb-[var(--space-section)] pt-10">
          <span
            aria-hidden
            className="border-amber/30 pointer-events-none absolute left-[1.55rem] top-2 bottom-2 border-l-2 border-dashed"
          />
          {cards.map((card) => (
            <li key={timelineKey(card)} className="relative pl-12">
              <span className="bg-amber text-surface text-eyebrow absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-full font-mono font-bold shadow-md">
                {card.year.year.slice(-2)}
              </span>
              <TimelineCardCompact card={card} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function timelineKey(card: TimelineCard): string {
  return card.kind === 'chapter' ? `c-${card.chapter.id}` : `cs-${card.year.year}`;
}

function TimelineCardWide({
  card,
  index,
  total,
}: {
  card: TimelineCard;
  index: number;
  total: number;
}) {
  if (card.kind === 'comingSoon') return null;
  return <TimelineChapterWide year={card.year} chapter={card.chapter} index={index} total={total} />;
}

function TimelineChapterWide({
  year,
  chapter,
  index,
  total,
}: {
  year: StoryPage['years'][number];
  chapter: StoryPage['years'][number]['chapters'][number];
  index: number;
  total: number;
}) {
  return (
    <article className="border-line bg-surface relative flex h-[52vh] w-[58vw] max-w-[760px] shrink-0 flex-col overflow-hidden rounded-2xl border shadow-xl md:flex-row">
      <span
        aria-hidden
        className="text-amber/15 pointer-events-none absolute -right-4 -top-8 font-mono text-[12rem] font-black leading-none select-none"
      >
        {year.year}
      </span>
      <div className="relative flex flex-1 flex-col justify-between p-7 md:p-10">
        <div>
          <p className="text-eyebrow text-amber font-mono">
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} ·{' '}
            {year.year}
            {chapter.month ? ` · ${chapter.month}` : ''}
          </p>
          <h3 className="text-h1 ko-heading text-text mt-3 max-w-sm break-keep">
            {chapter.title}
          </h3>
          <p className="text-small text-muted ko-relaxed mt-4 max-w-md break-keep">{chapter.body}</p>
          {chapter.highlight ? (
            <p className="text-small text-amber mt-4 max-w-md break-keep font-medium">
              → {chapter.highlight}
            </p>
          ) : null}
        </div>
        {year.label ? (
          <p className="text-eyebrow text-muted mt-6 font-mono">{year.label.toUpperCase()}</p>
        ) : null}
      </div>
      {chapter.image ? (
        <div className="border-line relative h-40 w-full overflow-hidden md:h-auto md:w-2/5 md:border-l">
          <Image
            src={chapter.image}
            alt={chapter.imageAlt ?? ''}
            aria-hidden={!chapter.imageAlt}
            fill
            sizes="(min-width: 768px) 40vw, 100vw"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      ) : null}
    </article>
  );
}

function TimelineCardCompact({ card }: { card: TimelineCard }) {
  if (card.kind === 'comingSoon') return null;
  const { year, chapter } = card;
  return (
    <article className="border-line bg-surface rounded-xl border p-5 shadow-sm">
      <p className="text-eyebrow text-amber font-mono">
        {year.year}
        {chapter.month ? ` · ${chapter.month}` : ''}
      </p>
      <h3 className="text-h3 ko-heading mt-2 break-keep">{chapter.title}</h3>
      <p className="text-body text-text ko-relaxed mt-3 break-keep">{chapter.body}</p>
      {chapter.highlight ? (
        <p className="text-small text-amber mt-3 font-medium">→ {chapter.highlight}</p>
      ) : null}
    </article>
  );
}

function StoryCta({ cta }: { cta: StoryPage['cta'] }) {
  return (
    <section className="bg-text text-surface">
      <div className="mx-auto max-w-5xl px-[var(--space-gutter)] py-[var(--space-section)] text-center">
        <p className="text-h1 ko-heading font-mono">{cta.slogan}</p>
        {cta.sloganKo ? (
          <p className="text-body text-surface/80 ko-relaxed mt-4">{cta.sloganKo}</p>
        ) : null}
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {cta.primary ? (
            <Button href={cta.primary.href} variant="primary" size="lg">
              {cta.primary.label}
            </Button>
          ) : null}
          {cta.secondary ? (
            <Link
              href={cta.secondary.href}
              className="border-surface/30 text-surface hover:bg-surface/10 rounded-pill inline-flex items-center border px-6 py-3 text-base font-medium transition-colors"
            >
              {cta.secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
