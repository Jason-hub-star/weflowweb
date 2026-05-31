---
date: 2026-05-30
page: /kit#primitives
phase: 정공법 Task #3
stage: Done
owner: claude
---

# Foundation Primitives 16개 추출 + `/kit` 등재

## 작업 요약

주인님 정공법 트랙 Task #3. 17 마케팅 라우트 작성에 필요한 가장 작은 단위 16개 부품을
`components/primitives/`에 추출하고 `/kit#primitives` 카테고리에 라이브로 등재.

## 추출한 16개

| 묶음 | 컴포넌트 |
|---|---|
| 버튼·꼬리표 (4) | Button · Badge · Tag · Avatar |
| 카드 큰 단위 (3) | Card · PageHero · CTASection |
| 폼 입력 (4) | Input · Textarea · Select · Checkbox |
| 네비 (4) | Tabs · Accordion · Breadcrumbs · Pagination |
| 소품 (1) | RatingStars |

총 16. (정확히 Phase 3 Day 3 명세 일치)

## 파일

```
apps/web/components/primitives/
├── Button.tsx          (3 variant × 3 size, href→a/button 자동)
├── Card.tsx            (flat/raised/glass)
├── Badge.tsx           (6 tone: accent/amber/muted/success/warning/error)
├── Tag.tsx             (#hashtag pill, anchor 가능)
├── PageHero.tsx        (eyebrow + h1 + sub + slot, align left/center)
├── CTASection.tsx      (eyebrow + h2 + sub + primary/secondary CTA)
├── Input.tsx           (label · hint · error 자동 처리 + aria)
├── Textarea.tsx        (Input과 동일 패턴)
├── Select.tsx          (Input과 동일 패턴)
├── Checkbox.tsx        (accent-accent 체크박스)
├── Tabs.tsx            ('use client', 키보드 + aria-selected)
├── Accordion.tsx       ('use client', allowMultiple + aria-expanded)
├── Breadcrumbs.tsx     (aria-current=page 자동)
├── Pagination.tsx      (page ± 2 windowed, prev/next disabled 처리)
├── RatingStars.tsx     (★ 풀패턴 + 소수 % fill)
├── Avatar.tsx          (src 있으면 img, 없으면 initial fallback)
└── index.ts            (barrel export)
```

## 검증

| 단계 | 결과 |
|---|---|
| typecheck | PASS · 16 컴포넌트 모두 타입 안전 |
| build | PASS · `/kit` ○(Static), 4 mockup ●(SSG) 그대로 |
| 시맨틱 토큰 | 하드코딩 hex 0건 (`bg-accent`·`text-text`·`border-line`만 사용) |
| 'use client' | Tabs · Accordion 2개만, 나머지 14개 Server Component |
| a11y | aria-controls·aria-expanded·aria-current·aria-invalid·aria-describedby 챙김 |
| `/kit` 등재 | 16 KitCard + `primitives` 카테고리 nav 추가 |
| agent-browser | 1440 캡처 3장 (top·mid·bot) + ERROR_OVERLAY 0건 |

## Evidence

- `evidence/mockup/kit-primitives-top.png` — 카테고리 헤더 + Button + Card
- `evidence/mockup/kit-primitives-mid.png` — Badge 6 tone + Tag + PageHero 시작
- `evidence/mockup/kit-primitives-bot.png` — Input 3종 + 에러 메시지

## 설계 결정

- **Button**: `variant`로 모양(primary/secondary/ghost), `size`로 크기(sm/md/lg). `href` prop 있으면 `<a>`, 없으면 `<button>` 자동 분기. disabled 시 opacity-50 + cursor-not-allowed.
- **Card**: glass variant는 `backdrop-blur-md` + `bg-surface/80`로 SSOT 명세 일치.
- **Badge / Tag 구분**: Badge는 작은 라벨(추천·NEW·상태), Tag는 #hashtag 꼬리표(필터·키워드). 둘 다 pill 모양이지만 의미·tone 다름.
- **Tabs · Accordion만 client**: 상태(useState) 필요. 나머지 14개는 server-side render 가능 → 폼은 부모 form에서 controlled 처리.
- **Pagination**: `hrefFor: (p) => string` callback prop으로 라우트 비의존. 현재 페이지 ± 2 windowed.
- **RatingStars**: 풀스트링 ★★★★★ 위에 부분 너비 absolute로 fill (소수점 0.5도 자연스럽게).
- **Avatar**: `name` prop 필수 (fallback 첫 글자), `src` 있으면 `<img>` (next/image 미사용 — 마케팅 LCP 이미지만 next/image 권장).
- **모든 색은 시맨틱 토큰**: hardcoded hex 0건 (Hard Rule 4). 시안 라이트(`[data-mockup='1·2·3']`)에서도 자동 정렬.

## 다음 액션

- → Phase 3 Day 4 (Task #4) — devfive 시그니처 모션 5종
  - `<MascotOrbit>` — Why 섹션 마스코트 떠다님
  - `<FloatingParticles>` — Hero B+ 떠다니는 키워드 6 가독성 보강
  - `<ServiceRailDrag>` — 서비스 카드 가로 드래그/스크롤
  - `<ProcessAccordion>` — 개발 프로세스 아코디언/타임라인 (기본 Accordion 위에 timeline 시각화 추가)
  - `<ClientLogoMarquee>` — 클라이언트/파트너 로고 띠 (CSS marquee)

## 한줄정리

부품 16개 다 만들어서 `/kit#primitives`에 라이브로 진열 완료, 이제 다음 모션 5종 추출 후 17 라우트 작성 가능.
