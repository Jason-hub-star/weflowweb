# 2026-05-31 — `/cases` Landingfolio 레퍼런스 목업 교체

## 목적

- 주인님 요청: 대표 컨펌용 사례 영역을 Landingfolio 기반 스크린샷으로 채우기
- 참조: `https://www.landingfolio.com/`, `https://devfive.kr/ko/portfolio/51/`

## 변경

- Landingfolio 공개 레퍼런스 6종을 1200×675 PNG로 저장
  - Headroom, Breyta, Zixflow, Jive, Glide, BetterLegal
  - 위치: `apps/web/public/assets/cases/weflow-case-ref-*.png`
- `apps/web/content/pages/home.json`
  - 홈 사례 섹션을 `REFERENCE MOCKUPS` / `대표 컨펌용 랜딩 레퍼런스` 톤으로 교체
- `apps/web/content/pages/cases.json`
  - 가상 사례명(Lumi English 등)과 가짜 수치형 성과(`+N%`) 제거
  - 각 항목 `sourcePath`에 Landingfolio 원본 URL 기록
  - `metric`은 실제 성과가 아닌 검토 포인트로 변경
- `apps/web/app/cases/page.tsx`
  - hero badge를 `성공 사례` → `레퍼런스 목업`으로 변경
- `apps/web/app/cases/CasesFilterableGrid.tsx`
  - 안내 카피를 대표 컨펌용 레퍼런스 톤으로 변경
- `apps/web/app/cases/[id]/page.tsx`
  - 상세 라벨을 Project/Result → Reference/Review point/Source로 변경
- `apps/web/lib/content/schemas.ts`
  - `CasesPageSchema` category enum에 `SaaS`, `비즈니스`, `제품` 추가

## 증거

- 캡처:
  - `docs/daily/05-31/evidence/landingfolio-cases/cases-1440.png`
  - `docs/daily/05-31/evidence/landingfolio-cases/cases-768.png`
  - `docs/daily/05-31/evidence/landingfolio-cases/cases-375.png`
  - `docs/daily/05-31/evidence/landingfolio-cases/case-headroom-1440.png`

## 검증

- `pnpm typecheck` PASS
- `pnpm lint` PASS
- `pnpm build` PASS — SSG 28/28, `/cases/headroom` 등 6 상세 경로 생성
- `bash scripts/check-design-tokens.sh` PASS
- 금기어/가짜 수치형 성과 grep 0건
- `bash scripts/check-file-size.sh` FAIL
  - 잔여 원인: 기존 `apps/web/app/kit/sections/MotionSignaturesSection.tsx` 463줄
  - 이번 변경 파일 `apps/web/lib/content/schemas.ts`는 397줄로 400줄 이하

## 한줄정리

**사례 영역은 실제 납품 사례처럼 보이지 않게, Landingfolio 스크린샷 기반의 대표 컨펌용 레퍼런스 목업으로 전환했어요.**
