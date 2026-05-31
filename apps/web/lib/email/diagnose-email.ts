import type {
  AnswerValue,
  ContactAnswer,
  DiagnoseFormPage,
  DiagnoseQuestion,
} from '@/lib/content/schemas';

const OTHER_VALUE = '__OTHER__';

export function renderDiagnoseEmailHtml({
  form,
  answers,
  otherTexts,
  submittedAt,
}: {
  form: DiagnoseFormPage;
  answers: Record<string, AnswerValue>;
  otherTexts: Record<string, string>;
  submittedAt: string;
}): string {
  const contact = findContactAnswer(form, answers);
  const stepsHtml = form.steps
    .map((step) => {
      const rows = step.questions
        .map((q) => `<tr><td style="${TD_LABEL}">${escape(q.label)}</td><td style="${TD_VALUE}">${formatAnswerHtml(q, answers[q.id], otherTexts[q.id])}</td></tr>`)
        .join('');
      return `
        <h3 style="${H3}">STEP ${step.stepNumber}. ${escape(step.title)}</h3>
        <table style="${TABLE}">${rows}</table>
      `;
    })
    .join('');
  return `
    <!doctype html>
    <html lang="ko">
      <head><meta charset="utf-8" /></head>
      <body style="${BODY}">
        <div style="${WRAP}">
          <h1 style="${H1}">WEFLOW 진단 신청</h1>
          <p style="${META}">접수 시각: ${escape(formatDate(submittedAt))}</p>
          ${contact ? `<p style="${META}">회신 이메일: <a href="mailto:${escape(contact.email)}">${escape(contact.email)}</a>${contact.phone ? ` · ${escape(contact.phone)}` : ''}</p>` : ''}
          ${stepsHtml}
          <p style="${FOOT}">— 위플로우 자동 발송</p>
        </div>
      </body>
    </html>
  `.trim();
}

export function getContactEmail(
  form: DiagnoseFormPage,
  answers: Record<string, AnswerValue>,
): string | null {
  const c = findContactAnswer(form, answers);
  return c?.email ?? null;
}

export function getCompanyName(
  form: DiagnoseFormPage,
  answers: Record<string, AnswerValue>,
): string {
  for (const step of form.steps) {
    for (const q of step.questions) {
      if (q.type === 'text' && q.id.startsWith('q1_')) {
        const v = answers[q.id];
        if (typeof v === 'string' && v.trim()) return v.trim();
      }
    }
  }
  return '제출자';
}

function findContactAnswer(
  form: DiagnoseFormPage,
  answers: Record<string, AnswerValue>,
): ContactAnswer | null {
  for (const step of form.steps) {
    for (const q of step.questions) {
      if (q.type === 'contact') {
        const v = answers[q.id];
        if (v && typeof v === 'object' && !Array.isArray(v) && 'email' in v) {
          return v as ContactAnswer;
        }
      }
    }
  }
  return null;
}

function formatAnswerHtml(
  q: DiagnoseQuestion,
  value: AnswerValue | undefined,
  otherText: string | undefined,
): string {
  if (value == null || value === '') return '<span style="color:#94a3b8">— (응답 없음)</span>';
  if (q.type === 'contact') {
    const c = value as ContactAnswer;
    return [
      `이메일: ${escape(c.email)}`,
      c.phone ? `연락처: ${escape(c.phone)}` : null,
      c.memo ? `메모: ${escape(c.memo).replace(/\n/g, '<br>')}` : null,
    ]
      .filter(Boolean)
      .join('<br>');
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return '<span style="color:#94a3b8">— (응답 없음)</span>';
    return value
      .map((v) => (v === OTHER_VALUE ? `기타: ${escape(otherText ?? '')}` : escape(v)))
      .join(' · ');
  }
  if (typeof value === 'string') {
    return value === OTHER_VALUE ? `기타: ${escape(otherText ?? '')}` : escape(value);
  }
  return '<span style="color:#94a3b8">— (응답 없음)</span>';
}

function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  } catch {
    return iso;
  }
}

const BODY = 'margin:0;padding:24px;background:#f4f8ff;font-family:-apple-system,BlinkMacSystemFont,"Pretendard","Segoe UI",sans-serif;color:#0a1428;line-height:1.6;';
const WRAP = 'max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;';
const H1 = 'font-size:24px;font-weight:700;margin:0 0 8px;color:#0a1428;';
const H3 = 'font-size:16px;font-weight:600;margin:24px 0 8px;color:#2563eb;';
const META = 'font-size:13px;color:#5b6b85;margin:4px 0 16px;';
const TABLE = 'width:100%;border-collapse:collapse;font-size:14px;';
const TD_LABEL = 'padding:8px 12px;background:#f8fafc;border:1px solid #e2e8f0;width:32%;color:#334155;font-weight:500;vertical-align:top;';
const TD_VALUE = 'padding:8px 12px;border:1px solid #e2e8f0;color:#0a1428;vertical-align:top;';
const FOOT = 'font-size:12px;color:#94a3b8;margin-top:32px;border-top:1px solid #e2e8f0;padding-top:12px;';
