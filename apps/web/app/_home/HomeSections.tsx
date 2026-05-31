import Image from 'next/image';
import Link from 'next/link';
import { Button, SectionBadge } from '@/components/primitives';
import {
  ClientLogoMarquee,
  DeveloperBuildBoard,
  HeroVideo,
  ServiceSuccessStack,
  StaggerReveal,
  TiltCard,
} from '@/components/motion';
import type { HomePage } from '@/lib/content/schemas';
import { HomeCaseCard } from './HomeCaseCard';
import { HomeWhyCards } from './HomeWhyCards';

export { HomeStory } from './HomeStory';
export { HomeReviews } from './HomeReviews';

export function HomeHero({ data }: { data: HomePage['hero'] }) {
  return (
    <HeroVideo
      src={data.video ?? undefined}
      poster={data.poster}
      posterAlt={data.posterAlt ?? ''}
      minHeight={data.minHeight}
      mascot={<HeroWatermarkCover />}
    >
      <p className="text-eyebrow text-accent">{data.eyebrow}</p>
      <h1 className="text-display ko-heading mt-5">{data.title}</h1>
      {data.sub ? (
        <p className="text-body text-muted ko-relaxed mt-6 hidden max-w-xl md:block">
          {data.sub}
        </p>
      ) : null}
      <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
        {data.ctas.map((c) => (
          <Button
            key={c.href + c.label}
            href={c.href}
            variant={c.variant === 'secondary' ? 'secondary' : 'primary'}
            size={c.size ?? 'lg'}
          >
            {c.label}
          </Button>
        ))}
      </div>
      {data.benefits.length ? (
        <ul className="mt-8 flex gap-2 overflow-x-auto pb-2 md:mt-12 md:grid md:max-w-lg md:grid-cols-3 md:gap-3 md:overflow-visible md:pb-0">
          {data.benefits.map((b) => (
            <li
              key={b.title}
              className="border-line bg-surface/70 text-small flex shrink-0 snap-start items-center gap-2 rounded-md border px-4 py-3 backdrop-blur-sm md:flex-col md:items-start md:gap-1"
            >
              <span className="text-text whitespace-nowrap font-semibold">{b.title}</span>
              <span className="text-muted hidden md:inline">· {b.body}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </HeroVideo>
  );
}

function HeroWatermarkCover() {
  return (
    <div className="border-line bg-surface hidden w-64 rounded-lg border p-4 text-left shadow-xl md:block">
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-small font-bold text-surface">
          W
        </span>
        <div>
          <p className="text-small font-semibold text-text">WEFLOW 관리 흐름</p>
          <p className="mt-0.5 text-xs text-muted">문의 · 리포트 · 유지보수</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs font-medium text-accent-strong">
        <span className="rounded-md bg-accent-soft px-2 py-1.5">접수</span>
        <span className="rounded-md bg-accent-soft px-2 py-1.5">확인</span>
        <span className="rounded-md bg-accent-soft px-2 py-1.5">관리</span>
      </div>
    </div>
  );
}

export function HomeServices({ data }: { data: HomePage['services'] }) {
  return (
    <section className="border-line border-t">
      <div className="mx-auto max-w-7xl px-[var(--space-gutter)] py-[var(--space-section)]">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow text-accent">{data.eyebrow}</p>
          <h2 className="text-h1 ko-heading mt-3">{data.title}</h2>
          {data.sub ? (
            <p className="text-body text-muted ko-relaxed mx-auto mt-4">{data.sub}</p>
          ) : null}
        </header>

        <div className="mt-12">
          <ServiceSuccessStack items={data.items} linkHref={data.linkHref} />
        </div>
      </div>
    </section>
  );
}

export function HomeWhy({ data }: { data: HomePage['why'] }) {
  return (
    <section className="bg-surface-soft border-line border-t">
      <div className="mx-auto max-w-6xl px-[var(--space-gutter)] py-[var(--space-section)]">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-eyebrow text-accent">{data.eyebrow}</p>
          <h2 className="text-h1 ko-heading mt-3">
            <StaggerReveal text={data.title} stagger={0.06} />
          </h2>
        </header>

        <HomeWhyCards items={data.items} />
      </div>
    </section>
  );
}

export function HomeMascotBreak({ data }: { data: HomePage['mascotBreak'] }) {
  const m = data.mascot;
  return (
    <section
      id="built-by-developers"
      className="border-line bg-surface-soft relative overflow-hidden border-t"
    >
      <div
        aria-hidden
        className="bg-accent-soft absolute -left-24 top-10 h-64 w-64 rounded-full blur-3xl"
      />
      <div
        aria-hidden
        className="bg-accent-soft absolute bottom-0 right-0 h-80 w-80 rounded-full blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-[var(--space-gutter)] py-24 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
        <div className="text-center md:text-left">
          <SectionBadge icon="👨‍💻">{data.eyebrow}</SectionBadge>
          <h2 className="text-h2 ko-heading mt-4">{data.title}</h2>
          {data.body ? <p className="text-body text-muted ko-relaxed mt-4">{data.body}</p> : null}
        </div>
        <DeveloperBuildBoard mascotSrc={m.src} mascotAlt={m.alt} />
      </div>
    </section>
  );
}

export function HomeCases({ data }: { data: HomePage['cases'] }) {
  return (
    <section className="border-line relative overflow-hidden border-t">
      {data.background ? (
        <>
          <Image
            src={data.background}
            alt=""
            aria-hidden
            fill
            sizes="100vw"
            className="-z-10 object-cover opacity-15"
          />
          <div className="bg-bg/60 absolute inset-0 -z-10" aria-hidden />
        </>
      ) : null}
      <div className="mx-auto max-w-7xl px-[var(--space-gutter)] py-[var(--space-section)]">
        <header className="flex flex-col items-center gap-4 text-center">
          <div className="mx-auto max-w-2xl">
            <p className="text-eyebrow text-accent">{data.eyebrow}</p>
            <h2 className="text-h1 ko-heading mt-3">{data.title}</h2>
          </div>
          {data.linkHref && data.linkLabel ? (
            <Link href={data.linkHref} className="text-small text-accent font-medium">
              {data.linkLabel}
            </Link>
          ) : null}
        </header>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.items.map((c) => (
            <TiltCard key={c.id} maxTilt={8} className="h-full">
              <HomeCaseCard item={c} />
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

export { HomePricing } from './HomePricing';

export function HomePartners({ data }: { data: HomePage['partners'] }) {
  return (
    <section className="bg-surface-soft border-line border-t">
      <div className="mx-auto max-w-7xl px-[var(--space-gutter)] py-20">
        <p className="text-eyebrow text-muted text-center font-mono">{data.label}</p>
        <div className="mt-8">
          <ClientLogoMarquee
            speed={data.speed ?? 28}
            items={data.items.map((p) => ({
              id: p.id,
              content: (
                <span className="text-h2 text-muted hover:text-accent font-mono transition-colors">
                  {p.label}
                </span>
              ),
            }))}
          />
        </div>
      </div>
    </section>
  );
}
