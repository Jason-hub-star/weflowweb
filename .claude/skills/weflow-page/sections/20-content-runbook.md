# 20 — Content Runbook

MD frontmatter 스키마와 zod 검증은 `docs/ref/CONTENT-MODEL.md` 참조.

## 새 사례 추가

1. `apps/web/content/cases/<slug>.md` 작성 — frontmatter + 본문
2. `pnpm dev`에서 `/cases/<slug>` 렌더 확인
3. zod 검증 실패 시 에러 메시지 따라 수정
4. `content/cases/`에 다른 사례 `order` 값과 충돌 안 하는지
5. 이미지는 `apps/web/public/assets/cases/`에
6. `PAGE-UPGRADE-BOARD.md`에서 `/cases/<slug>` 행 추가 → Stage = Ready

## 새 후기/블로그/공지

위와 동일 패턴, 각 폴더에.

## 배너/팝업

`content/banners.md`, `popups.md`의 배열에 항목 추가. `active: true` + `starts_at`/`ends_at` 설정.

## 약관·방침 개정

`content/legal/privacy.md` 또는 `terms.md`의 `version` +1, `updatedAt` 수정. 변경 이력은 footer/sidebar에 표시.

## 금기 검사

작성 후 `grep -i '병원\|시술\|치료\|의료'` 0건이어야 한다. `SEO 상단등록` 같은 보장형 표현도 금지.
