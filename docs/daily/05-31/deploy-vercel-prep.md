# 2026-05-31 — Vercel Deploy Prep

## Scope

- 주인님 요청: Vercel 배포 준비, `/kit` 공개 배포 제외, hydration 및 최적화 확인.
- GitHub 원격 후보: `https://github.com/Jason-hub-star/weflowweb.git` (`git ls-remote` 연결 확인, 현재 HEAD 없음/빈 repo로 보임).

## Changes

- `/kit`은 `VERCEL_ENV=production`에서 `notFound()` 처리해 production 응답 404.
- `.vercelignore`에 `apps/web/app/kit/**` 추가. Vercel 업로드/원격 빌드에서는 kit route source도 제외한다.
- `turbo.json` build env에 `VERCEL_ENV`·`VERCEL` 추가.
- 기본 `/opengraph-image` endpoint 추가.
- sitemap은 현재 실제 공개 200 라우트만 노출하고 `/contact/form` 추가.
- robots와 `check-seo-manifest.sh`를 `/api/`, `/mockup/`, `/hero-lab/`, `/kit` 차단 기준으로 정렬.
- `SmoothScrollProvider`를 Suspense 경계로 감싸 production prerender hydration gate 통과.
- Vercel Analytics/Speed Insights는 `NEXT_PUBLIC_ENABLE_VERCEL_INSIGHTS=1`에서만 로드해 프로젝트 Analytics 미활성 상태의 콘솔 404 제거.
- lint 최적화 경고 해소: Story/Storyboard 일반 `<img>`를 `next/image`로 교체.

## Verification

```bash
pnpm typecheck                         # PASS
pnpm lint                              # PASS
pnpm check:tokens                      # PASS
pnpm check:file-size                   # PASS
pnpm check:korean-wrap                 # PASS
pnpm check:harness                     # PASS
VERCEL_ENV=production pnpm build       # PASS
BASE_URL=http://localhost:3100 pnpm check:seo # PASS
pnpm exec vercel build --prod            # PASS
pnpm exec vercel deploy --prebuilt --prod # PASS
```

Production smoke:

- `next start -p 3100` with `VERCEL_ENV=production`
- `/kit` HTTP 404
- `/opengraph-image` HTTP 200 `image/png`
- sitemap에 `/kit` 없음
- Playwright:
  - `/` 1440/768/375: console error 0, overflow-x 0
  - `/contact/form` 375: console error 0, overflow-x 0
- `/story` 1440: console error 0, overflow-x 0

Remote production:

- URL: `https://weflowweb-eight.vercel.app`
- Deployment: `https://weflowweb-nx49p2pwa-kimjuyoung1127s-projects.vercel.app`
- Inspect: `https://vercel.com/kimjuyoung1127s-projects/weflowweb/2yMKk3eQsxAM61YTSWrMiiXvLFPN`
- `/` HTTP 200
- `/kit` HTTP 404
- `/opengraph-image` HTTP 200 `image/png`
- `BASE_URL=https://weflowweb-eight.vercel.app pnpm check:seo` PASS
- Playwright remote smoke:
  - `/` 1440/375: console error 0, overflow-x 0
  - `/contact/form` 375: console error 0, overflow-x 0

Screenshots:

- `docs/daily/05-31/deploy-home-desktop.png`
- `docs/daily/05-31/deploy-home-tablet.png`
- `docs/daily/05-31/deploy-home-mobile.png`
- `docs/daily/05-31/deploy-contact-form-mobile.png`
- `docs/daily/05-31/deploy-story-desktop.png`

## Remaining Before Real Production

- 실제 Vercel env 입력: `RESEND_API_KEY`, `OWNER_EMAIL`, `RESEND_FROM_EMAIL`, 분석 ID, 검색 인증 메타, Sheets 계정.
- `/reservation`, `/landing`, `/products`는 아직 미구현이라 sitemap/check 대상에서 제외된 상태.
- GitHub push는 아직 미실행. Vercel CLI production 배포는 주인님 요청으로 진행 완료.
