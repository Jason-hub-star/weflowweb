# 05-30 — /kit Copy UX

## 작업

- GitHub 검색으로 공개 컴포넌트 카탈로그 패턴 확인:
  - `shadcn-ui/ui` — 컴포넌트 레지스트리와 코드 배포 플랫폼
  - `shadcn/originui` — copy-and-paste 컴포넌트 컬렉션
  - `shadcnstore/shadcn-cheatsheet` — live previews + copy-paste code snippets
- `apps/web/components/kit/KitCopyButton.tsx` 추가.
- `apps/web/components/kit/KitCard.tsx` 코드 영역에 `Snippet` 헤더와 Copy 버튼 추가.
- Next 16 / ESLint 9 환경에 맞게 `apps/web/package.json` `lint`를 `eslint .`로 변경.
- `apps/web/eslint.config.mjs`를 `eslint-config-next/core-web-vitals` flat config 직접 import 방식으로 정리.
- `apps/web/postcss.config.mjs` anonymous default export 경고 제거.

## 검증

- `pnpm --filter @weflow/web typecheck` PASS
- `pnpm --filter @weflow/web lint` PASS
- `pnpm exec eslint . --max-warnings=0` (in `apps/web`) PASS
- `bash scripts/check-design-tokens.sh` PASS
- `pnpm --filter @weflow/web build` PASS
- Browser verify:
  - `http://localhost:3010/kit`
  - Copy 버튼 15개 확인
  - 첫 카드 Copy 클릭 후 `Copied` 상태 확인
  - 375 / 768 / 1440 viewport 가로 넘침 없음

## 추가 개선

- 카드 기본 화면을 “한 줄 설명 + 예시 화면” 중심으로 재구성.
- `Props`와 코드 스니펫은 `details/summary` 접기 영역으로 이동.
- 접기/펼치기는 브라우저 기본 동작으로 처리해 React state를 추가하지 않음.
- 문구를 더 쉬운 한국어로 교체:
  - `Motion Hooks` → `움직임 계산`
  - `Background Layers` → `배경 효과`
  - `Hero Variants` → `첫 화면`
- Browser verify:
  - 카드 15개 확인
  - `코드 보기` details 15개 확인
  - 초기 open details 0개 확인
  - 첫 카드 코드 열기 후 Copy 버튼 노출 확인
  - hydration mismatch 유사 콘솔 메시지 0건
  - 375 / 768 / 1440 viewport 가로 넘침 없음

## 메모

- 3010 포트에 기존 Next dev server가 이미 실행 중이어서 해당 서버로 검증.
- 개발 콘솔의 `favicon.ico` 404는 기존 미구현 자산 이슈로, 이번 변경과 무관.
