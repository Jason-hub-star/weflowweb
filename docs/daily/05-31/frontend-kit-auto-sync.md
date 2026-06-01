# 2026-05-31 — Frontend Kit Auto Sync

## 목적

WEFLOW `/kit`의 `<KitCard>`가 늘어날 때 하네스 템플릿의 `templates/frontend-kit/kit-registry.json`도 자동으로 늘어나게 했다.

## 변경

- `scripts/sync-frontend-kit-registry.mjs` 추가
- `package.json`
  - `pnpm sync:frontend-kit`: 누락 항목 자동 추가
  - `pnpm check:frontend-kit`: registry 최신 여부 확인
- `HARNESS-MANIFEST.yaml` / `scripts/check-weflow-harness.sh`: sync script를 필수 파일에 추가
- `jason-agent-harness-template/templates/frontend-kit/*`: 자동 동기화 규칙 문서화
- `jason-agent-harness-template/templates/frontend-kit/kit-registry.json`: 기존 20개 → 63개 항목으로 확장

## 동작

1. `apps/web/app/kit/sections/**/*.tsx`에서 `<KitCard>`를 스캔한다.
2. `name + importPath` 기준으로 registry 누락 여부를 비교한다.
3. 누락 항목은 prefix별 다음 ID를 부여한다.
4. 자동 항목은 `status: "needs-curation"`으로 들어간다.
5. 사람이 `status`를 바꿔 큐레이션한 항목은 다음 sync에서 보존한다.

## 검증

- `pnpm sync:frontend-kit` PASS — 55 cards scanned, registry 63 items
- `pnpm check:frontend-kit` PASS — New items detected 0
- JSON parse + duplicate id check PASS — 63 items
