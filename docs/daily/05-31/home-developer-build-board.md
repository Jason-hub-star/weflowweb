# 2026-05-31 — Home BUILT BY DEVELOPERS 작업판

## 변경

- 홈 `BUILT BY DEVELOPERS` 섹션을 정적 마스코트 중심에서 `DeveloperBuildBoard` 인터랙션으로 교체.
- `DeveloperBuildBoard`는 `자료 확인 → 문구 정리 → 디자인 조정 → 코드 제작 → 연결 점검` 작업판과 개발자 검수 체크리스트를 함께 보여준다.
- 신규 motion primitive를 `components/motion/index.ts`에 export하고 `/kit`의 `MotionInteractionSignatures`에 라이브 카드로 등재.
- 홈 섹션에 `id="built-by-developers"` 앵커 추가.

## 증거

- `pnpm typecheck` PASS
- `pnpm lint` PASS
- `pnpm build` PASS
- `pnpm check:file-size` PASS
- 캡처 위치: `docs/daily/05-31/evidence/developer-build-board/`
