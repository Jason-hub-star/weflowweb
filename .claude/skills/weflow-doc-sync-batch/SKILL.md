---
name: weflow-doc-sync-batch
description: WEFLOW 변경 클래스별 상태 문서(PROJECT-STATUS · PAGE-UPGRADE-BOARD · MISSING-AND-UNIMPLEMENTED · daily)를 한 번에 동기화
user_invocable: true
tags: [documentation, ssot, batch, weflow, status]
trigger: "Task 마무리 시점, 변경 후 5~6 파일 동기화가 필요할 때"
version: 1
---

# WEFLOW Doc Sync Batch

이번 세션(2026-05-30)에 8번 반복된 문서 동기화 묶음을 1개 스킬로 처리한다.
근거: `docs/ops/skill-recommendations.md` §1.2.
변경 클래스 → 대상 파일 매트릭스는 `AGENTS.md` §5 기반.

## Use When

- 컴포넌트 추출 · 페이지 작성 · 결정 잠금 · 콘텐츠 추가 후
- `pnpm typecheck && pnpm build` 통과 직후
- "여러 문서 한꺼번에 고쳐야 하는데 빠뜨릴까 봐 걱정될 때"

## Inputs

```yaml
changeType: page | component | decision | content | bugfix | token
summary: 한 문장 요약 (예: "홈 home.json 추출 + zod 스키마 작성")
phase: 정공법 Task 번호 또는 Phase 라벨 (예: "Phase 4 진입", "묶음 A")
files_changed: [string]   # git diff 기준 변경 파일 경로 배열
verification:             # PASS 항목 (배열)
  - "typecheck PASS"
  - "build PASS"
  - "agent-browser ERROR 0건"
evidence: [string]        # 캡처 경로 배열 (선택)
decRef: DEC-XXX           # 결정 잠금 동반 시 (선택)
nextAction: 한 문장 (선택)
```

## Change Class → 동기화 대상 매트릭스

| changeType | PROJECT-STATUS | PAGE-UPGRADE-BOARD | MISSING-AND-UNIMPLEMENTED | INTERACTION-CATALOG | DECISION-LOG | daily/MM-DD | CONTENT-MODEL | DESIGN-TOKENS |
|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| page | ✅ | ✅ | ✅ | ⚠️ | ⚠️ | ✅ | ⚠️ | ⛔ |
| component | ✅ | ⚠️ | ✅ | ✅ | ⛔ | ✅ | ⛔ | ⛔ |
| decision | ✅ | ⛔ | ⛔ | ⛔ | ✅ | ✅ | ⚠️ | ⛔ |
| content | ✅ | ⚠️ | ✅ | ⛔ | ⛔ | ✅ | ✅ | ⛔ |
| bugfix | ✅ | ⛔ | ⛔ | ⛔ | ⛔ | ✅ | ⛔ | ⛔ |
| token | ✅ | ⛔ | ⛔ | ⛔ | ⚠️ | ✅ | ⛔ | ✅ |

- ✅ = 반드시 갱신, ⚠️ = 해당 시, ⛔ = 갱신 불필요

## Steps

### Step 1: 변경 분류 확정
- `changeType` 입력 검증, 매트릭스 대상 파일 목록 도출
- 동시에 여러 클래스 해당하면 합집합 사용

### Step 2: PROJECT-STATUS.md
- `## Recent Changes (역순)` 맨 위에 1줄 append
- 형식: `- YYYY-MM-DD [{phase}] {summary} ({verification 요약}) {evidence ref}`
- `## Current Phase` · `## Active Tracks` 영향 시 함께 갱신
- `## Pending Decisions` · `## Next Actions` 영향 시 함께 갱신

### Step 3: PAGE-UPGRADE-BOARD.md (page · content 한정)
- 해당 라우트 행의 Stage 갱신 (Ready → Building → QA → Done)
- 최근 갱신일 컬럼 갱신

### Step 4: MISSING-AND-UNIMPLEMENTED.md (page · component · content 한정)
- 해당 항목 ✅ 표시 또는 행 삭제
- 새로 미구현 발견 시 새 행 추가

### Step 5: INTERACTION-CATALOG.md (component 한정)
- 신규 패턴 도입 시 행 추가, 기존 후보 승급 시 🔲 → ✅

### Step 6: DECISION-LOG.md (decision · token 일부)
- `decRef`가 있으면 append-only로 새 DEC 추가
- supersede 체인 표기
- Template 형식 따름

### Step 7: docs/daily/{MM-DD}/{slug}.md
- 신규 일지 1개 (이미 있으면 행 추가)
- 템플릿:
  ```markdown
  # {phase} — {summary}
  - 작업: ...
  - 검증: {verification}
  - evidence: {evidence}
  - 다음: {nextAction}
  ```

### Step 8: CONTENT-MODEL.md / DESIGN-TOKENS.md (해당 시)
- content 변경: 콘텐츠 모델 표 갱신
- token 변경: 토큰 표 + 마이그레이션 노트

### Step 9: 정합성 검증
```bash
bash scripts/check-weflow-harness.sh     # Doc OS 필수 파일
bash scripts/check-doc-sync.sh           # 코드 ↔ 문서 정합성
```
실패 시 누락 파일 추가.

### Step 10: 보고
- 갱신한 파일 목록 출력
- 다음 액션 1~2개 명시 (다음 Task 진입점)

## Outputs

- 변경 클래스에 따른 5~7개 문서 일괄 Edit
- 일지 1개
- 정합성 검증 결과

## Verify

- [ ] PROJECT-STATUS Recent Changes 행 추가
- [ ] 매트릭스 ✅ 대상 모두 반영
- [ ] daily 일지 1개 생성/갱신
- [ ] DEC 추가 시 supersede 체인 표기
- [ ] `check-weflow-harness.sh` + `check-doc-sync.sh` PASS

## Failure / Fallback

- 다중 changeType 충돌: 가장 큰 영향(page > component > content > bugfix) 기준으로 우선 처리
- daily 폴더(`docs/daily/{MM-DD}`) 없으면 mkdir
- 정합성 검사 실패: 누락 파일 식별 후 단계 회귀

## 한줄정리

**changeType + summary + verification만 던지면 5~7개 문서를 매트릭스대로 자동 동기화해요.**
