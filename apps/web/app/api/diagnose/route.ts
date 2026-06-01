import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { serverConfig as config } from '@/lib/server-config';
import { DiagnoseSubmissionSchema } from '@/lib/content/schemas';
import { getCachedDiagnoseForm } from '@/lib/content/loaders';
import {
  rejectBotRequest,
  rejectInvalidOrigin,
  rejectLargeBody,
  rejectRateLimited,
} from '@/lib/security/request-guards';
import {
  getCompanyName,
  getContactEmail,
  renderDiagnoseEmailHtml,
} from '@/lib/email/diagnose-email';

export async function POST(req: Request) {
  const largeBody = rejectLargeBody(req);
  if (largeBody) return largeBody;

  const invalidOrigin = rejectInvalidOrigin(req);
  if (invalidOrigin) return invalidOrigin;

  const rateLimited = rejectRateLimited(req);
  if (rateLimited) return rateLimited;

  const bot = await rejectBotRequest();
  if (bot) return bot;

  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: '요청을 읽을 수 없어요' }, { status: 400 });
  }

  const parsed = DiagnoseSubmissionSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: '입력값이 올바르지 않아요. 빠진 항목을 확인해주세요.' },
      { status: 400 },
    );
  }

  const { answers, otherTexts = {}, submittedAt } = parsed.data;
  const form = await getCachedDiagnoseForm();

  const apiKey = process.env.RESEND_API_KEY;
  const ownerEmail = process.env.OWNER_EMAIL ?? config.email.to;
  const contactEmail = getContactEmail(form, answers);
  const companyName = getCompanyName(form, answers);

  const html = renderDiagnoseEmailHtml({
    form,
    answers,
    otherTexts,
    submittedAt,
  });
  const subject = `[WEFLOW 진단] ${companyName}`;

  // 키 미설정 시 graceful fallback — 콘솔 로그만 남기고 200 반환
  if (!apiKey || ownerEmail.startsWith('#TODO')) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[diagnose] Resend API key / OWNER_EMAIL 미설정 — dryrun 모드', {
        subject,
        contact: contactEmail,
      });
    }
    return NextResponse.json({ ok: true, mode: 'dryrun' });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: config.email.from,
      to: [ownerEmail],
      replyTo: contactEmail ?? undefined,
      subject,
      html,
    });
    if (error) {
      console.error('[diagnose] resend error:', error);
      return NextResponse.json(
        { error: '메일 발송에 실패했어요. 잠시 후 다시 시도해주세요.' },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[diagnose] unexpected error:', err);
    return NextResponse.json(
      { error: '예기치 못한 오류가 발생했어요.' },
      { status: 500 },
    );
  }
}
