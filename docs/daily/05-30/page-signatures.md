---
date: 2026-05-30
page: /kit#motion-signatures
phase: 정공법 Task #4
stage: Done
owner: claude
---

# devfive 시그니처 모션 5종 추출 + `/kit` 등재

## 작업 요약

주인님 정공법 트랙 Task #4. 레퍼런스 사이트(devfive.kr)의 시그니처 인터랙션 5종을
`components/motion/`에 추출 + `/kit#motion-signatures` 카테고리에 라이브 데모.

## 추출한 5개

| 컴포넌트 | 사용처 | 'use client' |
|---|---|:-:|
| `<MascotOrbit>` | Why 섹션 · 빈 영역 보조 포인트 | ✅ |
| `<FloatingParticles>` | Hero 배경 키워드 6 가독성 보강 | ✅ |
| `<ServiceRailDrag>` | 서비스 카드 가로 스와이프 | ❌ (native scroll) |
| `<ProcessAccordion>` | 제작 프로세스 타임라인 | ✅ |
| `<ClientLogoMarquee>` | 파트너 로고 좌우 흐름 | ✅ |

## 검증

| 단계 | 결과 |
|---|---|
| typecheck | PASS (5 컴포넌트 + 3 타입 export) |
| build | PASS · 기존 SSG 그대로 유지 |
| agent-browser 1440 | 3장 캡처(top·mid·bot) + ERROR 0건 |
| 시각 | 마스코트 떠다님 부드러움 · ProcessAccordion 01 dot mint glow · ServiceRailDrag 카드 4개 가로 |
| reduced-motion | 5개 모두 정적 fallback 지원 |

## Evidence

- `evidence/mockup/signatures-top.png` — 카테고리 + MascotOrbit + FloatingParticles 시작
- `evidence/mockup/signatures-mid.png` — ServiceRailDrag(4 카드) + ProcessAccordion(01 dot)
- `evidence/mockup/signatures-bot.png` — ClientLogoMarquee 흐름 + background-layers 이어짐

## 설계 결정

- **MascotOrbit**: framer-motion `animate={y, rotate}` 무한 loop, `useReducedMotion` 시 정적 div. amplitude/duration/rotate/delay 4 props만으로 자연스러운 떠다님.
- **FloatingParticles**: 기존 `<FloatingPill>` 단일 → 다중 wrapper. `Particle[]` 배열로 id/content/style/depth/duration/delay 받음. `pointer-events-none` + `aria-hidden`으로 접근성 영향 0.
- **ServiceRailDrag**: framer-motion drag 대신 **native CSS scroll-snap + overflow-x-auto**로 구현. 'use client' 불필요, 모바일 swipe 자연스러움, scrollbar 얇게 (`scrollbar-width: thin`).
- **ProcessAccordion**: 기본 `<Accordion>` 위에 좌측 세로선 + 번호 dot 추가. dot은 열렸을 때 `bg-accent text-bg`, 닫혔을 때 `bg-surface border-line`. 단일 펼침 정책 (한 번에 하나).
- **ClientLogoMarquee**: items 2배 복제 + motion `x: 0% → -50%` infinite linear로 seamless loop. 양옆 `from-bg` gradient fade로 카드 등장/사라짐 부드럽게. speed prop으로 1 cycle 초 조절.
- **모두 reduced-motion 정적 fallback**: `useReducedMotion` 또는 transition undefined로 OS 설정 존중.

## 다음 액션

→ **Phase 4 (Task #5)** — Marketing Sections 추출 + 17 라우트 본문 작성
- `PAGE-COMPONENT-MAP.md` 17 라우트 × 컴포넌트 매핑 따라 진행
- 부품 16개 + 모션 5종 + 자산 4종 + 마스코트 3종 = 조립 재료 완비
- 라우트별 일지: `docs/daily/MM-DD/page-<route>.md`

## 한줄정리

devfive 닮음 80% 도달에 필요한 시그니처 5종을 다 만들었고 라이브 진열까지 끝났어요, 이제 진짜 페이지 17개 만들 차례.
