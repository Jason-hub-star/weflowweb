# Project Plan — WEFLOW

> 마일스톤 + Phase별 goal·files·skill·verification 매트릭스.  
> 변경 시 `PROJECT-STATUS.md` Active Tracks도 같이 갱신.

작성: 2026-05-29 · 잠금: 마스터 §15

---

## Phase 0.5 — Documentation OS 이식

| Goal | Files | Skill | Verification |
|---|---|---|---|
| 진입 4종 작성 | `AGENTS.md`, `CLAUDE.md`, `HARNESS-MANIFEST.yaml`, `README.md` | doc-framework | `scripts/check-weflow-harness.sh` |
| docs/status 4종 | PROJECT-STATUS, DECISION-LOG, PAGE-UPGRADE-BOARD, MISSING-AND-UNIMPLEMENTED | doc-framework | manifest 검증 |
| docs/ref 10종 | PRD, ARCHITECTURE, DESIGN-TOKENS, COLOR-VARIANTS, HERO-VARIANTS, INTEGRATION-MATRIX, DATA-FLOW, SEO-STRATEGY, CONTENT-MODEL, PROJECT-PLAN | doc-framework | manifest 검증 |
| docs/ops 3종 + ai-context 3종 | design-system-ops, seo-submission-ops, deploy-ops, START-HERE, DESIGN-BRIEF, project-context | doc-framework | manifest 검증 |
| .claude 자산 | 스킬 5종 이식 + weflow-page 신규 + commands 6 + automations 2 | project-planning | `.claude/skills/*/SKILL.md` 존재 |
| templates·harnesses·patterns | 13 파일 | doc-framework | 디렉토리 비어있지 않음 |
| scripts 5종 | check-* 4 + compress-daily | doc-framework | `bash` 문법 통과 |

**완료 기준**: `scripts/check-weflow-harness.sh` exit 0.

---

## Phase 1 — Day 1: 모노레포 + tokens + 부팅

| Goal | Files | Skill | Verification |
|---|---|---|---|
| pnpm workspace + turborepo | `pnpm-workspace.yaml`, `turbo.json`, root `package.json` | — | `pnpm install` 0 error |
| packages/tokens 골격 | `packages/tokens/{package.json,src/*}` | design-to-code | `import` 가능 |
| Next.js 16 부팅 | `apps/web/{package.json, app/layout.tsx, app/page.tsx, next.config.ts, tailwind.config.ts, tsconfig.json}` | — | `pnpm dev` localhost:3000 200 |
| 폰트 등록 | Pretendard + Geist Mono in layout | — | 시각 확인 |
| 헤더·푸터·드로어·플로팅 CTA | `components/layout/*` | design-to-code | 시각 확인 |

**완료 기준**: `pnpm build` 0 error, `/` 200, 헤더/푸터 렌더.

## Phase 2 — Day 2: Hero 5안 배포

| Goal | Files | Skill | Verification |
|---|---|---|---|
| 5개 hero 컴포넌트 | `components/hero/HeroSplitForm.tsx`, `HeroFullBleed.tsx`, `HeroCardMosaic.tsx`, `HeroLiveDashboard.tsx`, `HeroCarousel.tsx` | weflow-page | 각 컴포넌트 isolated 렌더 |
| `/hero-lab/[id]` 라우트 | `app/hero-lab/[id]/page.tsx` | — | 1~5 모두 200 |
| 비교 가이드 페이지 | `app/hero-lab/page.tsx` 비교 인덱스 | — | 5안 카드 그리드 |

**완료 기준**: `/hero-lab/1..5` 1440·375 시각 검수 통과, 주인님 비교 가능.

## Phase 3 — Day 3: hero 선정 + color 3안 + 핵심 섹션

| Goal | Files | Skill | Verification |
|---|---|---|---|
| 선정 hero → `/` 적용 | `app/page.tsx` | weflow-page | 홈 200 |
| color 3안 라우트 | ~~`app/mockup/[id]/page.tsx`~~ | design-to-code | 완료 후 DEC-051로 폐기 |
| 서비스 rail (홈) | `components/marketing/ServiceRail.tsx` | weflow-page | 가로 드래그 |
| Why 그리드 (홈) | `components/marketing/WhyGrid.tsx` | weflow-page | 6칸 |

## Phase 4 — Day 4: 가격 · 프로세스 · 후기 슬라이더 · 사례 그리드

## Phase 5 — Day 5: 사례/블로그/공지/FAQ

## Phase 6 — Day 6: 무료진단·예약 폼 + 백엔드

## Phase 7 — Day 7: `/landing` LP + 모바일 375 검수

## Phase 8 — Day 8: SEO + 분석 4종 + OG + JSON-LD

## Phase 9 — Day 9: 약관·방침 · WCAG AA · 성능 튜닝

## Phase 10 — Day 10: 폴리시 · QA · 배포 · 도메인 가이드

---

## 변경 클래스 → 갱신 문서

| 변경 | 갱신 |
|---|---|
| route/surface 추가 | PROJECT-STATUS · ARCHITECTURE · PAGE-UPGRADE-BOARD |
| schema/model | CONTENT-MODEL · DECISION-LOG |
| design/token | DESIGN-TOKENS · PROJECT-STATUS |
| pipeline/flow | DATA-FLOW · ARCHITECTURE |
| config/infra | INTEGRATION-MATRIX · deploy-ops |
| SEO 관련 | SEO-STRATEGY · seo-submission-ops |
| Hero/Color 시안 | HERO-VARIANTS · COLOR-VARIANTS |

---

## 한줄정리

**Phase 0.5 Doc OS → Phase 1 모노레포 → Phase 2 Hero 5안 → 선정/색 → 페이지 → 폼 → SEO → 폴리시 → 배포의 10단계 + 0.5 흐름이에요.**
