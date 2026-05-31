---
name: doc-broken-link-check
description: docs/* 안의 상대 링크·파일 경로 유효성 검증
schedule: 0 9 * * 1 Asia/Seoul
---

# Doc Broken Link Check

## 트리거
- 자동: 매주 월요일 09:00 KST
- 수동: `bash scripts/check-doc-sync.sh`

## 무엇을 하나
1. docs/, ai-context/, .claude/, templates/, harnesses/, patterns/ 안의 모든 .md 스캔
2. 마크다운 링크 `[text](path)` 추출
3. 상대 경로 파일 존재 확인
4. 절대 경로 (예: `/Users/family/...`) 존재 확인
5. 깨진 링크 보고서 출력
6. AGENTS.md Reading Order의 모든 항목 존재 확인
7. HARNESS-MANIFEST.yaml required_files 존재 확인
