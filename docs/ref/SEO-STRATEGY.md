# SEO Strategy — WEFLOW

작성: 2026-05-29 · 잠금: DEC-023/024/026

---

## 1. 기본 메타 (모든 페이지 layout.tsx)

- `title`: `%s | WEFLOW — 문의로 이어지는 홈페이지 제작`
- `description`: `홈페이지 제작부터 광고 연동·운영 관리까지, 단순 제작이 아닌 문의 구조까지 설계합니다.`
- `openGraph.locale`: `ko_KR`
- `openGraph.siteName`: `WEFLOW`
- `viewport`: `width=device-width, initial-scale=1, viewport-fit=cover`
- 검색 인증 메타:
  ```html
  <meta name="google-site-verification" content="..." />
  <meta name="naver-site-verification" content="..." />
  ```

---

## 2. 페이지별 메타 키 (명세 표현 그대로)

| Route | title (suffix `| WEFLOW`) | 핵심 키워드 |
|---|---|---|
| `/` | 문의로 이어지는 홈페이지 제작 | 홈페이지 제작, 랜딩페이지 제작, 소상공인 홈페이지 |
| `/services` | 제작·광고·운영 한 번에 — 서비스 안내 | 광고 운영, 검색 등록, 운영 관리 |
| `/products` | 업종별 홈페이지 제작 패키지 | 업종별 홈페이지, 홈페이지 패키지 |
| `/pricing` | 제작플랜·케어플랜·광고 가격 안내 | 홈페이지 제작 비용, 홈페이지 가격 |
| `/cases` | 성공 사례 — 문의가 늘어난 홈페이지 | 홈페이지 성공사례 |
| `/reviews` | 고객 후기 | 홈페이지 제작 후기 |
| `/blog` | 위플로우 블로그 | 홈페이지 인사이트 |
| `/notice` | 공지·이벤트 | — |
| `/faq` | 자주 묻는 질문 | 홈페이지 제작 FAQ |
| `/reservation` | 무료 상담 예약 | 무료 진단, 무료 상담 |
| `/contact` | 무료 진단 · 문의 | 무료 진단 신청 |
| `/landing` | (캠페인별) | 시즌 키워드 |

각 페이지는 `generateMetadata`에서 `seo.title`, `seo.description` frontmatter 있으면 우선 사용.

---

## 3. sitemap.ts / robots.ts

`apps/web/app/sitemap.ts`:
```ts
import type { MetadataRoute } from 'next';
import { getAllCases, getAllReviews, getAllBlog, getAllNotice } from '@/lib/content';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://weflowlab.kr';
  const staticPaths = ['/','/services','/products','/pricing','/cases','/reviews','/blog','/notice','/faq','/reservation','/contact','/landing','/privacy','/terms'];
  const dynamic = [
    ...(await getAllCases()).map(c => `/cases/${c.slug}`),
    ...(await getAllReviews()).map(r => `/reviews#${r.slug}`),    // 단일 라우트, anchor
    ...(await getAllBlog()).map(b => `/blog/${b.slug}`),
    ...(await getAllNotice()).map(n => `/notice/${n.slug}`),
  ];
  return [...staticPaths, ...dynamic].map(path => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '/' ? 1 : 0.7,
  }));
}
```

`apps/web/app/robots.ts`:
```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/','/mockup/','/hero-lab/'] },
    sitemap: 'https://weflowlab.kr/sitemap.xml',
  };
}
```

`/mockup/[id]`, `/hero-lab/[id]`는 시안 라우트라 disallow.

---

## 4. OG 이미지

### 기본 (`apps/web/app/opengraph-image.tsx`)
- 1200×630
- 좌측: `WEFLOW` 로고 + 슬로건
- 우측: mint 그라데이션 배경 + Flow Guide

### 페이지별 동적 (`@vercel/og`)
- `/cases/[slug]`, `/blog/[slug]`: title + 썸네일
- `/pricing`: 가격 강조

```ts
// app/cases/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og';
import { getCaseBySlug } from '@/lib/content';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: { slug: string } }) {
  const c = await getCaseBySlug(params.slug);
  return new ImageResponse(
    <div style={{ /* ... 토큰 사용, 시맨틱 색만 */ }}>...</div>,
    { ...size }
  );
}
```

---

## 5. JSON-LD

### Organization (`layout.tsx`)
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "WEFLOW",
  "url": "https://weflowlab.kr",
  "logo": "https://weflowlab.kr/logo/weflow-logo_icon.png",
  "sameAs": ["#TODO_INSTAGRAM","#TODO_BLOG"],
  "contactPoint": [{
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "#TODO",
    "telephone": "#TODO",
    "areaServed": "KR",
    "availableLanguage": "Korean"
  }]
}
```

### Service (`/services`)
```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "홈페이지 제작 SaaS",
  "provider": { "@type": "Organization", "name": "WEFLOW" },
  "areaServed": "KR",
  "offers": [{ "@type": "Offer", "name": "랜딩 페이지 제작", "price": "249000", "priceCurrency": "KRW" }, ...]
}
```

### FAQPage (`/faq`)
질문·답변 자동 변환.

### Review (`/reviews`)
`AggregateRating` + 개별 `Review`.

---

## 6. 키워드 메타 (명세 표현 그대로 — DEC-026)

- `문의로 이어지는 홈페이지`
- `홈페이지 제작`, `랜딩페이지 제작`
- `광고 운영`, `검색 등록`, `운영 관리`
- `WEFLOW CARE`, `WE CARE`, `FLOW CARE`
- `소상공인 홈페이지`, `업종별 홈페이지`
- `무료 진단`, `무료 상담`

> 금지: `SEO 상단등록`, `검색 상단 노출`, `1위 보장` 같은 보장형 표현.

---

## 7. 검증

`scripts/check-seo-manifest.sh`:
- `/sitemap.xml` 200 & 모든 라우트 포함
- `/robots.txt` 200 & disallow 명시
- 기본 OG 이미지 200
- JSON-LD 4종 valid (schema.org parser)
- 페이지별 title 길이 30~60자, description 80~160자
- 인증 메타 태그 2종 존재

---

## 한줄정리

**Next 16 metadata API + @vercel/og + JSON-LD 4종 + Google·Naver 인증 메타 + 명세 키워드 그대로 — 풀스택 SEO를 1차 출시에 포함해요.**
