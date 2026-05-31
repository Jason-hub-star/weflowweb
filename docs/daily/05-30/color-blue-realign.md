# 컬러 SSOT 블루 톤 재정의 + 시안 비교 폐기 + 홈 매력 보강 (2026-05-30 밤)

> DEC-049(dark-charcoal mint)를 supersede하고 hero 자산(`weflow-blue-startup-hero.png`)에 맞춘 블루 라이트 톤으로 사이트 전역 재정렬. 동시에 `/mockup` 시안 비교 폐기, HeroManagedCards 제거, mascotBreak 카피 "실제 개발자 직접", process step별 결과물, pricing 카드 금액 강조까지 한 번에 잠갔어요.

작성: 2026-05-30 밤
오너: claude

---

## 0. 진입 시 요청 (주인님)

```
웹사이트 내의 디자인 색상을 히어로섹션의 색에 맞춰서 교체
컬러시안비교기능 삭제
HeroManagedCards (Managed for you / LIVE / 01..04) 삭제
"만들어지는 과정을 직접 보여드립니다" 섹션 더 매력적으로 — 현재 뭘 만드는지 모름
flow guide가 아닌 실제 개발자가 개발해준다고 해야 해
금액이 카드 상에 잘 표시 안 됨 + 매력적이지 않음, 좋은 사례 찾아봐
```

플랜모드 진입 → A~G 7단계 작업 분해 → 권장안 승인 → 실행.

---

## 1. 컬러 SSOT 블루 톤 재정의 (DEC-049 → DEC-051)

`packages/tokens/src/theme.css` `:root` 전체 교체:

| 토큰 | 신규 (블루 라이트) | 이전 (DEC-049 dark-charcoal) |
|---|---|---|
| `--bg` | `#f4f8ff` | `#101417` |
| `--surface` | `#ffffff` | `#192125` |
| `--surface-soft` | `#e8f0ff` | `#202a2f` |
| `--text` | `#0a1428` (네이비) | `#f4fbfa` |
| `--muted` | `#5b6b85` | `#9db0b2` |
| `--line` | `rgba(70,110,180,0.16)` | `rgba(202,244,238,0.13)` |
| `--accent` | `#3b82f6` (blue-500) | `#65e6c7` (mint) |
| `--accent-strong` | `#2563eb` (blue-600) | `#34d39a` |
| `--accent-soft` | `rgba(59,130,246,0.12)` | `rgba(101,230,199,0.18)` |
| `--mint-rgb` | `59 130 246` (RGB tokens 라이트 호환) | `101 230 199` |
| `--amber` | `#f59e0b` | `#b8f26d` |
| `--success/warning/error` | Tailwind emerald/amber/red 라이트 호환 | mint/yellow/coral |
| shadow | `rgba(10,20,40, *)` 라이트 친화 | `rgba(0,0,0, *)` 다크 |
| color-scheme | `light` | `dark` |

부수 변경:
- `apps/web/app/layout.tsx` `themeColor: '#f4f8ff'` (모바일 주소창)
- `apps/web/app/globals.css` grain `mix-blend-mode: multiply` + opacity `0.035` (라이트 친화)
- 시안 1·2·3·4 `[data-mockup='*']` 4 블록 **삭제**

---

## 2. `/mockup/[id]` 시안 비교 폐기

- `apps/web/app/mockup/` 폴더 전체 삭제 (page.tsx 313줄 + 4 SSG 라우트)
- `theme.css` 4 시안 블록 삭제
- `apps/web/app/robots.ts`에서 `/mockup/` disallow 제거
- `docs/ref/COLOR-VARIANTS.md`은 archive 노트 추가 (별도 작업)
- `docs/status/PAGE-UPGRADE-BOARD.md` 디자인 시안 라우트 표에서 mockup 4행 제거 (별도 작업)

**보존**: `/hero-lab/[1..5, 2-plus]` 그대로 — 별도 hero 시안 비교 목적.

---

## 3. `<HeroManagedCards>` 삭제

- `apps/web/components/motion/HeroManagedCards.tsx` 삭제 (105줄)
- `apps/web/components/motion/index.ts` export 제거
- `apps/web/app/_home/HomeSections.tsx` `<HeroVideo visualOverlay={<HeroManagedCards />}>` + 모바일 fallback 제거 (총 2곳)
- `apps/web/app/kit/sections/MotionSignaturesSection.tsx` import + visualOverlay demo + 별도 KitCard 모두 제거

Hero 우측은 hero 이미지 자체(블루 스타트업 일러스트)가 비주얼을 담당.

---

## 4. mascotBreak 카피 변경

`apps/web/content/pages/home.json` mascotBreak:
```diff
- "eyebrow": "FLOW GUIDE",
- "title": "귀여운 Flow Guide가 제작 흐름을 같이 챙깁니다",
- "body": "무엇을 해야 할지 모를 때도 괜찮습니다. 필요한 질문만 드리고, 나머지는 WEFLOW가 보기 쉽게 정리합니다.",
+ "eyebrow": "BUILT BY DEVELOPERS",
+ "title": "AI 자동 생성이 아니라, 실제 개발자가 직접 만들어드려요",
+ "body": "위플로우 개발팀이 디자인부터 코드까지 손으로 챙겨서 만듭니다. 같은 템플릿을 찍어내지 않고, 사장님 업종·자료·강점에 맞춰 한 사이트씩 직접 손봅니다.",
```

