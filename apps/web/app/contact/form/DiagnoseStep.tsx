'use client';

import type { AnswerValue, DiagnoseStep } from '@/lib/content/schemas';
import { DiagnoseQuestionField } from './DiagnoseQuestion';

export function DiagnoseStepView({
  step,
  answers,
  otherTexts,
  errors,
  onAnswer,
}: {
  step: DiagnoseStep;
  answers: Record<string, AnswerValue>;
  otherTexts: Record<string, string>;
  errors: Record<string, string>;
  onAnswer: (questionId: string, value: AnswerValue, otherText?: string) => void;
}) {
  return (
    <section className="border-line bg-surface premium-card rounded-2xl border p-6 md:p-8">
      <header className="border-line mb-6 border-b pb-4">
        <p className="text-eyebrow text-accent font-mono tabular-nums">
          STEP {String(step.stepNumber).padStart(2, '0')}
        </p>
        <h2 className="text-h2 ko-heading text-text mt-2 break-keep">{step.title}</h2>
        <p className="text-body text-muted ko-relaxed mt-2 break-keep">{step.sub}</p>
      </header>
      <div className="space-y-6">
        {step.questions.map((q) => (
          <DiagnoseQuestionField
            key={q.id}
            question={q}
            value={answers[q.id]}
            otherText={otherTexts[q.id]}
            error={errors[q.id]}
            onChange={(value, otherText) => onAnswer(q.id, value, otherText)}
          />
        ))}
      </div>
    </section>
  );
}
