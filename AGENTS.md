# AGENTS.md — WEFLOW Documentation OS Entry

> 이 파일은 **모든 에이전트가 가장 먼저 읽는 진입점**이다.  
> Tier 1 (현재 상태)과 Tier 2 (구조·계약·운영) 문서로 들어가기 전에 이 문서의 Hard Rules와 Core Loop를 받아들인다.

---

## 0. Project At-a-Glance

- **브랜드**: WEFLOW / 위플로우
- **무엇**: 업종별 홈페이지 제작 SaaS 플랫폼 공식 사이트 (프론트엔드 리디자인 1차)
- **슬로건**: `문의로 이어지는 홈페이지를 만듭니다`
- **도메인**: `weflowlab.kr` (현재 404, 출시 시 연결)
- **레퍼런스 사이트(디자인)**: https://devfive.kr/ko/
- **마스터 플랜**: `/Users/family/.claude/plans/glimmering-skipping-neumann.md`
- **원본 자산·명세**: `design-agent-package/`

---

## 1. Reading Order (필수, 순서대로)

1. `AGENTS.md` (이 문서)
2. `CLAUDE.md` (Claude Code에 위임 사항)
3. `HARNESS-MANIFEST.yaml` (필수 파일·검증 기대값)
4. `docs/status/PROJECT-STATUS.md` (현재 위치)
5. `docs/status/DECISION-LOG.md` (32 결정의 근거)
6. `docs/status/PAGE-UPGRADE-BOARD.md` (라우트별 진행 상태)
7. `docs/status/MISSING-AND-UNIMPLEMENTED.md` (구현 거짓말 점검)
8. `docs/ref/PRD.md`, `docs/ref/ARCHITECTURE.md` 필요분
9. 작업이 디자인 영역이면 `docs/ref/DESIGN-TOKENS.md`, `HERO-VARIANTS.md`, `COLOR-VARIANTS.md`
10. 작업이 폼·데이터 영역이면 `docs/ref/DATA-FLOW.md`, `INTEGRATION-MATRIX.md`
11. 작업이 콘텐츠 영역이면 `docs/ref/CONTENT-MODEL.md`
12. 작업 종류별 운영 플레이북은 `docs/ops/*` 에서 골라 읽기

`ai-context/START-HERE.md`는 새 세션의 5분 온보딩용 요약이다.

### 마스터 플랜 ↔ 분산 SSOT 매핑

마스터 플랜 `/Users/family/.claude/plans/glimmering-skipping-neumann.md`의 각 §은 다음 분산 SSOT에 이식돼 있다. 마스터는 청사진, 분산은 운영 SSOT — 운영 갱신은 분산에 먼저 한다.

| 마스터 § | 분산 SSOT |
|---|---|
| §1 Context | `ai-context/project-context.md` |
| §2 결정 레지스터 (32) | `docs/status/DECISION-LOG.md` (DEC-001~032 + 신규) |
| §3 브랜드 카피북 | `docs/ref/PRD.md` §5~7 |
| §4 디자인 시스템 명세 | `docs/ref/DESIGN-TOKENS.md` + `packages/tokens/` |
| §5 추천 기술스택 | `docs/ref/ARCHITECTURE.md` §1~2 + DEC-009~012, 036~040 |
| §6 폴더 구조 | `docs/ref/ARCHITECTURE.md` §4 + `HARNESS-MANIFEST.yaml` |
| §7 페이지 IA | `docs/status/PAGE-UPGRADE-BOARD.md` + `docs/ref/ARCHITECTURE.md` §4 |
| §8 자산 매핑 | `docs/ref/PRD.md` §자산 + `docs/ops/design-system-ops.md` |
| §9 데이터 흐름 | `docs/ref/DATA-FLOW.md` |
| §10 외부 연동 | `docs/ref/INTEGRATION-MATRIX.md` |
| §11 SEO/분석/픽셀 | `docs/ref/SEO-STRATEGY.md` + `docs/ops/seo-submission-ops.md` |
| §12 컬러 시안 3안 | `docs/ref/COLOR-VARIANTS.md` (→ `/mockup/[id]`) |
| §13 Hero 5안 | `docs/ref/HERO-VARIANTS.md` (→ `/hero-lab/[id]`) |
| §14 Doc OS 이식 | 이 문서 + `HARNESS-MANIFEST.yaml` + `scripts/check-weflow-harness.sh` |
| §15 마일스톤 | `docs/ref/PROJECT-PLAN.md` + `docs/status/PROJECT-STATUS.md` |
| §16 검증 체크리스트 | `docs/status/MISSING-AND-UNIMPLEMENTED.md` + `scripts/check-*.sh` |
| §17 `#TODO` 레지스터 | `docs/status/MISSING-AND-UNIMPLEMENTED.md` §3 |
| §18 2차 범위 | `docs/ref/PRD.md` §4 Non-Scope + DEC-032 |

