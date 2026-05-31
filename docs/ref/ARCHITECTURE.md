# Architecture — WEFLOW

작성: 2026-05-29 · 업데이트: 2026-05-31 · 잠금: DEC-008/009/010/013/014/015/016/017/050/051/057

---

## 1. Layers

```
┌──────────────────────────────────────────────────┐
│  Browser (Pretendard + Geist Mono)              │
│  - Server Components 렌더링                       │
│  - Framer Motion · Lenis · react-hook-form       │
└──────────────────────────────────────────────────┘
           │
           ▼
┌──────────────────────────────────────────────────┐
│  Next.js 16 App Router (apps/web)                │
│  - flat App Router 공개 라우트                     │
│  - /hero-lab/[id], /kit 내부 라우트                │
│  - API: /api/inquiry, /api/reservation 예정        │
│  - Cache Components 'use cache'                  │
└──────────────────────────────────────────────────┘
           │             │            │
           ▼             ▼            ▼
   ┌──────────┐   ┌──────────┐  ┌──────────────┐
   │ Content  │   │ Tokens   │  │ External API │
   │  MD/MDX  │   │ packages │  │  Resend      │
   │ +zod     │   │ /tokens  │  │  Sheets API  │
   │          │   │          │  │  BotID       │
   └──────────┘   └──────────┘  └──────────────┘
```

---

## 2. Workspace

- **pnpm + turborepo** 모노레포
- `apps/web` — Next.js 16 앱
- `packages/tokens` — 자체 디자인 토큰 패키지 (CSS variables + TS exports)
- 의존성 그래프: `apps/web → packages/tokens`

`pnpm-workspace.yaml`:

```yaml
packages:
  - apps/*
  - packages/*
```

`turbo.json` 태스크: `dev`, `build`, `lint`, `typecheck`, `clean`.

---

## 3. Rendering Strategy

| Route 그룹                                                        | 전략                                 | 이유                        |
| ----------------------------------------------------------------- | ------------------------------------ | --------------------------- |
| `/`, `/story`, `/services`, `/pricing`, `/cases`, `/reviews`, `/blog`, `/notice`, `/faq`, `/privacy`, `/terms` | SSG + JSON SSOT | 공개 핵심 페이지 |
| `/cases/[id]` | SSG 동적 상세 | `cases.json` 기반 대표 컨펌용 레퍼런스 |
| `/contact` | Server Component placeholder | 네이버 폼 임시 CTA, 자체 폼 결정 대기 |
| `/hero-lab/[id]`, `/kit` | SSG + noindex | 내부 hero 박물관·컴포넌트 카탈로그 |
| `/reservation`, `/landing`, `/products`, `/api/inquiry`, `/api/reservation` | 예정 | 폼/API 잔여 |

---

## 4. 디렉토리 — apps/web

```
apps/web/
├── app/
│   ├── page.tsx                  # /
│   ├── story/page.tsx
│   ├── services/page.tsx
│   ├── pricing/page.tsx
│   ├── cases/{page.tsx,[id]/page.tsx}
│   ├── reviews/page.tsx
│   ├── blog/page.tsx
│   ├── notice/page.tsx
│   ├── faq/page.tsx
│   ├── contact/page.tsx              # 임시 네이버 폼 CTA placeholder
│   ├── hero-lab/[id]/page.tsx
│   ├── kit/page.tsx                  # noindex 재사용 컴포넌트 카탈로그
│   ├── privacy/page.tsx
│   ├── terms/page.tsx
│   ├── opengraph-image.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   └── layout.tsx
├── components/
│   ├── layout/
│   ├── marketing/
│   ├── forms/
│   ├── primitives/
│   ├── motion/
│   ├── seo/
│   ├── mascot/
│   ├── kit/                  # KitCard, Copy button 등 카탈로그 헬퍼
│   └── hero/                 # Hero 5안 컴포넌트
├── content/                  # DEC-050: pages/*.json + 긴 본문 MD frontmatter
│   ├── pages/
│   │   ├── home.json
│   │   ├── story.json
│   │   ├── services.json
│   │   ├── pricing.json
│   │   ├── cases.json
│   │   ├── reviews.json
│   │   ├── blog.json
│   │   ├── notice.json
│   │   ├── faq.json
│   │   ├── privacy.json
│   │   └── terms.json
│   └── forms/
├── lib/
│   ├── resend.ts
│   ├── sheets.ts
│   ├── botid.ts
│   ├── content.ts
│   ├── seo.ts
│   ├── analytics.ts
│   └── config.ts
└── public/
    ├── logo/
    ├── assets/
    └── mascot/                 # Flow Guide + FAQ 전용 Imagen robot helper PNG
```

---

## 5. 데이터 흐름

`DATA-FLOW.md` 참조. 요약: 폼 → BotID → zod → Promise.all(Resend, Sheets) → 응답.

## 6. 외부 의존

`INTEGRATION-MATRIX.md` 참조. Resend / Google Sheets / Vercel BotID / Vercel Analytics / Speed Insights / GA4 / GTM / Meta Pixel / Naver Wisetool / Kakao Pixel.

## 7. 보안

- 모든 시크릿은 `vercel env` (production / preview / development 분리)
- API 라우트는 Node 런타임 (BotID·Sheets SDK 호환)
- Origin 검증, 동의 미체크 시 서버에서 거부
- CSP 기본값 + 픽셀 도메인 화이트리스트

---

## 한줄정리

**Next.js 16 + pnpm 모노레포(apps/web + packages/tokens) + SSG·ISR 위주 마케팅 사이트 + 폼 API는 Node 런타임으로 Resend·Sheets·BotID를 한 번에 처리해요.**
