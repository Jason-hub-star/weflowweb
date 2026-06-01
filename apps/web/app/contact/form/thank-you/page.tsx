import type { Metadata } from 'next';
import { Button, PageHero, SectionBadge } from '@/components/primitives';
import { getCachedDiagnoseForm } from '@/lib/content/loaders';
import { serverConfig as config } from '@/lib/server-config';

export const metadata: Metadata = {
  title: `진단 신청이 접수됐어요 — ${config.brand.name}`,
  description: '주신 내용을 30분 안에 검토하고 1~3시간 안에 이메일로 회신드려요.',
};

export default async function ThankYouPage() {
  const data = await getCachedDiagnoseForm();
  return (
    <>
      <PageHero
        eyebrow={<SectionBadge icon="✓">{data.thankyou.eyebrow}</SectionBadge>}
        title={data.thankyou.title}
        sub={data.thankyou.sub}
        align="center"
      />
      <section className="border-line border-t">
        <div className="mx-auto max-w-2xl px-[var(--space-gutter)] py-[var(--space-section)] text-center">
          <div className="border-line bg-surface-soft mx-auto flex max-w-md flex-col items-center gap-4 rounded-2xl border p-8">
            <span aria-hidden className="bg-accent text-white grid h-16 w-16 place-items-center rounded-full text-3xl">
              ✓
            </span>
            <p className="text-body text-text ko-relaxed break-keep">
              회신 메일은 입력하신 이메일로 발송돼요. 스팸함도 한 번 확인해주세요.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {data.thankyou.ctas.map((cta) => (
                <Button
                  key={cta.href}
                  href={cta.href}
                  variant={cta.variant}
                  size="md"
                >
                  {cta.label}
                </Button>
              ))}
              <a
                href={config.social.kakaoChannelUrl}
                target="_blank"
                rel="noreferrer"
                className="border-line text-text hover:border-accent hover:text-accent-strong rounded-pill inline-flex items-center border px-5 py-2 text-base font-medium transition-colors"
              >
                카카오톡 채널 추가
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
