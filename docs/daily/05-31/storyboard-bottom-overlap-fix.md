# 2026-05-31 — SiteBuildStoryboard bottom overlap fix

## 문제

- 홈의 `6단계로 완성되는 사장님의 홈페이지` 데스크톱 sticky 섹션에서 활성 카드가 하단 구분선 쪽과 겹쳐 보일 수 있었다.
- sticky 한 화면 안에 헤더, 진행바, 심볼, 활성 카드, 하단 단계 레일이 모두 들어가면서 900px 전후 높이에서 수직 여유가 부족했다.

## 변경

- `SiteBuildStoryboard.desktop.tsx`
  - sticky wrapper 하단 여백 `pb-24` → `pb-32`
  - 전체 flex gap `gap-12` → `gap-8`
  - 심볼 영역 `34vh/360px` → `30vh/320px`
  - 카드 최소 높이 `280px` → `240px`
  - 카드 내부 상하 간격 축소
  - 카드 grid 하단 예약 공간 `pb-32` → `pb-40`
  - 하단 단계 레일 위치 `bottom-10` → `bottom-14`
- 추가 보정
  - sticky wrapper 하단 여백 `pb-32` → `pb-36`
  - 심볼 영역 `30vh/320px` → `26vh/280px`
  - 카드 최소 높이 `240px` → `220px`
  - 카드 grid 하단 예약 공간 `pb-40` → `pb-64`
  - 카드와 하단 단계 레일(`01 첫 만남`~`06 꾸준 관리`) 사이의 충돌 방지 여백을 크게 확보
- 추가 보정 2
  - 진행 숫자(`01`~`06`)와 가운데 PNG 사이에 `mb-6` 추가
  - 가운데 PNG와 활성 카드 사이 간격 `gap-8` → `gap-16`
  - 심볼 영역 `26vh/280px` → `22vh/240px`
  - 카드 최소 높이 `220px` → `200px`
  - 카드 grid 하단 예약 공간 `pb-64` → `pb-72`
  - 진행 숫자, PNG, 카드, 하단 단계 레일 네 덩어리가 서로 떨어져 보이도록 재배치

## 검증

- `pnpm typecheck` PASS
- `pnpm lint` PASS — 기존 `<img>` 경고 4건만 유지
- `pnpm build` PASS — 29/29 static pages
- Browser `/` snapshot 확인 — 홈/스토리보드 영역 렌더 정상, console error 0건

## 한줄정리

스토리보드 데스크톱 섹션의 수직 밀도를 낮추고 하단 안전 여백을 크게 늘려 카드와 하단 단계 레일/구분선 충돌을 방지했다.