---

## 2. Tier 모델 — 충돌 시 우선순위

| Tier | 대상 | 위치 | 우선순위 |
|---|---|---|---:|
| 0 | 실제 코드 + 런타임 동작 | `apps/web/`, `packages/tokens/` | 가장 높음 |
| 1 | 진입 + 현재 상태 | 루트 `AGENTS.md` / `CLAUDE.md` + `docs/status/` | ↑ |
| 2 | 구조·계약·운영 | `docs/ref/`, `docs/ops/` | ↑ |
| 3 | 재사용 자산 | `templates/`, `harnesses/`, `patterns/`, `.claude/skills/` | 가장 낮음 |

코드와 문서가 모순하면 **코드(Tier 0)가 진실**이다. 그러나 결정의 근거는 **DECISION-LOG**(Tier 1)에 남기고, 구조와 계약은 Tier 2가 명시한다.

---

## 3. Hard Rules

1. **읽기 우선**: 어떤 변경이든 위 Reading Order 중 최소 1~5를 통과한 뒤 시작한다.
2. **Doc OS 우선 갱신**: 결정·구조·플로우를 바꾸려면 **코드보다 먼저 docs/를 갱신**한다.
3. **DECISION-LOG는 append-only**: DEC 항목은 수정하지 않고 새 DEC로 supersedes 표기한다.
4. **하드코딩 hex 금지**: 모든 색은 `packages/tokens` CSS 변수로만 사용. 컴포넌트는 `bg-bg`, `text-text`, `bg-accent` 같은 시맨틱 클래스만.
5. **금기어**: 병원·의료기술·치료·시술·의료 효과 / `SEO 상단등록`·`검색 상단 노출` 보장형 표현은 공개 UI에 0건.
6. **모바일 375 시안 검수 필수**: 모든 페이지는 desktop 1440, tablet 768, mobile 375에서 텍스트·CTA 넘침 없음.
7. **시크릿은 `vercel env`만**: `.env*.local`은 `.gitignore`, 코드에 하드코딩 0건.
8. **`#TODO` 마킹은 검색 가능해야**: 실제 운영 키·사업자정보·콘텐츠는 모두 `#TODO`로 표시하고 출시 전 0건이 되어야 한다.
9. **변경 후 문서 동기화**: 코드 변경 클래스별로 갱신할 문서 매트릭스는 `docs/ref/PROJECT-PLAN.md` §변경 클래스 참조.
10. **세션 마무리 = 일일 일지**: 작업이 끝나면 `docs/daily/MM-DD/page-<route>.md` 또는 `docs/daily/MM-DD/<topic>.md`에 증거(스크린샷·curl·테스트 결과)를 기록한다.
11. **재사용 가능 기능은 항상 공유 컴포넌트/훅으로 추출** (DEC-044): 페이지에 직접 인터랙션·시각 효과를 박지 않는다. `components/motion/` (모션·인터랙션) 또는 `components/primitives/` (UI 단위)에 추출하고, 사용처는 조합만 한다. 카탈로그는 `patterns/motion-primitives.md`.
12. **새 재사용 단위는 반드시 `/kit`에 라이브 카드로 등재** (DEC-045): `apps/web/app/kit/page.tsx`에 `<KitCard>`를 추가해 이름·import 경로·라이브 데모·코드 스니펫을 한 곳에 노출한다. 등재 없는 신규 단위는 PR 불허.
13. **페이지 작업 전 매핑 표 확인 의무** (DEC-046): `docs/ref/PAGE-COMPONENT-MAP.md` + `docs/ref/INTERACTION-CATALOG.md` 두 표에서 ① 어떤 컴포넌트를 끼울지 ② 신규 추출이 필요한지 먼저 결정. 페이지 완료 시 매핑 표 갱신·신규 primitive는 `/kit` 등재까지 한 묶음.
14. **devfive 정렬 시안 4안 별도 추적** (DEC-047): Color 시안은 1·2·3·4로 운영(4 = 다크+라일락). 4안 선정 시 DEC-018(라이트 only)과 충돌하므로 별도 재논의 필요.
15. **viewport-variant 분리 컨벤션**: 모바일/데스크톱 인터랙션이 60줄 이상 다르거나 컴포넌트·데이터 흐름 자체가 다르면 `Component.tsx`(얇은 entry, 40줄 이하) + `Component.desktop.tsx` + `Component.mobile.tsx` + (필요 시) `Component.static.tsx`로 분리한다. 작은 차이(텍스트 숨김·패딩·글자 크기)만 있을 때는 인라인 `md:` Tailwind. 레퍼런스: `apps/web/components/motion/SiteBuildStoryboard.*.tsx`.

