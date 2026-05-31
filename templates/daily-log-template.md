# Daily Log Template

`docs/daily/MM-DD/page-<route>.md` 또는 `docs/daily/MM-DD/<topic>.md` 에 작성.

```markdown
# <page or topic> — YYYY-MM-DD

Stage: <Ready / Designing / Building / QA / Done>

## Done today
- [x] 작업 항목 (commit 해시 또는 파일 경로)
- [x] ...

## Verification
- pnpm typecheck ✓ / ✗
- pnpm lint ✓ / ✗
- pnpm build ✓ / ✗
- agent-browser-verify ✓ / ✗ (스크린샷 경로)
- 기타 검증

## Findings
- 발견 사항 (긍정 / 부정 / 의외)

## Blocked / Issues
- 막힌 부분 + 원인

## #TODO 잔여
- 다음에 해결해야 할 항목

## 결정 변경
- (있다면 DEC-XXX 참조 또는 신규 결정 제안)
```

## 작성 규칙
- 한 폴더 `MM-DD/` 안에 라우트별/토픽별 여러 파일
- 매일 22:00 KST `bash scripts/compress-daily.sh`로 weekly에 자동 누적
