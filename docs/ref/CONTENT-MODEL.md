# Content Model — WEFLOW

> 모든 콘텐츠는 `apps/web/content/` 하위 .md 파일.  
> frontmatter는 zod 스키마로 검증 (`apps/web/lib/content.ts`).  
> CMS·DB 없이 Git이 SSOT.

작성: 2026-05-29 · 잠금: DEC-016

---

## 1. 폴더 구조

```
apps/web/content/
├── cases/
│   ├── case-XXX-운동센터-onngeul.md
│   └── ...
├── reviews/
│   ├── review-XXX-카페-사장님.md
│   └── ...
├── blog/
│   ├── 2026-05-홈피-제작-3가지-팁.md
│   └── ...
├── notice/
│   ├── 2026-05-23-출시-안내.md
│   └── ...
├── legal/
│   ├── privacy.md
│   └── terms.md
├── banners.md          # 메인 hero 배너 후보 (관리자 0차)
└── popups.md           # 팝업/이벤트 후보
```

명명: kebab-case + 분류 접두사. 사례·후기·블로그·공지는 `<slug>.md`가 라우트.

---

## 2. Frontmatter 스키마

### case (성공 사례) — `content/cases/*.md`
```yaml
---
slug: onngeul-fitness                 # 라우트 = /cases/onngeul-fitness
title: 온글 피트니스 — 문의 3배 증가
category: 운동/뷰티                     # 전체|운동/뷰티|교육|전문서비스|생활/지역
client: (주)온글
industry: 피트니스
period: 2026-03 ~ 2026-04
thumbnail: /assets/cases/onngeul-thumb.png
hero_image: /assets/cases/onngeul-hero.png
summary: 한 줄 요약 (메타·OG에 사용)
metrics:
  - label: 월 문의 수
    before: 8
    after: 24
  - label: 모바일 이탈률
    before: 62
    after: 31
    unit: '%'
tags: [SEO, 모바일최적화, 광고운영]
order: 1                              # 정렬용 (낮을수록 우선)
published: true                       # false면 목록·라우트 미노출
seo:
  title: (생략 시 title 그대로)
  description: (생략 시 summary 그대로)
---
```

### review (후기) — `content/reviews/*.md`
```yaml
---
slug: cafe-sajangnim-2026-04
name: 김XX 사장님
business_type: 카페
location: 서울 마포구
rating: 5
content_summary: 한 줄 요약 (카드용)
thumbnail: /assets/reviews/cafe-xx.png    # 선택
approved: true                            # 관리자 승인 기반 (1차에는 수동)
approved_at: 2026-04-12
order: 1
published: true
---
```

### blog — `content/blog/*.md` (MDX 허용)
```yaml
---
slug: 2026-05-homepage-conversion-3-tips
title: 홈페이지 문의 전환을 늘리는 3가지 팁
description: 첫 화면 CTA, 모바일 폼 길이, 신뢰 근거 노출의 3가지 포인트.
author: 위플로우 팀
publishedAt: 2026-05-20
updatedAt: 2026-05-20
thumbnail: /assets/blog/conversion-3-tips.png
tags: [전환, 모바일, CTA]
category: 인사이트
order: 1
published: true
---
```

### notice — `content/notice/*.md`
```yaml
---
slug: 2026-05-23-launch
title: 위플로우 신규 사이트 오픈 안내
publishedAt: 2026-05-23
pinned: true
category: 공지                          # 공지|이벤트|업데이트
published: true
---
```

### banners.md (배열 형식)
```yaml
---
banners:
  - id: launch-2026-05
    headline: 신규 오픈 기념 50% 할인
    body: 5월 한정 모든 제작 플랜 반값
    cta_label: 무료 진단 받기
    cta_href: /contact
    image: /assets/banners/launch.png
    active: true
    starts_at: 2026-05-23
    ends_at: 2026-06-30
  - id: ...
---
```

### popups.md (배열 형식)
```yaml
---
popups:
  - id: first-visit-coupon
    headline: 처음이라면 무료진단
    body: 첫 방문 시 1분 진단 + 견적
    cta_label: 진단 시작
    cta_href: /contact
    image: /assets/popups/first.png
    active: true
    show_after_ms: 5000
    show_once: true
    starts_at: 2026-05-23
    ends_at: 2026-06-30
---
```

### legal — `content/legal/{privacy,terms}.md`
```yaml
---
title: 개인정보 처리방침
updatedAt: 2026-05-29
version: 1
---
# 본문 (MDX 또는 일반 MD)
```

---

## 3. zod 검증

`apps/web/lib/content.ts`에서 폴더별 스키마 정의 + 빌드 타임 검증. 누락 필드·잘못된 타입은 빌드 실패.

