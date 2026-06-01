import type { Metadata } from 'next';
import Link from 'next/link';
import { Button, PageHero, SectionBadge } from '@/components/primitives';
import { publicConfig } from '@/lib/public-config';
import { serverConfig as config } from '@/lib/server-config';

export const metadata: Metadata = {
  title: `무료 진단 신청 — ${config.brand.name}`,
  description: '5분 안에 끝나는 15개 질문으로 사이트 약점과 우선순위를 30분 안에 정리해드려요.',
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow={<SectionBadge icon="✉">FREE DIAGNOSIS</SectionBadge>}
        title="무료 진단 신청"
        sub="가진 자료만 보내주시면 무엇을 만들 수 있는지, 무엇을 더 준비하면 좋은지 30분 안에 정리해드려요."
        align="center"
      />

      <section className="border-line border-t">
        <div className="mx-auto max-w-3xl px-[var(--space-gutter)] py-[var(--space-section)]">
          <div className="border-line bg-surface premium-card flex flex-col items-center gap-6 rounded-2xl border p-10 text-center">
            <h2 className="text-h1 ko-heading break-keep">
              5분이면 끝나요
            </h2>
            <p className="text-body text-muted ko-relaxed max-w-xl break-keep">
              15개 질문 5단계로 정리된 무료 진단 폼입니다. 답해주신 내용을 바탕으로 30분 안에 사이트
              약점과 우선순위를 회신드려요. 자료가 없어도 시작할 수 있어요.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button href="/contact/form" variant="primary" size="lg">
                무료 진단 시작하기 →
              </Button>
              <Link
                href={`mailto:${publicConfig.contact.email}`}
                className="border-line text-text hover:border-accent hover:text-accent-strong rounded-pill inline-flex items-center border px-6 py-3 text-base font-medium transition-colors"
              >
                이메일로 보내기
              </Link>
            </div>

            <ul className="text-small text-muted ko-tight mx-auto mt-4 max-w-md space-y-1 text-left">
              <li>· 입력 도중 새로고침해도 작성한 내용이 그대로 남아요</li>
              <li>· 영업 시간 안에 보통 30분~3시간 안에 회신드려요</li>
              <li>· 카카오톡 상담도 같이 받고 있어요</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
