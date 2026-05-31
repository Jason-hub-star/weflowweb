'use client';

import { Badge } from '@/components/primitives';
import { SpotlightCard, StickyStackCards, TiltCard } from '@/components/motion';
import type { ServicesPage } from '@/lib/content/schemas';

/**
 * ServicesShowcase — /services 메인 sticky stack 쇼케이스.
 *
 * 인터랙션:
 *  - StickyStackCards: 스크롤마다 카드가 위에 쌓이며 뒤 카드는 작아짐
 *  - TiltCard: 마우스 3D 기울기 (절제, maxTilt 5)
 *  - SpotlightCard: 카드 표면에 마우스 따라가는 radial glow
 *  - features list에 진입 stagger (CSS animation-delay)
 */
export function ServicesShowcase({ items }: { items: ServicesPage['items'] }) {
  return (
    <section className="border-line bg-surface-soft border-t">
      <div className="mx-auto max-w-7xl px-[var(--space-gutter)] py-[var(--space-section)]">
        <header className="mx-auto max-w-2xl text-center">
          <p className="text-eyebrow text-accent">SERVICES</p>
          <h2 className="text-h1 ko-heading mt-3 break-keep">한 흐름으로 묶어 처리합니다</h2>
          <p className="text-body text-muted ko-relaxed mt-4 break-keep">
            스크롤마다 카드가 쌓이고, 마우스를 올리면 표면이 살아납니다.
          </p>
        </header>

        <div className="mt-14">
          <StickyStackCards topOffset="5rem" scaleStep={0.035}>
            {items.map((item, idx) => (
              <ServiceCard key={item.id} item={item} index={idx} />
            ))}
          </StickyStackCards>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ item, index }: { item: ServicesPage['items'][number]; index: number }) {
  return (
    <TiltCard maxTilt={5} className="mb-8">
      <SpotlightCard
        glowSize={420}
        glowOpacity={0.16}
        className="border-line bg-surface relative overflow-hidden rounded-2xl border p-10 shadow-2xl md:p-14"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.2fr] md:gap-14">
          <header>
            <div className="flex items-baseline gap-4">
              <span className="text-display text-accent-strong font-mono font-black tabular-nums leading-none">
                {item.code}
              </span>
              <span className="text-eyebrow text-muted font-mono">
                STEP {String(index + 1).padStart(2, '0')}
              </span>
            </div>
            <h3 className="text-h2 ko-heading text-text mt-5 break-keep">{item.title}</h3>
            <p className="text-body text-muted ko-relaxed mt-5 break-keep">{item.body}</p>

            <dl className="mt-7 grid gap-3 sm:grid-cols-2">
              {item.duration ? (
                <div className="border-line bg-surface-soft rounded-md border p-3">
                  <dt className="text-eyebrow text-muted font-mono">기간</dt>
                  <dd className="text-small text-text mt-1 font-medium">{item.duration}</dd>
                </div>
              ) : null}
              {item.price ? (
                <div className="border-line bg-surface-soft rounded-md border p-3">
                  <dt className="text-eyebrow text-muted font-mono">비용</dt>
                  <dd className="text-small text-text mt-1 font-medium">{item.price}</dd>
                </div>
              ) : null}
            </dl>
          </header>

          <ul className="space-y-3">
            {item.features.map((f, i) => (
              <li
                key={f}
                className="border-line bg-surface-soft hover:border-accent/40 flex items-start gap-3 rounded-md border p-4 opacity-0 transition-colors motion-safe:animate-[serviceFeatureIn_0.5s_ease-out_forwards] motion-reduce:opacity-100"
                style={{ animationDelay: `${index * 120 + i * 70}ms` }}
              >
                <Badge tone="accent" className="mt-0.5 shrink-0">
                  ✓
                </Badge>
                <span className="text-body text-text ko-relaxed break-keep">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </SpotlightCard>
    </TiltCard>
  );
}
