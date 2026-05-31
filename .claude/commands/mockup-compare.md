---
name: mockup-compare
description: /mockup/[1..3] 컬러 3안 비교 리포트 작성
trigger: 주인님이 컬러 시안 선택을 앞두고 있을 때
---

# /mockup-compare

## 무엇을 하나
1. `/mockup/1`, `/mockup/2`, `/mockup/3` 3안 동시 렌더 확인
2. agent-browser-verify로 1440·375 양 뷰포트 스크린샷
3. 각 시안 ID마다:
   - 토큰 값(`COLOR-VARIANTS.md` 출처)
   - 캐릭터 조화도
   - WCAG 대비비 (본문/CTA)
   - 첫인상 키워드 3개
4. 비교 매트릭스 출력
5. 사용자에게 선택 요청 → 결정 시 `DECISION-LOG.md`에 `DEC-XXX: Color 선정 — <id>` 자동 패치 제안

## 의존
- `/mockup/[id]` 라우트 배포 완료
- `docs/ref/COLOR-VARIANTS.md` 최신