```ts
import { z } from 'zod';

export const caseSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  category: z.enum(['전체','운동/뷰티','교육','전문서비스','생활/지역']),
  client: z.string().optional(),
  industry: z.string().optional(),
  period: z.string().optional(),
  thumbnail: z.string().startsWith('/'),
  hero_image: z.string().startsWith('/').optional(),
  summary: z.string().min(1),
  metrics: z.array(z.object({
    label: z.string(),
    before: z.union([z.string(), z.number()]),
    after: z.union([z.string(), z.number()]),
    unit: z.string().optional(),
  })).default([]),
  tags: z.array(z.string()).default([]),
  order: z.number().default(999),
  published: z.boolean().default(true),
  seo: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }).optional(),
});
```

review/blog/notice/banners/popups도 동일 패턴.

---

## 4. 라우트 매핑

- `/cases` = `published: true` 사례 카드 그리드 + 카테고리 필터
- `/cases/[slug]` = 사례 상세, MDX 렌더
- `/reviews` = `approved: true && published: true` 후기 카드 그리드
- `/blog`, `/blog/[slug]` = `published: true` 블로그
- `/notice`, `/notice/[slug]` = 공지 (pinned 상단 고정)

---

## 5. 갱신 흐름

1. `content/` 안에 .md 파일 추가/수정
2. `pnpm dev`로 로컬 확인 (HMR)
3. zod 검증 실패 시 명확한 에러
4. 출시 후 갱신은 Vercel 재배포 또는 ISR `revalidateTag` 호출

2차에 관리자 도입 시:
- `banners.md`, `popups.md` → Edge Config로 옮길지 검토
- review는 사용자 입력 + 관리자 승인 워크플로로 전환

---

---

## 6. 페이지 데이터 SSOT — JSON + zod (DEC-050)

> **DEC-050 (2026-05-30) 잠금** — 각 마케팅 라우트의 페이지 데이터(섹션 카피·카드 배열·CTA·메타)는 `content/pages/{slug}.json` 한 파일에서 관리하고 `lib/content/schemas.ts`의 zod 스키마로 빌드 시점 검증한다.

### 2026-05-31 사례 레퍼런스 목업 보강

- `content/pages/cases.json`는 실제 납품 사례뿐 아니라 대표 컨펌용 레퍼런스 목업도 담을 수 있다.
- 레퍼런스 목업은 `sourcePath`에 원본 출처를 명시하고, `metric`은 실제 성과 수치처럼 보이는 `+N%` 문구 대신 "강한 히어로 카피", "제품 화면 신뢰감" 같은 검토 포인트로 쓴다.
- 현재 허용 카테고리: `전체`, `교육`, `로컬 서비스`, `B2B`, `커머스`, `브랜드/스튜디오`, `전문 서비스`, `SaaS`, `비즈니스`, `제품`.
- Landingfolio 기반 스크린샷 자산은 `apps/web/public/assets/cases/weflow-case-ref-*.png`에 1200×675로 저장한다.

### 6.1 폴더 구조

```
apps/web/content/
├── pages/                       # 페이지별 데이터 (JSON, 신규)
│   ├── home.json                # 홈 11 섹션 한 곳
│   ├── services.json
│   ├── pricing.json
│   ├── reviews.json
│   ├── faq.json
│   ├── contact.json
│   ├── reservation.json
│   ├── landing.json
│   ├── notice.json              # 리스트 메타 (상세는 content/notice/*.md)
│   ├── blog.json                # 리스트 메타 (상세는 content/blog/*.md)
│   ├── products.json
│   └── cases.json               # 리스트 메타 (상세는 content/cases/*.md)
├── cases/                       # 사례 상세 (MD with frontmatter)
├── reviews/                     # 후기 카드 (MD)
├── blog/                        # 블로그 글 (MDX)
├── notice/                      # 공지 상세 (MD)
├── legal/
│   ├── privacy.md
│   └── terms.md
├── banners.md
└── popups.md

apps/web/lib/content/
├── schemas.ts                   # zod 스키마 (페이지별 + 공통)
└── loaders.ts                   # 헬퍼 (load + parse + cache)
```

### 6.2 분리 기준

| 콘텐츠 타입 | 위치 | 형식 | 이유 |
|---|---|---|---|
| 페이지 섹션 데이터 (Hero·서비스 4·Why 6·가격 3·후기 메타·CTA) | `content/pages/*.json` | **JSON** | 짧고 구조화, 비개발자 친화, 다국어 확장 친화 |
| 긴 본문 (사례·블로그·공지·약관) | `content/{cases,blog,notice,legal}/*.md` | **MD with frontmatter** | 멀티라인·MDX·강조 자연스러움 |
| 사이트 전역 설정 | `lib/config.ts` | TS | 타입 안전 + import 한 곳 |

### 6.3 예시 — `content/pages/home.json`

