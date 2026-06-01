# 2026-06-01 — Next 16 security/cache pass

## Scope

- `/api/diagnose` hardening: body size guard, Origin allowlist, IP rate limit, production BotID verification.
- Config split: `lib/public-config.ts` for Client Components, `lib/server-config.ts` for server-only metadata/API/env.
- Client boundary cleanup: `CTASection` no longer needs `"use client"`; internal `Button` href uses `next/link`.
- SEO: added page-level metadata to primary public routes.
- Cache Components: enabled `cacheComponents`, added cached JSON SSOT loaders with `cacheLife('hours')` and `cacheTag('content:*')`.

## Evidence

```bash
pnpm --filter @weflow/web typecheck
pnpm --filter @weflow/web lint
pnpm --filter @weflow/web build
bash scripts/check-design-tokens.sh
bash scripts/check-seo-manifest.sh
```

Result: all PASS. Build output confirms `Cache Components enabled`; public cached routes show `Revalidate 1h / Expire 1d`.

## Notes

- `cacheComponents` surfaced two existing prerender hazards and both were corrected: footer render-time `new Date()` replaced with fixed copyright year, OG route switched from prerender `fetch()` to local public file read.
- Some pre-existing unrelated workspace changes were left untouched.
