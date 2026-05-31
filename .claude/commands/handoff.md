---
name: handoff
description: 세션 인계 패킷 작성 — 다음 에이전트/세션이 5분에 컨텍스트 복원
trigger: 세션 마무리, 컨텍스트 가득, 작업자 교체
---

# /handoff

## 무엇을 하나
1. `docs/status/PROJECT-STATUS.md`의 Current Phase / Active Tracks / Next Actions 최신화
2. `docs/status/MISSING-AND-UNIMPLEMENTED.md` 신규 항목 추가
3. 오늘 작업 증거를 `docs/daily/MM-DD/page-<route>.md` 또는 `docs/daily/MM-DD/<topic>.md`에 기록
   - 무엇을 시도했는가
   - 무엇이 됐는가 (커밋 해시 또는 파일 경로)
   - 무엇이 안 됐는가 (이유)
   - 다음에 무엇을 해야 하나
4. 새 결정이 있었다면 `DECISION-LOG.md`에 `DEC-XXX` append
5. 인계 패킷 1쪽 요약 출력:
   ```
   [Handoff — YYYY-MM-DD HH:mm]
   Phase: ...
   Done today: ...
   Blocked: ...
   Next: ...
   Open #TODO: ...
   ```
