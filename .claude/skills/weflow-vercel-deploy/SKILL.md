---
name: weflow-vercel-deploy
description: WEFLOW Vercel 배포/재배포/도메인/env/production smoke 작업을 할 때 사용하는 스킬. Trigger when the user asks for Vercel CLI deployment, production deploy, preview deploy, domain setup, env pull/add, deployment rollback, or 배포 관련 점검.
user_invocable: true
tags: [weflow, vercel, deploy, production, preview, env]
trigger: "버셀/Vercel 배포, vercel cli, production deploy, preview deploy, 도메인 연결, env 주입, 롤백"
version: 1
---

# weflow-vercel-deploy

WEFLOW는 `apps/web`이 Vercel Root Directory인 Next.js 앱이다. 배포 작업은 `docs/ops/deploy-ops.md`와 이 스킬을 함께 따른다.

## Hard Rules

- 주인님 명시 요청 없이 `vercel deploy --prod`, `vercel --prod`, DNS 변경, 결제 변경, 외부 메시지 발송을 하지 않는다.
- 시크릿은 Vercel env에만 넣는다. `.env*.local`은 커밋하지 않는다.
- `git push`는 별도 명시 없으면 하지 않는다.
- `/kit`은 production 공개 금지: `.vercelignore`에 `apps/web/app/kit/**`, 앱 라우트는 production/dynamic 404 gate 유지.
- 배포 전후 문서는 `DECISION-LOG.md` 또는 `docs/daily/MM-DD/deploy-*.md`에 증거를 남긴다.

## Project Settings

Vercel project:

- Project: `weflowweb`
- Root Directory: `apps/web`
- Framework: `Next.js`
- Install Command: Vercel default (`pnpm install` 감지)
- Build Command: Vercel default (`pnpm run build` inside `apps/web`)
- Output Directory: Next.js default

If Vercel detects `Other` or root `.`, fix before deploying:

```bash
pnpm exec vercel project inspect weflowweb
pnpm exec vercel pull --yes --environment=preview
```

CLI cannot always edit Root Directory. If needed, use the Vercel dashboard/API and set `rootDirectory` to `apps/web`, `framework` to `nextjs`.

## Preflight

```bash
pnpm typecheck
pnpm lint
pnpm check:tokens
pnpm check:file-size
pnpm check:korean-wrap
pnpm check:harness
pnpm check:doc-sync
```

For production-equivalent local build:

```bash
VERCEL_ENV=production pnpm build
pnpm exec vercel build --prod
```

Important: `vercel deploy --prebuilt` uploads the current `.vercel/output`. If `/kit` production behavior matters, run `vercel build --prod` immediately before `vercel deploy --prebuilt --prod`.

## Deployment Flows

### Preview

Use preview unless the user explicitly asks for production.

```bash
pnpm exec vercel build
pnpm exec vercel deploy --prebuilt
```

### Production

Only after explicit user request/approval:

```bash
pnpm exec vercel build --prod
pnpm exec vercel deploy --prebuilt --prod
```

Record the returned:

- production URL
- alias URL
- inspect URL

## Remote Smoke

Run against the alias or deployment URL:

```bash
BASE_URL=https://<alias>.vercel.app pnpm check:seo
curl -s -o /dev/null -w '%{http_code}\n' https://<alias>.vercel.app/
curl -s -o /dev/null -w '%{http_code}\n' https://<alias>.vercel.app/kit
curl -s -o /dev/null -w '%{http_code} %{content_type}\n' https://<alias>.vercel.app/opengraph-image
```

Expected:

- `/` → 200
- `/kit` → 404
- `/opengraph-image` → 200 `image/png`
- `check:seo` PASS

Also run Playwright or browser smoke for:

- `/` desktop 1440
- `/` mobile 375
- `/contact/form` mobile 375

Pass criteria: HTTP 200, console error/warning 0, horizontal overflow 0.

## Env Notes

Required before real launch:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `OWNER_EMAIL`
- `GOOGLE_SHEETS_ID`
- `GOOGLE_SERVICE_ACCOUNT_JSON`
- analytics/search verification IDs as needed

Vercel Analytics/Speed Insights should be gated by `NEXT_PUBLIC_ENABLE_VERCEL_INSIGHTS=1`; do not enable until the Vercel project feature is active, or remote smoke will show `/_vercel/insights/script.js` 404.

## Rollback

If production is bad:

```bash
pnpm exec vercel rollback
```

Then add a DEC entry and daily incident note with deployment IDs and reason.
