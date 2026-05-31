# 2026-05-31 · Story / Services Stack 정리

## 변경

- 홈 스토리 프리뷰에서 `ROOM 01` 라벨 제거. `ROOM 01`은 `/story` 히어로에서만 노출.
- 공개 `apps/web` 내 `주인님` 문구 0건으로 정리.
- 홈 Services 인라인 sticky stack을 `<ServiceSuccessStack>`으로 추출.
- `/story`에서 Services 데이터를 받아 같은 `<ServiceSuccessStack>`을 import해 사용.
- `/kit#servicesuccessstack`에 라이브 데모, props, 코드 스니펫 등재.
- 강조 숫자/링크/스토리 주요 강조는 blue accent 대신 amber 톤으로 정리. `TIMELINE`류 네비게이션/분류 라벨의 blue accent는 허용 범위로 유지.

## 증거

- 캡처: `docs/daily/05-31/evidence/story-service-stack/`
  - `home-story.png`
  - `story-top.png`
  - `story-services-stack.png`
  - `kit-service-success-stack.png`
- Browser checks:
  - `/`: `hasOwnerWord=false`, `homeHasRoom01=false`, `overflow=false`
  - `/story`: `hasOwnerWord=false`, `storyHasRoom01=true`, `hasServicesPattern=true`, `timelineStillPresent=true`, `overflow=false`
  - `/kit#servicesuccessstack`: `hasServiceSuccessStack=true`, `hasOwnerWord=false`, `overflow=false`

## 검증

- `pnpm typecheck` PASS
- `pnpm lint` PASS (기존 `<img>` warning 4건만)
- `pnpm build` PASS (SSG 29/29)
- `bash scripts/check-design-tokens.sh` PASS
- `bash scripts/check-file-size.sh` PASS
- `bash scripts/check-weflow-harness.sh` PASS
- `pnpm check:korean-wrap` PASS
