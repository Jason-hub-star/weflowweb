---
name: daily-log-compress
description: 매일 22:00 KST — docs/daily/MM-DD를 docs/weekly/YYYY-Www.md로 압축
schedule: 0 22 * * * Asia/Seoul
---

# Daily Log Compress (자동/수동)

## 트리거
- 자동: 매일 22:00 KST (TaillogToss 패턴)
- 수동: `bash scripts/compress-daily.sh` 또는 본 automation 호출

## 무엇을 하나
1. 오늘 날짜 폴더 `docs/daily/MM-DD/` 안의 모든 .md 파일 수집
2. 라우트/토픽별 체크박스 완료 항목·증거 추출
3. 주차 계산 (ISO 8601 YYYY-Www)
4. `docs/weekly/YYYY-Www.md`에 오늘 분량 append
5. 일일 파일은 archive로 이동하지 않고 보존(감사 추적)
6. 요약을 `docs/status/PROJECT-STATUS.md` Recent Changes에 1줄 추가

## 출력 형식 (weekly)

```markdown
## 2026-05-29 (목)
- /hero-lab: 5안 배포 완료 (commit abc1234)
- /mockup: 3안 토큰 구조 정의
- 미완: Hero D Live Dashboard 모션 1건 (다음날)
```