```json
{
  "hero": {
    "eyebrow": "랜딩&홈페이지 제작 · 광고 운영 · 검색 등록 · 맞춤형 웹 솔루션",
    "title": "문의로 이어지는 홈페이지를 만듭니다",
    "sub": "홈페이지 제작부터 광고 연동·운영 관리까지...",
    "video": "/hero/hero-bg.mp4",
    "poster": "/assets/weflow-blue-startup-hero.png",
    "ctas": [
      { "label": "무료 진단 신청", "href": "/contact", "variant": "primary" },
      { "label": "성공 사례 보기", "href": "/cases", "variant": "secondary" }
    ],
    "benefits": [
      { "title": "케어 플랜", "body": "제작·광고·운영" },
      { "title": "3~7일", "body": "빠른 제작" },
      { "title": "합리적 비용", "body": "가성비 + 퀄리티" }
    ]
  },
  "services": {
    "eyebrow": "SERVICES",
    "title": "단순 제작이 아니라, 흐름을 설계합니다",
    "items": [
      { "code": "01", "title": "랜딩 · 홈페이지 제작", "body": "..." },
      { "code": "02", "title": "광고 연동", "body": "..." },
      { "code": "03", "title": "예약 · 상담 운영", "body": "..." },
      { "code": "04", "title": "관리자 콘텐츠 수정", "body": "..." }
    ]
  },
  "why": { "eyebrow": "WHY WEFLOW", "title": "왜 WEFLOW인가요", "items": [...] },
  "cases": { "eyebrow": "SUCCESS CASES", "title": "...", "items": [...] },
  "reviews": { "eyebrow": "REVIEWS", "title": "...", "items": [...] },
  "process": { "eyebrow": "PROCESS", "title": "...", "items": [...] },
  "pricing": { "eyebrow": "PRICING", "title": "...", "items": [...] },
  "partners": { "label": "함께 일한 클라이언트", "items": [...] },
  "cta": { "eyebrow": "FREE DIAGNOSIS", "title": "...", "primary": {...}, "secondary": {...} }
}
```

### 6.4 zod 스키마 — `lib/content/schemas.ts`

```ts
import { z } from 'zod';

export const CTASchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  variant: z.enum(['primary', 'secondary', 'ghost']).optional(),
});

export const HeroSchema = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  sub: z.string().optional(),
  video: z.string().optional(),
  poster: z.string().optional(),
  ctas: z.array(CTASchema),
  benefits: z.array(z.object({ title: z.string(), body: z.string() })).default([]),
});

export const SectionSchema = z.object({
  eyebrow: z.string(),
  title: z.string(),
  sub: z.string().optional(),
  items: z.array(z.any()).default([]),  // 페이지별로 더 좁힘
});

export const HomePageSchema = z.object({
  hero: HeroSchema,
  services: SectionSchema,
  why: SectionSchema,
  cases: SectionSchema,
  reviews: SectionSchema,
  process: SectionSchema,
  pricing: SectionSchema,
  partners: z.object({ label: z.string(), items: z.array(z.any()) }),
  cta: z.object({
    eyebrow: z.string(),
    title: z.string(),
    sub: z.string().optional(),
    primary: CTASchema.optional(),
    secondary: CTASchema.optional(),
  }),
});

export type HomePage = z.infer<typeof HomePageSchema>;
```

### 6.5 페이지에서 사용

```tsx
// apps/web/app/page.tsx
import data from '@/content/pages/home.json';
import { HomePageSchema } from '@/lib/content/schemas';

const home = HomePageSchema.parse(data);  // 빌드 시점 검증 (실패 시 빌드 fail)

export default function HomePage() {
  return (
    <>
      <HeroVideo src={home.hero.video} poster={home.hero.poster} mascot={...}>
        <p className="text-eyebrow text-accent">{home.hero.eyebrow}</p>
        <h1 className="text-display ko-heading mt-5">{home.hero.title}</h1>
        ...
      </HeroVideo>
      <HomeServices data={home.services} />
      <HomeWhy data={home.why} />
      ...
    </>
  );
}
```

### 6.6 갱신 흐름 (비개발자 친화)

1. `content/pages/home.json` 한 파일 열기
2. 텍스트 수정 → 저장
3. `pnpm dev`로 HMR 즉시 확인 (실패 시 zod 에러로 명확한 위치)
4. 출시 후 갱신은 Git 커밋 → Vercel 자동 배포

### 6.7 제약·주의

- JSON은 **멀티라인 문자열·주석·trailing comma 미지원** — 긴 본문은 별도 MD로 분리
- 짧은 강조는 인라인 `**...**` 같은 표기는 컴포넌트 측에서 파싱 처리
- 다국어 확장 시 `home.ko.json` · `home.en.json` 패턴
- `_README.md`를 `content/pages/`에 두어 비개발자 가이드 제공 권장

### 6.8 마이그레이션 우선순위

1. **홈 `/`** — Phase 4 묶음 A 진입 전 `home.json`으로 추출 (현재 page.tsx 하드코딩)
2. **services · pricing · cases · reviews · faq · contact** — 작성 시 처음부터 JSON
3. **products · landing · reservation · notice · blog** — 작성 시 처음부터 JSON
4. **`lib/config.ts` 잔류 #TODO** — 사업자 정보·카카오 URL은 그대로 TS (시크릿 친화)

---

## 한줄정리

**사례·후기·블로그·공지·배너·팝업·약관 모두 .md frontmatter + zod로 검증, 페이지 섹션 데이터는 `content/pages/*.json` + zod 한 곳 (DEC-050). Git이 단일 출처. 관리자 화면 없이 PR로 갱신.**
