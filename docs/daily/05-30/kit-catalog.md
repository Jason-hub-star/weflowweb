# kit-catalog — 2026-05-30

Stage: `/kit` 라이브 카탈로그 페이지 완성

## Done today

### 정책 잠금
- [x] `DEC-045` 추가 — 재사용 단위는 `/kit`에 라이브 카드 등재 의무
- [x] `AGENTS.md` Hard Rule 12 추가
- [x] `apps/web/app/robots.ts` disallow에 `/kit` 추가 (noindex)
- [x] `patterns/motion-primitives.md`에 `/kit` 링크 추가

### 컴포넌트
- [x] `components/kit/KitCard.tsx` — `<KitCard>`, `<KitSection>`, `<KitNote>` 헬퍼
- [x] `app/kit/demos.tsx` — 'use client' 분리된 9개 미니 데모 컴포넌트
  - MouseParallaxDemo · ScrollLinkedDemo · VelocityDemo · MagneticDemo · MaskRevealDemo · FloatingPillDemo · ScrollCueDemo · MeshGradientDemo · GridTextureDemo · MobileDrawerDemo
- [x] `app/kit/page.tsx` — 6 카테고리 + 15 KitCard + 6 Hero 링크 그리드

### 카드 카탈로그 (15장)
| Category | Cards |
|---|---|
| Globals (2) | `<SmoothScrollProvider />`, `<StickyHeaderWatcher />` |
| Motion Hooks (3) | `useMouseParallax`, `useScrollLinkedValue`, `useLenisVelocity` |
| Motion Components (4) | `<MagneticButton>`, `<MaskRevealText>`, `<FloatingPill>`, `<ScrollCue>` |
| Background Layers (2) | `<MeshGradientBackground>`, `<GridTextureOverlay>` |
| Layout (4) | `<SiteHeader />`, `<SiteFooter />`, `<MobileDrawer />`, `<FloatingCTA />` |
| Hero Variants (6) | A/B/C/D/E/B+ 카드 그리드 (라이브 데모 대신 `/hero-lab/[id]` 링크) |

### 카드 구조 (KitCard props)
- `name`: 컴포넌트 이름 (mono 표시)
- `category`: chip 라벨
- `importPath`: 한 줄 import 경로
- `description`: 한국어 한 줄 설명
- `propsNote?`: props 표 (name·type·default·note)
- `demo`: ReactNode (라이브 동작)
- `code`: 복붙용 스니펫 (string)
- `bgVariant?`: 'soft' | 'dark' | 'plain'

## Verification

- ✅ `pnpm typecheck` — 2 packages PASS, 2.1s
- ✅ agent-browser 1440 — 제목·15 카드·6 섹션·앵커 점프(#motion-components) 정상
- ✅ agent-browser 375 — 모든 카드 좁은 폭 적응, 코드 스니펫만 가로 스크롤(의도)
- ✅ 데스크톱 overflow=OK
- ✅ 증거 `docs/daily/05-29/evidence/kit/{kit-desktop,kit-motion-components,kit-mobile}.png`

## Findings

- KitCard는 server component, 데모는 client component로 분리 → metadata export 가능 + 'use client' 한 파일 집중
- 모바일에서 코드 스니펫 가로 스크롤은 자연스러운 패턴 — `<pre overflow-x-auto>`
- Hero variants는 데모 박스에 풀크기 hero를 넣기 부적합 → 라우트 링크 그리드로 대체
- KitCard 자체도 카탈로그에 등재 가능 (셀프 메타) — 추후 필요 시 추가

## Blocked / Issues

- (없음)

## #TODO 잔여

- 새 컴포넌트 추가 시 카드 등재 (AGENTS Hard Rule 12)
- 카탈로그가 너무 길어지면 카테고리별 라우트 분할 검토 (2차)
- 코드 스니펫 syntax highlight 도입 검토 (shiki 또는 prismjs — 의존성 비용 보고 결정)

## 결정 변경

- (없음) DEC-045 신규 잠금만.

## 다음 액션

1. 주인님 검수: http://localhost:3010/kit
2. 추후 작업할 때 새 컴포넌트는 `/kit`에 카드 등재 의무
3. 다음: Hero B+ 배경 "살아 움직임" 보강 또는 Hero 선정 → Phase 3 진입
