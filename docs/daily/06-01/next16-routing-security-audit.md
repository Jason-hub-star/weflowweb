# 2026-06-01 — Next 16 routing/security audit

## Context

주인님이 Next 16 App Router 운영 체크리스트(라우팅, middleware, Server Action, caching, error, state, performance, TypeScript, security, DX, deploy)를 기준으로 현재 WEFLOW 코드에 실제 취약점이나 필수 조치가 있는지 검증 요청.

## Findings

- `pnpm audit --audit-level moderate` 최초 실행에서 `postcss <8.5.10` XSS advisory가 확인됨.
- `pnpm build` 최초 실행에서 `cacheComponents: true`와 route segment config가 충돌:
  - `app/kit/page.tsx` `dynamic = 'force-dynamic'`
  - `app/cases/[id]/page.tsx` `dynamicParams = false`
  - `app/hero-lab/[id]/page.tsx` `dynamicParams = false`
  - `app/api/diagnose/route.ts` `runtime = 'nodejs'`
- 후속 build에서 Server Component `SiteFooter`의 current time 사용과 `/hero-lab/[id]` client prerender randomness 경계 문제가 확인됨.
- 정적 스캔상 `dangerouslySetInnerHTML`, 사용자 입력 기반 redirect, middleware/proxy heavy 로직, Server Action 권한 누락 표면은 확인되지 않음.

## Changes

- Next 16 Cache Components와 호환되지 않는 route segment config 제거.
- `package.json` pnpm override로 `postcss`를 `8.5.15`에 고정하고 lockfile 재해결.
- `@next/third-parties`를 `16.2.6`으로 Next 16.2.6과 정렬.
- OG route의 불필요한 eslint-disable 제거.
- `/hero-lab/[id]` hero variant client component를 `Suspense`로 감쌈.

## Verification

```bash
pnpm audit --audit-level moderate
# No known vulnerabilities found

pnpm typecheck
# Tasks: 2 successful, 2 total

pnpm lint
# Tasks: 1 successful, 1 total

pnpm --dir apps/web build
# exit 0
```

## Residual Notes

- `pnpm --dir apps/web build`는 성공하지만 `/opengraph-image`에서 동적 폰트 fetch 경고가 남음. 배포 차단은 아니며, OG 한글 렌더 품질 보강 시 `ImageResponse`에 로컬 Pretendard font data를 명시하는 후속 작업 권장.
- `/reservation`, `/landing`, `/products` 라우트와 실제 env/Sheets/BotID 운영 주입은 기존 상태판의 출시 전 잔여 작업으로 유지.

## 한줄정리

**실제 취약점은 `postcss` audit 1건이었고, 실제 필수 조치는 Next 16 Cache Components 빌드 차단점 정리였다. 현재 audit/typecheck/lint/build는 통과한다.**
