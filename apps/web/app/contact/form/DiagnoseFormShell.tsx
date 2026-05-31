'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/primitives';
import type {
  AnswerValue,
  ContactAnswer,
  DiagnoseFormPage,
  DiagnoseQuestion,
  DiagnoseStep,
} from '@/lib/content/schemas';
import { DiagnoseProgress } from './DiagnoseProgress';
import { DiagnoseStepView } from './DiagnoseStep';
import { DiagnoseReview } from './DiagnoseReview';
import { __OTHER_VALUE__ } from './DiagnoseQuestion';

const DRAFT_KEY = 'weflow:diagnose:draft:v1';

type Draft = {
  answers: Record<string, AnswerValue>;
  otherTexts: Record<string, string>;
  stepIndex: number;
};

export function DiagnoseFormShell({ data }: { data: DiagnoseFormPage }) {
  const router = useRouter();
  const total = data.steps.length;
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, AnswerValue>>({});
  const [otherTexts, setOtherTexts] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState('');
  const [hydrated, setHydrated] = useState(false);

  // localStorage 복원 — RAF로 deferring해서 effect 내 동기 setState 룰 회피
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const rafId = requestAnimationFrame(() => {
      try {
        const raw = window.localStorage.getItem(DRAFT_KEY);
        if (raw) {
          const draft = JSON.parse(raw) as Partial<Draft>;
          if (draft.answers) setAnswers(draft.answers);
          if (draft.otherTexts) setOtherTexts(draft.otherTexts);
          if (typeof draft.stepIndex === 'number' && draft.stepIndex >= 0 && draft.stepIndex <= total) {
            setStepIndex(draft.stepIndex);
          }
        }
      } catch {
        // 잘못된 draft 무시
      }
      setHydrated(true);
    });
    return () => cancelAnimationFrame(rafId);
  }, [total]);

  // localStorage 저장
  useEffect(() => {
    if (!hydrated || typeof window === 'undefined') return;
    try {
      const draft: Draft = { answers, otherTexts, stepIndex };
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    } catch {
      // quota exceeded 등 무시
    }
  }, [answers, otherTexts, stepIndex, hydrated]);

  const setAnswer = useCallback(
    (questionId: string, value: AnswerValue, otherText?: string) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
      if (otherText !== undefined) {
        setOtherTexts((prev) => ({ ...prev, [questionId]: otherText }));
      }
      setErrors((prev) => {
        if (!prev[questionId]) return prev;
        const next = { ...prev };
        delete next[questionId];
        return next;
      });
    },
    [],
  );

  const isReview = stepIndex === total;
  const currentStep = isReview ? null : data.steps[stepIndex];
  const stepTitles = useMemo(() => data.steps.map((s) => s.title), [data.steps]);

  const goNext = useCallback(() => {
    if (!currentStep) return;
    const nextErrors = validateStep(currentStep, answers, otherTexts);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setStepIndex((i) => Math.min(i + 1, total));
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentStep, answers, otherTexts, total]);

  const goPrev = useCallback(() => {
    setErrors({});
    setStepIndex((i) => Math.max(i - 1, 0));
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const goEdit = useCallback((idx: number) => {
    setStepIndex(Math.max(0, Math.min(idx, total - 1)));
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [total]);

  const submit = useCallback(async () => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answers,
          otherTexts,
          honeypot,
          submittedAt: new Date().toISOString(),
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error ?? '제출에 실패했어요. 잠시 후 다시 시도해주세요.');
      }
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(DRAFT_KEY);
      }
      router.push('/contact/form/thank-you');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : '제출에 실패했어요.');
      setSubmitting(false);
    }
  }, [answers, otherTexts, honeypot, router]);

  return (
    <section className="border-line border-t">
      <div className="mx-auto max-w-3xl px-[var(--space-gutter)] py-[var(--space-section)]">
        <DiagnoseProgress
          current={Math.min(stepIndex, total - 1)}
          total={total}
          stepTitles={stepTitles}
        />
        <div className="mt-8">
          {currentStep ? (
            <DiagnoseStepView
              step={currentStep}
              answers={answers}
              otherTexts={otherTexts}
              errors={errors}
              onAnswer={setAnswer}
            />
          ) : (
            <DiagnoseReview
              data={data}
              answers={answers}
              otherTexts={otherTexts}
              submitting={submitting}
              submitError={submitError}
              onEdit={goEdit}
              onSubmit={submit}
            />
          )}
        </div>

        {/* honeypot — 사람에게 보이지 않음, bot이 채우면 거부 */}
        <input
          type="text"
          name="company_alias"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
        />

        {currentStep ? (
          <nav className="mt-6 flex flex-wrap items-center justify-between gap-3" aria-label="진단 폼 네비게이션">
            <Button
              type="button"
              variant="ghost"
              size="md"
              onClick={goPrev}
              disabled={stepIndex === 0}
            >
              ← 이전
            </Button>
            <Button type="button" variant="primary" size="lg" onClick={goNext}>
              {stepIndex === total - 1 ? '검토하기 →' : '다음 →'}
            </Button>
          </nav>
        ) : null}
      </div>
    </section>
  );
}

// ─── 검증 ─────────────────────────────────────────────────────

function validateStep(
  step: DiagnoseStep,
  answers: Record<string, AnswerValue>,
  otherTexts: Record<string, string>,
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const q of step.questions) {
    const err = validateQuestion(q, answers[q.id], otherTexts[q.id]);
    if (err) errors[q.id] = err;
  }
  return errors;
}

function validateQuestion(
  q: DiagnoseQuestion,
  value: AnswerValue | undefined,
  otherText: string | undefined,
): string | null {
  if (q.type === 'contact') {
    const c = (value as ContactAnswer | undefined) ?? { email: '', phone: '', memo: '' };
    if (!c.email || !c.email.trim()) return '이메일을 입력해주세요';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) return '올바른 이메일 형식이 아니에요';
    return null;
  }
  if (!q.required) {
    if (isOtherSelected(value) && !otherText?.trim()) {
      return '"기타"를 선택하셨다면 내용을 입력해주세요';
    }
    return null;
  }
  if (q.type === 'text' || q.type === 'url' || q.type === 'textarea') {
    if (typeof value !== 'string' || !value.trim()) return '응답을 입력해주세요';
    return null;
  }
  if (q.type === 'radio') {
    if (typeof value !== 'string' || !value) return '항목을 선택해주세요';
    if (value === __OTHER_VALUE__ && !otherText?.trim()) return '기타 내용을 입력해주세요';
    return null;
  }
  if (q.type === 'checkbox') {
    if (!Array.isArray(value) || value.length === 0) return '하나 이상 선택해주세요';
    if (value.includes(__OTHER_VALUE__) && !otherText?.trim()) return '기타 내용을 입력해주세요';
    return null;
  }
  return null;
}

function isOtherSelected(value: AnswerValue | undefined): boolean {
  if (typeof value === 'string') return value === __OTHER_VALUE__;
  if (Array.isArray(value)) return value.includes(__OTHER_VALUE__);
  return false;
}
