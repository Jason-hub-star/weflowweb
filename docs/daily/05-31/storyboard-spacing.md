# 2026-05-31 — SiteBuildStoryboard spacing

## 변경

- 데스크톱 `SiteBuildStoryboard`의 진행바, 심볼, 활성 단계 카드, 하단 단계 레일 간격을 확대.
- 심볼 크기를 줄여 한 화면 안에서 각 블록 사이 여백을 확보.
- 활성 단계 카드 내부 패딩과 제목/본문/결과 간 마진을 확대.
- 06 단계 카드와 하단 단계 레일이 겹치지 않도록 sticky 영역 하단 여백과 StageRail `pb`를 추가.
- 추가로 StageRail을 활성 카드 grid 밖으로 분리해 sticky 하단에 별도 배치하고, 카드 grid에는 `pb-32`를 주어 하단 구분선과 붙지 않게 처리.
- 모바일/정적 폴백도 카드 내부 여백을 넓힘.

## 검증

- `pnpm typecheck` PASS
- `pnpm lint` PASS (기존 `<img>` warning 4건)
- `pnpm check:korean-wrap` PASS
- 캡처: `docs/daily/05-31/evidence/storyboard-spacing/`

## 추가 확인

- 06 단계 겹침 수정 후 `pnpm lint` PASS, `pnpm check:korean-wrap` PASS.
- `pnpm typecheck`는 현재 `apps/web/lib/content/loaders.ts`의 `@/content/pages/story.json` 누락으로 실패. 이번 spacing 변경과 무관한 콘텐츠 파일 누락이다.
