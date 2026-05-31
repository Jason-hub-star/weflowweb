import type { Metadata } from 'next';
import { PageHero, SectionBadge } from '@/components/primitives';
import { getDiagnoseForm } from '@/lib/content/loaders';
import { config } from '@/lib/config';
import { DiagnoseFormShell } from './DiagnoseFormShell';

export const metadata: Metadata = {
  title: `무료 진단 신청 — ${config.brand.name}`,
  description: '5분이면 끝나는 15개 질문으로 사이트 약점과 우선순위를 30분 안에 정리해드려요.',
};

export default function DiagnoseFormPage() {
  const data = getDiagnoseForm();
  return (
    <>
      <PageHero
        eyebrow={<SectionBadge icon="✉">{data.hero.eyebrow}</SectionBadge>}
        title={data.hero.title}
        sub={data.hero.sub}
        align="center"
      />
      <DiagnoseFormShell data={data} />
    </>
  );
}
