# 50 — Launch Evidence

페이지가 Done이 되려면 다음 증거가 `docs/daily/MM-DD/page-<route>.md`에 있어야 한다.

## 증거 항목

```markdown
# page-/cases — 2026-06-02

Stage: Building → QA → Done

## Done today
- [x] CaseGrid 컴포넌트 (commit abc1234)
- [x] 더미 사례 5건 작성 (`content/cases/*.md`)
- [x] 카테고리 필터 인터랙션
- [x] 모바일 375 검수 (스크린샷: `evidence/2026-06-02/cases-375.png`)
- [x] Lighthouse: Perf 94, A11y 96, SEO 100
- [x] grep 금기어 0건

## Verification
- pnpm typecheck ✓
- pnpm lint ✓
- pnpm build ✓
- agent-browser-verify ✓ (스크린샷 첨부)
- curl -I /cases → 200
- /cases/onngeul-fitness → 200

## #TODO 잔여
- 실제 사례 콘텐츠 교체 (MISSING-AND-UNIMPLEMENTED 추적 중)

## 결정 변경
- (없음 또는 DEC-XXX 참조)
```

## 보드 갱신

같은 날 `docs/status/PAGE-UPGRADE-BOARD.md`에서 해당 라우트 Stage = Done, Notes 갱신.

## 주간 압축

`bash scripts/compress-daily.sh`로 `docs/weekly/YYYY-Www.md`에 자동 누적.
