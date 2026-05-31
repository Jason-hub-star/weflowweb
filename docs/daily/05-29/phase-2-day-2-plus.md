# phase-2-day-2-plus — 2026-05-29

Stage: Phase 2 보강 — Hero B+ Enhanced Full-bleed + 모션 primitives 카탈로그

## Done today

### 정책 잠금 (DEC-044 / AGENTS Hard Rule 11)
- [x] `DEC-044` 추가 — 재사용 가능 기능은 항상 `components/motion/` 또는 `primitives/`에 추출
- [x] `AGENTS.md` Hard Rule 11 추가
- [x] `patterns/motion-primitives.md` 카탈로그 신규

### Reference 조사 (agent-browser)
- [x] `devfive.kr/ko` 스크롤 다운 → 서비스 카드 섹션 캡처
- [x] hero 모션 패턴 추출: `transform: scale(0.8); filter: blur(8px); opacity: 0.5;` ↔ 1/0/1 — depth illusion
- [x] `paper.design` 캡처 — 다크 + 사선 그리드 텍스처 + canvas 데모
- [x] `lenis.dev` 캡처 — smooth scroll 데모 (스타일 차용 X)
- [x] 증거 `evidence/reference/{devfive-services,devfive-mid,paper-design-home,lenis-demo}.png`

### Hero B+ 명세 잠금
- [x] `docs/ref/HERO-VARIANTS.md` "B+ Enhanced Full-bleed" 섹션 추가
- [x] `DEC-041` 1차 선정 후보 = B+
- [x] `DEC-042` 의존성 = `@paper-design/shaders-react`
- [x] `DEC-043` 인터랙티브 인벤토리 8종 잠금

### 모션 primitives 8개 신규 (`components/motion/`)
- [x] `useMouseParallax(strength)` — 마우스 좌표 → smooth motion values, 모바일/reduced-motion 자동 우회
- [x] `useScrollLinkedValue({ ref, imgScale, copyOpacity, copyY })` — `useScroll` wrap
- [x] `useLenisVelocity()` — 스크롤 velocity 감지
- [x] `<MagneticButton>` — children wrapper, radius 내 자석 효과 (spring)
- [x] `<MaskRevealText>` — gradient mask로 텍스트 좌→우 드러남
- [x] `<FloatingPill>` — devfive scale+blur depth + hover 정지·확대
- [x] `<MeshGradientBackground>` — `@paper-design/shaders-react` MeshGradient wrapper
- [x] `<GridTextureOverlay>` — paper.design 영향 사선 그리드 (SVG/CSS)
- [x] `<ScrollCue>` — Lenis 인지 페이드
- [x] `components/motion/index.ts` — 통합 export

### Hero B+ 컴포넌트 (primitives 조합만)
- [x] `HeroFullBleedPlus.tsx` — 8 primitive 조합, 자체 motion 코드 0줄
- [x] `/hero-lab/[id]` 라우트에 `'2-plus'` 추가
- [x] `shared.ts heroVariantsMeta`에 B+ entry 추가
- [x] `/hero-lab` 인덱스 COMPARISON에 `'2-plus'` 별점 매트릭스 추가
- [x] 인덱스 제목 "Hero 5안 비교" → "Hero 6안 비교"
- [x] 시안 인디케이터 — 코드(A/B/C/D/E/B+) 표시 + overflow-x-auto + 모바일 max-w 안전

### 자산 활용 (1개 추가)
- ✅ `weflow-devfive-hero.png` — B+의 풀블리드 + parallax + scroll scale (B와 공유)
- ✅ 키워드 풍선 6개는 자산 없이 코드 컴포넌트

## Verification

- ✅ `pnpm install @paper-design/shaders-react` — +2 packages, 2.9s, peer 경고만 (무해)
- ✅ `pnpm typecheck` — 2 packages PASS, 1.6~2.9s
- ✅ dev 서버 재시작 (3010) 후 `/hero-lab/2-plus` 200
- ✅ agent-browser 시각 검수
  - 데스크톱 1440 + 모바일 375 = `2-plus-{desktop,mobile}.png`
  - WebGL canvas 1개 정상
  - 키워드 풍선 6개 DOM 존재 (#랜딩페이지·#홈페이지·#광고운영·#검색등록·#케어플랜·#운영관리)
  - 헤드라인 mask reveal · CTA "무료 진단 신청" 존재
  - 인덱스에 B+ 카드 추가 + 13 ul li (6 카드 × N 행)
  - 데스크톱·모바일 overflow=OK
- ✅ `bash scripts/check-design-tokens.sh` — 하드코딩 hex 0건
- ✅ `bash scripts/check-weflow-harness.sh` — Doc OS PASS

## Findings

- **devfive 시그니처 = scale+blur depth** — 정확한 transform 측정값으로 `FloatingPill` 재현. 깊이감의 핵심은 scale·blur·opacity 3축 동시 변화.
- **paper-design/shaders-react는 50KB+ 정도, WebGL mesh gradient 1줄 호출로 적용** — three.js 대비 압도적 경량.
- **재사용 분리의 효용**: HeroFullBleedPlus는 primitive 조합 코드만 ~210줄. 8개 primitive는 다른 페이지(가격·Why·CTA·서비스 rail)에서 즉시 재사용 가능.
- **모바일에서 키워드 풍선 잘 보임** — 작은 화면에선 mesh gradient가 hero asset 위 덮어 풍선 대비 ↑. 데스크톱에선 hero가 큰 면적이라 풍선이 흐림 → 후속 보강 필요.
- **`hero-lab/[id]` 컴포넌트 매핑에서 typeof keyof 좁힘이 polymorphic id에 충돌** → `Record<string, ComponentType>` 로 완화.

## Blocked / Issues

- ⚠️ **B+ 데스크톱에서 키워드 풍선 가독성 ↓** (mesh gradient + hero overlay에 묻힘). 모바일에선 정상. 보강 옵션 3가지:
  1. 키워드 배경 alpha 0.42 → 0.65 + 글자 weight ↑ (가장 가벼움)
  2. hero 이미지 opacity 0.65 → 0.4 + `mix-blend-mode` 제거
  3. 키워드 풍선에 강한 box-shadow + glow ring 추가
- ⚠️ 첫 시도에 `[id]/page.tsx` Edit이 "success" 응답에도 실제 디스크 변경 없었음 (이중 검증 grep 후 재시도로 해결)

## #TODO 잔여

- **주인님 선정 결정** — B+ 1안 선정 시 DEC-041 잠금 → `/` 홈 교체
- **B+ 데스크톱 풍선 가독성 보강** (Day 3 진입 직전 0.2d)
- 모션 primitives 8개를 `Why 그리드`·`Pricing`·`서비스 rail`에서 재사용 (Phase 3+)

## 결정 변경

- (없음) DEC-041~044 신규 잠금만.

## 다음 액션

1. 주인님 B+ 확인 (http://localhost:3010/hero-lab/2-plus) + 풍선 가독성 보강 여부 결정
2. 선정 시 DEC-045 추가 (Hero 최종 선정 — `/` 홈 적용)
3. `/` 임시 홈을 선정 hero로 교체
4. Phase 3 진입: `/mockup/[1..3]` Color 3안 + 홈 본문 (서비스 rail · Why · 사례 · 프로세스 · Pricing)
