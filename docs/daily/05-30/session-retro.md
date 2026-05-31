# Session Retro — 2026-05-30 (저녁 세션)

> session-retro 스킬 호출 결과. 4가지 신호 분류 + 다음 액션 잠금.

작성: 2026-05-30 · 출처: 본 세션 + `docs/ops/skill-recommendations.md`

---

## Success Pattern

- **DEC-050 잠금 + skill-recommendations 동시 작성**: 결정 잠금과 회고를 한 번에 묶으니 다음 세션 진입점이 명확해짐. → 향후 결정 잠글 때 동기화 문서 + 다음 세션 첫 액션까지 같은 PR에서 닫기.
- **풀스택 홈 본문 + 문서 동기화 한 트랙**: typecheck/build/캡처/일지/PROJECT-STATUS를 마지막에 묶어 처리 → 컨텍스트 스위칭 비용 ↓. → `weflow-doc-sync-batch` 자동화 후 표준 패턴으로 승급.
- **컴포넌트 추출 23번 측정값 확보**: 빈도 데이터가 있으니 `weflow-component-extract` 스킬 ROI 근거 명확. → 스킬 등록 후 다음 세션부터 횟수 차감 계측 시작.

## Failure → Fix

- **하드코딩 데이터 누적**: 홈 페이지 504줄 중 ~120줄이 SERVICES/WHY/CASES/REVIEWS/PROCESS/PRICING/PARTNERS 배열. Phase 4 진입 직전에야 발견 → DEC-050으로 우회. → **규칙화**: 신규 페이지는 처음부터 `content/pages/*.json`으로 작성, 인라인 `const ARRAY = [...]` 금지(15줄 이상).
- **시안 4 라일락 → mint 정렬 누락**: DEC-049 잠그면서 라이트/다크 SSOT 교체에 4개 파일 일괄 Edit 필요 → 1회 실수로 typecheck fail. → 신규 컬러 시안 추가 시 SSOT 매니페스트(파일 목록 + md5) 작성 권장.

## Repeated Manual Work

- 컴포넌트 추출 7~9 단계 × 23번 = ~3시간 매뉴얼. → 스킬화 우선순위 #1.
- 문서 동기화 5~6 파일 × 8번 = ~40분. → 스킬화 우선순위 #2.
- agent-browser 1440/375 캡처 시퀀스 10+ 번. → 1회용 스크립트로 묶기(가성비 ★).

## User Correction

- "보라색 빼고 시안 4" — 주인님 명확 결정 → DEC-049 supersede 처리. → 결정 잠글 때 supersede 체인을 DECISION-LOG에 표기하는 패턴 유지.
- "각 단계마다 자기리뷰는 Opus" — 코드 리뷰/아키텍처 검토는 반드시 `Agent(model="opus")` 위임. → 자동 보강 규칙으로 글로벌 페르소나 §"에이전트 모델 규칙"에 이미 잠금 (재확인).

---

## Promotion 결정

| Signal | Promote To |
|---|---|
| 컴포넌트 추출 23번 | **스킬 신규 등록** `weflow-component-extract` (settings.json) |
| 문서 동기화 8번 | **스킬 신규 등록** `weflow-doc-sync-batch` (settings.json) |
| 하드코딩 데이터 누적 | **규칙 잠금** AGENTS.md Hard Rule 후보 (Phase 4 묶음 A 진입 전 추가 검토) |
| agent-browser 시퀀스 | **스크립트 후보** `scripts/check-visual.sh` (Phase 4 묶음 B 이후) |

---

## Next Session 첫 액션

1. ✅ session-retro 호출(이 문서)
2. update-config 스킬로 `weflow-component-extract` · `weflow-doc-sync-batch` 등록
3. DEC-050 실행 — 홈 `home.json` + zod 추출
4. Phase 4 묶음 A 작성 (services·pricing·cases·reviews, 처음부터 JSON 패턴)

---

## 한줄정리

**23번·8번 반복 패턴은 스킬 2종으로 잡고, 하드코딩 데이터 누적은 Phase 4 진입 전 JSON SSOT로 막아요.**
