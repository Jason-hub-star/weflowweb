---
name: weflow-design-system
trigger: 디자인 토큰/컴포넌트 작업 진입 시
status: starter
description: 토큰 정의 → 컴포넌트 생성 → 검증 → 문서 동기화의 표준 흐름
---

# Weflow Design System Harness

## When
- `packages/tokens/src/*` 수정
- 새 컴포넌트(`apps/web/components/*`) 추가
- `/mockup/[id]` 색 시안 작업
- `/hero-lab/[id]` Hero 시안 작업

## Flow

```
1. Token 정의 또는 수정
   └ packages/tokens/src/{colors,typography,spacing,radius,motion,shadow}.ts
2. Tailwind 매핑 자동 갱신
   └ apps/web/tailwind.config.ts (import from packages/tokens)
3. 컴포넌트 작성/수정 — 시맨틱 클래스만
   └ apps/web/components/<group>/<Name>.tsx
4. 시각 검수
   └ pnpm dev → agent-browser-verify (1440 + 375)
5. 검증
   └ bash scripts/check-design-tokens.sh   # 하드코딩 hex 0건
   └ pnpm typecheck && pnpm lint && pnpm build
6. 문서 동기화
   └ docs/ref/DESIGN-TOKENS.md
   └ docs/status/PROJECT-STATUS.md Recent Changes
   └ 색 시안인 경우 docs/ref/COLOR-VARIANTS.md
   └ Hero 시안인 경우 docs/ref/HERO-VARIANTS.md
7. 일일 증거
   └ docs/daily/MM-DD/design-<topic>.md
```

## 사용 예
- 새 색을 추가하고 싶을 때 `colors.ts` 수정 → 위 7단계
- `/mockup/2` 시안 amber 강조 추가 → 동일 7단계 + COLOR-VARIANTS 갱신
