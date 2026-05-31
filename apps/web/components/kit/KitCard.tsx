import type { ReactNode } from 'react';
import { KitCopyButton } from './KitCopyButton';

/**
 * 레고 카드 — /kit 페이지의 한 단위.
 * 기본 화면은 이름·한 줄 설명·라이브 예시만 보여준다.
 * props와 코드는 details로 접어 두어 hydration state 없이 가볍게 열린다.
 *
 * Server Component (props만 받아 렌더 — 데모 자체가 client일 수 있음).
 */
export function KitCard({
  name,
  category,
  importPath,
  description,
  propsNote,
  demo,
  code,
  bgVariant = 'soft',
}: {
  name: string;
  category: string;
  importPath: string;
  description: string;
  propsNote?: { name: string; type: string; default?: string; note?: string }[];
  demo: ReactNode;
  code: string;
  bgVariant?: 'soft' | 'dark' | 'plain';
}) {
  const id = name.replace(/[<>{}/\s]/g, '').toLowerCase();
  const demoBg =
    bgVariant === 'dark'
      ? 'bg-text text-surface'
      : bgVariant === 'plain'
        ? 'bg-surface'
        : 'bg-surface-soft';

  return (
    <article
      id={id}
      className="border-line bg-surface scroll-mt-24 overflow-hidden rounded-lg border"
    >
      <header className="border-line bg-bg/60 border-b px-5 py-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-pill bg-accent-soft text-small text-accent-strong px-2.5 py-1 font-mono">
            {category}
          </span>
          <code className="text-small text-muted font-mono">{importPath}</code>
        </div>
        <h3 className="text-h3 text-text ko-heading mt-3">{name}</h3>
        <p className="text-body text-muted ko-relaxed mt-2 max-w-2xl">{description}</p>
      </header>

      <div className={`relative min-h-[180px] overflow-hidden p-5 ${demoBg}`}>
        <p className="text-eyebrow text-muted mb-3">예시 화면</p>
        {demo}
      </div>

      <div className="border-line bg-bg border-t">
        {propsNote && propsNote.length > 0 && (
          <details className="border-line group border-b">
            <summary className="text-small text-muted hover:text-accent flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 font-medium">
              <span>조절값 보기</span>
              <span aria-hidden="true" className="font-mono group-open:hidden">
                +
              </span>
              <span aria-hidden="true" className="hidden font-mono group-open:inline">
                -
              </span>
            </summary>
            <dl className="text-small ko-tight grid gap-2 px-5 pb-4 md:grid-cols-2">
              {propsNote.map((p) => (
                <div key={p.name} className="flex flex-wrap items-baseline gap-x-2">
                  <code className="text-text font-mono">{p.name}</code>
                  <code className="text-muted font-mono">{p.type}</code>
                  {p.default !== undefined && (
                    <code className="text-accent font-mono">= {p.default}</code>
                  )}
                  {p.note && <span className="text-muted">— {p.note}</span>}
                </div>
              ))}
            </dl>
          </details>
        )}

        <details className="group">
          <summary className="text-small text-muted hover:text-accent flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 font-medium">
            <span>코드 보기</span>
            <span aria-hidden="true" className="font-mono group-open:hidden">
              +
            </span>
            <span aria-hidden="true" className="hidden font-mono group-open:inline">
              -
            </span>
          </summary>
          <div className="border-line flex min-h-11 items-center justify-between gap-3 border-y px-5 py-2">
            <p className="text-small text-muted font-mono">Snippet</p>
            <KitCopyButton value={code} label={`${name} 코드 스니펫 복사`} />
          </div>
          <pre className="text-small max-h-72 overflow-x-auto px-5 py-4 leading-relaxed">
            <code className="text-text font-mono">{code}</code>
          </pre>
        </details>
      </div>
    </article>
  );
}

export function KitSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="border-line flex items-baseline justify-between border-b pb-3">
        <h2 className="text-h2 ko-heading">{title}</h2>
        <a href={`#${id}`} className="text-small text-muted hover:text-accent font-mono">
          #{id}
        </a>
      </div>
      {description && (
        <p className="text-body text-muted ko-relaxed mt-3 max-w-3xl">{description}</p>
      )}
      <div className="mt-6 grid gap-6">{children}</div>
    </section>
  );
}

export function KitNote({ children }: { children: ReactNode }) {
  return (
    <div className="border-line bg-surface-soft text-small text-muted ko-relaxed rounded-md border px-4 py-3">
      {children}
    </div>
  );
}
