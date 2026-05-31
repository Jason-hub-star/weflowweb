'use client';

import { motion, useReducedMotion } from 'framer-motion';

const buildSteps = ['브랜드 확인', '목표 정리', '디자인 방향', '페이지·기능', '자료·일정'];

const checks = [
  '업종과 현재 사이트 상태를 먼저 확인합니다',
  '목표와 아쉬운 점을 기준으로 우선순위를 정리합니다',
  '원하는 분위기·컬러·첫 화면 강조점을 맞춥니다',
  '필요한 페이지와 문의 흐름을 함께 점검합니다',
  '자료·일정·연락 방법까지 확인한 뒤 회신드립니다',
];

export function DeveloperBuildBoard(_props: {
  /** @deprecated PNG 제거됨 — 시그니처 호환용 */
  mascotSrc?: string;
  /** @deprecated PNG 제거됨 — 시그니처 호환용 */
  mascotAlt?: string;
} = {}) {
  const reduce = useReducedMotion();
  const itemProps = (index: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 10 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '0px 0px -10% 0px' },
          transition: { delay: index * 0.08, duration: 0.36, ease: [0.25, 0.1, 0.25, 1] },
        };

  return (
    <div className="border-line bg-surface relative overflow-hidden rounded-lg border p-5 text-center shadow-lg md:p-6">
      <div
        aria-hidden
        className="bg-accent-soft pointer-events-none absolute left-1/2 top-0 h-44 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
      />
      <header className="relative">
        <p className="text-eyebrow text-accent">BUILD DESK</p>
        <h3 className="text-h3 ko-heading mt-2 text-text">직접 손보는 제작 작업판</h3>
      </header>

      <div className="relative mt-6 grid gap-3 sm:grid-cols-5">
        {buildSteps.map((step, index) => (
          <motion.div
            key={step}
            {...itemProps(index)}
            className="border-line bg-bg rounded-md border p-3 shadow-sm"
          >
            <span className="text-accent font-mono text-xs font-bold">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p className="mt-2 text-small font-semibold text-text break-keep">{step}</p>
          </motion.div>
        ))}
      </div>

      <div className="border-line bg-surface-soft mt-5 rounded-md border p-4">
        <p className="text-small ko-tight font-semibold text-text">개발자가 직접 확인하는 항목</p>
        <ul className="mt-4 space-y-3">
          {checks.map((check, index) => (
            <motion.li
              key={check}
              {...itemProps(index + buildSteps.length)}
              className="flex gap-3 text-small text-muted"
            >
              <span className="bg-accent text-surface mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-xs font-bold">
                ✓
              </span>
              <span className="ko-relaxed">{check}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
