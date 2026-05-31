---
name: hero-lab-compare
description: /hero-lab/[1..5] Hero 5안 비교 리포트 작성
trigger: Day 2 후 주인님 hero 선정 전
---

# /hero-lab-compare

## 무엇을 하나
1. `/hero-lab/1..5` 5안 동시 렌더
2. agent-browser-verify로 1440·375 스크린샷
3. 각 안마다:
   - 컨셉/적합 트래픽/구현 비용 (HERO-VARIANTS.md 출처)
   - 첫 화면 CTA 거리 (px 단위)
   - 모션 정상 동작 여부
   - 텍스트 넘침 검사
4. 비교 매트릭스 + 운영 제안(`/` · `/landing` · 시즌 보관)
5. 선택 후 `DECISION-LOG.md`에 `DEC-XXX: Hero 선정 — <A/B/C/D/E>` 자동 패치 제안
6. 잔여 안은 컴포넌트로 보존 → `PAGE-UPGRADE-BOARD.md` 갱신
