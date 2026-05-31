# 2026-05-31 · DEC-052 — 홈 6단계 톱니바퀴 리팩토링

## 한 줄

홈 "사이트 만들어지는 6단계"가 SiteBuildStoryboard + HomeProcess 두 컴포넌트로 중복 렌더되고 카피가 제작자 시점이던 문제를, **톱니바퀴 인터랙션 + home.json SSOT 일원화 + 고객시점 "우리" 톤**으로 한 번에 정리.

## 변경 요약

### 데이터
- `lib/content/schemas.ts` — `HomeProcessItem`에 `nickname` + `result` 옵션 필드 추가
- `content/pages/home.json` — `process` 통째 재작성 (eyebrow/title/sub + items 6개 모두 "우리" 톤 + nickname + result)

### 컴포넌트
- `components/motion/SiteBuildStoryboard.tsx` — 395 → 320줄 통째 재작성
  - `data: HomePage['process']` props 시그니처
  - 우측 미니브라우저 7개 내부 컴포넌트 삭제 (BrowserFrame · PaperDots · Wireframe · ColoredFrame · ContentFilled · PulsingCTA · InquiryToast, ~150줄)
  - 신규 `<StoryboardCogwheel>` + `<CogwheelVisual>` + `buildCogPath()` 절차적 SVG (6톱니 × 4점)
  - 480vh sticky + `useScroll` rotate [0, -300°] + activeIndex `useMotionValueEvent` state
  - 12시 fixed highlight ring + hub 중앙 활성 step 번호 + 우측 활성 result 텍스트
- `app/_home/HomeSections.tsx` — `HomeProcess` export + `ProcessAccordion` import 제거 (중복 해소)
- `app/page.tsx` — `<HomeProcess>` 호출 제거 + `<SiteBuildStoryboard data={home.process} />`로 props 전달
- `app/kit/sections/PageSectionsSection.tsx` — KitCard 신규 카피로 동기화

## 검증

| Check | 결과 |
|---|---|
| `pnpm typecheck` | PASS |
| `pnpm build` SSG | **22/22** |
| `bash scripts/check-design-tokens.sh` | PASS (hex 0건) |
| 금기어 (병원·치료·시술) | 0건 |
| home.json process.items 6개 nickname+result+title+body | 충족 |
| useReducedMotion + lg 분기 | 정적 폴백 유지 |

## DEC

DEC-052 추가 — DEC-048 supersede (컴포넌트 이름·홈 위치·`/kit` 등재 유지, 인터랙션만 sticky storyboard → cogwheel rotation으로 전환).

## 다음

- agent-browser로 1440 데스크톱에서 톱니바퀴 스크롤 회전 시각 검수 (별도 작업)
- 톱니바퀴 회전 속도/감속 미세 조정 필요 시 useSpring 적용 검토
- 모바일(<lg)은 정적 stack 유지 — 추후 carousel/swipe 옵션 검토
