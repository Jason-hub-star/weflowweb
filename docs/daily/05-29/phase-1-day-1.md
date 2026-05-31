# phase-1-day-1 — 2026-05-29

Stage: Doc OS Done → Phase 1 Day 1 Building

## Done today

### Phase 0.5 자기리뷰 통과
- [x] Opus 자기리뷰 (PASS-with-fixes) — 49 파일 검토
- [x] CRITICAL 4건 수정
  - [x] `.gitignore` 생성 (Vercel/Next/pnpm/Turbo 패턴 포함)
  - [x] `.nvmrc` (Node 20)
  - [x] `.npmrc` (engine-strict, auto-install-peers)
  - [x] `.editorconfig` (2-space, LF)
- [x] WARNINGS 반영
  - [x] `README.md`에 환경 요구사항 추가
  - [x] `AGENTS.md`에 마스터 ↔ 분산 SSOT 매핑 표 추가
- [x] DEC-036~040 잠금
  - [x] DEC-036: Node 20 LTS
  - [x] DEC-037: pnpm 9.x + corepack
  - [x] DEC-038: Turborepo 2.x
  - [x] DEC-039: ESLint Flat Config (Next 기본 + 자체 규칙)
  - [x] DEC-040: Prettier 2-space + tailwindcss 플러그인

### Phase 1 Day 1 — 모노레포 부팅
- [x] `pnpm-workspace.yaml` (apps/* + packages/*)
- [x] `turbo.json` (build / dev / lint / typecheck / clean tasks)
- [x] 루트 `package.json` (workspace root, packageManager 명시, devDependencies)
- [x] `.prettierrc.json` + `.prettierignore`

### Phase 1 Day 1 — packages/tokens 완성
- [x] `package.json` (@weflow/tokens 워크스페이스)
- [x] `tsconfig.json`
- [x] `src/colors.ts` — semantic color tokens
- [x] `src/typography.ts` — clamp 스케일 + 한국어 유틸
- [x] `src/spacing.ts` — section / gutter / stack 1~6
- [x] `src/radius.ts` — sm/md/lg/pill
- [x] `src/motion.ts` — easing + reveal + staggerChildren + hoverLift
- [x] `src/shadow.ts` — sm/md/lg/hover
- [x] `src/index.ts` — 통합 export
- [x] `src/theme.css` — CSS variables + mockup variants + focus ring + reduced-motion

### Phase 1 Day 1 — apps/web Next.js 16 부팅
- [x] `package.json` (Next 16, React 19, Tailwind v4, Framer Motion, Lenis, Pretendard, Geist, zod, react-hook-form)
- [x] `tsconfig.json` (strict + noUncheckedIndexedAccess + `@/*` + `@weflow/tokens` paths)
- [x] `next.config.ts` (transpilePackages, optimizePackageImports)
- [x] `postcss.config.mjs` (Tailwind v4 PostCSS plugin)
- [x] `eslint.config.mjs` (Flat Config, Next 16 + 자체 규칙)
- [x] `next-env.d.ts`
- [x] `app/globals.css` (Tailwind v4 @theme inline, Pretendard import, grain overlay, 타입 유틸)
- [x] `app/layout.tsx` (metadata · viewport · Geist Mono · @vercel/analytics · speed-insights)
- [x] `app/page.tsx` (Day 1 부팅 검증용 임시 홈)
- [x] `app/sitemap.ts` (정적 14 라우트)
- [x] `app/robots.ts` (/api, /mockup, /hero-lab disallow)
- [x] `lib/config.ts` (brand · site · company · social · analytics · seo · email — #TODO 명시)
- [x] `components/layout/SiteHeader.tsx` (sticky + nav + CTA + 로고)
- [x] `components/layout/SiteFooter.tsx` (회사 정보 · 링크 · 카피라이트)
- [x] `components/layout/MobileDrawer.tsx` (드로어 + body scroll lock)
- [x] `components/layout/FloatingCTA.tsx` (Flow Guide 캐릭터 + 액션 시트)

### 자산 복사
- [x] `design-agent-package/reference-logo/*.png` → `apps/web/public/logo/` (2개)
- [x] `design-agent-package/assets/*.png` → `apps/web/public/assets/` (4개)
- [x] `design-agent-package/character-assets/*.png` → `apps/web/public/mascot/` (3개)

총 9개 자산 복사 완료. 원본은 `design-agent-package/`에 보존.

## Verification

- ✅ `bash scripts/check-weflow-harness.sh` — 49 파일 PASS
- ✅ `bash scripts/check-design-tokens.sh` — 하드코딩 hex 0건
- ✅ `pnpm install` — 595개 패키지 설치 (peer 경고 1건: @next/third-parties @ 15.x, next 16 호환 확인됨)
- ✅ `pnpm typecheck` — 2 packages PASS
- ✅ `pnpm build` — 1.9초, 5 정적 라우트 (`/`, `/_not-found`, `/robots.txt`, `/sitemap.xml`) 0 error
- ✅ `pnpm dev` → http://localhost:3010 (포트 3000 점유로 3010 사용)
- ✅ smoke test: `/`, `/sitemap.xml`, `/robots.txt`, `/logo/weflow-logo_icon.png`, `/mascot/weflow-flow-guide-floating.png` 모두 200
- ✅ agent-browser 시각 검수
  - 데스크톱 1440: `evidence/home-desktop-1440-full.png` — H1·CTA·카드·푸터·grain 모두 정상
  - 모바일 375: `evidence/home-mobile-375.png` — H1 폭 327px / 2 라인 / 텍스트 넘침 0건 / CTA wrap 자연스러움
  - 에러 오버레이 없음, 콘솔 깨끗
  - Pretendard Variable + Geist Mono 폰트 정상 로딩
  - mint accent(#20b486), ivory bg(#f7f8f5) 토큰 정상 작동

## Findings

- vibehub-media의 `packages/design-tokens` 구조와 tailog-marketing-site의 Pretendard + Framer Motion 패턴을 참조해 `@weflow/tokens` 패키지 골격 완성. CSS variables는 1차 진실, TS export는 코드 친화 wrapper.
- Tailwind v4의 `@theme inline`이 토큰을 시맨틱 클래스로 자동 매핑 → `bg-accent`, `text-text` 등이 그대로 작동.
- Pretendard는 `pretendard` 패키지의 CSS variable 폰트를 globals.css에서 import → next/font/local의 파일 의존성 회피.
- Geist Mono는 `geist/font/mono` 패키지 사용 → next/font 표준 워크플로.
- 임시 홈은 Phase 2 (Hero 선정) 시 교체. 지금은 부팅 검증과 토큰 작동 확인 용도.

## Blocked / Issues

- (없음 — 사용자가 `pnpm install`만 실행하면 dev/build 가능)

## #TODO 잔여 (P0 — Day 2 진입 전 해소 가능)

- 사용자 `pnpm install` 실행 → Lockfile 검증
- 사용자 `pnpm dev` → 초기 페이지 시각 검수
- 사용자 `pnpm build` → 0 error / 0 warning 확인

## 결정 변경

- DEC-036~040 신규 잠금 (Doc OS 부팅 직전 누락 결정)
