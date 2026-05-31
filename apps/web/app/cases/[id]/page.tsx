import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  Badge,
  Button,
  MetricBadge,
  SectionBadge,
} from '@/components/primitives';
import { getCasesPage } from '@/lib/content/loaders';

export const dynamicParams = false;

export async function generateStaticParams() {
  return getCasesPage().items.map((item) => ({ id: item.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = getCasesPage().items.find((entry) => entry.id === id);
  return {
    title: item ? `${item.title} | WEFLOW 사례` : 'WEFLOW 사례',
    description: item?.summary,
  };
}

export default async function CaseDetailRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getCasesPage().items.find((entry) => entry.id === id);
  if (!item) notFound();

  return (
    <main>
      <section className="border-line border-t">
        <div className="mx-auto grid max-w-7xl gap-10 px-[var(--space-gutter)] py-[var(--space-section)] lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <SectionBadge icon="↗">{item.tag}</SectionBadge>
            <p className="text-small text-muted mt-8">
              {item.client} · {item.year ?? '2026'} · {item.role ?? 'Product build'}
            </p>
            <h1 className="text-display ko-heading mt-5">{item.title}</h1>
            <p className="text-body ko-relaxed text-muted mt-6 max-w-2xl">
              {item.overview ?? item.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/cases" variant="secondary">
                목록으로
              </Button>
              <Button href="/contact" variant="ghost">
                이런 스타일로 상담하기
              </Button>
            </div>
          </div>
          <div className="border-line bg-surface overflow-hidden rounded-md border">
            <div className="relative aspect-[604/419]">
              <Image
                src={item.heroImage ?? item.thumbnail ?? ''}
                alt=""
                fill
                priority
                sizes="(min-width: 1024px) 52vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-line border-t">
        <div className="mx-auto grid max-w-7xl gap-4 px-[var(--space-gutter)] py-10 md:grid-cols-3">
          <Info label="Project" value={item.client} />
          <Info label="Focus" value={item.metric} />
          <Info label="Scope" value={item.scope.slice(0, 2).join(' · ')} />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-[var(--space-gutter)] py-[var(--space-section)] lg:grid-cols-[0.75fr_1.25fr]">
        <aside>
          <SectionBadge icon="◎">ABOUT</SectionBadge>
          <h2 className="text-h2 ko-heading mt-5">어떤 문제를 정리했나요?</h2>
        </aside>
        <div className="grid gap-5">
          <StoryBlock title="시작점" body={item.challenge ?? item.summary} />
          <StoryBlock title="해결 방향" body={item.solution ?? item.summary} />
          {item.stack.length > 0 ? (
            <div className="flex flex-wrap gap-2 pt-2">
              {item.stack.map((tech) => (
                <Badge key={tech} tone="muted">
                  {tech}
                </Badge>
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="border-line bg-surface-soft/50 border-t">
        <div className="mx-auto max-w-7xl px-[var(--space-gutter)] py-[var(--space-section)]">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionBadge icon="01">PROCESS</SectionBadge>
              <h2 className="text-h2 ko-heading mt-5">작업 과정</h2>
            </div>
            <MetricBadge value={item.metric} trend="up" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {item.process.map((step) => (
              <article
                key={step.step}
                className="border-line bg-surface rounded-md border p-6"
              >
                <p className="text-accent text-h3 font-black">{step.step}</p>
                <h3 className="text-h3 ko-heading mt-5">{step.title}</h3>
                <p className="text-small text-muted ko-relaxed mt-3">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-[var(--space-gutter)] py-[var(--space-section)] lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <div className="border-line bg-surface overflow-hidden rounded-md border">
          <div className="relative aspect-[604/419]">
            <Image
              src={item.thumbnail ?? item.heroImage ?? ''}
              alt=""
              fill
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
        <div>
          <SectionBadge icon="✓">OUTPUT</SectionBadge>
          <h2 className="text-h2 ko-heading mt-5">결과물로 남긴 것</h2>
          <ul className="mt-8 grid gap-3">
            {item.outputs.map((output) => (
              <li
                key={output}
                className="border-line bg-surface text-body ko-relaxed rounded-md border p-4"
              >
                {output}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-line bg-surface rounded-md border p-5">
      <p className="text-small text-muted">{label}</p>
      <p className="text-body ko-heading mt-2 break-words">{value}</p>
    </div>
  );
}

function StoryBlock({ title, body }: { title: string; body: string }) {
  return (
    <article className="border-line bg-surface rounded-md border p-6">
      <h3 className="text-h3 ko-heading">{title}</h3>
      <p className="text-body text-muted ko-relaxed mt-4">{body}</p>
    </article>
  );
}
