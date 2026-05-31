# 2026-05-31 — Home Story/Services 제거 + Cases 포트폴리오 우선화

## 변경

- 홈 `/` 본문에서 `<HomeStory>`와 `<HomeServices>` 렌더를 제거했다.
- `/cases`의 큰 `<PageHero>`와 별도 설명/필터 블록을 제거하고, `<CasesFilterableGrid>`가 compact title + 필터 + 포트폴리오 카드 그리드를 첫 화면에 바로 보여주도록 변경했다.
- `/blog` 빌드 게이트에서 막히던 `useSearchParams()` Suspense 경계 누락을 `<Suspense fallback={null}>`로 보정했다.

## 검증

- `pnpm typecheck` PASS
- `pnpm lint` PASS — 기존 `<img>` 경고 4건만 유지
- `pnpm build` PASS — 29/29 static pages
- Browser `/cases` 확인: 첫 화면에서 포트폴리오 카드가 바로 보임
- Browser `/` 확인: 본문에서 `OUR STORY`/`SERVICES` 섹션 미노출

## 증거

- Browser MCP screenshot: `cases-portfolio-first-1200.png`
- Browser MCP screenshot: `home-no-story-services-1200.png`

## 한줄정리

홈은 스토리/서비스 프리뷰를 걷어내고, 사례 페이지는 설명보다 포트폴리오를 먼저 보여주는 구조로 정리했다.
