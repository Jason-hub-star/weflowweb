'use client';

import { Checkbox, Input, RadioGroup, Textarea } from '@/components/primitives';
import type { AnswerValue, ContactAnswer, DiagnoseQuestion } from '@/lib/content/schemas';

const OTHER_VALUE = '__OTHER__';

export function DiagnoseQuestionField({
  question,
  value,
  otherText,
  onChange,
  error,
}: {
  question: DiagnoseQuestion;
  value: AnswerValue | undefined;
  otherText: string | undefined;
  onChange: (next: AnswerValue, nextOther?: string) => void;
  error?: string;
}) {
  return (
    <div className="space-y-3">
      <label className="text-body text-text ko-relaxed font-semibold break-keep">
        {question.label}
        {question.required ? (
          <span className="text-accent ml-1" aria-hidden>
            *
          </span>
        ) : null}
      </label>
      <FieldByType
        question={question}
        value={value}
        otherText={otherText}
        onChange={onChange}
      />
      {error ? (
        <p role="alert" className="text-small text-accent-strong ko-relaxed">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function FieldByType({
  question,
  value,
  otherText,
  onChange,
}: {
  question: DiagnoseQuestion;
  value: AnswerValue | undefined;
  otherText: string | undefined;
  onChange: (next: AnswerValue, nextOther?: string) => void;
}) {
  switch (question.type) {
    case 'text':
    case 'url':
      return (
        <Input
          type={question.type === 'url' ? 'url' : 'text'}
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          maxLength={question.maxLength}
          required={question.required}
          aria-label={question.label}
        />
      );
    case 'textarea':
      return (
        <Textarea
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={question.placeholder}
          maxLength={question.maxLength}
          required={question.required}
          aria-label={question.label}
          rows={4}
        />
      );
    case 'radio':
      return (
        <RadioField
          question={question}
          value={typeof value === 'string' ? value : null}
          otherText={otherText}
          onChange={onChange}
        />
      );
    case 'checkbox':
      return (
        <CheckboxField
          question={question}
          value={Array.isArray(value) ? value : []}
          otherText={otherText}
          onChange={onChange}
        />
      );
    case 'contact':
      return (
        <ContactField
          question={question}
          value={isContactAnswer(value) ? value : { email: '', phone: '', memo: '' }}
          onChange={onChange}
        />
      );
  }
}

function isContactAnswer(v: AnswerValue | undefined): v is ContactAnswer {
  return !!v && typeof v === 'object' && !Array.isArray(v) && 'email' in v;
}

function RadioField({
  question,
  value,
  otherText,
  onChange,
}: {
  question: Extract<DiagnoseQuestion, { type: 'radio' }>;
  value: string | null;
  otherText: string | undefined;
  onChange: (next: AnswerValue, nextOther?: string) => void;
}) {
  const options = question.allowOther
    ? [...question.options.map((o) => ({ value: o, label: o })), { value: OTHER_VALUE, label: '기타 (직접 입력)' }]
    : question.options.map((o) => ({ value: o, label: o }));
  const showOther = value === OTHER_VALUE;
  return (
    <>
      <RadioGroup
        name={question.id}
        options={options}
        value={value}
        onChange={(v) => onChange(v, showOther ? otherText : '')}
        ariaLabel={question.label}
      />
      {showOther ? (
        <Input
          type="text"
          value={otherText ?? ''}
          onChange={(e) => onChange(OTHER_VALUE, e.target.value)}
          placeholder="직접 입력해주세요"
          aria-label={`${question.label} 기타 입력`}
        />
      ) : null}
    </>
  );
}

function CheckboxField({
  question,
  value,
  otherText,
  onChange,
}: {
  question: Extract<DiagnoseQuestion, { type: 'checkbox' }>;
  value: string[];
  otherText: string | undefined;
  onChange: (next: AnswerValue, nextOther?: string) => void;
}) {
  const showOther = value.includes(OTHER_VALUE);
  const toggle = (opt: string) => {
    const next = value.includes(opt) ? value.filter((v) => v !== opt) : [...value, opt];
    onChange(next, next.includes(OTHER_VALUE) ? otherText : '');
  };
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
      {question.options.map((opt) => (
        <Checkbox
          key={opt}
          label={opt}
          name={question.id}
          checked={value.includes(opt)}
          onChange={() => toggle(opt)}
          className="border-line bg-surface hover:border-accent rounded-lg border p-3"
        />
      ))}
      {question.allowOther ? (
        <Checkbox
          label="기타 (직접 입력)"
          name={question.id}
          checked={showOther}
          onChange={() => toggle(OTHER_VALUE)}
          className="border-line bg-surface hover:border-accent rounded-lg border p-3"
        />
      ) : null}
      {showOther ? (
        <div className="sm:col-span-2">
          <Input
            type="text"
            value={otherText ?? ''}
            onChange={(e) => onChange(value, e.target.value)}
            placeholder="직접 입력해주세요"
            aria-label={`${question.label} 기타 입력`}
          />
        </div>
      ) : null}
    </div>
  );
}

function ContactField({
  question,
  value,
  onChange,
}: {
  question: Extract<DiagnoseQuestion, { type: 'contact' }>;
  value: ContactAnswer;
  onChange: (next: AnswerValue) => void;
}) {
  const update = (patch: Partial<ContactAnswer>) =>
    onChange({ ...value, ...patch });
  return (
    <div className="space-y-3">
      <Input
        type="email"
        value={value.email}
        onChange={(e) => update({ email: e.target.value })}
        placeholder={question.fields.email.placeholder}
        required
        aria-label={question.fields.email.label}
      />
      <Input
        type="tel"
        value={value.phone ?? ''}
        onChange={(e) => update({ phone: e.target.value })}
        placeholder={question.fields.phone.placeholder}
        aria-label={question.fields.phone.label}
      />
      <Textarea
        value={value.memo ?? ''}
        onChange={(e) => update({ memo: e.target.value })}
        placeholder={question.fields.memo.placeholder}
        maxLength={2000}
        rows={4}
        aria-label={question.fields.memo.label}
      />
    </div>
  );
}

export const __OTHER_VALUE__ = OTHER_VALUE;