mascot 이미지는 유지 — "곁에서 안내하는 캐릭터" 정도 의미로 약화. 향후 팀 사진으로 교체 옵션.

---

## 5. `<SiteBuildStoryboard>` 매력 보강

`apps/web/components/motion/SiteBuildStoryboard.tsx`:
- STAGES 배열에 `result` 필드 추가 (단계별 받게 되는 결과물):
  - 01 → 한 장 메모로 정리
  - 02 → 와이어 시안 전달
  - 03 → 디자인 시안 공유
  - 04 → 베타 사이트 링크
  - 05 → 라이브 사이트 + 광고 캠페인
  - 06 → 월 리포트 + 케어 일정
- 섹션 제목: "만들어지는 과정을 직접 보여드립니다" → **"우리가 6단계로 직접 만들어드립니다"** (능동·신뢰)
- StageRow + StoryboardStatic 두 곳에 `→ {result}` accent 색 1줄 추가

---

## 6. pricing 카드 UI 개선

`apps/web/lib/content/schemas.ts`:
- `HomePricingItem` + `PricingPlanItem`에 `originalPrice: z.string().optional()` 추가

`apps/web/content/pages/home.json` pricing.items + `pricing.json` plans:
- 단발 3종에 `originalPrice` 추가 (PRD §8 기존가):
  - landing: `499,000원` → `249,000원`
  - homepage: `1,990,000원` → `999,000원`
  - landing-and-home: `2,190,000원` → `1,099,000원`
- 케어·광고 5종은 `originalPrice` 없음 (시작가 `~`)

`apps/web/app/pricing/page.tsx` `PricingPlans` + `apps/web/app/_home/HomeSections.tsx` `HomePricing`:
- featured 카드: `ring-2 ring-accent/25 shadow-lg md:scale-[1.03] -order-1 md:order-none` (모바일 reorder + 데스크톱 lift)
- 상단 ribbon: `<div className="absolute -top-3.5 left-1/2 -translate-x-1/2"><span className="bg-accent text-surface ...">{badge}</span></div>` (카드 위에 떠 있는 형태)
- 가격 블록:
  - `originalPrice` 있으면 위에 `text-muted line-through font-mono`
  - 가격은 `text-display`, featured는 `text-accent`로 강조
  - 아래 `text-small text-muted font-mono` "부가세 포함"
- features `space-y-2.5` + `font-bold ✓` accent
- 카드 grid `gap-6 pt-6` (ribbon 자리 + 위쪽 여유)

벤치마크 적용: middle-option center-stage 효과, 5–7 features, 부가세 명확, CTA primary/secondary 차등 (이미 적용).

---

## 7. 검증

| Check | Result |
|---|---|
| typecheck | PASS |
| build | PASS (Compiled 5.4s · TS 7.0s) |
| SSG | **22/22** prerender (26 − /mockup/[1..4] 4개) |
| check-design-tokens.sh (패치 후) | PASS (hex 0건 in apps/web 제외 globals.css) |
| PRD §8 8종 + 기존가 3종 grep | 24회 노출 |
| 금기어 (병원·치료·시술) grep | **0건** |
| /mockup/* | 404 (라우트 제거) |
| themeColor 모바일 주소창 | `#f4f8ff` 라이트 블루 |

**잔재 hex (별도 트랙)**:
- hero-lab 시안 5종(HeroFullBleed/Plus/CardMosaic/SplitForm/Carousel) — 시안 박물관, 출시 게이트 영향 0
- `<MeshGradientBackground>` default props + `/kit` 데모 — 데모 시각화 목적

---

## 8. harness 스크립트 패치

`scripts/check-design-tokens.sh`:
- grep `--include='*.{ts,tsx,js,jsx,css,scss}'` brace expansion 미지원 버그 → `--include='*.ts' --include='*.tsx' ...` 분리 명시
- 이전엔 검사가 사실상 무력화돼 있던 거라 픽스 후 정확 0건 PASS 확인

---

## 9. 다음 (참고)

1. agent-browser 1440/375 — 홈 + /pricing 블루 톤 정렬 시각 검수
2. hero-lab 시안 5종 hex 잔재 토큰화 또는 hero-lab 1차 출시 제외 결정
3. mascot 이미지를 팀 사진 또는 개발자 아이콘으로 교체 옵션
4. process 섹션 2차: 각 step별 mock UI(SVG/이미지) 추가 + 영상 데모
5. 묶음 B-2 (`/contact`·`/reservation`·`/landing` + Resend/Sheets/BotID 인프라)

---

## 한줄정리

**컬러 SSOT을 hero 블루 라이트 톤(#f4f8ff + #3b82f6)으로 재정의(DEC-049 → DEC-051) + `/mockup` 시안 비교 폐기(SSG 26→22) + HeroManagedCards 제거 + mascotBreak "실제 개발자가 직접" + process step별 결과물 1줄 + pricing 카드 ribbon/취소선/큰 accent 가격까지 한 번에 잠갔어요. typecheck/build/harness 전부 PASS.**
