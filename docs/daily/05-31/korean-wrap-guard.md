# 2026-05-31 — Korean Wrap Guard

## 변경

- 전역 한국어 줄바꿈 CSS에 `overflow-wrap: break-word`를 추가해 긴 영문·숫자·혼합어 넘침을 방지.
- `scripts/check-korean-wrap.mjs` 추가.
- `package.json`에 `pnpm check:korean-wrap` 추가.
- 빈 상태 문구와 `DeveloperBuildBoard` 소제목에 `ko-relaxed`/`ko-tight` 적용.
- `.claude/skills/weflow-korean-wrap-guard` 추가.
- `HARNESS-MANIFEST.yaml`, `scripts/check-weflow-harness.sh`, `docs/ref/DESIGN-TOKENS.md` 동기화.

## 검증

- `pnpm check:korean-wrap` PASS
- `pnpm typecheck` PASS
- `pnpm lint` PASS
