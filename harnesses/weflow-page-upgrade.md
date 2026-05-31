---
name: weflow-page-upgrade
trigger: 새 라우트 추가 또는 기존 라우트 Ready→Done 사이클
status: starter
description: PAGE-UPGRADE-BOARD.md 운영 + weflow-page 스킬 사용 흐름
---

# Weflow Page Upgrade Harness

## When
- `apps/web/app/...` 새 라우트 파일 추가
- 기존 라우트 Stage 전환 (Ready→Designing→Building→QA→Done)

## Flow

```
1. PAGE-UPGRADE-BOARD.md에서 해당 라우트 행 확인 (없으면 추가)
2. 스킬 로드: .claude/skills/weflow-page/sections/00-overview.md
3. IA 매핑: 10-ia-mapping.md 참조
4. 콘텐츠: 20-content-runbook.md — content/<folder>/*.md 작성
5. 컴포넌트: 30-component-tree.md — 트리에 맞춰 코드
6. QA: 40-qa-checklist.md — 전부 체크
7. 출시 증거: 50-launch-evidence.md 양식대로 docs/daily/MM-DD/page-<route>.md 작성
8. PAGE-UPGRADE-BOARD.md 해당 행 Stage 갱신
9. 필요 시 PROJECT-STATUS.md Recent Changes 갱신
```

## 예
- `/cases`를 Ready→Done까지 한 번 운영하는 흐름
- `/products/[slug]`를 새로 추가하는 흐름
