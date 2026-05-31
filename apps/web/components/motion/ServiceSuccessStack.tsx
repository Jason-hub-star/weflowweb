import Link from 'next/link';
import { StickyStackCards } from './StickyStackCards';

export type ServiceSuccessItem = {
  code: string;
  title: string;
  body: string;
};

/**
 * Services success pattern — 서비스/기능을 sticky stack 카드로 보여주는 재사용 섹션 단위.
 *
 * 홈 Services, /story의 흐름 소개, /kit 라이브 데모에서 같은 카드 구조를 공유한다.
 */
export function ServiceSuccessStack({
  items,
  linkHref,
  linkLabel = '자세히',
  topOffset = '6rem',
  scaleStep = 0.04,
}: {
  items: ServiceSuccessItem[];
  linkHref?: string;
  linkLabel?: string;
  topOffset?: string;
  scaleStep?: number;
}) {
  return (
    <StickyStackCards topOffset={topOffset} scaleStep={scaleStep}>
      {items.map((item) => (
        <article
          key={item.code}
          className="border-line bg-surface mb-6 grid items-start gap-8 rounded-lg border p-8 shadow-md md:grid-cols-[auto_1fr] md:gap-12 md:p-12"
        >
          <span className="text-display text-amber font-mono font-bold tabular-nums leading-none">
            {item.code}
          </span>
          <div>
            <h3 className="text-h2 ko-heading text-text">{item.title}</h3>
            <p className="text-body text-muted ko-relaxed mt-4 max-w-xl">{item.body}</p>
            {linkHref ? (
              <Link
                href={linkHref}
                className="text-small text-amber mt-6 inline-flex items-center font-medium hover:text-text"
              >
                {linkLabel} →
              </Link>
            ) : null}
          </div>
        </article>
      ))}
    </StickyStackCards>
  );
}