---

## 4. Core Loop

```
[Load]    AGENTS.md → docs/status/PROJECT-STATUS.md → 필요분 docs/ref/*
   ↓
[Act]     코드/콘텐츠 변경
   ↓
[Verify]  pnpm typecheck → pnpm lint → pnpm build → smoke → agent-browser-verify
   ↓
[DocSync] 변경 클래스별 갱신 매트릭스에 따라 docs/* 갱신
   ↓
[Retro]   docs/daily/MM-DD/* 에 증거 기록, 패턴은 patterns/ 또는 harnesses/ 로 자산화
```

검증을 통과하지 못한 변경은 **DocSync 단계로 넘어가지 않는다**. `pnpm dev` 만으로는 검증이 끝나지 않는다.

---

## 5. 변경 클래스 → 동기화 대상 문서

| 변경 | 갱신 문서 |
|---|---|
| route/surface 추가·수정 | `docs/status/PROJECT-STATUS.md`, `docs/ref/ARCHITECTURE.md`, `docs/status/PAGE-UPGRADE-BOARD.md` |
| schema/model (MD frontmatter, 폼 zod 스키마) | `docs/ref/CONTENT-MODEL.md`, `docs/status/DECISION-LOG.md` |
| design/token (색·타이포·간격·모션) | `docs/ref/DESIGN-TOKENS.md`, `docs/status/PROJECT-STATUS.md` |
| pipeline/flow (폼 처리, 외부 연동) | `docs/ref/DATA-FLOW.md`, `docs/ref/ARCHITECTURE.md` |
| config/infra (env, 픽셀, 외부 ID) | `docs/ref/INTEGRATION-MATRIX.md`, `docs/ops/deploy-ops.md` |
| SEO 관련 (메타, OG, sitemap) | `docs/ref/SEO-STRATEGY.md`, `docs/ops/seo-submission-ops.md` |
| Hero/Color 시안 | `docs/ref/HERO-VARIANTS.md`, `docs/ref/COLOR-VARIANTS.md` |
| 인터랙션 패턴·페이지 컴포넌트 매핑 | `docs/ref/INTERACTION-CATALOG.md`, `docs/ref/PAGE-COMPONENT-MAP.md` |

---

## 6. 슬래시 명령 (자주 쓰는 것)

- `/doc-sync` — 코드 변경 후 어떤 문서를 갱신해야 할지 추천
- `/sync-design-tokens` — 토큰 갱신 후 컴포넌트 동기화 검증
- `/check-seo` — SEO 체크리스트 실행
- `/mockup-compare` — 컬러 3안 비교 리포트
- `/hero-lab-compare` — Hero 5안 비교 리포트
- `/handoff` — 세션 인계 패킷 작성

---

## 7. 페르소나 & 톤 (Global CLAUDE.md 위임)

운영 페르소나·톤은 `/Users/family/.claude/CLAUDE.md`(주인님 글로벌 규칙)를 따른다. 이 프로젝트에 한해서:
- 30~40대 대표/실무자가 읽는 공개 UI는 **프리미엄 미니멀 + 밝고 친근**
- 내부 문서·코드는 군더더기 없는 한국어/영어 혼용 허용

---

## 한줄정리

**AGENTS.md → Reading Order → Tier 모델 → Hard Rules → Core Loop → 슬래시 명령 순으로 흡수하면 누구든 WEFLOW 작업을 안전하게 이어받을 수 있어요.**
