# Integration Matrix — WEFLOW

> 외부 서비스 한 곳 매트릭스. 공개 설정은 `apps/web/lib/public-config.ts`, 서버 설정/시크릿은 `apps/web/lib/server-config.ts` + `vercel env`.

작성: 2026-05-29 · 업데이트: 2026-06-01 · 잠금: DEC-013/014/015/021/022/024/061

---

## 1. 1차 도입 (출시 필수)

| Service | 용도 | env Key | Library | 비고 |
|---|---|---|---|---|
| Resend | 폼 제출 이메일 전송 | `RESEND_API_KEY`, `RESEND_FROM_EMAIL` | `resend` | 도메인 인증 필요 |
| Google Sheets | 문의·예약 기록 append | `GOOGLE_SHEETS_ID`, `GOOGLE_SERVICE_ACCOUNT_JSON` | `googleapis` | 서비스 계정 키 |
| Vercel BotID | 스팸·봇 차단 | (없음, Vercel 통합) | `botid` | `withBotId` + `instrumentation-client.ts` + `checkBotId()` |
| Vercel Analytics | 페이지 뷰·이벤트 | (Vercel 자동) | `@vercel/analytics` | 1줄 |
| Vercel Speed Insights | Core Web Vitals | (Vercel 자동) | `@vercel/speed-insights` | 1줄 |
| Vercel OG | 동적 OG 이미지 | (없음) | `@vercel/og` | layout/opengraph-image.tsx |
| Google Analytics 4 | 종합 분석 | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `next-third-parties` | production만 |
| Google Tag Manager | 태그 관리 | `NEXT_PUBLIC_GTM_ID` | `next-third-parties` | GA·픽셀 우산 |
| Meta Pixel | Facebook 광고 추적 | `NEXT_PUBLIC_META_PIXEL_ID` | `next-third-parties` | production만 |
| Naver Wisetool | 네이버 광고 전환 | `NEXT_PUBLIC_NAVER_WISETOOL_ID` | 직접 스크립트 | production만 |
| Kakao Pixel | 카카오 광고 전환 | `NEXT_PUBLIC_KAKAO_PIXEL_ID` | 직접 스크립트 | production만 |
| Google Search Console | 검색 인증 | `GOOGLE_SITE_VERIFICATION` | 메타 태그 | layout.tsx |
| Naver 서치어드바이저 | 국내 검색 | `NAVER_SITE_VERIFICATION` | 메타 태그 | layout.tsx |

## 2. 1차 — placeholder (출시 직전 교체)

| Service | 용도 | env Key | 비고 |
|---|---|---|---|
| 카카오톡 채널 | 1:1 상담 링크 | `NEXT_PUBLIC_KAKAO_CHANNEL_URL` | `#TODO_KAKAO` |
| 당근플레이스 | 지역 노출 | `NEXT_PUBLIC_DAANGN_PLACE_URL` | 등록 후 |

## 3. 2차 도입 (출시 후)

| Service | 용도 | 도입 시점 |
|---|---|---|
| Neon Postgres | inquiries/reservations/reviews 영속 | 관리자 도입 시 |
| Clerk | 관리자 로그인 | 관리자 도입 시 |
| 카카오 알림톡 | 사장님 알림 다중화 | 운영 안정화 후 |
| Vercel Blob | 후기 이미지 업로드 | 사용자 후기 직접 작성 시 |

---

## 4. Config 분리

- `apps/web/lib/public-config.ts` — Client Component import 허용. 브랜드, 사이트 URL, 공개 연락처, `NEXT_PUBLIC_*` 값만 포함.
- `apps/web/lib/server-config.ts` — Server Component, route handler, metadata, robots/sitemap/OG 전용. `GOOGLE_SITE_VERIFICATION`, `NAVER_SITE_VERIFICATION`, `RESEND_FROM_EMAIL`, `OWNER_EMAIL` 포함.
- `apps/web/lib/config.ts` — 과거 import 호환용 re-export. 신규 코드는 직접 public/server config를 고른다.

```ts
export const publicConfig = {
  brand: {
    name: 'WEFLOW',
    slogan: '문의로 이어지는 홈페이지를 만듭니다',
  },
  company: {                                     // #TODO 주인님 전달
    legalName: '#TODO',
    representative: '#TODO',
    businessNumber: '#TODO',
    mailOrderNumber: '#TODO',
    address: '#TODO',
    email: '#TODO',
    phone: '#TODO',
  },
  social: {
    kakaoChannelUrl: process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL ?? '#TODO_KAKAO',
    instagram: '#TODO',
    blog: '#TODO',
    daangn: process.env.NEXT_PUBLIC_DAANGN_PLACE_URL ?? '#TODO',
  },
  analytics: {
    ga: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    gtm: process.env.NEXT_PUBLIC_GTM_ID,
    meta: process.env.NEXT_PUBLIC_META_PIXEL_ID,
    naver: process.env.NEXT_PUBLIC_NAVER_WISETOOL_ID,
    kakao: process.env.NEXT_PUBLIC_KAKAO_PIXEL_ID,
  },
} as const;

export const serverConfig = {
  ...publicConfig,
  seo: { googleVerification, naverVerification },
  email: { from, to },
} as const;
```

---

## 5. 검증

`scripts/check-seo-manifest.sh`:
- production env에 픽셀 5종 모두 존재
- 메타 인증 태그 2종 존재
- `#TODO` 잔존 0건

---

## 한줄정리

**1차 13종 통합 + placeholder 2종, 2차 4종. 공개 값은 public-config, 서버 전용 값은 server-config와 vercel env로 분리해요.**
