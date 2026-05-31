# Project Status Template

`docs/status/PROJECT-STATUS.md`를 갱신할 때 이 구조 유지.

```markdown
# Project Status — WEFLOW

업데이트: YYYY-MM-DD
오너: <claude / 다음 세션>

## Current Phase
- Phase <N> — <한 줄 설명>

## Active Tracks
- [x] 완료된 작업
- [ ] 진행 중 작업
- [ ] 다음 작업

## Next Actions
1. 가장 다음 액션
2. ...

## Pending Decisions
- <항목> — <블로커 원인>

## Verification Commands
```bash
bash scripts/check-weflow-harness.sh
...
```

## Recent Changes (역순)
- YYYY-MM-DD [Phase X] <한 줄 변경 사항>
```

## 갱신 빈도
- 코드 변경 직후 항상
- 세션 마무리 시 `/handoff` 명령으로 자동 갱신
