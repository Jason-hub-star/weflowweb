---
name: weflow-file-size-guard
description: WEFLOW 코드 파일이 400줄을 넘거나 넘을 가능성이 있을 때 자동으로 사용한다. 큰 page.tsx/component/schema 파일을 기능 폴더 안의 섹션 컴포넌트, card group, schema module, helper로 쪼개고 scripts/check-file-size.sh로 재발을 막는다.
user_invocable: true
tags: [weflow, refactor, file-size, componentization, guardrail]
trigger: '파일이 400줄 초과, 큰 page.tsx, 큰 컴포넌트, 큰 스키마, 카탈로그/섹션 누적, 컴포넌트화, 파일분리, 파일이 너무 커짐'
version: 1
auto_enrich: true
---

# WEFLOW File Size Guard

## Use When

- 앱 코드 파일이 400줄을 넘었거나 곧 넘을 때
- `page.tsx`, `*.tsx`, `schemas.ts`, kit/catalog 파일에 섹션·카드·배열이 계속 누적될 때
- 사용자가 “파일이 너무 크다”, “컴포넌트화”, “폴더 안에 분리”를 말할 때
- 큰 기능을 추가하기 전에 파일 경계를 먼저 잡아야 할 때

## Rule

- 앱 코드 목표: 파일당 **400줄 이하**
- 페이지 파일은 라우팅·데이터 로드·조립만 담당한다.
- 기능별 구현은 해당 기능 폴더 안에 둔다.
  - 홈: `apps/web/app/_home/*`
  - Kit: `apps/web/app/kit/sections/*`
  - 라우트별 클라이언트 섬: `apps/web/app/<route>/<FeatureClient>.tsx`
  - 공유 부품: `apps/web/components/{primitives|motion|layout|kit}/*`
- 재사용 가능하면 AGENTS Hard Rule 11/12에 따라 `components/*`로 추출하고 `/kit`에 등재한다.

## Workflow

1. 라인 수 선별:
   ```bash
   bash scripts/check-file-size.sh
   ```
2. 400줄 초과 파일을 분류한다.
   - `page.tsx`: 섹션 컴포넌트를 feature folder로 이동
   - 카탈로그: 섹션별 파일 + card group 파일로 이동
   - schema/loader: 도메인별 schema module로 분리
   - 긴 상수/카피: `content/pages/*.json` 또는 해당 data 파일로 이동
3. 파일명은 기능이 보이게 짓는다.
   - `HomeSections.tsx`, `PricingPlans.tsx`, `PrimitiveBasicsCards.tsx`
   - `schemas/home.ts`, `schemas/legal.ts`처럼 도메인 경계 유지
4. 변경 후 검증:
   ```bash
   bash scripts/check-file-size.sh
   pnpm typecheck
   pnpm lint
   pnpm build
   ```
5. 문서 동기화:
   - `PROJECT-STATUS.md` Recent Changes
   - 필요 시 `PAGE-COMPONENT-MAP.md`
   - daily evidence

## Not Done Until

- 앱 코드에서 400줄 초과 파일이 0건이다.
- 라우트 파일이 “조립자” 역할만 한다.
- 새 재사용 컴포넌트는 `/kit`에 등재되어 있다.
- `check-file-size`, typecheck, lint, build가 모두 통과한다.
