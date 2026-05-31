import Image from 'next/image';
import Link from 'next/link';
import { Badge, MetricBadge } from '@/components/primitives';
import type { HomePage } from '@/lib/content/schemas';

type HomeCase = HomePage['cases']['items'][number];

export function HomeCaseCard({ item }: { item: HomeCase }) {
  return (
    <Link
      href={`/cases/${item.id}`}
      className="border-line bg-surface hover:border-accent premium-card premium-card-hover group flex h-full min-h-[420px] flex-col rounded-md border p-5 transition-all hover:-translate-y-0.5 md:p-6"
    >
      {item.thumbnail ? (
        <div className="bg-bg/40 border-line relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded border">
          <Image
            src={item.thumbnail}
            alt=""
            aria-hidden
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="bg-bg/40 border-line aspect-[16/10] w-full shrink-0 rounded border" aria-hidden />
      )}
      <div className="mt-4 flex flex-wrap items-start justify-between gap-2">
        <Badge tone="muted">{item.tag}</Badge>
        <MetricBadge value={item.metric} trend="accent" className="max-w-full whitespace-normal break-keep" />
      </div>
      <h3 className="text-h3 ko-heading mt-3 break-keep">{item.title}</h3>
      <span className="text-small text-muted group-hover:text-accent mt-auto inline-flex items-center pt-5 font-medium">
        자세히 →
      </span>
    </Link>
  );
}
