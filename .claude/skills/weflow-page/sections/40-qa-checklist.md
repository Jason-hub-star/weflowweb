# 40 — QA Checklist (페이지별)

## 모든 페이지 공통

- [ ] 데스크톱 1440 — 텍스트·CTA·카드 넘침 없음
- [ ] 태블릿 768 — 그리드 2→1 전환 자연스러움
- [ ] 모바일 375 — 모든 터치 영역 ≥ 44px, 가독성 ≥ 16px
- [ ] 키보드 탐색 — Tab 순서 논리적, focus ring 명확
- [ ] 스크린 리더 — `alt`, `aria-*` 명시
- [ ] 색 대비 — 본문 4.5:1, CTA 3:1
- [ ] 모션 — reduced-motion일 때 자동 우회
- [ ] 이미지 — next/image, priority는 첫 화면만
- [ ] 메타 — title 30~60자, description 80~160자
- [ ] OG 이미지 — 200 응답
- [ ] grep — 의료/병원/시술/치료 0건

## 폼 페이지 (`/contact`, `/reservation`)

- [ ] 필수 필드 비워둔 채 제출 → 인라인 에러
- [ ] 동의 미체크 제출 → 거부
- [ ] BotID 우회 시도 → 400
- [ ] 정상 제출 → Resend 이메일 + Sheets 1행
- [ ] success 토스트 + Flow Guide(review)
- [ ] 폼 자동완성 작동

## 폼 외 마케팅 페이지

- [ ] 첫 화면 CTA 최소 1개 노출
- [ ] CTA 클릭 → 적절한 위치(`/contact` 또는 액션 시트)
- [ ] 사례·후기·블로그 카드 — 빈 상태 UI 정의

## /mockup, /hero-lab

- [ ] 라우트 id 1~5(또는 1~3) 모두 200
- [ ] 같은 페이지 콘텐츠가 색·hero만 다르게 렌더
- [ ] robots.txt에서 disallow 명시됨
