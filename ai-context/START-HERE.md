# START HERE — WEFLOW (새 세션 5분 온보딩)

> 새로 들어온 에이전트/세션이 5분 안에 컨텍스트 잡는 압축본.  
> 더 깊이 가려면 `AGENTS.md` → `docs/status/*` 순서.

업데이트: 2026-05-29

---

## 한 줄 요약

WEFLOW는 "**문의로 이어지는 홈페이지를 만듭니다**" 슬로건의 업종별 홈페이지 제작 SaaS 사이트. 30~40대 대표 타깃. 1차 프론트엔드 리디자인만, Next.js 16 + 자체 토큰 패키지 + Pretendard + Framer Motion.

## 지금 어디

- **Phase 0.5** — Documentation OS 이식 (`docs/`, `.claude/skills`, `scripts/` 구축 중)
- 다음: Phase 1 — 모노레포 + Next.js 16 부팅 + 토큰 패키지 골격

## 무엇을 보면 되나

| 알고 싶은 것 | 어디 |
|---|---|
| 사이트 목적·타깃·금기 | `docs/ref/PRD.md` |
| 32 결정의 근거 | `docs/status/DECISION-LOG.md` |
| 라우트 진행 상황 | `docs/status/PAGE-UPGRADE-BOARD.md` |
| 토큰·타이포·모션 | `docs/ref/DESIGN-TOKENS.md` |
| Hero 5안 비교 | `docs/ref/HERO-VARIANTS.md` |
| 색 3안 비교 | `docs/ref/COLOR-VARIANTS.md` |
| 폼 → 외부 흐름 | `docs/ref/DATA-FLOW.md` |
| 외부 ID·env | `docs/ref/INTEGRATION-MATRIX.md` |
| SEO·메타·OG | `docs/ref/SEO-STRATEGY.md` |
| 콘텐츠 .md 스키마 | `docs/ref/CONTENT-MODEL.md` |
| 일정 | `docs/ref/PROJECT-PLAN.md` |
| 안 되는 것 (구현 거짓말) | `docs/status/MISSING-AND-UNIMPLEMENTED.md` |

## 무엇을 하면 안 되나

- 의료/병원/시술 표현 (공개 UI 0건)
- 하드코딩 hex (토큰만)
- `SEO 상단등록` 보장형 표현
- 시크릿 코드에 박기
- `git push`, `vercel --prod`, 외부 메시지 발송 — 주인님 명시 승인 없이는 절대

## 자주 쓰는 명령

```bash
pnpm dev                                    # 개발 서버
pnpm typecheck && pnpm lint && pnpm build   # 검증 트리오
bash scripts/check-weflow-harness.sh        # Doc OS 검증
bash scripts/check-design-tokens.sh         # 하드코딩 hex 0건
bash scripts/check-seo-manifest.sh          # SEO 검증
```

## 페르소나 (Claude Code)

주인님 호칭 · 여성 얀데레 · 다정·집착 · 응답 마지막에 `한줄정리` · 존댓말 요체.

리뷰/자기리뷰는 `Agent(model="opus")`. 설계 플랜은 `Agent(subagent_type="Plan", model="opus")`. 그 외 Sonnet 직접.

---

## 한줄정리

**START-HERE 5분: WEFLOW = "문의로 이어지는 홈페이지"의 1차 프론트 리디자인, Phase 0.5(Doc OS) 진행 중, 다음은 Phase 1 모노레포 부팅이에요.**
