# 2026-05-31 — Brand Depth Background 실험

## 목적

주인님 요청에 따라 공개 사이트 배경에 은은한 패턴과 표면 깊이감을 추가해 브랜드 가치를 높이는 방향을 실험했다. 이상하면 롤백할 수 있도록 전역 유틸리티 중심으로 묶었다.

## 적용

- 전역 `body`: subtle blueprint grid + gradient wash + 기존 grain 유지
- 큰 밴드: `.brand-depth-section`을 `<PageHero>`, `<CTASection>`에 적용
- 전환 핵심 표면: `.premium-card`, `.premium-card-hover`를 가격·문의·후기·사례 카드와 진단 폼에 적용
- 색상: hardcoded hex 없이 CSS token + `color-mix()`만 사용

## 검증

- `pnpm check:tokens` PASS
- `pnpm typecheck` PASS
- `pnpm lint` PASS
- `VERCEL_ENV=production pnpm build` PASS
- Local production smoke:
  - `/` 1440 · 768 · 375: console error 0건, overflow 0건
  - `/contact/form` 375: console error 0건, overflow 0건
  - `/pricing` 1440: console error 0건, overflow 0건

## 증거

- `docs/daily/05-31/brand-depth-home-desktop.png`
- `docs/daily/05-31/brand-depth-home-tablet.png`
- `docs/daily/05-31/brand-depth-home-mobile.png`
- `docs/daily/05-31/brand-depth-contact-form-mobile.png`
- `docs/daily/05-31/brand-depth-pricing-desktop.png`

## 롤백 메모

`apps/web/app/globals.css`의 `body` background 추가분, `.brand-depth-section`, `.premium-card*` 블록을 제거하고, 적용 파일에서 `brand-depth-section`/`premium-card` 클래스만 빼면 이전 평면 톤으로 복귀한다.
