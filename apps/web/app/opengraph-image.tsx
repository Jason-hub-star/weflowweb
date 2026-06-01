import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { serverConfig as config } from '@/lib/server-config';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// 디자인 토큰과 일치하는 색 (next/og는 CSS 변수 미지원 → hex 예외 OK)
const TOKEN = {
  bg: '#f4f8ff',
  surfaceSoft: '#e8f0ff',
  text: '#0a1428',
  muted: '#5b6b85',
  accent: '#3b82f6',
  accentStrong: '#2563eb',
} as const;

/**
 * 로고 PNG를 base64로 인라인.
 * Vercel/local 어디서 빌드되든 prerender fetch 없이 로컬 public 파일을 읽는다.
 * 실패 시 텍스트 "W" 배지로 fallback.
 */
async function loadLogoDataUrl(): Promise<string | null> {
  try {
    const file = await readFile(join(process.cwd(), 'public/logo/weflow-logo_icon.png'));
    return `data:image/png;base64,${file.toString('base64')}`;
  } catch {
    return null;
  }
}

export default async function OpenGraphImage() {
  const logoSrc = await loadLogoDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: `linear-gradient(135deg, ${TOKEN.bg} 0%, #ffffff 55%, ${TOKEN.surfaceSoft} 100%)`,
          color: TOKEN.text,
          fontFamily: 'sans-serif',
        }}
      >
        {/* 상단 — 로고 + 워드마크 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          {logoSrc ? (
            <img
              src={logoSrc}
              width={88}
              height={88}
              alt=""
              style={{ borderRadius: 22 }}
            />
          ) : (
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: 22,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: TOKEN.accentStrong,
                color: 'white',
                fontSize: 44,
                fontWeight: 900,
              }}
            >
              W
            </div>
          )}
          <div
            style={{
              fontSize: 38,
              fontWeight: 800,
              letterSpacing: '-0.01em',
              color: TOKEN.text,
            }}
          >
            {config.brand.name}
          </div>
        </div>

        {/* 중앙 — 강조 hook + 슬로건 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              fontSize: 30,
              fontWeight: 700,
              color: TOKEN.accentStrong,
              letterSpacing: '-0.01em',
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 38,
                height: 38,
                borderRadius: 19,
                background: TOKEN.accent,
                color: 'white',
                fontSize: 22,
                fontWeight: 900,
              }}
            >
              ✦
            </span>
            5분 무료 진단 · 30분 안에 회신
          </div>
          <div
            style={{
              maxWidth: 1000,
              fontSize: 72,
              lineHeight: 1.12,
              fontWeight: 900,
              letterSpacing: '-0.025em',
              color: TOKEN.text,
            }}
          >
            {config.brand.slogan}
          </div>
        </div>

        {/* 하단 — eyebrow 좌측, 도메인 우측 */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 24,
            borderTop: `2px solid ${TOKEN.surfaceSoft}`,
          }}
        >
          <div
            style={{
              fontSize: 24,
              color: TOKEN.muted,
              letterSpacing: '0.02em',
            }}
          >
            {config.brand.eyebrow}
          </div>
          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              color: TOKEN.accentStrong,
              letterSpacing: '0.01em',
            }}
          >
            {config.site.domain}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
