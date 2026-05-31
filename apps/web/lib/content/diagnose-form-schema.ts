import { z } from 'zod';

// ─── 콘텐츠 스키마 (JSON SSOT) ───────────────────────────────

const QuestionTextSchema = z.object({
  id: z.string(),
  type: z.enum(['text', 'url', 'textarea']),
  label: z.string(),
  placeholder: z.string().optional(),
  required: z.boolean(),
  maxLength: z.number().int().positive().optional(),
});

const QuestionChoiceSchema = z.object({
  id: z.string(),
  type: z.enum(['checkbox', 'radio']),
  label: z.string(),
  required: z.boolean(),
  options: z.array(z.string()).min(1),
  allowOther: z.boolean(),
});

const ContactFieldSchema = z.object({
  label: z.string(),
  placeholder: z.string(),
  required: z.boolean(),
});

const QuestionContactSchema = z.object({
  id: z.string(),
  type: z.literal('contact'),
  label: z.string(),
  required: z.boolean(),
  fields: z.object({
    email: ContactFieldSchema,
    phone: ContactFieldSchema,
    memo: ContactFieldSchema,
  }),
});

const DiagnoseQuestionSchema = z.discriminatedUnion('type', [
  QuestionTextSchema.extend({ type: z.literal('text') }),
  QuestionTextSchema.extend({ type: z.literal('url') }),
  QuestionTextSchema.extend({ type: z.literal('textarea') }),
  QuestionChoiceSchema.extend({ type: z.literal('checkbox') }),
  QuestionChoiceSchema.extend({ type: z.literal('radio') }),
  QuestionContactSchema,
]);

const DiagnoseStepSchema = z.object({
  id: z.string(),
  stepNumber: z.number().int().positive(),
  title: z.string(),
  sub: z.string(),
  questions: z.array(DiagnoseQuestionSchema).min(1),
});

export const DiagnoseFormPageSchema = z.object({
  hero: z.object({
    eyebrow: z.string(),
    title: z.string(),
    sub: z.string(),
  }),
  steps: z.array(DiagnoseStepSchema).min(1),
  thankyou: z.object({
    eyebrow: z.string(),
    title: z.string(),
    sub: z.string(),
    ctas: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
        variant: z.enum(['primary', 'secondary', 'ghost']),
      }),
    ),
  }),
});

export type DiagnoseFormPage = z.infer<typeof DiagnoseFormPageSchema>;
export type DiagnoseQuestion = z.infer<typeof DiagnoseQuestionSchema>;
export type DiagnoseStep = z.infer<typeof DiagnoseStepSchema>;

// ─── 제출 데이터 스키마 (API 검증) ────────────────────────────

const ContactAnswerSchema = z.object({
  email: z.string().email('올바른 이메일을 입력해주세요'),
  phone: z.string().optional(),
  memo: z.string().max(2000).optional(),
});

export type ContactAnswer = z.infer<typeof ContactAnswerSchema>;

const AnswerValueSchema = z.union([
  z.string(),
  z.array(z.string()),
  ContactAnswerSchema,
]);

export type AnswerValue = z.infer<typeof AnswerValueSchema>;

export const DiagnoseSubmissionSchema = z.object({
  answers: z.record(z.string(), AnswerValueSchema),
  otherTexts: z.record(z.string(), z.string()).optional(),
  honeypot: z.string().max(0, 'invalid submission'),
  submittedAt: z.string(),
});

export type DiagnoseSubmission = z.infer<typeof DiagnoseSubmissionSchema>;
