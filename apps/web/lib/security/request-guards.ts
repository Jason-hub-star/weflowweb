import { checkBotId } from 'botid/server';
import { NextResponse } from 'next/server';
import { serverConfig } from '@/lib/server-config';

const RATE_WINDOW_MS = 60_000;
const RATE_MAX = 5;
const MAX_BODY_BYTES = 64 * 1024;
const botIdTimeoutMs = 1500;
const buckets = new Map<string, { count: number; resetAt: number }>();

export function rejectLargeBody(req: Request): NextResponse | null {
  const raw = req.headers.get('content-length');
  if (!raw) return null;
  const length = Number(raw);
  if (Number.isFinite(length) && length > MAX_BODY_BYTES) {
    return NextResponse.json({ error: '요청이 너무 커요.' }, { status: 413 });
  }
  return null;
}

export function rejectInvalidOrigin(req: Request): NextResponse | null {
  const origin = req.headers.get('origin');
  if (!origin) return NextResponse.json({ error: '허용되지 않은 요청이에요.' }, { status: 403 });

  const allowed = new Set([
    serverConfig.site.url,
    `https://${serverConfig.site.domain}`,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
  ]);

  if (process.env.NODE_ENV !== 'production') {
    allowed.add('http://localhost:3000');
    allowed.add('http://127.0.0.1:3000');
  }

  return allowed.has(origin)
    ? null
    : NextResponse.json({ error: '허용되지 않은 출처예요.' }, { status: 403 });
}

export function rejectRateLimited(req: Request): NextResponse | null {
  const key = clientKey(req);
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return null;
  }

  bucket.count += 1;
  if (bucket.count > RATE_MAX) {
    return NextResponse.json(
      { error: '요청이 너무 많아요. 잠시 후 다시 시도해주세요.' },
      {
        status: 429,
        headers: { 'Retry-After': Math.ceil((bucket.resetAt - now) / 1000).toString() },
      },
    );
  }

  return null;
}

export async function rejectBotRequest(): Promise<NextResponse | null> {
  if (process.env.NODE_ENV !== 'production' && process.env.ENABLE_BOTID_DEV !== '1') {
    return null;
  }

  try {
    const verification = await Promise.race([
      checkBotId(),
      new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('BotID timeout')), botIdTimeoutMs);
      }),
    ]);

    return verification.isBot
      ? NextResponse.json({ error: '자동화 요청은 처리할 수 없어요.' }, { status: 403 })
      : null;
  } catch (err) {
    console.error('[security] botid verification failed:', err);
    return process.env.NODE_ENV === 'production'
      ? NextResponse.json({ error: '요청 검증에 실패했어요.' }, { status: 503 })
      : null;
  }
}

function clientKey(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  const realIp = req.headers.get('x-real-ip');
  return forwarded || realIp || 'unknown';
}
