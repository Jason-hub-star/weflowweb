import { ImageResponse } from 'next/og';
import { config } from '@/lib/config';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(135deg, white 0%, aliceblue 55%, lavender 100%)',
          color: 'midnightblue',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 20,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'royalblue',
              color: 'white',
              fontSize: 34,
              fontWeight: 900,
            }}
          >
            W
          </div>
          <div style={{ fontSize: 34, fontWeight: 900 }}>{config.brand.name}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ maxWidth: 900, fontSize: 72, lineHeight: 1.08, fontWeight: 900 }}>
            {config.brand.slogan}
          </div>
          <div style={{ maxWidth: 860, fontSize: 30, lineHeight: 1.45, color: 'slategray' }}>
            {config.brand.subSlogan}
          </div>
        </div>
        <div style={{ fontSize: 24, fontWeight: 800, color: 'royalblue' }}>
          {config.site.domain}
        </div>
      </div>
    ),
    size,
  );
}
