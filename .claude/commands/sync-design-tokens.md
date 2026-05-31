---
name: sync-design-tokens
description: 토큰 변경 후 컴포넌트 동기화·하드코딩 hex 0건 검증
trigger: packages/tokens 또는 DESIGN-TOKENS.md 갱신 직후
---

# /sync-design-tokens

## 무엇을 하나
1. `packages/tokens/src/*` diff 확인
2. `apps/web/tailwind.config.ts` 매핑이 새 토큰을 포함하는지 검증
3. `apps/web/components/`에서 영향 받을 컴포넌트 grep
4. `bash scripts/check-design-tokens.sh` 실행 — 하드코딩 hex 0건
5. `docs/ref/DESIGN-TOKENS.md` 변경 반영 여부 확인
6. 보고서: 영향 컴포넌트 N개, 검증 결과, 문서 갱신 필요 여부

## 실패 조건
- hex 하드코딩 1건 이상
- DESIGN-TOKENS.md 미갱신
- Tailwind config에서 토큰 누락
