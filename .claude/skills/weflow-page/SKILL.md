---
name: weflow-page
description: WEFLOW 페이지(라우트)를 Ready→Designing→Building→QA→Done까지 운영하는 스킬. SKILL.md는 인덱스만, 본문은 sections/ 청크.
trigger: 페이지 신규 추가, 페이지 단일 변경, PAGE-UPGRADE-BOARD 갱신
user_invocable: true
tags: [page, route, runbook, weflow]
version: 1
auto_enrich: true
---

# weflow-page

TaillogToss `sections/` 분해 패턴 채택. 본문은 다음 청크로 나뉜다 — 필요한 청크만 로드.

## Sections

- `sections/00-overview.md` — 페이지 운영 사이클 개요
- `sections/10-ia-mapping.md` — IA → 라우트 → 컴포넌트 매핑
- `sections/20-content-runbook.md` — MD frontmatter 작성 가이드
- `sections/30-component-tree.md` — 컴포넌트 트리 표준
- `sections/40-qa-checklist.md` — 페이지별 QA 체크리스트
- `sections/50-launch-evidence.md` — 출시 증거 기록 양식

## 사용 시점

새 라우트 작성 / 기존 라우트 리팩토링 / Stage 전환 (Ready→Done) 시 호출.

## 흐름

1. 00-overview 읽고 사이클 파악
2. 10-ia-mapping에서 라우트 위치 확인
3. 20/30 참고하여 콘텐츠 + 컴포넌트 작성
4. 40 QA 통과
5. 50에 증거 기록
6. `PAGE-UPGRADE-BOARD.md` Stage 갱신
