# WEFLOW · 위플로우

> 업종별 홈페이지 제작 SaaS 플랫폼 공식 사이트.  
> 슬로건: **문의로 이어지는 홈페이지를 만듭니다**

---

## 환경 요구사항

- Node.js 20 LTS (`.nvmrc` 동봉) — `nvm use`
- pnpm 9.x — `corepack enable && corepack prepare pnpm@latest --activate`
- macOS / Linux (Windows는 WSL2 권장)

## 시작하기 (Human)

```bash
nvm use            # Node 20
pnpm install
pnpm dev
# → http://localhost:3000
```

처음 보시는 분은 이 순서로 읽어보세요.

1. `AGENTS.md` — 모든 에이전트가 따르는 진입 규칙
2. `docs/status/PROJECT-STATUS.md` — 지금 어디까지 왔는지
3. `docs/status/DECISION-LOG.md` — 32개 결정의 이유
4. `docs/ref/PRD.md` — 무엇을 왜 만드는지
5. `docs/ref/ARCHITECTURE.md` — 어떻게 만드는지

---

## 시작하기 (AI Agent)

`AGENTS.md` → `CLAUDE.md` → `HARNESS-MANIFEST.yaml` → `docs/status/*` 순서로 읽고 `ai-context/START-HERE.md`로 5분 온보딩.

---

## 폴더 한눈에

```
devfive/
├─ docs/                Tier 1·2 SSOT (status, ref, ops, daily, weekly)
├─ ai-context/          새 세션 온보딩 메모
├─ .claude/             에이전트 운영 자산 (commands, skills, automations)
├─ templates/           재사용 양식
├─ harnesses/           실전 패턴
├─ patterns/            기술 팁
├─ scripts/             검증 자동화
├─ apps/web/            Next.js 16 앱 (Tier 0)
├─ packages/tokens/     자체 디자인 토큰 패키지 (Tier 0)
└─ design-agent-package/ 원본 디자인 명세·자산 (보존)
```

---

## 자주 쓰는 명령

| 목적 | 명령 |
|---|---|
| 개발 서버 | `pnpm dev` |
| 타입 검사 | `pnpm typecheck` |
| 린트 | `pnpm lint` |
| 빌드 | `pnpm build` |
| Doc OS 검증 | `bash scripts/check-weflow-harness.sh` |
| 토큰 검증 (hex 0건) | `bash scripts/check-design-tokens.sh` |
| SEO 매니페스트 | `bash scripts/check-seo-manifest.sh` |
| 일일 → 주간 압축 | `bash scripts/compress-daily.sh` |

---

## 기술스택 요약

Next.js 16 (App Router) · TypeScript strict · Tailwind CSS v4 + 자체 토큰 · Pretendard Variable + Geist Mono · Framer Motion + Lenis · next-mdx-remote + zod · react-hook-form · Resend + Google Sheets + Vercel BotID · Vercel 호스팅.

---

## 1차 범위
- 프론트엔드 리디자인만
- 17 라우트 (홈/서비스/제품/가격/사례/후기/블로그/공지/FAQ/예약/문의/광고LP/컬러3안/Hero5안/약관·방침)
- 관리자/DB는 2차

---

## 마스터 플랜

`/Users/family/.claude/plans/glimmering-skipping-neumann.md` 또는 `docs/ref/PROJECT-PLAN.md`.

---

## 한줄정리

**README는 빠른 진입용 — 진짜 출처는 `AGENTS.md`와 `docs/`에 있어요.**
