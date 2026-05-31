# 2026-05-31 — Doc Management Thin Sync

## 목적

최신 개발사항이 `PROJECT-STATUS` 상단, `PAGE-UPGRADE-BOARD`, `MISSING-AND-UNIMPLEMENTED`에 중복·충돌해서 보이는 문제를 정리했다. 상태판은 얇게, 상세 이력은 daily/DEC에 남기는 방식으로 재정렬했다.

## 확인한 현재 코드 상태

- Git 저장소는 아직 초기화되어 있지 않다.
- 현재 `apps/web/app` page route: `/`, `/story`, `/services`, `/pricing`, `/cases`, `/cases/[id]`, `/reviews`, `/blog`, `/notice`, `/faq`, `/privacy`, `/terms`, `/contact`, `/hero-lab`, `/hero-lab/[id]`, `/kit`.
- `/reservation`, `/landing`, `/products` 라우트 파일은 아직 없다.
- `/contact`는 존재하지만 `NAVER_FORM_URL = https://naver.me/your-form-id` placeholder다.
- `apps/web/public/hero/hero-bg.mp4`는 존재하고 `home.json`에서 참조 중이다.
- 카카오 채널 fallback URL은 실제 `pf.kakao.com/_xntCbX`로 채워져 있다.

## 문서 변경

- `docs/status/PROJECT-STATUS.md`: Current Phase, Active Tracks, Recent Changes를 최신 1화면 중심으로 압축. 오래된 `/mockup`·영상 placeholder 설명은 상단에서 제거하고 다음 행동을 `/contact` 폼 결정 중심으로 재정렬.
- `docs/status/PAGE-UPGRADE-BOARD.md`: `/contact`를 Building placeholder로, `/reservation`·`/landing`·`/products`를 Ready로 표시. `/mockup`은 폐기 상태로 유지.
- `docs/status/MISSING-AND-UNIMPLEMENTED.md`: 해소된 영상·카카오 항목은 ✅ 처리. 실제 남은 위험을 네이버 폼 URL, 미작성 라우트, 폼/API/SEO/법무/사업자 정보로 축소.
- `docs/ref/ARCHITECTURE.md`, `docs/ref/PAGE-COMPONENT-MAP.md`, `docs/ref/PROJECT-PLAN.md`: `/mockup` 폐기와 실제 app route 구조를 반영.

## 운영 규칙

- 최신 요약은 `PROJECT-STATUS.md` 상단만 갱신한다.
- 라우트별 진행률은 `PAGE-UPGRADE-BOARD.md` 한 표에만 쓴다.
- 작동하지 않는 UI와 placeholder는 `MISSING-AND-UNIMPLEMENTED.md`에만 쓴다.
- 상세 개발 기록은 이 파일 같은 `docs/daily/MM-DD/*.md`에 남긴다.

## 검증

- `bash scripts/check-weflow-harness.sh` PASS
- `bash scripts/check-doc-sync.sh` PASS
- 변경은 문서만 수행했다.

## 한줄정리

최신 개발사항은 얇게 보이도록 상태판 3종을 코드 기준으로 맞췄고, 자세한 근거는 daily로 분리했다.
