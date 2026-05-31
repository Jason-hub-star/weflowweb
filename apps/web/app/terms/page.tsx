import { PageHero } from '@/components/primitives';
import { getTermsPage } from '@/lib/content/loaders';
import type { LegalPage } from '@/lib/content/schemas';

/**
 * `/terms` — 이용약관
 * 데이터: `apps/web/content/pages/terms.json` (DEC-050)
 */
export default function TermsRoute() {
  const data = getTermsPage();
  return <LegalDocument data={data} />;
}

function LegalDocument({ data }: { data: LegalPage }) {
  return (
    <>
      <PageHero
        eyebrow={data.hero.eyebrow}
        title={data.hero.title}
        sub={data.hero.sub}
        align="center"
      />
      <section className="border-line border-t">
        <div className="mx-auto max-w-3xl px-[var(--space-gutter)] py-[var(--space-section)]">
          <div className="text-eyebrow text-muted flex items-center justify-between font-mono">
            <span>LAST UPDATED · {data.lastUpdated}</span>
          </div>
          {data.draftNotice ? (
            <aside
              role="note"
              className="border-accent/40 bg-accent-soft/40 text-small text-text mt-6 rounded-md border px-4 py-3"
            >
              <strong className="text-accent mr-1">초안:</strong>
              {data.draftNotice}
            </aside>
          ) : null}
          <div className="mt-10 space-y-10">
            {data.sections.map((s) => (
              <article key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-h2 ko-heading text-text">{s.title}</h2>
                <p className="text-body text-muted ko-relaxed mt-4 whitespace-pre-line">
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
