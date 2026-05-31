---
name: change-class-doc-sync
trigger: 코드 변경 후 어떤 문서를 같이 갱신해야 할지 헷갈릴 때
status: proven
description: 변경 클래스 매트릭스 — harness-template에서 이식, WEFLOW로 일부 조정
---

# Change Class Doc Sync Harness

## When
- 작업이 끝나기 직전, "문서 갱신을 빠뜨리지 않았나" 확인 시
- `/doc-sync` 슬래시 명령의 백킹 문서

## Class Matrix

| Change Class | Examples | Update These |
|---|---|---|
| route/surface | 새 라우트 추가, 라우트 이동 | `docs/status/PROJECT-STATUS.md` · `docs/ref/ARCHITECTURE.md` · `docs/status/PAGE-UPGRADE-BOARD.md` |
| schema/model | MD frontmatter 필드 변경, zod 스키마 수정, 폼 필드 추가 | `docs/ref/CONTENT-MODEL.md` · `docs/status/DECISION-LOG.md` |
| design/token | 색·타이포·간격·라운드·모션 토큰 | `docs/ref/DESIGN-TOKENS.md` · `docs/status/PROJECT-STATUS.md` |
| pipeline/flow | 폼 처리, 외부 연동, API 흐름 | `docs/ref/DATA-FLOW.md` · `docs/ref/ARCHITECTURE.md` |
| config/infra | env 변수, 픽셀 ID, 외부 서비스 | `docs/ref/INTEGRATION-MATRIX.md` · `docs/ops/deploy-ops.md` |
| SEO 관련 | 메타, OG, sitemap, JSON-LD | `docs/ref/SEO-STRATEGY.md` · `docs/ops/seo-submission-ops.md` |
| Hero/Color 시안 | `/mockup/[id]`, `/hero-lab/[id]` | `docs/ref/HERO-VARIANTS.md` · `docs/ref/COLOR-VARIANTS.md` |
| 결정 | 옵션 비교 후 한 길 선택 | `docs/status/DECISION-LOG.md` (DEC-XXX) |

## Rule
1. 작업이 끝나기 전 위 표에서 해당 클래스 확인
2. 갱신 누락이 있으면 같이 PR에 넣기
3. PR 설명에 "Doc sync: <목록>" 라인 포함
