# Doc OS 연결 점검 — 2026-05-30

- 작업: 문서관리방법, 파일구조, 스킬/명령/검증 스크립트 연결 상태 점검 및 보정.
- 수정:
  - `HARNESS-MANIFEST.yaml` 신규 WEFLOW 스킬 2종 등록.
  - `scripts/check-weflow-harness.sh` 신규 스킬 검증 추가.
  - `scripts/check-doc-sync.sh` 동적 라우트 concrete route 매칭 보강.
  - `docs/ref/ARCHITECTURE.md`, `.claude/skills/weflow-page/sections/10-ia-mapping.md`를 실제 flat App Router 구조와 DEC-050 JSON SSOT로 정렬.
  - `docs/status/PROJECT-STATUS.md`, `PAGE-UPGRADE-BOARD.md`, `MISSING-AND-UNIMPLEMENTED.md`를 Phase 4 묶음 B 현재 상태로 갱신.
  - `apps/web/app/kit/page.tsx` unused import 제거.
  - `apps/web/app/kit/demos.tsx` `TagFilterDemo` 초기값 fallback 추가.
- 검증:
  - `pnpm typecheck` PASS
  - `pnpm lint` PASS
  - `pnpm build` PASS (SSG 26/26)
  - `bash scripts/check-weflow-harness.sh` PASS
  - `bash scripts/check-doc-sync.sh` PASS
  - `bash scripts/check-design-tokens.sh` PASS
- 다음:
  - `/contact`, `/reservation`, `/landing`, `/products` 라우트와 폼/API 연결.
