import type { Metadata } from 'next';
import { config } from '@/lib/config';
import { getStoryPage } from '@/lib/content/loaders';
import { StorySections } from './StorySections';

export const metadata: Metadata = {
  title: `스토리 — ${config.brand.name}`,
  description:
    'WEFLOW(위플로우)는 사람과 기술이 함께 흘러가며 더 좋은 방향을 만드는 회사입니다. WE = 우리·관계, FLOW = 흐름·성장.',
  openGraph: {
    title: `스토리 — ${config.brand.name}`,
    description:
      '사람이 움직이면, 기술은 따라온다 — WEFLOW의 시작과 흐름을 소개합니다.',
    type: 'website',
  },
};

export default function StoryPage() {
  const story = getStoryPage();
  return <StorySections data={story} />;
}
