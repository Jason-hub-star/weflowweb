# 2026-05-31 — 진단 폼 단계 정렬 카피

## 변경

홈 `DeveloperBuildBoard`의 5단계 문구를 실제 `/contact/form` 진단 폼 구조에 맞췄다.

- 기존: 자료 확인 · 문구 정리 · 디자인 조정 · 코드 제작 · 연결 점검
- 변경: 브랜드 확인 · 목표 정리 · 디자인 방향 · 페이지·기능 · 자료·일정

체크 항목도 설문 응답 후 검토 흐름으로 수정했다.

## 근거

`apps/web/content/pages/diagnose-form.json`의 5단계:

1. 회사 기본 정보
2. 목표와 현재 상황
3. 분위기와 디자인 방향
4. 페이지 구성과 기능
5. 자료·일정·연락처

## 검증

- `pnpm typecheck` PASS
- `pnpm lint` PASS
