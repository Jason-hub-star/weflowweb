# Patterns — Next.js 16 (App Router)

> WEFLOW 작업 시 자주 쓰는 Next 16 패턴 모음.

---

## 1. 비동기 Request API
Next 16부터 `cookies()`, `headers()`, `params`, `searchParams` 모두 async.
```ts
export default async function Page({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string>> }) {
  const { slug } = await params;
  const sp = await searchParams;
  // ...
}
```

## 2. Cache Components `'use cache'`
정적 부분만 캐시하고 동적 부분은 분리.
```tsx
'use cache';
import { unstable_cacheLife as cacheLife } from 'next/cache';

export async function CasesGrid() {
  cacheLife('hours');
  const cases = await getAllCases();
  return <Grid>{cases.map(...)}</Grid>;
}
```

## 3. proxy.ts (구 middleware.ts)
Next 16에서 미들웨어는 `proxy.ts`로 rename.
```ts
// apps/web/proxy.ts
import { NextResponse } from 'next/server';
export function proxy(request: Request) {
  // ...
  return NextResponse.next();
}
```

## 4. metadata + 동적 OG
```ts
// app/(marketing)/cases/[slug]/page.tsx
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = await getCaseBySlug(slug);
  return {
    title: c.title,
    description: c.summary,
    openGraph: { images: [`/cases/${slug}/opengraph-image`] },
  };
}
```

## 5. Server Action (폼)
```tsx
// 무료진단은 API 라우트로 처리 (BotID + 외부 SDK 필요), Server Action은 단순 폼만 사용 가능
```

## 6. Turbopack 설정
`next.config.ts`:
```ts
import type { NextConfig } from 'next';
const config: NextConfig = {
  turbopack: {  // 최상위
    // 옵션
  },
};
export default config;
```

## 7. 사용 안 함
- `next/head` → `metadata` API
- `next export` → `output: 'export'`
- `cacheHandler` 단수 → `cacheHandlers` 복수
