'use client';

import { Button } from '@/components/primitives';
import type { AnswerValue, ContactAnswer, DiagnoseFormPage } from '@/lib/content/schemas';
import { __OTHER_VALUE__ } from './DiagnoseQuestion';

export function DiagnoseReview({
  data,
  answers,
  otherTexts,
  submitting,
  submitError,
  onEdit,
  onSubmit,
}: {
  data: DiagnoseFormPage;
  answers: Record<string, AnswerValue>;
  otherTexts: Record<string, string>;
  submitting: boolean;
  submitError: string | null;
  onEdit: (stepIndex: number) => void;
  onSubmit: () => void;
}) {
  return (
    <section className="border-line bg-surface premium-card rounded-2xl border p-6 md:p-8">
      <header className="border-line mb-6 border-b pb-4">
        <p className="text-eyebrow text-accent font-mono tabular-nums">REVIEW</p>
        <h2 className="text-h2 ko-heading text-text mt-2 break-keep">제출 전 한 번 더 확인해주세요</h2>
        <p className="text-body text-muted ko-relaxed mt-2 break-keep">
          수정이 필요한 부분은 각 단계의 <strong>수정</strong> 버튼을 눌러 돌아갈 수 있어요.
        </p>
      </header>
      <ol className="space-y-5">
        {data.steps.map((step, idx) => (
          <li key={step.id} className="border-line bg-surface-soft rounded-xl border p-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-h3 ko-heading text-text break-keep">
                STEP {step.stepNumber}. {step.title}
              </h3>
              <button
                type="button"
                onClick={() => onEdit(idx)}
                className="text-small text-accent-strong hover:underline font-medium"
              >
                수정
              </button>
            </div>
            <dl className="mt-3 space-y-2">
              {step.questions.map((q) => {
                const value = answers[q.id];
                const otherText = otherTexts[q.id];
                return (
                  <div key={q.id} className="text-small ko-relaxed">
                    <dt className="text-muted">{q.label}</dt>
                    <dd className="text-text mt-0.5 break-keep">
                      {formatAnswer(value, otherText)}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </li>
        ))}
      </ol>
      {submitError ? (
        <p role="alert" className="border-accent/40 bg-accent-soft/40 text-accent-strong mt-6 rounded-lg border p-3 text-small">
          {submitError}
        </p>
      ) : null}
      <div className="border-line mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-5">
        <p className="text-small text-muted ko-tight">
          접수 후 영업일 기준 30분 안에 회신드려요. 카카오톡 상담도 같이 받고 있어요.
        </p>
        <Button
          type="button"
          variant="primary"
          size="lg"
          onClick={onSubmit}
          disabled={submitting}
        >
          {submitting ? '제출 중…' : '진단 신청 보내기'}
        </Button>
      </div>
    </section>
  );
}

function formatAnswer(value: AnswerValue | undefined, otherText: string | undefined): string {
  if (value == null || value === '') return '— (응답 없음)';
  if (Array.isArray(value)) {
    if (value.length === 0) return '— (응답 없음)';
    return value
      .map((v) => (v === __OTHER_VALUE__ ? `기타: ${otherText ?? ''}` : v))
      .join(' · ');
  }
  if (typeof value === 'string') {
    return value === __OTHER_VALUE__ ? `기타: ${otherText ?? ''}` : value;
  }
  const contact = value as ContactAnswer;
  const parts = [
    `이메일: ${contact.email}`,
    contact.phone ? `연락처: ${contact.phone}` : null,
    contact.memo ? `메모: ${contact.memo}` : null,
  ].filter(Boolean);
  return parts.join(' · ');
}
