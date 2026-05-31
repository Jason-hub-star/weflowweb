---
name: doc-sync
description: 코드 변경 후 갱신할 문서를 자동 추천하고 누락 항목을 짚는다
trigger: 작업이 끝났는데 docs/* 갱신을 빠뜨렸을 가능성이 있을 때
---

# /doc-sync

## 무엇을 하나
- 최근 변경된 파일을 보고 **변경 클래스**(route/surface, schema/model, design/token, pipeline/flow, config/infra, SEO)를 추론
- 각 클래스별 갱신 대상 문서가 같은 세션에서 수정됐는지 확인
- 누락된 갱신 사항을 보고
- 필요한 경우 적용 패치 제안 (코드 변경 없이 docs/*만)

## 변경 클래스 매트릭스
| 변경 | 대상 |
|---|---|
| route/surface 추가 | `docs/status/PROJECT-STATUS.md` · `docs/ref/ARCHITECTURE.md` · `docs/status/PAGE-UPGRADE-BOARD.md` |
| schema/model | `docs/ref/CONTENT-MODEL.md` · `docs/status/DECISION-LOG.md` |
| design/token | `docs/ref/DESIGN-TOKENS.md` · `docs/status/PROJECT-STATUS.md` |
| pipeline/flow | `docs/ref/DATA-FLOW.md` · `docs/ref/ARCHITECTURE.md` |
| config/infra | `docs/ref/INTEGRATION-MATRIX.md` · `docs/ops/deploy-ops.md` |
| SEO | `docs/ref/SEO-STRATEGY.md` · `docs/ops/seo-submission-ops.md` |
| Hero/Color 시안 | `docs/ref/HERO-VARIANTS.md` · `docs/ref/COLOR-VARIANTS.md` |

## 사용법
사용자가 `/doc-sync`를 입력하면 위 추적 + 보고. 적용은 사용자 명시 승인 후만.
